"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar/HomeNavbar/navbar";
import Footer from "@/components/Footer/Footer";
import { motion } from "framer-motion";
import {
    IconCalendar,
    IconClock,
    IconCheck,
    IconPhone,
    IconBriefcase,
    IconArrowUpRight,
} from "@tabler/icons-react";

const serviceOptions = [
    {
        title: "Strategy Call",
        description: "Discuss your business goals, positioning, and how to turn your idea into a product.",
        value: "Strategy Call",
    },
    {
        title: "Project Review",
        description: "Review your existing concept or MVP and identify improvements for scaling.",
        value: "Project Review",
    },
    {
        title: "Growth Consultation",
        description: "Plan the next launch stage with design, technology, and performance in mind.",
        value: "Growth Consultation",
    },
];

const availableTimeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
];

export default function SchedulePage() {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        company: "",
        phone: "",
        service_type: serviceOptions[0].value,
        preferred_date: "",
        notes: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [dateModalOpen, setDateModalOpen] = useState(false);
    const [dateInput, setDateInput] = useState("");
    const [timeInput, setTimeInput] = useState(availableTimeSlots[0]);

    const selectedService = useMemo(
        () => serviceOptions.find((item) => item.value === formData.service_type),
        [formData.service_type]
    );

    const formatPreferredDate = (isoDate: string) => {
        if (!isoDate) return "Pick date and time";
        const date = new Date(isoDate);
        if (Number.isNaN(date.getTime())) return "Pick date and time";

        return `${date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        })} at ${date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        })}`;
    };

    const calendarDays = useMemo(() => {
        const today = new Date();
        return Array.from({ length: 14 }, (_, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() + index);
            return {
                iso: date.toISOString().slice(0, 10),
                weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
                label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                isToday: index === 0,
            };
        });
    }, []);

    const openDateModal = () => {
        const [datePart, timePart] = formData.preferred_date.split("T");
        setDateInput(datePart || "");
        setTimeInput(timePart?.slice(0, 5) || availableTimeSlots[0]);
        setDateModalOpen(true);
    };

    const applyDateSelection = () => {
        if (!dateInput || !timeInput) {
            setError("Please choose a date and time.");
            return;
        }

        setFormData((prev) => ({
            ...prev,
            preferred_date: `${dateInput}T${timeInput}`,
        }));
        setDateModalOpen(false);
        setError("");
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true);

        if (!formData.full_name || !formData.email || !formData.service_type) {
            setError("Please fill in your name, email, and selected service.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || "Unable to book your call.");
            }

            setSuccess(true);
            setFormData({
                full_name: "",
                email: "",
                company: "",
                phone: "",
                service_type: serviceOptions[0].value,
                preferred_date: "",
                notes: "",
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
            console.error("Booking submit error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#050607] text-white pt-28">
                <section className="relative overflow-hidden bg-[#06070b] py-24">
                    <div className="absolute inset-x-0 top-0 h-80 bg-linear-to-b from-primary/20 via-transparent to-transparent" />
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
                        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="space-y-8"
                            >
                                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.2em] text-gray-300">
                                    <IconCalendar size={18} className="text-primary" />
                                    Schedule a Call
                                </div>

                                <div className="space-y-6">
                                    <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Book a modern strategy session</p>
                                    <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                                        Secure your planning call and move your idea forward with confidence.
                                    </h1>
                                    <p className="max-w-2xl text-lg leading-8 text-gray-400">
                                        Pick a service, choose a time, and we&apos;ll prepare a tailored call agenda. Every booking is tracked in Supabase and visible inside the admin panel.
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                    <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/20">
                                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                                            <IconBriefcase size={20} />
                                        </div>
                                        <p className="mt-6 text-sm uppercase tracking-[0.25em] text-gray-500">Selected service</p>
                                        <h2 className="mt-3 text-2xl font-semibold text-white">{selectedService?.title}</h2>
                                    </div>
                                    <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/20">
                                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-400">
                                            <IconClock size={20} />
                                        </div>
                                        <p className="mt-6 text-sm uppercase tracking-[0.25em] text-gray-500">Duration</p>
                                        <h2 className="mt-3 text-2xl font-semibold text-white">30 - 45 mins</h2>
                                    </div>
                                    <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/20">
                                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-400">
                                            <IconCheck size={20} />
                                        </div>
                                        <p className="mt-6 text-sm uppercase tracking-[0.25em] text-gray-500">Delivery</p>
                                        <h2 className="mt-3 text-2xl font-semibold text-white">Admin tracking + email alert</h2>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-8 shadow-2xl shadow-black/20"
                            >
                                <div className="mb-8">
                                    <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Ready to book?</p>
                                    <h2 className="mt-4 text-3xl font-semibold text-white">Fast online booking for your next call.</h2>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <label className="space-y-2 text-sm text-gray-300">
                                            Full name
                                            <input
                                                type="text"
                                                name="full_name"
                                                value={formData.full_name}
                                                onChange={handleChange}
                                                placeholder="Your name"
                                                className="w-full rounded-3xl border border-white/10 bg-[#090a0d] px-4 py-3 text-white outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                                                required
                                            />
                                        </label>

                                        <label className="space-y-2 text-sm text-gray-300">
                                            Email address
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="you@example.com"
                                                className="w-full rounded-3xl border border-white/10 bg-[#090a0d] px-4 py-3 text-white outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                                                required
                                            />
                                        </label>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <label className="space-y-2 text-sm text-gray-300">
                                            Company
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                placeholder="Your company"
                                                className="w-full rounded-3xl border border-white/10 bg-[#090a0d] px-4 py-3 text-white outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                                            />
                                        </label>

                                        <label className="space-y-2 text-sm text-gray-300">
                                            Phone
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+1 555 000 0000"
                                                className="w-full rounded-3xl border border-white/10 bg-[#090a0d] px-4 py-3 text-white outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                                            />
                                        </label>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <label className="space-y-2 text-sm text-gray-300">
                                            Service type
                                            <select
                                                name="service_type"
                                                value={formData.service_type}
                                                onChange={handleChange}
                                                className="w-full rounded-3xl border border-white/10 bg-[#090a0d] px-4 py-3 text-white outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                                            >
                                                {serviceOptions.map((service) => (
                                                    <option key={service.value} value={service.value}>
                                                        {service.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>

                                        <label className="space-y-2 text-sm text-gray-300">
                                            Preferred date
                                            <button
                                                type="button"
                                                onClick={openDateModal}
                                                className="w-full rounded-3xl border border-white/10 bg-[#090a0d] px-4 py-3 text-left text-white outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                                            >
                                                {formatPreferredDate(formData.preferred_date)}
                                            </button>
                                        </label>
                                    </div>

                                    <label className="space-y-2 text-sm text-gray-300">
                                        Notes
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder="Share quick goals or questions for the call"
                                            className="w-full rounded-3xl border border-white/10 bg-[#090a0d] px-4 py-3 text-white outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                                        />
                                    </label>

                                    {error && (
                                        <div className="rounded-3xl border border-red-700 bg-red-950/60 px-4 py-3 text-sm text-red-300">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-primary to-cyan-500 px-8 py-4 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {loading ? 'Booking...' : 'Book Your Call'}
                                        <IconArrowUpRight size={18} />
                                    </button>

                                    {success && (
                                        <div className="rounded-3xl border border-emerald-600 bg-emerald-500/10 px-4 py-4 text-sm text-emerald-200">
                                            Your call request has been submitted. Check the admin panel to see the booking.
                                        </div>
                                    )}
                                </form>

                                {dateModalOpen && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 sm:px-6 sm:py-10">
                                        <div className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-black/40 sm:p-8 max-h-[calc(100vh-3rem)] overflow-y-auto">
                                            <div className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <p className="text-sm uppercase tracking-[0.35em] text-primary">Choose a slot</p>
                                                    <h3 className="mt-3 text-2xl font-semibold text-white">Select date and time</h3>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setDateModalOpen(false)}
                                                    className="inline-flex shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                                                >
                                                    Close
                                                </button>
                                            </div>

                                            <div className="space-y-8">
                                                <div className="space-y-4 rounded-3xl border border-white/10 bg-[#090a0d] p-5">
                                                    <div className="flex items-center justify-between gap-4">
                                                        <div>
                                                            <p className="text-sm uppercase tracking-[0.35em] text-gray-400">Pick a day</p>
                                                            <p className="mt-2 text-sm text-gray-300">Select from the next two weeks.</p>
                                                        </div>
                                                        <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-white">
                                                            {dateInput ? new Date(dateInput).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "No date"}
                                                        </div>
                                                    </div>

                                                    <div className="grid gap-3 sm:grid-cols-4">
                                                        {calendarDays.map((day) => (
                                                            <button
                                                                key={day.iso}
                                                                type="button"
                                                                onClick={() => setDateInput(day.iso)}
                                                                className={`rounded-3xl border px-4 py-3 text-left transition ${dateInput === day.iso
                                                                        ? "border-amber-300 bg-amber-300/10 text-white"
                                                                        : "border-white/10 bg-[#090a0d] text-gray-300 hover:border-white/20 hover:bg-white/5"
                                                                    }`}
                                                            >
                                                                <div className="text-xs uppercase tracking-[0.25em] text-gray-400">
                                                                    {day.weekday}
                                                                </div>
                                                                <div className="mt-2 text-lg font-semibold">
                                                                    {day.label}
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="space-y-4 rounded-3xl border border-white/10 bg-[#090a0d] p-5">
                                                    <div>
                                                        <p className="text-sm uppercase tracking-[0.35em] text-gray-400">Pick a time slot</p>
                                                        <p className="mt-2 text-sm text-gray-300">Choose a time that works for you.</p>
                                                    </div>

                                                    <div className="grid gap-3 sm:grid-cols-3">
                                                        {availableTimeSlots.map((slot) => (
                                                            <button
                                                                key={slot}
                                                                type="button"
                                                                onClick={() => setTimeInput(slot)}
                                                                className={`rounded-3xl border px-4 py-3 text-sm font-medium transition ${timeInput === slot
                                                                        ? "border-amber-300 bg-amber-300/10 text-white"
                                                                        : "border-white/10 bg-[#090a0d] text-gray-300 hover:border-white/20 hover:bg-white/5"
                                                                    }`}
                                                            >
                                                                {slot}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => setDateModalOpen(false)}
                                                    className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={applyDateSelection}
                                                    className="inline-flex w-full items-center justify-center rounded-full bg-linear-to-r from-primary to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 sm:w-auto"
                                                >
                                                    Save slot
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-8 shadow-2xl shadow-black/20">
                            <p className="text-sm uppercase tracking-[0.35em] text-primary">What to expect</p>
                            <h2 className="mt-4 text-3xl font-semibold text-white">A polished meeting built around your needs.</h2>
                            <p className="mt-4 text-gray-400">
                                We prepare a custom agenda, review your details ahead of time, and send a follow-up summary after the call.
                            </p>
                        </div>

                        <div className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-950/85 p-8 shadow-2xl shadow-black/20">
                            <div className="flex items-center gap-3 rounded-3xl bg-white/5 p-4">
                                <IconPhone size={20} className="text-primary" />
                                <div>
                                    <p className="text-sm uppercase tracking-[0.35em] text-gray-400">Quick support</p>
                                    <p className="text-white">We&apos;ll reply within 24 hours.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-3xl bg-white/5 p-4">
                                <IconClock size={20} className="text-cyan-400" />
                                <div>
                                    <p className="text-sm uppercase tracking-[0.35em] text-gray-400">Flexible schedule</p>
                                    <p className="text-white">Choose a time that fits your workflow.</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-8 shadow-2xl shadow-black/20">
                            <p className="text-sm uppercase tracking-[0.35em] text-primary">Need help?</p>
                            <h3 className="mt-4 text-2xl font-semibold text-white">Contact our team anytime.</h3>
                            <p className="mt-4 text-gray-400">
                                Reach out at <Link href="mailto:hello@example.com" className="text-white underline">hello@example.com</Link> if you need a custom schedule or planning package.
                            </p>
                            <Link
                                href="/"
                                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                Back to homepage
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
