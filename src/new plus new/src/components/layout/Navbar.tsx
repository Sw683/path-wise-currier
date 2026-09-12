import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  Users, 
  FolderGit2, 
  Sparkles, 
  GraduationCap, 
  Award, 
  BarChart3, 
  Bell, 
  PlusCircle, 
  Search, 
  Menu, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  LogOut, 
  UserCheck, 
  BookOpen,
  Briefcase
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    isAuthenticated, 
    activeView, 
    setActiveView, 
    setIsAuthModalOpen, 
    setIsOnboardingOpen,
    setIsCreatePostOpen,
    setIsCreateProjectOpen,
    setIsVerificationOpen,
    handleLoginAs,
    handleLogout,
    notifications
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navItems = [
    { id: 'feed', label: 'Home Feed', icon: Compass },
    { id: 'communities', label: 'Communities', icon: Users },
    { id: 'network', label: 'Global Network', icon: GraduationCap },
    { id: 'teammates', label: 'Find Teammates', icon: UserCheck },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'fellowships', label: 'Funding & Grants', icon: Award },
    { id: 'journeys', label: 'Placed Journeys', icon: Briefcase },
    { id: 'analytics', label: 'University Insights', icon: BarChart3 },
    { id: 'mentor', label: 'AI Mentor', icon: Sparkles, badge: 'AI' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-indigo-400/30">
          Campus Network
        </span>
        <span>Connecting students across DU, IITs, BITS, Anna Univ & more</span>
        <span className="hidden sm:inline text-indigo-300">• "Connect. Learn. Build. Grow Together."</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveView(isAuthenticated ? 'feed' : 'landing')} 
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent">
                    CampusNexus
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-sm">
                    Academic
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                  Connect. Learn. Build. Grow Together.
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id as any)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <>
                {/* Create Dropdown or Button */}
                <div className="hidden sm:flex items-center gap-1.5">
                  <button
                    onClick={() => setIsCreatePostOpen(true)}
                    className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm hover:shadow-indigo-500/20 transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Post</span>
                  </button>
                  <button
                    onClick={() => setIsCreateProjectOpen(true)}
                    className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Project</span>
                  </button>
                </div>

                {/* Notifications Bell */}
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus:outline-hidden cursor-pointer"
                    title="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white animate-pulse" />
                    )}
                  </button>

                  {/* Notifications Popover */}
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                        <h4 className="font-semibold text-sm text-slate-900">Notifications</h4>
                        <span className="text-xs text-indigo-600 font-medium">Mark all read</span>
                      </div>
                      <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                        {notifications.map(n => (
                          <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                            <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                            <p className="text-xs text-slate-600 mt-0.5">{n.description}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile & Demo Switcher Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all focus:outline-hidden cursor-pointer"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-300"
                    />
                    <div className="text-left hidden md:block">
                      <p className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1">
                        {currentUser.name}
                        {currentUser.verification.isVerified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
                        )}
                      </p>
                      <p className="text-[10px] text-slate-500 leading-tight truncate max-w-[120px]">
                        {currentUser.department || 'Student'}
                      </p>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 divide-y divide-slate-100 animate-in fade-in">
                      <div className="px-4 py-2">
                        <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                        <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-slate-600">Profile Strength</span>
                          <span className="text-xs font-bold text-indigo-600">{currentUser.profileStrength}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-1.5 rounded-full" 
                            style={{ width: `${currentUser.profileStrength}%` }}
                          />
                        </div>
                      </div>

                      <div className="py-2 px-2">
                        <button
                          onClick={() => {
                            setActiveView('profile');
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg text-left"
                        >
                          <Users className="w-4 h-4 text-indigo-600" />
                          <span>View Full Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsVerificationOpen(true);
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg text-left"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>Verify Student / College ID</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsOnboardingOpen(true);
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg text-left"
                        >
                          <BookOpen className="w-4 h-4 text-indigo-500" />
                          <span>Retake 8-Step Onboarding</span>
                        </button>
                      </div>

                      {/* Demo Persona Switcher */}
                      <div className="py-2 px-3 bg-slate-50">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Quick Demo Switcher
                        </p>
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            onClick={() => {
                              handleLoginAs('student');
                              setIsUserDropdownOpen(false);
                            }}
                            className="text-[11px] font-medium py-1.5 px-2 rounded-md bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 text-center"
                          >
                            👨‍🎓 Student (Aarav)
                          </button>
                          <button
                            onClick={() => {
                              handleLoginAs('faculty');
                              setIsUserDropdownOpen(false);
                            }}
                            className="text-[11px] font-medium py-1.5 px-2 rounded-md bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 text-center"
                          >
                            🧑‍🏫 Faculty (Mehta)
                          </button>
                          <button
                            onClick={() => {
                              handleLoginAs('researcher');
                              setIsUserDropdownOpen(false);
                            }}
                            className="text-[11px] font-medium py-1.5 px-2 rounded-md bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 text-center"
                          >
                            🔬 Researcher (PhD)
                          </button>
                          <button
                            onClick={() => {
                              handleLoginAs('new_student');
                              setIsUserDropdownOpen(false);
                            }}
                            className="text-[11px] font-medium py-1.5 px-2 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold text-center"
                          >
                            ✨ Fresh Onboard
                          </button>
                        </div>
                      </div>

                      <div className="pt-2 px-2">
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Signed Out State */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow-indigo-500/25 transition-all cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 animate-in slide-in-from-top-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id as any);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
