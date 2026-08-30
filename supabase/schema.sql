-- ============================================================
-- SRGI STUDENT PORTAL - SUPABASE POSTGRESQL SCHEMA & SEED DATA
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. STUDENTS TABLE
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_number VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    mobile VARCHAR(15) UNIQUE NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    course VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    semester INT NOT NULL DEFAULT 3,
    section VARCHAR(50) NOT NULL DEFAULT 'SEC-B',
    lab_group VARCHAR(10) NOT NULL DEFAULT 'B1',
    academic_year VARCHAR(20) NOT NULL DEFAULT '2026-27',
    profile_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Migrations for existing students table
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS section VARCHAR(50) DEFAULT 'SEC-B';
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS lab_group VARCHAR(10) DEFAULT 'B1';

-- 2. ATTENDANCE TABLE
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('present', 'absent', 'late')) NOT NULL
);

-- 3. LECTURES TABLE
CREATE TABLE IF NOT EXISTS public.lectures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    faculty VARCHAR(100) NOT NULL,
    room VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    start_time VARCHAR(20) NOT NULL,
    end_time VARCHAR(20) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('today', 'upcoming', 'completed')) NOT NULL
);

-- 4. FEES TABLE
CREATE TABLE IF NOT EXISTS public.fees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    semester VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    paid_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
    due_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
    status VARCHAR(20) CHECK (status IN ('paid', 'pending', 'partial')) NOT NULL,
    transaction_id VARCHAR(100) NOT NULL,
    payment_date DATE NOT NULL
);

-- 5. LIBRARY BOOKS TABLE
CREATE TABLE IF NOT EXISTS public.library_books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,
    status VARCHAR(20) CHECK (status IN ('issued', 'returned', 'overdue')) NOT NULL
);

-- 6. TIMETABLE TABLE
CREATE TABLE IF NOT EXISTS public.timetable (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course VARCHAR(100) NOT NULL DEFAULT 'B.Tech',
    semester INT NOT NULL DEFAULT 3,
    section VARCHAR(50) NOT NULL DEFAULT 'SEC-B',
    day VARCHAR(20) CHECK (day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')) NOT NULL,
    period INT NOT NULL DEFAULT 1,
    start_time VARCHAR(20) NOT NULL,
    end_time VARCHAR(20) NOT NULL,
    subject_code VARCHAR(20) NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    faculty_name VARCHAR(100) NOT NULL,
    faculty_short_name VARCHAR(20),
    room VARCHAR(50) NOT NULL,
    lab_group VARCHAR(10),
    lab_number VARCHAR(50),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE
);

-- Migrations for existing timetable table
ALTER TABLE public.timetable ADD COLUMN IF NOT EXISTS course VARCHAR(100) DEFAULT 'B.Tech';
ALTER TABLE public.timetable ADD COLUMN IF NOT EXISTS semester INT DEFAULT 3;
ALTER TABLE public.timetable ADD COLUMN IF NOT EXISTS section VARCHAR(50) DEFAULT 'SEC-B';
ALTER TABLE public.timetable ADD COLUMN IF NOT EXISTS period INT DEFAULT 1;
ALTER TABLE public.timetable ADD COLUMN IF NOT EXISTS subject_code VARCHAR(20);
ALTER TABLE public.timetable ADD COLUMN IF NOT EXISTS subject_name VARCHAR(100);
ALTER TABLE public.timetable ADD COLUMN IF NOT EXISTS faculty_name VARCHAR(100);
ALTER TABLE public.timetable ADD COLUMN IF NOT EXISTS faculty_short_name VARCHAR(20);
ALTER TABLE public.timetable ADD COLUMN IF NOT EXISTS lab_group VARCHAR(10);
ALTER TABLE public.timetable ADD COLUMN IF NOT EXISTS lab_number VARCHAR(50);

-- 7. CLASS TESTS TABLE
CREATE TABLE IF NOT EXISTS public.class_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    test_name VARCHAR(100) NOT NULL,
    marks INT NOT NULL,
    max_marks INT NOT NULL,
    test_date DATE NOT NULL
);

-- 8. RESULTS TABLE
CREATE TABLE IF NOT EXISTS public.results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    semester INT NOT NULL,
    sgpa NUMERIC(3, 2) NOT NULL,
    credits INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Pass'
);

-- 9. ASSIGNMENTS TABLE
CREATE TABLE IF NOT EXISTS public.assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    faculty VARCHAR(100) NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'submitted', 'completed')) NOT NULL
);

-- 10. NOTICES TABLE
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    notice_date DATE NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.library_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timetable ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running script to avoid duplicate policy errors
DROP POLICY IF EXISTS "Allow all on students" ON public.students;
DROP POLICY IF EXISTS "Allow all on attendance" ON public.attendance;
DROP POLICY IF EXISTS "Allow all on lectures" ON public.lectures;
DROP POLICY IF EXISTS "Allow all on fees" ON public.fees;
DROP POLICY IF EXISTS "Allow all on library_books" ON public.library_books;
DROP POLICY IF EXISTS "Allow all on timetable" ON public.timetable;
DROP POLICY IF EXISTS "Allow all on class_tests" ON public.class_tests;
DROP POLICY IF EXISTS "Allow all on results" ON public.results;
DROP POLICY IF EXISTS "Allow all on assignments" ON public.assignments;
DROP POLICY IF EXISTS "Allow all on notices" ON public.notices;

-- Full Permissive Access Policies for Student Portal
CREATE POLICY "Allow all on students" ON public.students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on attendance" ON public.attendance FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on lectures" ON public.lectures FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on fees" ON public.fees FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on library_books" ON public.library_books FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on timetable" ON public.timetable FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on class_tests" ON public.class_tests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on results" ON public.results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on assignments" ON public.assignments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on notices" ON public.notices FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- DEMO SEED DATA FOR MULTIPLE STUDENTS
-- ============================================================

-- STUDENT A: Aarav Sharma (Mobile: 9000000001 / DOB: 2005-08-14)
INSERT INTO public.students (id, student_number, name, mobile, dob, email, course, department, semester, academic_year)
VALUES (
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    '2501451640028',
    'Jatin Raikwar',
    '9795746806',
    '2006-02-26',
    'raijatin2006@gmail.com',
    'B.Tech Computer Science & Engineering',
    'College of Science & Engineering',
    3,
    '2025-2026'
) ON CONFLICT (mobile) DO UPDATE SET name = EXCLUDED.name, dob = EXCLUDED.dob;

-- STUDENT B: Bhavya Verma (Mobile: 9000000002 / DOB: 2005-11-21)
INSERT INTO public.students (id, student_number, name, mobile, dob, email, course, department, semester, academic_year)
VALUES (
    'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
    '2501451640021',
    'Faisal Khan',
    '9555572463',
    '2006-07-12',
    'fk0510ai@gmail.com',
    'B.Tech Computer Science & Engineering',
    'College of Science & Engineering',
    3,
    '2025-2026'
) ON CONFLICT (mobile) DO UPDATE SET name = EXCLUDED.name, dob = EXCLUDED.dob;

-- Clear previous records to avoid duplicate seed conflicts
DELETE FROM public.attendance WHERE student_id IN ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e');
DELETE FROM public.lectures WHERE student_id IN ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e');
DELETE FROM public.fees WHERE student_id IN ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e');
DELETE FROM public.library_books WHERE student_id IN ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e');
DELETE FROM public.timetable WHERE student_id IN ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e');
DELETE FROM public.class_tests WHERE student_id IN ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e');
DELETE FROM public.results WHERE student_id IN ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e');
DELETE FROM public.assignments WHERE student_id IN ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e');
DELETE FROM public.notices WHERE student_id IN ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e');

-- RECORDS FOR STUDENT A (Jatin Raikwar - Group B1)
INSERT INTO public.attendance (student_id, subject, date, status) VALUES
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'COA', '2026-09-10', 'present'),
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Cybersecurity', '2026-09-12', 'present'),
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'DSTL', '2026-09-12', 'present'),
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Electronics Engineering', '2026-09-12', 'absent'),
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'DS', '2026-09-12', 'absent');

INSERT INTO public.lectures (student_id, subject, faculty, room, date, start_time, end_time, status) VALUES
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Cybersecurity', 'Er. Khemchand Shakyawar', 'C-401', '2026-09-12', '10:40 AM', '11:30 AM', 'today'),
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'DSTL', 'Er. Deepak Bhatnagar', 'C-400', '2026-09-12', '11:30 AM', '12:20 PM', 'today'),
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Electronics Engineering', 'Dr. Abhilash Khare', 'C-400', '2026-09-12', '12:50 PM', '01:40 PM', 'today'),
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Data Structure', 'Er. Ashish Singh', 'C-400', '2026-09-12', '01:40 PM', '02:30 PM', 'today');

INSERT INTO public.fees (student_id, semester, description, amount, paid_amount, due_amount, status, transaction_id, payment_date) VALUES
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Semester III', 'Total Fees', 81500, 81500, 0, 'paid', 'TXN_SRGI_2026_8849', '2026-07-15');

INSERT INTO public.library_books (student_id, title, author, issue_date, due_date, status) VALUES
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'CyberSecurity', 'Cormen, Leiserson, Rivest', '2026-08-10', '2026-12-28', 'issued');

INSERT INTO public.class_tests (student_id, subject, test_name, marks, max_marks, test_date) VALUES
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Data Structures', 'Mid-Sem Class Test 1', 26, 30, '2026-07-20');

INSERT INTO public.results (student_id, semester, sgpa, credits, status) VALUES
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 1, 8.4, 22, 'Pass');

INSERT INTO public.assignments (student_id, title, subject, faculty, due_date, status) VALUES
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'B-Tree & Indexing Implementation', 'DBMS', 'Prof. R. P. Gupta', '2026-09-02', 'pending');

INSERT INTO public.notices (student_id, title, description, category, notice_date, is_read) VALUES
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Submission Deadline for Mid-Term Seminar Reports', 'All 3rd semester B.Tech CSE students must submit their seminar project reports by 5th Sept 2026.', 'Academic', '2026-08-28', false);

-- RECORDS FOR STUDENT B (Faisal Khan - Group B2)
INSERT INTO public.attendance (student_id, subject, date, status) VALUES
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'COA', '2026-09-10', 'present'),
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'Cybersecurity', '2026-09-12', 'present'),
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'DSTL', '2026-09-12', 'present'),
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'Electronics Engineering', '2026-09-12', 'present'),
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'DS', '2026-09-12', 'present');

INSERT INTO public.lectures (student_id, subject, faculty, room, date, start_time, end_time, status) VALUES
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'Cybersecurity', 'Er. Khemchand Shakyawar', 'C-401', '2026-09-12', '10:40 AM', '11:30 AM', 'today'),
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'DSTL', 'Er. Deepak Bhatnagar', 'C-400', '2026-09-12', '11:30 AM', '12:20 PM', 'today');

INSERT INTO public.fees (student_id, semester, description, amount, paid_amount, due_amount, status, transaction_id, payment_date) VALUES
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'Semester III', 'Total Academic Tuition Fee', 81500, 81500, 0, 'paid', 'TXN_SRGI_2026_9931', '2026-07-12');

INSERT INTO public.library_books (student_id, title, author, issue_date, due_date, status) VALUES
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'Computer Architecture: A Quantitative Approach', 'John L. Hennessy', '2026-08-15', '2026-09-15', 'issued');

INSERT INTO public.class_tests (student_id, subject, test_name, marks, max_marks, test_date) VALUES
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'COA', 'Unit Test 1', 28, 30, '2026-07-25');

INSERT INTO public.results (student_id, semester, sgpa, credits, status) VALUES
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 1, 8.8, 22, 'Pass');

INSERT INTO public.assignments (student_id, title, subject, faculty, due_date, status) VALUES
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'Assembly Language Mini Program', 'COA', 'Dr. Samiya Shakil', '2026-09-08', 'pending');

INSERT INTO public.notices (student_id, title, description, category, notice_date, is_read) VALUES
('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'Smart Classroom Schedule Update', 'Classes scheduled every Monday & Thursday in Smart ClassRoom C-400.', 'Academic', '2026-08-27', false);
