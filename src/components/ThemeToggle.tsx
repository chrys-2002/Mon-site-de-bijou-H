"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-14 h-8 rounded-full bg-gray-700 dark:bg-gray-600 transition-colors duration-700 overflow-hidden"
      aria-label="Changer le thème"
    >
      {/* Fond du toggle */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: theme === "dark" 
            ? "linear-gradient(135deg, #1a1a2e, #16213e)" 
            : "linear-gradient(135deg, #ffd89b, #19547b)",
        }}
        transition={{ duration: 0.7 }}
      />
      
      {/* Cercle */}
      <motion.div
        className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center text-xs"
        animate={{
          left: theme === "dark" ? "calc(100% - 28px)" : "4px",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </motion.div>
      
      {/* Étoiles (mode nuit) */}
      {theme === "dark" && (
        <>
          <motion.span
            className="absolute text-[6px] text-white/50"
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            style={{ top: 2, left: 6 }}
          >
            ✦
          </motion.span>
          <motion.span
            className="absolute text-[4px] text-white/30"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
            style={{ top: 4, left: 3 }}
          >
            ✧
          </motion.span>
        </>
      )}
    </motion.button>
  );
}