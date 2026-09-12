export type UserRole = 'student' | 'faculty' | 'researcher' | 'other';

export type EducationLevel = 
  | 'school_class_8'
  | 'school_class_9'
  | 'school_class_10'
  | 'school_class_11'
  | 'school_class_12'
  | 'ug_1'
  | 'ug_2'
  | 'ug_3'
  | 'ug_4'
  | 'pg_1'
  | 'pg_2'
  | 'phd'
  | 'research_scholar';

export type SkillProficiency = 'Beginner' | 'Developing' | 'Intermediate' | 'Strong' | 'Advanced';

export interface UserSkill {
  name: string;
  level: SkillProficiency;
}

export interface CollaborationPreferences {
  modes: ('Remote' | 'In-person' | 'Hybrid')[];
  availabilityHoursPerWeek: number;
  openToTeam: boolean;
  preferredRoles: string[];
}

export interface EducationVerification {
  isVerified: boolean;
  badgeLabel: 'Verified Student' | 'Verified Institution' | 'Verified Faculty' | 'Unverified';
  verifiedAt?: string;
  institutionEmailDomain?: string;
}

export interface AcademicAssessment {
  level: 'Beginner' | 'Developing' | 'Intermediate' | 'Strong';
  score: number;
  completedAt: string;
  summary: string;
  breakdown: {
    problemSolving: number;
    technicalConcepts: number;
    collaborationReady: number;
    learningAgility: number;
  };
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  educationLevel: EducationLevel;
  educationLevelLabel: string;
  universityName: string;
  collegeName?: string;
  department: string;
  branch: string;
  currentYear: string;
  headline: string;
  bio: string;
  skills: UserSkill[];
  interests: string[];
  activities: string[];
  goals: string[];
  collaboration: CollaborationPreferences;
  profileStrength: number;
  verification: EducationVerification;
  academicAssessment?: AcademicAssessment;
  githubUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  connectionsCount: number;
  projectsCount: number;
  communitiesCount: number;
  privacy: {
    visibility: 'Public' | 'University only' | 'College only' | 'Connections only';
    showEmail: boolean;
    showSkills: boolean;
    showProjects: boolean;
  };
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  type: 'university' | 'college' | 'department' | 'batch' | 'club' | 'interest';
  universityName: string;
  collegeName?: string;
  departmentName?: string;
  batchYear?: string;
  description: string;
  avatar: string;
  banner: string;
  memberCount: number;
  isJoined: boolean;
  isOfficial: boolean;
  category: string;
  recentActiveCount: number;
  parentCommunityId?: string;
}

export type ReactionType = 'like' | 'celebrate' | 'interesting' | 'support' | 'helpful';

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  authorInstitution: string;
  content: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    institution: string;
    department: string;
    year: string;
    isVerified: boolean;
  };
  communityId?: string;
  communityName?: string;
  postType: 'text' | 'image' | 'project' | 'achievement' | 'internship' | 'hackathon' | 'research' | 'opportunity' | 'question' | 'poll';
  content: string;
  mediaUrl?: string;
  tags: string[];
  poll?: {
    question: string;
    options: { id: string; text: string; votes: number }[];
    totalVotes: number;
    userVotedOptionId?: string;
  };
  projectSnippet?: {
    title: string;
    description: string;
    techStack: string[];
    link?: string;
    seekingRoles?: string[];
  };
  reactions: {
    like: number;
    celebrate: number;
    interesting: number;
    support: number;
    helpful: number;
    userReaction?: ReactionType;
  };
  commentsCount: number;
  comments: Comment[];
  sharesCount: number;
  isSaved: boolean;
  createdAt: string;
}

export type ProjectAccessTier = 'Free' | 'Paid' | 'Request Access' | 'Private';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 
    | 'Web Development'
    | 'Mobile Apps'
    | 'AI/ML'
    | 'Robotics'
    | 'IoT'
    | 'Cybersecurity'
    | 'Education'
    | 'Healthcare'
    | 'Finance'
    | 'Social Impact'
    | 'Research'
    | 'Startups'
    | 'Other';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
  creator: {
    id: string;
    name: string;
    avatar: string;
    institution: string;
    department: string;
    isVerified: boolean;
  };
  teamMembers: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  }[];
  accessTier: ProjectAccessTier;
  price?: number;
  lookingForTeammates: boolean;
  neededRoles: string[];
  screenshots: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  likesCount: number;
  isLiked: boolean;
  followersCount: number;
  createdAt: string;
}

export interface PlacedJourney {
  id: string;
  studentName: string;
  avatar: string;
  targetCompany: string;
  companyLogo?: string;
  role: string;
  packageBracket: string;
  universityName: string;
  branch: string;
  graduationYear: string;
  title: string;
  storySummary: string;
  journeyStages: {
    stage: string;
    duration: string;
    focus: string;
  }[];
  preparationRoadmap: string[];
  keySkillsLearned: string[];
  topProjectsBuilt: string[];
  interviewExperience: string;
  mistakesAndLessons: string[];
  recommendedResources: { title: string; type: string }[];
  isVerified: boolean;
}

export interface FellowshipOpportunity {
  id: string;
  title: string;
  provider: string;
  logo: string;
  type: 'Fellowship' | 'Grant' | 'Scholarship' | 'Hackathon' | 'Incubator' | 'Mentorship';
  fundingAmount: string;
  deadline: string;
  eligibleLevels: string[];
  tags: string[];
  description: string;
  requirements: string[];
  applyUrl: string;
  status: 'Open' | 'Closing Soon' | 'Upcoming';
  verifiedOpportunity: boolean;
}

export interface IdeaProposal {
  id: string;
  authorId: string;
  authorName: string;
  title: string;
  track: 'Project Idea' | 'Research Proposal' | 'Startup Innovation' | 'Social Impact';
  problemStatement: string;
  proposedSolution: string;
  currentStage: 'Concept / Idea' | 'Design & Architecture' | 'Prototype in Progress' | 'MVP Tested';
  techOrDomain: string[];
  estimatedFunding: string;
  submittedAt: string;
  status: 'Draft' | 'Submitted' | 'Review in Progress' | 'Opportunity Discovered';
}

export interface UniversityInsight {
  id: string;
  name: string;
  slug: string;
  location: string;
  badge: string;
  logo: string;
  studentCount: number;
  activeProjects: number;
  hackathonWins: number;
  researchPapers: number;
  placementRatePercent: number;
  internshipRatePercent: number;
  reportedAverageLPA: number;
  topSkills: string[];
  topIndustries: string[];
  dataSourceNotice: 'Platform-Tracked Data' | 'Student-Reported Survey' | 'Verified Institutional Data';
  comparisonHighlights: string[];
}

export interface TeammateRecommendation {
  student: StudentProfile;
  matchScore: number;
  matchReasons: string[];
  complementarySkills: string[];
  availabilityScore: number;
}
