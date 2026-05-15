// src/app/auth/register/page.tsx
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen pt-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-2 text-center">Inscription</h1>
          <p className="text-gray-400 text-center mb-8">
            Rejoignez la communauté ICE-BI
          </p>

          <form className="space-y-6">
            {/* Nom complet */}
            <div>
              <label className="block text-sm font-medium mb-2">Nom complet</label>
              <input
                type="text"
                placeholder="Jean Dupont"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="votre@email.com"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium mb-2">Mot de passe</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Confirmer mot de passe */}
            <div>
              <label className="block text-sm font-medium mb-2">Confirmer le mot de passe</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Conditions */}
            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <label className="text-sm text-gray-400">
                J'accepte les{" "}
                <Link href="/cgv" className="text-white hover:underline">
                  conditions générales
                </Link>{" "}
                et la{" "}
                <Link href="/confidentialite" className="text-white hover:underline">
                  politique de confidentialité
                </Link>
              </label>
            </div>

            {/* Bouton */}
            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Créer un compte
            </button>
          </form>

          {/* Lien connexion */}
          <p className="text-center text-gray-400 mt-8">
            Déjà un compte ?{" "}
            <Link href="/auth/login" className="text-white hover:underline font-semibold">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}