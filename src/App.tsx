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

export const App: React.FC = () => {
  const { activeTab, role } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-brand-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
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

      <Footer />
    </div>
  );
};

export default App;
