// src/app/profil/page.tsx
import Link from "next/link";

export default function ProfilPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Mon Profil</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto flex items-center justify-center text-3xl mb-4">
                  👤
                </div>
                <h3 className="font-bold">Jean Dupont</h3>
                <p className="text-gray-400 text-sm">jean@email.com</p>
              </div>
              
              <nav className="space-y-2">
                <Link href="/profil" className="block bg-gray-800 px-4 py-2 rounded-lg font-medium">
                  Informations
                </Link>
                <Link href="/profil/commandes" className="block px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition">
                  Mes commandes
                </Link>
                <Link href="/profil/adresses" className="block px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition">
                  Adresses
                </Link>
                <Link href="/profil/paiement" className="block px-4 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition">
                  Moyens de paiement
                </Link>
                <button className="block w-full text-left px-4 py-2 rounded-lg text-red-400 hover:bg-gray-800 transition">
                  Déconnexion
                </button>
              </nav>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="md:col-span-2">
            <div className="bg-gray-900 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Informations personnelles</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Prénom</label>
                    <input
                      type="text"
                      defaultValue="Jean"
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom</label>
                    <input
                      type="text"
                      defaultValue="Dupont"
                      className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="jean@email.com"
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Téléphone</label>
                  <input
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
                >
                  Sauvegarder
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}