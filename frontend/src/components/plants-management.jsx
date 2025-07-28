"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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
  MoreHorizontal,
  ArrowUpDown,
  ChevronDown,
  Leaf,
  Droplets,
  Star,
} from "lucide-react"
import AddPlantForm from "@/components/add-plant-form"

export default function PlantsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [showAddPlantForm, setShowAddPlantForm] = useState(false)
  const [sortBy, setSortBy] = useState("name")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [plantToDelete, setPlantToDelete] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)

  // État pour le formulaire de nouvelle plante - CORRIGÉ
  const [newPlantForm, setNewPlantForm] = useState({
    plant_name: "",
    description: "",
    type: "",
    light_requirement: "",
    watering_frequency: "",
    temperature_min: "",
    temperature_max: "",
    image_file: null, // CORRIGÉ: au lieu de photo_url
    image_preview: null, // CORRIGÉ: ajouté pour l'aperçu
  })

  const [plants, setPlants] = useState([])
  const [loading, setLoading] = useState(true)

  // Types de plantes disponibles
  const plantTypes = ["Intérieur", "Extérieur", "Cactus", "Médicinale", "Décoratives"]

  async function fetchPlants() {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/plants`)
      if (!res.ok) throw new Error("Erreur lors de la récupération des plantes")
      const data = await res.json()
      setPlants(data)
    } catch (error) {
      console.error(error)
      setPlants([])
      toast.error("Erreur", {
        description: "Impossible de charger les plantes",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlants()
  }, [])

  const categories = ["Intérieur", "Extérieur", "Cactus", "Médicinale", "Décoratives"]

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
    const matchesSearch = plant.plant_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || plant.type === filterCategory
    return matchesSearch && matchesCategory
  })

  const sortedPlants = [...filteredPlants].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.plant_name.localeCompare(b.plant_name)
      default:
        return 0
    }
  })

  const handleDeletePlant = (plant) => {
    setPlantToDelete(plant)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/plant/${plantToDelete.plant_id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        setPlants(plants.filter((p) => p.plant_id !== plantToDelete.plant_id))
        toast.success("Plante supprimée", {
          description: `${plantToDelete?.plant_name} a été supprimée avec succès.`,
        })
      } else {
        toast.error("Erreur", { description: "Impossible de supprimer la plante." })
      }
    } catch (error) {
      toast.error("Erreur", { description: "Erreur de connexion." })
    }
    setDeleteDialogOpen(false)
    setPlantToDelete(null)
  }

  // Fonctions pour gérer le formulaire de nouvelle plante - CORRIGÉ
  const resetNewPlantForm = () => {
    setNewPlantForm({
      plant_name: "",
      description: "",
      type: "",
      light_requirement: "",
      watering_frequency: "",
      temperature_min: "",
      temperature_max: "",
      image_file: null, // CORRIGÉ: au lieu de photo_url
      image_preview: null, // CORRIGÉ: ajouté
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

  // FONCTION CORRIGÉE pour gérer l'upload d'image
  const handleSaveNewPlant = async () => {
    // Validation finale
    if (!newPlantForm.plant_name.trim()) {
      toast.error("Erreur", { description: "Le nom de la plante est requis." })
      return
    }
    if (!newPlantForm.type) {
      toast.error("Erreur", { description: "Le type de plante est requis." })
      return
    }

    try {
      // Si pas d'image, utiliser JSON comme avant
      if (!newPlantForm.image_file) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/addplant`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plant_name: newPlantForm.plant_name.trim(),
            description: newPlantForm.description.trim(),
            type: newPlantForm.type,
            light_requirement: newPlantForm.light_requirement.trim(),
            watering_frequency: newPlantForm.watering_frequency.trim(),
            temperature_min: Number.parseFloat(newPlantForm.temperature_min) || null,
            temperature_max: Number.parseFloat(newPlantForm.temperature_max) || null,
            photo_url:
              newPlantForm.photo_url ||
              "/placeholder.svg?height=200&width=200&text=" +
                encodeURIComponent(newPlantForm.plant_name.substring(0, 8)),
          }),
        })

        if (response.ok) {
          const responseData = await response.json()
          const newPlant = responseData.plant
          setPlants([...plants, newPlant])
          toast.success("Plante créée", {
            description: `${newPlant.plant_name} a été ajoutée avec succès au catalogue.`,
          })
          handleCloseNewPlantForm()
        } else {
          toast.error("Erreur", { description: "Impossible de créer la plante." })
        }
      } else {
        // Si image, utiliser FormData
        const formData = new FormData()
        formData.append("plant_name", newPlantForm.plant_name.trim())
        formData.append("description", newPlantForm.description.trim())
        formData.append("type", newPlantForm.type)
        formData.append("light_requirement", newPlantForm.light_requirement.trim())
        formData.append("watering_frequency", newPlantForm.watering_frequency.trim())
        formData.append("temperature_min", newPlantForm.temperature_min || "")
        formData.append("temperature_max", newPlantForm.temperature_max || "")
        formData.append("image", newPlantForm.image_file)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/addplant`, {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          const responseData = await response.json()
          const newPlant = responseData.plant
          setPlants([...plants, newPlant])
          toast.success("Plante créée", {
            description: `${newPlant.plant_name} a été ajoutée avec succès au catalogue.`,
          })
          handleCloseNewPlantForm()
        } else {
          toast.error("Erreur", { description: "Impossible de créer la plante." })
        }
      }
    } catch (error) {
      toast.error("Erreur", { description: "Erreur de connexion." })
    }
  }

  // Affichage conditionnel : formulaire ou liste des plantes
  if (showAddPlantForm) {
    return (
      <AddPlantForm
        newPlantForm={newPlantForm}
        setNewPlantForm={setNewPlantForm}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        onClose={handleCloseNewPlantForm}
        onSave={handleSaveNewPlant}
        onNext={handleNextStep}
        onPrev={handlePrevStep}
        validateCurrentStep={validateCurrentStep}
        plantTypes={plantTypes}
        formSteps={formSteps}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header avec actions avancées */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-6 rounded-xl shadow-sm border">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des plantes</h1>
              <p className="text-gray-600 mt-1">Gérez votre catalogue de {plants.length} plantes</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleOpenNewPlantForm}
                size="lg"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une plante
              </Button>
            </div>
          </div>

          {/* Barre de recherche et filtres avancés */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher par nom ou nom scientifique..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 shadow-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Filtre par catégorie */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="shadow-sm bg-transparent">
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
                      <Button variant="outline" size="sm" className="shadow-sm bg-transparent">
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
          <Card className="shadow-sm border border-gray-200">
  <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-200">
    <CardTitle className="flex items-center justify-between">
      <span className="text-xl font-semibold text-gray-900">Catalogue des plantes</span>
      <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
        {sortedPlants.length} résultats
      </Badge>
    </CardTitle>
  </CardHeader>
  <CardContent className="p-0">
    {loading ? (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    ) : sortedPlants.length === 0 ? (
      <div className="text-center py-12">
        <Leaf className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune plante trouvée</h3>
        <p className="text-gray-500 mb-6">
          {searchTerm || filterCategory !== "all"
            ? "Essayez de modifier vos critères de recherche"
            : "Commencez par ajouter votre première plante"}
        </p>
        <Button onClick={handleOpenNewPlantForm} className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une plante
        </Button>
      </div>
    ) : (
      <ScrollArea className="h-[600px]">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-700">Plante</TableHead>
              <TableHead className="font-semibold text-gray-700">Catégorie</TableHead>
              <TableHead className="font-semibold text-gray-700">Lumière</TableHead>
              <TableHead className="font-semibold text-gray-700">Arrosage</TableHead>
              <TableHead className="font-semibold text-gray-700">Temp. Min</TableHead>
              <TableHead className="font-semibold text-gray-700">Temp. Max</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlants.map((plant, index) => (
              <TableRow
                key={plant.plant_id}
                className={`hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-200 ${
                  index % 2 === 0 ? "bg-gray-50/30" : "bg-white"
                }`}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {plant.photo_url && 
                       plant.photo_url !== "/placeholder.svg?height=200&width=200&text=" + encodeURIComponent(plant.plant_name?.substring(0, 8)) ? (
                        <img
  src={`http://localhost:8080${plant.photo_url}`}
  alt={plant.plant_name}
  className="w-10 h-10 object-cover rounded-lg"
/>
                      ) : (
                        <Leaf className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{plant.plant_name}</p>
                      <p className="text-sm text-gray-500">ID: {plant.plant_id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {plant.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">{plant.light_requirement || "Non spécifié"}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">{plant.watering_frequency || "Non spécifié"}</span>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-blue-600">
                    {plant.temperature_min ? `${plant.temperature_min}°C` : "N/A"}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-red-600">
                    {plant.temperature_max ? `${plant.temperature_max}°C` : "N/A"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 rounded-lg transition-all duration-200"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg"
                    >
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedPlant(plant)
                          setIsSheetOpen(true)
                        }}
                        className="hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 cursor-pointer"
                      >
                        <Eye className="mr-2 h-4 w-4 text-green-600" />
                        <span className="text-green-700">Voir détails</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 cursor-pointer">
                        <Edit className="mr-2 h-4 w-4 text-blue-600" />
                        <span className="text-blue-700">Modifier</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 cursor-pointer"
                        onClick={() => handleDeletePlant(plant)}
                      >
                        <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                        <span className="text-red-700">Supprimer</span>
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

          {/* Dialog de confirmation de suppression */}
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action ne peut pas être annulée. La plante "{plantToDelete?.plant_name}" sera définitivement
                  supprimée de votre catalogue.
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
      </div>
    </div>
  )
}
