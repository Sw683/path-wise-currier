import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  FolderGit2,
  Briefcase,
  Award,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Layers,
  FileCode,
  Users,
} from 'lucide-react';
import { Layer2Project, Layer2Experience } from '../../types/campus';

interface Layer2ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjects?: Layer2Project[];
  initialExperiences?: Layer2Experience[];
  onSave: (projects: Layer2Project[], experiences: Layer2Experience[]) => void;
}

export const Layer2ProfileModal: React.FC<Layer2ProfileModalProps> = ({
  isOpen,
  onClose,
  initialProjects = [],
  initialExperiences = [],
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'experiences'>('projects');
  const [projects, setProjects] = useState<Layer2Project[]>(initialProjects);
  const [experiences, setExperiences] = useState<Layer2Experience[]>(initialExperiences);

  // Form states for new project
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectTech, setNewProjectTech] = useState('');
  const [newProjectLink, setNewProjectLink] = useState('');
  const [newProjectTeamSize, setNewProjectTeamSize] = useState<number>(1);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Form states for new experience
  const [newExpType, setNewExpType] = useState<Layer2Experience['type']>('hackathon');
  const [newExpTitle, setNewExpTitle] = useState('');
  const [newExpOrg, setNewExpOrg] = useState('');
  const [newExpDuration, setNewExpDuration] = useState('');
  const [newExpDetails, setNewExpDetails] = useState('');
  const [isAddingExp, setIsAddingExp] = useState(false);

  if (!isOpen) return null;

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim() || !newProjectDesc.trim()) return;

    const techArray = newProjectTech
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const project: Layer2Project = {
      id: `proj-${Date.now()}`,
      title: newProjectTitle.trim(),
      description: newProjectDesc.trim(),
      techStack: techArray.length > 0 ? techArray : ['Full-Stack'],
      linkUrl: newProjectLink.trim() || undefined,
      teamSize: Number(newProjectTeamSize) || 1,
    };

    setProjects((prev) => [project, ...prev]);
    setNewProjectTitle('');
    setNewProjectDesc('');
    setNewProjectTech('');
    setNewProjectLink('');
    setNewProjectTeamSize(1);
    setIsAddingProject(false);
  };

  const handleRemoveProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpTitle.trim() || !newExpOrg.trim()) return;

    const exp: Layer2Experience = {
      id: `exp-${Date.now()}`,
      type: newExpType,
      title: newExpTitle.trim(),
      organization: newExpOrg.trim(),
      duration: newExpDuration.trim() || undefined,
      details: newExpDetails.trim(),
    };

    setExperiences((prev) => [exp, ...prev]);
    setNewExpTitle('');
    setNewExpOrg('');
    setNewExpDuration('');
    setNewExpDetails('');
    setIsAddingExp(false);
  };

  const handleRemoveExperience = (id: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };

  const handleSaveAll = () => {
    onSave(projects, experiences);
    onClose();
  };

  const strengthGain = Math.min(100, 70 + projects.length * 8 + experiences.length * 7);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Layer 2: Portfolio & Deep Track Record</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  +{strengthGain}% Profile Strength
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Showcase your real-world projects, hackathon wins, internships, and lab research.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-900/50">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition ${
              activeTab === 'projects'
                ? 'border-brand-500 text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            Projects & Repositories ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('experiences')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition ${
              activeTab === 'experiences'
                ? 'border-brand-500 text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            Hackathons, Internships & Clubs ({experiences.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">Showcase Projects</h4>
                  <p className="text-xs text-slate-400">
                    Projects help peers, hackathon organizers, and recruiters assess your execution ability.
                  </p>
                </div>
                {!isAddingProject && (
                  <button
                    onClick={() => setIsAddingProject(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-semibold transition"
                  >
                    <Plus className="w-4 h-4" />
                    Add Project
                  </button>
                )}
              </div>

              {/* Add Project Form */}
              {isAddingProject && (
                <form
                  onSubmit={handleAddProject}
                  className="bg-slate-800/80 border border-brand-500/40 rounded-xl p-4 space-y-3 animate-fadeIn"
                >
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <span className="text-xs font-bold text-brand-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> New Project Showcase
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddingProject(false)}
                      className="text-slate-400 hover:text-white text-xs"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={newProjectTitle}
                        onChange={(e) => setNewProjectTitle(e.target.value)}
                        placeholder="e.g. Autonomous Delivery Drone System"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">
                        Project Link / GitHub URL
                      </label>
                      <input
                        type="url"
                        value={newProjectLink}
                        onChange={(e) => setNewProjectLink(e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      Brief Description *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={newProjectDesc}
                      onChange={(e) => setNewProjectDesc(e.target.value)}
                      placeholder="What problem does it solve? What was your core technical contribution?"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">
                        Tech Stack (Comma-separated)
                      </label>
                      <input
                        type="text"
                        value={newProjectTech}
                        onChange={(e) => setNewProjectTech(e.target.value)}
                        placeholder="React, TypeScript, PyTorch, Docker"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">
                        Team Size
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={newProjectTeamSize}
                        onChange={(e) => setNewProjectTeamSize(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingProject(false)}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-brand-500 hover:bg-brand-400 text-white rounded-lg text-xs font-semibold transition"
                    >
                      Save Project
                    </button>
                  </div>
                </form>
              )}

              {/* Projects List */}
              {projects.length === 0 && !isAddingProject ? (
                <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl bg-slate-900/40">
                  <FileCode className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                  <p className="text-xs text-slate-400">No projects added yet.</p>
                  <p className="text-[11px] text-slate-500">
                    Adding projects increases your profile strength and attracts hackathon squad invites!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 flex items-start justify-between gap-4 hover:border-slate-600 transition"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h5 className="text-sm font-semibold text-white">{proj.title}</h5>
                          {proj.teamSize && proj.teamSize > 1 && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                              <Users className="w-3 h-3" /> Team of {proj.teamSize}
                            </span>
                          )}
                          {proj.linkUrl && (
                            <a
                              href={proj.linkUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] text-brand-400 hover:text-brand-300"
                            >
                              <ExternalLink className="w-3 h-3" /> Link
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-medium px-2 py-0.5 rounded bg-brand-500/10 text-brand-300 border border-brand-500/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveProject(proj.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded transition"
                        title="Remove Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'experiences' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">Experience & Activities</h4>
                  <p className="text-xs text-slate-400">
                    Include hackathon participations, internships, student clubs, and research work.
                  </p>
                </div>
                {!isAddingExp && (
                  <button
                    onClick={() => setIsAddingExp(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-semibold transition"
                  >
                    <Plus className="w-4 h-4" />
                    Add Experience
                  </button>
                )}
              </div>

              {/* Add Experience Form */}
              {isAddingExp && (
                <form
                  onSubmit={handleAddExperience}
                  className="bg-slate-800/80 border border-brand-500/40 rounded-xl p-4 space-y-3 animate-fadeIn"
                >
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <span className="text-xs font-bold text-brand-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> New Experience / Achievement
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddingExp(false)}
                      className="text-slate-400 hover:text-white text-xs"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">
                        Category *
                      </label>
                      <select
                        value={newExpType}
                        onChange={(e) => setNewExpType(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500"
                      >
                        <option value="hackathon">Hackathon</option>
                        <option value="internship">Internship</option>
                        <option value="research">Research / Lab</option>
                        <option value="club">Student Club / Society</option>
                        <option value="certification">Certification</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">
                        Role / Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={newExpTitle}
                        onChange={(e) => setNewExpTitle(e.target.value)}
                        placeholder="e.g. Winner (Top 3) or SDE Intern"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">
                        Organization / Event *
                      </label>
                      <input
                        type="text"
                        required
                        value={newExpOrg}
                        onChange={(e) => setNewExpOrg(e.target.value)}
                        placeholder="e.g. Smart India Hackathon or Startup"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">
                        Duration / Date
                      </label>
                      <input
                        type="text"
                        value={newExpDuration}
                        onChange={(e) => setNewExpDuration(e.target.value)}
                        placeholder="e.g. 36 Hours (Jan 2025) or 2 Months"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">
                        Key Accomplishment / Detail
                      </label>
                      <input
                        type="text"
                        value={newExpDetails}
                        onChange={(e) => setNewExpDetails(e.target.value)}
                        placeholder="e.g. Built automated fraud detection pipeline using Python"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingExp(false)}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-brand-500 hover:bg-brand-400 text-white rounded-lg text-xs font-semibold transition"
                    >
                      Save Experience
                    </button>
                  </div>
                </form>
              )}

              {/* Experiences List */}
              {experiences.length === 0 && !isAddingExp ? (
                <div className="text-center py-8 border border-dashed border-slate-800 rounded-xl bg-slate-900/40">
                  <Briefcase className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                  <p className="text-xs text-slate-400">No experiences added yet.</p>
                  <p className="text-[11px] text-slate-500">
                    Even small milestones like participating in your first hackathon count!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 flex items-start justify-between gap-4 hover:border-slate-600 transition"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                            {exp.type}
                          </span>
                          <h5 className="text-sm font-semibold text-white">{exp.title}</h5>
                          <span className="text-xs text-slate-400">@ {exp.organization}</span>
                          {exp.duration && (
                            <span className="text-[11px] text-slate-500">({exp.duration})</span>
                          )}
                        </div>
                        {exp.details && (
                          <p className="text-xs text-slate-300 leading-relaxed">{exp.details}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveExperience(exp.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded transition"
                        title="Remove Experience"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Profile will update to {strengthGain}% complete</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition"
            >
              Close
            </button>
            <button
              onClick={handleSaveAll}
              className="px-5 py-2 bg-gradient-to-r from-brand-500 to-ocean-600 hover:from-brand-400 hover:to-ocean-500 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              Save to Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
