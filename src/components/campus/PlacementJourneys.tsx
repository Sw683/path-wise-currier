import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { PlacementJourney, InterviewRoundDetail } from '../../types/campus';
import {
  Briefcase,
  Search,
  ThumbsUp,
  MessageSquare,
  DollarSign,
  Calendar,
  CheckCircle,
  HelpCircle,
  Award,
  Send,
  Plus,
  X,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const PlacementJourneys: React.FC = () => {
  const { journeys, addJourney, upvoteJourney, verification } = useCampus();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [expandedJourneyId, setExpandedJourneyId] = useState<string | null>('journey-1');

  // AMA / Referral Modal
  const [selectedJourneyForAMA, setSelectedJourneyForAMA] = useState<PlacementJourney | null>(null);
  const [amaType, setAmaType] = useState<'question' | 'referral'>('question');
  const [amaMessage, setAmaMessage] = useState('');
  const [amaSubmitted, setAmaSubmitted] = useState(false);

  // New Journey Form Modal
  const [showNewJourneyModal, setShowNewJourneyModal] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newCtc, setNewCtc] = useState('');
  const [newBase, setNewBase] = useState('');
  const [newAdvice, setNewAdvice] = useState('');

  const companies = ['all', 'Microsoft', 'Google', 'Goldman Sachs', 'Amazon', 'Uber'];

  const filteredJourneys = journeys.filter((j) => {
    const matchesSearch =
      j.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.roleOffered.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.collegeName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCompany =
      selectedCompany === 'all' ||
      j.companyName.toLowerCase() === selectedCompany.toLowerCase();

    return matchesSearch && matchesCompany;
  });

  const handleUpvote = (id: string) => {
    upvoteJourney(id);
  };

  const handleSendAma = (e: React.FormEvent) => {
    e.preventDefault();
    setAmaSubmitted(true);
    setTimeout(() => {
      setAmaSubmitted(false);
      setSelectedJourneyForAMA(null);
      setAmaMessage('');
    }, 1800);
  };

  const handleCreateJourney = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newRole.trim()) return;

    addJourney({
      studentName: 'Aryan Sharma (You)',
      collegeName: verification.collegeName || 'IIT Bombay',
      branch: verification.degreeName || 'Computer Science & Engineering',
      batchYear: 'Class of 2026',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      companyName: newCompany.trim(),
      companyLogo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=128&auto=format&fit=crop&q=80',
      roleOffered: newRole.trim(),
      ctcINR: newCtc.trim() || '₹32.0 LPA',
      packageBreakdown: {
        baseINR: newBase.trim() || '₹16,00,000 / year',
        stocksINR: 'Standard Employee Stock Options',
        joiningBonusINR: '₹2,00,000',
      },
      offerType: 'On-Campus',
      preparationDurationMonths: 6,
      preparationRoadmap: [
        'DSA foundation & 250 problems on LeetCode',
        'System Design patterns and clean code architecture',
        'Weekly timed mock interviews with campus seniors',
      ],
      rounds: [
        {
          roundNumber: 1,
          roundName: 'Coding Assessment',
          duration: '60 mins',
          focusAreas: ['DSA', 'Arrays', 'Strings'],
          experienceSummary: '3 coding problems with standard time limits.',
          sampleQuestions: ['Longest Substring Without Repeating Characters'],
          proTips: ['Review edge cases before submitting'],
        },
      ],
      keyAdvice: newAdvice.trim() || 'Stay consistent and focus on clarity of thought during interviews.',
      userUpvoted: true,
      openForQuestions: true,
    });

    setShowNewJourneyModal(false);
    setNewCompany('');
    setNewRole('');
    setNewCtc('');
    setNewBase('');
    setNewAdvice('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Banner */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-slate-900 via-brand-950 to-blue-950 text-white p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30 flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-brand-400" />
              Verified Placement Transcripts
            </span>
            <span className="text-xs text-slate-400">Class of 2025 & 2026</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Placed Student Journeys & Interview Guides
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Read real, unfiltered interview rounds, CTC salary package breakdowns, sample interview questions, and prep roadmaps shared by placed seniors.
          </p>
        </div>

        <button
          onClick={() => setShowNewJourneyModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-amber-600 text-white text-xs font-bold shadow-lg hover:from-brand-700 hover:to-amber-700 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Share Placement Journey</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by company (Google, Microsoft), college, or student name..."
            className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs text-slate-400 whitespace-nowrap">Filter Company:</span>
          {companies.map((comp) => (
            <button
              key={comp}
              onClick={() => setSelectedCompany(comp)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                selectedCompany === comp
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {comp === 'all' ? 'All Companies' : comp}
            </button>
          ))}
        </div>
      </div>

      {/* Journeys List */}
      <div className="space-y-6">
        {filteredJourneys.map((journey) => {
          const isExpanded = expandedJourneyId === journey.id;

          return (
            <div
              key={journey.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-slate-300 transition duration-150"
            >
              {/* Header Summary */}
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={journey.avatar}
                      alt={journey.studentName}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-base font-bold text-slate-900">{journey.studentName}</h2>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {journey.companyName}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          ({journey.roleOffered})
                        </span>
                      </div>

                      <div className="text-xs text-slate-500 mt-1">
                        {journey.collegeName} • {journey.branch} • {journey.batchYear} •{' '}
                        <span className="text-indigo-600 font-semibold">{journey.offerType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-lg font-black text-slate-900">{journey.ctcINR}</div>
                      <div className="text-[10px] text-slate-400 font-medium">Total Package CTC</div>
                    </div>

                    <button
                      onClick={() => setExpandedJourneyId(isExpanded ? null : journey.id)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                      title={isExpanded ? 'Collapse' : 'Expand full breakdown'}
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Package Breakdown Strip */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Base Salary:</span>
                    <span className="font-bold text-slate-800">{journey.packageBreakdown.baseINR}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Stocks & ESOPs:</span>
                    <span className="font-bold text-slate-800">{journey.packageBreakdown.stocksINR}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Joining Bonus & Perks:</span>
                    <span className="font-bold text-slate-800">{journey.packageBreakdown.joiningBonusINR}</span>
                  </div>
                </div>

                {/* Key Advice Quote */}
                <div className="mt-3 p-3 bg-brand-50/50 border border-brand-100 rounded-xl text-xs text-brand-950 italic">
                  &ldquo;{journey.keyAdvice}&rdquo;
                </div>
              </div>

              {/* Detailed Interview Rounds Breakdown (Collapsible) */}
              {isExpanded && (
                <div className="bg-slate-50/60 p-5 border-t border-slate-200 space-y-5 animate-in fade-in">
                  <div>
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Preparation Roadmap ({journey.preparationDurationMonths} Months of Prep):
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {journey.preparationRoadmap.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs p-2.5 bg-white rounded-lg border border-slate-200 text-slate-700"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                      Complete Interview Rounds Breakdown:
                    </h3>
                    <div className="space-y-3">
                      {journey.rounds.map((round) => (
                        <div
                          key={round.roundNumber}
                          className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 font-bold text-slate-900">
                              <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-[10px]">
                                {round.roundNumber}
                              </span>
                              <span>{round.roundName}</span>
                            </div>
                            <span className="text-slate-400">{round.duration}</span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {round.focusAreas.map((fa, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                              >
                                {fa}
                              </span>
                            ))}
                          </div>

                          <p className="text-slate-600 leading-relaxed">{round.experienceSummary}</p>

                          {round.sampleQuestions.length > 0 && (
                            <div className="pt-1">
                              <span className="text-[11px] font-bold text-slate-700 block">
                                Sample Questions Asked:
                              </span>
                              <ul className="list-disc list-inside text-slate-600 space-y-0.5 mt-0.5">
                                {round.sampleQuestions.map((q, idx) => (
                                  <li key={idx}>{q}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {round.proTips.length > 0 && (
                            <div className="pt-1 text-[11px] text-indigo-900 bg-indigo-50/50 p-2 rounded-lg border border-indigo-100">
                              <span className="font-bold">Pro Tip: </span>
                              {round.proTips.join(' • ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Card Bottom Actions */}
              <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => handleUpvote(journey.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
                    journey.userUpvoted
                      ? 'bg-brand-50 text-brand-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Upvote ({journey.upvotes})</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedJourneyForAMA(journey);
                      setAmaType('referral');
                    }}
                    className="px-3 py-1.5 rounded-lg font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                  >
                    Request Referral
                  </button>

                  <button
                    onClick={() => {
                      setSelectedJourneyForAMA(journey);
                      setAmaType('question');
                    }}
                    className="px-3.5 py-1.5 rounded-lg font-bold bg-slate-900 text-white hover:bg-black shadow-sm"
                  >
                    Ask Senior (AMA)
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ask Question / Referral Modal */}
      {selectedJourneyForAMA && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {amaType === 'referral' ? 'Request Employee Referral' : 'Ask Placement Doubt'}
              </h3>
              <button
                onClick={() => setSelectedJourneyForAMA(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {amaSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <div className="text-base font-bold text-slate-900">Message Delivered!</div>
                <p className="text-xs text-slate-500">
                  {selectedJourneyForAMA.studentName} has received your {amaType} request and will respond directly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendAma} className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                  <img
                    src={selectedJourneyForAMA.avatar}
                    alt={selectedJourneyForAMA.studentName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {selectedJourneyForAMA.studentName}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {selectedJourneyForAMA.companyName} ({selectedJourneyForAMA.roleOffered})
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {amaType === 'referral'
                      ? 'Your Job ID & Resume Link (Google Drive / GitHub)'
                      : 'Your Question'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={amaMessage}
                    onChange={(e) => setAmaMessage(e.target.value)}
                    placeholder={
                      amaType === 'referral'
                        ? 'Hi, I am targeting the 2026 SDE role (Job ID #98214). Here is my resume link and portfolio...'
                        : 'Hi, I wanted to know how in-depth they tested multi-threading and what you recommend for OS prep...'
                    }
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJourneyForAMA(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-sm"
                  >
                    Send to Senior
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Share Journey Modal */}
      {showNewJourneyModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-600" />
                <h3 className="text-base font-bold text-slate-900">Share Your Placement Journey</h3>
              </div>
              <button
                onClick={() => setShowNewJourneyModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateJourney} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. Atlassian, Amazon"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Role Offered</label>
                  <input
                    type="text"
                    required
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="e.g. Software Engineer 1"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total CTC (LPA)</label>
                  <input
                    type="text"
                    value={newCtc}
                    onChange={(e) => setNewCtc(e.target.value)}
                    placeholder="e.g. ₹42.0 LPA"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Base Salary</label>
                  <input
                    type="text"
                    value={newBase}
                    onChange={(e) => setNewBase(e.target.value)}
                    placeholder="e.g. ₹18,50,000 / yr"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Golden Advice for Juniors</label>
                <textarea
                  rows={3}
                  value={newAdvice}
                  onChange={(e) => setNewAdvice(e.target.value)}
                  placeholder="What key preparation strategy made the biggest difference?"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewJourneyModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-sm"
                >
                  Publish Guide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
