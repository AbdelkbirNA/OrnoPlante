"use client";

import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchCurrentUser()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        // Si token invalide, on peut forcer le logout
        if (err.message === "Token invalide ou expiré") {
          handleLogout(true);
        }
      });
  }, []);

  // logout 'silent' pour nettoyage automatique
  function handleLogout(isSilent = false) {
    // 1. Supprimer le token localement
    localStorage.removeItem("token");
    // 2. Vider l’état utilisateur
    setUser(null);

    // 3. Si logout manuel (pas silent), redirection + message optionnel
    if (!isSilent) {
      router.push("/");
    }
  }

  if (loading) return <p className="text-center py-8">Chargement...</p>;
  if (error)
    return (
      <p className="text-center py-8 text-red-600 font-semibold">
        Erreur : {error}
      </p>
    );
  if (!user)
    return (
      <p className="text-center py-8 text-gray-600">
        Vous n’êtes pas connecté. Veuillez vous connecter pour voir votre profil.
      </p>
    );

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Profil Utilisateur</CardTitle>
          <CardDescription>
            Informations personnelles et détails du compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>ID :</strong> {user.user_id}</p>
          <p><strong>Date d'inscription :</strong> {new Date(user.registration_date).toLocaleDateString()}</p>
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={() => handleLogout(false)}>
              Se déconnecter
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
