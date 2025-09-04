// frontend/src/components/Loader.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
  const name = "Nitish".split("");

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.080}
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 12 },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sriBlue-50 via-white to-sriTeal-50 dark:from-gray-900 dark:to-sriBlue-950">
      <motion.div
        className="flex space-x-1 text-3xl md:text-4xl font-extrabold text-sriBlue-600 dark:text-sriTeal tracking-wider"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {name.map((char, idx) => (
          <motion.span
            key={idx}
            variants={letterVariants}
            className="relative"
          >
            <span className="relative z-10">{char}</span>
            {/* subtle glow behind letter */}
            <motion.span
              className="absolute left-0 top-0 w-full h-full rounded-lg bg-sriBlue-300 dark:bg-sriTeal-400 opacity-20 blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: idx * 0.2 }}
            />
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
