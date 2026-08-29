import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  dark = false,
}) => {
  return (
    <div className={`mb-10 lg:mb-14 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
      {badge && (
        <span
          className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3 ${
            dark
              ? 'bg-amber-400/20 text-[#F59E0B] border border-amber-400/30'
              : 'bg-[#123B6D]/10 text-[#123B6D]'
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading leading-tight ${
          dark ? 'text-white' : 'text-[#0F172A]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-base sm:text-lg leading-relaxed ${
            dark ? 'text-slate-300' : 'text-[#64748B]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
