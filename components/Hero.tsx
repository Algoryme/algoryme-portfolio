'use client';

import React from 'react';
import { motion } from 'framer-motion';
import '../styles/hero.css';

export default function Hero() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        },
    };

    return (
        <section id="home" className="heroSection">
            {/* Animated Background Gradient */}
            <div className="heroBg">
                <div className="heroGlowLeft"></div>
                <div className="heroGlowRight"></div>
            </div>

            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="heroContent"
            >
                {/* Badge */}
                <motion.div
                    variants={itemVariants}
                    className="heroBadge"
                >
                    <span className="badgeDot"></span>
                    <span className="badgeText">
                        Premium Digital Solutions
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    variants={itemVariants}
                    className="heroHeading"
                >
                    Elevate Your Digital Presence
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    variants={itemVariants}
                    className="heroSubheading"
                >
                    We craft stunning, high-performance web experiences that captivate your audience and drive meaningful results.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="heroCTAContainer"
                >
                    {/* Button 1 */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToSection('projects')}
                        className="heroCTAPrimary"
                    >
                        View Projects
                    </motion.button>

                    {/* Button 2 */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToSection('contact')}
                        className="heroCTASecondary"
                    >
                        Contact Us
                    </motion.button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    variants={itemVariants}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="heroScrollIndicator"
                >
                    ↓
                </motion.div>
            </motion.div>
        </section>
    );
}
