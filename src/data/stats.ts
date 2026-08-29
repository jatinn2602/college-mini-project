export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export const STATS_DATA: StatItem[] = [
  {
    id: 'students',
    value: 12,
    suffix: 'K+',
    label: 'Enrolled Students',
    description: 'Vibrant student community pursuing technical, medical, law & management degrees'
  },
  {
    id: 'campus',
    value: 80,
    suffix: ' Acres',
    label: 'Lush Campus',
    description: 'State-of-the-art academic blocks, labs, sports complexes & green surroundings'
  },
  {
    id: 'legacy',
    value: 24,
    suffix: ' Years',
    label: 'Academic Legacy',
    description: 'Delivering excellence in professional technical education since 2002'
  },
  {
    id: 'recruiters',
    value: 200,
    suffix: '+',
    label: 'Corporate Recruiters',
    description: 'Top Indian & global MNCs hiring our talent annually'
  },
  {
    id: 'placement',
    value: 100,
    suffix: '%',
    label: 'Placement Assistance',
    description: 'Dedicated training cell for career guidance, mock interviews & skill enhancement'
  }
];

export const RECRUITERS = [
  { name: 'Pfizer', logoText: 'Pfizer', category: 'Pharmaceuticals' },
  { name: 'Boeing', logoText: 'Boeing', category: 'Mechanical' },
  { name: 'Wipro', logoText: 'Wipro', category: 'IT & Software' },
  { name: 'Jaypee', logoText: 'Tech Mahindra', category: 'IT & Telecom' },
  { name: 'HCL Technologies', logoText: 'HCL Tech', category: 'IT & Software' },
  { name: 'LG', logoText: 'Sun Pharma', category: 'Pharmaceuticals' },
  { name: 'Sony', logoText: 'Cipla', category: 'Pharmaceuticals' },
  { name: 'Genpact', logoText: 'L&T', category: 'Core & Infrastructure' },
  { name: 'Paytm', logoText: 'ICICI Bank', category: 'Banking & BFSI' },
  { name: 'PUMA', logoText: 'HDFC Bank', category: 'Banking & BFSI' },
  { name: 'IDBI Bank', logoText: 'IDBI Bank', category: 'Automobile' },
  { name: '99acres.com', logoText: '99acres.com', category: 'Agriculture & Mechanical' }
];

export const ACCREDITATIONS = [
  { code: 'AICTE', name: 'All India Council for Technical Education', type: 'Govt. Approval' },
  { code: 'AKTU', name: 'Dr. A.P.J. Abdul Kalam Technical University', type: 'University Affiliation' },
  { code: 'PCI', name: 'Pharmacy Council of India', type: 'Regulatory Body' },
  { code: 'BCI', name: 'Bar Council of India', type: 'Legal Education Body' },
  { code: 'BTEUP', name: 'Board of Technical Education, UP', type: 'Diploma Board' },
  { code: 'BU JHANSI', name: 'Bundelkhand University, Jhansi', type: 'State University' }
];
