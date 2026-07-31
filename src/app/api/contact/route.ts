import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    await prisma.contact.create({
      data: { name, email, subject, message },
    });

    return NextResponse.json({ message: "Message envoyé !" });
  } catch (error) {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}