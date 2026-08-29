import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-amber-100 text-[#F59E0B] rounded-2xl flex items-center justify-center mx-auto">
          <GraduationCap className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-[#123B6D] font-heading">404</span>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">
            Page Not Found
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-[#123B6D] hover:bg-[#1E4D8C] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
