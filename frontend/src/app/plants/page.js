/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Leaf,
  Search,
  Filter,
  Heart,
  Sun,
  Droplets,
  Thermometer,
  Eye,
  Star,
  Grid3X3,
  List,
  ArrowRight,
  Info,
  ShoppingCart,
  X,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  TrendingUp,
  Award,
  Zap,
  Shield,
  Sparkles,
  RefreshCw,
  Bookmark,
  ContrastIcon as Compare,
  SlidersHorizontal,
  Ruler,
  Palette,
  Wind,
  Home,
  TreePine,
  FlowerIcon,
} from "lucide-react"

// Données mockées étendues
const mockPlants = [
  {
    plant_id: 1,
    plant_name: "Monstera Deliciosa",
    description: "Plante tropicale aux feuilles perforées, parfaite pour l'intérieur",
    type: "Intérieur",
    light_requirement: "Lumière indirecte",
    watering_frequency: "1-2 fois/semaine",
    temperature_min: 18,
    temperature_max: 27,
    photo_url: "/p1.jpg",
    price: 120,
    stock: 15,
    rating: 4.8,
    favorites: 45,
    difficulty: "Facile",
    size: "Grande",
    growth_speed: "Rapide",
    air_purifying: true,
    pet_safe: false,
    flowering: false,
    origin: "Amérique Centrale",
    humidity: "Élevée",
    fertilizer: "Mensuel",
    repotting: "2-3 ans",
    propagation: "Bouturage",
    season: "Toute l'année",
    color: "Vert",
    style: "Tropical",
    room: ["Salon", "Bureau"],
    care_level: 3,
    water_needs: "Modéré",
    sun_tolerance: "Ombre partielle",
    drought_tolerance: false,
    cold_tolerance: false,
  },
  {
    plant_id: 2,
    plant_name: "Aloe Vera",
    description: "Plante succulente aux propriétés médicinales reconnues",
    type: "Médicinale",
    light_requirement: "Lumière directe",
    watering_frequency: "1 fois/2 semaines",
    temperature_min: 15,
    temperature_max: 30,
    photo_url: "/p2.jpg",
    price: 45,
    stock: 28,
    rating: 4.9,
    favorites: 67,
    difficulty: "Très facile",
    size: "Moyenne",
    growth_speed: "Lente",
    air_purifying: true,
    pet_safe: false,
    flowering: true,
    origin: "Afrique",
    humidity: "Faible",
    fertilizer: "Rare",
    repotting: "3-4 ans",
    propagation: "Rejets",
    season: "Printemps-Été",
    color: "Vert-Gris",
    style: "Moderne",
    room: ["Cuisine", "Salle de bain"],
    care_level: 1,
    water_needs: "Faible",
    sun_tolerance: "Plein soleil",
    drought_tolerance: true,
    cold_tolerance: false,
  },
  {
    plant_id: 3,
    plant_name: "Ficus Lyrata",
    description: "Arbre d'intérieur élégant aux grandes feuilles en forme de violon",
    type: "Intérieur",
    light_requirement: "Lumière vive indirecte",
    watering_frequency: "1 fois/semaine",
    temperature_min: 16,
    temperature_max: 24,
    photo_url: "/p3.jpg",
    price: 180,
    stock: 8,
    rating: 4.6,
    favorites: 32,
    difficulty: "Modéré",
    size: "Très grande",
    growth_speed: "Modérée",
    air_purifying: true,
    pet_safe: false,
    flowering: false,
    origin: "Afrique de l'Ouest",
    humidity: "Modérée",
    fertilizer: "Bi-mensuel",
    repotting: "2 ans",
    propagation: "Bouturage",
    season: "Printemps-Été",
    color: "Vert foncé",
    style: "Élégant",
    room: ["Salon", "Entrée"],
    care_level: 4,
    water_needs: "Modéré",
    sun_tolerance: "Lumière filtrée",
    drought_tolerance: false,
    cold_tolerance: false,
  },
  {
    plant_id: 4,
    plant_name: "Lavande",
    description: "Plante aromatique méditerranéenne aux fleurs parfumées",
    type: "Extérieur",
    light_requirement: "Plein soleil",
    watering_frequency: "2-3 fois/semaine",
    temperature_min: 10,
    temperature_max: 35,
    photo_url: "/p4.jpg",
    price: 35,
    stock: 42,
    rating: 4.7,
    favorites: 89,
    difficulty: "Facile",
    size: "Moyenne",
    growth_speed: "Modérée",
    air_purifying: false,
    pet_safe: true,
    flowering: true,
    origin: "Méditerranée",
    humidity: "Faible",
    fertilizer: "Rare",
    repotting: "3-4 ans",
    propagation: "Bouturage",
    season: "Été",
    color: "Violet",
    style: "Méditerranéen",
    room: ["Jardin", "Terrasse"],
    care_level: 2,
    water_needs: "Faible",
    sun_tolerance: "Plein soleil",
    drought_tolerance: true,
    cold_tolerance: true,
  },
  {
    plant_id: 5,
    plant_name: "Cactus Barrel",
    description: "Cactus robuste en forme de tonneau, très facile d'entretien",
    type: "Cactus",
    light_requirement: "Lumière directe",
    watering_frequency: "1 fois/mois",
    temperature_min: 12,
    temperature_max: 40,
    photo_url: "/p5.jpg",
    price: 25,
    stock: 35,
    rating: 4.5,
    favorites: 23,
    difficulty: "Très facile",
    size: "Petite",
    growth_speed: "Très lente",
    air_purifying: false,
    pet_safe: false,
    flowering: true,
    origin: "Mexique",
    humidity: "Très faible",
    fertilizer: "Rare",
    repotting: "5+ ans",
    propagation: "Graines",
    season: "Printemps",
    color: "Vert-Bleu",
    style: "Désertique",
    room: ["Bureau", "Chambre"],
    care_level: 1,
    water_needs: "Très faible",
    sun_tolerance: "Plein soleil",
    drought_tolerance: true,
    cold_tolerance: false,
  },
  {
    plant_id: 6,
    plant_name: "Basilic",
    description: "Herbe aromatique indispensable en cuisine",
    type: "Aromatique",
    light_requirement: "Lumière directe",
    watering_frequency: "Tous les 2 jours",
    temperature_min: 15,
    temperature_max: 28,
    photo_url: "/p1.jpg",
    price: 15,
    stock: 60,
    rating: 4.4,
    favorites: 78,
    difficulty: "Facile",
    size: "Petite",
    growth_speed: "Rapide",
    air_purifying: false,
    pet_safe: true,
    flowering: true,
    origin: "Asie",
    humidity: "Modérée",
    fertilizer: "Hebdomadaire",
    repotting: "1 an",
    propagation: "Graines",
    season: "Printemps-Été",
    color: "Vert vif",
    style: "Culinaire",
    room: ["Cuisine", "Jardin"],
    care_level: 2,
    water_needs: "Élevé",
    sun_tolerance: "Soleil partiel",
    drought_tolerance: false,
    cold_tolerance: false,
  },
  {
    plant_id: 7,
    plant_name: "Pothos",
    description: "Plante grimpante très résistante, idéale débutants",
    type: "Intérieur",
    light_requirement: "Lumière faible à moyenne",
    watering_frequency: "1 fois/semaine",
    temperature_min: 17,
    temperature_max: 30,
    photo_url: "/p2.jpg",
    price: 30,
    stock: 25,
    rating: 4.9,
    favorites: 156,
    difficulty: "Très facile",
    size: "Moyenne",
    growth_speed: "Rapide",
    air_purifying: true,
    pet_safe: false,
    flowering: false,
    origin: "Asie du Sud-Est",
    humidity: "Modérée",
    fertilizer: "Mensuel",
    repotting: "2 ans",
    propagation: "Bouturage",
    season: "Toute l'année",
    color: "Vert panaché",
    style: "Grimpant",
    room: ["Salon", "Chambre", "Bureau"],
    care_level: 1,
    water_needs: "Modéré",
    sun_tolerance: "Ombre",
    drought_tolerance: true,
    cold_tolerance: false,
  },
  {
    plant_id: 8,
    plant_name: "Rosier",
    description: "Arbuste à fleurs classique pour jardins romantiques",
    type: "Extérieur",
    light_requirement: "Plein soleil",
    watering_frequency: "3-4 fois/semaine",
    temperature_min: 5,
    temperature_max: 30,
    photo_url: "/p3.jpg",
    price: 65,
    stock: 18,
    rating: 4.3,
    favorites: 94,
    difficulty: "Modéré",
    size: "Grande",
    growth_speed: "Modérée",
    air_purifying: false,
    pet_safe: false,
    flowering: true,
    origin: "Asie",
    humidity: "Modérée",
    fertilizer: "Bi-mensuel",
    repotting: "3 ans",
    propagation: "Bouturage",
    season: "Printemps-Automne",
    color: "Rouge",
    style: "Romantique",
    room: ["Jardin", "Terrasse"],
    care_level: 4,
    water_needs: "Élevé",
    sun_tolerance: "Plein soleil",
    drought_tolerance: false,
    cold_tolerance: true,
  },
]

// Options de filtrage étendues
const filterOptions = {
  types: ["Tous", "Intérieur", "Extérieur", "Médicinale", "Cactus", "Aromatique"],
  lightRequirements: [
    "Tous",
    "Lumière directe",
    "Lumière indirecte",
    "Lumière vive indirecte",
    "Lumière faible à moyenne",
    "Plein soleil",
  ],
  difficulties: ["Tous", "Très facile", "Facile", "Modéré", "Difficile"],
  sizes: ["Tous", "Petite", "Moyenne", "Grande", "Très grande"],
  growthSpeeds: ["Tous", "Très lente", "Lente", "Modérée", "Rapide"],
  colors: ["Tous", "Vert", "Vert foncé", "Vert vif", "Vert panaché", "Vert-Gris", "Vert-Bleu", "Violet", "Rouge"],
  styles: [
    "Tous",
    "Tropical",
    "Moderne",
    "Élégant",
    "Méditerranéen",
    "Désertique",
    "Culinaire",
    "Grimpant",
    "Romantique",
  ],
  rooms: ["Tous", "Salon", "Chambre", "Bureau", "Cuisine", "Salle de bain", "Entrée", "Jardin", "Terrasse"],
  waterNeeds: ["Tous", "Très faible", "Faible", "Modéré", "Élevé"],
  sunTolerance: ["Tous", "Ombre", "Ombre partielle", "Lumière filtrée", "Soleil partiel", "Plein soleil"],
}

// Filtres prédéfinis populaires
const presetFilters = [
  {
    name: "Débutant",
    icon: Sparkles,
    filters: { difficulty: "Très facile", care_level: [1, 2] },
    color: "bg-green-500",
  },
  {
    name: "Purificateur d'air",
    icon: Wind,
    filters: { air_purifying: true },
    color: "bg-blue-500",
  },
  {
    name: "Animaux domestiques",
    icon: Shield,
    filters: { pet_safe: true },
    color: "bg-purple-500",
  },
  {
    name: "Peu d'entretien",
    icon: Clock,
    filters: { water_needs: ["Très faible", "Faible"], care_level: [1, 2] },
    color: "bg-orange-500",
  },
  {
    name: "Floraison",
    icon: FlowerIcon,
    filters: { flowering: true },
    color: "bg-pink-500",
  },
  {
    name: "Résistant sécheresse",
    icon: Sun,
    filters: { drought_tolerance: true },
    color: "bg-yellow-500",
  },
]

export default function PlantsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    type: "Tous",
    light_requirement: "Tous",
    difficulty: "Tous",
    size: "Tous",
    growth_speed: "Tous",
    color: "Tous",
    style: "Tous",
    room: "Tous",
    water_needs: "Tous",
    sun_tolerance: "Tous",
    price_min: 0,
    price_max: 500,
    temperature_min: 0,
    temperature_max: 50,
    care_level: [1, 2, 3, 4, 5],
    air_purifying: null,
    pet_safe: null,
    flowering: null,
    drought_tolerance: null,
    cold_tolerance: null,
  })
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("name")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    characteristics: false,
    care: false,
    environment: false,
    special: false,
  })
  const [savedFilters, setSavedFilters] = useState([])
  const [compareList, setCompareList] = useState([])

  // Filtrage avancé des plantes
  const filteredPlants = mockPlants.filter((plant) => {
    const matchesSearch =
      plant.plant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.origin.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filters.type === "Tous" || plant.type === filters.type
    const matchesLight = filters.light_requirement === "Tous" || plant.light_requirement === filters.light_requirement
    const matchesDifficulty = filters.difficulty === "Tous" || plant.difficulty === filters.difficulty
    const matchesSize = filters.size === "Tous" || plant.size === filters.size
    const matchesGrowthSpeed = filters.growth_speed === "Tous" || plant.growth_speed === filters.growth_speed
    const matchesColor = filters.color === "Tous" || plant.color === filters.color
    const matchesStyle = filters.style === "Tous" || plant.style === filters.style
    const matchesRoom = filters.room === "Tous" || plant.room.includes(filters.room)
    const matchesWaterNeeds = filters.water_needs === "Tous" || plant.water_needs === filters.water_needs
    const matchesSunTolerance = filters.sun_tolerance === "Tous" || plant.sun_tolerance === filters.sun_tolerance

    const matchesPrice = plant.price >= filters.price_min && plant.price <= filters.price_max
    const matchesTemperature =
      plant.temperature_min >= filters.temperature_min && plant.temperature_max <= filters.temperature_max
    const matchesCareLevel = filters.care_level.includes(plant.care_level)

    const matchesAirPurifying = filters.air_purifying === null || plant.air_purifying === filters.air_purifying
    const matchesPetSafe = filters.pet_safe === null || plant.pet_safe === filters.pet_safe
    const matchesFlowering = filters.flowering === null || plant.flowering === filters.flowering
    const matchesDroughtTolerance =
      filters.drought_tolerance === null || plant.drought_tolerance === filters.drought_tolerance
    const matchesColdTolerance = filters.cold_tolerance === null || plant.cold_tolerance === filters.cold_tolerance

    return (
      matchesSearch &&
      matchesType &&
      matchesLight &&
      matchesDifficulty &&
      matchesSize &&
      matchesGrowthSpeed &&
      matchesColor &&
      matchesStyle &&
      matchesRoom &&
      matchesWaterNeeds &&
      matchesSunTolerance &&
      matchesPrice &&
      matchesTemperature &&
      matchesCareLevel &&
      matchesAirPurifying &&
      matchesPetSafe &&
      matchesFlowering &&
      matchesDroughtTolerance &&
      matchesColdTolerance
    )
  })

  // Tri des plantes
  const sortedPlants = [...filteredPlants].sort((a, b) => {
    switch (sortBy) {
      case "price_asc":
        return a.price - b.price
      case "price_desc":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "popularity":
        return b.favorites - a.favorites
      case "difficulty":
        const difficultyOrder = { "Très facile": 1, Facile: 2, Modéré: 3, Difficile: 4 }
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      case "size":
        const sizeOrder = { Petite: 1, Moyenne: 2, Grande: 3, "Très grande": 4 }
        return sizeOrder[a.size] - sizeOrder[b.size]
      default:
        return a.plant_name.localeCompare(b.plant_name)
    }
  })

  // Appliquer un filtre prédéfini
  const applyPresetFilter = (preset) => {
    setFilters((prev) => ({ ...prev, ...preset.filters }))
  }

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setFilters({
      type: "Tous",
      light_requirement: "Tous",
      difficulty: "Tous",
      size: "Tous",
      growth_speed: "Tous",
      color: "Tous",
      style: "Tous",
      room: "Tous",
      water_needs: "Tous",
      sun_tolerance: "Tous",
      price_min: 0,
      price_max: 500,
      temperature_min: 0,
      temperature_max: 50,
      care_level: [1, 2, 3, 4, 5],
      air_purifying: null,
      pet_safe: null,
      flowering: null,
      drought_tolerance: null,
      cold_tolerance: null,
    })
    setSearchTerm("")
  }

  // Compter les filtres actifs
  const activeFiltersCount = Object.values(filters).filter((value) => {
    if (Array.isArray(value)) return value.length !== 5 // care_level par défaut
    if (typeof value === "boolean") return value !== null
    if (typeof value === "number") return value !== 0 && value !== 500 && value !== 50
    return value !== "Tous" && value !== null
  }).length

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section avec recherche avancée */}
      <section className="relative w-full py-12 bg-gradient-to-br from-green-50 via-emerald-100 to-green-200">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-emerald-400 rotate-45 opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-green-700">
              <Leaf className="h-4 w-4" />
              {mockPlants.length} plantes • {filteredPlants.length} résultats
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-green-900 leading-tight">
              Trouvez votre
              <span className="block text-emerald-600">Plante parfaite</span>
            </h1>
            <p className="text-lg text-green-800 max-w-2xl mx-auto">
              Système de filtrage intelligent pour découvrir la plante idéale selon vos besoins
            </p>

            {/* Barre de recherche avancée */}
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher par nom, description, origine..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-16 py-3 rounded-2xl border-2 border-green-300 focus:border-green-500 focus:ring-green-500 shadow-lg text-base"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Filtres prédéfinis */}
            <div className="flex flex-wrap justify-center gap-3">
              {presetFilters.map((preset, index) => {
                const IconComponent = preset.icon
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPresetFilter(preset)}
                    className={`${preset.color} text-white border-0 hover:opacity-90 transition-all duration-300 hover:scale-105`}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {preset.name}
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-1">
        {/* Sidebar de filtres avancés */}
        <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto max-h-[calc(100vh-4rem)] sticky top-0">
          <div className="p-6">
            {/* Header des filtres */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">Filtres avancés</h2>
                {activeFiltersCount > 0 && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">{activeFiltersCount}</span>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={resetFilters} className="text-gray-500 hover:text-gray-700">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            {/* Section Filtres de base */}
            <div className="space-y-6">
              <FilterSection
                title="Filtres de base"
                icon={Filter}
                isExpanded={expandedSections.basic}
                onToggle={() => toggleSection("basic")}
              >
                <div className="space-y-4">
                  <FilterSelect
                    label="Type de plante"
                    value={filters.type}
                    onChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}
                    options={filterOptions.types}
                    icon={TreePine}
                  />
                  <FilterSelect
                    label="Luminosité"
                    value={filters.light_requirement}
                    onChange={(value) => setFilters((prev) => ({ ...prev, light_requirement: value }))}
                    options={filterOptions.lightRequirements}
                    icon={Sun}
                  />
                  <FilterSelect
                    label="Difficulté"
                    value={filters.difficulty}
                    onChange={(value) => setFilters((prev) => ({ ...prev, difficulty: value }))}
                    options={filterOptions.difficulties}
                    icon={Award}
                  />
                  <FilterSelect
                    label="Taille"
                    value={filters.size}
                    onChange={(value) => setFilters((prev) => ({ ...prev, size: value }))}
                    options={filterOptions.sizes}
                    icon={Ruler}
                  />
                </div>
              </FilterSection>

              {/* Section Caractéristiques */}
              <FilterSection
                title="Caractéristiques"
                icon={Sparkles}
                isExpanded={expandedSections.characteristics}
                onToggle={() => toggleSection("characteristics")}
              >
                <div className="space-y-4">
                  <FilterSelect
                    label="Vitesse de croissance"
                    value={filters.growth_speed}
                    onChange={(value) => setFilters((prev) => ({ ...prev, growth_speed: value }))}
                    options={filterOptions.growthSpeeds}
                    icon={TrendingUp}
                  />
                  <FilterSelect
                    label="Couleur"
                    value={filters.color}
                    onChange={(value) => setFilters((prev) => ({ ...prev, color: value }))}
                    options={filterOptions.colors}
                    icon={Palette}
                  />
                  <FilterSelect
                    label="Style"
                    value={filters.style}
                    onChange={(value) => setFilters((prev) => ({ ...prev, style: value }))}
                    options={filterOptions.styles}
                    icon={Sparkles}
                  />
                  <FilterSelect
                    label="Pièce idéale"
                    value={filters.room}
                    onChange={(value) => setFilters((prev) => ({ ...prev, room: value }))}
                    options={filterOptions.rooms}
                    icon={Home}
                  />
                </div>
              </FilterSection>

              {/* Section Entretien */}
              <FilterSection
                title="Entretien"
                icon={Droplets}
                isExpanded={expandedSections.care}
                onToggle={() => toggleSection("care")}
              >
                <div className="space-y-4">
                  <FilterSelect
                    label="Besoins en eau"
                    value={filters.water_needs}
                    onChange={(value) => setFilters((prev) => ({ ...prev, water_needs: value }))}
                    options={filterOptions.waterNeeds}
                    icon={Droplets}
                  />
                  <FilterSelect
                    label="Tolérance au soleil"
                    value={filters.sun_tolerance}
                    onChange={(value) => setFilters((prev) => ({ ...prev, sun_tolerance: value }))}
                    options={filterOptions.sunTolerance}
                    icon={Sun}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Niveau de soin</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <Button
                          key={level}
                          variant={filters.care_level.includes(level) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            const newLevels = filters.care_level.includes(level)
                              ? filters.care_level.filter((l) => l !== level)
                              : [...filters.care_level, level]
                            setFilters((prev) => ({ ...prev, care_level: newLevels }))
                          }}
                          className="w-8 h-8 p-0"
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </FilterSection>

              {/* Section Environnement */}
              <FilterSection
                title="Environnement"
                icon={Thermometer}
                isExpanded={expandedSections.environment}
                onToggle={() => toggleSection("environment")}
              >
                <div className="space-y-4">
                  <RangeFilter
                    label="Prix (DH)"
                    min={filters.price_min}
                    max={filters.price_max}
                    onChange={(min, max) => setFilters((prev) => ({ ...prev, price_min: min, price_max: max }))}
                    minLimit={0}
                    maxLimit={500}
                    step={5}
                    icon={DollarSign}
                  />
                  <RangeFilter
                    label="Température (°C)"
                    min={filters.temperature_min}
                    max={filters.temperature_max}
                    onChange={(min, max) =>
                      setFilters((prev) => ({ ...prev, temperature_min: min, temperature_max: max }))
                    }
                    minLimit={0}
                    maxLimit={50}
                    step={1}
                    icon={Thermometer}
                  />
                </div>
              </FilterSection>

              {/* Section Propriétés spéciales */}
              <FilterSection
                title="Propriétés spéciales"
                icon={Shield}
                isExpanded={expandedSections.special}
                onToggle={() => toggleSection("special")}
              >
                <div className="space-y-3">
                  <BooleanFilter
                    label="Purifie l'air"
                    value={filters.air_purifying}
                    onChange={(value) => setFilters((prev) => ({ ...prev, air_purifying: value }))}
                    icon={Wind}
                  />
                  <BooleanFilter
                    label="Sans danger pour animaux"
                    value={filters.pet_safe}
                    onChange={(value) => setFilters((prev) => ({ ...prev, pet_safe: value }))}
                    icon={Shield}
                  />
                  <BooleanFilter
                    label="Floraison"
                    value={filters.flowering}
                    onChange={(value) => setFilters((prev) => ({ ...prev, flowering: value }))}
                    icon={FlowerIcon}
                  />
                  <BooleanFilter
                    label="Résistant à la sécheresse"
                    value={filters.drought_tolerance}
                    onChange={(value) => setFilters((prev) => ({ ...prev, drought_tolerance: value }))}
                    icon={Sun}
                  />
                  <BooleanFilter
                    label="Résistant au froid"
                    value={filters.cold_tolerance}
                    onChange={(value) => setFilters((prev) => ({ ...prev, cold_tolerance: value }))}
                    icon={Thermometer}
                  />
                </div>
              </FilterSection>
            </div>

            {/* Actions des filtres */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <Button onClick={resetFilters} variant="outline" className="w-full bg-transparent">
                <RefreshCw className="h-4 w-4 mr-2" />
                Réinitialiser
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Bookmark className="h-4 w-4 mr-2" />
                Sauvegarder ces filtres
              </Button>
            </div>
          </div>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1">
          {/* Barre de contrôles */}
          <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-30">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 font-medium">
                  {sortedPlants.length} plante{sortedPlants.length > 1 ? "s" : ""} trouvée
                  {sortedPlants.length > 1 ? "s" : ""}
                </span>
                {activeFiltersCount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{activeFiltersCount} filtre(s) actif(s)</span>
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs">
                      Effacer tout
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Tri */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="name">Nom A-Z</option>
                  <option value="price_asc">Prix croissant</option>
                  <option value="price_desc">Prix décroissant</option>
                  <option value="rating">Mieux notées</option>
                  <option value="popularity">Plus populaires</option>
                  <option value="difficulty">Plus faciles</option>
                  <option value="size">Taille croissante</option>
                </select>

                {/* Mode d'affichage */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Comparaison */}
                {compareList.length > 0 && (
                  <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 bg-transparent">
                    <Compare className="h-4 w-4 mr-2" />
                    Comparer ({compareList.length})
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Grille/Liste des plantes */}
          <div className="p-6">
            {sortedPlants.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune plante trouvée</h3>
                <p className="text-gray-600 mb-4">Essayez de modifier vos critères de recherche</p>
                <Button onClick={resetFilters} className="bg-green-600 hover:bg-green-700">
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {sortedPlants.map((plant) => (
                  <PlantCard
                    key={plant.plant_id}
                    plant={plant}
                    viewMode={viewMode}
                    compareList={compareList}
                    setCompareList={setCompareList}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Section CTA */}
      <section className="w-full py-12 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Besoin d'aide personnalisée ?</h2>
          <p className="text-lg text-green-100 mb-6 max-w-2xl mx-auto">
            Notre IA peut analyser vos préférences et vous recommander les plantes parfaites
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/ai-assistant">
              <Button className="inline-flex h-12 items-center justify-center rounded-2xl bg-white px-8 text-base font-semibold text-green-600 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                <Zap className="mr-2 h-5 w-5" />
                Conseils IA personnalisés
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="inline-flex h-12 items-center justify-center rounded-2xl border-2 border-white bg-transparent px-8 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-white hover:text-green-600 hover:shadow-xl"
              >
                <Info className="mr-2 h-5 w-5" />
                Parler à un expert
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// Composants de filtres
function FilterSection({ title, icon: Icon, isExpanded, onToggle, children }) {
  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-green-600" />
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {isExpanded && <div className="p-4 pt-0 border-t border-gray-100">{children}</div>}
    </div>
  )
}

function FilterSelect({ label, value, onChange, options, icon: Icon }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <Icon className="h-4 w-4 text-green-600" />
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-green-500 focus:ring-green-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function RangeFilter({ label, min, max, onChange, minLimit, maxLimit, step, icon: Icon }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <Icon className="h-4 w-4 text-green-600" />
        {label}
      </label>
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="number"
            value={min}
            onChange={(e) => onChange(Number(e.target.value), max)}
            min={minLimit}
            max={maxLimit}
            step={step}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-green-500 focus:ring-green-500"
            placeholder="Min"
          />
          <input
            type="number"
            value={max}
            onChange={(e) => onChange(min, Number(e.target.value))}
            min={minLimit}
            max={maxLimit}
            step={step}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-green-500 focus:ring-green-500"
            placeholder="Max"
          />
        </div>
        <div className="text-xs text-gray-500 text-center">
          {min} - {max} {label.includes("Prix") ? "DH" : "°C"}
        </div>
      </div>
    </div>
  )
}

function BooleanFilter({ label, value, onChange, icon: Icon }) {
  return (
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Icon className="h-4 w-4 text-green-600" />
        {label}
      </label>
      <div className="flex gap-1">
        <Button
          variant={value === true ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(value === true ? null : true)}
          className="text-xs px-2 py-1 h-7"
        >
          Oui
        </Button>
        <Button
          variant={value === false ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(value === false ? null : false)}
          className="text-xs px-2 py-1 h-7"
        >
          Non
        </Button>
        <Button
          variant={value === null ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(null)}
          className="text-xs px-2 py-1 h-7"
        >
          Tous
        </Button>
      </div>
    </div>
  )
}

// Composant PlantCard amélioré
function PlantCard({ plant, viewMode, compareList, setCompareList }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const isInCompare = compareList.includes(plant.plant_id)

  const toggleCompare = () => {
    if (isInCompare) {
      setCompareList(compareList.filter((id) => id !== plant.plant_id))
    } else if (compareList.length < 4) {
      setCompareList([...compareList, plant.plant_id])
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Très facile":
        return "bg-green-100 text-green-700"
      case "Facile":
        return "bg-blue-100 text-blue-700"
      case "Modéré":
        return "bg-yellow-100 text-yellow-700"
      case "Difficile":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  if (viewMode === "list") {
    return (
      <Card className="p-4 bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="flex gap-4 items-center">
          <div className="relative flex-shrink-0">
            <Image
              src={plant.photo_url || "/placeholder.svg?height=100&width=100"}
              alt={plant.plant_name}
              width={100}
              height={100}
              className="rounded-lg object-cover"
            />
            {plant.stock < 10 && (
              <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Stock faible
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 truncate">{plant.plant_name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{plant.description}</p>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <div className="text-xl font-bold text-green-600">{plant.price} DH</div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {plant.rating}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Sun className="h-4 w-4 text-yellow-500" />
                {plant.light_requirement}
              </div>
              <div className="flex items-center gap-1">
                <Droplets className="h-4 w-4 text-blue-500" />
                {plant.watering_frequency}
              </div>
              <div className="flex items-center gap-1">
                <Thermometer className="h-4 w-4 text-red-500" />
                {plant.temperature_min}°-{plant.temperature_max}°C
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{plant.type}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(plant.difficulty)}`}>
                  {plant.difficulty}
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{plant.size}</span>
                {plant.air_purifying && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Purifie l'air</span>
                )}
                {plant.pet_safe && (
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Pet-safe</span>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsFavorite(!isFavorite)} className="p-2">
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleCompare}
                  className={`p-2 ${isInCompare ? "bg-blue-100 text-blue-600" : ""}`}
                  disabled={!isInCompare && compareList.length >= 4}
                >
                  <Compare className="h-4 w-4" />
                </Button>
                <Link href={`/plants/${plant.plant_id}`}>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Eye className="h-4 w-4 mr-1" />
                    Voir
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Ajouter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="relative">
        <Image
          src={plant.photo_url || "/placeholder.svg?height=250&width=300"}
          alt={plant.plant_name}
          width={300}
          height={250}
          className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">{plant.type}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(plant.difficulty)}`}>
            {plant.difficulty}
          </span>
          {plant.stock < 10 && (
            <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">Stock faible</span>
          )}
        </div>

        {/* Actions rapides */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-8 h-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCompare}
            className={`w-8 h-8 p-0 backdrop-blur-sm hover:bg-white ${
              isInCompare ? "bg-blue-100 text-blue-600" : "bg-white/80 text-gray-600"
            }`}
            disabled={!isInCompare && compareList.length >= 4}
          >
            <Compare className="h-4 w-4" />
          </Button>
          <Link href={`/plants/${plant.plant_id}`}>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white">
              <Eye className="h-4 w-4 text-gray-600" />
            </Button>
          </Link>
        </div>

        {/* Prix en overlay */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
          <div className="text-lg font-bold text-green-600">{plant.price} DH</div>
        </div>

        {/* Icônes de propriétés spéciales */}
        <div className="absolute bottom-3 left-3 flex gap-1">
          {plant.air_purifying && (
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Wind className="h-3 w-3 text-white" />
            </div>
          )}
          {plant.pet_safe && (
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
              <Shield className="h-3 w-3 text-white" />
            </div>
          )}
          {plant.flowering && (
            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
              <FlowerIcon className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{plant.plant_name}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {plant.rating}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{plant.description}</p>

        {/* Caractéristiques principales */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Sun className="h-4 w-4 text-yellow-500" />
            <span className="truncate">{plant.light_requirement}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span>{plant.watering_frequency}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Ruler className="h-4 w-4 text-gray-500" />
            <span>{plant.size}</span>
          </div>
        </div>

        {/* Tags supplémentaires */}
        <div className="flex flex-wrap gap-1 mb-4">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{plant.style}</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{plant.growth_speed}</span>
          {plant.room.slice(0, 2).map((room, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {room}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/plants/${plant.plant_id}`} className="flex-1">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-sm">
              <Eye className="h-4 w-4 mr-1" />
              Détails
            </Button>
          </Link>
          <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>

        {/* Infos supplémentaires */}
        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <span>{plant.stock} en stock</span>
          <div className="flex items-center gap-1">
            <Heart className="h-3 w-3" />
            {plant.favorites}
          </div>
        </div>
      </div>
    </Card>
  )
}
