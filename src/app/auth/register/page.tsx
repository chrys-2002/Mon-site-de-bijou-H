"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/register-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Compte créé ! Redirection...");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setError(data.error || "Erreur lors de l'inscription");
      }
    } catch (err: any) {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 flex items-center justify-center px-4 bg-[var(--bg)]">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-2 text-center text-[var(--text)]">Inscription</h1>
          <p className="text-[var(--text-secondary)] text-center mb-8">Rejoignez la communauté ICE-BI</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-xl mb-6 text-sm">{error}</div>
          )}
          {success && (
            <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded-xl mb-6 text-sm">{success}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text)]">Nom complet</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jean Dupont"
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] px-4 py-3 rounded-xl focus:outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text)]">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com"
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] px-4 py-3 rounded-xl focus:outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text)]">Mot de passe</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] px-4 py-3 rounded-xl focus:outline-none" required />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[var(--text)] text-[var(--bg)] py-3 rounded-full font-semibold hover:opacity-80 transition disabled:opacity-50">
              {loading ? "Création..." : "Créer un compte"}
            </button>
          </form>

          <p className="text-center text-[var(--text-secondary)] mt-8">
            Déjà un compte ? <Link href="/auth/login" className="text-[var(--text)] hover:underline font-semibold">Se connecter</Link>
          </p>
        </div>
      </div>
    </main>
  );
}