import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.email) return null;
  return prisma.user.findUnique({ where: { email: session.user.email } });
}

// GET /api/cart — contenu du panier de l'utilisateur connecté
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json([], { status: 401 });

  const cartItems = await prisma.cartItem.findMany({
    where: { userId: user.id },
    include: { product: true },
  });

  return NextResponse.json(cartItems);
}

// POST /api/cart — ajoute un produit (ou incrémente la quantité)
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const productId = body?.productId;
  const quantity = Number(body?.quantity) || 1;

  if (typeof productId !== "string" || quantity < 1 || quantity > 99) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
  }

  const item = await prisma.cartItem.upsert({
    where: { userId_productId: { userId: user.id, productId } },
    update: { quantity: { increment: quantity } },
    create: { userId: user.id, productId, quantity },
    include: { product: true },
  });

  return NextResponse.json(item, { status: 201 });
}

// DELETE /api/cart — retire un produit, ou vide tout le panier ({ all: true })
export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await request.json().catch(() => null);

  if (body?.all === true) {
    await prisma.cartItem.deleteMany({ where: { userId: user.id } });
    return NextResponse.json({ message: "Panier vidé" });
  }

  const productId = body?.productId;
  if (typeof productId !== "string") {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  await prisma.cartItem.deleteMany({ where: { userId: user.id, productId } });
  return NextResponse.json({ message: "Produit retiré" });
}
