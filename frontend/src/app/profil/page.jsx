"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner";
import FavoritePlantsList from "@/components/favorite-plants-list";
import {
  User,
  Calendar,
  Shield,
  Edit2,
  Save,
  X,
  ImageIcon,
  Leaf,
  Heart,
  MessageSquare,
  Eye,
  Settings,
  Bell,
  Lock,
  Activity,
  TrendingUp,
  Award,
  Star,
  Camera,
} from "lucide-react"

export default function UserProfile() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [profilePicturePreviewUrl, setProfilePicturePreviewUrl] = useState(null)
  const [token, setToken] = useState(null)
  
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [isPasswordChanging, setIsPasswordChanging] = useState(false)

  // Récupère le token stocké
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/profil`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        if (!res.ok) throw new Error("Erreur lors de la récupération du profil")
        const data = await res.json()
        setUserData(data)
        setEditData(data)
        setProfilePicturePreviewUrl(data.profile_picture)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [token])

  useEffect(() => {
    return () => {
      if (profilePicturePreviewUrl && profilePicturePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(profilePicturePreviewUrl)
      }
    }
  }, [profilePicturePreviewUrl])

  const handleEdit = () => setIsEditing(true)
  const handleCancel = () => {
    setEditData(userData)
    setSelectedFile(null)
    setProfilePicturePreviewUrl(userData.profile_picture)
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
      setProfilePicturePreviewUrl(userData.profile_picture)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    setError(null)
    try {
      let response
      if (selectedFile) {
        const formData = new FormData()
        formData.append("profile_picture_file", selectedFile)
        if (editData.first_name) formData.append("first_name", editData.first_name)
        if (editData.last_name) formData.append("last_name", editData.last_name)
        if (editData.email) formData.append("email", editData.email)

        response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/update`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
      } else {
        response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/update`, {
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
      setEditData(updatedUser)
      setSelectedFile(null)
      setProfilePicturePreviewUrl(updatedUser.profile_picture)
      setIsEditing(false)

      toast.success("Profil mis à jour", {
        description: "Vos informations ont été sauvegardées avec succès.",
      })
    } catch (err) {
      setError(err.message)
      toast.error("Erreur", {
        description: err.message,
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Erreur", { description: "Les nouveaux mots de passe ne correspondent pas." })
      return
    }
    setIsPasswordChanging(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue.")
      }

      toast.success("Succès", { description: "Votre mot de passe a été changé avec succès." })
      setIsPasswordDialogOpen(false)
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" })
    } catch (error) {
      toast.error("Erreur", { description: error.message })
    } finally {
      setIsPasswordChanging(false)
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
        return "bg-gradient-to-r from-red-500 to-pink-500 text-white"
      case "premium":
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
      default:
        return "bg-gradient-to-r from-green-500 to-blue-500 text-white"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de votre profil...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-red-500 mb-4">
              <Shield className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Erreur d'accès</h3>
            <p className="text-gray-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!userData) return <div>Aucun utilisateur trouvé</div>

  // Données statiques pour stats
  const staticStats = {
    plants: 12,
    favorites: 8,
    chatbot_questions: 25,
    visit_statistics: 156,
    level: 3,
    experience: 750,
    nextLevelExp: 1000,
  }

  

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header avec bannière */}
      <div className="relative">
        <div className="h-48 bg-green-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-6xl mx-auto flex items-end gap-6">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                <AvatarImage
                  src={
                    profilePicturePreviewUrl?.startsWith("blob:")
                      ? profilePicturePreviewUrl
                      : `${process.env.NEXT_PUBLIC_API}${profilePicturePreviewUrl}`
                  }
                />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-green-400 to-blue-400 text-white">
                  {userData.first_name?.[0]}
                  {userData.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="absolute bottom-2 right-2 rounded-full h-8 w-8 p-0 bg-white text-gray-700 hover:bg-gray-100"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Changer la photo de profil</DialogTitle>
                    <DialogDescription>Sélectionnez une nouvelle photo pour votre profil.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profilePicturePreviewUrl || "/placeholder.svg"} />
                        <AvatarFallback>
                          <ImageIcon className="h-12 w-12 text-gray-400" />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSave} disabled={!selectedFile}>
                      Sauvegarder
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="text-white pb-4">
              <h1 className="text-4xl font-bold mb-2">
                {userData.first_name} {userData.last_name}
              </h1>
              <p className="text-xl opacity-90 mb-3">{userData.email}</p>
              <div className="flex items-center gap-4">
                <Badge className={getUserTypeColor(userData.user_type)}>
                  <Shield className="h-3 w-3 mr-1" />
                  {userData.user_type || "utilisateur"}
                </Badge>
                <span className="flex items-center opacity-90">
                  <Calendar className="h-4 w-4 mr-2" />
                  Membre depuis {formatDate(userData.registration_date)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favoris
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Statistiques
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          {/* Vue d'ensemble */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-red-500 to-pink-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100">Favoris</p>
                      <p className="text-3xl font-bold">{staticStats.favorites}</p>
                    </div>
                    <Heart className="h-8 w-8 text-red-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Questions</p>
                      <p className="text-3xl font-bold">{staticStats.chatbot_questions}</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Visites</p>
                      <p className="text-3xl font-bold">{staticStats.visit_statistics}</p>
                    </div>
                    <Eye className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profil */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-green-500" />
                      Informations personnelles
                    </CardTitle>
                    <CardDescription>Gérez vos informations de profil</CardDescription>
                  </div>
                  {!isEditing && (
                    <Button onClick={handleEdit} className="bg-gradient-to-r from-green-500 to-blue-500">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="first_name">Prénom</Label>
                        <Input
                          id="first_name"
                          value={editData.first_name || ""}
                          onChange={(e) => handleInputChange("first_name", e.target.value)}
                          placeholder="Votre prénom"
                          className="bg-white/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last_name">Nom</Label>
                        <Input
                          id="last_name"
                          value={editData.last_name || ""}
                          onChange={(e) => handleInputChange("last_name", e.target.value)}
                          placeholder="Votre nom"
                          className="bg-white/50"
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
                        className="bg-white/50"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <Button onClick={handleSave} className="flex-1 bg-gradient-to-r from-green-500 to-blue-500">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-4 bg-white/50 rounded-lg">
                        <Label className="text-sm font-medium text-gray-500">Prénom</Label>
                        <p className="mt-1 text-lg font-semibold">{userData.first_name || "Non renseigné"}</p>
                      </div>
                      <div className="p-4 bg-white/50 rounded-lg">
                        <Label className="text-sm font-medium text-gray-500">Nom</Label>
                        <p className="mt-1 text-lg font-semibold">{userData.last_name || "Non renseigné"}</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="p-4 bg-white/50 rounded-lg">
                        <Label className="text-sm font-medium text-gray-500">Adresse email</Label>
                        <p className="mt-1 text-lg font-semibold">{userData.email}</p>
                      </div>
                      <div className="p-4 bg-white/50 rounded-lg">
                        <Label className="text-sm font-medium text-gray-500">Type d'utilisateur</Label>
                        <p className="mt-1">
                          <Badge className={getUserTypeColor(userData.user_type)}>
                            {userData.user_type || "utilisateur"}
                          </Badge>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favoris */}
          <TabsContent value="favorites" className="space-y-6">
            <FavoritePlantsList />
          </TabsContent>

          {/* Statistiques */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Progression mensuelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Janvier", "Février", "Mars", "Avril"].map((month, index) => (
                      <div key={month} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{month}</span>
                          <span>{Math.floor(Math.random() * 50) + 10} plantes</span>
                        </div>
                        <Progress value={Math.floor(Math.random() * 80) + 20} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Catégories préférées</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Plantes d'intérieur", percentage: 45 },
                      { name: "Plantes tropicales", percentage: 30 },
                      { name: "Succulentes", percentage: 15 },
                      { name: "Plantes médicinales", percentage: 10 },
                    ].map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{category.name}</span>
                          <span>{category.percentage}%</span>
                        </div>
                        <Progress value={category.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          

          {/* Paramètres */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-500" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications email</p>
                      <p className="text-sm text-gray-600">Recevoir des emails de notification</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications push</p>
                      <p className="text-sm text-gray-600">Notifications dans le navigateur</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Newsletter</p>
                      <p className="text-sm text-gray-600">Conseils et actualités plantes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-red-500" />
                    Sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Lock className="h-4 w-4 mr-2" />
                        Changer le mot de passe
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <form onSubmit={handlePasswordChange}>
                        <DialogHeader>
                          <DialogTitle>Changer votre mot de passe</DialogTitle>
                          <DialogDescription>
                            Entrez votre ancien mot de passe et choisissez-en un nouveau.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="oldPassword">Ancien mot de passe</Label>
                            <Input
                              id="oldPassword"
                              name="oldPassword"
                              type="password"
                              value={passwordData.oldPassword}
                              onChange={handlePasswordInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                            <Input
                              id="newPassword"
                              name="newPassword"
                              type="password"
                              value={passwordData.newPassword}
                              onChange={handlePasswordInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordInputChange}
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="ghost" onClick={() => setIsPasswordDialogOpen(false)}>
                            Annuler
                          </Button>
                          <Button type="submit" disabled={isPasswordChanging}>
                            {isPasswordChanging ? "Sauvegarde..." : "Sauvegarder"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Shield className="h-4 w-4 mr-2" />
                    Authentification à deux facteurs
                  </Button>
                  
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
