import React, { useState } from 'react';
import { STUDENT_PITCHES, FELLOWSHIP_PROVIDERS } from '../../data/campusData';
import { StudentPitch, FellowshipProvider } from '../../types/campus';
import {
  Rocket,
  DollarSign,
  TrendingUp,
  Award,
  Plus,
  Play,
  CheckCircle,
  Clock,
  Send,
  Sparkles,
  X,
  Building,
  Target,
  ThumbsUp,
} from 'lucide-react';

export const StudentFellowshipHub: React.FC = () => {
  const [pitches, setPitches] = useState<StudentPitch[]>(STUDENT_PITCHES);
  const [providers, setProviders] = useState<FellowshipProvider[]>(FELLOWSHIP_PROVIDERS);
  const [activeTab, setActiveTab] = useState<'pitches' | 'providers'>('pitches');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Pledge Micro-funding Modal
  const [selectedPitchForBacking, setSelectedPitchForBacking] = useState<StudentPitch | null>(null);
  const [pledgeAmount, setPledgeAmount] = useState<number>(5000);
  const [pledgeNote, setPledgeNote] = useState('');
  const [pledgeSuccess, setPledgeSuccess] = useState(false);

  // Apply to Fellowship Provider Modal
  const [selectedProvider, setSelectedProvider] = useState<FellowshipProvider | null>(null);
  const [applyIdeaTitle, setApplyIdeaTitle] = useState('');
  const [applyDemoLink, setApplyDemoLink] = useState('');
  const [applyAbstract, setApplyAbstract] = useState('');
  const [applySubmitted, setApplySubmitted] = useState(false);

  // Submit New Pitch Modal
  const [showNewPitchModal, setShowNewPitchModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newCategory, setNewCategory] = useState<any>('AI & Machine Learning');
  const [newBudget, setNewBudget] = useState<number>(150000);
  const [newProblem, setNewProblem] = useState('');
  const [newSolution, setNewSolution] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');

  const categories = [
    'all',
    'AI & Machine Learning',
    'CleanTech & Climate',
    'HealthTech',
    'FinTech',
    'Hardware/IoT',
  ];

  const filteredPitches = pitches.filter((p) => {
    return selectedCategory === 'all' || p.category === selectedCategory;
  });

  const handleUpvotePitch = (id: string) => {
    setPitches((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const upvoted = !p.userUpvoted;
        return {
          ...p,
          userUpvoted: upvoted,
          upvotes: upvoted ? p.upvotes + 1 : p.upvotes - 1,
        };
      })
    );
  };

  const handleConfirmPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPitchForBacking) return;

    setPitches((prev) =>
      prev.map((p) => {
        if (p.id !== selectedPitchForBacking.id) return p;
        return {
          ...p,
          fundsRaisedINR: p.fundsRaisedINR + pledgeAmount,
          backersCount: p.backersCount + 1,
        };
      })
    );

    setPledgeSuccess(true);
    setTimeout(() => {
      setPledgeSuccess(false);
      setSelectedPitchForBacking(null);
      setPledgeNote('');
    }, 1800);
  };

  const handleApplyToFellowship = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySubmitted(true);
    setTimeout(() => {
      setApplySubmitted(false);
      setSelectedProvider(null);
      setApplyIdeaTitle('');
      setApplyDemoLink('');
      setApplyAbstract('');
    }, 1800);
  };

  const handleCreatePitch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: StudentPitch = {
      id: `pitch-${Date.now()}`,
      title: newTitle.trim(),
      tagline: newTagline.trim() || 'Student innovation project seeking prototype grant.',
      category: newCategory,
      founderName: 'Aryan Sharma (You)',
      founderCollege: 'IIT Bombay',
      founderBranch: 'Computer Science & Eng',
      founderYear: 'Class of 2026',
      founderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      teamSize: 3,
      targetBudgetINR: newBudget,
      fundsRaisedINR: 15000,
      backersCount: 1,
      problemStatement: newProblem.trim(),
      solutionSummary: newSolution.trim(),
      demoVideoUrl: newVideoUrl.trim() || undefined,
      milestones: [
        { title: 'MVP Design & Testing', budgetINR: Math.round(newBudget * 0.4), status: 'in_progress' },
        { title: 'Deployment & User Trials', budgetINR: Math.round(newBudget * 0.6), status: 'upcoming' },
      ],
      grantStatus: 'Seeking Backers',
      upvotes: 1,
      userUpvoted: true,
    };

    setPitches([created, ...pitches]);
    setShowNewPitchModal(false);
    setNewTitle('');
    setNewTagline('');
    setNewProblem('');
    setNewSolution('');
    setNewVideoUrl('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 text-white p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <Rocket className="w-3 h-3 text-emerald-400" />
              Student Innovation & Fellowship Capital
            </span>
            <span className="text-xs text-slate-400">Equity-free Micro Grants</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Fellowship Launchpad & Student Pitch Hub
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Empowering students who need funding to bring bold ideas to life. Share project pitch decks with verified fellowship providers, alumni angels, and venture scouts.
          </p>
        </div>

        <button
          onClick={() => setShowNewPitchModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold shadow-lg hover:from-emerald-600 hover:to-teal-600 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Pitch Idea for Funding</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('pitches')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'pitches'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Rocket className="w-4 h-4 text-emerald-400" />
            <span>Student Pitches Seeking Funding ({filteredPitches.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('providers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'providers'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Fellowship Providers & Micro-Grants ({providers.length})</span>
          </button>
        </div>
      </div>

      {/* Pitches View */}
      {activeTab === 'pitches' && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-medium">Domain:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Domains' : cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPitches.map((pitch) => {
              const fundingPercent = Math.min(
                100,
                Math.round((pitch.fundsRaisedINR / pitch.targetBudgetINR) * 100)
              );

              return (
                <div
                  key={pitch.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:border-slate-300 transition"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {pitch.category}
                        </span>
                        <h2 className="text-base font-bold text-slate-900 mt-2">{pitch.title}</h2>
                        <div className="text-xs text-brand-600 font-medium">{pitch.tagline}</div>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          pitch.grantStatus === 'Grant Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-50 text-amber-800'
                        }`}
                      >
                        {pitch.grantStatus}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <img
                        src={pitch.founderAvatar}
                        alt={pitch.founderName}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="font-semibold text-slate-700">{pitch.founderName}</span>
                      <span>•</span>
                      <span>
                        {pitch.founderCollege} ({pitch.founderBranch})
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-2 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div>
                        <strong className="text-slate-800 block text-[11px]">The Problem:</strong>
                        <p className="line-clamp-2">{pitch.problemStatement}</p>
                      </div>
                      <div>
                        <strong className="text-slate-800 block text-[11px]">Our Solution:</strong>
                        <p className="line-clamp-2">{pitch.solutionSummary}</p>
                      </div>
                    </div>

                    {/* Funding Progress Bar */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-700">
                          Raised: <strong>₹{(pitch.fundsRaisedINR / 1000).toFixed(0)}k</strong> of ₹
                          {(pitch.targetBudgetINR / 1000).toFixed(0)}k
                        </span>
                        <span className="font-bold text-emerald-600">{fundingPercent}% funded</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${fundingPercent}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-slate-400 text-right">
                        {pitch.backersCount} fellowship backers & angels
                      </div>
                    </div>

                    {/* Milestones */}
                    <div className="space-y-1.5 mb-4">
                      <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Target Milestones:
                      </div>
                      {pitch.milestones.map((m, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-white border border-slate-200"
                        >
                          <div className="flex items-center gap-1.5">
                            {m.status === 'completed' && (
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                            )}
                            {m.status === 'in_progress' && (
                              <Clock className="w-3.5 h-3.5 text-amber-500" />
                            )}
                            {m.status === 'upcoming' && (
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                            )}
                            <span className="text-slate-700">{m.title}</span>
                          </div>
                          <span className="text-[11px] font-semibold text-slate-500">
                            ₹{(m.budgetINR / 1000).toFixed(0)}k
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pitch Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handleUpvotePitch(pitch.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        pitch.userUpvoted
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Endorse ({pitch.upvotes})</span>
                    </button>

                    <button
                      onClick={() => setSelectedPitchForBacking(pitch)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition"
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Pledge Grant</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Providers View */}
      {activeTab === 'providers' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {providers.map((prov) => (
            <div
              key={prov.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:border-slate-300 transition"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={prov.logo}
                    alt={prov.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">{prov.name}</h2>
                    <div className="text-xs text-slate-500">{prov.organization}</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-3">
                  <div className="text-[11px] text-slate-400">Grant Size per Project:</div>
                  <div className="text-base font-black text-emerald-600">{prov.grantSizeINR}</div>
                  <div className="text-[10px] text-slate-400 mt-1">Equity-free capital</div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">{prov.description}</p>

                <div className="space-y-1.5 mb-4">
                  <div className="text-[11px] font-bold text-slate-700 uppercase">Perks Included:</div>
                  {prov.perks.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Sparkles className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span>Deadline: {prov.applicationDeadline}</span>
                  <span>Acceptance: {prov.acceptanceRate}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setSelectedProvider(prov)}
                  className="w-full py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black transition shadow-sm"
                >
                  Submit Pitch to Provider
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pledge Micro-funding Modal */}
      {selectedPitchForBacking && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Pledge Grant to Innovation</h3>
              </div>
              <button
                onClick={() => setSelectedPitchForBacking(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {pledgeSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <div className="text-base font-bold text-slate-900">Pledge Recorded!</div>
                <p className="text-xs text-slate-500">
                  Thank you for backing student innovation on UniSphere.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmPledge} className="space-y-3.5">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-900">
                    {selectedPitchForBacking.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    By {selectedPitchForBacking.founderName} ({selectedPitchForBacking.founderCollege})
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Grant / Pledge Amount (INR)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[2000, 5000, 10000].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setPledgeAmount(amt)}
                        className={`py-2 rounded-xl text-xs font-bold border transition ${
                          pledgeAmount === amt
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        ₹{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Support Note / Encouragement
                  </label>
                  <textarea
                    rows={3}
                    value={pledgeNote}
                    onChange={(e) => setPledgeNote(e.target.value)}
                    placeholder="Super excited about this clean tech prototype! Happy to connect you with trial partners..."
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPitchForBacking(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                  >
                    Confirm ₹{pledgeAmount.toLocaleString()} Grant
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Apply to Provider Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Apply to {selectedProvider.name}</h3>
              <button
                onClick={() => setSelectedProvider(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {applySubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <div className="text-base font-bold text-slate-900">Application Submitted!</div>
                <p className="text-xs text-slate-500">
                  Your grant proposal has been queued for review by the {selectedProvider.name} committee.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplyToFellowship} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project Name</label>
                  <input
                    type="text"
                    required
                    value={applyIdeaTitle}
                    onChange={(e) => setApplyIdeaTitle(e.target.value)}
                    placeholder="e.g. Distributed LLM Inference for Agriculture"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Demo / Prototype Video Link</label>
                  <input
                    type="url"
                    value={applyDemoLink}
                    onChange={(e) => setApplyDemoLink(e.target.value)}
                    placeholder="https://youtube.com/... or https://loom.com/..."
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Abstract & Why you are the right team
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={applyAbstract}
                    onChange={(e) => setApplyAbstract(e.target.value)}
                    placeholder="Describe your breakthrough insight, technical architecture, and 3-month milestone targets..."
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProvider(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black shadow-sm"
                  >
                    Submit Grant Proposal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Submit Pitch Modal */}
      {showNewPitchModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Submit Pitch for Fellowship Funding</h3>
              </div>
              <button
                onClick={() => setShowNewPitchModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePitch} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. NeuroVision Edge Glasses for Visually Impaired"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Domain</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none"
                  >
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="CleanTech & Climate">CleanTech & Climate</option>
                    <option value="HealthTech">HealthTech</option>
                    <option value="FinTech">FinTech</option>
                    <option value="Hardware/IoT">Hardware/IoT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Requested Grant (INR)</label>
                  <input
                    type="number"
                    step={10000}
                    value={newBudget}
                    onChange={(e) => setNewBudget(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">One-line Tagline</label>
                <input
                  type="text"
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  placeholder="e.g. Ultra-fast obstacle feedback using haptic ultrasonic sensors"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Problem Statement</label>
                <textarea
                  rows={2}
                  required
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                  placeholder="What urgent problem are you tackling and why does current tech fail?"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Proposed Solution</label>
                <textarea
                  rows={2}
                  required
                  value={newSolution}
                  onChange={(e) => setNewSolution(e.target.value)}
                  placeholder="How does your prototype work? Mention core hardware/software components."
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewPitchModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                >
                  Publish Pitch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
