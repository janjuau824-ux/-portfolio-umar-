import React from 'react';
import { motion } from 'motion/react';
import { Code, Eye, Zap, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const AboutSection: React.FC = () => {
  const valueProps = [
    {
      title: "Clean and maintainable code",
      description:
        "Structured architectures using modern TypeScript, modular components, and predictable state flow that teams can easily scale and extend.",
      icon: Code,
    },
    {
      title: "User-focused design",
      description:
        "Ergonomic, accessible interfaces with disciplined typography, intentional contrast, and fluid motion designed around human perception.",
      icon: Eye,
    },
    {
      title: "Performance and responsiveness",
      description:
        "Lightweight asset footprints, 60fps animations, Core Web Vitals discipline, and seamless adaptation across all screen sizes.",
      icon: Zap,
    },
  ];

  return (
    <section id="about" className="relative py-28 bg-[#08090D] border-t border-white/[0.04] overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#8B7CFF]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#60A5FA]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-[#8B7CFF] mb-3">
            01 / Philosophy & Approach
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            DESIGN MINDED.
            <br />
            <span className="text-[#A2A5B3]">TECHNICALLY DRIVEN.</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#A2A5B3] leading-relaxed font-normal">
            I build responsive websites and digital products that combine thoughtful design, reliable engineering, and practical AI capabilities.
          </p>
        </div>

        {/* Editorial 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Narrative Column */}
          <div className="lg:col-span-5 space-y-6 text-[#A2A5B3] text-base leading-relaxed">
            <p>
              Hi, I'm <strong className="text-white font-medium">{siteConfig.name}</strong>. I specialize in turning complex digital ideas into fast, elegant, and interactive web applications. By pairing modern frontend engineering with intentional UI design, I build experiences that look exceptional and perform effortlessly.
            </p>
            <p>
              My work spans from semantic HTML, CSS, and modern React architectures to cutting-edge AI integrations like real-time neural audio processing, automated translation hubs, and algorithmic design utilities.
            </p>
            <p>
              Whether developing a client website from scratch or crafting specialized web interfaces, my focus is always on engineering longevity, accessible user flow, and measurable craftsmanship.
            </p>

            {/* Core commitments */}
            <div className="pt-4 border-t border-white/[0.06] space-y-3">
              <div className="flex items-center gap-3 text-sm text-[#F5F5F7]">
                <CheckCircle2 className="w-4 h-4 text-[#8B7CFF] shrink-0" />
                <span>Responsive execution across desktop, tablet, and mobile</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#F5F5F7]">
                <CheckCircle2 className="w-4 h-4 text-[#8B7CFF] shrink-0" />
                <span>Modern React and TypeScript standards</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#F5F5F7]">
                <CheckCircle2 className="w-4 h-4 text-[#8B7CFF] shrink-0" />
                <span>Practical AI integration without unnecessary complexity</span>
              </div>
            </div>
          </div>

          {/* Three Value Propositions */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-5">
            {valueProps.map((prop, idx) => {
              const Icon = prop.icon;
              return (
                <div
                  key={prop.title}
                  className="p-7 rounded-2xl bg-[#11131B]/80 border border-white/[0.07] hover:border-[#8B7CFF]/40 transition-all duration-300 group shadow-lg"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-[#1A1D29] border border-white/10 flex items-center justify-center shrink-0 text-[#8B7CFF] group-hover:bg-[#8B7CFF]/10 group-hover:border-[#8B7CFF]/50 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white tracking-tight mb-2 group-hover:text-[#8B7CFF] transition-colors">
                        {prop.title}
                      </h3>
                      <p className="text-sm text-[#A2A5B3] leading-relaxed">
                        {prop.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
