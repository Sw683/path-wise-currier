import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { fireCelebrationBurst } from '../../utils/confetti';
import { MOCK_UNIVERSITIES } from '../../data/mockUniversities';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  GraduationCap, 
  BookOpen, 
  Microscope, 
  Users, 
  Compass, 
  Code2, 
  Heart, 
  Flame, 
  Target, 
  Layers, 
  CheckCircle2 
} from 'lucide-react';
import { UserRole, EducationLevel, SkillProficiency } from '../../types';

export const OnboardingFlow: React.FC = () => {
  const { isOnboardingOpen, setIsOnboardingOpen, handleCompleteOnboarding, showToast } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 8;

  // Onboarding form state
  const [role, setRole] = useState<UserRole>('student');
  const [educationLevel, setEducationLevel] = useState<EducationLevel>('ug_2');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('University of Delhi (DU)');
  const [selectedCollege, setSelectedCollege] = useState<string>('Kirori Mal College');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('Computer Science');
  const [selectedBranch, setSelectedBranch] = useState<string>('B.Sc (Hons) Computer Science');
  
  // Skills with proficiency
  const [skills, setSkills] = useState<Array<{ name: string; level: SkillProficiency }>>([
    { name: 'TypeScript', level: 'Strong' },
    { name: 'React', level: 'Intermediate' },
  ]);
  const [skillInput, setSkillInput] = useState('');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<SkillProficiency>('Intermediate');

  // Interests
  const [interests, setInterests] = useState<string[]>(['Full-Stack Web Dev', 'Generative AI']);

  // Activities / Clubs
  const [activities, setActivities] = useState<string[]>(['Delhi University Coding Club']);

  // Goals
  const [goals, setGoals] = useState<string[]>(['Win a National Hackathon', 'Secure a Summer 2027 Software Internship']);

  // Collaboration Preferences
  const [collabModes, setCollabModes] = useState<('Remote' | 'In-person' | 'Hybrid')[]>(['Hybrid', 'Remote']);
  const [weeklyHours, setWeeklyHours] = useState<number>(12);
  const [preferredRole, setPreferredRole] = useState<string>('Frontend Developer');

  // Celebratory feedback chip
  const [reactionMsg, setReactionMsg] = useState<string | null>(null);

  if (!isOnboardingOpen) return null;

  const triggerReaction = (text: string) => {
    setReactionMsg(text);
    setTimeout(() => {
      setReactionMsg(prev => (prev === text ? null : prev));
    }, 2800);
  };

  const isSchoolStudent = educationLevel.startsWith('school_');
  const isFirstYear = educationLevel === 'ug_1';
  const isFinalYear = educationLevel === 'ug_4' || educationLevel === 'pg_2';

  const handleNext = () => {
    if (currentStep === 1) {
      triggerReaction('Welcome to the academic family! 🌱');
    } else if (currentStep === 2) {
      triggerReaction(isSchoolStudent ? 'Exciting discovery phase ahead! 🔭' : isFinalYear ? 'Great! Let\'s target top career milestones! 🎯' : 'Awesome stage for high-velocity building! 🚀');
    } else if (currentStep === 3) {
      triggerReaction('Campus connected! 🏛️');
    } else if (currentStep === 4) {
      triggerReaction('Solid technical foundation! 🔥');
    } else if (currentStep === 5) {
      triggerReaction('Inspiring passion areas! 💡');
    } else if (currentStep === 6) {
      triggerReaction('Campus societies make college memorable! 🤝');
    } else if (currentStep === 7) {
      triggerReaction('Big ambitions in motion! 🚀');
    }

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Completed all 8 steps!
      fireCelebrationBurst();
      handleCompleteOnboarding({
        role,
        educationLevel,
        educationLevelLabel: getEducationLevelLabel(educationLevel),
        universityName: selectedUniversity,
        collegeName: selectedCollege,
        department: selectedDepartment,
        branch: selectedBranch,
        currentYear: getYearLabel(educationLevel),
        skills,
        interests,
        activities,
        goals,
        collaboration: {
          modes: collabModes,
          availabilityHoursPerWeek: weeklyHours,
          openToTeam: true,
          preferredRoles: [preferredRole],
        },
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const addSkill = (name: string, level: SkillProficiency) => {
    if (!skills.some(s => s.name.toLowerCase() === name.toLowerCase())) {
      setSkills(prev => [...prev, { name, level }]);
      triggerReaction(`Added ${name}! ⚡`);
    }
  };

  const removeSkill = (name: string) => {
    setSkills(prev => prev.filter(s => s.name !== name));
  };

  const toggleInterest = (item: string) => {
    setInterests(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
    triggerReaction('Great choice! 🌟');
  };

  const toggleActivity = (act: string) => {
    setActivities(prev => 
      prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]
    );
  };

  const toggleGoal = (goal: string) => {
    setGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Progress Header */}
        <div className="bg-slate-900 px-6 py-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs font-medium text-slate-300">
                {getStepTitle(currentStep)}
              </span>
            </div>
            <button
              onClick={() => setIsOnboardingOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>

          {/* Animated Celebration Banner */}
          {reactionMsg && (
            <div className="mt-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-lg inline-flex items-center gap-1.5 animate-bounce">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{reactionMsg}</span>
            </div>
          )}
        </div>

        {/* Wizard Step Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1: Who Are You? */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Welcome! Tell us a little about yourself.
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  We customize your communities and peer discovery based on your academic path.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  {
                    id: 'student',
                    title: 'Student',
                    desc: 'Enrolled in school, college, or university degree.',
                    icon: GraduationCap,
                    emoji: '🎒',
                  },
                  {
                    id: 'faculty',
                    title: 'Teacher / Faculty',
                    desc: 'Professor, lecturer, or department mentor.',
                    icon: BookOpen,
                    emoji: '🧑‍🏫',
                  },
                  {
                    id: 'researcher',
                    title: 'Researcher',
                    desc: 'PhD scholar, post-doc, or lab fellow.',
                    icon: Microscope,
                    emoji: '🔬',
                  },
                  {
                    id: 'other',
                    title: 'Other Academic Member',
                    desc: 'Alumnus, lab tech, or society advisor.',
                    icon: Users,
                    emoji: '🌐',
                  },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setRole(item.id as UserRole);
                      triggerReaction(`Selected ${item.title}! 🚀`);
                    }}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                      role === item.id
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-sm'
                        : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        {item.title}
                        {role === item.id && <CheckCircle2 className="w-4 h-4 text-indigo-600 inline" />}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Education Level */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Where are you in your academic journey?
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Questions adjust conditionally so you never see irrelevant stages.
                </p>
              </div>

              <div className="space-y-4">
                {/* Undergraduate */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Undergraduate (B.Tech / B.Sc / B.A / B.Com)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'ug_1', label: '1st Year', sub: 'Foundations & Clubs' },
                      { id: 'ug_2', label: '2nd Year', sub: 'Projects & Tech' },
                      { id: 'ug_3', label: '3rd Year', sub: 'Internships & ML' },
                      { id: 'ug_4', label: '4th Year', sub: 'Placements & Capstone' },
                    ].map(lvl => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => {
                          setEducationLevel(lvl.id as EducationLevel);
                          triggerReaction(`${lvl.label} chosen! 🎓`);
                        }}
                        className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                          educationLevel === lvl.id
                            ? 'border-indigo-600 bg-indigo-50/70 font-bold text-indigo-700'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <p className="text-xs font-bold">{lvl.label}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{lvl.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* School */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    School Students (STEM & Early Innovation)
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {['school_class_8', 'school_class_9', 'school_class_10', 'school_class_11', 'school_class_12'].map((cls, idx) => (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => {
                          setEducationLevel(cls as EducationLevel);
                          triggerReaction(`Class ${idx + 8}! Young explorer 🌱`);
                        }}
                        className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer ${
                          educationLevel === cls
                            ? 'border-indigo-600 bg-indigo-50/70 font-bold text-indigo-700'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span className="text-xs font-semibold">Class {idx + 8}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Postgraduate & Research */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Postgraduate & Doctoral Research
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'pg_1', label: 'PG 1st Year', sub: 'Master\'s Core' },
                      { id: 'pg_2', label: 'PG 2nd Year', sub: 'Master\'s Thesis' },
                      { id: 'phd', label: 'PhD Scholar', sub: 'Active Lab Research' },
                    ].map(lvl => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => {
                          setEducationLevel(lvl.id as EducationLevel);
                          triggerReaction(`${lvl.label} chosen! 🔬`);
                        }}
                        className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                          educationLevel === lvl.id
                            ? 'border-indigo-600 bg-indigo-50/70 font-bold text-indigo-700'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <p className="text-xs font-bold">{lvl.label}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{lvl.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Institution & Department */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Where do you study?
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Connect automatically to your college community and department batch channels.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select University / Institution
                  </label>
                  <select
                    value={selectedUniversity}
                    onChange={e => {
                      setSelectedUniversity(e.target.value);
                      triggerReaction('Campus community linked! 🏛️');
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  >
                    {MOCK_UNIVERSITIES.map(u => (
                      <option key={u.id} value={u.name}>
                        {u.name} ({u.location})
                      </option>
                    ))}
                    <option value="Other Institution">Other Institution (Enter Custom)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      College / Campus
                    </label>
                    <input
                      type="text"
                      value={selectedCollege}
                      onChange={e => setSelectedCollege(e.target.value)}
                      placeholder="e.g. Kirori Mal College or Main Campus"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      value={selectedDepartment}
                      onChange={e => setSelectedDepartment(e.target.value)}
                      placeholder="e.g. Computer Science"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Degree / Branch
                  </label>
                  <input
                    type="text"
                    value={selectedBranch}
                    onChange={e => setSelectedBranch(e.target.value)}
                    placeholder="e.g. B.Sc (Hons) Computer Science or B.Tech CSE"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-center gap-2.5 text-xs text-indigo-900">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>
                    You will automatically gain access to the <strong>{selectedUniversity}</strong> community and department hub.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Skills & Skill Levels */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  What skills do you bring to the network?
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Beginner or advanced, every skill helps match you with the right project collaborators.
                </p>
              </div>

              {/* Quick skill add inputs */}
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="e.g. Python, Figma, React, Arduino..."
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && skillInput.trim()) {
                      e.preventDefault();
                      addSkill(skillInput.trim(), selectedSkillLevel);
                      setSkillInput('');
                    }
                  }}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
                <select
                  value={selectedSkillLevel}
                  onChange={e => setSelectedSkillLevel(e.target.value as SkillProficiency)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Developing">Developing</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Strong">Strong</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <button
                  type="button"
                  onClick={() => {
                    if (skillInput.trim()) {
                      addSkill(skillInput.trim(), selectedSkillLevel);
                      setSkillInput('');
                    }
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 cursor-pointer"
                >
                  Add
                </button>
              </div>

              {/* Added Skills List */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">Your Skills ({skills.length})</label>
                <div className="flex flex-wrap gap-2">
                  {skills.map(s => (
                    <span
                      key={s.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-medium"
                    >
                      <span>{s.name}</span>
                      <span className="text-[10px] bg-indigo-200 text-indigo-800 px-1.5 py-0.2 rounded-md font-semibold">
                        {s.level}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeSkill(s.name)}
                        className="text-indigo-400 hover:text-indigo-700 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Popular recommendations */}
              <div>
                <span className="text-xs text-slate-400 block mb-2">Tap popular skills to add:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['TypeScript', 'Python', 'React', 'Figma', 'Node.js', 'C++', 'Tailwind CSS', 'FastAPI', 'PyTorch', 'SQL'].map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => addSkill(p, 'Intermediate')}
                      className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 text-slate-700 transition-colors"
                    >
                      + {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Interests (Conditional by Education Level) */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {isSchoolStudent 
                    ? 'What areas are you excited to explore?' 
                    : 'What technical & academic fields fascinate you?'}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  We match you with projects, communities, and study groups in these domains.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {(isSchoolStudent ? [
                  'STEM & Robotics', 'Intro to Coding (Python)', 'Science Fair Projects',
                  'Math Olympiads', 'Web Design', 'Astronomy & Physics',
                  'Game Development', 'Creative Writing', 'Environmental Science'
                ] : [
                  'Full-Stack Web Dev', 'Generative AI & LLMs', 'Robotics & Embedded IoT',
                  'Distributed Systems', 'UI/UX & Product Design', 'Competitive Programming',
                  'Cybersecurity', 'FinTech & Blockchain', 'Mobile App Development',
                  'Research & Publications', 'Open Source', 'High-Frequency Systems'
                ]).map(interest => {
                  const isSelected = interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <span>{interest}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: Activities & Clubs */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {isFirstYear 
                    ? 'Which clubs and societies are you planning to join?' 
                    : 'Which campus activities and societies are you part of?'}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Societies are where students build lifelong networks and win competitions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  'Campus Coding / Developer Club',
                  'Robotics & Hardware Society',
                  'E-Cell / Entrepreneurship Syndicate',
                  'Design & Creative Guild',
                  'Debate & MUN Society',
                  'Finance & Wall Street Club',
                  'Open Source / Linux User Group',
                  'Sports & Cultural Council',
                ].map(act => {
                  const isSelected = activities.includes(act);
                  return (
                    <button
                      key={act}
                      type="button"
                      onClick={() => toggleActivity(act)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span>{act}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 7: Goals (Conditional for 1st Year vs Final Year vs School) */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {isFinalYear
                    ? 'What are your top career & placement goals this year?'
                    : isFirstYear
                    ? 'What do you hope to accomplish in your 1st year?'
                    : 'What are your primary goals on CampusNexus?'}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  We highlight relevant opportunities and teammate matches for these targets.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-2">
                {(isFinalYear ? [
                  'Secure a Tier-1 Software Engineering Offer',
                  'Get Placement Mentorship from Placed Seniors',
                  'Build 2 Production-Grade System Design Projects',
                  'Prepare for Technical Mock Interviews & Online Assessments',
                  'Publish Undergrad Capstone Research Paper'
                ] : isFirstYear ? [
                  'Master Data Structures & Programming Fundamentals',
                  'Join Campus Tech Societies & Find Study Buddies',
                  'Build My Very First Complete Web or Hardware Project',
                  'Participate in a Fresher-friendly Hackathon',
                  'Explore Different Engineering Branches & Career Paths'
                ] : isSchoolStudent ? [
                  'Build Exciting Science & Tech Projects',
                  'Connect with Other School Innovators',
                  'Prepare for National STEM Olympiads & Competitions',
                  'Explore Future College Majors & Careers'
                ] : [
                  'Win a National Level Hackathon (e.g. SIH)',
                  'Secure a Summer 2027 Software Internship',
                  'Find Skilled Teammates for Capstone / Startup Idea',
                  'Contribute to High-Impact Open Source Repositories',
                  'Apply for Student Innovation Grants & Fellowships'
                ]).map(goal => {
                  const isSelected = goals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Target className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                        <span>{goal}</span>
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 8: Collaboration Preferences */}
          {currentStep === 8 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  How would you like to collaborate with peers?
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Helps our Teammate Matching Engine find the right partners who respect your schedule.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {/* Mode */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">Preferred Working Mode</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Hybrid', 'Remote', 'In-person'] as const).map(mode => {
                      const isSelected = collabModes.includes(mode);
                      return (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => {
                            setCollabModes(prev =>
                              prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
                            );
                          }}
                          className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 font-bold'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          {mode}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hours per week slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Weekly Availability for Projects</span>
                    <span className="text-indigo-600 font-extrabold">{weeklyHours} hours / week</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={30}
                    step={2}
                    value={weeklyHours}
                    onChange={e => setWeeklyHours(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Light (4h)</span>
                    <span>Standard Hackathon (12h)</span>
                    <span>Intensive (30h)</span>
                  </div>
                </div>

                {/* Primary team role preference */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Role You Typically Prefer in a Team
                  </label>
                  <select
                    value={preferredRole}
                    onChange={e => setPreferredRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Full-Stack Developer">Full-Stack Developer</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="AI / ML Engineer">AI / ML Engineer</option>
                    <option value="Hardware / Embedded Engineer">Hardware / Embedded Engineer</option>
                    <option value="Product / Pitch Lead">Product / Pitch Lead</option>
                    <option value="Researcher">Academic Researcher</option>
                  </select>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Your profile will receive an immediate strength boost to 80% with verified student visibility!
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Wizard Footer Controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all hover:scale-102 cursor-pointer"
          >
            <span>{currentStep === totalSteps ? 'Complete & Enter Network' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

function getStepTitle(step: number): string {
  switch (step) {
    case 1: return 'Identity';
    case 2: return 'Education Journey';
    case 3: return 'Institution & Dept';
    case 4: return 'Skills & Proficiency';
    case 5: return 'Interests';
    case 6: return 'Activities & Clubs';
    case 7: return 'Goals';
    case 8: return 'Collaboration Preferences';
    default: return '';
  }
}

function getEducationLevelLabel(lvl: EducationLevel): string {
  if (lvl.startsWith('school_')) return `School (${lvl.replace('school_', '').replace('_', ' ')})`;
  if (lvl === 'ug_1') return 'Undergraduate 1st Year';
  if (lvl === 'ug_2') return 'Undergraduate 2nd Year';
  if (lvl === 'ug_3') return 'Undergraduate 3rd Year';
  if (lvl === 'ug_4') return 'Undergraduate 4th Year';
  if (lvl === 'pg_1') return 'Postgraduate 1st Year';
  if (lvl === 'pg_2') return 'Postgraduate 2nd Year';
  if (lvl === 'phd') return 'PhD Scholar';
  return 'Researcher';
}

function getYearLabel(lvl: EducationLevel): string {
  if (lvl.startsWith('school_')) return lvl.replace('school_', '');
  if (lvl === 'ug_1') return '1st Year';
  if (lvl === 'ug_2') return '2nd Year';
  if (lvl === 'ug_3') return '3rd Year';
  if (lvl === 'ug_4') return '4th Year';
  if (lvl === 'pg_1') return 'PG 1st Year';
  if (lvl === 'pg_2') return 'PG 2nd Year';
  return 'Scholar';
}
