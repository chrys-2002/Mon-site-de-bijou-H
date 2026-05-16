import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  trustHost: true,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        // Si non, le créer
        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name || "Utilisateur Google",
              email: user.email!,
              password: "GOOGLE_OAUTH", // Pas de mot de passe pour Google
            },
          });
        }
      }
      return true;
    },
    async session({ session }) {
      return session;
    },
  },
});