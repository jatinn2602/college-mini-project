import { supabase } from '../lib/supabase';

export interface StudentAuthParams {
  mobile: string;
  dob: string;
}

export interface StudentProfile {
  id: string;
  studentNumber: string;
  name: string;
  mobile: string;
  email: string;
  course: string;
  department: string;
  semester: number;
  section: string;
  labGroup: string;
  academicYear: string;
  profileImage?: string;
}

/**
 * Standardize DOB string format to YYYY-MM-DD
 */
export const normalizeDOB = (dobStr: string): string => {
  const cleaned = dobStr.trim();
  if (cleaned.includes('/')) {
    const parts = cleaned.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }
  return cleaned;
};

/**
 * Authenticates student against Supabase PostgreSQL database
 */
export const loginStudentWithMobileAndDOB = async (params: StudentAuthParams): Promise<{ student: StudentProfile; token: string }> => {
  const cleanMobile = params.mobile.trim().replace(/\D/g, '');
  const cleanDob = normalizeDOB(params.dob);

  if (!cleanMobile || !cleanDob) {
    throw new Error('Please enter both Student Mobile Number and Date of Birth.');
  }

  // Attempt Supabase Edge Function invocation first if available
  try {
    const { data, error } = await supabase.functions.invoke('student-login', {
      body: { mobile: cleanMobile, dob: cleanDob }
    });

    if (data && data.student && data.token) {
      return {
        student: {
          id: data.student.id,
          studentNumber: data.student.student_number,
          name: data.student.name,
          mobile: data.student.mobile,
          email: data.student.email,
          course: data.student.course,
          department: data.student.department,
          semester: data.student.semester,
          section: data.student.section || 'SEC-B',
          labGroup: data.student.lab_group || 'B1',
          academicYear: data.student.academic_year,
          profileImage: data.student.profile_image
        },
        token: data.token
      };
    }

    if (error) {
      console.warn('Edge Function returned error, proceeding to direct Supabase query:', error);
    }
  } catch (edgeErr) {
    console.warn('Edge Function execution skipped, proceeding to direct Supabase query:', edgeErr);
  }

  // Direct Supabase table query
  const { data: dbStudent, error: dbErr } = await supabase
    .from('students')
    .select('id, student_number, name, mobile, dob, email, course, department, semester, section, lab_group, academic_year, profile_image')
    .eq('mobile', cleanMobile)
    .maybeSingle();

  if (dbErr || !dbStudent) {
    throw new Error('Invalid Student Mobile Number or Date of Birth. Check Supabase DB records.');
  }

  if (String(dbStudent.dob).trim() !== cleanDob) {
    throw new Error('Invalid Student Mobile Number or Date of Birth. Check Supabase DB records.');
  }

  return {
    student: {
      id: dbStudent.id,
      studentNumber: dbStudent.student_number,
      name: dbStudent.name,
      mobile: dbStudent.mobile,
      email: dbStudent.email,
      course: dbStudent.course,
      department: dbStudent.department,
      semester: dbStudent.semester,
      section: dbStudent.section || 'SEC-B',
      labGroup: dbStudent.lab_group || (cleanMobile === '9555572463' ? 'B2' : 'B1'),
      academicYear: dbStudent.academic_year,
      profileImage: dbStudent.profile_image
    },
    token: `srgi_session_${dbStudent.id}_${Date.now()}`
  };
};

/**
 * Logout student session
 */
export const logoutStudent = async (): Promise<void> => {
  sessionStorage.removeItem('srgi_student_id');
};
