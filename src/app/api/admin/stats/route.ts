import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";
import { NextResponse } from "next/server";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Accès refusé" }, { status: 403 });

  const [products, users, orders] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
    prisma.order.count(),
  ]);
  return NextResponse.json({ products, users, orders });
}
