import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Layers, ArrowRight, ShieldCheck, LifeBuoy } from 'lucide-react';

export const CareerTreeVisualizer: React.FC = () => {
  const { setActiveTab } = useApp();
  const [selectedNode, setSelectedNode] = useState<string>('pcm');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30 mb-2">
          <Layers className="w-3.5 h-3.5" /> Interactive Visual Decision Tree
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] tracking-tight">
          Visual Career Branches & Recovery Loops
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
          Explore how subject choices branch into entrance exams, colleges, and long-term careers. Notice how failure recovery loops reconnect back to the same destination careers!
        </p>
      </div>

      {/* Stream Selector Buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { id: 'pcm', label: '?? PCM (Engineering, AI, Defense, Research)' },
          { id: 'pcb', label: '?? PCB (Medicine, Dentistry, Biotech, Allied)' },
          { id: 'commerce', label: '?? Commerce (CA, CS, Finance, Analytics)' },
          { id: 'humanities', label: '?? Humanities & Law (Civil Services, Design)' }
        ].map((stream) => (
          <button
            key={stream.id}
            onClick={() => setSelectedNode(stream.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-xs ${
              selectedNode === stream.id
                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {stream.label}
          </button>
        ))}
      </div>

      {/* Interactive Visual SVG Graph Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 overflow-x-auto">
        <div className="min-w-[700px] flex flex-col items-center space-y-6">
          
          {/* Root Level: Class 10 Foundation */}
          <div className="px-6 py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-md text-center">
            ?? Class 10: Foundational Self-Understanding & Aptitude
          </div>

          <div className="w-0.5 h-8 bg-slate-300" />

          {/* Level 1: Stream Choice */}
          <div className="p-4 rounded-2xl bg-brand-50 border-2 border-brand-500 text-center max-w-md">
            <span className="text-xs font-extrabold text-brand-900 uppercase tracking-wide">
              Selected Stream: {selectedNode.toUpperCase()}
            </span>
            <p className="text-[11px] text-brand-700 mt-0.5">
              {selectedNode === 'pcm' && 'Physics + Chemistry + Mathematics'}
              {selectedNode === 'pcb' && 'Physics + Chemistry + Biology'}
              {selectedNode === 'commerce' && 'Accountancy + Business + Economics (+ Maths)'}
              {selectedNode === 'humanities' && 'History + Political Science + Economics / Legal'}
            </p>
          </div>

          <div className="w-0.5 h-8 bg-slate-300" />

          {/* Level 2: Primary Entrance Exams & Alternative Schemes */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
            {selectedNode === 'pcm' && (
              <>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-center text-xs">
                  <div className="font-bold text-purple-900">JEE Advanced</div>
                  <div className="text-[10px] text-purple-700">Top Tier IITs</div>
                </div>
                <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl text-center text-xs">
                  <div className="font-bold text-brand-900">JEE Main / State CETs</div>
                  <div className="text-[10px] text-brand-700">NITs & State Gov Colleges</div>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs">
                  <div className="font-bold text-emerald-900">NDA / IAT (IISER)</div>
                  <div className="text-[10px] text-emerald-700">Defence & Pure Research</div>
                </div>
              </>
            )}

            {selectedNode === 'pcb' && (
              <>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-center text-xs">
                  <div className="font-bold text-purple-900">NEET-UG (Top Rank)</div>
                  <div className="text-[10px] text-purple-700">AIIMS & State GMCs (MBBS)</div>
                </div>
                <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl text-center text-xs">
                  <div className="font-bold text-brand-900">BDS / BVSc / BAMS</div>
                  <div className="text-[10px] text-brand-700">Clinical Healthcare</div>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs">
                  <div className="font-bold text-emerald-900">CUET / ICAR AIEEA</div>
                  <div className="text-[10px] text-emerald-700">Biotech & Agriculture</div>
                </div>
              </>
            )}

            {selectedNode === 'commerce' && (
              <>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-center text-xs">
                  <div className="font-bold text-purple-900">CA Foundation</div>
                  <div className="text-[10px] text-purple-700">ICAI Chartered Route</div>
                </div>
                <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl text-center text-xs">
                  <div className="font-bold text-brand-900">CUET B.Com (Hons)</div>
                  <div className="text-[10px] text-brand-700">SRCC & Top Universities</div>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs">
                  <div className="font-bold text-emerald-900">IPMAT (IIM Indore)</div>
                  <div className="text-[10px] text-emerald-700">Integrated BBA + MBA</div>
                </div>
              </>
            )}

            {selectedNode === 'humanities' && (
              <>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-center text-xs">
                  <div className="font-bold text-purple-900">CLAT / AILET</div>
                  <div className="text-[10px] text-purple-700">5-Yr Integrated Law NLUs</div>
                </div>
                <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl text-center text-xs">
                  <div className="font-bold text-brand-900">UCEED / NID DAT</div>
                  <div className="text-[10px] text-brand-700">Product Design & UI/UX</div>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs">
                  <div className="font-bold text-emerald-900">CUET Central Univ</div>
                  <div className="text-[10px] text-emerald-700">Pol Sci / Econ ? UPSC</div>
                </div>
              </>
            )}
          </div>

          {/* Recovery Loop Demonstration */}
          <div className="w-full max-w-2xl p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between gap-4 text-xs text-amber-950">
            <div className="flex items-center gap-2">
              <LifeBuoy className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold block">If Tier-1 Entrance Exam Cutoff is Missed:</span>
                <span className="text-[11px] text-slate-600">State Colleges / BCA / BSc + Project Portfolio / NIMCET</span>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-amber-600 text-white font-bold rounded-lg text-[10px] shrink-0">
              Recovery Loop ??
            </span>
          </div>

          <div className="w-0.5 h-8 bg-slate-300" />

          {/* Level 4: Long-Term Destination Careers */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-center shadow-md max-w-md w-full">
            <span className="text-xs font-bold uppercase tracking-wider block text-emerald-200">Ultimate Destination</span>
            <div className="text-base font-extrabold font-['Outfit'] mt-1">
              {selectedNode === 'pcm' && 'Software/AI Engineer, Data Scientist, Aerospace, Research'}
              {selectedNode === 'pcb' && 'Medical Specialist, Dental Surgeon, Biotechnologist, Clinical Researcher'}
              {selectedNode === 'commerce' && 'Chartered Accountant, Investment Banker, CFO, Corporate Strategist'}
              {selectedNode === 'humanities' && 'Corporate Lawyer, Civil Services IAS/IPS, Product Designer, Diplomat'}
            </div>
            <p className="text-[11px] text-emerald-100 mt-1">
              Both Plan A and Failure Recovery Paths converge to high-impact career excellence!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
