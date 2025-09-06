import React from "react";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        bg-gradient-to-r 
        from-sriBlue-600 to-sriBlue-800 
        dark:from-sriBlue-900 dark:to-sriBlue-950
        text-white w-full z-40 
        md:fixed md:bottom-0 md:left-0
        shadow-inner
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        
        {/* Branding */}
        <div className="font-extrabold text-lg text-center sm:text-left 
                        bg-clip-text text-transparent 
                        bg-gradient-to-r from-sriTeal-400 to-sriBlue-400
                        dark:from-sriTeal-300 dark:to-sriBlue-500">
          Sri Nitish
        </div>

        {/* Footer message */}
        <div className="text-sm italic text-center sm:text-center flex items-center justify-center gap-1
                        text-gray-100 dark:text-gray-200">
          Designed & Developed <FaHeart className="text-red-500" /> using MERN
        </div>

        {/* Copyright */}
        <div className="text-sm text-center sm:text-right text-gray-100 dark:text-gray-200">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
}
