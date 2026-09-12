import React, { useEffect, useRef, useState } from 'react';
import { Bot, HelpCircle, RefreshCw, Send, ShieldCheck, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { geminiApi } from '../services/geminiApi';

interface ChatMsg {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  quickReplies?: string[];
}

export const CareerMentorChatbot: React.FC = () => {
  const { activeProfile, onboardingAnswers } = useApp();
  const [messages, setMessages] = useState<ChatMsg[]>([{
    id: '1',
    sender: 'ai',
    text: `Namaste ${activeProfile.name}! I am Career Mentor AI. I'm here to help you understand your interests, evaluate realistic entrance exam strategies, and explore backup options.\n\nWhat class are you currently studying in?`,
    timestamp: 'Just now',
    quickReplies: ['Class 10 (Stream Selection)', 'Class 11 (PCM/PCB/Commerce)', 'Class 12 (Board & Entrance Exams)', 'Class 8 or 9 (Foundations)']
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const localReply = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('class 10') || lower.includes('stream')) {
      return {
        reply: `Class 10 is an exciting turning point. Based on your profile (Maths: ${activeProfile.academics.subjectMarks.mathematics}%, Science: ${activeProfile.academics.subjectMarks.science}%), PCM or Commerce with Maths are worth exploring.\n\nDo you enjoy solving difficult technical problems even when they take 30-60 minutes?`,
        quickReplies: ['Yes, I love tough puzzles and coding.', 'I prefer biology and living organisms.', 'I prefer business and finance.', 'I prefer writing, law and public policy.']
      };
    }
    if (lower.includes('puzzle') || lower.includes('code') || lower.includes('pcm') || lower.includes('ai')) {
      return {
        reply: 'PCM can open routes into software, AI, defense, aerospace, data science, and pure research. Which direction would you like to explore first?',
        quickReplies: ['Software and AI', 'Defense and aerospace', 'Data science', 'Pure research']
      };
    }
    if (lower.includes('fail') || lower.includes('backup') || lower.includes('jee')) {
      return {
        reply: 'One exam result does not define your future. State engineering colleges, BCA plus MCA, and BSc Computer Science can all lead to strong technology careers when paired with practical skills.',
        quickReplies: ['Show me BCA vs B.Tech', 'How should I prepare early?', 'Show alternative exams']
      };
    }
    return {
      reply: 'Thank you for sharing that. Building a consistent routine and exploring one practical skill at a time can make your next decision clearer. What would you like to understand next?',
      quickReplies: ['How do I choose a stream?', 'What skills can I learn now?', 'Show me possible career paths']
    };
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    setMessages((prev) => [...prev, {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now'
    }]);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const response = await geminiApi.chat({
        profile: activeProfile,
        question: text,
        context: { onboardingAnswers }
      });
      setMessages((prev) => [...prev, {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.reply,
        timestamp: 'Just now',
        quickReplies: response.quickReplies
      }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'AI is unavailable. Showing local guidance.');
      const fallback = localReply(text);
      setMessages((prev) => [...prev, {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: fallback.reply,
        timestamp: 'Just now',
        quickReplies: fallback.quickReplies
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-gradient-to-r from-brand-900 to-ocean-950 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
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

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 h-[480px] flex flex-col justify-between overflow-hidden">
        <div className="overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${msg.sender === 'ai' ? 'bg-brand-600 text-white' : 'bg-slate-800 text-white'}`}>
                {msg.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl max-w-lg text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${msg.sender === 'ai' ? 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none' : 'bg-brand-600 text-white rounded-tr-none shadow-xs'}`}>
                {msg.text}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap gap-1.5">
                    {msg.quickReplies.map((reply) => (
                      <button key={reply} type="button" disabled={isLoading} onClick={() => handleSend(reply)} className="px-2.5 py-1 rounded-lg bg-white hover:bg-brand-50 text-brand-700 font-semibold text-xs border border-brand-200 shadow-xs transition hover:scale-105 disabled:opacity-50">
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && <div className="flex items-center gap-2 text-xs text-slate-500"><RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-600" />Career Mentor is thinking...</div>}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={(event) => { event.preventDefault(); void handleSend(); }} className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
          <input type="text" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask anything about your career path..." className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none" />
          <button type="submit" disabled={isLoading} className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition flex items-center gap-1.5 shrink-0 disabled:opacity-50">
            <Send className="w-3.5 h-3.5" /> Send
          </button>
        </form>
        {error && <div className="mt-2 flex items-center gap-2 text-xs text-amber-700" role="status"><HelpCircle className="w-3.5 h-3.5 shrink-0" />{error} Local guidance was shown instead.</div>}
      </div>
    </div>
  );
};
