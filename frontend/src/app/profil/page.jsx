"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Calendar, Shield, Edit2, Save, X, ImageIcon } from "lucide-react"

export default function ProfilePage() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null) // New state for selected file
  const [profilePicturePreviewUrl, setProfilePicturePreviewUrl] = useState(null) // New state for preview URL
  const [token, setToken] = useState(null)

  // Récupère le token stocké (adapter selon ta gestion du token)
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
    } else {
      setError("Vous n'êtes pas connecté.")
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!token) return
    async function fetchProfile() {
      try {
        const res = await fetch("http://localhost:8080/api/profil", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        if (!res.ok) throw new Error("Erreur lors de la récupération du profil")
        const data = await res.json()
        setUserData(data)
        setEditData(data)
        setProfilePicturePreviewUrl(data.profile_picture) // Set initial preview URL
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [token])

  // Cleanup for URL.createObjectURL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (profilePicturePreviewUrl && profilePicturePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(profilePicturePreviewUrl)
      }
    }
  }, [profilePicturePreviewUrl])

  const handleEdit = () => setIsEditing(true)

  const handleCancel = () => {
    setEditData(userData) // Revert changes
    setSelectedFile(null) // Clear selected file
    setProfilePicturePreviewUrl(userData.profile_picture) // Revert preview to original
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setProfilePicturePreviewUrl(URL.createObjectURL(file))
    } else {
      setSelectedFile(null)
      setProfilePicturePreviewUrl(userData.profile_picture) // Revert to original if cleared
    }
  }

  const handleSave = async () => {
    setLoading(true) // Start loading for save operation
    setError(null) // Clear previous errors

    try {
      let response
      if (selectedFile) {
        // If a new file is selected, send FormData
        const formData = new FormData()
        formData.append("profile_picture_file", selectedFile) // Key for the file on the backend
        // Append other fields from editData
        if (editData.first_name) formData.append("first_name", editData.first_name)
        if (editData.last_name) formData.append("last_name", editData.last_name)
        if (editData.email) formData.append("email", editData.email)

        response = await fetch("http://localhost:8080/api/user/update", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            // Do NOT set Content-Type for FormData, browser sets it automatically with boundary
          },
          body: formData,
        })
      } else {
        // If no new file, send JSON
        response = await fetch("http://localhost:8080/api/user/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editData),
        })
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erreur lors de la sauvegarde du profil")
      }

      const updatedUser = await response.json()
      setUserData(updatedUser)
      setEditData(updatedUser) // Update editData with the latest saved data
      setSelectedFile(null) // Clear selected file after successful upload
      setProfilePicturePreviewUrl(updatedUser.profile_picture) // Update preview with new URL from backend
      setIsEditing(false)
      console.log("Sauvegardé:", updatedUser)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const getUserTypeColor = (type) => {
    switch (type) {
      case "admin":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur : {error}</div>
  if (!userData) return <div>Aucun utilisateur trouvé</div>

  // Données statiques pour stats (remplace par dynamique quand dispo)
  const staticStats = {
    plants: 12,
    favorites: 8,
    chatbot_questions: 25,
    visit_statistics: 156,
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête profil */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="px-6 py-8 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={profilePicturePreviewUrl?.startsWith("blob:")
                    ? profilePicturePreviewUrl
                      : `http://localhost:8080${profilePicturePreviewUrl}` }
                        
                      />
                <AvatarFallback className="text-xl">
                  {userData.first_name?.[0]}
                  {userData.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {userData.first_name} {userData.last_name}
                </h1>
                <p className="text-gray-600 flex items-center mt-1">
                  <Mail className="h-4 w-4 mr-2" />
                  {userData.email}
                </p>
                <div className="flex items-center mt-2 space-x-3">
                  <Badge className={getUserTypeColor(userData.user_type)}>
                    <Shield className="h-3 w-3 mr-1" />
                    {userData.user_type || "utilisateur"}
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Membre depuis {formatDate(userData.registration_date)}
                  </span>
                </div>
              </div>
            </div>
            <Button onClick={handleEdit} disabled={isEditing}>
              <Edit2 className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Infos persos */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informations personnelles
                </CardTitle>
                <CardDescription>Gérez vos informations de profil</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="profile_picture">Photo de profil</Label>
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={profilePicturePreviewUrl || "/placeholder.svg"} />
                          <AvatarFallback>
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                          </AvatarFallback>
                        </Avatar>
                        <Input
                          id="profile_picture"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first_name">Prénom</Label>
                        <Input
                          id="first_name"
                          value={editData.first_name || ""}
                          onChange={(e) => handleInputChange("first_name", e.target.value)}
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last_name">Nom</Label>
                        <Input
                          id="last_name"
                          value={editData.last_name || ""}
                          onChange={(e) => handleInputChange("last_name", e.target.value)}
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="votre.email@example.com"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <Button onClick={handleSave} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        Sauvegarder
                      </Button>
                      <Button onClick={handleCancel} variant="outline" className="flex-1 bg-transparent">
                        <X className="h-4 w-4 mr-2" />
                        Annuler
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Prénom</Label>
                        <p className="mt-1 text-lg">{userData.first_name || "Non renseigné"}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Nom</Label>
                        <p className="mt-1 text-lg">{userData.last_name || "Non renseigné"}</p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Adresse email</Label>
                      <p className="mt-1 text-lg">{userData.email}</p>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Type d'utilisateur</Label>
                        <p className="mt-1 text-lg capitalize">{userData.user_type || "utilisateur"}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          {/* Statistiques (statique pour l’instant) */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
                <CardDescription>Votre activité sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Plantes</span>
                  <Badge variant="secondary">{staticStats.plants}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Favoris</span>
                  <Badge variant="secondary">{staticStats.favorites}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Questions chatbot</span>
                  <Badge variant="secondary">{staticStats.chatbot_questions}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Visites</span>
                  <Badge variant="secondary">{staticStats.visit_statistics}</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Informations du compte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Date d'inscription</Label>
                  <p className="mt-1 text-sm">{formatDate(userData.registration_date)}</p>
                </div>
                <Separator />
                <div>
                  <Label className="text-sm font-medium text-gray-500">Statut</Label>
                  <p className="mt-1">
                    <Badge className="bg-green-100 text-green-800">Actif</Badge>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
