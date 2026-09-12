import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  StudentProfile, 
  Community, 
  Post, 
  Project, 
  IdeaProposal, 
  ReactionType,
  UserRole,
  EducationLevel
} from '../types';
import { CURRENT_STUDENT, MOCK_STUDENTS } from '../data/mockStudents';
import { MOCK_POSTS } from '../data/mockPosts';
import { MOCK_PROJECTS } from '../data/mockProjects';
import { MOCK_COMMUNITIES } from '../data/mockCommunities';
import { INITIAL_USER_PROPOSALS } from '../data/mockFellowships';

export type AppView = 
  | 'landing' 
  | 'feed' 
  | 'communities' 
  | 'network' 
  | 'teammates' 
  | 'projects' 
  | 'journeys' 
  | 'fellowships' 
  | 'analytics' 
  | 'mentor' 
  | 'profile';

interface AppContextType {
  currentUser: StudentProfile;
  isAuthenticated: boolean;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  selectedCommunityId: string | null;
  setSelectedCommunityId: (id: string | null) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;

  // Modals
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  isCreatePostOpen: boolean;
  setIsCreatePostOpen: (open: boolean) => void;
  isCreateProjectOpen: boolean;
  setIsCreateProjectOpen: (open: boolean) => void;
  isVerificationOpen: boolean;
  setIsVerificationOpen: (open: boolean) => void;
  isAcademicQuizOpen: boolean;
  setIsAcademicQuizOpen: (open: boolean) => void;
  isSubmitIdeaOpen: boolean;
  setIsSubmitIdeaOpen: (open: boolean) => void;

  // Data & Collections
  posts: Post[];
  projects: Project[];
  communities: Community[];
  students: StudentProfile[];
  proposals: IdeaProposal[];
  connectedStudentIds: string[];
  notifications: Array<{ id: string; title: string; description: string; time: string; isRead: boolean; type: string }>;

  // Actions
  handleReaction: (postId: string, reaction: ReactionType) => void;
  handleVotePoll: (postId: string, optionId: string) => void;
  handleAddComment: (postId: string, content: string) => void;
  handleToggleSavePost: (postId: string) => void;
  handleToggleJoinCommunity: (communityId: string) => void;
  handleSendConnection: (studentId: string) => void;
  handleCreatePost: (newPost: Partial<Post>) => void;
  handleCreateProject: (newProj: Partial<Project>) => void;
  handleSubmitIdea: (proposal: Partial<IdeaProposal>) => void;
  handleUpdateProfile: (updated: Partial<StudentProfile>) => void;
  handleCompleteOnboarding: (data: Partial<StudentProfile>) => void;
  handleCompleteVerification: (method: string, orgName: string) => void;
  handleCompleteQuiz: (score: number, level: 'Beginner' | 'Developing' | 'Intermediate' | 'Strong') => void;
  handleLoginAs: (preset: 'student' | 'faculty' | 'researcher' | 'new_student') => void;
  handleLogout: () => void;
  showToast: (message: string, icon?: string) => void;
  toastMessage: { message: string; icon?: string } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('campusnexus_current_user');
    return saved ? JSON.parse(saved) : CURRENT_STUDENT;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('campusnexus_auth');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [activeView, setActiveView] = useState<AppView>('feed');
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState<boolean>(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState<boolean>(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState<boolean>(false);
  const [isAcademicQuizOpen, setIsAcademicQuizOpen] = useState<boolean>(false);
  const [isSubmitIdeaOpen, setIsSubmitIdeaOpen] = useState<boolean>(false);

  // Dynamic toast state
  const [toastMessage, setToastMessage] = useState<{ message: string; icon?: string } | null>(null);

  const showToast = (message: string, icon = '✨') => {
    setToastMessage({ message, icon });
    setTimeout(() => {
      setToastMessage(prev => (prev?.message === message ? null : prev));
    }, 3800);
  };

  // Data collections
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('campusnexus_posts');
    return saved ? JSON.parse(saved) : MOCK_POSTS;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('campusnexus_projects');
    return saved ? JSON.parse(saved) : MOCK_PROJECTS;
  });

  const [communities, setCommunities] = useState<Community[]>(() => {
    const saved = localStorage.getItem('campusnexus_communities');
    return saved ? JSON.parse(saved) : MOCK_COMMUNITIES;
  });

  const [students, setStudents] = useState<StudentProfile[]>(MOCK_STUDENTS);

  const [proposals, setProposals] = useState<IdeaProposal[]>(() => {
    const saved = localStorage.getItem('campusnexus_proposals');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROPOSALS;
  });

  const [connectedStudentIds, setConnectedStudentIds] = useState<string[]>(['usr-priya-nair']);

  const [notifications] = useState([
    {
      id: 'notif-1',
      title: 'Priya Nair accepted your connection',
      description: 'You can now collaborate and message Priya from IIT Delhi.',
      time: '10m ago',
      isRead: false,
      type: 'connection',
    },
    {
      id: 'notif-2',
      title: 'Hackathon Teammate Match',
      description: 'Ananya Iyer matches 94% with your Web & UI project requirements.',
      time: '1h ago',
      isRead: false,
      type: 'match',
    },
    {
      id: 'notif-3',
      title: 'New Grant Notification',
      description: 'DST NIDHI-EIR grant application cycle is now accepting student proposals.',
      time: '3h ago',
      isRead: true,
      type: 'grant',
    },
  ]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('campusnexus_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('campusnexus_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('campusnexus_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('campusnexus_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('campusnexus_communities', JSON.stringify(communities));
  }, [communities]);

  useEffect(() => {
    localStorage.setItem('campusnexus_proposals', JSON.stringify(proposals));
  }, [proposals]);

  // Post Reactions
  const handleReaction = (postId: string, reaction: ReactionType) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id !== postId) return post;

        const currentReaction = post.reactions.userReaction;
        const newReactions = { ...post.reactions };

        if (currentReaction === reaction) {
          // toggle off
          newReactions[reaction] = Math.max(0, newReactions[reaction] - 1);
          newReactions.userReaction = undefined;
          showToast('Reaction removed');
        } else {
          // if had previous reaction, decrement it
          if (currentReaction) {
            newReactions[currentReaction] = Math.max(0, newReactions[currentReaction] - 1);
          }
          newReactions[reaction] = newReactions[reaction] + 1;
          newReactions.userReaction = reaction;
          const reactionEmoji: Record<ReactionType, string> = {
            like: '👍 Liked post',
            celebrate: '🎉 Celebrated post',
            interesting: '💡 Marked as interesting',
            support: '🤝 Supported post',
            helpful: '🙌 Marked as helpful',
          };
          showToast(reactionEmoji[reaction]);
        }

        return { ...post, reactions: newReactions };
      })
    );
  };

  // Poll Voting
  const handleVotePoll = (postId: string, optionId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id !== postId || !post.poll) return post;
        if (post.poll.userVotedOptionId === optionId) return post;

        const prevVoted = post.poll.userVotedOptionId;
        const updatedOptions = post.poll.options.map(opt => {
          if (opt.id === optionId) return { ...opt, votes: opt.votes + 1 };
          if (prevVoted && opt.id === prevVoted) return { ...opt, votes: Math.max(0, opt.votes - 1) };
          return opt;
        });

        const newTotal = updatedOptions.reduce((acc, curr) => acc + curr.votes, 0);

        showToast('Vote recorded! 🗳️');
        return {
          ...post,
          poll: {
            ...post.poll,
            options: updatedOptions,
            totalVotes: newTotal,
            userVotedOptionId: optionId,
          },
        };
      })
    );
  };

  // Add Comment
  const handleAddComment = (postId: string, content: string) => {
    if (!content.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role === 'student' ? 'Student' : currentUser.role,
      authorInstitution: currentUser.universityName,
      content: content.trim(),
      createdAt: 'Just now',
      likesCount: 0,
      isLiked: false,
    };

    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [newComment, ...p.comments],
        };
      })
    );
    showToast('Comment posted! 💬');
  };

  // Save Post
  const handleToggleSavePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const isSaved = !p.isSaved;
        showToast(isSaved ? 'Saved to bookmarks 🔖' : 'Removed from bookmarks');
        return { ...p, isSaved };
      })
    );
  };

  // Join Community
  const handleToggleJoinCommunity = (communityId: string) => {
    setCommunities(prev =>
      prev.map(c => {
        if (c.id !== communityId) return c;
        const isJoined = !c.isJoined;
        showToast(isJoined ? `Joined ${c.name}! 🎉` : `Left ${c.name}`);
        return {
          ...c,
          isJoined,
          memberCount: isJoined ? c.memberCount + 1 : Math.max(1, c.memberCount - 1),
        };
      })
    );
  };

  // Connection Request
  const handleSendConnection = (studentId: string) => {
    if (connectedStudentIds.includes(studentId)) {
      setConnectedStudentIds(prev => prev.filter(id => id !== studentId));
      showToast('Connection removed');
    } else {
      setConnectedStudentIds(prev => [...prev, studentId]);
      showToast('Connection request sent! 🤝');
    }
  };

  // Create Post
  const handleCreatePost = (newPostData: Partial<Post>) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        role: currentUser.headline.split('|')[0]?.trim() || 'Student Builder',
        institution: currentUser.universityName,
        department: currentUser.department,
        year: currentUser.currentYear,
        isVerified: currentUser.verification.isVerified,
      },
      content: newPostData.content || '',
      postType: newPostData.postType || 'text',
      communityId: newPostData.communityId,
      communityName: newPostData.communityName,
      tags: newPostData.tags || ['StudentCommunity', 'Collaboration'],
      poll: newPostData.poll,
      projectSnippet: newPostData.projectSnippet,
      reactions: {
        like: 1,
        celebrate: 0,
        interesting: 0,
        support: 0,
        helpful: 0,
        userReaction: 'like',
      },
      commentsCount: 0,
      comments: [],
      sharesCount: 0,
      isSaved: false,
      createdAt: 'Just now',
    };

    setPosts(prev => [newPost, ...prev]);
    showToast('Your post is live in the network! 🚀');
    setIsCreatePostOpen(false);
  };

  // Create Project
  const handleCreateProject = (newProjData: Partial<Project>) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: newProjData.title || 'Untitled Project',
      tagline: newProjData.tagline || '',
      description: newProjData.description || '',
      category: newProjData.category || 'Web Development',
      difficulty: newProjData.difficulty || 'Intermediate',
      techStack: newProjData.techStack || ['React', 'TypeScript'],
      creator: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        institution: currentUser.universityName,
        department: currentUser.department,
        isVerified: currentUser.verification.isVerified,
      },
      teamMembers: [
        { id: currentUser.id, name: currentUser.name, role: 'Creator & Lead', avatar: currentUser.avatar },
      ],
      accessTier: newProjData.accessTier || 'Free',
      price: newProjData.price,
      lookingForTeammates: newProjData.lookingForTeammates ?? true,
      neededRoles: newProjData.neededRoles || ['Frontend Developer'],
      screenshots: newProjData.screenshots || ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80'],
      githubUrl: newProjData.githubUrl,
      liveDemoUrl: newProjData.liveDemoUrl,
      likesCount: 1,
      isLiked: true,
      followersCount: 1,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setProjects(prev => [newProject, ...prev]);
    setCurrentUser(prev => ({
      ...prev,
      projectsCount: prev.projectsCount + 1,
      profileStrength: Math.min(100, prev.profileStrength + 8),
    }));
    showToast('Project published to campus network! 🌟');
    setIsCreateProjectOpen(false);
  };

  // Submit Idea / Proposal
  const handleSubmitIdea = (proposalData: Partial<IdeaProposal>) => {
    const newProposal: IdeaProposal = {
      id: `prop-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      title: proposalData.title || 'New Student Idea',
      track: proposalData.track || 'Project Idea',
      problemStatement: proposalData.problemStatement || '',
      proposedSolution: proposalData.proposedSolution || '',
      currentStage: proposalData.currentStage || 'Concept / Idea',
      techOrDomain: proposalData.techOrDomain || ['Web', 'AI'],
      estimatedFunding: proposalData.estimatedFunding || '₹1,00,000',
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'Submitted',
    };

    setProposals(prev => [newProposal, ...prev]);
    showToast('Idea submitted for fellowship & grant matching! 🎯');
    setIsSubmitIdeaOpen(false);
  };

  // Update Profile
  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    setCurrentUser(prev => {
      const next = { ...prev, ...updated };
      // Recalculate profile strength
      let strength = 45;
      if (next.skills.length >= 4) strength += 15;
      if (next.bio.length > 30) strength += 10;
      if (next.projectsCount > 0) strength += 10;
      if (next.verification.isVerified) strength += 10;
      if (next.academicAssessment) strength += 10;
      next.profileStrength = Math.min(100, strength);
      return next;
    });
    showToast('Profile updated! 💾');
  };

  // Complete Onboarding
  const handleCompleteOnboarding = (data: Partial<StudentProfile>) => {
    setCurrentUser(prev => ({
      ...prev,
      ...data,
      profileStrength: 80,
    }));
    setIsOnboardingOpen(false);
    setActiveView('feed');
    showToast('Welcome to CampusNexus! Your journey begins now. 🚀');
  };

  // Complete Verification
  const handleCompleteVerification = (method: string, orgName: string) => {
    setCurrentUser(prev => ({
      ...prev,
      verification: {
        isVerified: true,
        badgeLabel: 'Verified Student',
        verifiedAt: new Date().toISOString().split('T')[0],
        institutionEmailDomain: orgName,
      },
      profileStrength: Math.min(100, prev.profileStrength + 10),
    }));
    setIsVerificationOpen(false);
    showToast('Institutional verification successful! Badge issued 🛡️');
  };

  // Complete Quiz / Assessment
  const handleCompleteQuiz = (score: number, level: 'Beginner' | 'Developing' | 'Intermediate' | 'Strong') => {
    setCurrentUser(prev => ({
      ...prev,
      academicAssessment: {
        level,
        score,
        completedAt: new Date().toISOString().split('T')[0],
        summary: `Assessment score ${score}%. Demonstrated solid algorithmic concepts and peer-collaboration readiness.`,
        breakdown: {
          problemSolving: score,
          technicalConcepts: Math.min(100, score + 4),
          collaborationReady: Math.min(100, score + 8),
          learningAgility: Math.max(60, score - 6),
        },
      },
      profileStrength: Math.min(100, prev.profileStrength + 8),
    }));
    setIsAcademicQuizOpen(false);
    showToast(`Assessment completed: Rated as ${level}! 🏆`);
  };

  // Switch demo account
  const handleLoginAs = (preset: 'student' | 'faculty' | 'researcher' | 'new_student') => {
    if (preset === 'student') {
      setCurrentUser(CURRENT_STUDENT);
      setIsAuthenticated(true);
      setActiveView('feed');
      showToast('Logged in as Aarav Sharma (Undergrad Student)');
    } else if (preset === 'faculty') {
      setCurrentUser({
        ...CURRENT_STUDENT,
        id: 'usr-prof-mehta',
        name: 'Dr. Rajesh Mehta',
        email: 'rajesh.mehta@du.ac.in',
        role: 'faculty',
        educationLevel: 'phd',
        educationLevelLabel: 'Professor & Head of Department',
        headline: 'Professor of Computer Science | Distributed Systems & Big Data',
        bio: 'Faculty mentor guiding undergraduate research projects, innovation grants, and campus hackathon teams.',
        verification: {
          isVerified: true,
          badgeLabel: 'Verified Faculty',
          verifiedAt: '2024-01-10',
          institutionEmailDomain: 'du.ac.in',
        },
      });
      setIsAuthenticated(true);
      setActiveView('feed');
      showToast('Logged in as Dr. Rajesh Mehta (Faculty)');
    } else if (preset === 'researcher') {
      setCurrentUser({
        ...CURRENT_STUDENT,
        id: 'usr-researcher-ananya',
        name: 'Ananya Roy',
        email: 'a.roy@scai.iitd.ac.in',
        role: 'researcher',
        educationLevel: 'phd',
        educationLevelLabel: 'PhD Scholar @ SCAI IIT Delhi',
        headline: 'PhD Scholar | Foundation Models for Healthcare & Biology',
        bio: 'Investigating parameter-efficient fine-tuning and diffusion transformers for drug discovery.',
        verification: {
          isVerified: true,
          badgeLabel: 'Verified Student',
          verifiedAt: '2024-08-10',
          institutionEmailDomain: 'iitd.ac.in',
        },
      });
      setIsAuthenticated(true);
      setActiveView('feed');
      showToast('Logged in as Ananya Roy (PhD Scholar)');
    } else if (preset === 'new_student') {
      // fresh onboarding
      setIsAuthenticated(true);
      setIsOnboardingOpen(true);
      showToast('Starting fresh 8-step student onboarding!');
    }
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveView('landing');
    showToast('You have been signed out.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        activeView,
        setActiveView,
        selectedCommunityId,
        setSelectedCommunityId,
        selectedProjectId,
        setSelectedProjectId,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isCreatePostOpen,
        setIsCreatePostOpen,
        isCreateProjectOpen,
        setIsCreateProjectOpen,
        isVerificationOpen,
        setIsVerificationOpen,
        isAcademicQuizOpen,
        setIsAcademicQuizOpen,
        isSubmitIdeaOpen,
        setIsSubmitIdeaOpen,
        posts,
        projects,
        communities,
        students,
        proposals,
        connectedStudentIds,
        notifications,
        handleReaction,
        handleVotePoll,
        handleAddComment,
        handleToggleSavePost,
        handleToggleJoinCommunity,
        handleSendConnection,
        handleCreatePost,
        handleCreateProject,
        handleSubmitIdea,
        handleUpdateProfile,
        handleCompleteOnboarding,
        handleCompleteVerification,
        handleCompleteQuiz,
        handleLoginAs,
        handleLogout,
        showToast,
        toastMessage,
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
