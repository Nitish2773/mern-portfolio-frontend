import React, { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme} className="p-2 rounded-lg shadow-sm card-surface hover:scale-105 transition" title="Toggle light/dark">
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
}
