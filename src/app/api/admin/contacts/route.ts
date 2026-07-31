import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";
import { NextResponse } from "next/server";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Accès refusé" }, { status: 403 });

  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(contacts);
}
