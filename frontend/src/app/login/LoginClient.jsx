'use client'
import { useAuth } from "@/lib/auth-context";

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState,useEffect } from 'react'
import { LoginForm } from "@/components/login-form"

export default function LoginClient() {
  const { login } = useAuth();

  const router = useRouter();
  const [error, setError] = useState("");

 

  function handleLoginSubmit(event){
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if(!email || !password ){
      setError("Veuillez remplir tous les champs.");
      return;
    }
      const token = localStorage.getItem("token");


    fetch(`${process.env.NEXT_PUBLIC_API}/api/login`, {
      method:"POST",
      headers: { "Content-Type":"application/json" ,
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    },
      body: JSON.stringify({ email, password })
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.message=="Vous êtes déjà connecté."){
      router.push('/profil');
      return;
      }
      if (data.token) {
  login(data.token);  // Met à jour le contexte automatiquement
  router.push("/profil");  // Pas besoin de router.refresh
} else {
        setError(data.error || "Identifiants incorrects");
      }
    })
    .catch(() => setError("Erreur du serveur"));
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm onSubmit={handleLoginSubmit} error={error} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/main/LoginBanner.png"
          alt="image"
          fill
          className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
