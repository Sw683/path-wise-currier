import React, { useState } from 'react';
import { useCampus, ACADEMIC_QUESTIONS } from '../../context/CampusContext';
import {
  Brain,
  Sparkles,
  Award,
  CheckCircle,
  ShieldCheck,
  Building,
  Target,
  FileText,
  UploadCloud,
  ChevronRight,
  TrendingUp,
  Laptop,
  BookOpen,
  ArrowUpRight,
  HelpCircle,
  Clock,
  Briefcase,
  Scan,
  Download,
  Share2,
  Check,
  AlertCircle,
} from 'lucide-react';

export const BehavioralCompanyFit: React.FC = () => {
  const {
    behavioralProfile,
    updateBehavioralProfile,
    academicEvaluation,
    submitAcademicQuiz,
    companyFits,
    verification,
    updateVerification,
  } = useCampus();

  const [activeSection, setActiveSection] = useState<'profile' | 'academic_quiz' | 'company_fit' | 'verification'>('profile');

  // Interactive Behavioral Quiz State
  const [quizAnswer1, setQuizAnswer1] = useState<string>('architect');
  const [quizAnswer2, setQuizAnswer2] = useState<string>('first_principles');
  const [quizAnswer3, setQuizAnswer3] = useState<string>('blitzscale');
  const [quizSavedMessage, setQuizSavedMessage] = useState(false);

  // Academic Diagnostic Assessment State
  const [academicQuizAnswers, setAcademicQuizAnswers] = useState<{ [qId: string]: string }>({
    'q-1': 'b',
    'q-2': 'b',
    'q-3': 'c',
    'q-4': 'a',
    'q-5': 'b',
  });
  const [quizSubmittedToast, setQuizSubmittedToast] = useState(false);

  // Verification & ID Card Scanner State
  const [uploadCollege, setUploadCollege] = useState(verification.collegeName);
  const [uploadDegree, setUploadDegree] = useState(verification.degreeName);
  const [uploadEnrollment, setUploadEnrollment] = useState(verification.enrollmentId);
  const [uploadCgpa, setUploadCgpa] = useState('9.4');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [cardCopied, setCardCopied] = useState(false);

  const handleUpdateBehavioral = (e: React.FormEvent) => {
    e.preventDefault();

    let newNature: any = 'The Deep Architect';
    let newNatureDesc = 'You thrive when untangling complex technical systems from first principles.';
    if (quizAnswer1 === 'hacker') {
      newNature = 'The Blitz Hacker';
      newNatureDesc = 'You ship prototypes at lightning velocity, iterate based on user feedback, and thrive in high-momentum hackathons.';
    } else if (quizAnswer1 === 'catalyst') {
      newNature = 'The Community Catalyst';
      newNatureDesc = 'You naturally connect multidisciplinary talent, organize hackathons, and bridge engineering with product vision.';
    }

    let newThinking: any = 'First-Principles Reasoning';
    let newThinkingDesc = 'You deconstruct problems down to their fundamental truths and question conventional assumptions.';
    if (quizAnswer2 === 'systems') {
      newThinking = 'System Architecture';
      newThinkingDesc = 'You naturally visualize high-level block diagrams, data flows, and trade-offs before writing a single line of code.';
    } else if (quizAnswer2 === 'data') {
      newThinking = 'Data-Driven Empirical';
      newThinkingDesc = 'You trust real benchmarks and metrics over opinions. You make technical decisions based on empirical evidence.';
    }

    let newLifestyle: any = 'High-Impact Blitzscale';
    if (quizAnswer3 === 'remote') newLifestyle = 'Remote Async Nomad';
    if (quizAnswer3 === 'enterprise') newLifestyle = 'Enterprise Stability';
    if (quizAnswer3 === 'research') newLifestyle = 'Research & Academia';

    updateBehavioralProfile({
      natureType: newNature,
      natureDescription: newNatureDesc,
      thinkingStyle: newThinking,
      thinkingDescription: newThinkingDesc,
      lifestylePreference: newLifestyle,
    });

    setQuizSavedMessage(true);
    setTimeout(() => setQuizSavedMessage(false), 3000);
  };

  const handleAcademicQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAcademicQuiz(academicQuizAnswers);
    setQuizSubmittedToast(true);
    setTimeout(() => setQuizSubmittedToast(false), 3000);
  };

  const handleScanAndVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setScanComplete(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);

      const parsedCgpa = parseFloat(uploadCgpa) || 9.0;
      const computedCollegePercentile = Math.min(99, Math.round(75 + (parsedCgpa - 7.5) * 12));
      const computedNationwidePercentile = Math.min(98, Math.round(70 + (parsedCgpa - 7.5) * 11));

      updateVerification({
        isVerified: true,
        status: 'verified_student',
        collegeName: uploadCollege,
        degreeName: uploadDegree,
        enrollmentId: uploadEnrollment,
        collegeStandingPercentile: computedCollegePercentile,
        nationwideStandingPercentile: computedNationwidePercentile,
        verifiedAt: 'Validated via University Registry (Instant OCR)',
      });
    }, 1800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Toast */}
      {quizSubmittedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">
            Academic Assessment Graded! Company Fit & Standing updated.
          </span>
        </div>
      )}

      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
              <Brain className="w-3 h-3 text-purple-400" />
              Cognitive & Career Intelligence
            </span>
            <span className="text-xs text-slate-400">AI Personality & Placement Diagnostic</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            AI Behavioral Profiler & Company Fit Engine
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Analyze your problem-solving nature, thinking style, and lifestyle preferences. Take the academic level diagnostic to predict your company fit, and verify your student ID to view your verified national standing.
          </p>
        </div>

        {/* Verified Badge Pill */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1">
              <span>{verification.collegeName}</span>
              <CheckCircle className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="text-[11px] text-brand-300 font-semibold">
              Top {100 - verification.collegeStandingPercentile}% College Standing
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveSection('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeSection === 'profile'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Brain className="w-4 h-4 text-purple-400" />
          <span>Behavioral & Lifestyle Profile</span>
        </button>

        <button
          onClick={() => setActiveSection('academic_quiz')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeSection === 'academic_quiz'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Academic Diagnostic Test</span>
        </button>

        <button
          onClick={() => setActiveSection('company_fit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeSection === 'company_fit'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Target className="w-4 h-4 text-brand-400" />
          <span>Company Fit Predictions</span>
        </button>

        <button
          onClick={() => setActiveSection('verification')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeSection === 'verification'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>ID Card Verification & Standing</span>
        </button>
      </div>

      {/* Section 1: Behavioral & Lifestyle Profiler */}
      {activeSection === 'profile' && (
        <div className="space-y-6">
          {/* Analysis Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Your Problem-Solving Nature
              </span>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                {behavioralProfile.natureType}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {behavioralProfile.natureDescription}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Dominant Thinking Style
              </span>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Brain className="w-5 h-5 text-brand-600" />
                {behavioralProfile.thinkingStyle}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {behavioralProfile.thinkingDescription}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Lifestyle & Work Preference
              </span>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                {behavioralProfile.lifestylePreference}
              </h2>
              <div className="space-y-2 pt-2 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-slate-500">Execution Velocity</span>
                    <span className="font-bold text-slate-800">
                      {behavioralProfile.workPaceScore}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-600 h-full rounded-full"
                      style={{ width: `${behavioralProfile.workPaceScore}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-slate-500">Autonomy Preference</span>
                    <span className="font-bold text-slate-800">
                      {behavioralProfile.autonomyScore}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-500 h-full rounded-full"
                      style={{ width: `${behavioralProfile.autonomyScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Curated Opportunities */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-600" />
              Tailored Opportunities Matching Your Nature
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {behavioralProfile.curatedOpportunities.map((opp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                >
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white border border-slate-200 text-slate-700">
                      {opp.type}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 mt-2 mb-1">{opp.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                      {opp.matchedReason}
                    </p>
                  </div>
                  <button className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                    <span>{opp.linkText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Curated Products */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Laptop className="w-5 h-5 text-indigo-600" />
              Curated Products, Tools & Student Perks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {behavioralProfile.curatedProducts.map((prod, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {prod.category}
                      </span>
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        {prod.studentPerk}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 mb-1">{prod.name}</h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                      {prod.description}
                    </p>
                  </div>
                  <a
                    href={prod.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    <span>Claim Student Benefit</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Behavioral Quiz Form */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl border border-purple-100 p-6">
            <h2 className="text-sm font-bold text-purple-950 mb-1">
              Fine-tune Behavioral & Lifestyle Parameters
            </h2>
            <p className="text-xs text-purple-800 mb-4">
              Update how you approach work to optimize your curated perks and opportunities.
            </p>

            <form onSubmit={handleUpdateBehavioral} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-purple-900 mb-1.5">
                  1. How do you tackle a blank canvas problem?
                </label>
                <select
                  value={quizAnswer1}
                  onChange={(e) => setQuizAnswer1(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-purple-200 rounded-xl focus:outline-none"
                >
                  <option value="architect">Deconstruct into scalable architecture (Architect)</option>
                  <option value="hacker">Build a quick MVP in 2 hours (Hacker)</option>
                  <option value="catalyst">Assemble a multidisciplinary team (Catalyst)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-900 mb-1.5">
                  2. Your preferred mental framework:
                </label>
                <select
                  value={quizAnswer2}
                  onChange={(e) => setQuizAnswer2(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-purple-200 rounded-xl focus:outline-none"
                >
                  <option value="first_principles">First-principles deduction from scratch</option>
                  <option value="systems">High-level systems & flowcharts</option>
                  <option value="data">Empirical benchmarks & datasets</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-purple-900 mb-1.5">
                  3. Your ideal lifestyle environment:
                </label>
                <select
                  value={quizAnswer3}
                  onChange={(e) => setQuizAnswer3(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-purple-200 rounded-xl focus:outline-none"
                >
                  <option value="blitzscale">High-speed blitzscaling startup</option>
                  <option value="remote">Remote async flexible schedule</option>
                  <option value="enterprise">Structured Tier-1 global enterprise</option>
                  <option value="research">Deep academic or R&D lab</option>
                </select>
              </div>

              <div className="md:col-span-3 flex items-center justify-between pt-2">
                {quizSavedMessage ? (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Profile Updated & Recommendations Refreshed!
                  </span>
                ) : (
                  <div />
                )}
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 shadow-sm"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Section 2: Interactive Academic Diagnostic Test */}
      {activeSection === 'academic_quiz' && (
        <div className="space-y-6">
          {/* Diagnostic Summary Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">
                    Academic Level Diagnostic Assessment
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    {academicEvaluation.percentageScore}% Score
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Assesses computer science rigor, system design intuition, and quantitative aptitude.
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Evaluated Academic Standing</span>
                <span className="text-xs font-bold text-brand-600">
                  {academicEvaluation.evaluatedAcademicLevel}
                </span>
              </div>
            </div>

            {/* Strengths & Focus */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-2xl">
                <span className="font-bold text-emerald-950 block mb-1">Demonstrated Strengths:</span>
                <ul className="space-y-1 text-emerald-800">
                  {academicEvaluation.strengths.map((s, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-2xl">
                <span className="font-bold text-indigo-950 block mb-1">Recommended Preparation Focus:</span>
                <ul className="space-y-1 text-indigo-800">
                  {academicEvaluation.recommendedFocus.map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive Question Cards */}
          <form onSubmit={handleAcademicQuizSubmit} className="space-y-4">
            {ACADEMIC_QUESTIONS.map((q, idx) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                    Question {idx + 1} • {q.category}
                  </span>
                  {academicQuizAnswers[q.id] && (
                    <span className="text-xs text-slate-400">Answer selected</span>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-900 leading-relaxed">
                  {q.question}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt) => {
                    const isSelected = academicQuizAnswers[q.id] === opt.id;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() =>
                          setAcademicQuizAnswers((prev) => ({ ...prev, [q.id]: opt.id }))
                        }
                        className={`p-3 rounded-xl border text-left text-xs transition ${
                          isSelected
                            ? 'bg-brand-50 border-brand-500 text-brand-950 font-semibold shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="font-bold uppercase mr-1.5">{opt.id})</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Submitting recalculates your company fit probability and national percentile rank.
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-md transition"
              >
                Grade Assessment & Update Fit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Section 3: Company Fit Predictions */}
      {activeSection === 'company_fit' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Company Tier Fit & Interview Readiness Prediction
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                AI diagnostic evaluating your current problem-solving velocity, project depth, and core fundamentals against placement rubrics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companyFits.map((fit, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{fit.companyTier}</h3>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {fit.targetCompanies.join(', ')}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-brand-600">
                        {fit.matchPercentage}%
                      </span>
                      <div className="text-[10px] text-slate-400 font-medium">Fit Score</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        fit.matchPercentage >= 90
                          ? 'bg-emerald-500'
                          : fit.matchPercentage >= 80
                          ? 'bg-brand-500'
                          : 'bg-indigo-500'
                      }`}
                      style={{ width: `${fit.matchPercentage}%` }}
                    />
                  </div>

                  {/* Readiness tag */}
                  <div className="text-xs">
                    <span className="font-semibold text-slate-700">Readiness Status: </span>
                    <span
                      className={`font-bold ${
                        fit.readinessLevel === 'Ready for Interview'
                          ? 'text-emerald-700'
                          : 'text-amber-700'
                      }`}
                    >
                      {fit.readinessLevel}
                    </span>
                  </div>

                  {/* Strengths */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-700 block mb-1">
                      Evaluated Strengths:
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {fit.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Missing skill gaps */}
                  {fit.missingSkills.length > 0 && (
                    <div>
                      <span className="text-[11px] font-bold text-amber-900 block mb-1">
                        Gaps to Bridge:
                      </span>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {fit.missingSkills.map((m, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-amber-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 30-day action plan */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 block mb-1">
                      Recommended 30-Day Bridge Action:
                    </span>
                    <ul className="list-disc list-inside text-slate-600 space-y-0.5 text-[11px]">
                      {fit.actionPlan.map((act, i) => (
                        <li key={i}>{act}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Student ID & Degree Verification & Standing Card */}
      {activeSection === 'verification' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">
                    Official Student Identity Card & Verified Standing
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Student
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Cryptographically validated using degree enrollment details and college identity card.
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Status</span>
                <span className="text-xs font-semibold text-emerald-700">
                  {verification.verifiedAt}
                </span>
              </div>
            </div>

            {/* Standing Percentile Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-50 to-orange-50 border border-brand-100">
                <span className="text-xs font-bold text-brand-800 uppercase tracking-wider">
                  College Standing
                </span>
                <div className="text-3xl font-black text-brand-900 mt-1">
                  Top {100 - verification.collegeStandingPercentile}%
                </div>
                <p className="text-xs text-brand-700 mt-1">
                  Ranked in the <strong>{verification.collegeStandingPercentile}th percentile</strong> among peers at {verification.collegeName}.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100">
                <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
                  Nationwide Standing
                </span>
                <div className="text-3xl font-black text-indigo-900 mt-1">
                  Top {100 - verification.nationwideStandingPercentile}%
                </div>
                <p className="text-xs text-indigo-700 mt-1">
                  Ranked in the <strong>{verification.nationwideStandingPercentile}th percentile</strong> across all verified university engineering students.
                </p>
              </div>
            </div>

            {/* Digital Student Identity Card (Printable / Shareable) */}
            <div className="max-w-md mx-auto p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white border border-slate-700 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center font-black text-sm text-white">
                    U
                  </div>
                  <div>
                    <div className="text-xs font-black tracking-wider text-white">UNISPHERE ID</div>
                    <div className="text-[9px] text-brand-300">National Student Verification</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> VERIFIED
                </span>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"
                  alt="Student"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-400"
                />
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-white">Aryan Sharma</div>
                  <div className="text-xs text-slate-300">{verification.collegeName}</div>
                  <div className="text-[11px] text-brand-300">{verification.degreeName}</div>
                  <div className="text-[10px] text-slate-400">
                    Roll: <strong className="text-white">{verification.enrollmentId}</strong> • Batch {verification.graduationYear}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                <span>Top {100 - verification.collegeStandingPercentile}% University Standing</span>
                <span>ZK-Proof Hash: 0x8F4...29C</span>
              </div>
            </div>

            {/* Simulated OCR Scanner Form */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Scan className="w-4 h-4 text-brand-600" />
                <span>Simulate College ID Card OCR Re-scan</span>
              </h3>

              <form onSubmit={handleScanAndVerify} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    College Name
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadCollege}
                    onChange={(e) => setUploadCollege(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Degree & Branch
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadDegree}
                    onChange={(e) => setUploadDegree(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Roll / Enrollment ID
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadEnrollment}
                    onChange={(e) => setUploadEnrollment(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Current CGPA / Grade
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadCgpa}
                    onChange={(e) => setUploadCgpa(e.target.value)}
                    placeholder="e.g. 9.4"
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-4 flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">
                    {isScanning
                      ? '⚡ Running OCR computer vision extraction on college ID card...'
                      : scanComplete
                      ? '✓ Registry verified: Standing percentiles successfully calibrated.'
                      : 'Upload ID card image or test credentials to calculate live percentile standing.'}
                  </span>

                  <button
                    type="submit"
                    disabled={isScanning}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black disabled:opacity-50 shadow-sm transition"
                  >
                    {isScanning ? 'Scanning...' : 'Scan & Re-verify ID'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
