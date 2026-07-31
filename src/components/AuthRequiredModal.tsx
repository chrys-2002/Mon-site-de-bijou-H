"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

const GOLD = "#e8c47a";

export default function AuthRequiredModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Fermer avec Échap + bloquer le scroll en arrière-plan
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong rounded-3xl w-full max-w-md relative overflow-hidden"
          >
            {/* Filet doré supérieur */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
            />

            {/* Bouton fermer */}
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="absolute top-4 right-4 p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-white/5 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" viewBox="0 0 24 24">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="p-8 md:p-10 text-center">
              {/* Icône cadenas dans un écrin doré */}
              <div
                className="w-14 h-14 mx-auto mb-6 rounded-2xl flex items-center justify-center border"
                style={{ borderColor: "rgba(232,196,122,0.35)", color: GOLD, background: "rgba(232,196,122,0.07)" }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
                  <path d="M8 10.5V7.75a4 4 0 018 0v2.75" />
                  <circle cx="12" cy="15.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>

              <p className="text-[11px] uppercase tracking-[0.3em] mb-3" style={{ color: GOLD }}>
                ICE-BI
              </p>
              <h2 id="auth-modal-title" className="text-2xl font-bold mb-3">
                Connexion requise
              </h2>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8 max-w-xs mx-auto">
                Connectez-vous pour ajouter cet article à votre panier et retrouver
                votre sélection à tout moment.
              </p>

              <div className="space-y-3">
                <Link
                  href="/auth/login"
                  onClick={onClose}
                  className="block w-full bg-[var(--text)] text-[var(--bg)] py-3.5 rounded-full font-semibold hover:opacity-85 transition"
                >
                  Se connecter
                </Link>
                <Link
                  href="/auth/register"
                  onClick={onClose}
                  className="block w-full py-3.5 rounded-full font-semibold border transition hover:border-[#e8c47a]/60 hover:text-[var(--text)]"
                  style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
                >
                  Créer un compte
                </Link>
              </div>

              <button
                onClick={onClose}
                className="mt-6 text-xs text-[var(--text-secondary)] hover:text-[var(--text)] transition underline underline-offset-4"
              >
                Continuer ma visite
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
