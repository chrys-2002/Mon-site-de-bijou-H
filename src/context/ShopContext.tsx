"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Produit } from "@/data/produits";

interface CartItem {
  produit: Produit;
  quantite: number;
}

interface ShopContextType {
  cart: CartItem[];
  addToCart: (produit: Produit) => void;
  removeFromCart: (produitId: number) => void;
  cartCount: number;
  cartTotal: number;
  favorites: number[];
  toggleFavorite: (produitId: number) => void;
  isFavorite: (produitId: number) => boolean;
  favoritesCount: number;
}

const ShopContext = createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("ice-bi-cart");
    const savedFavorites = localStorage.getItem("ice-bi-favorites");
    if (savedCart) try { setCart(JSON.parse(savedCart)); } catch (e) {}
    if (savedFavorites) try { setFavorites(JSON.parse(savedFavorites)); } catch (e) {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("ice-bi-cart", JSON.stringify(cart));
  }, [cart, mounted]);

  useEffect(() => {
    if (mounted) localStorage.setItem("ice-bi-favorites", JSON.stringify(favorites));
  }, [favorites, mounted]);

  const addToCart = (produit: Produit) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.produit.id === produit.id);
      if (existing) {
        return prev.map((item) =>
          item.produit.id === produit.id ? { ...item, quantite: item.quantite + 1 } : item
        );
      }
      return [...prev, { produit, quantite: 1 }];
    });
  };

  const removeFromCart = (produitId: number) => {
    setCart((prev) => prev.filter((item) => item.produit.id !== produitId));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantite, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.produit.prix * item.quantite, 0);

  const toggleFavorite = (produitId: number) => {
    setFavorites((prev) =>
      prev.includes(produitId) ? prev.filter((id) => id !== produitId) : [...prev, produitId]
    );
  };

  const isFavorite = (produitId: number) => favorites.includes(produitId);
  const favoritesCount = favorites.length;

  return (
    <ShopContext.Provider
      value={{ cart, addToCart, removeFromCart, cartCount, cartTotal, favorites, toggleFavorite, isFavorite, favoritesCount }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop doit être utilisé dans un ShopProvider");
  return context;
}