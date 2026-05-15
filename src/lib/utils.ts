// src/lib/utils.ts

/**
 * Formate un nombre en francs CFA
 * Exemple : 62000 → "62 000 FCFA"
 */
export function formatCFA(prix: number): string {
  return prix.toLocaleString("fr-FR").replace(/,/g, " ") + " FCFA";
}