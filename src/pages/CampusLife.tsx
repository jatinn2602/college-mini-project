import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import {
  Building2,
  Home,
  BookOpen,
  Microscope,
  Trophy,
  Utensils,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface CampusLifeProps {
  onOpenApplyModal: () => void;
}

export const CampusLife: React.FC<CampusLifeProps> = ({ onOpenApplyModal }) => {
  const facilities = [
    {
      id: 'infrastructure',
      icon: Building2,
      title: '80-Acre Modern Campus',
      desc: 'Lush green landscape equipped with Wi-Fi connected academic blocks, seminar halls, auditoriums, and open-air amphitheaters.',
      image: '/assets/srgi front.png',
    },
    {
      id: 'hostel',
      icon: Home,
      title: 'Residential Hostels',
      desc: 'Separate, secure hostels for male and female students with 24/7 security, power backup, study rooms, and nutritious mess meals.',
      image: '/assets/hostel.jpeg',
    },
    {
      id: 'library',
      icon: BookOpen,
      title: 'Central Library & Digital Hub',
      desc: 'Over 50,000 reference books, national & international research journals, IEEE e-library subscriptions, and quiet study bays.',
      image: '/assets/library.jpeg',
    },
    {
      id: 'labs',
      icon: Microscope,
      title: 'Advanced Laboratories',
      desc: 'High-speed computer labs, mechanical machining workshops, PCI-approved pharmacy labs, and agricultural experimental plots.',
      image: '/assets/labs.jpg',
    },
    {
      id: 'sports',
      icon: Trophy,
      title: 'Sports & Athletics Complex',
      desc: 'Grounds for cricket, football, volleyball, basketball court, badminton hall, table tennis, and annual inter-college sports meets.',
      image: '/assets/sports.jpg',
    },
    {
      id: 'cafeteria',
      icon: Utensils,
      title: 'Hygienic Cafeteria & Food Court',
      desc: 'Clean dining options serving fresh snacks, North and South Indian meals, beverages, and healthy juices throughout the day.',
      image: '/assets/cafe.jpg',
    },
  ];

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="bg-[#123B6D] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 bg-white/10 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
              Student Experience
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
              Life at SR Group of Institutions
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Explore our 80-acre green campus, modern residential facilities, state-of-the-art laboratories, digital library, and vibrant student activities.
            </p>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Infrastructure & Amenities"
            title="World-Class Campus Facilities"
            subtitle="Designed to provide a comfortable, inspiring environment for academic growth and extracurricular development."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((fac) => {
              const Icon = fac.icon;
              return (
                <div
                  key={fac.id}
                  id={fac.id}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-subtle hover:shadow-card-hover transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={fac.image}
                      alt={fac.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 p-2.5 bg-[#123B6D] text-white rounded-xl shadow">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 font-heading">
                      {fac.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{fac.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
