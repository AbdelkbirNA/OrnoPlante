// src/lib/auth.js
export async function fetchCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const res = await fetch("http://localhost:8080/api/me", {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Token invalide ou expiré");

  const user = await res.json();
  return user;
}
