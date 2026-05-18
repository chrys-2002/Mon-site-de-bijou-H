"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });

    if (res.ok) {
      setSent(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }
    setLoading(false);
  };

  if (sent) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center bg-[var(--bg)]">
        <div className="glass rounded-2xl p-12 text-center max-w-md">
          <span className="text-6xl mb-6 block">✅</span>
          <h1 className="text-3xl font-bold mb-4">Message envoyé !</h1>
          <p className="text-[var(--text-secondary)]">Nous vous répondrons dans les plus brefs délais.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 bg-[var(--bg)]">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Contact</h1>
        <p className="text-[var(--text-secondary)] mb-8">Une question ? Nous sommes là pour vous aider.</p>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nom</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] px-4 py-3 rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] px-4 py-3 rounded-xl" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Sujet</label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] px-4 py-3 rounded-xl" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] px-4 py-3 rounded-xl resize-none" required></textarea>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[var(--text)] text-[var(--bg)] py-3 rounded-full font-semibold hover:opacity-80 transition disabled:opacity-50">
            {loading ? "Envoi..." : "Envoyer le message"}
          </button>
        </form>
      </div>
    </main>
  );
}