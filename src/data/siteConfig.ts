/**
 * Site configuration and portfolio identity
 * Verified information for Umer (Umer Ahmad)
 */

export interface SiteConfig {
  name: string;
  shortName: string;
  title: string;
  headline: string;
  supportingText: string;
  email: string;
  availableForProjects: boolean;
  availabilityNote: string;
  socials: {
    name: string;
    label: string;
    href: string;
    icon: string;
  }[];
  navItems: {
    label: string;
    pageId: string;
    href: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Umer",
  shortName: "UA",
  title: "Web Developer & AI Solutions Creator",
  headline: "BUILDING DIGITAL\nEXPERIENCES THAT MATTER.",
  supportingText:
    "I'm Umer — a web developer creating modern websites, intelligent AI-powered applications, and meaningful digital experiences.",
  email: "janjuau824@gmail.com",
  availableForProjects: true,
  availabilityNote: "Available for Projects",
  socials: [
    {
      name: "GitHub",
      label: "github.com/umer-dev",
      href: "https://github.com",
      icon: "Github",
    },
    {
      name: "LinkedIn",
      label: "linkedin.com/in/umer-dev",
      href: "https://linkedin.com",
      icon: "Linkedin",
    },
    {
      name: "Email",
      label: "janjuau824@gmail.com",
      href: "mailto:janjuau824@gmail.com",
      icon: "Mail",
    },
  ],
  navItems: [
    { label: "Home", pageId: "home", href: "#home" },
    { label: "About", pageId: "about", href: "#about" },
    { label: "Skills", pageId: "skills", href: "#skills" },
    { label: "Projects", pageId: "projects", href: "#projects" },
    { label: "Services", pageId: "services", href: "#services" },
    { label: "Contact", pageId: "contact", href: "#contact" },
  ],
};
