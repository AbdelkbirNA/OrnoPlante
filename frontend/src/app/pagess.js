"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [token, setToken] = useState(null);
  const [log, setlog] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [profilePicturePreviewUrl, setProfilePicturePreviewUrl] = useState(null);

  useEffect(() => {
    const Token = localStorage.getItem("token");
    if (Token) {
      setToken(Token);
      setlog(true);
    } else {
      setError("Vous n'êtes pas connecté.");
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchProfile(token);
    }
  }, [token]);

  async function fetchProfile(token) {
    try {
      const res = await fetch("http://localhost:8080/api/profil", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Erreur lors de la récupération du profil");

      const data = await res.json();
      setProfilePicturePreviewUrl(data.profile_picture);
      setUserData(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center  bg-white p-4">
      <div className="relative w-200 h-110 mb-6">
        <Image
          src="/logo.png"
          alt="OrnoPlante Logo"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">
        Bienvenue sur OrnoPlante
      </h1>
      <p className="mt-2 text-gray-600 text-center max-w-sm">
        Une plateforme dédiée à vos plantes, pour les aimer et en prendre soin
        facilement.
      </p>

      <div className="mt-8 flex flex-col items-center gap-4">
        {log && userData ? (
          <>
            {/* Ligne image */}
            <div className="flex justify-center">
              <Avatar className="w-25 h-25">
                <AvatarImage
                  src={
                    profilePicturePreviewUrl?.startsWith("blob:")
                      ? profilePicturePreviewUrl
                      : `http://localhost:8080${profilePicturePreviewUrl}`
                  }
                  alt="Photo de profil"
                />
                <AvatarFallback className="text-5xl">
                  {userData.first_name?.[0]}
                  {userData.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            {/* Ligne message */}
            <div className="flex justify-center">
              <h1 className="text-lg text-green-700 font-semibold">
                Vous êtes connecté, {userData.first_name}
              </h1>
            </div>
          </>
        ) : (
          <>
          <div className="flex gap-x-4">
            <Link href="/login">
              <Button className="!bg-[#0d7d4b] !text-white hover:!bg-[#0b6a40]">
                Connexion
              </Button>
            </Link>
            <Link href="/register">
              <Button
                variant="outline"
                className="!text-[#0d7d4b] hover:!bg-[#0b6a40] hover:!text-white border-[#0d7d4b]"
              >
                Inscription
              </Button>
            </Link></div>
          </>
        )}
      </div>
    </div>
  );
}
