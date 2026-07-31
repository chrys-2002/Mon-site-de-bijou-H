// src/lib/prisma.ts
// Ce fichier crée UNE SEULE connexion à la base de données
// pour tout le site (pas une nouvelle connexion à chaque fois)

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}