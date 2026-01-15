
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Initialize from localStorage or default to 'tanjiro'
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('slayer_theme') || 'tanjiro';
    });

    useEffect(() => {
        // Apply theme class to body
        document.body.className = '';
        document.body.classList.add(`theme-${theme}`);
        // Save to localStorage
        localStorage.setItem('slayer_theme', theme);
    }, [theme]);

    const themes = [
        { id: 'tanjiro', name: 'Tanjiro', icon: '🌊', color: '#2ecc71' },
        { id: 'zenitsu', name: 'Zenitsu', icon: '⚡', color: '#f1c40f' },
        { id: 'nezuko', name: 'Nezuko', icon: '🌸', color: '#ff9ff3' },
        { id: 'rengoku', name: 'Rengoku', icon: '🔥', color: '#e17055' },
        { id: 'shinobu', name: 'Shinobu', icon: '🦋', color: '#a29bfe' },
        { id: 'gyomei', name: 'Gyomei', icon: '🪨', color: '#95a5a6' }, // Replaced Giyu
        { id: 'giyu', name: 'Giyu', icon: '🌊', color: '#3498db' },
        { id: 'inosuke', name: 'Inosuke', icon: '🐗', color: '#74b9ff' },
        { id: 'tengen', name: 'Tengen', icon: '🎆', color: '#ff7675' },
        { id: 'mitsuri', name: 'Mitsuri', icon: '🍡', color: '#fd79a8' },
        { id: 'muichiro', name: 'Muichiro', icon: '🌫️', color: '#7f8c8d' },
        { id: 'obanai', name: 'Obanai', icon: '🐍', color: '#ecf0f1' },
        { id: 'muzan', name: 'Muzan', icon: '👹', color: '#2d3436' },
    ];

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
};
