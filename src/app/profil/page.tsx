"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserIcon } from "@/components/icons";

export default function ProfilPage() {
  const { user, isLoggedIn, loading } = useAuth();
  const router = useRouter();

  // Rediriger vers login si pas connecté
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/auth/login");
    }
  }, [loading, isLoggedIn, router]);

  // Afficher un chargement pendant la vérification
  if (loading) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-[var(--text-secondary)]">Chargement...</p>
      </main>
    );
  }

  // Si pas connecté, ne rien afficher (la redirection va se faire)
  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <main className="min-h-screen pt-20 bg-[var(--bg)]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Mon Profil</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="glass rounded-2xl p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 border border-[#e8c47a]/30 text-[#e8c47a] bg-[#e8c47a]/5">
                  <UserIcon className="w-8 h-8" />
                </div>
                <h3 className="font-bold">{user.name || "Utilisateur"}</h3>
                <p className="text-[var(--text-secondary)] text-sm">{user.email}</p>
              </div>
              
              <nav className="space-y-2">
                <Link href="/profil" className="block bg-[var(--bg-card)] px-4 py-2 rounded-lg font-medium">
                  Informations
                </Link>
                <Link href="/profil/commandes" className="block px-4 py-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-card)] transition">
                  Mes commandes
                </Link>
              </nav>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="md:col-span-2">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Informations personnelles</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1">Nom</label>
                  <p className="text-lg">{user.name || "Non renseigné"}</p>
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1">Email</label>
                  <p className="text-lg">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}