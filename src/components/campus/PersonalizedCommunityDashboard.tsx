import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  Briefcase,
  Trophy,
  Rocket,
  ShieldCheck,
  Layers,
  GraduationCap,
  ExternalLink,
  CheckCircle2,
  Share2,
  MessageSquare,
  Search,
  BookOpen,
  Building,
  Target,
  Code2,
  FolderGit2,
  Plus,
  Compass,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import { useApp } from '../../context/AppContext';
import { Layer2ProfileModal } from '../onboarding/Layer2ProfileModal';
import { Layer2Project, Layer2Experience } from '../../types/campus';

export const PersonalizedCommunityDashboard: React.FC = () => {
  const {
    onboardingProfile,
    students,
    verification,
    updateLayer2Profile,
    setSelectedCollegeGroup,
  } = useCampus();
  const { setActiveTab } = useApp();

  const [isLayer2Open, setIsLayer2Open] = useState(false);
  const [oppFilter, setOppFilter] = useState<'all' | 'hackathon' | 'internship' | 'grant'>('all');
  const [connectedStudentIds, setConnectedStudentIds] = useState<string[]>([]);
  const [invitedSquadIds, setInvitedSquadIds] = useState<string[]>([]);

  const profile = onboardingProfile;

  const handleSaveLayer2 = (newProjects: Layer2Project[], newExperiences: Layer2Experience[]) => {
    updateLayer2Profile(newProjects, newExperiences);
  };

  const toggleConnect = (studentId: string) => {
    setConnectedStudentIds((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    );
  };

  const toggleInviteSquad = (studentId: string) => {
    setInvitedSquadIds((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    );
  };

  // Find complementary students
  // Students who have skills the user is looking for, or are looking for skills the user can contribute
  const matchedPeers = students.map((st) => {
    let matchScore = 75;
    const userLookingFor = (profile.collaboration.lookingForSkills || []).map((s) => s.toLowerCase());
    const userContributes = (profile.collaboration.canContribute || []).map((s) => s.toLowerCase());

    const studentSkills = (st.topSkills || []).map((s: string) => s.toLowerCase());
    const studentSeeking = (st.seeking || '').toLowerCase();

    // Check overlap
    const hasDesiredSkill = studentSkills.some((s: string) =>
      userLookingFor.some((u) => u.includes(s) || s.includes(u))
    );
    if (hasDesiredSkill) matchScore += 15;

    const userCanHelpThem = userContributes.some((u) =>
      studentSeeking.includes(u) || u.includes(studentSeeking)
    );
    if (userCanHelpThem) matchScore += 10;

    return {
      ...st,
      matchScore: Math.min(99, matchScore),
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  // Curated opportunities based on profile goals & education stage
  const curatedOpportunities = [
    {
      id: 'opp-1',
      type: 'hackathon' as const,
      title: 'Smart India Hackathon (SIH 2026)',
      organization: 'Ministry of Education & AICTE',
      prizeOrStipend: '₹1,00,000 / Problem Statement',
      deadline: '18 Days Left',
      matchedReason: 'Matches your goal to win an inter-collegiate hackathon and squad formation criteria.',
      tags: ['Hardware & Software', 'Inter-College', 'National'],
      actionUrl: '#',
    },
    {
      id: 'opp-2',
      type: 'internship' as const,
      title: 'Software Engineering Summer Intern 2026',
      organization: 'Google Mountain View & Bengaluru',
      prizeOrStipend: '₹1,15,000 / Month + Relocation',
      deadline: 'Applications Closing Soon',
      matchedReason: 'Matches your core proficiency in Python, React and Tier-1 Product placement target.',
      tags: ['SDE', 'Algorithms', 'Tier-1 FAANG'],
      actionUrl: '#',
    },
    {
      id: 'opp-3',
      type: 'grant' as const,
      title: 'UniSphere Alumni Seed Micro-Grant',
      organization: 'IITB & BITS Pilani Alumni Angel Syndicate',
      prizeOrStipend: '₹2,50,000 Equity-Free Seed',
      deadline: 'Rolling Applications',
      matchedReason: 'Ideal for student prototypes seeking initial cloud credit and hardware component funding.',
      tags: ['Student Founders', 'Zero Equity', 'Mentorship'],
      actionUrl: '#',
    },
    {
      id: 'opp-4',
      type: 'hackathon' as const,
      title: 'ETHIndia 2026 Collegiate Track',
      organization: 'Devfolio & Ethereum Foundation',
      prizeOrStipend: '$60,000 USD Bounty Pool',
      deadline: '24 Days Left',
      matchedReason: 'Recommended for your interest in distributed consensus and Web3 tooling.',
      tags: ['Open Source', 'Full-Stack', 'Global'],
      actionUrl: '#',
    },
    {
      id: 'opp-5',
      type: 'internship' as const,
      title: 'Quantitative Research Analyst Intern',
      organization: 'Goldman Sachs Global Markets',
      prizeOrStipend: '₹1,50,000 / Month',
      deadline: '3 Weeks Left',
      matchedReason: 'Aligned with your mathematical aptitude and high percentile standing.',
      tags: ['FinTech', 'C++', 'Probability'],
      actionUrl: '#',
    },
  ];

  const filteredOpportunities = curatedOpportunities.filter((opp) => {
    if (oppFilter === 'all') return true;
    return opp.type === oppFilter;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16 selection:bg-brand-500 selection:text-white">
      {/* Top Banner / Student Graph Identity Header */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-brand-500 shadow-md"
              />
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-white"
                title="Verified Student ID"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white">{profile.fullName}</h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {profile.role === 'student' ? 'Student' : profile.role}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Top 10% Academic Standing
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {profile.profileVisibility === 'public'
                    ? '🌐 Public Across Colleges'
                    : '🏛️ University Only'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-white">{profile.universityName}</span>
                <span className="text-slate-600">•</span>
                <span>{profile.department}</span>
                <span className="text-slate-600">•</span>
                <span className="text-brand-400">{profile.courseOrBranch} ({profile.currentYearOrClass})</span>
              </p>

              {profile.specialization && (
                <p className="text-[11px] text-slate-400">
                  Specialization: <span className="text-slate-200">{profile.specialization}</span>
                </p>
              )}
            </div>
          </div>

          {/* Profile Completeness & Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto justify-end">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-brand-400 border-r-ocean-400 flex items-center justify-center font-bold text-xs text-white">
                {profile.profileStrengthPercent}%
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Graph Strength
                </span>
                <span className="text-xs font-semibold text-white">
                  {profile.profileStrengthPercent >= 80 ? 'Optimal for Squad Matching' : 'Basic Graph Active'}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setIsLayer2Open(true)}
                className="px-3.5 py-2 bg-gradient-to-r from-brand-600 to-ocean-600 hover:from-brand-500 hover:to-ocean-500 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5"
              >
                <Layers className="w-4 h-4" />
                <span>+ Add Projects (Layer 2)</span>
              </button>

              <button
                onClick={() => setActiveTab('assessment')}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-xl text-xs font-semibold transition"
              >
                Retake Onboarding
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8">
        {/* Quick Jump Channels / College Community Hub */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-brand-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Your Campus Hub & Channels
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">
              Synced with {profile.universityName}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => {
                setSelectedCollegeGroup('iit-bombay');
                setActiveTab('campus-groups');
              }}
              className="p-3 bg-slate-950/70 border border-slate-800 hover:border-brand-500/50 rounded-xl text-left transition group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white group-hover:text-brand-300 transition">
                  {profile.department.split('&')[0]} 💬
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[10px] text-slate-400">Official Branch Community Feed</p>
            </button>

            <button
              onClick={() => setActiveTab('campus-teams')}
              className="p-3 bg-slate-950/70 border border-slate-800 hover:border-brand-500/50 rounded-xl text-left transition group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white group-hover:text-brand-300 transition">
                  Hackathon Squad Finder 🏆
                </span>
                <span className="text-[10px] text-amber-400 font-bold">14 Active</span>
              </div>
              <p className="text-[10px] text-slate-400">Smart India & Collegiate Squads</p>
            </button>

            <button
              onClick={() => setActiveTab('campus-placements')}
              className="p-3 bg-slate-950/70 border border-slate-800 hover:border-brand-500/50 rounded-xl text-left transition group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white group-hover:text-brand-300 transition">
                  Placement Journeys 💼
                </span>
                <span className="text-[10px] text-brand-400 font-bold">FAANG+</span>
              </div>
              <p className="text-[10px] text-slate-400">Senior Round Breakdowns & Tips</p>
            </button>

            <button
              onClick={() => setActiveTab('campus-fellowships')}
              className="p-3 bg-slate-950/70 border border-slate-800 hover:border-brand-500/50 rounded-xl text-left transition group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white group-hover:text-brand-300 transition">
                  Fellowships & Grants 🚀
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">₹25L Pool</span>
              </div>
              <p className="text-[10px] text-slate-400">Micro-fund hardware & software</p>
            </button>
          </div>
        </div>

        {/* 2-Column Grid: Left (Squad Matching Graph), Right (Curated Opportunities) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Squad & Teammate Graph Matching */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-400" />
                  <h2 className="text-lg font-bold text-white">
                    Smart Teammate & Squad Graph
                  </h2>
                </div>
                <p className="text-xs text-slate-400">
                  Algorithmically matched peers based on skills you are seeking ({profile.collaboration.lookingForSkills.slice(0, 2).join(', ')})
                </p>
              </div>

              <button
                onClick={() => setActiveTab('campus-teams')}
                className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
              >
                <span>View Full Team Finder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Peer Match Cards */}
            <div className="space-y-4">
              {matchedPeers.slice(0, 4).map((student) => {
                const isConnected = connectedStudentIds.includes(student.id);
                const isInvited = invitedSquadIds.includes(student.id);

                return (
                  <div
                    key={student.id}
                    className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition space-y-4 shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-white">{student.name}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                              {student.matchScore}% Match
                            </span>
                            {student.isVerified && (
                              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                                <ShieldCheck className="w-3 h-3" /> Verified ID
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400">
                            {student.collegeName} • {student.branch} (Class of {student.graduationYear})
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleConnect(student.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                            isConnected
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                          }`}
                        >
                          {isConnected ? 'Connected ✓' : 'Connect'}
                        </button>
                        <button
                          onClick={() => toggleInviteSquad(student.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                            isInvited
                              ? 'bg-brand-500/20 text-brand-300 border-brand-500/30'
                              : 'bg-brand-600 hover:bg-brand-500 text-white'
                          }`}
                        >
                          {isInvited ? 'Squad Invite Sent' : 'Invite to Squad'}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{student.bio}</p>

                    {/* Skill Tags */}
                    <div className="space-y-2 pt-1 border-t border-slate-800/80">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Top Verified Skills:</span>
                        <span className="text-amber-400 text-[10px]">
                          Seeking: {student.seeking}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {student.topSkills.map((sk: string) => (
                          <span
                            key={sk}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Layer 2 Projects Showcase Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-brand-400" />
                  <h3 className="text-sm font-bold text-white">
                    Your Portfolio & Milestone Projects ({profile.projects?.length || 0})
                  </h3>
                </div>
                <button
                  onClick={() => setIsLayer2Open(true)}
                  className="px-3 py-1.5 bg-brand-500/20 text-brand-300 hover:bg-brand-500/30 border border-brand-500/30 rounded-lg text-xs font-bold transition flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Project
                </button>
              </div>

              {profile.projects && profile.projects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {profile.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-white truncate">{proj.title}</h5>
                        {proj.linkUrl && (
                          <a
                            href={proj.linkUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-brand-400 hover:text-brand-300"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {proj.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-300 border border-brand-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 border border-dashed border-slate-800 rounded-xl bg-slate-950/40 space-y-2">
                  <FolderGit2 className="w-8 h-8 mx-auto text-slate-600" />
                  <p className="text-xs text-slate-400">No showcase projects added yet.</p>
                  <button
                    onClick={() => setIsLayer2Open(true)}
                    className="text-xs text-brand-400 hover:text-brand-300 font-bold"
                  >
                    + Add your first project to stand out to hackathon squads
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Col: Curated Opportunities & Recommendations */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">Curated For Your Goals</h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  AI Matched
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Tailored for {profile.courseOrBranch} at {profile.universityName}
              </p>
            </div>

            {/* Opportunity Filter Pills */}
            <div className="flex gap-1.5 bg-slate-900 border border-slate-800 rounded-xl p-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'hackathon', label: 'Hackathons' },
                { id: 'internship', label: 'Internships' },
                { id: 'grant', label: 'Fellowships' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setOppFilter(tab.id as any)}
                  className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition ${
                    oppFilter === tab.id
                      ? 'bg-brand-500 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Opportunities List */}
            <div className="space-y-3">
              {filteredOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2.5 hover:border-slate-700 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                        {opp.type}
                      </span>
                      <h4 className="text-xs font-bold text-white pt-1">{opp.title}</h4>
                      <p className="text-[11px] text-slate-400">{opp.organization}</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 whitespace-nowrap">
                      {opp.prizeOrStipend}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800 leading-relaxed">
                    💡 {opp.matchedReason}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                    <span className="text-[10px] text-amber-400 font-semibold">{opp.deadline}</span>
                    <button
                      onClick={() => {
                        if (opp.type === 'hackathon') setActiveTab('campus-teams');
                        else if (opp.type === 'internship') setActiveTab('campus-placements');
                        else setActiveTab('campus-fellowships');
                      }}
                      className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Skill Discovery Recommendation Card */}
            <div className="bg-gradient-to-br from-brand-950/50 via-slate-900 to-slate-900 border border-brand-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-brand-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Recommended Skill Pathways
                </h4>
              </div>

              <div className="space-y-2">
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>Full-Stack Cloud Architecture</span>
                    <span className="text-[10px] text-brand-400">Next Step</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Bridge your frontend expertise with Docker, Redis caching, and async workers.
                  </p>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>LLM Fine-Tuning & Quantization</span>
                    <span className="text-[10px] text-ocean-400">High Demand</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Learn LoRA and vLLM serving to boost hackathon and startup competitiveness.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('skills')}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <span>View Early Skills Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 2 Modal */}
      <Layer2ProfileModal
        isOpen={isLayer2Open}
        onClose={() => setIsLayer2Open(false)}
        initialProjects={profile.projects || []}
        initialExperiences={profile.experiences || []}
        onSave={handleSaveLayer2}
      />
    </div>
  );
};
