"use client";

import React, { JSX } from "react";
import Link from "next/link";
import { motion } from "motion/react";

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumnType = {
  title: string;
  links: FooterLink[];
};

const footerColumns: FooterColumnType[] = [
  {
    title: "Pages",
    links: [
      { label: "All Products", href: "#" },
      { label: "Studio", href: "#" },
      { label: "Clients", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
  {
    title: "Register",
    links: [
      { label: "Sign Up", href: "#" },
      { label: "Login", href: "#" },
      { label: "Forgot Password", href: "#" },
    ],
  },
];

export default function Footer(): JSX.Element {
  return (
    <>
      {/* Footer */}
      <footer className="relative w-full bg-[#0b0b0c] text-white overflow-hidden">
        {/* Main content */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
            {/* Top section with columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-16">
              {/* Left - Logo and Brand */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="col-span-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <span className="text-lg font-semibold text-white">
                    Algoryme
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  © copyright Algoryme 2024. All rights reserved.
                </p>
              </motion.div>

              {/* Right - 4 columns */}
              {footerColumns.map((column, columnIndex) => (
                <motion.div
                  key={columnIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: (columnIndex + 1) * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="col-span-1"
                >
                  <h3 className="text-white font-medium text-sm mb-6 uppercase tracking-wider">
                    {column.title}
                  </h3>
                  <ul className="space-y-3">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link href={link.href}>
                          <span className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Background decoration section */}
      <div className="w-full bg-[#0b0b0c] overflow-hidden py-0 md:py-1">
        <div className="flex items-center justify-center pointer-events-none">
          <div className="text-[200px] font-black text-white opacity-5 whitespace-nowrap">
            Algoryme
          </div>
        </div>
      </div>
    </>
  );
}
