import React, { useState } from 'react';
import { MOCK_JOURNEYS } from '../../data/mockJourneys';
import { 
  Briefcase, 
  ShieldCheck, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ExternalLink, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { PlacedJourney } from '../../types';

export const StudentJourneys: React.FC = () => {
  const [selectedJourney, setSelectedJourney] = useState<PlacedJourney>(MOCK_JOURNEYS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-300 text-xs font-bold mb-2">
          <Briefcase className="w-4 h-4 text-indigo-400" />
          <span>Transparent Senior Roadmaps</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">PLACED STUDENT JOURNEYS</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Real peer-contributed blueprints: from foundational college courses to tier-1 internships and job offers. Learn the real mistakes avoided, projects built, and interview strategies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: List of Journeys */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 pl-1">
            Featured Senior Blueprints
          </h3>

          {MOCK_JOURNEYS.map(journey => {
            const isSelected = selectedJourney.id === journey.id;

            return (
              <div
                key={journey.id}
                onClick={() => setSelectedJourney(journey)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-white shadow-md ring-2 ring-indigo-100'
                    : 'border-slate-200 bg-white hover:border-indigo-300 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={journey.avatar}
                    alt={journey.studentName}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-slate-900 truncate">
                        {journey.studentName}
                      </h4>
                      <span className="text-base">{journey.companyLogo}</span>
                    </div>

                    <p className="text-xs font-bold text-indigo-600">
                      {journey.targetCompany} • {journey.role}
                    </p>

                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {journey.title}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                      <span>{journey.universityName.split('(')[0]}</span>
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-sm">
                        Verified Story
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep Blueprint Breakdown */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Top Banner */}
          <div className="pb-6 border-b border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                ⭐ {selectedJourney.packageBracket}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Class of {selectedJourney.graduationYear} • {selectedJourney.branch}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {selectedJourney.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              {selectedJourney.storySummary}
            </p>
          </div>

          {/* 4-Stage Timeline Blueprint */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
              Year-by-Year Preparation Progression
            </h3>
            <div className="space-y-3">
              {selectedJourney.journeyStages.map((stg, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span>{stg.stage}</span>
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold">{stg.duration}</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-7 leading-relaxed">{stg.focus}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects That Actually Moved The Needle */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
              Resume Projects Defended in Technical Rounds
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedJourney.topProjectsBuilt.map((proj, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/50 text-xs text-slate-800 font-medium">
                  🚀 {proj}
                </div>
              ))}
            </div>
          </div>

          {/* Mistakes & Lessons (Critical Value for Underclassmen) */}
          <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Crucial Mistakes Avoided & Hard Lessons</span>
            </h3>
            <ul className="text-xs text-rose-950 space-y-2">
              {selectedJourney.mistakesAndLessons.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Resources */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
              Curated Books & Learning Material
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedJourney.recommendedResources.map((res, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{res.title}</span>
                  <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-md">
                    {res.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
