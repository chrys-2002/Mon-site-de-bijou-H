"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useShop } from "@/context/ShopContext";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { cartCount, favoritesCount } = useShop();
  const { user, logout, isLoggedIn, isAdmin } = useAuth();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 w-full z-50 glass-dark"
    >
      <nav className="max-w-7xl mx-auto px-3 md:px-6 h-14 md:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="glass-strong px-3 py-2 rounded-xl flex-shrink-0">
          <span className="text-lg md:text-xl font-bold tracking-wider gradient-text">ICE-BI</span>
        </Link>

        {/* Menu desktop */}
        <div className="hidden lg:flex items-center gap-1 glass rounded-full px-2 py-1">
          <Link href="/collection" className="px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors rounded-full">Collection</Link>
          <Link href="/bracelets" className="px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors rounded-full">Bracelets</Link>
          <Link href="/colliers" className="px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors rounded-full">Colliers</Link>
          <Link href="/bagues" className="px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors rounded-full">Bagues</Link>
        </div>

        {/* Icônes + Hamburger */}
        <div className="flex items-center gap-0.5 glass rounded-full px-1.5 py-1 flex-shrink-0">
          <ThemeToggle />

          <Link href="/favoris" className="p-1.5 md:p-2 text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors relative" title="Favoris">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">{favoritesCount}</span>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="p-1.5 md:p-2 text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors" title={user?.name || "Compte"}>
                <span className="text-xs md:text-sm font-medium truncate max-w-[60px] md:max-w-[100px] block">👤 {user?.name?.split(" ")[0]}</span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 glass-strong rounded-2xl p-2 min-w-[160px] shadow-xl z-50">
                  <Link href="/profil" onClick={() => setProfileOpen(false)} className="block px-4 py-2.5 text-sm rounded-xl hover:bg-white/10">Mon Profil</Link>
                  <Link href="/profil/commandes" onClick={() => setProfileOpen(false)} className="block px-4 py-2.5 text-sm rounded-xl hover:bg-white/10">Mes Commandes</Link>
                  {isAdmin && <Link href="/admin" onClick={() => setProfileOpen(false)} className="block px-4 py-2.5 text-sm rounded-xl hover:bg-white/10">⚙️ Dashboard</Link>}
                  <hr className="my-1 border-[var(--border)]" />
                  <button onClick={() => { logout(); setProfileOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm text-red-400 rounded-xl hover:bg-red-500/10">Déconnexion</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/login" className="p-1.5 md:p-2 text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors" title="Compte">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          )}

          <Link href="/panier" className="p-1.5 md:p-2 text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors relative" title="Panier">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-black text-white dark:bg-white dark:text-black text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
            )}
          </Link>

          {/* Hamburger - visible seulement sur mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-1.5 text-[var(--text-secondary)]">
            <div className="flex flex-col gap-1">
              <motion.span animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="block w-4 h-[2px] bg-current rounded-full" />
              <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-4 h-[2px] bg-current rounded-full" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} className="block w-4 h-[2px] bg-current rounded-full" />
            </div>
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden glass-dark">
            <div className="flex flex-col px-4 py-4 gap-0.5">
              <Link href="/collection" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm">Collection</Link>
              <Link href="/bracelets" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm">Bracelets</Link>
              <Link href="/colliers" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm">Colliers</Link>
              <Link href="/bagues" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm">Bagues</Link>
              <div className="my-2 gradient-line" />
              <Link href="/favoris" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm">❤️ Favoris ({favoritesCount})</Link>
              {isLoggedIn ? (
                <>
                  <Link href="/profil" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm">👤 {user?.name}</Link>
                  {isAdmin && <Link href="/admin" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm">⚙️ Dashboard</Link>}
                  <button onClick={() => { logout(); setMenuOpen(false); }} className="px-4 py-3 rounded-xl text-sm text-red-400 text-left">🚪 Déconnexion</button>
                </>
              ) : (
                <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm">👤 Connexion</Link>
              )}
              <Link href="/panier" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm">🛒 Panier ({cartCount})</Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm">📞 Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}