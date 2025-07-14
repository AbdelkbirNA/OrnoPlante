import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

export function LoginForm({ className, error, ...props }) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Se connecter à votre compte</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Veuillez saisir votre adresse e-mail et votre mot de passe pour accéder à votre compte.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Adresse e-mail</Label>
          <Input name="email" id="email" type="email" placeholder="exemple@domaine.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Mot de passe</Label>
            <a href="#" className="ml-auto text-sm text-primary underline-offset-4 hover:underline">
              Mot de passe oublié&nbsp;?
            </a>
          </div>
          <Input
            name="password"
            id="password"
            type="password"
            required
            className={cn(error && "border-red-500 focus-visible:ring-red-500")}
          />
          {/* Message d'erreur sous le champ mot de passe */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
        <Button type="submit" className="w-full !bg-[#0d7d4b] !text-white hover:!bg-[#0b6a40]">
          Connexion
        </Button>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        Vous n'avez pas encore de compte ?{" "}
        <a href="/register" className="text-primary underline underline-offset-4">
          Créer un compte
        </a>
      </div>
    </form>
  )
}
