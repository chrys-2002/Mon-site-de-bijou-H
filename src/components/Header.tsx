"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useShop } from "@/context/ShopContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, favoritesCount } = useShop();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800"
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-bold text-black dark:text-white">
          ICE-BI
        </Link>

        <div className="hidden lg:flex items-center space-x-1">
          <Link href="/collection" className="px-4 py-2 text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">Collection</Link>
          <Link href="/bracelets" className="px-4 py-2 text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">Bracelets</Link>
          <Link href="/colliers" className="px-4 py-2 text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">Colliers</Link>
          <Link href="/bagues" className="px-4 py-2 text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">Bagues</Link>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <ThemeToggle />

          <Link href="/favoris" className="p-2 text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 relative">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{favoritesCount}</span>
            )}
          </Link>

          <Link href="/auth/login" className="p-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>

          <Link href="/panier" className="p-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white relative">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-black text-white dark:bg-white dark:text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
            )}
          </Link>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
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
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col px-4 py-6 space-y-1">
              <Link href="/collection" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-gray-700 dark:text-gray-300 rounded-xl">Collection</Link>
              <Link href="/bracelets" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-gray-700 dark:text-gray-300 rounded-xl">Bracelets</Link>
              <Link href="/colliers" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-gray-700 dark:text-gray-300 rounded-xl">Colliers</Link>
              <Link href="/bagues" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-gray-700 dark:text-gray-300 rounded-xl">Bagues</Link>
              <div className="my-2 border-t border-gray-200 dark:border-gray-800" />
              <Link href="/favoris" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-gray-700 dark:text-gray-300 rounded-xl">❤️ Favoris</Link>
              <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-gray-700 dark:text-gray-300 rounded-xl">👤 Compte</Link>
              <Link href="/panier" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-gray-700 dark:text-gray-300 rounded-xl">🛒 Panier</Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="px-4 py-3 text-gray-700 dark:text-gray-300 rounded-xl">📞 Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}