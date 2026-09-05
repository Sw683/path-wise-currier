import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  LifeBuoy, 
  CheckCircle2, 
  Coins, 
  Building2, 
  Briefcase, 
  Zap,
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react';
import { CAREER_PATHS } from '../data/careers';

export const PathSimulator: React.FC = () => {
  const { activeProfile } = useApp();

  const [selectedCareerId, setSelectedCareerId] = useState<string>('software-ai-engineer');
  const [simulatePlanAFail, setSimulatePlanAFail] = useState<boolean>(false);
  const [coachingScenario, setCoachingScenario] = useState<'self_study' | 'budget' | 'intensive'>('self_study');
  const [budgetScenario, setBudgetScenario] = useState<'low' | 'moderate' | 'high'>('low');
  const [locationScenario, setLocationScenario] = useState<'local' | 'metro'>('local');

  const career = CAREER_PATHS.find((c) => c.id === selectedCareerId) || CAREER_PATHS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-brand-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
            <Cpu className="w-3.5 h-3.5" /> Interactive ?What If I Choose This?? Simulator
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
            Career Pathway & Failure-Recovery Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            Explore step-by-step career timelines from Class 8 to Senior Industry levels. Test scenarios: what happens if JEE/NEET isn?t cleared or if family budget shifts?
          </p>
        </div>

        {/* Career Selector Dropdown */}
        <div className="w-full md:w-auto">
          <label className="block text-xs text-brand-300 font-semibold mb-1">Select Simulated Career:</label>
          <select
            value={selectedCareerId}
            onChange={(e) => setSelectedCareerId(e.target.value)}
            className="w-full md:w-72 px-3.5 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 text-xs font-bold focus:ring-2 focus:ring-brand-400 focus:outline-none"
          >
            {CAREER_PATHS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Scenario Control Panel (What-If Variables) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm font-['Outfit'] mb-4">
          <SlidersHorizontal className="w-4 h-4 text-brand-600" /> Adjust Simulation Variables
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Var 1: Plan A Entrance Failure Toggle */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
            <label className="text-xs font-bold text-amber-900 block mb-1.5 flex items-center justify-between">
              <span>Simulate Plan A Failure</span>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            </label>
            <button
              onClick={() => setSimulatePlanAFail(!simulatePlanAFail)}
              className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                simulatePlanAFail
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              {simulatePlanAFail ? '? Plan A Exam Missed' : '? Plan A Target Active'}
            </button>
          </div>

          {/* Var 2: Coaching Budget Mode */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="text-xs font-bold text-slate-800 block mb-1.5">Coaching Mode</label>
            <select
              value={coachingScenario}
              onChange={(e) => setCoachingScenario(e.target.value as any)}
              className="w-full py-2 px-2.5 rounded-xl bg-white border border-slate-300 text-xs font-medium text-slate-800"
            >
              <option value="self_study">Free YouTube / NPTEL / Books</option>
              <option value="budget">Affordable Online Courses (&lt;?10k)</option>
              <option value="intensive">Intensive Offline Coaching</option>
            </select>
          </div>

          {/* Var 3: Family College Budget */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="text-xs font-bold text-slate-800 block mb-1.5">College Budget</label>
            <select
              value={budgetScenario}
              onChange={(e) => setBudgetScenario(e.target.value as any)}
              className="w-full py-2 px-2.5 rounded-xl bg-white border border-slate-300 text-xs font-medium text-slate-800"
            >
              <option value="low">Low (&lt;?1.5L - Gov / Scholarships)</option>
              <option value="moderate">Moderate (?3L??8L State)</option>
              <option value="high">High (&gt;?10L Private Merit)</option>
            </select>
          </div>

          {/* Var 4: Relocation Preference */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="text-xs font-bold text-slate-800 block mb-1.5">Location Preference</label>
            <select
              value={locationScenario}
              onChange={(e) => setLocationScenario(e.target.value as any)}
              className="w-full py-2 px-2.5 rounded-xl bg-white border border-slate-300 text-xs font-medium text-slate-800"
            >
              <option value="local">Stay Local / State Engineering</option>
              <option value="metro">Relocate to National Tech Hub</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Simulation Tree */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">
              Simulated Journey: {career.title}
            </h2>
            <span className="text-xs text-slate-500">
              Stream: {career.requiredStream.join(' / ')} ? Duration: {career.studyDurationYears} ? Starting CTC: {career.startingSalaryRange}
            </span>
          </div>

          {simulatePlanAFail && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
              <LifeBuoy className="w-4 h-4 text-amber-700" /> Plan A Failure Recovery Active
            </div>
          )}
        </div>

        {/* Step-by-Step Simulated Flow */}
        <div className="space-y-4">
          
          {/* Stage 1: Class 8?10 Foundations */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 relative">
            <div className="flex items-center justify-between font-bold text-sm text-slate-900 mb-1">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center">1</span>
                Class 8?10 Foundation Phase
              </span>
              <span className="text-xs text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-md font-semibold">Age 13?15</span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Build high speed in Mathematics, logic, and general science. Start basic Python / micro-skills (20 mins/day). Participate in school science exhibitions.
            </p>
          </div>

          {/* Stage 2: Class 11?12 Stream Selection */}
          <div className="p-4 sm:p-5 rounded-2xl bg-brand-50/50 border border-brand-200 relative">
            <div className="flex items-center justify-between font-bold text-sm text-brand-950 mb-1">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center">2</span>
                Class 11?12 Stream Selection ({career.requiredStream[0]})
              </span>
              <span className="text-xs text-brand-700 bg-brand-100 px-2.5 py-0.5 rounded-md font-semibold">Age 15?17</span>
            </div>
            <p className="text-xs text-brand-900 mt-2 leading-relaxed">
              Study {career.requiredStream[0]} subjects. Balance Board syllabus with state exam question banks. 
              {coachingScenario === 'self_study' && ' Use free YouTube lectures (Mohit Tyagi / Alakh Pandey / NPTEL) + NCERT.'}
            </p>
          </div>

          {/* Stage 3: Entrance Exam & Branching Point */}
          <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
            simulatePlanAFail 
              ? 'bg-amber-50/80 border-amber-300' 
              : 'bg-indigo-50/50 border-indigo-200'
          }`}>
            <div className="flex items-center justify-between font-bold text-sm text-slate-900 mb-1">
              <span className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center ${simulatePlanAFail ? 'bg-amber-600' : 'bg-indigo-600'}`}>3</span>
                Entrance Exam Milestone ({career.primaryExams.join(' / ')})
              </span>
              <span className="text-xs text-slate-600 font-semibold">Class 12 Exit</span>
            </div>

            {!simulatePlanAFail ? (
              <div className="mt-2 text-xs text-slate-700 leading-relaxed">
                <p className="font-semibold text-indigo-900">Plan A Cleared:</p>
                <p>Top percentile secured in {career.primaryExams[0]}. Admission to Tier-1 / Tier-2 Government institutions ({career.ambitiousPath.institutions.slice(0, 3).join(', ')}).</p>
              </div>
            ) : (
              <div className="mt-2 text-xs text-amber-950 leading-relaxed space-y-1.5">
                <p className="font-bold text-amber-900 flex items-center gap-1.5">
                  <LifeBuoy className="w-4 h-4 text-amber-600" /> Plan A Entrance Not Cleared ? Failure Recovery Route:
                </p>
                <p className="text-slate-700">
                  {career.backupPath.description}
                </p>
                <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs font-semibold text-amber-900">
                  ??? Recovery Destination: {career.backupPath.title} ? Same destination career reached via GitHub skills / NIMCET / LeetCode within 18?24 months.
                </div>
              </div>
            )}
          </div>

          {/* Stage 4: Undergraduate Degree & Skill Mastery */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 relative">
            <div className="flex items-center justify-between font-bold text-sm text-slate-900 mb-1">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center">4</span>
                Undergraduate Years (Years 1?4)
              </span>
              <span className="text-xs text-slate-500 font-semibold">College Stage</span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Master required skills: <span className="font-semibold text-slate-800">{career.skillsRequired.join(', ')}</span>. Build 3 portfolio projects, contribute to open source, and secure summer internships.
            </p>
          </div>

          {/* Stage 5: First Job & Long Term CTC */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 relative">
            <div className="flex items-center justify-between font-bold text-sm text-emerald-950 mb-1">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">5</span>
                Career Launch & Long Term Trajectory
              </span>
              <span className="text-xs text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md font-semibold">Post-Graduation</span>
            </div>
            <div className="mt-2 text-xs text-emerald-900 leading-relaxed grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-white rounded-xl border border-emerald-200">
                <span className="text-slate-500 block text-[11px]">Starting Salary Range:</span>
                <span className="text-sm font-bold text-slate-900">{career.startingSalaryRange}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-emerald-200">
                <span className="text-slate-500 block text-[11px]">5?10 Year Mid-Career Range:</span>
                <span className="text-sm font-bold text-slate-900">{career.midCareerSalaryRange}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Critical Lesson Callout */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-brand-950 text-white shadow-lg flex items-start gap-4">
        <Sparkles className="w-6 h-6 text-brand-400 shrink-0 mt-1" />
        <div className="space-y-1 text-xs sm:text-sm">
          <h3 className="font-bold text-base font-['Outfit'] text-white">The Core Insight for Students & Parents</h3>
          <p className="text-slate-300 leading-relaxed">
            In modern India, skills, portfolios, and perseverance outweigh any single entrance examination. One exam attempt does not define your life?having resilient Plan B and Plan C strategies ensures you reach the exact same long-term career destination.
          </p>
        </div>
      </div>

    </div>
  );
};
