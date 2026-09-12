import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProjectDetailModal } from './ProjectDetailModal';
import { 
  FolderGit2, 
  Search, 
  Filter, 
  PlusCircle, 
  Heart, 
  ExternalLink, 
  ShieldCheck, 
  Users, 
  Lock, 
  Check, 
  Sparkles, 
  Star 
} from 'lucide-react';
import { Project } from '../../types';

export const ProjectsExplorer: React.FC = () => {
  const { 
    projects, 
    setIsCreateProjectOpen, 
    selectedProjectId, 
    setSelectedProjectId,
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedAccessTier, setSelectedAccessTier] = useState<string>('All');
  const [onlyHiring, setOnlyHiring] = useState(false);

  const categories = [
    'All',
    'Web Development',
    'Mobile Apps',
    'AI/ML',
    'Robotics',
    'IoT',
    'Cybersecurity',
    'Education',
    'Healthcare',
    'Finance',
    'Social Impact',
    'Startups',
    'Research'
  ];

  const filteredProjects = projects.filter(p => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) return false;
    if (selectedAccessTier !== 'All' && p.accessTier !== selectedAccessTier) return false;
    if (onlyHiring && !p.lookingForTeammates) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = p.title.toLowerCase().includes(q);
      const matchesTagline = p.tagline.toLowerCase().includes(q);
      const matchesTech = p.techStack.some(t => t.toLowerCase().includes(q));
      const matchesCreator = p.creator.name.toLowerCase().includes(q) || p.creator.institution.toLowerCase().includes(q);
      return matchesTitle || matchesTagline || matchesTech || matchesCreator;
    }

    return true;
  });

  const activeModalProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-300 text-xs font-bold mb-2">
            <FolderGit2 className="w-4 h-4 text-indigo-400" />
            <span>Open & Commercial Student Projects</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">EXPLORE STUDENT PROJECTS</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Discover software, hardware, and research initiatives built by students across universities. Join open teams or share your own build.
          </p>
        </div>

        <button
          onClick={() => setIsCreateProjectOpen(true)}
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish Project</span>
        </button>
      </div>

      {/* Category Tabs Scroll */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map(cat => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Filters Row */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by technology (React, Python), keyword, or college..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white"
            />
          </div>

          <div>
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner Friendly</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced Capstone</option>
            </select>
          </div>

          <div>
            <select
              value={selectedAccessTier}
              onChange={e => setSelectedAccessTier(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white"
            >
              <option value="All">All Licenses</option>
              <option value="Free">Free / Open Source</option>
              <option value="Paid">Paid / Commercial</option>
              <option value="Request Access">Request Access</option>
            </select>
          </div>

        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={onlyHiring}
              onChange={e => setOnlyHiring(e.target.checked)}
              className="accent-indigo-600 rounded"
            />
            <span>Show Only Projects Looking for Teammates</span>
          </label>

          <span>Showing <strong>{filteredProjects.length}</strong> projects</span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div
            key={project.id}
            onClick={() => setSelectedProjectId(project.id)}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              
              {/* Screenshot cover */}
              <div className="h-44 relative bg-slate-900 overflow-hidden">
                <img
                  src={project.screenshots[0]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                {/* Access badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    project.accessTier === 'Free' 
                      ? 'bg-emerald-500 text-white' 
                      : project.accessTier === 'Paid' 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-indigo-600 text-white'
                  }`}>
                    {project.accessTier} {project.price ? `(₹${project.price})` : ''}
                  </span>
                </div>

                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md text-white text-[10px] font-semibold border border-white/20">
                  {project.category}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] text-indigo-300 font-semibold uppercase tracking-wider block">
                    {project.difficulty}
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base leading-tight truncate">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 space-y-3">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 3).map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px]">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                {/* Looking for teammates callout */}
                {project.lookingForTeammates && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-900 font-medium flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Recruiting: {project.neededRoles[0]}</span>
                    </span>
                    <span className="font-bold text-emerald-700 text-[10px] bg-emerald-100 px-1.5 py-0.2 rounded-sm">
                      Open
                    </span>
                  </div>
                )}

              </div>
            </div>

            {/* Footer Bar */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <img
                  src={project.creator.avatar}
                  alt={project.creator.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-[11px] font-bold text-slate-700 truncate max-w-[120px]">
                  {project.creator.name}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[11px]">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>{project.likesCount}</span>
                </span>
                <span className="font-bold text-indigo-600 hover:underline">
                  View →
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {activeModalProject && (
        <ProjectDetailModal
          project={activeModalProject}
          onClose={() => setSelectedProjectId(null)}
        />
      )}

    </div>
  );
};
