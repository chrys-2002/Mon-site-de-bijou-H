"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { Product, CartItem } from "@/types/product";
import AuthRequiredModal from "@/components/AuthRequiredModal";

interface ShopContextType {
  cart: CartItem[];
  /** Retourne false si l'utilisateur n'est pas connecté (le popup s'affiche) */
  addToCart: (product: Product) => boolean;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  favoritesCount: number;
}

const ShopContext = createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("ice-bi-favorites");
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        // Ignore les anciens favoris numériques (ancien format)
        if (Array.isArray(parsed)) {
          setFavorites(parsed.filter((id) => typeof id === "string"));
        }
      } catch {}
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("ice-bi-favorites", JSON.stringify(favorites));
  }, [favorites, mounted]);

  // Charge le panier serveur (si connecté) au montage
  useEffect(() => {
    if (!mounted) return;
    fetch("/api/cart")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCart(
            data.map((item: { product: Product; quantity: number }) => ({
              product: item.product,
              quantity: item.quantity,
            }))
          );
        }
      })
      .catch(() => {});
  }, [mounted]);

  const addToCart = (product: Product): boolean => {
    // Client non connecté : popup "Connexion requise", rien n'est ajouté
    if (status !== "authenticated") {
      setAuthModalOpen(true);
      return false;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, quantity: 1 }),
    }).catch((error) => console.error("Erreur synchronisation panier:", error));

    return true;
  };

  const removeFromCart = async (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));

    try {
      await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
    } catch (error) {
      console.error("Erreur suppression panier:", error);
    }
  };

  const clearCart = async () => {
    setCart([]);
    try {
      await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
    } catch {}
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isFavorite = (productId: string) => favorites.includes(productId);
  const favoritesCount = favorites.length;

  return (
    <ShopContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, cartCount, cartTotal, favorites, toggleFavorite, isFavorite, favoritesCount }}
    >
      {children}
      <AuthRequiredModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop doit être utilisé dans un ShopProvider");
  return context;
}
