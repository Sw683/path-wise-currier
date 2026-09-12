import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Shield, Heart, Sparkles, Globe2, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-16 lg:pb-12 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">CampusNexus</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The premier cross-university student academic, social, and career network. Empowering students across colleges, departments, and disciplines to discover peers, build projects, and unlock opportunities together.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Zero commercial data brokerage. Built for student privacy.</span>
            </div>
          </div>

          {/* Platform Nav */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('communities')} className="hover:text-white transition-colors">
                  College Communities
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('network')} className="hover:text-white transition-colors">
                  Global Student Network
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('teammates')} className="hover:text-white transition-colors">
                  Find Teammates
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('projects')} className="hover:text-white transition-colors">
                  Project Showcase
                </button>
              </li>
            </ul>
          </div>

          {/* Career & Funding */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Opportunities</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('fellowships')} className="hover:text-white transition-colors">
                  Fellowships & Grants
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('journeys')} className="hover:text-white transition-colors">
                  Placed Student Journeys
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('analytics')} className="hover:text-white transition-colors">
                  University Insights
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('mentor')} className="hover:text-white transition-colors flex items-center gap-1">
                  <span>AI Career Mentor</span>
                  <span className="text-[9px] bg-indigo-500/30 text-indigo-300 px-1.5 py-0.2 rounded-sm">New</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Data Ethics & Universities */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Transparency</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
              University statistics are aggregated from platform submissions and voluntary student surveys. They represent student community velocity rather than official administrative rankings.
            </p>
            <div className="text-[10px] text-slate-500">
              CampusNexus © 2026. Made with academic rigor for student builders.
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center gap-4">
            <span>Terms of Academic Integrity</span>
            <span>Student Privacy Charter</span>
            <span>University Partnerships</span>
          </div>
          <div className="flex items-center gap-1">
            <span>"Connect. Learn. Build. Grow Together."</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
