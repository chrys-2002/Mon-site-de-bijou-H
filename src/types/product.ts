// Type unique du produit, aligné sur le modèle Prisma (source de vérité : la BDD)
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  material: string;
  stock?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
