import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OnboardingWizard } from './components/OnboardingWizard';
import { RoadmapDashboard } from './components/RoadmapDashboard';
import { PathSimulator } from './components/PathSimulator';
import { CareerTreeVisualizer } from './components/CareerTreeVisualizer';
import { ExamExplorer } from './components/ExamExplorer';
import { ScholarshipFinder } from './components/ScholarshipFinder';
import { SportsNavigator } from './components/SportsNavigator';
import { EarlySkillsBuilder } from './components/EarlySkillsBuilder';
import { CareerMentorChatbot } from './components/CareerMentorChatbot';
import { MentorMarketplace } from './components/MentorMarketplace';
import { CareerComparison } from './components/CareerComparison';
import { KnowledgeInsights } from './components/KnowledgeInsights';
import { ParentDashboard } from './components/ParentDashboard';
import { AdminConsole } from './components/AdminConsole';
import { Footer } from './components/Footer';

import { CampusFeed } from './components/campus/CampusFeed';
import { TeamFormationHub } from './components/campus/TeamFormationHub';
import { PlacementJourneys } from './components/campus/PlacementJourneys';
import { UniversityPlacementCompare } from './components/campus/UniversityPlacementCompare';
import { StudentFellowshipHub } from './components/campus/StudentFellowshipHub';
import { BehavioralCompanyFit } from './components/campus/BehavioralCompanyFit';

export const App: React.FC = () => {
  const { activeTab, role } = useApp();
  const isOnboarding = activeTab === 'assessment';

  return (
    <div className={`${isOnboarding ? 'min-h-screen bg-slate-950' : 'min-h-screen flex flex-col bg-slate-50'} text-slate-900 font-sans selection:bg-brand-500 selection:text-white`}>
      {!isOnboarding && <Navbar />}

      <main className="flex-1">
        {/* Campus Network Routes */}
        {activeTab === 'campus-feed' && <CampusFeed />}
        {activeTab === 'campus-teams' && <TeamFormationHub />}
        {activeTab === 'campus-placements' && <PlacementJourneys />}
        {activeTab === 'campus-compare' && <UniversityPlacementCompare />}
        {activeTab === 'campus-fellowships' && <StudentFellowshipHub />}
        {activeTab === 'campus-profiler' && <BehavioralCompanyFit />}

        {/* Existing Routes */}
        {activeTab === 'home' && <HeroSection />}
        {activeTab === 'assessment' && <OnboardingWizard />}
        {activeTab === 'dashboard' && <RoadmapDashboard />}
        {activeTab === 'simulator' && <PathSimulator />}
        {activeTab === 'tree' && <CareerTreeVisualizer />}
        {activeTab === 'exams' && <ExamExplorer />}
        {activeTab === 'scholarships' && <ScholarshipFinder />}
        {activeTab === 'sports' && <SportsNavigator />}
        {activeTab === 'skills' && <EarlySkillsBuilder />}
        {activeTab === 'chatbot' && <CareerMentorChatbot />}
        {activeTab === 'mentors' && <MentorMarketplace />}
        {activeTab === 'compare' && <CareerComparison />}
        {activeTab === 'knowledge' && <KnowledgeInsights />}
        {activeTab === 'parent' && <ParentDashboard />}
        {activeTab === 'admin' && <AdminConsole />}
      </main>

      {!isOnboarding && <Footer />}
    </div>
  );
};

export default App;
