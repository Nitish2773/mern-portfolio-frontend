// App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import MainLayout from "./layouts/MainLayout";
import { AuthProvider } from "./Context/AuthContext";
import { ThemeProvider } from "./Context/ThemeContext";
import { LoadingProvider, useLoading } from "./Context/LoadingContext";
import PrivateRoute from "./components/PrivateRoute";

// ------------------------
// Lazy-loaded pages
// ------------------------
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Experience = lazy(() => import("./pages/Experience"));
const Education = lazy(() => import("./pages/Education"));
const Certifications = lazy(() => import("./pages/Certifications"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const AdminLogin = lazy(() => import("./admin/Login"));

// ------------------------
// Route wrapper to handle loader
// ------------------------
function AppRoutes() {
  const { loading, setLoading } = useLoading();
  const location = useLocation();
  const navType = useNavigationType();

  // Optional: show loader only on route change if needed
  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 200); // short delay for smoother experience
    return () => clearTimeout(timer);
  }, [location, navType, setLoading]);

  return (
    <>
      <ScrollToTop />
      {loading && <Loader />} {/* shows during route change */}

      <Suspense fallback={<Loader />}>
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

          {/* Admin routes */}
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
      </Suspense>
    </>
  );
}

// ------------------------
// Root app
// ------------------------
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LoadingProvider>
          <AppRoutes />
        </LoadingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
