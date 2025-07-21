/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Leaf, MessageCircle, Search, Star, MapPin, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-green-100 to-emerald-200 overflow-hidden">
        {/* Single background image with subtle animation */}
        <Image
          src="/home/pep.jpg" // <-- Mettez votre chemin d'image ici
          alt="Lush green nursery with potted plants"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="absolute inset-0 z-0 opacity-20 animate-[background-pan_30s_ease-in-out_infinite_alternate]" // Apply animation here
        />

        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center relative z-10">
          {/* Hero text container */}
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-green-900 sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              Prenez soin de vos plantes avec l’intelligence de demain
            </h1>
            <p className="mx-auto max-w-[800px] text-lg text-green-800 md:text-xl">
              Bienvenue chez OrnoPlante, la pépinière intelligente. Explorez, apprenez et entretenez vos plantes avec
              l’aide de notre assistant IA spécialisé.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/plants">
                <Button className="inline-flex h-12 items-center justify-center rounded-full bg-green-600 px-8 text-base font-medium text-white shadow-lg transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">
                  <Leaf className="mr-2 h-5 w-5" />
                  Découvrir nos plantes
                </Button>
              </Link>
              <Link href="/ai-assistant">
                <Button
                  variant="outline"
                  className="inline-flex h-12 items-center justify-center rounded-full border-2 border-green-600 bg-white px-8 text-base font-medium text-green-700 shadow-lg transition-colors hover:bg-green-50 hover:text-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Parler à notre assistant IA
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Nos catégories de plantes */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Explorez nos catégories de plantes
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-lg">
              Que vous soyez débutant ou expert, trouvez la plante parfaite pour votre espace.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-items-center sm:justify-items-start">
            {[
              { name: "Plantes d’intérieur", image: "/plants/pinter.jpg" },
              { name: "Plantes médicinales", image: "/plants/pmedic.jpg" },
              { name: "Plantes grasses et cactus", image: "/plants/pgrasse.jpg" },
              { name: "Plantes d’extérieur", image: "/plants/pext.jpg" },
              { name: "Plantes décoratives", image: "/plants/pdeco.jpg" },
            ].map((category, index) => (
              <Link href={`/categories/${category.name.toLowerCase().replace(/ /g, "-")}`} key={index}>
                <Card className="flex flex-col items-center text-center p-4 bg-green-50 border-green-200 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer h-full w-full max-w-[250px]">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={150}
                    height={150}
                    className="rounded-full object-cover mb-4 aspect-square"
                  />
                  <CardTitle className="text-lg font-semibold text-green-800">{category.name}</CardTitle>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Assistant IA à votre service */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="px-4 md:px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Votre Assistant IA à votre service
            </h2>
            <p className="text-gray-600 md:text-lg">
              Notre chatbot intelligent est là pour répondre à toutes vos questions sur les plantes, 24h/24 et 7j/7.
              Posez une question comme "Pourquoi ma plante jaunit ?" ou "Quel entretien pour un aloe vera ?" L’IA vous
              guide instantanément, en s’appuyant sur notre base de données et les conseils de spécialistes.
            </p>
            <Link href="/ai-assistant">
              <Button className="inline-flex h-12 items-center justify-center rounded-full bg-green-600 px-8 text-base font-medium text-white shadow-lg transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">
                <MessageCircle className="mr-2 h-5 w-5" />
                Tester l'assistant IA
              </Button>
            </Link>
          </div>
          <div className="flex justify-center">
            <Image
              src="/aipl.jpg"
              alt="AI Chatbot interface"
              width={600}
              height={400}
              className="rounded-xl shadow-xl border border-green-200"
            />
          </div>
        </div>
      </section>

      {/* Section: Les fiches plantes les plus consultées */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Les fiches plantes les plus consultées
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-lg">
              Découvrez les plantes qui captivent le plus notre communauté.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center sm:justify-items-start">
            {[
              {
                name: "Monstera Deliciosa",
                scientific: "Monstera deliciosa",
                excerpt: "Arrosage : modéré | Lumière : indirecte",
                image: "/p3.jpg",
              },
              {
                name: "Aloe Vera",
                scientific: "Aloe barbadensis miller",
                excerpt: "Arrosage : faible | Lumière : directe/indirecte",
                image: "/p2.jpg",
              },
              {
                name: "Ficus Lyrata",
                scientific: "Ficus lyrata",
                excerpt: "Arrosage : régulier | Lumière : vive indirecte",
                image: "/p1.jpg",
              },
            ].map((plant, index) => (
              <Card
                key={index}
                className="bg-green-50 border-green-200 shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-[400px]"
              >
                <Image
                  src={plant.image || "/placeholder.svg"}
                  alt={plant.name}
                  width={400}
                  height={300}
                  className="rounded-t-lg object-cover w-full aspect-[4/3]"
                />
                <CardContent className="p-4 space-y-2">
                  <CardTitle className="text-xl font-semibold text-green-800">{plant.name}</CardTitle>
                  <p className="text-sm text-gray-600 italic">{plant.scientific}</p>
                  <p className="text-gray-700">{plant.excerpt}</p>
                  <Link href={`/plants/${plant.name.toLowerCase().replace(/ /g, "-")}`}>
                    <Button
                      variant="outline"
                      className="w-full mt-2 border-green-500 text-green-700 hover:bg-green-100 bg-transparent"
                    >
                      Voir la fiche complète
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section: À propos de HanPlant */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-green-100 to-emerald-100">
        <div className="px-4 md:px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Image
              src="/abt.jpg"
              alt="HanPlant team or nursery"
              width={600}
              height={400}
              className="rounded-xl shadow-xl border border-green-200"
            />
          </div>
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              À propos de OrnoPlante
            </h2>
            <p className="text-gray-600 md:text-lg">
              OrnoPlante, c’est bien plus qu’une simple pépinière.
              C’est une communauté de passionnés, un espace d’innovation où la nature s’allie à la technologie. Nous nous engageons à vous offrir les meilleures solutions pour que vos plantes s’épanouissent et embellissent votre quotidien.
            </p>
            <Link href="/about">
              <Button className="inline-flex h-12 items-center justify-center rounded-full bg-green-600 px-8 text-base font-medium text-white shadow-lg transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">
                En savoir plus sur nous
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section: FAQ intelligente */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="px-4 md:px-6 max-w-7xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">FAQ intelligente</h2>
          <p className="mx-auto max-w-[700px] text-gray-600 md:text-lg">
            Trouvez des réponses rapides à vos questions les plus fréquentes.
          </p>
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row justify-center gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher une question..."
                className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-green-300 focus:border-green-500 focus:ring-green-500 shadow-sm"
              />
            </div>
            <Button className="bg-green-600 hover:bg-green-700 rounded-full px-6">Rechercher</Button>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-6 mx-auto max-w-4xl">
            <Button
              variant="outline"
              className="rounded-full border-green-400 text-green-700 hover:bg-green-50 bg-transparent"
            >
              Comment rempoter une plante ?
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-green-400 text-green-700 hover:bg-green-50 bg-transparent"
            >
              Comment détecter un excès d’eau ?
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-green-400 text-green-700 hover:bg-green-50 bg-transparent"
            >
              Ma plante jaunit, que faire ?
            </Button>
          </div>
        </div>
      </section>

      {/* Section: Témoignages & Avis */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Ce que nos client disent
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-lg">
              Des milliers de passionnés de plantes font confiance à OrnoPlante.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center sm:justify-items-start">
            <Card className="p-6 bg-white border-green-200 shadow-md w-full max-w-[400px]">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                “J’ai sauvé mon ficus grâce au chatbot de OrnoPlante ! Les conseils sont précis et faciles à suivre.”
              </p>
              <p className="font-semibold text-gray-900">– Sarah, Casablanca</p>
            </Card>
            <Card className="p-6 bg-white border-green-200 shadow-md w-full max-w-[400px]">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                “L’interface est intuitive et la variété de plantes est impressionnante. Un must pour tout amateur de
                plantes.”
              </p>
              <p className="font-semibold text-gray-900">– Omar, Rabat</p>
            </Card>
            <Card className="p-6 bg-white border-green-200 shadow-md w-full max-w-[400px]">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                “Grâce à OrnoPlante, j'ai enfin compris comment prendre soin de mes orchidées. L'IA est révolutionnaire !”
              </p>
              <p className="font-semibold text-gray-900">– Fatima, Marrakech</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Section: Contact & Visite physique */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="px-4 md:px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Contactez-nous ou visitez-nous
            </h2>
            <p className="text-gray-600 md:text-lg">
              Nous serions ravis de vous accueillir dans notre pépinière ou de répondre à vos questions.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start space-x-3 text-gray-700">
                <MapPin className="h-6 w-6 text-green-600" />
                <span>Chtouka, Maroc</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3 text-gray-700">
                <Clock className="h-6 w-6 text-green-600" />
                <span>Heures d’ouverture : Lun-Sam, 9h-18h</span>
              </div>
            </div>
            <Link href="/contact">
              <Button className="inline-flex h-12 items-center justify-center rounded-full bg-green-600 px-8 text-base font-medium text-white shadow-lg transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">
                Nous rendre visite
              </Button>
            </Link>
          </div>
          <div className="flex justify-center">
  <div className="w-full max-w-md h-80 rounded-xl overflow-hidden shadow-xl border border-green-200">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3334.7415225185773!2d-8.2895074238468!3d33.29942455710499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda8ef9281414afd%3A0x85d2b442aa14e24b!2sOrnoplantes!5e0!3m2!1sfr!2sma!4v1752848095907!5m2!1sfr!2sma"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>

        </div>
      </section>
    </div>
  )
}
