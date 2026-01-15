
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('tanjiro');

    useEffect(() => {
        document.body.className = '';
        document.body.classList.add(`theme-${theme}`);
    }, [theme]);

    const themes = [
        { id: 'tanjiro', name: 'Tanjiro', icon: '🌊', color: '#2ecc71' },
        { id: 'zenitsu', name: 'Zenitsu', icon: '⚡', color: '#f1c40f' },
        { id: 'nezuko', name: 'Nezuko', icon: '🌸', color: '#ff9ff3' },
        { id: 'rengoku', name: 'Rengoku', icon: '🔥', color: '#e17055' },
        { id: 'shinobu', name: 'Shinobu', icon: '🦋', color: '#a29bfe' },
        { id: 'gyomei', name: 'Gyomei', icon: '🪨', color: '#95a5a6' }, // Replaced Giyu
    ];

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
};
