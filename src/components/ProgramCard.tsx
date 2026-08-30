import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, ArrowRight, Award } from 'lucide-react';
import { Program } from '../data/programs';

interface ProgramCardProps {
  program: Program;
  onApply: (programId: string) => void;
  onViewDetails?: (program: Program) => void;
  index?: number;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  onApply,
  onViewDetails,
  index = 0,
}) => {
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'UG':
        return 'bg-blue-50/80 text-blue-700 border-blue-200';
      case 'PG':
        return 'bg-teal-50/80 text-teal-700 border-teal-200';
      case 'Diploma':
        return 'bg-amber-50/80 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50/80 text-slate-700 border-slate-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.08, ease: 'easeOut' }}
      className="glass-card rounded-2xl p-6 shadow-subtle hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 border border-white/60"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-sm ${getCategoryBadgeClass(
              program.category
            )}`}
          >
            {program.category} Degree
          </span>
          <div className="flex items-center text-xs text-slate-500 font-medium space-x-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{program.duration}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#123B6D] transition-colors font-heading leading-snug mb-2">
          {program.name}
        </h3>

        {/* Department / Institution */}
        <div className="flex items-center text-xs font-medium text-[#0F766E] mb-3 space-x-1">
          <Award className="w-3.5 h-3.5" />
          <span className="truncate">{program.collegeName}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
          {program.description}
        </p>
      </div>

      {/* Highlights / Footer */}
      <div className="pt-4 border-t border-slate-200/60 mt-auto">
        <div className="flex items-center justify-end gap-2">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(program)}
              className="px-3 py-2 text-xs font-semibold text-[#123B6D] hover:bg-slate-100/80 rounded-lg transition-colors"
            >
              Details
            </button>
          )}
          <button
            onClick={() => onApply(program.id)}
            className="px-3.5 py-2 text-xs font-bold text-white bg-[#123B6D] hover:bg-[#1E4D8C] rounded-lg shadow-sm transition-all duration-150 flex items-center space-x-1 cursor-pointer hover-lift"
          >
            <span>Apply</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
