"use client";

import { useAuth } from "@/hooks/useAuth";
import { formatCFA } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminProductsPage() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/auth/login");
      return;
    }
    fetch("/api/admin/check")
      .then((res) => res.json())
      .then((data) => {
        if (!data.isAdmin) router.push("/");
        else setIsAdmin(true);
        setChecking(false);
      });
  }, [loading, isLoggedIn]);

  useEffect(() => {
    if (isAdmin) {
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
  }, [isAdmin]);

  if (loading || checking) return null;
  if (!isAdmin) return null;

  return (
    <main className="min-h-screen pt-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin" className="text-[var(--text-secondary)] hover:text-[var(--text)] text-sm mb-2 block">← Retour au dashboard</Link>
            <h1 className="text-4xl font-bold">Produits</h1>
          </div>
          <span className="text-[var(--text-secondary)]">{products.length} produit(s)</span>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left p-4 text-sm">Image</th>
                <th className="text-left p-4 text-sm">Nom</th>
                <th className="text-left p-4 text-sm">Catégorie</th>
                <th className="text-left p-4 text-sm">Prix</th>
                <th className="text-left p-4 text-sm">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-card)] transition">
                  <td className="p-4">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                  </td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-[var(--text-secondary)]">{product.category}</td>
                  <td className="p-4">{formatCFA(product.price)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.stock > 5 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}