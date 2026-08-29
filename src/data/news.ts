export interface NewsItem {
  id: string;
  title: string;
  category: 'News' | 'Events' | 'Achievements';
  date: string;
  summary: string;
  content: string;
  image: string;
  location?: string;
  badgeText?: string;
}

export const NEWS_DATA: NewsItem[] = [
  {
    id: 'campus-drive-2026',
    title: 'Annual Mega Campus Placement Drive 2026 Hosted at SRGI Campus',
    category: 'News',
    date: 'February 15, 2026',
    summary: 'Over 45 leading multinational companies and tech firms visited SRGI campus for recruitment across Engineering, MBA, Pharmacy, and MCA batches.',
    content: 'SR Group of Institutions successfully organized its annual Mega Placement Drive 2026. Top recruiters including TCS, Infosys, Wipro, Tech Mahindra, and Sun Pharma participated in the drive. Over 350 students received job offers with competitive packages, reflecting SRGI\'s commitment to industry-aligned quality education.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Placements'
  },
  {
    id: 'national-tech-fest',
    title: 'National Level Technical Symposium & Coding Hackathon "SR-TECHFEST"',
    category: 'Events',
    date: 'March 10-12, 2026',
    summary: '3-day national inter-college fest featuring hackathons, robotics challenges, CAD modeling, paper presentations, and guest keynotes.',
    content: 'Students from over 40 engineering colleges participated in SR-TECHFEST 2026. The event featured problem-solving tracks in AI applications, sustainable agriculture technology, and web engineering with total cash prizes worth ₹2,500,000.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    location: 'SRGI Main Auditorium & Tech Labs',
    badgeText: 'Symposium'
  },
  {
    id: 'aktu-top-rankers',
    title: 'SRGI Students Secure Top Ranks in AKTU Semester Examination',
    category: 'Achievements',
    date: 'January 28, 2026',
    summary: 'Four B.Tech CSE and B.Pharm students earned university merit ranks in the recently declared AKTU examination results.',
    content: 'S.R. Group of Institutions continues its tradition of academic excellence as four final year students earned top 10 merit ranks in Dr. A.P.J. Abdul Kalam Technical University (AKTU) examinations. Chairman Pawan Kumar Yadav congratulated the faculty and students for this stellar achievement.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Academic Excellence'
  },
  {
    id: 'agri-expo-2026',
    title: 'Farmer Training & Modern Organic Agriculture Workshop',
    category: 'Events',
    date: 'April 05, 2026',
    summary: 'SRGI College of Agriculture hosted a community outreach program on soil health cards, drip irrigation, and bio-fertilizer usage.',
    content: 'Over 200 local farmers from Bundelkhand region attended the interactive workshop led by agriculture scientists and M.Sc. Agronomy researchers. Live demonstrations on drone spraying and organic pest control were conducted.',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
    location: 'SRGI Experimental Agriculture Farm',
    badgeText: 'Community Outreach'
  },
  {
    id: 'pharma-patent-grant',
    title: 'SRGI Pharmacy Faculty Granted Indian Patent for Herbal Formulation',
    category: 'Achievements',
    date: 'February 02, 2026',
    summary: 'Department of Pharmaceutical Sciences receives official patent recognition for novel herbal formulation with anti-inflammatory properties.',
    content: 'The research team at S.R. College of Pharmacy achieved a milestone with the grant of an Indian Patent for novel phytochemical extraction techniques. This highlight underscores SRGI\'s focus on cutting-edge scientific research.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Research & Innovation'
  },
  {
    id: 'moot-court-competition',
    title: 'Inter-State Moot Court Competition Hosted by S.R. College of Law',
    category: 'Events',
    date: 'April 18, 2026',
    summary: 'Law students debated complex constitutional law arguments judged by senior High Court advocates and legal scholars.',
    content: 'The 4th National Moot Court Competition focused on Intellectual Property Rights and Cyber Law. Teams from 16 law universities competed, with SRGI Law college providing seamless coordination.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    location: 'SRGI Moot Court Hall',
    badgeText: 'Legal Symposium'
  }
];
