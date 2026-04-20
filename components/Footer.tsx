'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import '../styles/footer.css';

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
        <footer className="footer">
            <div className="footerContent">
                {/* Main Footer Grid */}
                <div className="footerGrid">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="footerBrand"
                    >
                        <Link
                            href="#home"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('home');
                            }}
                            className="footerLogo"
                        >
                            Algoryme
                        </Link>
                        <p className="footerBrandText">
                            Crafting digital excellence through innovation, creativity, and precision engineering.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="footerLinksSection"
                    >
                        <h3 className="footerSectionTitle">Navigation</h3>
                        <ul className="footerLinks">
                            {footerLinks.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={() => scrollToSection(link.id)}
                                        className="footerLink"
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
                        className="footerLinksSection"
                    >
                        <h3 className="footerSectionTitle">Follow Us</h3>
                        <div className="socialLinks">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.link}
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    className="socialLink"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="footerDivider"></div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="footerBottom"
                >
                    <p className="footerCopyright">
                        &copy; {currentYear} Algoryme. All rights reserved. Crafted with <span className="footerGem">💎</span>
                    </p>
                    <div className="footerPolicies">
                        <a href="#" className="footerPolicyLink">
                            Privacy Policy
                        </a>
                        <a href="#" className="footerPolicyLink">
                            Terms of Service
                        </a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
