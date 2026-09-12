import React, { useState } from 'react';
import { Post, ReactionType } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  Send, 
  Sparkles, 
  ExternalLink, 
  Flag, 
  Check, 
  Users 
} from 'lucide-react';

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const { 
    handleReaction, 
    handleVotePoll, 
    handleAddComment, 
    handleToggleSavePost, 
    showToast,
    setSelectedProjectId,
    setActiveView
  } = useApp();

  const [commentInput, setCommentInput] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const reactionEmojis: Record<ReactionType, { label: string; icon: string; color: string }> = {
    like: { label: 'Like', icon: '👍', color: 'text-blue-600' },
    celebrate: { label: 'Celebrate', icon: '🎉', color: 'text-amber-600' },
    interesting: { label: 'Interesting', icon: '💡', color: 'text-yellow-600' },
    support: { label: 'Support', icon: '🤝', color: 'text-emerald-600' },
    helpful: { label: 'Helpful', icon: '🙌', color: 'text-violet-600' },
  };

  const totalReactions = 
    post.reactions.like + 
    post.reactions.celebrate + 
    post.reactions.interesting + 
    post.reactions.support + 
    post.reactions.helpful;

  const currentReaction = post.reactions.userReaction;

  const onCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim()) {
      handleAddComment(post.id, commentInput);
      setCommentInput('');
      setShowComments(true);
    }
  };

  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all overflow-hidden">
      
      {/* Community tag if attached */}
      {post.communityName && (
        <div className="bg-slate-50/80 px-4 py-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-medium">
            <Users className="w-3.5 h-3.5 text-indigo-500" />
            <span>Posted in <strong className="text-slate-800">{post.communityName}</strong></span>
          </span>
          <span className="text-[11px] text-slate-400">{post.createdAt}</span>
        </div>
      )}

      <div className="p-4 sm:p-5">
        
        {/* Post Author Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm text-slate-900 leading-tight hover:text-indigo-600 transition-colors cursor-pointer">
                  {post.author.name}
                </h4>
                {post.author.isVerified && (
                  <span title="Verified Student" className="inline-flex items-center text-emerald-600">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded-md">
                  {post.author.year}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-tight mt-0.5">
                {post.author.role} • {post.author.institution}
              </p>
            </div>
          </div>

          {/* Post Options Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowOptionsMenu(!showOptionsMenu)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            {showOptionsMenu && (
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-20 text-xs">
                <button
                  onClick={() => {
                    handleToggleSavePost(post.id);
                    setShowOptionsMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{post.isSaved ? 'Unsave Post' : 'Save Post'}</span>
                </button>
                <button
                  onClick={() => {
                    showToast('Post reported to community moderators. Thank you for keeping campus safe.');
                    setShowOptionsMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Report Post</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="mt-3 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="text-[11px] font-medium text-indigo-600 hover:underline cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Rich Snippet: Project */}
        {post.projectSnippet && (
          <div className="mt-3 p-4 rounded-xl bg-gradient-to-br from-indigo-50/70 to-slate-50 border border-indigo-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-md">
                Featured Project
              </span>
              {post.projectSnippet.link && (
                <a
                  href={post.projectSnippet.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-indigo-600 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <span>Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <h5 className="text-sm font-bold text-slate-900">{post.projectSnippet.title}</h5>
            <p className="text-xs text-slate-600 mt-1">{post.projectSnippet.description}</p>
            
            <div className="mt-2.5 flex flex-wrap gap-1">
              {post.projectSnippet.techStack.map(tech => (
                <span key={tech} className="text-[10px] font-semibold bg-white border border-indigo-200 text-indigo-900 px-2 py-0.5 rounded-md">
                  {tech}
                </span>
              ))}
            </div>

            {post.projectSnippet.seekingRoles && post.projectSnippet.seekingRoles.length > 0 && (
              <div className="mt-3 pt-2.5 border-t border-indigo-100/80 flex items-center justify-between">
                <span className="text-xs text-indigo-900 font-semibold">
                  Seeking: {post.projectSnippet.seekingRoles.join(', ')}
                </span>
                <button
                  onClick={() => {
                    setActiveView('teammates');
                    showToast('Opening Teammate Match Finder for this project!');
                  }}
                  className="text-xs font-bold bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Apply to Join
                </button>
              </div>
            )}
          </div>
        )}

        {/* Rich Snippet: Poll */}
        {post.poll && (
          <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-xs font-bold text-slate-900">📊 {post.poll.question}</h5>
              <span className="text-[11px] text-slate-500">{post.poll.totalVotes} votes</span>
            </div>
            <div className="space-y-2">
              {post.poll.options.map(opt => {
                const percent = post.poll!.totalVotes > 0 
                  ? Math.round((opt.votes / post.poll!.totalVotes) * 100) 
                  : 0;
                const isSelected = post.poll!.userVotedOptionId === opt.id;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleVotePoll(post.id, opt.id)}
                    className={`w-full relative overflow-hidden p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50/40 font-bold text-indigo-950' 
                        : 'border-slate-200 hover:border-indigo-300 bg-white text-slate-800'
                    }`}
                  >
                    {/* Fill bar */}
                    <div 
                      className={`absolute top-0 bottom-0 left-0 ${isSelected ? 'bg-indigo-200/50' : 'bg-slate-100'} transition-all`}
                      style={{ width: `${percent}%` }}
                    />
                    <div className="relative flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 inline" />}
                        <span>{opt.text}</span>
                      </span>
                      <span className="font-bold text-slate-600">{percent}%</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Social Metrics Counter Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="flex -space-x-1">
              <span className="inline-block w-4 h-4 rounded-full bg-blue-100 text-[10px] text-center leading-4">👍</span>
              <span className="inline-block w-4 h-4 rounded-full bg-amber-100 text-[10px] text-center leading-4">🎉</span>
              <span className="inline-block w-4 h-4 rounded-full bg-yellow-100 text-[10px] text-center leading-4">💡</span>
            </span>
            <span className="font-medium">{totalReactions} reactions</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowComments(!showComments)}
              className="hover:underline font-medium cursor-pointer"
            >
              {post.commentsCount} comments
            </button>
            <span>•</span>
            <span>{post.sharesCount} shares</span>
          </div>
        </div>

        {/* Action Buttons with Multi-Reaction Selector */}
        <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between relative">
          
          {/* Reaction Picker Popover */}
          {showReactionPicker && (
            <div 
              onMouseLeave={() => setShowReactionPicker(false)}
              className="absolute -top-12 left-0 bg-white border border-slate-200 rounded-full shadow-xl px-2 py-1.5 flex items-center gap-2 z-30 animate-in fade-in zoom-in-95"
            >
              {(['like', 'celebrate', 'interesting', 'support', 'helpful'] as ReactionType[]).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    handleReaction(post.id, type);
                    setShowReactionPicker(false);
                  }}
                  className="hover:scale-130 transition-transform p-1 text-base cursor-pointer"
                  title={reactionEmojis[type].label}
                >
                  {reactionEmojis[type].icon}
                </button>
              ))}
            </div>
          )}

          {/* Like / React Button */}
          <button
            onMouseEnter={() => setShowReactionPicker(true)}
            onClick={() => handleReaction(post.id, currentReaction || 'like')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              currentReaction 
                ? reactionEmojis[currentReaction].color 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>{currentReaction ? reactionEmojis[currentReaction].icon : '👍'}</span>
            <span>{currentReaction ? reactionEmojis[currentReaction].label : 'Like'}</span>
          </button>

          {/* Comment Trigger */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-slate-500" />
            <span>Comment</span>
          </button>

          {/* Share */}
          <button
            onClick={() => {
              showToast('Post link copied to clipboard! 🔗');
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Bookmark */}
          <button
            onClick={() => handleToggleSavePost(post.id)}
            className={`p-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              post.isSaved ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:bg-slate-100'
            }`}
            title="Save post"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        {/* Comment Section (Collapsible) */}
        {showComments && (
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
            {/* Input */}
            <form onSubmit={onCommentSubmit} className="flex gap-2">
              <input
                type="text"
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                placeholder="Share your perspective or ask a question..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Existing comments list */}
            {post.comments && post.comments.length > 0 ? (
              <div className="space-y-2.5 pt-1">
                {post.comments.map(c => (
                  <div key={c.id} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={c.authorAvatar} alt={c.authorName} className="w-5 h-5 rounded-full object-cover" />
                        <span className="font-bold text-slate-900">{c.authorName}</span>
                        <span className="text-[10px] text-slate-400">• {c.authorInstitution}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{c.createdAt}</span>
                    </div>
                    <p className="text-slate-700 pl-7">{c.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 text-center py-2">
                No comments yet. Start the academic discussion!
              </p>
            )}
          </div>
        )}

      </div>
    </article>
  );
};
