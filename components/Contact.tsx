'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation
        if (formData.name && formData.email && formData.message) {
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setSubmitted(false), 5000);
        }
    };

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
            id="contact"
            className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900"
        >
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
                        Let&apos;s Work Together
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
                        Have a project in mind? We&apos;d love to hear from you. Send us a message and let&apos;s create something amazing.
                    </p>
                </motion.div>

                {/* Form Container */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-linear-to-br from-cyan-50 to-blue-50 dark:from-neutral-800 dark:to-neutral-850 rounded-2xl p-8 md:p-12 border border-cyan-200 dark:border-neutral-700 shadow-xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-700 border border-cyan-200 dark:border-neutral-600 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                            />
                        </motion.div>

                        {/* Email Field */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-700 border border-cyan-200 dark:border-neutral-600 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                            />
                        </motion.div>

                        {/* Message Field */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us about your project..."
                                rows={5}
                                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-700 border border-cyan-200 dark:border-neutral-600 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition-all duration-300"
                            ></textarea>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full md:w-auto px-10 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/50"
                            >
                                Send Message
                            </motion.button>

                            {/* Success Message */}
                            {submitted && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center text-green-600 dark:text-green-400 font-semibold"
                                >
                                    ✓ Message sent successfully! We&apos;ll get back to you soon.
                                </motion.div>
                            )}
                        </motion.div>
                    </form>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {[
                        { icon: '📧', label: 'Email', value: 'hello@algoryme.com' },
                        { icon: '📱', label: 'Phone', value: '+1 (555) 123-4567' },
                        { icon: '📍', label: 'Location', value: 'San Francisco, CA' },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="text-center p-6 rounded-lg bg-cyan-50 dark:bg-neutral-800 border border-cyan-200 dark:border-neutral-700 hover:border-cyan-300 dark:hover:border-cyan-600 transition-colors"
                        >
                            <div className="text-4xl mb-3">{item.icon}</div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                                {item.label}
                            </p>
                            <p className="font-semibold text-neutral-900 dark:text-white">
                                {item.value}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
