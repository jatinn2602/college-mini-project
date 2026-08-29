import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, GraduationCap, ArrowRight } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

interface NavbarProps {
  onOpenApplyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApplyModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    {
      label: 'About',
      path: '/about',
      dropdown: [
        { label: 'About SRGI', path: '/about' },
        { label: "Chairman's Message", path: '/about#chairman' },
        { label: 'Leadership & Vision', path: '/about#leadership' },
        { label: 'Accreditations & NAAC', path: '/about#accreditations' },
      ],
    },
    {
      label: 'Academics',
      path: '/academics',
      dropdown: [
        { label: 'All Programs', path: '/academics' },
        { label: 'Constituent Colleges', path: '/colleges' },
        { label: 'Academic Ecosystem', path: '/academics#ecosystem' },
        { label: 'IQAC & NIRF', path: '/academics#quality' },
      ],
    },
    {
      label: 'Colleges',
      path: '/colleges',
    },
    {
      label: 'Admissions',
      path: '/admissions',
      dropdown: [
        { label: 'How to Apply', path: '/admissions#process' },
        { label: 'Eligibility & Programs', path: '/admissions#eligibility' },
        { label: 'Required Documents', path: '/admissions#documents' },
        { label: 'Fee Structure', path: '/admissions#fees' },
        { label: 'Scholarships & Aid', path: '/admissions#scholarships' },
      ],
    },
    {
      label: 'Campus Life',
      path: '/campus-life',
      dropdown: [
        { label: 'Campus Infrastructure', path: '/campus-life#infrastructure' },
        { label: 'Hostel & Residential', path: '/campus-life#hostel' },
        { label: 'Library & Digital Hub', path: '/campus-life#library' },
        { label: 'Sports & Recreation', path: '/campus-life#sports' },
        { label: 'Student Activities', path: '/campus-life#activities' },
      ],
    },
    { label: 'Placements', path: '/placements' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-lg border-b border-slate-200/80 py-3'
            : 'bg-white border-b border-slate-200/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group focus:outline-none">
              <div className="w-10 h-10 lg:w-11 lg:h-11 bg-[#123B6D] rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
                <GraduationCap className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-extrabold tracking-tight text-[#123B6D] leading-none font-heading">
                  SRGI
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#0F766E] mt-0.5">
                  Group of Institutions • Jhansi
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const hasDropdown = item.dropdown && item.dropdown.length > 0;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hasDropdown && setActiveDropdown(item.label)}
                    onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                  >
                    <div className="flex items-center">
                      <Link
                        to={item.path}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center space-x-1 ${
                          isActive
                            ? 'text-[#123B6D] bg-slate-100'
                            : 'text-slate-700 hover:text-[#123B6D] hover:bg-slate-50'
                        }`}
                      >
                        <span>{item.label}</span>
                        {hasDropdown && (
                          <ChevronDown
                            className={`w-4 h-4 ml-0.5 transition-transform duration-200 ${
                              activeDropdown === item.label ? 'rotate-180 text-[#123B6D]' : 'text-slate-400'
                            }`}
                          />
                        )}
                      </Link>
                    </div>

                    {/* Dropdown Menu */}
                    {hasDropdown && activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {item.dropdown!.map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.path}
                            className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-[#123B6D] hover:bg-slate-50 hover:pl-5 transition-all duration-150"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center space-x-3">
              <button
                onClick={onOpenApplyModal}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-lg font-semibold text-xs uppercase tracking-wider text-white bg-[#123B6D] hover:bg-[#1E4D8C] active:bg-[#0B2545] shadow-md hover:shadow-lg transition-all duration-200 group cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        onOpenApplyModal={onOpenApplyModal}
      />
    </>
  );
};
