"use client";

import { useShop } from "@/context/ShopContext";
import { formatCFA } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProduitPage() {
  const params = useParams();
  const { addToCart, toggleFavorite, isFavorite } = useShop();
  const [added, setAdded] = useState(false);
  const [produit, setProduit] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduit(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-[var(--text-secondary)]">Chargement...</p>
      </main>
    );
  }

  if (!produit) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Produit non trouvé</h1>
          <Link href="/collection" className="text-[var(--text-secondary)] hover:text-[var(--text)]">
            Retour à la collection
          </Link>
        </div>
      </main>
    );
  }

  const favori = isFavorite(produit.id);

  return (
    <main className="min-h-screen pt-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8 text-[var(--text-secondary)] text-sm">
          <Link href="/" className="hover:text-[var(--text)]">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/collection" className="hover:text-[var(--text)]">Collection</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">{produit.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="h-96 md:h-[500px] bg-[var(--bg-card)] rounded-2xl overflow-hidden relative">
            <img src={produit.image} alt={produit.name} className="w-full h-full object-cover" />
            <button onClick={() => toggleFavorite(produit.id)} className="absolute top-4 right-4 p-3 rounded-full bg-black/50 hover:bg-black/70 transition">
              <svg className="w-6 h-6" fill={favori ? "#ef4444" : "none"} stroke={favori ? "#ef4444" : "white"} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <div>
            <p className="text-[var(--text-secondary)] uppercase text-sm tracking-wider mb-2">{produit.category}</p>
            <h1 className="text-4xl font-bold mb-4 text-[var(--text)]">{produit.name}</h1>
            <p className="text-3xl font-bold mb-6 text-[var(--text)]">{formatCFA(produit.price)}</p>
            <div className="w-16 h-[1px] bg-[var(--border)] mb-6" />
            <p className="text-[var(--text-secondary)] mb-8">{produit.description}</p>
            <div className="bg-[var(--bg-card)] rounded-xl p-4 mb-8 border border-[var(--border)]">
              <p className="text-sm text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text)]">Matière :</span> {produit.material}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => { if (addToCart(produit)) { setAdded(true); setTimeout(() => setAdded(false), 1500); } }}
                className={`flex-1 py-4 rounded-full font-semibold text-lg transition ${added ? "bg-green-500 text-white" : "bg-[var(--text)] text-[var(--bg)] hover:opacity-80"}`}
              >
                {added ? "✓ Ajouté !" : "Ajouter au panier"}
              </button>
              <button
                onClick={() => toggleFavorite(produit.id)}
                className={`p-4 rounded-full border-2 transition ${favori ? "border-red-500 text-red-500" : "border-[var(--border)] text-[var(--text-secondary)]"}`}
              >
                <svg className="w-6 h-6" fill={favori ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}