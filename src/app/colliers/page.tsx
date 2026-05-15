// src/app/colliers/page.tsx
import { produits } from "@/data/produits";
import ProductCard from "@/components/ProductCard";

export default function ColliersPage() {
  const colliers = produits.filter((p) => p.categorie === "colliers");

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Colliers</h1>
          <p className="text-gray-400 text-lg">
            L'élégance autour du cou
          </p>
        </div>

        {colliers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {colliers.map((produit) => (
              <ProductCard key={produit.id} produit={produit} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">Aucun collier disponible pour le moment.</p>
          </div>
        )}
      </div>
    </main>
  );
}