"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  IconArrowUpRight,
  IconCode,
} from "@tabler/icons-react";

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: string;
  image_url?: string;
  link?: string;
  demo_link?: string;
};

const getProjectCategory = (project: Project) => {
  if (project.technologies?.length > 0) {
    return project.technologies[0];
  }

  return project.status === 'archived' ? 'Archived' : 'Web Project';
};

const getProjectUrl = (project: Project) => project.demo_link || project.link || '/projects';

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={getProjectUrl(project)} target="_blank" rel="noreferrer">
        <div className="group relative h-full overflow-hidden rounded-xl border border-gray-800 bg-slate-950 p-0 transition-all duration-300 hover:border-gray-700 hover:shadow-xl hover:shadow-gray-900/50">
          {project.image_url ? (
            <div className="relative overflow-hidden rounded-t-xl h-64 w-full">
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
            </div>
          ) : (
            <div className="h-64 w-full rounded-t-xl bg-gray-900" />
          )}

          <div className="relative p-6">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-800 text-white shadow-lg">
                <IconCode size={24} />
              </div>
              <motion.div
                className="flex items-center justify-center rounded-lg bg-gray-800 p-2 text-gray-400 opacity-0 transition-all duration-300 group-hover:opacity-100"
                whileHover={{ scale: 1.1 }}
              >
                <IconArrowUpRight size={20} />
              </motion.div>
            </div>

            <div className="mb-3 inline-block rounded-full bg-gray-800 px-3 py-1">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                {getProjectCategory(project)}
              </p>
            </div>
          </div>

          <h3 className="mb-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-gray-300 group-hover:to-white">
            {project.title}
          </h3>

          <p className="mb-6 line-clamp-3 text-sm text-gray-300 transition-colors duration-300 group-hover:text-gray-100">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies?.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-400 transition-colors duration-300 group-hover:bg-gray-700 group-hover:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-gray-400 to-white transition-all duration-500 group-hover:w-full" />
        </div>
      </Link>
    </motion.div>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);

      try {
        const response = await fetch('/api/public-projects');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || 'Failed to load projects');
        }

        setProjects(data || []);
      } catch (error) {
        console.error('Failed to load projects:', error instanceof Error ? error.message : error);
        setProjects([]);
      }

      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <section id="showcase" className="relative w-full bg-[#0b0b0c] py-20 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
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
            <span className="ml-2 bg-linear-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
              Modern Projects
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400 text-lg">
            Explore a collection of innovative projects built with cutting-edge technologies and modern design principles
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-400">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-gray-400">No live projects are available yet. Add one from the admin panel.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

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
              className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-gray-700 to-gray-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/50"
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
