import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Compass,
  FlaskConical,
  Globe2,
  HeartPulse,
  Landmark,
  Lightbulb,
  LockKeyhole,
  Megaphone,
  Palette,
  Rocket,
  Scale,
  Shield,
  Sparkles,
  Target,
  Trophy,
  Users,
  Wrench,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAREER_PATHS } from '../data/careers';
import { ClassLevel, InterestProfile, StudentProfile } from '../types';
import { evaluateStudentProfile } from '../utils/decisionEngine';
import { EXAMS_DATABASE } from '../data/exams';
import { createDefaultExamGoal } from '../utils/studyPlan';
import { PathWiseMark } from './PathWiseMark';

type Stage = '8' | '9' | '10' | '11' | '12' | 'Diploma' | 'Undergraduate' | 'Graduate' | 'Working / Other';
type Language = 'English' | 'हिंदी' | 'Hinglish';

interface Choice {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  tone: string;
}

const interestChoices: Choice[] = [
  { id: 'technology', label: 'Technology', description: 'Apps, coding, AI, and the future', icon: Lightbulb, tone: 'cyan' },
  { id: 'medicine', label: 'Medicine & Healthcare', description: 'Science, care, and human wellbeing', icon: HeartPulse, tone: 'rose' },
  { id: 'business', label: 'Business & Finance', description: 'Ideas, markets, and making things grow', icon: BriefcaseBusiness, tone: 'amber' },
  { id: 'design', label: 'Design & Creativity', description: 'Visual thinking, stories, and expression', icon: Palette, tone: 'fuchsia' },
  { id: 'science', label: 'Science & Research', description: 'Questions, experiments, and discovery', icon: FlaskConical, tone: 'violet' },
  { id: 'law', label: 'Law', description: 'Reasoning, justice, and advocacy', icon: Scale, tone: 'blue' },
  { id: 'government', label: 'Government & Civil Services', description: 'Public impact and leadership', icon: Landmark, tone: 'emerald' },
  { id: 'defence', label: 'Defence', description: 'Courage, discipline, and service', icon: Shield, tone: 'orange' },
  { id: 'media', label: 'Media & Communication', description: 'People, messages, and culture', icon: Megaphone, tone: 'pink' },
  { id: 'sports', label: 'Sports', description: 'Performance, movement, and teamwork', icon: Trophy, tone: 'lime' },
  { id: 'trades', label: 'Skilled Trades', description: 'Practical making and problem solving', icon: Wrench, tone: 'slate' },
  { id: 'unsure', label: "I’m not sure yet", description: 'That is a perfectly good place to start', icon: Compass, tone: 'indigo' },
];

const workChoices: Choice[] = [
  { id: 'build', label: 'Build and solve', description: 'Make something work better', icon: Wrench, tone: 'cyan' },
  { id: 'help', label: 'Help and understand people', description: 'Listen, care, and make a difference', icon: Users, tone: 'rose' },
  { id: 'create', label: 'Imagine and create', description: 'Turn ideas into something people feel', icon: Palette, tone: 'fuchsia' },
  { id: 'lead', label: 'Lead and make decisions', description: 'Bring people together around a goal', icon: Target, tone: 'amber' },
  { id: 'discover', label: 'Explore and investigate', description: 'Ask why and find evidence', icon: FlaskConical, tone: 'violet' },
  { id: 'move', label: 'Work actively and practically', description: 'Learn through action and movement', icon: Rocket, tone: 'emerald' },
];

const goalChoices = [
  'High earning potential',
  'Job stability',
  'Freedom and flexibility',
  'Creativity',
  'Helping people',
  'Starting a business',
  'Working with technology',
  'Exploring the world',
  'I’m still figuring it out',
];

const toneClasses: Record<string, string> = {
  cyan: 'from-ocean-400/20 to-ocean-400/5 text-ocean-200 border-ocean-300/20',
  rose: 'from-brand-400/20 to-brand-400/5 text-brand-200 border-brand-300/20',
  amber: 'from-brand-400/20 to-brand-400/5 text-brand-200 border-brand-300/20',
  fuchsia: 'from-brand-400/20 to-brand-400/5 text-brand-200 border-brand-300/20',
  violet: 'from-ocean-400/20 to-ocean-400/5 text-ocean-200 border-ocean-300/20',
  blue: 'from-ocean-400/20 to-ocean-400/5 text-ocean-200 border-ocean-300/20',
  emerald: 'from-ocean-400/20 to-ocean-400/5 text-ocean-200 border-ocean-300/20',
  orange: 'from-brand-400/20 to-brand-400/5 text-brand-200 border-brand-300/20',
  pink: 'from-brand-400/20 to-brand-400/5 text-brand-200 border-brand-300/20',
  lime: 'from-ocean-400/20 to-ocean-400/5 text-ocean-200 border-ocean-300/20',
  slate: 'from-ocean-400/20 to-ocean-400/5 text-ocean-200 border-ocean-300/20',
  indigo: 'from-ocean-400/20 to-ocean-400/5 text-ocean-200 border-ocean-300/20',
};

const encouragement = ['Good start.', 'We’re getting to know your strengths.', 'Your career map is taking shape.', 'Almost there.'];

const stageToClass: Record<Stage, ClassLevel> = {
  '8': '8',
  '9': '9',
  '10': '10',
  '11': '11',
  '12': '12',
  Diploma: '12',
  Undergraduate: '12',
  Graduate: '12',
  'Working / Other': '12',
};

export const OnboardingWizard: React.FC = () => {
  const { activeProfile, updateProfile, setOnboardingAnswers, setActiveTab } = useApp();
  const [stage, setStage] = useState<Stage | ''>('');
  const [language, setLanguage] = useState<Language | ''>('');
  const [interests, setInterests] = useState<string[]>([]);
  const [workStyle, setWorkStyle] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [clarity, setClarity] = useState('');
  const [degree, setDegree] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    setOnboardingAnswers({
      stage: stage || undefined,
      language: language || undefined,
      interests,
      workStyle: workStyle || undefined,
      goals,
      clarity: clarity || undefined,
      degree: degree || undefined,
      currentYear: currentYear || undefined,
    });
  }, [currentYear, degree, goals, interests, language, setOnboardingAnswers, stage, workStyle, clarity]);

  const hasAdaptiveQuestion = stage === '10' || stage === '12' || stage === 'Undergraduate';
  const questionCount = 6 + (hasAdaptiveQuestion ? 1 : 0);
  const currentQuestion = questionIndex;
  const progress = Math.min(100, Math.round(((currentQuestion + 1) / questionCount) * 100));

  const profile = useMemo<StudentProfile>(() => {
    const base: InterestProfile = { analytical: 35, technical: 35, scientific: 35, social: 35, creative: 35, business: 35, physical: 35, leadership: 35 };
    const add = (id: string, values: Partial<InterestProfile>) => {
      if (interests.includes(id)) Object.entries(values).forEach(([key, value]) => { base[key as keyof InterestProfile] += value || 0; });
    };
    add('technology', { technical: 58, analytical: 42 });
    add('medicine', { scientific: 58, social: 42 });
    add('business', { business: 58, analytical: 36 });
    add('design', { creative: 62, technical: 28 });
    add('science', { scientific: 58, analytical: 42 });
    add('law', { leadership: 42, social: 36, analytical: 38 });
    add('government', { leadership: 52, social: 38 });
    add('defence', { physical: 58, leadership: 42 });
    add('media', { creative: 48, social: 48 });
    add('sports', { physical: 62, leadership: 30 });
    add('trades', { technical: 45, physical: 42 });
    add('unsure', { analytical: 8, creative: 8, social: 8 });
    if (workStyle === 'build') { base.technical += 20; base.analytical += 16; }
    if (workStyle === 'help') { base.social += 20; base.scientific += 10; }
    if (workStyle === 'create') base.creative += 24;
    if (workStyle === 'lead') { base.leadership += 22; base.business += 12; }
    if (workStyle === 'discover') { base.scientific += 18; base.analytical += 18; }
    if (workStyle === 'move') { base.physical += 22; base.leadership += 8; }

    const normalized: InterestProfile = {
      analytical: Math.min(98, base.analytical),
      technical: Math.min(98, base.technical),
      scientific: Math.min(98, base.scientific),
      social: Math.min(98, base.social),
      creative: Math.min(98, base.creative),
      business: Math.min(98, base.business),
      physical: Math.min(98, base.physical),
      leadership: Math.min(98, base.leadership),
    };
    return {
      ...activeProfile,
      name: activeProfile.name || 'Future Pathfinder',
      classLevel: stageToClass[stage || '10'],
      mediumOfEducation: language === 'हिंदी' ? 'Hindi' : 'English',
      targetCareerGoal: goals[0] || 'Explore options',
      interests: normalized,
      academics: { ...activeProfile.academics, learningPreferences: ['practical', 'visual'], learningSpeed: 'moderate' },
      completedAssessment: false,
    };
  }, [activeProfile, goals, interests, language, stage, workStyle]);

  const recommendations = useMemo(() => evaluateStudentProfile(profile).slice(0, 3), [profile]);

  const answerForQuestion = (value: string) => {
    if (currentQuestion === 0) setStage(value as Stage);
    if (currentQuestion === 1 && hasAdaptiveQuestion) {
      if (stage === 'Undergraduate') setDegree(value);
      else setLanguage(value as Language);
    } else if (currentQuestion === 1 && !hasAdaptiveQuestion) setLanguage(value as Language);
    if ((currentQuestion === 2 && hasAdaptiveQuestion) || (currentQuestion === 1 && !hasAdaptiveQuestion)) {
      if (hasAdaptiveQuestion && stage !== 'Undergraduate') setLanguage(value as Language);
    }
    const next = currentQuestion + 1;
    if (next >= questionCount) {
      setIsConnecting(true);
      window.setTimeout(() => { setIsConnecting(false); setShowPreview(true); }, 1200);
    } else {
      setQuestionIndex(next);
    }
  };

  const goBack = () => setQuestionIndex((value) => Math.max(0, value - 1));

  const finish = () => {
    setOnboardingAnswers({
      stage: stage || undefined,
      language: language || undefined,
      interests,
      workStyle: workStyle || undefined,
      goals,
      clarity: clarity || undefined,
      degree: degree || undefined,
      currentYear: currentYear || undefined,
    });
    updateProfile({ ...profile, completedAssessment: true });
    setShowSignup(false);
    setActiveTab('dashboard');
  };

  const resetToQuestions = () => {
    setShowPreview(false);
    setShowSignup(false);
    setQuestionIndex(Math.max(0, questionCount - 1));
  };

  if (isConnecting) {
    return <UniverseShell><div className="text-center"><div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-brand-300/40 bg-brand-400/10 text-brand-200 shadow-[0_0_80px_rgba(129,140,248,0.5)] motion-safe:animate-pulse"><Sparkles className="h-9 w-9" /></div><h1 className="font-['Outfit'] text-3xl font-bold text-white sm:text-4xl">We’re connecting the dots...</h1><p className="mt-3 text-sm text-slate-400">Building your career map.</p><div className="mx-auto mt-8 h-1 w-48 overflow-hidden rounded-full bg-white/10"><div className="h-full w-2/3 rounded-full bg-gradient-to-r from-brand-400 to-cyan-300 motion-safe:animate-pulse" /></div></div></UniverseShell>;
  }

  if (showSignup) {
    return <UniverseShell><div className="mx-auto max-w-md text-center"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-400/15 text-brand-200 ring-1 ring-brand-300/30"><LockKeyhole className="h-7 w-7" /></div><p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-200">Your career map is ready.</p><h1 className="mt-3 font-['Outfit'] text-4xl font-extrabold tracking-tight text-white">Save your personalized path.</h1><p className="mt-4 text-sm leading-6 text-slate-400">Create an account to keep your matches, skills, and preparation timeline. You can also continue exploring without saving.</p><div className="mt-8 space-y-3"><button onClick={finish} className="w-full rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-brand-100">Create account & continue</button><button onClick={finish} className="w-full rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10">Continue without signing up</button></div></div></UniverseShell>;
  }

  if (showPreview) {
    return <UniverseShell><Preview recommendations={recommendations} profile={profile} onContinue={() => setShowSignup(true)} onEdit={resetToQuestions} /></UniverseShell>;
  }

  return (
    <UniverseShell>
      <div className="w-full max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <PathWiseMark size="sm" dark />
          <div className="flex items-center gap-3"><span className="text-xs font-medium text-slate-400">{progress}%</span><div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10 sm:w-32"><div className="h-full rounded-full bg-gradient-to-r from-brand-300 to-cyan-300 transition-all duration-500" style={{ width: `${progress}%` }} /></div></div>
        </div>
        <div key={currentQuestion} className="motion-safe:animate-[fade-in_500ms_ease-out]">
          <QuestionPanel index={currentQuestion} hasAdaptive={hasAdaptiveQuestion} stage={stage} degree={degree} currentLanguage={language} onAnswer={answerForQuestion} interests={interests} setInterests={setInterests} workStyle={workStyle} setWorkStyle={setWorkStyle} goals={goals} setGoals={setGoals} clarity={clarity} setClarity={setClarity} setDegree={setDegree} setCurrentYear={setCurrentYear} />
        </div>
        <div className="mt-8 flex items-center justify-between"><button onClick={goBack} disabled={currentQuestion === 0} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white disabled:invisible"><ArrowLeft className="h-4 w-4" /> Back</button><p className="text-xs text-slate-500">{encouragement[Math.min(encouragement.length - 1, Math.floor(currentQuestion / 2))]}</p><span className="w-16" /></div>
      </div>
    </UniverseShell>
  );
};

const QuestionPanel: React.FC<{
  index: number; hasAdaptive: boolean; stage: Stage | ''; degree: string; currentLanguage: Language | '';
  onAnswer: (value: string) => void; interests: string[]; setInterests: React.Dispatch<React.SetStateAction<string[]>>;
  workStyle: string; setWorkStyle: (value: string) => void; goals: string[]; setGoals: React.Dispatch<React.SetStateAction<string[]>>;
  clarity: string; setClarity: (value: string) => void; setDegree: (value: string) => void; setCurrentYear: (value: string) => void;
}> = ({ index, hasAdaptive, stage, onAnswer, interests, setInterests, workStyle, setWorkStyle, goals, setGoals, clarity, setClarity, setDegree, setCurrentYear }) => {
  const offset = hasAdaptive ? 1 : 0;
  if (index === 0) return <Question heading="What class or stage are you currently in?" subheading="Every journey starts from a different place." options={['8', '9', '10', '11', '12', 'Diploma', 'Undergraduate', 'Graduate', 'Working / Other'].map((value) => ({ id: value, label: value.startsWith('Class') || ['Diploma', 'Undergraduate', 'Graduate'].includes(value) ? value : `Class ${value}`, icon: Globe2, tone: 'indigo' }))} onAnswer={onAnswer} />;
  if (hasAdaptive && index === 1) {
    if (stage === 'Undergraduate') return <Question heading="What are you studying right now?" subheading="We’ll keep the next suggestions relevant to your current direction." options={['Engineering / Technology', 'Medicine / Life Sciences', 'Business / Commerce', 'Arts / Design', 'Law / Public Policy', 'Other or exploring'].map((value) => ({ id: value, label: value, icon: BookIcon, tone: 'cyan' }))} onAnswer={(value) => { setDegree(value); onAnswer(value); }} />;
    return <Question heading={stage === '12' ? 'What would help you most after Class 12?' : 'What feels most important as you plan Class 11–12?'} subheading="This lets us adapt the journey to your next milestone." options={(stage === '12' ? ['Choose a degree or course', 'Understand entrance exams', 'Explore skills and careers', 'Find practical alternatives'] : ['Compare streams', 'Understand subjects and careers', 'Build a strong foundation', 'I’m still exploring']).map((value) => ({ id: value, label: value, icon: Target, tone: 'violet' }))} onAnswer={onAnswer} />;
  }
  if (index === 1 + offset) return <Question heading="Which language feels most comfortable for you?" subheading="Choose what makes this experience feel natural." options={['English', 'हिंदी', 'Hinglish'].map((value) => ({ id: value, label: value, icon: Globe2, tone: 'blue' }))} onAnswer={onAnswer} />;
  if (index === 2 + offset) return <Question heading="What sparks your curiosity?" subheading="Pick up to three paths worth exploring." options={interestChoices} multi selected={interests} setSelected={setInterests} onAnswer={() => onAnswer('interests')} />;
  if (index === 3 + offset) return <Question heading="What kind of work sounds exciting to you?" subheading="Imagine an ordinary day in a future you would enjoy." options={workChoices} selectedId={workStyle} onAnswer={(value) => { setWorkStyle(value); onAnswer(value); }} />;
  if (index === 4 + offset) return <Question heading="What do you want your future to give you?" subheading="Choose the values that matter most. You can select more than one." options={goalChoices.map((value) => ({ id: value, label: value, icon: Target, tone: 'indigo' }))} multi selected={goals} setSelected={setGoals} onAnswer={() => onAnswer('goals')} />;
  return <Question heading="How clear are you about your career right now?" subheading="Clarity is not a test. It is simply your starting point." options={['I know exactly what I want', 'I have a few ideas', 'I’m confused', 'I have no idea yet'].map((value) => ({ id: value, label: value, icon: Compass, tone: 'fuchsia' }))} selectedId={clarity} onAnswer={(value) => { setClarity(value); onAnswer(value); }} />;
};

const Question: React.FC<{ heading: string; subheading: string; options: Choice[]; onAnswer: (value: string) => void; multi?: boolean; selected?: string[]; setSelected?: React.Dispatch<React.SetStateAction<string[]>>; selectedId?: string }> = ({ heading, subheading, options, onAnswer, multi, selected = [], setSelected, selectedId }) => {
  const [localSelection, setLocalSelection] = useState<string[]>(selected);
  const choose = (id: string) => {
    if (!multi) { onAnswer(id); return; }
    const next = localSelection.includes(id) ? localSelection.filter((item) => item !== id) : [...localSelection, id];
    setLocalSelection(next);
    setSelected?.(next);
  };
  return <div><div className="mb-8 text-center"><p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-200">Question</p><h1 className="font-['Outfit'] text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">{heading}</h1><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400">{subheading}</p></div><div className="grid gap-3 sm:grid-cols-2">{options.map((option) => { const Icon = option.icon; const selectedState = multi ? localSelection.includes(option.id) : selectedId === option.id; return <button key={option.id} onClick={() => choose(option.id)} className={`group relative flex min-h-[82px] items-center gap-4 rounded-2xl border bg-gradient-to-br p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 ${toneClasses[option.tone] || toneClasses.indigo} ${selectedState ? 'ring-2 ring-white/70' : ''}`}><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10"><Icon className="h-5 w-5" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-bold text-white">{option.label}</span>{option.description && <span className="mt-1 block text-xs leading-5 text-slate-400">{option.description}</span>}</span>{selectedState && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-slate-950"><Check className="h-3 w-3" /></span>}</button>; })}</div>{multi && <button disabled={!localSelection.length} onClick={() => onAnswer('selected')} className="mx-auto mt-6 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-40">Continue <ArrowRight className="h-4 w-4" /></button>}</div>;
};

const Preview: React.FC<{ recommendations: ReturnType<typeof evaluateStudentProfile>; profile: StudentProfile; onContinue: () => void; onEdit: () => void }> = ({ recommendations, profile, onContinue, onEdit }) => (
  <div className="w-full max-w-4xl"><div className="mb-8 text-center"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-400/15 text-brand-200 shadow-[0_0_50px_rgba(129,140,248,0.25)]"><Sparkles className="h-8 w-8" /></div><p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-200">Your first map</p><h1 className="mt-3 font-['Outfit'] text-3xl font-extrabold text-white sm:text-5xl">Paths worth exploring.</h1><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-400">These are potential matches based on your answers—not guaranteed predictions. Your interests and plans can grow from here.</p></div><div className="grid gap-4 md:grid-cols-3">{recommendations.map((item, index) => <div key={item.careerId} className={`rounded-2xl border p-5 ${index === 0 ? 'border-brand-300/50 bg-brand-400/10' : 'border-white/10 bg-white/5'}`}><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{index === 0 ? 'Potential match' : 'Worth exploring'}</span><span className="text-sm font-bold text-brand-200">{item.compatibilityScore}% fit</span></div><h2 className="mt-4 text-base font-bold text-white">{item.careerTitle}</h2><p className="mt-2 text-xs leading-5 text-slate-400">{item.whyThisRecommendation[0]}</p></div>)}</div><div className="mt-5 grid gap-4 md:grid-cols-2"><InfoCard icon={<Lightbulb className="h-5 w-5" />} title="Skills to explore" body={recommendations[0]?.strengthsAlignment.slice(0, 2).join(' • ') || 'Curiosity • Communication • Problem solving'} /><InfoCard icon={<Rocket className="h-5 w-5" />} title="A simple timeline" body={`Now: explore and build small projects • Class ${profile.classLevel}: strengthen foundations • Next: compare courses and pathways`} /></div><OptionalExamGoal /><div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><button onClick={onContinue} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-brand-100 sm:w-auto">Save my career map <ArrowRight className="h-4 w-4" /></button><button onClick={onEdit} className="rounded-xl px-5 py-3.5 text-sm font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white">Review answers</button></div></div>
);

const OptionalExamGoal: React.FC = () => {
  const { examGoalProfile, setExamGoalProfile } = useApp();
  const selectedExam = examGoalProfile?.examId || '';
  return <div className="mt-5 rounded-2xl border border-brand-300/20 bg-brand-400/10 p-4 text-left"><div className="flex items-center gap-2 text-sm font-bold text-white"><Target className="h-4 w-4 text-brand-200" /> Optional: add an exam goal</div><p className="mt-1 text-xs leading-5 text-slate-400">Set a target now for a live countdown and personalised study plan. You can skip this and add it later from your dashboard.</p><div className="mt-3 grid gap-2 sm:grid-cols-[1fr_180px]"><select value={selectedExam} onChange={(event) => setExamGoalProfile(event.target.value ? createDefaultExamGoal(event.target.value) : undefined)} className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-xs text-white outline-none focus:ring-2 focus:ring-brand-400"><option value="">No exam goal yet</option>{EXAMS_DATABASE.map((exam) => <option key={exam.id} value={exam.id}>{exam.name}</option>)}</select>{examGoalProfile && <input type="date" value={examGoalProfile.targetDate} onChange={(event) => setExamGoalProfile({ ...examGoalProfile, targetDate: event.target.value, updatedAt: new Date().toISOString() })} className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-xs text-white outline-none focus:ring-2 focus:ring-brand-400" />}</div></div>;

};

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; body: string }> = ({ icon, title, body }) => <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-400/10 text-brand-200">{icon}</span><div><h3 className="text-sm font-bold text-white">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-400">{body}</p></div></div>;
const BookIcon = () => <BriefcaseBusiness className="h-5 w-5" />;

const UniverseShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const stars = Array.from({ length: 36 }, (_, index) => ({ left: `${(index * 37) % 100}%`, top: `${(index * 61) % 100}%`, delay: `${(index % 7) * 0.4}s` }));
  return <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4 py-8 text-white sm:px-6"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(79,70,229,0.28),transparent_38%),radial-gradient(ellipse_at_85%_80%,rgba(6,182,212,0.16),transparent_35%),radial-gradient(ellipse_at_55%_45%,rgba(124,58,237,0.10),transparent_50%)]" /><div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl motion-safe:animate-pulse" /><div className="pointer-events-none absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-3xl motion-safe:animate-pulse" />{stars.map((star, index) => <span key={index} className="absolute h-0.5 w-0.5 rounded-full bg-white/70 motion-safe:animate-pulse" style={{ left: star.left, top: star.top, animationDelay: star.delay }} />)}<div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:80px_80px]" />{children}</section>;
};
