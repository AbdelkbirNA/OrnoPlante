/* eslint-disable react/no-unescaped-entities */
// pages/env-info.jsx
"use client"
import { useEffect, useState } from "react";

export default function EnvInfo() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API;

  useEffect(() => {
    async function fetchUsers() {
      if (!apiUrl) {
        setError("Variable NEXT_PUBLIC_API non définie");
        return;
      }

      try {
        const res = await fetch(`${apiUrl}/api/users`);
        if (!res.ok) throw new Error(`Erreur: ${res.status}`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchUsers();
  }, [apiUrl]);

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Informations sur l'environnement</h1>
      
      <p>
        <strong>Variable d'environnement NEXT_PUBLIC_API :</strong>
      </p>
      <pre
        style={{
          background: "#f0f0f0",
          padding: 10,
          borderRadius: 5,
          maxWidth: 600,
          wordWrap: "break-word",
        }}
      >
        {apiUrl || "Variable NEXT_PUBLIC_API non définie"}
      </pre>

      <p>
        Cette URL est utilisée pour les appels API dans l'application frontend.
      </p>

      <h2>Test d'appel à l'API : <code>{apiUrl}/api/users</code></h2>

      {error && (
        <p style={{ color: "red" }}>
          ❌ Erreur lors de la récupération : {error}
        </p>
      )}

      {users ? (
        <pre
          style={{
            background: "#e0ffe0",
            padding: 10,
            borderRadius: 5,
            maxWidth: 600,
            overflowX: "auto",
          }}
        >
          {JSON.stringify(users, null, 2)}
        </pre>
      ) : (
        !error && <p>Chargement des utilisateurs...</p>
      )}
    </div>
  );
}
