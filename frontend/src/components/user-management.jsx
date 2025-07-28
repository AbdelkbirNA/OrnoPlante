"use client"
import { useState, useEffect } from "react"
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
  ExternalLink,
  Save,
  CheckCircle,
  ArrowLeft,
  X,
  UserPlus,
  Activity,
  Clock,
  RefreshCw,
} from "lucide-react"

export function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [showAddUserForm, setShowAddUserForm] = useState(false)
  const [sortBy, setSortBy] = useState("registration_date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [filterUserType, setFilterUserType] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)



  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [statistics, setStatistics] = useState({
    total: 0,
    active: 0,
    admins: 0,
    newThisMonth: 0,
  })

  const userTypes = ["Admin","Utilisateur"]


  // Fonction pour récupérer les utilisateurs depuis l'API
  const fetchUsers = async () => {
    try {
      setLoading(true)
const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/users`);
      if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs")

      const data = await response.json()
      // Adapter selon la structure de réponse de votre API
      const users = Array.isArray(data) ? data : data.users || []
      setUsers(users)


      // Calculer les statistiques
      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()

      setStatistics({
        total: users.length,
        active: users.length, // Adapter selon vos critères d'activité
        admins: users.filter((u) => u.user_type === "admin").length,
        newThisMonth: users.filter((u) => {
          const regDate = new Date(u.registration_date)
          return regDate.getMonth() === currentMonth && regDate.getFullYear() === currentYear
        }).length,
      })
    } catch (error) {
      console.error("Erreur:", error)
      toast.error("Erreur", {
        description: "Impossible de charger les utilisateurs depuis ",
      })
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Fonction pour calculer les statistiques d'un utilisateur
  const getUserStats = (user) => {
    return {
      plants_count: user.plants?.length || 0,
      favorites_count: user.favorites?.length || 0,
      chatbot_questions: user.chatbot_questions?.length || 0,
      visit_count: user.visit_statistics?.reduce((sum, stat) => sum + (stat.page_views || 0), 0) || 0,
      admin_actions: user.admin_actions?.length || 0,
    }
  }

  // Filtrer et trier les utilisateurs
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesUserType = filterUserType === "all" || user.user_type === filterUserType
    return matchesSearch && matchesUserType
  })

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue, bValue

    switch (sortBy) {
      case "name":
        aValue = `${a.first_name || ""} ${a.last_name || ""}`.toLowerCase()
        bValue = `${b.first_name || ""} ${b.last_name || ""}`.toLowerCase()
        break
      case "email":
        aValue = a.email.toLowerCase()
        bValue = b.email.toLowerCase()
        break
      case "registration_date":
        aValue = new Date(a.registration_date).getTime()
        bValue = new Date(b.registration_date).getTime()
        break
      case "user_type":
        aValue = a.user_type || ""
        bValue = b.user_type || ""
        break
      case "plants_count":
        aValue = getUserStats(a).plants_count
        bValue = getUserStats(b).plants_count
        break
      default:
        aValue = new Date(a.registration_date).getTime()
        bValue = new Date(b.registration_date).getTime()
    }

    let comparison = 0
    if (typeof aValue === "string") {
      comparison = aValue.localeCompare(bValue)
    } else {
      comparison = aValue - bValue
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  const getUserTypeColor = (userType) => {
    switch (userType) {
      case "Admin":
        return "bg-red-100 text-red-800 border-red-200"
      case "Utilisateur":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleDeleteUser = (user) => {
    setUserToDelete(user)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/${userToDelete.user_id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchUsers() // Recharger la liste
        toast.success("Utilisateur supprimé", {
          description: `${userToDelete?.first_name} ${userToDelete?.last_name} a été supprimé avec succès.`,
        })
      } else {
        toast.error("Erreur", { description: "Impossible de supprimer l'utilisateur." })
      }
    } catch (error) {
      toast.error("Erreur", { description: "Erreur de connexion vers l'API externe." })
    }
    setDeleteDialogOpen(false)
    setUserToDelete(null)
  }

const makeUserAdmin = async (user) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/promote/${user.user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        user_type: "Admin",
      }),
    })

    if (!response.ok) throw new Error("Échec de la mise à jour de l'utilisateur")

    toast.success("Utilisateur promu administrateur", {
      description: `${user.first_name} ${user.last_name} est maintenant un administrateur.`,
    })

    fetchUsers() // Recharge la liste
  } catch (error) {
    console.error(error)
    toast.error("Erreur", {
      description: "Impossible de promouvoir cet utilisateur.",
    })
  }
}
     



  // Fonction pour changer le tri
  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(newSortBy)
      setSortOrder("asc")
    }
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
            Gérez votre communauté de {statistics.total} utilisateurs avec des outils avancés
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={fetchUsers} variant="outline" size="sm" disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Actualiser
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
            <p className="text-2xl font-bold">{statistics.total}</p>
            <p className="text-xs text-muted-foreground">Comptes enregistrés</p>
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
            <p className="text-2xl font-bold">{statistics.admins}</p>
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
            <p className="text-2xl font-bold">{statistics.newThisMonth}</p>
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
                    {filterUserType === "all" ? "Tous types" : filterUserType}
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
                    <DropdownMenuRadioItem value="user_type">Type d'utilisateur</DropdownMenuRadioItem>
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
          {loading ? (
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
                    <TableHead className="cursor-pointer hover:bg-gray-100" onClick={() => handleSortChange("name")}>
                      Utilisateur
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-100" onClick={() => handleSortChange("email")}>
                      Email
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSortChange("user_type")}
                    >
                      Type
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSortChange("registration_date")}
                    >
                      Inscription
                    </TableHead>
                    
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedUsers.map((user) => {
                    const stats = getUserStats(user)
                    return (
                      <TableRow key={user.user_id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                              {user.profile_picture ? (
                                <img
                                  src={user.profile_picture || "/placeholder.svg"}
                                  alt={`${user.first_name} ${user.last_name}`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User className="h-5 w-5 text-blue-600" />
                              )}
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
                        <TableCell>{new Date(user.registration_date).toLocaleDateString("fr-FR")}</TableCell>
                        
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem
                            className="text-green-600"
                              onClick={() => makeUserAdmin(user)}
                              disabled={user.user_type === "Admin"}
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              Promouvoir admin
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
                    )
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

     
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
