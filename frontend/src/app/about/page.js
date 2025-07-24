/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Leaf,
  Heart,
  Users,
  Award,
  MapPin,
  Clock,
  Phone,
  Mail,
  TreePine,
  Flower,
  ShoppingCart,
  GraduationCap,
  Truck,
  Star,
  ArrowRight,
  Calendar,
  Shield,
  CheckCircle,
  MessageCircle,
  Camera,
  Zap,
  Target,
  Eye,
  Sparkles,
  Globe,
  Recycle,
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Hero Section - Présentation avec storytelling */}
      <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-green-50 via-emerald-100 to-green-200">
        {/* Formes géométriques décoratives animées */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-400 rotate-45 opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-200 rounded-full opacity-25 animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 bg-emerald-300 rotate-12 opacity-40 animate-spin slow"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-green-700 animate-fade-in">
                <Sparkles className="h-4 w-4" />
                Depuis 2003
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-green-900 leading-tight">
                L'histoire
                <span className="block text-emerald-600">d'OrnoPlante</span>
              </h1>
              <p className="text-lg text-green-800 leading-relaxed">
                Pépinière passionnée qui transforme votre relation avec les plantes depuis plus de 20 ans.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-green-700">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-sm">+5000 plantes</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse delay-300"></div>
                  <span className="font-medium text-sm">+1200 clients</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-700"></div>
                  <span className="font-medium text-sm">Expertise reconnue</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/discover">
                  <Button className="inline-flex h-12 items-center justify-center rounded-2xl bg-green-600 px-6 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl hover:scale-105">
                    <Leaf className="mr-2 h-5 w-5" />
                    Nos plantes
                  </Button>
                </Link>
                <Link href="#story">
                  <Button
                    variant="outline"
                    className="inline-flex h-12 items-center justify-center rounded-2xl border-2 border-green-600 bg-white/80 backdrop-blur-sm px-6 text-base font-semibold text-green-700 shadow-lg transition-all duration-300 hover:bg-green-50 hover:shadow-xl"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Notre histoire
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl rotate-6 opacity-20 animate-pulse"></div>
              <Image
                src="/about/about.jpg"
                alt="Pépinière OrnoPlante"
                width={600}
                height={400}
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[400px] hover:scale-105 transition-transform duration-500"
              />
              
            </div>
          </div>
        </div>
      </section>

      {/* Timeline - Notre Histoire */}
      <section id="story" className="w-full py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">📅 Notre Parcours</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Les moments clés qui ont façonné OrnoPlante</p>
          </div>
          <div className="relative">
            {/* Ligne centrale */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-400 to-emerald-600"></div>
            <div className="space-y-8">
              {[
                {
                  year: "2003",
                  title: "Les débuts",
                  desc: "Création par Naima Mezgouri, passionnée de botanique",
                  icon: Sparkles,
                  side: "left",
                },
                {
                  year: "2008",
                  title: "Première expansion",
                  desc: "Ouverture espace physique et ateliers",
                  icon: TreePine,
                  side: "right",
                },
                {
                  year: "2015",
                  title: "Modernisation",
                  desc: "Développement des services numériques",
                  icon: Zap,
                  side: "left",
                },
                {
                  year: "2020",
                  title: "Innovation tech",
                  desc: "Plateforme en ligne et assistant IA",
                  icon: Zap,
                  side: "right",
                },
                {
                  year: "2022",
                  title: "Reconnaissance",
                  desc: "Certification écologique",
                  icon: Award,
                  side: "left",
                },
                {
                  year: "2025",
                  title: "Aujourd'hui",
                  desc: "+1200 clients, 500+ variétés",
                  icon: Heart,
                  side: "right",
                },
              ].map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div key={index} className={`flex items-center ${item.side === "right" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-1/2 ${item.side === "right" ? "pl-6" : "pr-6"}`}>
                      <Card
                        className={`p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${item.side === "right" ? "ml-auto" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="text-xl font-bold text-green-600 mb-1">{item.year}</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                    <div className="w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                    <div className="w-1/2"></div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques/Chiffres clés */}
      <section className="w-full py-16 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📊 En chiffres</h2>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">Nos résultats parlent d'eux-mêmes</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "5000+", label: "Plantes vendues", icon: Leaf },
              { number: "1200+", label: "Clients satisfaits", icon: Users },
              { number: "500+", label: "Variétés", icon: Flower },
              { number: "98%", label: "Satisfaction", icon: Star },
            ].map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-white/30 transition-colors duration-300">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-1 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-green-100 font-medium text-sm">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative w-full py-16 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-transparent transform -skew-y-1 origin-top-left"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">🎯 Mission & Vision</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Target className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Mission</h3>
                      <p className="text-gray-600 text-sm">
                        Rendre les plantes accessibles avec des espèces locales et durables.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Eye className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Vision</h3>
                      <p className="text-gray-600 text-sm">
                        Référence au Maroc pour l'accompagnement intelligent des plantes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Heart, title: "Nature", color: "from-red-400 to-pink-500" },
                { icon: Globe, title: "Local", color: "from-green-400 to-emerald-500" },
                { icon: Users, title: "Conseil", color: "from-blue-400 to-indigo-500" },
                { icon: Recycle, title: "Durable", color: "from-emerald-400 to-green-500" },
              ].map((item, index) => {
                const IconComponent = item.icon
                return (
                  <Card
                    key={index}
                    className={`p-4 bg-gradient-to-br ${item.color} text-white hover:scale-105 transition-transform duration-300`}
                  >
                    <IconComponent className="h-6 w-6 mb-2" />
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="w-full py-16 bg-gradient-to-br from-emerald-900 via-green-800 to-green-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🌼 Nos Valeurs</h2>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">Les principes qui nous guident</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Leaf,
                title: "Écologie",
                desc: "Respect environnemental",
                color: "from-green-400 to-emerald-500",
              },
              {
                icon: Heart,
                title: "Passion",
                desc: "Au service des plantes",
                color: "from-emerald-400 to-green-500",
              },
              {
                icon: Award,
                title: "Expertise",
                desc: "Savoir-faire pro",
                color: "from-green-500 to-emerald-600",
              },
              {
                icon: Users,
                title: "Proximité",
                desc: "Relation de confiance",
                color: "from-emerald-500 to-green-600",
              },
            ].map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card
                  key={index}
                  className={`relative p-6 bg-gradient-to-br ${value.color} border-0 text-white group hover:scale-105 transition-all duration-300 cursor-pointer`}
                >
                  <div className="relative z-10 text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-white/30 transition-colors duration-300">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-1">{value.title}</h3>
                    <p className="text-white/90 text-sm">{value.desc}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
      {/* Certifications */}
      <section className="w-full py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🏆 Certifications</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Engagement qualité reconnu</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Bio Maroc", desc: "Agriculture bio" },
              { name: "Éco-Label", desc: "Pratiques durables" },
              { name: "Qualité Maroc", desc: "Standards nationaux" },
              { name: "ISO 14001", desc: "Management environnemental" },
            ].map((cert, index) => (
              <Card
                key={index}
                className="p-4 bg-white border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-500 transition-colors duration-300">
                  <Award className="h-6 w-6 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{cert.name}</h3>
                <p className="text-xs text-gray-600">{cert.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="w-full py-16 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">⭐ Pourquoi OrnoPlante ?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Ce qui nous rend uniques</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Assistant IA",
                desc: "Premier IA botanique au Maroc",
                highlight: "Innovation",
              },
              {
                icon: Shield,
                title: "Garantie 30j",
                desc: "Toutes plantes garanties",
                highlight: "Confiance",
              },
              {
                icon: Truck,
                title: "Livraison soignée",
                desc: "Emballage spécialisé",
                highlight: "Qualité",
              },
              {
                icon: GraduationCap,
                title: "Expertise certifiée",
                desc: "Équipe qualifiée",
                highlight: "Savoir-faire",
              },
              {
                icon: Recycle,
                title: "Éco-responsable",
                desc: "Pratiques durables",
                highlight: "Écologie",
              },
              {
                icon: MessageCircle,
                title: "Support 24/7",
                desc: "Assistance continue",
                highlight: "Disponibilité",
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card
                  key={index}
                  className="p-4 bg-white border-2 border-transparent hover:border-green-300 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 group-hover:bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <IconComponent className="h-5 w-5 text-green-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-gray-900">{feature.title}</h3>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          {feature.highlight}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🧑‍🌾 Notre Équipe</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Passionnés dédiés à votre réussite</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Fondatrice */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-xl h-full">
                <div className="grid md:grid-cols-2 gap-4 items-center h-full">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-300 rounded-2xl rotate-6 opacity-30"></div>
                    <Image
                      src="/about/j3.jpg"
                      alt="Naima Mezgouri - Fondatrice"
                      width={250}
                      height={250}
                      className="relative rounded-2xl object-cover w-full h-[250px]"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full">
                      <Award className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">Naima Mezgouri</h3>
                      <p className="text-green-600 font-semibold mb-3">Fondatrice & Experte botanique</p>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Plus de 20 ans d'expérience en horticulture. Vision : démocratiser l'accès aux plantes via la
                      technologie.
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">Expert certifié</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Botanique</span>
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Innovation</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            {/* Autres membres */}
             <div className="space-y-4">
              {[
                {
                  name: "Youssef Alami",
                  role: "Jardinier Expert",
                  desc: "Spécialiste paysagisme",
                  skills: ["Paysagisme"],
                  image: "/about/j1.jpg",
                },
                {
                  name: "Yassine cherki",
                  role: "Conseiller spécialisé",
                  desc: "Plantes d’intérieur & entretien",
                  skills: ["Conseil"],
                  image: "/about/j2.jpg",
                },
              ].map((member, index) => (
                <Card
                  key={index}
                  className="p-4 bg-white border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-2 w-2 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-gray-900">{member.name}</h4>
                      <p className="text-green-600 font-medium text-sm">{member.role}</p>
                      <p className="text-gray-600 text-xs mt-1">{member.desc}</p>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mt-1 inline-block">
                        {member.skills[0]}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      

      {/* Nos Services */}
      <section className="w-full py-16 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🌳 Nos Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Gamme complète pour vos besoins végétaux</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: ShoppingCart,
                title: "Vente plantes",
                desc: "500+ variétés disponibles",
                price: "À partir de 5 DH",
                color: "hover:bg-green-500",
                features: ["Livraison gratuite +200 DH", "Garantie 30 jours"],
              },
              {
                icon: Users,
                title: "Conseils",
                desc: "Accompagnement expert",
                price: "Gratuit",
                color: "hover:bg-emerald-500",
                features: ["Diagnostic plantes", "Plan entretien"],
              },
              {
                icon: TreePine,
                title: "Aménagement",
                desc: "Conception espaces verts",
                price: "Devis gratuit",
                color: "hover:bg-green-600",
                features: ["Design 3D", "Suivi 1 an"],
              },
              {
                icon: GraduationCap,
                title: "Ateliers",
                desc: "Techniques jardinage",
                price: "150 DH/session",
                color: "hover:bg-emerald-600",
                features: ["Max 8 pers", "Certificat"],
              },
              {
                icon: Truck,
                title: "Livraison",
                desc: "Rapide et soignée",
                price: "30 DH",
                color: "hover:bg-green-400",
                features: ["Emballage spécialisé", "Suivi temps réel"],
              },
              {
                icon: Flower,
                title: "Médicinales",
                desc: "Propriétés thérapeutiques",
                price: "À partir de 35 DH",
                color: "hover:bg-emerald-400",
                features: ["Conseils usage", "Origine certifiée"],
              },
            ].map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card
                  key={index}
                  className={` p-4 bg-white border-2 border-transparent hover:border-green-300 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden relative`}
                >
                  <div
                    className={`absolute inset-0 ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>
                  <div className="relative z-10 group-hover:text-white transition-colors duration-500">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-green-100 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors duration-500">
                        <IconComponent className="h-5 w-5 text-green-600 group-hover:text-white transition-colors duration-500" />
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold text-green-600 group-hover:text-white/90 transition-colors duration-500">
                          {service.price}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-white mb-2 transition-colors duration-500">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-white/90 mb-3 text-sm transition-colors duration-500">
                      {service.desc}
                    </p>
                    <div className="space-y-1 mb-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 group-hover:text-white/80 transition-colors duration-500" />
                          <span className="text-xs text-gray-600 group-hover:text-white/90 transition-colors duration-500">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Galerie de réalisations */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">📸 Nos Réalisations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Quelques-uns de nos plus beaux projets</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Jardin moderne", category: "Aménagement", image: "/about/jmoderne.jpg" },
              { title: "Jungle urbaine", category: "Intérieur", image: "/about/jurbaine.jpg" },
              { title: "Terrasse végétale", category: "Extérieur", image: "/about/tvege.jpg" },
              { title: "Bureau végétal", category: "Pro", image: "/about/bvege.jpg" },
              { title: "Jardin thérapeutique", category: "Médicinal", image: "/about/jthera.jpg" },
              { title: "Mur végétal", category: "Commercial", image: "/about/murveg.jpg" },
            ].map((project, index) => (
              <Card
                key={index}
                className="group overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={300}
                    height={200}
                    className="w-full h-[200px] object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs bg-green-500 px-2 py-1 rounded-full">{project.category}</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{project.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{project.category}</span>
                    <Camera className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
        </div>
      </section>

      {/* Certifications */}
      <section className="w-full py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🏆 Certifications</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Engagement qualité reconnu</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Bio Maroc", desc: "Agriculture bio" },
              { name: "Éco-Label", desc: "Pratiques durables" },
              { name: "Qualité Maroc", desc: "Standards nationaux" },
              { name: "ISO 14001", desc: "Management environnemental" },
            ].map((cert, index) => (
              <Card
                key={index}
                className="p-4 bg-white border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-500 transition-colors duration-300">
                  <Award className="h-6 w-6 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{cert.name}</h3>
                <p className="text-xs text-gray-600">{cert.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
