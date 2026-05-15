"use client";

import { useShop } from "@/context/ShopContext";
import Link from "next/link";

export default function PanierPage() {
  const { cart, removeFromCart, cartCount, cartTotal } = useShop();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Mon Panier</h1>
          <div className="glass rounded-2xl p-12 text-center">
            <span className="text-6xl mb-6 block">🛒</span>
            <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
            <p className="text-gray-400 mb-8">Découvrez notre collection</p>
            <Link
              href="/collection"
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Voir la Collection
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Mon Panier</h1>
        <p className="text-gray-400 mb-8">{cartCount} article{cartCount > 1 ? 's' : ''}</p>

        <div className="space-y-4 mb-8">
          {cart.map((item) => (
            <div key={item.produit.id} className="glass rounded-2xl p-6 flex items-center gap-6">
              <div className="w-20 h-20 bg-gray-800 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                {item.produit.categorie === "bracelets" ? "💎" : 
                 item.produit.categorie === "colliers" ? "📿" : 
                 item.produit.categorie === "bagues" ? "💍" : "✨"}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{item.produit.nom}</h3>
                <p className="text-gray-400 text-sm">{item.produit.matiere}</p>
                <p className="text-gray-500 text-sm">Quantité : {item.quantite}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xl font-bold">{(item.produit.prix * item.quantite).toFixed(2)} €</p>
                <button
                  onClick={() => removeFromCart(item.produit.id)}
                  className="text-red-400 hover:text-red-300 text-sm mt-2 transition"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex justify-between mb-4">
            <span className="text-gray-400">Sous-total</span>
            <span>{cartTotal.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-400">Livraison</span>
            <span className="text-green-400">Gratuite</span>
          </div>
          <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{cartTotal.toFixed(2)} €</span>
          </div>
          <button className="w-full bg-white text-black text-center py-4 rounded-full font-semibold hover:bg-gray-200 transition mt-6">
            Passer la commande
          </button>
        </div>
      </div>
    </main>
  );
}