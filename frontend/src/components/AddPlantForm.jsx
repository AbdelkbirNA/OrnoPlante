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