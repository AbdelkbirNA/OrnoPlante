/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Mic, Camera, Bot, User, X, Copy, BookOpen, Clock, Zap } from "lucide-react"

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

export default function SimpleAIChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Bonjour ! Je suis votre assistant botanique IA. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    // Ne pas scroller si un message est en cours de streaming
    const hasStreamingMessage = messages.some((msg) => msg.isStreaming)
    if (!hasStreamingMessage) {
      scrollToBottom()
    }
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

    // Créer un message AI vide pour le streaming
    const aiMessageId = Date.now() + 1
    const aiMessage = {
      id: aiMessageId,
      type: "ai",
      content: "",
      timestamp: new Date(),
      isStreaming: true,
    }

    setMessages((prev) => [...prev, aiMessage])
    setIsTyping(false)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/gemini/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: messageText,
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la génération de la réponse")
      }

      const data = await response.json()
      const fullResponse = data.response || "Désolé, je n'ai pas pu générer une réponse."

      // Simuler le streaming mot par mot
      await streamText(fullResponse, aiMessageId)
    } catch (error) {
      console.error("Erreur:", error)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? { ...msg, content: "Désolé, une erreur s'est produite. Veuillez réessayer.", isStreaming: false }
            : msg,
        ),
      )
    }
  }

  // Fonction pour simuler le streaming de texte
  const streamText = async (text, messageId) => {
    const words = text.split(" ")
    let currentText = ""

    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? " " : "") + words[i]

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, content: currentText, isStreaming: i < words.length - 1 } : msg,
        ),
      )

      // Délai entre chaque mot (ajustable)
      await new Promise((resolve) => setTimeout(resolve, 50))
    }

    // Scroll seulement à la fin du streaming
    setTimeout(() => {
      scrollToBottom()
    }, 100)
  }

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

  const startVoiceRecording = () => {
    setIsListening(true)
    // Simulation de reconnaissance vocale
    setTimeout(() => {
      setIsListening(false)
      setInputMessage("Ma plante a des feuilles qui jaunissent, que faire ?")
    }, 3000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
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

      {/* Zone de chat principale */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
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
  )
}

function MessageBubble({ message }) {
  const formatTime = (date) => {
    return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
  }

  const copyMessage = () => {
    navigator.clipboard.writeText(message.content)
  }

  // Fonction pour formater le texte en paragraphes
  const formatText = (text) => {
    if (!text) return ""

    // Diviser le texte en paragraphes basés sur les sauts de ligne doubles
    const paragraphs = text.split("\n\n").filter((p) => p.trim())

    return paragraphs.map((paragraph, index) => {
      // Traiter les listes à puces
      if (paragraph.includes("- ") || paragraph.includes("• ")) {
        const items = paragraph.split(/\n?[-•]\s+/).filter((item) => item.trim())
        return (
          <div key={index} className="mb-4">
            {items[0] && <p className="mb-2">{formatTextWithBold(items[0])}</p>}
            {items.length > 1 && (
              <ul className="list-disc list-inside space-y-1 ml-4">
                {items.slice(1).map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-700">
                    {formatTextWithBold(item)}
                  </li>
                ))}
              </ul>
            )}
          </div>
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

  // Fonction pour convertir **texte** en gras
  const formatTextWithBold = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g)

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2) // Enlever les **
        return (
          <strong key={index} className="font-bold">
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
          <div className="text-sm leading-relaxed">{formatText(message.content)}</div>
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
        <div className="text-gray-800">
          {formatText(message.content)}
          {message.isStreaming && <span className="inline-block w-2 h-5 bg-green-500 ml-1 animate-pulse"></span>}
        </div>

        {message.suggestions && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
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

        <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={copyMessage} className="w-6 h-6 p-0 hover:bg-gray-100">
              <Copy className="h-3 w-3 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
