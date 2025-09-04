import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import MainLayout from "./layouts/MainLayout";
import { AuthProvider } from "./Context/AuthContext";
import { ThemeProvider } from "./Context/ThemeContext";
import { LoadingProvider, useLoading } from "./Context/LoadingContext";
import PrivateRoute from "./components/PrivateRoute";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Education from "./pages/Education";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/Login";

function AppRoutes() {
  const { loading, setLoading } = useLoading();
  const location = useLocation();
  const navType = useNavigationType();

  // Trigger loader on route changes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 700); // loader delay
    return () => clearTimeout(timer);
  }, [location, navType, setLoading]);

  return (
    <>
      <ScrollToTop />
      {loading && <Loader />} {/* 🔥 Loader always shows on route change */}
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

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

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
