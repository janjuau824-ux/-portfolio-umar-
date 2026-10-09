import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, ArrowUpRight, Github, Linkedin, MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'website-development',
    budgetRange: 'flexible',
    details: '',
    honeypot: '', // spam prevention field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');
  const [submissionId, setSubmissionId] = useState<string>('');

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, projectType: preselectedService }));
    }
  }, [preselectedService]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name or organization.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.details.trim()) {
      errs.details = 'Please describe your project or inquiry.';
    } else if (formData.details.trim().length < 15) {
      errs.details = 'Please provide a bit more detail (at least 15 characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Check honeypot for bot spam
    if (formData.honeypot) {
      setStatus('error');
      setServerMessage('Submission rejected.');
      return;
    }

    setStatus('loading');
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          projectType: formData.projectType,
          budgetRange: formData.budgetRange,
          details: formData.details.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setSubmissionId(data.inquiryId || `INQ-${Date.now().toString(36).toUpperCase()}`);
        setServerMessage(data.message || 'Thank you! Your message has been received.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          projectType: 'website-development',
          budgetRange: 'flexible',
          details: '',
          honeypot: '',
        });
      } else {
        setStatus('error');
        setServerMessage(data.error || 'Unable to submit your message. Please try again or email directly.');
      }
    } catch (err) {
      // Fallback if API server endpoint is unavailable
      setStatus('error');
      setServerMessage(`Network connection issue. You can also email ${siteConfig.name} directly at ${siteConfig.email}`);
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-[#08090D] border-t border-white/[0.04]">
      {/* Ambient background lighting */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#8B7CFF]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#8B7CFF] mb-3">
                05 / Initiate Dialogue
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                HAVE AN IDEA?
                <br />
                <span className="text-[#8B7CFF]">LET'S BUILD IT.</span>
              </h2>
              <p className="text-base sm:text-lg text-[#A2A5B3] leading-relaxed">
                Available for selected contract engagements, custom website development, AI workflows, and frontend consulting worldwide.
              </p>
            </div>

            {/* Direct Contact Card */}
            <div className="p-6 rounded-2xl bg-[#11131B] border border-white/[0.08] space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-[#A2A5B3]">
                Direct Contact
              </div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-white font-medium text-base hover:text-[#8B7CFF] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#181A24] border border-white/10 flex items-center justify-center text-[#8B7CFF] group-hover:bg-[#8B7CFF] group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#A2A5B3]">Email Address</div>
                  <div className="font-mono text-sm tracking-tight">{siteConfig.email}</div>
                </div>
              </a>
            </div>

            {/* Professional Profiles */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#A2A5B3]">
                Professional Profiles
              </div>
              <div className="flex flex-col gap-2.5">
                {siteConfig.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-[#11131B]/60 border border-white/[0.06] hover:border-[#8B7CFF]/40 text-[#A2A5B3] hover:text-white flex items-center justify-between text-xs font-medium transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      {social.name === 'GitHub' && <Github className="w-4 h-4 text-white" />}
                      {social.name === 'LinkedIn' && <Linkedin className="w-4 h-4 text-[#8B7CFF]" />}
                      {social.name === 'Email' && <Mail className="w-4 h-4 text-[#60A5FA]" />}
                      <span>{social.name}</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#A2A5B3]/70 group-hover:text-white flex items-center gap-1">
                      {social.label}
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[#8B7CFF]" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#11131B]/85 border border-white/[0.08] shadow-2xl relative">
              {/* Status Banner */}
              {status === 'success' && (
                <div
                  role="status"
                  className="mb-8 p-6 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 text-white flex items-start gap-4"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-base text-[#10B981] mb-1">
                      Inquiry Dispatched Successfully
                    </h3>
                    <p className="text-xs text-[#A2A5B3] leading-relaxed mb-2">
                      {serverMessage}
                    </p>
                    <div className="text-[11px] font-mono text-[#10B981]/80">
                      Reference ID: {submissionId}
                    </div>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div
                  role="alert"
                  className="mb-8 p-5 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-white flex items-start gap-4"
                >
                  <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm text-[#EF4444] mb-1">
                      Submission Notice
                    </h3>
                    <p className="text-xs text-[#A2A5B3] leading-relaxed">
                      {serverMessage}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Honeypot field for bot suppression */}
                <input
                  type="text"
                  name="company_title_check"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-[#F5F5F7] mb-2">
                      Your Name or Organization <span className="text-[#8B7CFF]">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Sterling"
                      className={`w-full px-4 py-3 rounded-xl bg-[#161824] border text-sm text-white placeholder-[#A2A5B3]/40 focus:outline-none focus:ring-2 focus:ring-[#8B7CFF] transition-all ${
                        errors.name ? 'border-[#EF4444]' : 'border-white/10 hover:border-white/20'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-[#EF4444] mt-1.5">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-[#F5F5F7] mb-2">
                      Email Address <span className="text-[#8B7CFF]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@domain.com"
                      className={`w-full px-4 py-3 rounded-xl bg-[#161824] border text-sm text-white placeholder-[#A2A5B3]/40 focus:outline-none focus:ring-2 focus:ring-[#8B7CFF] transition-all ${
                        errors.email ? 'border-[#EF4444]' : 'border-white/10 hover:border-white/20'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-[#EF4444] mt-1.5">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Project Type & Budget Range Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="projectType" className="block text-xs font-semibold text-[#F5F5F7] mb-2">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#161824] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#8B7CFF] transition-all cursor-pointer"
                    >
                      <option value="website-development">Website Development</option>
                      <option value="frontend-ui-ux">UI/UX & Frontend Development</option>
                      <option value="ai-applications">AI-Powered Web Application</option>
                      <option value="consulting">Technical Consulting / Review</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budgetRange" className="block text-xs font-semibold text-[#F5F5F7] mb-2">
                      Budget Scope (Optional)
                    </label>
                    <select
                      id="budgetRange"
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#161824] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#8B7CFF] transition-all cursor-pointer"
                    >
                      <option value="flexible">Flexible / Exploring Options</option>
                      <option value="under-3k">Tier 1 (&lt; $3,000)</option>
                      <option value="3k-8k">Tier 2 ($3,000 – $8,000)</option>
                      <option value="above-8k">Tier 3 ($8,000+)</option>
                    </select>
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label htmlFor="details" className="block text-xs font-semibold text-[#F5F5F7] mb-2">
                    Project Details & Scope <span className="text-[#8B7CFF]">*</span>
                  </label>
                  <textarea
                    id="details"
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Briefly describe your objectives, timelines, tech preferences, or deliverables..."
                    className={`w-full px-4 py-3 rounded-xl bg-[#161824] border text-sm text-white placeholder-[#A2A5B3]/40 focus:outline-none focus:ring-2 focus:ring-[#8B7CFF] transition-all resize-none ${
                      errors.details ? 'border-[#EF4444]' : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {errors.details && (
                    <p className="text-[11px] text-[#EF4444] mt-1.5">{errors.details}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 px-6 rounded-xl bg-[#8B7CFF] hover:bg-[#7866ff] active:scale-[0.99] text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-[#8B7CFF]/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Validating & Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" />
                      <span>Send Project Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
