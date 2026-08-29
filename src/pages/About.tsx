import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { CHAIRMAN_DATA } from '../data/leadership';
import { ACCREDITATIONS } from '../data/stats';
import { CheckCircle2, ShieldCheck, Award, Building2, BookOpen, Users, Compass } from 'lucide-react';

interface AboutProps {
  onOpenApplyModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenApplyModal }) => {
  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="bg-[#123B6D] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 bg-white/10 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
              About SR Group of Institutions
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
              24 Years of Academic Excellence in Bundelkhand
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Established in 2002, SRGI has grown into a premier multi-disciplinary educational hub offering engineering, management, pharmacy, agriculture, law, and polytechnic studies.
            </p>
          </div>
        </div>
      </section>

      {/* SRGI Overview & Legacy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                badge="Institutional Overview"
                title="Building Future Pioneers Since 2002"
                align="left"
              />
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                S.R. Group of Institutions (SRGI) was founded with a singular commitment: to deliver top-tier, industry-focused higher education to students in Jhansi and across the nation. Spread over an 80-acre green campus, SRGI encompasses 6 constituent colleges providing degree programs approved by AICTE, PCI, and BCI.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Our modern academic infrastructure, combined with dedicated research labs, central library facilities, and over 200 corporate recruitment partners, creates an environment where students gain both theoretical knowledge and practical career skills.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-2xl font-extrabold text-[#123B6D] font-heading block">2002</span>
                  <span className="text-xs text-slate-600 font-semibold">Established Year</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-2xl font-extrabold text-[#0F766E] font-heading block">80 Acres</span>
                  <span className="text-xs text-slate-600 font-semibold">Integrated Campus</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80"
                  alt="SRGI Main Building"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Core Philosophy"
            title="Our Vision & Mission"
            subtitle="Guiding principles driving SRGI towards global standards of technical and professional education."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-[#123B6D] rounded-xl flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To emerge as a benchmark institution of technical and professional education, fostering innovation, scientific inquiry, ethical leadership, and holistic development to serve society and industry.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
              <div className="w-12 h-12 bg-teal-50 text-[#0F766E] rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To provide accessible, high-quality education through advanced laboratories, experiential learning, corporate partnerships, and continuous skill enhancement programs for our students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chairman Message */}
      <section id="chairman" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Leadership Speaks"
            title="Chairman's Address"
            subtitle="Message from the visionary leadership of SR Group of Institutions."
          />

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-subtle">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 text-center">
                <div className="inline-block w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <img
                    src={CHAIRMAN_DATA.image}
                    alt={CHAIRMAN_DATA.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-[#123B6D] font-heading mt-4">
                  {CHAIRMAN_DATA.name}
                </h4>
                <p className="text-xs font-semibold text-[#0F766E] uppercase tracking-wider">
                  {CHAIRMAN_DATA.title}
                </p>
              </div>

              <div className="lg:col-span-8 space-y-4 text-sm text-slate-700 leading-relaxed">
                {CHAIRMAN_DATA.fullMessage.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#123B6D] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-bold font-heading">
            Join the SRGI Legacy Today
          </h2>
          <p className="text-sm text-slate-200">
            Admissions for the 2026-27 academic batch are now open across all constituent colleges.
          </p>
          <button
            onClick={onOpenApplyModal}
            className="px-8 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer"
          >
            Apply Online Now
          </button>
        </div>
      </section>
    </div>
  );
};
