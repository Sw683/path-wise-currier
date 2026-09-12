import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, FolderGit2, Sparkles, Upload } from 'lucide-react';
import { ProjectAccessTier } from '../../types';

export const CreateProjectModal: React.FC = () => {
  const { isCreateProjectOpen, setIsCreateProjectOpen, handleCreateProject } = useApp();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<any>('Web Development');
  const [difficulty, setDifficulty] = useState<any>('Intermediate');
  const [techStackInput, setTechStackInput] = useState('React, TypeScript, Tailwind');
  const [accessTier, setAccessTier] = useState<ProjectAccessTier>('Free');
  const [price, setPrice] = useState<number>(199);
  const [lookingForTeammates, setLookingForTeammates] = useState(true);
  const [neededRolesInput, setNeededRolesInput] = useState('Frontend Developer, Backend Engineer');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveDemoUrl, setLiveDemoUrl] = useState('');

  if (!isCreateProjectOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    handleCreateProject({
      title: title.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      category,
      difficulty,
      techStack: techStackInput.split(',').map(s => s.trim()).filter(Boolean),
      accessTier,
      price: accessTier === 'Paid' ? price : undefined,
      lookingForTeammates,
      neededRoles: neededRolesInput.split(',').map(r => r.trim()).filter(Boolean),
      githubUrl: githubUrl.trim() || undefined,
      liveDemoUrl: liveDemoUrl.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Publish Student Project</h3>
          </div>
          <button
            onClick={() => setIsCreateProjectOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          
          <div>
            <label className="font-bold text-slate-700 block mb-1">Project Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. IndicLingua - Real-time Regional Voice Translator"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Short Tagline</label>
            <input
              type="text"
              required
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              placeholder="One sentence describing what this project does and who it helps"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile Apps">Mobile Apps</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Robotics">Robotics</option>
                <option value="IoT">IoT</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Social Impact">Social Impact</option>
                <option value="Startups">Startups</option>
                <option value="Research">Research</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Difficulty Level</label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
              >
                <option value="Beginner">Beginner (Great for 1st/2nd years)</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced / Production Capstone</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Full Description</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe the problem, the architecture, challenges faced, and results achieved..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 resize-none text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Tech Stack (comma separated)</label>
            <input
              type="text"
              value={techStackInput}
              onChange={e => setTechStackInput(e.target.value)}
              placeholder="React, TypeScript, FastAPI, PyTorch, Docker"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Access Tier Selector (Section 12) */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <label className="font-bold text-slate-800 block">Project Access Model</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Free', 'Paid', 'Request Access'] as ProjectAccessTier[]).map(tier => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setAccessTier(tier)}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                    accessTier === tier
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>

            {accessTier === 'Paid' && (
              <div className="flex items-center gap-2 pt-1">
                <span className="font-semibold text-slate-600">Simulated Price (INR):</span>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                  className="w-28 px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-bold text-indigo-600"
                />
              </div>
            )}
          </div>

          {/* Looking for teammates toggle */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <label className="flex items-center gap-2 font-bold text-emerald-950 cursor-pointer">
              <input
                type="checkbox"
                checked={lookingForTeammates}
                onChange={e => setLookingForTeammates(e.target.checked)}
                className="accent-emerald-600 rounded"
              />
              <span>I am actively recruiting student collaborators</span>
            </label>

            {lookingForTeammates && (
              <div>
                <label className="text-[11px] font-semibold text-emerald-900 block mb-1">
                  Roles Needed (comma separated)
                </label>
                <input
                  type="text"
                  value={neededRolesInput}
                  onChange={e => setNeededRolesInput(e.target.value)}
                  placeholder="UI/UX Designer, Backend Golang Dev"
                  className="w-full px-3 py-1.5 rounded-lg border border-emerald-300 bg-white text-xs"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">GitHub / Code Repo URL</label>
              <input
                type="url"
                value={githubUrl}
                onChange={e => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Live Demo / URL</label>
              <input
                type="url"
                value={liveDemoUrl}
                onChange={e => setLiveDemoUrl(e.target.value)}
                placeholder="https://myproject.dev"
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreateProjectOpen(false)}
              className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md cursor-pointer"
            >
              Publish to Network 🚀
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
