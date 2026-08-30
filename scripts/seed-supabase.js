import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ybtqwrrddgrtdpywjpgq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidHF3cnJkZGdydGRweXdqcGdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwMTE4NjcsImV4cCI6MjEwMzU4Nzg2N30.EbJztKmYryNWSoLGF2xz9oIaaxFK2j193ctWV0CejTI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const studentA_Id = 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d';
const studentB_Id = 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e';

async function seedSupabaseData() {
  console.log('🚀 Connecting to Supabase project:', SUPABASE_URL);

  // 1. Seed Students
  console.log('📦 Seeding Students table...');

  try {
    await supabase.from('students').delete().in('mobile', ['9000000001', '9000000002']);
  } catch (e) {}

  const { error: studentErr } = await supabase.from('students').upsert([
    {
      id: studentA_Id,
      student_number: '2501451640028',
      name: 'Jatin Raikwar',
      mobile: '9795746806',
      dob: '2006-02-26',
      email: 'raijatin2006@gmail.com',
      course: 'B.Tech',
      department: 'Computer Science & Engineering',
      semester: 3,
      section: 'SEC-B',
      lab_group: 'B1',
      academic_year: '2026-27'
    },
    {
      id: studentB_Id,
      student_number: '2501451640021',
      name: 'Faisal Khan',
      mobile: '9555572463',
      dob: '2006-07-12',
      email: 'fk0510ai@gmail.com',
      course: 'B.Tech',
      department: 'Computer Science & Engineering',
      semester: 3,
      section: 'SEC-B',
      lab_group: 'B2',
      academic_year: '2026-27'
    }
  ], { onConflict: 'id' });

  if (studentErr) {
    console.error('❌ Error inserting students:', studentErr.message);
  } else {
    console.log('✅ Students seeded successfully!');
  }

  // Clear existing student-specific records
  await supabase.from('attendance').delete().in('student_id', [studentA_Id, studentB_Id]);
  await supabase.from('lectures').delete().in('student_id', [studentA_Id, studentB_Id]);
  await supabase.from('fees').delete().in('student_id', [studentA_Id, studentB_Id]);
  await supabase.from('library_books').delete().in('student_id', [studentA_Id, studentB_Id]);
  await supabase.from('class_tests').delete().in('student_id', [studentA_Id, studentB_Id]);
  await supabase.from('results').delete().in('student_id', [studentA_Id, studentB_Id]);
  await supabase.from('assignments').delete().in('student_id', [studentA_Id, studentB_Id]);
  await supabase.from('notices').delete().in('student_id', [studentA_Id, studentB_Id]);

  // 2. Seed Attendance
  console.log('📦 Seeding Attendance table...');
  await supabase.from('attendance').insert([
    { student_id: studentA_Id, subject: 'COA', date: '2026-09-10', status: 'present' },
    { student_id: studentA_Id, subject: 'Cybersecurity', date: '2026-09-12', status: 'present' },
    { student_id: studentA_Id, subject: 'DSTL', date: '2026-09-12', status: 'present' },
    { student_id: studentA_Id, subject: 'Electronics Engineering', date: '2026-09-12', status: 'absent' },
    { student_id: studentA_Id, subject: 'DS', date: '2026-09-12', status: 'absent' },

    { student_id: studentB_Id, subject: 'COA', date: '2026-09-10', status: 'present' },
    { student_id: studentB_Id, subject: 'Cybersecurity', date: '2026-09-12', status: 'present' },
    { student_id: studentB_Id, subject: 'DSTL', date: '2026-09-12', status: 'present' },
    { student_id: studentB_Id, subject: 'Electronics Engineering', date: '2026-09-12', status: 'present' },
    { student_id: studentB_Id, subject: 'DS', date: '2026-09-12', status: 'present' }
  ]);

  // 3. Seed Fees
  console.log('📦 Seeding Fees table...');
  await supabase.from('fees').insert([
    { student_id: studentA_Id, semester: 'Semester III', description: 'Total Fees', amount: 81500, paid_amount: 81500, due_amount: 0, status: 'paid', transaction_id: 'TXN_SRGI_2026_8849', payment_date: '2026-07-15' },
    { student_id: studentB_Id, semester: 'Semester III', description: 'Total Academic Tuition Fee', amount: 81500, paid_amount: 81500, due_amount: 0, status: 'paid', transaction_id: 'TXN_SRGI_2026_9931', payment_date: '2026-07-12' }
  ]);

  // 4. Seed Library Books
  console.log('📦 Seeding Library Books table...');
  await supabase.from('library_books').insert([
    { student_id: studentA_Id, title: 'CyberSecurity', author: 'Cormen, Leiserson, Rivest', issue_date: '2026-08-10', due_date: '2026-12-28', status: 'issued' },
    { student_id: studentB_Id, title: 'Computer Architecture: A Quantitative Approach', author: 'John L. Hennessy', issue_date: '2026-08-15', due_date: '2026-09-15', status: 'issued' }
  ]);

  // 5. Seed Class Tests
  console.log('📦 Seeding Class Tests table...');
  await supabase.from('class_tests').insert([
    { student_id: studentA_Id, subject: 'Data Structures', test_name: 'Mid-Sem Class Test 1', marks: 26, max_marks: 30, test_date: '2026-07-20' },
    { student_id: studentB_Id, subject: 'COA', test_name: 'Unit Test 1', marks: 28, max_marks: 30, test_date: '2026-07-25' }
  ]);

  // 6. Seed Results
  console.log('📦 Seeding Results table...');
  await supabase.from('results').insert([
    { student_id: studentA_Id, semester: 1, sgpa: 8.4, credits: 22, status: 'Pass' },
    { student_id: studentB_Id, semester: 1, sgpa: 8.8, credits: 22, status: 'Pass' }
  ]);

  // 7. Seed Assignments
  console.log('📦 Seeding Assignments table...');
  await supabase.from('assignments').insert([
    { student_id: studentA_Id, title: 'B-Tree & Indexing Implementation', subject: 'DBMS', faculty: 'Prof. R. P. Gupta', due_date: '2026-09-02', status: 'pending' },
    { student_id: studentB_Id, title: 'Assembly Language Mini Program', subject: 'COA', faculty: 'Dr. Samiya Shakil', due_date: '2026-09-08', status: 'pending' }
  ]);

  // 8. Seed Notices
  console.log('📦 Seeding Notices table...');
  await supabase.from('notices').insert([
    { student_id: studentA_Id, title: 'Submission Deadline for Mid-Term Seminar Reports', description: 'All 3rd semester B.Tech CSE students must submit their seminar project reports by 5th Sept 2026.', category: 'Academic', notice_date: '2026-08-28', is_read: false },
    { student_id: studentB_Id, title: 'Smart Classroom Schedule Update', description: 'Classes scheduled every Monday & Thursday in Smart ClassRoom C-400.', category: 'Academic', notice_date: '2026-08-27', is_read: false }
  ]);

  // 9. Seed Timetable Data (B.Tech III Sem SEC-B Source of Truth)
  console.log('📦 Seeding Timetable table...');
  
  const rawTimetableRecords = [
    // MONDAY (Smart Classroom C-400)
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Monday', period: 1, start_time: '09:00', end_time: '09:50', subject_code: 'BCS302', subject_name: 'Computer Organization and Architecture', faculty_name: 'Dr. Samiya Shakil', faculty_short_name: 'SS', room: 'C-400', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Monday', period: 2, start_time: '09:50', end_time: '10:40', subject_code: 'LIB', subject_name: 'Library', faculty_name: 'Library Staff', faculty_short_name: 'LIB', room: 'C-400', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Monday', period: 3, start_time: '10:40', end_time: '11:30', subject_code: 'BCC301', subject_name: 'Cyber Security', faculty_name: 'Er. Khemchand Shakywar', faculty_short_name: 'KS', room: 'C-400', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Monday', period: 4, start_time: '11:30', end_time: '12:20', subject_code: 'BCS303', subject_name: 'Discrete Structures & Theory of Logic', faculty_name: 'Er. Deepak Bhatnagar', faculty_short_name: 'DB', room: 'C-400', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Monday', period: 5, start_time: '12:50', end_time: '13:40', subject_code: 'BOE309', subject_name: 'Electronics Engineering', faculty_name: 'Dr. Abhilash Khare', faculty_short_name: 'AK', room: 'C-400', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Monday', period: 6, start_time: '13:40', end_time: '14:30', subject_code: 'BCS301', subject_name: 'Data Structure', faculty_name: 'Er. Ashish Singh', faculty_short_name: 'ASB', room: 'C-400', lab_group: null, lab_number: null },

    // TUESDAY (Classroom C-302)
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Tuesday', period: 1, start_time: '09:00', end_time: '09:50', subject_code: 'BOE309', subject_name: 'Electronics Engineering', faculty_name: 'Dr. Abhilash Khare', faculty_short_name: 'AK', room: 'C-302', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Tuesday', period: 2, start_time: '09:50', end_time: '10:40', subject_code: 'BCS301', subject_name: 'Data Structure', faculty_name: 'Er. Ashish Singh', faculty_short_name: 'ASB', room: 'C-302', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Tuesday', period: 3, start_time: '10:40', end_time: '11:30', subject_code: 'BCS302', subject_name: 'Computer Organization and Architecture', faculty_name: 'Dr. Samiya Shakil', faculty_short_name: 'SS', room: 'C-302', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Tuesday', period: 4, start_time: '11:30', end_time: '12:20', subject_code: 'LIB', subject_name: 'Library', faculty_name: 'Library Staff', faculty_short_name: 'LIB', room: 'C-302', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Tuesday', period: 5, start_time: '12:50', end_time: '14:30', subject_code: 'BCS352', subject_name: 'Computer Organization and Architecture Lab', faculty_name: 'Er. Rashid Khan', faculty_short_name: 'RK', room: 'LAB 6', lab_group: 'B1', lab_number: 'LAB 6' },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Tuesday', period: 5, start_time: '12:50', end_time: '14:30', subject_code: 'BCC351', subject_name: 'Internship Assessment / Mini Project', faculty_name: 'Er. Khemchand Shakywar', faculty_short_name: 'KS', room: 'LAB 2', lab_group: 'B2', lab_number: 'LAB 2' },

    // WEDNESDAY (Classroom C-302)
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Wednesday', period: 1, start_time: '09:00', end_time: '09:50', subject_code: 'BCS303', subject_name: 'Discrete Structures & Theory of Logic', faculty_name: 'Er. Deepak Bhatnagar', faculty_short_name: 'DB', room: 'C-302', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Wednesday', period: 2, start_time: '09:50', end_time: '10:40', subject_code: 'BOE309', subject_name: 'Electronics Engineering', faculty_name: 'Dr. Abhilash Khare', faculty_short_name: 'AK', room: 'C-302', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Wednesday', period: 3, start_time: '10:40', end_time: '12:20', subject_code: 'BCC351', subject_name: 'Internship Assessment / Mini Project', faculty_name: 'Er. Khemchand Shakywar', faculty_short_name: 'KS', room: 'LAB 2', lab_group: 'B1', lab_number: 'LAB 2' },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Wednesday', period: 3, start_time: '10:40', end_time: '12:20', subject_code: 'BCS352', subject_name: 'Computer Organization and Architecture Lab', faculty_name: 'Er. Rashid Khan', faculty_short_name: 'RK', room: 'LAB 6', lab_group: 'B2', lab_number: 'LAB 6' },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Wednesday', period: 5, start_time: '12:50', end_time: '13:40', subject_code: 'BCS301', subject_name: 'Data Structure', faculty_name: 'Er. Ashish Singh', faculty_short_name: 'ASB', room: 'C-302', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Wednesday', period: 6, start_time: '13:40', end_time: '14:30', subject_code: 'BCS302', subject_name: 'Computer Organization and Architecture', faculty_name: 'Dr. Samiya Shakil', faculty_short_name: 'SS', room: 'C-302', lab_group: null, lab_number: null },

    // THURSDAY (Smart Classroom C-400)
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Thursday', period: 1, start_time: '09:00', end_time: '09:50', subject_code: 'BAS301', subject_name: 'Technical Communication', faculty_name: 'Dr. Uzma Nishat', faculty_short_name: 'UN', room: 'C-400', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Thursday', period: 2, start_time: '09:50', end_time: '10:40', subject_code: 'BCC301', subject_name: 'Cyber Security', faculty_name: 'Er. Khemchand Shakywar', faculty_short_name: 'KS', room: 'C-400', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Thursday', period: 3, start_time: '10:40', end_time: '11:30', subject_code: 'BCS303', subject_name: 'Discrete Structures & Theory of Logic', faculty_name: 'Er. Deepak Bhatnagar', faculty_short_name: 'DB', room: 'C-400', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Thursday', period: 4, start_time: '11:30', end_time: '12:20', subject_code: 'BCS301', subject_name: 'Data Structure', faculty_name: 'Er. Ashish Singh', faculty_short_name: 'ASB', room: 'C-400', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Thursday', period: 5, start_time: '12:50', end_time: '13:40', subject_code: 'BCS302', subject_name: 'Computer Organization and Architecture', faculty_name: 'Dr. Samiya Shakil', faculty_short_name: 'SS', room: 'C-400', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Thursday', period: 6, start_time: '13:40', end_time: '14:30', subject_code: 'BOE309', subject_name: 'Electronics Engineering', faculty_name: 'Dr. Abhilash Khare', faculty_short_name: 'AK', room: 'C-400', lab_group: null, lab_number: null },

    // FRIDAY (Classroom C-302)
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Friday', period: 1, start_time: '09:00', end_time: '09:50', subject_code: 'BAS301', subject_name: 'Technical Communication', faculty_name: 'Dr. Uzma Nishat', faculty_short_name: 'UN', room: 'C-302', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Friday', period: 2, start_time: '09:50', end_time: '10:40', subject_code: 'BCS302', subject_name: 'Computer Organization and Architecture', faculty_name: 'Dr. Samiya Shakil', faculty_short_name: 'SS', room: 'C-302', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Friday', period: 3, start_time: '10:40', end_time: '11:30', subject_code: 'BCS303', subject_name: 'Discrete Structures & Theory of Logic', faculty_name: 'Er. Deepak Bhatnagar', faculty_short_name: 'DB', room: 'C-302', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Friday', period: 4, start_time: '11:30', end_time: '12:20', subject_code: 'BOE309', subject_name: 'Electronics Engineering', faculty_name: 'Dr. Abhilash Khare', faculty_short_name: 'AK', room: 'C-302', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Friday', period: 5, start_time: '12:50', end_time: '14:30', subject_code: 'BCS351', subject_name: 'Data Structure Lab', faculty_name: 'Er. Aamir Hussain', faculty_short_name: 'AH', room: 'LAB 5', lab_group: 'B1', lab_number: 'LAB 5' },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Friday', period: 5, start_time: '12:50', end_time: '14:30', subject_code: 'BCS353', subject_name: 'Web Designing Workshop', faculty_name: 'Er. Rinki Sahu', faculty_short_name: 'RS', room: 'LAB 4', lab_group: 'B2', lab_number: 'LAB 4' },

    // SATURDAY (Classroom C-302)
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Saturday', period: 1, start_time: '09:00', end_time: '09:50', subject_code: 'BAS301', subject_name: 'Technical Communication', faculty_name: 'Dr. Uzma Nishat', faculty_short_name: 'UN', room: 'C-302', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Saturday', period: 2, start_time: '09:50', end_time: '10:40', subject_code: 'BCS301', subject_name: 'Data Structure', faculty_name: 'Er. Ashish Singh', faculty_short_name: 'ASB', room: 'C-302', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Saturday', period: 3, start_time: '10:40', end_time: '11:30', subject_code: 'BCS303', subject_name: 'Discrete Structures & Theory of Logic', faculty_name: 'Er. Deepak Bhatnagar', faculty_short_name: 'DB', room: 'C-302', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Saturday', period: 4, start_time: '11:30', end_time: '12:20', subject_code: 'BCC301', subject_name: 'Cyber Security', faculty_name: 'Er. Khemchand Shakywar', faculty_short_name: 'KS', room: 'C-302', lab_group: null, lab_number: null },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Saturday', period: 5, start_time: '12:50', end_time: '14:30', subject_code: 'BCS353', subject_name: 'Web Designing Workshop', faculty_name: 'Er. Rinki Sahu', faculty_short_name: 'RS', room: 'LAB 4', lab_group: 'B1', lab_number: 'LAB 4' },
    { course: 'B.Tech', semester: 3, section: 'SEC-B', day: 'Saturday', period: 5, start_time: '12:50', end_time: '14:30', subject_code: 'BCS351', subject_name: 'Data Structure Lab', faculty_name: 'Er. Aamir Hussain', faculty_short_name: 'AH', room: 'LAB 5', lab_group: 'B2', lab_number: 'LAB 5' }
  ];

  const timetableRecords = rawTimetableRecords.map(rec => ({
    ...rec,
    subject: rec.subject_name,
    faculty: rec.faculty_name
  }));

  try {
    await supabase.from('timetable').delete().eq('section', 'SEC-B');
  } catch (e) {}

  const { error: ttErr } = await supabase.from('timetable').insert(timetableRecords);
  if (ttErr) {
    console.error('❌ Error inserting timetable records:', ttErr.message);
  } else {
    console.log('✅ Timetable seeded successfully! Count:', timetableRecords.length);
  }

  console.log('🎉 All portal data successfully populated into Supabase!');
}

seedSupabaseData();
