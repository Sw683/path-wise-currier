import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  Target, 
  TrendingUp, 
  LifeBuoy, 
  Coins, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  ArrowRight, 
  AlertCircle, 
  BookOpen, 
  Clock, 
  Download, 
  Share2, 
  HelpCircle,
  Cpu,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CAREER_PATHS } from '../data/careers';
import { ExamPreparationPanel } from './ExamPreparationPanel';

export const RoadmapDashboard: React.FC = () => {
  const { activeProfile, recommendations, setActiveTab } = useApp();

  const defaultChecklist = [
    { id: 'starter-item', text: 'Review the top recommendation and build your next 30-day plan.', completed: false }
  ];

  const topRec = recommendations[0] || null;
  const [checklist, setChecklist] = useState<{ id: string; text: string; completed: boolean }[]>(() =>
    topRec?.next30DaysChecklist?.length ? topRec.next30DaysChecklist : defaultChecklist
  );

  useEffect(() => {
    setChecklist(topRec?.next30DaysChecklist?.length ? topRec.next30DaysChecklist : defaultChecklist);
  }, [topRec]);

  const [expandedCareer, setExpandedCareer] = useState<string | null>(null);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const topCareerData = topRec ? CAREER_PATHS.find((c) => c.id === topRec.careerId) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner: Student Snapshot */}
      <div className="bg-gradient-to-r from-slate-950 via-ocean-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Personalized AI Career Decision Matrix
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
            Roadmap for {activeProfile.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Class {activeProfile.classLevel} ? {activeProfile.state} ({activeProfile.cityTier}) ? {activeProfile.schoolType} Board ? Goal: <span className="text-brand-300 font-semibold">{activeProfile.targetCareerGoal || 'Engineering / AI'}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('simulator')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition shadow-sm"
          >
            <Cpu className="w-4 h-4" /> What-If Simulator
          </button>
          <button
            onClick={() => setActiveTab('tree')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition border border-white/20"
          >
            <Layers className="w-4 h-4" /> Career Tree View
          </button>
        </div>
      </div>

      <ExamPreparationPanel />

      {/* 4-Tier Strategy Framework Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">Your 4-Tier Strategy Breakdown</h2>
            <p className="text-xs text-slate-500">
              Circumstances guide strategy, not potential. Here is your customized 4-path roadmap for <span className="font-semibold text-brand-700">{topRec?.careerTitle || 'Your Goal'}</span>.
            </p>
          </div>
          {topRec && (
            <div className="text-right">
              <span className="text-xs text-slate-400 font-medium block">AI Compatibility Match</span>
              <span className="text-xl font-black text-brand-600 font-['Outfit']">{topRec.compatibilityScore}% Match</span>
            </div>
          )}
        </div>

        {/* 4 Strategy Cards */}
        {topCareerData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Path A: High Probability */}
            <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition">
              <div>
                <div className="flex items-center gap-2 text-emerald-700 text-xs font-extrabold uppercase tracking-wider mb-2">
                  <Target className="w-4 h-4" /> High-Probability Path
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">{topCareerData.highProbabilityPath.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {topCareerData.highProbabilityPath.description}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] text-emerald-800 font-medium">
                ?? Prep: {topCareerData.highProbabilityPath.prepStrategy}
              </div>
            </div>

            {/* Path B: Ambitious Dream */}
            <div className="p-5 rounded-2xl bg-white border border-purple-200 shadow-sm flex flex-col justify-between hover:border-purple-300 transition">
              <div>
                <div className="flex items-center gap-2 text-purple-700 text-xs font-extrabold uppercase tracking-wider mb-2">
                  <TrendingUp className="w-4 h-4" /> Ambitious Dream Path
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">{topCareerData.ambitiousPath.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {topCareerData.ambitiousPath.description}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] text-purple-800 font-medium">
                ? Focus: {topCareerData.ambitiousPath.prepStrategy}
              </div>
            </div>

            {/* Path C: Solid Backup */}
            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm flex flex-col justify-between hover:border-amber-300 transition">
              <div>
                <div className="flex items-center gap-2 text-amber-700 text-xs font-extrabold uppercase tracking-wider mb-2">
                  <LifeBuoy className="w-4 h-4" /> Solid Backup Path
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">{topCareerData.backupPath.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {topCareerData.backupPath.description}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] text-amber-800 font-medium">
                ??? Recovery: {topCareerData.backupPath.recoveryStrategy}
              </div>
            </div>

            {/* Path D: Low-Cost / High-ROI */}
            <div className="p-5 rounded-2xl bg-white border border-blue-200 shadow-sm flex flex-col justify-between hover:border-blue-300 transition">
              <div>
                <div className="flex items-center gap-2 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-2">
                  <Coins className="w-4 h-4" /> Low-Cost / High-ROI Path
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">{topCareerData.lowCostPath.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {topCareerData.lowCostPath.description}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] text-blue-800 font-medium">
                ?? Free Tools: {topCareerData.lowCostPath.freeResources[0]}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Grid: Explainability + Class 11 Stream + 30-Day Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1 & 2: Explainability & Stream Selection */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Why This Recommendation Card */}
          {topRec && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7">
              <div className="flex items-center gap-2 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
                <HelpCircle className="w-4 h-4" /> ?Why This Recommendation?? Explainability
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-3">
                Why {topRec.streamRecommendation} Stream & {topRec.careerTitle}?
              </h3>
              
              <ul className="space-y-2.5 mb-6">
                {topRec.whyThisRecommendation.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>

              {/* Class 11 Stream Rationale */}
              <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-brand-900">Recommended Class 11 Stream:</span>
                  <span className="px-3 py-1 bg-brand-600 text-white font-extrabold text-xs rounded-lg shadow-xs">
                    {topRec.streamRecommendation} (Physics, Chemistry, Maths)
                  </span>
                </div>
                <p className="text-xs text-brand-800 leading-relaxed mt-1">
                  PCM keeps multiple technical pathways open (Software/AI, Aerospace, Pure Research via IISERs, Defense via NDA) while allowing low-cost state engineering alternatives.
                </p>
              </div>
            </div>
          )}

          {/* Timeline Stages Component */}
          {topCareerData && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7">
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-600" /> Milestone Progression Timeline
              </h3>

              <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                {topCareerData.timelineStages.map((st, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 pl-8">
                    <div className="absolute left-1.5 top-1 w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] flex items-center justify-center font-bold ring-4 ring-white">
                      {idx + 1}
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs w-full">
                      <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                        <span>{st.stage}</span>
                        <span className="text-[10px] font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                          {st.classRange}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-normal">{st.action}</p>
                      {st.fallbackOption && (
                        <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] text-amber-700 flex items-center gap-1.5">
                          <LifeBuoy className="w-3.5 h-3.5 shrink-0" />
                          <span>Fallback: {st.fallbackOption}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Col 3: Actionable 30-Day Checklist & 6-Month Goals */}
        <div className="space-y-6">
          
          {/* 30 Days Action Checklist */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm font-['Outfit'] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600" /> My Next 30 Days Actions
              </h3>
              <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                {checklist.filter((i) => i.completed).length} / {checklist.length} Done
              </span>
            </div>

            <div className="space-y-2.5">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 cursor-pointer transition ${
                    item.completed 
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 line-through' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-snug">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 6 Months Strategic Goals */}
          {topRec && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 text-sm font-['Outfit'] mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-ocean-600" /> Next 6 Months Strategic Goals
              </h3>

              <div className="space-y-2.5">
                {topRec.next6MonthsMilestones.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-ocean-50/50 border border-ocean-100 text-xs text-ocean-950 flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-ocean-200 text-ocean-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mentor Fast Connect */}
          <div className="p-5 rounded-3xl bg-gradient-to-tr from-brand-600 to-ocean-700 text-white shadow-md">
            <h4 className="font-bold text-sm font-['Outfit'] mb-1">Talk to an AI Engineer / Mentor</h4>
            <p className="text-xs text-brand-100 mb-3 leading-normal">
              Book a verified 30-min consultation (?99??199 / Free for EWS) with guardian consent.
            </p>
            <button
              onClick={() => setActiveTab('mentors')}
              className="w-full py-2 px-3 rounded-xl bg-white hover:bg-brand-50 text-brand-700 font-bold text-xs shadow-sm transition text-center block"
            >
              Browse Verified Mentors
            </button>
          </div>

        </div>

      </div>

      {/* Other Ranked Recommendations List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-4">
          All Ranked Career Compatibility Matches
        </h3>

        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <div
              key={rec.careerId}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-300 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{rec.careerTitle}</h4>
                    <span className="text-[11px] text-slate-500">Stream: {rec.streamRecommendation}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-black text-brand-600">{rec.compatibilityScore}% Match</span>
                  </div>
                  <button
                    onClick={() => setExpandedCareer(expandedCareer === rec.careerId ? null : rec.careerId)}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                  >
                    {expandedCareer === rec.careerId ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {expandedCareer === rec.careerId && (
                <div className="mt-3 pt-3 border-t border-slate-200 text-xs space-y-2 text-slate-600">
                  <div className="font-semibold text-slate-800">Key Rationale:</div>
                  <ul className="list-disc pl-4 space-y-1">
                    {rec.whyThisRecommendation.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setActiveTab('simulator')}
                      className="px-3 py-1 bg-brand-50 text-brand-700 rounded-lg text-xs font-semibold border border-brand-200"
                    >
                      Simulate Path in Simulator ?
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
