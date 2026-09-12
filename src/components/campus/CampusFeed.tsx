import React, { useState } from 'react';
import {
  COLLEGES,
  COLLEGE_STORIES,
} from '../../data/campusData';
import { useCampus } from '../../context/CampusContext';
import {
  CommunityPost,
  CollegeStory,
  ReactionType,
  Comment,
  PollOption,
} from '../../types/campus';
import {
  MessageSquare,
  Share2,
  Bookmark,
  ThumbsUp,
  Award,
  Lightbulb,
  Heart,
  HelpCircle,
  Image as ImageIcon,
  Video,
  Code,
  BarChart2,
  Send,
  CheckCircle,
  Filter,
  Sparkles,
  Building,
  GraduationCap,
  ChevronDown,
  X,
  Plus,
  Play,
  Copy,
  Check,
} from 'lucide-react';

export const CampusFeed: React.FC = () => {
  const {
    posts,
    addPost,
    reactToPost,
    votePoll,
    addComment,
    toggleBookmark,
    sharePost,
    verification,
  } = useCampus();
  const [selectedCollege, setSelectedCollege] = useState<string>('all');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [scopeFilter, setScopeFilter] = useState<'all' | 'my_college_only' | 'my_branch_only' | 'my_class_only'>('all');

  // Story Viewer Modal
  const [activeStory, setActiveStory] = useState<CollegeStory | null>(null);

  // New Post Creator State
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [newPostVideo, setNewPostVideo] = useState('');
  const [newPostTags, setNewPostTags] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showPollInput, setShowPollInput] = useState(false);
  const [codeLang, setCodeLang] = useState('javascript');
  const [codeContent, setCodeContent] = useState('');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
  const [selectedPostScope, setSelectedPostScope] = useState<'all_colleges' | 'my_college_only' | 'my_branch_only' | 'my_class_only'>('all_colleges');

  // Expanded comments tracker
  const [expandedComments, setExpandedComments] = useState<{ [postId: string]: boolean }>({
    'post-101': true,
  });
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  // Reaction hover toolbar state
  const [hoveredReactionPostId, setHoveredReactionPostId] = useState<string | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Handle adding a new reaction
  const handleReact = (postId: string, reaction: ReactionType) => {
    reactToPost(postId, reaction);
    setHoveredReactionPostId(null);
  };

  // Handle Poll Vote
  const handleVotePoll = (postId: string, optionId: string) => {
    votePoll(postId, optionId);
  };

  // Handle Bookmark Toggle
  const handleToggleBookmark = (postId: string) => {
    toggleBookmark(postId);
  };

  // Handle Share
  const handleShare = (post: CommunityPost) => {
    sharePost(post.id);
    navigator.clipboard?.writeText(window.location.href);
    setShareToast(`Link to ${post.authorName}'s post copied to clipboard!`);
    setTimeout(() => setShareToast(null), 3000);
  };

  // Handle Add Comment
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    addComment(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
  };

  // Create New Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const parsedTags = newPostTags
      .split(/[\s,#]+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    let createdPoll = undefined;
    if (pollQuestion.trim() && pollOptions.filter((o) => o.trim().length > 0).length >= 2) {
      const validOpts: PollOption[] = pollOptions
        .filter((o) => o.trim().length > 0)
        .map((text, idx) => ({ id: `p-opt-${idx}`, text, votes: 0 }));
      createdPoll = {
        question: pollQuestion.trim(),
        options: validOpts,
        totalVotes: 0,
      };
    }

    addPost({
      authorName: 'Aryan Sharma (You)',
      authorCollegeId: 'iit-bombay',
      authorCollegeName: verification.collegeName || 'IIT Bombay',
      authorBranch: verification.degreeName || 'Computer Science & Engineering',
      authorYear: '3rd Year / Class of 2026',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      authorStanding: `Top ${100 - verification.collegeStandingPercentile}% in CSE • Verified`,
      isVerified: verification.isVerified,
      content: newPostContent.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ['GeneralDiscussion', 'UniSphere'],
      imageUrl: newPostImage.trim() || undefined,
      videoUrl: newPostVideo.trim() || undefined,
      videoTitle: newPostVideo.trim() ? 'Student Project Demo Clip' : undefined,
      codeSnippet:
        showCodeInput && codeContent.trim()
          ? { language: codeLang, code: codeContent.trim() }
          : undefined,
      poll: createdPoll,
      isBookmarked: false,
      scope: selectedPostScope,
    });

    setNewPostContent('');
    setNewPostImage('');
    setNewPostVideo('');
    setNewPostTags('');
    setCodeContent('');
    setPollQuestion('');
    setPollOptions(['', '']);
    setShowImageInput(false);
    setShowVideoInput(false);
    setShowCodeInput(false);
    setShowPollInput(false);
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    if (selectedCollege !== 'all' && post.authorCollegeId !== selectedCollege) {
      return false;
    }
    if (selectedBranch !== 'all' && !post.authorBranch.toLowerCase().includes(selectedBranch.toLowerCase())) {
      return false;
    }
    if (selectedClass !== 'all' && !post.authorYear.toLowerCase().includes(selectedClass.toLowerCase())) {
      return false;
    }
    if (scopeFilter !== 'all' && post.scope !== scopeFilter) {
      return false;
    }
    return true;
  });

  const allBranches = Array.from(
    new Set(COLLEGES.flatMap((c) => c.branches))
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Toast */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">{shareToast}</span>
        </div>
      )}

      {/* Hero Banner with Connected Network Info */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white p-6 shadow-md border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-brand-400" />
                Inter-University Live Network
              </span>
              <span className="text-xs text-slate-400">8 Premier Universities Connected</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Campus Communities & Class Feed
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Connect with students across India, join branch-wise channels, share project media, engage with LinkedIn-style reactions, and collaborate across classes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-center min-w-[100px]">
              <div className="text-xl font-bold text-white">82k+</div>
              <div className="text-[11px] text-slate-300">Verified Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-center min-w-[100px]">
              <div className="text-xl font-bold text-brand-400">1.4k+</div>
              <div className="text-[11px] text-slate-300">Placed Stories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram-Style Stories / Highlights Row */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Campus Spotlights & Stories</span>
          </div>
          <span className="text-xs text-slate-500">Tap to view live highlight</span>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
          {COLLEGE_STORIES.map((story) => (
            <button
              key={story.id}
              onClick={() => setActiveStory(story)}
              className="flex flex-col items-center gap-1.5 flex-shrink-0 group focus:outline-none"
            >
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-brand-500 via-rose-500 to-indigo-500 group-hover:scale-105 transition duration-200">
                <div className="p-0.5 bg-white rounded-full">
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-16 h-16 rounded-full object-cover border border-slate-100"
                  />
                </div>
              </div>
              <div className="text-center max-w-[80px]">
                <div className="text-xs font-semibold text-slate-800 truncate group-hover:text-brand-600">
                  {story.collegeName}
                </div>
                <div className="text-[10px] text-slate-500 truncate">{story.category}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Filter / Community Selector Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 mr-1">
          <Filter className="w-4 h-4 text-slate-600" />
          <span>Filter Feed:</span>
        </div>

        {/* College selector */}
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs">
          <Building className="w-3.5 h-3.5 text-brand-600" />
          <select
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
            className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="all">All Colleges & Universities</option>
            {COLLEGES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.tier})
              </option>
            ))}
          </select>
        </div>

        {/* Branch filter */}
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs">
          <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer max-w-[180px]"
          >
            <option value="all">All Branches / Majors</option>
            <option value="computer science">Computer Science & Eng (CSE)</option>
            <option value="electronics">Electronics & Comm (ECE)</option>
            <option value="mechanical">Mechanical Engineering</option>
            <option value="electrical">Electrical & Electronics</option>
            <option value="artificial intelligence">AI & Data Science</option>
            <option value="economics">Economics & Finance</option>
          </select>
        </div>

        {/* Class Year filter */}
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="all">All Batches & Classes</option>
            <option value="2026">Class of 2026 (3rd Year)</option>
            <option value="2025">Class of 2025 (Final Year / Placed)</option>
            <option value="2027">Class of 2027 (2nd Year)</option>
            <option value="2028">Freshers (Class of 2028)</option>
          </select>
        </div>

        {/* Clear Filters */}
        {(selectedCollege !== 'all' || selectedBranch !== 'all' || selectedClass !== 'all') && (
          <button
            onClick={() => {
              setSelectedCollege('all');
              setSelectedBranch('all');
              setSelectedClass('all');
            }}
            className="text-xs text-rose-600 hover:text-rose-700 font-medium ml-auto"
          >
            Reset Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Creator Box */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
            <div className="flex items-start gap-3">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <div className="flex-1">
                <form onSubmit={handleCreatePost}>
                  <textarea
                    rows={3}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Share an innovation, placement tip, project demo, or question with class & college communities..."
                    className="w-full text-sm text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none"
                  />

                  {/* Attachment Inputs if toggled */}
                  {showImageInput && (
                    <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                        <span>Attach Image URL</span>
                        <button
                          type="button"
                          onClick={() => setShowImageInput(false)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="url"
                        value={newPostImage}
                        onChange={(e) => setNewPostImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white"
                      />
                    </div>
                  )}

                  {showVideoInput && (
                    <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                        <span>Attach Demo Video (MP4 / Direct URL)</span>
                        <button
                          type="button"
                          onClick={() => setShowVideoInput(false)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="url"
                        value={newPostVideo}
                        onChange={(e) => setNewPostVideo(e.target.value)}
                        placeholder="https://www.w3schools.com/html/mov_bbb.mp4"
                        className="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white"
                      />
                    </div>
                  )}

                  {showCodeInput && (
                    <div className="mt-2 p-3 bg-slate-900 text-slate-200 border border-slate-800 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-300">Code Snippet</span>
                        <div className="flex items-center gap-2">
                          <select
                            value={codeLang}
                            onChange={(e) => setCodeLang(e.target.value)}
                            className="bg-slate-800 text-xs text-brand-300 px-2 py-0.5 rounded border border-slate-700"
                          >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="go">Go</option>
                            <option value="rust">Rust</option>
                            <option value="cpp">C++</option>
                            <option value="solidity">Solidity</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => setShowCodeInput(false)}
                            className="text-slate-400 hover:text-white"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <textarea
                        rows={3}
                        value={codeContent}
                        onChange={(e) => setCodeContent(e.target.value)}
                        placeholder="// Paste your algorithm or architecture snippet here..."
                        className="w-full text-xs font-mono bg-slate-950 p-2 rounded-lg border border-slate-800 text-emerald-400 focus:outline-none"
                      />
                    </div>
                  )}

                  {showPollInput && (
                    <div className="mt-2 p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-indigo-900">
                        <span>Create Community Poll</span>
                        <button
                          type="button"
                          onClick={() => setShowPollInput(false)}
                          className="text-indigo-400 hover:text-indigo-700"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={pollQuestion}
                        onChange={(e) => setPollQuestion(e.target.value)}
                        placeholder="Poll question (e.g. Best framework for SIH 2026?)"
                        className="w-full text-xs p-2 border border-indigo-200 rounded-lg bg-white"
                      />
                      {pollOptions.map((opt, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const copy = [...pollOptions];
                            copy[idx] = e.target.value;
                            setPollOptions(copy);
                          }}
                          placeholder={`Option ${idx + 1}`}
                          className="w-full text-xs p-1.5 border border-indigo-200 rounded-lg bg-white"
                        />
                      ))}
                      {pollOptions.length < 4 && (
                        <button
                          type="button"
                          onClick={() => setPollOptions([...pollOptions, ''])}
                          className="text-xs font-medium text-indigo-700 hover:underline flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Option
                        </button>
                      )}
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-slate-500">
                      <button
                        type="button"
                        onClick={() => setShowImageInput(!showImageInput)}
                        className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
                          showImageInput ? 'bg-brand-50 text-brand-600' : 'hover:bg-slate-100'
                        }`}
                        title="Add Image"
                      >
                        <ImageIcon className="w-4 h-4 text-emerald-500" />
                        <span className="hidden sm:inline">Photo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowVideoInput(!showVideoInput)}
                        className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
                          showVideoInput ? 'bg-brand-50 text-brand-600' : 'hover:bg-slate-100'
                        }`}
                        title="Add Video Demo"
                      >
                        <Video className="w-4 h-4 text-indigo-500" />
                        <span className="hidden sm:inline">Video</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowCodeInput(!showCodeInput)}
                        className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
                          showCodeInput ? 'bg-brand-50 text-brand-600' : 'hover:bg-slate-100'
                        }`}
                        title="Add Code Snippet"
                      >
                        <Code className="w-4 h-4 text-amber-500" />
                        <span className="hidden sm:inline">Code</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowPollInput(!showPollInput)}
                        className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
                          showPollInput ? 'bg-brand-50 text-brand-600' : 'hover:bg-slate-100'
                        }`}
                        title="Create Poll"
                      >
                        <BarChart2 className="w-4 h-4 text-rose-500" />
                        <span className="hidden sm:inline">Poll</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={selectedPostScope}
                        onChange={(e: any) => setSelectedPostScope(e.target.value)}
                        className="text-xs bg-slate-100 text-slate-700 rounded-lg px-2 py-1.5 border border-slate-200"
                      >
                        <option value="all_colleges">🌐 All Colleges</option>
                        <option value="my_college_only">🏛️ My College Only</option>
                        <option value="my_branch_only">📚 My Branch Only</option>
                        <option value="my_class_only">🎓 My Class Only</option>
                      </select>

                      <button
                        type="submit"
                        disabled={!newPostContent.trim()}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Post
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Posts Feed List */}
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500">
              <GraduationCap className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <div className="text-base font-semibold text-slate-700">No posts match your filters</div>
              <p className="text-xs text-slate-400 mt-1">Try switching to all colleges or another branch.</p>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const totalReactions =
                post.reactions.like +
                post.reactions.celebrate +
                post.reactions.insightful +
                post.reactions.love +
                post.reactions.curious;

              const isCommentsOpen = !!expandedComments[post.id];

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-slate-300 transition duration-150"
                >
                  {/* Post Header */}
                  <div className="p-4 sm:p-5 pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={post.authorAvatar}
                            alt={post.authorName}
                            className="w-11 h-11 rounded-full object-cover border border-slate-200"
                          />
                          {post.isVerified && (
                            <span
                              className="absolute -bottom-1 -right-1 bg-brand-600 text-white rounded-full p-0.5"
                              title="Verified College Student"
                            >
                              <CheckCircle className="w-3 h-3" />
                            </span>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-slate-900">{post.authorName}</span>
                            {post.isPlaced && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                Placed @ {post.placedCompany}
                              </span>
                            )}
                            {post.scope === 'my_class_only' && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700">
                                Class Only
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-slate-500 flex flex-wrap items-center gap-1.5 mt-0.5">
                            <span className="font-medium text-slate-700">{post.authorCollegeName}</span>
                            <span>•</span>
                            <span>{post.authorBranch}</span>
                            <span>•</span>
                            <span className="text-slate-400">{post.authorYear}</span>
                          </div>

                          {post.authorStanding && (
                            <div className="text-[11px] font-medium text-brand-700 bg-brand-50/70 inline-block px-1.5 py-0.5 rounded mt-1 border border-brand-100">
                              {post.authorStanding}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-xs text-slate-400 whitespace-nowrap">{post.timestamp}</div>
                    </div>

                    {/* Post Content */}
                    <div className="mt-3 text-sm text-slate-800 whitespace-pre-line leading-relaxed">
                      {post.content}
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-2 py-0.5 rounded-md cursor-pointer transition"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Image Attachment */}
                  {post.imageUrl && (
                    <div className="relative max-h-96 overflow-hidden bg-slate-950">
                      <img
                        src={post.imageUrl}
                        alt="Post media"
                        className="w-full object-cover object-center max-h-96 hover:opacity-95 transition cursor-pointer"
                      />
                    </div>
                  )}

                  {/* Video Attachment with HTML5 Player */}
                  {post.videoUrl && (
                    <div className="p-4 pt-1 bg-slate-900 text-white">
                      {post.videoTitle && (
                        <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                          <Play className="w-3.5 h-3.5 text-brand-400" />
                          <span>{post.videoTitle}</span>
                        </div>
                      )}
                      <div className="rounded-xl overflow-hidden bg-black border border-slate-800">
                        <video
                          src={post.videoUrl}
                          controls
                          className="w-full max-h-72 object-cover"
                          poster={post.imageUrl}
                        />
                      </div>
                    </div>
                  )}

                  {/* Code Snippet Box */}
                  {post.codeSnippet && (
                    <div className="p-4 pt-1">
                      <div className="rounded-xl overflow-hidden bg-slate-950 text-slate-200 border border-slate-800">
                        <div className="bg-slate-900 px-3 py-1.5 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 font-mono">
                          <span>{post.codeSnippet.language}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(post.codeSnippet!.code);
                              setCopiedCodeId(post.id);
                              setTimeout(() => setCopiedCodeId(null), 2000);
                            }}
                            className="flex items-center gap-1 hover:text-white"
                          >
                            {copiedCodeId === post.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-3 text-xs font-mono text-emerald-400 overflow-x-auto">
                          <code>{post.codeSnippet.code}</code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Poll Component */}
                  {post.poll && (
                    <div className="p-4 pt-1">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <BarChart2 className="w-4 h-4 text-brand-600" />
                          <span>{post.poll.question}</span>
                        </div>
                        <div className="space-y-2">
                          {post.poll.options.map((opt) => {
                            const percent =
                              post.poll!.totalVotes > 0
                                ? Math.round((opt.votes / post.poll!.totalVotes) * 100)
                                : 0;
                            const isSelected = post.poll!.userVotedOptionId === opt.id;

                            return (
                              <button
                                key={opt.id}
                                disabled={!!post.poll!.userVotedOptionId}
                                onClick={() => handleVotePoll(post.id, opt.id)}
                                className={`w-full text-left p-2.5 rounded-lg border text-xs font-medium relative overflow-hidden transition ${
                                  isSelected
                                    ? 'border-brand-500 bg-brand-50/50 text-brand-900 font-semibold'
                                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                                }`}
                              >
                                <div
                                  className="absolute top-0 bottom-0 left-0 bg-brand-100/60 transition-all duration-500"
                                  style={{ width: `${percent}%` }}
                                />
                                <div className="relative flex items-center justify-between">
                                  <span>{opt.text}</span>
                                  {post.poll!.userVotedOptionId && (
                                    <span className="font-bold text-slate-900">{percent}%</span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                          <span>{post.poll.totalVotes} student votes</span>
                          <span>{post.poll.userVotedOptionId ? '✓ Voted' : 'Tap option to vote'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reaction Summary Count */}
                  <div className="px-5 py-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      {totalReactions > 0 && (
                        <div className="flex -space-x-1 items-center">
                          {post.reactions.like > 0 && <span className="text-xs">👍</span>}
                          {post.reactions.celebrate > 0 && <span className="text-xs">👏</span>}
                          {post.reactions.insightful > 0 && <span className="text-xs">💡</span>}
                          {post.reactions.love > 0 && <span className="text-xs">❤️</span>}
                          {post.reactions.curious > 0 && <span className="text-xs">🤔</span>}
                        </div>
                      )}
                      <span className="font-medium text-slate-700">
                        {totalReactions > 0 ? `${totalReactions} reactions` : 'Be first to react'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span>{post.comments.length} comments</span>
                      <span>•</span>
                      <span>{post.sharesCount} reposts</span>
                    </div>
                  </div>

                  {/* LinkedIn-Style Reaction Action Bar */}
                  <div className="px-4 py-1.5 border-t border-slate-100 flex items-center justify-between relative">
                    {/* Hover Reaction Popup Toolbar */}
                    {hoveredReactionPostId === post.id && (
                      <div
                        onMouseEnter={() => setHoveredReactionPostId(post.id)}
                        onMouseLeave={() => setHoveredReactionPostId(null)}
                        className="absolute -top-12 left-4 z-20 bg-white border border-slate-200 shadow-xl rounded-full px-3 py-1.5 flex items-center gap-2 animate-in fade-in zoom-in-90 duration-150"
                      >
                        <button
                          onClick={() => handleReact(post.id, 'like')}
                          className="hover:scale-125 transition text-base"
                          title="Like"
                        >
                          👍
                        </button>
                        <button
                          onClick={() => handleReact(post.id, 'celebrate')}
                          className="hover:scale-125 transition text-base"
                          title="Celebrate"
                        >
                          👏
                        </button>
                        <button
                          onClick={() => handleReact(post.id, 'insightful')}
                          className="hover:scale-125 transition text-base"
                          title="Insightful"
                        >
                          💡
                        </button>
                        <button
                          onClick={() => handleReact(post.id, 'love')}
                          className="hover:scale-125 transition text-base"
                          title="Love"
                        >
                          ❤️
                        </button>
                        <button
                          onClick={() => handleReact(post.id, 'curious')}
                          className="hover:scale-125 transition text-base"
                          title="Curious"
                        >
                          🤔
                        </button>
                      </div>
                    )}

                    {/* Like / React Trigger */}
                    <div
                      className="relative"
                      onMouseEnter={() => setHoveredReactionPostId(post.id)}
                    >
                      <button
                        onClick={() => handleReact(post.id, post.userReaction || 'like')}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                          post.userReaction
                            ? 'text-brand-600 bg-brand-50'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {post.userReaction === 'celebrate' && <span>👏 Celebrate</span>}
                        {post.userReaction === 'insightful' && <span>💡 Insightful</span>}
                        {post.userReaction === 'love' && <span>❤️ Love</span>}
                        {post.userReaction === 'curious' && <span>🤔 Curious</span>}
                        {(!post.userReaction || post.userReaction === 'like') && (
                          <>
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>Like</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Comment button */}
                    <button
                      onClick={() =>
                        setExpandedComments((prev) => ({
                          ...prev,
                          [post.id]: !prev[post.id],
                        }))
                      }
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Discuss ({post.comments.length})</span>
                    </button>

                    {/* Repost / Share button */}
                    <button
                      onClick={() => handleShare(post)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>

                    {/* Bookmark button */}
                    <button
                      onClick={() => handleToggleBookmark(post.id)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                        post.isBookmarked
                          ? 'text-indigo-600 bg-indigo-50'
                          : 'text-slate-500 hover:bg-slate-50'
                      }`}
                      title={post.isBookmarked ? 'Bookmarked' : 'Save post'}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${post.isBookmarked ? 'fill-indigo-600' : ''}`}
                      />
                      <span className="hidden sm:inline">Save</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  {isCommentsOpen && (
                    <div className="bg-slate-50/80 p-4 border-t border-slate-100 space-y-3">
                      {/* New Comment Input */}
                      <div className="flex items-center gap-2">
                        <img
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                          alt="You"
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={commentInputs[post.id] || ''}
                            onChange={(e) =>
                              setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleAddComment(post.id);
                              }
                            }}
                            placeholder="Add a constructive thought or question..."
                            className="w-full text-xs p-2 pr-16 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-brand-600 hover:text-brand-700"
                          >
                            Reply
                          </button>
                        </div>
                      </div>

                      {/* Comment List */}
                      {post.comments.map((c) => (
                        <div key={c.id} className="flex items-start gap-2.5 pt-2">
                          <img
                            src={c.authorAvatar}
                            alt={c.authorName}
                            className="w-7 h-7 rounded-full object-cover border border-slate-200 mt-0.5"
                          />
                          <div className="flex-1 bg-white p-3 rounded-xl border border-slate-200 text-xs">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                                <span>{c.authorName}</span>
                                <span className="text-[10px] text-slate-400 font-normal">
                                  • {c.authorCollege} ({c.authorYear})
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                            </div>
                            <p className="mt-1 text-slate-700">{c.content}</p>
                            <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
                              <button className="hover:text-brand-600 font-medium">👍 Helpful ({c.likes})</button>
                              <span>•</span>
                              <button className="hover:text-slate-700">Reply</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>

        {/* Right Sidebar Column: Active College Community & Trending */}
        <div className="space-y-6">
          {/* Current College Community Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Building className="w-5 h-5 text-brand-600" />
              <h2 className="text-sm font-bold text-slate-900">Your College Community</h2>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50 mb-4">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80"
                alt="IIT Bombay"
                className="w-full h-24 object-cover"
              />
              <div className="p-3">
                <div className="text-sm font-bold text-slate-900">IIT Bombay (Powai Campus)</div>
                <div className="text-xs text-slate-500">Tier-1 • NIRF Rank #3 • 12.5k Members</div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>340 students active right now</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Class of 2026 Channel</span>
                <span className="font-semibold text-brand-600">854 peers</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">CSE Branch Group</span>
                <span className="font-semibold text-brand-600">320 peers</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Placement Prep Cell</span>
                <span className="font-semibold text-brand-600">Active Daily</span>
              </div>
            </div>
          </div>

          {/* Quick Stats: University Comparison Snapshot */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider">
                Placement Insights
              </span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">2025 Data</span>
            </div>
            <div className="text-base font-bold">IIT Bombay CSE vs BITS Pilani CS</div>
            <p className="text-xs text-slate-300 mt-1">
              IIT Bombay CSE median ₹31.0 LPA (98.4% placed) vs BITS Pilani CS median ₹28.5 LPA (98.1% placed).
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">Explore full placement analytics</span>
              <span className="text-xs font-bold text-brand-400 hover:underline cursor-pointer">
                Compare →
              </span>
            </div>
          </div>

          {/* Guidelines for Student Network */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <span>UniSphere Student Honor Code</span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Every post is verified with college credentials. Be respectful, share reproducible code and genuine interview experiences, and mentor junior batches.
            </p>
          </div>
        </div>
      </div>

      {/* Story Lightbox Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl animate-in zoom-in-95">
            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-4 right-4 z-30 p-2 bg-black/60 rounded-full text-white hover:bg-black"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative h-80">
              <img
                src={activeStory.imageUrl}
                alt={activeStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <img
                  src={activeStory.avatarUrl}
                  alt={activeStory.authorName}
                  className="w-8 h-8 rounded-full border border-white"
                />
                <div>
                  <div className="text-xs font-bold text-white">{activeStory.authorName}</div>
                  <div className="text-[10px] text-slate-300">
                    {activeStory.collegeName} • {activeStory.timestamp}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-500 text-white mb-2 inline-block">
                  {activeStory.category}
                </span>
                <h3 className="text-lg font-bold text-white">{activeStory.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {activeStory.highlightText}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
              <span>UniSphere Campus Stories</span>
              <button
                onClick={() => setActiveStory(null)}
                className="px-4 py-1.5 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
