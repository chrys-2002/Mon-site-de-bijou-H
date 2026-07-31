"use client";

import { useShop } from "@/context/ShopContext";
import { motion } from "framer-motion";

export default function FavoriteButton({ produitId }: { produitId: string }) {
  const { isFavorite, toggleFavorite } = useShop();
  const favorite = isFavorite(produitId);

  return (
    <motion.button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(produitId);
      }}
      whileTap={{ scale: 1.3 }}
      className={`p-2 rounded-full transition-colors ${
        favorite ? "text-red-500" : "text-gray-500 hover:text-red-400"
      }`}
      title={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <svg className="w-6 h-6" fill={favorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </motion.button>
  );
}