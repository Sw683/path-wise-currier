export type CollegeTier = 'Tier-1' | 'Tier-2' | 'Tier-3' | 'Premier Autonomous';

export interface College {
  id: string;
  name: string;
  shortName: string;
  location: string;
  state: string;
  logo: string;
  coverImage: string;
  tier: CollegeTier;
  nirfRank?: number;
  totalStudents: number;
  branches: string[];
}

export type ReactionType = 'like' | 'celebrate' | 'insightful' | 'love' | 'curious';

export interface PostReactionCounts {
  like: number;
  celebrate: number;
  insightful: number;
  love: number;
  curious: number;
}

export interface Comment {
  id: string;
  authorName: string;
  authorCollege: string;
  authorBranch: string;
  authorYear: string;
  authorAvatar: string;
  isVerified: boolean;
  content: string;
  timestamp: string;
  likes: number;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorCollegeId: string;
  authorCollegeName: string;
  authorBranch: string;
  authorYear: string; // e.g. '3rd Year / Class of 2026'
  authorAvatar: string;
  authorStanding?: string; // e.g. 'Top 5% in CSE'
  isVerified: boolean;
  isPlaced?: boolean;
  placedCompany?: string;
  timestamp: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  videoUrl?: string;
  videoTitle?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  poll?: {
    question: string;
    options: PollOption[];
    totalVotes: number;
    userVotedOptionId?: string;
  };
  reactions: PostReactionCounts;
  userReaction?: ReactionType;
  comments: Comment[];
  sharesCount: number;
  isBookmarked?: boolean;
  scope: 'all_colleges' | 'my_college_only' | 'my_branch_only' | 'my_class_only';
}

export interface CollegeStory {
  id: string;
  collegeId: string;
  collegeName: string;
  title: string;
  category: 'Hackathon Win' | 'Campus Fest' | 'Research Paper' | 'Placement News' | 'Club Spotlight';
  imageUrl: string;
  authorName: string;
  avatarUrl: string;
  timestamp: string;
  highlightText: string;
}

export interface StudentSkillProfile {
  id: string;
  name: string;
  collegeName: string;
  branch: string;
  graduationYear: number;
  avatar: string;
  isVerified: boolean;
  roleTitle: string; // e.g., 'Full-Stack Developer & AI Enthusiast'
  bio: string;
  topSkills: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  availabilityHoursPerWeek: number;
  seeking: string; // e.g., 'Smart India Hackathon squad / Web3 project'
  reputationScore: number; // e.g. 94/100
}

export interface ProjectShowcase {
  id: string;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  demoVideoUrl?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  techStack: string[];
  creatorName: string;
  creatorCollege: string;
  creatorAvatar: string;
  openRoles: {
    roleName: string;
    requiredSkills: string[];
    status: 'open' | 'filled';
  }[];
  starsCount: number;
  userStarred?: boolean;
  targetHackathon?: string;
}

export interface InterviewRoundDetail {
  roundNumber: number;
  roundName: string;
  duration: string;
  focusAreas: string[];
  experienceSummary: string;
  sampleQuestions: string[];
  proTips: string[];
}

export interface PlacementJourney {
  id: string;
  studentName: string;
  collegeName: string;
  branch: string;
  batchYear: string;
  avatar: string;
  companyName: string;
  companyLogo: string;
  roleOffered: string;
  ctcINR: string;
  packageBreakdown: {
    baseINR: string;
    stocksINR: string;
    joiningBonusINR: string;
  };
  offerType: 'On-Campus' | 'Off-Campus' | 'PPO via Internship' | 'Referral';
  preparationDurationMonths: number;
  preparationRoadmap: string[];
  rounds: InterviewRoundDetail[];
  keyAdvice: string;
  upvotes: number;
  userUpvoted?: boolean;
  openForQuestions: boolean;
}

export interface UniversityPlacementStats {
  collegeId: string;
  collegeName: string;
  location: string;
  tier: CollegeTier;
  nirfEngineeringRank: number;
  overallPlacementRate: number;
  averageCtcLPA: number;
  medianCtcLPA: number;
  highestCtcLPA: number;
  annualTuitionINR: number;
  roiRatio: number;
  topRecruiters: { name: string; hiresCount: number }[];
  branchBreakdown: {
    branchName: string;
    averageCtcLPA: number;
    medianCtcLPA: number;
    highestCtcLPA: number;
    placementRate: number;
  }[];
  alumniRating: number;
  placementSatisfaction: number;
}

export interface StudentPitch {
  id: string;
  title: string;
  tagline: string;
  category: 'AI & Machine Learning' | 'FinTech' | 'CleanTech & Climate' | 'EdTech' | 'HealthTech' | 'Hardware/IoT';
  founderName: string;
  founderCollege: string;
  founderBranch: string;
  founderYear: string;
  founderAvatar: string;
  teamSize: number;
  targetBudgetINR: number;
  fundsRaisedINR: number;
  backersCount: number;
  problemStatement: string;
  solutionSummary: string;
  demoVideoUrl?: string;
  pitchDeckUrl?: string;
  milestones: {
    title: string;
    budgetINR: number;
    status: 'completed' | 'in_progress' | 'upcoming';
  }[];
  grantStatus: 'Seeking Backers' | 'Partially Funded' | 'Grant Approved';
  upvotes: number;
  userUpvoted?: boolean;
}

export interface FellowshipProvider {
  id: string;
  name: string;
  organization: string;
  type: 'Alumni Innovation Grant' | 'Venture Fellowship' | 'Research Lab Grant' | 'DeepTech Micro-fund';
  grantSizeINR: string;
  targetCategories: string[];
  description: string;
  perks: string[];
  applicationDeadline: string;
  acceptanceRate: string;
  logo: string;
}

export interface BehavioralThinkingProfile {
  natureType: 'The Deep Architect' | 'The Blitz Hacker' | 'The Community Catalyst' | 'The Research Vanguard';
  natureDescription: string;
  thinkingStyle: 'First-Principles Reasoning' | 'System Architecture' | 'Visual-Spatial Intuition' | 'Data-Driven Empirical';
  thinkingDescription: string;
  lifestylePreference: 'High-Impact Blitzscale' | 'Remote Async Nomad' | 'Enterprise Stability' | 'Research & Academia';
  workPaceScore: number;
  autonomyScore: number;
  collaborationScore: number;
  curatedOpportunities: {
    title: string;
    type: 'Hackathon' | 'Fellowship' | 'Research Grant' | 'Internship';
    matchedReason: string;
    linkText: string;
  }[];
  curatedProducts: {
    name: string;
    category: 'Developer Pack' | 'Ergonomics' | 'Knowledge / Books' | 'Productivity';
    description: string;
    studentPerk: string;
    linkUrl: string;
  }[];
}

export interface CompanyFitPrediction {
  companyTier: 'Tier-1 Product (FAANG+)' | 'High-Growth Unicorn' | 'FinTech & Quant' | 'IT Services & Consultancies';
  targetCompanies: string[];
  matchPercentage: number;
  readinessLevel: 'Ready for Interview' | 'High Potential (1-2 months polish)' | 'Foundational Gap to Bridge';
  strengths: string[];
  missingSkills: string[];
  actionPlan: string[];
}

export interface StudentVerificationRecord {
  isVerified: boolean;
  status: 'unverified' | 'pending' | 'verified_student' | 'verified_alumni';
  collegeName: string;
  degreeName: string;
  enrollmentId: string;
  graduationYear: number;
  idCardFileName?: string;
  collegeStandingPercentile: number;
  nationwideStandingPercentile: number;
  verificationBadges: string[];
  verifiedAt?: string;
}

export type UserAcademicRole = 'student' | 'teacher_faculty' | 'researcher' | 'other_academic';
export type EducationStage = 'school' | 'undergraduate' | 'postgraduate' | 'phd_research' | 'faculty';
export type SkillProficiency = 'beginner' | 'intermediate' | 'advanced';

export interface CategorizedSkill {
  name: string;
  category: 'Technology' | 'Creative' | 'Business' | 'Academic / Research' | 'Communication';
  level: SkillProficiency;
}

export interface HackathonExperienceDetail {
  participatedBefore: boolean;
  count: number;
  skillsContributed: string[];
  lookingForSkills: string[];
}

export interface CollaborationProfile {
  lookingForConnections: string[]; // e.g., 'Hackathon teammates', 'Research collaborators'
  canContribute: string[]; // capabilities
  lookingForSkills: string[]; // specific skills needed, e.g., 'JavaScript', 'PyTorch'
}

export interface Layer2Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  linkUrl?: string;
  teamSize?: number;
}

export interface Layer2Experience {
  id: string;
  type: 'internship' | 'research' | 'hackathon' | 'club' | 'certification';
  title: string;
  organization: string;
  duration?: string;
  details: string;
}

export interface FullOnboardingProfile {
  id: string;
  fullName: string;
  avatarUrl: string;
  role: UserAcademicRole;
  educationStage: EducationStage;
  // School fields
  schoolName?: string;
  schoolBoard?: string;
  schoolClass?: string;
  favoriteSubjects?: string[];
  difficultSubjects?: string[];
  learningStyle?: string;
  // College & University fields
  universityName: string;
  collegeName?: string;
  department: string;
  courseOrBranch: string;
  currentYearOrClass: string;
  semester?: string;
  specialization?: string;
  // PhD / Research fields
  researchArea?: string;
  currentResearchProject?: string;
  publicationsCount?: number;
  // Faculty fields
  facultyDesignation?: string;
  subjectsTaught?: string[];
  mentoringInterests?: string[];
  // Skills & Interests
  skills: CategorizedSkill[];
  isExploringSkillsOnly?: boolean;
  interests: string[];
  currentActivities: string[];
  hackathonDetail?: HackathonExperienceDetail;
  // Team & Collaboration
  collaboration: CollaborationProfile;
  // Goals & Career
  goals6to12Months: string[];
  curiousCareerAreas: string[];
  // Layer 2 Data
  projects: Layer2Project[];
  experiences: Layer2Experience[];
  profileStrengthPercent: number;
  profileVisibility: 'public' | 'university_only' | 'department_only';
  completedAt: string;
}
