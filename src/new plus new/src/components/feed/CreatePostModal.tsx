import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Sparkles, 
  FolderGit2, 
  HelpCircle, 
  BarChart2, 
  Trophy, 
  Send, 
  Plus, 
  Trash2 
} from 'lucide-react';

export const CreatePostModal: React.FC = () => {
  const { isCreatePostOpen, setIsCreatePostOpen, handleCreatePost, communities, currentUser } = useApp();

  const [postType, setPostType] = useState<'text' | 'project' | 'poll' | 'achievement' | 'question'>('text');
  const [content, setContent] = useState('');
  const [selectedCommunityId, setSelectedCommunityId] = useState<string>('comm-du-kmc-cs-2nd');
  const [tagsInput, setTagsInput] = useState('CampusCommunity, ProjectCollab');

  // For Project snippet
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projTech, setProjTech] = useState('React, TypeScript, Tailwind');
  const [projRoles, setProjRoles] = useState('Backend Engineer, UI Designer');

  // For Poll
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['Option 1', 'Option 2', 'Option 3']);

  if (!isCreatePostOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && postType !== 'poll') return;

    const comm = communities.find(c => c.id === selectedCommunityId);

    const tags = tagsInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    let pollData = undefined;
    if (postType === 'poll' && pollQuestion.trim()) {
      pollData = {
        question: pollQuestion.trim(),
        options: pollOptions.filter(o => o.trim()).map((opt, i) => ({
          id: `opt-${Date.now()}-${i}`,
          text: opt.trim(),
          votes: 0,
        })),
        totalVotes: 0,
      };
    }

    let projectSnippetData = undefined;
    if (postType === 'project' && projTitle.trim()) {
      projectSnippetData = {
        title: projTitle.trim(),
        description: projDesc.trim(),
        techStack: projTech.split(',').map(s => s.trim()).filter(Boolean),
        seekingRoles: projRoles.split(',').map(r => r.trim()).filter(Boolean),
      };
    }

    handleCreatePost({
      content: content.trim(),
      postType,
      communityId: comm?.id,
      communityName: comm?.name,
      tags,
      poll: pollData,
      projectSnippet: projectSnippetData,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base text-slate-900">Create Academic Post</span>
            <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded-full">
              {currentUser.name}
            </span>
          </div>
          <button
            onClick={() => setIsCreatePostOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* Destination Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Post To Community Channel</label>
            <select
              value={selectedCommunityId}
              onChange={e => setSelectedCommunityId(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              {communities.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.type.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Post Type Badges */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Post Type</label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'text', label: 'Discussion', icon: Sparkles },
                { id: 'project', label: 'Project Launch', icon: FolderGit2 },
                { id: 'poll', label: 'Class Poll', icon: BarChart2 },
                { id: 'achievement', label: 'Achievement', icon: Trophy },
                { id: 'question', label: 'Academic Doubt', icon: HelpCircle },
              ].map(type => {
                const Icon = type.icon;
                const isSelected = postType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setPostType(type.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content Area */}
          <div>
            <textarea
              required
              rows={4}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={
                postType === 'project' 
                  ? 'Tell the campus what problem your project solves and who you need on your team...'
                  : postType === 'poll'
                  ? 'Give context for your poll...'
                  : postType === 'achievement'
                  ? 'Share your milestone, offer, or hackathon win with lessons for juniors...'
                  : 'What is happening in your college or research lab today?'
              }
              className="w-full px-4 py-3 text-xs sm:text-sm rounded-2xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
            />
          </div>

          {/* Condition: Project Inputs */}
          {postType === 'project' && (
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
              <h5 className="text-xs font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                <FolderGit2 className="w-4 h-4 text-indigo-600" />
                <span>Project Specifications</span>
              </h5>
              <div>
                <input
                  type="text"
                  placeholder="Project Name (e.g. EduMesh)"
                  value={projTitle}
                  onChange={e => setProjTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Short Tagline"
                  value={projDesc}
                  onChange={e => setProjDesc(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Technologies (comma separated)"
                  value={projTech}
                  onChange={e => setProjTech(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
                <input
                  type="text"
                  placeholder="Roles Needed (comma separated)"
                  value={projRoles}
                  onChange={e => setProjRoles(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>
            </div>
          )}

          {/* Condition: Poll Inputs */}
          {postType === 'poll' && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-indigo-600" />
                <span>Poll Configuration</span>
              </h5>
              <div>
                <input
                  type="text"
                  placeholder="Ask a question (e.g. Which elective should we take?)"
                  value={pollQuestion}
                  onChange={e => setPollQuestion(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white font-medium"
                />
              </div>
              <div className="space-y-1.5">
                {pollOptions.map((opt, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Option ${i + 1}`}
                      value={opt}
                      onChange={e => {
                        const copy = [...pollOptions];
                        copy[i] = e.target.value;
                        setPollOptions(copy);
                      }}
                      className="flex-1 px-3 py-1 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => setPollOptions(pollOptions.filter((_, idx) => idx !== i))}
                        className="p-1 text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
                {pollOptions.length < 5 && (
                  <button
                    type="button"
                    onClick={() => setPollOptions([...pollOptions, `Option ${pollOptions.length + 1}`])}
                    className="text-xs text-indigo-600 font-semibold flex items-center gap-1 mt-1 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add another option</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Tags input */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Tags (Comma Separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="Hackathons, WebDev, DU, Placements"
              className="w-full px-3.5 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreatePostOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Post</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
