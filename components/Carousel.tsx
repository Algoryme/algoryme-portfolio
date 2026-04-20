'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { companies } from '@/data/projects';
import '../styles/carousel.css';

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
        <section className="carouselSection">
            <div className="carouselContainer">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="carouselHeader"
                >
                    <h2 className="carouselTitle">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="carouselDescription">
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
                    className="carouselWrapper"
                >
                    <div ref={containerRef} className="carouselTrack">
                        {duplicatedCompanies.map((company, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="carouselItem"
                            >
                                <div className="carouselItemContent">
                                    <div className="carouselItemIcon">
                                        {company.logo}
                                    </div>
                                    <p className="carouselItemName">
                                        {company.name}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Gradient Overlays */}
                    <div className="carouselLeftGradient"></div>
                    <div className="carouselRightGradient"></div>
                </motion.div>

                {/* Pause Indicator */}
                {isPaused && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="carouselPauseIndicator"
                    >
                        ⏸ Paused
                    </motion.div>
                )}
            </div>
        </section>
    );
}
