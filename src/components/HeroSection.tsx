import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  TrendingUp, 
  LifeBuoy, 
  Coins, 
  Compass, 
  BookOpen, 
  Users, 
  Award, 
  CheckCircle2, 
  ChevronRight,
  Zap
} from 'lucide-react';
import { DEMO_PROFILES } from '../data/demoProfiles';
import { PathWiseMark } from './PathWiseMark';
import { CareerPathVisual } from './CareerPathVisual';

export const HeroSection: React.FC = () => {
  const { setActiveTab, loadDemoProfile } = useApp();
  
  // Interactive 3-Click Mini Quiz
  const [miniStep, setMiniStep] = useState<number>(1);
  const [miniSubject, setMiniSubject] = useState<string>('');
  const [miniInterest, setMiniInterest] = useState<string>('');
  const [miniBudget, setMiniBudget] = useState<string>('');

  return (
    <div className="relative overflow-hidden bg-[#070b18] text-white">
      {/* Background Glows */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none motion-safe:animate-pulse" />
      <div className="absolute top-20 -right-40 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl pointer-events-none motion-safe:animate-pulse" />
      <div className="absolute inset-0 opacity-30 pointer-events-none [background-image:linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />

      {/* Main Hero Container */}
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mb-10 flex items-center justify-center lg:mb-16">
          <PathWiseMark size="lg" dark />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div className="text-center lg:text-left">
            <div className="mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-300/20 bg-brand-400/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-200">
                <Sparkles className="h-3.5 w-3.5 text-brand-300" />
                Explore what could fit you
              </div>
              <button
                onClick={() => setActiveTab('campus-dashboard')}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-300 hover:bg-emerald-500/20 transition"
              >
                🎓 UniSphere Campus Network Live
              </button>
            </div>
            <h1 className="font-['Outfit'] text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Discover where your <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-ocean-300 bg-clip-text text-transparent">potential</span> can take you.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 lg:mx-0">
              Start with your curiosity. PathWise & UniSphere connect students, faculty, and universities into an active academic and career graph.
            </p>

          {/* 3 Main CTAs */}
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-start">
            <button
              onClick={() => setActiveTab('assessment')}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:from-brand-400 hover:to-brand-600 hover:shadow-xl hover:shadow-brand-600/30 active:translate-y-0 sm:min-w-52"
            >
              Start Student Onboarding
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={() => setActiveTab('campus-dashboard')}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-semibold text-slate-100 shadow-sm transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:shadow-md sm:min-w-52"
            >
              <Users className="h-4 w-4 text-brand-300" />
              My Campus Hub & Squads
            </button>

            <button
              onClick={() => setActiveTab('exams')}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-semibold text-slate-100 shadow-sm transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:shadow-md sm:min-w-52"
            >
              <BookOpen className="h-4 w-4 text-ocean-300" />
              Explore Careers & CETs
            </button>
          </div>

          {/* Demo Student Fast Track Box */}
          <div className="mt-7">
            <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2.5 text-xs text-slate-300 shadow-sm backdrop-blur">
              <span className="flex items-center gap-1 px-2 font-semibold text-white">
                <Zap className="h-3.5 w-3.5 text-amber-500" /> Try a demo profile
              </span>
              <button
                onClick={() => loadDemoProfile('demo-aarav-class10')}
                className="rounded-lg border border-brand-200 bg-brand-50 px-2.5 py-1.5 font-medium text-brand-700 transition hover:bg-brand-100"
              >
                Aarav (Class 10 - Tech/AI & Budget Route)
              </button>
              <button
                onClick={() => loadDemoProfile('demo-priya-class11')}
                className="rounded-lg border border-purple-200 bg-purple-50 px-2.5 py-1.5 font-medium text-purple-700 transition hover:bg-purple-100"
              >
                Priya (Class 11 - PCB / MBBS vs Biotech)
              </button>
              <button
                onClick={() => loadDemoProfile('demo-rohan-class9')}
                className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 font-medium text-emerald-700 transition hover:bg-emerald-100"
              >
                Rohan (Class 9 - Sports + Defence)
              </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <CareerPathVisual />
          </div>
        </div>

        {/* The 4 Path Strategies Philosophy Banner */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
              The PathWise 4-Tier Strategy Framework
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              ?Your circumstances affect your strategy, but they do not define your potential.?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Strategy A */}
            <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-sm hover:shadow-md transition">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">A. High-Probability Path</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Matches your current academic marks, family budget, and resources for maximum predictability of success.
              </p>
            </div>

            {/* Strategy B */}
            <div className="p-5 rounded-2xl bg-white border border-purple-200 shadow-sm hover:shadow-md transition">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">B. Ambitious Dream Path</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                High-competition goals (IIT, AIIMS, NLSIU, IIM IPM) with structured deep work and time endurance requirements.
              </p>
            </div>

            {/* Strategy C */}
            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm hover:shadow-md transition">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm mb-3">
                <LifeBuoy className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">C. Solid Backup Path</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Realistic, high-growth alternatives ensuring one failed entrance examination never derails your long-term career.
              </p>
            </div>

            {/* Strategy D */}
            <div className="p-5 rounded-2xl bg-white border border-blue-200 shadow-sm hover:shadow-md transition">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-3">
                <Coins className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">D. Low-Cost / High-ROI</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Zero/low coaching routes through Government universities, fee waivers, NPTEL, and full scholarships.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Quick 3-Question Stream Check */}
        <div className="mt-12 max-w-3xl mx-auto bg-gradient-to-r from-brand-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex items-center justify-between border-b border-brand-800/80 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-300" />
              <h3 className="font-bold text-base font-['Outfit']">Instant 30-Second Stream Teaser</h3>
            </div>
            <span className="text-xs bg-brand-800 text-brand-200 px-2.5 py-1 rounded-full font-medium">
              Step {miniStep} of 3
            </span>
          </div>

          {miniStep === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-200 font-medium">1. What subject or activity gives you the most energy?</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Maths & Logic', val: 'maths' },
                  { label: 'Biology & Living Things', val: 'bio' },
                  { label: 'Business & Trade', val: 'comm' },
                  { label: 'Debating & Society', val: 'arts' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => { setMiniSubject(opt.val); setMiniStep(2); }}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold text-center border border-white/15 transition hover:scale-105"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {miniStep === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-200 font-medium">2. How do you prefer spending your problem-solving time?</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { label: 'Building & Coding things', val: 'building' },
                  { label: 'Treating/Helping people', val: 'helping' },
                  { label: 'Analyzing charts & money', val: 'money' },
                  { label: 'Writing & Policy debate', val: 'writing' },
                  { label: 'Playing competitive sports', val: 'sports' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => { setMiniInterest(opt.val); setMiniStep(3); }}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold text-center border border-white/15 transition hover:scale-105"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {miniStep === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-200 font-medium">3. What is your family?s coaching preference?</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { label: 'Prefer Free / Self-Study', val: 'free' },
                  { label: 'Budget/Moderate Coaching', val: 'mod' },
                  { label: 'Can afford any coaching', val: 'high' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => { 
                      setMiniBudget(opt.val); 
                      setActiveTab('assessment');
                    }}
                    className="p-3 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-xs font-bold text-center border border-brand-300 shadow-md transition hover:scale-105"
                  >
                    {opt.label} ? See My Full Roadmap
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live Metrics Ticker */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-2xl sm:text-3xl font-extrabold text-brand-600 font-['Outfit']">40+</div>
            <div className="text-xs text-slate-500 mt-0.5">Indian Exams & CETs Mapped</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-['Outfit']">25+</div>
            <div className="text-xs text-slate-500 mt-0.5">Verified Scholarships Indexed</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-['Outfit']">14</div>
            <div className="text-xs text-slate-500 mt-0.5">Sports Dual-Career Tracks</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-['Outfit']">100%</div>
            <div className="text-xs text-slate-500 mt-0.5">Free Core Career Guidance</div>
          </div>
        </div>

      </div>
    </div>
  );
};
