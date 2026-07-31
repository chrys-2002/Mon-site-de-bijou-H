import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Vérifie que la requête provient d'un admin connecté.
 * Retourne l'utilisateur admin, ou null sinon.
 * Usage dans une route API :
 *   const admin = await requireAdmin();
 *   if (!admin) return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || user.role !== "admin") return null;
  return user;
}
