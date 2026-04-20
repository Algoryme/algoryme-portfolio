'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '@/data/projects';

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
        <section
            id="projects"
            className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white to-cyan-50 dark:from-neutral-900 dark:to-neutral-950"
        >
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
                        Featured Projects
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
                        Explore our latest work showcasing innovation and excellence
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                >
                    {projectsData.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="group relative rounded-xl overflow-hidden bg-white dark:bg-neutral-800 border border-cyan-100 dark:border-neutral-700 hover:border-cyan-300 dark:hover:border-cyan-600 shadow-md hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Image Container */}
                            <div className="relative h-48 md:h-56 overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                    {project.name}
                                </h3>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.slice(0, 2).map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Button */}
                                <motion.a
                                    href={project.link}
                                    whileHover={{ x: 5 }}
                                    className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors group"
                                >
                                    Live Link
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </motion.a>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-linear-to-br from-cyan-400/0 via-transparent to-blue-400/0 group-hover:from-cyan-400/10 group-hover:to-blue-400/10 pointer-events-none transition-colors duration-300"></div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/50"
                    >
                        View All Projects
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
