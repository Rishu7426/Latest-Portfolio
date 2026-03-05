/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Globe, 
  Layers, 
  Terminal, 
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  Database,
  Cloud,
  Smartphone,
  Server,
  MapPin,
  Phone,
  Send
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Intersection Observer Hook & Component ---

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (elementRef.current) observer.unobserve(elementRef.current);
      }
    }, { threshold: 0.1, ...options });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [options]);

  return [elementRef, isIntersecting] as const;
};

const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number, key?: React.Key }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-mono font-bold tracking-tighter flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center text-black">
            AR
          </div>
          <span className="hidden sm:inline">ALEX.RIVERS</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: i * 0.1,
                ease: "easeOut"
              }}
              className="text-sm font-medium text-zinc-400 hover:text-accent transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navLinks.length * 0.1 }}
            className="px-4 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-accent transition-colors"
          >
            Resume
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-zinc-400"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const noiseY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section id="about" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y: bgY1 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" 
        />
        <motion.div 
          style={{ y: bgY2 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" 
        />
        <motion.div 
          style={{ y: noiseY }}
          className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" 
        />
      </div>

      <motion.div 
        style={{ y }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono mb-6">
            AVAILABLE FOR ARCHITECTURE & LEADERSHIP
          </span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-[0.9]">
            Building <span className="text-gradient">Digital</span> <br />
            Infrastructure.
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Senior Staff Engineer with 12+ years of experience in distributed systems, 
            cloud architecture, and high-performance frontend engineering.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#projects"
              className="px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-accent transition-all group"
            >
              View Projects <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <div className="flex items-center gap-4 px-4">
              <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Github className="w-6 h-6" /></a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Linkedin className="w-6 h-6" /></a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Mail className="w-6 h-6" /></a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      company: "TechFlow Systems",
      role: "Senior Staff Engineer",
      period: "2021 — Present",
      description: "Leading the core infrastructure team. Architected a micro-frontend ecosystem serving 5M+ monthly users. Reduced cloud costs by 40% through serverless optimization.",
      tags: ["Distributed Systems", "React", "Node.js", "AWS"]
    },
    {
      company: "Nexus AI",
      role: "Principal Frontend Architect",
      period: "2018 — 2021",
      description: "Designed and implemented a high-performance real-time data visualization platform for AI model monitoring. Spearheaded the migration to a modern CI/CD pipeline.",
      tags: ["TypeScript", "WebAssembly", "D3.js", "Kubernetes"]
    },
    {
      company: "CloudScale",
      role: "Lead Software Engineer",
      period: "2015 — 2018",
      description: "Built scalable API services and managed a team of 12 engineers. Developed a proprietary caching layer that improved response times by 60%.",
      tags: ["Go", "Redis", "Docker", "GraphQL"]
    }
  ];

  return (
    <section id="experience" className="py-32 px-6">
      <Reveal className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-accent font-mono text-sm mb-2 block">// CAREER PATH</span>
            <h2 className="text-4xl md:text-5xl font-bold">Experience</h2>
          </div>
          <p className="text-zinc-500 max-w-md">
            A decade of building scalable solutions for industry leaders and high-growth startups.
          </p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <Reveal 
              key={i}
              delay={i * 100}
              className="group relative grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 p-8 rounded-2xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5"
            >
              <div className="text-zinc-500 font-mono text-sm pt-1">
                {exp.period}
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">{exp.role}</h3>
                  <span className="text-zinc-400 font-medium">{exp.company}</span>
                </div>
                <p className="text-zinc-400 mb-6 leading-relaxed max-w-3xl">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

const Skills = () => {
  const skillGroups = [
    {
      title: "Frontend",
      icon: <Globe className="w-5 h-5" />,
      description: "Crafting immersive, high-performance user interfaces with modern frameworks.",
      skills: [
        { name: "React / Next.js", desc: "Building scalable web applications with SSR and optimized rendering." },
        { name: "TypeScript", desc: "Ensuring type safety and maintainable codebases for large-scale projects." },
        { name: "Tailwind CSS", desc: "Rapidly designing modern, responsive layouts with utility-first CSS." },
        { name: "Three.js", desc: "Creating 3D experiences and interactive visualizations in the browser." },
        { name: "Web Performance", desc: "Optimizing Core Web Vitals and reducing Time to Interactive." }
      ]
    },
    {
      title: "Backend",
      icon: <Server className="w-5 h-5" />,
      description: "Building robust, scalable server-side systems and efficient data architectures.",
      skills: [
        { name: "Node.js", desc: "Developing high-concurrency event-driven services and APIs." },
        { name: "Go", desc: "Writing high-performance, compiled backend systems and microservices." },
        { name: "PostgreSQL", desc: "Designing complex relational schemas and optimizing query performance." },
        { name: "Redis", desc: "Implementing low-latency caching and real-time data structures." },
        { name: "GraphQL", desc: "Creating flexible, type-safe APIs with efficient data fetching." }
      ]
    },
    {
      title: "Infrastructure",
      icon: <Cloud className="w-5 h-5" />,
      description: "Automating cloud deployments and managing resilient distributed systems.",
      skills: [
        { name: "AWS / GCP", desc: "Managing multi-cloud environments and serverless architectures." },
        { name: "Docker", desc: "Containerizing applications for consistent deployment across environments." },
        { name: "Kubernetes", desc: "Orchestrating containerized workloads for high availability." },
        { name: "Terraform", desc: "Defining and managing infrastructure as code for reproducible setups." },
        { name: "CI/CD", desc: "Automating build, test, and deployment pipelines for rapid delivery." }
      ]
    },
    {
      title: "Architecture",
      icon: <Layers className="w-5 h-5" />,
      description: "Designing high-level system blueprints for scalability and maintainability.",
      skills: [
        { name: "System Design", desc: "Architecting complex software systems for scale and reliability." },
        { name: "Microservices", desc: "Decoupling monolithic systems into manageable, independent services." },
        { name: "Security", desc: "Implementing robust authentication, authorization, and data protection." },
        { name: "Scalability", desc: "Ensuring systems can handle growth in users and data volume." },
        { name: "Mentorship", desc: "Guiding engineering teams and fostering a culture of technical excellence." }
      ]
    }
  ];

  return (
    <section id="skills" className="py-32 px-6 bg-white/[0.01]">
      <Reveal className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-accent font-mono text-sm mb-2 block">// TECH STACK</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Expertise</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Deep technical knowledge across the entire stack, from pixel-perfect interfaces to distributed cloud infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, i) => (
            <Reveal
              key={i}
              delay={i * 100}
              className="glass p-8 rounded-3xl hover:border-accent/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,255,157,0.05)] transition-all duration-500 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                {group.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{group.title}</h3>
              <p className="text-zinc-500 text-xs mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 leading-relaxed">
                {group.description}
              </p>
              <ul className="space-y-3">
                {group.skills.map(skill => (
                  <li key={skill.name} className="group/skill flex flex-col gap-1 text-zinc-400 text-sm hover:text-white hover:translate-x-1 transition-all duration-300 cursor-default">
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-accent" />
                      {skill.name}
                    </div>
                    <span className="max-h-0 overflow-hidden opacity-0 group-hover/skill:max-h-20 group-hover/skill:opacity-100 transition-all duration-500 text-[10px] text-zinc-500 pl-5 leading-tight">
                      {skill.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Nebula Cloud Engine",
      category: "Infrastructure",
      image: "https://picsum.photos/seed/nebula/800/600",
      description: "A high-performance cloud orchestration platform built with Go and Kubernetes.",
      link: "#"
    },
    {
      title: "Prism Design System",
      category: "Frontend",
      image: "https://picsum.photos/seed/prism/800/600",
      description: "Enterprise-grade UI library used by 200+ developers across 50 applications.",
      link: "#"
    },
    {
      title: "Vortex Analytics",
      category: "Data Viz",
      image: "https://picsum.photos/seed/vortex/800/600",
      description: "Real-time stream processing and visualization dashboard for IoT networks.",
      link: "#"
    }
  ];

  return (
    <section id="projects" className="py-32 px-6">
      <Reveal className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-accent font-mono text-sm mb-2 block">// SELECTED WORKS</span>
            <h2 className="text-4xl md:text-5xl font-bold">Projects</h2>
          </div>
          <button className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 font-medium">
            View all projects <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Reveal
              key={i}
              delay={i * 100}
              className="group cursor-pointer hover:scale-[1.02] transition-transform duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl mb-6">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none skew-x-12" />
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <span className="text-accent font-mono text-xs uppercase tracking-widest mb-2 block">
                {project.category}
              </span>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {project.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-16">
          <span className="text-accent font-mono text-sm mb-2 block">// GET IN TOUCH</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Contact</h2>
          <p className="text-zinc-500 max-w-2xl">
            Have a project in mind or just want to chat? Feel free to reach out. 
            I'm always open to discussing new opportunities and creative ideas.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <Reveal delay={200}>
            <div className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Email</p>
                      <a href="mailto:hello@alexrivers.dev" className="text-zinc-200 hover:text-accent transition-colors">hello@alexrivers.dev</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Phone</p>
                      <p className="text-zinc-200">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Location</p>
                      <p className="text-zinc-200">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Social Profiles</h3>
                <div className="flex gap-4">
                  {[
                    { icon: <Github />, label: 'GitHub', href: '#' },
                    { icon: <Linkedin />, label: 'LinkedIn', href: '#' },
                    { icon: <Mail />, label: 'Twitter', href: '#' }
                  ].map((social, i) => (
                    <a 
                      key={i}
                      href={social.href}
                      className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-400 hover:text-accent hover:bg-white/10 transition-all"
                      aria-label={social.label}
                    >
                      {React.cloneElement(social.icon as React.ReactElement, { className: "w-5 h-5" })}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal delay={400}>
            <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-3xl glass">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Message</label>
                <textarea 
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-accent transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : submitted ? (
                  "Message Sent!"
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>

      <footer className="max-w-7xl mx-auto mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-xs font-mono uppercase tracking-widest">
        <p>© 2024 ALEX RIVERS. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Status: Online</a>
        </div>
      </footer>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-accent selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      {/* Global Cursor Effect (Optional but cool) */}
      <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-difference">
        <div className="hidden lg:block absolute w-4 h-4 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out" id="cursor" />
      </div>
    </div>
  );
}
