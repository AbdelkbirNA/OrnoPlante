// src/app/login/LoginClient.jsx
'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { LoginForm } from "@/components/login-form"

export default function LoginClient() {
  const router = useRouter();

  function handleLoginSubmit(event){
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if(!email || !password ){
      alert("Veuillez remplir tous les champs");
      return;
    }

    fetch("http://localhost:8080/api/login", {
      method:"POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ email,password })
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.token){
            localStorage.setItem("token", data.token); 
        router.push('/profile');
      } else {
        alert(data.error);
      }
    })
    .catch(() => alert("error server"));
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm onSubmit={handleLoginSubmit}/>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/LoginBanner.png"
          alt="image"
          fill
          className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
