'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const socialLinks = [
        { icon: '𝕏', label: 'Twitter', link: '#' },
        { icon: '💼', label: 'LinkedIn', link: '#' },
        { icon: 'Ⓜ️', label: 'Medium', link: '#' },
        { icon: '🐙', label: 'GitHub', link: '#' },
    ];

    const footerLinks = [
        { label: 'Home', id: 'home' },
        { label: 'Projects', id: 'projects' },
        { label: 'Contact', id: 'contact' },
    ];

    return (
        <footer className="bg-neutral-950 dark:bg-neutral-950 border-t border-neutral-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 md:mb-16">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="#home"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('home');
                            }}
                            className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity block mb-3"
                        >
                            Algoryme
                        </Link>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            Crafting digital excellence through innovation, creativity, and precision engineering.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="font-semibold text-white mb-4">Navigation</h3>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={() => scrollToSection(link.id)}
                                        className="text-neutral-400 hover:text-cyan-400 transition-colors text-sm font-medium"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="font-semibold text-white mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.link}
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    className="w-10 h-10 rounded-lg bg-neutral-800 hover:bg-cyan-500 text-neutral-400 hover:text-white flex items-center justify-center transition-all duration-300 font-semibold text-lg"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-neutral-700 to-transparent mb-8"></div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 text-neutral-400 text-sm"
                >
                    <p>
                        &copy; {currentYear} Algoryme. All rights reserved. Crafted with <span className="text-cyan-400">💎</span>
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-cyan-400 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
