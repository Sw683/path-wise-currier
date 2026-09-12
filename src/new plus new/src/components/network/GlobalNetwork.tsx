import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  ShieldCheck, 
  UserCheck, 
  FolderGit2, 
  Clock, 
  Sparkles, 
  Mail, 
  ArrowRight, 
  ExternalLink 
} from 'lucide-react';
import { MOCK_UNIVERSITIES } from '../../data/mockUniversities';

export const GlobalNetwork: React.FC = () => {
  const { 
    students, 
    currentUser, 
    connectedStudentIds, 
    handleSendConnection, 
    showToast,
    setActiveView
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [onlyOpenToTeam, setOnlyOpenToTeam] = useState(false);

  // Extract all unique skills across students
  const allSkills = Array.from(
    new Set(students.flatMap(s => s.skills.map(sk => sk.name)))
  ).sort();

  const filteredStudents = students.filter(student => {
    if (student.id === currentUser.id) return false;

    if (selectedUniversity !== 'All' && !student.universityName.includes(selectedUniversity)) {
      return false;
    }

    if (selectedYear !== 'All' && student.currentYear !== selectedYear) {
      return false;
    }

    if (selectedSkill !== 'All' && !student.skills.some(s => s.name.toLowerCase() === selectedSkill.toLowerCase())) {
      return false;
    }

    if (onlyOpenToTeam && !student.collaboration.openToTeam) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = student.name.toLowerCase().includes(q);
      const matchesUni = student.universityName.toLowerCase().includes(q);
      const matchesDept = student.department.toLowerCase().includes(q);
      const matchesSkill = student.skills.some(s => s.name.toLowerCase().includes(q));
      const matchesInterests = student.interests.some(i => i.toLowerCase().includes(q));
      return matchesName || matchesUni || matchesDept || matchesSkill || matchesInterests;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-300 text-xs font-bold mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>Cross-University Student Discovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">GLOBAL STUDENT NETWORK</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            A CSE student from DU can easily discover a UI/UX designer from Anna University or an AI researcher from IIT Delhi.
          </p>
        </div>

        <button
          onClick={() => setActiveView('teammates')}
          className="px-5 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch Teammate Matcher</span>
        </button>
      </div>

      {/* Granular Filters & Natural Search */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-4">
        
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search e.g. 'Find students who know JavaScript and are interested in AI' or by college..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white"
          />
        </div>

        {/* Filter controls row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          
          {/* University */}
          <div>
            <label className="text-slate-500 font-semibold block mb-1">University</label>
            <select
              value={selectedUniversity}
              onChange={e => setSelectedUniversity(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white"
            >
              <option value="All">All Universities</option>
              <option value="Delhi">Delhi University</option>
              <option value="IIT">IIT Delhi</option>
              <option value="BITS">BITS Pilani</option>
              <option value="Anna">Anna University</option>
              <option value="VNIT">VNIT Nagpur</option>
              <option value="DPS">DPS (School)</option>
            </select>
          </div>

          {/* Skill */}
          <div>
            <label className="text-slate-500 font-semibold block mb-1">Specific Skill</label>
            <select
              value={selectedSkill}
              onChange={e => setSelectedSkill(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white"
            >
              <option value="All">All Skills ({allSkills.length})</option>
              {allSkills.map(sk => (
                <option key={sk} value={sk}>{sk}</option>
              ))}
            </select>
          </div>

          {/* Academic Year */}
          <div>
            <label className="text-slate-500 font-semibold block mb-1">Academic Year</label>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white"
            >
              <option value="All">All Years</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="Class 11">Class 11 (School)</option>
            </select>
          </div>

          {/* Open to Collab toggle */}
          <div className="flex items-end">
            <label className="flex items-center gap-2 p-2 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer w-full text-slate-700 font-medium">
              <input
                type="checkbox"
                checked={onlyOpenToTeam}
                onChange={e => setOnlyOpenToTeam(e.target.checked)}
                className="accent-indigo-600 rounded"
              />
              <span className="truncate">Open to Teams Only</span>
            </label>
          </div>

        </div>

        {/* Results count & Active filters */}
        <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
          <span>Found <strong>{filteredStudents.length}</strong> skilled students matching your criteria</span>
          {(selectedUniversity !== 'All' || selectedSkill !== 'All' || selectedYear !== 'All' || onlyOpenToTeam || searchQuery) && (
            <button
              onClick={() => {
                setSelectedUniversity('All');
                setSelectedSkill('All');
                setSelectedYear('All');
                setOnlyOpenToTeam(false);
                setSearchQuery('');
              }}
              className="text-indigo-600 font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

      </div>

      {/* Students Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map(student => {
          const isConnected = connectedStudentIds.includes(student.id);

          return (
            <div
              key={student.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="p-5 space-y-4">
                
                {/* Student Header */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-13 h-13 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-sm text-slate-900 truncate">
                        {student.name}
                      </h3>
                      {student.verification.isVerified && (
                        <span title="Verified Student" className="text-emerald-600 shrink-0">
                          <ShieldCheck className="w-4 h-4 fill-emerald-100" />
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-500 leading-tight truncate mt-0.5">
                      {student.headline}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-[10px] text-indigo-700 font-bold">
                      <span>🏛️ {student.universityName.split('(')[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Branch / Year / Academic Rating */}
                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                    {student.currentYear} • {student.department}
                  </span>
                  {student.academicAssessment && (
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-bold">
                      {student.academicAssessment.level} Level
                    </span>
                  )}
                </div>

                {/* Skills with Proficiencies */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Skills & Proficiency
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {student.skills.map(sk => (
                      <span
                        key={sk.name}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-indigo-50/80 border border-indigo-100 text-indigo-950 text-[11px] font-medium"
                      >
                        <span>{sk.name}</span>
                        <span className="text-[9px] text-indigo-600 font-bold bg-indigo-100/80 px-1 py-0.2 rounded-sm">
                          {sk.level}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Interests
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {student.interests.slice(0, 3).map(interest => (
                      <span key={interest} className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Collaboration Preferences Banner */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{student.collaboration.availabilityHoursPerWeek} hrs/week</span>
                    <span>• {student.collaboration.modes.join('/')}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    student.collaboration.openToTeam 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {student.collaboration.openToTeam ? 'Open to Team' : 'Busy'}
                  </span>
                </div>

              </div>

              {/* Action Buttons: Connect, Invite to Project, Invite to Team */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-100 grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleSendConnection(student.id)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    isConnected
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{isConnected ? 'Connected' : 'Connect'}</span>
                </button>

                <button
                  onClick={() => {
                    showToast(`Invitation sent to ${student.name} to collaborate on your project! 🚀`);
                  }}
                  className="py-2 px-1 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors text-center cursor-pointer"
                >
                  Project Invite
                </button>

                <button
                  onClick={() => {
                    showToast(`Invited ${student.name} to join your hackathon team! 🏆`);
                  }}
                  className="py-2 px-1 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-colors text-center cursor-pointer"
                >
                  Team Invite
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
