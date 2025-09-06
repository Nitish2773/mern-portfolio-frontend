import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ isVisible = true }) {
  const name = "Nitish".split("");

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center
                     bg-gradient-to-br from-sriBlue-50 via-white to-sriTeal-50
                     dark:from-gray-900 dark:to-sriBlue-950"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex space-x-1 text-3xl md:text-4xl font-extrabold text-sriBlue-600 dark:text-sriTeal tracking-wider font-display"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {name.map((char, idx) => (
              <motion.span key={idx} variants={letterVariants} className="relative">
                <span className="relative z-10">{char}</span>
                {/* Glow effect */}
                <motion.span
                  className="absolute left-0 top-0 w-full h-full rounded-md bg-sriBlue-300 dark:bg-sriTeal opacity-20 blur-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.25, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: idx * 0.15,
                    ease: "easeInOut",
                  }}
                />
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
