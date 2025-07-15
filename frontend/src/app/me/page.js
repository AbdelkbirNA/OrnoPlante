"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLogout } from "@/hooks/clearToken";




export default function UserProfile() {
  const logout = useLogout();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Vous n'êtes pas connecté.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Impossible de récupérer les données utilisateur");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <div className="p-4">Chargement...</div>;
  if (error) return <div className="p-4 text-red-500">Erreur : {error}</div>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Profil de utilisateur</h2>
      <p><strong>ID :</strong> {user.user_id}</p>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Inscription :</strong> {new Date(user.registration_date).toLocaleDateString()}</p>
      <Button onClick={logout}>logout</Button>
    </div>
  );
}
