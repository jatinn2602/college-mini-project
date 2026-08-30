import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Phone, Calendar, AlertCircle, Info, ArrowRight } from 'lucide-react';
import { Logo } from '../components/Logo';

export const StudentLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, studentData } = useAuth();

  const [mobile, setMobile] = useState<string>('');
  const [dob, setDob] = useState<string>('yyyy-mm-dd');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // If already logged in, redirect immediately to dashboard
  useEffect(() => {
    if (studentData) {
      navigate('/student-dashboard', { replace: true });
    }
  }, [studentData, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login({ mobile, dob });
      navigate('/student-dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate. Please check your Student Mobile Number and Date of Birth.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-[#0B192C] to-[#123B6D] text-white">
      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
              <Logo className="h-10 w-auto" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight text-white">
            SRGI Student ERP Portal
          </h2>
          <p className="text-sm text-slate-300">
            Enter your Student Mobile Number and Date of Birth to sign in
          </p>
        </div>

        {/* Demo Credentials Info Notice */}
        {/* <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-xs text-amber-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-amber-300">Supabase Database Test Credentials</p>
            <p className="text-slate-300 text-[11px]">Run <code className="text-amber-300">supabase/schema.sql</code> in your Supabase SQL Editor to seed records:</p>
            <div className="pt-1 font-mono text-[11px] space-y-0.5">
              <p><strong className="text-amber-400">Student A (CSE):</strong> Mobile <span className="bg-black/40 px-1 rounded text-amber-200">9000000001</span> | DOB <span className="bg-black/40 px-1 rounded text-amber-200">2005-08-14</span></p>
              <p><strong className="text-amber-400">Student B (ECE):</strong> Mobile <span className="bg-black/40 px-1 rounded text-amber-200">9000000002</span> | DOB <span className="bg-black/40 px-1 rounded text-amber-200">2005-11-21</span></p>
            </div>
          </div>
        </div> */}

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm text-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="mobile" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Student Mobile Number (Username)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="h-4 w-4" />
              </div>
              <input
                id="mobile"
                name="mobile"
                
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your Mobile Number"
                className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm font-mono tracking-wide"
              />
            </div>
          </div>

          <div>
            <label htmlFor="dob" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Date of Birth (Password)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Calendar className="h-4 w-4" />
              </div>
              <input
                id="dob"
                name="dob"
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm font-mono tracking-wide"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 text-sm tracking-wide cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                <span>Authenticating with Supabase...</span>
              </>
            ) : (
              <>
                <span>Sign In to Student Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-400">
            For login support, contact <span className="text-slate-200">portal@srgi.ac.in</span>
          </p>
        </div>
      </div>
    </div>
  );
};
