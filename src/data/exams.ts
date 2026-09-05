import { Exam } from "../types";

export const EXAMS_DATABASE: Exam[] = [
  {
    "id": "jee-main",
    "name": "JEE Main",
    "fullName": "Joint Entrance Examination (Main)",
    "category": "Engineering",
    "eligibility": "10+2 with Physics, Mathematics, and Chem/Bio/Vocational; No age limit",
    "startPrepClass": "Class 11 (Foundation in Class 9-10 recommended)",
    "subjects": [
      "Physics (33.3%)",
      "Chemistry (33.3%)",
      "Mathematics (33.3%)"
    ],
    "difficulty": "High",
    "approximateCompetition": "14.5 Lakh applicants for ~57,000 NIT/IIIT/GFTI seats",
    "examFee": "?1,000 (General Male) / ?800 (Female) / ?500 (SC/ST/PwD)",
    "officialSourceUrl": "https://jeemain.nta.ac.in",
    "freePreparationResources": [
      {
        "name": "NTA Abhyas App",
        "url": "https://www.nta.ac.in/Abhyas",
        "description": "Official free mock tests by National Testing Agency"
      },
      {
        "name": "Mohit Tyagi YouTube",
        "url": "https://www.youtube.com/@MohitTyagi",
        "description": "Complete free JEE Advanced & Main syllabus"
      },
      {
        "name": "Physics Galaxy by Ashish Arora",
        "url": "https://www.physicsgalaxy.com",
        "description": "Concept videos and problem-solving checklists"
      }
    ],
    "alternativeExams": [
      "State CETs (WBJEE, MHT-CET, KCET)",
      "BITSAT",
      "COMEDK",
      "CUET UG"
    ],
    "whatIfFailed": "Eligibility remains valid for state engineering colleges, top private universities, or 3-year BCA/BSc Computer Science leading to NIMCET / MCA.",
    "examMonth": "Session 1: January | Session 2: April"
  },
  {
    "id": "jee-advanced",
    "name": "JEE Advanced",
    "fullName": "Joint Entrance Examination (Advanced)",
    "category": "Engineering & Pure Science",
    "eligibility": "Top 2,50,000 qualifiers of JEE Main; 75% in Class 12 Board (65% for SC/ST)",
    "startPrepClass": "Class 11 (Intensive problem solving)",
    "subjects": [
      "Physics (Paper 1 & 2)",
      "Chemistry (Paper 1 & 2)",
      "Mathematics (Paper 1 & 2)"
    ],
    "difficulty": "Extreme",
    "approximateCompetition": "1.9 Lakh candidates for ~17,740 IIT seats",
    "examFee": "?3,200 (General) / ?1,600 (Female & SC/ST/PwD)",
    "officialSourceUrl": "https://jeeadv.ac.in",
    "freePreparationResources": [
      {
        "name": "NPTEL / IIT PAL",
        "url": "https://nptel.ac.in",
        "description": "Recorded video lectures by IIT professors for 11th & 12th"
      },
      {
        "name": "Irodov & Pathfinder Solutions Online",
        "url": "https://archive.org",
        "description": "Advanced problem archives"
      }
    ],
    "alternativeExams": [
      "JEE Main (NITs/IIITs)",
      "BITSAT (Pilani, Goa, Hyderabad)",
      "IAT (IISERs)",
      "NEST (NISER)"
    ],
    "whatIfFailed": "Top NITs and IIITs through JEE Main offer equivalent tech career salaries; IISERs offer pure research routes.",
    "examMonth": "May / June"
  },
  {
    "id": "neet-ug",
    "name": "NEET-UG",
    "fullName": "National Eligibility cum Entrance Test (Undergraduate)",
    "category": "Medical & Dental",
    "eligibility": "10+2 with Physics, Chemistry, Biology/Biotech & English; Min age 17",
    "startPrepClass": "Class 11 (NCERT line-by-line mastery)",
    "subjects": [
      "Biology - Botany & Zoology (50%)",
      "Chemistry (25%)",
      "Physics (25%)"
    ],
    "difficulty": "Extreme",
    "approximateCompetition": "24 Lakh applicants for ~56,000 Government MBBS seats",
    "examFee": "?1,700 (General) / ?1,600 (OBC-NCL/EWS) / ?1,000 (SC/ST/PwD)",
    "officialSourceUrl": "https://neet.nta.ac.in",
    "freePreparationResources": [
      {
        "name": "NCERT e-Pathshala",
        "url": "https://epathshala.nic.in",
        "description": "Official NCERT digital textbooks and exemplar"
      },
      {
        "name": "Physics Wallah YouTube",
        "url": "https://www.youtube.com/@PhysicsWallah",
        "description": "Free NEET concept playlists & one-shots"
      },
      {
        "name": "Dr. Anand Mani Biology",
        "url": "https://anandmani.com",
        "description": "Free mind maps and NCERT line-by-line drills"
      }
    ],
    "alternativeExams": [
      "AIIMS Paramedical",
      "ICAR AIEEA",
      "State Pharmacy CET",
      "CUET UG Biomedical"
    ],
    "whatIfFailed": "BDS, BVSc (Veterinary), BAMS, BHMS, BPT (Physiotherapy), BSc Nursing, or BSc Biotech offer outstanding medical careers.",
    "examMonth": "First Sunday of May"
  },
  {
    "id": "cuet-ug",
    "name": "CUET UG",
    "fullName": "Common University Entrance Test (UG)",
    "category": "Central Universities & Multi-stream",
    "eligibility": "10+2 passed from any recognized board in India",
    "startPrepClass": "Class 12",
    "subjects": [
      "Languages (Section IA/IB)",
      "Domain Subjects (NCERT Class 12 syllabus)",
      "General Test (Section III)"
    ],
    "difficulty": "Moderate",
    "approximateCompetition": "13.5 Lakh applicants across 250+ Central, State, and Deemed Universities",
    "examFee": "?1,000 (up to 3 subjects) + ?400 per extra subject",
    "officialSourceUrl": "https://exams.nta.ac.in/CUET-UG",
    "freePreparationResources": [
      {
        "name": "SWAYAM NCERT Portal",
        "url": "https://swayam.gov.in",
        "description": "Government courseware for all Class 12 domains"
      },
      {
        "name": "CUET Adda247 Free Mocks",
        "url": "https://www.adda247.com/cuet",
        "description": "General test and domain previous papers"
      }
    ],
    "alternativeExams": [
      "State University Merit Admissions",
      "IPMAT",
      "NPAT"
    ],
    "whatIfFailed": "State universities and affiliated colleges accept 12th board percentages directly.",
    "examMonth": "May ? June"
  },
  {
    "id": "clat-ug",
    "name": "CLAT",
    "fullName": "Common Law Admission Test",
    "category": "Law",
    "eligibility": "10+2 with minimum 45% marks (40% for SC/ST)",
    "startPrepClass": "Class 11 or 12",
    "subjects": [
      "English Comprehension (20%)",
      "Current Affairs & GK (25%)",
      "Legal Reasoning (25%)",
      "Logical Reasoning (20%)",
      "Quantitative Tech (10%)"
    ],
    "difficulty": "High",
    "approximateCompetition": "65,000 candidates for ~3,200 NLU seats",
    "examFee": "?4,000 (General/OBC) / ?3,500 (SC/ST/BPL)",
    "officialSourceUrl": "https://consortiumofnlus.ac.in",
    "freePreparationResources": [
      {
        "name": "LiveLaw & Bar and Bench",
        "url": "https://www.livelaw.in",
        "description": "Daily legal news and landmark judgments"
      },
      {
        "name": "The Hindu Editorials",
        "url": "https://www.thehindu.com",
        "description": "Essential reading for comprehension speed"
      }
    ],
    "alternativeExams": [
      "AILET (NLU Delhi)",
      "SLAT (Symbiosis)",
      "MH-CET Law",
      "CUET UG Law"
    ],
    "whatIfFailed": "Government Law College (GLC) Mumbai, ILS Pune, and 3-year LLB after graduation produce top judges and advocates.",
    "examMonth": "First Sunday of December"
  },
  {
    "id": "nda-na-exam",
    "name": "NDA & NA Exam",
    "fullName": "National Defence Academy & Naval Academy Examination",
    "category": "Defence & Armed Forces",
    "eligibility": "Unmarried male/female; Age 16.5?19.5; 10+2 passed (PCM for Air Force/Navy)",
    "startPrepClass": "Class 11",
    "subjects": [
      "Mathematics (300 Marks - Class 11-12)",
      "General Ability Test (600 Marks - English, GK, Science)"
    ],
    "difficulty": "Very High (SSB Interview)",
    "approximateCompetition": "6 Lakh applicants for ~400 cadet seats",
    "examFee": "?100 (General) / Nil for Female & SC/ST candidates",
    "officialSourceUrl": "https://upsc.gov.in",
    "freePreparationResources": [
      {
        "name": "UPSC Previous Year Papers",
        "url": "https://upsc.gov.in/examinations/previous-question-papers",
        "description": "10 years NDA archives with answer keys"
      },
      {
        "name": "Defence Wallah YouTube",
        "url": "https://www.youtube.com/@DefenceWallahPW",
        "description": "Free NDA math marathons & GAT coverage"
      }
    ],
    "alternativeExams": [
      "CDS Exam (after graduation)",
      "AFCAT",
      "Army TES 10+2 (Direct SSB via JEE Rank)",
      "Navy B.Tech Cadet Scheme"
    ],
    "whatIfFailed": "You can appear in the next 6-month cycle or enter military officer ranks via CDS/AFCAT during college.",
    "examMonth": "Twice a year: April (NDA-I) & September (NDA-II)"
  },
  {
    "id": "ca-foundation",
    "name": "CA Foundation",
    "fullName": "Chartered Accountancy Foundation Examination (ICAI)",
    "category": "Commerce & Finance",
    "eligibility": "Registered with ICAI after passing Class 10; Appear after Class 12 exams",
    "startPrepClass": "Class 12",
    "subjects": [
      "Principles & Practice of Accounting",
      "Business Laws",
      "Quantitative Aptitude (Maths/Stats/LR)",
      "Business Economics"
    ],
    "difficulty": "High",
    "approximateCompetition": "Pass rate ~25-30% (Criterion-based: 40% per subject, 50% aggregate)",
    "examFee": "?1,500 per attempt",
    "officialSourceUrl": "https://www.icai.org",
    "freePreparationResources": [
      {
        "name": "ICAI BOS Knowledge Portal",
        "url": "https://boslive.icai.org",
        "description": "Free study material, podcasts, and live revision lectures"
      },
      {
        "name": "Unacademy CA Foundation YT",
        "url": "https://www.youtube.com",
        "description": "Free marathon classes for Law & Accounts"
      }
    ],
    "alternativeExams": [
      "CSEET (CS Foundation)",
      "CMA Foundation",
      "CUET B.Com (Hons)"
    ],
    "whatIfFailed": "Students can re-appear in next session (held 3 times a year: Jan, June, Sept) without losing an academic year.",
    "examMonth": "January, June, and September"
  },
  {
    "id": "iiser-iat",
    "name": "IAT (IISER Aptitude Test)",
    "fullName": "IISER Aptitude Test for BS-MS Dual Degree",
    "category": "Pure Science & Research",
    "eligibility": "10+2 with at least 3 subjects among PCMB; 60% marks in Class 12 (55% for SC/ST/PwD)",
    "startPrepClass": "Class 11-12",
    "subjects": [
      "Physics (25%)",
      "Chemistry (25%)",
      "Mathematics (25%)",
      "Biology (25%)"
    ],
    "difficulty": "Very High",
    "approximateCompetition": "1.2 Lakh applicants for ~2,000 BS-MS seats across 7 IISERs + IISc Bengaluru + IIT Madras",
    "examFee": "?2,000 (General/OBC/EWS) / ?1,000 (SC/ST/PwD)",
    "officialSourceUrl": "https://iiseradmission.in",
    "freePreparationResources": [
      {
        "name": "SciAstra Free YouTube & Tests",
        "url": "https://www.sciastra.com",
        "description": "Dedicated IAT & NEST research entrance prep"
      },
      {
        "name": "NCERT Exemplar Problems",
        "url": "https://ncert.nic.in",
        "description": "Conceptual multiple choice problems"
      }
    ],
    "alternativeExams": [
      "NEST (NISER)",
      "CUET UG B.Sc Research",
      "JEE Advanced"
    ],
    "whatIfFailed": "Join top central/state universities for B.Sc (Hons) and crack IIT JAM for M.Sc / Integrated Ph.D. at IITs and IISc.",
    "examMonth": "June"
  },
  {
    "id": "uceed-design",
    "name": "UCEED",
    "fullName": "Undergraduate Common Entrance Examination for Design",
    "category": "Design & Creative",
    "eligibility": "10+2 from any stream (Science/Commerce/Arts); Age limit under 25",
    "startPrepClass": "Class 11 or 12",
    "subjects": [
      "Part A: Visualization, Spatial Ability, Observation, Design Thinking",
      "Part B: Drawing & Sketching"
    ],
    "difficulty": "High",
    "approximateCompetition": "15,000 applicants for ~225 B.Des seats at IIT Bombay, IIT Delhi, IIT Guwahati, IIT Hyderabad, IIITDM",
    "examFee": "?4,000 (General Male) / ?2,000 (Female & SC/ST/PwD)",
    "officialSourceUrl": "https://uceed.iitb.ac.in",
    "freePreparationResources": [
      {
        "name": "UCEED Official Past Papers",
        "url": "https://uceed.iitb.ac.in/previous-question-papers",
        "description": "All past 10 years papers with official answer keys"
      },
      {
        "name": "Stuff You Look YouTube",
        "url": "https://www.youtube.com",
        "description": "Free perspective sketching tutorials for design aspirants"
      }
    ],
    "alternativeExams": [
      "NID DAT",
      "NIFT Entrance Exam",
      "SEED (Symbiosis)",
      "Direct Portfolio Admission"
    ],
    "whatIfFailed": "Self-taught designers with strong Figma portfolios on Behance/Dribbble get hired at high starting salaries by tech startups.",
    "examMonth": "Third Sunday of January"
  },
  {
    "id": "ipmat-iim",
    "name": "IPMAT",
    "fullName": "Integrated Programme in Management Aptitude Test (IIM Indore/Rohtak/Ranchi)",
    "category": "Management & Business",
    "eligibility": "10+2 with minimum 60% aggregate (55% for SC/ST/PwD)",
    "startPrepClass": "Class 11-12",
    "subjects": [
      "Quantitative Ability (MCQ + Short Answer)",
      "Verbal Ability (Reading Comprehension & Grammar)"
    ],
    "difficulty": "High",
    "approximateCompetition": "30,000 candidates for ~150 seats at IIM Indore (Dual BBA+MBA degree)",
    "examFee": "?4,130 (General) / ?2,065 (SC/ST/PwD)",
    "officialSourceUrl": "https://www.iimidr.ac.in",
    "freePreparationResources": [
      {
        "name": "Rodha YouTube Channel",
        "url": "https://www.youtube.com/@Rodha",
        "description": "Top quality free quantitative aptitude and algebra lectures"
      },
      {
        "name": "Word Power Made Easy by Norman Lewis",
        "url": "https://archive.org",
        "description": "Vocabulary and verbal mastery classic"
      }
    ],
    "alternativeExams": [
      "IPMAT Rohtak",
      "JIPMAT (IIM Jammu & Bodh Gaya)",
      "CUET UG BBA (FIA) / BMS"
    ],
    "whatIfFailed": "Join top B.Com / BBA / Economics college and appear for CAT after graduation to enter IIMs.",
    "examMonth": "May"
  }
];
