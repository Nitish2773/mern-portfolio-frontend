// frontend/src/components/ScrollToTop.jsx
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useConfig } from "../Context/ConfigContext";

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

  // Adjust bottom spacing and size based on screen size
  const isMobile = windowWidth < 768;
  const bottomOffset = isMobile ? "bottom-28" : "bottom-24"; // Push above mobile shutter/footer
  const sizeClass = isMobile ? "w-10 h-10 md:w-14 md:h-14" : "w-14 h-14";

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`
        fixed right-6 md:right-8 z-50
        ${sizeClass}
        bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400
        rounded-full shadow-xl flex items-center justify-center
        text-white ring-4 ring-purple-300/30 backdrop-blur-sm
        transform transition-all duration-300 ease-out
        hover:scale-110 hover:rotate-6 hover:shadow-2xl
        active:scale-105 active:rotate-0
        ${visible ? `${bottomOffset} opacity-100` : '-bottom-20 opacity-0'}
      `}
    >
      <FaArrowUp className={`text-xl ${isMobile ? 'md:text-2xl' : 'md:text-2xl'} animate-bounce`} />
    </button>
  );
}
