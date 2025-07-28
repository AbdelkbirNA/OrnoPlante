"use client"
import { useMemo, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, X, Leaf, Droplets, Star, CheckCircle, Save, Upload, ImageIcon, Trash2 } from "lucide-react"

export default function AddPlantForm({
  newPlantForm,
  setNewPlantForm,
  currentStep,
  setCurrentStep,
  onClose,
  onSave,
  onNext,
  onPrev,
  validateCurrentStep,
  plantTypes,
}) {
  // Référence pour l'input file caché
  const fileInputRef = useRef(null)

  // Configuration des étapes
  const formSteps = useMemo(
    () => [
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
    ],
    [],
  )

  // Fonction pour déclencher la sélection de fichier
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Fonction pour gérer la sélection de fichier
  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0]
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith("image/")) {
        alert("Veuillez sélectionner un fichier image valide.")
        return
      }

      // Vérifier la taille du fichier (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert("Le fichier est trop volumineux. Taille maximale : 10MB.")
        return
      }

      // Créer une URL pour l'aperçu
      const imageUrl = URL.createObjectURL(file)

      // Mettre à jour le formulaire avec le fichier et l'URL d'aperçu
      setNewPlantForm((prev) => ({
        ...prev,
        image_file: file,
        image_preview: imageUrl,
      }))
    }
  }

  // Fonction pour supprimer l'image
  const handleRemoveImage = () => {
    // Libérer l'URL de l'objet pour éviter les fuites mémoire
    if (newPlantForm.image_preview) {
      URL.revokeObjectURL(newPlantForm.image_preview)
    }

    setNewPlantForm((prev) => ({
      ...prev,
      image_file: null,
      image_preview: null,
    }))

    // Réinitialiser l'input file
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-8">
      {/* Header du formulaire */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onClose} size="lg">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-green-600">Ajouter une nouvelle plante</h1>
            <p className="text-muted-foreground mt-1">Créez une nouvelle fiche plante pour votre catalogue</p>
          </div>
        </div>
        <Button variant="outline" onClick={onClose} size="sm">
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
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-gray-800 font-semibold">Informations essentielles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="plant_name" className="text-sm font-medium text-gray-700">
                    Nom de la plante <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="plant_name"
                    placeholder="Ex: Ficus Benjamina"
                    value={newPlantForm.plant_name}
                    onChange={(e) => setNewPlantForm((prev) => ({ ...prev, plant_name: e.target.value }))}
                    className="h-11"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">
                    Type de plante <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={newPlantForm.type}
                    onValueChange={(value) => setNewPlantForm((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="h-11">
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
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description de la plante
                </Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez les caractéristiques, l'origine et les particularités de cette plante..."
                  rows={6}
                  value={newPlantForm.description}
                  onChange={(e) => setNewPlantForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="resize-none"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Étape 2: Entretien */}
        {currentStep === 1 && (
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-gray-800 font-semibold">Conseils d'entretien</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="light_requirement" className="text-sm font-medium text-gray-700">
                    Besoins en lumière
                  </Label>
                  <Input
                    id="light_requirement"
                    placeholder="Ex: Lumière indirecte vive"
                    value={newPlantForm.light_requirement}
                    onChange={(e) => setNewPlantForm((prev) => ({ ...prev, light_requirement: e.target.value }))}
                    className="h-11"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="watering_frequency" className="text-sm font-medium text-gray-700">
                    Fréquence d'arrosage
                  </Label>
                  <Input
                    id="watering_frequency"
                    placeholder="Ex: 1-2 fois par semaine"
                    value={newPlantForm.watering_frequency}
                    onChange={(e) => setNewPlantForm((prev) => ({ ...prev, watering_frequency: e.target.value }))}
                    className="h-11"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="temperature_min" className="text-sm font-medium text-gray-700">
                    Température minimale (°C)
                  </Label>
                  <Input
                    id="temperature_min"
                    type="number"
                    step="0.1"
                    placeholder="15"
                    value={newPlantForm.temperature_min}
                    onChange={(e) => setNewPlantForm((prev) => ({ ...prev, temperature_min: e.target.value }))}
                    className="h-11"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="temperature_max" className="text-sm font-medium text-gray-700">
                    Température maximale (°C)
                  </Label>
                  <Input
                    id="temperature_max"
                    type="number"
                    step="0.1"
                    placeholder="25"
                    value={newPlantForm.temperature_max}
                    onChange={(e) => setNewPlantForm((prev) => ({ ...prev, temperature_max: e.target.value }))}
                    className="h-11"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Étape 3: Détails */}
        {currentStep === 2 && (
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-gray-800 font-semibold">Détails et finalisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Photo de la plante</Label>

                {/* Input file caché */}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

                {/* Zone d'upload ou aperçu de l'image */}
                {newPlantForm.image_preview ? (
                  <div className="relative">
                    <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-white border">
                          <img
                            src={newPlantForm.image_preview || "/placeholder.svg?height=128&width=128"}
                            alt="Aperçu de la plante"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <ImageIcon className="h-5 w-5 text-green-600" />
                            <span className="font-medium text-gray-900">
                              {newPlantForm.image_file && newPlantForm.image_file.name}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">
                            Taille: {newPlantForm.image_file && (newPlantForm.image_file.size / 1024 / 1024).toFixed(2)}{" "}
                            MB
                          </p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={handleUploadClick} className="bg-transparent">
                              <Upload className="mr-2 h-4 w-4" />
                              Changer
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleRemoveImage}
                              className="bg-transparent text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer"
                    onClick={handleUploadClick}
                  >
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <Upload className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <Button variant="outline" size="lg" className="px-6 py-3 bg-transparent">
                          <Upload className="mr-2 h-4 w-4" />
                          Télécharger une photo
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">PNG, JPG, WEBP jusqu'à 10MB</p>
                        <p className="text-xs text-gray-400 mt-1">Cliquez ou glissez-déposez votre image ici</p>
                      </div>
                    </div>
                  </div>
                )}
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
              onClick={onPrev}
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
              <Button variant="outline" onClick={onClose} size="lg" className="px-8 bg-transparent">
                Annuler
              </Button>
              {currentStep < formSteps.length - 1 ? (
                <Button onClick={onNext} disabled={!validateCurrentStep()} size="lg" className="px-8">
                  Suivant
                  <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                </Button>
              ) : (
                <Button onClick={onSave} size="lg" className="px-8">
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
}
