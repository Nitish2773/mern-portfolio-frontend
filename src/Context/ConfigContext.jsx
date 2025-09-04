// frontend/src/Context/ConfigContext.js
import React, { createContext, useContext } from "react";

const ConfigContext = createContext({});

// Optional default config
const defaultConfig = {
  ui: {
    showScrollToTop: true
  }
};

export const ConfigProvider = ({ children }) => {
  return (
    <ConfigContext.Provider value={{ config: defaultConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
