import { CareerPath } from "../types";

export const CAREER_PATHS: CareerPath[] = [
  {
    "id": "software-ai-engineer",
    "title": "Computer Science & AI Engineer",
    "category": "Engineering & Tech",
    "shortSummary": "Architect software systems, develop machine learning models, and deploy scalable cloud applications.",
    "requiredStream": [
      "PCM"
    ],
    "academicDifficulty": "High",
    "competitionScore": "Extreme",
    "financialRequirement": "Medium (?2L-?8L)",
    "studyDurationYears": "4 Years (B.Tech) or 3+2 Years (BCA+MCA)",
    "entranceExamDependency": "High",
    "jobMarketRisk": "Low",
    "geographicFlexibility": "High",
    "backupAvailability": "High",
    "startingSalaryRange": "?6.5 LPA ? ?24 LPA",
    "midCareerSalaryRange": "?25 LPA ? ?65+ LPA",
    "primaryExams": [
      "JEE Main",
      "JEE Advanced",
      "BITSAT"
    ],
    "alternativeExams": [
      "WBJEE",
      "MHT-CET",
      "COMEDK",
      "VITEEE",
      "State CETs",
      "CUET UG (BCA/BSc CS)"
    ],
    "skillsRequired": [
      "Python / C++",
      "Data Structures & Algorithms",
      "Calculus & Linear Algebra",
      "Web Full-Stack",
      "System Architecture",
      "Git/GitHub"
    ],
    "highProbabilityPath": {
      "title": "State Government Engineering Colleges & Regional Technical Universities",
      "description": "Admission via State CETs (WBJEE, MHT-CET, KCET, REAP, UPSEE/JEE State Quota) or NITs with standard state rank.",
      "institutions": [
        "State Gov Technical Colleges",
        "Top State Universities",
        "Mid-Tier NITs / IIITs"
      ],
      "prepStrategy": "Focus on NCERT syllabus mastery + State CET previous 10 years papers + standard JEE Main physics/maths."
    },
    "ambitiousPath": {
      "title": "Top Tier-1 IITs, Top NITs (Trichy, Surathkal, Warangal), IIIT Hyderabad & BITS Pilani",
      "description": "Top 0.5% percentile in JEE Advanced or BITSAT 320+ score for pure CS/AI branches.",
      "institutions": [
        "IIT Bombay",
        "IIT Delhi",
        "IIT Madras",
        "IIIT Hyderabad",
        "BITS Pilani"
      ],
      "prepStrategy": "Rigorous 2-year concept application, standard advanced physics/maths numericals, full-length test series."
    },
    "backupPath": {
      "title": "BCA + MCA or BSc Computer Science + Portfolio & Open Source route",
      "description": "If engineering entrance does not succeed, join a reputable 3-year BCA or BSc CS (low fee), master DSA/Full-stack on LeetCode & build real production apps.",
      "institutions": [
        "Central Universities (CUET)",
        "Loyola / St. Xavier?s / Christ",
        "IGNOU / State University BCA"
      ],
      "recoveryStrategy": "In tech, GitHub portfolio + open source PRs + NIMCET (for NIT MCA) level the playing field with tier-1 graduates within 2 years."
    },
    "lowCostPath": {
      "title": "Government Polytechnics / State Universities + SWAYAM & NPTEL Free Certifications",
      "description": "Total degree cost under ?1.5 Lakhs across 4 years in state colleges; utilize free NPTEL, CS50, freeCodeCamp, and YouTube educators.",
      "institutions": [
        "District Engineering Colleges",
        "State Govt Tech Institutes",
        "IIT Madras BS in Data Science (Hybrid/Affordable)"
      ],
      "freeResources": [
        "NPTEL Computer Science lectures by IIT professors",
        "Harvard CS50 online",
        "Khan Academy India & YouTube (Apna College, Chai aur Code, Abdul Bari)"
      ]
    },
    "timelineStages": [
      {
        "stage": "Class 8?10",
        "classRange": "Class 8?10",
        "action": "Build strong base in Maths & Physics; start beginner Python/Logic on Replit; participate in Atal Tinkering Labs.",
        "fallbackOption": "Focus on self-paced Scratch/Python if school lacks computer labs."
      },
      {
        "stage": "Class 11?12",
        "classRange": "Class 11?12",
        "action": "Take PCM stream. Balance Board exams with JEE Main & State CET question banks. Solve 50 numerical problems daily.",
        "fallbackOption": "If coaching is unaffordable, use Mohit Tyagi / Alakh Pandey free YouTube libraries + NCERT."
      },
      {
        "stage": "Entrance Exam",
        "classRange": "Class 12 Exit",
        "action": "Appear for JEE Main (Session 1 & 2), State CET, and CUET UG.",
        "fallbackOption": "If JEE rank is low, secure seat in State Gov College or BCA/BSc Computer Science."
      },
      {
        "stage": "College Y1-Y2",
        "classRange": "UG Years 1?2",
        "action": "Master C++, Python, Data Structures & Algorithms, discrete mathematics, and database management.",
        "fallbackOption": "Supplement college syllabus with free CS50 / NeetCode roadmaps."
      },
      {
        "stage": "College Y3-Y4",
        "classRange": "UG Years 3?4",
        "action": "Build 3 deployed full-stack / AI projects, contribute to Open Source, crack summer internships.",
        "fallbackOption": "Apply for off-campus angel.co/Wellfound startups and remote developer internships."
      },
      {
        "stage": "Career Launch",
        "classRange": "Post-Grad",
        "action": "Product software engineer / AI specialist at tech enterprise or funded startup.",
        "fallbackOption": "Transition from service tech company to product tier within 18 months via LeetCode & portfolio."
      }
    ]
  },
  {
    "id": "mbbs-doctor-healthcare",
    "title": "Medical Doctor (MBBS) & Clinical Specialist",
    "category": "Medical & Healthcare",
    "shortSummary": "Diagnose illnesses, perform life-saving treatments, and advance clinical healthcare for communities and hospitals.",
    "requiredStream": [
      "PCB",
      "PCMB"
    ],
    "academicDifficulty": "Very High",
    "competitionScore": "Extreme",
    "financialRequirement": "Low (<?2L) in Gov / Extreme (>?50L) in Private",
    "studyDurationYears": "5.5 Years MBBS + 3 Years MD/MS Specialization",
    "entranceExamDependency": "Very High",
    "jobMarketRisk": "Low",
    "geographicFlexibility": "High",
    "backupAvailability": "Medium",
    "startingSalaryRange": "?7.2 LPA ? ?14 LPA (Junior Resident)",
    "midCareerSalaryRange": "?22 LPA ? ?50+ LPA (Consultant Specialist)",
    "primaryExams": [
      "NEET-UG"
    ],
    "alternativeExams": [
      "AIIMS Paramedical",
      "ICAR AIEEA (Biotech/Agriculture)",
      "State Pharmacy Entrance",
      "CUET UG (Biomedical/Microbio)"
    ],
    "skillsRequired": [
      "Clinical Observation",
      "Memorization & Detail Recall",
      "High Empathy & Composure",
      "Biological Sciences",
      "Patient Communication"
    ],
    "highProbabilityPath": {
      "title": "State Government Medical Colleges (85% State Quota)",
      "description": "Securing a state quota government seat requires 580?630 marks in NEET-UG depending on state reservation & domicile.",
      "institutions": [
        "State Gov Medical Colleges (GMC)",
        "District Hospital Attached Medical Colleges"
      ],
      "prepStrategy": "Line-by-line mastery of NCERT Biology (100% target) + standard Chemistry + high-accuracy physics numericals."
    },
    "ambitiousPath": {
      "title": "AIIMS New Delhi, JIPMER Puducherry, KGMU Lucknow, CMC Vellore",
      "description": "Top 1,000 All India Rank in NEET-UG (685+ score out of 720).",
      "institutions": [
        "AIIMS New Delhi",
        "JIPMER",
        "VMMC New Delhi",
        "KGMU Lucknow",
        "Madras Medical College"
      ],
      "prepStrategy": "NCERT biology on fingertips + solving 15,000+ MCQs with strict negative marking analysis + speed mocks under 3 hours."
    },
    "backupPath": {
      "title": "BDS / BAMS / BHMS / BVSc (Veterinary) / B.Pharm / Clinical Psychology",
      "description": "If MBBS cutoff is missed, allied healthcare degrees offer rewarding patient care, clinical practice rights, and high career security.",
      "institutions": [
        "Government Dental Colleges (BDS)",
        "National Institute of Ayurveda",
        "Indian Veterinary Research Institute (IVRI)"
      ],
      "recoveryStrategy": "BVSc doctors and BAMS specialists have growing private and government clinic demand with lower initial competition."
    },
    "lowCostPath": {
      "title": "Government Medical Colleges with State Service Bonds / Post-Matric Scholarships",
      "description": "Government medical college annual tuition is as low as ?5,000 ? ?25,000/year; state scholarships cover hostel and books.",
      "institutions": [
        "State GMCs",
        "Armed Forces Medical College (AFMC Pune - fully sponsored with stipend)"
      ],
      "freeResources": [
        "NCERT e-books (ePathshala)",
        "Physics Wallah free YouTube NEET series",
        "Dr. Anand Mani / Neela Bakore Biology playlists"
      ]
    },
    "timelineStages": [
      {
        "stage": "Class 8?10",
        "classRange": "Class 8?10",
        "action": "Excel in Science (especially Life Processes & Cell Biology); develop calm focus and long reading endurance.",
        "fallbackOption": "Participate in science exhibitions and Olympiads."
      },
      {
        "stage": "Class 11?12",
        "classRange": "Class 11?12",
        "action": "Choose PCB stream. Treat NCERT Biology like a bible (revise each chapter 10+ times). Solve 100 MCQs daily.",
        "fallbackOption": "Use free YouTube revision sprints and Telegram open test series if coaching is not affordable."
      },
      {
        "stage": "NEET Exam",
        "classRange": "Class 12 Exit",
        "action": "Appear for NEET-UG with strategic time management (Biology 45m, Chem 45m, Physics 60m).",
        "fallbackOption": "If score is below MBBS cutoff, opt for BDS, BVSc, BAMS or BSc Nursing/Paramedical."
      },
      {
        "stage": "MBBS Degree",
        "classRange": "UG Years 1?5.5",
        "action": "Complete 4.5 years coursework + 1-year rotatory clinical internship in medicine, surgery, and OBG.",
        "fallbackOption": "Pass NEXT (National Exit Test) licensing examination."
      },
      {
        "stage": "Specialization",
        "classRange": "Post-MBBS",
        "action": "Clear NEET-PG / NEXT Part 2 for MD/MS specialization (Cardiology, Ortho, Pediatrics, Neurology).",
        "fallbackOption": "Practice as Medical Officer (MO) in government healthcare centers with secure pay scale."
      }
    ]
  },
  {
    "id": "chartered-accountant-ca",
    "title": "Chartered Accountant (CA) & Financial Strategist",
    "category": "Commerce & Finance",
    "shortSummary": "Lead statutory audits, corporate taxation, forensic accounting, mergers & acquisitions, and corporate financial strategy.",
    "requiredStream": [
      "Commerce",
      "Commerce_Maths",
      "PCM",
      "Humanities"
    ],
    "academicDifficulty": "Very High",
    "competitionScore": "High",
    "financialRequirement": "Low (<?2L)",
    "studyDurationYears": "4.5 to 5 Years (Self-paced through ICAI)",
    "entranceExamDependency": "Very High",
    "jobMarketRisk": "Low",
    "geographicFlexibility": "High",
    "backupAvailability": "High",
    "startingSalaryRange": "?9 LPA ? ?24 LPA (ICAI Campus Placements)",
    "midCareerSalaryRange": "?30 LPA ? ?80+ LPA (CFO / Partner in Big 4)",
    "primaryExams": [
      "CA Foundation",
      "CA Intermediate",
      "CA Final"
    ],
    "alternativeExams": [
      "CS (Company Secretary)",
      "CMA (Cost & Management)",
      "CFA",
      "CUET B.Com (Hons)"
    ],
    "skillsRequired": [
      "Financial Auditing",
      "Taxation Law & GST",
      "Accounting Standards (Ind AS)",
      "Analytical Precision",
      "Integrity & Ethics"
    ],
    "highProbabilityPath": {
      "title": "B.Com (Hons) simultaneously with CA Foundation & Articleship",
      "description": "Pursue standard B.Com in a local/state college while giving full focus to ICAI exams and 2-year mandatory articleship.",
      "institutions": [
        "Institute of Chartered Accountants of India (ICAI)",
        "Concurrent B.Com College"
      ],
      "prepStrategy": "Clear CA Foundation directly after Class 12 with 3-4 months systematic study of Accounts, Law, Maths/Stats, and Economics."
    },
    "ambitiousPath": {
      "title": "SRCC / St. Xavier?s B.Com (Hons) + CA Rankholder (Top 50 All-India Rank)",
      "description": "Clear CA Foundation, Inter, and Final in single attempts with All India Rank + Articleship at Big 4 (PwC, Deloitte, EY, KPMG).",
      "institutions": [
        "ICAI + Top Tier Commerce Colleges (SRCC Delhi, St. Xavier?s Kolkata, Loyola Chennai)"
      ],
      "prepStrategy": "Deep conceptual study of ICAI Study Modules; solve 5 mock papers per subject with strict time limits; master Case Studies."
    },
    "backupPath": {
      "title": "CMA (Cost Accountant) / CS (Company Secretary) / M.Com + Corporate Financial Analyst",
      "description": "If CA Final gets delayed, intermediate CA qualification + B.Com qualifies you for high-paying finance analyst roles, or switch to CMA/CS/CFA.",
      "institutions": [
        "ICSI (CS)",
        "ICMAI (CMA)",
        "Corporate Finance & Banking Firms"
      ],
      "recoveryStrategy": "Semi-qualified CAs earn ?5-9 LPA in corporate accounting and can clear remaining groups while working."
    },
    "lowCostPath": {
      "title": "ICAI Direct Registration + ICAI Free Study Material & BOS Portal",
      "description": "Total ICAI exam and registration fee is under ?75,000 for entire 5 years. Articleship provides monthly stipend (?5,000??15,000/month).",
      "institutions": [
        "ICAI Branch Centers pan-India"
      ],
      "freeResources": [
        "ICAI Board of Studies (BOS) Knowledge Portal & Free Live Classes",
        "CA Foundation free YouTube channels (Unacademy CA, Swapnil Patni, CA Foundation Classes)"
      ]
    },
    "timelineStages": [
      {
        "stage": "Class 8?10",
        "classRange": "Class 8?10",
        "action": "Build strong numerical aptitude, arithmetic, and basic understanding of economics and trade.",
        "fallbackOption": "Read business news (The Economic Times / Finshots) to understand markets."
      },
      {
        "stage": "Class 11?12",
        "classRange": "Class 11?12",
        "action": "Opt for Commerce (with or without Maths). Master Double Entry Bookkeeping, Trial Balance, and Partnership Accounts.",
        "fallbackOption": "Science students can also transition to CA Foundation seamlessly."
      },
      {
        "stage": "CA Foundation",
        "classRange": "Post Class 12",
        "action": "Appear for CA Foundation (June or Dec exam session). Pass all 4 papers with 50% aggregate.",
        "fallbackOption": "Direct entry to CA Inter is also possible after completing B.Com with 55%+ marks."
      },
      {
        "stage": "CA Intermediate",
        "classRange": "Year 2?3",
        "action": "Prepare for 6 papers of CA Inter (Group 1 & 2). Complete ICITSS computer & soft skills training.",
        "fallbackOption": "Clear groups one by one if taking both groups at once feels heavy."
      },
      {
        "stage": "Articleship (2 Yrs)",
        "classRange": "Year 3?5",
        "action": "Join a CA firm or Big 4 for 2 years mandatory practical training; earn monthly stipend while working on live audits.",
        "fallbackOption": "Local CA firms provide high hands-on exposure to GST, ITR filing, and statutory audits."
      },
      {
        "stage": "CA Final & Membership",
        "classRange": "Year 5",
        "action": "Pass CA Final examination, complete advanced IT training, and register as Associate Chartered Accountant (ACA).",
        "fallbackOption": "Campus placement through ICAI provides direct offers from Tata, Reliance, ITC, banks, and MNCs."
      }
    ]
  },
  {
    "id": "corporate-lawyer-judiciary",
    "title": "Corporate Lawyer, Litigator & Judicial Services",
    "category": "Law & Humanities",
    "shortSummary": "Advocate for justice, advise enterprises on corporate mergers, draft constitutional contracts, or serve as a civil judge.",
    "requiredStream": [
      "Humanities",
      "Commerce",
      "PCM",
      "PCB"
    ],
    "academicDifficulty": "Medium",
    "competitionScore": "High",
    "financialRequirement": "Medium (?3L-?12L in NLU / Low in Gov Faculty)",
    "studyDurationYears": "5 Years Integrated BA-LLB / BBA-LLB",
    "entranceExamDependency": "High",
    "jobMarketRisk": "Low",
    "geographicFlexibility": "High",
    "backupAvailability": "High",
    "startingSalaryRange": "?6 LPA ? ?18 LPA (Tier-1 Law Firms)",
    "midCareerSalaryRange": "?25 LPA ? ?70+ LPA (Partner / Senior Advocate)",
    "primaryExams": [
      "CLAT (Common Law Admission Test)",
      "AILET (NLU Delhi)"
    ],
    "alternativeExams": [
      "SLAT (Symbiosis)",
      "MH-CET Law",
      "CUET UG Law (Faculty of Law DU/BHU)",
      "LSAT India"
    ],
    "skillsRequired": [
      "Critical Reading & Analysis",
      "Persuasive Writing & Debate",
      "Constitutional & Contract Law",
      "Logical Reasoning",
      "Negotiation"
    ],
    "highProbabilityPath": {
      "title": "State University Law Faculties & Top State Law Colleges (GLC Mumbai, ILS Pune)",
      "description": "Admission through State Law CETs (MH-CET Law, AP LAWCET, KSLU) with nominal fees and strong bar tradition.",
      "institutions": [
        "Government Law College (GLC) Mumbai",
        "ILS Law College Pune",
        "Faculty of Law - Delhi University"
      ],
      "prepStrategy": "Reading comprehension speed (250+ wpm), daily editorial analysis (The Hindu / Indian Express), and critical reasoning drills."
    },
    "ambitiousPath": {
      "title": "Top Tier-1 National Law Universities (NLSIU Bangalore, NALSAR Hyderabad, WBNUJS Kolkata)",
      "description": "Top 300 All-India Rank in CLAT UG.",
      "institutions": [
        "NLSIU Bengaluru",
        "NALSAR Hyderabad",
        "NLU Delhi (AILET)",
        "WBNUJS Kolkata",
        "NLU Jodhpur"
      ],
      "prepStrategy": "Daily newspaper reading + 60+ full-length CLAT mocks + speed reading comprehension + mastering legal aptitude principles."
    },
    "backupPath": {
      "title": "3-Year LLB after any Graduation (BA/B.Com/B.Sc) via DU LLB / CUET PG",
      "description": "If you miss 5-year NLU seats, complete any graduation and join premier 3-year LLB programs (Campus Law Centre DU produces 40% of Delhi high court judges).",
      "institutions": [
        "Campus Law Centre (CLC) Delhi University",
        "BHU Law Faculty",
        "Lucknow University Law"
      ],
      "recoveryStrategy": "3-year LLB candidates are highly mature and frequently clear State Judicial Services (PCS-J) in first attempt."
    },
    "lowCostPath": {
      "title": "Central / State Government University Law Departments + NSP Scholarships",
      "description": "Government Law Colleges cost ?5,000 ? ?20,000 per year; fee waivers exist for EWS, SC/ST, and state domiciles.",
      "institutions": [
        "GLC Mumbai",
        "Allahabad University Law",
        "Patna Law College",
        "Calcutta University Law"
      ],
      "freeResources": [
        "LiveLaw & Bar and Bench free digests",
        "Legal Bites & Ipleaders free articles",
        "YouTube Legal Edge & 12 Minutes to CLAT free channels"
      ]
    },
    "timelineStages": [
      {
        "stage": "Class 8?10",
        "classRange": "Class 8?10",
        "action": "Participate in English debate, Model United Nations (MUN), and school essay competitions. Read diverse books.",
        "fallbackOption": "Improve reading speed and vocabulary through newspapers."
      },
      {
        "stage": "Class 11?12",
        "classRange": "Class 11?12",
        "action": "Any stream works (Humanities/Commerce/Science). Prepare for CLAT: English comprehension, GK/Current Affairs, and Logical reasoning.",
        "fallbackOption": "Focus on 12th Board marks for state universities with merit admission."
      },
      {
        "stage": "Entrance (CLAT/AILET)",
        "classRange": "Dec (Class 12)",
        "action": "Appear for CLAT UG and AILET. Apply to MH-CET Law and SLAT as backups.",
        "fallbackOption": "If NLU is missed, GLC Mumbai or DU 3-year LLB path is equally prestigious."
      },
      {
        "stage": "Law School (5 Yrs)",
        "classRange": "UG Years 1?5",
        "action": "Participate in Moot Court competitions, write research papers in law journals, and intern with law firms & NGOs every vacation.",
        "fallbackOption": "Intern with High Court / District Court advocates for practical procedural training."
      },
      {
        "stage": "Bar Registration",
        "classRange": "Post-Degree",
        "action": "Clear All India Bar Examination (AIBE) to obtain license to practice in Indian courts.",
        "fallbackOption": "Corporate law roles and in-house legal counsel do not require daily courtroom litigation."
      }
    ]
  },
  {
    "id": "defence-officer-nda-cds",
    "title": "Indian Armed Forces Officer (Army, Navy, Air Force via NDA)",
    "category": "Civil Services & Gov",
    "shortSummary": "Lead combat troops, fly fighter jets, captain naval frigates, and serve India with unmatched honor, valor, and leadership.",
    "requiredStream": [
      "PCM",
      "PCB",
      "Commerce",
      "Humanities"
    ],
    "academicDifficulty": "Medium",
    "competitionScore": "Extreme",
    "financialRequirement": "Low (<?2L) - 100% Fully Sponsored by Govt of India",
    "studyDurationYears": "3 Years NDA Khadakwasla + 1 Year IMA/AFA/INA",
    "entranceExamDependency": "Very High (SSB Interview Driven)",
    "jobMarketRisk": "Low (Guaranteed Central Gov Commission)",
    "geographicFlexibility": "High (Pan-India Postings & Field Missions)",
    "backupAvailability": "High",
    "startingSalaryRange": "?12 LPA ? ?18 LPA (Lieutenant / Flying Officer / Sub Lieutenant + Allowances)",
    "midCareerSalaryRange": "?24 LPA ? ?45+ LPA (Colonel / Brigadier + Lifetime Pension & Medical)",
    "primaryExams": [
      "NDA & NA Exam (UPSC)"
    ],
    "alternativeExams": [
      "CDS (Combined Defence Services after Graduation)",
      "AFCAT",
      "Indian Navy B.Tech Cadet Scheme (10+2 JEE Rank)",
      "Technical Entry Scheme (TES Army)"
    ],
    "skillsRequired": [
      "Officer Like Qualities (OLQ)",
      "Physical Fitness & Stamina",
      "Mental Resilience & Quick Decisions",
      "Leadership Under Pressure",
      "Mathematics & General Science"
    ],
    "highProbabilityPath": {
      "title": "NDA Written Exam + Focused SSB Personality & Physical Training",
      "description": "Written exam requires solid Class 11-12 Maths + General Ability Test (English, History, Geography, Physics). SSB tests Officer Like Qualities.",
      "institutions": [
        "National Defence Academy (NDA Khadakwasla, Pune)",
        "Indian Military Academy (IMA Dehradun)"
      ],
      "prepStrategy": "Solve 10 years of UPSC NDA past question papers; run 2.5 km daily; practice group discussion and psychology tests (TAT, WAT, SRT)."
    },
    "ambitiousPath": {
      "title": "Fighter Pilot in Indian Air Force via NDA Air Force Wing",
      "description": "Requires PCM in Class 12 + High merit in NDA + clearing Computerized Pilot Selection System (CPSS) test.",
      "institutions": [
        "National Defence Academy (Air Force Wing)",
        "Air Force Academy (Dundigal)"
      ],
      "prepStrategy": "Master Class 11-12 Physics and Math fundamentals; train spatial orientation and hand-eye coordination."
    },
    "backupPath": {
      "title": "CDS / AFCAT / NCC Special Entry after Regular Graduation (B.Tech / B.Sc / BA)",
      "description": "If not selected in NDA at age 16.5-19, complete graduation and appear for CDS / AFCAT / Indian Navy direct entry up to age 24.",
      "institutions": [
        "IMA Dehradun",
        "Officers Training Academy (OTA Chennai)",
        "Indian Naval Academy (INA Ezhimala)"
      ],
      "recoveryStrategy": "Over 60% of serving military officers join through CDS and AFCAT after college graduation."
    },
    "lowCostPath": {
      "title": "100% Fully Sponsored by Government of India with Monthly Stipend",
      "description": "Training, food, uniform, accommodation, and high-tech equipment at NDA are 100% funded by the Indian Government; cadets receive ?56,100/mo stipend in final year.",
      "institutions": [
        "National Defence Academy (NDA)",
        "TES 10+2 Army Scheme"
      ],
      "freeResources": [
        "UPSC official NDA previous year question papers and answer keys",
        "YouTube SSB prep channels (Centurion Defence, Major Kalshi, Defence Wallah)"
      ]
    },
    "timelineStages": [
      {
        "stage": "Class 8?10",
        "classRange": "Class 8?10",
        "action": "Join NCC if available; develop habits of daily running (2-3 km), push-ups, sports, and current affairs reading.",
        "fallbackOption": "Play team sports (football, basketball, hockey) to develop natural leadership."
      },
      {
        "stage": "Class 11?12",
        "classRange": "Class 11?12",
        "action": "Opt for PCM (for Air Force/Navy) or any stream for Army. Study NDA Maths and General Ability syllabus.",
        "fallbackOption": "Focus on 12th Board marks to also become eligible for Army TES 10+2 technical direct entry."
      },
      {
        "stage": "NDA Exam",
        "classRange": "Class 12 (Apr/Sept)",
        "action": "Clear UPSC NDA written exam (Mathematics 300 marks + GAT 600 marks). Cutoff typically 340-360/900.",
        "fallbackOption": "Appear again in the next cycle (eligible up to 18.5 years of age)."
      },
      {
        "stage": "SSB Interview",
        "classRange": "5-Day Process",
        "action": "Screening (OIR+PPDT) -> Psychology tests -> GTO ground tasks -> Personal Interview -> Conference.",
        "fallbackOption": "Learn from conference feedback and reapply via college entries (CDS/AFCAT)."
      },
      {
        "stage": "Cadet Training",
        "classRange": "Years 1?4",
        "action": "3 years at NDA (earn Jawaharlal Nehru University BA/B.Sc/B.Tech degree) + 1 year at IMA/INA/AFA.",
        "fallbackOption": "All expenses borne by Ministry of Defence."
      }
    ]
  },
  {
    "id": "scientific-researcher-iiser-iisc",
    "title": "Pure Sciences Researcher, Physicist & Space Scientist",
    "category": "Engineering & Tech",
    "shortSummary": "Discover fundamental laws of physics, genetic codes, quantum computing breakthroughs, and space science at ISRO/DRDO.",
    "requiredStream": [
      "PCM",
      "PCB",
      "PCMB"
    ],
    "academicDifficulty": "Very High",
    "competitionScore": "High",
    "financialRequirement": "Low (<?2L) - Supported by INSPIRE / KVPY Fellowship",
    "studyDurationYears": "5 Years (BS-MS Dual Degree) + 3-5 Years (Ph.D.)",
    "entranceExamDependency": "High",
    "jobMarketRisk": "Low",
    "geographicFlexibility": "High",
    "backupAvailability": "High",
    "startingSalaryRange": "?8 LPA ? ?16 LPA (Scientist C in ISRO/DRDO or R&D Lab)",
    "midCareerSalaryRange": "?22 LPA ? ?55+ LPA (Senior Scientist / Global Professor)",
    "primaryExams": [
      "IAT (IISER Aptitude Test)",
      "NEST (National Entrance Screening Test for NISER)",
      "JEE Advanced"
    ],
    "alternativeExams": [
      "CUET UG (BSc Research)",
      "ICAR AIEEA",
      "IIT JAM (for M.Sc after BSc)"
    ],
    "skillsRequired": [
      "Mathematical Modeling",
      "First-Principles Thinking",
      "Scientific Curiosity",
      "Laboratory Experimentation",
      "Python/MATLAB Data Analysis"
    ],
    "highProbabilityPath": {
      "title": "IISER BS-MS Dual Degree via IISER Aptitude Test (IAT)",
      "description": "7 IISERs across India (Pune, Kolkata, Mohali, Bhopal, Thiruvananthapuram, Tirupati, Berhampur) admit through IAT exam.",
      "institutions": [
        "IISER Pune",
        "IISER Kolkata",
        "IISER Mohali",
        "NISER Bhubaneswar",
        "CEBS Mumbai"
      ],
      "prepStrategy": "Strong conceptual clarity in Physics, Chemistry, Maths, and Biology (PCMB) from standard NCERT textbooks."
    },
    "ambitiousPath": {
      "title": "IISc Bangalore (Bachelor of Science Research) & NISER Bhubaneswar",
      "description": "IISc is India?s #1 ranked research institution (admissions via IAT, JEE Advanced top ranks, or NEET).",
      "institutions": [
        "Indian Institute of Science (IISc Bengaluru)",
        "NISER Bhubaneswar",
        "Tata Institute of Fundamental Research (TIFR)"
      ],
      "prepStrategy": "Solving Olympiad-level questions (NSEP, NSEC, KVPY past archives) and in-depth problem solving."
    },
    "backupPath": {
      "title": "B.Sc (Hons) in Central University (DU/BHU/HCU) -> IIT JAM for M.Sc at IIT/IISc",
      "description": "If IAT/NEST cutoff is missed, join a top B.Sc program, maintain 80%+ GPA, and crack IIT JAM to enter IIT for M.Sc & Ph.D.",
      "institutions": [
        "St. Stephen?s College Delhi",
        "Banaras Hindu University (BHU)",
        "IIT Bombay/Delhi (via IIT JAM)"
      ],
      "recoveryStrategy": "Over 70% of IIT and IISc postgrad researchers enter via IIT JAM after a regular 3-year B.Sc."
    },
    "lowCostPath": {
      "title": "INSPIRE / DST SHE Fellowship (?80,000/year for pure science students)",
      "description": "Top 1% students in 12th board exams receive Department of Science and Technology (DST) scholarship of ?80,000 per year throughout BS-MS.",
      "institutions": [
        "IISERs",
        "NISER",
        "State Central Universities"
      ],
      "freeResources": [
        "MIT OpenCourseWare for Physics/Maths",
        "NPTEL Pure Science series",
        "Swayam MOOCs"
      ]
    },
    "timelineStages": [
      {
        "stage": "Class 8?10",
        "classRange": "Class 8?10",
        "action": "Perform practical science experiments; participate in National Science Congress and Olympiads.",
        "fallbackOption": "Build science projects using open-source sensors."
      },
      {
        "stage": "Class 11?12",
        "classRange": "Class 11?12",
        "action": "Choose PCM or PCMB. Focus on the 'Why' behind scientific formulas rather than rote memorization.",
        "fallbackOption": "Attempt all 4 subjects in IAT to maximize total score."
      },
      {
        "stage": "IAT / NEST Exam",
        "classRange": "Class 12 Exit",
        "action": "Appear for IAT (IISER) and NEST (NISER).",
        "fallbackOption": "Use CUET score for B.Sc Research at top central universities."
      },
      {
        "stage": "BS-MS Degree",
        "classRange": "Years 1?5",
        "action": "Complete multidisciplinary foundation in Years 1-2; choose Major in Physics/Chemistry/Biology/Maths in Year 3-5 with Master?s thesis.",
        "fallbackOption": "Publish research paper in peer-reviewed scientific journals."
      },
      {
        "stage": "Ph.D. / Scientist Role",
        "classRange": "Post-MS",
        "action": "Join ISRO/DRDO as Scientist-SC, or pursue fully-funded Ph.D. in India/Germany/USA with monthly stipend.",
        "fallbackOption": "R&D roles in pharma, battery technology, semiconductor chips, or quantitative finance."
      }
    ]
  },
  {
    "id": "civil-services-upsc-ias-ips",
    "title": "Civil Services Officer (IAS, IPS, IFS, IRS via UPSC CSE)",
    "category": "Civil Services & Gov",
    "shortSummary": "Administer districts, formulate national policies, lead policing and internal security, and manage India?s diplomatic missions.",
    "requiredStream": [
      "Humanities",
      "Commerce",
      "PCM",
      "PCB",
      "Vocational"
    ],
    "academicDifficulty": "Very High",
    "competitionScore": "Extreme",
    "financialRequirement": "Low (<?2L)",
    "studyDurationYears": "3-4 Years Graduation + 1-2 Years Dedicated UPSC Prep",
    "entranceExamDependency": "Very High",
    "jobMarketRisk": "Low (Direct Constitutional Post)",
    "geographicFlexibility": "High",
    "backupAvailability": "High",
    "startingSalaryRange": "?10 LPA ? ?14 LPA (Sub-Divisional Magistrate SDM / ASP + Official Residence & Security)",
    "midCareerSalaryRange": "?22 LPA ? ?35+ LPA (District Magistrate / Secretary to Gov of India)",
    "primaryExams": [
      "UPSC Civil Services Examination (CSE)"
    ],
    "alternativeExams": [
      "State PSCs (UPPSC, BPSC, MPSC, WBPSC, KPSC)",
      "SSC CGL",
      "RBI Grade B Officer",
      "CAPF Assistant Commandant"
    ],
    "skillsRequired": [
      "Broad General Knowledge & Current Affairs",
      "Analytical Essay & Answer Writing",
      "Unbiased Decision Making",
      "Public Administration",
      "High Mental Endurance"
    ],
    "highProbabilityPath": {
      "title": "Graduate in your strongest subject + Target State Public Service Commission (State PCS) alongside UPSC",
      "description": "State PSC exams have similar syllabus (General Studies + State GK) with much higher seat-to-applicant ratios.",
      "institutions": [
        "Any UGC-recognized Graduation Degree",
        "State Civil Services"
      ],
      "prepStrategy": "Read NCERTs Class 6-12 for History, Geography, Polity, Economy; make 1-page current affairs notes from The Hindu."
    },
    "ambitiousPath": {
      "title": "Top 100 All-India Rank in UPSC CSE for IAS / IFS / IPS Cadre Allocation",
      "description": "Requires mastery of 4 General Studies papers, 2 Optional Subject papers, Essay paper, and Personality Test.",
      "institutions": [
        "LBSNAA Mussoorie (IAS Academy)",
        "SVP National Police Academy (Hyderabad)"
      ],
      "prepStrategy": "Write 3 answer copies daily for 18 months; master 1 chosen Optional Subject (Political Science, Sociology, History, Geography, or Engineering)."
    },
    "backupPath": {
      "title": "State PCS Officer (DSP/SDO), RBI Grade B, NABARD, SSC CGL Inspector, or Assistant Professor",
      "description": "Preparation for UPSC covers 90% of all other government, banking, intelligence, and regulatory body examinations.",
      "institutions": [
        "Reserve Bank of India",
        "Staff Selection Commission (SSC)",
        "State Administrative Services"
      ],
      "recoveryStrategy": "Over 80% of serious UPSC aspirants secure Grade-A/B gazetted officer posts in State PSCs or banking regulators."
    },
    "lowCostPath": {
      "title": "Self-Study with NCERTs, Government Press Information Bureau (PIB), Sansad TV & Free UPSC Portals",
      "description": "UPSC requires zero expensive coaching if standard reference books (Laxmikanth, Spectrum, Ramesh Singh) and official PIB releases are studied methodically.",
      "institutions": [
        "Any affordable Government College for Graduation"
      ],
      "freeResources": [
        "Sansad TV (Perspective & Desh Deshantar)",
        "PIB (Press Information Bureau)",
        "Insights on India / ClearIAS free daily answer writing modules"
      ]
    },
    "timelineStages": [
      {
        "stage": "Class 8?10",
        "classRange": "Class 8?10",
        "action": "Read daily newspaper (The Hindu / Indian Express); develop curiosity about Indian constitution and world geography.",
        "fallbackOption": "Watch informative documentaries on Indian history and science."
      },
      {
        "stage": "Class 11?12",
        "classRange": "Class 11?12",
        "action": "Focus on high marks in 12th standard. Any stream is equally eligible for UPSC.",
        "fallbackOption": "Humanities subjects give direct foundation in History and Polity."
      },
      {
        "stage": "Graduation (3-4 Yrs)",
        "classRange": "Age 18?21",
        "action": "Complete graduation degree with first-class marks. Read standard NCERTs and begin choosing Optional subject.",
        "fallbackOption": "Maintain strong grades to preserve career alternatives in private sector / higher studies."
      },
      {
        "stage": "UPSC Prelims & Mains",
        "classRange": "Age 21?23",
        "action": "Clear Prelims (GS + CSAT) in May -> Mains (9 subjective papers) in Sept -> Interview in Feb/Mar.",
        "fallbackOption": "Appear for State PCS and SSC CGL in parallel in the same calendar year."
      },
      {
        "stage": "Academy & Service",
        "classRange": "Post-Selection",
        "action": "Join Lal Bahadur Shastri National Academy of Administration (LBSNAA) Mussoorie for foundational training.",
        "fallbackOption": "Promotions from State PSC to IAS/IPS occur systematically through government cadre reviews."
      }
    ]
  },
  {
    "id": "ui-ux-product-designer",
    "title": "UI/UX & Digital Product Designer",
    "category": "Design & Media",
    "shortSummary": "Craft intuitive digital interfaces, mobile applications, design systems, and visual brand identities for high-growth tech companies.",
    "requiredStream": [
      "Humanities",
      "Commerce",
      "PCM",
      "PCB",
      "Vocational"
    ],
    "academicDifficulty": "Medium",
    "competitionScore": "Medium",
    "financialRequirement": "Medium (?2L-?8L)",
    "studyDurationYears": "4 Years (B.Des) or Portfolio Driven Self-Taught",
    "entranceExamDependency": "Medium",
    "jobMarketRisk": "Low",
    "geographicFlexibility": "High (Remote / Global)",
    "backupAvailability": "High",
    "startingSalaryRange": "?5.5 LPA ? ?16 LPA",
    "midCareerSalaryRange": "?20 LPA ? ?50+ LPA (Lead Designer / Head of Design)",
    "primaryExams": [
      "UCEED (IIT Bombay)",
      "NID DAT (National Institute of Design)",
      "NIFT"
    ],
    "alternativeExams": [
      "SEED (Symbiosis)",
      "AIEED",
      "Direct Portfolio Admission (Srishti, MIT-ID, Pearl)"
    ],
    "skillsRequired": [
      "Figma & UI Prototyping",
      "User Research & Empathy Mapping",
      "Typography & Color Theory",
      "Wireframing & Information Architecture",
      "Design Thinking"
    ],
    "highProbabilityPath": {
      "title": "State University B.Des / B.Voc in Multimedia & Digital Design + High-Impact Figma Portfolio",
      "description": "Admission in state design faculties or private colleges with merit scholarships + 5 polished case studies on Behance/Dribbble.",
      "institutions": [
        "State University Design Colleges",
        "Symbiosis Institute of Design",
        "MIT Institute of Design Pune"
      ],
      "prepStrategy": "Sketching basics, visual composition, creative problem solving, and solving past UCEED/NID design aptitude questions."
    },
    "ambitiousPath": {
      "title": "IIT Bombay IDC, NID Ahmedabad, IIT Guwahati Department of Design",
      "description": "Top 100 rank in UCEED or NID DAT Prelims & Mains (Studio Test & Portfolio review).",
      "institutions": [
        "National Institute of Design (NID Ahmedabad)",
        "IIT Bombay (IDC)",
        "IIT Delhi Design Department"
      ],
      "prepStrategy": "Daily perspective drawing, storyboarding, observation sketching, creative lateral thinking, and mock studio tests."
    },
    "backupPath": {
      "title": "Self-Taught Portfolio Route (Any Degree + Google UX Certificate + Dribbble / Behance Case Studies)",
      "description": "Design is 100% merit-based: tech companies hire for Figma skills, design case studies, and problem-solving, regardless of degree.",
      "institutions": [
        "Coursera Google UX Specialization",
        "Interaction Design Foundation (IxDF)"
      ],
      "recoveryStrategy": "Build 3 end-to-end mobile app redesigns, document user research, and apply directly to SaaS startups."
    },
    "lowCostPath": {
      "title": "Free Figma Education Plan + YouTube Channels + Community Redesigns",
      "description": "Figma offers 100% free professional access for students; learn from free resources and earn by freelancing for local businesses.",
      "institutions": [
        "Open-Source Design Communities",
        "Gov Community Colleges"
      ],
      "freeResources": [
        "Figma YouTube channel & tutorials",
        "DesignCourse by Gary Simon",
        "Mizko UI/UX masterclass videos on YouTube"
      ]
    },
    "timelineStages": [
      {
        "stage": "Class 8?10",
        "classRange": "Class 8?10",
        "action": "Learn Canva, visual layouts, and start drawing everyday objects with proper light and shadow.",
        "fallbackOption": "Practice sketching in a dedicated notebook."
      },
      {
        "stage": "Class 11?12",
        "classRange": "Class 11?12",
        "action": "Any stream works. Prepare for UCEED and NID DAT. Learn free Figma basics on YouTube.",
        "fallbackOption": "Build a Behance portfolio of posters, banners, and app mockups."
      },
      {
        "stage": "Entrance / Degree",
        "classRange": "UG Years 1?4",
        "action": "Enter B.Des program or pursue B.Sc/BA while dedicating 15 hrs/week to UX case studies.",
        "fallbackOption": "Create concept redesigns for popular Indian apps (e.g. IRCTC, Swiggy, BookMyShow)."
      },
      {
        "stage": "Internships",
        "classRange": "UG Years 2?4",
        "action": "Land UI/UX summer internships with early-stage tech startups; build design system components.",
        "fallbackOption": "Offer free design overhauls to Indian open-source GitHub projects."
      },
      {
        "stage": "Industry Role",
        "classRange": "Post-Grad",
        "action": "Join product companies (Flipkart, Swiggy, Cred, Microsoft, Google) or international remote design studios.",
        "fallbackOption": "Freelance UX consulting on Upwork / Fiverr with foreign currency earnings."
      }
    ]
  },
  {
    "id": "sports-professional-athlete",
    "title": "Professional Athlete & Sports High-Performance Specialist",
    "category": "Sports",
    "shortSummary": "Compete in national & international sports tournaments, win medals for India, or lead as high-performance sports coach/specialist.",
    "requiredStream": [
      "Humanities",
      "Commerce",
      "PCM",
      "PCB",
      "Vocational"
    ],
    "academicDifficulty": "Low",
    "competitionScore": "Extreme",
    "financialRequirement": "Medium (?2L-?8L)",
    "studyDurationYears": "Continuous Athletic Training + Dual Degree (BPES/B.Sc Sports)",
    "entranceExamDependency": "Low (Trial & Merit Driven)",
    "jobMarketRisk": "High",
    "geographicFlexibility": "High",
    "backupAvailability": "High",
    "startingSalaryRange": "?4.8 LPA ? ?18 LPA (Sports Quota Govt / League Match Fees)",
    "midCareerSalaryRange": "?18 LPA ? ?75+ LPA (National Coach / High-Performance Director)",
    "primaryExams": [
      "Khelo India Youth Games Selection",
      "National Sports University (NSU) Entrance",
      "State Association Trials"
    ],
    "alternativeExams": [
      "Delhi University Sports Quota Trials",
      "LNIPE Gwalior Entrance",
      "SAI COE Trials"
    ],
    "skillsRequired": [
      "Sport-Specific Mastery",
      "Peak Athletic Conditioning",
      "Tactical & Game IQ",
      "Mental Toughness & Focus",
      "Nutrition & Recovery Discipline"
    ],
    "highProbabilityPath": {
      "title": "State Level Medalist + Central/State Government Sports Quota Recruitment",
      "description": "Indian Railways, Defence Services, State Police, Postal Department, and Nationalized Banks recruit state/national medalists under 5% sports quota.",
      "institutions": [
        "Sports Authority of India (SAI) Regional Centers",
        "State Sports Hostels"
      ],
      "prepStrategy": "Regular 4-6 hours daily discipline + competing in inter-district, state championships, and Khelo India state games."
    },
    "ambitiousPath": {
      "title": "National Champion / TOPS (Target Olympic Podium Scheme) Athlete / Pro League Player",
      "description": "Selection for Indian National Team, Commonwealth/Asian Games, Olympics, or Indian Premier Leagues (IPL, ISL, PKL, PBL).",
      "institutions": [
        "SAI National Centers of Excellence (NCOE)",
        "Inspire Institute of Sport (IIS Vijayanagar)",
        "Tata Football / Padukone-Dravid Academy"
      ],
      "prepStrategy": "Specialized coaching with biomechanics tracking, sports nutrition, sports psychology, and international tournament exposure."
    },
    "backupPath": {
      "title": "B.Sc Sports Science / BPES / Sports Management + Strength & Conditioning Coach",
      "description": "The sports industry in India is growing rapidly; certified coaches, physical trainers, physiotherapists, and sports analysts are in huge demand.",
      "institutions": [
        "Lakshmibai National Institute of Physical Education (LNIPE Gwalior)",
        "National Sports University (Manipur)",
        "Symbiosis School of Sports Sciences"
      ],
      "recoveryStrategy": "Certified S&C coaches earn ?6-15 LPA in fitness academies, schools, and private sports clubs."
    },
    "lowCostPath": {
      "title": "Khelo India Scholarship (?6.28 Lakhs/year per athlete) + SAI Residential Hostels",
      "description": "Talented athletes identified under Khelo India receive free boarding, world-class coaching, equipment, and ?1.20 Lakh annual out-of-pocket allowance.",
      "institutions": [
        "Khelo India Accredited Academies",
        "State Sports Authority Hostels"
      ],
      "freeResources": [
        "SAI Fit India fitness protocols",
        "Khelo India grassroots test protocols",
        "YouTube sports biomechanics & drill libraries"
      ]
    },
    "timelineStages": [
      {
        "stage": "Class 8?10",
        "classRange": "Class 8?10",
        "action": "Train 3-4 hours daily; dominate school, district, and state age-group tournaments (U-14 / U-16).",
        "fallbackOption": "Maintain 70%+ academic grades alongside sport."
      },
      {
        "stage": "Class 11?12",
        "classRange": "Class 11?12",
        "action": "Participate in National School Games (SGFI) and Khelo India Youth Games. Choose manageable academic stream (Humanities/Commerce).",
        "fallbackOption": "Avail school sports quota attendance relaxation."
      },
      {
        "stage": "College & Trials",
        "classRange": "Age 18?21",
        "action": "Join top university under Sports Quota (DU / Jamia / Punjabi University) while playing Senior Nationals and University Games.",
        "fallbackOption": "Enroll in BPES / B.Sc Sports Science to guarantee dual-career security."
      },
      {
        "stage": "Gov Quota Recruitment",
        "classRange": "Age 20?24",
        "action": "Secure employment in Indian Railways / Indian Army / Police under sports merit quota.",
        "fallbackOption": "Earn regular government salary while continuing training."
      },
      {
        "stage": "Pro League / Coaching",
        "classRange": "Post-Athletic",
        "action": "Compete in national pro leagues, or transition to NIS Diploma in Sports Coaching (SAI Patiala).",
        "fallbackOption": "Found your own sports academy or private coaching enterprise."
      }
    ]
  },
  {
    "id": "data-scientist-business-analyst",
    "title": "Data Scientist & Quantitative Business Analyst",
    "category": "Engineering & Tech",
    "shortSummary": "Uncover actionable patterns from big data, build predictive AI algorithms, and guide multi-million dollar corporate strategies.",
    "requiredStream": [
      "PCM",
      "Commerce_Maths",
      "Humanities"
    ],
    "academicDifficulty": "High",
    "competitionScore": "High",
    "financialRequirement": "Medium (?2L-?8L)",
    "studyDurationYears": "3-4 Years (B.Tech / B.Sc Statistics / B.Sc Data Science)",
    "entranceExamDependency": "Medium",
    "jobMarketRisk": "Low",
    "geographicFlexibility": "High",
    "backupAvailability": "High",
    "startingSalaryRange": "?6.5 LPA ? ?18 LPA",
    "midCareerSalaryRange": "?22 LPA ? ?60+ LPA (Chief Data Officer / Lead Data Scientist)",
    "primaryExams": [
      "JEE Main",
      "CUET UG (B.Sc Statistics/Maths at ISI / DU / BHU)",
      "IIT Madras BS Qualifier"
    ],
    "alternativeExams": [
      "Indian Statistical Institute (ISI) Admission Test",
      "CMI (Chennai Mathematical Institute) Entrance Test"
    ],
    "skillsRequired": [
      "Python / R",
      "Probability & Inferential Statistics",
      "SQL & Big Data",
      "Machine Learning (Scikit-Learn, XGBoost)",
      "Tableau / PowerBI"
    ],
    "highProbabilityPath": {
      "title": "B.Sc Statistics / B.Sc Data Science from Central/State University + Kaggle & Python Skills",
      "description": "Admission via CUET UG into premier statistics programs (Delhi University, BHU, Mumbai University).",
      "institutions": [
        "Hindu College (DU)",
        "Lady Shri Ram (LSR)",
        "St. Xavier?s College Mumbai",
        "Fergusson College Pune"
      ],
      "prepStrategy": "Master Class 11-12 Mathematics (Calculus, Combinatorics, Probability) + CUET General/Maths test."
    },
    "ambitiousPath": {
      "title": "Indian Statistical Institute (ISI Kolkata/Bangalore) B.Stat/B.Math & IIT BS Data Science",
      "description": "ISI is internationally legendary for mathematics/statistics with 100% placement and high monthly stipends (?5,000/mo to all admitted students).",
      "institutions": [
        "Indian Statistical Institute (ISI Kolkata)",
        "Chennai Mathematical Institute (CMI)",
        "IIT Madras BS Data Science"
      ],
      "prepStrategy": "Deep mathematical proofs, TOMATO (Test of Mathematics at the 10+2 Level) practice, and Olympiad math problems."
    },
    "backupPath": {
      "title": "B.Com / BA Economics + Advanced SQL + Power BI + Business Analytics Certification",
      "description": "Business Analytics roles value business acumen and SQL/Excel dashboards as much as complex coding.",
      "institutions": [
        "Any Commerce/Economics College",
        "Kaggle & Coursera Specializations"
      ],
      "recoveryStrategy": "Business Analyst roles in consulting firms (McKinsey, BCG, Fractal, Mu Sigma) recruit directly from economics/commerce majors."
    },
    "lowCostPath": {
      "title": "IIT Madras BS Degree in Data Science & Applications (Online/Hybrid - Scaled Fees with 75% Fee Waiver for EWS)",
      "description": "Direct entry via foundational qualifier test; high-quality curriculum created by IIT Madras faculty with flexible exits.",
      "institutions": [
        "IIT Madras Online Degree Portal"
      ],
      "freeResources": [
        "StatQuest with Josh Starmer on YouTube",
        "Khan Academy Probability & Statistics",
        "Kaggle free micro-courses"
      ]
    },
    "timelineStages": [
      {
        "stage": "Class 8?10",
        "classRange": "Class 8?10",
        "action": "Master fractions, percentages, probability, and basic Excel spreadsheets.",
        "fallbackOption": "Practice puzzle solving and mathematical reasoning."
      },
      {
        "stage": "Class 11?12",
        "classRange": "Class 11?12",
        "action": "Take Mathematics as a compulsory subject (in PCM or Commerce). Excel in Probability and Calculus.",
        "fallbackOption": "Learn basic Python and Pandas library on YouTube."
      },
      {
        "stage": "Entrance Exam",
        "classRange": "Class 12 Exit",
        "action": "Appear for ISI Admission Test, IAT, CUET UG, and IIT Madras BS Qualifier.",
        "fallbackOption": "Join state university B.Sc Mathematics/Statistics or BCA."
      },
      {
        "stage": "UG Years 1?3",
        "classRange": "UG Years 1?3",
        "action": "Master Python, SQL, Tableau, machine learning models, and participate in Kaggle competitions.",
        "fallbackOption": "Build end-to-end data dashboards on real Indian datasets (e.g. data.gov.in)."
      },
      {
        "stage": "Placement & Industry",
        "classRange": "UG Year 4",
        "action": "Join analytics firms, fintech unicorns, e-commerce giants, or global banks (Goldman Sachs, JPMorgan).",
        "fallbackOption": "Pursue M.Sc Data Science or MBA Business Analytics to elevate salary trajectory."
      }
    ]
  }
];
