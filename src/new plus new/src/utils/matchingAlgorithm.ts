import { StudentProfile, TeammateRecommendation } from '../types';

interface TeammateMatchQuery {
  rawQuery?: string;
  requiredSkills: string[];
  targetInterests?: string[];
  preferredEducationLevel?: string;
  minWeeklyHours?: number;
  openToRemote?: boolean;
}

export function parseNaturalLanguageQuery(query: string): TeammateMatchQuery {
  const lower = query.toLowerCase();
  const foundSkills: string[] = [];
  const foundInterests: string[] = [];

  const skillDictionary = [
    'react', 'next.js', 'typescript', 'javascript', 'html', 'css', 'tailwind',
    'python', 'fastapi', 'flask', 'django', 'node.js', 'express', 'golang', 'rust',
    'c++', 'c', 'java', 'docker', 'kubernetes', 'aws', 'pytorch', 'tensorflow',
    'langchain', 'figma', 'ui/ux', 'sql', 'postgresql', 'mongodb', 'redis',
    'arduino', 'iot', 'robotics', 'ros 2', 'solidity', 'blockchain'
  ];

  for (const s of skillDictionary) {
    if (lower.includes(s)) {
      foundSkills.push(s);
    }
  }

  // Interests detection
  if (lower.includes('ai') || lower.includes('ml') || lower.includes('machine learning')) foundInterests.push('AI/ML');
  if (lower.includes('web') || lower.includes('frontend') || lower.includes('fullstack') || lower.includes('backend')) foundInterests.push('Web Development');
  if (lower.includes('robot') || lower.includes('hardware') || lower.includes('drone')) foundInterests.push('Robotics');
  if (lower.includes('health') || lower.includes('medical')) foundInterests.push('Healthcare');
  if (lower.includes('fintech') || lower.includes('finance') || lower.includes('money')) foundInterests.push('FinTech');
  if (lower.includes('design') || lower.includes('ui') || lower.includes('ux')) foundInterests.push('Product Design');

  return {
    rawQuery: query,
    requiredSkills: foundSkills,
    targetInterests: foundInterests,
    minWeeklyHours: 8,
  };
}

export function calculateTeammateMatches(
  currentStudent: StudentProfile,
  candidates: StudentProfile[],
  query: TeammateMatchQuery
): TeammateRecommendation[] {
  return candidates
    .filter(candidate => candidate.id !== currentStudent.id)
    .map(candidate => {
      let score = 40; // baseline recommendation score
      const reasons: string[] = [];
      const complementary: string[] = [];

      // 1. Complementary Skills Check
      const candidateSkillNames = candidate.skills.map(s => s.name.toLowerCase());
      
      if (query.requiredSkills.length > 0) {
        let matchedReqCount = 0;
        for (const req of query.requiredSkills) {
          const match = candidate.skills.find(s => s.name.toLowerCase().includes(req) || req.includes(s.name.toLowerCase()));
          if (match) {
            matchedReqCount++;
            complementary.push(`${match.name} (${match.level})`);
          }
        }

        if (matchedReqCount > 0) {
          const boost = Math.min(35, matchedReqCount * 18);
          score += boost;
          reasons.push(`Possesses ${matchedReqCount} required skill(s): ${complementary.join(', ')}`);
        }
      } else {
        // Complementary to current user's profile: e.g. frontend user looks for backend/ML
        const userHasFrontend = currentStudent.skills.some(s => ['react', 'html', 'css', 'tailwind', 'typescript'].includes(s.name.toLowerCase()));
        const candidateHasBackend = candidate.skills.some(s => ['node.js', 'fastapi', 'golang', 'postgresql', 'python', 'pytorch'].includes(s.name.toLowerCase()));
        const candidateHasDesign = candidate.skills.some(s => ['figma', 'ui/ux design'].includes(s.name.toLowerCase()));

        if (userHasFrontend && candidateHasBackend) {
          score += 20;
          reasons.push('Complementary stack: Strong backend & systems capabilities to pair with your frontend base');
          complementary.push('Backend/API integration');
        }
        if (userHasFrontend && candidateHasDesign) {
          score += 15;
          reasons.push('Design synergy: Product design expertise for rapid UI wireframing');
          complementary.push('UI/UX Design');
        }
      }

      // 2. Shared or Target Interests
      const sharedInterests = candidate.interests.filter(i => 
        currentStudent.interests.includes(i) || (query.targetInterests && query.targetInterests.includes(i))
      );
      if (sharedInterests.length > 0) {
        score += Math.min(18, sharedInterests.length * 6);
        reasons.push(`Shared interests in ${sharedInterests.slice(0, 2).join(' & ')}`);
      }

      // 3. Collaboration Availability & Preference
      if (candidate.collaboration.openToTeam) {
        score += 10;
        reasons.push(`Actively open to team collaboration (${candidate.collaboration.availabilityHoursPerWeek} hrs/week)`);
      }

      // 4. Verification & Activity Trust Boost
      if (candidate.verification.isVerified) {
        score += 6;
        reasons.push('Verified institution credentials');
      }

      // 5. Cross-University Diversity
      if (candidate.universityName !== currentStudent.universityName) {
        reasons.push(`Cross-university perspective from ${candidate.universityName}`);
      } else {
        reasons.push(`Same campus ecosystem (${candidate.universityName})`);
      }

      // Clamp score between 52% and 98% (realistic recommendation score, never claiming 100% certainty)
      const finalScore = Math.min(98, Math.max(52, Math.round(score)));

      return {
        student: candidate,
        matchScore: finalScore,
        matchReasons: reasons.slice(0, 4),
        complementarySkills: complementary.length > 0 ? complementary : candidate.skills.slice(0, 3).map(s => `${s.name} (${s.level})`),
        availabilityScore: candidate.collaboration.availabilityHoursPerWeek,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
