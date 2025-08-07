/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  Camera,
  Bot,
  User,
  X,
  Copy,
  Leaf,
  Upload,
  MessageCircle,
  Search,
  Sparkles,
  Info,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

export default function PlantDetectionAI() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [conversation, setConversation] = useState([])
  const [plantInfo, setPlantInfo] = useState(null)
  const [activeTab, setActiveTab] = useState("detection") // "detection" ou "gemini"
  const [geminiInput, setGeminiInput] = useState("")
  const [geminiConversation, setGeminiConversation] = useState([])
  const [isGeminiLoading, setIsGeminiLoading] = useState(false)
  const fileInputRef = useRef(null)
  const messagesEndRef = useRef(null)
  const geminiMessagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [conversation])

  useEffect(() => {
    geminiMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [geminiConversation])

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }



  const handleAnalyze = async () => {
    if (!selectedImage) return

    const newMessage = {
      id: Date.now(),
      type: "user",
      content: "Analyse de plante demandée",
      image: selectedImage,
      timestamp: new Date(),
    }

    setConversation([...(conversation || []), newMessage])
    const currentImage = selectedImage
    setSelectedImage(null)
    setIsAnalyzing(true)

    try {
      // Appel à votre API backend
      const formData = new FormData()

      // Convertir base64 en blob pour l'upload
      const response = await fetch(currentImage)
      const blob = await response.blob()
      formData.append("image", blob, "plant-identification.jpg")
      formData.append("type", "leaf")

      const apiResponse = await fetch("http://localhost:8080/api/plantnet/identify", {
        method: "POST",
        body: formData,
      }).catch(error => {
        console.error("Erreur de connexion:", error)
        throw new Error(`Erreur de connexion au serveur: ${error.message}`)
      })

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text()
        console.error("Réponse d'erreur du serveur:", errorText)
        throw new Error(`Erreur API: ${apiResponse.status} - ${errorText}`)
      }

      const data = await apiResponse.json()
      console.log("Données reçues de l'API:", data)

             // Traitement de la réponse de votre API
       const aiResponse = {
         id: Date.now() + 1,
         type: "ai",
         content: `**🌿 Plante identifiée !**

**Nom scientifique:** ${data.plantName || "Non identifié"}
**Score de confiance:** ${data.score ? Math.round(data.score * 100) : 0}%`,
         timestamp: new Date(),
         confidence: data.score ? Math.round(data.score * 100) : 0,
         plantName: data.plantName || "Plante non identifiée",
         plantData: data
       }

      setConversation((prev) => [...prev, aiResponse])
      setPlantInfo(data)
    } catch (error) {
      console.error("Erreur lors de l'analyse:", error)

             const errorResponse = {
         id: Date.now() + 1,
         type: "ai",
         content: `**❌ Impossible d'identifier la plante**

**Erreur:** ${error.message}`,
         timestamp: new Date(),
         confidence: 0,
         plantName: "Identification échouée",
       }

      setConversation((prev) => [...prev, errorResponse])
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleGeminiMessage = async () => {
    if (!geminiInput.trim()) return

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: geminiInput,
      timestamp: new Date(),
    }

    setGeminiConversation(prev => [...prev, userMessage])
    setGeminiInput("")
    setIsGeminiLoading(true)

    try {
             // Appel à l'API Gemini
       const response = await fetch("http://localhost:8080/api/gemini/generate", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           text: geminiInput
         }),
       })

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`)
      }

      const data = await response.json()
      
             const aiMessage = {
         id: Date.now() + 1,
         type: "ai",
         content: data.response || "Désolé, OrnoAI n'a pas pu traiter votre demande.",
         timestamp: new Date(),
       }

      setGeminiConversation(prev => [...prev, aiMessage])
    } catch (error) {
      console.error("Erreur Gemini:", error)
      
             const errorMessage = {
         id: Date.now() + 1,
         type: "ai",
         content: `**❌ Erreur de communication**

Désolé, OrnoAI n'a pas pu traiter votre demande pour le moment.

**Causes possibles :**
- Problème de connexion au service IA
- Erreur technique temporaire
- Service indisponible

**Suggestions :**
- Vérifiez votre connexion internet
- Réessayez dans quelques instants
- Reformulez votre question

**Erreur technique:** ${error.message}`,
         timestamp: new Date(),
       }

      setGeminiConversation(prev => [...prev, errorMessage])
    } finally {
      setIsGeminiLoading(false)
    }
  }

  const quickTips = [
    "Prenez la photo en pleine lumière",
    "Montrez les feuilles clairement",
    "Évitez les ombres importantes",
    "Incluez la forme générale de la plante"
  ]

  const geminiSuggestions = [
    "Comment arroser mes plantes d'intérieur ?",
    "Quels sont les signes d'une plante malade ?",
    "Comment rempoter une plante ?",
    "Quelles plantes pour débutants ?",
    "Comment faire des boutures ?",
    "Quels engrais utiliser ?"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">PlantAI Detection</h1>
                <p className="text-sm text-gray-600">Identifiez vos plantes en un clic</p>
              </div>
            </div>
          </div>
        </div>
      </header>

             {/* Contenu principal */}
       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         {/* Onglets */}
         <div className="flex justify-center mb-8">
           <div className="bg-white rounded-xl p-1 shadow-lg border border-gray-200">
             <button
               onClick={() => setActiveTab("detection")}
               className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                 activeTab === "detection"
                   ? "bg-green-500 text-white shadow-md"
                   : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
               }`}
             >
               <div className="flex items-center gap-2">
                 <Search className="h-4 w-4" />
                 Identification Plantes
               </div>
             </button>
             <button
               onClick={() => setActiveTab("gemini")}
               className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                 activeTab === "gemini"
                   ? "bg-green-500 text-white shadow-md"
                   : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
               }`}
             >
                               <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  Assistant OrnoAI
                </div>
             </button>
           </div>
         </div>

         {activeTab === "detection" ? (
           <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
             {/* Panneau de contrôle - 1/4 de la largeur */}
             <div className="xl:col-span-1">
               <Card className="sticky top-24 shadow-lg border-0">
                 <CardHeader className="text-center pb-4">
                   <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                     <Leaf className="h-8 w-8 text-white" />
                   </div>
                   <CardTitle className="text-green-700 text-lg">Identification Plantes</CardTitle>
                   <CardDescription className="text-sm">Identifiez vos plantes en un clic</CardDescription>
                 </CardHeader>

              <CardContent className="space-y-6">
                {/* Zone d'upload */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 block">Photo de la plante</label>
                  {selectedImage ? (
                    <div className="relative group">
                      <Image
                        src={selectedImage}
                        alt="Plante à identifier"
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover rounded-xl border-2 border-green-200"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-2 right-2 w-8 h-8 p-0 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-green-300 rounded-xl p-6 text-center cursor-pointer hover:border-green-400 hover:bg-green-50/50 transition-all duration-200"
                    >
                      <Upload className="h-12 w-12 text-green-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-1">Cliquez pour ajouter</p>
                      <p className="text-xs text-gray-500">Photo claire recommandée</p>
                    </div>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>

                {/* Conseils */}
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Conseils photo
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    {quickTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bouton d'analyse */}
                <Button
                  onClick={handleAnalyze}
                  disabled={!selectedImage || isAnalyzing}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyse en cours...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Identifier la plante
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

                     {/* Zone de conversation - 3/4 de la largeur */}
           <div className="xl:col-span-3">
             <Card className="min-h-[700px] max-h-[800px] flex flex-col shadow-lg border-0">
                               <CardHeader className="border-b border-gray-100 pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                    Chat de Détection
                    {Array.isArray(conversation) && conversation.length > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {conversation.length} analyse{conversation.length > 1 ? "s" : ""}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>

                               <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[600px]">
                 {!Array.isArray(conversation) || conversation.length === 0 ? (
                   <div className="flex flex-col items-center justify-center h-full text-center">
                     <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                       <Leaf className="h-10 w-10 text-green-400" />
                     </div>
                                           <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune analyse effectuée</h3>
                      <p className="text-gray-500 max-w-md">
                        Uploadez une photo claire de votre plante pour commencer l'analyse et découvrir ses caractéristiques
                      </p>
                   </div>
                 ) : (
                   <div className="space-y-6">
                     {Array.isArray(conversation) && conversation.map((message) => (
                       <MessageBubble key={message.id} message={message} />
                     ))}
                     <div ref={messagesEndRef} />
                   </div>
                 )}
               </CardContent>
             </Card>
           </div>
         </div>
       ) : (
         /* Section Gemini */
         <div className="max-w-4xl mx-auto">
                       <Card className="min-h-[700px] max-h-[800px] flex flex-col shadow-lg border-0">
             <CardHeader className="border-b border-gray-100 pb-4">
                               <CardTitle className="flex items-center gap-3 text-lg">
                  <Bot className="h-5 w-5 text-green-500" />
                  Assistant OrnoAI
                  <Badge variant="outline" className="ml-auto">
                    Expert Botanique
                  </Badge>
                </CardTitle>
               <CardDescription>
                 Posez vos questions sur les plantes, l'entretien, les maladies, et recevez des conseils personnalisés
               </CardDescription>
             </CardHeader>

             <CardContent className="flex-1 flex flex-col p-0">
               {/* Zone de conversation */}
                               <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[600px]">
                 {geminiConversation.length === 0 ? (
                   <div className="flex flex-col items-center justify-center h-full text-center">
                     <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                       <Bot className="h-10 w-10 text-green-400" />
                     </div>
                                           <h3 className="text-lg font-medium text-gray-900 mb-2">Assistant OrnoAI</h3>
                      <p className="text-gray-500 max-w-md mb-6">
                        Je suis votre expert en botanique et jardinage. Posez-moi vos questions !
                      </p>
                     
                     {/* Suggestions de questions */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                       {geminiSuggestions.map((suggestion, index) => (
                         <button
                           key={index}
                           onClick={() => setGeminiInput(suggestion)}
                           className="p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors text-sm"
                         >
                           {suggestion}
                         </button>
                       ))}
                     </div>
                   </div>
                 ) : (
                   <div className="space-y-6">
                     {geminiConversation.map((message) => (
                       <MessageBubble key={message.id} message={message} />
                     ))}
                     <div ref={geminiMessagesEndRef} />
                   </div>
                 )}
               </div>

               {/* Zone de saisie */}
               <div className="border-t border-gray-100 p-4">
                 <div className="flex gap-3">
                   <Textarea
                     value={geminiInput}
                     onChange={(e) => setGeminiInput(e.target.value)}
                     placeholder="Posez votre question sur les plantes..."
                     className="flex-1 resize-none"
                     rows={2}
                     onKeyDown={(e) => {
                       if (e.key === "Enter" && !e.shiftKey) {
                         e.preventDefault()
                         handleGeminiMessage()
                       }
                     }}
                   />
                   <Button
                     onClick={handleGeminiMessage}
                     disabled={!geminiInput.trim() || isGeminiLoading}
                     className="px-6 bg-green-500 hover:bg-green-600"
                   >
                     {isGeminiLoading ? (
                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                     ) : (
                       <Send className="h-4 w-4" />
                     )}
                   </Button>
                 </div>
               </div>
             </CardContent>
           </Card>
         </div>
       )}
     </main>
   </div>
 )
}

// Composant de bulle de message
function MessageBubble({ message }) {
  const formatTime = (date) => {
    return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
  }

  const copyMessage = () => {
    navigator.clipboard.writeText(message.content)
  }

  const formatText = (text) => {
    if (!text) return ""
    
    // Diviser par paragraphes
    const paragraphs = text.split("\n\n").filter((p) => p.trim())
    
    return paragraphs.map((paragraph, index) => {
      // Si le paragraphe contient des listes à puces
      if (paragraph.includes("- ")) {
        const items = paragraph.split(/\n?-\s+/).filter((item) => item.trim())
        return (
          <div key={index} className="mb-4">
            {items[0] && <p className="mb-3 font-medium">{formatTextWithBold(items[0])}</p>}
            {items.length > 1 && (
              <ul className="list-disc list-inside space-y-2 ml-4">
                {items.slice(1).map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-700 leading-relaxed">
                    {formatTextWithBold(item)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      }
      
      // Si le paragraphe contient des titres avec ###
      if (paragraph.startsWith("### ")) {
        const title = paragraph.replace("### ", "")
        return (
          <h3 key={index} className="text-lg font-semibold text-gray-900 mb-3 mt-4">
            {formatTextWithBold(title)}
          </h3>
        )
      }
      
      // Paragraphe normal
      return (
        <p key={index} className="mb-4 last:mb-0 leading-relaxed">
          {formatTextWithBold(paragraph)}
        </p>
      )
    })
  }

  const formatTextWithBold = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2)
        return (
          <strong key={index} className="font-semibold text-gray-900">
            {boldText}
          </strong>
        )
      }
      return part
    })
  }

  if (message.type === "user") {
    return (
      <div className="flex items-start gap-4 justify-end">
        <div className="bg-green-600 text-white rounded-2xl p-4 shadow-lg max-w-lg">
          {message.image && (
            <div className="mb-3">
              <Image
                src={message.image}
                alt="Image envoyée"
                width={200}
                height={150}
                className="rounded-xl object-cover w-full"
              />
            </div>
          )}
          <div className="text-sm leading-relaxed">{formatText(message.content)}</div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/20">
            <span className="text-xs opacity-75">{formatTime(message.timestamp)}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyMessage}
              className="w-8 h-8 p-0 hover:bg-white/20 text-white"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
          <User className="h-5 w-5 text-white" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
        <Bot className="h-5 w-5 text-white" />
      </div>
                           <div className="bg-white rounded-2xl p-5 shadow-lg max-w-4xl border border-gray-100">
          {/* Badges d'information */}
          {(message.confidence || message.plantName) && (
            <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              {message.confidence && (
                <Badge variant="outline" className="text-xs bg-blue-100 border-blue-300 text-blue-800">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {message.confidence}% de confiance
                </Badge>
              )}
              {message.plantName && message.plantName !== "Identification échouée" && (
                <Badge variant="secondary" className="text-xs bg-green-100 border-green-300 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {message.plantName}
                </Badge>
              )}
              {message.plantName === "Identification échouée" && (
                <Badge variant="destructive" className="text-xs bg-red-100 border-red-300 text-red-800">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Échec d'identification
                </Badge>
              )}
            </div>
          )}

                                       <div className="text-gray-800 leading-relaxed bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100 break-words">
                      {formatText(message.content)}
                    </div>

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
          <Button variant="ghost" size="sm" onClick={copyMessage} className="w-8 h-8 p-0 hover:bg-gray-100">
            <Copy className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </div>
    </div>
  )
}
