"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

export function useAuth() {
  const { data: session, status } = useSession();
  const [localUser, setLocalUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setLocalUser(parsed);
      } catch {}
    }
  }, []);

  // Vérifier si l'utilisateur est admin
  useEffect(() => {
    const email = session?.user?.email || localUser?.email;
    if (email) {
      fetch("/api/admin/check")
        .then((res) => res.json())
        .then((data) => setIsAdmin(data.isAdmin))
        .catch(() => setIsAdmin(false));
    }
  }, [session, localUser]);

  const user = session?.user || localUser;
  const isLoggedIn = status === "authenticated" || !!localUser;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLocalUser(null);
    setIsAdmin(false);
    signOut({ callbackUrl: "/" });
  };

  return { user, loading: status === "loading", logout, isLoggedIn, isAdmin };
}