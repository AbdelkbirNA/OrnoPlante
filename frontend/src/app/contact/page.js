/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  CheckCircle,
  Calendar,
  Zap,
  Star,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  PhoneIcon as WhatsApp,
  Bot,
  Leaf,
  Users,
  Briefcase,
  BookOpen,
  Camera,
  Globe,
} from "lucide-react"

// Types de demandes
const contactTypes = [
  {
    id: "conseil",
    title: "Conseils botaniques",
    description: "Questions sur l'entretien et le choix de plantes",
    icon: Leaf,
    color: "bg-green-500",
    popular: true,
  },
  {
    id: "visite",
    title: "Visite de la pépinière",
    description: "Planifier une visite ou un atelier",
    icon: Calendar,
    color: "bg-blue-500",
    popular: true,
  },
  {
    id: "partenariat",
    title: "Partenariat professionnel",
    description: "Collaboration commerciale ou éducative",
    icon: Briefcase,
    color: "bg-purple-500",
    popular: false,
  },
  {
    id: "media",
    title: "Presse & Médias",
    description: "Demandes journalistiques et interviews",
    icon: Camera,
    color: "bg-orange-500",
    popular: false,
  },
  {
    id: "formation",
    title: "Formation & Ateliers",
    description: "Cours de jardinage et formations",
    icon: BookOpen,
    color: "bg-indigo-500",
    popular: true,
  },
  {
    id: "autre",
    title: "Autre demande",
    description: "Toute autre question ou suggestion",
    icon: MessageCircle,
    color: "bg-gray-500",
    popular: false,
  },
]

// Moyens de contact
const contactMethods = [
  {
    icon: Phone,
    title: "Téléphone",
    value: "+212 6XX XX XX XX",
    description: "Lun-Sam: 9h-18h",
    action: "tel:+212600000000",
    color: "bg-green-500",
  },
  {
    icon: WhatsApp,
    title: "WhatsApp",
    value: "+212 6XX XX XX XX",
    description: "Réponse rapide 24h/7j",
    action: "https://wa.me/212600000000",
    color: "bg-green-600",
  },
  {
    icon: Mail,
    title: "Email",
    value: "contact@ornoplante.ma",
    description: "Réponse sous 24h",
    action: "mailto:contact@ornoplante.ma",
    color: "bg-blue-500",
  },
  {
    icon: Bot,
    title: "Assistant IA",
    value: "Chat en ligne",
    description: "Réponse instantanée",
    action: "/ai-assistant",
    color: "bg-purple-500",
  },
]

// Réseaux sociaux
const socialNetworks = [
  { icon: Facebook, name: "Facebook", url: "#", color: "bg-blue-600" },
  { icon: Instagram, name: "Instagram", url: "#", color: "bg-pink-500" },
  { icon: Youtube, name: "YouTube", url: "#", color: "bg-red-500" },
  { icon: Linkedin, name: "LinkedIn", url: "#", color: "bg-blue-700" },
  { icon: Twitter, name: "Twitter", url: "#", color: "bg-sky-500" },
]

// FAQ
const faqItems = [
  {
    question: "Quels sont vos horaires d'ouverture ?",
    answer: "Nous sommes ouverts du lundi au samedi de 9h à 18h. Fermé le dimanche et jours fériés.",
  },
  {
    question: "Proposez-vous des livraisons ?",
    answer: "Oui, nous livrons dans tout le Maroc. Livraison gratuite pour les commandes de plus de 200 DH.",
  },
  {
    question: "Puis-je visiter la pépinière sans rendez-vous ?",
    answer: "Oui, mais nous recommandons de prendre rendez-vous pour bénéficier de conseils personnalisés.",
  },
  {
    question: "Organisez-vous des ateliers de jardinage ?",
    answer: "Oui, nous organisons des ateliers mensuels. Consultez notre calendrier ou contactez-nous.",
  },
  {
    question: "Offrez-vous des conseils gratuits ?",
    answer: "Oui, nos experts sont disponibles pour des conseils gratuits par téléphone ou en personne.",
  },
]

// Témoignages
const testimonials = [
  {
    name: "Sarah Bennani",
    role: "Particulier",
    content: "Service exceptionnel ! L'équipe m'a aidée à créer un magnifique jardin d'intérieur.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Ahmed Alami",
    role: "Architecte paysagiste",
    content: "Partenaire de confiance pour tous mes projets. Expertise et qualité au rendez-vous.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Fatima Zahra",
    role: "Débutante en jardinage",
    content: "Grâce à leurs conseils, j'ai réussi à faire pousser mes premières plantes !",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    contactType: "conseil",
    subject: "",
    message: "",
    newsletter: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          contactType: "conseil",
          subject: "",
          message: "",
          newsletter: false,
        })
      }, 3000)
    }, 2000)
  }

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative w-full py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white rounded-full opacity-15 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full opacity-5 animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-base font-medium">
              <MessageCircle className="h-6 w-6" />
              Nous sommes là pour vous aider
            </div>

            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-black leading-tight">
                Contactez
                <span className="block text-emerald-200">OrnoPlante</span>
              </h1>
              <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
                Une question sur les plantes ? Besoin de conseils personnalisés ? Notre équipe d'experts est à votre
                écoute pour vous accompagner dans tous vos projets botaniques.
              </p>
            </div>

            {/* Statistiques de contact */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24h</div>
                <div className="text-sm text-green-100">Temps de réponse</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-sm text-green-100">Satisfaction client</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">1200+</div>
                <div className="text-sm text-green-100">Clients accompagnés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">6j/7</div>
                <div className="text-sm text-green-100">Disponibilité</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moyens de contact rapides */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous rapidement</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choisissez le moyen de contact qui vous convient le mieux
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <Card
                  key={index}
                  className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-gray-50 to-white"
                >
                  <div
                    className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-lg font-semibold text-gray-700 mb-2">{method.value}</p>
                  <p className="text-sm text-gray-500 mb-6">{method.description}</p>
                  <Link href={method.action}>
                    <Button className={`${method.color} hover:opacity-90 w-full py-3 rounded-xl`}>Contacter</Button>
                  </Link>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <div className="flex flex-1">
        {/* Formulaire de contact */}
        <main className="flex-1 bg-gray-50">
          <div className="max-w-4xl mx-auto p-8">
            <div className="bg-white rounded-3xl shadow-xl p-10">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Envoyez-nous un message</h2>
                <p className="text-gray-600">Remplissez le formulaire ci-dessous et nous vous répondrons rapidement</p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Message envoyé avec succès !</h3>
                  <p className="text-gray-600 mb-6">
                    Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link href="/ai-assistant">
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Bot className="h-4 w-4 mr-2" />
                        Essayer l'IA en attendant
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Type de demande */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">Type de demande</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {contactTypes.map((type) => {
                        const IconComponent = type.icon
                        return (
                          <label
                            key={type.id}
                            className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                              formData.contactType === type.id
                                ? "border-green-500 bg-green-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="contactType"
                              value={type.id}
                              checked={formData.contactType === type.id}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className={`w-10 h-10 ${type.color} rounded-lg flex items-center justify-center mr-3`}>
                              <IconComponent className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">{type.title}</span>
                                {type.popular && (
                                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                                    Populaire
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">{type.description}</p>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  {/* Informations personnelles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom complet <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="py-3 rounded-xl border-2 border-gray-300 focus:border-green-500"
                        placeholder="Votre nom et prénom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="py-3 rounded-xl border-2 border-gray-300 focus:border-green-500"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="py-3 rounded-xl border-2 border-gray-300 focus:border-green-500"
                        placeholder="+212 6XX XX XX XX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Entreprise/Organisation</label>
                      <Input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="py-3 rounded-xl border-2 border-gray-300 focus:border-green-500"
                        placeholder="Nom de votre entreprise (optionnel)"
                      />
                    </div>
                  </div>

                  {/* Sujet */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sujet <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="py-3 rounded-xl border-2 border-gray-300 focus:border-green-500"
                      placeholder="Résumé de votre demande"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-green-500 resize-none"
                      placeholder="Décrivez votre demande en détail..."
                    />
                  </div>

                  {/* Newsletter */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                    />
                    <label className="text-sm text-gray-700">
                      Je souhaite recevoir la newsletter avec les conseils botaniques et actualités d'OrnoPlante
                    </label>
                  </div>

                  {/* Bouton d'envoi */}
                  <div className="text-center pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-green-600 hover:bg-green-700 px-12 py-4 rounded-2xl text-lg font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-3" />
                          Envoyer le message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </main>

        {/* Sidebar avec informations */}
        <aside className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-8 space-y-10">
            {/* Informations de contact */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                Informations pratiques
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Adresse</h4>
                    <p className="text-gray-600 text-sm">
                      Pépinière OrnoPlante
                      <br />
                      Route de Chtouka
                      <br />
                      Agadir, Maroc
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Horaires</h4>
                    <p className="text-gray-600 text-sm">
                      Lundi - Samedi: 9h - 18h
                      <br />
                      Dimanche: Fermé
                      <br />
                      Jours fériés: Fermé
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Contact direct</h4>
                    <p className="text-gray-600 text-sm">
                      Tél: +212 6XX XX XX XX
                      <br />
                      Email: contact@ornoplante.ma
                      <br />
                      WhatsApp disponible
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Suivez-nous</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialNetworks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <Link
                      key={index}
                      href={social.url}
                      className={`${social.color} text-white p-4 rounded-xl hover:opacity-90 transition-opacity duration-200 flex items-center gap-3`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium text-sm">{social.name}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Témoignages */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Témoignages clients
              </h3>
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg?height=40&width=40"}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                        <p className="text-gray-500 text-xs">{testimonial.role}</p>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm italic">"{testimonial.content}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Urgence */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Urgence ?
              </h3>
              <p className="text-red-700 text-sm mb-4">
                Pour les urgences botaniques (plantes malades, conseils immédiats), contactez-nous directement :
              </p>
              <div className="space-y-2">
                <Link href="tel:+212600000000">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler maintenant
                  </Button>
                </Link>
                <Link href="/ai-assistant">
                  <Button
                    variant="outline"
                    className="w-full border-red-300 text-red-700 hover:bg-red-50 bg-transparent text-sm"
                  >
                    <Bot className="h-4 w-4 mr-2" />
                    Assistant IA 24h/24
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FAQ Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
            <p className="text-lg text-gray-600">Trouvez rapidement les réponses à vos questions</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{item.question}</h3>
                  <div
                    className={`w-8 h-8 bg-green-100 rounded-full flex items-center justify-center transition-transform duration-200 ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  >
                    <HelpCircle className="h-4 w-4 text-green-600" />
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed pt-4">{item.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Vous ne trouvez pas la réponse à votre question ?</p>
            <div className="flex justify-center gap-4">
              <Link href="/ai-assistant">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Bot className="h-4 w-4 mr-2" />
                  Demander à l'IA
                </Button>
              </Link>
              <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent">
                <MessageCircle className="h-4 w-4 mr-2" />
                Nous contacter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Carte et localisation */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Venez nous rendre visite</h2>
            <p className="text-lg text-gray-600">Notre pépinière vous accueille dans un cadre verdoyant</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations pratiques</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Adresse complète</h4>
                      <p className="text-gray-700">
                        Pépinière OrnoPlante
                        <br />
                        Route de Chtouka, Km 15
                        <br />
                        80000 Agadir, Maroc
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Horaires d'ouverture</h4>
                      <p className="text-gray-700">
                        Lundi - Vendredi: 9h00 - 18h00
                        <br />
                        Samedi: 9h00 - 17h00
                        <br />
                        Dimanche: Fermé
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="h-6 w-6 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Visite guidée</h4>
                      <p className="text-gray-700">
                        Visite gratuite sur rendez-vous
                        <br />
                        Durée: 45 minutes
                        <br />
                        Groupes jusqu'à 15 personnes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="https://maps.google.com" className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 py-4">
                    <Globe className="h-5 w-5 mr-2" />
                    Ouvrir dans Maps
                  </Button>
                </Link>
                <Link href="tel:+212600000000">
                  <Button
                    variant="outline"
                    className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent py-4 px-6"
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl rotate-3 opacity-20"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3334.7415225185773!2d-8.2895074238468!3d33.29942455710499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda8ef9281414afd%3A0x85d2b442aa14e24b!2sOrnoplantes!5e0!3m2!1sfr!2sma!4v1752848095907!5m2!1sfr!2sma"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[400px]"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
