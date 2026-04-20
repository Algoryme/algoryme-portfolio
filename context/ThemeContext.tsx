'use client';

import React, { createContext, useContext, useLayoutEffect, useRef, useState } from 'react';

interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Apply theme to document
function applyTheme(isDark: boolean) {
    if (typeof document === 'undefined') return;

    if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
    }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState(false);
    const initialized = useRef(false);

    useLayoutEffect(() => {
        // Only run initialization once
        if (initialized.current) return;
        initialized.current = true;

        // Get saved theme or detect system preference
        const savedTheme = localStorage.getItem('theme');
        let shouldBeDark = false;

        if (savedTheme) {
            shouldBeDark = savedTheme === 'dark';
        } else {
            shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        setIsDark(shouldBeDark);
        applyTheme(shouldBeDark);

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('theme')) {
                const newIsDark = e.matches;
                setIsDark(newIsDark);
                applyTheme(newIsDark);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
        applyTheme(newIsDark);
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
