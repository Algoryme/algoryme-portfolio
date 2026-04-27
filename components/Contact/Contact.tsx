"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconArrowUpRight,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandDiscord,
  IconSend,
} from "@tabler/icons-react";

type ContactInfo = {
  icon: React.ReactNode;
  label: string;
  value: string;
  link?: string;
};

const contactInfo: ContactInfo[] = [
  {
    icon: <IconMail size={24} />,
    label: "Email",
    value: "hello@example.com",
    link: "mailto:hello@example.com",
  },
  {
    icon: <IconPhone size={24} />,
    label: "Phone",
    value: "+1 (555) 123-4567",
    link: "tel:+15551234567",
  },
  {
    icon: <IconMapPin size={24} />,
    label: "Location",
    value: "San Francisco, CA",
  },
];

const socialLinks = [
  {
    name: "Twitter",
    icon: <IconBrandTwitter size={24} />,
    link: "https://twitter.com",
  },
  {
    name: "LinkedIn",
    icon: <IconBrandLinkedin size={24} />,
    link: "https://linkedin.com",
  },
  {
    name: "GitHub",
    icon: <IconBrandGithub size={24} />,
    link: "https://github.com",
  },
  {
    name: "Discord",
    icon: <IconBrandDiscord size={24} />,
    link: "https://discord.com",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      console.log("Form submitted:", formData);
      console.log("Sending to Supabase:", {
        name: formData.name,
        email: formData.email,
        message: `Subject: ${formData.subject}\n\n${formData.message}`,
        is_read: false,
      });

      // Save to Supabase
      const { data, error: supabaseError } = await supabase
        .from("contact_messages")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: `Subject: ${formData.subject}\n\n${formData.message}`,
            is_read: false,
          },
        ]);

      console.log("Supabase response - Data:", data, "Error:", supabaseError);

      if (supabaseError) {
        console.error("Supabase error details:", supabaseError);
        throw supabaseError;
      }

      console.log("Message saved successfully!");
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send message. Please try again.";
      setError(errorMessage);
      console.error("Error submitting message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full bg-[#0b0b0c] py-20 text-white" id="contact">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gray-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-widest text-gray-500">
            Get In Touch
          </p>
          <h2 className="mb-4 text-4xl md:text-5xl font-bold text-white">
            Let&apos;s Work
            <span className="ml-2 bg-linear-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400 text-lg">
            Have a project in mind or want to discuss a collaboration? We&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Contact Info Cards */}
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={info.link || "#"}>
                  <div className="group rounded-xl border border-gray-800 bg-linear-to-br from-gray-900 to-gray-950 p-6 transition-all duration-300 hover:border-gray-700 hover:shadow-lg hover:shadow-gray-900/50 cursor-pointer">
                    <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-gray-800 p-3 text-gray-300 group-hover:text-white transition-colors">
                      {info.icon}
                    </div>
                    <h3 className="mb-2 font-semibold text-white">{info.label}</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {info.value}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8 pt-8 border-t border-gray-800"
            >
              <p className="mb-4 text-sm font-semibold text-white">Follow Us</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900 p-3 text-gray-400 transition-all duration-300 hover:border-gray-700 hover:bg-gray-800 hover:text-white"
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl border border-gray-800 bg-linear-to-br from-gray-900 to-gray-950 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder-gray-600 transition-all duration-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
                    placeholder="Your name"
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder-gray-600 transition-all duration-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
                    placeholder="your@email.com"
                  />
                </motion.div>

                {/* Subject Input */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder-gray-600 transition-all duration-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
                    placeholder="Subject of your message"
                  />
                </motion.div>

                {/* Message Textarea */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder-gray-600 transition-all duration-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </motion.div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-red-800 bg-red-950/30 p-4 text-center"
                  >
                    <p className="text-red-400">{error}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-gray-700 to-gray-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading || submitted}
                  >
                    {submitted ? (
                      <>
                        <span>✓ Message Sent</span>
                      </>
                    ) : loading ? (
                      <>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        Send Message
                        <IconSend size={20} />
                      </>
                    )}
                  </motion.button>
                </motion.div>

                {/* Success Message */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-lg border border-gray-800 bg-gray-900 p-4 text-center"
                  >
                    <p className="text-gray-300">
                      Thank you for your message! We&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="mb-4 text-gray-400">
            Prefer to schedule a call? We&apos;re flexible with our time.
          </p>
          <Link href="#calendar">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-300 hover:border-gray-700 hover:bg-gray-800"
            >
              Schedule a Call
              <IconArrowUpRight size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
