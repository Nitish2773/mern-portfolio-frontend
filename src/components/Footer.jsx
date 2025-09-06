// frontend/src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 w-full z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
        
        {/* Branding */}
        <div className="text-white font-bold text-lg text-center md:text-left">
          Sri Nitish
        </div>

        {/* Footer message */}
        <div className="text-sm italic text-gray-400 text-center md:text-center">
          Designed & Developed ❤️ using MERN
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400 text-center md:text-right">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
