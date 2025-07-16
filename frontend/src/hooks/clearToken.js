// hooks/useLogout.js
"use client";

import { useRouter } from "next/navigation";
import { clearToken } from "../lib/logout";

export function useLogout() {
  const router = useRouter();

  function logout() {
    clearToken();
    router.push("/");
  }

  return logout;
}
