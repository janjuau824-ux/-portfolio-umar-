/**
 * Professional services offered by Rizwan Ahmad
 */

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  deliverables: string[];
  technologies: string[];
  ctaLabel: string;
  serviceKey: "website-development" | "frontend-ui-ux" | "ai-applications";
}

export const services: ServiceItem[] = [
  {
    id: "website-dev",
    number: "01",
    title: "Website Development",
    shortDescription: "Responsive, modern websites with clean structure and reliable functionality.",
    detailedDescription:
      "Crafting high-speed, SEO-optimized web experiences engineered from clean code. Every layout is built to scale smoothly across desktop, tablet, and mobile screens with pristine accessibility and rock-solid cross-browser performance.",
    deliverables: [
      "Custom responsive architecture with modern semantic HTML5 and CSS3",
      "Fast page load times, Core Web Vitals optimization, and clean asset pipelines",
      "Cross-browser testing across Safari, Chrome, Firefox, and mobile engines",
      "Search engine optimization (SEO) best practices and structured metadata"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "HTML5/CSS3"],
    ctaLabel: "Inquire About Web Development",
    serviceKey: "website-development"
  },
  {
    id: "ui-ux-frontend",
    number: "02",
    title: "UI/UX & Frontend Development",
    shortDescription: "User-focused interfaces with thoughtful layouts, reusable components, and refined interactions.",
    detailedDescription:
      "Translating complex product requirements into intuitive, elegant user interfaces. I bridge design principles with production-grade engineering, focusing on ergonomic design systems, high-legibility typography, and delightful micro-interactions.",
    deliverables: [
      "Modular design token systems with dark and light palette harmony",
      "Accessible WCAG 2.1 AA compliant navigation and interactive states",
      "Performant compositor-based animations with zero UI thread jank",
      "Reusable, thoroughly documented React component libraries"
    ],
    technologies: ["React", "Motion", "Tailwind CSS", "Design Systems", "Figma-to-Code"],
    ctaLabel: "Inquire About UI/UX & Frontend",
    serviceKey: "frontend-ui-ux"
  },
  {
    id: "ai-powered-apps",
    number: "03",
    title: "AI-Powered Web Applications",
    shortDescription: "Web experiences that integrate appropriate AI APIs and practical automation features.",
    detailedDescription:
      "Bringing practical artificial intelligence capabilities into modern web applications. From streaming chat and document assistants to multimodal audio synthesizers and algorithmic color exploration tools.",
    deliverables: [
      "Streaming API response pipelines with graceful cancellation and retry mechanisms",
      "Interactive audio, language, or vision UI workflows tailored for end users",
      "Prompt engineering and contextual schema validation",
      "Safe API proxy architecture protecting credentials and rate limits"
    ],
    technologies: ["Generative AI APIs", "Web Audio API", "Node.js / Express", "Streaming UI", "TypeScript"],
    ctaLabel: "Inquire About AI Solutions",
    serviceKey: "ai-applications"
  }
];
