import React from "react";

export default function Footer() {
  return (
    <footer
      className="bg-gradient-to-r from-sriBlue-700 to-sriBlue-600 dark:from-sriBlue-700 dark:to-sriBlue-600
        text-gray-100 w-full z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        
        {/* Branding */}
        <div className="font-bold text-lg text-center sm:text-left text-white">
          Sri Nitish
        </div>

        {/* Footer message */}
        <div className="text-sm italic text-gray-200 text-center sm:text-center">
          Designed & Developed ❤️ using MERN
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-200 text-center sm:text-right">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
