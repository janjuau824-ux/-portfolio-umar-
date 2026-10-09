import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight, User, Code2, FolderGit2, Briefcase, Mail } from 'lucide-react';
import { CinematicScene } from './CinematicScene';
import { siteConfig } from '../data/siteConfig';

interface HeroSectionProps {
  onNavigate: (pageId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const pageCards = [
    {
      id: 'about',
      title: 'About Me',
      kicker: '01 / Background',
      description: 'Philosophy, engineering principles, and design craftsmanship.',
      icon: User,
    },
    {
      id: 'skills',
      title: 'Skills Matrix',
      kicker: '02 / Capabilities',
      description: 'HTML5, CSS3, JavaScript, React, practical AI, and UX design.',
      icon: Code2,
    },
    {
      id: 'projects',
      title: 'Featured Projects',
      kicker: '03 / Showcase',
      description: 'VoiceCraft AI, Transly AI, Color Forge AI, and 3D portfolio.',
      icon: FolderGit2,
    },
    {
      id: 'services',
      title: 'Services',
      kicker: '04 / Solutions',
      description: 'Website development, UI/UX frontend, and intelligent AI apps.',
      icon: Briefcase,
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#08090D] overflow-hidden">
      {/* 3D HERO VIEWPORT */}
      <section className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden pt-28 pb-16">
        {/* 3D WEBGL CINEMATIC SCENE */}
        <CinematicScene />

        {/* ATMOSPHERIC GRADIENT SCRIMS */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#08090D]/50 to-[#08090D] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#08090D] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#08090D] to-transparent pointer-events-none" />

        {/* CONTENT LAYER */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
          {/* AVAILABILITY / KICKER */}
          {siteConfig.availableForProjects && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center gap-2.5 text-xs text-[#A2A5B3] font-medium tracking-wide mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#8B7CFF]" />
              <span className="text-[#F5F5F7]">{siteConfig.availabilityNote}</span>
              <span aria-hidden="true" className="text-white/20">/</span>
              <span>Available for Remote & Direct Engagements</span>
            </motion.div>
          )}

          {/* HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl text-balance mb-6"
          >
            <span>BUILDING DIGITAL</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#D1D5DB] to-[#8B7CFF]">
              EXPERIENCES THAT MATTER.
            </span>
          </motion.h1>

          {/* SUPPORTING TEXT */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-[#A2A5B3] max-w-2xl leading-relaxed mb-10 font-normal"
          >
            {siteConfig.supportingText}
          </motion.p>

          {/* CTAS */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-[#08090D] bg-white hover:bg-[#EAEAEA] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-white/10 flex items-center justify-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CFF]"
            >
              <span>Explore My Work</span>
              <ChevronRight className="w-4 h-4 text-[#08090D] group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-[#11131B]/90 hover:bg-[#1A1D29] border border-white/15 hover:border-[#8B7CFF]/50 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CFF]"
            >
              <span>Let's Work Together</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* QUICK PAGE DIRECTORY CARDS (Alag Alag Pages Gateway) */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 border-t border-white/[0.06]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#8B7CFF] mb-2">
              Website Directory
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Explore Dedicated Pages
            </h2>
          </div>
          <div className="text-xs text-[#A2A5B3]">
            Select any section to open its dedicated full page
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pageCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => onNavigate(card.id)}
                className="group p-6 rounded-2xl bg-[#11131B]/80 border border-white/[0.08] hover:border-[#8B7CFF]/50 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-[#8B7CFF]">
                      {card.kicker}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#181A24] border border-white/10 flex items-center justify-center text-[#8B7CFF] group-hover:bg-[#8B7CFF] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-[#8B7CFF] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#A2A5B3] leading-relaxed mb-4">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs font-medium text-white/70 group-hover:text-white">
                  <span>Open Page</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#8B7CFF]" />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
