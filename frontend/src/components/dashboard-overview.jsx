"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  MessageSquare,
  Users,
  TrendingUp,
  Eye,
  HelpCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Plantes",
      value: "247",
      change: "+12",
      changePercent: "+5.1%",
      trend: "up",
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Questions Chatbot",
      value: "1,429",
      change: "+267",
      changePercent: "+23%",
      trend: "up",
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Utilisateurs Actifs",
      value: "892",
      change: "+67",
      changePercent: "+8.1%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      title: "Taux de Satisfaction",
      value: "94.2%",
      change: "+1.8%",
      changePercent: "+1.9%",
      trend: "up",
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  ]

  // Données pour le graphique des plantes les plus consultées
  const topPlantsData = [
    { name: "Ficus Benjamina", views: 234, category: "Intérieur", fill: "#10b981" },
    { name: "Monstera Deliciosa", views: 198, category: "Tropicale", fill: "#3b82f6" },
    { name: "Lavande", views: 167, category: "Médicinale", fill: "#8b5cf6" },
    { name: "Pothos", views: 145, category: "Intérieur", fill: "#f59e0b" },
    { name: "Aloe Vera", views: 132, category: "Succulente", fill: "#ef4444" },
  ]

  // Données pour l'évolution des questions
  const questionsEvolutionData = [
    { month: "Jan", questions: 89, satisfaction: 91 },
    { month: "Fév", questions: 125, satisfaction: 89 },
    { month: "Mar", questions: 167, satisfaction: 92 },
    { month: "Avr", questions: 203, satisfaction: 94 },
    { month: "Mai", questions: 245, satisfaction: 93 },
    { month: "Juin", questions: 289, satisfaction: 95 },
    { month: "Juil", questions: 312, satisfaction: 94 },
  ]

  // Données pour la répartition des catégories
  const categoriesData = [
    { name: "Arrosage", value: 32, fill: "#10b981" },
    { name: "Maladies", value: 27, fill: "#3b82f6" },
    { name: "Exposition", value: 20, fill: "#8b5cf6" },
    { name: "Rempotage", value: 13, fill: "#f59e0b" },
    { name: "Nutrition", value: 8, fill: "#ef4444" },
  ]

  const chartConfig = {
    views: {
      label: "Vues",
      color: "hsl(var(--chart-1))",
    },
    questions: {
      label: "Questions",
      color: "hsl(var(--chart-2))",
    },
    satisfaction: {
      label: "Satisfaction",
      color: "hsl(var(--chart-3))",
    },
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Tableau de bord
          </h1>
          <p className="text-muted-foreground mt-2">Vue d'ensemble de votre plateforme PlantHive</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Système opérationnel
          </Badge>
        </div>
      </div>

      {/* Stats Cards avec design amélioré */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className={`${stat.bgColor} ${stat.borderColor} border-2 hover:shadow-lg transition-all duration-300`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center mt-2">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.changePercent}
                </span>
                <span className="text-sm text-muted-foreground ml-1">vs mois dernier</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Graphique des plantes les plus consultées */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Plantes les plus consultées
            </CardTitle>
            <CardDescription>Top 5 des fiches les plus vues ce mois</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPlantsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="views" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Évolution des questions du chatbot */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Évolution des questions
            </CardTitle>
            <CardDescription>Questions posées et taux de satisfaction</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionsEvolutionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorQuestions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="questions"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorQuestions)"
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="satisfaction"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Répartition des catégories de questions */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-purple-600" />
              Répartition des questions
            </CardTitle>
            <CardDescription>Par catégorie de problème</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoriesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoriesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Métriques rapides */}
        <Card className="md:col-span-2 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-orange-600" />
              Métriques en temps réel
            </CardTitle>
            <CardDescription>Indicateurs de performance actuels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Temps de réponse IA</span>
                  <span className="text-sm text-muted-foreground">1.2s</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: "85%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Disponibilité système</span>
                  <span className="text-sm text-muted-foreground">99.8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: "99.8%" }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Précision des réponses</span>
                  <span className="text-sm text-muted-foreground">94.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: "94.2%" }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Engagement utilisateurs</span>
                  <span className="text-sm text-muted-foreground">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: "87%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section des alertes et notifications */}
      <Card className="border-l-4 border-l-blue-500 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Eye className="h-5 w-5" />
            Insights & Recommandations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-sm">Pic d'activité détecté</p>
                <p className="text-sm text-muted-foreground">+23% de questions sur l'arrosage cette semaine</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-sm">Nouvelle tendance</p>
                <p className="text-sm text-muted-foreground">Les plantes tropicales gagnent en popularité</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
