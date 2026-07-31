"use client";

import { useSession, signOut } from "next-auth/react";

interface SessionUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

export function useAuth() {
  const { data: session, status } = useSession();

  const user = (session?.user as SessionUser | undefined) ?? null;
  const isLoggedIn = status === "authenticated";
  const isAdmin = user?.role === "admin";

  const logout = () => {
    // Nettoyage des restes de l'ancien système d'auth locale
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    signOut({ callbackUrl: "/" });
  };

  return { user, loading: status === "loading", logout, isLoggedIn, isAdmin };
}
