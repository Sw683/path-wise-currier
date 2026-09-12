import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PostCard } from '../feed/PostCard';
import { 
  Users, 
  Building2, 
  ShieldCheck, 
  PlusCircle, 
  Share2, 
  Bell, 
  Check, 
  Layers, 
  GraduationCap, 
  Compass, 
  ArrowLeft 
} from 'lucide-react';

export const CommunityView: React.FC = () => {
  const { 
    communities, 
    selectedCommunityId, 
    setSelectedCommunityId, 
    handleToggleJoinCommunity, 
    posts, 
    setIsCreatePostOpen,
    students,
    currentUser,
    handleSendConnection,
    connectedStudentIds
  } = useApp();

  const [activeTab, setActiveTab] = useState<'feed' | 'members' | 'channels'>('feed');

  // Currently viewed community or fallback to first
  const currentCommunity = communities.find(c => c.id === selectedCommunityId) || communities[0];

  // Community-specific posts
  const communityPosts = posts.filter(p => 
    p.communityId === currentCommunity.id || 
    p.communityName === currentCommunity.name
  );

  // Sub-channels or related communities
  const relatedChannels = communities.filter(c => 
    c.parentCommunityId === currentCommunity.id || 
    (currentCommunity.parentCommunityId && c.parentCommunityId === currentCommunity.parentCommunityId)
  );

  // Community members (sample matched students)
  const communityMembers = students.filter(s => 
    s.universityName.includes(currentCommunity.universityName.split(' ')[0]) || 
    currentCommunity.type === 'interest'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Community Selector Bar (Hierarchy Drill-down) */}
      <div className="mb-6 bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-2">
            Switch Community:
          </span>
          <div className="flex items-center gap-1.5">
            {communities.map(comm => {
              const isSelected = comm.id === currentCommunity.id;
              return (
                <button
                  key={comm.id}
                  onClick={() => setSelectedCommunityId(comm.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{comm.name}</span>
                  {comm.isJoined && (
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-300' : 'bg-emerald-500'}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Community Banner & Hero */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs mb-6">
        <div className="h-44 sm:h-56 relative overflow-hidden">
          <img
            src={currentCommunity.banner}
            alt={currentCommunity.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/30">
            {currentCommunity.category}
          </div>
        </div>

        {/* Info header bar */}
        <div className="p-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 sm:-mt-16 mb-4">
            <div className="flex items-end gap-4">
              <img
                src={currentCommunity.avatar}
                alt={currentCommunity.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white shadow-xl bg-white"
              />
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    {currentCommunity.name}
                  </h1>
                  {currentCommunity.isOfficial && (
                    <span title="Official Verified Community" className="text-indigo-600">
                      <ShieldCheck className="w-5 h-5 fill-indigo-100" />
                    </span>
                  )}
                </div>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  🏛️ {currentCommunity.universityName} {currentCommunity.collegeName ? `• ${currentCommunity.collegeName}` : ''}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleToggleJoinCommunity(currentCommunity.id)}
                className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  currentCommunity.isJoined
                    ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20'
                }`}
              >
                {currentCommunity.isJoined ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Joined Community</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>Join Community</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsCreatePostOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                Create Post
              </button>
            </div>
          </div>

          {/* Description & Metrics */}
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            {currentCommunity.description}
          </p>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
            <div>
              <strong className="text-slate-900 font-bold">{currentCommunity.memberCount.toLocaleString()}</strong> Members
            </div>
            <div>
              <strong className="text-emerald-600 font-bold">{currentCommunity.recentActiveCount}</strong> Active this week
            </div>
            <div>
              Tier: <strong className="text-slate-900 font-bold capitalize">{currentCommunity.type} Hub</strong>
            </div>
          </div>

          {/* Sub Tabs */}
          <div className="mt-6 flex border-b border-slate-200 space-x-6 text-xs font-bold">
            <button
              onClick={() => setActiveTab('feed')}
              className={`pb-3 border-b-2 transition-all ${
                activeTab === 'feed'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Community Feed ({communityPosts.length})
            </button>
            <button
              onClick={() => setActiveTab('channels')}
              className={`pb-3 border-b-2 transition-all ${
                activeTab === 'channels'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Sub-Channels & Batches ({relatedChannels.length})
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`pb-3 border-b-2 transition-all ${
                activeTab === 'members'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Active Roster ({communityMembers.length})
            </button>
          </div>

        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'feed' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {communityPosts.length > 0 ? (
              communityPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
                <Users className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800">No posts in this specific channel yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Be the first student to share an announcement, notes, or project proposal in {currentCommunity.name}!
                </p>
                <button
                  onClick={() => setIsCreatePostOpen(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700"
                >
                  Write First Community Post
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Guidelines & Moderator Info */}
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                Community Guidelines
              </h4>
              <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
                <li>Share verified study material, hackathon notices, and internship leads.</li>
                <li>Respect peer privacy: do not share private contact info or sensitive exam papers.</li>
                <li>Commercial spam is automatically flagged by student moderators.</li>
              </ul>
            </div>

            <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 text-xs text-indigo-950">
              <span className="font-bold block mb-1">🛡️ Moderator Roster</span>
              <p className="text-slate-600">
                Managed by campus student council heads & departmental faculty coordinators.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Channels Tab */}
      {activeTab === 'channels' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {communities.map(c => (
            <div
              key={c.id}
              className={`p-4 bg-white rounded-2xl border transition-all ${
                c.id === currentCommunity.id ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{c.name}</h4>
                  <span className="text-[10px] text-indigo-600 font-semibold uppercase">{c.type}</span>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{c.description}</p>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">{c.memberCount} members</span>
                    <button
                      onClick={() => {
                        setSelectedCommunityId(c.id);
                        setActiveTab('feed');
                      }}
                      className="text-xs font-bold text-indigo-600 hover:underline"
                    >
                      Enter Channel →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {communityMembers.map(student => {
            const isConnected = connectedStudentIds.includes(student.id);
            return (
              <div key={student.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-start gap-3">
                  <img src={student.avatar} alt={student.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100" />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                      {student.name}
                      {student.verification.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-tight">{student.headline.split('|')[0]}</p>
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded-md font-medium mt-1 inline-block">
                      {student.currentYear} • {student.department}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {student.skills.slice(0, 3).map(sk => (
                    <span key={sk.name} className="text-[10px] bg-indigo-50 text-indigo-800 px-2 py-0.5 rounded-md font-medium">
                      {sk.name}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">{student.projectsCount} projects</span>
                  {student.id !== currentUser.id && (
                    <button
                      onClick={() => handleSendConnection(student.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                        isConnected
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                      }`}
                    >
                      {isConnected ? 'Connected' : 'Connect'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
