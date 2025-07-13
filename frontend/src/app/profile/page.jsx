"use client"; // Comme tu utilises localStorage et fetch côté client

import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "@/lib/auth";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCurrentUser()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!user) return <p>Utilisateur non connecté</p>;

  return (
    <div>
      <h1>Profil utilisateur</h1>
      <p>Email : {user.email}</p>
      <p>ID : {user.user_id}</p>
      <p>Date d'inscription : {new Date(user.registration_date).toLocaleDateString()}</p>
    </div>
  );
}
