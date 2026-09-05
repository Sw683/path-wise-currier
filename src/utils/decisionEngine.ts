import { StudentProfile, RecommendationResult, StreamChoice, CareerPath } from '../types';
import { CAREER_PATHS } from '../data/careers';

export function evaluateStudentProfile(profile: StudentProfile): RecommendationResult[] {
  const results: RecommendationResult[] = [];

  const interests = profile.interests;
  const academics = profile.academics;
  const financial = profile.financial;

  for (const career of CAREER_PATHS) {
    let score = 50;

    // 1. Interest Alignment
    if (career.id === 'software-ai-engineer' || career.id === 'data-scientist-business-analyst') {
      score += (interests.technical * 0.22) + (interests.analytical * 0.18);
    } else if (career.id === 'mbbs-doctor-healthcare') {
      score += (interests.scientific * 0.25) + (interests.social * 0.15);
    } else if (career.id === 'chartered-accountant-ca') {
      score += (interests.analytical * 0.20) + (interests.business * 0.20);
    } else if (career.id === 'corporate-lawyer-judiciary') {
      score += (interests.leadership * 0.20) + (interests.social * 0.10) + (interests.analytical * 0.10);
    } else if (career.id === 'defence-officer-nda-cds') {
      score += (interests.leadership * 0.20) + (interests.physical * 0.20);
    } else if (career.id === 'scientific-researcher-iiser-iisc') {
      score += (interests.scientific * 0.22) + (interests.analytical * 0.18);
    } else if (career.id === 'civil-services-upsc-ias-ips') {
      score += (interests.leadership * 0.18) + (interests.social * 0.14) + (interests.analytical * 0.08);
    } else if (career.id === 'ui-ux-product-designer') {
      score += (interests.creative * 0.25) + (interests.technical * 0.15);
    } else if (career.id === 'sports-professional-athlete') {
      score += (interests.physical * 0.35) + (interests.leadership * 0.05);
    }

    // 2. Academic Alignment
    const mathScore = academics.subjectMarks.mathematics || 70;
    const sciScore = academics.subjectMarks.science || 70;
    const engScore = academics.subjectMarks.english || 70;
    const sstScore = academics.subjectMarks.socialStudies || 70;

    if (career.id === 'software-ai-engineer' || career.id === 'data-scientist-business-analyst') {
      if (mathScore >= 85) score += 15;
      else if (mathScore >= 70) score += 8;
      if (sciScore >= 80) score += 10;
    } else if (career.id === 'mbbs-doctor-healthcare') {
      if (sciScore >= 85) score += 20;
      else if (sciScore >= 70) score += 10;
    } else if (career.id === 'chartered-accountant-ca') {
      if (mathScore >= 80) score += 15;
      else if (mathScore >= 65) score += 8;
    } else if (career.id === 'corporate-lawyer-judiciary' || career.id === 'civil-services-upsc-ias-ips') {
      if (engScore >= 85) score += 12;
      if (sstScore >= 80) score += 12;
    } else if (career.id === 'defence-officer-nda-cds') {
      if (mathScore >= 70) score += 10;
      if (engScore >= 70) score += 10;
    }

    // 3. Financial Match
    if (financial.coachingAffordability === 'none' || financial.coachingAffordability === 'budget_low') {
      if (career.lowCostPath) {
        score += 8;
      }
    }

    // 4. Target Goal Match
    if (profile.targetCareerGoal && profile.targetCareerGoal.toLowerCase().includes(career.title.toLowerCase().split(' ')[0])) {
      score += 15;
    }

    const finalScore = Math.min(96, Math.max(45, Math.round(score * 0.72)));

    let recStream: StreamChoice = 'PCM';
    if (career.requiredStream.includes('PCM')) recStream = 'PCM';
    else if (career.requiredStream.includes('PCB')) recStream = 'PCB';
    else if (career.requiredStream.includes('Commerce')) recStream = 'Commerce';
    else if (career.requiredStream.includes('Humanities')) recStream = 'Humanities';

    const reasons: string[] = [];
    if (career.id === 'software-ai-engineer') {
      reasons.push(`High analytical aptitude (${interests.analytical}%) and technical interest (${interests.technical}%).`);
      reasons.push(`Solid Mathematics score (${mathScore}%) aligns well with algorithmic problem solving.`);
      if (financial.coachingAffordability === 'budget_low' || financial.coachingAffordability === 'none') {
        reasons.push('Technology careers heavily reward free open-source GitHub portfolios, NPTEL, and self-study beyond formal coaching.');
      }
    } else if (career.id === 'mbbs-doctor-healthcare') {
      reasons.push(`Exceptional scientific curiosity (${interests.scientific}%) and social empathy (${interests.social}%).`);
      reasons.push(`Strong Science performance (${sciScore}%) aligns with deep biological and clinical coursework.`);
    } else if (career.id === 'chartered-accountant-ca') {
      reasons.push(`Strong numerical focus and business mindset (${interests.business}%).`);
      reasons.push('ICAI self-study route provides high ROI with low tuition overhead and paid articleship.');
    } else if (career.id === 'defence-officer-nda-cds') {
      reasons.push(`High physical drive (${interests.physical}%) and leadership traits (${interests.leadership}%).`);
      reasons.push('100% government sponsored training at NDA Khadakwasla with immediate gazetted officer commission.');
    } else {
      reasons.push(`Strong match with your top interest dimensions.`);
      reasons.push(`High career flexibility and accessible entry routes.`);
    }

    results.push({
      careerId: career.id,
      careerTitle: career.title,
      compatibilityScore: finalScore,
      streamRecommendation: recStream,
      whyThisRecommendation: reasons,
      strengthsAlignment: [
        `Strongest subjects: ${academics.strongestSubjects.slice(0, 2).join(', ')}`,
        `Learning style: ${academics.learningPreferences.join(', ')}`,
        `Study endurance: ${academics.studyHoursPerDay} hrs/day`
      ],
      cautionsAndConsiderations: [
        `Competition rating: ${career.competitionScore} - Requires structured routine.`,
        `Entrance dependency: ${career.entranceExamDependency}. Backup strategies are provided.`
      ],
      fourTierSummary: {
        highProbability: career.highProbabilityPath.title,
        ambitious: career.ambitiousPath.title,
        backup: career.backupPath.title,
        lowCost: career.lowCostPath.title
      },
      next30DaysChecklist: [
        { id: '1', text: `Review syllabus and previous year questions for ${career.primaryExams[0] || 'core exams'}.`, completed: false },
        { id: '2', text: `Dedicate 45 minutes daily to ${career.skillsRequired[0] || 'core fundamentals'}.`, completed: false },
        { id: '3', text: 'Bookmark relevant scholarships matching your state and income profile.', completed: false },
        { id: '4', text: 'Discuss recommended stream choices with your family and mentors.', completed: false }
      ],
      next6MonthsMilestones: [
        `Master Class 11 core fundamentals with 80%+ accuracy on weekly quizzes.`,
        `Build first project or portfolio piece for ${career.title}.`,
        `Take at least 2 full-length diagnostic mock assessments.`
      ]
    });
  }

  results.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  return results;
}
