import React, { useState } from 'react';
import { UNIVERSITY_PLACEMENT_DATA, COLLEGES } from '../../data/campusData';
import { UniversityPlacementStats } from '../../types/campus';
import {
  BarChart3,
  TrendingUp,
  Award,
  DollarSign,
  Scale,
  CheckCircle2,
  Building,
  GraduationCap,
  ArrowRight,
  Info,
} from 'lucide-react';

export const UniversityPlacementCompare: React.FC = () => {
  const [college1Id, setCollege1Id] = useState<string>('iit-bombay');
  const [college2Id, setCollege2Id] = useState<string>('bits-pilani');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'avgCtc' | 'medianCtc' | 'placementRate' | 'roi'>('avgCtc');

  const c1 = UNIVERSITY_PLACEMENT_DATA.find((c) => c.collegeId === college1Id) || UNIVERSITY_PLACEMENT_DATA[0];
  const c2 = UNIVERSITY_PLACEMENT_DATA.find((c) => c.collegeId === college2Id) || UNIVERSITY_PLACEMENT_DATA[1];

  // Branch-specific or overall values
  const getBranchData = (uni: UniversityPlacementStats) => {
    if (selectedBranch === 'all') {
      return {
        avgCtc: uni.averageCtcLPA,
        medianCtc: uni.medianCtcLPA,
        highestCtc: uni.highestCtcLPA,
        placementRate: uni.overallPlacementRate,
      };
    }
    const match = uni.branchBreakdown.find((b) =>
      b.branchName.toLowerCase().includes(selectedBranch.toLowerCase())
    );
    if (match) {
      return {
        avgCtc: match.averageCtcLPA,
        medianCtc: match.medianCtcLPA,
        highestCtc: match.highestCtcLPA,
        placementRate: match.placementRate,
      };
    }
    return {
      avgCtc: uni.averageCtcLPA,
      medianCtc: uni.medianCtcLPA,
      highestCtc: uni.highestCtcLPA,
      placementRate: uni.overallPlacementRate,
    };
  };

  const d1 = getBranchData(c1);
  const d2 = getBranchData(c2);

  const maxCtc = Math.max(d1.avgCtc, d2.avgCtc, 40);

  // Sorted list for overview table
  const sortedColleges = [...UNIVERSITY_PLACEMENT_DATA].sort((a, b) => {
    if (sortBy === 'avgCtc') return b.averageCtcLPA - a.averageCtcLPA;
    if (sortBy === 'medianCtc') return b.medianCtcLPA - a.medianCtcLPA;
    if (sortBy === 'placementRate') return b.overallPlacementRate - a.overallPlacementRate;
    if (sortBy === 'roi') return b.roiRatio - a.roiRatio;
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
              <Scale className="w-3 h-3 text-indigo-400" />
              University Outcome Intelligence
            </span>
            <span className="text-xs text-slate-400">Data-driven Placement Engine</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            University & Branch Placement Comparison
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Compare verified university placement statistics, branch CTC averages, median packages, tuition ROI, and top hiring firms to make informed college decisions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-center min-w-[120px]">
            <div className="text-xs text-slate-300">Highest Tracked</div>
            <div className="text-xl font-bold text-amber-400">₹1.68 Cr</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-center min-w-[120px]">
            <div className="text-xs text-slate-300">Avg Tech Placement</div>
            <div className="text-xl font-bold text-emerald-400">92.4%</div>
          </div>
        </div>
      </div>

      {/* Head-to-Head Comparison Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-600" />
              Side-by-Side Comparison Arena
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select two universities and filter by specific engineering branch to see relative packages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Filter Branch:</span>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-medium text-slate-800 focus:outline-none"
            >
              <option value="all">All Branches (Overall)</option>
              <option value="computer science">Computer Science & Eng (CSE)</option>
              <option value="electronics">Electronics & Comm (ECE)</option>
              <option value="mechanical">Mechanical Engineering</option>
            </select>
          </div>
        </div>

        {/* University Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* University 1 Select */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">University 1</label>
            <select
              value={college1Id}
              onChange={(e) => setCollege1Id(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              {UNIVERSITY_PLACEMENT_DATA.map((c) => (
                <option key={c.collegeId} value={c.collegeId}>
                  {c.collegeName} ({c.tier} - NIRF #{c.nirfEngineeringRank})
                </option>
              ))}
            </select>
          </div>

          {/* University 2 Select */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">University 2</label>
            <select
              value={college2Id}
              onChange={(e) => setCollege2Id(e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              {UNIVERSITY_PLACEMENT_DATA.map((c) => (
                <option key={c.collegeId} value={c.collegeId}>
                  {c.collegeName} ({c.tier} - NIRF #{c.nirfEngineeringRank})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Visual Metric Bar Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Card 1 */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {c1.tier} • NIRF #{c1.nirfEngineeringRank}
                </span>
                <h3 className="text-base font-bold text-slate-900">{c1.collegeName}</h3>
                <div className="text-xs text-slate-500">{c1.location}</div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {d1.placementRate}% Placed
                </span>
              </div>
            </div>

            {/* Bars */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-600">Average CTC:</span>
                  <span className="font-bold text-brand-600">₹{d1.avgCtc.toFixed(1)} LPA</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (d1.avgCtc / maxCtc) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-600">Median Package:</span>
                  <span className="font-bold text-indigo-600">₹{d1.medianCtc.toFixed(1)} LPA</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (d1.medianCtc / maxCtc) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-600">Highest Package:</span>
                  <span className="font-bold text-slate-900">₹{d1.highestCtc.toFixed(1)} LPA</span>
                </div>
              </div>
            </div>

            {/* Tuition and ROI */}
            <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">4-Year Tuition:</span>
                <span className="font-bold text-slate-800">
                  ₹{((c1.annualTuitionINR * 4) / 100000).toFixed(1)} Lakhs
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">ROI Ratio (Package/Fees):</span>
                <span className="font-bold text-emerald-600">{c1.roiRatio.toFixed(1)}x Return</span>
              </div>
            </div>

            {/* Top Recruiters */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-700 block mb-1.5">
                Top Recruiters:
              </span>
              <div className="flex flex-wrap gap-1">
                {c1.topRecruiters.map((r, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                  >
                    {r.name} ({r.hiresCount})
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {c2.tier} • NIRF #{c2.nirfEngineeringRank}
                </span>
                <h3 className="text-base font-bold text-slate-900">{c2.collegeName}</h3>
                <div className="text-xs text-slate-500">{c2.location}</div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {d2.placementRate}% Placed
                </span>
              </div>
            </div>

            {/* Bars */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-600">Average CTC:</span>
                  <span className="font-bold text-brand-600">₹{d2.avgCtc.toFixed(1)} LPA</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (d2.avgCtc / maxCtc) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-600">Median Package:</span>
                  <span className="font-bold text-indigo-600">₹{d2.medianCtc.toFixed(1)} LPA</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (d2.medianCtc / maxCtc) * 100)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-600">Highest Package:</span>
                  <span className="font-bold text-slate-900">₹{d2.highestCtc.toFixed(1)} LPA</span>
                </div>
              </div>
            </div>

            {/* Tuition and ROI */}
            <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">4-Year Tuition:</span>
                <span className="font-bold text-slate-800">
                  ₹{((c2.annualTuitionINR * 4) / 100000).toFixed(1)} Lakhs
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">ROI Ratio (Package/Fees):</span>
                <span className="font-bold text-emerald-600">{c2.roiRatio.toFixed(1)}x Return</span>
              </div>
            </div>

            {/* Top Recruiters */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-700 block mb-1.5">
                Top Recruiters:
              </span>
              <div className="flex flex-wrap gap-1">
                {c2.topRecruiters.map((r, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                  >
                    {r.name} ({r.hiresCount})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Verdict Box */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-indigo-950">
            <span className="font-bold">Comparative Insight: </span>
            {d1.avgCtc > d2.avgCtc ? (
              <span>
                <strong>{c1.collegeName}</strong> offers a higher average package (₹{d1.avgCtc} LPA vs ₹{d2.avgCtc} LPA).{' '}
                {c1.roiRatio > c2.roiRatio
                  ? `It also provides significantly better financial ROI due to subsidized tuition fees.`
                  : `However, ${c2.collegeName} has strong private alumni recruitment channels.`}
              </span>
            ) : (
              <span>
                <strong>{c2.collegeName}</strong> leads in package metrics (₹{d2.avgCtc} LPA vs ₹{d1.avgCtc} LPA) for {selectedBranch === 'all' ? 'overall batches' : selectedBranch}.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Tuition vs Placement Payback ROI Calculator */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">
                Interactive Tuition vs Placement ROI Payback Calculator
              </h2>
            </div>
            <p className="text-xs text-slate-300">
              Calculate exact degree breakeven months, monthly take-home savings, and 5-year post-grad wealth creation.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase text-emerald-400 font-bold tracking-wider">
              Selected Target
            </span>
            <div className="text-xs font-bold text-white">{c1.collegeName}</div>
          </div>
        </div>

        {/* Calculator Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="block text-slate-300 font-semibold">Target University for ROI</label>
            <select
              value={college1Id}
              onChange={(e) => setCollege1Id(e.target.value)}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            >
              {UNIVERSITY_PLACEMENT_DATA.map((c) => (
                <option key={c.collegeId} value={c.collegeId}>
                  {c.collegeName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-slate-300 font-semibold">Scholarship / Fee Concession</label>
            <select
              defaultValue="0"
              id="scholarship-select"
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            >
              <option value="0">0% (Full Tuition)</option>
              <option value="0.25">25% Merit / EWS Concession</option>
              <option value="0.50">50% Half Waiver</option>
              <option value="1">100% Full Tuition Free</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-slate-300 font-semibold">Estimated Monthly Living & Hostel</label>
            <select
              defaultValue="10000"
              id="hostel-select"
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            >
              <option value="6000">₹6,000 / month (Standard Hostel)</option>
              <option value="10000">₹10,000 / month (AC / Private PG)</option>
              <option value="15000">₹15,000 / month (Metro City Living)</option>
            </select>
          </div>
        </div>

        {/* Computed Metrics Strip */}
        {(() => {
          const fourYearTuition = c1.annualTuitionINR * 4;
          const fourYearLiving = 10000 * 40; // 40 months
          const totalDegreeCost = fourYearTuition + fourYearLiving;
          const avgGrossLpa = d1.avgCtc;
          const estimatedMonthlyInHand = Math.round(((avgGrossLpa * 100000) * 0.72) / 12);
          const monthlySavings = Math.round(estimatedMonthlyInHand * 0.55);
          const paybackMonths = Math.max(1, Math.round(totalDegreeCost / monthlySavings));
          const fiveYearNetSurplus = (monthlySavings * 60) - totalDegreeCost;

          return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-medium block">
                  Total Degree Investment
                </span>
                <div className="text-lg font-black text-white">
                  ₹{(totalDegreeCost / 100000).toFixed(1)} Lakhs
                </div>
                <div className="text-[10px] text-slate-400">4-Year Tuition + Living</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-medium block">
                  Est. In-Hand Monthly
                </span>
                <div className="text-lg font-black text-brand-400">
                  ₹{estimatedMonthlyInHand.toLocaleString()} / mo
                </div>
                <div className="text-[10px] text-slate-400">Post-tax initial in-hand</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-medium block">
                  Payback Breakeven Period
                </span>
                <div className="text-lg font-black text-emerald-400">
                  {paybackMonths} Months
                </div>
                <div className="text-[10px] text-slate-400">
                  {(paybackMonths / 12).toFixed(1)} years to recover full cost
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 font-medium block">
                  5-Year Net Wealth Surplus
                </span>
                <div className="text-lg font-black text-indigo-400">
                  +₹{(fiveYearNetSurplus / 100000).toFixed(1)} Lakhs
                </div>
                <div className="text-[10px] text-slate-400">Net savings over degree cost</div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Comprehensive University Ranking & Placement Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">National University Placement Matrix</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified dataset comparing Tier-1 & Tier-2 engineering colleges in India.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Sort by:</span>
            <button
              onClick={() => setSortBy('avgCtc')}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                sortBy === 'avgCtc' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Avg CTC
            </button>
            <button
              onClick={() => setSortBy('medianCtc')}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                sortBy === 'medianCtc' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              Median CTC
            </button>
            <button
              onClick={() => setSortBy('roi')}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                sortBy === 'roi' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              ROI Ratio
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">University</th>
                <th className="py-3 px-3">Tier & NIRF</th>
                <th className="py-3 px-3 text-right">Avg CTC</th>
                <th className="py-3 px-3 text-right">Median CTC</th>
                <th className="py-3 px-3 text-right">Highest CTC</th>
                <th className="py-3 px-3 text-right">Placement %</th>
                <th className="py-3 px-3 text-right">Tuition ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedColleges.map((col) => (
                <tr key={col.collegeId} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-3 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-brand-500" />
                      <span>{col.collegeName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600">
                    <span className="font-semibold text-slate-800">{col.tier}</span> • Rank #{col.nirfEngineeringRank}
                  </td>
                  <td className="py-3.5 px-3 text-right font-black text-brand-600">
                    ₹{col.averageCtcLPA} LPA
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-indigo-600">
                    ₹{col.medianCtcLPA} LPA
                  </td>
                  <td className="py-3.5 px-3 text-right font-semibold text-slate-800">
                    ₹{col.highestCtcLPA} LPA
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                      {col.overallPlacementRate}%
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-slate-800">
                    {col.roiRatio}x
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
