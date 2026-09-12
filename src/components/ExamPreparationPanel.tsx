import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, Brain, CheckCircle2, Clock3, ExternalLink, Flame, Gauge, Lightbulb, Plus, Target, Timer, Users } from 'lucide-react';
import { EXAMS_DATABASE } from '../data/exams';
import { useApp } from '../context/AppContext';
import { ExamGoalProfile, ExamGoalStatus, MotivationPreferences, StudyPreferences } from '../types';
import { createDefaultExamGoal, getCountdownLabel, getDaysUntil, getMathsPracticeQuestion, getStudentsLikeYou } from '../utils/studyPlan';

const statusLabels: Record<ExamGoalStatus, string> = {
  planning: 'Planning',
  registered: 'Registered',
  in_progress: 'In progress',
  completed: 'Completed',
  paused: 'Paused',
};

const toggleValue = <T extends string>(values: T[], value: T) =>
  values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

export const ExamPreparationPanel: React.FC = () => {
  const {
    activeProfile,
    examGoalProfile,
    setExamGoalProfile,
    studyPreferences,
    setStudyPreferences,
    mathsPractice,
    setMathsPractice,
    motivationPreferences,
    setMotivationPreferences,
    studyPlan,
    generatePlan,
  } = useApp();
  const [now, setNow] = useState(() => new Date());
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const exam = useMemo(
    () => EXAMS_DATABASE.find((item) => item.id === examGoalProfile?.examId),
    [examGoalProfile?.examId],
  );
  const daysUntilExam = examGoalProfile ? getDaysUntil(examGoalProfile.targetDate, now) : 0;
  const peers = useMemo(
    () => getStudentsLikeYou(activeProfile, examGoalProfile, mathsPractice),
    [activeProfile, examGoalProfile, mathsPractice],
  );

  const createGoal = () => {
    const goal = createDefaultExamGoal();
    setExamGoalProfile(goal);
  };

  const updateGoal = (updates: Partial<ExamGoalProfile>) => {
    if (!examGoalProfile) return;
    setExamGoalProfile({ ...examGoalProfile, ...updates, updatedAt: new Date().toISOString() });
  };

  const chooseExam = (examId: string) => {
    const next = createDefaultExamGoal(examId);
    updateGoal({ examId: next.examId, targetDate: next.targetDate, subjects: next.subjects, resources: next.resources });
  };

  const updateStudyPreferences = (updates: Partial<StudyPreferences>) =>
    setStudyPreferences({ ...studyPreferences, ...updates });

  const updateMotivation = (updates: Partial<MotivationPreferences>) =>
    setMotivationPreferences({ ...motivationPreferences, ...updates });

  if (!examGoalProfile || !exam) {
    return (
      <section className="rounded-3xl border border-dashed border-brand-300 bg-gradient-to-br from-brand-50 to-white p-6 sm:p-8">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-700">
              <Target className="h-3.5 w-3.5" /> Optional exam goal
            </span>
            <h2 className="mt-3 font-['Outfit'] text-xl font-bold text-slate-900">Add an exam when you are ready</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
              Choose one target to unlock a live countdown, subject progress, focused study plan, and practical resources. You can leave this blank while exploring careers.
            </p>
          </div>
          <button onClick={createGoal} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-brand-700">
            <Plus className="h-4 w-4" /> Set an exam goal
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-ocean-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ocean-700">
              <BookOpen className="h-3.5 w-3.5" /> Exam goal profile
            </span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">{statusLabels[examGoalProfile.status]}</span>
          </div>
          <h2 className="mt-3 font-['Outfit'] text-xl font-bold text-slate-900">Prepare with a plan that fits {activeProfile.name}</h2>
          <p className="mt-1 text-xs leading-5 text-slate-500">Your inputs stay editable. Progress is a guide, not a prediction.</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-slate-950 px-4 py-3 text-white">
          <Timer className="h-5 w-5 text-brand-300" />
          <div><span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Countdown to {exam.name}</span><strong className="font-['Outfit'] text-xl">{getCountdownLabel(daysUntilExam)}</strong></div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr]">
        <label className="text-xs font-semibold text-slate-600">Target exam
          <select value={examGoalProfile.examId} onChange={(event) => chooseExam(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-brand-400">
            {EXAMS_DATABASE.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.category}</option>)}
          </select>
        </label>
        <label className="text-xs font-semibold text-slate-600">Exam date
          <input type="date" value={examGoalProfile.targetDate} onChange={(event) => updateGoal({ targetDate: event.target.value })} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-brand-400" />
        </label>
        <label className="text-xs font-semibold text-slate-600">Preparation status
          <select value={examGoalProfile.status} onChange={(event) => updateGoal({ status: event.target.value as ExamGoalStatus })} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-brand-400">
            {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-slate-200 p-4">
          <div className="mb-3 flex items-center justify-between"><h3 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Gauge className="h-4 w-4 text-brand-600" /> Subject progress</h3><span className="text-[11px] text-slate-400">Update after a quiz</span></div>
          <div className="space-y-3">
            {examGoalProfile.subjects.map((subject, index) => (
              <div key={subject.id} className="grid gap-2 sm:grid-cols-[1fr_86px_110px_auto] sm:items-center">
                <span className="text-xs font-semibold text-slate-700">{subject.name}</span>
                <label className="text-[10px] text-slate-400">Progress
                  <input type="number" min={0} max={100} value={subject.progressPercent} onChange={(event) => {
                    const value = Math.max(0, Math.min(100, Number(event.target.value)));
                    updateGoal({ subjects: examGoalProfile.subjects.map((item, itemIndex) => itemIndex === index ? { ...item, progressPercent: value } : item) });
                  }} className="mt-0.5 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-800" />
                </label>
                <label className="text-[10px] text-slate-400">Confidence
                  <select value={subject.confidence} onChange={(event) => updateGoal({ subjects: examGoalProfile.subjects.map((item, itemIndex) => itemIndex === index ? { ...item, confidence: event.target.value as typeof subject.confidence } : item) })} className="mt-0.5 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-800">
                    <option value="low">Low</option><option value="building">Building</option><option value="steady">Steady</option><option value="strong">Strong</option>
                  </select>
                </label>
                <label className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500"><input type="checkbox" checked={Boolean(subject.isWeakArea)} onChange={(event) => updateGoal({ subjects: examGoalProfile.subjects.map((item, itemIndex) => itemIndex === index ? { ...item, isWeakArea: event.target.checked } : item) })} className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" /> Weak area</label>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Brain className="h-4 w-4 text-ocean-600" /> Study preferences</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="text-[10px] font-semibold text-slate-500">Minutes per day<input type="number" min={15} max={600} value={studyPreferences.dailyMinutes} onChange={(event) => updateStudyPreferences({ dailyMinutes: Math.max(15, Number(event.target.value)) })} className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 text-xs text-slate-800" /></label>
            <label className="text-[10px] font-semibold text-slate-500">Best time<select value={studyPreferences.preferredTime} onChange={(event) => updateStudyPreferences({ preferredTime: event.target.value as StudyPreferences['preferredTime'] })} className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs text-slate-800"><option value="morning">Morning</option><option value="afternoon">Afternoon</option><option value="evening">Evening</option><option value="flexible">Flexible</option></select></label>
          </div>
          <div className="mt-3"><span className="text-[10px] font-semibold text-slate-500">Planning mode</span><div className="mt-1.5 grid grid-cols-3 gap-1.5">{(['balanced', 'focused', 'light'] as const).map((mode) => <button key={mode} onClick={() => updateStudyPreferences({ planningMode: mode })} className={`rounded-lg px-2 py-2 text-[10px] font-bold capitalize ${studyPreferences.planningMode === mode ? 'bg-ocean-100 text-ocean-700' : 'bg-slate-100 text-slate-500'}`}>{mode === 'light' ? 'Light / sustainable' : mode}</button>)}</div></div>
          <div className="mt-3"><span className="text-[10px] font-semibold text-slate-500">How you learn best</span><div className="mt-1.5 flex flex-wrap gap-1.5">{(['practice', 'video', 'reading', 'flashcards', 'group_study'] as const).map((mode) => <button key={mode} onClick={() => updateStudyPreferences({ learningModes: toggleValue(studyPreferences.learningModes, mode) })} className={`rounded-lg px-2 py-1.5 text-[10px] font-bold ${studyPreferences.learningModes.includes(mode) ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-500'}`}>{mode.replace('_', ' ')}</button>)}</div></div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Maths practice</h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <label className="text-[10px] font-semibold text-slate-500">Attempted<input type="number" min={0} value={mathsPractice.questionsAttempted} onChange={(event) => setMathsPractice({ ...mathsPractice, questionsAttempted: Math.max(0, Number(event.target.value)) })} className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 text-xs" /></label>
            <label className="text-[10px] font-semibold text-slate-500">Correct<input type="number" min={0} value={mathsPractice.questionsCorrect} onChange={(event) => setMathsPractice({ ...mathsPractice, questionsCorrect: Math.max(0, Number(event.target.value)) })} className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 text-xs" /></label>
          </div>
          <label className="mt-2 block text-[10px] font-semibold text-slate-500">Weekly question goal<input type="number" min={1} value={mathsPractice.weeklyGoal} onChange={(event) => setMathsPractice({ ...mathsPractice, weeklyGoal: Math.max(1, Number(event.target.value)) })} className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-2 text-xs" /></label>
          <select aria-label="Maths topic" value={mathsPractice.selectedTopic || ''} onChange={(event) => setMathsPractice({ ...mathsPractice, selectedTopic: event.target.value })} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs"><option value="">Choose a topic</option><option>Algebra</option><option>Geometry</option><option>Trigonometry</option><option>Calculus</option><option>Probability</option><option>Data interpretation</option></select>
          <select aria-label="Maths difficulty" value={mathsPractice.difficulty || 'practice'} onChange={(event) => setMathsPractice({ ...mathsPractice, difficulty: event.target.value as NonNullable<typeof mathsPractice.difficulty> })} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs"><option value="foundation">Foundation</option><option value="practice">Practice</option><option value="challenge">Challenge</option></select>
          <input aria-label="Maths weak areas" placeholder="Weak areas, comma separated" value={mathsPractice.weakAreas.join(', ')} onChange={(event) => setMathsPractice({ ...mathsPractice, weakAreas: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} className="mt-2 w-full rounded-lg border border-slate-200 px-2 py-2 text-xs" />
          <p className="mt-2 text-[11px] font-semibold text-slate-500">{mathsPractice.questionsAttempted ? Math.round((mathsPractice.questionsCorrect / mathsPractice.questionsAttempted) * 100) : 0}% accuracy · {mathsPractice.weakAreas.length || 0} weak areas</p>
          <p className="mt-2 text-[11px] leading-4 text-slate-500">{mathsPractice.selectedTopic ? `${mathsPractice.selectedTopic} may need more practice at ${mathsPractice.difficulty} level.` : 'Choose a topic to get a focused revision recommendation.'}</p>
          {mathsPractice.selectedTopic && <div className="mt-3 rounded-xl bg-ocean-50 p-3"><p className="text-[10px] font-bold uppercase tracking-wide text-ocean-700">Try one question</p><p className="mt-1 text-xs font-semibold text-ocean-950">{getMathsPracticeQuestion(mathsPractice.selectedTopic, mathsPractice.difficulty || 'practice').prompt}</p><p className="mt-1 text-[10px] text-ocean-700">{getMathsPracticeQuestion(mathsPractice.selectedTopic, mathsPractice.difficulty || 'practice').hint}</p><button onClick={() => setShowAnswer((value) => !value)} className="mt-2 text-[10px] font-bold text-ocean-700 underline">{showAnswer ? getMathsPracticeQuestion(mathsPractice.selectedTopic, mathsPractice.difficulty || 'practice').answer : 'Reveal answer'}</button></div>}
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900"><FlameIcon /> Motivation & focus</h3>
          <span className="mt-3 block text-[10px] font-semibold text-slate-500">How much motivation would you like?</span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">{(['small_wins', 'streaks', 'encouragement', 'competition', 'family_checkins'] as const).map((item) => <button key={item} onClick={() => updateMotivation({ motivators: toggleValue(motivationPreferences.motivators, item) })} className={`rounded-lg px-2 py-1.5 text-[10px] font-bold ${motivationPreferences.motivators.includes(item) ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{item.replace('_', ' ')}</button>)}</div>
          <span className="mt-3 block text-[10px] font-semibold text-slate-500">Focus & distraction support</span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">{(['phone', 'social_media', 'noise', 'tiredness', 'unclear_next_step'] as const).map((item) => <button key={item} onClick={() => updateMotivation({ distractionTriggers: toggleValue(motivationPreferences.distractionTriggers, item) })} className={`rounded-lg px-2 py-1.5 text-[10px] font-bold ${motivationPreferences.distractionTriggers.includes(item) ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>{item.replace('_', ' ')}</button>)}</div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-ocean-50 p-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Lightbulb className="h-4 w-4 text-brand-600" /> Your next step</h3>
          <p className="mt-2 text-xs leading-5 text-slate-600">Generate a short plan from your target date, weak areas, and preferred study time.</p>
          <button onClick={generatePlan} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-brand-700"><Target className="h-4 w-4" /> Generate my plan</button>
          {studyPlan && <p className="mt-2 text-center text-[10px] font-semibold text-brand-700">{studyPlan.tasks.length} tasks · {studyPlan.weeklyMinutes} min/week</p>}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900"><BookOpen className="h-4 w-4 text-brand-600" /> Curated resources</h3>
          <div className="mt-3 space-y-2">{examGoalProfile.resources.slice(0, 4).map((resource) => <a key={resource.id} href={resource.url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"><span>{resource.name}</span><ExternalLink className="h-3.5 w-3.5 shrink-0" /></a>)}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 p-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Users className="h-4 w-4 text-ocean-600" /> Students like you</h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">{peers.map((peer) => <div key={peer.id} className="rounded-xl bg-slate-50 p-3"><div className="flex items-center justify-between gap-2"><span className="text-[11px] font-bold text-slate-800">{peer.name}</span><span className="text-[10px] font-bold text-brand-600">{peer.matchScore}%</span></div><span className="mt-1 block text-[10px] font-semibold text-ocean-700">{peer.sharedStrength}</span><p className="mt-2 text-[11px] leading-4 text-slate-600">{peer.recommendation}</p></div>)}</div>
        </div>
      </div>

      {studyPlan && <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4"><div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-emerald-700" /><h3 className="text-sm font-bold text-emerald-900">This week’s generated plan</h3></div><div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{studyPlan.tasks.map((task) => <div key={task.id} className="rounded-xl bg-white p-3"><span className="text-[10px] font-bold uppercase tracking-wide text-emerald-700">{task.subject} · {task.minutes} min</span><p className="mt-1 text-xs font-bold text-slate-800">{task.title}</p><p className="mt-1 text-[10px] leading-4 text-slate-500">{task.reason}</p></div>)}</div></div>}
    </section>
  );
};

const FlameIcon: React.FC = () => <Flame className="h-4 w-4 text-brand-600" />;
