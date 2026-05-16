"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Produit } from "@/data/produits";
import { useShop } from "@/context/ShopContext";
import { formatCFA } from "@/lib/utils";

interface ProductCardProps {
  produit: Produit;
}

export default function ProductCard({ produit }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useShop();
  const favori = isFavorite(produit.id);

  return (
    <div className="relative group">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(produit.id);
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 transition opacity-0 group-hover:opacity-100"
      >
        <svg className="w-5 h-5" fill={favori ? "#ef4444" : "none"} stroke={favori ? "#ef4444" : "white"} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <Link href={`/produit/${produit.id}`}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -8 }}
          className="glass-strong rounded-2xl overflow-hidden cursor-pointer"
        >
          <div className="h-72 bg-gray-900 relative overflow-hidden">
            <img
              src={produit.image}
              alt={produit.nom}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="p-6">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{produit.categorie}</p>
            <h3 className="text-lg font-semibold mb-2">{produit.nom}</h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{produit.description}</p>
            <p className="text-2xl font-bold gradient-text">{formatCFA((produit as any).price ?? produit.prix)}</p>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}