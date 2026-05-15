// src/data/produits.ts
export interface Produit {
  id: number;
  nom: string;
  categorie: string;
  prix: number; // Maintenant en FCFA
  description: string;
  image: string;
  matiere: string;
}

export const produits: Produit[] = [
  // ===== COLLIERS =====
  {
    id: 1,
    nom: "Pendentif Griffe Loup Argent",
    categorie: "colliers",
    prix: 6200,
    description: "Pendentif en argent représentant une griffe de loup. Symbole de force et de liberté. Livré avec chaîne 50cm.",
    image: "/images/produits/produit-1.jpg",
    matiere: "Argent 925"
  },
  {
    id: 2,
    nom: "Collier Chaîne Gourmette Or 18K",
    categorie: "colliers",
    prix: 8500,
    description: "Collier chaîne gourmette en or 18 carats. Un classique intemporel.",
    image: "/images/produits/produit-3.jpg",
    matiere: "Or 18 carats"
  },
  {
    id: 3,
    nom: "Collier Chaîne Or Massive",
    categorie: "colliers",
    prix: 11850,
    description: "Collier chaîne en or sur mannequin. Élégance pure.",
    image: "/images/produits/produit-4.jpg",
    matiere: "Or 18K"
  },
  {
    id: 4,
    nom: "Collier Chaîne Or Style Urbain",
    categorie: "colliers",
    prix: 7200,
    description: "Collier chaîne en or sur homme tatoué. Style street luxe.",
    image: "/images/produits/produit-5.jpg",
    matiere: "Or 18K"
  },
  {
    id: 5,
    nom: "Collier Plaque Identité Acier",
    categorie: "colliers",
    prix: 3900,
    description: "Collier plaque identité en acier inoxydable. Style militaire.",
    image: "/images/produits/produit-9.jpg",
    matiere: "Acier inoxydable"
  },
  {
    id: 6,
    nom: "Collier Chaînes Argent Multiples",
    categorie: "colliers",
    prix: 7200,
    description: "Lot de 4 chaînes en argent. Look superposé tendance.",
    image: "/images/produits/produit-13.jpg",
    matiere: "Argent 925"
  },
  {
    id: 7,
    nom: "Collier Pendentif Plume Argent",
    categorie: "colliers",
    prix: 5200,
    description: "Collier chaîne argent avec pendentif plume finement détaillé.",
    image: "/images/produits/produit-17.jpg",
    matiere: "Argent 925"
  },
  {
    id: 8,
    nom: "Collier Chaînes Or et Argent",
    categorie: "colliers",
    prix: 5900,
    description: "Deux chaînes mixant or et argent. Style unique.",
    image: "/images/produits/produit-18.jpg",
    matiere: "Or 18K, Argent 925"
  },

  // ===== BRACELETS =====
  {
    id: 9,
    nom: "Bracelet Chaîne Argent Tressé",
    categorie: "bracelets",
    prix: 3300,
    description: "Bracelet en argent tressé. Élégance et robustesse.",
    image: "/images/produits/produit-7.jpg",
    matiere: "Argent 925"
  },
  {
    id: 10,
    nom: "Bracelet Or Jaune Maillons",
    categorie: "bracelets",
    prix: 5900,
    description: "Bracelet en or jaune sur poignet tatoué. Luxe discret.",
    image: "/images/produits/produit-10.jpg",
    matiere: "Or jaune 18K"
  },
  {
    id: 11,
    nom: "Bracelet Cuir Tressé Noir",
    categorie: "bracelets",
    prix: 3300,
    description: "Bracelet noir en cuir véritable. Look sobre et masculin.",
    image: "/images/produits/produit-19.jpg",
    matiere: "Cuir véritable"
  },
  {
    id: 12,
    nom: "Bracelet Cuir Marron Vintage",
    categorie: "bracelets",
    prix: 3300,
    description: "Bracelet en cuir marron vieilli. Style vintage authentique.",
    image: "/images/produits/produit-20.jpg",
    matiere: "Cuir vieilli"
  },

  // ===== BAGUES =====
  {
    id: 13,
    nom: "Bague Acier Motif Géométrique",
    categorie: "bagues",
    prix: 2300,
    description: "Bague en argent avec circonférence en polygone. Design contemporain.",
    image: "/images/produits/produit-6.jpg",
    matiere: "Acier inoxydable"
  },
  {
    id: 14,
    nom: "Bague Crâne Acier Noir",
    categorie: "bagues",
    prix: 3500,
    description: "Bague en acier noir avec motif crâne sculpté. Style rock.",
    image: "/images/produits/produit-11.jpg",
    matiere: "Acier inoxydable"
  },
  {
    id: 15,
    nom: "Bague Argent Pierre Noire",
    categorie: "bagues",
    prix: 1200,
    description: "Bague en argent avec couleur noire sur la face. Élégance mystérieuse.",
    image: "/images/produits/produit-12.jpg",
    matiere: "Argent 925, Onyx"
  },
  {
    id: 16,
    nom: "Bague Argent Forme Football",
    categorie: "bagues",
    prix: 1600,
    description: "Bague en argent forme polygone comme ballon de foot. Originale.",
    image: "/images/produits/produit-15.jpg",
    matiere: "Argent 925"
  },
  {
    id: 17,
    nom: "Bague Or Jaune Classique",
    categorie: "bagues",
    prix: 1800,
    description: "Bague dorée classique. L'alliance parfaite.",
    image: "/images/produits/produit-21.jpg",
    matiere: "Or 18K"
  },

  // ===== ACCESSOIRES =====
  {
    id: 18,
    nom: "Épingle à Cravate Or Diamant",
    categorie: "accessoires",
    prix: 1800,
    description: "Accessoire doré pour veste. Luxe absolu.",
    image: "/images/produits/produit-2.jpg",
    matiere: "Or blanc 18K, Diamant"
  },
  {
    id: 19,
    nom: "Boutons de Manchette Argent",
    categorie: "accessoires",
    prix: 1800,
    description: "Accessoire en argent pour manche avec signe noir. Minimaliste.",
    image: "/images/produits/produit-8.jpg",
    matiere: "Argent rhodié"
  },
  {
    id: 20,
    nom: "Accessoire Veste Doré",
    categorie: "accessoires",
    prix: 1850,
    description: "Accessoire de veste tout doré. Pour gentleman.",
    image: "/images/produits/produit-14.jpg",
    matiere: "Or 18K"
  },
  {
    id: 21,
    nom: "Épingle Cravate Diamant",
    categorie: "accessoires",
    prix: 1500,
    description: "Accessoire de cravate avec petit diamant dessus.",
    image: "/images/produits/produit-16.jpg",
    matiere: "Or blanc, Diamant"
  },
  {
    id: 22,
    nom: "Porte-clés Cuir et Acier",
    categorie: "accessoires",
    prix: 1300,
    description: "Accessoire avec clé accrochée. Pratique et élégant.",
    image: "/images/produits/produit-22.jpg",
    matiere: "Cuir, Acier"
  }
];