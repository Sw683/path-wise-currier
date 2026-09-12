import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CommunityPost,
  StudentSkillProfile,
  ProjectShowcase,
  PlacementJourney,
  StudentPitch,
  BehavioralThinkingProfile,
  CompanyFitPrediction,
  StudentVerificationRecord,
  ReactionType,
  CollegeStory,
  FullOnboardingProfile,
  Layer2Project,
  Layer2Experience,
} from '../types/campus';
import {
  INITIAL_POSTS,
  SKILLED_STUDENTS,
  PROJECT_SHOWCASES,
  PLACEMENT_JOURNEYS,
  STUDENT_PITCHES,
  DEFAULT_BEHAVIORAL_PROFILE,
  DEFAULT_COMPANY_FIT_PREDICTIONS,
  DEFAULT_VERIFICATION_RECORD,
  COLLEGE_STORIES,
  COLLEGES,
  DEFAULT_ONBOARDING_PROFILE,
} from '../data/campusData';

const CAMPUS_STORAGE_KEY = 'unisphere-campus-state-v2';

export interface AcademicQuestion {
  id: string;
  category: 'DSA & Algorithms' | 'System Architecture & OS' | 'Database & Transactions' | 'Probability & Quant' | 'Aptitude & Logic';
  question: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

export interface AcademicEvaluation {
  totalAttempted: number;
  totalCorrect: number;
  percentageScore: number;
  evaluatedAcademicLevel: 'Top-Tier Algorithmic Standing (Tier 1 FAANG Ready)' | 'Strong Engineering Fundamentals (High-Growth Unicorn Fit)' | 'Intermediate Developer (Developing Core Depth)' | 'Foundational Learner';
  strengths: string[];
  weaknesses: string[];
  recommendedFocus: string[];
  completedAt?: string;
}

export interface CampusContextType {
  // Posts
  posts: CommunityPost[];
  addPost: (post: Omit<CommunityPost, 'id' | 'timestamp' | 'reactions' | 'comments' | 'sharesCount'>) => void;
  reactToPost: (postId: string, reaction: ReactionType) => void;
  votePoll: (postId: string, optionId: string) => void;
  addComment: (postId: string, content: string) => void;
  toggleBookmark: (postId: string) => void;
  sharePost: (postId: string) => void;

  // Students & Squads
  students: StudentSkillProfile[];
  projects: ProjectShowcase[];
  addProject: (project: Omit<ProjectShowcase, 'id' | 'starsCount'>) => void;
  toggleStarProject: (projectId: string) => void;

  // Placements
  journeys: PlacementJourney[];
  addJourney: (journey: Omit<PlacementJourney, 'id' | 'upvotes'>) => void;
  upvoteJourney: (journeyId: string) => void;

  // Fellowships & Pitches
  pitches: StudentPitch[];
  addPitch: (pitch: Omit<StudentPitch, 'id' | 'fundsRaisedINR' | 'backersCount' | 'upvotes' | 'grantStatus'>) => void;
  pledgeFunding: (pitchId: string, amountINR: number, backerNote?: string) => void;
  upvotePitch: (pitchId: string) => void;

  // Behavioral & AI Profiler
  behavioralProfile: BehavioralThinkingProfile;
  updateBehavioralProfile: (updates: Partial<BehavioralThinkingProfile>) => void;

  // Academic Assessment & Fit
  academicEvaluation: AcademicEvaluation;
  submitAcademicQuiz: (answers: { [questionId: string]: string }) => void;
  companyFits: CompanyFitPrediction[];

  // Verification & Standing
  verification: StudentVerificationRecord;
  updateVerification: (updates: Partial<StudentVerificationRecord>) => void;

  // Connected College Groups (Instagram style)
  joinedCollegeGroupIds: string[];
  toggleJoinCollegeGroup: (collegeId: string) => void;
  selectedCollegeGroup: string;
  setSelectedCollegeGroup: (collegeId: string) => void;

  // Student Onboarding & Profile Graph
  onboardingProfile: FullOnboardingProfile;
  saveOnboardingProfile: (profile: FullOnboardingProfile) => void;
  updateLayer2Profile: (projects: Layer2Project[], experiences: Layer2Experience[]) => void;
  resetOnboardingProfile: () => void;
}

export const ACADEMIC_QUESTIONS: AcademicQuestion[] = [
  {
    id: 'q-1',
    category: 'DSA & Algorithms',
    question: 'What is the time complexity of finding the shortest path in a weighted graph with non-negative edges using Dijkstra with a Fibonacci Heap?',
    options: [
      { id: 'a', text: 'O(V^2)', isCorrect: false },
      { id: 'b', text: 'O(E + V log V)', isCorrect: true },
      { id: 'c', text: 'O(E log V)', isCorrect: false },
      { id: 'd', text: 'O(V * E)', isCorrect: false },
    ],
    explanation: 'Using a Fibonacci heap, decrease-key operations take amortized O(1), bringing Dijkstra complexity to O(E + V log V).',
  },
  {
    id: 'q-2',
    category: 'System Architecture & OS',
    question: 'In a high-throughput distributed cache, why is Consistent Hashing with virtual nodes preferred over standard modulo hashing (hash(key) % N)?',
    options: [
      { id: 'a', text: 'It encrypts cached data with AES-256', isCorrect: false },
      { id: 'b', text: 'It minimizes key migrations when nodes join or fail, while evenly distributing load', isCorrect: true },
      { id: 'c', text: 'It forces data to always reside in L1 CPU cache', isCorrect: false },
      { id: 'd', text: 'It eliminates the need for any network serialization', isCorrect: false },
    ],
    explanation: 'With standard modulo hashing, changing N requires rehashing nearly all keys. Consistent hashing migrates only K/N keys and virtual nodes prevent hotspots.',
  },
  {
    id: 'q-3',
    category: 'Database & Transactions',
    question: 'Under ANSI SQL isolation levels, which isolation level prevents Dirty Reads and Non-Repeatable Reads, but may still allow Phantom Reads in some engines?',
    options: [
      { id: 'a', text: 'Read Uncommitted', isCorrect: false },
      { id: 'b', text: 'Read Committed', isCorrect: false },
      { id: 'c', text: 'Repeatable Read', isCorrect: true },
      { id: 'd', text: 'Serializable', isCorrect: false },
    ],
    explanation: 'Repeatable Read guarantees rows read cannot change during the transaction, preventing dirty and non-repeatable reads, but can allow new rows to appear (phantom reads).',
  },
  {
    id: 'q-4',
    category: 'Probability & Quant',
    question: 'You roll two fair 6-sided dice. Given that at least one die shows a 6, what is the probability that the sum is 10 or greater?',
    options: [
      { id: 'a', text: '5 / 11', isCorrect: true },
      { id: 'b', text: '3 / 11', isCorrect: false },
      { id: 'c', text: '7 / 36', isCorrect: false },
      { id: 'd', text: '1 / 2', isCorrect: false },
    ],
    explanation: 'There are 11 outcomes with at least one 6. Of those, the ones with sum >= 10 are (4,6), (5,6), (6,4), (6,5), (6,6) — exactly 5 outcomes. Probability = 5/11.',
  },
  {
    id: 'q-5',
    category: 'Aptitude & Logic',
    question: 'A distributed master-worker system handles 10,000 tasks/min. Each worker processes 25 tasks/sec. How many active workers are required to sustain the load with a 20% safety headroom?',
    options: [
      { id: 'a', text: '4 workers', isCorrect: false },
      { id: 'b', text: '7 workers', isCorrect: false },
      { id: 'c', text: '8 workers', isCorrect: true },
      { id: 'd', text: '12 workers', isCorrect: false },
    ],
    explanation: '10,000 tasks/min = 166.67 tasks/sec. Base workers = 166.67 / 25 = 6.67 workers. Adding 20% headroom = 6.67 * 1.2 = 8.0 workers.',
  },
];

const DEFAULT_ACADEMIC_EVALUATION: AcademicEvaluation = {
  totalAttempted: 5,
  totalCorrect: 4,
  percentageScore: 80,
  evaluatedAcademicLevel: 'Top-Tier Algorithmic Standing (Tier 1 FAANG Ready)',
  strengths: ['DSA & Asymptotic Complexity', 'Distributed Systems & Caching', 'Quant & Probability'],
  weaknesses: ['Database Locking & Isolation Edge Cases'],
  recommendedFocus: ['Review MVCC (Multi-Version Concurrency Control) and Gap Locks in MySQL/InnoDB', 'Timed LeetCode Hard dynamic programming sets'],
  completedAt: 'Recent Evaluation',
};

const CampusContext = createContext<CampusContextType | undefined>(undefined);

export const CampusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getStoredCampusState = () => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = window.localStorage.getItem(CAMPUS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const stored = getStoredCampusState();

  const [posts, setPosts] = useState<CommunityPost[]>(() => stored?.posts ?? INITIAL_POSTS);
  const [students] = useState<StudentSkillProfile[]>(() => stored?.students ?? SKILLED_STUDENTS);
  const [projects, setProjects] = useState<ProjectShowcase[]>(() => stored?.projects ?? PROJECT_SHOWCASES);
  const [journeys, setJourneys] = useState<PlacementJourney[]>(() => stored?.journeys ?? PLACEMENT_JOURNEYS);
  const [pitches, setPitches] = useState<StudentPitch[]>(() => stored?.pitches ?? STUDENT_PITCHES);
  const [behavioralProfile, setBehavioralProfile] = useState<BehavioralThinkingProfile>(
    () => stored?.behavioralProfile ?? DEFAULT_BEHAVIORAL_PROFILE
  );
  const [academicEvaluation, setAcademicEvaluation] = useState<AcademicEvaluation>(
    () => stored?.academicEvaluation ?? DEFAULT_ACADEMIC_EVALUATION
  );
  const [companyFits, setCompanyFits] = useState<CompanyFitPrediction[]>(
    () => stored?.companyFits ?? DEFAULT_COMPANY_FIT_PREDICTIONS
  );
  const [verification, setVerification] = useState<StudentVerificationRecord>(
    () => stored?.verification ?? DEFAULT_VERIFICATION_RECORD
  );
  const [joinedCollegeGroupIds, setJoinedCollegeGroupIds] = useState<string[]>(
    () => stored?.joinedCollegeGroupIds ?? ['iit-bombay', 'bits-pilani']
  );
  const [selectedCollegeGroup, setSelectedCollegeGroup] = useState<string>(
    () => stored?.selectedCollegeGroup ?? 'iit-bombay'
  );
  const [onboardingProfile, setOnboardingProfile] = useState<FullOnboardingProfile>(
    () => stored?.onboardingProfile ?? DEFAULT_ONBOARDING_PROFILE
  );

  // Auto-persist to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(
        CAMPUS_STORAGE_KEY,
        JSON.stringify({
          posts,
          projects,
          journeys,
          pitches,
          behavioralProfile,
          academicEvaluation,
          companyFits,
          verification,
          joinedCollegeGroupIds,
          selectedCollegeGroup,
          onboardingProfile,
        })
      );
    } catch (e) {
      console.error('Failed saving campus state:', e);
    }
  }, [
    posts,
    projects,
    journeys,
    pitches,
    behavioralProfile,
    academicEvaluation,
    companyFits,
    verification,
    joinedCollegeGroupIds,
    selectedCollegeGroup,
    onboardingProfile,
  ]);

  // Post Actions
  const addPost = (postData: Omit<CommunityPost, 'id' | 'timestamp' | 'reactions' | 'comments' | 'sharesCount'>) => {
    const newPost: CommunityPost = {
      ...postData,
      id: `post-${Date.now()}`,
      timestamp: 'Just now',
      reactions: { like: 1, celebrate: 0, insightful: 0, love: 0, curious: 0 },
      userReaction: 'like',
      comments: [],
      sharesCount: 0,
      isBookmarked: false,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const reactToPost = (postId: string, reaction: ReactionType) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const currentReaction = p.userReaction;
        const newReactions = { ...p.reactions };

        if (currentReaction === reaction) {
          newReactions[reaction] = Math.max(0, newReactions[reaction] - 1);
          return { ...p, reactions: newReactions, userReaction: undefined };
        } else {
          if (currentReaction) {
            newReactions[currentReaction] = Math.max(0, newReactions[currentReaction] - 1);
          }
          newReactions[reaction] = (newReactions[reaction] || 0) + 1;
          return { ...p, reactions: newReactions, userReaction: reaction };
        }
      })
    );
  };

  const votePoll = (postId: string, optionId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId || !p.poll || p.poll.userVotedOptionId) return p;
        const updatedOptions = p.poll.options.map((opt) =>
          opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        );
        return {
          ...p,
          poll: {
            ...p.poll,
            options: updatedOptions,
            totalVotes: p.poll.totalVotes + 1,
            userVotedOptionId: optionId,
          },
        };
      })
    );
  };

  const addComment = (postId: string, content: string) => {
    if (!content.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      authorName: 'Aryan Sharma (You)',
      authorCollege: verification.collegeName,
      authorBranch: verification.degreeName,
      authorYear: 'Class of 2026',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      isVerified: verification.isVerified,
      content: content.trim(),
      timestamp: 'Just now',
      likes: 0,
    };
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p))
    );
  };

  const toggleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isBookmarked: !p.isBookmarked } : p))
    );
  };

  const sharePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, sharesCount: p.sharesCount + 1 } : p))
    );
  };

  // Projects
  const addProject = (projectData: Omit<ProjectShowcase, 'id' | 'starsCount'>) => {
    const newProj: ProjectShowcase = {
      ...projectData,
      id: `proj-${Date.now()}`,
      starsCount: 1,
      userStarred: true,
    };
    setProjects((prev) => [newProj, ...prev]);
  };

  const toggleStarProject = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const starred = !p.userStarred;
        return {
          ...p,
          userStarred: starred,
          starsCount: starred ? p.starsCount + 1 : p.starsCount - 1,
        };
      })
    );
  };

  // Placement Journeys
  const addJourney = (journeyData: Omit<PlacementJourney, 'id' | 'upvotes'>) => {
    const newJ: PlacementJourney = {
      ...journeyData,
      id: `journey-${Date.now()}`,
      upvotes: 1,
      userUpvoted: true,
    };
    setJourneys((prev) => [newJ, ...prev]);
  };

  const upvoteJourney = (journeyId: string) => {
    setJourneys((prev) =>
      prev.map((j) => {
        if (j.id !== journeyId) return j;
        const upvoted = !j.userUpvoted;
        return {
          ...j,
          userUpvoted: upvoted,
          upvotes: upvoted ? j.upvotes + 1 : j.upvotes - 1,
        };
      })
    );
  };

  // Fellowships
  const addPitch = (pitchData: Omit<StudentPitch, 'id' | 'fundsRaisedINR' | 'backersCount' | 'upvotes' | 'grantStatus'>) => {
    const newP: StudentPitch = {
      ...pitchData,
      id: `pitch-${Date.now()}`,
      fundsRaisedINR: 10000,
      backersCount: 1,
      upvotes: 1,
      userUpvoted: true,
      grantStatus: 'Seeking Backers',
    };
    setPitches((prev) => [newP, ...prev]);
  };

  const pledgeFunding = (pitchId: string, amountINR: number, backerNote?: string) => {
    setPitches((prev) =>
      prev.map((p) => {
        if (p.id !== pitchId) return p;
        const newRaised = p.fundsRaisedINR + amountINR;
        const newStatus = newRaised >= p.targetBudgetINR ? 'Grant Approved' : 'Partially Funded';
        return {
          ...p,
          fundsRaisedINR: newRaised,
          backersCount: p.backersCount + 1,
          grantStatus: newStatus,
        };
      })
    );
  };

  const upvotePitch = (pitchId: string) => {
    setPitches((prev) =>
      prev.map((p) => {
        if (p.id !== pitchId) return p;
        const upvoted = !p.userUpvoted;
        return {
          ...p,
          userUpvoted: upvoted,
          upvotes: upvoted ? p.upvotes + 1 : p.upvotes - 1,
        };
      })
    );
  };

  // Behavioral Profiler
  const updateBehavioralProfile = (updates: Partial<BehavioralThinkingProfile>) => {
    setBehavioralProfile((prev) => ({ ...prev, ...updates }));
  };

  // Academic Assessment Quiz & Company Fit Dynamic Predictor
  const submitAcademicQuiz = (answers: { [questionId: string]: string }) => {
    let correctCount = 0;
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    ACADEMIC_QUESTIONS.forEach((q) => {
      const selected = answers[q.id];
      const correctOption = q.options.find((o) => o.isCorrect);
      if (selected && selected === correctOption?.id) {
        correctCount += 1;
        strengths.push(q.category);
      } else {
        weaknesses.push(q.category);
      }
    });

    const scorePct = Math.round((correctCount / ACADEMIC_QUESTIONS.length) * 100);

    let evaluatedLevel: AcademicEvaluation['evaluatedAcademicLevel'] = 'Intermediate Developer (Developing Core Depth)';
    if (scorePct >= 80) {
      evaluatedLevel = 'Top-Tier Algorithmic Standing (Tier 1 FAANG Ready)';
    } else if (scorePct >= 60) {
      evaluatedLevel = 'Strong Engineering Fundamentals (High-Growth Unicorn Fit)';
    } else if (scorePct < 40) {
      evaluatedLevel = 'Foundational Learner';
    }

    const evaluation: AcademicEvaluation = {
      totalAttempted: Object.keys(answers).length,
      totalCorrect: correctCount,
      percentageScore: scorePct,
      evaluatedAcademicLevel: evaluatedLevel,
      strengths: strengths.length > 0 ? strengths : ['General Aptitude'],
      weaknesses: weaknesses.length > 0 ? weaknesses : ['None identified'],
      recommendedFocus:
        scorePct >= 80
          ? ['Maintain timed LeetCode Hard mock interviews', 'Review LLD System Design patterns']
          : ['Strengthen core CS fundamentals (OS, DBMS, Networks)', 'Complete 150 essential DSA problems'],
      completedAt: 'Just now (AI Graded)',
    };

    setAcademicEvaluation(evaluation);

    // Dynamically adjust company fits based on actual academic quiz score!
    setCompanyFits((prev) =>
      prev.map((fit) => {
        if (fit.companyTier.includes('Tier-1')) {
          const match = Math.min(98, Math.max(45, scorePct + 6));
          return {
            ...fit,
            matchPercentage: match,
            readinessLevel: match >= 80 ? 'Ready for Interview' : match >= 60 ? 'High Potential (1-2 months polish)' : 'Foundational Gap to Bridge',
          };
        }
        if (fit.companyTier.includes('Unicorn')) {
          const match = Math.min(99, Math.max(55, scorePct + 12));
          return {
            ...fit,
            matchPercentage: match,
            readinessLevel: match >= 75 ? 'Ready for Interview' : 'High Potential (1-2 months polish)',
          };
        }
        if (fit.companyTier.includes('FinTech')) {
          const match = Math.min(96, Math.max(40, scorePct - 4));
          return {
            ...fit,
            matchPercentage: match,
            readinessLevel: match >= 85 ? 'Ready for Interview' : 'High Potential (1-2 months polish)',
          };
        }
        return fit;
      })
    );

    // Update standing percentile based on academic performance!
    const newCollegePercentile = Math.min(99, Math.max(70, scorePct + 15));
    const newNationwidePercentile = Math.min(98, Math.max(65, scorePct + 10));

    setVerification((prev) => ({
      ...prev,
      collegeStandingPercentile: newCollegePercentile,
      nationwideStandingPercentile: newNationwidePercentile,
    }));
  };

  // Verification
  const updateVerification = (updates: Partial<StudentVerificationRecord>) => {
    setVerification((prev) => ({ ...prev, ...updates }));
  };

  // Connected College Groups
  const toggleJoinCollegeGroup = (collegeId: string) => {
    setJoinedCollegeGroupIds((prev) =>
      prev.includes(collegeId) ? prev.filter((id) => id !== collegeId) : [...prev, collegeId]
    );
  };

  // Student Onboarding & Profile Graph Handlers
  const saveOnboardingProfile = (profile: FullOnboardingProfile) => {
    setOnboardingProfile(profile);
    if (profile.universityName) {
      setVerification((prev) => ({
        ...prev,
        collegeName: profile.universityName,
        degreeName: profile.courseOrBranch || profile.department || prev.degreeName,
      }));
    }
  };

  const updateLayer2Profile = (projects: Layer2Project[], experiences: Layer2Experience[]) => {
    setOnboardingProfile((prev) => {
      const bonusScore = Math.min(100, Math.max(70, 70 + (projects.length * 8) + (experiences.length * 7)));
      return {
        ...prev,
        projects,
        experiences,
        profileStrengthPercent: bonusScore,
      };
    });
  };

  const resetOnboardingProfile = () => {
    setOnboardingProfile(DEFAULT_ONBOARDING_PROFILE);
  };

  return (
    <CampusContext.Provider
      value={{
        posts,
        addPost,
        reactToPost,
        votePoll,
        addComment,
        toggleBookmark,
        sharePost,
        students,
        projects,
        addProject,
        toggleStarProject,
        journeys,
        addJourney,
        upvoteJourney,
        pitches,
        addPitch,
        pledgeFunding,
        upvotePitch,
        behavioralProfile,
        updateBehavioralProfile,
        academicEvaluation,
        submitAcademicQuiz,
        companyFits,
        verification,
        updateVerification,
        joinedCollegeGroupIds,
        toggleJoinCollegeGroup,
        selectedCollegeGroup,
        setSelectedCollegeGroup,
        onboardingProfile,
        saveOnboardingProfile,
        updateLayer2Profile,
        resetOnboardingProfile,
      }}
    >
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};
