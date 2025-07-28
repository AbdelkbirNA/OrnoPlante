/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState,useEffect } from "react"
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
  Grid3X3,
  List,
  ArrowRight,
  Info,
  X,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Bookmark,
  ContrastIcon as Compare,
  SlidersHorizontal,
  TreePine,
  Zap,
} from "lucide-react"

// Simplified mock data based on the provided Prisma Plant model


// Filter options adapted to the new data structure
const filterOptions = {
  types: ["Tous", "Intérieur", "Extérieur", "Cactus", "Médicinale", "Décoratives"],
  lightRequirements: [
    "Tous",
    "Lumière directe",
    "Lumière indirecte",
    "Lumière vive indirecte",
    "Lumière faible à moyenne",
    "Plein soleil",
  ],
  wateringFrequencies: [
    "Tous",
    "1-2 fois/semaine",
    "1 fois/2 semaines",
    "1 fois/semaine",
    "2-3 fois/semaine",
    "1 fois/mois",
    "Tous les 2 jours",
  ],
}

// Preset filters removed as they are not needed for a presentation site

export default function PlantsPage() {
    const [plants, setPlants] = useState([])

  async function fetchPlants() {
    try {
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
    }
  }

  useEffect(() => {
    fetchPlants()
  }, [])

  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    type: "Tous",
    light_requirement: "Tous",
    watering_frequency: "Tous",
    temperature_min: 0,
    temperature_max: 50,
  })
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("name")
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    environment: false,
  })
  const [compareList, setCompareList] = useState([])

  // Filtrage avancé des plantes
  const filteredPlants = plants.filter((plant) => {
    const matchesSearch =
      plant.plant_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.description?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filters.type === "Tous" || plant.type === filters.type
    const matchesLight = filters.light_requirement === "Tous" || plant.light_requirement === filters.light_requirement
    const matchesWatering =
      filters.watering_frequency === "Tous" || plant.watering_frequency === filters.watering_frequency

    const matchesTemperature =
      (plant.temperature_min === undefined || plant.temperature_min >= filters.temperature_min) &&
      (plant.temperature_max === undefined || plant.temperature_max <= filters.temperature_max)

    return matchesSearch && matchesType && matchesLight && matchesWatering && matchesTemperature
  })

  // Tri des plantes
  const sortedPlants = [...filteredPlants].sort((a, b) => {
    switch (sortBy) {
      case "temperature_min_asc":
        return (a.temperature_min || 0) - (b.temperature_min || 0)
      case "temperature_min_desc":
        return (b.temperature_min || 0) - (a.temperature_min || 0)
      default:
        return (a.plant_name || "").localeCompare(b.plant_name || "")
    }
  })

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setFilters({
      type: "Tous",
      light_requirement: "Tous",
      watering_frequency: "Tous",
      temperature_min: 0,
      temperature_max: 50,
    })
    setSearchTerm("")
  }

  // Compter les filtres actifs
  const activeFiltersCount = Object.values(filters).filter((value) => {
    if (typeof value === "number") return value !== 0 && value !== 50
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
              {plants.length} plantes • {filteredPlants.length} résultats
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
                  placeholder="Rechercher par nom, description..."
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

            {/* Preset filters section removed */}
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
                    label="Fréquence d'arrosage"
                    value={filters.watering_frequency}
                    onChange={(value) => setFilters((prev) => ({ ...prev, watering_frequency: value }))}
                    options={filterOptions.wateringFrequencies}
                    icon={Droplets}
                  />
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
            </div>

            {/* Actions des filtres */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <Button onClick={resetFilters} variant="outline" className="w-full bg-transparent">
                <RefreshCw className="h-4 w-4 mr-2" />
                Réinitialiser
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
                  <option value="temperature_min_asc">Température Min Croissante</option>
                  <option value="temperature_min_desc">Température Min Décroissante</option>
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
      <section className="w-full py-12 bg-gradient-to-r from-green-700 to-teal-600 text-white">
  <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Rejoignez notre communauté verte !</h2>
    <p className="text-lg text-green-200 mb-6 max-w-2xl mx-auto">
      Partagez vos expériences, échangez vos astuces et découvrez les plantes qui feront pousser votre passion.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-6">
      <Link href="/community-forum">
        <Button className="inline-flex h-12 items-center justify-center rounded-3xl bg-white px-8 text-base font-semibold text-green-700 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <Leaf className="mr-2 h-5 w-5" />
          Accéder au forum
        </Button>
      </Link>
      <Link href="/submit-tips">
        <Button
          variant="outline"
          className="inline-flex h-12 items-center justify-center rounded-3xl border-2 border-white bg-transparent px-8 text-base font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-white hover:text-green-700 hover:shadow-2xl"
        >
          <Heart className="mr-2 h-5 w-5" />
          Partagez vos astuces
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

  if (viewMode === "list") {
    return (
      <Card className="p-4 bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="flex gap-4 items-center">
          <div className="relative flex-shrink-0">
            <Image
              src={plant.photo_url || "/placeholder.svg?height=100&width=100"}
              alt={plant.plant_name || "Plant image"}
              width={100}
              height={100}
              className="rounded-lg object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 truncate">{plant.plant_name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{plant.description}</p>
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
                {/* Add to cart button removed */}
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
        <img
          src={`${process.env.NEXT_PUBLIC_API}${plant.photo_url}`}
          alt={plant.plant_name}
          width={250}
          height={100}
          className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-500"
         />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">{plant.type}</span>
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
        {/* Price in overlay removed */}
        {/* Special properties icons removed */}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{plant.plant_name}</h3>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{plant.description}</p>
        {/* Caractéristiques principales */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Sun className="h-4 w-4 text-yellow-500" />
            <span className="truncate">{plant.light_requirement}</span>
          </div>{" "}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {" "}
            <Droplets className="h-4 w-4 text-blue-500" /> <span>{plant.watering_frequency}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Thermometer className="h-4 w-4 text-red-500" />
            <span>
              {plant.temperature_min}°-{plant.temperature_max}°C
            </span>
          </div>
        </div>{" "}
        {/* Tags supplémentaires removed */}
        {/* Actions */}
        <div className="flex gap-2">
          <Link href={`/plants/${plant.plant_id}`} className="flex-1">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-sm">
              <Eye className="h-4 w-4 mr-1" />
              Détails
            </Button>
          </Link>
          {/* Add to cart button removed */}
        </div>
        {/* Infos supplémentaires (stock, favorites) removed */}
      </div>{" "}
    </Card>
  )
}
