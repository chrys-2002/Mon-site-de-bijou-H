"use client";

import { useShop } from "@/context/ShopContext";
import { formatCFA } from "@/lib/utils";
import Link from "next/link";

export default function PanierPage() {
  const { cart, removeFromCart, cartCount, cartTotal } = useShop();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen pt-20 bg-[var(--bg)]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Mon Panier</h1>
          <div className="glass rounded-2xl p-12 text-center">
            <span className="text-6xl mb-6 block">🛒</span>
            <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
            <p className="text-[var(--text-secondary)] mb-8">Découvrez notre collection</p>
            <Link
              href="/collection"
              className="inline-block bg-[var(--text)] text-[var(--bg)] px-8 py-3 rounded-full font-semibold hover:opacity-80 transition"
            >
              Voir la Collection
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 bg-[var(--bg)]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Mon Panier</h1>
        <p className="text-[var(--text-secondary)] mb-8">{cartCount} article{cartCount > 1 ? 's' : ''}</p>

        <div className="space-y-4 mb-8">
          {cart.map((item) => {
            const img = item.produit.image || (item.produit as any).image;
            const nom = item.produit.nom || (item.produit as any).name;
            const matiere = item.produit.matiere || (item.produit as any).material || "";
            const prix = item.produit.prix ?? (item.produit as any).price;

            return (
              <div key={item.produit.id} className="glass rounded-2xl p-6 flex items-center gap-6">
                <div className="w-20 h-20 bg-[var(--bg-card)] rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={img}
                    alt={nom}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{nom}</h3>
                  {matiere && <p className="text-[var(--text-secondary)] text-sm">{matiere}</p>}
                  <p className="text-[var(--text-secondary)] text-sm">Quantité : {item.quantite}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xl font-bold">{formatCFA(prix * item.quantite)}</p>
                  <button
                    onClick={() => removeFromCart(item.produit.id)}
                    className="text-red-400 hover:text-red-300 text-sm mt-2 transition"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex justify-between mb-4">
            <span className="text-[var(--text-secondary)]">Sous-total</span>
            <span>{formatCFA(cartTotal)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-[var(--text-secondary)]">Livraison</span>
            <span className="text-green-400">Gratuite</span>
          </div>
          <div className="border-t border-[var(--border)] pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatCFA(cartTotal)}</span>
          </div>
          <Link
            href="/checkout"
            className="block w-full bg-[var(--text)] text-[var(--bg)] text-center py-4 rounded-full font-semibold hover:opacity-80 transition mt-6"
          >
            Passer la commande
          </Link>
        </div>
      </div>
    </main>
  );
}