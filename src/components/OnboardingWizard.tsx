import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  Coins, 
  Target, 
  Brain,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import { ClassLevel, StreamChoice } from '../types';

export const OnboardingWizard: React.FC = () => {
  const { activeProfile, updateProfile, setActiveTab } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;
  const [nameError, setNameError] = useState('');

  // Step 1: Basic Info Form State
  const [name, setName] = useState(activeProfile.name || '');
  const [age, setAge] = useState(activeProfile.age || 15);
  const [classLevel, setClassLevel] = useState<ClassLevel>(activeProfile.classLevel || '10');
  const [state, setState] = useState(activeProfile.state || 'Uttar Pradesh');
  const [cityTier, setCityTier] = useState(activeProfile.cityTier || 'Tier-2');
  const [schoolType, setSchoolType] = useState(activeProfile.schoolType || 'CBSE');
  const [medium, setMedium] = useState(activeProfile.mediumOfEducation || 'English');
  const [internet, setInternet] = useState(activeProfile.internetQuality || 'mobile_4g_5g');

  // Step 2: Academic Diagnostic Form State
  const [maths, setMaths] = useState(activeProfile.academics?.subjectMarks?.mathematics || 80);
  const [science, setScience] = useState(activeProfile.academics?.subjectMarks?.science || 80);
  const [english, setEnglish] = useState(activeProfile.academics?.subjectMarks?.english || 78);
  const [sst, setSst] = useState(activeProfile.academics?.subjectMarks?.socialStudies || 75);
  const [studyHours, setStudyHours] = useState(activeProfile.academics?.studyHoursPerDay || 3);
  const [learningSpeed, setLearningSpeed] = useState(activeProfile.academics?.learningSpeed || 'fast');

  // Step 3: Scenario Interest Answers
  const [scenarios, setScenarios] = useState({
    solvePuzzles: 4,      // Analytical
    buildSoftware: 4,     // Technical
    helpPatients: 2,      // Social
    explainConcepts: 3,   // Teaching / Leadership
    experimentScience: 4, // Scientific
    organizeMoney: 3,     // Business / Commerce
    drawAndDesign: 3,     // Creative
    playSports: 3         // Physical
  });

  // Step 4: Financial & Family Reality Check
  const [incomeBracket, setIncomeBracket] = useState(activeProfile.financial?.monthlyIncomeBracket || '25k-50k');
  const [coachingBudget, setCoachingBudget] = useState(activeProfile.financial?.coachingAffordability || 'budget_low');
  const [relocation, setRelocation] = useState(activeProfile.financial?.relocationPossibility || 'state_level');
  const [earningUrgency, setEarningUrgency] = useState(activeProfile.financial?.earningUrgency || 'standard_4_5yrs');
  const [category, setCategory] = useState<string>('General');

  // Step 5: Aspirations
  const [targetGoal, setTargetGoal] = useState(activeProfile.targetCareerGoal || 'Become an AI Engineer');

  const validateStepOne = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setNameError('Student name is required before continuing.');
      return false;
    }

    setNameError('');
    return true;
  };

  const handleComplete = () => {
    if (!validateStepOne()) {
      setCurrentStep(1);
      return;
    }

    // Calculate Interest Radar
    const computedInterests = {
      analytical: Math.min(100, Math.round(scenarios.solvePuzzles * 18 + maths * 0.15)),
      technical: Math.min(100, Math.round(scenarios.buildSoftware * 20)),
      scientific: Math.min(100, Math.round(scenarios.experimentScience * 18 + science * 0.15)),
      social: Math.min(100, Math.round(scenarios.helpPatients * 20)),
      creative: Math.min(100, Math.round(scenarios.drawAndDesign * 20)),
      business: Math.min(100, Math.round(scenarios.organizeMoney * 20)),
      physical: Math.min(100, Math.round(scenarios.playSports * 20)),
      leadership: Math.min(100, Math.round(scenarios.explainConcepts * 20))
    };

    updateProfile({
      name,
      age: Number(age),
      classLevel,
      state,
      cityTier: cityTier as any,
      schoolType: schoolType as any,
      mediumOfEducation: medium as any,
      internetQuality: internet as any,
      targetCareerGoal: targetGoal,
      academics: {
        overallPercentage: Math.round((maths + science + english + sst) / 4),
        subjectMarks: {
          mathematics: Number(maths),
          science: Number(science),
          english: Number(english),
          socialStudies: Number(sst)
        },
        strongestSubjects: maths > science ? ['Mathematics', 'Computer'] : ['Science', 'Mathematics'],
        weakestSubjects: sst < english ? ['Social Studies'] : ['Language'],
        studyHoursPerDay: Number(studyHours),
        learningSpeed: learningSpeed as any,
        learningPreferences: ['mathematics', 'practical', 'visual']
      },
      interests: computedInterests,
      financial: {
        monthlyIncomeBracket: incomeBracket as any,
        coachingAffordability: coachingBudget as any,
        relocationPossibility: relocation as any,
        earningUrgency: earningUrgency as any,
        eligibleCategories: [category as any]
      },
      completedAssessment: true
    });

    setActiveTab('dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span>Assessment Step {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Completed</span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-brand-600 to-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
        
        {/* Step 1: Basic & Context Profile */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold mb-2">
                <Brain className="w-3.5 h-3.5" /> Step 1: Basic & Geographic Context
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-['Outfit']">Tell us about yourself</h2>
              <p className="text-xs sm:text-sm text-slate-500">Your school board and state help us map local state quota CETs and scholarships.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Student Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value.trim()) {
                      setNameError('');
                    }
                  }}
                  placeholder="e.g. Aarav Sharma"
                  aria-invalid={Boolean(nameError)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
                {nameError && <p className="mt-1 text-xs text-red-600">{nameError}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Class (Grade)</label>
                <select
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value as ClassLevel)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                >
                  <option value="8">Class 8 (Early Exploration)</option>
                  <option value="9">Class 9 (Foundations)</option>
                  <option value="10">Class 10 (Stream Selection Milestone)</option>
                  <option value="11">Class 11 (Stream Alignment)</option>
                  <option value="12">Class 12 (Entrance & Board Year)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">State / UT (for State Quotas)</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                >
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Other State">Other Indian State/UT</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location Area Tier</label>
                <select
                  value={cityTier}
                  onChange={(e) => setCityTier(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                >
                  <option value="Tier-1">Metro / Tier-1 (Delhi, Mumbai, Bengaluru, etc.)</option>
                  <option value="Tier-2">Tier-2 City (Kanpur, Chandigarh, Indore, etc.)</option>
                  <option value="Tier-3">Tier-3 Town / District HQ</option>
                  <option value="Rural">Rural / Village / Semi-urban</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">School Board</label>
                <select
                  value={schoolType}
                  onChange={(e) => setSchoolType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                >
                  <option value="CBSE">CBSE (Central Board)</option>
                  <option value="ICSE">ICSE / ISC</option>
                  <option value="State Board">State Board</option>
                  <option value="Navodaya / KV">Kendriya Vidyalaya / JNV</option>
                  <option value="Private International">Cambridge / IB</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Internet & Device Access</label>
                <select
                  value={internet}
                  onChange={(e) => setInternet(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                >
                  <option value="high_broadband">High Speed WiFi Broadband + Laptop</option>
                  <option value="mobile_4g_5g">Smartphone with 4G/5G Daily Data</option>
                  <option value="limited_unstable">Shared Family Smartphone / Limited Data</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Academic Diagnostics */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
                <BookOpen className="w-3.5 h-3.5" /> Step 2: Academic Marks & Learning Style
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-['Outfit']">Your Academic Performance</h2>
              <p className="text-xs sm:text-sm text-slate-500">Provide approximate marks (out of 100) from recent school term examinations.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-800">Mathematics Marks</label>
                  <span className="text-xs font-extrabold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">{maths}%</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="100"
                  value={maths}
                  onChange={(e) => setMaths(Number(e.target.value))}
                  className="w-full accent-brand-600"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-800">Science / Physics / Biology</label>
                  <span className="text-xs font-extrabold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">{science}%</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="100"
                  value={science}
                  onChange={(e) => setScience(Number(e.target.value))}
                  className="w-full accent-brand-600"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-800">English Language & Literature</label>
                  <span className="text-xs font-extrabold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">{english}%</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="100"
                  value={english}
                  onChange={(e) => setEnglish(Number(e.target.value))}
                  className="w-full accent-brand-600"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-800">Social Science / Hist / Geo</label>
                  <span className="text-xs font-extrabold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">{sst}%</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="100"
                  value={sst}
                  onChange={(e) => setSst(Number(e.target.value))}
                  className="w-full accent-brand-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Daily Study Hours (Outside School)</label>
                <select
                  value={studyHours}
                  onChange={(e) => setStudyHours(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                >
                  <option value="2">1?2 Hours (Light pace)</option>
                  <option value="3.5">3?4 Hours (Moderate balanced pace)</option>
                  <option value="5">5?6 Hours (High dedication for competitive exams)</option>
                  <option value="7">7+ Hours (Intensive prep)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Learning Style</label>
                <select
                  value={learningSpeed}
                  onChange={(e) => setLearningSpeed(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                >
                  <option value="fast">Practical, Hands-on & Fast Problem Solving</option>
                  <option value="deep_methodical">Deep Conceptual Theory & Memorization</option>
                  <option value="moderate">Visual & Story-based Learning</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Scenario-Based Interest Assessment */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-2">
                <Brain className="w-3.5 h-3.5" /> Step 3: Situational Scenario Assessment
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-['Outfit']">What excites you in real life?</h2>
              <p className="text-xs sm:text-sm text-slate-500">Rate each scenario from 1 (Hate it / Never) to 5 (Love it / Always excited).</p>
            </div>

            <div className="space-y-3">
              {[
                { key: 'solvePuzzles', label: '1. Solving tough mathematical riddles or logical puzzles even when they take 45+ minutes.' },
                { key: 'buildSoftware', label: '2. Understanding how mobile apps, video games, robotics, and software systems are built.' },
                { key: 'helpPatients', label: '3. Treating or caring for patients, listening to medical symptoms, or nursing sick animals.' },
                { key: 'explainConcepts', label: '4. Debating, public speaking, leading a team, or explaining complex topics to friends.' },
                { key: 'experimentScience', label: '5. Doing chemistry/physics experiments, observing cells under microscopes, or space discoveries.' },
                { key: 'organizeMoney', label: '6. Managing a school event budget, understanding business profit margins, or stock investing.' },
                { key: 'drawAndDesign', label: '7. Designing posters, visual sketching, color combinations, and creating user experiences.' },
                { key: 'playSports', label: '8. Rigorous daily physical training, sports competitions, and outdoor athletic activities.' }
              ].map((item) => (
                <div key={item.key} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs font-medium text-slate-800 leading-snug">{item.label}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setScenarios((prev) => ({ ...prev, [item.key]: val }))}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                          (scenarios as any)[item.key] === val
                            ? 'bg-brand-600 text-white shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Financial & Family Reality Check */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
                <Coins className="w-3.5 h-3.5" /> Step 4: Financial & Family Feasibility
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-['Outfit']">Financial Reality Check</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                We never tell a student they cannot pursue a career due to wealth. Instead, we use this to surface government colleges, fee waivers, and free resources.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Household Income Bracket</label>
                <select
                  value={incomeBracket}
                  onChange={(e) => setIncomeBracket(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                >
                  <option value="<25k">Under ?25,000 / month (High Scholarship Priority)</option>
                  <option value="25k-50k">?25,000 ? ?50,000 / month</option>
                  <option value="50k-1L">?50,000 ? ?1,00,000 / month</option>
                  <option value="1L-2.5L">?1,00,000 ? ?2,50,000 / month</option>
                  <option value=">2.5L">Above ?2,50,000 / month</option>
                  <option value="prefer_not_to_say">Prefer not to disclose</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Coaching Affordability Preference</label>
                <select
                  value={coachingBudget}
                  onChange={(e) => setCoachingBudget(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                >
                  <option value="none">Zero Budget / Free YouTube & Books only</option>
                  <option value="budget_low">Low Budget (Online affordable courses under ?10k/yr)</option>
                  <option value="moderate">Moderate Budget (?20k??60k/yr)</option>
                  <option value="high">High Budget (Kota / Offline Institutes ?1L??2L/yr)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">College Relocation & Hostel Feasibility</label>
                <select
                  value={relocation}
                  onChange={(e) => setRelocation(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                >
                  <option value="local_only">Must stay in local district / commute from home</option>
                  <option value="state_level">Can relocate anywhere within State</option>
                  <option value="pan_india_anywhere">Can relocate Pan-India anywhere</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Earning Urgency Horizon</label>
                <select
                  value={earningUrgency}
                  onChange={(e) => setEarningUrgency(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                >
                  <option value="immediate_after_school">Need to start earning by age 18-19 (Diploma/Skill)</option>
                  <option value="early_degree_3yrs">Start earning by 21 (3-Year Graduation / BCA / B.Com)</option>
                  <option value="standard_4_5yrs">Standard 4-Year B.Tech / Professional Degree</option>
                  <option value="long_term_can_wait">Can wait 6-8 years (MBBS MD / Ph.D. / UPSC)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Voluntary Category for Scholarship Matching</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white"
                >
                  <option value="General">General / Open Category</option>
                  <option value="EWS">Economically Weaker Section (EWS)</option>
                  <option value="OBC_NCL">Other Backward Class (OBC - Non Creamy Layer)</option>
                  <option value="SC">Scheduled Caste (SC)</option>
                  <option value="ST">Scheduled Tribe (ST)</option>
                  <option value="Single_Girl_Child">Single Girl Child Quota Eligible</option>
                  <option value="Defense_Ward">Ward of Armed Forces Personnel</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Aspirations & Personal Goals */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-2">
                <Target className="w-3.5 h-3.5" /> Step 5: Aspirations & Dream Goals
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-['Outfit']">Your Dream Career Direction</h2>
              <p className="text-xs sm:text-sm text-slate-500">What is the field or dream you currently feel most drawn towards?</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Select or Type Your Dream Goal</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {[
                  'Become an AI Engineer',
                  'Medical Doctor (MBBS)',
                  'Chartered Accountant (CA)',
                  'Corporate Lawyer / Judge',
                  'Defence Officer via NDA',
                  'Pure Science Researcher (IISER/ISRO)',
                  'Civil Services Officer (IAS/IPS)',
                  'Professional Athlete / Sports Coach',
                  'UI/UX & Product Designer',
                  'Commercial Airline Pilot'
                ].map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setTargetGoal(goal)}
                    className={`p-3 rounded-xl text-xs font-semibold text-left border transition ${
                      targetGoal === goal
                        ? 'bg-brand-50 border-brand-500 text-brand-800 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={targetGoal}
                onChange={(e) => setTargetGoal(e.target.value)}
                placeholder="Or type custom career goal..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
              <div className="text-xs text-brand-900">
                <p className="font-bold">AI Decision Engine Ready</p>
                <p className="text-brand-700 mt-0.5">
                  Clicking "Generate My Roadmap" will compute your 8-dimensional interest vector, evaluate entrance exam competition, and synthesize your 4-tier strategy (High Probability, Ambitious, Backup, Low-Cost).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Nav Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={() => {
                if (currentStep === 1 && !validateStepOne()) {
                  return;
                }

                setCurrentStep((prev) => prev + 1);
              }}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition hover:scale-[1.02]"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" /> Generate My Personalized Roadmap
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
