// src/App.jsx
import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
import MainLayout from "./layouts/MainLayout";
import { ThemeProvider } from "./Context/ThemeContext";
import { AuthProvider } from "./Context/AuthContext";
import { LoadingProvider } from "./Context/LoadingContext";
import PrivateRoute from "./components/PrivateRoute";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Experience = lazy(() => import("./pages/Experience"));
const Education = lazy(() => import("./pages/Education"));
const Certifications = lazy(() => import("./pages/Certifications"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const AdminLogin = lazy(() => import("./admin/Login"));

// ----------------------
// LoaderWrapper for initial app load
// ----------------------
function LoaderWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show global loader on initial app mount
    const timer = setTimeout(() => setLoading(false), 1200); // adjust for fade/glow
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: loading ? "none" : "block" }}>{children}</div>
    </>
  );
}

// ----------------------
// Main App Component
// ----------------------
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LoadingProvider>
          <ScrollToTop />

          <LoaderWrapper>
            <Suspense fallback={null}>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="skills" element={<Skills />} />
                    <Route path="experience" element={<Experience />} />
                    <Route path="education" element={<Education />} />
                    <Route path="certifications" element={<Certifications />} />
                    <Route path="contact" element={<Contact />} />
                  </Route>

                  {/* Admin */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin/dashboard"
                    element={
                      <PrivateRoute>
                        <AdminDashboard />
                      </PrivateRoute>
                    }
                  />

                  {/* Fallback */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </LoaderWrapper>
        </LoadingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
