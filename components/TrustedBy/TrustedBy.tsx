"use client";

import {
  IconBrandGoogle,
  IconBrandAmazon,
  IconBrandNetflix,
  IconBrandApple,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandTwitch,
  IconBrandGithub,
} from "@tabler/icons-react";

type Company = {
  name: string;
  icon: React.ReactNode;
};

const companies: Company[] = [
  { name: "Google", icon: <IconBrandGoogle size={40} /> },
  { name: "Microsoft", icon: <span className="text-xl font-bold">MS</span> },
  { name: "Amazon", icon: <IconBrandAmazon size={40} /> },
  { name: "Netflix", icon: <IconBrandNetflix size={40} /> },
  { name: "Apple", icon: <IconBrandApple size={40} /> },
  { name: "Meta", icon: <IconBrandFacebook size={40} /> },
  { name: "LinkedIn", icon: <IconBrandLinkedin size={40} /> },
  { name: "GitHub", icon: <IconBrandGithub size={40} /> },
];

export default function TrustedBy() {
  return (
    <section className="w-full py-12 bg-[#0b0b0c] text-white">
      <div className="max-w-5xl mx-auto px-4 text-center">
        
        {/* Heading */}
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-8">
          Trusted by leading companies
        </p>

        {/* Icons */}
        <div className="flex flex-wrap justify-center items-center gap-20">
          {companies.map((company) => (
            <div
              key={company.name}
              className="opacity-70 hover:opacity-100 transition duration-300 text-gray-400 hover:text-white"
              title={company.name}
            >
              {company.icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}