import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  Compass, 
  CheckCircle2, 
  BookOpen, 
  Target, 
  Layers, 
  ArrowRight 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  options?: string[];
  roleMatches?: string[];
  roadmapSteps?: string[];
}

export const AiMentorChat: React.FC = () => {
  const { currentUser, setActiveView, showToast } = useApp();

  const [inputMessage, setInputMessage] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hello ${currentUser.name}! I am your context-aware CampusNexus Academic & Career Mentor.\n\nI have reviewed your profile at ${currentUser.universityName} (${currentUser.currentYear}, ${currentUser.department}). How can we support your academic and technical goals today?`,
      options: [
        'Perform Skill-Gap Analysis',
        'Recommend 2nd/3rd Year Projects',
        'Explore Potential Career Role Matches',
        'Create a Hackathon Prep Checklist',
      ],
    },
  ]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `m-user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');

    // Generate responsive, supportive AI advice
    setTimeout(() => {
      const q = query.toLowerCase();
      let reply: ChatMessage;

      if (q.includes('skill') || q.includes('gap')) {
        reply = {
          id: `m-ai-${Date.now()}`,
          sender: 'ai',
          text: `Based on your current skill profile (${currentUser.skills.map(s => s.name).join(', ')}):\n\n• You have a strong foundation in modern frontend concepts.\n• You may find it beneficial to deepen your asynchronous server architectures (e.g. Node.js Streams or FastAPI).\n• For database operations, exploring PostgreSQL indexing and ACID transactions will significantly elevate your full-stack readiness for 2027 internship interviews.\n\nWould you like to see project suggestions that exercise these skills?`,
          options: ['Suggest Projects', 'Find Backend Teammates', 'Review DSA Checklist'],
        };
      } else if (q.includes('career') || q.includes('role') || q.includes('job')) {
        reply = {
          id: `m-ai-${Date.now()}`,
          sender: 'ai',
          text: `Here are potential role alignments based on your interests in ${currentUser.interests.slice(0, 3).join(', ')}. Please remember these are supportive suggestions based on platform patterns, not rigid life predictions:`,
          roleMatches: [
            'Frontend Engineer (React / TypeScript / Design Systems)',
            'Full-Stack Developer (Web & API Integration)',
            'Junior AI Systems Engineer (Applied Agentic Workflows)',
            'Technical Product Analyst (Campus Ventures & Prototypes)',
          ],
          options: ['Explore Senior Placement Journeys', 'Analyze Skill Gap', 'Find Mentors in DU'],
        };
      } else if (q.includes('project') || q.includes('idea')) {
        reply = {
          id: `m-ai-${Date.now()}`,
          sender: 'ai',
          text: `Here are 3 high-impact project ideas tailored for your ${currentUser.currentYear} level that recruiters consistently praise:`,
          roadmapSteps: [
            '1. Decentralized Campus Study Mesh: Peer-to-peer lecture notes & past paper verification engine.',
            '2. Indic Voice Diagnostic Tool: Quantized edge vision + audio transcription for rural clinics.',
            '3. High-Throughput Event Broker: Microservice handling simulated student fest ticketing with Redis & PostgreSQL locks.',
          ],
          options: ['Find Teammates for These Projects', 'Submit Idea for Grant', 'Explore Open Projects'],
        };
      } else if (q.includes('hackathon')) {
        reply = {
          id: `m-ai-${Date.now()}`,
          sender: 'ai',
          text: `For upcoming national hackathons like Smart India Hackathon (SIH):\n\n1. Form a balanced 4-6 person squad early with 1 UI Designer, 2 Full-Stack/Backend devs, and 1 domain researcher.\n2. Lock API mock responses in Swagger/Figma during the first 2 hours so frontend and backend work concurrently.\n3. Dedicate the final 4 hours entirely to live demo polish, error boundaries, and your 3-minute pitch deck.`,
          options: ['Find Hackathon Teammates', 'Browse Active Bounties', 'Explore Communities'],
        };
      } else {
        reply = {
          id: `m-ai-${Date.now()}`,
          sender: 'ai',
          text: `That is an interesting topic! Looking at your academic stage as a ${currentUser.educationLevelLabel} at ${currentUser.universityName}, you may find it helpful to explore related peer projects or connect with placed seniors who walked a similar path.\n\nWhat specific dimension would you like to explore next?`,
          options: ['Explore Placed Journeys', 'Find Teammates', 'Skill-Gap Analysis'],
        };
      }

      setMessages(prev => [...prev, reply]);
    }, 450);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Mentor Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl mb-6 flex items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 shrink-0">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 text-[11px] font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Context-Aware Academic AI</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black">AI CAREER & SKILL MENTOR</h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Trained on student trajectories across engineering, science, and humanities. Non-prescriptive, growth-oriented guidance.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveView('journeys')}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-colors shrink-0"
        >
          <span>Read Senior Stories</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Chat Conversation Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[600px]">
        
        {/* Messages Stream */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-xs'
                    : 'bg-slate-100 text-slate-800 rounded-tl-xs space-y-3'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Role matches card if provided */}
                {msg.roleMatches && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1.5 mt-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-950 block">
                      Potential Role Matches (Explore Freely):
                    </span>
                    {msg.roleMatches.map((role, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{role}</span>
                      </div>
                    ))}
                    <p className="text-[10px] text-slate-400 pt-1">
                      *Recommendations based on platform patterns, not guaranteed hiring outcomes.
                    </p>
                  </div>
                )}

                {/* Roadmap steps if provided */}
                {msg.roadmapSteps && (
                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1.5 mt-2">
                    {msg.roadmapSteps.map((step, idx) => (
                      <div key={idx} className="text-xs text-slate-800 font-medium pb-1 border-b border-slate-50 last:border-0">
                        {step}
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Follow-up Chip Buttons */}
                {msg.options && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(opt)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:border-indigo-500 hover:text-indigo-600 transition-colors shadow-2xs cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

              </div>

              {msg.sender === 'user' && (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                />
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="Ask about roadmaps, skill gaps, interview prep, or project ideas..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Ask</span>
            </button>
          </form>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            The AI Mentor uses supportive guidance principles ("You may be interested in...") and respects student autonomy.
          </p>
        </div>

      </div>

    </div>
  );
};
