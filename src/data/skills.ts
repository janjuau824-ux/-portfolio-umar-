/**
 * Verified skills for Rizwan Ahmad
 * Strictly without invented percentage bars or fake proficiency scores
 */

export interface SkillItem {
  id: string;
  name: string;
  category: "Core Web" | "Modern Frontend" | "AI & Integration" | "Design & UX";
  description: string;
  keyAspects: string[];
  iconName: string;
}

export const skills: SkillItem[] = [
  {
    id: "html5",
    name: "HTML5",
    category: "Core Web",
    description: "Semantic, accessible document structuring following modern W3C and WCAG 2.1 AA standards.",
    keyAspects: ["Semantic Landmarks", "ARIA Roles & Attributes", "SEO Meta Architectures", "Microdata Schemas"],
    iconName: "Code2"
  },
  {
    id: "css3",
    name: "CSS3",
    category: "Core Web",
    description: "Modern layout engines, fluid responsive typography, CSS Grid, Flexbox, and CSS Custom Properties.",
    keyAspects: ["CSS Grid & Flexbox", "Fluid Clamp Typography", "Custom Properties", "Hardware-Accelerated Transitions"],
    iconName: "Palette"
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Core Web",
    description: "Modern ECMAScript (ES2024+), asynchronous concurrency, closures, DOM manipulation, and data algorithms.",
    keyAspects: ["Async/Await & Promises", "ESNext Features", "DOM Event Delegation", "Web Workers & Streams"],
    iconName: "FileCode2"
  },
  {
    id: "react",
    name: "React",
    category: "Modern Frontend",
    description: "Component-driven architecture, custom hooks, performant state flow, and seamless user interaction cycles.",
    keyAspects: ["Custom React Hooks", "Virtual DOM Optimization", "Modular Component Patterns", "Modern TypeScript Typing"],
    iconName: "Layers"
  },
  {
    id: "responsive-design",
    name: "Responsive Web Design",
    category: "Design & UX",
    description: "Mobile-first layouts, fluid viewports, container queries, and cross-browser consistency across all devices.",
    keyAspects: ["Mobile-First Strategy", "Container Queries", "Touch Gesture Support", "Zero Horizontal Overflow"],
    iconName: "Smartphone"
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    category: "Design & UX",
    description: "High-craft user interfaces, systematic typography, optical spacing, intentional contrast, and ergonomic flow.",
    keyAspects: ["Design System Thinking", "Typography & Scale", "Optical Contrast Hierarchy", "Zero-Pill Aesthetic Discipline"],
    iconName: "LayoutGrid"
  },
  {
    id: "ai-applications",
    name: "AI-Powered Applications",
    category: "AI & Integration",
    description: "Practical generative AI integration, prompt engineering, audio synthesis, language tools, and dynamic AI workflows.",
    keyAspects: ["LLM API Orchestration", "Real-Time Streaming UI", "Prompt Engineering", "Multimodal Audio/Text Synthesis"],
    iconName: "Sparkles"
  },
  {
    id: "api-integration",
    name: "API Integration",
    category: "AI & Integration",
    description: "Robust REST & WebSocket client architecture, structured data schemas, rate-limiting handlers, and resilient error recovery.",
    keyAspects: ["RESTful Standards", "WebSocket Streams", "Resilient Retry Handlers", "Payload Validation & Caching"],
    iconName: "Share2"
  }
];
