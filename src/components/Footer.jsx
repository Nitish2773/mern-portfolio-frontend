import React from "react";

export default function Footer() {
  return (
    <footer
      className="bg-gradient-to-r from-sriBlue-700 to-sriTeal-600 dark:from-sriBlue-800 dark:to-sriTeal-700
        text-gray-100 w-full z-40 md:fixed md:bottom-0 md:left-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
        
        {/* Branding */}
        <div className="font-bold text-lg text-center md:text-left text-white">
          Sri Nitish
        </div>

        {/* Footer message */}
        <div className="text-sm italic text-gray-200 text-center md:text-center">
          Designed & Developed ❤️ using MERN
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-200 text-center md:text-right">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
