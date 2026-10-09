import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Maximize2 } from 'lucide-react';
import { projects, Project } from '../data/projects';
import { ProjectDetailModal } from './ProjectDetailModal';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // 3D Card tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section id="projects" className="relative py-28 bg-[#08090D] border-t border-white/[0.04]">
      {/* Background visual atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#8B7CFF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#8B7CFF] mb-3">
              03 / Selected Works
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              FEATURED PROJECTS
            </h2>
            <p className="text-[#A2A5B3] text-base sm:text-lg mt-3 max-w-2xl">
              A curated selection of intelligent AI applications, audio workstations, and responsive web systems.
            </p>
          </div>

          <div className="text-xs font-mono text-[#A2A5B3]/80">
            <span>4 Production Case Studies</span>
          </div>
        </div>

        {/* Projects 2x2 Grid with Bento Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project) => {
            const isHovered = hoveredCardId === project.id;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredCardId(project.id)}
                onMouseLeave={(e) => {
                  setHoveredCardId(null);
                  handleMouseLeave(e);
                }}
                onMouseMove={(e) => handleMouseMove(e, project.id)}
                className="group relative rounded-3xl bg-[#11131B]/80 border border-white/[0.08] hover:border-[#8B7CFF]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl cursor-pointer"
                style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out, border-color 0.3s ease' }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Visual Preview Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60 border-b border-white/[0.06]">
                  <img
                    src={project.previewImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11131B] via-transparent to-black/30 opacity-80" />

                  {/* Top-Right Quick Expand Icon */}
                  <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:border-[#8B7CFF]/50 transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Category & Year Stamp */}
                  <div className="absolute top-4 left-4 z-10 text-[11px] font-mono tracking-wider text-[#F5F5F7]/90 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    <span>{project.category}</span>
                    <span className="mx-1.5 opacity-40">/</span>
                    <span>{project.year}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Tech Stack */}
                    <div className="flex items-center gap-2 text-xs text-[#A2A5B3] mb-3">
                      {project.techStack.map((tech, idx) => (
                        <span key={tech} className="flex items-center gap-2">
                          <span className="text-[#D1D5DB] font-medium">{tech}</span>
                          {idx < project.techStack.length - 1 && (
                            <span aria-hidden="true" className="text-white/20">·</span>
                          )}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-[#8B7CFF] transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-[#8B7CFF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>

                    <p className="text-sm text-[#A2A5B3] leading-relaxed line-clamp-2 mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="text-xs font-semibold text-white group-hover:text-[#8B7CFF] transition-colors flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8B7CFF] rounded"
                    >
                      <span>Explore Case Study</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="View Repository"
                          className="p-2 rounded-lg bg-[#181A24] border border-white/10 text-[#A2A5B3] hover:text-white hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8B7CFF]"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          onClick={(e) => {
                            if (project.liveUrl?.startsWith('#')) {
                              e.preventDefault();
                              e.stopPropagation();
                              const el = document.getElementById(project.liveUrl.replace('#', ''));
                              el?.scrollIntoView({ behavior: 'smooth' });
                            } else {
                              e.stopPropagation();
                            }
                          }}
                          target={project.liveUrl.startsWith('#') ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          title="Open Live Preview"
                          className="p-2 rounded-lg bg-[#8B7CFF]/15 border border-[#8B7CFF]/30 text-[#8B7CFF] hover:bg-[#8B7CFF] hover:text-white transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Modal Viewer */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
