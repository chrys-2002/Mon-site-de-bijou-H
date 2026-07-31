"use client";

import { useShop } from "@/context/ShopContext";
import { formatCFA } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { CheckCircleIcon, WaveIcon, CardIcon } from "@/components/icons";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useShop();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [phone, setPhone] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);

  if (orderComplete) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center bg-[var(--bg)]">
        <div className="text-center glass rounded-2xl p-12 max-w-md mx-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center border border-[#e8c47a]/30 text-[#e8c47a] bg-[#e8c47a]/5">
            <CheckCircleIcon className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Commande confirmée !</h1>
          <p className="text-[var(--text-secondary)] mb-8">Merci pour votre achat. Vous recevrez une confirmation par SMS.</p>
          <Link href="/collection" className="inline-block bg-[var(--text)] text-[var(--bg)] px-8 py-3 rounded-full font-semibold hover:opacity-80 transition">
            Continuer mes achats
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center bg-[var(--bg)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Panier vide</h1>
          <Link href="/collection" className="text-[var(--text-secondary)] hover:text-[var(--text)]">Voir la collection</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 bg-[var(--bg)]">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Paiement</h1>

        <div className="glass rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Résumé de la commande</h2>
          {cart.map((item) => (
            <div key={item.product.id} className="flex justify-between py-2 border-b border-[var(--border)]">
              <span>{item.product.name} × {item.quantity}</span>
              <span>{formatCFA(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-[var(--border)]">
            <span>Total</span>
            <span>{formatCFA(cartTotal)}</span>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold mb-4">Mode de paiement</h2>

          {[
            { id: "orange", label: "Orange Money", color: "orange", icon: "OM" },
            { id: "mtn", label: "MTN Mobile Money", color: "yellow", icon: "MoMo" },
            { id: "wave", label: "Wave", color: "blue", icon: <WaveIcon className="w-5 h-5" /> },
            { id: "card", label: "Carte bancaire", color: "green", icon: <CardIcon className="w-5 h-5" /> },
          ].map((method) => (
            <label
              key={method.id}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${
                paymentMethod === method.id
                  ? `border-${method.color}-500 bg-${method.color}-500/10`
                  : "border-[var(--border)] hover:border-gray-400"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="hidden"
              />
              <div className={`w-10 h-10 bg-${method.color}-500 rounded-full flex items-center justify-center text-white font-bold`}>
                {method.icon}
              </div>
              <span className="font-medium">{method.label}</span>
            </label>
          ))}

          {paymentMethod && (
            <div>
              <label className="block text-sm font-medium mb-2">
                {paymentMethod === "card" ? "Numéro de carte" : "Numéro de téléphone"}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={paymentMethod === "card" ? "1234 5678 9012 3456" : "+225 01 23 45 67 89"}
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--text-secondary)]"
                required
              />
            </div>
          )}

          <button
            onClick={() => {
              clearCart();
              setOrderComplete(true);
            }}
            disabled={!paymentMethod}
            className="w-full bg-[var(--text)] text-[var(--bg)] py-4 rounded-full font-semibold text-lg hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Payer {formatCFA(cartTotal)}
          </button>
        </div>
      </div>
    </main>
  );
}