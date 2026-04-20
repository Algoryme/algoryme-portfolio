'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { companies } from '@/data/projects';
import '../styles/carousel.css';

export default function Carousel() {
    const duplicatedCompanies = [...companies, ...companies, ...companies];

    return (
        <section className="carouselSection">
            <div className="carouselContainer">
                {/* Carousel */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false }}
                    className="carouselWrapper"
                >
                    <div className="carouselTrack">
                        {duplicatedCompanies.map((company, index) => (
                            <div
                                key={index}
                                className="carouselItem"
                                style={{ '--glow-delay': `${(index % companies.length) * 0.2}s` } as React.CSSProperties}
                            >
                                <div className="carouselGlow"></div>
                                <div className="carouselItemContent">
                                    <div className="carouselItemIcon">
                                        {company.logo}
                                    </div>
                                    <p className="carouselItemName">
                                        {company.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Gradient Overlays */}
                    <div className="carouselLeftGradient"></div>
                    <div className="carouselRightGradient"></div>
                </motion.div>


            </div>
        </section>
    );
}
