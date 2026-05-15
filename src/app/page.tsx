"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { produits } from "@/data/produits";
import ProductCard from "@/components/ProductCard";

const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const nouveautes = produits.slice(0, 3);

  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
        {/* === ICI LE JSX POUR LA 3D === */}
        <Scene3D />
        
        {/* Cercles décoratifs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-l from-white/5 to-transparent rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <p className="text-gray-500 text-sm md:text-base uppercase tracking-[0.3em] mb-8">
              Bijouterie d&apos;exception
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">
                ICE-BI
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-xl mx-auto font-light"
          >
            L&apos;alliance parfaite entre élégance et caractère
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <Link href="/collection">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors"
              >
                Collection
              </motion.button>
            </Link>
            <Link href="/bracelets">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all"
              >
                Découvrir
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 border-2 border-gray-600 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-gray-400 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ... reste de la page ... */}
    </main>
  );
}