import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { FeedView } from './components/feed/FeedView';
import { CommunityView } from './components/communities/CommunityView';
import { GlobalNetwork } from './components/network/GlobalNetwork';
import { TeammateFinder } from './components/network/TeammateFinder';
import { ProjectsExplorer } from './components/projects/ProjectsExplorer';
import { StudentJourneys } from './components/journeys/StudentJourneys';
import { UniversityAnalytics } from './components/analytics/UniversityAnalytics';
import { FellowshipHub } from './components/fellowships/FellowshipHub';
import { AiMentorChat } from './components/mentor/AiMentorChat';
import { ProfileView } from './components/profile/ProfileView';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { CreatePostModal } from './components/feed/CreatePostModal';
import { CreateProjectModal } from './components/projects/CreateProjectModal';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeView, isAuthenticated, toastMessage } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-500 selection:text-white pb-14 lg:pb-0">
      
      {/* Toast Banner Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-semibold animate-in slide-in-from-top-4">
          <span className="text-base">{toastMessage.icon || '✨'}</span>
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* Global Navbar */}
      <Navbar />

      {/* Main View Router */}
      <div className="flex-1">
        {activeView === 'landing' && <LandingPage />}
        {activeView === 'feed' && <FeedView />}
        {activeView === 'communities' && <CommunityView />}
        {activeView === 'network' && <GlobalNetwork />}
        {activeView === 'teammates' && <TeammateFinder />}
        {activeView === 'projects' && <ProjectsExplorer />}
        {activeView === 'journeys' && <StudentJourneys />}
        {activeView === 'fellowships' && <FellowshipHub />}
        {activeView === 'analytics' && <UniversityAnalytics />}
        {activeView === 'mentor' && <AiMentorChat />}
        {activeView === 'profile' && <ProfileView />}
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Bottom Bar */}
      <BottomNav />

      {/* Modals */}
      <AuthModal />
      <OnboardingFlow />
      <CreatePostModal />
      <CreateProjectModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
