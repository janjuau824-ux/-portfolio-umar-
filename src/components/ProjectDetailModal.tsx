import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, Compass } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Auto focus close button for accessibility
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0F111A] border border-white/10 shadow-2xl text-[#F5F5F7] flex flex-col"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-[#1A1D29]/90 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CFF] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Media */}
        <div className="relative aspect-video w-full overflow-hidden bg-black/60 rounded-t-3xl border-b border-white/[0.08]">
          <img
            src={project.previewImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F111A] via-transparent to-black/30 pointer-events-none" />
          
          {/* Category & Year overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8B7CFF]">
                {project.category} · {project.year}
              </span>
              <h2 id="modal-title" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                {project.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 md:p-10 space-y-8">
          {/* Tagline & Primary Description */}
          <div>
            <p className="text-lg sm:text-xl font-medium text-white/90 leading-snug mb-3">
              {project.tagline}
            </p>
            <p className="text-sm sm:text-base text-[#A2A5B3] leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Tech Stack Chips (Unboxed discipline) */}
          <div className="p-5 rounded-2xl bg-[#141724] border border-white/[0.06]">
            <div className="text-xs font-mono uppercase tracking-wider text-[#A2A5B3] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#8B7CFF]" />
              <span>Technology Architecture</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium bg-[#1D2133] text-[#E2E4EB] rounded-lg border border-white/[0.06]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Engineering Highlights */}
          <div>
            <h3 className="text-base font-bold text-white tracking-tight mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#8B7CFF]" />
              <span>Key Features & Engineering Highlights</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {project.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#131622] border border-white/[0.05] flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#8B7CFF] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#A2A5B3] leading-relaxed">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-white/[0.06]">
            <div className="p-5 rounded-2xl bg-[#131622] border border-white/[0.05]">
              <div className="text-xs font-mono uppercase tracking-widest text-[#EF4444] mb-2 font-semibold">
                Technical Challenge
              </div>
              <p className="text-xs text-[#A2A5B3] leading-relaxed">
                {project.challenges}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#131622] border border-white/[0.05]">
              <div className="text-xs font-mono uppercase tracking-widest text-[#10B981] mb-2 font-semibold">
                Engineering Solution
              </div>
              <p className="text-xs text-[#A2A5B3] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#A2A5B3]">
              <span>Role: </span>
              <strong className="text-white">{project.role}</strong>
            </div>

            <div className="flex items-center gap-3">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#1A1D29] hover:bg-[#252A3D] text-white text-xs font-medium border border-white/10 flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CFF]"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  onClick={(e) => {
                    if (project.liveUrl?.startsWith('#')) {
                      e.preventDefault();
                      onClose();
                      const el = document.getElementById(project.liveUrl.replace('#', ''));
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  target={project.liveUrl.startsWith('#') ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#8B7CFF] hover:bg-[#7866ff] text-white text-xs font-semibold flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg shadow-[#8B7CFF]/20"
                >
                  <span>Launch Experience</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
