"use client";

import { useAuth } from "@/hooks/useAuth";
import { formatCFA, formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PackageIcon } from "@/components/icons";

export default function AdminOrdersPage() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);

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
      fetch("/api/admin/orders")
        .then((res) => res.json())
        .then((data) => setOrders(data));
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
            <h1 className="text-4xl font-bold">Commandes</h1>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center border border-[#e8c47a]/30 text-[#e8c47a] bg-[#e8c47a]/5">
              <PackageIcon className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Aucune commande</h2>
            <p className="text-[var(--text-secondary)]">Les commandes apparaîtront ici</p>
          </div>
        ) : (
          <div className="glass rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-4 text-sm">ID</th>
                  <th className="text-left p-4 text-sm">Client</th>
                  <th className="text-left p-4 text-sm">Total</th>
                  <th className="text-left p-4 text-sm">Statut</th>
                  <th className="text-left p-4 text-sm">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-[var(--border)]">
                    <td className="p-4 text-sm font-mono">{order.id.slice(0, 8)}...</td>
                    <td className="p-4">{order.user?.name || "Inconnu"}</td>
                    <td className="p-4">{formatCFA(order.total)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                        order.status === "shipped" ? "bg-blue-500/20 text-blue-400" :
                        "bg-green-500/20 text-green-400"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-[var(--text-secondary)]">{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}