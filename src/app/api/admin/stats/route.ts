import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [products, users, orders] = await Promise.all([
      prisma.product.count(),
      prisma.user.count(),
      prisma.order.count(),
    ]);
    return NextResponse.json({ products, users, orders });
  } catch (error) {
    return NextResponse.json({ products: 0, users: 0, orders: 0 });
  }
}