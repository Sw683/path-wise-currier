export type ClassLevel = '8' | '9' | '10' | '11' | '12';

export type StreamChoice = 'PCM' | 'PCB' | 'PCMB' | 'Commerce' | 'Commerce_Maths' | 'Humanities' | 'Vocational';

export type UserRole = 'student' | 'parent' | 'mentor' | 'admin';

export interface AcademicRecord {
  overallPercentage: number;
  subjectMarks: {
    mathematics: number;
    science: number;
    english: number;
    socialStudies: number;
    computer?: number;
    biology?: number;
    chemistry?: number;
    physics?: number;
    accounts?: number;
    economics?: number;
    history?: number;
  };
  strongestSubjects: string[];
  weakestSubjects: string[];
  studyHoursPerDay: number;
  learningSpeed: 'fast' | 'moderate' | 'deep_methodical';
  learningPreferences: ('theory' | 'practical' | 'mathematics' | 'memorization' | 'experimentation' | 'writing' | 'communication' | 'visual')[];
}

export interface InterestProfile {
  analytical: number;
  technical: number;
  scientific: number;
  social: number;
  creative: number;
  business: number;
  physical: number;
  leadership: number;
}

export interface FinancialProfile {
  monthlyIncomeBracket: '<25k' | '25k-50k' | '50k-1L' | '1L-2.5L' | '>2.5L' | 'prefer_not_to_say';
  coachingAffordability: 'none' | 'budget_low' | 'moderate' | 'high' | 'premium';
  relocationPossibility: 'local_only' | 'state_level' | 'pan_india_anywhere';
  earningUrgency: 'immediate_after_school' | 'early_degree_3yrs' | 'standard_4_5yrs' | 'long_term_can_wait';
  eligibleCategories: ('General' | 'OBC_NCL' | 'SC' | 'ST' | 'EWS' | 'Single_Girl_Child' | 'Defense_Ward' | 'PwD' | 'Minority')[];
  preferNotToAnswer?: boolean;
}

export interface StudentProfile {
  id: string;
  name: string;
  age: number;
  classLevel: ClassLevel;
  state: string;
  cityTier: 'Tier-1' | 'Tier-2' | 'Tier-3' | 'Rural';
  schoolType: 'CBSE' | 'ICSE' | 'State Board' | 'Navodaya / KV' | 'Private International';
  mediumOfEducation: 'English' | 'Hindi' | 'Regional';
  languagesSpoken: string[];
  deviceAccess: ('smartphone' | 'laptop' | 'desktop' | 'tablet' | 'shared_device')[];
  internetQuality: 'high_broadband' | 'mobile_4g_5g' | 'limited_unstable';
  targetCareerGoal?: string;
  academics: AcademicRecord;
  interests: InterestProfile;
  financial: FinancialProfile;
  completedAssessment: boolean;
}

export interface CareerPath {
  id: string;
  title: string;
  category: string;
  shortSummary: string;
  requiredStream: StreamChoice[];
  academicDifficulty: string;
  competitionScore: string;
  financialRequirement: string;
  studyDurationYears: string;
  entranceExamDependency: string;
  jobMarketRisk: string;
  geographicFlexibility: string;
  backupAvailability: string;
  startingSalaryRange: string;
  midCareerSalaryRange: string;
  primaryExams: string[];
  alternativeExams: string[];
  skillsRequired: string[];
  
  highProbabilityPath: {
    title: string;
    description: string;
    institutions: string[];
    prepStrategy: string;
  };
  ambitiousPath: {
    title: string;
    description: string;
    institutions: string[];
    prepStrategy: string;
  };
  backupPath: {
    title: string;
    description: string;
    institutions: string[];
    recoveryStrategy: string;
  };
  lowCostPath: {
    title: string;
    description: string;
    institutions: string[];
    freeResources: string[];
  };
  
  timelineStages: {
    stage: string;
    classRange: string;
    action: string;
    fallbackOption?: string;
  }[];
}

export interface Exam {
  id: string;
  name: string;
  fullName: string;
  category: string;
  eligibility: string;
  startPrepClass: string;
  subjects: string[];
  difficulty: string;
  approximateCompetition: string;
  examFee: string;
  officialSourceUrl: string;
  freePreparationResources: { name: string; url: string; description: string }[];
  alternativeExams: string[];
  whatIfFailed: string;
  examMonth: string;
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  eligibilitySummary: string;
  incomeLimitPerAnnum: number;
  targetCategories: string[];
  targetGenders: ('All' | 'Female' | 'Transgender')[];
  minimumPercentage: number;
  awardAmount: string;
  officialPortalUrl: string;
  applicationPeriod: string;
  applicableCourses: string[];
}

export interface SportsPath {
  id: string;
  sportName: string;
  category: string;
  tierMilestones: {
    tier: string;
    ageRange: string;
    benchmarks: string[];
    tournaments: string[];
  }[];
  governmentSchemes: string[];
  psuRecruitmentSectors: string[];
  dualCareerDegrees: string[];
  fitnessAndDietGuidelines: string[];
  backupCareerOptions: string[];
}

export interface EarlySkill {
  id: string;
  skillName: string;
  category: string;
  recommendedClass: string;
  difficulty: string;
  timeToLearnWeeks: number;
  whyLearnNow: string;
  learningResources: { name: string; type: 'Free Course' | 'YouTube' | 'Interactive Website' | 'Book'; url: string }[];
  practiceMiniProjects: { title: string; brief: string; output: string }[];
  portfolioGuidance: string;
  safeCompetitions: string[];
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  companyOrOrg: string;
  careerField: string;
  yearsOfExperience: number;
  education: string;
  location: string;
  languages: string[];
  avatarUrl: string;
  verified: boolean;
  kycStatus: 'Verified' | 'Pending' | 'Rejected';
  bio: string;
  topSkills: string[];
  pricingTiers: {
    durationMinutes: number;
    priceINR: number;
    isEwsFree: boolean;
  }[];
  rating: number;
  reviewsCount: number;
  availableSlots: string[];
  guardianConsentRequired: boolean;
}

export interface Booking {
  id: string;
  mentorId: string;
  mentorName: string;
  studentId: string;
  studentName: string;
  selectedSlot: string;
  priceINR: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  guardianConsentGiven: boolean;
  guardianEmail?: string;
  preCallQuestions: string[];
  postCallActionPlan?: string[];
  meetingLink: string;
}

export interface AttributedInsight {
  id: string;
  careerId: string;
  topic: string;
  quoteOrInsight: string;
  sourceType: string;
  sourceName: string;
  sourceUrl: string;
  publicationYear: number;
  isAnecdotal: boolean;
  verificationStatus: string;
}

export interface RecommendationResult {
  careerId: string;
  careerTitle: string;
  compatibilityScore: number;
  streamRecommendation: StreamChoice;
  whyThisRecommendation: string[];
  strengthsAlignment: string[];
  cautionsAndConsiderations: string[];
  fourTierSummary: {
    highProbability: string;
    ambitious: string;
    backup: string;
    lowCost: string;
  };
  next30DaysChecklist: { id: string; text: string; completed: boolean }[];
  next6MonthsMilestones: string[];
}
