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
  Sliders,
  Globe,
  Briefcase,
  Scale,
  Rocket,
  Brain,
  Layers,
} from 'lucide-react';
import { DEMO_PROFILES } from '../data/demoProfiles';
import { PathWiseMark } from './PathWiseMark';

export const Navbar: React.FC = () => {
  const { role, setRole, activeTab, setActiveTab, activeProfile, loadDemoProfile, guardianShieldActive } = useApp();

  const campusNavItems = [
    { id: 'campus-feed', label: 'Campus Feed & Media', icon: Globe },
    { id: 'campus-teams', label: 'Squad / Team Finder', icon: Users },
    { id: 'campus-placements', label: 'Placement Journeys', icon: Briefcase },
    { id: 'campus-compare', label: 'Compare Colleges & ROI', icon: Scale },
    { id: 'campus-fellowships', label: 'Fellowships & Funding', icon: Rocket },
    { id: 'campus-profiler', label: 'AI Fit & ID Standing', icon: Brain },
  ];

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'campus-feed', label: 'Campus Network', icon: Globe, highlight: true },
    { id: 'dashboard', label: 'My Roadmap', icon: Map },
    { id: 'simulator', label: 'What-If Simulator', icon: Cpu },
    { id: 'tree', label: 'Career Tree', icon: Sparkles },
    { id: 'compare', label: 'Career Compare', icon: Activity },
    { id: 'knowledge', label: 'Knowledge', icon: UserCheck },
    { id: 'exams', label: 'Exams & CETs', icon: BookOpen },
    { id: 'scholarships', label: 'Scholarships', icon: Award },
    { id: 'skills', label: 'Skills', icon: Sparkles },
    { id: 'mentors', label: 'Mentors', icon: Users },
  ];

  const isCampusActive = activeTab.startsWith('campus-');

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
              UniSphere Cross-University Student Network • Real-time Placements & Fellowship Grants
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Student Profile:</span>
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
            onClick={() => setActiveTab('campus-feed')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <PathWiseMark size="md" />
            <div>
              <span className="text-xs font-black text-brand-600 uppercase tracking-wider block">UniSphere</span>
              <p className="text-[10px] text-slate-500 hidden sm:block">Campus Network & Career Intelligence</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
            {navItems.map((item: any) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.id === 'campus-feed' && isCampusActive);
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-brand-50 text-brand-700 border border-brand-200 shadow-sm' 
                      : item.highlight
                      ? 'bg-slate-900 text-white hover:bg-black shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-600' : item.highlight ? 'text-brand-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Role Selector & Chat Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('chatbot')}
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-600 to-ocean-700 text-white text-xs font-semibold shadow-sm hover:from-brand-700 hover:to-ocean-800 transition"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="hidden sm:inline">AI Career Mentor</span>
              <span className="sm:hidden">AI</span>
            </button>

            {/* Role dropdown */}
            <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-100 text-xs">
              <button
                onClick={() => { setRole('student'); setActiveTab('campus-feed'); }}
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
      </div>

      {/* UniSphere Campus Network Hub Sub-Navbar */}
      <div className="bg-slate-900 text-white border-t border-slate-800 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-black bg-brand-500 text-white shadow-xs">
              <Sparkles className="w-3 h-3 text-white" />
              UNISPHERE
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">Inter-College Hub:</span>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {campusNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-brand-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
