import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile, UserRole, RecommendationResult, Booking } from '../types';
import { DEMO_PROFILES } from '../data/demoProfiles';
import { evaluateStudentProfile } from '../utils/decisionEngine';

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
  const [activeTab, setActiveTab] = useState<string>(() => storedState?.activeTab ?? 'home');
  const [guardianShieldActive, setGuardianShieldActive] = useState<boolean>(() => storedState?.guardianShieldActive ?? true);
  const [scenarioBudgetMultiplier, setScenarioBudgetMultiplier] = useState<number>(() => storedState?.scenarioBudgetMultiplier ?? 1);
  const [scenarioScoreOffset, setScenarioScoreOffset] = useState<number>(() => storedState?.scenarioScoreOffset ?? 0);

  const [bookings, setBookings] = useState<Booking[]>(() => storedState?.bookings ?? defaultBookings);

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
          bookings
        })
      );
    }
  }, [role, activeProfile, activeTab, guardianShieldActive, scenarioBudgetMultiplier, scenarioScoreOffset, bookings]);

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
      setActiveTab('dashboard');
    }
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setActiveProfile((prev) => ({
      ...prev,
      ...updates,
      academics: { ...prev.academics, ...(updates.academics || {}) },
      interests: { ...prev.interests, ...(updates.interests || {}) },
      financial: { ...prev.financial, ...(updates.financial || {}) }
    }));
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
