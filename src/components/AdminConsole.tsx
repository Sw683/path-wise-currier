import React, { useState } from 'react';
import { Users, ShieldCheck, AlertTriangle, CheckCircle2, XCircle, TrendingUp, DollarSign } from 'lucide-react';
import { MENTORS_DATABASE } from '../data/mentors';

export const AdminConsole: React.FC = () => {
  const [mentorsList, setMentorsList] = useState(MENTORS_DATABASE);

  const [flaggedMessages, setFlaggedMessages] = useState([
    { id: 'flag-1', sender: 'User_491', text: 'What is your personal WhatsApp number?', reason: 'Attempted off-platform communication with minor', timestamp: '2 hours ago', resolved: false },
    { id: 'flag-2', sender: 'User_812', text: 'Can you guarantee I will get 99 percentile in JEE?', reason: 'Admission outcome guarantee claim', timestamp: '1 day ago', resolved: true }
  ]);

  const toggleResolve = (id: string) => {
    setFlaggedMessages((prev) =>
      prev.map((f) => (f.id === id ? { ...f, resolved: !f.resolved } : f))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Platform Admin & Safety Console
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
            System Moderation & Mentor Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time child safety monitoring, KYC verification queue, scholarship updates, and platform revenue metrics.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">Total Active Students</span>
          <span className="text-2xl font-black text-slate-900 font-['Outfit'] mt-1 block">42,850</span>
          <span className="text-[10px] text-emerald-600 font-semibold">? +18% this month</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">Completed Assessments</span>
          <span className="text-2xl font-black text-brand-600 font-['Outfit'] mt-1 block">38,120</span>
          <span className="text-[10px] text-slate-400">89% completion rate</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">Verified Mentors</span>
          <span className="text-2xl font-black text-indigo-600 font-['Outfit'] mt-1 block">{mentorsList.length} Active</span>
          <span className="text-[10px] text-emerald-600 font-semibold">100% KYC Passed</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">Safety Reports</span>
          <span className="text-2xl font-black text-amber-600 font-['Outfit'] mt-1 block">
            {flaggedMessages.filter((f) => !f.resolved).length} Pending
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold">Auto-moderation active</span>
        </div>
      </div>

      {/* Safety & Moderation Log */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-base font-['Outfit'] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" /> Minor Safety & Flagged Interaction Logs
          </h3>
          <span className="text-xs text-slate-500">Auto-flagged by Guardian Shield AI</span>
        </div>

        <div className="space-y-3">
          {flaggedMessages.map((flag) => (
            <div
              key={flag.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-900">{flag.sender}</span>
                  <span className="text-[10px] bg-red-100 text-red-800 font-semibold px-2 py-0.5 rounded">
                    {flag.reason}
                  </span>
                  <span className="text-[10px] text-slate-400">{flag.timestamp}</span>
                </div>
                <p className="text-slate-700 italic">"{flag.text}"</p>
              </div>

              <button
                onClick={() => toggleResolve(flag.id)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                  flag.resolved
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-600 text-white shadow-xs'
                }`}
              >
                {flag.resolved ? '? Resolved' : 'Mark Reviewed'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Mentors KYC Verification Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
          Mentor KYC & Background Verification Queue
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                <th className="pb-3">Mentor Name</th>
                <th className="pb-3">Field & Org</th>
                <th className="pb-3">Experience</th>
                <th className="pb-3">Hourly Rate</th>
                <th className="pb-3">KYC Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mentorsList.map((m) => (
                <tr key={m.id} className="py-2.5">
                  <td className="py-3 font-bold text-slate-900">{m.name}</td>
                  <td className="py-3 text-slate-600">{m.careerField} ({m.companyOrOrg})</td>
                  <td className="py-3 text-slate-600">{m.yearsOfExperience} Yrs</td>
                  <td className="py-3 font-semibold text-slate-900">?{m.pricingTiers[0].priceINR}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-bold text-[10px]">
                      {m.kycStatus}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-brand-600 hover:text-brand-700 font-bold text-xs">
                      View Documents
                    </button>
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
