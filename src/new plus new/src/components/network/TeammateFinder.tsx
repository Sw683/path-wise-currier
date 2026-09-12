import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { parseNaturalLanguageQuery, calculateTeammateMatches } from '../../utils/matchingAlgorithm';
import { 
  Sparkles, 
  Search, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  UserCheck, 
  AlertCircle, 
  Clock, 
  Lightbulb, 
  Zap 
} from 'lucide-react';

export const TeammateFinder: React.FC = () => {
  const { currentUser, students, connectedStudentIds, handleSendConnection, showToast } = useApp();

  const [promptQuery, setPromptQuery] = useState(
    'I know HTML and CSS. I am building an education platform and need JavaScript + backend developers.'
  );

  const [lastExecutedQuery, setLastExecutedQuery] = useState(promptQuery);

  const parsedQuery = parseNaturalLanguageQuery(lastExecutedQuery);
  const recommendedTeammates = calculateTeammateMatches(currentUser, students, parsedQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promptQuery.trim()) {
      setLastExecutedQuery(promptQuery.trim());
      showToast('Matching algorithm computed updated team recommendations! 🎯');
    }
  };

  const samplePrompts = [
    'I know HTML and CSS. I am building an education platform and need JavaScript + backend developers.',
    'Building an AI healthcare mobile app. Need PyTorch/FastAPI expert and medical researcher.',
    'Hackathon squad needed: Looking for a Figma UI/UX designer and Python developer.',
    'Robotics challenge: Looking for an embedded C++ and ROS developer from any college.',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-300 text-xs font-bold mb-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Intelligent Team Formation Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">FIND TEAMMATES & CO-BUILDERS</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Describe what you are building and what skills you are seeking. Our recommendation engine matches complementary skillsets, availability hours, and mutual academic interests.
        </p>

        {/* Natural Language Prompt Box */}
        <form onSubmit={handleSearchSubmit} className="mt-6 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={promptQuery}
            onChange={e => setPromptQuery(e.target.value)}
            placeholder="Type your project requirement in plain language..."
            className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-400 font-medium"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Recommendations</span>
          </button>
        </form>

        {/* Sample Prompt Chips */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-indigo-200">
          <span className="font-semibold text-slate-400">Try quick prompt:</span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setPromptQuery(p);
                setLastExecutedQuery(p);
                showToast('Analyzing teammate match criteria...');
              }}
              className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg transition-colors border border-white/10 truncate max-w-[280px]"
            >
              "{p.slice(0, 36)}..."
            </button>
          ))}
        </div>
      </div>

      {/* Methodology & Responsible AI Disclaimer (Prompt Section 11) */}
      <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-950 flex items-start gap-3 text-xs leading-relaxed">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block">Responsible Recommendation Notice:</strong>
          Match percentages are algorithmic recommendation scores based on shared interests, complementary technical stacks, and declared weekly availability. They do not claim guaranteed team success, but indicate high potential synergy.
        </div>
      </div>

      {/* Extracted Query Attributes */}
      {parsedQuery.requiredSkills.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-bold">Detected Requirements:</span>
          {parsedQuery.requiredSkills.map(sk => (
            <span key={sk} className="bg-indigo-100 text-indigo-900 px-2.5 py-1 rounded-lg font-semibold uppercase text-[10px]">
              Required: {sk}
            </span>
          ))}
          {parsedQuery.targetInterests?.map(int => (
            <span key={int} className="bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-lg font-semibold text-[10px]">
              Domain: {int}
            </span>
          ))}
        </div>
      )}

      {/* Recommendation Results Grid */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
          Recommended Team Members ({recommendedTeammates.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedTeammates.map(({ student, matchScore, matchReasons, complementarySkills, availabilityScore }) => {
            const isConnected = connectedStudentIds.includes(student.id);

            return (
              <div
                key={student.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Top Bar: Student Info & Recommendation Score Gauge */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs"
                      />
                      <div>
                        <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-1.5">
                          {student.name}
                          {student.verification.isVerified && (
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          )}
                        </h4>
                        <p className="text-xs text-slate-500">{student.headline.split('|')[0]}</p>
                        <p className="text-[11px] font-semibold text-indigo-600 mt-0.5">
                          🏛️ {student.universityName} • {student.currentYear}
                        </p>
                      </div>
                    </div>

                    {/* Recommendation Percentage Score */}
                    <div className="text-right shrink-0">
                      <div className="inline-flex flex-col items-end">
                        <span className="text-2xl font-black text-indigo-600 leading-none">
                          {matchScore}%
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                          Match Score
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Why this match was recommended */}
                  <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
                      Why Recommended
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {matchReasons.map((reason, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Complementary Skills Offered */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Skills Offered to Project
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {complementarySkills.map(sk => (
                        <span
                          key={sk}
                          className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200/80"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Collaboration Availability */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{availabilityScore} hrs/week available</span>
                    </div>
                    <span className="font-semibold text-slate-700">
                      Preferred: {student.collaboration.preferredRoles[0] || 'Contributor'}
                    </span>
                  </div>

                </div>

                {/* Bottom Action Bar */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5">
                  <button
                    onClick={() => handleSendConnection(student.id)}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isConnected
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20'
                    }`}
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>{isConnected ? 'Connection Active' : 'Connect & Pitch Project'}</span>
                  </button>

                  <button
                    onClick={() => {
                      showToast(`Invitation sent to ${student.name} to join your hackathon squad! 🏆`);
                    }}
                    className="py-2.5 px-4 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    Invite to Team
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
