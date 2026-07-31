// prisma/seed.ts
// Ce fichier remplit la base de données avec les 22 produits

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du remplissage de la base de données...\n');

  // Supprimer tous les produits existants pour éviter les doublons
  await prisma.product.deleteMany();
  console.log('🗑️  Anciens produits supprimés');

  // Liste des 22 produits à insérer
  const products = [
    // ===== COLLIERS (8) =====
    {
      name: "Pendentif Griffe Loup Argent",
      category: "colliers",
      price: 6200,
      description: "Pendentif en argent représentant une griffe de loup. Symbole de force et de liberté. Livré avec chaîne 50cm.",
      image: "/images/produits/produit-1.jpg",
      material: "Argent 925",
      stock: 15,
    },
    {
      name: "Collier Chaîne Gourmette Or 18K",
      category: "colliers",
      price: 8500,
      description: "Collier chaîne gourmette en or 18 carats. Un classique intemporel.",
      image: "/images/produits/produit-3.jpg",
      material: "Or 18 carats",
      stock: 10,
    },
    {
      name: "Collier Chaîne Or Massive",
      category: "colliers",
      price: 11850,
      description: "Collier chaîne en or sur mannequin. Élégance pure.",
      image: "/images/produits/produit-4.jpg",
      material: "Or 18K",
      stock: 8,
    },
    {
      name: "Collier Chaîne Or Style Urbain",
      category: "colliers",
      price: 7200,
      description: "Collier chaîne en or sur homme tatoué. Style street luxe.",
      image: "/images/produits/produit-5.jpg",
      material: "Or 18K",
      stock: 12,
    },
    {
      name: "Collier Plaque Identité Acier",
      category: "colliers",
      price: 3900,
      description: "Collier plaque identité en acier inoxydable. Style militaire.",
      image: "/images/produits/produit-9.jpg",
      material: "Acier inoxydable",
      stock: 20,
    },
    {
      name: "Collier Chaînes Argent Multiples",
      category: "colliers",
      price: 7200,
      description: "Lot de 4 chaînes en argent. Look superposé tendance.",
      image: "/images/produits/produit-13.jpg",
      material: "Argent 925",
      stock: 10,
    },
    {
      name: "Collier Pendentif Plume Argent",
      category: "colliers",
      price: 5200,
      description: "Collier chaîne argent avec pendentif plume finement détaillé.",
      image: "/images/produits/produit-17.jpg",
      material: "Argent 925",
      stock: 15,
    },
    {
      name: "Collier Chaînes Or et Argent",
      category: "colliers",
      price: 5900,
      description: "Deux chaînes mixant or et argent. Style unique.",
      image: "/images/produits/produit-18.jpg",
      material: "Or 18K, Argent 925",
      stock: 8,
    },

    // ===== BRACELETS (4) =====
    {
      name: "Bracelet Chaîne Argent Tressé",
      category: "bracelets",
      price: 3300,
      description: "Bracelet en argent tressé. Élégance et robustesse.",
      image: "/images/produits/produit-7.jpg",
      material: "Argent 925",
      stock: 18,
    },
    {
      name: "Bracelet Or Jaune Maillons",
      category: "bracelets",
      price: 5900,
      description: "Bracelet en or jaune sur poignet tatoué. Luxe discret.",
      image: "/images/produits/produit-10.jpg",
      material: "Or jaune 18K",
      stock: 10,
    },
    {
      name: "Bracelet Cuir Tressé Noir",
      category: "bracelets",
      price: 3300,
      description: "Bracelet noir en cuir véritable. Look sobre et masculin.",
      image: "/images/produits/produit-19.jpg",
      material: "Cuir véritable",
      stock: 25,
    },
    {
      name: "Bracelet Cuir Marron Vintage",
      category: "bracelets",
      price: 3300,
      description: "Bracelet en cuir marron vieilli. Style vintage authentique.",
      image: "/images/produits/produit-20.jpg",
      material: "Cuir vieilli",
      stock: 15,
    },

    // ===== BAGUES (5) =====
    {
      name: "Bague Acier Motif Géométrique",
      category: "bagues",
      price: 2300,
      description: "Bague en argent avec circonférence en polygone. Design contemporain.",
      image: "/images/produits/produit-6.jpg",
      material: "Acier inoxydable",
      stock: 20,
    },
    {
      name: "Bague Crâne Acier Noir",
      category: "bagues",
      price: 3500,
      description: "Bague en acier noir avec motif crâne sculpté. Style rock.",
      image: "/images/produits/produit-11.jpg",
      material: "Acier inoxydable",
      stock: 15,
    },
    {
      name: "Bague Argent Pierre Noire",
      category: "bagues",
      price: 1200,
      description: "Bague en argent avec couleur noire sur la face. Élégance mystérieuse.",
      image: "/images/produits/produit-12.jpg",
      material: "Argent 925, Onyx",
      stock: 12,
    },
    {
      name: "Bague Argent Forme Football",
      category: "bagues",
      price: 1600,
      description: "Bague en argent forme polygone comme ballon de foot. Originale.",
      image: "/images/produits/produit-15.jpg",
      material: "Argent 925",
      stock: 10,
    },
    {
      name: "Bague Or Jaune Classique",
      category: "bagues",
      price: 1800,
      description: "Bague dorée classique. L'alliance parfaite.",
      image: "/images/produits/produit-21.jpg",
      material: "Or 18K",
      stock: 8,
    },

    // ===== ACCESSOIRES (5) =====
    {
      name: "Épingle à Cravate Or Diamant",
      category: "accessoires",
      price: 1800,
      description: "Accessoire doré pour veste. Luxe absolu.",
      image: "/images/produits/produit-2.jpg",
      material: "Or blanc 18K, Diamant",
      stock: 5,
    },
    {
      name: "Boutons de Manchette Argent",
      category: "accessoires",
      price: 1800,
      description: "Accessoire en argent pour manche avec signe noir. Minimaliste.",
      image: "/images/produits/produit-8.jpg",
      material: "Argent rhodié",
      stock: 10,
    },
    {
      name: "Accessoire Veste Doré",
      category: "accessoires",
      price: 1850,
      description: "Accessoire de veste tout doré. Pour gentleman.",
      image: "/images/produits/produit-14.jpg",
      material: "Or 18K",
      stock: 7,
    },
    {
      name: "Épingle Cravate Diamant",
      category: "accessoires",
      price: 1500,
      description: "Accessoire de cravate avec petit diamant dessus.",
      image: "/images/produits/produit-16.jpg",
      material: "Or blanc, Diamant",
      stock: 5,
    },
    {
      name: "Porte-clés Cuir et Acier",
      category: "accessoires",
      price: 1300,
      description: "Accessoire avec clé accrochée. Pratique et élégant.",
      image: "/images/produits/produit-22.jpg",
      material: "Cuir, Acier",
      stock: 30,
    },
  ];

  // Insérer tous les produits
  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`✅ ${products.length} produits insérés avec succès !`);
}

main()
  .catch((error) => {
    console.error('❌ Erreur :', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('\n🔌 Connexion fermée.');
  });