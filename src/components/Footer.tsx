import React from 'react';
import { Compass, ShieldCheck, HeartHandshake, BookOpen, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-12 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-base font-['Outfit']">
              <Compass className="w-5 h-5 text-brand-400" />
              PathWise India
            </div>
            <p className="text-slate-400 leading-relaxed">
              ?Your circumstances affect your strategy, but they do not define your potential.?
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-medium text-[11px]">
              <ShieldCheck className="w-4 h-4" /> 100% Free Core Career Assessment
            </div>
          </div>

          {/* Col 2: Quick Features */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Core Modules</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveTab('assessment')} className="hover:text-white transition">5-Step Career Assessment</button></li>
              <li><button onClick={() => setActiveTab('simulator')} className="hover:text-white transition">?What If I Choose This?? Simulator</button></li>
              <li><button onClick={() => setActiveTab('tree')} className="hover:text-white transition">Interactive Career Decision Tree</button></li>
              <li><button onClick={() => setActiveTab('sports')} className="hover:text-white transition">Sports Career Navigator (Dual Career)</button></li>
              <li><button onClick={() => setActiveTab('skills')} className="hover:text-white transition">Early Skills & Projects (Class 8?10)</button></li>
            </ul>
          </div>

          {/* Col 3: Resources & Safety */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Resources & Safety</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveTab('exams')} className="hover:text-white transition">40+ Entrance Exams & CET Directory</button></li>
              <li><button onClick={() => setActiveTab('scholarships')} className="hover:text-white transition">Gov & Private Scholarship Matcher</button></li>
              <li><button onClick={() => setActiveTab('knowledge')} className="hover:text-white transition">Attributed Career Insights Layer</button></li>
              <li><button onClick={() => setActiveTab('mentors')} className="hover:text-white transition">Talk to a Verified Professional</button></li>
              <li><button onClick={() => setActiveTab('parent')} className="hover:text-white transition">Parent Financial Planning Dashboard</button></li>
            </ul>
          </div>

          {/* Col 4: Safety & Ethical Disclaimers */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> Ethics & Minor Safety
            </h4>
            <p className="text-[11px] text-slate-400 leading-normal">
              PathWise India does not guarantee admissions or starting CTCs. Match percentages represent algorithmic AI compatibility scores, not deterministic outcomes.
            </p>
            <p className="text-[11px] text-slate-500">
              Minor safety protocols require parental/guardian consent before booking 1-on-1 consultations with verified professionals.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>? {new Date().getFullYear()} PathWise India. Built for Indian Students from Class 8 to 12.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300">Privacy Policy (Minors Protected)</span>
            <span>?</span>
            <span className="hover:text-slate-300">Terms of Guidance</span>
            <span>?</span>
            <span className="hover:text-slate-300">Anti-Ragging & Mental Health Helpline</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
