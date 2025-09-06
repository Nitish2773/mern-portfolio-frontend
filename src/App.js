// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

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

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LoadingProvider>
          <ScrollToTop />

          {/* AnimatePresence + Suspense ensures global loader only for route load */}
          <Suspense fallback={<Loader />}>
            <AnimatePresence>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  {/* Home handles its own skeleton */}
                  <Route index element={<Home />} />

                  {/* Other pages */}
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
        </LoadingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
