"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

export default function CollectionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen pt-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <p className="text-[var(--text-secondary)] text-sm uppercase tracking-[0.3em] mb-4">ICE-BI</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="gradient-text">Collection</span>
          </h1>
        </motion.div>

        {loading ? (
          <p className="text-center text-[var(--text-secondary)]">Chargement...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((produit) => (
              <ProductCard key={produit.id} produit={produit} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}