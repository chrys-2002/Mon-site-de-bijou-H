"use client";

import { useShop } from "@/context/ShopContext";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FavorisPage() {
  const { favorites } = useShop();
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const favorisProduits = allProducts.filter((p: any) => favorites.includes(p.id));

  return (
    <main className="min-h-screen pt-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">❤️ Mes Favoris</h1>
        <p className="text-[var(--text-secondary)] mb-8">{favorisProduits.length} produit(s)</p>

        {loading ? (
          <p className="text-center text-[var(--text-secondary)]">Chargement...</p>
        ) : favorisProduits.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorisProduits.map((produit: any) => (
              <ProductCard key={produit.id} produit={produit} />
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-12 text-center">
            <span className="text-6xl mb-6 block">🤍</span>
            <h2 className="text-2xl font-bold mb-4">Aucun favori</h2>
            <Link href="/collection" className="inline-block bg-[var(--text)] text-[var(--bg)] px-8 py-3 rounded-full font-semibold">
              Découvrir la collection
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}