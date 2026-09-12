import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_FELLOWSHIPS } from '../../data/mockFellowships';
import { IdeaProposalModal } from './IdeaProposalModal';
import { 
  Award, 
  Search, 
  PlusCircle, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  Layers, 
  CheckCircle2 
} from 'lucide-react';
import { FellowshipOpportunity } from '../../types';

export const FellowshipHub: React.FC = () => {
  const { proposals, setIsSubmitIdeaOpen, isSubmitIdeaOpen, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'discover' | 'my_proposals'>('discover');

  const types = ['All', 'Grant', 'Fellowship', 'Hackathon', 'Incubator', 'Scholarship'];

  const filteredOpportunities = MOCK_FELLOWSHIPS.filter(item => {
    if (selectedType !== 'All' && item.type !== selectedType) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = item.title.toLowerCase().includes(q);
      const matchesProvider = item.provider.toLowerCase().includes(q);
      const matchesTags = item.tags.some(t => t.toLowerCase().includes(q));
      return matchesTitle || matchesProvider || matchesTags;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/30 text-amber-300 text-xs font-bold mb-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Non-Dilutive Capital & Academic Grants</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">FELLOWSHIP & FUNDING CENTER</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Discover student grants (DST NIDHI-EIR), research stipends, incubator seed checks, and major hackathon bounty prize pools.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsSubmitIdeaOpen(true)}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg flex items-center gap-2 cursor-pointer transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Your Idea</span>
          </button>
        </div>
      </div>

      {/* Distinction Disclaimer Banner (Section 18) */}
      <div className="mb-6 p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-start gap-3 text-xs leading-relaxed">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-amber-300 block">Transparent Opportunity Distinction:</strong>
          CampusNexus connects students directly with verified grant providers, foundations, and government departments. The platform tracks <strong>Opportunity Discovered</strong> vs <strong>Funding Received</strong> to preserve absolute integrity and never promises speculative capital.
        </div>
      </div>

      {/* Tabs: Discover Opportunities vs My Submitted Ideas */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
        <div className="flex space-x-3 text-xs font-bold">
          <button
            onClick={() => setActiveTab('discover')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'discover'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Browse Funding Calls ({filteredOpportunities.length})
          </button>

          <button
            onClick={() => setActiveTab('my_proposals')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'my_proposals'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>My Submitted Ideas</span>
            <span className="bg-slate-900 text-amber-300 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {proposals.length}
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: Discover Opportunities */}
      {activeTab === 'discover' && (
        <div className="space-y-6">
          
          {/* Filters Row */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search grants by keyword, tech, or ministry..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedType === t
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Opportunities Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOpportunities.map(opp => (
              <div
                key={opp.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Provider & Amount Bar */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 rounded-2xl bg-amber-50 border border-amber-100">
                        {opp.logo}
                      </span>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md">
                          {opp.type}
                        </span>
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 mt-1 line-clamp-1">
                          {opp.title}
                        </h4>
                        <p className="text-xs text-slate-500">{opp.provider}</p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      opp.status === 'Closing Soon'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {opp.status}
                    </span>
                  </div>

                  {/* Funding Value Callout */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      Grant / Fellowship Value
                    </span>
                    <p className="text-sm font-black text-emerald-950 mt-0.5">
                      {opp.fundingAmount}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {opp.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {opp.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Requirements list */}
                  <div className="text-[11px] text-slate-500 space-y-1 pt-2 border-t border-slate-100">
                    <strong className="text-slate-700 font-bold block">Key Eligibility:</strong>
                    {opp.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Footer Bar */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Deadline: <strong>{opp.deadline}</strong></span>
                  </div>

                  <a
                    href={opp.applyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Direct Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: My Submitted Ideas */}
      {activeTab === 'my_proposals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
              Your Idea Proposals ({proposals.length})
            </h3>
            <button
              onClick={() => setIsSubmitIdeaOpen(true)}
              className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-xs hover:bg-amber-400"
            >
              + Submit New Idea
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {proposals.map(prop => (
              <div
                key={prop.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                      {prop.track}
                    </span>
                    <h4 className="font-extrabold text-base text-slate-900 mt-1">
                      {prop.title}
                    </h4>
                    <p className="text-xs text-slate-400">
                      Submitted on {prop.submittedAt} by {prop.authorName}
                    </p>
                  </div>

                  {/* Status Indicator */}
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Status: {prop.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <strong className="text-slate-700 block mb-1">Problem Addressed:</strong>
                    <p className="text-slate-600">{prop.problemStatement}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <strong className="text-slate-700 block mb-1">Proposed Solution:</strong>
                    <p className="text-slate-600">{prop.proposedSolution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-500">Maturity:</span>
                    <span className="font-bold text-slate-800">{prop.currentStage}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-semibold text-slate-500">Grant Budget:</span>
                    <span className="font-bold text-emerald-700">{prop.estimatedFunding}</span>
                  </div>

                  <button
                    onClick={() => showToast('Matched with DST NIDHI-EIR & Pre-Seed Catalysts!')}
                    className="text-xs font-bold text-indigo-600 hover:underline"
                  >
                    View Matching Grants →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Idea Proposal Modal */}
      <IdeaProposalModal />

    </div>
  );
};
