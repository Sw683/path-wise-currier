import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, Award, ArrowRight, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  category: 'Algorithms' | 'Systems & Web' | 'Collaboration' | 'Problem Solving';
  options: string[];
  correctIndex: number;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Algorithms',
    question: 'In software development, which algorithmic pattern is best suited for finding the shortest path in an unweighted graph network?',
    options: [
      'Depth First Search (DFS)',
      'Breadth First Search (BFS)',
      'Binary Search',
      'Greedy Interval Partitioning',
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    category: 'Systems & Web',
    question: 'What is the primary architectural purpose of utilizing database indexes (e.g. B-Trees) on frequently filtered columns?',
    options: [
      'Reduces the physical size of disk storage',
      'Speeds up query retrieval from O(N) sequential scans to logarithmic lookups',
      'Automatically encrypts table records',
      'Guarantees foreign key constraints without server memory',
    ],
    correctIndex: 1,
  },
  {
    id: 3,
    category: 'Collaboration',
    question: 'When collaborating on a team project via Git, what is the safest practice before pushing changes to the shared main branch?',
    options: [
      'Force push directly to main without review',
      'Delete the remote branch and recreate it',
      'Create a feature branch, run local test builds, and submit a Pull Request',
      'Commit directly with message "fix"',
    ],
    correctIndex: 2,
  },
  {
    id: 4,
    category: 'Problem Solving',
    question: 'How do you prevent UI thread blocking in JavaScript or browser web applications when computing heavy datasets?',
    options: [
      'Use Web Workers or asynchronous streaming chunks',
      'Write an infinite synchronous while-loop',
      'Increase the screen refresh rate to 120Hz',
      'Declare all variables as global variables',
    ],
    correctIndex: 0,
  },
];

export const AcademicQuizModal: React.FC = () => {
  const { isAcademicQuizOpen, setIsAcademicQuizOpen, handleCompleteQuiz } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  if (!isAcademicQuizOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (optIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: optIdx }));
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Calculate score
      let correct = 0;
      QUIZ_QUESTIONS.forEach(q => {
        if (selectedAnswers[q.id] === q.correctIndex) {
          correct++;
        }
      });

      const percentage = Math.round((correct / QUIZ_QUESTIONS.length) * 100);
      let tier: 'Beginner' | 'Developing' | 'Intermediate' | 'Strong' = 'Beginner';
      if (percentage >= 85) tier = 'Strong';
      else if (percentage >= 65) tier = 'Intermediate';
      else if (percentage >= 40) tier = 'Developing';

      setIsFinished(true);
      handleCompleteQuiz(percentage, tier);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Academic Concept Diagnostic
              </h3>
              <p className="text-[11px] text-slate-500">
                Determines your dynamic readiness tier: Beginner → Developing → Intermediate → Strong
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAcademicQuizOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isFinished ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span>QUESTION {currentIndex + 1} OF {QUIZ_QUESTIONS.length}</span>
                <span className="text-indigo-600 uppercase tracking-wider">{currentQ.category}</span>
              </div>

              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                {currentQ.question}
              </h4>

              <div className="space-y-2 pt-2">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQ.id] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-3 rounded-2xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                🏆
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Diagnostic Assessment Recorded!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Your profile has been updated with a dynamic skill rating badge. You can retake this assessment anytime as you finish more courses and projects!
              </p>
              <button
                onClick={() => setIsAcademicQuizOpen(false)}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-md"
              >
                Return to Profile
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isFinished && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="text-slate-500 disabled:opacity-30 cursor-pointer"
            >
              Previous
            </button>

            <button
              disabled={selectedAnswers[currentQ.id] === undefined}
              onClick={handleNext}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <span>{currentIndex === QUIZ_QUESTIONS.length - 1 ? 'Submit Diagnostic' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
