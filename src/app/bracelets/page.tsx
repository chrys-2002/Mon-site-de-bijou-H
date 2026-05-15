// src/app/bracelets/page.tsx
import { produits } from "@/data/produits";
import ProductCard from "@/components/ProductCard";

export default function BraceletsPage() {
  const bracelets = produits.filter((p) => p.categorie === "bracelets");

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero catégorie */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bracelets</h1>
          <p className="text-gray-400 text-lg">
            Des bracelets qui affirment votre style
          </p>
        </div>

        {/* Grille produits */}
        {bracelets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bracelets.map((produit) => (
              <ProductCard key={produit.id} produit={produit} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">Aucun bracelet disponible pour le moment.</p>
          </div>
        )}
      </div>
    </main>
  );
}