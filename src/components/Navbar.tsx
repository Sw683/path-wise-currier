import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  Map, 
  Cpu, 
  BookOpen, 
  Award, 
  Activity, 
  Users, 
  ShieldCheck, 
  UserCheck, 
  Settings, 
  Sparkles,
  Sliders
} from 'lucide-react';
import { DEMO_PROFILES } from '../data/demoProfiles';

export const Navbar: React.FC = () => {
  const { role, setRole, activeTab, setActiveTab, activeProfile, loadDemoProfile, guardianShieldActive } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'assessment', label: 'Assessment', icon: Sliders },
    { id: 'dashboard', label: 'My Roadmap', icon: Map },
    { id: 'simulator', label: 'What-If Simulator', icon: Cpu },
    { id: 'tree', label: 'Career Tree', icon: Sparkles },
    { id: 'compare', label: 'Career Comparison', icon: Activity },
    { id: 'knowledge', label: 'Knowledge Insights', icon: UserCheck },
    { id: 'exams', label: 'Exams & CETs', icon: BookOpen },
    { id: 'scholarships', label: 'Scholarships', icon: Award },
    { id: 'sports', label: 'Sports Navigator', icon: Activity },
    { id: 'skills', label: 'Class 8-10 Skills', icon: Sparkles },
    { id: 'mentors', label: 'Talk to Mentors', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      {/* Top Notification Bar for Safety & Demo Quick-Loader */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3 mr-1" /> Guardian Shield Active
            </span>
            <span className="hidden sm:inline text-slate-300">
              Circumstances guide strategy, not potential. Minor safety safeguards enabled.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Quick Demo Student:</span>
            <select
              value={activeProfile.id}
              onChange={(e) => loadDemoProfile(e.target.value)}
              className="bg-slate-800 text-brand-300 text-xs rounded border border-slate-700 px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-brand-400"
            >
              {DEMO_PROFILES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (Class {p.classLevel} - {p.targetCareerGoal?.split(' ')[0] || 'Aspirant'})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse-subtle" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-['Outfit']">
                  PathWise <span className="text-brand-600">India</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 bg-brand-50 text-brand-700 border border-brand-200 rounded">
                  Class 8?12
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">AI Career Navigation & Decision Trees</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-brand-50 text-brand-700 border border-brand-200 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Role Selector & Chat Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('chatbot')}
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-semibold shadow-sm hover:from-brand-700 hover:to-indigo-700 transition"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="hidden sm:inline">Career Mentor AI</span>
              <span className="sm:hidden">AI Mentor</span>
            </button>

            {/* Role dropdown */}
            <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-100 text-xs">
              <button
                onClick={() => { setRole('student'); setActiveTab('dashboard'); }}
                className={`px-2 py-1 rounded text-xs font-medium transition ${role === 'student' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                title="Student View"
              >
                Student
              </button>
              <button
                onClick={() => { setRole('parent'); setActiveTab('parent'); }}
                className={`px-2 py-1 rounded text-xs font-medium transition ${role === 'parent' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                title="Parent View"
              >
                Parent
              </button>
              <button
                onClick={() => { setRole('admin'); setActiveTab('admin'); }}
                className={`px-2 py-1 rounded text-xs font-medium transition ${role === 'admin' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                title="Admin View"
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Sub-menu */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium shrink-0 ${
                  isActive ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Icon className="w-3 h-3" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
