import React from 'react';
import srgiLogo from '../assets/srgilogo12.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const heightClasses = {
    sm: 'h-9 sm:h-10',
    md: 'h-10 sm:h-12 lg:h-14',
    lg: 'h-14 sm:h-16 lg:h-20',
  };

  return (
    <img
      src={srgiLogo}
      alt="SR Group of Institutions - Jhansi"
      className={`w-auto object-contain transition-transform duration-200 group-hover:scale-105 ${heightClasses[size]} ${className}`}
    />
  );
};
