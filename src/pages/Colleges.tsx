import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { COLLEGES_DATA } from '../data/colleges';
import { PROGRAMS_DATA } from '../data/programs';
import { GraduationCap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CollegesProps {
  onOpenApplyModal: (programId?: string) => void;
}

export const Colleges: React.FC<CollegesProps> = ({ onOpenApplyModal }) => {
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
              Institutional Structure
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
              Constituent Colleges & Institutes of SRGI
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Explore SRGI's constituent colleges providing specialized technical, pharmaceutical, management, agricultural, legal, and polytechnic education.
            </p>
          </motion.div>
        </div>
      </section>

      {/* College Visual Directory */}
      <section className="py-20 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {COLLEGES_DATA.map((college, idx) => {
            const collegePrograms = PROGRAMS_DATA.filter((p) => p.collegeId === college.id);

            return (
              <motion.div
                key={college.id}
                id={college.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1, ease: 'easeOut' }}
                className="glass-card rounded-3xl border border-white/60 overflow-hidden shadow-subtle hover:shadow-card-hover transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                {/* College Image Column */}
                <div
                  className={`lg:col-span-5 relative min-h-[300px] bg-slate-100/60 ${
                    idx % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent lg:hidden" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-extrabold text-[#123B6D] shadow-sm border border-white/80">
                      Est. {college.established}
                    </span>
                  </div>
                </div>

                {/* College Info Column */}
                <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 text-xs font-bold text-[#0F766E] uppercase tracking-wider mb-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{college.approval}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mb-3">
                      {college.name}
                    </h2>

                    <p className="text-xs font-semibold text-slate-500 mb-4">
                      Affiliation: {college.affiliation}
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {college.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-2 mb-6">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Key Highlights & Facilities:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {college.keyHighlights.map((hl, i) => (
                          <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Offered Programs */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Programs Offered ({collegePrograms.length}):
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {collegePrograms.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => onOpenApplyModal(p.id)}
                            className="px-3 py-1 bg-white/80 hover:bg-[#123B6D] hover:text-white border border-slate-200/60 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer hover-lift"
                          >
                            {p.name} ({p.category})
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      Approved Admissions 2026-27
                    </span>
                    <button
                      onClick={() => onOpenApplyModal()}
                      className="px-5 py-2.5 bg-[#123B6D] hover:bg-[#1E4D8C] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all flex items-center space-x-1.5 cursor-pointer hover-lift"
                    >
                      <span>Apply to College</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
