// src/App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Loader from "./components/Loader";
import LoaderWrapper from "./components/LoaderWrapper";
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

          {/* Global Suspense for lazy-loading */}
          <Suspense fallback={<Loader />}>
            <AnimatePresence>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  {/* Home with LoaderWrapper */}
                  <Route
                    index
                    element={
                      <LoaderWrapper>
                        <Home />
                      </LoaderWrapper>
                    }
                  />

                  {/* Other pages */}
                  <Route
                    path="about"
                    element={
                      <LoaderWrapper>
                        <About />
                      </LoaderWrapper>
                    }
                  />
                  <Route
                    path="projects"
                    element={
                      <LoaderWrapper>
                        <Projects />
                      </LoaderWrapper>
                    }
                  />
                  <Route
                    path="skills"
                    element={
                      <LoaderWrapper>
                        <Skills />
                      </LoaderWrapper>
                    }
                  />
                  <Route
                    path="experience"
                    element={
                      <LoaderWrapper>
                        <Experience />
                      </LoaderWrapper>
                    }
                  />
                  <Route
                    path="education"
                    element={
                      <LoaderWrapper>
                        <Education />
                      </LoaderWrapper>
                    }
                  />
                  <Route
                    path="certifications"
                    element={
                      <LoaderWrapper>
                        <Certifications />
                      </LoaderWrapper>
                    }
                  />
                  <Route
                    path="contact"
                    element={
                      <LoaderWrapper>
                        <Contact />
                      </LoaderWrapper>
                    }
                  />
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
