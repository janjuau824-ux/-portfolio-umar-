import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface FooterProps {
  onNavigate: (pageId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative bg-[#050608] border-t border-white/[0.06] text-[#A2A5B3] pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06] items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#11131B] border border-white/10 flex items-center justify-center font-bold text-sm tracking-wider text-white shadow-inner">
                <span className="text-[#8B7CFF]">U</span>
                <span>A</span>
              </div>
              <div>
                <div className="text-base font-bold text-white tracking-tight">
                  {siteConfig.name}
                </div>
                <div className="text-xs text-[#A2A5B3]">
                  {siteConfig.title}
                </div>
              </div>
            </div>
            <p className="text-xs text-[#A2A5B3] max-w-sm leading-relaxed">
              Crafting modern responsive websites, practical AI workflows, and cinematic web experiences with disciplined design and engineering.
            </p>
          </div>

          {/* Quick Page Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white">
              Pages
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {siteConfig.navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    onNavigate(item.pageId);
                    scrollToTop();
                  }}
                  className="hover:text-white text-left transition-colors py-1 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connect & Back-to-Top */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between space-y-4">
            <div className="space-y-2 text-left md:text-right">
              <div className="text-xs font-mono uppercase tracking-wider text-white">
                Connect
              </div>
              <div className="flex items-center md:justify-end gap-3 text-white/80">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#11131B] border border-white/10 hover:border-[#8B7CFF]/50 hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#11131B] border border-white/10 hover:border-[#8B7CFF]/50 hover:text-white transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="p-2.5 rounded-lg bg-[#11131B] border border-white/10 hover:border-[#8B7CFF]/50 hover:text-white transition-colors"
                  aria-label="Send direct email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#11131B] border border-white/10 text-xs font-medium text-white hover:border-[#8B7CFF]/40 hover:text-[#8B7CFF] transition-all cursor-pointer self-start md:self-end"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A2A5B3]/70">
          <div>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span>Designed & Engineered with React, Three.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
