import React, { useState } from 'react';
import { 
  Code2, 
  Palette, 
  FileCode2, 
  Layers, 
  Smartphone, 
  LayoutGrid, 
  Sparkles, 
  Share2 
} from 'lucide-react';
import { skills, SkillItem } from '../data/skills';

// Icon map for skills
const iconMap: Record<string, React.ElementType> = {
  Code2,
  Palette,
  FileCode2,
  Layers,
  Smartphone,
  LayoutGrid,
  Sparkles,
  Share2
};

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'Core Web', label: 'Core Web' },
    { id: 'Modern Frontend', label: 'Modern Frontend' },
    { id: 'AI & Integration', label: 'AI & Integration' },
    { id: 'Design & UX', label: 'Design & UX' },
  ];

  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="relative py-28 bg-[#08090D] border-t border-white/[0.04] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#8B7CFF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#8B7CFF] mb-3">
              02 / Technical Competencies
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              INTERACTIVE SKILL MATRIX
            </h2>
            <p className="text-[#A2A5B3] text-base sm:text-lg mt-3 max-w-2xl">
              Specialized technical toolsets and design methodologies utilized to build modern digital products.
            </p>
          </div>

          {/* Functional category filter control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#11131B] border border-white/[0.08] rounded-xl self-start md:self-auto">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CFF] whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#8B7CFF] text-white shadow-sm'
                    : 'text-[#A2A5B3] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => {
            const Icon = iconMap[skill.iconName] || Code2;
            const isHovered = activeSkillId === skill.id;

            return (
              <div
                key={skill.id}
                tabIndex={0}
                onMouseEnter={() => setActiveSkillId(skill.id)}
                onMouseLeave={() => setActiveSkillId(null)}
                onFocus={() => setActiveSkillId(skill.id)}
                onBlur={() => setActiveSkillId(null)}
                className="group relative p-6 rounded-2xl bg-[#11131B]/75 border border-white/[0.08] hover:border-[#8B7CFF]/50 focus-visible:border-[#8B7CFF] focus-visible:ring-2 focus-visible:ring-[#8B7CFF] focus-visible:outline-none transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/60 flex flex-col justify-between cursor-default"
              >
                {/* Accent glow corner */}
                <div 
                  className={`absolute top-0 right-0 w-24 h-24 bg-[#8B7CFF]/10 rounded-bl-full blur-xl pointer-events-none transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div>
                  {/* Category kicker */}
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#A2A5B3]/70 mb-4 flex items-center justify-between">
                    <span>{skill.category}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#8B7CFF] transition-colors" />
                  </div>

                  {/* Icon & Title */}
                  <div className="w-11 h-11 rounded-xl bg-[#181A24] border border-white/10 flex items-center justify-center text-[#8B7CFF] group-hover:bg-[#8B7CFF] group-hover:text-white transition-all duration-300 mb-4 shadow-inner">
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-[#8B7CFF] transition-colors">
                    {skill.name}
                  </h3>

                  <p className="text-xs text-[#A2A5B3] leading-relaxed mb-6">
                    {skill.description}
                  </p>
                </div>

                {/* Key aspects list */}
                <div className="pt-4 border-t border-white/[0.05] space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#A2A5B3]/60 mb-1">
                    Key Strengths
                  </div>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-[#A2A5B3]">
                    {skill.keyAspects.map((aspect, i) => (
                      <span key={aspect} className="flex items-center gap-1.5">
                        <span className="text-white/80">{aspect}</span>
                        {i < skill.keyAspects.length - 1 && (
                          <span aria-hidden="true" className="text-white/20">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
