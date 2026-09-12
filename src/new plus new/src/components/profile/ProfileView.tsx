import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EducationVerifyModal } from './EducationVerifyModal';
import { AcademicQuizModal } from './AcademicQuizModal';
import { 
  ShieldCheck, 
  Award, 
  FolderGit2, 
  Globe2, 
  ExternalLink, 
  Lock, 
  Edit3, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Target, 
  Sparkles, 
  BookOpen, 
  Code2 
} from 'lucide-react';
import { SkillProficiency } from '../../types';

export const ProfileView: React.FC = () => {
  const { 
    currentUser, 
    handleUpdateProfile, 
    setIsVerificationOpen, 
    setIsAcademicQuizOpen, 
    projects,
    setSelectedProjectId,
    setIsCreateProjectOpen,
    showToast 
  } = useApp();

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [headline, setHeadline] = useState(currentUser.headline);
  const [bio, setBio] = useState(currentUser.bio);

  // New skill addition
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillProficiency>('Intermediate');

  // Privacy selection
  const [visibility, setVisibility] = useState(currentUser.privacy.visibility);

  const handleSaveBio = () => {
    handleUpdateProfile({ headline, bio });
    setIsEditingBio(false);
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const exists = currentUser.skills.some(s => s.name.toLowerCase() === newSkillName.toLowerCase());
    if (!exists) {
      handleUpdateProfile({
        skills: [...currentUser.skills, { name: newSkillName.trim(), level: newSkillLevel }],
      });
      setNewSkillName('');
    }
  };

  const handleRemoveSkill = (name: string) => {
    handleUpdateProfile({
      skills: currentUser.skills.filter(s => s.name !== name),
    });
  };

  const myProjects = projects.filter(p => p.creator.id === currentUser.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner & Profile Overview */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Cover Graphic */}
        <div className="h-44 sm:h-52 bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-900 relative">
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/30">
            {currentUser.educationLevelLabel}
          </div>
        </div>

        {/* Profile Card Main Info */}
        <div className="p-6 sm:p-8 pt-0 relative">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            <div className="flex items-end gap-5">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-white shadow-xl bg-white"
                />
                {currentUser.verification.isVerified && (
                  <span className="absolute bottom-1 right-1 bg-white p-1 rounded-full text-emerald-600 shadow-sm" title="Verified Student">
                    <ShieldCheck className="w-6 h-6 fill-emerald-100" />
                  </span>
                )}
              </div>

              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-slate-900 leading-tight">
                    {currentUser.name}
                  </h1>
                  <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-md">
                    {currentUser.currentYear}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
                  🏛️ {currentUser.universityName} {currentUser.collegeName ? `• ${currentUser.collegeName}` : ''}
                </p>
                <p className="text-xs text-slate-500">
                  Department of {currentUser.department} ({currentUser.branch})
                </p>
              </div>
            </div>

            {/* Verification / Assessment Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {!currentUser.verification.isVerified ? (
                <button
                  onClick={() => setIsVerificationOpen(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Verify Student ID 🛡️
                </button>
              ) : (
                <span className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Student</span>
                </span>
              )}

              <button
                onClick={() => setIsAcademicQuizOpen(true)}
                className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Diagnostic Assessment 🏆
              </button>
            </div>
          </div>

          {/* Profile Strength Meter (Section 9) */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 mb-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Profile Strength: {currentUser.profileStrength}%</span>
              </span>
              <span className="text-[11px] font-bold text-indigo-700">
                {currentUser.profileStrength >= 80 ? 'All-Star Candidate' : 'Growing Stronger'}
              </span>
            </div>
            
            <div className="w-full bg-indigo-200/60 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-600 to-emerald-500 h-full rounded-full transition-all"
                style={{ width: `${currentUser.profileStrength}%` }}
              />
            </div>

            <p className="text-xs text-indigo-900">
              💡 <em>"Add your projects to make your profile more useful for finding teammates."</em>
            </p>
          </div>

          {/* Bio & Headline */}
          <div className="space-y-3">
            {!isEditingBio ? (
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900">{currentUser.headline}</h3>
                  <button
                    onClick={() => setIsEditingBio(true)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed whitespace-pre-line">
                  {currentUser.bio}
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl border border-indigo-200 bg-indigo-50/40 space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={e => setHeadline(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Bio Summary</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white resize-none"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsEditingBio(false)}
                    className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveBio}
                    className="px-4 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Main Grid: Skills, Projects, Assessment, Privacy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 cols: Skills, Projects, Goals */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Skills Portfolio */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-indigo-600" />
                <span>Skills & Proficiency Ratings</span>
              </h3>
            </div>

            {/* Add Skill Row */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add skill (e.g. Next.js, Redis)..."
                value={newSkillName}
                onChange={e => setNewSkillName(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
              <select
                value={newSkillLevel}
                onChange={e => setNewSkillLevel(e.target.value as SkillProficiency)}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Developing">Developing</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Strong">Strong</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button
                onClick={handleAddSkill}
                className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700"
              >
                + Add
              </button>
            </div>

            {/* Skills Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {currentUser.skills.map(sk => (
                <span
                  key={sk.name}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 text-xs font-semibold flex items-center gap-2"
                >
                  <span>{sk.name}</span>
                  <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded-md font-bold">
                    {sk.level}
                  </span>
                  <button
                    onClick={() => handleRemoveSkill(sk.name)}
                    className="text-slate-400 hover:text-rose-500 text-sm"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Published Projects */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FolderGit2 className="w-4 h-4 text-indigo-600" />
                <span>Projects Portfolio ({myProjects.length})</span>
              </h3>
              <button
                onClick={() => setIsCreateProjectOpen(true)}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                + Publish New Project
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {myProjects.map(proj => (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-400 transition-all cursor-pointer space-y-2 bg-slate-50/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {proj.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{proj.accessTier}</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">{proj.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{proj.tagline}</p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>❤️ {proj.likesCount}</span>
                    <span className="text-indigo-600 font-bold">Details →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Goals */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>Current Academic & Career Goals</span>
            </h3>
            <div className="space-y-2">
              {currentUser.goals.map((g, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 text-xs font-medium text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{g}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 4 cols: Assessment Rating, Collaboration Prefs & Privacy Controls */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Diagnostic Assessment Card (Section 20) */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                Academic Level Assessment
              </h3>
              <button
                onClick={() => setIsAcademicQuizOpen(true)}
                className="text-[11px] font-bold text-indigo-600 hover:underline"
              >
                Retake
              </button>
            </div>

            {currentUser.academicAssessment ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                    Current Evaluated Rating
                  </span>
                  <span className="text-2xl font-black text-emerald-900 block mt-0.5">
                    {currentUser.academicAssessment.level} Level
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    Score: {currentUser.academicAssessment.score}% (Evaluated {currentUser.academicAssessment.completedAt})
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentUser.academicAssessment.summary}
                </p>
              </div>
            ) : (
              <div className="text-center py-4 space-y-2">
                <p className="text-xs text-slate-500">
                  Take our 4-minute concept quiz to benchmark your readiness.
                </p>
                <button
                  onClick={() => setIsAcademicQuizOpen(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Start Assessment 🏆
                </button>
              </div>
            )}
          </div>

          {/* Collaboration Preferences */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3 text-xs">
            <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
              Collaboration Preferences
            </h3>
            
            <div className="space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Working Modes:</span>
                <span className="font-bold text-slate-800">{currentUser.collaboration.modes.join(', ')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Weekly Availability:</span>
                <span className="font-bold text-indigo-600">{currentUser.collaboration.availabilityHoursPerWeek} hrs/week</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Team Status:</span>
                <span className="font-bold text-emerald-700">Open to Hackathon Teams</span>
              </div>
            </div>
          </div>

          {/* Privacy Controls (Section 27) */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Privacy & Audience Controls</span>
            </h3>

            <div>
              <label className="text-slate-500 block mb-1 font-semibold">Profile Visibility Scope</label>
              <select
                value={visibility}
                onChange={e => {
                  const val = e.target.value as any;
                  setVisibility(val);
                  handleUpdateProfile({
                    privacy: { ...currentUser.privacy, visibility: val },
                  });
                }}
                className="w-full p-2 rounded-xl border border-slate-300 bg-white font-semibold"
              >
                <option value="Public">Public (All Colleges)</option>
                <option value="University only">University Only ({currentUser.universityName})</option>
                <option value="College only">College Only ({currentUser.collegeName || 'Campus'})</option>
                <option value="Connections only">Accepted Connections Only</option>
              </select>
            </div>

            <div className="space-y-2 pt-1">
              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 cursor-pointer">
                <span>Display Skills to Recruiters</span>
                <input
                  type="checkbox"
                  checked={currentUser.privacy.showSkills}
                  onChange={e => {
                    handleUpdateProfile({
                      privacy: { ...currentUser.privacy, showSkills: e.target.checked },
                    });
                  }}
                  className="accent-indigo-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50 cursor-pointer">
                <span>Display Projects in Global Feed</span>
                <input
                  type="checkbox"
                  checked={currentUser.privacy.showProjects}
                  onChange={e => {
                    handleUpdateProfile({
                      privacy: { ...currentUser.privacy, showProjects: e.target.checked },
                    });
                  }}
                  className="accent-indigo-600 rounded"
                />
              </label>
            </div>

            <p className="text-[10px] text-slate-400">
              Government IDs, phone numbers, and sensitive address data are permanently withheld from public exposure.
            </p>
          </div>

        </div>

      </div>

      {/* Modals */}
      <EducationVerifyModal />
      <AcademicQuizModal />

    </div>
  );
};
