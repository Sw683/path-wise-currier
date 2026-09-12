import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  UserRole,
  RecommendationResult,
  Booking,
  OnboardingAnswers,
  ExamGoalProfile,
  MathsPracticeProgress,
  MotivationPreferences,
  StudyPlan,
  StudyPreferences,
} from '../types';
import { DEMO_PROFILES } from '../data/demoProfiles';
import { evaluateStudentProfile } from '../utils/decisionEngine';
import { DEFAULT_MOTIVATION_PREFERENCES, DEFAULT_STUDY_PREFERENCES, generateStudyPlan } from '../utils/studyPlan';

const STORAGE_KEY = 'pathwise-india-state-v1';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeProfile: StudentProfile;
  setActiveProfile: (profile: StudentProfile) => void;
  recommendations: RecommendationResult[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loadDemoProfile: (profileId: string) => void;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  examGoalProfile?: ExamGoalProfile;
  setExamGoalProfile: (goal?: ExamGoalProfile) => void;
  studyPreferences: StudyPreferences;
  setStudyPreferences: (preferences: StudyPreferences) => void;
  mathsPractice: MathsPracticeProgress;
  setMathsPractice: (progress: MathsPracticeProgress) => void;
  motivationPreferences: MotivationPreferences;
  setMotivationPreferences: (preferences: MotivationPreferences) => void;
  studyPlan?: StudyPlan;
  generatePlan: () => void;
  onboardingAnswers: OnboardingAnswers;
  setOnboardingAnswers: (answers: OnboardingAnswers) => void;
  bookings: Booking[];
  createBooking: (booking: Omit<Booking, 'id' | 'meetingLink'> & { id?: string }) => void;
  guardianShieldActive: boolean;
  setGuardianShieldActive: (active: boolean) => void;
  scenarioBudgetMultiplier: number;
  setScenarioBudgetMultiplier: (val: number) => void;
  scenarioScoreOffset: number;
  setScenarioScoreOffset: (val: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getStoredState = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storedState = getStoredState();
  const defaultBookings: Booking[] = [
    {
      id: 'book-101',
      mentorId: 'mentor-arjun-software',
      mentorName: 'Arjun Sundaram',
      studentId: 'demo-aarav-class10',
      studentName: 'Aarav Sharma',
      selectedSlot: 'Saturday, 11:00 AM IST',
      priceINR: 199,
      status: 'Confirmed',
      guardianConsentGiven: true,
      guardianEmail: 'parent.sharma@example.com',
      preCallQuestions: [
        'What should a Class 10 student start learning before Class 12?',
        'How did you overcome coming from a tier-2 city?',
        'Is expensive coaching strictly required for cracking tech roles?'
      ],
      postCallActionPlan: [
        'Complete CS50 Python modules 1-4 by next month',
        'Solve 2 arithmetic problems on Project Euler daily',
        'Create a GitHub account and push school science code'
      ],
      meetingLink: 'https://meet.pathwiseindia.org/safe-room-aarav-arjun'
    }
  ];

  const [role, setRole] = useState<UserRole>(() => storedState?.role ?? 'student');
  const [activeProfile, setActiveProfile] = useState<StudentProfile>(() => storedState?.activeProfile ?? DEMO_PROFILES[0]);
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [activeTab, setActiveTab] = useState<string>(() => storedState?.activeTab ?? 'campus-feed');
  const [guardianShieldActive, setGuardianShieldActive] = useState<boolean>(() => storedState?.guardianShieldActive ?? true);
  const [scenarioBudgetMultiplier, setScenarioBudgetMultiplier] = useState<number>(() => storedState?.scenarioBudgetMultiplier ?? 1);
  const [scenarioScoreOffset, setScenarioScoreOffset] = useState<number>(() => storedState?.scenarioScoreOffset ?? 0);

  const [bookings, setBookings] = useState<Booking[]>(() => storedState?.bookings ?? defaultBookings);
  const [onboardingAnswers, setOnboardingAnswers] = useState<OnboardingAnswers>(() => storedState?.onboardingAnswers ?? {
    interests: [],
    goals: []
  });
  const [examGoalProfile, setExamGoalProfileState] = useState<ExamGoalProfile | undefined>(() => (
    storedState?.examGoalProfile ?? storedState?.activeProfile?.examGoal
  ));
  const [studyPreferences, setStudyPreferencesState] = useState<StudyPreferences>(() => (
    storedState?.studyPreferences ?? storedState?.activeProfile?.studyPreferences ?? DEFAULT_STUDY_PREFERENCES
  ));
  const [mathsPractice, setMathsPracticeState] = useState<MathsPracticeProgress>(() => (
    storedState?.mathsPractice ?? storedState?.activeProfile?.mathsPractice ?? {
      questionsAttempted: 0,
      questionsCorrect: 0,
      weeklyGoal: 30,
      weakAreas: [],
      difficulty: 'practice',
    }
  ));
  const [motivationPreferences, setMotivationPreferencesState] = useState<MotivationPreferences>(() => (
    storedState?.motivationPreferences ?? storedState?.activeProfile?.motivationPreferences ?? DEFAULT_MOTIVATION_PREFERENCES
  ));
  const [studyPlan, setStudyPlan] = useState<StudyPlan | undefined>(() => storedState?.studyPlan);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          role,
          activeProfile,
          activeTab,
          guardianShieldActive,
          scenarioBudgetMultiplier,
          scenarioScoreOffset,
          bookings,
          onboardingAnswers,
          examGoalProfile,
          studyPreferences,
          mathsPractice,
          motivationPreferences,
          studyPlan
        })
      );
    }
  }, [role, activeProfile, activeTab, guardianShieldActive, scenarioBudgetMultiplier, scenarioScoreOffset, bookings, onboardingAnswers, examGoalProfile, studyPreferences, mathsPractice, motivationPreferences, studyPlan]);

  // Recalculate recommendations whenever profile or scenario changes
  useEffect(() => {
    if (activeProfile) {
      const recs = evaluateStudentProfile(activeProfile);
      setRecommendations(recs);
    }
  }, [activeProfile, scenarioBudgetMultiplier, scenarioScoreOffset]);

  const loadDemoProfile = (profileId: string) => {
    const found = DEMO_PROFILES.find((p) => p.id === profileId);
    if (found) {
      setActiveProfile(found);
      setExamGoalProfileState(found.examGoal);
      setStudyPreferencesState(found.studyPreferences ?? DEFAULT_STUDY_PREFERENCES);
      setMathsPracticeState(found.mathsPractice ?? { questionsAttempted: 0, questionsCorrect: 0, weeklyGoal: 30, weakAreas: [] });
      setMotivationPreferencesState(found.motivationPreferences ?? DEFAULT_MOTIVATION_PREFERENCES);
      setStudyPlan(undefined);
      setActiveTab('dashboard');
    }
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setActiveProfile((prev) => ({
      ...prev,
      ...updates,
      academics: { ...prev.academics, ...(updates.academics || {}) },
      interests: { ...prev.interests, ...(updates.interests || {}) },
      financial: { ...prev.financial, ...(updates.financial || {}) },
      examGoal: updates.examGoal ?? prev.examGoal,
      studyPreferences: updates.studyPreferences ?? prev.studyPreferences,
      mathsPractice: updates.mathsPractice ?? prev.mathsPractice,
      motivationPreferences: updates.motivationPreferences ?? prev.motivationPreferences,
    }));
  };

  const setExamGoalProfile = (goal?: ExamGoalProfile) => {
    setExamGoalProfileState(goal);
    if (goal) {
      updateProfile({ examGoal: goal });
    } else {
      setActiveProfile((prev) => {
        const next = { ...prev };
        delete next.examGoal;
        return next;
      });
    }
  };

  const setStudyPreferences = (preferences: StudyPreferences) => {
    setStudyPreferencesState(preferences);
    updateProfile({ studyPreferences: preferences });
  };

  const setMathsPractice = (progress: MathsPracticeProgress) => {
    setMathsPracticeState(progress);
    updateProfile({ mathsPractice: progress });
  };

  const setMotivationPreferences = (preferences: MotivationPreferences) => {
    setMotivationPreferencesState(preferences);
    updateProfile({ motivationPreferences: preferences });
  };

  const generatePlan = () => {
    if (examGoalProfile) {
      setStudyPlan(generateStudyPlan(activeProfile, examGoalProfile, studyPreferences, mathsPractice));
    }
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'meetingLink'> & { id?: string }) => {
    const newBooking: Booking = {
      ...bookingData,
      id: bookingData.id ?? `book-${Date.now()}`,
      meetingLink: `https://meet.pathwiseindia.org/safe-room-${Date.now()}`
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeProfile,
        setActiveProfile,
        recommendations,
        activeTab,
        setActiveTab,
        loadDemoProfile,
        updateProfile,
        examGoalProfile,
        setExamGoalProfile,
        studyPreferences,
        setStudyPreferences,
        mathsPractice,
        setMathsPractice,
        motivationPreferences,
        setMotivationPreferences,
        studyPlan,
        generatePlan,
        onboardingAnswers,
        setOnboardingAnswers,
        bookings,
        createBooking,
        guardianShieldActive,
        setGuardianShieldActive,
        scenarioBudgetMultiplier,
        setScenarioBudgetMultiplier,
        scenarioScoreOffset,
        setScenarioScoreOffset
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
