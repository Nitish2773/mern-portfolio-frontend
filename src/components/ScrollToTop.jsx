// frontend/src/components/ScrollToTop.jsx
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useConfig } from "../Context/ConfigContext";
import { motion } from "framer-motion";

export default function ScrollToTop() {
  const { config } = useConfig();
  const [visible, setVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (config && !config?.ui?.showScrollToTop) return null;

  const isMobile = windowWidth < 768;
  const bottomOffset = isMobile ? "bottom-36" : "bottom-24";
  const sizeClass = isMobile ? "w-10 h-10 md:w-14 md:h-14" : "w-14 h-14";

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`
        fixed right-6 md:right-8 z-50
        ${sizeClass}
        bg-gradient-to-tr 
          from-sriBlue-500 to-sriTeal-500 
          dark:from-sriBlue-600 dark:to-sriTeal-500
        rounded-full shadow-xl flex items-center justify-center
        text-white dark:text-gray-200
        ring-4 ring-sriBlue-300/30 dark:ring-sriBlue-600/40
        backdrop-blur-sm
        transform transition-all duration-300 ease-out
        hover:scale-110 hover:rotate-6 hover:shadow-2xl
        active:scale-105 active:rotate-0
        ${visible ? `${bottomOffset} opacity-100` : "-bottom-20 opacity-0"}
      `}
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <FaArrowUp className={isMobile ? "text-lg" : "md:text-2xl"} />
    </motion.button>
  );
}
