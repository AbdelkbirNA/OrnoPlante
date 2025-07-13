"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { RegisterForm } from "@/components/Register-form"



export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <RegisterForm />
    </div>
  );
}