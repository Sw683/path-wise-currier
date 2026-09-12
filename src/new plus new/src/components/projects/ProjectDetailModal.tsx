import React, { useState } from 'react';
import { Project } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ExternalLink, 
  FolderGit2, 
  Users, 
  ShieldCheck, 
  Heart, 
  Send, 
  Lock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export const ProjectDetailModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const { showToast, currentUser, setActiveView } = useApp();
  const [requestedAccess, setRequestedAccess] = useState(false);
  const [liked, setLiked] = useState(project.isLiked);
  const [likesCount, setLikesCount] = useState(project.likesCount);

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(prev => Math.max(0, prev - 1));
    } else {
      setLiked(true);
      setLikesCount(prev => prev + 1);
      showToast('Liked project! ❤️');
    }
  };

  const handleAccessAction = () => {
    if (project.accessTier === 'Paid') {
      showToast(`Simulated Student Checkout: ₹${project.price || 199}. No real payment required in prototype! 🎉`);
    } else if (project.accessTier === 'Request Access') {
      setRequestedAccess(true);
      showToast('Access request dispatched to project lead! 📬');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Banner Image */}
        <div className="h-52 sm:h-64 relative bg-slate-900 overflow-hidden">
          <img
            src={project.screenshots[0]}
            alt={project.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Access Tier Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              project.accessTier === 'Free'
                ? 'bg-emerald-500 text-white'
                : project.accessTier === 'Paid'
                ? 'bg-amber-500 text-white'
                : 'bg-indigo-600 text-white'
            }`}>
              {project.accessTier} {project.price ? `(₹${project.price})` : ''}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/30">
              {project.category}
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <h2 className="text-xl sm:text-2xl font-black">{project.title}</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-1">{project.tagline}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Creator & Links Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <img
                src={project.creator.avatar}
                alt={project.creator.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  Lead: {project.creator.name}
                  {project.creator.isVerified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                </h4>
                <p className="text-[11px] text-slate-500">{project.creator.institution}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleLike}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  liked 
                    ? 'border-rose-300 bg-rose-50 text-rose-600' 
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{likesCount}</span>
              </button>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              About This Project
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map(tech => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Project Team ({project.teamMembers.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.teamMembers.map(member => (
                <div key={member.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center gap-3">
                  <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{member.name}</p>
                    <p className="text-[10px] text-slate-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teammate recruitment banner if seeking */}
          {project.lookingForTeammates && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Looking for Collaborators</span>
                </span>
                <span className="text-[10px] bg-emerald-200 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                  Active Recruitment
                </span>
              </div>
              <p className="text-xs text-emerald-900">
                This project is seeking: <strong>{project.neededRoles.join(', ')}</strong>
              </p>
              <button
                onClick={() => {
                  showToast('Application sent to project lead! Check notifications for updates. 🚀');
                }}
                className="mt-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Apply to Join Project Team
              </button>
            </div>
          )}

          {/* Access Tier details */}
          {project.accessTier !== 'Free' && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
              <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">
                  {project.accessTier === 'Paid' ? `Student License (₹${project.price})` : 'Request Access Gated'}
                </strong>
                <p className="mt-0.5 text-amber-900">
                  {project.accessTier === 'Paid'
                    ? 'Commercial or production license curated by student builders. Never automatically charged.'
                    : 'The project owner restricts source repository access to approved student researchers and collaborators.'}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl"
          >
            Close
          </button>

          {project.accessTier !== 'Free' && (
            <button
              onClick={handleAccessAction}
              disabled={requestedAccess}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
            >
              {requestedAccess 
                ? 'Access Request Pending ⏳' 
                : project.accessTier === 'Paid' 
                ? `Simulate Purchase (₹${project.price})` 
                : 'Request Repository Access'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
