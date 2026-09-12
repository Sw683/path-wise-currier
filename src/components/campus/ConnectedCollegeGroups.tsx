import React, { useState } from 'react';
import { COLLEGES, COLLEGE_STORIES } from '../../data/campusData';
import { useCampus } from '../../context/CampusContext';
import { useApp } from '../../context/AppContext';
import {
  Building,
  Users,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  MessageCircle,
  Video,
  Image as ImageIcon,
  Share2,
  ExternalLink,
  Plus,
  Send,
  GraduationCap,
  Flame,
  Award,
} from 'lucide-react';

export const ConnectedCollegeGroups: React.FC = () => {
  const {
    joinedCollegeGroupIds,
    toggleJoinCollegeGroup,
    selectedCollegeGroup,
    setSelectedCollegeGroup,
  } = useCampus();
  const { setActiveTab } = useApp();

  const [shoutoutInputs, setShoutoutInputs] = useState<{ [collegeId: string]: string }>({});
  const [collegeShoutouts, setCollegeShoutouts] = useState<{
    [collegeId: string]: { id: string; author: string; branch: string; text: string; time: string }[];
  }>({
    'iit-bombay': [
      { id: 's1', author: 'Aditya (CSE)', branch: '3rd Year', text: 'Hackathon team meeting tonight at 9 PM in Tinkerer Lab!', time: '12m ago' },
      { id: 's2', author: 'Snehal (Elec)', branch: '2nd Year', text: 'Anyone has last year’s Digital Signal Processing quiz solutions?', time: '35m ago' },
    ],
    'bits-pilani': [
      { id: 's3', author: 'Varun (Mech)', branch: '4th Year', text: 'Oasis fest sponsorship committee registration closes at 5 PM.', time: '1h ago' },
    ],
  });

  const activeCollege = COLLEGES.find((c) => c.id === selectedCollegeGroup) || COLLEGES[0];
  const isMember = joinedCollegeGroupIds.includes(activeCollege.id);

  // College-specific stories
  const collegeStories = COLLEGE_STORIES.filter(
    (s) => s.collegeId === activeCollege.id || s.collegeName.includes(activeCollege.shortName)
  );

  const handlePostShoutout = (collegeId: string) => {
    const text = shoutoutInputs[collegeId]?.trim();
    if (!text) return;

    const newShoutout = {
      id: `shout-${Date.now()}`,
      author: 'Aryan Sharma (You)',
      branch: 'CSE Class of 2026',
      text,
      time: 'Just now',
    };

    setCollegeShoutouts((prev) => ({
      ...prev,
      [collegeId]: [newShoutout, ...(prev[collegeId] || [])],
    }));

    setShoutoutInputs((prev) => ({ ...prev, [collegeId]: '' }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950 to-indigo-950 text-white p-6 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
              <Flame className="w-3 h-3 text-rose-400" />
              Instagram-Style Campus Groups
            </span>
            <span className="text-xs text-slate-400">Interconnected College Ecosystem</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Connected College Groups & Stories
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Every college has its own connected group, branch channels, daily campus stories, and live student shoutouts. Jump between universities or enter your own campus hub.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-center min-w-[110px]">
            <div className="text-xs text-slate-300">Joined Groups</div>
            <div className="text-xl font-bold text-rose-400">{joinedCollegeGroupIds.length} Campus</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-center min-w-[110px]">
            <div className="text-xs text-slate-300">Network Total</div>
            <div className="text-xl font-bold text-white">7 Premier Unis</div>
          </div>
        </div>
      </div>

      {/* College Switcher Carousel */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <span>Select Connected College Group:</span>
          <span className="text-slate-400">Tap to open campus hub</span>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {COLLEGES.map((c) => {
            const isSelected = c.id === selectedCollegeGroup;
            const hasJoined = joinedCollegeGroupIds.includes(c.id);

            return (
              <button
                key={c.id}
                onClick={() => setSelectedCollegeGroup(c.id)}
                className={`flex items-center gap-2.5 p-2 pr-4 rounded-2xl border transition duration-150 flex-shrink-0 text-left ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-102'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <img
                  src={c.logo}
                  alt={c.name}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200/50"
                />
                <div>
                  <div className="text-xs font-bold truncate max-w-[140px]">{c.shortName}</div>
                  <div className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                    {hasJoined ? '✓ Joined Member' : c.location.split(',')[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active College Hub View */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Cover Banner */}
        <div className="relative h-48 sm:h-64 bg-slate-900">
          <img
            src={activeCollege.coverImage}
            alt={activeCollege.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={activeCollege.logo}
                alt={activeCollege.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-lg"
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-white">{activeCollege.name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur-md">
                    {activeCollege.tier}
                  </span>
                </div>
                <p className="text-xs text-slate-200 mt-1">
                  {activeCollege.location} • NIRF Rank #{activeCollege.nirfRank} •{' '}
                  {activeCollege.totalStudents.toLocaleString()} Total Students
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleJoinCollegeGroup(activeCollege.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md transition ${
                  isMember
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-brand-500 text-white hover:bg-brand-600'
                }`}
              >
                {isMember ? '✓ Joined College Group' : '+ Join College Group'}
              </button>

              <button
                onClick={() => setActiveTab('campus-feed')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white/20 text-white hover:bg-white/30 backdrop-blur-md transition"
              >
                View Feed
              </button>
            </div>
          </div>
        </div>

        {/* Group Sub-Sections */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2 cols): Branches & Stories */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campus Stories Carousel for this college */}
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>Campus Highlight Stories</span>
              </h3>

              {collegeStories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {collegeStories.map((story) => (
                    <div
                      key={story.id}
                      className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-2xs group hover:border-slate-300 transition"
                    >
                      <div className="relative h-36">
                        <img
                          src={story.imageUrl}
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                        />
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md">
                          {story.category}
                        </span>
                      </div>
                      <div className="p-3">
                        <div className="text-xs font-bold text-slate-900">{story.title}</div>
                        <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                          {story.highlightText}
                        </p>
                        <div className="text-[10px] text-slate-400 mt-2">
                          Posted by {story.authorName} • {story.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
                  Daily highlight stories active for {activeCollege.shortName}. Students can post story updates during fests and hackathons.
                </div>
              )}
            </div>

            {/* Branch Channels in this College */}
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                <span>Branch-wise Community Channels</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeCollege.branches.map((branch, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between hover:border-slate-300 transition cursor-pointer"
                    onClick={() => setActiveTab('campus-feed')}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">{branch}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Class of 2025, 2026, 2027 & 2028 Channels
                      </div>
                    </div>
                    <span className="text-xs text-brand-600 font-bold hover:underline">
                      Open →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Campus Shoutouts & Announcements */}
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Live Campus Shoutouts</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Shoutout input */}
              <div className="space-y-1.5">
                <input
                  type="text"
                  value={shoutoutInputs[activeCollege.id] || ''}
                  onChange={(e) =>
                    setShoutoutInputs((prev) => ({ ...prev, [activeCollege.id]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePostShoutout(activeCollege.id);
                  }}
                  placeholder={`Drop a quick message for ${activeCollege.shortName} peers...`}
                  className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
                <button
                  onClick={() => handlePostShoutout(activeCollege.id)}
                  className="w-full py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-black transition shadow-xs"
                >
                  Send Shoutout
                </button>
              </div>

              {/* List */}
              <div className="space-y-2 pt-2 max-h-72 overflow-y-auto">
                {(collegeShoutouts[activeCollege.id] || []).map((shout) => (
                  <div
                    key={shout.id}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs shadow-2xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-900">{shout.author}</span>
                      <span className="text-slate-400">{shout.time}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-[11px]">{shout.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick College Placement Summary */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-4 shadow-sm space-y-2">
              <span className="text-[10px] font-bold text-brand-300 uppercase tracking-wider">
                Placement Overview
              </span>
              <div className="text-xs text-slate-200 leading-relaxed">
                Check branch-wise placement packages, top recruiters, and median packages in the Placement Comparison module.
              </div>
              <button
                onClick={() => setActiveTab('campus-compare')}
                className="text-xs font-bold text-brand-400 hover:underline inline-block pt-1"
              >
                Inspect {activeCollege.shortName} Placement Stats →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
