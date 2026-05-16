"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CommandesPage() {
  const { user, isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/auth/login");
    }
  }, [loading, isLoggedIn, router]);

  if (loading) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-[var(--text-secondary)]">Chargement...</p>
      </main>
    );
  }

  if (!isLoggedIn) return null;

  return (
    <main className="min-h-screen pt-20 bg-[var(--bg)]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Mes Commandes</h1>
        <div className="glass rounded-2xl p-12 text-center">
          <span className="text-6xl mb-6 block">📦</span>
          <h2 className="text-2xl font-bold mb-4">Aucune commande</h2>
          <p className="text-[var(--text-secondary)] mb-8">Vous n&apos;avez pas encore passé de commande</p>
          <Link
            href="/collection"
            className="inline-block bg-[var(--text)] text-[var(--bg)] px-8 py-3 rounded-full font-semibold hover:opacity-80 transition"
          >
            Commencer le shopping
          </Link>
        </div>
      </div>
    </main>
  );
}