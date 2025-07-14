import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm({ className, disabled, ...props }) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-[#0d7d4b]">Créer un compte</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Remplissez les informations ci-dessous pour créer votre compte.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="first_name">Prénom</Label>
          <Input id="first_name" name="first_name" type="text" required disabled={disabled} />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="last_name">Nom</Label>
          <Input id="last_name" name="last_name" type="text" required disabled={disabled} />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Adresse e-mail</Label>
          <Input id="email" name="email" type="email" placeholder="exemple@gmail.com" required disabled={disabled} />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" name="password" type="password" required disabled={disabled} />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
          <Input id="confirm-password" name="confirm-password" type="password" required disabled={disabled} />
        </div>

        <Button type="submit" className="w-full !bg-[#0d7d4b] !text-white hover:!bg-[#0b6a40]" disabled={disabled}>
          {disabled ? "Création en cours..." : "Créer un compte"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Vous avez déjà un compte ?{" "}
        <a href="/login" className="underline underline-offset-4">
          Se connecter
        </a>
      </div>
    </form>
  )
}
