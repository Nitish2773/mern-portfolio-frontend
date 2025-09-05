// frontend/src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-400 w-full fixed bottom-0 left-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
        {/* Branding */}
        <div className="text-white font-bold text-lg text-center md:text-left">
          Sri Nitish
        </div>

        {/* Copyright */}
        <div className="text-sm text-center md:text-center">
          © {new Date().getFullYear()} All rights reserved.
        </div>

        {/* Footer message */}
        <div className="text-sm italic text-gray-400 text-center md:text-right">
          Designed & Developed ❤️ using MERN
        </div>
      </div>
    </footer>
  );
}
