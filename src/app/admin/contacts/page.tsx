"use client";

import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

<a href="/admin/contacts" className="glass rounded-2xl p-6 hover:bg-[var(--bg-card)] transition block">
  <span className="text-4xl mb-4 block">📧</span>
  <h3 className="text-xl font-bold mb-2">Messages</h3>
  <p className="text-[var(--text-secondary)]">Voir les messages clients</p>
</a>


export default function AdminContactsPage() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !isLoggedIn) { router.push("/auth/login"); return; }
    fetch("/api/admin/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, [loading, isLoggedIn]);

  if (loading) return null;

  return (
    <main className="min-h-screen pt-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link href="/admin" className="text-[var(--text-secondary)] hover:text-[var(--text)] text-sm mb-2 block">← Retour au dashboard</Link>
        <h1 className="text-4xl font-bold mb-8">Messages</h1>

        {contacts.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <span className="text-6xl mb-6 block">📧</span>
            <p className="text-[var(--text-secondary)]">Aucun message</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((c) => (
              <div key={c.id} className="glass rounded-2xl p-6">
                <div className="flex justify-between mb-2">
                  <span className="font-bold">{c.name}</span>
                  <span className="text-[var(--text-secondary)] text-sm">{formatDate(c.createdAt)}</span>
                </div>
                <p className="text-[var(--text-secondary)] text-sm mb-1">{c.email} · {c.subject}</p>
                <p className="mt-3">{c.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}