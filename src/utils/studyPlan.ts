import { EXAMS_DATABASE } from '../data/exams';
import {
  Exam,
  ExamGoalProfile,
  ExamResource,
  ExamSubjectProgress,
  MathsPracticeProgress,
  MotivationPreferences,
  StudentLikeRecommendation,
  StudentProfile,
  StudyPlan,
  StudyPlanTask,
  StudyPreferences,
} from '../types';

export interface MathsPracticeQuestion {
  topic: string;
  difficulty: 'foundation' | 'practice' | 'challenge';
  prompt: string;
  hint: string;
  answer: string;
}

const MATHS_QUESTIONS: MathsPracticeQuestion[] = [
  { topic: 'Algebra', difficulty: 'foundation', prompt: 'If 3x + 5 = 20, what is x?', hint: 'Subtract 5, then divide by 3.', answer: 'x = 5' },
  { topic: 'Algebra', difficulty: 'practice', prompt: 'Factorise x² + 5x + 6.', hint: 'Find two numbers with product 6 and sum 5.', answer: '(x + 2)(x + 3)' },
  { topic: 'Geometry', difficulty: 'foundation', prompt: 'What is the area of a triangle with base 8 cm and height 5 cm?', hint: 'Use half × base × height.', answer: '20 cm²' },
  { topic: 'Probability', difficulty: 'practice', prompt: 'A fair die is rolled once. What is the probability of getting an even number?', hint: 'Count the even outcomes out of six.', answer: '1/2' },
  { topic: 'Data interpretation', difficulty: 'practice', prompt: 'A value rises from 40 to 50. What is the percentage increase?', hint: 'Compare the change with the original value.', answer: '25%' },
];

export const getMathsPracticeQuestion = (topic = 'Algebra', difficulty: MathsPracticeQuestion['difficulty'] = 'practice') =>
  MATHS_QUESTIONS.find((question) => question.topic === topic && question.difficulty === difficulty)
  || MATHS_QUESTIONS.find((question) => question.topic === topic)
  || MATHS_QUESTIONS[0];

const DEFAULT_EXAM_DATES: Record<string, string> = {
  'jee-main': '2027-01-24',
  'jee-advanced': '2027-05-23',
  'neet-ug': '2027-05-02',
  'cuet-ug': '2027-05-15',
  'clat-ug': '2026-12-06',
  'nda-na-exam': '2027-04-18',
  'ca-foundation': '2027-01-14',
  'iiser-iat': '2027-06-06',
  'uceed-design': '2027-01-17',
  'ipmat-iim': '2027-05-14',
};

export const DEFAULT_STUDY_PREFERENCES: StudyPreferences = {
  dailyMinutes: 90,
  planningMode: 'balanced',
  preferredSessionLength: '45_min',
  preferredTime: 'evening',
  studyDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  learningModes: ['practice', 'video'],
};

export const DEFAULT_MOTIVATION_PREFERENCES: MotivationPreferences = {
  motivators: ['small_wins', 'streaks'],
  distractionTriggers: ['phone', 'unclear_next_step'],
  focusSupport: 'gentle_reminders',
};

export const getExamDate = (exam: Exam): string =>
  exam.examDate || DEFAULT_EXAM_DATES[exam.id] || `${new Date().getFullYear() + 1}-05-01`;

const toSubjectName = (subject: string) => subject.replace(/\s*\([^)]*\)/g, '').replace(/\s*-\s*.*/g, '').trim();

export const getExamSubjects = (exam: Exam): ExamSubjectProgress[] =>
  exam.structuredSubjects || exam.subjects.map((subject, index) => ({
    id: `${exam.id}-subject-${index}`,
    name: toSubjectName(subject),
    progressPercent: 0,
    confidence: 'low',
    weeklyTargetHours: 2,
    isWeakArea: false,
  }));

export const getExamResources = (exam: Exam): ExamResource[] =>
  exam.curatedResources || exam.freePreparationResources.map((resource, index) => ({
    id: `${exam.id}-resource-${index}`,
    name: resource.name,
    type: index === 0 ? 'official' : 'video',
    url: resource.url,
    description: resource.description,
  }));

export const createDefaultExamGoal = (examId = 'jee-main'): ExamGoalProfile => {
  const exam = EXAMS_DATABASE.find((item) => item.id === examId) || EXAMS_DATABASE[0];
  const now = new Date().toISOString();
  return {
    examId: exam.id,
    targetDate: getExamDate(exam),
    status: 'planning',
    subjects: getExamSubjects(exam),
    resources: getExamResources(exam),
    createdAt: now,
    updatedAt: now,
  };
};

export const getDaysUntil = (targetDate: string, now = new Date()): number => {
  const target = new Date(`${targetDate}T23:59:59`);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86400000));
};

export const getCountdownLabel = (days: number): string => {
  if (days === 0) return 'Today';
  if (days === 1) return '1 day left';
  return `${days.toLocaleString()} days left`;
};

export const generateStudyPlan = (
  profile: StudentProfile,
  examGoal: ExamGoalProfile,
  preferences: StudyPreferences,
  mathsPractice: MathsPracticeProgress,
): StudyPlan => {
  const daysUntilExam = getDaysUntil(examGoal.targetDate);
  const activeDays = Math.max(1, preferences.studyDays.length);
  const modeMultiplier = preferences.planningMode === 'focused' ? 1.25 : preferences.planningMode === 'light' ? 0.7 : 1;
  const weeklyMinutes = Math.round((preferences.dailyMinutes * modeMultiplier * activeDays) / 5) * 5;
  const weakSubjects = examGoal.subjects.filter((subject) => subject.isWeakArea || subject.progressPercent < 45);
  const focusSubjects = weakSubjects.length ? weakSubjects : examGoal.subjects;
  const tasks: StudyPlanTask[] = focusSubjects.slice(0, 4).map((subject, index) => ({
    id: `plan-${examGoal.examId}-${subject.id}`,
    title: `${index === 0 ? 'Focus' : 'Build'} ${subject.name}`,
    subject: subject.name,
    minutes: Math.max(20, Math.round((preferences.dailyMinutes * modeMultiplier) / Math.max(1, focusSubjects.length))),
    reason: subject.isWeakArea || subject.progressPercent < 45
      ? 'Prioritised from your current confidence and weak-area check-in.'
      : 'Keep this strength warm with spaced practice.',
    completed: false,
  }));

  if (mathsPractice.weakAreas.length && !tasks.some((task) => task.subject.toLowerCase().includes('math'))) {
    tasks.push({
      id: `plan-${examGoal.examId}-maths`,
      title: `Practise ${mathsPractice.weakAreas[0]}`,
      subject: 'Mathematics',
      minutes: Math.min(45, preferences.dailyMinutes),
      reason: `Your maths practice data flags ${mathsPractice.weakAreas[0]} as a focus area.`,
      completed: false,
    });
  }

  if (!tasks.length) {
    tasks.push({
      id: `plan-${examGoal.examId}-starter`,
      title: 'Review the official syllabus and set a baseline quiz',
      subject: 'Planning',
      minutes: Math.min(30, preferences.dailyMinutes),
      reason: `A small first step makes the ${profile.classLevel === '12' ? 'final-year' : 'foundation'} plan easier to sustain.`,
      completed: false,
    });
  }

  return {
    generatedAt: new Date().toISOString(),
    examId: examGoal.examId,
    daysUntilExam,
    weeklyMinutes,
    tasks: tasks.slice(0, 5),
  };
};

export const getStudentsLikeYou = (
  profile: StudentProfile,
  examGoal?: ExamGoalProfile,
  mathsPractice?: MathsPracticeProgress,
): StudentLikeRecommendation[] => {
  const exam = EXAMS_DATABASE.find((item) => item.id === examGoal?.examId);
  const topInterest = Object.entries(profile.interests).sort(([, a], [, b]) => b - a)[0]?.[0] || 'curiosity';
  const weakArea = mathsPractice?.weakAreas[0] || profile.academics.weakestSubjects[0] || 'core concepts';
  const examLabel = exam?.name || 'your next exam';
  return [
    {
      id: 'like-you-practice',
      name: 'Aarav, Class 10',
      classLevel: '10',
      examLabel,
      sharedStrength: `${topInterest} learner`,
      recommendation: `Use 25-minute practice sprints and one weekly mixed quiz to build momentum for ${examLabel}.`,
      matchScore: 92,
    },
    {
      id: 'like-you-weak-area',
      name: 'Priya, Class 11',
      classLevel: '11',
      examLabel,
      sharedStrength: `${weakArea} focus`,
      recommendation: `Keep a small error log for ${weakArea}; revisit it every Sunday before adding harder questions.`,
      matchScore: 86,
    },
    {
      id: 'like-you-balance',
      name: 'Rohan, Class 9',
      classLevel: '9',
      examLabel,
      sharedStrength: 'steady routines',
      recommendation: 'Pair a short concept video with hands-on questions so preparation stays practical and motivating.',
      matchScore: 79,
    },
  ];
};
