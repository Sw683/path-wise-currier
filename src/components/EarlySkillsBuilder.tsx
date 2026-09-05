import React, { useState } from 'react';
import { EARLY_SKILLS_DATABASE } from '../data/skills';
import { Sparkles, Code, Palette, MessageSquare, Calculator, ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';

export const EarlySkillsBuilder: React.FC = () => {
  const [selectedSkillId, setSelectedSkillId] = useState('python-programming');

  const skill = EARLY_SKILLS_DATABASE.find((s) => s.id === selectedSkillId) || EARLY_SKILLS_DATABASE[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Early Skill & Portfolio Builder (Class 8?10)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
            ?What skill can I learn now??
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            For Class 8?10 students, don't worry about lifetime careers yet. Master 1 high-leverage micro-skill, build 3 small projects, create your portfolio, and gain early confidence!
          </p>
        </div>
      </div>

      {/* Skills Navigation Pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {EARLY_SKILLS_DATABASE.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedSkillId(s.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-xs ${
              selectedSkillId === s.id
                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {s.skillName.split('&')[0]}
          </button>
        ))}
      </div>

      {/* Selected Skill Deep Dive Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
              {skill.category} ? {skill.recommendedClass}
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit'] mt-1">{skill.skillName}</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Estimated Time:</span>
            <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-lg">
              {skill.timeToLearnWeeks} Weeks (20 mins/day)
            </span>
          </div>
        </div>

        {/* Why Learn Now */}
        <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200 text-xs text-brand-950 leading-relaxed">
          <span className="font-bold text-brand-900 block mb-0.5">Why start in Class 8?10:</span>
          {skill.whyLearnNow}
        </div>

        {/* 3 Practice Mini-Projects */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
            <Code className="w-4 h-4 text-brand-600" /> 3 Practice Projects to Build Your Portfolio
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {skill.practiceMiniProjects.map((proj, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="w-6 h-6 rounded-lg bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center mb-2">
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">{proj.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-normal">{proj.brief}</p>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[10px] font-semibold text-brand-700">
                  ?? Deliverable: {proj.output}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Free Learning Resources & Competitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Resources */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Top Free Curated Resources</h4>
            <div className="space-y-1.5">
              {skill.learningResources.map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between text-xs text-slate-800 transition font-medium"
                >
                  <span>{res.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Portfolio & Safe Competitions */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs space-y-2">
            <h4 className="font-bold text-xs text-indigo-900 uppercase tracking-wider">Portfolio & Hackathons</h4>
            <p className="text-indigo-950 leading-relaxed">{skill.portfolioGuidance}</p>
            <div className="pt-2">
              <span className="font-bold text-indigo-900 block text-[11px] mb-1">Safe Student Competitions:</span>
              <div className="flex flex-wrap gap-1">
                {skill.safeCompetitions.map((c, i) => (
                  <span key={i} className="text-[10px] font-semibold bg-white text-indigo-800 px-2 py-0.5 rounded border border-indigo-200">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
