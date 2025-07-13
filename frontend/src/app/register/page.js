"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

function RegisterForm({
  className,
  ...props
}) {
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const confirm = form.confirm_password.value;
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    // Ici tu peux envoyer les données au backend
    // ...
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-[#0d7d4b]">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create a new account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="first_name">First Name</Label>
          <Input id="first_name" name="first_name" type="text" placeholder="John" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="last_name">Last Name</Label>
          <Input id="last_name" name="last_name" type="text" placeholder="Doe" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirm_password">Confirm Password</Label>
          <Input id="confirm_password" name="confirm_password" type="password" required />
        </div>
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}
        <Button type="submit" className="w-full !bg-[#0d7d4b] !text-white hover:!bg-[#0b6a40]">
          Register
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <RegisterForm />
    </div>
  );
}