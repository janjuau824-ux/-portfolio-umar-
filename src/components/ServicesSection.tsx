import React from 'react';
import { ArrowRight, Check, Sparkles, Monitor, Layout, Bot } from 'lucide-react';
import { services, ServiceItem } from '../data/services';

interface ServicesSectionProps {
  onSelectService: (serviceKey: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const serviceIcons = [Monitor, Layout, Bot];

  return (
    <section id="services" className="relative py-28 bg-[#08090D] border-t border-white/[0.04]">
      {/* Subtle background glow */}
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[#8B7CFF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-[#8B7CFF] mb-3">
            04 / Offerings & Collaboration
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            SERVICES & EXPERTISE
          </h2>
          <p className="text-[#A2A5B3] text-base sm:text-lg">
            High-integrity web engineering, design systems, and practical AI integrations delivered with precision.
          </p>
        </div>

        {/* 3 Service Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];

            return (
              <div
                key={service.id}
                className="group relative p-8 rounded-3xl bg-[#11131B]/75 border border-white/[0.08] hover:border-[#8B7CFF]/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60"
              >
                <div>
                  {/* Number & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-2xl font-mono font-bold text-white/30 group-hover:text-[#8B7CFF] transition-colors">
                      {service.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#181A24] border border-white/10 flex items-center justify-center text-[#8B7CFF] group-hover:bg-[#8B7CFF] group-hover:text-white transition-all duration-300 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-3 group-hover:text-[#8B7CFF] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm font-medium text-[#F5F5F7]/90 mb-4 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <p className="text-xs text-[#A2A5B3] leading-relaxed mb-6">
                    {service.detailedDescription}
                  </p>

                  {/* Deliverables List */}
                  <div className="pt-6 border-t border-white/[0.06] space-y-2.5 mb-8">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#A2A5B3]/60 mb-2">
                      Deliverables
                    </div>
                    {service.deliverables.map((deliv, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#A2A5B3]">
                        <Check className="w-3.5 h-3.5 text-[#8B7CFF] shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct CTA */}
                <button
                  type="button"
                  onClick={() => onSelectService(service.serviceKey)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#161924] hover:bg-[#8B7CFF] text-[#E2E4EB] hover:text-white text-xs font-semibold border border-white/10 hover:border-transparent flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CFF]"
                >
                  <span>{service.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
