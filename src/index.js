import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "./Context/ConfigContext";
import { LoadingProvider } from "./Context/LoadingContext"; // ✅ import
import { AuthProvider } from "./Context/AuthContext";         // ✅ import
import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>          {/* Must wrap first */}
        <AuthProvider>           {/* AuthProvider can now use useLoading */}
          <ConfigProvider>
            <App />
          </ConfigProvider>
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
