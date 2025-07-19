/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Send,
  Mic,
  Camera,
  Bot,
  User,
  Leaf,
  Sun,
  Droplets,
  Heart,
  Shield,
  Zap,
  MessageCircle,
  X,
  Copy,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  Clock,
  TreePine,
  Lightbulb,
  HelpCircle,
  Volume2,
  Pause,
} from "lucide-react"

// Messages prédéfinis pour démarrer la conversation
const quickQuestions = [
  {
    icon: Leaf,
    question: "Quelle plante convient à mon salon peu éclairé ?",
    category: "Conseil personnalisé",
  },
  {
    icon: Droplets,
    question: "Pourquoi les feuilles de ma plante jaunissent ?",
    category: "Diagnostic",
  },
  {
    icon: Sun,
    question: "Comment créer un jardin méditerranéen ?",
    category: "Aménagement",
  },
  {
    icon: Shield,
    question: "Quelles plantes sont sans danger pour mon chat ?",
    category: "Sécurité",
  },
  {
    icon: Heart,
    question: "Comment propager mes plantes préférées ?",
    category: "Propagation",
  },
  {
    icon: TreePine,
    question: "Calendrier d'entretien pour mes plantes d'intérieur",
    category: "Planning",
  },
]

// Exemples de conversations
const conversationExamples = [
  {
    title: "Diagnostic de maladie",
    preview: "Ma monstera a des taches brunes...",
    messages: 3,
    category: "Santé des plantes",
  },
  {
    title: "Choix de plantes débutant",
    preview: "Je débute en jardinage...",
    messages: 5,
    category: "Conseils",
  },
  {
    title: "Aménagement terrasse",
    preview: "Comment aménager ma terrasse...",
    messages: 7,
    category: "Design",
  },
]

// Fonctionnalités de l'IA
const aiFeatures = [
  {
    icon: Camera,
    title: "Reconnaissance visuelle",
    description: "Identifiez vos plantes en photo",
    color: "bg-blue-500",
  },
  {
    icon: Zap,
    title: "Diagnostic instantané",
    description: "Analysez les problèmes de santé",
    color: "bg-red-500",
  },
  {
    icon: BookOpen,
    title: "Guide personnalisé",
    description: "Conseils adaptés à votre situation",
    color: "bg-green-500",
  },
  {
    icon: Clock,
    title: "Planning d'entretien",
    description: "Calendrier sur mesure",
    color: "bg-purple-500",
  },
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Bonjour ! Je suis votre assistant botanique IA. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
      suggestions: [
        "Identifier une plante",
        "Diagnostiquer un problème",
        "Conseils d'entretien",
        "Recommandations personnalisées",
      ],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [chatMode, setChatMode] = useState("text") // text, voice, image
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim() && !selectedImage) return

    const newMessage = {
      id: Date.now(),
      type: "user",
      content: messageText,
      image: selectedImage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")
    setSelectedImage(null)
    setIsTyping(true)

    // Simuler la réponse de l'IA
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage) => {
    // Simulation de réponses IA basées sur le contenu
    const responses = {
      default: {
        content:
          "Excellente question ! Basé sur votre demande, voici mes recommandations personnalisées. Pouvez-vous me donner plus de détails sur votre situation ?",
        suggestions: ["Plus de détails", "Autres options", "Guide complet"],
      },
      plante: {
        content:
          "Pour identifier votre plante, j'aurais besoin de quelques informations : forme des feuilles, couleur, taille, et si possible une photo. Cela m'aidera à vous donner une identification précise.",
        suggestions: ["Envoyer une photo", "Décrire les feuilles", "Voir des exemples"],
      },
      problème: {
        content:
          "Les feuilles jaunes peuvent indiquer plusieurs problèmes : excès d'eau, manque de lumière, ou carence nutritionnelle. Pouvez-vous me décrire l'état général de la plante ?",
        suggestions: ["Excès d'eau ?", "Manque de lumière ?", "Voir solutions"],
      },
      jardin: {
        content:
          "Un jardin méditerranéen nécessite des plantes résistantes à la sécheresse comme la lavande, le romarin, et l'olivier. Quelle est l'exposition de votre espace ?",
        suggestions: ["Plein soleil", "Mi-ombre", "Liste complète"],
      },
    }

    let responseKey = "default"
    if (userMessage.toLowerCase().includes("plante") || userMessage.toLowerCase().includes("identifier")) {
      responseKey = "plante"
    } else if (userMessage.toLowerCase().includes("jaune") || userMessage.toLowerCase().includes("problème")) {
      responseKey = "problème"
    } else if (userMessage.toLowerCase().includes("jardin") || userMessage.toLowerCase().includes("méditerranéen")) {
      responseKey = "jardin"
    }

    return {
      id: Date.now(),
      type: "ai",
      content: responses[responseKey].content,
      suggestions: responses[responseKey].suggestions,
      timestamp: new Date(),
    }
  }

  const handleQuickQuestion = (question) => {
    handleSendMessage(question)
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target.result)
        setChatMode("image")
      }
      reader.readAsDataURL(file)
    }
  }

  const startVoiceRecording = () => {
    setIsListening(true)
    // Simulation de reconnaissance vocale
    setTimeout(() => {
      setIsListening(false)
      setInputMessage("Ma plante a des feuilles qui jaunissent, que faire ?")
    }, 3000)
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Hero Section */}
      <section className="relative w-full py-16 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full opacity-15 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white rounded-full opacity-5 animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-base font-medium">
              <Bot className="h-6 w-6" />
              Assistant IA Botanique
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-black leading-tight">
                Votre expert
                <span className="block text-emerald-200">en plantes IA</span>
              </h1>
              <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
                Obtenez des conseils personnalisés, identifiez vos plantes et résolvez tous vos problèmes botaniques
                avec notre intelligence artificielle avancée
              </p>
            </div>

            {/* Fonctionnalités principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {aiFeatures.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300"
                  >
                    <div
                      className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-3`}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-green-100">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-1">
        {/* Sidebar avec suggestions */}
        <aside className="w-80 bg-white border-r border-gray-200 shadow-lg overflow-y-auto">
          <div className="p-6 space-y-8">
            {/* Questions rapides */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Questions populaires
              </h3>
              <div className="space-y-3">
                {quickQuestions.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(item.question)}
                      className="w-full text-left p-4 bg-gray-50 hover:bg-green-50 rounded-xl transition-colors duration-200 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 group-hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors duration-200">
                          <IconComponent className="h-4 w-4 text-green-600 group-hover:text-white transition-colors duration-200" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 mb-1">{item.question}</p>
                          <span className="text-xs text-gray-500">{item.category}</span>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Conversations récentes */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Conversations récentes
              </h3>
              <div className="space-y-3">
                {conversationExamples.map((conv, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-colors duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{conv.title}</h4>
                      <span className="text-xs text-gray-500">{conv.messages} msg</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{conv.preview}</p>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{conv.category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Conseils d'utilisation */}
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-green-600" />
                Conseils d'utilisation
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <Camera className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Envoyez des photos pour une identification précise
                </li>
                <li className="flex items-start gap-2">
                  <Mic className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Utilisez la commande vocale pour plus de facilité
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  Soyez précis dans vos descriptions
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Zone de chat principale */}
        <main className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {isTyping && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-lg max-w-md">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-sm text-gray-500">L'IA réfléchit...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Zone de saisie */}
          <div className="border-t border-gray-200 bg-white p-6">
            {selectedImage && (
              <div className="mb-4 relative inline-block">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt="Image sélectionnée"
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 w-6 h-6 p-0 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}

            <div className="flex items-end gap-4">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Posez votre question sur les plantes..."
                  className="pr-32 py-4 rounded-2xl border-2 border-gray-300 focus:border-green-500 focus:ring-green-500"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-8 h-8 p-0 hover:bg-blue-100"
                  >
                    <Camera className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={startVoiceRecording}
                    className={`w-8 h-8 p-0 hover:bg-red-100 ${isListening ? "bg-red-100" : ""}`}
                  >
                    <Mic className={`h-4 w-4 ${isListening ? "text-red-600 animate-pulse" : "text-red-600"}`} />
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() && !selectedImage}
                className="bg-green-600 hover:bg-green-700 px-6 py-4 rounded-2xl"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

            {/* Mode d'écoute */}
            {isListening && (
              <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-red-700 font-medium">Écoute en cours...</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsListening(false)}
                    className="ml-auto text-red-600 hover:text-red-700"
                  >
                    Arrêter
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

// Composant pour les bulles de message
function MessageBubble({ message }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const formatTime = (date) => {
    return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
  }

  const copyMessage = () => {
    navigator.clipboard.writeText(message.content)
  }

  const toggleAudio = () => {
    setIsPlaying(!isPlaying)
    // Simulation de lecture audio
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 3000)
    }
  }

  if (message.type === "user") {
    return (
      <div className="flex items-start gap-4 justify-end">
        <div className="bg-green-600 text-white rounded-2xl p-4 shadow-lg max-w-md">
          {message.image && (
            <Image
              src={message.image || "/placeholder.svg"}
              alt="Image envoyée"
              width={200}
              height={150}
              className="rounded-lg mb-3 object-cover"
            />
          )}
          <p className="text-sm leading-relaxed">{message.content}</p>
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-green-500">
            <span className="text-xs text-green-100">{formatTime(message.timestamp)}</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={copyMessage} className="w-6 h-6 p-0 hover:bg-green-500">
                <Copy className="h-3 w-3 text-green-100" />
              </Button>
            </div>
          </div>
        </div>
        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-white" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
        <Bot className="h-5 w-5 text-white" />
      </div>
      <div className="bg-white rounded-2xl p-4 shadow-lg max-w-2xl">
        <p className="text-gray-800 leading-relaxed mb-4">{message.content}</p>

        {message.suggestions && (
          <div className="flex flex-wrap gap-2 mb-4">
            {message.suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={toggleAudio} className="w-6 h-6 p-0 hover:bg-gray-100">
              {isPlaying ? <Pause className="h-3 w-3 text-gray-600" /> : <Volume2 className="h-3 w-3 text-gray-600" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={copyMessage} className="w-6 h-6 p-0 hover:bg-gray-100">
              <Copy className="h-3 w-3 text-gray-600" />
            </Button>
            <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-green-100">
              <ThumbsUp className="h-3 w-3 text-gray-600" />
            </Button>
            <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-red-100">
              <ThumbsDown className="h-3 w-3 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
