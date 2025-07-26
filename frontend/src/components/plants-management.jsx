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
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
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
  ImageIcon,
  Leaf,
  Droplets,
  Sun,
  Thermometer,
  Star,
  TrendingUp,
  BarChart3,
  Copy,
  ExternalLink,
  Save,
  CheckCircle,
  ArrowLeft,
  X,
} from "lucide-react"
import { fr } from "date-fns/locale"

export function PlantsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [showAddPlantForm, setShowAddPlantForm] = useState(false)
  const [sortBy, setSortBy] = useState("name")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [plantToDelete, setPlantToDelete] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)

  // État pour le formulaire de nouvelle plante
  const [newPlantForm, setNewPlantForm] = useState({
    plant_name: "",
    description: "",
    type: "",
    light_requirement: "",
    watering_frequency: "",
    temperature_min: "",
    temperature_max: "",
    photo_url: "",
  })

  const [plants, setPlantsState] = useState([
    {
      id: 1,
      name: "Ficus Benjamina",
      scientificName: "Ficus benjamina",
      category: "Intérieur",
      difficulty: "Facile",
      views: 234,
      status: "Publié",
      rating: 4.8,
      price: "25.99",
      stock: 15,
      lastWatered: "2024-01-15",
      lightRequirement: "Lumière indirecte",
      waterFrequency: "1-2 fois/semaine",
      temperature: "18-24°C",
      humidity: "40-60%",
      image: "/placeholder.svg?height=100&width=100&text=Ficus",
      description:
        "Le Ficus Benjamina est une plante d'intérieur populaire, facile d'entretien et purificatrice d'air.",
      tags: ["Purificateur d'air", "Débutant", "Bureau"],
      createdAt: "2024-01-01",
    },
    {
      id: 2,
      name: "Monstera Deliciosa",
      scientificName: "Monstera deliciosa",
      category: "Tropicale",
      difficulty: "Moyen",
      views: 198,
      status: "Publié",
      rating: 4.9,
      price: "45.99",
      stock: 8,
      lastWatered: "2024-01-14",
      lightRequirement: "Lumière vive indirecte",
      waterFrequency: "1 fois/semaine",
      temperature: "20-26°C",
      humidity: "60-80%",
      image: "/placeholder.svg?height=100&width=100&text=Monstera",
      description: "La Monstera Deliciosa est appréciée pour ses grandes feuilles perforées spectaculaires.",
      tags: ["Tropicale", "Instagram", "Grande taille"],
      createdAt: "2024-01-02",
    },
    {
      id: 3,
      name: "Lavande",
      scientificName: "Lavandula angustifolia",
      category: "Médicinale",
      difficulty: "Facile",
      views: 167,
      status: "Brouillon",
      rating: 4.7,
      price: "12.99",
      stock: 25,
      lastWatered: "2024-01-16",
      lightRequirement: "Plein soleil",
      waterFrequency: "2-3 fois/semaine",
      temperature: "15-25°C",
      humidity: "30-50%",
      image: "/placeholder.svg?height=100&width=100&text=Lavande",
      description: "La lavande est une plante aromatique aux propriétés relaxantes et répulsives pour les insectes.",
      tags: ["Aromatique", "Médicinale", "Extérieur"],
      createdAt: "2024-01-03",
    },
  ])

  const categories = ["Intérieur", "Extérieur", "Cactus", "Médicinale", "Décoratives",]

  const formSteps = [
    {
      id: "basic",
      title: "Informations de base",
      description: "Nom, catégorie et informations principales",
      icon: Leaf,
    },
    {
      id: "care",
      title: "Entretien",
      description: "Besoins en lumière, eau et température",
      icon: Droplets,
    },
    {
      id: "details",
      title: "Détails",
      description: "Description, tags et paramètres avancés",
      icon: Star,
    },
  ]

  const filteredPlants = plants.filter((plant) => {
    const matchesSearch =
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || plant.category === filterCategory
    const matchesStatus = filterStatus === "all" || plant.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const sortedPlants = [...filteredPlants].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "views":
        return b.views - a.views
      case "rating":
        return b.rating - a.rating
      case "stock":
        return b.stock - a.stock
      default:
        return 0
    }
  })

 



  const handleDeletePlant = (plant) => {
    setPlantToDelete(plant)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setPlantsState(plants.filter((p) => p.id !== plantToDelete.id))
    toast.success("Plante supprimée", {
      description: `${plantToDelete?.name} a été supprimée avec succès.`,
    })
    setDeleteDialogOpen(false)
    setPlantToDelete(null)
  }

  

  // Fonctions pour gérer le formulaire de nouvelle plante
  const resetNewPlantForm = () => {
    setNewPlantForm({
      plant_name: "",
      description: "",
      type: "",
      light_requirement: "",
      watering_frequency: "",
      temperature_min: "",
      temperature_max: "",
      photo_url: "",
    })
    setCurrentStep(0)
  }

  const handleOpenNewPlantForm = () => {
    resetNewPlantForm()
    setShowAddPlantForm(true)
  }

  const handleCloseNewPlantForm = () => {
    setShowAddPlantForm(false)
    resetNewPlantForm()
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Informations de base
        return newPlantForm.plant_name.trim() && newPlantForm.type
      case 1: // Entretien
        return true // Optionnel
      case 2: // Détails
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

  const handleSaveNewPlant = () => {
    // Validation finale
    if (!newPlantForm.plant_name.trim()) {
      toast.error("Erreur", { description: "Le nom de la plante est requis." })
      return
    }
    if (!newPlantForm.type) {
      toast.error("Erreur", { description: "Le type de plante est requis." })
      return
    }

    const newPlant = {
      id: Math.max(...plants.map((p) => p.id)) + 1,
      plant_name: newPlantForm.plant_name.trim(),
      description: newPlantForm.description.trim(),
      type: newPlantForm.type,
      light_requirement: newPlantForm.light_requirement.trim(),
      watering_frequency: newPlantForm.watering_frequency.trim(),
      temperature_min: Number.parseFloat(newPlantForm.temperature_min) || null,
      temperature_max: Number.parseFloat(newPlantForm.temperature_max) || null,
      photo_url:
        newPlantForm.photo_url ||
        "/placeholder.svg?height=200&width=200&text=" + encodeURIComponent(newPlantForm.plant_name.substring(0, 8)),
      views: 0,
      rating: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setPlantsState([...plants, newPlant])
    toast.success("Plante créée", {
      description: `${newPlant.plant_name} a été ajoutée avec succès au catalogue.`,
    })
    handleCloseNewPlantForm()
  }

  // Formulaire d'ajout de plante dans la page
  const AddPlantForm = () => (
    <div className="space-y-8">
      {/* Header du formulaire */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleCloseNewPlantForm} size="lg">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-green-600">Ajouter une nouvelle plante</h1>
            <p className="text-muted-foreground mt-1">Créez une nouvelle fiche plante pour votre catalogue</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleCloseNewPlantForm} size="sm">
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
                    index <= currentStep ? "bg-green-600 border-green-600 text-white" : "border-gray-300 text-gray-400"
                  }`}
                >
                  {index < currentStep ? <CheckCircle className="h-6 w-6" /> : <step.icon className="h-6 w-6" />}
                </div>
                {index < formSteps.length - 1 && (
                  <div
                    className={`w-24 h-0.5 mx-4 transition-all ${index < currentStep ? "bg-green-600" : "bg-gray-300"}`}
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
        {/* Étape 1: Informations de base */}
        {currentStep === 0 && (
          <Card className="border-2 border-green-100">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Leaf className="h-6 w-6" />
                Informations essentielles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="plant_name" className="text-sm font-medium flex items-center gap-2">
                    Nom de la plante <span className="text-red-500">*</span>
                    {newPlantForm.plant_name && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </Label>
                  <Input
                    id="plant_name"
                    placeholder="Ex: Ficus Benjamina"
                    value={newPlantForm.plant_name}
                    onChange={(e) => setNewPlantForm({ ...newPlantForm, plant_name: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    Type de plante <span className="text-red-500">*</span>
                    {newPlantForm.type && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </Label>
                  <Select
                    value={newPlantForm.type}
                    onValueChange={(value) => setNewPlantForm({ ...newPlantForm, type: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Sélectionner un type de plante" />
                    </SelectTrigger>
                    <SelectContent>
                      {plantTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description de la plante
                </Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez les caractéristiques, l'origine et les particularités de cette plante..."
                  rows={8}
                  value={newPlantForm.description}
                  onChange={(e) => setNewPlantForm({ ...newPlantForm, description: e.target.value })}
                  className="resize-none"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Étape 2: Entretien */}
        {currentStep === 1 && (
          <Card className="border-2 border-blue-100">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Droplets className="h-6 w-6" />
                Conseils d'entretien
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="light_requirement" className="text-sm font-medium flex items-center gap-2">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    Besoins en lumière
                  </Label>
                  <Input
                    id="light_requirement"
                    placeholder="Ex: Lumière indirecte vive, éviter le soleil direct"
                    value={newPlantForm.light_requirement}
                    onChange={(e) => setNewPlantForm({ ...newPlantForm, light_requirement: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="watering_frequency" className="text-sm font-medium flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    Fréquence d'arrosage
                  </Label>
                  <Input
                    id="watering_frequency"
                    placeholder="Ex: 1-2 fois par semaine, laisser sécher entre les arrosages"
                    value={newPlantForm.watering_frequency}
                    onChange={(e) => setNewPlantForm({ ...newPlantForm, watering_frequency: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="temperature_min" className="text-sm font-medium flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-blue-500" />
                    Température minimale (°C)
                  </Label>
                  <Input
                    id="temperature_min"
                    type="number"
                    step="0.1"
                    placeholder="15"
                    value={newPlantForm.temperature_min}
                    onChange={(e) => setNewPlantForm({ ...newPlantForm, temperature_min: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="temperature_max" className="text-sm font-medium flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-red-500" />
                    Température maximale (°C)
                  </Label>
                  <Input
                    id="temperature_max"
                    type="number"
                    step="0.1"
                    placeholder="25"
                    value={newPlantForm.temperature_max}
                    onChange={(e) => setNewPlantForm({ ...newPlantForm, temperature_max: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Étape 3: Détails */}
        {currentStep === 2 && (
          <Card className="border-2 border-purple-100">
            <CardHeader className="bg-purple-50">
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Star className="h-6 w-6" />
                Détails et finalisation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-8">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Photo de la plante</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center hover:border-green-400 transition-colors">
                  <ImageIcon className="mx-auto h-24 w-24 text-gray-400 mb-6" />
                  <div className="space-y-4">
                    <Button variant="outline" size="lg" className="px-8 py-4 bg-transparent">
                      <Upload className="mr-3 h-6 w-6" />
                      Télécharger une photo
                    </Button>
                    <p className="text-muted-foreground">PNG, JPG, WEBP jusqu'à 10MB</p>
                    {newPlantForm.photo_url && (
                      <div className="mt-6 p-4 bg-green-50 rounded-lg">
                        <p className="text-green-700">✓ Photo sélectionnée</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-8 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Conseils pour une bonne photo :</h4>
                <ul className="text-blue-800 space-y-2">
                  <li>• Utilisez un éclairage naturel</li>
                  <li>• Montrez la plante entière</li>
                  <li>• Évitez les arrière-plans encombrés</li>
                  <li>• Prenez plusieurs angles si nécessaire</li>
                </ul>
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
              <Button variant="outline" onClick={handleCloseNewPlantForm} size="lg" className="px-8 bg-transparent">
                Annuler
              </Button>
              {currentStep < formSteps.length - 1 ? (
                <Button onClick={handleNextStep} disabled={!validateCurrentStep()} size="lg" className="px-8">
                  Suivant
                  <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                </Button>
              ) : (
                <Button onClick={handleSaveNewPlant} size="lg" className="px-8">
                  <Save className="mr-2 h-5 w-5" />
                  Créer la plante
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  

  // Affichage conditionnel : formulaire ou liste des plantes
  if (showAddPlantForm) {
    return <AddPlantForm />
  }

  return (
    <div className="space-y-8">
      {/* Header avec actions avancées */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Gestion des plantes
          </h1>
          <p className="text-muted-foreground mt-2">
            Gérez votre catalogue de {plants.length} plantes avec des outils avancés
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleOpenNewPlantForm} size="lg" className="px-6">
            <Plus className="mr-2 h-5 w-5" />
            Ajouter une plante
          </Button>
        </div>
      </div>

      {/* Barre de recherche et filtres avancés */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom ou nom scientifique..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Filtre par catégorie */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Catégorie
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <Command>
                    <CommandInput placeholder="Rechercher catégorie..." />
                    <CommandList>
                      <CommandEmpty>Aucune catégorie trouvée.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem onSelect={() => setFilterCategory("all")}>Toutes les catégories</CommandItem>
                        {categories.map((category) => (
                          <CommandItem key={category} onSelect={() => setFilterCategory(category)}>
                            {category}
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
                    <DropdownMenuRadioItem value="views">Popularité</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="rating">Note</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="stock">Stock</DropdownMenuRadioItem>
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
            <span>Catalogue des plantes</span>
            <Badge variant="secondary">{sortedPlants.length} résultats</Badge>
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
                    <TableHead>Plante</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>light_requirement</TableHead>
                    <TableHead>watering_frequency</TableHead>
                    <TableHead>temperature_min</TableHead>
                    <TableHead>temperature_max</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedPlants.map((plant) => (
                    <TableRow key={plant.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Leaf className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{plant.name}</p>
                            <p className="text-sm text-muted-foreground italic">{plant.scientificName}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{plant.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge >{plant.difficulty}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className={plant.stock < 10 ? "text-red-600 font-medium" : ""}>{plant.stock}</span>
                      </TableCell>
                      <TableCell className="font-medium text-green-600">{plant.price}€</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{plant.rating}</span>
                        </div>
                      </TableCell>
                      
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
                                setSelectedPlant(plant)
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
                            <DropdownMenuItem onClick={() => handleDuplicatePlant(plant)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Dupliquer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeletePlant(plant)}>
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

      {/* Sheet pour les détails de la plante */}

      {/* Dialog de confirmation de suppression */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. La plante "{plantToDelete?.name}" sera définitivement supprimée de
              votre catalogue.
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
