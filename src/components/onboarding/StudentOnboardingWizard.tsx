import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  BookOpen,
  Compass,
  CheckCircle2,
  Users,
  Target,
  Trophy,
  Briefcase,
  Layers,
  Search,
  School,
  Building,
  Atom,
  HelpCircle,
  Eye,
  Shield,
  Lightbulb,
  Cpu,
  Palette,
  Megaphone,
  Code2,
  FileCheck,
  Check,
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import { useApp } from '../../context/AppContext';
import {
  UserAcademicRole,
  EducationStage,
  CategorizedSkill,
  SkillProficiency,
  FullOnboardingProfile,
  Layer2Project,
  Layer2Experience,
} from '../../types/campus';
import { Layer2ProfileModal } from './Layer2ProfileModal';

const PRESET_COLLEGES = [
  'IIT Bombay',
  'BITS Pilani',
  'NIT Trichy',
  'IIIT Hyderabad',
  'RV College of Engineering (RVCE)',
  'Delhi University (DU)',
  'Vellore Institute of Technology (VIT)',
  'DTU Delhi',
  'IIT Delhi',
  'IIT Madras',
];

const PRESET_DEPARTMENTS = [
  'Computer Science & Engineering',
  'Electronics & Communication Engineering',
  'Information Technology & Systems',
  'Mechanical Engineering',
  'Electrical & Electronics Engineering',
  'Biotechnology & Bio-Engineering',
  'Data Science & Artificial Intelligence',
  'Business Administration & Management',
  'Economics & Financial Computing',
  'Design & Human-Computer Interaction',
];

const SKILL_CATALOG: { category: CategorizedSkill['category']; icon: any; skills: string[] }[] = [
  {
    category: 'Technology',
    icon: Code2,
    skills: [
      'Python',
      'React / Next.js',
      'JavaScript / TypeScript',
      'C++ / Systems',
      'Java / Spring',
      'Node.js / Express',
      'Machine Learning / AI',
      'PyTorch / TensorFlow',
      'Cloud / Docker / DevOps',
      'SQL & Databases',
      'Flutter / React Native',
      'Cybersecurity / Networks',
    ],
  },
  {
    category: 'Creative',
    icon: Palette,
    skills: [
      'UI/UX Design',
      'Figma & Prototyping',
      '3D Modeling & Blender',
      'Motion Graphics & Video Editing',
      'Graphic Design & Branding',
      'Technical Documentation',
    ],
  },
  {
    category: 'Business',
    icon: Briefcase,
    skills: [
      'Product Strategy & Management',
      'Financial Modeling & Valuation',
      'Growth Marketing & SEO',
      'Pitch Deck & Startup Fundraising',
      'Market Research & User Interviews',
    ],
  },
  {
    category: 'Academic / Research',
    icon: Atom,
    skills: [
      'Research Methodology & Literature Review',
      'Mathematical Modeling & Statistics',
      'LaTeX Academic Typesetting',
      'Data Visualization & Experiment Design',
      'Academic Paper Writing',
    ],
  },
  {
    category: 'Communication',
    icon: Megaphone,
    skills: [
      'Public Speaking & Keynote Demos',
      'Team Leadership & Squad Mentoring',
      'Agile / Scrum Sprint Planning',
      'Community Organizing & Hackathon Hosting',
    ],
  },
];

const INTEREST_DOMAINS = [
  'Artificial Intelligence & Generative AI',
  'Robotics & Autonomous Drones',
  'Web3 & Distributed Cryptographic Systems',
  'Climate Tech & Renewable Energy',
  'Healthcare & Computational Genomics',
  'FinTech, Trading & Quantitative Finance',
  'Space Exploration & Aerospace Tech',
  'Open Source Software & Developer Tooling',
  'Game Engine & Interactive Simulation',
  'Public Policy & Civic Technology',
];

const INVOLVEMENT_OPTIONS = [
  'Active in College Technical Clubs / Societies',
  'Regular Hackathon Participant / Competitor',
  'Open Source Contributor on GitHub',
  'Building a Startup / Side Product',
  'Undergraduate / Graduate Academic Research',
  'Competitive Coding (LeetCode / Codeforces)',
  'Community Organizer / Campus Ambassador',
];

const COLLAB_NEEDS = [
  'Hackathon Teammates (Looking for squad)',
  'Side Project Co-Founder / Builder',
  'Research Collaborator / Co-Author',
  'Placement & Interview Prep Buddy',
  'Course Study Group & Homework Peer',
];

const COLLAB_OFFERS = [
  'Frontend UI & User Experience (React/Next/Tailwind)',
  'Backend APIs & Database Architecture (Node/Python/Go)',
  'Machine Learning & AI Model Pipeline (PyTorch/Scikit)',
  'Product Strategy, Wireframes & Pitch Presentation',
  'Cloud Infrastructure & CI/CD Deployment (Docker/AWS)',
  'Hardware, IoT & Embedded Systems (Arduino/Raspberry Pi)',
];

const GOAL_OPTIONS = [
  'Build and deploy a standout, production-ready portfolio project',
  'Win a tier-1 national or collegiate hackathon (e.g. SIH, HackMIT)',
  'Land a competitive summer software or research internship',
  'Crack high-growth unicorn or Tier-1 product company placements',
  'Co-found a high-impact startup and secure fellowship grant funding',
  'Publish a research paper in a peer-reviewed academic conference',
  'Master full-stack engineering and cloud-native architecture',
];

export const StudentOnboardingWizard: React.FC<{ onCompleteOverride?: () => void }> = ({
  onCompleteOverride,
}) => {
  const { onboardingProfile, saveOnboardingProfile, updateLayer2Profile } = useCampus();
  const { setActiveTab } = useApp();

  // Wizard Flow Step:
  // 0: Welcome Screen
  // 1: Identity / Role
  // 2: Education Stage
  // 3: Academic Institution & Department (adaptive)
  // 4: Skills Discovery (empathetic + levels)
  // 5: Interests & Curiosity
  // 6: Involvements & Hackathon follow-up
  // 7: Team & Collaboration Profile
  // 8: 6-12 Month Goals
  // 9: Completion Screen & Profile Strength
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isLayer2Open, setIsLayer2Open] = useState<boolean>(false);

  // Form states
  const [fullName, setFullName] = useState<string>(onboardingProfile?.fullName || 'Aryan Sharma');
  const [role, setRole] = useState<UserAcademicRole>(onboardingProfile?.role || 'student');
  const [educationStage, setEducationStage] = useState<EducationStage>(
    onboardingProfile?.educationStage || 'undergraduate'
  );

  // Institution & Department states
  const [universityName, setUniversityName] = useState<string>(
    onboardingProfile?.universityName || 'IIT Bombay'
  );
  const [department, setDepartment] = useState<string>(
    onboardingProfile?.department || 'Computer Science & Engineering'
  );
  const [courseOrBranch, setCourseOrBranch] = useState<string>(
    onboardingProfile?.courseOrBranch || 'B.Tech in Computer Science'
  );
  const [currentYearOrClass, setCurrentYearOrClass] = useState<string>(
    onboardingProfile?.currentYearOrClass || '3rd Year'
  );
  const [semester, setSemester] = useState<string>(onboardingProfile?.semester || 'Semester 5');
  const [specialization, setSpecialization] = useState<string>(
    onboardingProfile?.specialization || 'Distributed Systems & AI'
  );

  // School-specific states
  const [schoolBoard, setSchoolBoard] = useState<string>('CBSE');
  const [favoriteSubjects, setFavoriteSubjects] = useState<string[]>(['Mathematics', 'Physics']);

  // PhD / Faculty states
  const [researchArea, setResearchArea] = useState<string>('Autonomous AI Agents & Consensus');
  const [facultyDesignation, setFacultyDesignation] = useState<string>('Assistant Professor');

  // Skills
  const [selectedSkills, setSelectedSkills] = useState<CategorizedSkill[]>(
    onboardingProfile?.skills || [
      { name: 'Python', category: 'Technology', level: 'advanced' },
      { name: 'React / Next.js', category: 'Technology', level: 'intermediate' },
      { name: 'UI/UX Design', category: 'Creative', level: 'intermediate' },
    ]
  );
  const [isExploringSkillsOnly, setIsExploringSkillsOnly] = useState<boolean>(
    onboardingProfile?.isExploringSkillsOnly || false
  );

  // Interests
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    onboardingProfile?.interests || [
      'Artificial Intelligence & Generative AI',
      'Open Source Software & Developer Tooling',
    ]
  );

  // Current Involvements & Hackathons
  const [selectedInvolvements, setSelectedInvolvements] = useState<string[]>(
    onboardingProfile?.currentActivities || [
      'Active in College Technical Clubs / Societies',
      'Regular Hackathon Participant / Competitor',
      'Open Source Contributor on GitHub',
    ]
  );
  const [participatedHackathons, setParticipatedHackathons] = useState<boolean>(
    onboardingProfile?.hackathonDetail?.participatedBefore ?? true
  );
  const [hackathonCount, setHackathonCount] = useState<number>(
    onboardingProfile?.hackathonDetail?.count || 3
  );
  const [hackathonRolesContributed, setHackathonRolesContributed] = useState<string[]>(
    onboardingProfile?.hackathonDetail?.skillsContributed || ['Frontend UI', 'Pitch & Demo']
  );
  const [hackathonTeammatesNeeded, setHackathonTeammatesNeeded] = useState<string[]>(
    onboardingProfile?.hackathonDetail?.lookingForSkills || ['Backend / Cloud', 'ML Specialist']
  );

  // Collaboration Profile
  const [lookingForConnections, setLookingForConnections] = useState<string[]>(
    onboardingProfile?.collaboration?.lookingForConnections || [
      'Hackathon Teammates (Looking for squad)',
      'Placement & Interview Prep Buddy',
    ]
  );
  const [canContribute, setCanContribute] = useState<string[]>(
    onboardingProfile?.collaboration?.canContribute || [
      'Frontend UI & User Experience (React/Next/Tailwind)',
      'Product Strategy, Wireframes & Pitch Presentation',
    ]
  );
  const [lookingForSkills, setLookingForSkills] = useState<string[]>(
    onboardingProfile?.collaboration?.lookingForSkills || [
      'Backend APIs & Database Architecture (Node/Python/Go)',
      'Cloud Infrastructure & CI/CD Deployment (Docker/AWS)',
    ]
  );

  // Goals
  const [goals, setGoals] = useState<string[]>(
    onboardingProfile?.goals6to12Months || [
      'Build and deploy a standout, production-ready portfolio project',
      'Win a tier-1 national or collegiate hackathon (e.g. SIH, HackMIT)',
      'Crack high-growth unicorn or Tier-1 product company placements',
    ]
  );

  // Privacy
  const [profileVisibility, setProfileVisibility] = useState<
    'public' | 'university_only' | 'department_only'
  >(onboardingProfile?.profileVisibility || 'public');

  // Layer 2 items stored
  const [projects, setProjects] = useState<Layer2Project[]>(onboardingProfile?.projects || []);
  const [experiences, setExperiences] = useState<Layer2Experience[]>(
    onboardingProfile?.experiences || []
  );

  // Skill selection helpers
  const handleToggleSkill = (skillName: string, category: CategorizedSkill['category']) => {
    const existing = selectedSkills.find((s) => s.name === skillName);
    if (existing) {
      setSelectedSkills(selectedSkills.filter((s) => s.name !== skillName));
    } else {
      setSelectedSkills([...selectedSkills, { name: skillName, category, level: 'intermediate' }]);
    }
  };

  const handleUpdateSkillLevel = (skillName: string, level: SkillProficiency) => {
    setSelectedSkills(
      selectedSkills.map((s) => (s.name === skillName ? { ...s, level } : s))
    );
  };

  // Toggle helpers
  const toggleArrayItem = (list: string[], item: string, setter: (arr: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter((x) => x !== item));
    } else {
      setter([...list, item]);
    }
  };

  // Profile strength calculation
  const calculateStrength = () => {
    let score = 50; // base for completing step 1-3
    if (selectedSkills.length > 0 || isExploringSkillsOnly) score += 10;
    if (selectedInterests.length > 0) score += 10;
    if (selectedInvolvements.length > 0) score += 8;
    if (canContribute.length > 0 && lookingForSkills.length > 0) score += 10;
    if (goals.length > 0) score += 7;
    if (projects.length > 0) score += 5;
    return Math.min(100, score);
  };

  const handleFinishOnboarding = () => {
    const finalProfile: FullOnboardingProfile = {
      id: onboardingProfile?.id || `usr-${Date.now()}`,
      fullName: fullName.trim() || 'Student Aspirant',
      avatarUrl:
        onboardingProfile?.avatarUrl ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role,
      educationStage,
      schoolBoard: educationStage === 'school' ? schoolBoard : undefined,
      schoolClass: educationStage === 'school' ? currentYearOrClass : undefined,
      favoriteSubjects: educationStage === 'school' ? favoriteSubjects : undefined,
      universityName: educationStage === 'school' ? 'National High School' : universityName,
      department,
      courseOrBranch,
      currentYearOrClass,
      semester,
      specialization,
      researchArea: educationStage === 'phd_research' ? researchArea : undefined,
      facultyDesignation: educationStage === 'faculty' ? facultyDesignation : undefined,
      skills: selectedSkills,
      isExploringSkillsOnly,
      interests: selectedInterests,
      currentActivities: selectedInvolvements,
      hackathonDetail: {
        participatedBefore: participatedHackathons,
        count: hackathonCount,
        skillsContributed: hackathonRolesContributed,
        lookingForSkills: hackathonTeammatesNeeded,
      },
      collaboration: {
        lookingForConnections,
        canContribute,
        lookingForSkills,
      },
      goals6to12Months: goals,
      curiousCareerAreas: selectedInterests.slice(0, 3),
      projects,
      experiences,
      profileStrengthPercent: calculateStrength(),
      profileVisibility,
      completedAt: new Date().toISOString(),
    };

    saveOnboardingProfile(finalProfile);

    if (onCompleteOverride) {
      onCompleteOverride();
    } else {
      setActiveTab('campus-dashboard');
    }
  };

  const handleSaveLayer2Data = (newProjects: Layer2Project[], newExperiences: Layer2Experience[]) => {
    setProjects(newProjects);
    setExperiences(newExperiences);
    updateLayer2Profile(newProjects, newExperiences);
  };

  const totalSteps = 8;
  const progressPercent = currentStep === 0 ? 0 : Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      {/* Top Bar with Minimal Exit & Progress Indicator */}
      <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-4 sm:px-8 py-3 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-ocean-500 flex items-center justify-center font-black text-white text-sm shadow-md">
              U
            </div>
            <div>
              <span className="text-xs font-black text-white tracking-wide uppercase">
                UniSphere Onboarding
              </span>
              <p className="text-[10px] text-slate-400">Academic & Career Community Graph</p>
            </div>
          </div>

          {currentStep > 0 && currentStep <= totalSteps && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 hidden sm:inline">
                Step {currentStep} of {totalSteps}
              </span>
              <div className="w-24 sm:w-36 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-ocean-400 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-bold text-brand-400">{progressPercent}%</span>
            </div>
          )}

          <button
            onClick={() => setActiveTab('campus-feed')}
            className="text-xs text-slate-400 hover:text-slate-200 transition"
          >
            Skip to Feed →
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col justify-center">
        {/* ============================================================ */}
        {/* STEP 0: WELCOME SCREEN */}
        {/* ============================================================ */}
        {currentStep === 0 && (
          <div className="text-center space-y-8 animate-fadeIn max-w-2xl mx-auto py-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Welcome to UniSphere
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Discover your strengths.{' '}
                <span className="bg-gradient-to-r from-brand-400 via-ocean-400 to-indigo-400 bg-clip-text text-transparent">
                  Connect with the right people.
                </span>{' '}
                Build your future.
              </h1>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto">
                UniSphere links students, faculty, and research labs across universities into a single
                collaborative graph. Find hackathon squads, discover matching peers, explore verified placement
                journeys, and unlock student funding.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition space-y-2">
                <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Find Teammates</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Discover peers with complementary skills for hackathons, side projects, and research.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Placement Intelligence</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Learn from 4-round interview breakdowns and package benchmarks from senior peers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition space-y-2">
                <div className="w-8 h-8 rounded-lg bg-ocean-500/20 text-ocean-400 flex items-center justify-center">
                  <Trophy className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Student Fellowships</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Pitch hardware and software innovations directly to alumni micro-funds and angel grants.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setCurrentStep(1)}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-brand-500 via-ocean-600 to-indigo-600 hover:from-brand-400 hover:to-ocean-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 transition group"
              >
                <span>Get Started (Takes 2 Minutes)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              No long quizzes. We respect your time with a clean, 8-step visual setup.
            </p>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 1: IDENTITY & ROLE */}
        {/* ============================================================ */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                Step 1 of {totalSteps} • Your Academic Identity
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Who are you in the academic ecosystem?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                This configures your community feed, collaboration matching, and recommended opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: 'student' as UserAcademicRole,
                  title: 'Student / Scholar',
                  desc: 'Enrolled in school, undergraduate, or postgraduate degree programs.',
                  icon: GraduationCap,
                  badge: 'Most Common',
                },
                {
                  id: 'researcher' as UserAcademicRole,
                  title: 'Researcher / Scholar',
                  desc: 'Working in research labs, PhD dissertations, or post-doctoral studies.',
                  icon: Atom,
                  badge: 'Research Labs',
                },
                {
                  id: 'teacher_faculty' as UserAcademicRole,
                  title: 'Teacher / Faculty',
                  desc: 'Professors, lecturers, and academic mentors guiding students.',
                  icon: BookOpen,
                  badge: 'Mentorship',
                },
                {
                  id: 'other_academic' as UserAcademicRole,
                  title: 'Other Academic Professional',
                  desc: 'Club coordinators, campus staff, incubation leads, or recent alumni.',
                  icon: Users,
                  badge: 'Ecosystem',
                },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = role === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setRole(item.id)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'bg-brand-500/10 border-brand-500 text-white shadow-md shadow-brand-500/10'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-brand-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{item.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold border border-slate-700">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Name Input */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                What is your full name?
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Aryan Sharma"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setCurrentStep(0)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: EDUCATION STAGE */}
        {/* ============================================================ */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                Step 2 of {totalSteps} • Current Stage
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                What stage of education are you currently in?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                We customize subsequent questions so school students are not asked about placements, and researchers get lab-specific tools.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'school' as EducationStage,
                  title: 'School (Class 8–12)',
                  desc: 'High school students exploring STEM, arts, coding, and future college paths.',
                  icon: School,
                },
                {
                  id: 'undergraduate' as EducationStage,
                  title: 'Undergraduate (UG: 1st - 4th Year)',
                  desc: 'B.Tech, B.Sc, B.Com, BA, BCA students building skills, hackathons & projects.',
                  icon: GraduationCap,
                },
                {
                  id: 'postgraduate' as EducationStage,
                  title: 'Postgraduate (PG: Masters / MBA / M.Tech)',
                  desc: 'Advanced specialization, deep industry projects, or master’s dissertations.',
                  icon: Building,
                },
                {
                  id: 'phd_research' as EducationStage,
                  title: 'PhD / Doctoral Scholar',
                  desc: 'Conducting primary scientific research, publishing papers, and lab work.',
                  icon: Atom,
                },
                {
                  id: 'faculty' as EducationStage,
                  title: 'Faculty / Academic Mentor',
                  desc: 'Teaching undergraduate/postgraduate courses, guiding student squads.',
                  icon: BookOpen,
                },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = educationStage === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setEducationStage(item.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                      isSelected
                        ? 'bg-brand-500/10 border-brand-500 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-brand-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: ACADEMIC INSTITUTION & DEPARTMENT (ADAPTIVE) */}
        {/* ============================================================ */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                Step 3 of {totalSteps} • Academic Affiliation
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {educationStage === 'school'
                  ? 'Your School & Current Grade'
                  : educationStage === 'phd_research'
                  ? 'Your University & Research Lab'
                  : educationStage === 'faculty'
                  ? 'Your College & Faculty Department'
                  : 'Your University & Department'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Connecting you directly to your college branch channel and batchmates.
              </p>
            </div>

            {/* School Conditional Form */}
            {educationStage === 'school' ? (
              <div className="space-y-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      School Name
                    </label>
                    <input
                      type="text"
                      value={universityName}
                      onChange={(e) => setUniversityName(e.target.value)}
                      placeholder="e.g. Delhi Public School, R.K. Puram"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      School Board
                    </label>
                    <select
                      value={schoolBoard}
                      onChange={(e) => setSchoolBoard(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                    >
                      <option value="CBSE">CBSE (Central Board of Secondary Education)</option>
                      <option value="ICSE / ISC">ICSE / ISC</option>
                      <option value="State Board">State Board</option>
                      <option value="IB / Cambridge">IB / Cambridge International</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Current Grade / Class
                    </label>
                    <select
                      value={currentYearOrClass}
                      onChange={(e) => setCurrentYearOrClass(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                    >
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11 - Science (PCM/PCB)">Class 11 - Science (PCM/PCB)</option>
                      <option value="Class 11 - Commerce / Arts">Class 11 - Commerce / Arts</option>
                      <option value="Class 12 - Science (PCM/PCB)">Class 12 - Science (PCM/PCB)</option>
                      <option value="Class 12 - Commerce / Arts">Class 12 - Commerce / Arts</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Favorite Subject Areas
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {['Mathematics', 'Physics', 'Computer Science', 'Biology', 'Economics', 'Art'].map(
                        (sub) => (
                          <button
                            key={sub}
                            type="button"
                            onClick={() =>
                              toggleArrayItem(favoriteSubjects, sub, setFavoriteSubjects)
                            }
                            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition ${
                              favoriteSubjects.includes(sub)
                                ? 'bg-brand-500 text-white border-brand-500'
                                : 'bg-slate-800 text-slate-300 border-slate-700'
                            }`}
                          >
                            {sub}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : educationStage === 'phd_research' ? (
              /* PhD / Research Lab Form */
              <div className="space-y-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      University / Research Institution
                    </label>
                    <input
                      type="text"
                      value={universityName}
                      onChange={(e) => setUniversityName(e.target.value)}
                      placeholder="e.g. IIT Bombay / IISc Bangalore"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Department / Lab Name
                    </label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Distributed Computing & AI Lab"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Primary Research Focus / Thesis Topic
                  </label>
                  <input
                    type="text"
                    value={researchArea}
                    onChange={(e) => setResearchArea(e.target.value)}
                    placeholder="e.g. Fault-Tolerant Consensus in Asynchronous Edge Networks"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            ) : educationStage === 'faculty' ? (
              /* Faculty Form */
              <div className="space-y-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      College / University
                    </label>
                    <input
                      type="text"
                      value={universityName}
                      onChange={(e) => setUniversityName(e.target.value)}
                      placeholder="e.g. BITS Pilani"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Department of Computer Science"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    value={facultyDesignation}
                    onChange={(e) => setFacultyDesignation(e.target.value)}
                    placeholder="e.g. Associate Professor / Head of Department"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            ) : (
              /* UG & PG Form (Default) */
              <div className="space-y-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                {/* University Selection with Quick-picks */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    College / University Name
                  </label>
                  <input
                    type="text"
                    value={universityName}
                    onChange={(e) => setUniversityName(e.target.value)}
                    placeholder="Search or enter your college (e.g. IIT Bombay, RVCE, DU)"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-slate-500 font-semibold">Popular Picks:</span>
                    {PRESET_COLLEGES.slice(0, 6).map((col) => (
                      <button
                        key={col}
                        type="button"
                        onClick={() => setUniversityName(col)}
                        className={`text-[10px] px-2 py-0.5 rounded border transition ${
                          universityName === col
                            ? 'bg-brand-500/20 text-brand-300 border-brand-500/40'
                            : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Department Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Academic Department / Branch
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] text-slate-500 font-semibold">Quick Branches:</span>
                    {PRESET_DEPARTMENTS.slice(0, 4).map((dept) => (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => setDepartment(dept)}
                        className={`text-[10px] px-2 py-0.5 rounded border transition ${
                          department === dept
                            ? 'bg-brand-500/20 text-brand-300 border-brand-500/40'
                            : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year & Semester Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Degree / Program
                    </label>
                    <input
                      type="text"
                      value={courseOrBranch}
                      onChange={(e) => setCourseOrBranch(e.target.value)}
                      placeholder="e.g. B.Tech (CSE)"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Current Year
                    </label>
                    <select
                      value={currentYearOrClass}
                      onChange={(e) => setCurrentYearOrClass(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500"
                    >
                      <option value="1st Year (Freshman)">1st Year (Freshman)</option>
                      <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
                      <option value="3rd Year (Junior)">3rd Year (Junior)</option>
                      <option value="Final Year (Senior)">Final Year (Senior)</option>
                      <option value="Recent Graduate">Recent Graduate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Specialization / Minor (Optional)
                    </label>
                    <input
                      type="text"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      placeholder="e.g. AI / ML or FinTech"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 4: SKILLS DISCOVERY (EMPATHETIC & CATEGORIZED) */}
        {/* ============================================================ */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                Step 4 of {totalSteps} • Skills & Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                What skills do you currently have?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Select the tools, languages, or abilities you are comfortable working with.
              </p>
            </div>

            {/* Empathetic Encouragement Banner */}
            <div className="bg-gradient-to-r from-brand-950/60 via-ocean-950/40 to-slate-900 border border-brand-500/30 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white">
                  Just getting started? That’s completely okay.
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Everyone starts at day one. Whether you have zero prior programming experience or you’ve
                  shipped apps to production, UniSphere connects you with peers at your level and helps you grow.
                </p>
              </div>
            </div>

            {/* "I'm still exploring" Toggle */}
            <div
              onClick={() => setIsExploringSkillsOnly(!isExploringSkillsOnly)}
              className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                isExploringSkillsOnly
                  ? 'bg-ocean-500/20 border-ocean-500 text-white'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Compass className={`w-4 h-4 ${isExploringSkillsOnly ? 'text-ocean-300' : 'text-slate-500'}`} />
                <span className="text-xs font-bold">
                  🌱 I am still exploring / No prior technical skills yet
                </span>
              </div>
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center ${
                  isExploringSkillsOnly ? 'bg-ocean-500 border-ocean-500 text-white' : 'border-slate-700'
                }`}
              >
                {isExploringSkillsOnly && <Check className="w-3 h-3" />}
              </div>
            </div>

            {/* Categorized Skills Grid */}
            {!isExploringSkillsOnly && (
              <div className="space-y-5">
                {SKILL_CATALOG.map((catGroup) => {
                  const Icon = catGroup.icon;
                  return (
                    <div
                      key={catGroup.category}
                      className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                        <Icon className="w-4 h-4 text-brand-400" />
                        <span>{catGroup.category}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {catGroup.skills.map((skillName) => {
                          const existing = selectedSkills.find((s) => s.name === skillName);
                          const isSelected = !!existing;

                          return (
                            <div key={skillName} className="inline-flex flex-col gap-1">
                              <button
                                type="button"
                                onClick={() => handleToggleSkill(skillName, catGroup.category)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 ${
                                  isSelected
                                    ? 'bg-brand-500 text-white border-brand-500 shadow-xs'
                                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
                                }`}
                              >
                                <span>{skillName}</span>
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                              </button>

                              {/* Proficiency Selector when selected */}
                              {isSelected && (
                                <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-md p-0.5 justify-center">
                                  {(['beginner', 'intermediate', 'advanced'] as SkillProficiency[]).map(
                                    (lvl) => (
                                      <button
                                        key={lvl}
                                        type="button"
                                        onClick={() => handleUpdateSkillLevel(skillName, lvl)}
                                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold capitalize transition ${
                                          existing.level === lvl
                                            ? lvl === 'advanced'
                                              ? 'bg-ocean-500 text-white'
                                              : lvl === 'intermediate'
                                              ? 'bg-brand-500 text-white'
                                              : 'bg-emerald-500 text-white'
                                            : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                      >
                                        {lvl[0].toUpperCase()}
                                      </button>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 5: INTERESTS & CURIOSITY */}
        {/* ============================================================ */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                Step 5 of {totalSteps} • Passions & Curiosities
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                What domains excite your curiosity?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Tell us what you love reading or building—no expertise required, just raw curiosity!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INTEREST_DOMAINS.map((domain) => {
                const isSelected = selectedInterests.includes(domain);
                return (
                  <div
                    key={domain}
                    onClick={() => toggleArrayItem(selectedInterests, domain, setSelectedInterests)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-brand-500/10 border-brand-500 text-white shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Lightbulb
                        className={`w-4 h-4 ${isSelected ? 'text-brand-400' : 'text-slate-500'}`}
                      />
                      <span className="text-xs font-semibold">{domain}</span>
                    </div>
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected
                          ? 'bg-brand-500 border-brand-500 text-white'
                          : 'border-slate-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(6)}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 6: CURRENT INVOLVEMENTS & HACKATHONS */}
        {/* ============================================================ */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                Step 6 of {totalSteps} • Activities & Hackathons
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                What are you currently involved in?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Helps university clubs and hackathon squads invite you to appropriate groups.
              </p>
            </div>

            {/* General Involvements */}
            <div className="space-y-2">
              {INVOLVEMENT_OPTIONS.map((activity) => {
                const isSelected = selectedInvolvements.includes(activity);
                return (
                  <div
                    key={activity}
                    onClick={() =>
                      toggleArrayItem(selectedInvolvements, activity, setSelectedInvolvements)
                    }
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-brand-500/10 border-brand-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-semibold">{activity}</span>
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected
                          ? 'bg-brand-500 border-brand-500 text-white'
                          : 'border-slate-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hackathon Deep Dive Section */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Hackathon Track & Squad Profile
                </h4>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-300 font-medium">
                  Have you participated in hackathons before?
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setParticipatedHackathons(true)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                      participatedHackathons
                        ? 'bg-brand-500 text-white border-brand-500'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setParticipatedHackathons(false)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border transition ${
                      !participatedHackathons
                        ? 'bg-brand-500 text-white border-brand-500'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    No, but I want to!
                  </button>
                </div>
              </div>

              {participatedHackathons ? (
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Approx. Hackathons Participated
                      </label>
                      <select
                        value={hackathonCount}
                        onChange={(e) => setHackathonCount(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-500"
                      >
                        <option value={1}>1 Hackathon</option>
                        <option value={2}>2 - 3 Hackathons</option>
                        <option value={5}>4 - 6 Hackathons</option>
                        <option value={10}>7+ Hackathons (Seasoned)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Role You Usually Fill
                      </label>
                      <div className="flex flex-wrap gap-1">
                        {['Frontend UI', 'Backend API', 'ML Specialist', 'Pitch & Demo'].map(
                          (roleTag) => (
                            <button
                              key={roleTag}
                              type="button"
                              onClick={() =>
                                toggleArrayItem(
                                  hackathonRolesContributed,
                                  roleTag,
                                  setHackathonRolesContributed
                                )
                              }
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition ${
                                hackathonRolesContributed.includes(roleTag)
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  : 'bg-slate-800 text-slate-400 border-slate-700'
                              }`}
                            >
                              {roleTag}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <p className="font-semibold text-brand-300">
                    🚀 UniSphere Beginner Squad Matcher
                  </p>
                  <p className="text-[11px] text-slate-400">
                    We pair first-time hackathon participants with patient, supportive teammates and senior mentors for upcoming collegiate hackathons!
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setCurrentStep(5)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(7)}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 7: TEAM & COLLABORATION PROFILE */}
        {/* ============================================================ */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                Step 7 of {totalSteps} • Squad Collaboration Matrix
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                How do you want to collaborate?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Specify what you can contribute to a team, and what skills you need from teammates.
              </p>
            </div>

            {/* What are you looking for right now? */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                1. What are you looking for right now?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COLLAB_NEEDS.map((need) => {
                  const isSelected = lookingForConnections.includes(need);
                  return (
                    <div
                      key={need}
                      onClick={() =>
                        toggleArrayItem(lookingForConnections, need, setLookingForConnections)
                      }
                      className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-brand-500/10 border-brand-500 text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-medium">{need}</span>
                      <div
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                          isSelected
                            ? 'bg-brand-500 border-brand-500 text-white'
                            : 'border-slate-700'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* What can you contribute? */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider">
                2. What can you bring / contribute to a squad?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COLLAB_OFFERS.map((offer) => {
                  const isSelected = canContribute.includes(offer);
                  return (
                    <div
                      key={offer}
                      onClick={() => toggleArrayItem(canContribute, offer, setCanContribute)}
                      className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500 text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-medium">{offer}</span>
                      <div
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                          isSelected
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-slate-700'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Skills you need from teammates */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-ocean-400 uppercase tracking-wider">
                3. What skills are you looking for in teammates?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COLLAB_OFFERS.map((skill) => {
                  const isSelected = lookingForSkills.includes(skill);
                  return (
                    <div
                      key={skill}
                      onClick={() => toggleArrayItem(lookingForSkills, skill, setLookingForSkills)}
                      className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-ocean-500/10 border-ocean-500 text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-medium">{skill}</span>
                      <div
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                          isSelected
                            ? 'bg-ocean-500 border-ocean-500 text-white'
                            : 'border-slate-700'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setCurrentStep(6)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(8)}
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 8: 6-12 MONTH GOALS */}
        {/* ============================================================ */}
        {currentStep === 8 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                Step 8 of {totalSteps} • Milestone Alignment
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                What are your main goals for the next 6–12 months?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                UniSphere curates placement resources, fellowship grants, and hackathon alerts around your selected targets.
              </p>
            </div>

            <div className="space-y-2.5">
              {GOAL_OPTIONS.map((goal) => {
                const isSelected = goals.includes(goal);
                return (
                  <div
                    key={goal}
                    onClick={() => toggleArrayItem(goals, goal, setGoals)}
                    className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-brand-500/10 border-brand-500 text-white shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Target
                        className={`w-4 h-4 ${isSelected ? 'text-brand-400' : 'text-slate-500'}`}
                      />
                      <span className="text-xs font-semibold">{goal}</span>
                    </div>
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected
                          ? 'bg-brand-500 border-brand-500 text-white'
                          : 'border-slate-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setCurrentStep(7)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setCurrentStep(9)}
                className="px-6 py-2.5 bg-gradient-to-r from-brand-500 to-ocean-500 hover:from-brand-400 hover:to-ocean-400 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-2"
              >
                <span>Generate My Graph & Profile</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 9: COMPLETION SCREEN & PROFILE STRENGTH */}
        {/* ============================================================ */}
        {currentStep === 9 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header / Success */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Your UniSphere Profile is Ready!
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                You’re connected to the inter-college network with a verified academic baseline.
              </p>
            </div>

            {/* Profile Strength Meter & Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-500 to-ocean-500 flex items-center justify-center text-white text-xl font-bold border-2 border-slate-700 shadow-md">
                    {fullName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{fullName}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-bold border border-brand-500/30">
                        {role === 'student' ? 'Student' : role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {universityName} • {department}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {courseOrBranch} ({currentYearOrClass})
                    </p>
                  </div>
                </div>

                {/* Strength Gauge */}
                <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-3 rounded-xl border border-slate-800">
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                      Profile Strength
                    </span>
                    <span className="text-lg font-black text-emerald-400">
                      {calculateStrength()}% Strong
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-emerald-400 flex items-center justify-center text-xs font-bold text-white">
                    {calculateStrength()}%
                  </div>
                </div>
              </div>

              {/* Badges & Summary preview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Core Skills ({selectedSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedSkills.slice(0, 5).map((s) => (
                      <span
                        key={s.name}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-brand-500/10 text-brand-300 border border-brand-500/20"
                      >
                        {s.name} • {s.level[0].toUpperCase()}
                      </span>
                    ))}
                    {selectedSkills.length > 5 && (
                      <span className="text-[10px] text-slate-400">
                        +{selectedSkills.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Seeking in Squad
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {lookingForSkills.slice(0, 2).map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-ocean-500/10 text-ocean-300 border border-ocean-500/20"
                      >
                        {s.split('(')[0]}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Primary Goal
                  </span>
                  <p className="text-xs text-slate-300 leading-snug">
                    {goals[0] || 'Build high-impact projects'}
                  </p>
                </div>
              </div>

              {/* Privacy Setting */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-brand-400" />
                  <span className="text-xs font-semibold text-slate-300">Profile Visibility:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'public', label: '🌐 Public (All Colleges)', desc: 'Best for hackathons' },
                    { id: 'university_only', label: '🏛️ University Only', desc: 'Peers in your college' },
                    { id: 'department_only', label: '🔬 Department Only', desc: 'Classmates only' },
                  ].map((vis) => (
                    <button
                      key={vis.id}
                      type="button"
                      onClick={() => setProfileVisibility(vis.id as any)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition ${
                        profileVisibility === vis.id
                          ? 'bg-brand-500 text-white border-brand-500'
                          : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {vis.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Layer 2 Promotion & Actions */}
            <div className="bg-gradient-to-r from-brand-950/40 via-ocean-950/40 to-slate-900 border border-brand-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">
                    Optional Layer 2
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-bold border border-brand-500/30">
                    +15% Strength
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  Add Showcase Projects, Hackathon Wins & Internships
                </h4>
                <p className="text-xs text-slate-400">
                  You can complete this now or anytime later from your community dashboard.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsLayer2Open(true)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0"
              >
                <Layers className="w-4 h-4 text-brand-400" />
                <span>Open Layer 2 Builder ({projects.length} added)</span>
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setCurrentStep(8)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Edit Previous Answers
              </button>

              <button
                onClick={handleFinishOnboarding}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-brand-500 via-ocean-600 to-indigo-600 hover:from-brand-400 hover:to-ocean-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 transition group"
              >
                <span>Enter Personalized Community Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Layer 2 Modal */}
      <Layer2ProfileModal
        isOpen={isLayer2Open}
        onClose={() => setIsLayer2Open(false)}
        initialProjects={projects}
        initialExperiences={experiences}
        onSave={handleSaveLayer2Data}
      />
    </div>
  );
};
