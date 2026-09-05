import { SportsPath } from "../types";

export const SPORTS_DATABASE: SportsPath[] = [
  {
    "id": "cricket",
    "sportName": "Cricket",
    "category": "Team Sport",
    "tierMilestones": [
      {
        "tier": "Grassroots & School (Age 10?14)",
        "ageRange": "U-14 / U-16",
        "benchmarks": [
          "BCCI affiliated district association selection",
          "School cricket league top run-scorer/wicket-taker",
          "Basic athletic stamina & hand-eye coordination"
        ],
        "tournaments": [
          "Vijay Merchant Trophy (U-16)",
          "Vinoo Mankad Trophy (U-19)",
          "Inter-School Harris Shield / Cooch Behar"
        ]
      },
      {
        "tier": "State & Zonal (Age 15?19)",
        "ageRange": "U-19 / U-23",
        "benchmarks": [
          "State team debut in BCCI domestic circuit",
          "National Cricket Academy (NCA Bengaluru) camp call-up",
          "Consistent 130+ kmph bowling or 50+ batting average in multi-day cricket"
        ],
        "tournaments": [
          "Cooch Behar Trophy",
          "Col C.K. Nayudu Trophy (U-23)",
          "Syed Mushtaq Ali Trophy"
        ]
      },
      {
        "tier": "Professional / National (Age 19+)",
        "ageRange": "Senior",
        "benchmarks": [
          "Ranji Trophy contract",
          "IPL Auction selection / Franchise Development Squad",
          "India-A / National Senior Cap"
        ],
        "tournaments": [
          "Ranji Trophy",
          "IPL (Indian Premier League)",
          "Vijay Hazare Trophy",
          "International Bilateral Series"
        ]
      }
    ],
    "governmentSchemes": [
      "Khelo India Talent Development Scheme (?50,000/month out-of-pocket allowance)",
      "National Cricket Academy (BCA/NCA) free residential coaching",
      "Target Olympic Podium Scheme (TOPS - Development Group for 2028 Olympics)"
    ],
    "psuRecruitmentSectors": [
      "Indian Railways (Direct Officer/Clerical recruitment on sports quota)",
      "Air India / Indian Oil Corporation Limited (IOCL)",
      "State Bank of India & Public Sector Banks",
      "Income Tax / Customs & Central Excise Department"
    ],
    "dualCareerDegrees": [
      "B.Com / B.A. (Sports Quota in top universities like Delhi University / Mumbai University with attendance relaxation)",
      "B.Sc Sports Science & High Performance Conditioning",
      "BBA in Sports Management",
      "NIS Diploma in Cricket Coaching (National Institute of Sports Patiala)"
    ],
    "fitnessAndDietGuidelines": [
      "Yo-Yo Intermittent Recovery Test (Target benchmark: 17.1+ score)",
      "Daily rotator cuff & core stability protocols to prevent bowling shoulder/back stress fractures",
      "Protein intake target: 1.6?2.0g per kg body weight with hydration electrolyte checks"
    ],
    "backupCareerOptions": [
      "BCCI Certified Level 1/2/3 Cricket Coach",
      "BCCI / ICC Panel Match Official & Umpire",
      "Cricket Data Analyst & Video Analyst (using Dartfish / Siliconcoach)",
      "Sports Commentator, Podcaster & Broadcast Journalist",
      "Fitness Coach & Private Academy Entrepreneur"
    ]
  },
  {
    "id": "athletics-track-field",
    "sportName": "Athletics (Sprints, Middle Distance, Jumps & Javelin/Throws)",
    "category": "Individual Sport",
    "tierMilestones": [
      {
        "tier": "District & State (Age 12?16)",
        "ageRange": "U-14 / U-16 / U-18",
        "benchmarks": [
          "State Junior Athletics Championship Gold/Silver",
          "National Junior Athletics meet qualification mark",
          "Vo2 Max test and sprint biomechanics analysis"
        ],
        "tournaments": [
          "National Inter-District Junior Athletics Meet (NIDJAM)",
          "National Youth Athletics Championship",
          "SGFI National School Games"
        ]
      },
      {
        "tier": "National Center of Excellence (Age 16?20)",
        "ageRange": "U-20 / Senior",
        "benchmarks": [
          "Selection into SAI NCOE (Patiala, Thiruvananthapuram, Bhopal)",
          "World U-20 Athletics Championship qualification",
          "National Senior Open medal"
        ],
        "tournaments": [
          "National Inter-State Senior Athletics Championships",
          "Indian Grand Prix",
          "Federation Cup"
        ]
      },
      {
        "tier": "International Representation (Age 18+)",
        "ageRange": "Elite",
        "benchmarks": [
          "Asian Games / Commonwealth Games / Olympic qualification mark",
          "TOPS Core Group inclusion",
          "National Record holder"
        ],
        "tournaments": [
          "Olympic Games",
          "World Athletics Championships",
          "Asian Athletics Championships",
          "Diamond League"
        ]
      }
    ],
    "governmentSchemes": [
      "Target Olympic Podium Scheme (TOPS - full equipment, international training in Europe/USA funded by Govt)",
      "Khelo India Youth Games & Khelo India University Games Scholarships",
      "SAI National Centers of Excellence (100% free boarding, world-class German/Cuban coaches)"
    ],
    "psuRecruitmentSectors": [
      "Indian Army (Army Boys Sports Company & Mission Olympics Wing - direct Subedar/Havildar rank)",
      "Indian Railways (Direct Senior Clerk / Welfare Inspector jobs)",
      "Central Reserve Police Force (CRPF) / BSF / CISF",
      "State Police (DSP / Sub-Inspector direct appointment for Asian/Olympic medalists)"
    ],
    "dualCareerDegrees": [
      "BPES (Bachelor of Physical Education and Sports - LNIPE Gwalior)",
      "B.Sc Physiotherapy / Sports Rehabilitation",
      "B.A. Political Science / History (under university sports quota)"
    ],
    "fitnessAndDietGuidelines": [
      "Sport-specific explosive power training (Clean & Jerk, Plyometrics, Force Plate analysis)",
      "Periodized nutrition with strict anti-doping WADA/NADA clean supplement protocols",
      "Daily sleep tracking (minimum 8.5?9 hours for muscular supercompensation)"
    ],
    "backupCareerOptions": [
      "SAI Athletic Coach & High-Performance Director",
      "Strength & Conditioning Coach (CSCS certified) for pro sports teams",
      "Sports Physiotherapist & Biomechanist",
      "Sports Management Officer in State Sports Authorities (SDAT, DSYS)"
    ]
  },
  {
    "id": "badminton",
    "sportName": "Badminton",
    "category": "Racket Sport",
    "tierMilestones": [
      {
        "tier": "Academy & Sub-Junior (Age 9?14)",
        "ageRange": "U-13 / U-15",
        "benchmarks": [
          "All India Sub-Junior Ranking Tournament Quarterfinalist",
          "BAI (Badminton Association of India) National ID & Ranking under 50",
          "Footwork agility drill mastery (6-corner shadow in <12 seconds)"
        ],
        "tournaments": [
          "All India Sub-Junior Ranking",
          "National Sub-Junior Championships",
          "Mini Nationals"
        ]
      },
      {
        "tier": "National Junior Elite (Age 15?18)",
        "ageRange": "U-17 / U-19",
        "benchmarks": [
          "Top 10 India Junior Ranking",
          "Selection for Gopichand Academy / Prakash Padukone Academy / SAI Guwahati NCOE",
          "Junior Asian Championships qualification"
        ],
        "tournaments": [
          "All India Junior Ranking Tournaments",
          "BWF World Junior Championships",
          "Khelo India Youth Games"
        ]
      },
      {
        "tier": "BWF World Tour & Senior (Age 18+)",
        "ageRange": "Senior",
        "benchmarks": [
          "BWF World Ranking top 50 in Singles / Doubles",
          "Thomas & Uber Cup India Squad",
          "BWF Super 300/500/750 titles"
        ],
        "tournaments": [
          "BWF World Tour (All England, India Open)",
          "Olympic Games",
          "Asian Games",
          "Premier Badminton League"
        ]
      }
    ],
    "governmentSchemes": [
      "SAI National Center of Excellence for Badminton (Guwahati)",
      "Target Olympic Podium Scheme (TOPS)",
      "Khelo India Excellence Academy Grants"
    ],
    "psuRecruitmentSectors": [
      "Bharat Petroleum Corporation Limited (BPCL)",
      "Indian Oil (IOCL)",
      "Airports Authority of India (AAI)",
      "Life Insurance Corporation (LIC) & Public Sector Banks"
    ],
    "dualCareerDegrees": [
      "B.Com / BBA via Sports Quota with flexible examination schedules",
      "B.Sc Sports Science & Racket Sports Biomechanics",
      "BWF Level 1/2 Coach Certification"
    ],
    "fitnessAndDietGuidelines": [
      "High lactic-acid tolerance anaerobic interval training",
      "Ankle & knee stability conditioning to prevent ACL tears and Achilles tendonitis",
      "Lean body fat percentage target (8?11% for men, 14?18% for women)"
    ],
    "backupCareerOptions": [
      "BWF / BAI Certified International Badminton Coach",
      "Academy Director & Franchise Owner",
      "Racket Sports Event Manager & Tour Operations Specialist",
      "Sports Goods Brand Ambassador & Technical Specialist"
    ]
  },
  {
    "id": "chess",
    "sportName": "Chess",
    "category": "Mind Sport",
    "tierMilestones": [
      {
        "tier": "Junior & FIDE Rated (Age 8?13)",
        "ageRange": "U-10 / U-14",
        "benchmarks": [
          "FIDE Rating 1800?2100",
          "State Age-Group Champion",
          "National School Chess Championship top 5"
        ],
        "tournaments": [
          "National Youth & Sub-Junior Chess Championships",
          "Asian Youth Chess Championship",
          "World Cadet Chess Championship"
        ]
      },
      {
        "tier": "Title Chaser (Age 13?17)",
        "ageRange": "U-18 / Open",
        "benchmarks": [
          "FIDE International Master (IM) / Woman Grandmaster (WGM) Title",
          "FIDE Rating 2350?2500",
          "Grandmaster norms"
        ],
        "tournaments": [
          "National Senior Premier Championship",
          "World Junior Chess Championship",
          "International Open GM Tournaments in Europe/India"
        ]
      },
      {
        "tier": "Grandmaster & Super-GM (Age 16+)",
        "ageRange": "Senior",
        "benchmarks": [
          "FIDE Grandmaster (GM) Title",
          "FIDE Rating 2600?2750+ (World Top 50)",
          "Candidates Tournament / Chess Olympiad Gold for India"
        ],
        "tournaments": [
          "FIDE World Championship Candidates",
          "FIDE World Cup",
          "Chess Olympiad",
          "Tata Steel Masters"
        ]
      }
    ],
    "governmentSchemes": [
      "AICF (All India Chess Federation) Talent Support Scheme",
      "Ministry of Youth Affairs & Sports Special Cash Awards for International Medals",
      "SAI Special Training Grants for Grandmasters"
    ],
    "psuRecruitmentSectors": [
      "Indian Oil (IOCL)",
      "ONGC (Oil and Natural Gas Corporation)",
      "Indian Railways",
      "State Bank of India (Direct Officer appointments)"
    ],
    "dualCareerDegrees": [
      "B.Tech Computer Science / AI / Data Science (Chess players excel exceptionally at algorithmic logic)",
      "B.Sc Mathematics / Statistics",
      "Economics & Finance Degrees"
    ],
    "fitnessAndDietGuidelines": [
      "Cardiovascular stamina (running/swimming) to maintain brain glucose levels during 6-hour classical games",
      "Cognitive endurance & meditation routines for stress reduction",
      "Nutrition rich in Omega-3 fatty acids, complex carbs, and brain antioxidants"
    ],
    "backupCareerOptions": [
      "FIDE Certified Chess Trainer / Online Global Chess Academy Coach ($30?$100/hr)",
      "Algorithmic Trading & Quantitative Finance Analyst",
      "Chess Streamer, Content Creator & Broadcast Commentator (Chess.com / ChessBase India)",
      "Data Scientist & AI Specialist"
    ]
  }
];
