"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Edit, Trash2, Bot, TrendingUp, Clock } from "lucide-react"

export function FAQManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const faqItems = [
    {
      id: 1,
      question: "Ma plante jaunit, que faire ?",
      answer:
        "Le jaunissement des feuilles peut avoir plusieurs causes : excès d'eau, manque de lumière, ou carence nutritionnelle. Vérifiez d'abord l'arrosage et l'exposition.",
      category: "Problèmes courants",
      frequency: 23,
      source: "Chatbot",
      status: "Publié",
      lastUpdated: "Il y a 2 jours",
    },
    {
      id: 2,
      question: "Combien d'eau pour un ficus ?",
      answer:
        "Arrosez votre ficus quand la terre est sèche sur 2-3 cm de profondeur. En général, 1 à 2 fois par semaine en été, moins en hiver.",
      category: "Arrosage",
      frequency: 18,
      source: "Manuel",
      status: "Publié",
      lastUpdated: "Il y a 1 semaine",
    },
    {
      id: 3,
      question: "Comment traiter les pucerons ?",
      answer:
        "Utilisez un mélange d'eau et de savon noir, ou introduisez des coccinelles. Évitez les insecticides chimiques pour préserver l'écosystème.",
      category: "Maladies",
      frequency: 15,
      source: "IA générée",
      status: "En révision",
      lastUpdated: "Il y a 3 jours",
    },
    {
      id: 4,
      question: "Quelle exposition pour une monstera ?",
      answer:
        "La monstera préfère une lumière vive mais indirecte. Évitez le soleil direct qui peut brûler ses feuilles.",
      category: "Exposition",
      frequency: 12,
      source: "Chatbot",
      status: "Publié",
      lastUpdated: "Il y a 5 jours",
    },
    {
      id: 5,
      question: "Comment rempoter une plante ?",
      answer:
        "Rempotez au printemps dans un pot légèrement plus grand. Utilisez un terreau adapté et arrosez modérément après rempotage.",
      category: "Entretien",
      frequency: 9,
      source: "Manuel",
      status: "Publié",
      lastUpdated: "Il y a 1 semaine",
    },
  ]

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getSourceIcon = (source) => {
    switch (source) {
      case "Chatbot":
        return <Bot className="h-4 w-4" />
      case "IA générée":
        return <Bot className="h-4 w-4 text-purple-600" />
      default:
        return <Edit className="h-4 w-4" />
    }
  }

  const getSourceColor = (source) => {
    switch (source) {
      case "Chatbot":
        return "bg-blue-100 text-blue-800"
      case "IA générée":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Publié":
        return "bg-green-100 text-green-800"
      case "En révision":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">FAQ & Questions</h1>
          <p className="text-muted-foreground">Gérez la FAQ intelligente et les questions du chatbot</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Bot className="mr-2 h-4 w-4" />
            Enrichir avec IA
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter FAQ
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle FAQ</DialogTitle>
                <DialogDescription>Créez une nouvelle entrée pour la FAQ.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="question" className="text-right">
                    Question
                  </Label>
                  <Input id="question" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="answer" className="text-right">
                    Réponse
                  </Label>
                  <Textarea id="answer" className="col-span-3" rows={4} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Catégorie
                  </Label>
                  <Input id="category" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                  Ajouter la FAQ
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total FAQ</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{faqItems.length}</div>
            <p className="text-xs text-muted-foreground">+3 cette semaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Générées par IA</CardTitle>
            <Bot className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{faqItems.filter((item) => item.source === "IA générée").length}</div>
            <p className="text-xs text-muted-foreground">Automatiquement enrichies</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{faqItems.filter((item) => item.status === "En révision").length}</div>
            <p className="text-xs text-muted-foreground">À réviser</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Base de connaissances FAQ</CardTitle>
          <CardDescription>Questions fréquentes et réponses automatiquement enrichies</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans la FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Fréquence</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Mis à jour</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFAQ.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium max-w-xs">
                    <div className="truncate">{item.question}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-muted-foreground" />
                      {item.frequency}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSourceColor(item.source)}>
                      <div className="flex items-center gap-1">
                        {getSourceIcon(item.source)}
                        {item.source}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{item.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
