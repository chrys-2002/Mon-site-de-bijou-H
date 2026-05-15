// src/app/bagues/page.tsx
import { produits } from "@/data/produits";
import ProductCard from "@/components/ProductCard";

export default function BaguesPage() {
  const bagues = produits.filter((p) => p.categorie === "bagues");

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bagues</h1>
          <p className="text-gray-400 text-lg">
            Des bagues qui marquent les esprits
          </p>
        </div>

        {bagues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bagues.map((produit) => (
              <ProductCard key={produit.id} produit={produit} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">Aucune bague disponible pour le moment.</p>
          </div>
        )}
      </div>
    </main>
  );
}