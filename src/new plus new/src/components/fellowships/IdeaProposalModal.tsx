import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Award, Lightbulb, Sparkles, Send } from 'lucide-react';

export const IdeaProposalModal: React.FC = () => {
  const { isSubmitIdeaOpen, setIsSubmitIdeaOpen, handleSubmitIdea } = useApp();

  const [title, setTitle] = useState('');
  const [track, setTrack] = useState<any>('Project Idea');
  const [currentStage, setCurrentStage] = useState<any>('Concept / Idea');
  const [problemStatement, setProblemStatement] = useState('');
  const [proposedSolution, setProposedSolution] = useState('');
  const [techDomain, setTechDomain] = useState('Web, AI, Healthcare');
  const [estimatedFunding, setEstimatedFunding] = useState('₹1,50,000 for prototype & clinical trials');

  if (!isSubmitIdeaOpen) return null;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !problemStatement.trim()) return;

    handleSubmitIdea({
      title: title.trim(),
      track,
      currentStage,
      problemStatement: problemStatement.trim(),
      proposedSolution: proposedSolution.trim(),
      techOrDomain: techDomain.split(',').map(s => s.trim()).filter(Boolean),
      estimatedFunding: estimatedFunding.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-amber-50 to-amber-100/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Submit Innovation / Grant Proposal</h3>
              <p className="text-[11px] text-slate-500">
                Match your concept with DST grants, incubation programs, and hackathon bounties.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSubmitIdeaOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={onSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          
          <div>
            <label className="font-bold text-slate-700 block mb-1">Proposal Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Low-Cost IoT Water Leakage Detection for Public Hostels"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Innovation Track</label>
              <select
                value={track}
                onChange={e => setTrack(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
              >
                <option value="Project Idea">Student Project Idea</option>
                <option value="Research Proposal">Academic Research Proposal</option>
                <option value="Startup Innovation">Startup / Commercial Venture</option>
                <option value="Social Impact">Social Impact Initiative</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Current Maturity Stage</label>
              <select
                value={currentStage}
                onChange={e => setCurrentStage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
              >
                <option value="Concept / Idea">Concept / Idea (Paper draft)</option>
                <option value="Design & Architecture">Design & Architecture Locked</option>
                <option value="Prototype in Progress">Working Prototype in Lab</option>
                <option value="MVP Tested">MVP Tested with 50+ Users</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Problem Statement</label>
            <textarea
              required
              rows={3}
              value={problemStatement}
              onChange={e => setProblemStatement(e.target.value)}
              placeholder="What urgent problem in campus life, health, agriculture, or technology does this address?"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 resize-none text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Proposed Technical Solution</label>
            <textarea
              required
              rows={3}
              value={proposedSolution}
              onChange={e => setProposedSolution(e.target.value)}
              placeholder="How will your engineering or scientific approach solve this problem uniquely?"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 resize-none text-xs sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Domain / Tech Keywords</label>
              <input
                type="text"
                value={techDomain}
                onChange={e => setTechDomain(e.target.value)}
                placeholder="IoT, Embedded, Edge AI"
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Estimated Grant / Funding Need</label>
              <input
                type="text"
                value={estimatedFunding}
                onChange={e => setEstimatedFunding(e.target.value)}
                placeholder="e.g. ₹2,00,000"
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          {/* Ethics Disclaimer (Section 18) */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
            <strong className="block font-bold">Important Discovery Clarification:</strong>
            Submitting an idea initiates automated and peer matching with active open grant programs. CampusNexus matches candidates with legitimate providers but does not promise or disburse speculative capital directly.
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsSubmitIdeaOpen(false)}
              className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md cursor-pointer"
            >
              Submit for Grant Matching 🎯
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
