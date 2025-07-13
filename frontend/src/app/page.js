import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="relative w-48 h-48 mb-6">
        <Image
          src="/logo.png"       // Remplace par ton fichier logo dans /public
          alt="OrnoPlante Logo"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">
        Bienvenue sur OrnoPlante
      </h1>
      <p className="mt-2 text-gray-600 text-center max-w-sm">
        Une plateforme dédiée à vos plantes, pour les aimer et en prendre soin facilement.
      </p>
    </div>
  )
}
