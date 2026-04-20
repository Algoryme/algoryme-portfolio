'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    const navLinks = [
        { label: 'Home', id: 'home' },
        { label: 'Projects', id: 'projects' },
        { label: 'Contact', id: 'contact' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
                        ? isDark
                            ? 'bg-neutral-950/50 backdrop-blur-md border-b border-neutral-800'
                            : 'bg-cyan-50/50 backdrop-blur-md border-b border-cyan-100'
                        : isDark
                            ? 'bg-neutral-950'
                            : 'bg-linear-to-b from-cyan-50 to-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Logo */}
                        <Link
                            href="#home"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('home');
                            }}
                            className="text-xl md:text-2xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            Algoryme
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className="text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium text-sm"
                                >
                                    {link.label}
                                </button>
                            ))}

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg bg-cyan-100 dark:bg-neutral-800 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-200 dark:hover:bg-neutral-700 transition-colors"
                                aria-label="Toggle theme"
                            >
                                {isDark ? '☀️' : '🌙'}
                            </button>
                        </div>

                        {/* Mobile Menu Button & Theme Toggle */}
                        <div className="md:hidden flex items-center gap-3">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg bg-cyan-100 dark:bg-neutral-800 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-200 dark:hover:bg-neutral-700 transition-colors"
                                aria-label="Toggle theme"
                            >
                                {isDark ? '☀️' : '🌙'}
                            </button>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-lg bg-cyan-100 dark:bg-neutral-800 hover:bg-cyan-200 dark:hover:bg-neutral-700 transition-colors"
                                aria-label="Toggle menu"
                            >
                                <span className="text-2xl">{isOpen ? '✕' : '☰'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`fixed inset-0 top-16 md:hidden z-30 ${isDark ? 'bg-neutral-950' : 'bg-cyan-50'
                            }`}
                    >
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="flex flex-col items-center justify-center gap-8 py-12"
                        >
                            {navLinks.map((link, index) => (
                                <motion.button
                                    key={link.id}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => scrollToSection(link.id)}
                                    className="text-2xl font-bold text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                >
                                    {link.label}
                                </motion.button>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
