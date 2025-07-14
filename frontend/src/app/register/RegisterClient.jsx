"use client";

import { useState } from "react";
import { RegisterForm } from "@/components/Register-form";
import { useRouter } from "next/navigation";

export default function RegisterClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRegisterSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const data = {
      first_name: form.first_name.value.trim(),
      last_name: form.last_name.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value,
      confirm_password: form["confirm-password"].value,
    };

    if (data.password !== data.confirm_password) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        alert("Inscription réussie !");
        router.push("/login");
      } else {
        alert("Erreur : " + json.error);
      }
    } catch (error) {
      alert("Erreur serveur, veuillez réessayer plus tard.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <RegisterForm onSubmit={handleRegisterSubmit} disabled={loading} />
  );
}
