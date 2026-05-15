"use client";

import { useShop } from "@/context/ShopContext";
import { produits } from "@/data/produits";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ProduitPage() {
  const params = useParams();
  const { addToCart, toggleFavorite, isFavorite } = useShop();
  const [added, setAdded] = useState(false);

  const produit = produits.find((p) => p.id === Number(params.id));

  if (!produit) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Produit non trouvé</h1>
          <Link href="/collection" className="text-gray-400 hover:text-white">
            Retour à la collection
          </Link>
        </div>
      </main>
    );
  }

  const favori = isFavorite(produit.id);

  const handleAddToCart = () => {
    addToCart(produit);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Fil d'Ariane */}
        <div className="mb-8 text-gray-400 text-sm">
          <Link href="/" className="hover:text-white transition">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/collection" className="hover:text-white transition">Collection</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{produit.nom}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="h-96 md:h-[500px] bg-gray-900 rounded-2xl overflow-hidden relative">
            <img
              src={produit.image}
              alt={produit.nom}
              className="w-full h-full object-cover"
            />
            
            {/* Bouton favori */}
            <button
              onClick={() => toggleFavorite(produit.id)}
              className="absolute top-4 right-4 p-3 rounded-full bg-black/50 hover:bg-black/70 transition z-10"
            >
              <svg className="w-6 h-6" fill={favori ? "#ef4444" : "none"} stroke={favori ? "#ef4444" : "white"} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Infos */}
          <div className="flex flex-col justify-center">
            <p className="text-gray-500 uppercase text-sm tracking-wider mb-2">{produit.categorie}</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{produit.nom}</h1>
            <p className="text-3xl font-bold mb-6 text-white">{produit.prix.toFixed(2)} €</p>
            
            <div className="w-16 h-[1px] bg-gray-700 mb-6" />
            
            <p className="text-gray-300 mb-8 leading-relaxed">{produit.description}</p>
            
            <div className="bg-gray-900 rounded-xl p-4 mb-8">
              <p className="text-sm text-gray-400">
                <span className="font-semibold text-white">Matière :</span> {produit.matiere}
              </p>
            </div>
            
            {/* Boutons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-full font-semibold text-lg transition ${
                  added 
                    ? "bg-green-500 text-white" 
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {added ? "✓ Ajouté !" : "Ajouter au panier"}
              </button>
              
              <button
                onClick={() => toggleFavorite(produit.id)}
                className={`p-4 rounded-full border-2 transition ${
                  favori 
                    ? "border-red-500 text-red-500 bg-red-500/10" 
                    : "border-gray-600 text-gray-400 hover:border-red-400 hover:text-red-400"
                }`}
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