"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  Upload,
  MoreHorizontal,
  ArrowUpDown,
  ChevronDown,
  User,
  Users,
  Mail,
  CalendarIcon,
  Shield,
  TrendingUp,
  BarChart3,
  Copy,
  ExternalLink,
  Save,
  CheckCircle,
  ArrowLeft,
  X,
  UserPlus,
  Activity,
  Clock,
} from "lucide-react"

export function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [showAddUserForm, setShowAddUserForm] = useState(false)
  const [sortBy, setSortBy] = useState("registration_date")
  const [filterUserType, setFilterUserType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)

  // État pour le formulaire de nouvel utilisateur
  const [newUserForm, setNewUserForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    user_type: "",
    profile_picture: "",
  })

  const [users, setUsersState] = useState([
    {
      user_id: 1,
      first_name: "Marie",
      last_name: "Dubois",
      email: "marie.dubois@email.com",
      user_type: "Admin",
      profile_picture: "/placeholder.svg?height=40&width=40&text=MD",
      registration_date: "2024-01-15",
      status: "Actif",
      last_login: "2024-01-20",
      plants_count: 12,
      favorites_count: 8,
      chatbot_questions: 25,
      visit_count: 156,
      admin_actions: 45,
    },
    {
      user_id: 2,
      first_name: "Pierre",
      last_name: "Martin",
      email: "pierre.martin@email.com",
      user_type: "Utilisateur",
      profile_picture: "/placeholder.svg?height=40&width=40&text=PM",
      registration_date: "2024-01-10",
      status: "Actif",
      last_login: "2024-01-19",
      plants_count: 5,
      favorites_count: 15,
      chatbot_questions: 8,
      visit_count: 89,
      admin_actions: 0,
    },
    {
      user_id: 3,
      first_name: "Sophie",
      last_name: "Bernard",
      email: "sophie.bernard@email.com",
      user_type: "Modérateur",
      profile_picture: "/placeholder.svg?height=40&width=40&text=SB",
      registration_date: "2024-01-05",
      status: "Inactif",
      last_login: "2024-01-12",
      plants_count: 8,
      favorites_count: 22,
      chatbot_questions: 15,
      visit_count: 234,
      admin_actions: 12,
    },
    {
      user_id: 4,
      first_name: "Lucas",
      last_name: "Petit",
      email: "lucas.petit@email.com",
      user_type: "Utilisateur",
      profile_picture: "/placeholder.svg?height=40&width=40&text=LP",
      registration_date: "2024-01-20",
      status: "Actif",
      last_login: "2024-01-21",
      plants_count: 3,
      favorites_count: 6,
      chatbot_questions: 4,
      visit_count: 45,
      admin_actions: 0,
    },
  ])

  const userTypes = ["Admin", "Modérateur", "Utilisateur", "Premium"]
  const statuses = ["Actif", "Inactif", "Suspendu", "En attente"]

  const formSteps = [
    {
      id: "basic",
      title: "Informations personnelles",
      description: "Nom, prénom et informations de base",
      icon: User,
    },
    {
      id: "account",
      title: "Compte",
      description: "Email, mot de passe et type d'utilisateur",
      icon: Mail,
    },
    {
      id: "profile",
      title: "Profil",
      description: "Photo de profil et paramètres",
      icon: UserPlus,
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesUserType = filterUserType === "all" || user.user_type === filterUserType
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesUserType && matchesStatus
  })

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
      case "email":
        return a.email.localeCompare(b.email)
      case "registration_date":
        return new Date(b.registration_date).getTime() - new Date(a.registration_date).getTime()
      case "last_login":
        return new Date(b.last_login).getTime() - new Date(a.last_login).getTime()
      case "plants_count":
        return b.plants_count - a.plants_count
      default:
        return 0
    }
  })

  const getUserTypeColor = (userType) => {
    switch (userType) {
      case "Admin":
        return "bg-red-100 text-red-800 border-red-200"
      case "Modérateur":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Premium":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Utilisateur":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800 border-green-200"
      case "Inactif":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "Suspendu":
        return "bg-red-100 text-red-800 border-red-200"
      case "En attente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleDeleteUser = (user) => {
    setUserToDelete(user)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setUsersState(users.filter((u) => u.user_id !== userToDelete.user_id))
    toast.success("Utilisateur supprimé", {
      description: `${userToDelete?.first_name} ${userToDelete?.last_name} a été supprimé avec succès.`,
    })
    setDeleteDialogOpen(false)
    setUserToDelete(null)
  }

  const handleDuplicateUser = (user) => {
    const newUser = {
      ...user,
      user_id: Math.max(...users.map((u) => u.user_id)) + 1,
      email: `copie.${user.email}`,
      first_name: `${user.first_name} (Copie)`,
      status: "En attente",
      registration_date: new Date().toISOString().split("T")[0],
    }
    setUsersState([...users, newUser])
    toast.success("Utilisateur dupliqué", {
      description: `Une copie de ${user.first_name} ${user.last_name} a été créée.`,
    })
  }

  // Fonctions pour gérer le formulaire de nouvel utilisateur
  const resetNewUserForm = () => {
    setNewUserForm({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      user_type: "",
      profile_picture: "",
    })
    setCurrentStep(0)
  }

  const handleOpenNewUserForm = () => {
    resetNewUserForm()
    setShowAddUserForm(true)
  }

  const handleCloseNewUserForm = () => {
    setShowAddUserForm(false)
    resetNewUserForm()
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Informations personnelles
        return newUserForm.first_name.trim() && newUserForm.last_name.trim()
      case 1: // Compte
        return newUserForm.email.trim() && newUserForm.user_type
      case 2: // Profil
        return true // Optionnel
      default:
        return false
    }
  }

  const handleNextStep = () => {
    if (validateCurrentStep() && currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSaveNewUser = () => {
    // Validation finale
    if (!newUserForm.first_name.trim() || !newUserForm.last_name.trim()) {
      toast.error("Erreur", { description: "Le prénom et nom sont requis." })
      return
    }
    if (!newUserForm.email.trim()) {
      toast.error("Erreur", { description: "L'email est requis." })
      return
    }
    if (!newUserForm.user_type) {
      toast.error("Erreur", { description: "Le type d'utilisateur est requis." })
      return
    }

    const newUser = {
      user_id: Math.max(...users.map((u) => u.user_id)) + 1,
      first_name: newUserForm.first_name.trim(),
      last_name: newUserForm.last_name.trim(),
      email: newUserForm.email.trim(),
      user_type: newUserForm.user_type,
      profile_picture:
        newUserForm.profile_picture ||
        `/placeholder.svg?height=40&width=40&text=${newUserForm.first_name.charAt(0)}${newUserForm.last_name.charAt(0)}`,
      registration_date: new Date().toISOString().split("T")[0],
      status: "Actif",
      last_login: new Date().toISOString().split("T")[0],
      plants_count: 0,
      favorites_count: 0,
      chatbot_questions: 0,
      visit_count: 0,
      admin_actions: 0,
    }

    setUsersState([...users, newUser])
    toast.success("Utilisateur créé", {
      description: `${newUser.first_name} ${newUser.last_name} a été ajouté avec succès.`,
    })
    handleCloseNewUserForm()
  }

  // Formulaire d'ajout d'utilisateur
  const AddUserForm = () => (
    <div className="space-y-8">
      {/* Header du formulaire */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleCloseNewUserForm} size="lg">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-blue-600">Ajouter un nouvel utilisateur</h1>
            <p className="text-muted-foreground mt-1">Créez un nouveau compte utilisateur</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleCloseNewUserForm} size="sm">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Indicateur de progression */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            {formSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                    index <= currentStep ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-400"
                  }`}
                >
                  {index < currentStep ? <CheckCircle className="h-6 w-6" /> : <step.icon className="h-6 w-6" />}
                </div>
                {index < formSteps.length - 1 && (
                  <div
                    className={`w-24 h-0.5 mx-4 transition-all ${index < currentStep ? "bg-blue-600" : "bg-gray-300"}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg">{formSteps[currentStep].title}</h3>
            <p className="text-muted-foreground">{formSteps[currentStep].description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Contenu du formulaire */}
      <div className="max-w-4xl mx-auto">
        {/* Étape 1: Informations personnelles */}
        {currentStep === 0 && (
          <Card className="border-2 border-blue-100">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <User className="h-6 w-6" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="first_name" className="text-sm font-medium flex items-center gap-2">
                    Prénom <span className="text-red-500">*</span>
                    {newUserForm.first_name && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </Label>
                  <Input
                    id="first_name"
                    placeholder="Ex: Marie"
                    value={newUserForm.first_name}
                    onChange={(e) => setNewUserForm({ ...newUserForm, first_name: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="last_name" className="text-sm font-medium flex items-center gap-2">
                    Nom <span className="text-red-500">*</span>
                    {newUserForm.last_name && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </Label>
                  <Input
                    id="last_name"
                    placeholder="Ex: Dubois"
                    value={newUserForm.last_name}
                    onChange={(e) => setNewUserForm({ ...newUserForm, last_name: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Étape 2: Compte */}
        {currentStep === 1 && (
          <Card className="border-2 border-green-100">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Mail className="h-6 w-6" />
                Informations de compte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    Email <span className="text-red-500">*</span>
                    {newUserForm.email && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ex: marie.dubois@email.com"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    Type d'utilisateur <span className="text-red-500">*</span>
                    {newUserForm.user_type && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </Label>
                  <Select
                    value={newUserForm.user_type}
                    onValueChange={(value) => setNewUserForm({ ...newUserForm, user_type: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Sélectionner un type d'utilisateur" />
                    </SelectTrigger>
                    <SelectContent>
                      {userTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-medium">
                  Mot de passe temporaire
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Laisser vide pour générer automatiquement"
                  value={newUserForm.password}
                  onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                  className="h-12"
                />
                <p className="text-xs text-muted-foreground">
                  Si laissé vide, un mot de passe temporaire sera généré et envoyé par email
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Étape 3: Profil */}
        {currentStep === 2 && (
          <Card className="border-2 border-purple-100">
            <CardHeader className="bg-purple-50">
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <UserPlus className="h-6 w-6" />
                Photo de profil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-8">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Photo de profil</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center hover:border-blue-400 transition-colors">
                  <User className="mx-auto h-24 w-24 text-gray-400 mb-6" />
                  <div className="space-y-4">
                    <Button variant="outline" size="lg" className="px-8 py-4 bg-transparent">
                      <Upload className="mr-3 h-6 w-6" />
                      Télécharger une photo
                    </Button>
                    <p className="text-muted-foreground">PNG, JPG, WEBP jusqu'à 5MB</p>
                    {newUserForm.profile_picture && (
                      <div className="mt-6 p-4 bg-green-50 rounded-lg">
                        <p className="text-green-700">✓ Photo sélectionnée</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              size="lg"
              className="px-8 bg-transparent"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Précédent
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">
                Étape {currentStep + 1} sur {formSteps.length}
              </span>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleCloseNewUserForm} size="lg" className="px-8 bg-transparent">
                Annuler
              </Button>
              {currentStep < formSteps.length - 1 ? (
                <Button onClick={handleNextStep} disabled={!validateCurrentStep()} size="lg" className="px-8">
                  Suivant
                  <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                </Button>
              ) : (
                <Button onClick={handleSaveNewUser} size="lg" className="px-8">
                  <Save className="mr-2 h-5 w-5" />
                  Créer l'utilisateur
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const UserDetailsSheet = ({ user, isOpen, onClose }) => (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[600px] sm:w-[800px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            {user?.first_name} {user?.last_name}
          </SheetTitle>
          <SheetDescription>Détails complets et gestion de l'utilisateur</SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="details" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-6">
            <div className="grid gap-6">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {user?.first_name} {user?.last_name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getUserTypeColor(user?.user_type)}>{user?.user_type}</Badge>
                    <Badge className={getStatusColor(user?.status)}>{user?.status}</Badge>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Date d'inscription</Label>
                    <p className="text-sm text-muted-foreground mt-1">{user?.registration_date}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Dernière connexion</Label>
                    <p className="text-sm text-muted-foreground mt-1">{user?.last_login}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Plantes ajoutées</Label>
                    <p className="text-lg font-semibold text-green-600">{user?.plants_count}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Favoris</Label>
                    <p className="text-lg font-semibold">{user?.favorites_count}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="activity" className="space-y-6">
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Activity className="h-4 w-4 text-blue-500" />
                      Questions chatbot
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{user?.chatbot_questions}</p>
                    <p className="text-xs text-muted-foreground mt-1">Total des questions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Eye className="h-4 w-4 text-green-500" />
                      Visites
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{user?.visit_count}</p>
                    <p className="text-xs text-muted-foreground mt-1">Pages vues</p>
                  </CardContent>
                </Card>
              </div>
              {user?.user_type === "Admin" && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-red-500" />
                      Actions administrateur
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{user?.admin_actions}</p>
                    <p className="text-xs text-muted-foreground mt-1">Actions effectuées</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      Engagement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{Math.floor(Math.random() * 100)}%</p>
                    <p className="text-xs text-muted-foreground">Score d'activité</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      Temps moyen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{Math.floor(Math.random() * 30) + 5}min</p>
                    <p className="text-xs text-muted-foreground">Par session</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <BarChart3 className="h-4 w-4" />
                      Contributions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{user?.plants_count + user?.chatbot_questions}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Compte actif</Label>
                  <p className="text-xs text-muted-foreground">Autoriser la connexion</p>
                </div>
                <Switch defaultChecked={user?.status === "Actif"} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Notifications email</Label>
                  <p className="text-xs text-muted-foreground">Recevoir les notifications par email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-4">
                <Label className="text-sm font-medium text-red-600">Zone de danger</Label>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                    onClick={() => handleDuplicateUser(user)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Dupliquer l'utilisateur
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Exporter les données
                  </Button>
                  <Button variant="destructive" className="w-full justify-start" onClick={() => handleDeleteUser(user)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer définitivement
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )

  // Affichage conditionnel : formulaire ou liste des utilisateurs
  if (showAddUserForm) {
    return <AddUserForm />
  }

  return (
    <div className="space-y-8">
      {/* Header avec actions avancées */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gestion des utilisateurs
          </h1>
          <p className="text-muted-foreground mt-2">
            Gérez votre communauté de {users.length} utilisateurs avec des outils avancés
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleOpenNewUserForm} size="lg" className="px-6">
            <Plus className="mr-2 h-5 w-5" />
            Ajouter un utilisateur
          </Button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-blue-500" />
              Total utilisateurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{users.length}</p>
            <p className="text-xs text-muted-foreground">+12% ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-green-500" />
              Utilisateurs actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{users.filter((u) => u.status === "Actif").length}</p>
            <p className="text-xs text-muted-foreground">Connectés récemment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-red-500" />
              Administrateurs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{users.filter((u) => u.user_type === "Admin").length}</p>
            <p className="text-xs text-muted-foreground">Comptes privilégiés</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <CalendarIcon className="h-4 w-4 text-purple-500" />
              Nouveaux ce mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {users.filter((u) => new Date(u.registration_date).getMonth() === new Date().getMonth()).length}
            </p>
            <p className="text-xs text-muted-foreground">Inscriptions récentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche et filtres avancés */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Filtre par type d'utilisateur */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Type
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <Command>
                    <CommandInput placeholder="Rechercher type..." />
                    <CommandList>
                      <CommandEmpty>Aucun type trouvé.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem onSelect={() => setFilterUserType("all")}>Tous les types</CommandItem>
                        {userTypes.map((type) => (
                          <CommandItem key={type} onSelect={() => setFilterUserType(type)}>
                            {type}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {/* Tri */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Trier
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Trier par</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                    <DropdownMenuRadioItem value="name">Nom</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="email">Email</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="registration_date">Date d'inscription</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="last_login">Dernière connexion</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="plants_count">Nombre de plantes</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tableau avancé avec skeleton loading */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Liste des utilisateurs</span>
            <Badge variant="secondary">{sortedUsers.length} résultats</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ScrollArea className="h-[600px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Inscription</TableHead>
                    <TableHead>Plantes</TableHead>
                    <TableHead>Dernière connexion</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedUsers.map((user) => (
                    <TableRow key={user.user_id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {user.first_name} {user.last_name}
                            </p>
                            <p className="text-sm text-muted-foreground">ID: {user.user_id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getUserTypeColor(user.user_type)}>{user.user_type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>{user.registration_date}</TableCell>
                      <TableCell>
                        <span className="font-medium">{user.plants_count}</span>
                      </TableCell>
                      <TableCell>{user.last_login}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user)
                                setIsSheetOpen(true)
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Voir détails
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicateUser(user)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Dupliquer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Sheet pour les détails de l'utilisateur */}
      <UserDetailsSheet user={selectedUser} isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} />

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. L'utilisateur "{userToDelete?.first_name} {userToDelete?.last_name}
              " sera définitivement supprimé avec toutes ses données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
