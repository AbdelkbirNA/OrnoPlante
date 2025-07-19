"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  Leaf,
  MessageCircle,
  HelpCircle,
  Phone,
  User,
  LogIn,
  LogOut,
  Menu,
  Sprout,
  Settings,
  Info,
} from "lucide-react"

// Hook auth centralisé
function useAuth() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Charger token depuis localStorage au montage
  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) {
      setToken(savedToken)
    }
    setLoading(false)
  }, [])

  // Charger profil utilisateur quand token est disponible
  useEffect(() => {
    if (!token) {
      setUser(null)
      return
    }
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const res = await fetch("http://localhost:8080/api/profil", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        if (!res.ok) {
          throw new Error("Impossible de récupérer le profil")
        }
        const data = await res.json()
        setUser(data)
        setError(null)
      } catch (err) {
        setError(err.message)
        setToken(null)
        setUser(null)
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [token])

  // Fonction déconnexion
  function logout() {
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
  }

  // Fonction connexion simple (pour exemple)
  function login(newToken) {
    localStorage.setItem("token", newToken)
    setToken(newToken)
  }

  return {
    token,
    user,
    loading,
    error,
    login,
    logout,
    isLoggedIn: Boolean(token && user),
  }
}

// Navigation principale
const navigationItems = [
  {
    name: "Accueil",
    href: "/",
    icon: Home,
    description: "Présentation du projet / plateforme",
  },{
    name: "À propos", // <-- Nouvel élément ajouté
    href: "/about",
    icon: Info, // <-- Changez cette ligne pour l'icône désirée
    description: "En savoir plus sur notre projet",
  },
  {
    name: "Plantes",
    href: "/plants",
    icon: Leaf,
    description: "Liste ou galerie de plantes",
  },
  {
    name: "Assistant IA",
    href: "/ai-assistant",
    icon: MessageCircle,
    description: "Accès au chatbot",
  },
  
  {
    name: "Contact",
    href: "/contact",
    icon: Phone,
    description: "Informations de contact",
  },
]

export default function Navbar() {
  const pathname = usePathname()
  const { isLoggedIn, user, logout, loading, error } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="OrnoPlante Logo"
              width={32}
              height={32}
              style={{ objectFit: "contain" }}
              priority
            />
            <span className="text-xl font-bold text-green-700">OrnoPlante</span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center space-x-2 ${
                      isActive ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Section Utilisateur Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {loading ? (
              <div className="flex items-center space-x-3 h-12 px-4 bg-white/50 backdrop-blur-sm border border-white/20 shadow-md rounded-2xl animate-pulse">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="flex flex-col space-y-1">
                  <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  <div className="h-2 w-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            ) : isLoggedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-3 h-12 px-4 bg-white/70 hover:bg-green-50/80 backdrop-blur-sm border border-white/20 hover:border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group"
                  >
                    <div className="relative">
                      <Avatar className="h-8 w-8 ring-1 ring-white/30 shadow-md">
                        <AvatarImage src={`http://localhost:8080${user.profile_picture}`} alt="Photo de profil" />
                      </Avatar>
                    </div>
                    <div className="flex flex-col w-20 items-start">
                      <span className="font-semibold text-gray-900 group-hover:text-green-800 transition-colors">
                        {user.first_name ?? user.name ?? "Utilisateur"}
                      </span>
                      <div className="flex items-center space-x-1">
                        <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-emerald-600 font-medium">{user.status ?? "Actif"}</span>
                      </div>
                    </div>
                    <Settings className="h-4 w-4 text-gray-400 group-hover:text-green-600 group-hover:rotate-90 transition-all duration-300" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-64 bg-white/95 backdrop-blur-sm border border-white/20 shadow-xl"
                >
                  <div className="px-3 py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`http://localhost:8080${user.profile_picture}`} alt="Photo de profil" />
                        <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                          {(user.first_name ?? user.name ?? "U")?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">
                          {user.first_name ?? user.name ?? "Utilisateur"}
                        </span>
                        {user.last_name && <span className="text-sm text-gray-600">{user.last_name}</span>}
                        {user.email && <span className="text-xs text-gray-500 truncate max-w-40">{user.email} </span>}
                      </div>
                    </div>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/profil" className="flex items-center space-x-2 px-3 py-2">
                      <User className="h-4 w-4" />
                      <span>Mon profil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Se connecter</span>
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-green-600 hover:bg-green-700">S'inscrire</Button>
                </Link>
              </>
            )}
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-lg">
                      <Sprout className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-green-700">OrnoPlante</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {/* Navigation Mobile */}
                  <div className="space-y-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                          <Button
                            variant={isActive ? "default" : "ghost"}
                            className={`w-full justify-start space-x-3 ${
                              isActive ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-50"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <div className="text-left">
                              <div>{item.name}</div>
                              <div className="text-xs text-muted-foreground">{item.description}</div>
                            </div>
                          </Button>
                        </Link>
                      )
                    })}
                  </div>

                  {/* Section Utilisateur Mobile */}
                  <div className="border-t pt-4 space-y-2">
                    {loading ? (
                      <div className="flex items-center space-x-3 px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/20 shadow-md rounded-2xl animate-pulse">
                        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                        <div className="flex flex-col space-y-2">
                          <div className="h-3 w-20 bg-gray-200 rounded"></div>
                          <div className="h-2 w-16 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ) : isLoggedIn && user ? (
                      <>
                        <div className="flex items-center space-x-3 px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl">
                          <Avatar className="h-10 w-10 ring-1 ring-white/30 shadow-md">
                            <AvatarImage
                              src={
                                user.avatar ||
                                user.profile_picture ||
                                "/placeholder.svg?height=40&width=40" ||
                                "/placeholder.svg" ||
                                "/placeholder.svg" ||
                                "/placeholder.svg"
                              }
                              alt={user.first_name ?? user.name ?? "Utilisateur"}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                              {(user.first_name ?? user.name ?? "U")?.charAt(0)?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900">
                              {user.first_name ?? user.name ?? "Utilisateur"}
                            </span>
                            {user.last_name && <span className="text-sm text-gray-600">{user.last_name}</span>}
                            {user.email && <span className="text-xs text-gray-500">{user.email}</span>}
                            <div className="flex items-center space-x-1 mt-1">
                              <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                              <span className="text-xs text-emerald-600 font-medium">{user.status ?? "Actif"}</span>
                            </div>
                          </div>
                        </div>
                        <Link href="/profil" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start space-x-3">
                            <User className="h-4 w-4" />
                            <span>Mon profil</span>
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            logout()
                            setIsMobileMenuOpen(false)
                          }}
                          className="w-full justify-start space-x-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Se déconnecter</span>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start space-x-3">
                            <LogIn className="h-4 w-4" />
                            <span>Se connecter</span>
                          </Button>
                        </Link>
                        <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button className="w-full bg-green-600 hover:bg-green-700">S'inscrire</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
