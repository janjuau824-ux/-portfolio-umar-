/**
 * Centralized project data structure for Umer's portfolio
 */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  techStack: string[];
  previewImage: string;
  liveUrl?: string;
  repoUrl?: string;
  category: "AI & Audio" | "AI & Language" | "Creative Tools" | "Spatial & Web";
  year: string;
  featured: boolean;
  highlights: string[];
  role: string;
  challenges: string;
  solution: string;
}

export const projects: Project[] = [
  {
    id: "voicecraft-ai",
    title: "VoiceCraft AI",
    tagline: "AI Voice and Speech Synthesis Studio",
    description:
      "A modern browser-based audio workstation combining multi-voice neural generation, spectral waveform visualization, and real-time audio dynamics.",
    longDescription:
      "VoiceCraft AI delivers an intuitive studio environment where creators can synthesize expressive voice tracks, adjust acoustic tone and pitch parameters, and inspect sound frequencies via real-time Web Audio API spectral canvases.",
    techStack: ["React", "TypeScript", "Web Audio API", "Tailwind CSS", "Neural TTS API"],
    previewImage: "/src/assets/images/voicecraft_ai_preview_1791543108011.jpg",
    liveUrl: "https://voicecraft-ai.preview.local",
    repoUrl: "https://github.com/umer-dev/voicecraft-ai",
    category: "AI & Audio",
    year: "2025",
    featured: true,
    highlights: [
      "Custom 60fps Web Audio API spectral analyzer and frequency visualizer",
      "Dynamic prosody, speed, pitch, and emotion parameter tweaking",
      "Modular stem track layering and multi-sample audio export pipeline",
      "Low-latency response architecture with client-side buffer caching"
    ],
    role: "Full-Stack Frontend Architecture & Audio DSP UI Design",
    challenges: "Synchronizing real-time audio spectrum rendering with dynamic voice parameter changes without causing browser UI thread stuttering.",
    solution: "Offloaded audio chunk decoding to Web Workers and rendered spectral curves with hardware-accelerated Canvas 2D frame interpolation."
  },
  {
    id: "transly-ai",
    title: "Transly AI",
    tagline: "Real-Time Neural Translation & Dialect Hub",
    description:
      "Intelligent multi-language translation platform featuring instantaneous audio-to-text streams, contextual nuance detection, and semantic comparison.",
    longDescription:
      "Engineered for cross-border collaboration and international teams, Transly AI streams multi-lingual dialogues simultaneously with latency indicators, dialect variations, and conversational sentiment context.",
    techStack: ["React", "TypeScript", "Speech Recognition", "REST API", "Tailwind CSS"],
    previewImage: "/src/assets/images/transly_ai_preview_1791543119611.jpg",
    liveUrl: "https://transly-ai.preview.local",
    repoUrl: "https://github.com/umer-dev/transly-ai",
    category: "AI & Language",
    year: "2025",
    featured: true,
    highlights: [
      "Continuous streaming translation with split-pane comparison view",
      "Contextual tone detection (Formal, Technical, Colloquial, Diplomatic)",
      "Instant copy, clipboard history, and audio playback synthesis",
      "Dark mode ergonomic typography with WCAG AA compliance"
    ],
    role: "Lead Frontend Engineer & Interface Architect",
    challenges: "Handling streaming text updates from parallel translation endpoints while maintaining cursor stability and readable typography.",
    solution: "Implemented differential virtual DOM chunk rendering with debounce queues, preventing layout thrashing during fast speech inputs."
  },
  {
    id: "color-forge-ai",
    title: "Color Forge AI",
    tagline: "Algorithmic Color Harmony & Spatial Design Tokens",
    description:
      "Generative color palette system producing accessible WCAG-tested color harmonies, dark-mode variations, and ready-to-use CSS/Tailwind tokens.",
    longDescription:
      "Color Forge AI bridges graphic intuition and algorithmic precision. It evaluates contrast ratios against WCAG 2.1 standards in real time, generates semantic design token scales, and simulates color blindness filters.",
    techStack: ["React", "JavaScript", "Color Space Math (OKLCH/HSL)", "Tailwind CSS"],
    previewImage: "/src/assets/images/colorforge_ai_preview_1791543134280.jpg",
    liveUrl: "https://colorforge-ai.preview.local",
    repoUrl: "https://github.com/umer-dev/colorforge-ai",
    category: "Creative Tools",
    year: "2024",
    featured: true,
    highlights: [
      "Perceptually uniform OKLCH color matrix generation and blending",
      "Automated WCAG AAA/AA compliance validation with matrix heatmaps",
      "One-click export to Tailwind config, CSS Custom Properties, and Figma tokens",
      "Interactive component preview testing buttons, badges, and card surfaces"
    ],
    role: "Creator & Design Systems Engineer",
    challenges: "Traditional RGB/HEX interpolation produces muddy practical transitions between vibrant primary hues.",
    solution: "Adopted OKLCH and CAM16 color models for perceptual lightness conservation and seamless gradient interpolation."
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    tagline: "Cinematic 3D Interactive Developer Showcase",
    description:
      "Award-winning aesthetic portfolio combining real-time Three.js geometric sculptures, dynamic studio lighting, and responsive editorial typography.",
    longDescription:
      "The portfolio you are experiencing right now. Built with Three.js, React, and Motion, featuring physical shaders, studio key/rim lighting, pointer parallax, and zero-compromise responsive performance.",
    techStack: ["React", "Three.js", "TypeScript", "Tailwind CSS", "Motion"],
    previewImage: "/src/assets/images/portfolio_preview_1791543144733.jpg",
    liveUrl: "#home",
    repoUrl: "https://github.com/umer-dev/cinematic-3d-portfolio",
    category: "Spatial & Web",
    year: "2026",
    featured: true,
    highlights: [
      "Procedural 3D metallic-glass sculpture with delta-time physics and mouse parallax",
      "Studio three-point lighting system with rim highlights and depth particle dust",
      "Zero layout shift, 60fps compositor transitions, and reduced-motion fallback",
      "Integrated contact pipeline with server-side validation and verification states"
    ],
    role: "Full-Stack Design & Creative Development",
    challenges: "Rendering real-time 3D physics and lighting without draining mobile batteries or compromising accessibility.",
    solution: "Implemented adaptive resolution scaling, delta-time animation loops, and automatic fallback when WebGL or reduced-motion is detected."
  }
];
