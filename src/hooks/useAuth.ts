"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export function useAuth() {
  const { data: session, status } = useSession();
  const [localUser, setLocalUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try { setLocalUser(JSON.parse(storedUser)); } catch {}
    }
  }, []);

  const user = session?.user || localUser;
  const isLoggedIn = status === "authenticated" || !!localUser;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLocalUser(null);
    signOut({ callbackUrl: "/" });
  };

  return { user, loading: status === "loading", logout, isLoggedIn };
}