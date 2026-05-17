"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) return "Le mot de passe doit contenir au moins 8 caractères";
    if (!/[A-Z]/.test(pwd)) return "Le mot de passe doit contenir au moins une majuscule";
    if (!/[a-z]/.test(pwd)) return "Le mot de passe doit contenir au moins une minuscule";
    if (!/[0-9]/.test(pwd)) return "Le mot de passe doit contenir au moins un chiffre";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return "Le mot de passe doit contenir au moins un caractère spécial";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const passwordError = validatePassword(password);
    if (passwordError) { setError(passwordError); setLoading(false); return; }
    if (password !== confirmPassword) { setError("Les mots de passe ne correspondent pas"); setLoading(false); return; }

    try {
      const res = await fetch("/api/auth/register-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Compte créé ! Connexion automatique...");
        
        // Connexion automatique
        const loginRes = await fetch("/api/auth/login-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const loginData = await loginRes.json();
        if (loginRes.ok) {
          localStorage.setItem("token", loginData.token);
          localStorage.setItem("user", JSON.stringify(loginData.user));
        }
        
        setTimeout(() => { window.location.href = "/"; }, 500);
      } else {
        setError(data.error || "Erreur lors de l'inscription");
      }
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] px-4 py-3 rounded-xl focus:outline-none pr-12";

  return (
    <main className="min-h-screen pt-20 flex items-center justify-center px-4 bg-[var(--bg)]">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-2 text-center text-[var(--text)]">Inscription</h1>
          <p className="text-[var(--text-secondary)] text-center mb-8">Rejoignez la communauté ICE-BI</p>

          {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-xl mb-6 text-sm">{error}</div>}
          {success && <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded-xl mb-6 text-sm">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text)]">Nom complet</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jean Dupont" className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text)]">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text)]">Mot de passe</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputClass} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text)]">
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <p className="text-[var(--text-secondary)] text-xs mt-1">Min. 8 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text)]">Confirmer le mot de passe</label>
              <div className="relative">
                <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className={inputClass} required />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text)]">
                  {showConfirm ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[var(--text)] text-[var(--bg)] py-3 rounded-full font-semibold hover:opacity-80 transition disabled:opacity-50">
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