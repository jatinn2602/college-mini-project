import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { RECRUITERS, STATS_DATA } from '../data/stats';
import { Briefcase, TrendingUp, Award, CheckCircle2, Building, Users, BookOpen } from 'lucide-react';

interface PlacementsProps {
  onOpenApplyModal: () => void;
}

export const Placements: React.FC<PlacementsProps> = ({ onOpenApplyModal }) => {
  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="bg-[#123B6D] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-3xl space-y-4"
          >
            <span className="px-3.5 py-1 bg-white/10 backdrop-blur-md text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider border border-white/15">
              Training & Placement Cell
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
              Empowering Careers with 200+ Recruiting Partners
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              SRGI's dedicated Training & Placement Cell provides 100% placement assistance, industry soft skills training, mock interviews, and corporate internships across all disciplines.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Recruiter Logos */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Top Hiring Partners"
            title="Leading Corporate Recruiters"
            subtitle="Our graduates are recruited by top tech giants, pharmaceutical leaders, manufacturing core companies, and financial institutions."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {RECRUITERS.map((rec, idx) => (
              <motion.div
                key={rec.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (idx % 6) * 0.06, ease: 'easeOut' }}
                className="glass-card border border-slate-200/80 rounded-2xl p-5 text-center flex flex-col items-center justify-center hover:border-[#123B6D] hover:shadow-subtle transition-all duration-200 h-28 hover-lift"
              >
                <span className="text-xl font-extrabold text-[#123B6D] font-heading">
                  {rec.logoText}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Training Methodology & Highlights */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="py-20 bg-slate-50/70 border-t border-slate-200/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Career Readiness"
            title="Placement Cell Training Framework"
            subtitle="Structured multi-stage placement preparation designed to build technical confidence and corporate communication."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0 }}
              className="glass-card p-8 rounded-2xl border border-white/60 shadow-subtle space-y-4 hover-lift"
            >
              <div className="w-12 h-12 bg-blue-50/80 text-[#123B6D] rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Aptitude & Technical Prep
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Regular mock tests covering quantitative aptitude, logical reasoning, data structures, domain knowledge, and coding round challenges.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="glass-card p-8 rounded-2xl border border-white/60 shadow-subtle space-y-4 hover-lift"
            >
              <div className="w-12 h-12 bg-teal-50/80 text-[#0F766E] rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Soft Skills & Interview Workshops
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Group discussion sessions, executive presentation skills, resume building, professional etiquette, and mock HR interviews.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="glass-card p-8 rounded-2xl border border-white/60 shadow-subtle space-y-4 hover-lift"
            >
              <div className="w-12 h-12 bg-amber-50/80 text-[#D97706] rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Summer Industrial Internships
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mandatory 6-to-8 week summer internships in top industrial units, software firms, hospitals, and agricultural research labs.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Placement CTA */}
      <section className="py-16 bg-[#0B2545] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl font-bold font-heading">
            Launch Your Career at SRGI
          </h2>
          <p className="text-sm text-slate-300">
            Join thousands of successful alumni working in leading multinational companies across India and abroad.
          </p>
          <button
            onClick={onOpenApplyModal}
            className="px-8 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer hover-lift"
          >
            Apply Online for 2026 Batch
          </button>
        </div>
      </section>
    </div>
  );
};
