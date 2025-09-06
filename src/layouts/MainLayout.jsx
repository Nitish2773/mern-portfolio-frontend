// frontend/src/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/SideBar";
import ScrollToTop from "../components/ScrollToTop";

export default function MainLayout() {
  return (
    <div className="min-h-screen relative bg-gray-50 dark:bg-gray-900">
      
      {/* Navbar */}
      <Navbar />

      {/* Fixed left sidebar on desktop only */}
      <div className="hidden md:block fixed top-0 left-0 h-full z-30">
        <Sidebar />
      </div>

      {/* Scroll-to-top button */}
      <ScrollToTop />

      {/* Main content */}
      <main
        className="
          mt-8
          pb-32 md:pb-28        /* enough bottom padding for footer */
          relative z-10
          transition-all duration-300
          md:ml-0 lg:ml-28 lg:pl-8  /* sidebar offset only on desktop */
          px-4 sm:px-6 md:px-8       /* horizontal padding */
        "
      >
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
