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

export const HeroSection: React.FC = () => {
  const { setActiveTab, loadDemoProfile } = useApp();
  
  // Interactive 3-Click Mini Quiz
  const [miniStep, setMiniStep] = useState<number>(1);
  const [miniSubject, setMiniSubject] = useState<string>('');
  const [miniInterest, setMiniInterest] = useState<string>('');
  const [miniBudget, setMiniBudget] = useState<string>('');

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-slate-50 to-white">
      {/* Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 -right-40 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-24 relative">
        
        {/* Top Tag */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold border border-brand-200 shadow-xs mb-6 animate-pulse-subtle">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Empowering 25 Crore Indian Students Across Class 8?12
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-['Outfit'] leading-[1.15]">
            Don?t choose your career blindly. <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-800">
              Build your personalized path.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Tell us where you are, what you enjoy, what you?re good at, and what opportunities you have. We?ll help you explore realistic paths?and the alternatives if Plan A doesn?t work.
          </p>

          {/* 3 Main CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('assessment')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Build My Career Path
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('exams')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-xs transition hover:border-slate-400"
            >
              <BookOpen className="w-4 h-4 text-brand-600" />
              Explore Careers & Exams
            </button>

            <button
              onClick={() => setActiveTab('mentors')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-xs transition hover:border-slate-400"
            >
              <Users className="w-4 h-4 text-indigo-600" />
              Talk to a Professional
            </button>
          </div>

          {/* Demo Student Fast Track Box */}
          <div className="pt-6">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs text-slate-600">
              <span className="font-semibold text-slate-900 flex items-center gap-1 pl-2">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> Try Section 29 Demo:
              </span>
              <button
                onClick={() => loadDemoProfile('demo-aarav-class10')}
                className="px-2.5 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 font-medium rounded-lg border border-brand-200 transition"
              >
                Aarav (Class 10 - Tech/AI & Budget Route)
              </button>
              <button
                onClick={() => loadDemoProfile('demo-priya-class11')}
                className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium rounded-lg border border-purple-200 transition"
              >
                Priya (Class 11 - PCB / MBBS vs Biotech)
              </button>
              <button
                onClick={() => loadDemoProfile('demo-rohan-class9')}
                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-lg border border-emerald-200 transition"
              >
                Rohan (Class 9 - Sports + Defence)
              </button>
            </div>
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
