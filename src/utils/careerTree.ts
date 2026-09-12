import { CareerPath, InterestProfile, RecommendationResult, StudentProfile } from '../types';
import { CAREER_PATHS } from '../data/careers';

export type CareerTreeNodeKind = 'direction' | 'field' | 'education' | 'skill' | 'preparation' | 'career' | 'alternative';

export interface CareerTreeNode {
  id: string;
  label: string;
  kind: CareerTreeNodeKind;
  summary: string;
  whyFit: string;
  children: CareerTreeNode[];
  metadata?: { skills?: string[]; route?: string; alternatives?: string[] };
}

export interface PersonalizedCareerTree {
  title: string;
  subtitle: string;
  roots: CareerTreeNode[];
  generatedFrom: string[];
}

const topDimension = (interests: InterestProfile) =>
  (Object.entries(interests) as [keyof InterestProfile, number][]).sort((a, b) => b[1] - a[1])[0][0];

const fieldForCareer = (career: CareerPath) => {
  if (career.category.toLowerCase().includes('technology')) return 'Technology & Digital Systems';
  if (career.category.toLowerCase().includes('health')) return 'Healthcare & Life Sciences';
  if (career.category.toLowerCase().includes('business')) return 'Business, Finance & Strategy';
  if (career.category.toLowerCase().includes('law')) return 'Law, Policy & Public Impact';
  if (career.category.toLowerCase().includes('defence')) return 'Defence, Safety & Leadership';
  return career.category;
};

const recommendationReason = (recommendation: RecommendationResult) =>
  recommendation.whyThisRecommendation[0] || 'Your interests and current learning profile suggest this is worth exploring.';

const pathToTree = (recommendation: RecommendationResult, career: CareerPath, profile: StudentProfile): CareerTreeNode => {
  const field = fieldForCareer(career);
  const skills = career.skillsRequired.slice(0, 4);
  const route = career.timelineStages.slice(0, 2).map((stage) => `${stage.classRange}: ${stage.action}`).join(' ');
  const alternatives = [
    career.backupPath.title,
    ...career.alternativeExams.slice(0, 2)
  ].filter(Boolean);

  return {
    id: `direction-${career.id}`,
    label: field,
    kind: 'direction',
    summary: 'Potential direction worth exploring',
    whyFit: recommendationReason(recommendation),
    children: [
      {
        id: `field-${career.id}`,
        label: career.title,
        kind: 'field',
        summary: career.shortSummary,
        whyFit: `${recommendation.compatibilityScore}% compatibility signal from your current profile. This is guidance, not a guaranteed outcome.`,
        children: [
          {
            id: `education-${career.id}`,
            label: `${career.requiredStream.join(' / ')} education route`,
            kind: 'education',
            summary: `Typical study duration: ${career.studyDurationYears}.`,
            whyFit: `This route keeps the core subjects and entry options relevant to ${profile.classLevel === '12' ? 'your next course decision' : 'your current stage'}.`,
            children: [
              {
                id: `skills-${career.id}`,
                label: 'Skills to explore',
                kind: 'skill',
                summary: skills.join(' • ') || 'Problem solving, communication, and consistency',
                whyFit: 'These are practical capabilities to try through small projects before committing to a career.',
                children: [
                  {
                    id: `prep-${career.id}`,
                    label: 'Preparation options',
                    kind: 'preparation',
                    summary: route || `Explore ${career.primaryExams.slice(0, 2).join(' and ')} alongside foundational practice.`,
                    whyFit: 'Preparation should be adjusted as you learn what suits you.',
                    children: [
                      {
                        id: `career-${career.id}`,
                        label: career.title,
                        kind: 'career',
                        summary: career.startingSalaryRange,
                        whyFit: 'A possible destination after building the right education, skills, and experience.',
                        children: [
                          {
                            id: `alternative-${career.id}`,
                            label: 'Alternative / recovery routes',
                            kind: 'alternative',
                            summary: alternatives.join(' • ') || 'Related degrees, adjacent roles, and portfolio-led routes remain open.',
                            whyFit: 'Changing direction does not erase the skills you have already built.',
                            children: [],
                            metadata: { alternatives }
                          }
                        ],
                        metadata: { skills, route }
                      }
                    ],
                    metadata: { skills, route }
                  }
                ],
                metadata: { skills }
              }
            ],
            metadata: { route }
          }
        ]
      }
    ]
  };
};

export function generatePersonalizedCareerTree(
  profile: StudentProfile,
  recommendations: RecommendationResult[],
): PersonalizedCareerTree {
  const pathData = recommendations.slice(0, 3)
    .map((recommendation) => {
      const matching = CAREER_PATHS.find((item) => item.id === recommendation.careerId);
      return matching ? pathToTree(recommendation, matching, profile) : null;
    })
    .filter((node): node is CareerTreeNode => Boolean(node));

  return {
    title: 'Your personalized career map',
    subtitle: `Potential paths shaped by your ${topDimension(profile.interests)} strengths, interests, and current stage.`,
    roots: pathData,
    generatedFrom: [
      `Class ${profile.classLevel}`,
      profile.targetCareerGoal || 'Open exploration',
      `Top interest: ${topDimension(profile.interests)}`
    ]
  };
}
