'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { projectsData } from '@/data/projects';
import '../styles/projects.css';

export default function Projects() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section id="projects" className="projectsSection">
            <div className="projectsContainer">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, margin: '-50px' }}
                    className="projectsHeader"
                >
                    <h2 className="projectsTitle">Featured Projects</h2>
                    <p className="projectsDescription">
                        Explore our latest work showcasing innovation and excellence
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: '-100px' }}
                    className="projectsGrid"
                >
                    {projectsData.slice(0, 4).map((project) => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="projectCard"
                        >
                            {/* Image Container */}
                            <div className="projectImageContainer">
                                <Image
                                    src={project.image}
                                    alt={project.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="projectImage"
                                    priority={false}
                                />
                                <div className="projectImageOverlay"></div>
                            </div>

                            {/* Content */}
                            <div className="projectContent">
                                <h3 className="projectTitle">
                                    {project.name}
                                </h3>
                                <p className="projectDescription">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="projectTags">
                                    {project.tags.slice(0, 2).map((tag) => (
                                        <span key={tag} className="projectTag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Button */}
                                <motion.a
                                    href={project.link}
                                    whileHover={{ x: 5 }}
                                    className="projectLink"
                                >
                                    Live Link
                                    <span>→</span>
                                </motion.a>
                            </div>

                            {/* Glow Effect */}
                            <div className="projectGlow"></div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false }}
                    className="projectsButtonContainer"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="projectsViewAllButton"
                    >
                        View All Projects
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
