// frontend/src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4 w-full fixed bottom-0 left-0 z-40">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
        {/* Branding */}
        <div className="text-white font-semibold text-lg text-center md:text-left">
          Sri Nitish
        </div>

        {/* Copyright */}
        <div className="text-sm text-center">
          © {new Date().getFullYear()} All rights reserved.
        </div>

        {/* Footer message */}
        <div className="text-sm italic text-gray-500 text-center md:text-right">
          Designed & Developed ❤️ using MERN
        </div>
      </div>
    </footer>
  );
}
