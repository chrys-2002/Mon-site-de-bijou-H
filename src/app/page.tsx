"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
  loading: () => null,
});

/* Reveal orchestré : chaque lettre du titre monte, se dévoile et se nettoie */
const letterContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.5 } },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 90, rotateX: 45, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Home() {
  const title = "ICE-BI";

  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
        <Scene3D />

        {/* Halo doré animé + cercles décoratifs */}
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-l from-white/5 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10 text-center" style={{ perspective: 800 }}>
          {/* Surtitre : le tracking se resserre en entrant */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.65em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-500 text-sm md:text-base uppercase mb-8"
          >
            Bijouterie d&apos;exception
          </motion.p>

          {/* Titre lettre par lettre, puis balayage lumineux permanent */}
          <motion.h1
            variants={letterContainer}
            initial="hidden"
            animate="visible"
            aria-label={title}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8"
          >
            {title.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letter}
                className="inline-block title-shine"
                style={{ transformOrigin: "bottom", animationDelay: `${i * 0.15}s` }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Filet doré qui s'étire sous le titre */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-10 h-[1px] w-40 bg-gradient-to-r from-transparent via-[#e8c47a]/70 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-lg md:text-xl text-gray-400 mb-12 max-w-xl mx-auto font-light"
          >
            L&apos;alliance parfaite entre élégance et caractère
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-5 justify-center"
          >
            <Link href="/collection">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(232,196,122,0.25)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors"
              >
                Collection
              </motion.button>
            </Link>
            <Link href="/bracelets">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-[var(--text)] text-[var(--text)] px-10 py-4 rounded-full font-semibold text-lg hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all"
              >
                Découvrir
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 2.2, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 border-2 border-gray-600 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-gray-400 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ... reste de la page ... */}
    </main>
  );
}
