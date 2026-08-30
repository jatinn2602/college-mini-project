import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { studentData, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-400 border-t-transparent mb-4"></div>
        <p className="text-slate-300 font-medium text-sm">Authenticating Student Portal...</p>
      </div>
    );
  }

  if (!studentData) {
    return <Navigate to="/student-login" replace />;
  }

  return <>{children}</>;
};
