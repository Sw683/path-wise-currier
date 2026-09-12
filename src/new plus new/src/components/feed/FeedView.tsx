import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PostCard } from './PostCard';
import { 
  Sparkles, 
  PlusCircle, 
  Users, 
  FolderGit2, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Briefcase, 
  BookOpen, 
  Search, 
  GraduationCap 
} from 'lucide-react';
import { MOCK_FELLOWSHIPS } from '../../data/mockFellowships';

export const FeedView: React.FC = () => {
  const { 
    currentUser, 
    posts, 
    communities, 
    setIsCreatePostOpen, 
    setIsCreateProjectOpen, 
    setActiveView, 
    setSelectedCommunityId,
    students,
    connectedStudentIds,
    handleSendConnection,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'projects' | 'achievements' | 'polls'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'projects' && post.postType !== 'project') return false;
    if (activeTab === 'achievements' && post.postType !== 'achievement') return false;
    if (activeTab === 'polls' && post.postType !== 'poll') return false;

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const matchesContent = post.content.toLowerCase().includes(q);
      const matchesAuthor = post.author.name.toLowerCase().includes(q) || post.author.institution.toLowerCase().includes(q);
      const matchesTags = post.tags?.some(t => t.toLowerCase().includes(q));
      return matchesContent || matchesAuthor || matchesTags;
    }

    return true;
  });

  const myJoinedCommunities = communities.filter(c => c.isJoined);

  // Recommended students to connect with
  const recommendedPeers = students.filter(s => s.id !== currentUser.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Profile summary & College Community shortcuts */}
        <aside className="hidden lg:block lg:col-span-3 space-y-5 sticky top-24">
          
          {/* Student Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            {/* Top gradient cover */}
            <div className="h-16 bg-gradient-to-r from-indigo-600 to-violet-600 relative" />
            <div className="p-4 pt-0 text-center relative">
              <div className="relative inline-block -mt-8 mb-2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-md mx-auto"
                />
                {currentUser.verification.isVerified && (
                  <span className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 text-emerald-600 shadow-xs" title="Verified Student">
                    <ShieldCheck className="w-4 h-4 fill-emerald-100" />
                  </span>
                )}
              </div>

              <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                {currentUser.name}
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                {currentUser.headline}
              </p>

              {/* Institution badge */}
              <div className="mt-2.5 py-1 px-2 rounded-lg bg-slate-50 border border-slate-200/80 text-[10px] text-slate-700 font-semibold">
                🏛️ {currentUser.universityName}
              </div>

              {/* Profile Strength */}
              <div className="mt-3 pt-3 border-t border-slate-100 text-left">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-600">Profile Strength</span>
                  <span className="font-bold text-indigo-600">{currentUser.profileStrength}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all"
                    style={{ width: `${currentUser.profileStrength}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5">
                  "Add your projects to make your profile more useful for finding teammates."
                </p>
              </div>

              <button
                onClick={() => setActiveView('profile')}
                className="mt-3 w-full py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
              >
                View Full Portfolio →
              </button>
            </div>
          </div>

          {/* AI Mentor Quick Prompt Widget (Section 24) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 rounded-lg bg-indigo-500/30 text-indigo-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-indigo-200">
                AI Academic Mentor
              </h4>
            </div>
            <p className="text-xs text-slate-200 mb-3 font-medium">
              "What would you like help with today?"
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold">
              <button
                onClick={() => setActiveView('mentor')}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-colors"
              >
                🎯 Career
              </button>
              <button
                onClick={() => setActiveView('mentor')}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-colors"
              >
                ⚡ Skills
              </button>
              <button
                onClick={() => setActiveView('mentor')}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-colors"
              >
                🛠️ Projects
              </button>
              <button
                onClick={() => setActiveView('teammates')}
                className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-left transition-colors"
              >
                🤝 Team
              </button>
            </div>
          </div>

          {/* Your College Communities */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>Your Communities</span>
              </h4>
              <button
                onClick={() => setActiveView('communities')}
                className="text-[11px] font-bold text-indigo-600 hover:underline"
              >
                All ({communities.length})
              </button>
            </div>

            <div className="space-y-2">
              {myJoinedCommunities.slice(0, 4).map(comm => (
                <button
                  key={comm.id}
                  onClick={() => {
                    setSelectedCommunityId(comm.id);
                    setActiveView('communities');
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2.5"
                >
                  <img src={comm.avatar} alt={comm.name} className="w-7 h-7 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-800 truncate">{comm.name}</p>
                    <p className="text-[10px] text-slate-400">{comm.category}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* CENTER COLUMN: Main Social Feed */}
        <main className="lg:col-span-6 space-y-4">
          
          {/* Create Post Prompt Box */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
              />
              <button
                onClick={() => setIsCreatePostOpen(true)}
                className="flex-1 text-left px-4 py-2.5 rounded-xl bg-slate-100/80 hover:bg-slate-100 text-slate-500 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                Start a post, share a project, or create a poll...
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-around text-xs font-semibold text-slate-600">
              <button
                onClick={() => setIsCreatePostOpen(true)}
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors py-1 px-2 rounded-lg hover:bg-indigo-50"
              >
                <FolderGit2 className="w-4 h-4 text-indigo-500" />
                <span>Project Launch</span>
              </button>
              <button
                onClick={() => setIsCreatePostOpen(true)}
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors py-1 px-2 rounded-lg hover:bg-indigo-50"
              >
                <Award className="w-4 h-4 text-amber-500" />
                <span>Achievement</span>
              </button>
              <button
                onClick={() => setIsCreatePostOpen(true)}
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors py-1 px-2 rounded-lg hover:bg-indigo-50"
              >
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>Class Poll</span>
              </button>
            </div>
          </div>

          {/* Feed Filter Tabs & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-1 w-full sm:w-auto overflow-x-auto">
              {[
                { id: 'all', label: 'All Feed' },
                { id: 'projects', label: '🚀 Projects' },
                { id: 'achievements', label: '🎉 Placements' },
                { id: 'polls', label: '📊 Polls' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder="Filter posts & tags..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Posts Stream */}
          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                <FolderGit2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-700">No posts matched this filter</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Try switching categories or write the first post!
                </p>
              </div>
            )}
          </div>

        </main>

        {/* RIGHT COLUMN: Recommended Teammates & Fellowships Spotlight */}
        <aside className="hidden lg:block lg:col-span-3 space-y-5 sticky top-24">
          
          {/* Find Teammates Spotlight */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Recommended Peers</span>
              </h4>
              <button
                onClick={() => setActiveView('teammates')}
                className="text-[11px] font-bold text-indigo-600 hover:underline"
              >
                Match
              </button>
            </div>

            <div className="space-y-3">
              {recommendedPeers.map(peer => {
                const isConnected = connectedStudentIds.includes(peer.id);
                return (
                  <div key={peer.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                    <div className="flex items-start gap-2.5">
                      <img src={peer.avatar} alt={peer.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200" />
                      <div className="min-w-0 flex-1">
                        <h5 className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                          {peer.name}
                          {peer.verification.isVerified && <ShieldCheck className="w-3 h-3 text-emerald-600" />}
                        </h5>
                        <p className="text-[10px] text-slate-500 truncate">{peer.universityName}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {peer.skills.slice(0, 2).map(sk => (
                        <span key={sk.name} className="text-[9px] bg-white border border-slate-200 text-slate-700 px-1.5 py-0.2 rounded-md font-medium">
                          {sk.name}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded-sm">
                        {peer.collaboration.availabilityHoursPerWeek}h/wk open
                      </span>
                      <button
                        onClick={() => handleSendConnection(peer.id)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                          isConnected 
                            ? 'bg-slate-200 text-slate-700' 
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                      >
                        {isConnected ? 'Connected' : 'Connect'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setActiveView('network')}
              className="mt-3 w-full py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors text-center block"
            >
              Explore All Students →
            </button>
          </div>

          {/* Active Grants & Fellowships Spotlight */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Featured Grants</span>
              </h4>
              <button
                onClick={() => setActiveView('fellowships')}
                className="text-[11px] font-bold text-indigo-600 hover:underline"
              >
                View
              </button>
            </div>

            <div className="space-y-2.5">
              {MOCK_FELLOWSHIPS.slice(0, 2).map(fel => (
                <div key={fel.id} className="p-2.5 rounded-xl border border-amber-100 bg-amber-50/40 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-amber-800 font-bold mb-1">
                    <span>{fel.type.toUpperCase()}</span>
                    <span className="text-slate-500">Closes {fel.deadline}</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-xs line-clamp-1">{fel.title}</h5>
                  <p className="text-emerald-700 font-bold text-[11px] mt-0.5">{fel.fundingAmount}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveView('fellowships')}
              className="mt-3 w-full py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-50 rounded-xl transition-colors text-center block"
            >
              Submit Idea for Funding →
            </button>
          </div>

        </aside>

      </div>
    </div>
  );
};
