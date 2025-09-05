import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// ✅ Use your environment variable
const API_BASE = process.env.REACT_APP_API_BASE;

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(false);

  const attachToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      attachToken(token);
      axios
        .get(`${API_BASE}/api/admin/me`)   // ✅ updated
        .then((res) => setAdmin({ token })) // backend just sends {ok:true}
        .catch(() => {
          localStorage.removeItem("adminToken");
          setAdmin(null);
        })
        .finally(() => setLoadingAuth(false));
    } else {
      setLoadingAuth(false);
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/admin/login`, {  // ✅ updated
        email,
        password,
      });
      const { token, admin } = res.data;
      localStorage.setItem("adminToken", token);
      attachToken(token);
      setAdmin(admin);
      return admin;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

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

export const useAuth = () => useContext(AuthContext);
