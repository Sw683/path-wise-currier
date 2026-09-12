import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Users, 
  Sparkles, 
  FolderGit2, 
  UserCheck, 
  Award, 
  BarChart3, 
  Briefcase, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Globe2, 
  CheckCircle2, 
  Layers, 
  Code2, 
  Zap, 
  Building2 
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveView, setIsAuthModalOpen, setIsOnboardingOpen, handleLoginAs } = useApp();

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-gradient-to-b from-white via-indigo-50/40 to-slate-50 border-b border-slate-200">
        
        {/* Background glow accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-indigo-200/40 via-violet-200/30 to-emerald-100/30 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Tag & Institution Banner */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-900 text-xs font-bold mb-6 animate-pulse-subtle">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>CampusNexus • Academic & Career Student Network</span>
          </div>

          {/* Main Title & Tagline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 max-w-4xl mx-auto leading-tight">
            The Network Where Students{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent">
              Build Their Future Together.
            </span>
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-indigo-900 mt-4">
            "Connect. Learn. Build. Grow Together."
          </p>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
            Connecting students across schools, colleges, universities, departments, and academic societies. 
            Find teammates, join your college batch communities, discover real projects, and unlock curated fellowships.
          </p>

          {/* Prominent Primary CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => {
                setIsAuthModalOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-indigo-600/30 hover:scale-102 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>CREATE ACCOUNT</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-base rounded-2xl border-2 border-slate-300 shadow-sm hover:border-indigo-400 transition-all cursor-pointer"
            >
              SIGN IN
            </button>
          </div>

          {/* Direct Quick Exploration Links */}
          <div className="mt-10 pt-8 border-t border-slate-200/80 max-w-4xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Explore Live Modules Directly
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
              <button
                onClick={() => setActiveView('communities')}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <Users className="w-3.5 h-3.5 text-indigo-500" />
                <span>Explore Communities</span>
              </button>
              <button
                onClick={() => setActiveView('projects')}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>Explore Projects</span>
              </button>
              <button
                onClick={() => setActiveView('teammates')}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Find Teammates</span>
              </button>
              <button
                onClick={() => setActiveView('fellowships')}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Fellowships & Funding</span>
              </button>
              <button
                onClick={() => setActiveView('journeys')}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <Briefcase className="w-3.5 h-3.5 text-violet-500" />
                <span>Placed Journeys</span>
              </button>
              <button
                onClick={() => setActiveView('analytics')}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <BarChart3 className="w-3.5 h-3.5 text-cyan-500" />
                <span>Universities</span>
              </button>
              <button
                onClick={() => setActiveView('mentor')}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold hover:bg-indigo-100 transition-all flex items-center gap-1.5 shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI Mentor</span>
              </button>
            </div>
          </div>

          {/* Quick Demo Test Access */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="text-xs text-slate-500">Want to test the full logged-in experience?</span>
            <button
              onClick={() => handleLoginAs('student')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline flex items-center gap-1"
            >
              <span>Instant 1-Click Demo Login</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </section>

      {/* CORE VALUE PILLARS (10 SECTIONS SUMMARY) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            A Complete Academic Ecosystem for Every Student
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Not just an AI chatbot — CampusNexus connects your campus life, projects, and career aspirations into one cohesive network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Connect with students */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Connect with Students</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Discover classmates, seniors, and peers across schools, colleges, and central universities. Exchange notes, advice, and project ideas.
            </p>
          </div>

          {/* 2. Join College Community */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">2. College Community Hub</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Every college automatically has a connected hierarchy: DU → Kirori Mal → Computer Science → 2nd Year Batch channels.
            </p>
          </div>

          {/* 3. Discover Projects */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">3. Real Student Projects</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Explore student-built software, robotics, and social ventures. Categorized cleanly with Free, Paid, and Request Access models.
            </p>
          </div>

          {/* 4. Find Teammates */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">4. Smart Team Formation</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              "I know HTML & CSS. I need a backend engineer." The system calculates complementary recommendation scores to build balanced hackathon squads.
            </p>
          </div>

          {/* 5. Share Skills & Portfolios */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">5. Dynamic Student Portfolios</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Profile strength indicators (78%), proficiency ratings, verified badges, and privacy controls designed to impress recruiters and mentors.
            </p>
          </div>

          {/* 6. Discover Opportunities */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">6. National Hackathons & Events</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Never miss Smart India Hackathon, Google Summer of Code, or inter-college fests. Join vetted rosters before application deadlines.
            </p>
          </div>

          {/* 7. Learn from Placed Students */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">7. Placed Student Blueprints</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Read transparent prep roadmaps from placed seniors at Razorpay, Microsoft Research, and tier-1 tech firms without gatekeeping.
            </p>
          </div>

          {/* 8. Find Fellowships & Funding */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">8. Fellowship & Grant Center</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Submit your project or startup idea. Match directly with non-dilutive student grants (DST NIDHI-EIR, pre-seed incubators, and campus funds).
            </p>
          </div>

          {/* 9. University Insights & Comparisons */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">9. Responsible University Analytics</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Compare project velocity, internship outcomes, and skill trends with transparent source badges. No biased claims, pure verified data.
            </p>
          </div>

        </div>

        {/* 10. AI Career Mentor Highlight Box */}
        <div className="mt-8 p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-300 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Context-Aware AI Guidance</span>
            </div>
            <h3 className="text-2xl font-black">10. Supportive AI Career Mentor</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Analyzes your current year, skills, and aspirations to offer non-dogmatic roadmaps: "You may be interested in exploring distributed systems..." rather than rigid claims.
            </p>
          </div>
          <button
            onClick={() => setActiveView('mentor')}
            className="px-6 py-3 bg-white text-indigo-950 font-extrabold text-xs rounded-xl shadow-md hover:bg-indigo-50 transition-all shrink-0 cursor-pointer"
          >
            Launch AI Mentor Console
          </button>
        </div>

      </section>

      {/* STUDENT FIRST PHILOSOPHY BANNER */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Our Core Product Principle
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            "A student does not need to be an expert to belong."
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-bold text-slate-700">
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg">Student</span>
            <span className="text-indigo-400">→</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg">Learning</span>
            <span className="text-indigo-400">→</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg">Skills</span>
            <span className="text-indigo-400">→</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg">Projects</span>
            <span className="text-indigo-400">→</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg">Collaboration</span>
            <span className="text-indigo-400">→</span>
            <span className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg">Career Opportunities</span>
          </div>
          <p className="text-xs text-slate-500 mt-5 max-w-xl mx-auto">
            From Class 8 exploration to final-year placements, find the exact peers, seniors, and projects that match where you stand today.
          </p>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 text-center bg-gradient-to-b from-slate-50 to-indigo-50/50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">
            Ready to Build Your Academic Network?
          </h2>
          <p className="text-sm text-slate-600 mt-3">
            Join thousands of students collaborating across central universities, engineering institutes, and research labs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-indigo-600/30 hover:scale-102 transition-all cursor-pointer"
            >
              Join the Student Network
            </button>
            <button
              onClick={() => setActiveView('feed')}
              className="px-6 py-4 bg-white border border-slate-300 text-slate-700 font-bold text-sm rounded-2xl hover:border-indigo-500 transition-colors cursor-pointer"
            >
              Browse Public Feed First
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
