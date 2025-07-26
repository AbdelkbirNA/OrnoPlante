import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sprout,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Heart,
  Leaf,
  HelpCircle,
  Shield,
  FileText,
  Users,
  Send,
} from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear();

  return(
<footer className="bg-gradient-to-br from-green-50 to-emerald-50 border-t border-green-100">

  <div className="container mx-auto px-4 py-8">
    {/* Section principale */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {/* Logo et description */}
      <div className="space-y-3">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/main/LOGO.png"
              alt="OrnoPlante Logo"
              width={32}
              height={32}
              style={{ objectFit: "contain" }}
              priority
            />
          <span className="text-2xl font-bold text-green-700">OrnoPlante</span>
        </Link>
        <p className="text-gray-600 text-sm leading-relaxed">
          Votre plateforme de découverte et support intelligent autour des plantes. Découvrez, apprenez et prenez soin de vos plantes avec l'aide de notre IA spécialisée.
        </p>
        <div className="flex space-x-2">
          {[Facebook, Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
            <Button key={i} size="icon" variant="ghost" className="hover:bg-green-100 hover:text-green-700">
              <Icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Leaf className="h-5 w-5 text-green-600" />
          <span>Navigation</span>
        </h3>
        <ul className="space-y-1">
          {[
            { label: "Accueil", href: "/" },
            { label: "Découvrir les plantes", href: "/discover" },
            { label: "Assistant IA", href: "/ai-assistant" },
            { label: "FAQ intelligente", href: "/faq" },
            { label: "Contact", href: "/contact" },
          ].map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className="text-gray-600 hover:text-green-600 transition-colors text-sm">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Liens utiles */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-600" />
          <span>Informations</span>
        </h3>
        <ul className="space-y-1">
          {[
            { label: "À propos", href: "/about", icon: Users },
            { label: "Politique de confidentialité", href: "/privacy", icon: Shield },
            { label: "Conditions d'utilisation", href: "/terms", icon: FileText },
            { label: "Mentions légales", href: "/legal", icon: FileText },
            { label: "Centre d'aide", href: "/help", icon: HelpCircle },
          ].map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <Link href={href} className="text-gray-600 hover:text-green-600 transition-colors text-sm flex items-center space-x-2">
                <Icon className="h-3 w-3" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Mail className="h-5 w-5 text-green-600" />
          <span>Restez informé</span>
        </h3>
        <p className="text-gray-600 text-sm">Recevez nos dernières actualités et conseils pour vos plantes.</p>
        

        <div className="space-y-1 pt-2">
          <h4 className="font-medium text-gray-900">Contact</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex items-center space-x-2">
              <Mail className="h-3 w-3" />
              <span>Ornoplante@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-3 w-3" />
              <span>+212695432671</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-3 w-3" />
              <span>Chtouka,Maroc</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Separator className="bg-green-200" />

    {/* Statistiques */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-6">
      {[
        { label: "Plantes référencées", value: "1000+" },
        { label: "Utilisateurs actifs", value: "5000+" },
        { label: "Assistant IA disponible", value: "24/7" },
        { label: "Satisfaction client", value: "99%" },
      ].map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-2xl font-bold text-green-600">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>

    <Separator className="bg-green-200" />

    {/* Copyright */}
    <div className="flex flex-col md:flex-row justify-between items-center pt-3 text-sm text-gray-600">
      <span>© {currentYear} OrnoPlante. Tous droits réservés.</span>
      
    </div>
  </div>
</footer>
)}