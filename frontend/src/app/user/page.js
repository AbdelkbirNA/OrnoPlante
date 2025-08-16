"use client";
import { useAuth } from "../../lib/auth-context";

export default function TestUser() {
  const { user, loading, isLoggedIn } = useAuth();

  if (loading) return <p>Chargement...</p>;
  if (!isLoggedIn) return <p>Vous n’êtes pas connecté.</p>;

  return (
    <div>
      <h2>Profil utilisateur :</h2>
      <p>ID : {user.user_id}</p>
      <p>Nom : {user.first_name} {user.last_name}</p>
      <p>Email : {user.email}</p>
      <p>Type : {user.user_type}</p>
    </div>
  );
}
