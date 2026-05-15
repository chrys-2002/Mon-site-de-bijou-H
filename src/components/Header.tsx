"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useShop } from "@/context/ShopContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, favoritesCount } = useShop();

  const linkClass = "px-4 py-2 text-sm font-medium transition-colors duration-300";
  const iconClass = "p-2 transition-colors duration-300";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 w-full z-50 glass-dark"
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-wider gradient-text">
          ICE-BI
        </Link>

        <div className="hidden lg:flex items-center space-x-1">
          <Link href="/collection" className={linkClass}>Collection</Link>
          <Link href="/bracelets" className={linkClass}>Bracelets</Link>
          <Link href="/colliers" className={linkClass}>Colliers</Link>
          <Link href="/bagues" className={linkClass}>Bagues</Link>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <ThemeToggle />
          <Link href="/favoris" className={iconClass} title="Favoris">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{favoritesCount}</span>
            )}
          </Link>
          <Link href="/auth/login" className={iconClass} title="Compte">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
          <Link href="/panier" className={iconClass + " relative"} title="Panier">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-black text-white dark:bg-white dark:text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2">
            <div className="flex flex-col space-y-1.5">
              <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block w-5 h-[2px] bg-current rounded-full" />
              <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-[2px] bg-current rounded-full" />
              <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block w-5 h-[2px] bg-current rounded-full" />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden glass-dark">
            <div className="flex flex-col px-4 py-6 space-y-1">
              <Link href="/collection" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl">Collection</Link>
              <Link href="/bracelets" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl">Bracelets</Link>
              <Link href="/colliers" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl">Colliers</Link>
              <Link href="/bagues" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl">Bagues</Link>
              <div className="my-2 gradient-line" />
              <Link href="/favoris" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl">❤️ Favoris</Link>
              <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl">👤 Compte</Link>
              <Link href="/panier" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl">🛒 Panier</Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-xl">📞 Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}