import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, Compass, Layers, LifeBuoy, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CareerTreeNode, generatePersonalizedCareerTree } from '../utils/careerTree';

const kindLabels: Record<CareerTreeNode['kind'], string> = {
  direction: 'Potential direction',
  field: 'Field worth exploring',
  education: 'Education route',
  skill: 'Skills to explore',
  preparation: 'Preparation options',
  career: 'Possible destination',
  alternative: 'Alternative route'
};

const kindStyles: Record<CareerTreeNode['kind'], string> = {
  direction: 'border-brand-300 bg-brand-50 text-brand-900',
  field: 'border-ocean-200 bg-ocean-50 text-ocean-900',
  education: 'border-sky-200 bg-sky-50 text-sky-900',
  skill: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  preparation: 'border-amber-200 bg-amber-50 text-amber-900',
  career: 'border-violet-200 bg-violet-50 text-violet-900',
  alternative: 'border-orange-200 bg-orange-50 text-orange-900'
};

export const CareerTreeVisualizer: React.FC = () => {
  const { activeProfile, recommendations, setActiveTab } = useApp();
  const tree = useMemo(() => generatePersonalizedCareerTree(activeProfile, recommendations), [activeProfile, recommendations]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl sm:p-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-400/10 px-3 py-1 text-xs font-bold text-brand-200">
            <Sparkles className="h-3.5 w-3.5" /> Generated from your profile
          </div>
          <h1 className="font-['Outfit'] text-2xl font-extrabold tracking-tight sm:text-3xl">{tree.title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{tree.subtitle} These are possible routes to explore, not guaranteed outcomes.</p>
          <div className="mt-5 flex flex-wrap gap-2">{tree.generatedFrom.map((item) => <span key={item} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300">{item}</span>)}</div>
        </div>
      </section>

      {tree.roots.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <Compass className="mx-auto h-8 w-8 text-brand-600" />
          <h2 className="mt-3 text-lg font-bold text-slate-900">Complete your assessment to shape your map</h2>
          <button onClick={() => setActiveTab('assessment')} className="mt-5 rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white">Continue assessment</button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {tree.roots.map((root) => <TreeBranch key={root.id} node={root} expanded={expanded} onToggle={toggle} />)}
        </div>
      )}
    </div>
  );
};

const TreeBranch: React.FC<{ node: CareerTreeNode; expanded: Set<string>; onToggle: (id: string) => void }> = ({ node, expanded, onToggle }) => {
  const isExpanded = expanded.has(node.id);
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <TreeNode node={node} isExpanded={isExpanded} onToggle={onToggle} />
      {isExpanded && node.children.length > 0 && (
        <div className="mt-4 space-y-3 border-l-2 border-slate-100 pl-4">
          {node.children.map((child) => <TreeBranch key={child.id} node={child} expanded={expanded} onToggle={onToggle} />)}
        </div>
      )}
    </article>
  );
};

const TreeNode: React.FC<{ node: CareerTreeNode; isExpanded: boolean; onToggle: (id: string) => void }> = ({ node, isExpanded, onToggle }) => (
  <button onClick={() => onToggle(node.id)} className={`w-full rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${kindStyles[node.kind]}`}>
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/70"><Layers className="h-4 w-4" /></span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2"><span className="text-[10px] font-extrabold uppercase tracking-wider opacity-70">{kindLabels[node.kind]}</span>{node.children.length > 0 && (isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}</span>
        <span className="mt-1 block text-sm font-extrabold">{node.label}</span>
        <span className="mt-1 block text-xs leading-5 opacity-75">{node.summary}</span>
      </span>
    </div>
    <span className="mt-3 flex items-start gap-2 border-t border-current/10 pt-3 text-[11px] leading-5 opacity-75"><LifeBuoy className="mt-0.5 h-3.5 w-3.5 shrink-0" />{node.whyFit}</span>
  </button>
);
