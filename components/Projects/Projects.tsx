"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandNextjs,
  IconBrandReact,
  IconDatabase,
  IconCode,
  IconDeviceMobile,
} from "@tabler/icons-react";

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  tags: string[];
  link: string;
  image?: string;
};

const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce solution with payment integration, inventory management, and real-time analytics dashboard.",
    category: "Full Stack",
    icon: <IconBrandNextjs size={28} />,
    tags: ["Next.js", "React", "TypeScript", "Stripe"],
    link: "#",
    image: "bg-gradient-to-br from-gray-700 to-gray-900",
  },
  {
    id: "2",
    title: "AI Chat Application",
    description: "Intelligent chat platform powered by advanced AI models with real-time message streaming and context awareness.",
    category: "AI/ML",
    icon: <IconCode size={28} />,
    tags: ["Node.js", "Socket.io", "OpenAI", "MongoDB"],
    link: "#",
    image: "bg-gradient-to-br from-gray-600 to-gray-800",
  },
  {
    id: "3",
    title: "Mobile Fitness Tracker",
    description: "Cross-platform fitness application with real-time workout tracking, progress analytics, and social features.",
    category: "Mobile",
    icon: <IconDeviceMobile size={28} />,
    tags: ["React Native", "Firebase", "Redux"],
    link: "#",
    image: "bg-gradient-to-br from-gray-700 to-gray-900",
  },
  {
    id: "4",
    title: "Real-Time Collaboration Tool",
    description: "Document collaboration platform with live editing, comments, version history, and team workspace management.",
    category: "Web App",
    icon: <IconBrandReact size={28} />,
    tags: ["React", "WebSocket", "PostgreSQL"],
    link: "#",
    image: "bg-gradient-to-br from-gray-600 to-gray-800",
  },
  {
    id: "5",
    title: "Data Analytics Dashboard",
    description: "Comprehensive analytics dashboard with interactive visualizations, custom reports, and data export capabilities.",
    category: "Data",
    icon: <IconDatabase size={28} />,
    tags: ["React", "D3.js", "Apache Kafka", "Python"],
    link: "#",
    image: "bg-gradient-to-br from-gray-700 to-gray-900",
  },
  {
    id: "6",
    title: "Open Source Library",
    description: "Developer-friendly utility library with comprehensive documentation, extensive test coverage, and active community.",
    category: "Open Source",
    icon: <IconBrandGithub size={28} />,
    tags: ["TypeScript", "Jest", "GitHub"],
    link: "#",
    image: "bg-gradient-to-br from-gray-600 to-gray-800",
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={project.link}>
        <div className="group relative h-full overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-6 transition-all duration-300 hover:border-gray-700 hover:shadow-xl hover:shadow-gray-900/50">
          {/* Background gradient on hover */}
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

          {/* Icon and Category */}
          <div className="relative mb-4 flex items-start justify-between">
            <div className={`flex items-center justify-center rounded-lg ${project.image} w-12 h-12 text-white shadow-lg`}>
              {project.icon}
            </div>
            <motion.div
              className="flex items-center justify-center rounded-lg bg-gray-800 p-2 text-gray-400 opacity-0 transition-all duration-300 group-hover:opacity-100"
              whileHover={{ scale: 1.1 }}
            >
              <IconArrowUpRight size={20} />
            </motion.div>
          </div>

          {/* Category Badge */}
          <div className="mb-3 inline-block rounded-full bg-gray-800 px-3 py-1">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              {project.category}
            </p>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-300 group-hover:to-white">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mb-6 line-clamp-3 text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-400 transition-colors duration-300 group-hover:bg-gray-700 group-hover:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom line effect on hover */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-gray-400 to-white transition-all duration-500 group-hover:w-full" />
        </div>
      </Link>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <section className="relative w-full bg-[#0b0b0c] py-20 text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-widest text-gray-500">
            Featured Work
          </p>
          <h2 className="mb-4 text-4xl md:text-5xl font-bold text-white">
            Showcase of
            <span className="ml-2 bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
              Modern Projects
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400 text-lg">
            Explore a collection of innovative projects built with cutting-edge technologies and modern design principles
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-gray-400">
            Looking for more projects or want to collaborate?
          </p>
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/50"
            >
              View All Projects
              <IconArrowUpRight size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
