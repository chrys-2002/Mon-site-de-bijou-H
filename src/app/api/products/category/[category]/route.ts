import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  const products = await prisma.product.findMany({
    where: { category },
  });
  return NextResponse.json(products);
}