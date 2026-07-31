import Link from "next/link";

export default function Footer() {
  const linkClass = "text-sm transition-colors duration-300";

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="text-xl font-bold gradient-text mb-4">ICE-BI</h3>
            <p className="text-[var(--text-secondary)] text-sm">Bijoux et accessoires d'exception pour l'homme moderne.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Boutique</h4>
            <ul className="space-y-2">
              <li><Link href="/collection" className={linkClass}>Collection</Link></li>
              <li><Link href="/bracelets" className={linkClass}>Bracelets</Link></li>
              <li><Link href="/colliers" className={linkClass}>Colliers</Link></li>
              <li><Link href="/bagues" className={linkClass}>Bagues</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Service Client</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className={linkClass}>Contact</Link></li>
              <li><Link href="/faq" className={linkClass}>FAQ</Link></li>
              <li><Link href="/livraison" className={linkClass}>Livraison</Link></li>
              <li><Link href="/retours" className={linkClass}>Retours</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Compte</h4>
            <ul className="space-y-2">
              <li><Link href="/auth/login" className={linkClass}>Connexion</Link></li>
              <li><Link href="/auth/register" className={linkClass}>Inscription</Link></li>
              <li><Link href="/profil" className={linkClass}>Mon Profil</Link></li>
              <li><Link href="/panier" className={linkClass}>Panier</Link></li>
            </ul>
          </div>
        </div>
        <div className="gradient-line mb-8" />
        <p className="text-center text-[var(--text-secondary)] text-sm">
          © {new Date().getFullYear()} ICE-BI. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}