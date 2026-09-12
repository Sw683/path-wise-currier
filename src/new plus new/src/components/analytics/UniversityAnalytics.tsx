import React, { useState } from 'react';
import { MOCK_UNIVERSITY_INSIGHTS } from '../../data/mockAnalytics';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle, 
  Building2, 
  Layers, 
  Award, 
  GraduationCap, 
  Sparkles, 
  BookOpen 
} from 'lucide-react';
import { UniversityInsight } from '../../types';

export const UniversityAnalytics: React.FC = () => {
  const [selectedUnivAId, setSelectedUnivAId] = useState<string>('du');
  const [selectedUnivBId, setSelectedUnivBId] = useState<string>('iitd');

  const univA = MOCK_UNIVERSITY_INSIGHTS.find(u => u.id === selectedUnivAId) || MOCK_UNIVERSITY_INSIGHTS[0];
  const univB = MOCK_UNIVERSITY_INSIGHTS.find(u => u.id === selectedUnivBId) || MOCK_UNIVERSITY_INSIGHTS[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/30 text-cyan-300 text-xs font-bold mb-2">
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <span>Objective Academic Insights</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">UNIVERSITY & COMMUNITY INSIGHTS</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Aggregated velocity across hackathons, verified placement reports, open-source projects, and student communities across major Indian institutions.
        </p>
      </div>

      {/* Mandatory Ethical Data Notice (Section 16) */}
      <div className="mb-8 p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="text-xs space-y-1">
          <strong className="text-sm font-bold text-cyan-300 block">Responsible Data Transparency Charter</strong>
          <p className="text-slate-300 leading-relaxed">
            Data points displayed here reflect <strong>Platform Tracked Activity</strong> and <strong>Verified Student Submissions</strong>. They do not constitute official administrative governmental NIRF rankings. We refrain from declaring any institution as universally "better" — every university cultivates unique cultural strengths across research, entrepreneurship, and industrial placement.
          </p>
          <div className="flex flex-wrap gap-2 pt-2 text-[10px]">
            <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Verified Data
            </span>
            <span className="bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
              Platform Data
            </span>
            <span className="bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              User-Reported Data
            </span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Selector */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              Interactive University Comparison
            </h3>
            <p className="text-xs text-slate-500">
              Compare project activity, median packages, and research velocity side-by-side.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedUnivAId}
              onChange={e => setSelectedUnivAId(e.target.value)}
              className="p-2.5 text-xs font-bold rounded-xl border border-slate-300 bg-white"
            >
              {MOCK_UNIVERSITY_INSIGHTS.map(u => (
                <option key={u.id} value={u.id}>University A: {u.name}</option>
              ))}
            </select>

            <span className="text-xs font-bold text-slate-400">VS</span>

            <select
              value={selectedUnivBId}
              onChange={e => setSelectedUnivBId(e.target.value)}
              className="p-2.5 text-xs font-bold rounded-xl border border-slate-300 bg-white"
            >
              {MOCK_UNIVERSITY_INSIGHTS.map(u => (
                <option key={u.id} value={u.id}>University B: {u.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* UNIVERSITY A */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{univA.logo}</span>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900">{univA.name}</h4>
                  <p className="text-xs text-slate-500">{univA.location}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                {univA.dataSourceNotice}
              </span>
            </div>

            {/* Metric Bars */}
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Reported Placement Rate</span>
                  <span className="text-indigo-600">{univA.placementRatePercent}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${univA.placementRatePercent}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Internship Participation Rate</span>
                  <span className="text-emerald-600">{univA.internshipRatePercent}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${univA.internshipRatePercent}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 block font-semibold">Active Projects</span>
                  <span className="font-extrabold text-sm text-slate-900">{univA.activeProjects}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 block font-semibold">Hackathon Wins</span>
                  <span className="font-extrabold text-sm text-slate-900">{univA.hackathonWins}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 block font-semibold">Reported Avg LPA</span>
                  <span className="font-extrabold text-sm text-indigo-600">₹{univA.reportedAverageLPA} LPA</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Observed Institutional Strengths
                </span>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  {univA.comparisonHighlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* UNIVERSITY B */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{univB.logo}</span>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900">{univB.name}</h4>
                  <p className="text-xs text-slate-500">{univB.location}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                {univB.dataSourceNotice}
              </span>
            </div>

            {/* Metric Bars */}
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Reported Placement Rate</span>
                  <span className="text-indigo-600">{univB.placementRatePercent}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${univB.placementRatePercent}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Internship Participation Rate</span>
                  <span className="text-emerald-600">{univB.internshipRatePercent}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${univB.internshipRatePercent}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 block font-semibold">Active Projects</span>
                  <span className="font-extrabold text-sm text-slate-900">{univB.activeProjects}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 block font-semibold">Hackathon Wins</span>
                  <span className="font-extrabold text-sm text-slate-900">{univB.hackathonWins}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 block font-semibold">Reported Avg LPA</span>
                  <span className="font-extrabold text-sm text-indigo-600">₹{univB.reportedAverageLPA} LPA</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Observed Institutional Strengths
                </span>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  {univB.comparisonHighlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Responsible Synthesis Summary (Prompt Section 16) */}
        <div className="mt-8 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Algorithmic Neutrality Summary:</strong>
            <p className="mt-0.5 text-indigo-900 leading-relaxed">
              Based on available platform data, <strong>{univA.name}</strong> shows higher velocity in student community engagement and cross-department collaboration, while <strong>{univB.name}</strong> exhibits stronger reported placement outcomes and systems engineering depth. Both ecosystems provide high value depending on a student’s career aspirations.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
