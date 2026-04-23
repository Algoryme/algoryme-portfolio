"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  IconCheck,
  IconX,
  IconArrowUpRight,
  IconBolt,
  IconCrown,
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
      { name: "Up to 5 projects", included: true },
      { name: "Basic analytics", included: true },
      { name: "Community support", included: true },
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
        className={`relative h-full overflow-hidden rounded-2xl border transition-all duration-300 ${
          tier.popular
            ? "border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl shadow-gray-900/50"
            : "border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950 hover:border-gray-700 hover:shadow-xl hover:shadow-gray-900/50"
        }`}
      >
        {/* Popular badge */}
        {tier.popular && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-gray-600 to-gray-700 px-4 py-2 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-white">
              ⭐ Most Popular
            </p>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col h-full p-8">
          {/* Header */}
          <div className={tier.popular ? "mt-6" : "mb-2"}>
            <div className="mb-3 inline-flex items-center justify-center rounded-lg bg-gray-800 p-3 text-white">
              {tier.icon}
            </div>
            <h3 className="mb-2 text-2xl font-bold text-white">{tier.name}</h3>
            <p className="text-sm text-gray-400">{tier.description}</p>
          </div>

          {/* Price */}
          <div className="my-8">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold text-white">{tier.price}</span>
              {tier.period !== "quote" && (
                <span className="text-gray-400">
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
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 mb-8 ${
                tier.popular
                  ? "bg-gradient-to-r from-gray-700 to-gray-600 hover:shadow-lg hover:shadow-gray-700/50"
                  : "bg-gray-800 hover:bg-gray-700 border border-gray-700"
              }`}
            >
              {tier.cta}
              <IconArrowUpRight size={18} />
            </motion.button>
          </Link>

          {/* Features */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              What's included
            </p>
            <div className="space-y-3 flex-grow">
              {tier.features.map((feature, featureIndex) => (
                <motion.div
                  key={featureIndex}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1 + featureIndex * 0.05,
                  }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div
                    className={`mt-0.5 flex-shrink-0 ${
                      feature.included
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    {feature.included ? (
                      <IconCheck size={20} />
                    ) : (
                      <IconX size={20} />
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      feature.included
                        ? "text-gray-300"
                        : "text-gray-600 line-through"
                    }`}
                  >
                    {feature.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-gray-500 to-white transition-all duration-500 group-hover:w-full" />
        </div>
      </div>
    </motion.div>
  );
};

export default function Pricing() {
  return (
    <section className="relative w-full bg-[#0b0b0c] py-20 text-white">
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

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
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
