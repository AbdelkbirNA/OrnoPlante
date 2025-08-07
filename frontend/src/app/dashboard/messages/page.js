"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Mail,
  MailOpen,
  Search,
  MessageSquare,
  Bot,
  Headphones,
  ShoppingCart,
  Users,
  FileText,
  CheckCircle2,
  Clock,
} from "lucide-react"

const contactTypeIcons = {
  support: { icon: Headphones, color: "bg-blue-500", label: "Support technique" },
  sales: { icon: ShoppingCart, color: "bg-green-500", label: "Ventes" },
  partnership: { icon: Users, color: "bg-purple-500", label: "Partenariat" },
  feedback: { icon: MessageSquare, color: "bg-orange-500", label: "Feedback" },
  other: { icon: FileText, color: "bg-gray-500", label: "Autre" },
  ai: { icon: Bot, color: "bg-indigo-500", label: "IA Assistant" },
}

export default function MessagesPage() {
  const [messages, setMessages] = useState([])
  const [filteredMessages, setFilteredMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [loading, setLoading] = useState(true)

useEffect(() => {
  const fetchMessages = async () => {
    try {
      const response = await fetch('${process.env.NEXT_PUBLIC_API}/api/contact');
      if (!response.ok) throw new Error('Erreur HTTP ' + response.status);
      const data = await response.json();
console.log("Données reçues depuis l'API :", data);

      setMessages(data);
      setFilteredMessages(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement des messages:", error);
      setLoading(false);
    }
  }

  fetchMessages();
}, []);

  useEffect(() => {
    let filtered = messages

    if (searchTerm) {
      filtered = filtered.filter(
        (message) =>
          message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.message.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterType !== "all") {
      filtered = filtered.filter((message) => message.contact_type === filterType)
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((message) => (filterStatus === "read" ? message.is_read : !message.is_read))
    }

    setFilteredMessages(filtered)
  }, [messages, searchTerm, filterType, filterStatus])

  const markAsRead = async (messageId) => {
    try {
      
      setMessages((prev) => prev.map((msg) => (msg.message_id === messageId ? { ...msg, is_read: true } : msg)))
    } catch (error) {
      console.error("Erreur lors du marquage comme lu:", error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const unreadCount = messages.filter((msg) => !msg.is_read).length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Boîte de messages</h1>
              <p className="text-gray-600 mt-2">Gérez les messages de contact reçus via le formulaire</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {unreadCount} non lus
              </Badge>
            </div>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher par nom, email, sujet..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">Tous les types</option>
                  {Object.entries(contactTypeIcons).map(([key, type]) => (
                    <option key={key} value={key}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="unread">Non lus</option>
                  <option value="read">Lus</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Messages ({filteredMessages.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredMessages.map((message) => {
                    const typeConfig = contactTypeIcons[message.contact_type] || {}
                    const IconComponent = typeConfig.icon || FileText

                    return (
                      <div
                        key={message.message_id}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedMessage?.message_id === message.message_id
                            ? "bg-green-50 border-r-4 border-green-500"
                            : ""
                        } ${!message.is_read ? "bg-blue-50" : ""}`}
                        onClick={() => setSelectedMessage(message)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 ${typeConfig.color || "bg-gray-500"} rounded-lg flex items-center justify-center flex-shrink-0`}
                          >
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3
                                className={`font-semibold truncate ${!message.is_read ? "text-gray-900" : "text-gray-700"}`}
                              >
                                {message.name}
                              </h3>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {!message.is_read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                                <span className="text-xs text-gray-500">{formatDate(message.created_at)}</span>
                              </div>
                            </div>
                            <p className={`text-sm truncate mb-1 ${!message.is_read ? "text-gray-900" : "text-gray-600"}`}>
                              {message.subject}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{message.message}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {typeConfig.label || "Autre"}
                              </Badge>
                              {message.newsletter && (
                                <Badge variant="secondary" className="text-xs">
                                  Newsletter
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            {selectedMessage ? (
              <Card className="sticky top-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Détails du message</CardTitle>
                    {!selectedMessage.is_read && (
                      <Button
                        size="sm"
                        onClick={() => markAsRead(selectedMessage.message_id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Marquer lu
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Nom</label>
                    <p className="text-gray-900">{selectedMessage.name}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Email</label>
                    <p className="text-gray-900">{selectedMessage.email}</p>
                  </div>

                  {selectedMessage.phone && (
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Téléphone</label>
                      <p className="text-gray-900">{selectedMessage.phone}</p>
                    </div>
                  )}

                  {selectedMessage.company && (
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Entreprise</label>
                      <p className="text-gray-900">{selectedMessage.company}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Type de demande</label>
                    <div className="flex items-center gap-2 mt-1">
                      {(() => {
                        const typeConfig = contactTypeIcons[selectedMessage.contact_type] || {}
                        const IconComponent = typeConfig.icon || FileText
                        return (
                          <>
                            <div
                              className={`w-6 h-6 ${typeConfig.color || "bg-gray-500"} rounded flex items-center justify-center`}
                            >
                              <IconComponent className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-gray-900">{typeConfig.label || "Autre"}</span>
                          </>
                        )
                      })()}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Sujet</label>
                    <p className="text-gray-900">{selectedMessage.subject}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Message</label>
                    <div className="bg-gray-50 p-3 rounded-lg mt-1">
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{formatDate(selectedMessage.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedMessage.is_read ? (
                        <Badge variant="secondary">
                          <MailOpen className="h-3 w-3 mr-1" />
                          Lu
                        </Badge>
                      ) : (
                        <Badge variant="default">
                          <Mail className="h-3 w-3 mr-1" />
                          Non lu
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Mail className="h-4 w-4 mr-2" />
                      Répondre par email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-6">
                <CardContent className="p-8 text-center">
                  <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sélectionnez un message</h3>
                  <p className="text-gray-500">Cliquez sur un message dans la liste pour voir ses détails</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
