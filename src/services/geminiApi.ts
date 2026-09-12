import { StudentProfile } from '../types';

export interface GeminiChatResponse {
  reply: string;
  quickReplies: string[];
}

export interface GeminiCareerPath {
  title: string;
  whyItMayFit: string;
  skillsToExplore: string[];
  educationRoute: string;
  alternativePaths: string[];
}

export interface GeminiRecommendationsResponse {
  paths: GeminiCareerPath[];
}

export interface GeminiTreeNode {
  id: string;
  title: string;
  type: string;
  description: string;
  children: string[];
}

export interface GeminiCareerTreeResponse {
  title: string;
  nodes: GeminiTreeNode[];
}

export interface GeminiWhatIfResponse {
  scenario: string;
  outlook: string;
  advantages: string[];
  considerations: string[];
  nextSteps: string[];
  alternatives: string[];
}

export interface GeminiRoadmapResponse {
  summary: string;
  milestones: Array<{ title: string; timeframe: string; actions: string[] }>;
}

export interface GeminiRequest {
  profile: Partial<StudentProfile>;
  question?: string;
  scenario?: string;
  targetCareer?: string;
  context?: Record<string, unknown>;
}

export class GeminiApiError extends Error {
  readonly status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = 'GeminiApiError';
    this.status = status;
  }
}

async function request<T>(operation: string, body: GeminiRequest, signal?: AbortSignal): Promise<T> {
  const timeoutController = new AbortController();
  const timeoutId = window.setTimeout(() => timeoutController.abort(), 30000);
  const abortFromCaller = () => timeoutController.abort();
  signal?.addEventListener('abort', abortFromCaller, { once: true });
  try {
    const response = await fetch(`/api/gemini/${operation}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: timeoutController.signal
    });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new GeminiApiError(payload.error || 'The AI service is unavailable.', response.status);
  }
  return payload as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new GeminiApiError('The AI request timed out. Please try again.', 504);
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
    signal?.removeEventListener('abort', abortFromCaller);
  }
}

export const geminiApi = {
  chat: (body: GeminiRequest, signal?: AbortSignal) => request<GeminiChatResponse>('chat', body, signal),
  recommendations: (body: GeminiRequest, signal?: AbortSignal) => request<GeminiRecommendationsResponse>('recommendations', body, signal),
  careerTree: (body: GeminiRequest, signal?: AbortSignal) => request<GeminiCareerTreeResponse>('tree', body, signal),
  whatIf: (body: GeminiRequest, signal?: AbortSignal) => request<GeminiWhatIfResponse>('what-if', body, signal),
  roadmap: (body: GeminiRequest, signal?: AbortSignal) => request<GeminiRoadmapResponse>('roadmap', body, signal)
};
