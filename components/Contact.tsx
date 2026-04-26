'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import '../styles/contact.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simple validation
        if (!formData.name || !formData.email || !formData.message) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            // Save to Supabase
            const { error: supabaseError } = await supabase
                .from('contact_messages')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                        is_read: false,
                    },
                ]);

            if (supabaseError) {
                throw supabaseError;
            }

            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setSubmitted(false), 5000);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
            setError(errorMessage);
            console.error('Error submitting message:', err);
        } finally {
            setLoading(false);
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
        <section id="contact" className="contactSection">
            <div className="contactContainer">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false }}
                    className="contactHeader"
                >
                    <h2 className="contactTitle">Let&apos;s Work Together</h2>
                    <p className="contactSubtitle">
                        Have a project in mind? We&apos;d love to hear from you. Send us a message and let&apos;s create something amazing.
                    </p>
                </motion.div>

                {/* Form Container */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="contactFormBox"
                >
                    <form onSubmit={handleSubmit} className="contactForm">
                        {/* Name Field */}
                        <motion.div variants={itemVariants} className="formGroup">
                            <label className="formLabel">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className="formInput"
                            />
                        </motion.div>

                        {/* Email Field */}
                        <motion.div variants={itemVariants} className="formGroup">
                            <label className="formLabel">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                className="formInput"
                            />
                        </motion.div>

                        {/* Message Field */}
                        <motion.div variants={itemVariants} className="formGroup">
                            <label className="formLabel">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us about your project..."
                                rows={5}
                                className="formTextarea"
                            ></textarea>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div variants={itemVariants} className="formButtonGroup">
                            {error && <div className="errorMessage">{error}</div>}

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="submitButton"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </motion.button>

                            {/* Success Message */}
                            {submitted && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="successMessage"
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
                    viewport={{ once: false }}
                    className="contactInfoGrid"
                >
                    {[
                        { icon: '📧', label: 'Email', value: 'hello@algoryme.com', href: 'mailto:hello@algoryme.com' },
                        { icon: '📱', label: 'Phone', value: '01401020517, 01580306687', href: 'tel:01401020517' },
                        { icon: '📍', label: 'Location', value: 'Mirpur-2, Dhaka-1216', href: 'https://maps.google.com/?q=Mirpur-2,Dhaka-1216' },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="contactInfoCard"
                        >
                            <div className="contactInfoIcon">{item.icon}</div>
                            <p className="contactInfoLabel">
                                {item.label}
                            </p>
                            <a
                                href={item.href}
                                target={item.label === 'Location' ? '_blank' : undefined}
                                rel={item.label === 'Location' ? 'noopener noreferrer' : undefined}
                                className="contactInfoValue"
                            >
                                {item.value}
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
