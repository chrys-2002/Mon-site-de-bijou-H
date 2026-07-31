"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 md:p-2 text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
      aria-label="Changer le thème"
      title={theme === "dark" ? "Passer en thème clair" : "Passer en thème sombre"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="block"
        >
          {theme === "dark" ? (
            /* Lune — croissant fin */
            <svg className="w-4 h-4 md:w-5 md:h-5" {...iconProps}>
              <path d="M20.5 13.2A8 8 0 1110 3.6a6.4 6.4 0 0010.5 9.6z" />
            </svg>
          ) : (
            /* Soleil — trait fin */
            <svg className="w-4 h-4 md:w-5 md:h-5" {...iconProps}>
              <circle cx="12" cy="12" r="3.75" />
              <path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4M18.7 18.7l-1.4-1.4M6.7 6.7L5.3 5.3" />
            </svg>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
