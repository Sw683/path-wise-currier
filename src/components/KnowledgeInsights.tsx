import React from 'react';
import { KNOWLEDGE_INSIGHTS } from '../data/knowledgeLayer';
import { Sparkles, ExternalLink, ShieldCheck, CheckCircle2, MessageSquare, BookOpen } from 'lucide-react';

export const KnowledgeInsights: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Career Experience Knowledge Layer
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
          Real-World Insights & Attributed Perspectives
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
          Separating anecdotal community opinions from verified facts. We synthesize student experiences from alumni discussions, official NIRF audits, and government filings with full source attribution.
        </p>
      </div>

      {/* Filter / Tag Legend */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800">Source Types:</span>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md font-semibold">
            ? Verified Official Data
          </span>
          <span className="px-2.5 py-1 bg-brand-50 text-brand-700 border border-brand-200 rounded-md font-semibold">
            ?? Curated Community Consensus
          </span>
        </div>
        <span className="text-slate-500 text-[11px]">No blind scraping ? Zero unverified claims</span>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {KNOWLEDGE_INSIGHTS.map((insight) => (
          <div
            key={insight.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 flex flex-col justify-between hover:border-brand-300 hover:shadow-md transition space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  insight.verificationStatus === 'Verified Fact'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-brand-50 text-brand-700 border border-brand-200'
                }`}>
                  {insight.sourceType}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">{insight.publicationYear}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 font-['Outfit']">{insight.topic}</h3>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed italic">
                "{insight.quoteOrInsight}"
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 block font-medium">Attribution:</span>
                <span className="text-slate-700 font-semibold">{insight.sourceName}</span>
              </div>
              <a
                href={insight.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 shrink-0"
              >
                View Source <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
