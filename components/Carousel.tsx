'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { companies } from '@/data/projects';

export default function Carousel() {
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const duplicatedCompanies = [...companies, ...companies, ...companies];

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let animationId: number;
        let currentScroll = 0;
        const speed = 1;

        const animate = () => {
            if (!isPaused) {
                currentScroll += speed;
                const maxScroll = container.scrollWidth / 3 - container.clientWidth;
                if (currentScroll > maxScroll) {
                    currentScroll = 0;
                }
                container.scrollLeft = currentScroll;
            }
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [isPaused]);

    return (
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
                        We partner with innovative companies to build digital excellence
                    </p>
                </motion.div>

                {/* Carousel */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className="relative"
                >
                    <div
                        ref={containerRef}
                        className="flex gap-8 overflow-hidden scroll-smooth"
                    >
                        {duplicatedCompanies.map((company, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-neutral-800 dark:to-neutral-700 border border-cyan-200 dark:border-neutral-600 flex items-center justify-center cursor-pointer group transition-all duration-300"
                            >
                                <div className="text-center">
                                    <div className="text-6xl mb-3 group-hover:scale-125 transition-transform">
                                        {company.logo}
                                    </div>
                                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                        {company.name}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white dark:from-neutral-900 to-transparent pointer-events-none z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white dark:from-neutral-900 to-transparent pointer-events-none z-10"></div>
                </motion.div>

                {/* Pause Indicator */}
                {isPaused && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center mt-6 text-sm text-neutral-500 dark:text-neutral-400"
                    >
                        ⏸ Paused
                    </motion.div>
                )}
            </div>
        </section>
    );
}
