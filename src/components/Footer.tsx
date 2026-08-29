import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onOpenApplyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenApplyModal }) => {
  return (
    <footer className="bg-[#0B2545] text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Institutional Branding */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center group py-1">
              <div className="bg-white/95 p-2 rounded-xl shadow-md">
                <Logo size="md" />
              </div>
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Established in 2002, SRGI is Jhansi's leading educational group offering premier technical, management, pharmacy, agricultural, and legal education across an 80-acre modern campus.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenApplyModal}
                className="px-4 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Apply Online 2026</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2: Academics */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider border-l-2 border-[#F59E0B] pl-2.5">
              Academics
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/academics" className="hover:text-[#F59E0B] transition-colors">
                  B.Tech Engineering
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-[#F59E0B] transition-colors">
                  B.Pharm & M.Pharm
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-[#F59E0B] transition-colors">
                  MBA & MCA
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-[#F59E0B] transition-colors">
                  B.Sc. & M.Sc. Agriculture
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-[#F59E0B] transition-colors">
                  B.A. LL.B & LL.B
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-[#F59E0B] transition-colors">
                  Polytechnic Diploma
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider border-l-2 border-[#0F766E] pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/about" className="hover:text-[#F59E0B] transition-colors">
                  About SRGI & Legacy
                </Link>
              </li>
              <li>
                <Link to="/colleges" className="hover:text-[#F59E0B] transition-colors">
                  Constituent Colleges
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-[#F59E0B] transition-colors">
                  Admission Eligibility
                </Link>
              </li>
              <li>
                <Link to="/placements" className="hover:text-[#F59E0B] transition-colors">
                  Placement Statistics
                </Link>
              </li>
              <li>
                <Link to="/campus-life" className="hover:text-[#F59E0B] transition-colors">
                  Campus Facilities & Hostel
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F59E0B] transition-colors">
                  Contact Us & Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quality & Regulatory */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider border-l-2 border-amber-400 pl-2.5">
              Quality & Governance
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>AICTE & AKTU Approved</span>
              </li>
              <li className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>PCI & BCI Approved</span>
              </li>
              <li>
                <a href="#iqac" className="hover:text-[#F59E0B] transition-colors">
                  IQAC Quality Cell
                </a>
              </li>
              <li>
                <a href="#nirf" className="hover:text-[#F59E0B] transition-colors">
                  NIRF Data & Disclosures
                </a>
              </li>
              <li>
                <a href="#mandatory" className="hover:text-[#F59E0B] transition-colors">
                  Mandatory Disclosures
                </a>
              </li>
              <li className="pt-2">
                <span className="inline-block px-2.5 py-1 bg-white/10 rounded text-[10px] font-mono text-slate-300">
                  Student ERP Login
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="py-6 border-b border-slate-800 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-300">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-[#F59E0B]" />
            <span>SRGI Campus, NH-25, Gwalior Road, Jhansi, Uttar Pradesh - 284003</span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>1800-123-7744</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>admissions@srgi.ac.in</span>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} SR Group of Institutions (SRGI), Jhansi. All rights reserved.</p>
          <div className="flex items-center space-x-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-[11px]">SRGI Modern Website Redesign • Academic Mini-Project</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
