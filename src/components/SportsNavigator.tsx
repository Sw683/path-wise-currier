import React, { useState } from 'react';
import { SPORTS_DATABASE } from '../data/sports';
import { Activity, Award, ShieldCheck, Trophy, HeartPulse, BookOpen, ExternalLink, Sparkles } from 'lucide-react';

export const SportsNavigator: React.FC = () => {
  const [selectedSportId, setSelectedSportId] = useState('cricket');

  const sport = SPORTS_DATABASE.find((s) => s.id === selectedSportId) || SPORTS_DATABASE[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 mb-2">
            <Activity className="w-3.5 h-3.5" /> Sports Career & Dual-Career Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
            Sports Career Navigator: Grassroots to National
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200 max-w-2xl mt-1">
            Empowering Indian student-athletes with structured tier milestones, Khelo India scholarships, government sports quota jobs, and academic dual-career security.
          </p>
        </div>

        {/* Sport Selector */}
        <div className="w-full md:w-auto">
          <label className="block text-xs text-emerald-300 font-semibold mb-1">Select Sport:</label>
          <select
            value={selectedSportId}
            onChange={(e) => setSelectedSportId(e.target.value)}
            className="w-full md:w-64 px-3.5 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 text-xs font-bold focus:ring-2 focus:ring-emerald-400 focus:outline-none"
          >
            {SPORTS_DATABASE.map((s) => (
              <option key={s.id} value={s.id}>
                {s.sportName} ({s.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dual Career Strategy Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-900 to-indigo-950 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Trophy className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs sm:text-sm">
            <h3 className="font-bold text-base font-['Outfit']">The Dual-Career Strategy (Sports + Education)</h3>
            <p className="text-slate-300">
              Professional athletic careers have high uncertainty and injury risks. We recommend pairing competitive sports with a recognized academic degree (Sports Science, Commerce, Physical Ed) for lifelong financial security.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Tier Milestones */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">
          Career Progression Milestones for {sport.sportName}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sport.tierMilestones.map((tier, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between font-bold text-xs mb-2">
                  <span className="text-brand-700 bg-brand-50 px-2 py-0.5 rounded uppercase">{tier.tier.split('(')[0]}</span>
                  <span className="text-slate-500">{tier.ageRange}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">{tier.tier}</h4>
                
                <div className="space-y-1.5 text-xs text-slate-600 mb-3">
                  <span className="font-semibold text-slate-800 block text-[11px]">Key Benchmarks:</span>
                  {tier.benchmarks.map((b, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">?</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-xs">
                <span className="font-semibold text-slate-800 block text-[11px] mb-1">Key Tournaments:</span>
                <div className="flex flex-wrap gap-1">
                  {tier.tournaments.map((t, i) => (
                    <span key={i} className="text-[10px] font-medium bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dual Degree & PSU Quota Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Government Sports Quota Jobs */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3">
            <ShieldCheck className="w-4 h-4" /> Government Sports Quota Recruitment (5% Quota)
          </div>
          <h3 className="text-base font-bold text-slate-900 font-['Outfit'] mb-3">
            Public Sector Employers for {sport.sportName} Athletes
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            {sport.psuRecruitmentSectors.map((sec, idx) => (
              <li key={idx} className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{sec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dual-Career Recommended Degrees */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700 mb-3">
            <BookOpen className="w-4 h-4" /> Compatible Academic Degrees
          </div>
          <h3 className="text-base font-bold text-slate-900 font-['Outfit'] mb-3">
            Degrees with Sports Quota & Flexible Attendance
          </h3>
          <ul className="space-y-2 text-xs text-slate-700">
            {sport.dualCareerDegrees.map((deg, idx) => (
              <li key={idx} className="p-2.5 rounded-xl bg-brand-50/50 border border-brand-100 flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-brand-200 text-brand-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{deg}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};
