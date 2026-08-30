import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  loginStudentWithMobileAndDOB, 
  logoutStudent, 
  StudentAuthParams, 
  StudentProfile 
} from '../services/auth';
import { getStudentProfile } from '../services/student';
import { isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  studentData: StudentProfile | null;
  loading: boolean;
  isDemoMode: boolean;
  login: (params: StudentAuthParams) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [studentData, setStudentData] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Require re-login on browser reload: clear session storage & reset student state on mount
  useEffect(() => {
    sessionStorage.removeItem('srgi_student_id');
    setStudentData(null);
    setLoading(false);

    const handleBeforeUnload = () => {
      sessionStorage.removeItem('srgi_student_id');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const login = async (params: StudentAuthParams) => {
    setLoading(true);
    try {
      const result = await loginStudentWithMobileAndDOB(params);
      setStudentData(result.student);
      sessionStorage.setItem('srgi_student_id', result.student.id);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutStudent();
      setStudentData(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (studentData?.id) {
      const profile = await getStudentProfile(studentData.id);
      if (profile) {
        setStudentData(profile);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ 
      studentData, 
      loading, 
      isDemoMode: !isSupabaseConfigured,
      login, 
      logout,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};