import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigationType } from "react-router-dom";
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
  const location = useLocation();
  const navType = useNavigationType();

  const [showLoader, setShowLoader] = useState(true);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  // Minimum display time for loader (e.g., 800ms)
  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Show loader on route change
  useEffect(() => {
    setShowLoader(true);
    setContentLoaded(false);
  }, [location, navType]);

  // Hide loader when both minTimeElapsed & contentLoaded are true
  useEffect(() => {
    if (minTimeElapsed && contentLoaded) {
      setShowLoader(false);
    }
  }, [minTimeElapsed, contentLoaded]);

  return (
    <ThemeProvider>
      <AuthProvider>
        <LoadingProvider>
          <ScrollToTop />

          {/* Loader */}
          <AnimatePresence>
            {showLoader && <Loader key="loader" />}
          </AnimatePresence>

          {/* Suspense for lazy loading */}
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<PageWrapper Component={Home} setLoaded={setContentLoaded} />} />
                <Route path="about" element={<PageWrapper Component={About} setLoaded={setContentLoaded} />} />
                <Route path="projects" element={<PageWrapper Component={Projects} setLoaded={setContentLoaded} />} />
                <Route path="skills" element={<PageWrapper Component={Skills} setLoaded={setContentLoaded} />} />
                <Route path="experience" element={<PageWrapper Component={Experience} setLoaded={setContentLoaded} />} />
                <Route path="education" element={<PageWrapper Component={Education} setLoaded={setContentLoaded} />} />
                <Route path="certifications" element={<PageWrapper Component={Certifications} setLoaded={setContentLoaded} />} />
                <Route path="contact" element={<PageWrapper Component={Contact} setLoaded={setContentLoaded} />} />
              </Route>

              {/* Admin */}
              <Route path="/admin/login" element={<PageWrapper Component={AdminLogin} setLoaded={setContentLoaded} />} />
              <Route
                path="/admin/dashboard"
                element={
                  <PrivateRoute>
                    <PageWrapper Component={AdminDashboard} setLoaded={setContentLoaded} />
                  </PrivateRoute>
                }
              />

              <Route path="*" element={<PageWrapper Component={NotFound} setLoaded={setContentLoaded} />} />
            </Routes>
          </Suspense>
        </LoadingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// ------------------------
// Wrapper component to signal page is loaded
// ------------------------
function PageWrapper({ Component, setLoaded }) {
  useEffect(() => {
    setLoaded(true); // marks page as loaded
  }, [setLoaded]);

  return <Component />;
}
