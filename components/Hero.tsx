'use client';

import React from 'react';
import { motion } from 'framer-motion';

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
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0"
        >
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-cyan-50 via-white to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-900">
                <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
            >
                {/* Badge */}
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100/50 dark:bg-cyan-900/30 border border-cyan-300 dark:border-cyan-700 backdrop-blur-md">
                        <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                        <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                            Premium Digital Solutions
                        </span>
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-neutral-900 via-neutral-800 to-neutral-700 dark:from-cyan-100 dark:via-blue-100 dark:to-cyan-100 bg-clip-text text-transparent leading-tight"
                >
                    Elevate Your Digital Presence
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    We craft stunning, high-performance web experiences that captivate your audience and drive meaningful results.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    {/* Button 1: Glassmorphism */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToSection('projects')}
                        className="px-8 py-4 rounded-lg font-semibold text-white bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 text-base md:text-lg"
                    >
                        View Projects
                    </motion.button>

                    {/* Button 2: Outlined with Gradient Border */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToSection('contact')}
                        className="px-8 py-4 rounded-lg font-semibold text-cyan-600 dark:text-cyan-400 border-2 border-cyan-500 dark:border-cyan-400 hover:bg-cyan-50 dark:hover:bg-neutral-800 transition-all duration-300 relative overflow-hidden group text-base md:text-lg"
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        <span className="relative">Contact Us</span>
                    </motion.button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    variants={itemVariants}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mt-16 flex justify-center"
                >
                    <div className="text-3xl text-cyan-600 dark:text-cyan-400">↓</div>
                </motion.div>
            </motion.div>
        </section>
    );
}
