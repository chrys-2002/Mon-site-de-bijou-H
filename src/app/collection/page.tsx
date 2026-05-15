"use client";

import { motion } from "framer-motion";
import { produits } from "@/data/produits";
import ProductCard from "@/components/ProductCard";

export default function CollectionPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20"
        >
          <p className="text-gray-500 text-sm uppercase tracking-[0.3em] mb-4">ICE-BI</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="gradient-text">Collection</span>
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl">
            Chaque pièce raconte une histoire. Découvrez notre sélection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {produits.map((produit, i) => (
            <ProductCard key={produit.id} produit={produit} />
          ))}
        </div>
      </div>
    </main>
  );
}