import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
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
  Moon,
  Phone,
  Check,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROJECTS, SKILL_CATEGORIES, WORK_PROCESS, type Project } from './data/portfolio';
import { ProjectCard } from './components/ProjectCard';

export function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [budgetSelected, setBudgetSelected] = useState('$3,000 - $6,000');
  const [currentTime, setCurrentTime] = useState<string>('');

  // Live clock updating according to user timezone
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

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
  const phone = '+92 317 0061218';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setFormSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366F1', '#06B6D4', '#10B981', '#E2B872']
    });
  };

  // Track active section using IntersectionObserver (off the main JS scroll thread)
  useEffect(() => {
    const sections = ['home', 'work', 'about', 'services', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#09090b] dark:text-[#fafafa] relative overflow-x-hidden selection:bg-indigo-500/20 selection:text-indigo-900 dark:selection:bg-indigo-500/30 dark:selection:text-indigo-200 transition-colors duration-300">

      {/* Background Ambient Glow Orbs */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[450px] bg-gradient-to-b from-indigo-300/20 via-sky-200/20 to-transparent dark:from-indigo-600/15 dark:via-cyan-600/10 dark:to-transparent rounded-full blur-3xl pointer-events-none transform-gpu will-change-transform" />
      <div className="fixed bottom-1/4 right-10 -z-10 w-[380px] h-[380px] bg-cyan-400/15 dark:bg-cyan-600/10 rounded-full blur-3xl pointer-events-none transform-gpu will-change-transform" />

      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 sm:py-5 portfolio-navbar">
        <nav className="flex items-center justify-between w-full max-w-6xl mx-auto px-6">
          <a href="#home" className="flex items-center gap-2.5 font-display font-bold text-lg tracking-tight group">
            <span className="text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-300 transition-colors text-base sm:text-lg">
              Aqib Munir
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600 dark:text-zinc-400">
            {[
              { id: 'home', label: 'Home' },
              { id: 'work', label: 'Work' },
              { id: 'about', label: 'About' },
              { id: 'services', label: 'Process' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`transition-colors hover:text-slate-900 dark:hover:text-white ${
                  activeNav === item.id
                    ? 'text-slate-900 dark:text-white font-semibold'
                    : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Action CTA & Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
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
              className="inline-flex items-center justify-center px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-zinc-200 rounded-full transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Email Me</span>
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

      <main className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto pt-28 sm:pt-32 pb-12">

        {/* ================= HERO SECTION (REFERENCE MATCHING) ================= */}
        <section id="home" className="relative pt-4 pb-16 sm:pb-24 overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[560px] lg:min-h-[620px] relative">

            {/* Left Column: Availability & Headline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 z-20 flex flex-col justify-center text-left order-2 lg:order-1"
            >
              {/* Availability badge with green pulsing dot */}
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-zinc-300 font-medium mb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>2 projects left in Q2</span>
              </div>

              {/* Punchy Hero Headline */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[42px] font-bold text-slate-900 dark:text-white leading-[1.18] tracking-tight mb-6">
                Aqib is solving problems through strategic design and compelling visuals
              </h1>

              {/* Quick tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-zinc-300 font-medium">
                  Full-Stack Architecture
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-zinc-300 font-medium">
                  UI/UX Craft
                </span>
              </div>
            </motion.div>

            {/* Center Column: Prominent Person Portrait with soft bottom fade & floating badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-4 relative flex justify-center items-center order-1 lg:order-2"
            >
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] mx-auto group">

                {/* Ambient Halo behind portrait */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 via-sky-400/15 to-transparent dark:from-indigo-600/30 dark:via-cyan-500/20 dark:to-transparent rounded-full blur-3xl scale-95 pointer-events-none" />

                {/* Portrait Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60 dark:border-white/10 bg-slate-100/50 dark:bg-[#121218]/50">
                  <img
                    src="/assets/person.jpg"
                    alt="Aqib Munir - Creative Technologist & Full Stack Engineer"
                    className="w-full h-auto object-cover object-center max-h-[500px] sm:max-h-[560px] select-none transform transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="eager"
                  />

                  {/* Soft bottom blend overlay to dissolve person into page seamlessly */}
                  <div className="absolute bottom-0 inset-x-0 h-36 sm:h-44 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#09090b] dark:via-[#09090b]/80 dark:to-transparent pointer-events-none" />
                </div>

                {/* Floating Glassmorphism Badge 1 - Top Right (Documents/Tech stack - Reference 2 style) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute -top-3 -right-3 sm:-right-6 glass-card backdrop-blur-xl bg-white/90 dark:bg-[#12121a]/85 border border-slate-200/80 dark:border-white/15 p-3 rounded-2xl shadow-xl z-30 hidden sm:block"
                >
                  <div className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>STACK</span>
                  </div>
                  <div className="space-y-1 text-xs font-semibold text-slate-800 dark:text-zinc-200">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Next.js 15 & React</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Tailwind CSS</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>TypeScript</span>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Glassmorphism Badge 2 - Bottom Left Profile Pill (Reference 3 style) */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute bottom-6 left-3 sm:-left-6 glass-card backdrop-blur-xl bg-white/90 dark:bg-[#12121a]/85 border border-slate-200/80 dark:border-white/15 py-2 px-3.5 rounded-2xl shadow-xl z-30 flex items-center gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-indigo-500/30">
                    <img src="/assets/person.jpg" alt="Aqib avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                      @aqibmunir
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-zinc-400 mt-0.5">
                      Full-Stack Engineer
                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.div>

            {/* Right Column: Bio & CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4 z-20 flex flex-col justify-center text-left order-3"
            >
              <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed mb-8">
                As a digital product designer and full-stack engineer with a strong focus on visual design, performant web applications, and Framer/Next.js platforms, he collaborates closely with founders and teams to craft seamless, user-centered experiences. A reliable partner in bringing ideas to life.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-zinc-200 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Email Me</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-800 dark:text-zinc-200 hover:text-slate-900 dark:hover:text-white glass-card border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 rounded-full transition-all"
                >
                  <span>View Projects</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {/* Direct Quick Contact Pill */}
              <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
                <span className="font-mono">{email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="text-xs font-semibold text-[#FFB238] hover:underline"
                >
                  {copiedEmail ? 'Copied!' : 'Copy Email'}
                </button>
              </div>
            </motion.div>

          </div>

          {/* Metrics / Proof Bento Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full mt-14 sm:mt-16 text-left"
          >
            {[
              { label: 'Avg. Lighthouse Score', val: '99/100', desc: 'Zero layout shift, instant TTI' },
              { label: 'Client Lead Velocity', val: '3.2x', desc: 'Measurable conversion lift' },
              { label: 'Engineering Stack', val: 'Next.js 15', desc: 'React 19 + TypeScript + Tailwind' },
              { label: 'Client Satisfaction', val: '100%', desc: 'Bespoke design, zero template slop' }
            ].map((stat, i) => (
              <div key={i} className="p-4 sm:p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-colors">
                <div className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">
                  {stat.val}
                </div>
                <div className="text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">{stat.label}</div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-500">{stat.desc}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ================= SELECTED CLIENT WORK ================= */}
        <section id="work" className="py-20 sm:py-28 border-t border-slate-200/80 dark:border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E2B872] uppercase tracking-wider mb-2 font-semibold dark:font-normal">
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
        <section id="about" className="py-20 sm:py-28 border-t border-slate-200/80 dark:border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Column: Philosophy & Bio */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E2B872] uppercase tracking-wider font-semibold dark:font-normal">
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
                    <CheckCircle2 className="w-5 h-5 text-[#E2B872] shrink-0 mt-0.5" />
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
                <div key={i} className="p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10 hover:border-amber-400/40 dark:hover:border-amber-500/20 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[#E2B872] mb-3">
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
        <section id="services" className="py-20 sm:py-28 border-t border-slate-200/80 dark:border-white/5">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E2B872] uppercase tracking-wider mb-2 font-semibold dark:font-normal">
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
                  <div className="font-mono text-3xl font-extrabold text-[#E2B872]/30 mb-4">{proc.step}</div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">{proc.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">{proc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CONTACT & CLIENT BOOKING ================= */}
        <section id="contact" className="py-16 sm:py-20 border-t border-slate-200/80 dark:border-white/5">
          <div className="max-w-4xl mx-auto rounded-3xl glass-card border border-slate-200/80 dark:border-white/15 p-6 sm:p-12 relative overflow-hidden bg-gradient-to-b from-white to-slate-50/90 dark:from-[#12121a]/90 dark:to-[#0c0c10]/95 shadow-xl dark:shadow-2xl">

            {/* Ambient Corner Flare */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 relative z-10">

              {/* Left Column: Quick Contact Info */}
              <div className="md:col-span-5 space-y-6 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E2B872] uppercase tracking-wider mb-2 font-semibold dark:font-normal">
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
                        <Send className="w-4 h-4 text-[#E2B872]" />
                        <span className="font-mono truncate">{email}</span>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-100/70 dark:bg-amber-500/15 text-[#FFB238] font-semibold">
                        {copiedEmail ? 'Copied!' : 'Copy'}
                      </span>
                    </button>

                    <button
                      onClick={handleCopyPhone}
                      className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-[#E2B872]" />
                        <span className="font-mono truncate">{phone}</span>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-100/70 dark:bg-amber-500/15 text-[#FFB238] font-semibold">
                        {copiedPhone ? 'Copied!' : 'Copy'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500 dark:text-zinc-500 space-y-1">
                  <div>Worldwide Remote / Timezone Flexible</div>
                  <div>Direct 1-on-1 Engineering (No agency middleman)</div>
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
                      Thank you for reaching out, {formData.name}. I'll review your project details and get back to you shortly at <span className="text-[#E2B872] font-mono font-medium">{formData.email}</span>.
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
                                ? 'bg-amber-50 border-amber-500 text-[#E2B872] dark:bg-amber-500/20 dark:border-amber-500 dark:text-white font-semibold shadow-sm'
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
                      className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-zinc-200 text-white font-semibold text-sm transition-all shadow-md hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
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
      <footer className="border-t border-slate-200 dark:border-white/10 py-8 px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>© {new Date().getFullYear()} Aqib Munir. Built with passion.</span>
        </div>

        {/* Live Local Time */}
        <div className="font-mono text-[11px] sm:text-xs font-medium text-slate-500 dark:text-zinc-400 tabular-nums">
          {currentTime || '12:00 PM'}
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
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-500/20 text-[#E2B872] border border-amber-200 dark:border-amber-500/30">
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
                      <div className="font-display text-lg sm:text-2xl font-bold text-[#E2B872]">
                        {m.value}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-zinc-400">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Case Study Body */}
                <div className="space-y-4 text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                  <div>
                    <h4 className="text-xs font-mono text-[#E2B872] uppercase tracking-wider mb-1 font-semibold dark:font-normal">THE OVERVIEW</h4>
                    <p>{selectedProject.description}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono text-[#E2B872] uppercase tracking-wider mb-1 font-semibold dark:font-normal">CLIENT IMPACT & CONVERSION</h4>
                    <p className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/20 text-slate-900 dark:text-zinc-200">
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs sm:text-sm hover:opacity-95 transition-opacity shadow-lg"
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
