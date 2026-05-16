"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Produit } from "@/data/produits";

export default function BaguesPage() {
  const [products, setProducts] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products/category/bagues")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen pt-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Bagues</h1>
        <p className="text-[var(--text-secondary)] text-lg mb-12">Des bagues qui marquent les esprits</p>

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