"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/* ============================================================
   Icônes vectorielles fines (trait 1.5) — style maison de luxe
   ============================================================ */
const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

const GemIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
    <path d="M2 9h20" />
    <path d="M9 3l3 6 3-6" />
    <path d="M8 9l4 12 4-12" />
  </svg>
);

const UsersIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <circle cx="9" cy="7.5" r="3.25" />
    <path d="M2.5 20c.5-3.5 3-5.5 6.5-5.5s6 2 6.5 5.5" />
    <path d="M15.5 4.6a3.25 3.25 0 010 5.8" />
    <path d="M17.5 14.7c2.2.6 3.6 2.4 4 5.3" />
  </svg>
);

const PackageIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M21 8.2v7.6a2 2 0 01-1 1.73l-7 4.04a2 2 0 01-2 0l-7-4.04a2 2 0 01-1-1.73V8.2a2 2 0 011-1.73l7-4.04a2 2 0 012 0l7 4.04a2 2 0 011 1.73z" />
    <path d="M3.3 7.3L12 12.3l8.7-5" />
    <path d="M12 22V12.3" />
    <path d="M7.5 4.8l9 5.2" />
  </svg>
);

const MailIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="M2.5 7.5L12 13.5l9.5-6" />
  </svg>
);

const ClipboardIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4a3 3 0 016 0" />
    <path d="M9 10.5h6" />
    <path d="M9 14h6" />
    <path d="M9 17.5h3.5" />
  </svg>
);

const ArrowIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

/* ============================================================
   Dashboard
   ============================================================ */
const GOLD = "#e8c47a";

export default function AdminPage() {
  const { isLoggedIn, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ products: 0, users: 0, orders: 0 });

  useEffect(() => {
    if (loading) return;
    if (!isLoggedIn) { router.push("/auth/login"); return; }
    if (!isAdmin) { router.push("/"); return; }
    fetch("/api/admin/stats")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setStats(data))
      .catch(() => {});
  }, [loading, isLoggedIn, isAdmin, router]);

  if (loading || !isAdmin) return null;

  const statCards = [
    { label: "Produits", value: stats.products, icon: GemIcon, note: "au catalogue" },
    { label: "Clients", value: stats.users, icon: UsersIcon, note: "comptes créés" },
    { label: "Commandes", value: stats.orders, icon: PackageIcon, note: "au total" },
  ];

  const navCards = [
    { href: "/admin/products", icon: GemIcon, title: "Produits", desc: "Catalogue, prix et stock" },
    { href: "/admin/orders", icon: ClipboardIcon, title: "Commandes", desc: "Suivi et statuts" },
    { href: "/admin/clients", icon: UsersIcon, title: "Clients", desc: "Comptes et historique" },
    { href: "/admin/contacts", icon: MailIcon, title: "Messages", desc: "Demandes de contact" },
  ];

  return (
    <main className="min-h-screen pt-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 py-14">

        {/* ===== En-tête ===== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="text-xs uppercase tracking-[0.35em] mb-3" style={{ color: GOLD }}>
            ICE-BI — Administration
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Tableau de bord</h1>
            <p className="text-[var(--text-secondary)] text-sm">
              {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-[#e8c47a]/50 via-[var(--border)] to-transparent" />
        </motion.div>

        {/* ===== Statistiques ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-7 relative overflow-hidden group"
            >
              {/* Filet doré supérieur */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
              />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-secondary)] mb-4">
                    {stat.label}
                  </p>
                  <p className="text-5xl font-bold tabular-nums tracking-tight mb-1">{stat.value}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{stat.note}</p>
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border transition-colors duration-300 group-hover:border-[#e8c47a]/60"
                  style={{ borderColor: "var(--border)", color: GOLD, background: "rgba(232,196,122,0.06)" }}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ===== Navigation ===== */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[11px] uppercase tracking-[0.25em] text-[var(--text-secondary)] mb-5"
        >
          Gestion
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {navCards.map((card, i) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={card.href}
                className="glass rounded-2xl p-7 block group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#e8c47a]/40"
                style={{ borderWidth: 1 }}
              >
                {/* Lueur au survol */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(120% 80% at 50% 0%, rgba(232,196,122,0.07), transparent 60%)` }}
                />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center border mb-6 transition-colors duration-300 group-hover:border-[#e8c47a]/60"
                  style={{ borderColor: "var(--border)", color: GOLD, background: "rgba(232,196,122,0.06)" }}
                >
                  <card.icon className="w-[22px] h-[22px]" />
                </div>
                <h3 className="text-lg font-semibold mb-1.5">{card.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm mb-6">{card.desc}</p>
                <span
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition-all duration-300 group-hover:gap-3.5"
                  style={{ color: GOLD }}
                >
                  Ouvrir <ArrowIcon className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
