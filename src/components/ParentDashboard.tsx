import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateEducationCost } from '../utils/inflationCalculator';
import { Calculator, ShieldCheck, Heart, BookOpen, AlertCircle, Coins, CheckCircle2, TrendingUp } from 'lucide-react';

export const ParentDashboard: React.FC = () => {
  const { activeProfile } = useApp();

  const [currentDegreeCost, setCurrentDegreeCost] = useState<number>(600000);
  const [inflationRate, setInflationRate] = useState<number>(9);
  const [returnRate, setReturnRate] = useState<number>(12);

  const projection = calculateEducationCost(
    Number(activeProfile.classLevel) || 10,
    currentDegreeCost,
    inflationRate / 100,
    returnRate / 100
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
          <Heart className="w-3.5 h-3.5" /> Parent Guidance & Financial Planning View
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
          Parent Dashboard: Planning for {activeProfile.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
          Designed specifically to help Indian parents calculate future higher education costs, understand stream realities, reduce exam anxiety, and support their children without societal pressure.
        </p>
      </div>

      {/* Higher Education Inflation & SIP Calculator */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-600" />
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">
              College Education Inflation & Monthly SIP Planner
            </h2>
          </div>
          <span className="text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-lg">
            Target Year: {projection.targetYear} ({projection.yearsFromNow} Years to College)
          </span>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="text-xs font-bold text-slate-800 block mb-1">
              Current 4-Year College Cost (Today):
            </label>
            <span className="text-lg font-black text-brand-600 block mb-2 font-['Outfit']">
              ?{(currentDegreeCost / 100000).toFixed(1)} Lakhs
            </span>
            <input
              type="range"
              min="100000"
              max="2500000"
              step="50000"
              value={currentDegreeCost}
              onChange={(e) => setCurrentDegreeCost(Number(e.target.value))}
              className="w-full accent-brand-600"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="text-xs font-bold text-slate-800 block mb-1">
              Higher Education Inflation Rate:
            </label>
            <span className="text-lg font-black text-brand-600 block mb-2 font-['Outfit']">
              {inflationRate}% per annum
            </span>
            <input
              type="range"
              min="5"
              max="15"
              step="0.5"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="w-full accent-brand-600"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="text-xs font-bold text-slate-800 block mb-1">
              Expected Investment Return:
            </label>
            <span className="text-lg font-black text-brand-600 block mb-2 font-['Outfit']">
              {returnRate}% per annum (Mutual Funds)
            </span>
            <input
              type="range"
              min="8"
              max="16"
              step="0.5"
              value={returnRate}
              onChange={(e) => setReturnRate(Number(e.target.value))}
              className="w-full accent-brand-600"
            />
          </div>
        </div>

        {/* Projection Outputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-brand-50/70 border border-brand-200">
            <span className="text-xs text-brand-800 font-semibold block">Future Estimated Cost in {projection.targetYear}:</span>
            <span className="text-2xl font-black text-brand-900 font-['Outfit'] block mt-1">
              ?{(projection.estimatedFutureCost / 100000).toFixed(2)} Lakhs
            </span>
            <span className="text-[11px] text-brand-700 mt-1 block">Factoring {inflationRate}% compounding inflation</span>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-xs text-emerald-800 font-semibold block">Suggested Monthly SIP from Today:</span>
            <span className="text-2xl font-black text-emerald-900 font-['Outfit'] block mt-1">
              ?{projection.suggestedMonthlySIP.toLocaleString('en-IN')}/mo
            </span>
            <span className="text-[11px] text-emerald-700 mt-1 block">To build 100% corpus debt-free</span>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200">
            <span className="text-xs text-purple-800 font-semibold block">Gov College / Low-Cost Option:</span>
            <span className="text-2xl font-black text-purple-900 font-['Outfit'] block mt-1">
              ?{(projection.governmentCollegeEstimatedCost / 100000).toFixed(2)} Lakhs
            </span>
            <span className="text-[11px] text-purple-700 mt-1 block">State Universities & Central Institutions</span>
          </div>
        </div>
      </div>

      {/* Stream Myth-Buster Guide for Indian Parents */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">
          Indian Stream Realities: Debunking Common Myths
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="text-red-500 font-black">? Myth:</span> ?Only Science (PCM/PCB) leads to high salaries.?
            </div>
            <div className="text-slate-600 leading-relaxed">
              <span className="text-emerald-700 font-bold">? Reality:</span> Chartered Accountants, Corporate Lawyers from NLUs, IIM IPM graduates, and Product UI Designers frequently start with ?12??22 LPA starting packages, comparable to or exceeding average engineering packages.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <span className="text-red-500 font-black">? Myth:</span> ?Taking expensive ?2 Lakh/year coaching guarantees IIT/AIIMS.?
            </div>
            <div className="text-slate-600 leading-relaxed">
              <span className="text-emerald-700 font-bold">? Reality:</span> JEE Advanced selection rate is under 1.5% and NEET MBBS is under 2.5%. Consistent daily study (3-4 hours) using free YouTube resources and NCERT with emotional well-being yields higher sustained performance.
            </div>
          </div>
        </div>
      </div>

      {/* Student Mental Health & Parental Stress Management */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-900 to-slate-900 text-white shadow-md flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-brand-400 shrink-0 mt-1" />
        <div className="space-y-1 text-xs sm:text-sm">
          <h3 className="font-bold text-base font-['Outfit']">Golden Rule for Parents during Class 10?12</h3>
          <p className="text-slate-300 leading-relaxed">
            Ensure your child knows that failure in a single entrance exam is not a failure of character. Reassure them that PathWise provides solid Backup and Low-Cost pathways so their future is always protected.
          </p>
        </div>
      </div>

    </div>
  );
};
