import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowUpRight,
  Menu,
  X,
  Terminal,
  Code2,
  Layers,
  Cpu,
  Send,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Flame,
  Coffee,
  Building2,
  UtensilsCrossed,
  Sun,
  Moon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROJECTS, SKILL_CATEGORIES, WORK_PROCESS, type Project } from './data/portfolio';
import { ProjectCard } from './components/ProjectCard';

export function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [budgetSelected, setBudgetSelected] = useState('$3,000 - $6,000');

  // Theme state: default to system or stored preference
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Contact form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Brand Web Experience',
    message: ''
  });

  const email = 'aqibmunir7@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setFormSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366F1', '#06B6D4', '#10B981', '#F59E0B']
    });
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'about', 'services', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#09090b] dark:text-[#fafafa] relative overflow-hidden bg-grid-pattern selection:bg-indigo-500/20 selection:text-indigo-900 dark:selection:bg-indigo-500/30 dark:selection:text-indigo-200 transition-colors duration-300">

      {/* Background Ambient Glow Orbs */}
      <div className="fixed top-0 left-1/4 -translate-x-1/2 -z-10 w-[500px] h-[500px] bg-indigo-400/20 dark:bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-10 -z-10 w-[450px] h-[450px] bg-cyan-400/15 dark:bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed top-1/2 left-2/3 -z-10 w-[350px] h-[350px] bg-emerald-400/15 dark:bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 sm:py-6">
        <nav className="flex items-center justify-between w-full max-w-5xl px-5 py-3 rounded-full glass-card border border-slate-200/80 dark:border-white/10 backdrop-blur-xl bg-white/80 dark:bg-[#0e0e13]/80 shadow-lg dark:shadow-2xl">
          <a href="#home" className="flex items-center gap-2.5 font-display font-bold text-lg tracking-tight group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white text-sm shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              AM
            </span>
            <span className="text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">Aqib Munir</span>
            <span className="hidden sm:inline-block text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
              Creative Tech
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 font-medium text-sm text-slate-600 dark:text-zinc-400">
            {[
              { id: 'home', label: 'Home' },
              { id: 'work', label: 'Selected Work' },
              { id: 'about', label: 'Skills & Stack' },
              { id: 'services', label: 'Process' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3.5 py-1.5 rounded-full transition-all text-xs lg:text-sm ${
                  activeNav === item.id
                    ? 'text-slate-900 dark:text-white bg-slate-200/80 dark:bg-white/10 shadow-sm border border-slate-300/60 dark:border-white/10 font-semibold'
                    : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Action CTA & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
              )}
            </button>

            <a
              href="#contact"
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-all bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 rounded-full hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-zinc-400 rounded-lg md:hidden hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 p-5 rounded-2xl glass-card border border-slate-200 dark:border-white/15 md:hidden bg-white/95 dark:bg-[#101015]/95 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'work', label: 'Selected Work' },
                { id: 'about', label: 'Skills & Stack' },
                { id: 'services', label: 'Process' },
                { id: 'contact', label: 'Start a Project' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-6xl px-4 sm:px-6 mx-auto pt-28 sm:pt-36 pb-6">

        {/* ================= HERO SECTION ================= */}
        <section id="home" className="relative pt-6 pb-20 sm:pb-32 flex flex-col items-center text-center">

          {/* Live Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-card border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50/80 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-mono mb-6 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Q2/Q3 Freelance & Client Projects</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:via-zinc-200 dark:to-zinc-500 leading-[1.1] mb-6"
          >
            Turning complex code into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-600 to-emerald-600 dark:from-indigo-400 dark:via-cyan-400 dark:to-emerald-400">beautiful, brand-driven</span> web experiences.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            I engineer bespoke digital platforms, conversion-focused websites, and high-velocity web applications that help ambitious founders and businesses dominate their market.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 w-full max-w-md mx-auto"
          >
            <a
              href="#work"
              className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-600/20 dark:shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Client Work</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white glass-card border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 rounded-xl transition-all hover:bg-slate-100/80 dark:hover:bg-white/5"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Social Proof & Metrics Bento Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl mt-16 sm:mt-20 text-left"
          >
            {[
              { label: 'Avg. Lighthouse Score', val: '99/100', desc: 'Zero layout shift, instant TTI' },
              { label: 'Client Lead Velocity', val: '3.2x', desc: 'Measurable conversion lift' },
              { label: 'Engineering Stack', val: 'Next.js 15', desc: 'React 19 + TypeScript + Tailwind' },
              { label: 'Client Satisfaction', val: '100%', desc: 'Bespoke design, zero template slop' }
            ].map((stat, i) => (
              <div key={i} className="p-4 sm:p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-colors">
                <div className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-zinc-300">
                  {stat.val}
                </div>
                <div className="text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">{stat.label}</div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-500">{stat.desc}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ================= SELECTED CLIENT WORK ================= */}
        <section id="work" className="py-20 sm:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2 font-semibold dark:font-normal">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Client Deployments</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                Engineered for conversion & prestige.
              </h2>
            </div>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-md">
              Every project is custom architected from zero: bespoke brand identity, fluid micro-interactions, and blazing performance.
            </p>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {PROJECTS.map((proj) => {
              const IconComponent =
                proj.id === 'kuro-omakase' ? UtensilsCrossed :
                proj.id === 'vanguard-dallas' ? Building2 :
                proj.id === 'maison-co' ? Flame : Coffee;

              return (
                <ProjectCard
                  key={proj.id}
                  project={proj}
                  icon={IconComponent}
                  onOpenModal={(p) => setSelectedProject(p)}
                />
              );
            })}
          </div>
        </section>

        {/* ================= SKILLS & TECH STACK ================= */}
        <section id="about" className="py-20 sm:py-28 border-t border-slate-200 dark:border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Column: Philosophy & Bio */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-semibold dark:font-normal">
                <Code2 className="w-3.5 h-3.5" />
                <span>Engineering Philosophy</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                Crafting interfaces where design and code never compromise.
              </h2>
              <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                Most websites look like generic templates or crawl under bloated dependencies. I build at the exact intersection of high-tier aesthetic design and clean, scalable code.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { title: 'Full Brand Alignment', desc: 'Every line of styling reinforces your luxury, authority, or SaaS identity.' },
                  { title: 'Lighthouse 95+ Standard', desc: 'Zero layout shift (CLS < 0.05), responsive image pipelines, edge CDN ready.' },
                  { title: 'Interactive Revenue Engines', desc: 'Dynamic price calculators, reservation calendars, and custom quizzes.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl glass-card border border-slate-200/80 dark:border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-zinc-200">{item.title}</div>
                      <div className="text-[12px] text-slate-600 dark:text-zinc-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Stack Bento Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILL_CATEGORIES.map((cat, i) => (
                <div key={i} className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10 hover:border-indigo-400/40 dark:hover:border-indigo-500/20 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-3">
                      {i === 0 ? <Layers className="w-4 h-4" /> :
                       i === 1 ? <Cpu className="w-4 h-4" /> :
                       i === 2 ? <ShieldCheck className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                      <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white">{cat.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill, si) => (
                        <span key={si} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 border border-slate-200/80 dark:border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= WORK PROCESS ================= */}
        <section id="services" className="py-20 sm:py-28 border-t border-slate-200 dark:border-white/5">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 font-semibold dark:font-normal">
              <Terminal className="w-3.5 h-3.5" />
              <span>How We Work Together</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              From whiteboard concept to production launch.
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base">
              A structured, transparent delivery pipeline with zero fluff, rapid iterations, and relentless attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {WORK_PROCESS.map((proc, i) => (
              <div key={i} className="p-6 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10 relative flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/20 transition-colors">
                <div>
                  <div className="font-mono text-3xl font-extrabold text-indigo-500/30 mb-4">{proc.step}</div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">{proc.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">{proc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CONTACT & CLIENT BOOKING ================= */}
        <section id="contact" className="py-16 sm:py-20 border-t border-slate-200 dark:border-white/5">
          <div className="max-w-4xl mx-auto rounded-3xl glass-card border border-slate-200/80 dark:border-white/15 p-6 sm:p-12 relative overflow-hidden bg-gradient-to-b from-white to-slate-50/90 dark:from-[#12121a]/90 dark:to-[#0c0c10]/95 shadow-xl dark:shadow-2xl">

            {/* Ambient Corner Flare */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 relative z-10">

              {/* Left Column: Quick Contact Info */}
              <div className="md:col-span-5 space-y-6 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2 font-semibold dark:font-normal">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Let's Build Something Exceptional</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3 leading-tight">
                    Have a project in mind?
                  </h2>
                  <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                    Tell me about your product vision, timeline, or redesign requirements. I typically reply within 12 hours with a clear proposal and execution plan.
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={handleCopyEmail}
                      className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <Send className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="font-mono truncate">{email}</span>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                        {copiedEmail ? 'Copied!' : 'Copy'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-zinc-500 space-y-1">
                  <div>📍 Worldwide Remote / Timezone Flexible</div>
                  <div>⚡ Direct 1-on-1 Engineering (No agency middleman)</div>
                </div>
              </div>

              {/* Right Column: Interactive Form */}
              <div className="md:col-span-7">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 text-center flex flex-col items-center justify-center h-full min-h-[350px]"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Received!</h3>
                    <p className="text-slate-700 dark:text-zinc-300 text-sm max-w-sm mb-6">
                      Thank you for reaching out, {formData.name}. I'll review your project details and get back to you shortly at <span className="text-indigo-600 dark:text-indigo-400 font-mono font-medium">{formData.email}</span>.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white bg-slate-200/80 dark:bg-white/5 hover:bg-slate-300/80 dark:hover:bg-white/10 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-600 dark:text-zinc-400 mb-1.5 font-semibold dark:font-normal">YOUR NAME</label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 focus:border-indigo-500 focus:outline-none text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-zinc-600 transition-colors shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-600 dark:text-zinc-400 mb-1.5 font-semibold dark:font-normal">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 focus:border-indigo-500 focus:outline-none text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-zinc-600 transition-colors shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-600 dark:text-zinc-400 mb-1.5 font-semibold dark:font-normal">ESTIMATED BUDGET</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['< $3k', '$3k - $6k', '$6k - $15k+'].map((budget) => (
                          <button
                            type="button"
                            key={budget}
                            onClick={() => setBudgetSelected(budget)}
                            className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                              budgetSelected === budget
                                ? 'bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-600/30 dark:border-indigo-500 dark:text-white font-semibold shadow-sm'
                                : 'bg-slate-100/80 dark:bg-black/30 border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5'
                            }`}
                          >
                            {budget}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-600 dark:text-zinc-400 mb-1.5 font-semibold dark:font-normal">PROJECT DETAILS</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Tell me about your goals, brand requirements, or ideal launch timeline..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 focus:border-indigo-500 focus:outline-none text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-zinc-600 transition-colors resize-none shadow-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      <span>Send Project Inquiry</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 dark:border-white/10 py-6 px-4 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>© {new Date().getFullYear()} Aqib Munir. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#home" className="hover:text-slate-900 dark:hover:text-zinc-300 transition-colors">Back to Top</a>
          <a href="#work" className="hover:text-slate-900 dark:hover:text-zinc-300 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-slate-900 dark:hover:text-zinc-300 transition-colors">Contact</a>
        </div>
      </footer>

      {/* ================= PROJECT CASE STUDY MODAL ================= */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Scrim backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/60 dark:bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass-card border border-slate-200 dark:border-white/20 bg-white dark:bg-[#101017] p-6 sm:p-8 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                {/* Modal Header */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                      {selectedProject.category}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-zinc-300">
                      {selectedProject.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="text-base text-slate-700 dark:text-zinc-300 font-medium mt-1">
                    {selectedProject.tagline}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10">
                  {selectedProject.metrics.map((m, i) => (
                    <div key={i} className="text-center">
                      <div className="font-display text-lg sm:text-2xl font-bold text-indigo-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-indigo-400 dark:to-cyan-400">
                        {m.value}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-zinc-400">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Case Study Body */}
                <div className="space-y-4 text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                  <div>
                    <h4 className="text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1 font-semibold dark:font-normal">THE OVERVIEW</h4>
                    <p>{selectedProject.description}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-1 font-semibold dark:font-normal">CLIENT IMPACT & CONVERSION</h4>
                    <p className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/20 text-indigo-900 dark:text-indigo-200">
                      {selectedProject.clientImpact}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 font-semibold dark:font-normal">CORE HIGHLIGHTS & DELIVERABLES</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProject.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-white/5 p-2.5 rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1 font-semibold dark:font-normal">ARCHITECTURE & PERFORMANCE</h4>
                    <p className="text-xs text-slate-600 dark:text-zinc-400">{selectedProject.keyArchitecture}</p>
                  </div>
                </div>

                {/* Modal Footer Links */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((t, i) => (
                      <span key={i} className="text-[11px] font-mono px-2 py-1 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-zinc-400 border border-slate-200/60 dark:border-transparent">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-xs sm:text-sm hover:opacity-95 transition-opacity shadow-lg shadow-indigo-500/25"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
export default App;
