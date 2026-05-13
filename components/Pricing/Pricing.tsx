"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  IconCheck,
  IconX,
  IconArrowUpRight,
  IconBolt,
  IconCrown,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

type PricingTier = {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  icon: React.ReactNode;
  popular?: boolean;
  features: Array<{
    name: string;
    included: boolean;
  }>;
  cta: string;
  ctaLink: string;
};

const pricingTiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for getting started",
    price: "$0",
    period: "forever",
    icon: <div className="w-6 h-6 text-gray-400">📦</div>,
    features: [
      { name: "Experiment upto 15 days", included: true },
      { name: "Customizable Components", included: true },
      { name: "Admin Panel", included: true },
      { name: "1 GB storage", included: true },
      { name: "Advanced features", included: false },
      { name: "Priority support", included: false },
      { name: "Custom integrations", included: false },
    ],
    cta: "Get Started",
    ctaLink: "#",
  },
  {
    id: "plus",
    name: "Plus",
    description: "For growing projects",
    price: "$29",
    period: "month",
    icon: <IconBolt size={28} />,
    popular: true,
    features: [
      { name: "Up to 50 projects", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Email support", included: true },
      { name: "100 GB storage", included: true },
      { name: "Advanced features", included: true },
      { name: "Priority support", included: false },
      { name: "Custom integrations", included: false },
    ],
    cta: "Start Free Trial",
    ctaLink: "#",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For enterprise needs",
    price: "Custom",
    period: "quote",
    icon: <IconCrown size={28} />,
    features: [
      { name: "Unlimited projects", included: true },
      { name: "Real-time analytics", included: true },
      { name: "24/7 support", included: true },
      { name: "Unlimited storage", included: true },
      { name: "Advanced features", included: true },
      { name: "Priority support", included: true },
      { name: "Custom integrations", included: true },
    ],
    cta: "Contact Sales",
    ctaLink: "#",
  },
];

const PricingCard = ({
  tier,
  index,
}: {
  tier: PricingTier;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <div
        className={`relative h-full overflow-hidden rounded-2xl border transition-all duration-300 ${tier.popular
            ? "border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl shadow-gray-900/50"
            : "border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 hover:border-gray-700 hover:shadow-xl hover:shadow-gray-900/50"
          }`}
      >
        {/* Popular badge */}
        {tier.popular && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-gray-600 to-gray-700 px-4 py-1 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-white">
              ⭐ Most Popular
            </p>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className={tier.popular ? "mt-4" : "mb-1"}>
            <div className="mb-2 inline-flex items-center justify-center rounded-lg bg-gray-800 p-2 text-white">
              {tier.icon}
            </div>
            <h3 className="mb-1 text-xl font-bold text-white">{tier.name}</h3>
            <p className="text-xs text-gray-400">{tier.description}</p>
          </div>

          {/* Price */}
          <div className="my-5">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{tier.price}</span>
              {tier.period !== "quote" && (
                <span className="text-sm text-gray-400">
                  {tier.period === "forever" ? "" : `/${tier.period}`}
                </span>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <Link href={tier.ctaLink}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-2 px-4 rounded-lg font-semibold text-sm text-white transition-all duration-300 flex items-center justify-center gap-2 ${tier.popular
                  ? "bg-gradient-to-r from-gray-700 to-gray-600 hover:shadow-lg hover:shadow-gray-700/50"
                  : "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                }`}
            >
              {tier.cta}
              <IconArrowUpRight size={18} />
            </motion.button>
          </Link>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-gray-500 to-white transition-all duration-500 group-hover:w-full" />
        </div>
      </div>
    </motion.div>
  );
};

export default function Pricing() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Check initial state
    checkScroll();

    // Add scroll event listener
    container.addEventListener("scroll", checkScroll);

    // Also check on window resize
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280; // Adjusted for responsive card sizes
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="pricing" className="relative w-full bg-[#0b0b0c] py-20 text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gray-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl" />
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
            Simple, Transparent Pricing
          </p>
          <h2 className="mb-4 text-4xl md:text-5xl font-bold text-white">
            Choose Your
            <span className="ml-2 bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
              Plan
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400 text-lg">
            Flexible pricing that grows with your business. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards Grid with Arrows */}
        <div className="relative mb-12">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-700 rounded-full p-1 sm:p-2 transition-colors duration-300"
            >
              <IconChevronLeft size={20} className="sm:w-6 sm:h-6 text-white" />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 sm:gap-6 md:gap-8 px-4 sm:px-8 md:px-16 scrollbar-hide"
            style={{
              scrollBehavior: "smooth",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {pricingTiers.map((tier, index) => (
              <div key={tier.id} className="flex-shrink-0 w-64 sm:w-72 md:w-80">
                <PricingCard tier={tier} index={index} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-800 hover:bg-gray-700 rounded-full p-1 sm:p-2 transition-colors duration-300"
            >
              <IconChevronRight size={20} className="sm:w-6 sm:h-6 text-white" />
            </button>
          )}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 p-8"
        >
          <h3 className="mb-6 text-2xl font-bold text-white">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            {[
              {
                q: "Can I change plans anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "Is there a free trial for Plus and Pro?",
                a: "Yes, both Plus and Pro plans come with a 14-day free trial. No credit card required.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and wire transfers for enterprise customers.",
              },
              {
                q: "Do you offer annual discounts?",
                a: "Yes, annual subscriptions come with 20% discount compared to monthly billing.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-b border-gray-800 pb-6 last:border-b-0 last:pb-0"
              >
                <h4 className="mb-2 font-semibold text-white">{faq.q}</h4>
                <p className="text-gray-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 p-8 text-center border border-gray-700"
        >
          <h3 className="mb-2 text-2xl font-bold text-white">
            Still unsure which plan is right for you?
          </h3>
          <p className="mb-6 text-gray-400">
            Chat with our sales team to find the perfect solution for your needs.
          </p>
          <Link href="#contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/50"
            >
              Get in Touch
              <IconArrowUpRight size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
