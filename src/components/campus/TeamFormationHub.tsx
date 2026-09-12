import React, { useState } from 'react';
import {
  SKILLED_STUDENTS,
  PROJECT_SHOWCASES,
  COLLEGES,
} from '../../data/campusData';
import {
  StudentSkillProfile,
  ProjectShowcase,
} from '../../types/campus';
import {
  Users,
  Search,
  Filter,
  Sparkles,
  Github,
  Linkedin,
  Globe,
  Star,
  CheckCircle,
  Plus,
  Send,
  Video,
  Award,
  Layers,
  ArrowRight,
  Clock,
  X,
  Check,
} from 'lucide-react';

export const TeamFormationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'find_peers' | 'projects'>('find_peers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [students, setStudents] = useState<StudentSkillProfile[]>(SKILLED_STUDENTS);
  const [projects, setProjects] = useState<ProjectShowcase[]>(PROJECT_SHOWCASES);

  // Invite Modal State
  const [selectedStudentForInvite, setSelectedStudentForInvite] = useState<StudentSkillProfile | null>(null);
  const [inviteProjectName, setInviteProjectName] = useState('');
  const [inviteRole, setInviteRole] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [inviteSent, setInviteSent] = useState(false);

  // Join Project Modal State
  const [selectedProjectForJoin, setSelectedProjectForJoin] = useState<ProjectShowcase | null>(null);
  const [joinRoleSelected, setJoinRoleSelected] = useState('');
  const [joinNote, setJoinNote] = useState('');
  const [joinSubmitted, setJoinSubmitted] = useState(false);

  // Create Project Modal State
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectTagline, setNewProjectTagline] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectTech, setNewProjectTech] = useState('');
  const [newProjectHackathon, setNewProjectHackathon] = useState('');
  const [newProjectRoles, setNewProjectRoles] = useState(['Frontend Developer', 'UI/UX Designer']);

  const popularSkills = [
    'all',
    'PyTorch',
    'Rust',
    'React',
    'Solidity',
    'Flutter',
    'UI/UX Design',
    'ROS2',
    'Go',
    'Docker',
    'Computer Vision',
  ];

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.topSkills.some((sk) => sk.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSkill =
      selectedSkill === 'all' ||
      s.topSkills.some((sk) => sk.toLowerCase() === selectedSkill.toLowerCase());

    const matchesCollege =
      selectedCollege === 'all' || s.collegeName === selectedCollege;

    return matchesSearch && matchesSkill && matchesCollege;
  });

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((ts) => ts.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSkill =
      selectedSkill === 'all' ||
      p.techStack.some((ts) => ts.toLowerCase() === selectedSkill.toLowerCase());

    return matchesSearch && matchesSkill;
  });

  const handleStarProject = (projId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projId) return p;
        const starred = !p.userStarred;
        return {
          ...p,
          userStarred: starred,
          starsCount: starred ? p.starsCount + 1 : p.starsCount - 1,
        };
      })
    );
  };

  const handleSendSquadInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteSent(true);
    setTimeout(() => {
      setInviteSent(false);
      setSelectedStudentForInvite(null);
      setInviteProjectName('');
      setInviteRole('');
      setInviteMessage('');
    }, 1800);
  };

  const handleSendJoinRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinSubmitted(true);
    setTimeout(() => {
      setJoinSubmitted(false);
      setSelectedProjectForJoin(null);
      setJoinRoleSelected('');
      setJoinNote('');
    }, 1800);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;

    const newProj: ProjectShowcase = {
      id: `proj-${Date.now()}`,
      title: newProjectTitle.trim(),
      tagline: newProjectTagline.trim() || 'Innovative student collaboration project.',
      description: newProjectDesc.trim(),
      coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80',
      techStack: newProjectTech.split(',').map((t) => t.trim()).filter((t) => t.length > 0),
      creatorName: 'Aryan Sharma (You)',
      creatorCollege: 'IIT Bombay',
      creatorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      openRoles: newProjectRoles.filter((r) => r.trim().length > 0).map((role) => ({
        roleName: role.trim(),
        requiredSkills: ['Problem Solving', 'Teamwork'],
        status: 'open',
      })),
      starsCount: 1,
      userStarred: true,
      targetHackathon: newProjectHackathon.trim() || undefined,
    };

    setProjects([newProj, ...projects]);
    setShowNewProjectModal(false);
    setNewProjectTitle('');
    setNewProjectTagline('');
    setNewProjectDesc('');
    setNewProjectTech('');
    setNewProjectHackathon('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header Banner */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-emerald-950 text-white p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <Users className="w-3 h-3 text-emerald-400" />
              Pan-University Squad Network
            </span>
            <span className="text-xs text-slate-400">Team Up Across Colleges</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Skill Directory & Project Collaboration Hub
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Find skilled peers across colleges for hackathons (SIH, ETHIndia), research papers, and startup prototypes. Form multidisciplinary squads in minutes.
          </p>
        </div>

        <button
          onClick={() => setShowNewProjectModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 text-white text-xs font-bold shadow-lg hover:from-brand-600 hover:to-amber-600 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Post Project & Recruit</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 mb-6 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('find_peers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'find_peers'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4 text-brand-400" />
            <span>Discover Skilled Peers ({filteredStudents.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'projects'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Active Projects & Open Roles ({filteredProjects.length})</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-6 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill (PyTorch, Rust, Solidity), name, or hackathon target..."
              className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          {activeTab === 'find_peers' && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 focus:outline-none cursor-pointer w-full sm:w-auto"
              >
                <option value="all">All Colleges & Universities</option>
                {COLLEGES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.shortName}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Skill Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-medium whitespace-nowrap">Filter Skill:</span>
          {popularSkills.map((sk) => (
            <button
              key={sk}
              onClick={() => setSelectedSkill(sk)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition ${
                selectedSkill === sk
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sk === 'all' ? 'All Skills' : sk}
            </button>
          ))}
        </div>
      </div>

      {/* Content View: Find Peers */}
      {activeTab === 'find_peers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-slate-300 transition duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200"
                      />
                      {student.isVerified && (
                        <span
                          className="absolute -bottom-1 -right-1 bg-brand-600 text-white rounded-full p-0.5"
                          title="Verified Student"
                        >
                          <CheckCircle className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-sm font-bold text-slate-900">{student.name}</h2>
                      </div>
                      <div className="text-xs text-slate-500">
                        {student.collegeName} • {student.branch}
                      </div>
                      <div className="text-[11px] font-semibold text-brand-600 mt-0.5">
                        {student.roleTitle}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {student.reputationScore} Rep
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      <span>{student.availabilityHoursPerWeek} hrs/wk</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {student.bio}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {student.topSkills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                {/* Seeking Callout */}
                <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 mb-4">
                  <span className="font-semibold text-indigo-950">Looking to collaborate on: </span>
                  {student.seeking}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-slate-400">
                  {student.githubUrl && (
                    <a
                      href={student.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-700"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {student.linkedinUrl && (
                    <a
                      href={student.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-blue-600"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {student.portfolioUrl && (
                    <a
                      href={student.portfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-emerald-600"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedStudentForInvite(student)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 transition shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Invite to Squad</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content View: Project Collaboration Showcase */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:border-slate-300 transition"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                  {proj.targetHackathon && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-amber-300 border border-amber-400/30">
                      🏆 {proj.targetHackathon}
                    </span>
                  )}
                  <button
                    onClick={() => handleStarProject(proj.id)}
                    className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition ${
                      proj.userStarred
                        ? 'bg-amber-500 text-white'
                        : 'bg-black/40 text-white hover:bg-black/60'
                    }`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <img
                      src={proj.creatorAvatar}
                      alt={proj.creatorName}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="font-semibold text-slate-700">{proj.creatorName}</span>
                    <span>•</span>
                    <span>{proj.creatorCollege}</span>
                  </div>

                  <h2 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                    {proj.title}
                  </h2>
                  <p className="text-xs text-brand-700 font-medium mb-2">{proj.tagline}</p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {proj.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {proj.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Open roles needing teammates */}
                  <div className="space-y-1.5 mb-4">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Open Roles in Team:
                    </div>
                    {proj.openRoles.map((role, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs p-2 rounded-lg bg-emerald-50/70 border border-emerald-100 text-emerald-950 font-medium"
                      >
                        <span>{role.roleName}</span>
                        <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                          Join Role
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 pt-0 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  ⭐ {proj.starsCount} student endorsements
                </span>
                <button
                  onClick={() => setSelectedProjectForJoin(proj)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-black transition shadow-sm"
                >
                  <span>Apply to Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invite To Squad Modal */}
      {selectedStudentForInvite && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-600" />
                <h3 className="text-base font-bold text-slate-900">Invite to Your Squad</h3>
              </div>
              <button
                onClick={() => setSelectedStudentForInvite(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {inviteSent ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <div className="text-base font-bold text-slate-900">Squad Invitation Sent!</div>
                <p className="text-xs text-slate-500">
                  {selectedStudentForInvite.name} will receive your invitation and portfolio link.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendSquadInvite} className="space-y-3.5">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <img
                    src={selectedStudentForInvite.avatar}
                    alt={selectedStudentForInvite.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {selectedStudentForInvite.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {selectedStudentForInvite.collegeName} • {selectedStudentForInvite.roleTitle}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Project / Hackathon Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inviteProjectName}
                    onChange={(e) => setInviteProjectName(e.target.value)}
                    placeholder="e.g. Smart India Hackathon 2026 / MediPulse"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Proposed Role for Student
                  </label>
                  <input
                    type="text"
                    required
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    placeholder="e.g. Lead PyTorch AI Model Engineer"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Personalized Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={inviteMessage}
                    onChange={(e) => setInviteMessage(e.target.value)}
                    placeholder="Hey! Saw your impressive work on distributed systems. We are building a hackathon prototype and would love your skills..."
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedStudentForInvite(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-sm"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Apply to Project Modal */}
      {selectedProjectForJoin && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Apply to Join Team</h3>
              <button
                onClick={() => setSelectedProjectForJoin(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {joinSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <div className="text-base font-bold text-slate-900">Application Submitted!</div>
                <p className="text-xs text-slate-500">
                  {selectedProjectForJoin.creatorName} has received your request to join the team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendJoinRequest} className="space-y-3.5">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-900">
                    {selectedProjectForJoin.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Lead by {selectedProjectForJoin.creatorName} ({selectedProjectForJoin.creatorCollege})
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Role to Apply For
                  </label>
                  <select
                    value={joinRoleSelected}
                    onChange={(e) => setJoinRoleSelected(e.target.value)}
                    required
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 bg-white"
                  >
                    <option value="">Select an open position</option>
                    {selectedProjectForJoin.openRoles.map((r, i) => (
                      <option key={i} value={r.roleName}>
                        {r.roleName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Why are you a great fit? (Your experience & links)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={joinNote}
                    onChange={(e) => setJoinNote(e.target.value)}
                    placeholder="I have 2 years of experience with React & WebSockets, and I can contribute 15 hours weekly..."
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProjectForJoin(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Post Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-600" />
                <h3 className="text-base font-bold text-slate-900">Post New Project & Recruit</h3>
              </div>
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  placeholder="e.g. AgroDrone Autonomous Sensor Swarm"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">One-Line Tagline</label>
                <input
                  type="text"
                  value={newProjectTagline}
                  onChange={(e) => setNewProjectTagline(e.target.value)}
                  placeholder="e.g. LoRa mesh quadcopter fleet for pest surveillance"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description & Problem</label>
                <textarea
                  rows={2}
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  placeholder="Briefly describe what you are building and why..."
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={newProjectTech}
                    onChange={(e) => setNewProjectTech(e.target.value)}
                    placeholder="Python, ROS2, PyTorch"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Competition</label>
                  <input
                    type="text"
                    value={newProjectHackathon}
                    onChange={(e) => setNewProjectHackathon(e.target.value)}
                    placeholder="SIH 2026, ETHIndia"
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white hover:bg-brand-700 shadow-sm"
                >
                  Publish & Start Recruiting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
