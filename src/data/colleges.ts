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
    name: 'S.R. Group of Institutions (College of Engineering)',
    shortName: 'SRGI Engineering',
    established: '2002',
    approval: 'AICTE, Govt. of India',
    affiliation: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow',
    description: 'Premier engineering institution equipping students with technical expertise in Computer Science, Mechanical, Civil, and Electronics with state-of-the-art labs and innovation hubs.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80',
    programsCount: 4,
    featuredPrograms: ['B.Tech CSE', 'B.Tech Mechanical', 'B.Tech Civil', 'B.Tech ECE'],
    keyHighlights: ['Center of Excellence in AI & Robotics', 'AKTU Top Ranking Institution in Bundelkhand', 'Dedicated T&P Cell with 200+ Corporate Partners']
  },
  {
    id: 'pharmacy',
    name: 'S.R. College of Pharmacy',
    shortName: 'SRGI Pharmacy',
    established: '2004',
    approval: 'Pharmacy Council of India (PCI) & AICTE',
    affiliation: 'AKTU Lucknow & BTEUP Lucknow',
    description: 'Leading pharmaceutical college committed to scientific research, pharmaceutical formulation, drug discovery, and clinical healthcare training.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80',
    programsCount: 3,
    featuredPrograms: ['B.Pharm', 'M.Pharm (Pharmaceutics/Pharmacology)', 'D.Pharm'],
    keyHighlights: ['PCI Approved Modern Formulation Labs', 'Medicinal Botanical Garden', 'Hospital & Clinical Internship Network']
  },
  {
    id: 'management',
    name: 'S.R. Institute of Management & Technology',
    shortName: 'SRGI Management & IT',
    established: '2006',
    approval: 'AICTE & UGC Recognized',
    affiliation: 'AKTU Lucknow & Bundelkhand University, Jhansi',
    description: 'Transforming aspiring students into strategic business leaders and software specialists through experiential MBA, MCA, BBA, and BCA programs.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
    programsCount: 4,
    featuredPrograms: ['MBA', 'MCA', 'BBA', 'BCA'],
    keyHighlights: ['Dual Specialization MBA', 'Corporate Mentorship Program', 'Live Business Case Competitions']
  },
  {
    id: 'agriculture',
    name: 'S.R. College of Agriculture',
    shortName: 'SRGI Agriculture',
    established: '2014',
    approval: 'ICAR Aligned Curriculum',
    affiliation: 'Bundelkhand University, Jhansi',
    description: 'Advancing agricultural science, sustainable crop techniques, soil health management, and agri-entrepreneurship on expansive experimental research farms.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80',
    programsCount: 5,
    featuredPrograms: ['B.Sc. (Hons.) Agriculture', 'M.Sc. Agronomy', 'M.Sc. Soil Science', 'M.Sc. Horticulture'],
    keyHighlights: ['Multi-Acre Demonstration Farms', 'Soil & Plant Analytical Testing Unit', 'RAWE Rural Attachment Program']
  },
  {
    id: 'law',
    name: 'S.R. College of Law',
    shortName: 'SRGI Law',
    established: '2015',
    approval: 'Bar Council of India (BCI)',
    affiliation: 'Bundelkhand University, Jhansi',
    description: 'Developing ethical legal advocates, corporate legal advisors, and judicial service officers through rigorous legal theory and practical Moot Court training.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
    programsCount: 2,
    featuredPrograms: ['B.A. LL.B (5 Year Integrated)', 'LL.B. (3 Year Degree)'],
    keyHighlights: ['Fully Equipped Moot Court Room', 'Free Legal Aid Cell', 'Internships under High Court & District Judges']
  },
  {
    id: 'polytechnic',
    name: 'S.R. Polytechnic & Skill Development',
    shortName: 'SRGI Polytechnic',
    established: '2008',
    approval: 'AICTE, Govt. of India',
    affiliation: 'Board of Technical Education UP (BTEUP), Lucknow',
    description: 'Providing hands-on vocational technical education and diploma programs designed to build skilled engineering technicians and site supervisors.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    programsCount: 4,
    featuredPrograms: ['Diploma in ME', 'Diploma in EE', 'Diploma in Civil', 'Diploma in CS'],
    keyHighlights: ['Heavy Engineering Machining Workshop', 'BTEUP Syllabus Aligned Labs', 'Direct Lateral Entry to B.Tech Degree']
  }
];
