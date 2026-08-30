import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { ProgramCard } from '../components/ProgramCard';
import { ProgramFilters } from '../components/ProgramFilters';
import { PROGRAMS_DATA, Program } from '../data/programs';
import { ACCREDITATIONS } from '../data/stats';
import { BookOpen, GraduationCap, Award, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AcademicsProps {
  onOpenApplyModal: (programId?: string) => void;
}

export const Academics: React.FC<AcademicsProps> = ({ onOpenApplyModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProgramModal, setSelectedProgramModal] = useState<Program | null>(null);

  const filteredPrograms = PROGRAMS_DATA.filter((prog) => {
    const matchesCategory =
      selectedCategory === 'All' || prog.category === selectedCategory;
    const matchesSearch =
      prog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

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
              Academic Discovery
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
              Explore Our Degree & Diploma Programs
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              SRGI offers comprehensive AICTE, PCI, BCI, and AKTU approved degree and diploma programs across Engineering, Pharmacy, Management, Agriculture, and Law.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Program Search & Cards */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="py-20 bg-slate-50/70"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Program Directory"
            title="Browse All Academic Offerings"
            subtitle="Use search or filter by category to find your desired course of study."
          />

          <ProgramFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={['All', 'UG', 'PG', 'Diploma']}
          />

          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((prog, idx) => (
                <ProgramCard
                  key={prog.id}
                  program={prog}
                  index={idx}
                  onApply={onOpenApplyModal}
                  onViewDetails={(p) => setSelectedProgramModal(p)}
                />
              ))}
            </div>
          ) : (
            <div className="glass-card border border-dashed border-slate-300 rounded-2xl p-12 text-center max-w-md mx-auto">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-slate-800 font-heading">
                No matching programs
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Try typing a different course name like "B.Tech", "MBA", "Pharmacy", or "Agriculture".
              </p>
            </div>
          )}
        </div>
      </motion.section>

      {/* Academic Ecosystem */}
      <motion.section
        id="ecosystem"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="py-20 bg-white border-t border-slate-200/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Academic Rigor"
            title="Academic Ecosystem & Approvals"
            subtitle="Delivering quality education governed by leading regulatory bodies."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0 }}
              className="glass-card p-6 rounded-2xl border border-white/60 space-y-3 shadow-subtle hover-lift"
            >
              <div className="w-10 h-10 bg-blue-100/80 text-[#123B6D] rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Regulatory Approvals
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All technical, pharmacy, and law courses are strictly approved by AICTE, Pharmacy Council of India (PCI), and Bar Council of India (BCI).
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="glass-card p-6 rounded-2xl border border-white/60 space-y-3 shadow-subtle hover-lift"
            >
              <div className="w-10 h-10 bg-teal-100/80 text-[#0F766E] rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                University Affiliations
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU Lucknow), Bundelkhand University Jhansi, and Board of Technical Education UP (BTEUP).
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="glass-card p-6 rounded-2xl border border-white/60 space-y-3 shadow-subtle hover-lift"
            >
              <div className="w-10 h-10 bg-amber-100/80 text-[#D97706] rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Internal Quality Assurance (IQAC)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated Internal Quality Assurance Cell monitoring curriculum alignment, faculty development, research outputs, and student feedback.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Program Detail Modal */}
      {selectedProgramModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="px-2.5 py-0.5 bg-blue-100 text-[#123B6D] text-[11px] font-bold rounded">
                  {selectedProgramModal.category} Degree
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-heading mt-1">
                  {selectedProgramModal.name}
                </h3>
                <p className="text-xs text-[#0F766E] font-medium">{selectedProgramModal.collegeName}</p>
              </div>
              <button
                onClick={() => setSelectedProgramModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <strong className="text-slate-800 font-bold block mb-1">Duration:</strong>
                <p>{selectedProgramModal.duration}</p>
              </div>

              <div>
                <strong className="text-slate-800 font-bold block mb-1">Eligibility Criteria:</strong>
                <p className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {selectedProgramModal.eligibility}
                </p>
              </div>

              <div>
                <strong className="text-slate-800 font-bold block mb-1">Program Highlights:</strong>
                <ul className="list-disc pl-4 space-y-1 text-slate-700">
                  {selectedProgramModal.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-slate-800 font-bold block mb-1">Career Paths:</strong>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedProgramModal.careerPaths.map((cp) => (
                    <span key={cp} className="px-2 py-1 bg-slate-100 text-slate-700 font-semibold rounded text-[11px]">
                      {cp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedProgramModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const pid = selectedProgramModal.id;
                  setSelectedProgramModal(null);
                  onOpenApplyModal(pid);
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-[#123B6D] hover:bg-[#1E4D8C] rounded-lg shadow cursor-pointer hover-lift"
              >
                Apply for this Course
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
