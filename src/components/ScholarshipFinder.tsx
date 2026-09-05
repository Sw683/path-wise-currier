import React, { useState } from 'react';
import { SCHOLARSHIPS_DATABASE } from '../data/scholarships';
import { Award, Search, ExternalLink, Filter, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ScholarshipFinder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');
  const [providerFilter, setProviderFilter] = useState('All');

  const filteredScholarships = SCHOLARSHIPS_DATABASE.filter((sch) => {
    const matchesSearch = 
      sch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sch.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sch.applicableCourses.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesGender = genderFilter === 'All' || sch.targetGenders.includes(genderFilter as any) || sch.targetGenders.includes('All');
    const matchesProvider = providerFilter === 'All' || sch.provider === providerFilter;

    return matchesSearch && matchesGender && matchesProvider;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setGenderFilter('All');
    setProviderFilter('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 mb-2">
          <Award className="w-3.5 h-3.5" /> Government & CSR Scholarship Finder
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
          Verified Indian Scholarships for Class 8?12 & UG
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200 max-w-2xl mt-1">
          Discover verified central schemes (NSP, PMSS, AICTE Pragati, DST INSPIRE) and private merit grants to ensure financial barriers never stop your education.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search scholarship or course..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700"
          >
            <option value="All">All Genders</option>
            <option value="Female">Girl Students Only</option>
          </select>

          <select
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700"
          >
            <option value="All">All Providers</option>
            <option value="Government of India">Government of India</option>
            <option value="Corporate CSR">Corporate CSR</option>
            <option value="Trust / NGO">Trust / NGO</option>
          </select>
        </div>
      </div>

      {filteredScholarships.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center">
          <p className="text-lg font-bold text-slate-900 font-['Outfit']">No matching scholarships found</p>
          <p className="mt-2 text-sm text-slate-600">Try a different keyword or reset your search and filters to see all scholarship options.</p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm hover:bg-emerald-700 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((sch) => (
            <div
              key={sch.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {sch.provider}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                    {sch.awardAmount.split('(')[0]}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-['Outfit'] leading-snug">{sch.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{sch.eligibilitySummary}</p>

                {/* Meta Grid */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Income Limit:</span>
                    <span className="font-semibold text-slate-800">
                      {sch.incomeLimitPerAnnum === 0 ? 'No Income Cap (Merit)' : `Under ?${(sch.incomeLimitPerAnnum / 100000).toFixed(1)} Lakhs/yr`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Min. Percentage:</span>
                    <span className="font-semibold text-slate-800">{sch.minimumPercentage}% in 10/12th</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Application Period:</span>
                    <span className="font-semibold text-slate-800">{sch.applicationPeriod}</span>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-1">
                  {sch.targetCategories.map((c) => (
                    <span key={c} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link */}
              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={sch.officialPortalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  Apply on Official Portal <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-[10px] text-slate-400">100% Free Application</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
