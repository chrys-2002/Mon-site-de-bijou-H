"use client";

import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminClientsPage() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !isLoggedIn) { router.push("/auth/login"); return; }
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
      fetch("/api/admin/users")
        .then((res) => res.json())
        .then((data) => setUsers(data));
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
            <h1 className="text-4xl font-bold">Clients</h1>
          </div>
          <span className="text-[var(--text-secondary)]">{users.length} client(s)</span>
        </div>

        {/* Version desktop (tableau) */}
        <div className="hidden md:block glass rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left p-4 text-sm">Nom</th>
                <th className="text-left p-4 text-sm">Email</th>
                <th className="text-left p-4 text-sm">Rôle</th>
                <th className="text-left p-4 text-sm">Inscrit le</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-[var(--border)]">
                  <td className="p-4">{user.name || "N/A"}</td>
                  <td className="p-4 text-[var(--text-secondary)] text-sm">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === "admin" ? "bg-purple-500/20 text-purple-400" : "bg-gray-500/20 text-gray-400"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-[var(--text-secondary)]">{formatDate(user.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Version mobile (cartes) */}
        <div className="md:hidden space-y-4">
          {users.map((user) => (
            <div key={user.id} className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{user.name || "N/A"}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.role === "admin" ? "bg-purple-500/20 text-purple-400" : "bg-gray-500/20 text-gray-400"
                }`}>
                  {user.role}
                </span>
              </div>
              <p className="text-[var(--text-secondary)] text-sm truncate">{user.email}</p>
              <p className="text-[var(--text-secondary)] text-xs mt-1">{formatDate(user.createdAt)}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}