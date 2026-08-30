import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  GraduationCap,
  Building2,
  Users,
  Briefcase,
  BookOpen,
  Award,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Landmark,
  Microscope,
} from 'lucide-react';

import { SectionHeading } from '../components/SectionHeading';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { ProgramCard } from '../components/ProgramCard';
import { ProgramFilters } from '../components/ProgramFilters';
import { CollegeCard } from '../components/CollegeCard';
import { EventCard } from '../components/EventCard';

import { PROGRAMS_DATA } from '../data/programs';
import { COLLEGES_DATA } from '../data/colleges';
import { NEWS_DATA, NewsItem } from '../data/news';
import { STATS_DATA, RECRUITERS, ACCREDITATIONS } from '../data/stats';
import { CHAIRMAN_DATA } from '../data/leadership';

interface HomeProps {
  onOpenApplyModal: (programId?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenApplyModal }) => {
  // Program discovery filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // News section tab state
  const [activeNewsTab, setActiveNewsTab] = useState<'News' | 'Events' | 'Achievements'>('News');

  // Filter programs based on search and category
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

  // Filter news items
  const filteredNews = NEWS_DATA.filter((item) => item.category === activeNewsTab);

  return (
    <div className="space-y-0">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center bg-[#0B2545] overflow-hidden">
        {/* Background Image with Dark Hero Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/srgi_front.png"
            alt="SRGI Campus Building"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-3xl space-y-6"
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>SR Group of Institutions • Jhansi</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-[1.1]">
              Shape Your Future.{' '}
              <span className="gold-gradient-text block mt-1">Build Your Career.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl">
              Discover career-focused education, modern infrastructure, and opportunities designed to prepare students for a changing world.
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/academics"
                className="px-7 py-3.5 bg-white text-[#123B6D] hover:bg-slate-100 font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 flex items-center space-x-2 cursor-pointer hover-lift"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => onOpenApplyModal()}
                className="px-7 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 flex items-center space-x-2 cursor-pointer hover-lift"
              >
                <span>Apply Now 2026-27</span>
              </button>
            </div>

            {/* Hero Quick Trust Indicators */}
            <div className="pt-10 grid grid-cols-3 gap-4 border-t border-white/15 max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  12K+
                </div>
                <div className="text-xs text-slate-300 font-medium">Students Enrolled</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-heading">
                  80 Acre
                </div>
                <div className="text-xs text-slate-300 font-medium">Lush Campus</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-300 font-heading">
                  200+
                </div>
                <div className="text-xs text-slate-300 font-medium">Recruiting Companies</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= STATISTICS STRIP ================= */}
      <section className="bg-[#123B6D] text-white py-12 border-y border-amber-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {STATS_DATA.map((stat) => (
              <div key={stat.id} className="p-3">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F59E0B] font-heading">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-bold text-white uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-300 mt-1 hidden sm:block">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY SRGI ================= */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="py-20 bg-slate-50/70"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Institutional Pillars"
            title="Why Choose SR Group of Institutions?"
            subtitle="SRGI provides an empowering academic environment built around practical excellence, modern infrastructure, and student outcome."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0 }}
              className="glass-card p-7 rounded-2xl border border-white/60 shadow-subtle hover:shadow-xl transition-all duration-300 group hover:-translate-y-1.5"
            >
              <div className="w-12 h-12 bg-blue-50/80 text-[#123B6D] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#123B6D] group-hover:text-white transition-colors duration-300">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading mb-2">
                Modern Infrastructure
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Spread across an 80-acre green campus with state-of-the-art computer labs, high-tech engineering workshops, smart classrooms, and research centers.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="glass-card p-7 rounded-2xl border border-white/60 shadow-subtle hover:shadow-xl transition-all duration-300 group hover:-translate-y-1.5"
            >
              <div className="w-12 h-12 bg-teal-50/80 text-[#0F766E] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#0F766E] group-hover:text-white transition-colors duration-300">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading mb-2">
                Industry-Aligned Education
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Curriculum approved by AICTE, PCI, and BCI, integrated with practical live projects, corporate mentorship, and technical workshops.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="glass-card p-7 rounded-2xl border border-white/60 shadow-subtle hover:shadow-xl transition-all duration-300 group hover:-translate-y-1.5"
            >
              <div className="w-12 h-12 bg-amber-50/80 text-[#D97706] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#F59E0B] group-hover:text-slate-950 transition-colors duration-300">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading mb-2">
                Diverse Student Community
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Home to over 12,000 students from diverse regions, fostering collaborative learning, cultural events, sports meets, and student clubs.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="glass-card p-7 rounded-2xl border border-white/60 shadow-subtle hover:shadow-xl transition-all duration-300 group hover:-translate-y-1.5"
            >
              <div className="w-12 h-12 bg-indigo-50/80 text-[#1E4D8C] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#1E4D8C] group-hover:text-white transition-colors duration-300">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading mb-2">
                Career & Placement Focus
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dedicated Training & Placement Cell providing 100% placement assistance, soft skills training, mock interviews, and access to 200+ top recruiters.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ================= PROGRAM DISCOVERY SECTION ================= */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="py-20 bg-white border-t border-slate-200/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Academic Offerings"
            title="Find the Right Program for You"
            subtitle="Search and filter through our wide range of undergraduate, postgraduate, and diploma degrees."
          />

          {/* Interactive Search & Filters */}
          <ProgramFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={['All', 'UG', 'PG', 'Diploma']}
          />

          {/* Course Cards Grid */}
          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.slice(0, 6).map((prog, idx) => (
                <ProgramCard
                  key={prog.id}
                  program={prog}
                  onApply={onOpenApplyModal}
                  index={idx}
                />
              ))}
            </div>
          ) : (
            <div className="glass-card border border-dashed border-slate-300 rounded-2xl p-12 text-center max-w-md mx-auto">
              <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h4 className="text-lg font-bold text-slate-800 font-heading">
                No programs found
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Try adjusting your search terms or filter selection.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-4 py-2 bg-[#123B6D] text-white text-xs font-semibold rounded-lg hover-lift"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* View All Programs Link */}
          <div className="mt-12 text-center">
            <Link
              to="/academics"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-100/90 hover:bg-slate-200 text-[#123B6D] font-bold text-xs uppercase tracking-wider rounded-xl transition-all hover-lift border border-slate-200/60"
            >
              <span>Explore All {PROGRAMS_DATA.length} Programs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ================= COLLEGES DIRECTORY ================= */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="py-20 bg-slate-50/70 border-t border-slate-200/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Constituent Institutions"
            title="SRGI Colleges & Institutes"
            subtitle="Explore our specialized academic colleges delivering focused education in engineering, pharmacy, management, agriculture, law, and polytechnic."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COLLEGES_DATA.map((college, idx) => (
              <CollegeCard key={college.id} college={college} index={idx} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= CAMPUS LIFE (EDITORIAL STYLE) ================= */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="py-20 bg-white border-t border-slate-200/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text Content */}
            <div className="lg:col-span-5 space-y-6">
              <span className="px-3 py-1 bg-teal-100/80 backdrop-blur-sm text-[#0F766E] rounded-full text-[11px] font-bold uppercase tracking-wider border border-teal-200/50">
                Vibrant Student Ecosystem
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading leading-tight">
                Life Beyond the Classroom
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                At SRGI, campus life is rich with opportunities to learn, compete, collaborate, and thrive. Our 80-acre modern campus provides comfortable residential hostels, high-speed digital libraries, indoor & outdoor sports facilities, and active student clubs.
              </p>

              {/* Highlights List */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  'Residential Hostels',
                  'Central Library Hub',
                  'Advanced Research Labs',
                  'Sports Infrastructure',
                  'Hygienic Cafeteria',
                  'Smart Classrooms',
                  'Technical Societies',
                  'Annual Cultural Fest',
                ].map((item) => (
                  <div key={item} className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/campus-life"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-[#123B6D] hover:bg-[#1E4D8C] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all cursor-pointer hover-lift"
                >
                  <span>Explore Campus Life</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Asymmetrical Editorial Image Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-md h-56 bg-slate-100 glass-card p-1">
                  <img
                    src="/assets/library.jpeg"
                    alt="SRGI Campus Library"
                    className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md h-40 bg-slate-100 glass-card p-1">
                  <img
                    src="/assets/cafe.jpg"
                    alt="SRGI Science Lab"
                    className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="rounded-2xl overflow-hidden shadow-md h-40 bg-slate-100 glass-card p-1">
                  <img
                    src="/assets/gym.jpg"
                    alt="Sports Facilities"
                    className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md h-56 bg-slate-100 glass-card p-1">
                  <img
                    src="/assets/hostel.jpeg"
                    alt="Student Collaboration"
                    className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ================= PLACEMENTS SECTION ================= */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="py-20 bg-[#0B2545] text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Career Outcomes"
            title="Industry Placements & Corporate Ties"
            subtitle="SRGI's Training & Placement Cell works tirelessly to prepare graduates for premier corporate careers."
            dark={true}
          />

          {/* Recruiter Logos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            {RECRUITERS.map((rec, idx) => (
              <motion.div
                key={rec.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (idx % 6) * 0.05 }}
                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-200 flex flex-col items-center justify-center h-24 hover-lift"
              >
                <span className="text-lg font-extrabold text-white font-heading">
                  {rec.logoText}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Placement Highlights Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-amber-500/20 text-[#F59E0B] rounded-xl shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-heading text-white">200+ Recruiters</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Over 200 corporate partners actively hire from SRGI engineering, management, pharmacy, and computer applications streams.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-teal-500/20 text-teal-300 rounded-xl shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-heading text-white">100% Placement Assistance</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Comprehensive mock interviews, aptitude training, soft skills workshops, and resume building guidance for every student.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-500/20 text-blue-300 rounded-xl shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-heading text-white">Summer Internships</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Mandatory summer industrial training and live project internships provided in reputed national companies.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/placements"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all hover-lift"
            >
              <span>Explore Placement Records</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ================= NEWS & EVENTS SECTION ================= */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="py-20 bg-slate-50/70 border-t border-slate-200/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Campus Updates"
            title="News, Events & Achievements"
            subtitle="Stay connected with the latest academic happenings, research awards, and campus symposiums at SRGI."
          />

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/90 backdrop-blur-md p-1 rounded-xl shadow-subtle border border-slate-200 flex space-x-1">
              {(['News', 'Events', 'Achievements'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveNewsTab(tab)}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeNewsTab === tab
                      ? 'bg-[#123B6D] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item, idx) => (
              <EventCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= CHAIRMAN MESSAGE SECTION ================= */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="py-20 bg-white border-t border-slate-200/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-subtle">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Chairman Portrait */}
              <div className="lg:col-span-4 text-center">
                <div className="relative inline-block w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <img
                    src={CHAIRMAN_DATA.image}
                    alt={CHAIRMAN_DATA.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#123B6D] font-heading mt-4">
                  {CHAIRMAN_DATA.name}
                </h3>
                <p className="text-xs font-semibold text-[#0F766E] uppercase tracking-wider">
                  {CHAIRMAN_DATA.title}
                </p>
              </div>

              {/* Quote & Excerpt */}
              <div className="lg:col-span-8 space-y-4">
                <span className="text-4xl text-[#F59E0B] font-serif leading-none">“</span>
                <blockquote className="text-lg sm:text-xl font-medium text-slate-800 leading-relaxed font-sans italic -mt-4">
                  {CHAIRMAN_DATA.quoteExcerpt}
                </blockquote>

                <p className="text-sm text-slate-600 leading-relaxed">
                  "Since our establishment in 2002, our vision has been steadfast: to provide world-class technical, managerial, pharmaceutical, agricultural, and legal education to students in Bundelkhand and across India."
                </p>

                <div className="pt-2">
                  <Link
                    to="/about#chairman"
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#123B6D] hover:text-[#0F766E] transition-colors hover-lift"
                  >
                    <span>Read Full Leadership Message</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ================= ACCREDITATIONS & APPROVALS ================= */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="py-16 bg-slate-50/70 border-t border-slate-200/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">
            Recognized & Approved By Regulatory Authorities
          </span>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
            {ACCREDITATIONS.map((acc, idx) => (
              <motion.div
                key={acc.code}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="glass-card px-6 py-3.5 rounded-xl border border-white/60 shadow-sm text-center flex flex-col items-center justify-center hover:border-[#123B6D] transition-colors hover-lift"
              >
                <span className="text-base font-extrabold text-[#123B6D] font-heading">
                  {acc.code}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">{acc.type}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= ADMISSION FINAL CTA ================= */}
      <section className="py-20 bg-gradient-to-r from-[#123B6D] via-[#0B2545] to-[#0F766E] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <span className="px-3.5 py-1 bg-amber-400/20 text-[#F59E0B] border border-amber-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
            Session 2026-27 Applications Open
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
            Ready to Start Your Academic Journey at SRGI?
          </h2>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
            Take the first step toward a rewarding career. Explore our degree programs or submit an online application enquiry today.
          </p>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => onOpenApplyModal()}
              className="px-8 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xl transition-all cursor-pointer hover-lift"
            >
              Apply Online Now
            </button>
            <Link
              to="/academics"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
