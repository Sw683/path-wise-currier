import React from 'react';

interface PathWiseMarkProps {
  size?: 'sm' | 'md' | 'lg';
  dark?: boolean;
  showWordmark?: boolean;
}

const sizes = {
  sm: { box: 'h-8 w-8 rounded-[10px]', icon: 'h-5 w-5', text: 'text-base' },
  md: { box: 'h-10 w-10 rounded-xl', icon: 'h-6 w-6', text: 'text-xl' },
  lg: { box: 'h-14 w-14 rounded-2xl', icon: 'h-8 w-8', text: 'text-2xl' },
};

export const PathWiseMark: React.FC<PathWiseMarkProps> = ({ size = 'md', dark = false, showWordmark = true }) => {
  const style = sizes[size];
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className={`relative inline-flex shrink-0 items-center justify-center bg-gradient-to-br from-brand-400 via-brand-600 to-ocean-700 text-white shadow-lg shadow-brand-500/25 ${style.box}`}>
        <svg viewBox="0 0 32 32" fill="none" className={style.icon} aria-hidden="true">
          <path d="M7 25c3.2-5.7 5.9-9.4 8.5-9.4 2.2 0 2.8 3.2 4.4 3.2 1.7 0 2.9-3.4 5.1-8.8" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          <path d="m20.8 9.9 4.4.1-.5 4.3" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="7" cy="25" r="2" fill="#FDBA74" />
        </svg>
      </span>
      {showWordmark && (
        <span className={`font-['Outfit'] font-extrabold tracking-tight ${style.text} ${dark ? 'text-white' : 'text-slate-900'}`}>
          PathWise <span className="text-brand-500">India</span>
        </span>
      )}
    </span>
  );
};
