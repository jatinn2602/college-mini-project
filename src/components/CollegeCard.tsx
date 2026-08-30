import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, GraduationCap } from 'lucide-react';
import { College } from '../data/colleges';

interface CollegeCardProps {
  college: College;
  index?: number;
}

export const CollegeCard: React.FC<CollegeCardProps> = ({ college, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.1, ease: 'easeOut' }}
      className="glass-card rounded-2xl border border-white/60 overflow-hidden shadow-subtle hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
    >
      {/* College Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/85 backdrop-blur-md rounded-full text-[11px] font-extrabold text-[#123B6D] uppercase tracking-wider shadow">
            Est. {college.established}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <span className="text-xs font-semibold text-amber-300 block mb-1">
            {college.approval}
          </span>
          <h3 className="text-lg font-bold leading-snug font-heading drop-shadow-sm">
            {college.name}
          </h3>
        </div>
      </div>

      {/* College Info */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="text-xs text-[#0F766E] font-semibold mb-2">
            Affiliation: {college.affiliation}
          </p>
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
            {college.description}
          </p>
        </div>

        {/* Featured Badges */}
        <div className="space-y-2 pt-2 border-t border-slate-200/60">
          <div className="flex items-center text-xs text-slate-500 font-semibold mb-1">
            <GraduationCap className="w-3.5 h-3.5 mr-1 text-[#123B6D]" />
            <span>Key Programs:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {college.featuredPrograms.map((prog) => (
              <span
                key={prog}
                className="px-2.5 py-0.5 bg-slate-100/90 backdrop-blur-sm text-slate-700 text-[11px] font-semibold rounded-md border border-slate-200/50"
              >
                {prog}
              </span>
            ))}
          </div>
        </div>

        {/* CTA button */}
        <div className="pt-3">
          <Link
            to={`/colleges#${college.id}`}
            className="w-full py-2.5 px-4 bg-slate-100/80 hover:bg-[#123B6D] text-slate-800 hover:text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 group-hover:bg-[#123B6D] group-hover:text-white hover-lift"
          >
            <span>Explore College & Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
