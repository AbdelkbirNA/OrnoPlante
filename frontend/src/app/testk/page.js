"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { RefreshCw, CheckCircle, XCircle, AlertTriangle, Users } from "lucide-react"

export default function TestUsersApiPage() {
  const [loading, setLoading] = useState(false)
  const [apiStatus, setApiStatus] = useState(null)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  const testApi = async () => {
    setLoading(true)
    setError(null)
    setApiStatus(null)

    try {
      // Test de l'API externe
      console.log("🧪 Test de l'API externe: http://localhost:8080/api/users")

      const response = await fetch("http://localhost:8080/api/users")
      console.log("📡 Réponse reçue:", response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      // Parser les données
      const data = await response.json()
      console.log("📊 Données parsées:", data)

      // Adapter selon la structure de votre API
      const usersList = Array.isArray(data) ? data : data.users || []
      setUsers(usersList)
      setApiStatus("success")

      toast.success("API externe fonctionnelle", {
        description: `${usersList.length} utilisateur(s) récupéré(s)`,
      })
    } catch (err) {
      console.error("💥 Erreur lors du test:", err)
      setError(err.message)
      setApiStatus("error")
      toast.error("Erreur API externe", {
        description: err.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h1 className="text-3xl font-bold text-gray-900">Test API Utilisateurs Externe</h1>
            <p className="text-gray-600 mt-1">Tester la connexion à http://localhost:8080/api/users</p>
          </div>

          {/* Test de l'API */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {apiStatus === "success" && <CheckCircle className="h-5 w-5 text-green-600" />}
                {apiStatus === "error" && <XCircle className="h-5 w-5 text-red-600" />}
                {!apiStatus && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                Test de connexion API externe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={testApi} disabled={loading} className="w-full">
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Tester GET http://localhost:8080/api/users
              </Button>

              {apiStatus && (
                <Badge variant={apiStatus === "success" ? "default" : "destructive"} className="w-full justify-center">
                  {apiStatus === "success" ? "✅ API Externe Fonctionnelle" : "❌ API Externe en Erreur"}
                </Badge>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800 font-medium">Erreur détectée:</p>
                  <p className="text-xs text-red-600 mt-1">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informations système */}
          <Card>
            <CardHeader>
              <CardTitle>Informations de connexion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>URL API externe:</strong>
                  <br />
                  <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:8080/api/users</code>
                </div>
                <div>
                  <strong>Méthode:</strong>
                  <br />
                  <code className="bg-gray-100 px-2 py-1 rounded">GET</code>
                </div>
                <div>
                  <strong>Utilisateurs récupérés:</strong>
                  <br />
                  <code className="bg-gray-100 px-2 py-1 rounded">{users.length} utilisateur(s)</code>
                </div>
                <div>
                  <strong>Statut:</strong>
                  <br />
                  <Badge
                    variant={apiStatus === "success" ? "default" : apiStatus === "error" ? "destructive" : "secondary"}
                  >
                    {apiStatus === "success" ? "Connecté" : apiStatus === "error" ? "Erreur" : "Non testé"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Résultats */}
          {users.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Utilisateurs récupérés ({users.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {users.map((user, index) => (
                    <div key={user.user_id || index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            {user.first_name || "Prénom"} {user.last_name || "Nom"}
                          </p>
                          <p className="text-sm text-gray-600">{user.email || "Email non défini"}</p>
                          <p className="text-xs text-gray-500">Type: {user.user_type || "Non défini"}</p>
                        </div>
                        <Badge variant="outline">ID: {user.user_id || "N/A"}</Badge>
                      </div>
                      {user.registration_date && (
                        <p className="text-xs text-gray-500 mt-1">
                          Inscrit le: {new Date(user.registration_date).toLocaleDateString("fr-FR")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Instructions de dépannage */}
          <Card>
            <CardHeader>
              <CardTitle>🔧 Guide de dépannage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="font-medium text-yellow-800">Si l'API externe ne fonctionne pas:</p>
                  <ul className="list-disc list-inside text-yellow-700 mt-2 space-y-1">
                    <li>Vérifiez que votre serveur backend est démarré sur le port 8080</li>
                    <li>Vérifiez que l'endpoint /api/users existe et fonctionne</li>
                    <li>Vérifiez les CORS si nécessaire</li>
                    <li>
                      Testez manuellement:{" "}
                      <a href="http://localhost:8080/api/users" target="_blank" className="underline" rel="noreferrer">
                        http://localhost:8080/api/users
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-medium text-blue-800">Structure attendue de la réponse:</p>
                  <pre className="text-xs bg-white p-2 rounded mt-2 overflow-x-auto">
                    {`[
  {
    "user_id": 1,
    "first_name": "Marie",
    "last_name": "Dubois",
    "email": "marie@example.com",
    "user_type": "Admin",
    "profile_picture": "/path/to/image.jpg",
    "registration_date": "2024-01-15T10:00:00Z",
    "plants": [...],
    "favorites": [...],
    "chatbot_questions": [...],
    "visit_statistics": [...],
    "admin_actions": [...]
  }
]`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
