import React, { useState } from 'react';
import { ExternalLink, Sparkles, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { type Project } from '../data/portfolio';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
  icon: React.ComponentType<{ className?: string }>;
}

export function ProjectCard({ project, onOpenModal, icon: IconComponent }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      onClick={() => onOpenModal(project)}
      className="group relative rounded-3xl glass-card border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/40 p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/15 hover:-translate-y-1 overflow-hidden"
    >
      {/* Dynamic top gradient indicator */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-80"
        style={{ background: `linear-gradient(to right, ${project.accentColor}, transparent)` }}
      />

      <div>
        {/* Visual Preview Container */}
        <div className="relative w-full h-52 sm:h-60 mb-6 rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#0e0e14] border border-slate-200/80 dark:border-white/10 group-hover:border-indigo-400/40 dark:group-hover:border-white/20 transition-all">
          {/* Default High-End Mockup Graphic */}
          <div
            className="w-full h-full flex flex-col justify-between p-5 relative overflow-hidden"
            style={{
              background: `radial-gradient(ellipse at top left, ${project.accentColor}25, #0c0c11 75%)`
            }}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

            {/* Inner Header Bar Mockup */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                <span className="text-[10px] font-mono text-zinc-400 ml-2">
                  {project.id}.production.app
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10">
                {project.badge}
              </span>
            </div>

            {/* Center Content Mockup */}
            <div className="my-auto text-left z-10 py-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 text-white border shadow-lg"
                style={{
                  backgroundColor: `${project.accentColor}20`,
                  borderColor: `${project.accentColor}40`
                }}
              >
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="font-display font-bold text-white text-lg tracking-tight">
                {project.title}
              </div>
              <div className="text-xs text-zinc-300 line-clamp-1 mt-0.5">
                {project.tagline}
              </div>
            </div>

            {/* Bottom Live Metrics Bar Mockup */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10 z-10">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Layout Shift (CLS &lt; 0.02)</span>
              </div>
              <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                <ImageIcon className="w-3 h-3 text-indigo-400" />
                <span>{project.image}</span>
              </div>
            </div>

            {/* Optional real image layer overlay when saved in public/assets */}
            <img
              src={project.image}
              alt={project.title}
              onLoad={() => setImageLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              loading="lazy"
            />
          </div>

          {/* Top right live link button */}
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-zinc-300 hover:text-white hover:bg-black transition-all shadow-md group/btn z-20"
            title="Open Live Website"
          >
            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
          </a>
        </div>

        {/* Category & Title */}
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-zinc-300 group-hover:text-indigo-500 dark:group-hover:text-white transition-colors">
            <IconComponent className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs font-mono text-[#E2B872] uppercase tracking-wider font-semibold dark:font-normal">
            {project.category}
          </span>
        </div>

        <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 font-medium mb-3">
          {project.tagline}
        </p>
        <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-2 mb-5">
          {project.description}
        </p>

        {/* Metrics Banner */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-100/90 dark:bg-black/40 border border-slate-200/80 dark:border-white/5 mb-5">
          {project.metrics.map((m, i) => (
            <div key={i} className="text-center">
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">{m.value}</div>
              <div className="text-[10px] text-slate-500 dark:text-zinc-500 truncate">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Tech Pills */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/80 dark:border-white/5 mb-4">
          {project.tags.slice(0, 4).map((tag, i) => (
            <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-zinc-400 border border-slate-200/60 dark:border-transparent">
              {tag}
            </span>
          ))}
        </div>

        {/* View Details Link */}
        <div className="flex items-center justify-between text-xs font-semibold text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Case Study & Architecture</span>
          </span>
          <span className="text-slate-500 dark:text-zinc-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Details →</span>
        </div>
      </div>
    </div>
  );
}
