import { supabase } from '../lib/supabase';
import { StudentProfile } from './auth';

export interface AttendanceRecord {
  id: string;
  subject: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

export interface LectureRecord {
  id: string;
  subject: string;
  faculty: string;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'today' | 'upcoming' | 'completed';
}

export interface FeeRecord {
  id: string;
  semester: string;
  description: string;
  amount: number;
  paidAmount: number;
  dueAmount: number;
  status: 'paid' | 'pending' | 'partial';
  date: string;
  transactionId: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'issued' | 'returned' | 'overdue';
}

export interface TimetableItem {
  id: string;
  course: string;
  semester: number;
  section: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period: number;
  startTime: string;
  endTime: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  facultyShortName: string;
  room: string;
  labGroup?: string | null;
  labNumber?: string | null;
  studentId?: string | null;
}

export interface ClassTest {
  id: string;
  subject: string;
  testName: string;
  marks: number;
  maxMarks: number;
  date: string;
}

export interface SemesterResult {
  id: string;
  semester: number;
  sgpa: number;
  credits: number;
  status: 'Pass' | 'Fail';
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  faculty: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'completed';
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'Academic' | 'Exam' | 'Event' | 'General';
  read: boolean;
}

// ----------------------------------------------------------------------
// Pure Supabase Database Queries — Zero Local Mock Fallbacks
// ----------------------------------------------------------------------

export const getStudentProfile = async (studentId: string): Promise<StudentProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('id, student_number, name, mobile, email, course, department, semester, section, lab_group, academic_year, profile_image')
      .eq('id', studentId)
      .maybeSingle();

    if (error || !data) return null;

    return {
      id: data.id,
      studentNumber: data.student_number,
      name: data.name,
      mobile: data.mobile,
      email: data.email,
      course: data.course,
      department: data.department,
      semester: data.semester,
      section: data.section || 'SEC-B',
      labGroup: data.lab_group || (data.mobile === '9555572463' ? 'B2' : 'B1'),
      academicYear: data.academic_year,
      profileImage: data.profile_image
    };
  } catch (err) {
    console.error('Error fetching student profile from Supabase:', err);
    return null;
  }
};

export const getStudentAttendance = async (studentId: string): Promise<AttendanceRecord[]> => {
  try {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('student_id', studentId);

    if (error || !data) return [];

    return data.map((item: any) => ({
      id: item.id,
      subject: item.subject,
      date: item.date,
      status: item.status
    }));
  } catch (err) {
    console.error('Error fetching attendance:', err);
    return [];
  }
};

export const getStudentLectures = async (studentId: string): Promise<LectureRecord[]> => {
  try {
    const { data, error } = await supabase
      .from('lectures')
      .select('*')
      .eq('student_id', studentId);

    if (error || !data) return [];

    return data.map((item: any) => ({
      id: item.id,
      subject: item.subject,
      faculty: item.faculty,
      room: item.room,
      date: item.date,
      startTime: item.start_time,
      endTime: item.end_time,
      status: item.status
    }));
  } catch (err) {
    console.error('Error fetching lectures:', err);
    return [];
  }
};

export const getStudentFees = async (studentId: string): Promise<FeeRecord[]> => {
  try {
    const { data, error } = await supabase
      .from('fees')
      .select('*')
      .eq('student_id', studentId);

    if (error || !data) return [];

    return data.map((item: any) => ({
      id: item.id,
      semester: item.semester,
      description: item.description,
      amount: Number(item.amount),
      paidAmount: Number(item.paid_amount),
      dueAmount: Number(item.due_amount),
      status: item.status,
      date: item.payment_date,
      transactionId: item.transaction_id
    }));
  } catch (err) {
    console.error('Error fetching fees:', err);
    return [];
  }
};

export const getStudentLibrary = async (studentId: string): Promise<LibraryBook[]> => {
  try {
    const { data, error } = await supabase
      .from('library_books')
      .select('*')
      .eq('student_id', studentId);

    if (error || !data) return [];

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      author: item.author,
      issueDate: item.issue_date,
      dueDate: item.due_date,
      returnDate: item.return_date,
      status: item.status
    }));
  } catch (err) {
    console.error('Error fetching library:', err);
    return [];
  }
};

export const getStudentTimetable = async (
  studentId: string,
  params?: { course?: string; semester?: number; section?: string; labGroup?: string }
): Promise<TimetableItem[]> => {
  try {
    let course = params?.course;
    let semester = params?.semester;
    let section = params?.section;
    let labGroup = params?.labGroup;

    if (!course || !semester || !section || !labGroup) {
      const profile = await getStudentProfile(studentId);
      if (profile) {
        course = course || profile.course;
        semester = semester || profile.semester;
        section = section || profile.section;
        labGroup = labGroup || profile.labGroup;
      }
    }

    course = course || 'B.Tech';
    semester = semester || 3;
    section = section || 'SEC-B';
    labGroup = labGroup || 'B1';

    const { data, error } = await supabase
      .from('timetable')
      .select('*')
      .eq('course', course)
      .eq('semester', semester)
      .eq('section', section);

    if (error || !data) return [];

    const filteredData = data.filter((item: any) => {
      if (!item.lab_group) return true;
      return item.lab_group.toUpperCase() === labGroup?.toUpperCase();
    });

    return filteredData.map((item: any) => ({
      id: item.id,
      course: item.course,
      semester: item.semester,
      section: item.section,
      day: item.day,
      period: item.period,
      startTime: item.start_time,
      endTime: item.end_time,
      subjectCode: item.subject_code || item.subject,
      subjectName: item.subject_name || item.subject,
      facultyName: item.faculty_name || item.faculty,
      facultyShortName: item.faculty_short_name || '',
      room: item.room,
      labGroup: item.lab_group,
      labNumber: item.lab_number,
      studentId: item.student_id
    }));
  } catch (err) {
    console.error('Error fetching timetable:', err);
    return [];
  }
};

export const getStudentClassTests = async (studentId: string): Promise<ClassTest[]> => {
  try {
    const { data, error } = await supabase
      .from('class_tests')
      .select('*')
      .eq('student_id', studentId);

    if (error || !data) return [];

    return data.map((item: any) => ({
      id: item.id,
      subject: item.subject,
      testName: item.test_name,
      marks: item.marks,
      maxMarks: item.max_marks,
      date: item.test_date
    }));
  } catch (err) {
    console.error('Error fetching class tests:', err);
    return [];
  }
};

export const getStudentResults = async (studentId: string): Promise<SemesterResult[]> => {
  try {
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .eq('student_id', studentId);

    if (error || !data) return [];

    return data.map((item: any) => ({
      id: item.id,
      semester: item.semester,
      sgpa: Number(item.sgpa),
      credits: item.credits,
      status: item.status
    }));
  } catch (err) {
    console.error('Error fetching results:', err);
    return [];
  }
};

export const getStudentAssignments = async (studentId: string): Promise<Assignment[]> => {
  try {
    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('student_id', studentId);

    if (error || !data) return [];

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      subject: item.subject,
      faculty: item.faculty,
      dueDate: item.due_date,
      status: item.status
    }));
  } catch (err) {
    console.error('Error fetching assignments:', err);
    return [];
  }
};

export const getStudentNotices = async (studentId: string): Promise<Notice[]> => {
  try {
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .eq('student_id', studentId);

    if (error || !data) return [];

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      date: item.notice_date,
      category: item.category,
      read: item.is_read
    }));
  } catch (err) {
    console.error('Error fetching notices:', err);
    return [];
  }
};

export const markNoticeAsRead = async (studentId: string, noticeId: string): Promise<void> => {
  try {
    await supabase
      .from('notices')
      .update({ is_read: true })
      .eq('id', noticeId)
      .eq('student_id', studentId);
  } catch (err) {
    console.error('Error marking notice as read:', err);
  }
};
