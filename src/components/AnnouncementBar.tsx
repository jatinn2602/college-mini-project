import React from 'react';
import { Phone, Mail, Sparkles, MapPin } from 'lucide-react';

interface AnnouncementBarProps {
  onOpenApplyModal: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onOpenApplyModal }) => {
  return (
    <div className="bg-[#0B2545] text-white text-xs py-2 px-4 border-b border-white/10 hidden md:block">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center space-x-6 text-slate-300">
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>NH-25, Gwalior Road, Jhansi, UP</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Phone className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>Toll Free: 1800-123-7744 / +91 510-2730200</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Mail className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>admissions@srgi.ac.in</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-[#F59E0B] font-medium bg-[#123B6D]/60 px-2.5 py-0.5 rounded-full border border-amber-500/20">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>Admissions Open 2026-27</span>
          </div>
          <button
            onClick={onOpenApplyModal}
            className="text-white hover:text-[#F59E0B] underline font-semibold transition-colors duration-150 cursor-pointer"
          >
            Apply Online →
          </button>
          <a
            href="/student-login"
            className="text-[#F59E0B] hover:text-amber-300 font-semibold transition-colors duration-150 flex items-center gap-1"
          >
            Portal Login →
          </a>
        </div>
      </div>
    </div>
  );
};
