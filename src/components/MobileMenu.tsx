import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, X, Phone, Mail, GraduationCap } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  dropdown?: { label: string; path: string }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  onOpenApplyModal: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  onOpenApplyModal,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSection = (label: string) => {
    setExpandedSection(expandedSection === label ? null : label);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
        <Link to="/" onClick={onClose} className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-[#123B6D] rounded-lg flex items-center justify-center text-white">
            <GraduationCap className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <span className="text-xl font-bold text-[#123B6D] font-heading">SRGI</span>
        </Link>
        <button
          onClick={onClose}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-2">
        {navItems.map((item) => {
          const hasDropdown = item.dropdown && item.dropdown.length > 0;
          const isExpanded = expandedSection === item.label;

          return (
            <div key={item.label} className="border-b border-slate-100 pb-2">
              {hasDropdown ? (
                <div>
                  <button
                    onClick={() => toggleSection(item.label)}
                    className="w-full flex items-center justify-between py-2.5 text-base font-semibold text-slate-800 hover:text-[#123B6D]"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#123B6D]' : ''
                      }`}
                    />
                  </button>
                  {isExpanded && (
                    <div className="pl-4 py-2 space-y-2 bg-slate-50 rounded-lg my-1">
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className="block py-2 text-sm font-semibold text-[#123B6D]"
                      >
                        Overview
                      </Link>
                      {item.dropdown!.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.path}
                          onClick={onClose}
                          className="block py-1.5 text-sm font-medium text-slate-600 hover:text-[#123B6D]"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  onClick={onClose}
                  className="block py-2.5 text-base font-semibold text-slate-800 hover:text-[#123B6D]"
                >
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer / CTA inside Mobile Menu */}
      <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
        <button
          onClick={() => {
            onClose();
            onOpenApplyModal();
          }}
          className="w-full py-3 px-4 bg-[#123B6D] hover:bg-[#1E4D8C] text-white font-bold text-sm tracking-wider uppercase rounded-xl shadow-md text-center block cursor-pointer"
        >
          Apply Online 2026-27
        </button>

        <div className="text-xs text-slate-500 space-y-1.5 pt-2">
          <div className="flex items-center space-x-2">
            <Phone className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>Toll Free: 1800-123-7744</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>admissions@srgi.ac.in</span>
          </div>
        </div>
      </div>
    </div>
  );
};
