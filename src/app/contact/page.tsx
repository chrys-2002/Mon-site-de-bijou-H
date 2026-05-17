export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20 bg-[var(--bg)]">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Contact</h1>
        <p className="text-[var(--text-secondary)] mb-8">Une question ? Nous sommes là pour vous aider.</p>
        <form className="glass rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nom</label>
            <input type="text" className="w-full bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] px-4 py-3 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" className="w-full bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] px-4 py-3 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea rows={5} className="w-full bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] px-4 py-3 rounded-xl resize-none"></textarea>
          </div>
          <button type="submit" className="w-full bg-[var(--text)] text-[var(--bg)] py-3 rounded-full font-semibold">
            Envoyer
          </button>
        </form>
      </div>
    </main>
  );
}