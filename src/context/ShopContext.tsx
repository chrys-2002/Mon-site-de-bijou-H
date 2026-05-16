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
  clearCart: () => void;
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
    const savedFavorites = localStorage.getItem("ice-bi-favorites");
    if (savedFavorites) try { setFavorites(JSON.parse(savedFavorites)); } catch (e) {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("ice-bi-favorites", JSON.stringify(favorites));
  }, [favorites, mounted]);

  useEffect(() => {
    if (mounted) {
      fetch("/api/cart")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const items = data.map((item: any) => ({
              produit: {
                id: item.product.id,
                nom: item.product.name,
                categorie: item.product.category,
                prix: item.product.price,
                description: item.product.description,
                image: item.product.image,
                matiere: item.product.material,
              },
              quantite: item.quantity,
            }));
            setCart(items);
          }
        })
        .catch(() => {});
    }
  }, [mounted]);

  const addToCart = async (produit: Produit) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.produit.id === produit.id);
      if (existing) {
        return prev.map((item) =>
          item.produit.id === produit.id ? { ...item, quantite: item.quantite + 1 } : item
        );
      }
      return [...prev, { produit, quantite: 1 }];
    });

    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: produit.id, quantity: 1 }),
      });
    } catch (error) {
      console.error("Erreur synchronisation panier:", error);
    }
  };

  const removeFromCart = async (produitId: number) => {
    setCart((prev) => prev.filter((item) => item.produit.id !== produitId));

    try {
      await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: produitId }),
      });
    } catch (error) {
      console.error("Erreur suppression panier:", error);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantite, 0);
  
  const cartTotal = cart.reduce((sum, item) => {
    const price = item.produit.prix ?? (item.produit as any).price ?? 0;
    return sum + price * item.quantite;
  }, 0);

  const toggleFavorite = (produitId: number) => {
    setFavorites((prev) =>
      prev.includes(produitId) ? prev.filter((id) => id !== produitId) : [...prev, produitId]
    );
  };

  const isFavorite = (produitId: number) => favorites.includes(produitId);
  const favoritesCount = favorites.length;

  return (
    <ShopContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, cartCount, cartTotal, favorites, toggleFavorite, isFavorite, favoritesCount }}
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