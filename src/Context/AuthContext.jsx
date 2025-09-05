import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// Backend URL from environment variable
const API_BASE = process.env.REACT_APP_API_BASE;

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(false);

  // Attach JWT token to Axios default headers
  const attachToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Check for existing token on mount
  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) return setLoadingAuth(false);

      attachToken(token);

      try {
        const res = await axios.get(`${API_BASE}/api/admin/me`);
        // Backend may just return { ok: true }, combine with token
        setAdmin({ token, ...res.data });
      } catch (err) {
        localStorage.removeItem("adminToken");
        setAdmin(null);
      } finally {
        setLoadingAuth(false);
      }
    };

    checkAdmin();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/admin/login`, {
        email,
        password,
      });

      const { token, admin } = res.data;

      if (!token) throw new Error("No token returned from server");

      localStorage.setItem("adminToken", token);
      attachToken(token);
      // Store admin info (name/email) and token
      setAdmin(admin ? { token, ...admin } : { token });
      return admin;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("adminToken");
    attachToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{ admin, login, logout, loadingAuth, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
