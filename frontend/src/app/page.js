import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
     <div className="relative w-200 h-110 mb-6">
  <Image
    src="/logo.png"
    alt="OrnoPlante Logo"
    fill
    style={{ objectFit: "contain" }}
    priority
  />
</div>
      <h1 className="text-3xl font-bold text-gray-900">
        Bienvenue sur OrnoPlante
      </h1>
      <p className="mt-2 text-gray-600 text-center max-w-sm">
        Une plateforme dédiée à vos plantes, pour les aimer et en prendre soin facilement.
      </p>

      <div className="mt-8 flex gap-4">
        <Link href="/login">
          <Button className="!bg-[#0d7d4b] !text-white hover:!bg-[#0b6a40]">
            Connexion
          </Button>
        </Link>
        <Link href="/register">
          <Button
            variant="outline"
            className="!text-[#0d7d4b] hover:!bg-[#0b6a40] hover:!text-white border-[#0d7d4b]"
          >
            Inscription
          </Button>
        </Link>
      </div>
    </div>
  );
}
