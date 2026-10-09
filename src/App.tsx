/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  User, 
  Code2, 
  FolderGit2, 
  Briefcase, 
  Mail,
  ChevronRight
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { siteConfig } from './data/siteConfig';

type PageId = 'home' | 'about' | 'skills' | 'projects' | 'services' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [preselectedService, setPreselectedService] = useState<string>('website-development');

  // Synchronize with URL hash on load and back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = ['home', 'about', 'skills', 'projects', 'services', 'contact'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (pageId: string) => {
    const valid = pageId as PageId;
    setCurrentPage(valid);
    window.location.hash = `#${valid}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (serviceKey: string) => {
    setPreselectedService(serviceKey);
    navigateTo('contact');
  };

  // Page sequencing for next/prev pagination
  const pages: { id: PageId; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const currentIndex = pages.findIndex((p) => p.id === currentPage);
  const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  return (
    <div className="relative min-h-screen bg-[#08090D] text-[#F5F5F7] overflow-x-hidden selection:bg-[#8B7CFF]/30 selection:text-white flex flex-col justify-between">
      {/* Navigation */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* HOME PAGE */}
            {currentPage === 'home' && (
              <HeroSection onNavigate={navigateTo} />
            )}

            {/* DEDICATED ABOUT PAGE */}
            {currentPage === 'about' && (
              <div className="pt-24 pb-16">
                {/* Dedicated Page Header Banner */}
                <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A2A5B3] mb-4">
                    <button
                      type="button"
                      onClick={() => navigateTo('home')}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Home
                    </button>
                    <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                    <span className="text-[#8B7CFF]">About</span>
                  </div>
                </div>

                <AboutSection />

                {/* Page Pagination Controls */}
                <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-6 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => navigateTo('home')}
                    className="flex items-center gap-2 text-xs font-semibold text-[#A2A5B3] hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Home</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('skills')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#11131B] border border-white/10 hover:border-[#8B7CFF]/50 text-xs font-semibold text-white transition-all cursor-pointer"
                  >
                    <span>Next: Skills Matrix</span>
                    <ArrowRight className="w-4 h-4 text-[#8B7CFF]" />
                  </button>
                </div>
              </div>
            )}

            {/* DEDICATED SKILLS PAGE */}
            {currentPage === 'skills' && (
              <div className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A2A5B3] mb-4">
                    <button
                      type="button"
                      onClick={() => navigateTo('home')}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Home
                    </button>
                    <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                    <span className="text-[#8B7CFF]">Skills</span>
                  </div>
                </div>

                <SkillsSection />

                <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-6 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => navigateTo('about')}
                    className="flex items-center gap-2 text-xs font-semibold text-[#A2A5B3] hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous: About Me</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('projects')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#11131B] border border-white/10 hover:border-[#8B7CFF]/50 text-xs font-semibold text-white transition-all cursor-pointer"
                  >
                    <span>Next: Projects Gallery</span>
                    <ArrowRight className="w-4 h-4 text-[#8B7CFF]" />
                  </button>
                </div>
              </div>
            )}

            {/* DEDICATED PROJECTS PAGE */}
            {currentPage === 'projects' && (
              <div className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A2A5B3] mb-4">
                    <button
                      type="button"
                      onClick={() => navigateTo('home')}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Home
                    </button>
                    <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                    <span className="text-[#8B7CFF]">Projects</span>
                  </div>
                </div>

                <ProjectsSection />

                <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-6 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => navigateTo('skills')}
                    className="flex items-center gap-2 text-xs font-semibold text-[#A2A5B3] hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous: Skills Matrix</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('services')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#11131B] border border-white/10 hover:border-[#8B7CFF]/50 text-xs font-semibold text-white transition-all cursor-pointer"
                  >
                    <span>Next: Services & Solutions</span>
                    <ArrowRight className="w-4 h-4 text-[#8B7CFF]" />
                  </button>
                </div>
              </div>
            )}

            {/* DEDICATED SERVICES PAGE */}
            {currentPage === 'services' && (
              <div className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A2A5B3] mb-4">
                    <button
                      type="button"
                      onClick={() => navigateTo('home')}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Home
                    </button>
                    <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                    <span className="text-[#8B7CFF]">Services</span>
                  </div>
                </div>

                <ServicesSection onSelectService={handleSelectService} />

                <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-6 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => navigateTo('projects')}
                    className="flex items-center gap-2 text-xs font-semibold text-[#A2A5B3] hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous: Projects</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('contact')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B7CFF] hover:bg-[#7866ff] text-xs font-semibold text-white transition-all cursor-pointer shadow-lg shadow-[#8B7CFF]/20"
                  >
                    <span>Next: Initiate Contact</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* DEDICATED CONTACT PAGE */}
            {currentPage === 'contact' && (
              <div className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A2A5B3] mb-4">
                    <button
                      type="button"
                      onClick={() => navigateTo('home')}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Home
                    </button>
                    <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                    <span className="text-[#8B7CFF]">Contact</span>
                  </div>
                </div>

                <ContactSection preselectedService={preselectedService} />

                <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-6 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => navigateTo('services')}
                    className="flex items-center gap-2 text-xs font-semibold text-[#A2A5B3] hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous: Services</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('home')}
                    className="flex items-center gap-2 text-xs font-semibold text-[#8B7CFF] hover:underline cursor-pointer"
                  >
                    <Home className="w-4 h-4" />
                    <span>Back to Home</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Page Switcher bar on bottom for quick navigation */}
      <div className="sticky bottom-4 z-40 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto p-1.5 rounded-2xl bg-[#11131B]/90 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-1">
          {pages.map((p) => {
            const Icon = p.icon;
            const isCurrent = currentPage === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => navigateTo(p.id)}
                title={`Go to ${p.label} Page`}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7CFF] ${
                  isCurrent
                    ? 'bg-[#8B7CFF] text-white shadow-md'
                    : 'text-[#A2A5B3] hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
