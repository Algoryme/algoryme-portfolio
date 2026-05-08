"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight as IconArrowUpRight, Gauge as IconGauge, LayoutGrid as IconLayoutGrid, Sparkles as IconSparkles, ScanSearch as IconSearch } from "lucide-react";

import Navbar from "@/components/Navbar/HomeNavbar/navbar";
import Footer from "@/components/Footer/Footer";

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

const statCards = [
    {
        label: "Featured builds",
        icon: IconSparkles,
        key: "total",
    },
    {
        label: "Live stacks",
        icon: IconLayoutGrid,
        key: "tags",
    },
    {
        label: "Active launches",
        icon: IconGauge,
        key: "live",
    },
];

const ProjectTile = ({ project, index }: { project: Project; index: number }) => {
    const tagLabel = project.technologies?.slice(0, 2).join(" · ") || "Modern Web";
    const imagePlaceholder = project.image_url || "/image.png";

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-primary/40"
        >
            <div className="relative h-72 overflow-hidden bg-slate-900">
                <Image
                    src={imagePlaceholder}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-transparent to-transparent" />
                <div className="absolute left-6 bottom-6 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.3em] text-gray-300">
                    {project.status || "Live"}
                </div>
            </div>

            <div className="space-y-5 p-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-gray-400 shadow-inner shadow-black/10">
                    {tagLabel}
                </div>
                <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-primary">
                        {project.title}
                    </h3>
                    <p className="line-clamp-4 text-sm leading-6 text-gray-400">
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 5).map((tech) => (
                        <span key={tech} className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between gap-4">
                    <Link
                        href={project.demo_link || project.link || "/projects"}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-primary"
                    >
                        View case
                        <IconArrowUpRight size={16} />
                    </Link>

                    <div className="h-10 w-10 rounded-3xl bg-white/5 text-gray-300 transition group-hover:bg-primary group-hover:text-white" />
                </div>
            </div>
        </motion.article>
    );
};

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedTag, setSelectedTag] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/public-projects");
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data?.error || "Failed to load projects");
                }

                setProjects(data || []);
            } catch (error) {
                console.error("Failed to load projects:", error instanceof Error ? error.message : error);
                setProjects([]);
            }
            setLoading(false);
        };

        fetchProjects();
    }, []);

    const tags = useMemo(() => {
        const tagSet = new Set<string>();
        projects.forEach((project) => {
            project.technologies?.forEach((tag) => tagSet.add(tag));
        });
        return ["All", ...Array.from(tagSet).sort()];
    }, [projects]);

    const filteredProjects = useMemo(() => {
        if (selectedTag === "All") return projects;
        return projects.filter((project) => project.technologies?.includes(selectedTag));
    }, [projects, selectedTag]);

    const stats = useMemo(() => {
        const liveCount = projects.filter((project) => project.status?.toLowerCase() !== "archived").length;
        return {
            total: projects.length,
            tags: tags.length - 1,
            live: liveCount,
        };
    }, [projects, tags.length]);

    return (
        <div className="min-h-screen bg-[#050607] text-white">
            <Navbar />

            <main className="relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-105 bg-linear-to-b from-primary/15 via-transparent to-transparent" />
                <div className="absolute right-0 top-24 hidden h-72 w-72 rounded-full bg-primary/10 blur-3xl lg:block" />

                <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-28">
                    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] lg:items-end lg:gap-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 shadow-sm shadow-black/20">
                                <IconSearch size={18} className="text-primary" />
                                <span>Full portfolio gallery</span>
                            </div>

                            <div className="space-y-6">
                                <p className="text-sm uppercase tracking-[0.35em] text-primary">Complete showcase</p>
                                <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                                    All projects in one modern, filterable gallery.
                                </h1>
                                <p className="max-w-2xl text-lg leading-8 text-gray-300">
                                    Browse every published build from Algoryme, filter by technology, and uncover the metrics that define our most strategic work.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <Link href="#projects-grid" className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-primary to-cyan-500 px-7 py-3 text-sm font-semibold text-white transition hover:brightness-110">
                                    Browse projects
                                    <IconArrowUpRight size={18} />
                                </Link>
                                <Link href="/#showcase" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10">
                                    View homepage showcase
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-black/20"
                        >
                            <div className="space-y-3">
                                <p className="text-sm uppercase tracking-[0.35em] text-primary">Portfolio highlights</p>
                                <h2 className="text-3xl font-semibold text-white">Featured insights</h2>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                {statCards.map((stat) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div key={stat.key} className="rounded-3xl bg-white/5 p-5 transition hover:bg-white/10">
                                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-linear-to-br from-primary to-cyan-500 text-white shadow-lg shadow-primary/20">
                                                <Icon size={20} />
                                            </div>
                                            <p className="mt-5 text-sm uppercase tracking-[0.3em] text-gray-400">{stat.label}</p>
                                            <p className="mt-3 text-4xl font-semibold text-white">{stats[stat.key as keyof typeof stats]}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="relative mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:pb-32">
                    <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/20 sm:p-8">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.35em] text-primary">Filter by category</p>
                                <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Find the exact project style you want.</h2>
                            </div>
                            <div className="rounded-3xl bg-white/5 px-5 py-4 text-sm text-gray-300">
                                {projects.length === 0 ? (
                                    "Loading filters..."
                                ) : (
                                    <span className="font-medium text-white">{filteredProjects.length} project(s) available</span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {tags.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => setSelectedTag(tag)}
                                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${selectedTag === tag
                                            ? "border-primary bg-primary/10 text-white shadow-lg shadow-primary/20"
                                            : "border-white/10 bg-white/5 text-gray-300 hover:border-primary hover:bg-white/10"
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div id="projects-grid" className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {loading ? (
                            <div className="col-span-full rounded-[2rem] border border-white/10 bg-slate-950/80 p-16 text-center text-gray-400 shadow-2xl shadow-black/20">
                                Loading portfolio projects...
                            </div>
                        ) : filteredProjects.length === 0 ? (
                            <div className="col-span-full rounded-[2rem] border border-white/10 bg-slate-950/80 p-16 text-center text-gray-400 shadow-2xl shadow-black/20">
                                No projects match this category yet. Try another filter or check back soon.
                            </div>
                        ) : (
                            filteredProjects.map((project, index) => (
                                <ProjectTile key={project.id} project={project} index={index} />
                            ))
                        )}
                    </div>
                </section>

                <section className="border-t border-white/10 bg-[#050607] py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6">
                        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <p className="text-sm uppercase tracking-[0.35em] text-primary">Need a custom build?</p>
                                <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                                    Let’s build the next modern experience together.
                                </h2>
                                <p className="max-w-2xl text-lg leading-8 text-gray-400">
                                    Every project here reflects our commitment to performance, clarity, and beautiful modern design. Start a conversation and let’s turn ideas into reality.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="space-y-5 rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-black/20"
                            >
                                <div className="space-y-3">
                                    <p className="text-sm uppercase tracking-[0.35em] text-primary">Ready to collaborate</p>
                                    <p className="text-2xl font-semibold text-white">Talk to us about your next launch.</p>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Link
                                        href="/#contact"
                                        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                                    >
                                        Book a consultation
                                    </Link>
                                    <Link
                                        href="/"
                                        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
                                    >
                                        Back to homepage
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
