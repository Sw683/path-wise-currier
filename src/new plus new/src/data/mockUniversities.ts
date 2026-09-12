export interface UniversityNode {
  id: string;
  name: string;
  shortName: string;
  location: string;
  type: 'Central' | 'State' | 'Institute of Eminence' | 'Autonomous' | 'Private';
  colleges: {
    id: string;
    name: string;
    departments: {
      id: string;
      name: string;
      branches: string[];
    }[];
  }[];
  clubs: string[];
}

export const MOCK_UNIVERSITIES: UniversityNode[] = [
  {
    id: 'du',
    name: 'University of Delhi (DU)',
    shortName: 'Delhi University',
    location: 'New Delhi',
    type: 'Central',
    colleges: [
      {
        id: 'du-cic',
        name: 'Cluster Innovation Centre (CIC)',
        departments: [
          {
            id: 'cic-it',
            name: 'Information Technology & Mathematical Innovations',
            branches: ['IT & Mathematics', 'Data Science', 'Software Engineering'],
          },
          {
            id: 'cic-design',
            name: 'Humanities & Social Sciences Design',
            branches: ['Digital Communication', 'Urban Studies'],
          },
        ],
      },
      {
        id: 'du-kmc',
        name: 'Kirori Mal College',
        departments: [
          {
            id: 'kmc-cs',
            name: 'Computer Science',
            branches: ['B.Sc (Hons) Computer Science', 'Data Analytics'],
          },
          {
            id: 'kmc-math',
            name: 'Mathematics',
            branches: ['B.Sc (Hons) Mathematics', 'Applied Math'],
          },
          {
            id: 'kmc-physics',
            name: 'Physics & Electronics',
            branches: ['B.Sc Electronics', 'Applied Physics'],
          },
        ],
      },
      {
        id: 'du-ssc',
        name: 'St. Stephen’s College',
        departments: [
          {
            id: 'ssc-cs',
            name: 'Computer Science & Applications',
            branches: ['B.Sc Computer Science'],
          },
          {
            id: 'ssc-econ',
            name: 'Economics',
            branches: ['B.A. (Hons) Economics', 'Econometrics'],
          },
        ],
      },
    ],
    clubs: ['Delhi University Coding Club', 'DU Debating Society', 'Enactus DU', 'E-Cell DU', 'Robotics Society'],
  },
  {
    id: 'iitd',
    name: 'Indian Institute of Technology Delhi (IIT Delhi)',
    shortName: 'IIT Delhi',
    location: 'Hauz Khas, New Delhi',
    type: 'Institute of Eminence',
    colleges: [
      {
        id: 'iitd-main',
        name: 'Main Campus',
        departments: [
          {
            id: 'iitd-cse',
            name: 'Computer Science & Engineering',
            branches: ['B.Tech CSE', 'Dual Degree CSE', 'M.Tech CSE', 'PhD'],
          },
          {
            id: 'iitd-ee',
            name: 'Electrical Engineering',
            branches: ['Electrical & Computer', 'Control & Automation', 'Power & Energy'],
          },
          {
            id: 'iitd-mech',
            name: 'Mechanical Engineering',
            branches: ['Product Design', 'Robotics & Automation', 'Thermal Engg'],
          },
          {
            id: 'iitd-scai',
            name: 'School of Artificial Intelligence (Yardi SCAI)',
            branches: ['M.Tech in AI', 'MS (Research) in AI', 'PhD AI'],
          },
        ],
      },
    ],
    clubs: ['DevClub IITD', 'Robotics Club IITD', 'eDC IIT Delhi', 'PFC IITD', 'Design & Innovation Lab'],
  },
  {
    id: 'bits',
    name: 'Birla Institute of Technology and Science, Pilani (BITS Pilani)',
    shortName: 'BITS Pilani',
    location: 'Pilani / Goa / Hyderabad',
    type: 'Institute of Eminence',
    colleges: [
      {
        id: 'bits-pilani-campus',
        name: 'Pilani Campus',
        departments: [
          {
            id: 'bits-cs',
            name: 'Computer Science & Information Systems',
            branches: ['B.E. Computer Science', 'M.Sc (Tech) Information Systems'],
          },
          {
            id: 'bits-eee',
            name: 'Electrical & Electronics',
            branches: ['B.E. EEE', 'B.E. ENI'],
          },
          {
            id: 'bits-econ',
            name: 'Economics & Finance',
            branches: ['M.Sc Economics', 'FinTech Minor'],
          },
        ],
      },
    ],
    clubs: ['ACM BITS Pilani', 'Postman Student Lab', 'Wall Street Club BITS', 'CEL Pilani'],
  },
  {
    id: 'anna',
    name: 'Anna University (CEG Campus)',
    shortName: 'Anna University',
    location: 'Chennai, Tamil Nadu',
    type: 'State',
    colleges: [
      {
        id: 'ceg-main',
        name: 'College of Engineering, Guindy (CEG)',
        departments: [
          {
            id: 'ceg-cse',
            name: 'Computer Science and Engineering',
            branches: ['B.E. CSE', 'B.Tech IT', 'M.E. Software Engg'],
          },
          {
            id: 'ceg-ece',
            name: 'Electronics and Communication Engineering',
            branches: ['B.E. ECE', 'VLSI Design', 'Embedded Systems'],
          },
        ],
      },
    ],
    clubs: ['CEG Tech Forum (Kurukshetra)', 'Rotaract Club CEG', 'IEEE CEG Student Branch'],
  },
  {
    id: 'vnit',
    name: 'Visvesvaraya National Institute of Technology (VNIT)',
    shortName: 'VNIT Nagpur',
    location: 'Nagpur, Maharashtra',
    type: 'Central',
    colleges: [
      {
        id: 'vnit-campus',
        name: 'Main Campus',
        departments: [
          {
            id: 'vnit-cse',
            name: 'Computer Science & Engineering',
            branches: ['B.Tech CSE', 'M.Tech CSE'],
          },
          {
            id: 'vnit-ece',
            name: 'Electronics & Communication',
            branches: ['B.Tech ECE', 'Signal Processing'],
          },
        ],
      },
    ],
    clubs: ['VNIT Coding Club', 'IvLabs Robotics', 'E-Cell VNIT'],
  },
  {
    id: 'dps',
    name: 'Delhi Public School (R.K. Puram)',
    shortName: 'DPS R.K. Puram',
    location: 'New Delhi',
    type: 'Autonomous',
    colleges: [
      {
        id: 'dps-senior',
        name: 'Senior Secondary Wing',
        departments: [
          {
            id: 'dps-science',
            name: 'Science & Computer Science',
            branches: ['Class 11 Science (PCM + CS)', 'Class 12 Science (PCM + CS)'],
          },
          {
            id: 'dps-middle',
            name: 'Middle School Exploration',
            branches: ['Class 8 STEM Club', 'Class 9 STEM & Robotics', 'Class 10 Foundation'],
          },
        ],
      },
    ],
    clubs: ['Exun Clan (Computer Club)', 'Robotics Society', 'Model UN Society'],
  },
];
