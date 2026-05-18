"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ products: 0, users: 0, orders: 0 });
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!loading && !isLoggedIn) { router.push("/auth/login"); return; }
    fetch("/api/admin/check")
      .then((res) => res.json())
      .then((data) => {
        if (!data.isAdmin) router.push("/");
        else setIsAdmin(true);
        setChecking(false);
      });
  }, [loading, isLoggedIn]);

  useEffect(() => {
    if (isAdmin) {
      fetch("/api/admin/stats").then((res) => res.json()).then((data) => setStats(data));
    }
  }, [isAdmin]);

  if (loading || checking) return null;
  if (!isAdmin) return null;

  return (
    <main className="min-h-screen pt-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Dashboard Admin</h1>
        <p className="text-[var(--text-secondary)] mb-12">Gérez votre boutique ICE-BI</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[{ label: "Produits", value: stats.products, icon: "💎", color: "border-blue-500" },
            { label: "Clients", value: stats.users, icon: "👥", color: "border-green-500" },
            { label: "Commandes", value: stats.orders, icon: "📦", color: "border-orange-500" }].map((stat) => (
            <div key={stat.label} className={`glass rounded-2xl p-6 border-l-4 ${stat.color}`}>
              <div className="flex items-center justify-between">
                <div><p className="text-[var(--text-secondary)] text-sm">{stat.label}</p><p className="text-3xl font-bold">{stat.value}</p></div>
                <span className="text-4xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ href: "/admin/products", icon: "📦", title: "Produits", desc: "Gérer" },
            { href: "/admin/orders", icon: "📋", title: "Commandes", desc: "Voir" },
            { href: "/admin/clients", icon: "👥", title: "Clients", desc: "Voir" },
            { href: "/admin/contacts", icon: "📧", title: "Messages", desc: "Lire" }].map((link) => (
            <a key={link.href} href={link.href} className="glass rounded-2xl p-6 hover:bg-[var(--bg-card)] transition block text-center">
              <span className="text-4xl mb-4 block">{link.icon}</span>
              <h3 className="text-xl font-bold mb-2">{link.title}</h3>
              <p className="text-[var(--text-secondary)] text-sm">{link.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}