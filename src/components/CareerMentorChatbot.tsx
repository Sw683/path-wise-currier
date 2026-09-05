import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Send, User, Bot, ShieldCheck, RefreshCw, HelpCircle } from 'lucide-react';

interface ChatMsg {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  quickReplies?: string[];
}

export const CareerMentorChatbot: React.FC = () => {
  const { activeProfile, updateProfile } = useApp();

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Namaste ${activeProfile.name}! I am Career Mentor AI. I'm here to help you understand your interests, evaluate realistic entrance exam strategies, and explore backup options.\n\nWhat class are you currently studying in?`,
      timestamp: 'Just now',
      quickReplies: ['Class 10 (Stream Selection)', 'Class 11 (PCM/PCB/Commerce)', 'Class 12 (Board & Entrance Exams)', 'Class 8 or 9 (Foundations)']
    }
  ]);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Generate intelligent counselor response based on keywords
    setTimeout(() => {
      let aiReply = '';
      let replies: string[] = [];

      const lower = text.toLowerCase();

      if (lower.includes('class 10') || lower.includes('stream')) {
        aiReply = `Great! Class 10 is an exciting turning point. Based on your profile (Maths: ${activeProfile.academics.subjectMarks.mathematics}%, Science: ${activeProfile.academics.subjectMarks.science}%), PCM or Commerce with Maths are strong possibilities.\n\nDo you enjoy solving difficult technical problems even when they take 30?60 minutes?`;
        replies = ['Yes, I love tough puzzles and coding.', 'I prefer biology and living organisms.', 'I prefer business, finance and trading.', 'I prefer writing, law and public policy.'];
      } else if (lower.includes('puzzle') || lower.includes('code') || lower.includes('pcm') || lower.includes('ai')) {
        aiReply = `Excellent. PCM gives you direct access to Software/AI Engineering, Defense (NDA), Aerospace, Data Science, and Pure Research (IISERs).\n\nDoes your family have the budget for expensive offline coaching, or would you prefer a low-cost self-study / government college route?`;
        replies = ['Low-cost self-study + YouTube & NPTEL', 'Budget online courses (<?10k)', 'Can afford offline coaching'];
      } else if (lower.includes('low-cost') || lower.includes('budget') || lower.includes('free') || lower.includes('self-study')) {
        aiReply = `Understood! In modern technology and engineering, free open-source resources like Harvard CS50, NPTEL IIT lectures, and Chai aur Code provide top-tier learning. State Government Engineering Colleges charge under ?1.5 Lakhs for 4 years.\n\nWould you like me to add these low-cost milestones to your personalized dashboard?`;
        replies = ['Yes, update my dashboard!', 'What if I fail JEE Main?', 'Show me verified scholarships'];
      } else if (lower.includes('fail') || lower.includes('backup') || lower.includes('jee')) {
        aiReply = `Remember: One failed examination does not define your life or career! If JEE is missed, you have State Engineering Colleges, 3-year BCA + MCA (via NIMCET), or BSc Computer Science. With LeetCode skills and GitHub projects, you can reach the exact same starting CTC within 18 months.`;
        replies = ['Show me BCA vs B.Tech', 'How to prepare early in Class 10?', 'Talk to a real professional'];
      } else if (lower.includes('scholarship')) {
        aiReply = `You are eligible to explore NSP Central Sector (CSSS), AICTE Pragati (for girl students), and Reliance Foundation scholarships. Let's check the Scholarships tab!`;
        replies = ['Open Scholarship Finder', 'Check my 30-day checklist'];
      } else {
        aiReply = `Thank you for sharing that! Given your circumstance and interests, building a disciplined 2-3 hour daily routine and focusing on high-ROI skills will give you a major advantage. What specific doubt can I clarify for you next?`;
        replies = ['How to prepare for Class 11?', 'Explain CA vs CS', 'What skills can I learn now?'];
      }

      const newAiMsg: ChatMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: 'Just now',
        quickReplies: replies
      };

      setMessages((prev) => [...prev, newAiMsg]);
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow-md">
            <Bot className="w-6 h-6 animate-pulse-subtle" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-['Outfit']">Career Mentor AI</h1>
            <p className="text-xs text-brand-200">Empathetic Career Counselor for Indian Students</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
          <ShieldCheck className="w-3.5 h-3.5" /> Minor Safe Mode
        </div>
      </div>

      {/* Chat Messages Window */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 h-[480px] flex flex-col justify-between overflow-hidden">
        <div className="overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                  msg.sender === 'ai'
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-800 text-white'
                }`}
              >
                {msg.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl max-w-lg text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'ai'
                    ? 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
                    : 'bg-brand-600 text-white rounded-tr-none shadow-xs'
                }`}
              >
                {msg.text}

                {/* Quick Reply Pills */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap gap-1.5">
                    {msg.quickReplies.map((qr, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSend(qr)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-brand-50 text-brand-700 font-semibold text-xs border border-brand-200 shadow-xs transition hover:scale-105"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything (e.g. Which stream for AI? How to prepare without coaching?)..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-3.5 h-3.5" /> Send
          </button>
        </form>
      </div>
    </div>
  );
};
