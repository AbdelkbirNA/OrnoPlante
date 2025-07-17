import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-green-700">Bienvenue sur PlantHive</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Votre plateforme de découverte et support intelligent autour des plantes avec IA
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2">🌱 Découvrir</h3>
              <p className="text-muted-foreground">Explorez notre collection de plantes avec fiches détaillées</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2">💬 Assistant IA</h3>
              <p className="text-muted-foreground">Posez vos questions à notre IA spécialisée dans les plantes</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2">❓ FAQ intelligente</h3>
              <p className="text-muted-foreground">Trouvez rapidement des réponses à vos questions</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
