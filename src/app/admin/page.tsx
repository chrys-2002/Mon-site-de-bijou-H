"use client";

import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminContactsPage() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [contacts, setContacts] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

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
      fetch("/api/admin/contacts")
        .then((res) => res.json())
        .then((data) => setContacts(data));
    }
  }, [isAdmin]);

  if (loading || checking) return null;
  if (!isAdmin) return null;

  return (
    <main className="min-h-screen pt-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <Link href="/admin" className="text-[var(--text-secondary)] hover:text-[var(--text)] text-sm mb-2 block">← Retour au dashboard</Link>
            <h1 className="text-4xl font-bold">Messages</h1>
          </div>
          <span className="text-[var(--text-secondary)]">{contacts.length} message(s)</span>
        </div>

        {contacts.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <span className="text-6xl mb-6 block">📧</span>
            <h2 className="text-2xl font-bold mb-4">Aucun message</h2>
            <p className="text-[var(--text-secondary)]">Les messages des clients apparaîtront ici</p>
          </div>
        ) : (
          <>
            {/* Version desktop : tableau */}
            <div className="hidden md:block glass rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left p-4 text-sm">Nom</th>
                    <th className="text-left p-4 text-sm">Email</th>
                    <th className="text-left p-4 text-sm">Sujet</th>
                    <th className="text-left p-4 text-sm">Message</th>
                    <th className="text-left p-4 text-sm">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-card)] transition">
                      <td className="p-4 font-medium">{c.name}</td>
                      <td className="p-4 text-[var(--text-secondary)] text-sm">{c.email}</td>
                      <td className="p-4">{c.subject}</td>
                      <td className="p-4 text-sm max-w-xs truncate">{c.message}</td>
                      <td className="p-4 text-sm text-[var(--text-secondary)] whitespace-nowrap">{formatDate(c.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Version mobile : cartes */}
            <div className="md:hidden space-y-4">
              {contacts.map((c) => (
                <div key={c.id} className="glass rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg">{c.name}</span>
                    <span className="text-[var(--text-secondary)] text-xs">{formatDate(c.createdAt)}</span>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm">{c.email}</p>
                  <p className="font-medium mt-1">{c.subject}</p>
                  <div className="mt-2">
                    {expanded === c.id ? (
                      <p className="text-sm">{c.message}</p>
                    ) : (
                      <p className="text-sm text-[var(--text-secondary)] truncate">{c.message}</p>
                    )}
                    <button
                      onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                      className="text-[var(--text)] text-xs mt-1 underline"
                    >
                      {expanded === c.id ? "Réduire" : "Lire plus"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}