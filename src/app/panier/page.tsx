"use client";

import { useShop } from "@/context/ShopContext";
import { formatCFA } from "@/lib/utils";
import Link from "next/link";
import { BagIcon } from "@/components/icons";

export default function PanierPage() {
  const { cart, removeFromCart, cartCount, cartTotal } = useShop();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen pt-20 bg-[var(--bg)]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Mon Panier</h1>
          <div className="glass rounded-2xl p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center border border-[#e8c47a]/30 text-[#e8c47a] bg-[#e8c47a]/5">
              <BagIcon className="w-8 h-8" />
            </div>
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
            return (
              <div key={item.product.id} className="glass rounded-2xl p-6 flex items-center gap-6">
                <div className="w-20 h-20 bg-[var(--bg-card)] rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{item.product.name}</h3>
                  {item.product.material && <p className="text-[var(--text-secondary)] text-sm">{item.product.material}</p>}
                  <p className="text-[var(--text-secondary)] text-sm">Quantité : {item.quantity}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xl font-bold">{formatCFA(item.product.price * item.quantity)}</p>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
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