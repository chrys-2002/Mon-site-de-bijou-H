// src/lib/utils.ts

export function formatCFA(prix: number | undefined | null): string {
  if (prix === undefined || prix === null) return "0 FCFA";
  return prix.toLocaleString("fr-FR").replace(/,/g, " ") + " FCFA";
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}