'use client';

import { useTheme } from '@/context/ThemeContext';
import Navbar from './Navbar';

export default function ClientNavbar() {
    const { isDark, toggleTheme } = useTheme();
    return <Navbar isDark={isDark} toggleTheme={toggleTheme} />;
}
