import React, { useState } from 'react';
import { CAREER_PATHS } from '../data/careers';
import { Sliders, CheckCircle2, XCircle, ArrowRightLeft, Sparkles } from 'lucide-react';

export const CareerComparison: React.FC = () => {
  const [career1Id, setCareer1Id] = useState('software-ai-engineer');
  const [career2Id, setCareer2Id] = useState('mbbs-doctor-healthcare');
  const [career3Id, setCareer3Id] = useState('chartered-accountant-ca');

  const c1 = CAREER_PATHS.find((c) => c.id === career1Id) || CAREER_PATHS[0];
  const c2 = CAREER_PATHS.find((c) => c.id === career2Id) || CAREER_PATHS[1];
  const c3 = CAREER_PATHS.find((c) => c.id === career3Id) || CAREER_PATHS[2];

  const careers = [c1, c2, c3];

  const parameters = [
    { label: 'Stream Required', key: 'requiredStream', render: (c: any) => c.requiredStream.join(' / ') },
    { label: 'Academic Difficulty', key: 'academicDifficulty', render: (c: any) => c.academicDifficulty },
    { label: 'Competition Intensity', key: 'competitionScore', render: (c: any) => c.competitionScore },
    { label: 'Financial Cost (Gov/Pvt)', key: 'financialRequirement', render: (c: any) => c.financialRequirement },
    { label: 'Study Duration', key: 'studyDurationYears', render: (c: any) => c.studyDurationYears },
    { label: 'Entrance Dependency', key: 'entranceExamDependency', render: (c: any) => c.entranceExamDependency },
    { label: 'Starting Salary Range', key: 'startingSalaryRange', render: (c: any) => c.startingSalaryRange },
    { label: '10-Year Mid Career CTC', key: 'midCareerSalaryRange', render: (c: any) => c.midCareerSalaryRange },
    { label: 'Job Market Risk', key: 'jobMarketRisk', render: (c: any) => c.jobMarketRisk },
    { label: 'Backup Availability', key: 'backupAvailability', render: (c: any) => c.backupAvailability }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
          <ArrowRightLeft className="w-3.5 h-3.5" /> Multi-Dimensional Career Comparator
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
          Side-by-Side Career Path Comparison
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
          Compare 3 careers across academic difficulty, competition ratios, total financial investment, study duration, starting CTC, and backup resiliency.
        </p>
      </div>

      {/* Selectors Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Career 1:</label>
          <select
            value={career1Id}
            onChange={(e) => setCareer1Id(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-800"
          >
            {CAREER_PATHS.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Career 2:</label>
          <select
            value={career2Id}
            onChange={(e) => setCareer2Id(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-800"
          >
            {CAREER_PATHS.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Career 3:</label>
          <select
            value={career3Id}
            onChange={(e) => setCareer3Id(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-800"
          >
            {CAREER_PATHS.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-['Outfit']">
                <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-[11px] w-1/4">Evaluation Dimension</th>
                {careers.map((c, i) => (
                  <th key={i} className="p-4 sm:p-5 font-extrabold text-sm w-1/4">
                    {c.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {parameters.map((param, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  <td className="p-4 sm:p-5 font-bold text-slate-800 text-xs">{param.label}</td>
                  {careers.map((c, i) => (
                    <td key={i} className="p-4 sm:p-5 text-slate-700 font-medium leading-relaxed">
                      {param.render(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
