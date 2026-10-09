import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface NavbarProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (pageId: string) => {
    setMobileMenuOpen(false);
    onNavigate(pageId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[#08090D]/90 backdrop-blur-md border-b border-white/[0.08] shadow-2xl shadow-black/50'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between gap-8">
          {/* ZONE 1: Brand / Monogram */}
          <button
            type="button"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CFF] rounded-xl p-1 text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#11131B] border border-white/10 flex items-center justify-center font-bold text-sm tracking-wider text-white group-hover:border-[#8B7CFF]/50 transition-all shadow-inner">
              <span className="text-[#8B7CFF] group-hover:text-white transition-colors">U</span>
              <span className="text-white/90">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white group-hover:text-[#8B7CFF] transition-colors">
                {siteConfig.name}
              </span>
              <span className="text-[11px] text-[#A2A5B3] hidden sm:inline">
                {siteConfig.title}
              </span>
            </div>
          </button>

          {/* ZONE 2: Clean single-line desktop links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-2 p-1 bg-[#11131B]/70 border border-white/[0.08] rounded-2xl backdrop-blur-md"
          >
            {siteConfig.navItems.map((item) => {
              const isActive = currentPage === item.pageId;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleLinkClick(item.pageId)}
                  className={`relative px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CFF] ${
                    isActive
                      ? 'bg-[#8B7CFF] text-white shadow-lg shadow-[#8B7CFF]/20'
                      : 'text-[#A2A5B3] hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: 1 Primary Action */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wide text-white bg-[#11131B] border border-white/15 rounded-xl hover:border-[#8B7CFF]/60 hover:bg-[#8B7CFF]/15 transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CFF] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8B7CFF]" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#11131B] border border-white/10 text-[#F5F5F7] hover:text-white hover:border-[#8B7CFF]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CFF] cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 top-[65px] bg-[#08090D]/95 backdrop-blur-2xl z-40 md:hidden flex flex-col px-6 py-8 border-t border-white/[0.08]"
        >
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#8B7CFF] mb-4">
            Select Page
          </div>
          <nav className="flex flex-col gap-2 text-base font-medium">
            {siteConfig.navItems.map((item) => {
              const isActive = currentPage === item.pageId;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleLinkClick(item.pageId)}
                  className={`py-3 px-4 rounded-xl text-left text-base font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#8B7CFF]/15 text-[#8B7CFF] font-semibold border border-[#8B7CFF]/30'
                      : 'text-[#A2A5B3] hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{item.label} Page</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#8B7CFF]" />}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 flex flex-col gap-4">
            <div className="text-xs text-[#A2A5B3]">
              <span>Direct Inquiries: </span>
              <a href={`mailto:${siteConfig.email}`} className="text-white underline">
                {siteConfig.email}
              </a>
            </div>

            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              className="w-full text-center py-3.5 px-4 text-sm font-semibold rounded-xl bg-[#8B7CFF] text-white hover:bg-[#7866ff] transition-colors cursor-pointer"
            >
              Let's Work Together
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
