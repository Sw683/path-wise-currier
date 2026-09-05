import React, { useState } from 'react';
import { EXAMS_DATABASE } from '../data/exams';
import { BookOpen, Search, ExternalLink, LifeBuoy, Filter, Sparkles, CheckCircle2 } from 'lucide-react';

export const ExamExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Engineering', 'Medical & Dental', 'Central Universities & Multi-stream', 'Law', 'Defence & Armed Forces', 'Commerce & Finance', 'Pure Science & Research', 'Design & Creative', 'Management & Business'];

  const filteredExams = EXAMS_DATABASE.filter((exam) => {
    const matchesSearch = 
      exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || exam.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
          <BookOpen className="w-3.5 h-3.5" /> Indian Entrance Exams & State CET Database
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
          Comprehensive Indian Exam Explorer
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
          Explore syllabus, official registration portals, accurate competition ratios, fee details, free preparation sources, and alternative fallback exams.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search exam (e.g. JEE, NEET, CLAT, NDA, CUET)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredExams.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center">
          <p className="text-lg font-bold text-slate-900 font-['Outfit']">No matching exams found</p>
          <p className="mt-2 text-sm text-slate-600">Try a different keyword or reset your filters to browse all exam categories.</p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-sm hover:bg-brand-700 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:border-brand-300 hover:shadow-md transition"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                      {exam.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mt-1">{exam.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{exam.fullName}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                    exam.difficulty === 'Extreme' ? 'bg-red-50 text-red-700 border border-red-200' :
                    exam.difficulty === 'Very High' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {exam.difficulty}
                  </span>
                </div>

                {/* Quick Details */}
                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Exam Timing:</span>
                    <span className="font-semibold text-slate-800">{exam.examMonth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Registration Fee:</span>
                    <span className="font-semibold text-slate-800">{exam.examFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Prep Begins:</span>
                    <span className="font-semibold text-slate-800">{exam.startPrepClass}</span>
                  </div>
                </div>

                {/* Competition Ratio Box */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-slate-800 block text-[11px] mb-0.5">Approx. Competition:</span>
                  <span className="text-slate-600 text-[11px] leading-tight block">{exam.approximateCompetition}</span>
                </div>

                {/* Free Resources List */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-700 block">Free Prep Materials:</span>
                  {exam.freePreparationResources.slice(0, 2).map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg bg-brand-50/50 hover:bg-brand-50 text-[11px] text-brand-800 font-medium transition"
                    >
                      <span>{res.name}</span>
                      <ExternalLink className="w-3 h-3 text-brand-600 shrink-0" />
                    </a>
                  ))}
                </div>

                {/* What If I Don't Qualify Fallback */}
                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                  <LifeBuoy className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">If not cleared:</span> {exam.whatIfFailed}
                  </div>
                </div>
              </div>

              {/* Official Source Link */}
              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={exam.officialSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                >
                  Official Portal <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-[10px] text-emerald-600 font-medium">? Verified Source</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
