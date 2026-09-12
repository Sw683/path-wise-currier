import React, { useState } from 'react';
import { ArrowUpRight, Brain, HeartPulse, Palette, Sparkles } from 'lucide-react';

export interface CareerVisualBranch {
  id: string;
  label: string;
  x: number;
  y: number;
  color: 'orange' | 'blue';
  icon: React.ElementType;
}

const defaultBranches: CareerVisualBranch[] = [
  { id: 'technology', label: 'Technology', x: 76, y: 19, color: 'blue', icon: Brain },
  { id: 'design', label: 'Design', x: 87, y: 50, color: 'orange', icon: Palette },
  { id: 'healthcare', label: 'Healthcare', x: 72, y: 82, color: 'blue', icon: HeartPulse },
];

interface CareerPathVisualProps {
  branches?: CareerVisualBranch[];
}

export const CareerPathVisual: React.FC<CareerPathVisualProps> = ({ branches = defaultBranches }) => {
  const [activeBranch, setActiveBranch] = useState<string | null>(null);

  return (
    <div className="relative mx-auto h-[22rem] w-full max-w-xl sm:h-[27rem]" aria-label="Abstract career paths visualization">
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl motion-safe:animate-pulse" />
      <div className="absolute left-[12%] top-[22%] h-24 w-24 rounded-full bg-ocean-500/10 blur-2xl motion-safe:animate-float-gentle" />
      <div className="absolute right-[8%] bottom-[14%] h-28 w-28 rounded-full bg-brand-500/10 blur-2xl motion-safe:animate-float-gentle" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" role="presentation">
        <defs>
          <linearGradient id="pathwise-path-blue" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="pathwise-path-orange" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#fdba74" stopOpacity="0.9" />
          </linearGradient>
          <filter id="pathwise-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.1" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d="M 18 52 C 34 52, 36 50, 49 50" stroke="url(#pathwise-path-orange)" strokeWidth="0.65" fill="none" opacity="0.9" />
        {branches.map((branch, index) => (
          <path
            key={branch.id}
            d={`M 49 50 C ${54 + index * 2} 50, ${branch.x - 12} ${branch.y}, ${branch.x} ${branch.y}`}
            stroke={branch.color === 'orange' ? 'url(#pathwise-path-orange)' : 'url(#pathwise-path-blue)'}
            strokeWidth={activeBranch === branch.id ? '1.1' : '0.55'}
            fill="none"
            filter={activeBranch === branch.id ? 'url(#pathwise-glow)' : undefined}
            className="transition-all duration-500"
          />
        ))}
      </svg>

      <div className="absolute left-[10%] top-1/2 -translate-y-1/2">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-300/40 bg-brand-400/15 text-brand-200 shadow-[0_0_45px_rgba(249,115,22,0.2)] backdrop-blur sm:h-20 sm:w-20">
          <Sparkles className="h-7 w-7 sm:h-8 sm:w-8" />
          <span className="absolute -bottom-7 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">You</span>
        </div>
      </div>

      <div className="absolute left-[43%] top-1/2 -translate-y-1/2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/50 bg-white/20 shadow-[0_0_28px_rgba(255,255,255,0.35)] backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-white" />
        </div>
        <span className="absolute left-1/2 top-9 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-slate-500">exploration</span>
      </div>

      {branches.map((branch) => {
        const Icon = branch.icon;
        const isActive = activeBranch === branch.id;
        return (
          <button
            key={branch.id}
            type="button"
            onMouseEnter={() => setActiveBranch(branch.id)}
            onMouseLeave={() => setActiveBranch(null)}
            onFocus={() => setActiveBranch(branch.id)}
            onBlur={() => setActiveBranch(null)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2 text-left transition-all duration-500 ${isActive ? 'scale-105 border-white/40 bg-white/15 shadow-[0_0_28px_rgba(96,165,250,0.2)]' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
            style={{ left: `${branch.x}%`, top: `${branch.y}%` }}
          >
            <span className="flex items-center gap-2">
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${branch.color === 'orange' ? 'bg-brand-400/20 text-brand-200' : 'bg-ocean-400/20 text-ocean-200'}`}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="text-xs font-bold text-slate-200">{branch.label}</span>
              <ArrowUpRight className="h-3 w-3 text-slate-500" />
            </span>
          </button>
        );
      })}

      {Array.from({ length: 12 }, (_, index) => (
        <span key={index} className="absolute h-1 w-1 rounded-full bg-white/50 motion-safe:animate-pulse" style={{ left: `${(index * 31) % 92 + 4}%`, top: `${(index * 47) % 88 + 6}%`, animationDelay: `${index * 0.25}s` }} />
      ))}
    </div>
  );
};
