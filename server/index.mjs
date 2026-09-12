import 'dotenv/config';
import express from 'express';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
const port = Number(process.env.PORT || 8787);
const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const requestTimeoutMs = 30000;

app.use(express.json({ limit: '128kb' }));

const schemas = {
  chat: {
    type: Type.OBJECT,
    properties: {
      reply: { type: Type.STRING },
      quickReplies: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: ['reply', 'quickReplies']
  },
  recommendations: {
    type: Type.OBJECT,
    properties: {
      paths: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            whyItMayFit: { type: Type.STRING },
            skillsToExplore: { type: Type.ARRAY, items: { type: Type.STRING } },
            educationRoute: { type: Type.STRING },
            alternativePaths: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ['title', 'whyItMayFit', 'skillsToExplore', 'educationRoute', 'alternativePaths']
        }
      }
    },
    required: ['paths']
  },
  tree: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      nodes: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            type: { type: Type.STRING },
            description: { type: Type.STRING },
            children: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ['id', 'title', 'type', 'description', 'children']
        }
      }
    },
    required: ['title', 'nodes']
  },
  whatIf: {
    type: Type.OBJECT,
    properties: {
      scenario: { type: Type.STRING },
      outlook: { type: Type.STRING },
      advantages: { type: Type.ARRAY, items: { type: Type.STRING } },
      considerations: { type: Type.ARRAY, items: { type: Type.STRING } },
      nextSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
      alternatives: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: ['scenario', 'outlook', 'advantages', 'considerations', 'nextSteps', 'alternatives']
  },
  roadmap: {
    type: Type.OBJECT,
    properties: {
      summary: { type: Type.STRING },
      milestones: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            timeframe: { type: Type.STRING },
            actions: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ['title', 'timeframe', 'actions']
        }
      }
    },
    required: ['summary', 'milestones']
  }
};

const operationInstructions = {
  chat: 'Answer as a warm, practical career mentor for an Indian student. Avoid guarantees and sensitive questions. Keep the reply concise and provide up to four useful follow-up choices.',
  recommendations: 'Suggest 2 to 3 potential career paths worth exploring. Never present a prediction or guarantee. Ground every suggestion in the supplied profile.',
  tree: 'Build a progressive personalized career exploration tree. Use potential paths and alternatives, not guaranteed outcomes. Keep it to 12 to 20 useful nodes.',
  whatIf: 'Compare the requested scenario with the student profile. Be balanced, practical, and explicit about alternatives. Do not make outcome guarantees.',
  roadmap: 'Create a realistic, adaptable preparation roadmap. Respect the student stage, exam timeline, study capacity, and skills. Do not promise admission or employment.'
};

function safeJson(value) {
  return JSON.stringify(value ?? {}, (_, item) => (
    typeof item === 'string' && item.length > 4000 ? item.slice(0, 4000) : item
  ));
}

function buildPrompt(operation, body) {
  return [
    operationInstructions[operation],
    'Return only JSON matching the provided schema.',
    `Student/profile data: ${safeJson(body.profile)}`,
    body.question ? `Student question: ${body.question}` : '',
    body.scenario ? `What-if scenario: ${body.scenario}` : '',
    body.targetCareer ? `Target career or direction: ${body.targetCareer}` : '',
    body.context ? `Additional context: ${safeJson(body.context)}` : ''
  ].filter(Boolean).join('\n');
}

async function generate(operation, body) {
  if (!process.env.GEMINI_API_KEY) {
    const error = new Error('GEMINI_API_KEY is not configured on the server.');
    error.statusCode = 503;
    throw error;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const request = ai.models.generateContent({
    model,
    contents: buildPrompt(operation, body),
    config: {
      responseMimeType: 'application/json',
      responseSchema: schemas[operation],
      temperature: 0.35
    }
  });
  const response = await Promise.race([
    request,
    new Promise((_, reject) => setTimeout(() => reject(Object.assign(new Error('Gemini request timed out.'), { statusCode: 504 })), requestTimeoutMs))
  ]);

  const text = response.text?.trim();
  if (!text) {
    const error = new Error('Gemini returned an empty response.');
    error.statusCode = 502;
    throw error;
  }

  try {
    return JSON.parse(text);
  } catch {
    const error = new Error('Gemini returned an invalid structured response.');
    error.statusCode = 502;
    throw error;
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, geminiConfigured: Boolean(process.env.GEMINI_API_KEY) });
});

app.post('/api/gemini/:operation', async (req, res) => {
  const { operation } = req.params;
  if (!Object.prototype.hasOwnProperty.call(schemas, operation)) {
    return res.status(404).json({ error: 'Unsupported Gemini operation.' });
  }

  try {
    const result = await generate(operation, req.body || {});
    return res.json(result);
  } catch (error) {
    const status = Number(error?.statusCode) || 500;
    console.error(`[gemini:${operation}]`, error);
    return res.status(status).json({
      error: status >= 500 ? 'The AI service is temporarily unavailable.' : error.message
    });
  }
});

app.listen(port, () => {
  console.log(`PathWise AI server listening on http://localhost:${port}`);
});
