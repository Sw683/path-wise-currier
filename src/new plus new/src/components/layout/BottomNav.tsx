import React from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, Users, PlusCircle, GraduationCap, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeView, setActiveView, setIsCreatePostOpen, isAuthenticated, setIsAuthModalOpen } = useApp();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        <button
          onClick={() => setActiveView('feed')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[11px] font-medium transition-colors ${
            activeView === 'feed' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span>Feed</span>
        </button>

        <button
          onClick={() => setActiveView('communities')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[11px] font-medium transition-colors ${
            activeView === 'communities' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span>Colleges</span>
        </button>

        {/* Center Create Button */}
        <button
          onClick={() => {
            if (!isAuthenticated) {
              setIsAuthModalOpen(true);
            } else {
              setIsCreatePostOpen(true);
            }
          }}
          className="flex flex-col items-center -mt-4 bg-gradient-to-tr from-indigo-600 to-violet-600 text-white p-2.5 rounded-full shadow-lg shadow-indigo-500/30 hover:scale-105 transition-transform"
        >
          <PlusCircle className="w-6 h-6" />
        </button>

        <button
          onClick={() => setActiveView('network')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[11px] font-medium transition-colors ${
            activeView === 'network' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-5 h-5 mb-0.5" />
          <span>Network</span>
        </button>

        <button
          onClick={() => {
            if (!isAuthenticated) {
              setIsAuthModalOpen(true);
            } else {
              setActiveView('profile');
            }
          }}
          className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[11px] font-medium transition-colors ${
            activeView === 'profile' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
};
