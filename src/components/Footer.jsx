import React from "react";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      {/* Footer padding spacer for fixed footer on desktop */}
      <div className="hidden md:block h-20"></div>

      <footer
        className="bg-gradient-to-r from-sriBlue-700 to-sriBlue-900
                   dark:from-gray-900 dark:to-gray-800
                   text-white w-full z-40 md:fixed md:bottom-0 md:left-0 shadow-inner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          
          {/* Branding */}
          <div className="font-extrabold text-lg text-center sm:text-left 
                          bg-clip-text text-transparent 
                          bg-gradient-to-r from-sriBlue-400 to-sriTeal-400
                          dark:from-sriBlue-300 dark:to-sriTeal-300">
            Sri Nitish
          </div>

          {/* Footer message */}
          <div className="text-sm italic text-center sm:text-center flex items-center justify-center gap-1 text-white dark:text-gray-200">
            Designed & Developed <FaHeart className="text-red-500" /> using MERN
          </div>

          {/* Copyright */}
          <div className="text-sm text-center sm:text-right text-white dark:text-gray-200">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
