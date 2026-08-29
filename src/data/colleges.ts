export interface College {
  id: string;
  name: string;
  shortName: string;
  established: string;
  approval: string;
  affiliation: string;
  description: string;
  image: string;
  programsCount: number;
  featuredPrograms: string[];
  keyHighlights: string[];
}

export const COLLEGES_DATA: College[] = [
  {
    id: 'engineering',
    name: '(College of Science & Engineering)',
    shortName: 'SRGI Engineering',
    established: '2002',
    approval: 'AICTE, Govt. of India',
    affiliation: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow',
    description: 'Premier engineering institution equipping students with technical expertise in Computer Science, Mechanical, Civil, and Electronics with state-of-the-art labs and innovation hubs.',
    image: '/assets/cse.jpg',
    programsCount: 4,
    featuredPrograms: ['B.Tech CSE', 'B.Tech Mechanical', 'B.Tech Civil', 'B.Tech ECE'],
    keyHighlights: ['Center of Excellence in AI & Robotics', 'AKTU Top Ranking Institution in Bundelkhand', 'Dedicated T&P Cell with 200+ Corporate Partners']
  },
  {
    id: 'pharmacy',
    name: 'College of Pharmacy (COP)',
    shortName: 'SRGI Pharmacy',
    established: '2004',
    approval: 'Pharmacy Council of India (PCI) & AICTE',
    affiliation: 'AKTU Lucknow & BTEUP Lucknow',
    description: 'Leading pharmaceutical college committed to scientific research, pharmaceutical formulation, drug discovery, and clinical healthcare training.',
    image: '/assets/cop.jpeg',
    programsCount: 3,
    featuredPrograms: ['B.Pharm', 'M.Pharm (Pharmaceutics/Pharmacology)', 'D.Pharm'],
    keyHighlights: ['PCI Approved Modern Formulation Labs', 'Medicinal Botanical Garden', 'Hospital & Clinical Internship Network']
  },
  {
    id: 'professional',
    name: 'College of Professional Studies (CPS)',
    shortName: 'SRGI Management & IT',
    established: '2006',
    approval: 'AICTE & UGC Recognized',
    affiliation: 'AKTU Lucknow & Bundelkhand University, Jhansi',
    description: 'Transforming aspiring students into strategic business leaders and software specialists through experiential MBA, MCA, BBA, and BCA programs.',
    image: '/assets/cps.jpeg',
    programsCount: 4,
    featuredPrograms: ['MBA', 'MCA', 'BBA', 'BCA'],
    keyHighlights: ['Dual Specialization MBA', 'Corporate Mentorship Program', 'Live Business Case Competitions']
  },
  {
    id: 'agriculture',
    name: 'College of Pharmaceutical Sciences',
    shortName: 'SRGI Agriculture',
    established: '2014',
    approval: 'ICAR Aligned Curriculum',
    affiliation: 'Bundelkhand University, Jhansi',
    description: 'Provides quality pharmaceutical education with a strong focus on drug development, healthcare practices, research, and industry-oriented training through modern laboratories and experienced faculty.',
    image: '/assets/pharma.jpeg',
    programsCount: 5,
    featuredPrograms: ['B.Sc. (Hons.) Agriculture', 'M.Sc. Agronomy', 'M.Sc. Soil Science', 'M.Sc. Horticulture'],
    keyHighlights: ['Multi-Acre Demonstration Farms', 'Soil & Plant Analytical Testing Unit', 'RAWE Rural Attachment Program']
  },
  {
    id: 'law',
    name: 'College of Law',
    shortName: 'SRGI Law',
    established: '2015',
    approval: 'Bar Council of India (BCI)',
    affiliation: 'Bundelkhand University, Jhansi',
    description: 'Developing ethical legal advocates, corporate legal advisors, and judicial service officers through rigorous legal theory and practical Moot Court training.',
    image: '/assets/law.jpeg',
    programsCount: 2,
    featuredPrograms: ['B.A. LL.B (5 Year Integrated)', 'LL.B. (3 Year Degree)'],
    keyHighlights: ['Fully Equipped Moot Court Room', 'Free Legal Aid Cell', 'Internships under High Court & District Judges']
  },
  {
    id: 'polytechnic',
    name: 'College of Polytechnic',
    shortName: 'SRGI Polytechnic',
    established: '2008',
    approval: 'AICTE, Govt. of India',
    affiliation: 'Board of Technical Education UP (BTEUP), Lucknow',
    description: 'Focuses on diploma and vocational education, enabling students to enter the workforce with industry-relevant skills and certifications..',
    image: '/assets/poly.jpeg',
    programsCount: 4,
    featuredPrograms: ['Diploma in ME', 'Diploma in EE', 'Diploma in Civil', 'Diploma in CS'],
    keyHighlights: ['Heavy Engineering Machining Workshop', 'BTEUP Syllabus Aligned Labs', 'Direct Lateral Entry to B.Tech Degree']
  }
];
