"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useShop } from "@/context/ShopContext";
import { useAuth } from "@/hooks/useAuth";
import { HeartIcon, UserIcon, BagIcon, PhoneIcon, SettingsIcon, LogoutIcon } from "@/components/icons";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, favoritesCount } = useShop();
  const { user, logout, isLoggedIn, isAdmin } = useAuth();

  // Transparent en haut de page → flou translucide dès qu'on scrolle
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 w-full z-50 ${scrolled || menuOpen ? "header-blur" : "header-clear"}`}
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
            {/* Cœur — trait fin */}
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M12 20.6S3.2 15.3 3.2 9.4a4.9 4.9 0 018.8-3 4.9 4.9 0 018.8 3c0 5.9-8.8 11.2-8.8 11.2z" />
            </svg>
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#e8c47a] text-black text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">{favoritesCount}</span>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="p-1.5 md:p-2 text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors flex items-center gap-1.5" title={user?.name || "Compte"}>
                {/* Profil — trait fin */}
                <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="3.75" />
                  <path d="M4.5 20.5c.7-4 3.4-6 7.5-6s6.8 2 7.5 6" />
                </svg>
                <span className="text-xs md:text-sm font-medium truncate max-w-[60px] md:max-w-[100px] hidden sm:block">{user?.name?.split(" ")[0]}</span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 glass-strong rounded-2xl p-2 min-w-[160px] shadow-xl z-50">
                  <Link href="/profil" onClick={() => setProfileOpen(false)} className="block px-4 py-2.5 text-sm rounded-xl hover:bg-white/10">Mon Profil</Link>
                  <Link href="/profil/commandes" onClick={() => setProfileOpen(false)} className="block px-4 py-2.5 text-sm rounded-xl hover:bg-white/10">Mes Commandes</Link>
                  {isAdmin && <Link href="/admin" onClick={() => setProfileOpen(false)} className="block px-4 py-2.5 text-sm rounded-xl hover:bg-white/10">Dashboard</Link>}
                  <hr className="my-1 border-[var(--border)]" />
                  <button onClick={() => { logout(); setProfileOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm text-red-400 rounded-xl hover:bg-red-500/10">Déconnexion</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/login" className="p-1.5 md:p-2 text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors" title="Compte">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="3.75" />
                <path d="M4.5 20.5c.7-4 3.4-6 7.5-6s6.8 2 7.5 6" />
              </svg>
            </Link>
          )}

          <Link href="/panier" className="p-1.5 md:p-2 text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors relative" title="Panier">
            {/* Sac boutique — trait fin, esprit maison de luxe */}
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M5.5 8h13l-.9 11.2a2 2 0 01-2 1.8H8.4a2 2 0 01-2-1.8L5.5 8z" />
              <path d="M8.5 10.5V6.75a3.5 3.5 0 017 0v3.75" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#e8c47a] text-black text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
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
              <Link href="/favoris" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm flex items-center gap-3"><HeartIcon className="w-4 h-4 text-[var(--text-secondary)]" /> Favoris ({favoritesCount})</Link>
              {isLoggedIn ? (
                <>
                  <Link href="/profil" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm flex items-center gap-3"><UserIcon className="w-4 h-4 text-[var(--text-secondary)]" /> {user?.name}</Link>
                  {isAdmin && <Link href="/admin" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm flex items-center gap-3"><SettingsIcon className="w-4 h-4 text-[var(--text-secondary)]" /> Dashboard</Link>}
                  <button onClick={() => { logout(); setMenuOpen(false); }} className="px-4 py-3 rounded-xl text-sm text-red-400 text-left flex items-center gap-3"><LogoutIcon className="w-4 h-4" /> Déconnexion</button>
                </>
              ) : (
                <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm flex items-center gap-3"><UserIcon className="w-4 h-4 text-[var(--text-secondary)]" /> Connexion</Link>
              )}
              <Link href="/panier" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm flex items-center gap-3"><BagIcon className="w-4 h-4 text-[var(--text-secondary)]" /> Panier ({cartCount})</Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl text-sm flex items-center gap-3"><PhoneIcon className="w-4 h-4 text-[var(--text-secondary)]" /> Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}