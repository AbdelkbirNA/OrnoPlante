import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, TrendingUp, Users, Clock, ThumbsUp, ThumbsDown, AlertCircle } from "lucide-react"

export function ChatbotAnalytics() {
  const stats = [
    {
      title: "Conversations totales",
      value: "1,429",
      change: "+23% vs mois dernier",
      icon: MessageSquare,
      color: "text-blue-600",
    },
    {
      title: "Utilisateurs uniques",
      value: "892",
      change: "+8% cette semaine",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Temps de réponse moyen",
      value: "1.2s",
      change: "-0.3s vs mois dernier",
      icon: Clock,
      color: "text-purple-600",
    },
    {
      title: "Taux de satisfaction",
      value: "94%",
      change: "+2% ce mois",
      icon: ThumbsUp,
      color: "text-orange-600",
    },
  ]

  const topQuestions = [
    { question: "Ma plante jaunit, que faire ?", count: 23, satisfaction: 95 },
    { question: "Combien d'eau pour un ficus ?", count: 18, satisfaction: 92 },
    { question: "Comment traiter les pucerons ?", count: 15, satisfaction: 88 },
    { question: "Quelle exposition pour une monstera ?", count: 12, satisfaction: 96 },
    { question: "Comment rempoter une plante ?", count: 9, satisfaction: 90 },
  ]

  const categories = [
    { name: "Arrosage", count: 45, percentage: 32 },
    { name: "Maladies", count: 38, percentage: 27 },
    { name: "Exposition", count: 28, percentage: 20 },
    { name: "Rempotage", count: 18, percentage: 13 },
    { name: "Nutrition", count: 11, percentage: 8 },
  ]

  const recentFeedback = [
    {
      message: "Très utile pour diagnostiquer le problème de ma plante !",
      rating: "positive",
      category: "Diagnostic",
      time: "Il y a 2h",
    },
    {
      message: "La réponse était un peu générale, j'aurais aimé plus de détails",
      rating: "neutral",
      category: "Arrosage",
      time: "Il y a 4h",
    },
    {
      message: "Parfait ! J'ai pu sauver ma monstera grâce aux conseils",
      rating: "positive",
      category: "Soins",
      time: "Il y a 6h",
    },
    {
      message: "Réponse rapide mais pas assez précise pour mon cas",
      rating: "negative",
      category: "Maladies",
      time: "Il y a 8h",
    },
  ]

  const getFeedbackIcon = (rating) => {
    switch (rating) {
      case "positive":
        return <ThumbsUp className="h-4 w-4 text-green-600" />
      case "negative":
        return <ThumbsDown className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
    }
  }

  const getFeedbackColor = (rating) => {
    switch (rating) {
      case "positive":
        return "border-green-200 bg-green-50"
      case "negative":
        return "border-red-200 bg-red-50"
      default:
        return "border-yellow-200 bg-yellow-50"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Chatbot</h1>
        <p className="text-muted-foreground">Performances et insights de votre assistant IA</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Questions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Questions les plus fréquentes
            </CardTitle>
            <CardDescription>Top 5 des questions posées au chatbot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topQuestions.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.question}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {item.count} fois
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.satisfaction}% satisfaction</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={item.satisfaction} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par catégorie</CardTitle>
            <CardDescription>Distribution des questions par thème</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{category.count}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Retours récents</CardTitle>
          <CardDescription>Derniers commentaires des utilisateurs sur le chatbot</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentFeedback.map((feedback, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getFeedbackColor(feedback.rating)}`}>
                <div className="flex items-start gap-3">
                  {getFeedbackIcon(feedback.rating)}
                  <div className="flex-1">
                    <p className="text-sm">{feedback.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {feedback.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{feedback.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
