import React from "react";

export default function Footer() {
  return (
    <>
      {/* Footer padding spacer for fixed footer on desktop */}
      <div className="hidden md:block h-20"></div>

      <footer
        className="bg-gradient-to-r from-sriBlue-600 to-sriBlue-500 
                   dark:from-sriBlue-800 dark:to-sriBlue-700
                   text-white dark:text-gray-200 w-full z-40 md:fixed md:bottom-0 md:left-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          
          {/* Branding */}
          <div className="font-bold text-lg text-center sm:text-left">
            Sri Nitish
          </div>

          {/* Footer message */}
          <div className="text-sm italic text-center sm:text-center">
            Designed & Developed ❤️ using MERN
          </div>

          {/* Copyright */}
          <div className="text-sm text-center sm:text-right">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
