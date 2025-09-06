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

      {/* Fixed left sidebar */}
      <Sidebar />

      {/* Scroll-to-top button (fixed right) */}
      <ScrollToTop />

      {/* Main content with enough bottom padding to avoid footer overlap */}
      <main
        className="
          mt-8 
          pb-24 md:pb-28      /* ensures content is visible above footer */
          relative z-10 transition-all duration-300
          md:ml-20 md:pl-6 
          lg:ml-28 lg:pl-8
        "
      >
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
