// context/auth-context.js
"use client";

import { Router } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger token au démarrage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
    setLoading(false);
  }, []);

  // Charger profil quand token change
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/profil`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Échec de récupération");

        const data = await res.json();
        setUser(data);
      } catch {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
      }
    };

    fetchUser();
  }, [token]);

  function login(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem("token");
    router.push("/");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
