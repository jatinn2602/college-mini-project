import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link, Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  getStudentAttendance, 
  getStudentLectures, 
  getStudentFees, 
  getStudentLibrary, 
  getStudentTimetable, 
  getStudentClassTests, 
  getStudentResults, 
  getStudentAssignments, 
  getStudentNotices,
  AttendanceRecord,
  LectureRecord,
  FeeRecord,
  LibraryBook,
  TimetableItem,
  ClassTest,
  SemesterResult,
  Assignment,
  Notice 
} from '../services/student';
import { 
  User, 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  Clock, 
  CreditCard, 
  FileText, 
  LogOut, 
  Bell, 
  Award, 
  Book, 
  Layers, 
  Menu,
  X,
  Info,
  Sparkles,
  MapPin,
  Users,
  CheckCircle2,
  PlayCircle,
  Clock3,
  ChevronRight,
  School
} from 'lucide-react';
import { Logo } from '../components/Logo';

// ----------------------------------------------------------------------
// Helper Utilities for Date, Time & Timetable Calculations
// ----------------------------------------------------------------------

const DAYS_ORDER: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday')[] = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const getTodayDayName = (date: Date = new Date()): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

const parseTimeToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0;
  const clean = timeStr.trim();
  let hours = 0;
  let minutes = 0;
  
  if (clean.toUpperCase().includes('AM') || clean.toUpperCase().includes('PM')) {
    const isPM = clean.toUpperCase().includes('PM');
    const isAM = clean.toUpperCase().includes('AM');
    const parts = clean.replace(/(AM|PM)/i, '').trim().split(':');
    hours = parseInt(parts[0], 10) || 0;
    minutes = parseInt(parts[1], 10) || 0;
    if (isPM && hours < 12) hours += 12;
    if (isAM && hours === 12) hours = 0;
  } else {
    const parts = clean.split(':');
    hours = parseInt(parts[0], 10) || 0;
    minutes = parseInt(parts[1], 10) || 0;
  }
  return hours * 60 + minutes;
};

const formatMinutesTo12Hour = (minutes: number): string => {
  let hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const ampm = hrs >= 12 ? 'PM' : 'AM';
  hrs = hrs % 12;
  if (hrs === 0) hrs = 12;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${ampm}`;
};

const formatDisplayTime = (timeStr: string): string => {
  const mins = parseTimeToMinutes(timeStr);
  return formatMinutesTo12Hour(mins);
};

const getLectureStatus = (item: TimetableItem, nowMinutes: number): 'completed' | 'ongoing' | 'upcoming' => {
  const start = parseTimeToMinutes(item.startTime);
  const end = parseTimeToMinutes(item.endTime);
  if (nowMinutes >= end) return 'completed';
  if (nowMinutes >= start && nowMinutes < end) return 'ongoing';
  return 'upcoming';
};

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { studentData, logout, isDemoMode } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Supabase Data State
  const [loading, setLoading] = useState<boolean>(true);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [lectures, setLectures] = useState<LectureRecord[]>([]);
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const [library, setLibrary] = useState<LibraryBook[]>([]);
  const [timetable, setTimetable] = useState<TimetableItem[]>([]);
  const [classTests, setClassTests] = useState<ClassTest[]>([]);
  const [results, setResults] = useState<SemesterResult[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  // Timetable State
  const [activeTimetableTab, setActiveTimetableTab] = useState<string>('TODAY');
  const [selectedLectureDetail, setSelectedLectureDetail] = useState<TimetableItem | null>(null);

  // Real-time Clock State (Updates every 15s)
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Supabase Data on Mount / Student change
  useEffect(() => {
    const studentId = studentData?.id || 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d';
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [
          attRes,
          lecRes,
          feeRes,
          libRes,
          ttRes,
          testRes,
          resRes,
          asgRes,
          notRes
        ] = await Promise.all([
          getStudentAttendance(studentId),
          getStudentLectures(studentId),
          getStudentFees(studentId),
          getStudentLibrary(studentId),
          getStudentTimetable(studentId, {
            course: studentData?.course,
            semester: studentData?.semester,
            section: studentData?.section,
            labGroup: studentData?.labGroup
          }),
          getStudentClassTests(studentId),
          getStudentResults(studentId),
          getStudentAssignments(studentId),
          getStudentNotices(studentId)
        ]);

        setAttendance(attRes);
        setLectures(lecRes);
        setFees(feeRes);
        setLibrary(libRes);
        setTimetable(ttRes);
        setClassTests(testRes);
        setResults(resRes);
        setAssignments(asgRes);
        setNotices(notRes);
      } catch (err) {
        console.error('Error fetching student data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [studentData]);

  const handleLogout = async () => {
    await logout();
    navigate('/student-login');
  };

  const navItems = [
    { label: 'Overview', path: '/student-dashboard', icon: Layers },
    { label: 'Profile', path: '/student-dashboard/profile', icon: User },
    { label: 'Timetable', path: '/student-dashboard/timetable', icon: Calendar },
    { label: 'Lectures', path: '/student-dashboard/lectures', icon: Clock },
    { label: 'Attendance', path: '/student-dashboard/attendance', icon: CheckSquare },
    { label: 'Fees', path: '/student-dashboard/fees', icon: CreditCard },
    { label: 'Library', path: '/student-dashboard/library', icon: BookOpen },
    { label: 'Class Tests', path: '/student-dashboard/class-tests', icon: FileText },
    { label: 'Results', path: '/student-dashboard/results', icon: Award },
    { label: 'Assignments', path: '/student-dashboard/assignments', icon: Book },
    { label: 'Notices', path: '/student-dashboard/notices', icon: Bell, badge: notices.filter(n => !n.read).length },
  ];

  // Dynamic Date & Time Calculations
  const todayDayName = getTodayDayName(currentTime);
  const nowMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const formattedCurrentTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  // Today's Timetable Items from Supabase
  const todaysTimetable = timetable
    .filter(item => item.day === todayDayName)
    .sort((a, b) => parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime));

  // Next Lecture Calculation
  const upcomingLecturesToday = todaysTimetable.filter(item => parseTimeToMinutes(item.startTime) > nowMinutes);
  const ongoingLectureToday = todaysTimetable.find(item => {
    const start = parseTimeToMinutes(item.startTime);
    const end = parseTimeToMinutes(item.endTime);
    return nowMinutes >= start && nowMinutes < end;
  });

  const nextLectureItem = upcomingLecturesToday.length > 0 ? upcomingLecturesToday[0] : null;
  const nextLectureStartMinutes = nextLectureItem ? parseTimeToMinutes(nextLectureItem.startTime) : 0;
  const minutesUntilNextLecture = nextLectureItem ? Math.max(0, nextLectureStartMinutes - nowMinutes) : 0;

  // Overview Stats
  const totalClasses = attendance.length;
  const presentCount = attendance.filter(a => a.status === 'present').length;
  const attendancePercentage = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;

  const totalFeeDue = fees.reduce((sum, f) => sum + f.dueAmount, 0);
  const issuedBooksCount = library.filter(b => b.status === 'issued').length;
  
  const totalMarksEarned = classTests.reduce((sum, t) => sum + t.marks, 0);
  const totalMaxMarks = classTests.reduce((sum, t) => sum + t.maxMarks, 0);
  const testAveragePercentage = totalMaxMarks > 0 ? Math.round((totalMarksEarned / totalMaxMarks) * 100) : 0;

  const pendingAssignmentsCount = assignments.filter(a => a.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Portal Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link to="/student-dashboard" className="flex items-center gap-3">
              <Logo className="h-8 w-auto" />
              <div className="hidden sm:block border-l border-slate-700 pl-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Student ERP Portal</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            {isDemoMode && (
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-medium">
                Demo Auth Mode
              </span>
            )}
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-bold flex items-center justify-center text-sm shadow-md">
                {studentData?.name ? studentData.name.charAt(0) : 'S'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-white leading-tight">{studentData?.name || 'Student'}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-mono">{studentData?.section || 'SEC-B'}</span>
                  <span>•</span>
                  <span className="px-1.5 py-0.2 bg-amber-400/20 text-amber-300 rounded font-bold text-[10px]">
                    Group {studentData?.labGroup || 'B1'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-300 rounded-lg text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sticky top-24 space-y-1">
            <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Navigation Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/student-dashboard' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/10' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${isActive ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-300'}`}>
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-white">Student Portal Navigation</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium ${
                      isActive ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge ? (
                      <span className="px-2 py-0.5 bg-slate-900 text-amber-400 rounded-full text-xs font-bold">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {loading ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-amber-400 border-t-transparent mb-4"></div>
              <p className="text-slate-300 font-medium text-sm">Loading Supabase Student Timetable & Portal Data...</p>
            </div>
          ) : (
            <Routes>
              {/* 1. Overview */}
              <Route path="/" element={
                <div className="space-y-6">
                  {/* Student Profile Card Header */}
                  <div className="bg-gradient-to-r from-slate-900 via-[#123B6D] to-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                      <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="px-3 py-1 bg-amber-400/10 text-amber-300 border border-amber-400/20 rounded-full text-xs font-semibold uppercase tracking-wider inline-block">
                            {studentData?.course || 'B.Tech'} • Semester {studentData?.semester || 3}
                          </span>
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-semibold uppercase tracking-wider inline-block">
                            Section: {studentData?.section || 'SEC-B'}
                          </span>
                          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
                            Group {studentData?.labGroup || 'B1'}
                          </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                          Welcome back, {studentData?.name || 'Student'}!
                        </h1>
                        <p className="text-slate-300 text-sm mt-1 flex items-center gap-2">
                          <span>Department of {studentData?.department || 'Computer Science & Engineering'}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-slate-400 uppercase font-semibold">Mobile Login</p>
                          <p className="text-sm font-mono font-bold text-amber-400">{studentData?.mobile || '9795746806'}</p>
                        </div>
                        <div className="text-right hidden md:block border-l border-slate-700 pl-4">
                          <p className="text-xs text-slate-400 uppercase font-semibold">Roll Number</p>
                          <p className="text-sm font-mono font-bold text-slate-200">{studentData?.studentNumber || '2501451640028'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Lecture & Today's Overview Widget Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Dynamic NEXT LECTURE Card */}
                    <div className="lg:col-span-1 bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900 border border-amber-500/30 rounded-2xl p-5 space-y-4 shadow-lg relative overflow-hidden flex flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                        <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm uppercase tracking-wider">
                          <Clock3 className="w-5 h-5 animate-pulse" />
                          <span>NEXT LECTURE</span>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">{formattedCurrentTime}</span>
                      </div>

                      {ongoingLectureToday ? (
                        <div className="space-y-3 my-auto">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-full text-xs font-bold uppercase animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                            ● Lecture Currently Ongoing
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white leading-tight">{ongoingLectureToday.subjectName}</h3>
                            <p className="text-xs font-mono text-amber-300 mt-1">{ongoingLectureToday.subjectCode}</p>
                          </div>
                          <div className="text-xs space-y-1 text-slate-300 border-t border-slate-800 pt-2">
                            <p>Faculty: <span className="text-white font-medium">{ongoingLectureToday.facultyName}</span></p>
                            <p>Room: <span className="text-amber-400 font-bold">{ongoingLectureToday.room}</span> {ongoingLectureToday.labNumber ? `(${ongoingLectureToday.labNumber})` : ''}</p>
                            <p className="font-mono text-slate-400">{formatDisplayTime(ongoingLectureToday.startTime)} - {formatDisplayTime(ongoingLectureToday.endTime)}</p>
                          </div>
                        </div>
                      ) : nextLectureItem ? (
                        <div className="space-y-3 my-auto">
                          <div className="flex items-baseline justify-between">
                            <span className="text-2xl font-black text-amber-400 font-mono">
                              {formatDisplayTime(nextLectureItem.startTime)}
                            </span>
                            <span className="px-2.5 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-full text-xs font-bold">
                              Starts in: {minutesUntilNextLecture} min{minutesUntilNextLecture !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white leading-snug">{nextLectureItem.subjectName}</h3>
                            <p className="text-xs font-mono text-amber-300 mt-0.5">{nextLectureItem.subjectCode}</p>
                          </div>
                          <div className="text-xs space-y-1 text-slate-300 border-t border-slate-800/80 pt-2">
                            <p>Faculty: <span className="text-white font-medium">{nextLectureItem.facultyName}</span></p>
                            <p>Room: <span className="text-amber-400 font-bold">{nextLectureItem.room}</span> {nextLectureItem.labNumber ? `(${nextLectureItem.labNumber})` : ''}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="py-8 text-center space-y-2 my-auto">
                          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto opacity-75" />
                          <p className="text-sm font-semibold text-white">
                            {todayDayName === 'Sunday' ? 'No classes scheduled today (Sunday)' : 'No more lectures scheduled for today!'}
                          </p>
                          <p className="text-xs text-slate-400">Enjoy your rest & study time.</p>
                        </div>
                      )}

                      <Link 
                        to="/student-dashboard/timetable" 
                        className="inline-flex items-center justify-center gap-2 w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md mt-auto"
                      >
                        <span>View Full Timetable</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Today's Lectures Summary List (2 Cols) */}
                    <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-amber-400" />
                          <h3 className="font-bold text-white text-base">TODAY — {todayDayName.toUpperCase()}</h3>
                        </div>
                        <span className="text-xs font-mono text-slate-400">
                          {todaysTimetable.length} Lecture{todaysTimetable.length !== 1 ? 's' : ''} Today
                        </span>
                      </div>

                      {todaysTimetable.length === 0 ? (
                        <p className="text-sm text-slate-400 py-10 text-center">No classes scheduled for today ({todayDayName}).</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {todaysTimetable.map((lec) => {
                            const status = getLectureStatus(lec, nowMinutes);
                            return (
                              <div 
                                key={lec.id} 
                                onClick={() => setSelectedLectureDetail(lec)}
                                className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                                  status === 'ongoing' 
                                    ? 'bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-500/10' 
                                    : status === 'completed'
                                    ? 'bg-slate-950/40 border-slate-800/80 opacity-75'
                                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="px-2 py-0.5 bg-slate-900 border border-slate-700 text-amber-300 rounded font-mono text-[10px] font-bold">
                                    {lec.subjectCode}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 ${
                                    status === 'completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                                    status === 'ongoing' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse' :
                                    'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                  }`}>
                                    {status === 'completed' && '✓ Completed'}
                                    {status === 'ongoing' && '● Ongoing'}
                                    {status === 'upcoming' && '→ Upcoming'}
                                  </span>
                                </div>

                                <div>
                                  <h4 className="text-xs font-bold text-white leading-tight line-clamp-1">{lec.subjectName}</h4>
                                  <p className="text-[11px] text-slate-400 mt-0.5">{lec.facultyName} ({lec.facultyShortName})</p>
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t border-slate-800/60 text-[11px]">
                                  <span className="text-slate-400">Room: <strong className="text-amber-400">{lec.room}</strong></span>
                                  <span className="font-mono text-slate-300">{formatDisplayTime(lec.startTime)} - {formatDisplayTime(lec.endTime)}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="pt-2 text-right">
                        <Link to="/student-dashboard/timetable" className="text-xs font-bold text-amber-400 hover:underline inline-flex items-center gap-1">
                          <span>View Detailed Interactive Timetable</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Stat Cards Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
                      <p className="text-xs text-slate-400 font-medium">Attendance</p>
                      <p className={`text-2xl font-extrabold ${attendancePercentage >= 75 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {attendancePercentage}%
                      </p>
                      <p className="text-[10px] text-slate-500">Min. req: 75%</p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
                      <p className="text-xs text-slate-400 font-medium">Today's Classes</p>
                      <p className="text-2xl font-extrabold text-amber-400">
                        {todaysTimetable.length}
                      </p>
                      <p className="text-[10px] text-slate-500">Scheduled for today</p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
                      <p className="text-xs text-slate-400 font-medium">Due Fees</p>
                      <p className={`text-2xl font-extrabold ${totalFeeDue > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        ₹{totalFeeDue.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-slate-500">{totalFeeDue > 0 ? 'Pending payment' : 'Fully paid'}</p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
                      <p className="text-xs text-slate-400 font-medium">Library Books</p>
                      <p className="text-2xl font-extrabold text-blue-400">{issuedBooksCount}</p>
                      <p className="text-[10px] text-slate-500">Currently issued</p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
                      <p className="text-xs text-slate-400 font-medium">Test Average</p>
                      <p className="text-2xl font-extrabold text-purple-400">{testAveragePercentage}%</p>
                      <p className="text-[10px] text-slate-500">Sessional score</p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
                      <p className="text-xs text-slate-400 font-medium">Assignments</p>
                      <p className="text-2xl font-extrabold text-cyan-400">{pendingAssignmentsCount}</p>
                      <p className="text-[10px] text-slate-500">Action pending</p>
                    </div>
                  </div>
                </div>
              } />

              {/* 2. Profile */}
              <Route path="/profile" element={
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-amber-400" />
                      Student Profile
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Personal and academic records stored in Supabase PostgreSQL</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">Academic Information</h3>
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3 text-sm">
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span className="text-slate-400">Student Name</span>
                          <span className="font-semibold text-white">{studentData?.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span className="text-slate-400">Student Roll Number</span>
                          <span className="font-mono font-bold text-amber-400">{studentData?.studentNumber}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span className="text-slate-400">Course / Discipline</span>
                          <span className="font-semibold text-white text-right">{studentData?.course}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span className="text-slate-400">College / Department</span>
                          <span className="font-semibold text-slate-200 text-right">{studentData?.department}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span className="text-slate-400">Current Semester</span>
                          <span className="font-semibold text-white">Semester {studentData?.semester}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span className="text-slate-400">Section</span>
                          <span className="font-bold text-amber-400">{studentData?.section || 'SEC-B'}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span className="text-slate-400">Lab Batch Group</span>
                          <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded font-bold text-xs">Group {studentData?.labGroup || 'B1'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Academic Session</span>
                          <span className="font-semibold text-white">{studentData?.academicYear || '2026-27'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">Contact & Verification</h3>
                      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3 text-sm">
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span className="text-slate-400">Student Mobile (Username)</span>
                          <span className="font-mono font-semibold text-amber-400">{studentData?.mobile}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span className="text-slate-400">Institutional Email</span>
                          <span className="font-mono text-slate-200">{studentData?.email}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-2">
                          <span className="text-slate-400">Database Engine</span>
                          <span className="font-mono text-emerald-400">Supabase PostgreSQL</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Authentication Status</span>
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-xs font-semibold">
                            Verified Student
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              } />

              {/* 3. Timetable Page */}
              <Route path="/timetable" element={
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  {/* Timetable Header Card */}
                  <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/20 rounded-xl p-5 space-y-4 shadow-md">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-6 h-6 text-amber-400" />
                          <h2 className="text-2xl font-black text-white tracking-wide">MY TIMETABLE</h2>
                        </div>
                        <p className="text-sm font-semibold text-amber-300 mt-1">
                          {studentData?.course || 'B.Tech 2nd Year'} • Semester {studentData?.semester || 3} • {studentData?.section || 'SEC-B (AIML/DS)'}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs space-y-0.5">
                          <p className="text-slate-400 uppercase text-[10px] font-bold">Classroom</p>
                          <p className="text-amber-400 font-bold">C-302</p>
                        </div>
                        <div className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs space-y-0.5">
                          <p className="text-amber-300 uppercase text-[10px] font-bold">Lab Group</p>
                          <p className="text-white font-extrabold">Group {studentData?.labGroup || 'B1'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                      <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                        <School className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">Smart Classroom Note</span>
                          <span className="text-[11px] text-slate-400">Classes every Mon & Thu in Smart Room C-400</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                        <User className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">Class Mentor</span>
                          <span className="text-[11px] text-slate-400">Er. Khemchand Shakywar</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                        <Users className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">Session & Strength</span>
                          <span className="text-[11px] text-slate-400">Odd Sem 2026-27 • 72 Students</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-800 pb-2">
                    {['TODAY', 'WEEK', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((tab) => {
                      const tabLabel = tab === 'Monday' ? 'MON' : tab === 'Tuesday' ? 'TUE' : tab === 'Wednesday' ? 'WED' : tab === 'Thursday' ? 'THU' : tab === 'Friday' ? 'FRI' : tab === 'Saturday' ? 'SAT' : tab;
                      const isToday = tab === 'TODAY';
                      const isActive = activeTimetableTab === tab;
                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTimetableTab(tab)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                            isActive 
                              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
                              : 'bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                          }`}
                        >
                          {isToday ? `TODAY (${todayDayName.slice(0, 3).toUpperCase()})` : tabLabel}
                        </button>
                      );
                    })}
                  </div>

                  {/* VIEW TAB 1: TODAY VIEW */}
                  {activeTimetableTab === 'TODAY' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h3 className="text-lg font-black text-amber-400 tracking-wider">
                          TODAY — {todayDayName.toUpperCase()}
                        </h3>
                        <span className="text-xs font-mono text-slate-400">
                          Local Time: <span className="text-white font-bold">{formattedCurrentTime}</span>
                        </span>
                      </div>

                      {/* Current Time Line Bar */}
                      <div className="relative flex items-center justify-center my-4">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="w-full border-t-2 border-dashed border-red-500/60"></div>
                        </div>
                        <div className="relative px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full text-[11px] font-mono font-bold text-red-300 flex items-center gap-2 backdrop-blur-md shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                          <span>CURRENT TIME {formattedCurrentTime}</span>
                        </div>
                      </div>

                      {todaysTimetable.length === 0 ? (
                        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-10 text-center space-y-2">
                          <Sparkles className="w-10 h-10 text-amber-400 mx-auto opacity-75" />
                          <h4 className="text-lg font-bold text-white">No classes scheduled today.</h4>
                          <p className="text-xs text-slate-400">Enjoy your Sunday break or check the WEEK view for upcoming lectures.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {todaysTimetable.map((lec) => {
                            const status = getLectureStatus(lec, nowMinutes);
                            const isSmartRoom = lec.day === 'Monday' || lec.day === 'Thursday';
                            return (
                              <div 
                                key={lec.id} 
                                onClick={() => setSelectedLectureDetail(lec)}
                                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                                  status === 'ongoing' 
                                    ? 'bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/30 border-amber-500 shadow-xl shadow-amber-500/10 ring-2 ring-amber-500/30' 
                                    : status === 'completed'
                                    ? 'bg-slate-950/40 border-slate-800/60 opacity-80'
                                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                                }`}
                              >
                                <div className="flex items-start gap-4">
                                  <div className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-center font-mono shrink-0">
                                    <p className="text-xs font-bold text-amber-400">{formatDisplayTime(lec.startTime)}</p>
                                    <p className="text-[10px] text-slate-500">to {formatDisplayTime(lec.endTime)}</p>
                                  </div>

                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="px-2 py-0.5 bg-amber-400/10 text-amber-300 border border-amber-400/20 rounded font-mono text-xs font-bold">
                                        {lec.subjectCode}
                                      </span>
                                      {lec.labGroup && (
                                        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded text-[10px] font-bold">
                                          Batch Group {lec.labGroup}
                                        </span>
                                      )}
                                    </div>
                                    <h4 className="text-base font-bold text-white">{lec.subjectName}</h4>
                                    <p className="text-xs text-slate-400">
                                      Faculty: <span className="text-slate-200 font-medium">{lec.facultyName} ({lec.facultyShortName})</span>
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                                  <div className="text-right">
                                    <p className="text-xs text-slate-400">Classroom / Lab</p>
                                    <p className="text-sm font-bold text-amber-400">{lec.room}</p>
                                    {isSmartRoom && <p className="text-[10px] text-amber-300 font-medium">Smart Room C-400</p>}
                                  </div>

                                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 shadow-sm ${
                                    status === 'completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                                    status === 'ongoing' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse' :
                                    'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                  }`}>
                                    {status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                                    {status === 'ongoing' && <PlayCircle className="w-3.5 h-3.5 text-amber-400" />}
                                    {status === 'upcoming' && <Clock3 className="w-3.5 h-3.5" />}
                                    <span>{status === 'completed' ? 'Completed' : status === 'ongoing' ? 'Ongoing' : 'Upcoming'}</span>
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* VIEW TAB 2: WEEK MATRIX VIEW */}
                  {activeTimetableTab === 'WEEK' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-base font-bold text-amber-400 uppercase tracking-wider">
                          Full Weekly Schedule Grid (SEC-B)
                        </h3>
                        <span className="text-xs text-slate-400">Click any lecture card for details</span>
                      </div>

                      <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/60">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                              <th className="p-3 border-r border-slate-800 w-24 text-center">Time Slot</th>
                              {DAYS_ORDER.map(d => (
                                <th key={d} className={`p-3 border-r border-slate-800 text-center ${d === todayDayName ? 'bg-amber-500/10 text-amber-400' : ''}`}>
                                  {d.slice(0, 3)}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60">
                            {[
                              { period: 1, label: '09:00 - 09:50' },
                              { period: 2, label: '09:50 - 10:40' },
                              { period: 3, label: '10:40 - 11:30' },
                              { period: 4, label: '11:30 - 12:20' },
                              { period: 'BREAK', label: '12:20 - 12:50 (BREAK)' },
                              { period: 5, label: '12:50 - 01:40' },
                              { period: 6, label: '01:40 - 02:30' }
                            ].map((slot, idx) => {
                              if (slot.period === 'BREAK') {
                                return (
                                  <tr key="break" className="bg-amber-950/20 text-center font-bold text-amber-400 text-xs">
                                    <td className="p-2 border-r border-slate-800 font-mono">12:20 - 12:50</td>
                                    <td colSpan={6} className="p-2 tracking-widest uppercase bg-amber-500/10">
                                      ☕ LUNCH BREAK (12:20 PM - 12:50 PM)
                                    </td>
                                  </tr>
                                );
                              }

                              return (
                                <tr key={idx} className="hover:bg-slate-900/40">
                                  <td className="p-3 border-r border-slate-800 font-mono font-bold text-slate-400 text-center bg-slate-950">
                                    {slot.label}
                                  </td>
                                  {DAYS_ORDER.map(dayName => {
                                    const periodNum = slot.period as number;
                                    // Find matching item for day and period
                                    const matchingItem = timetable.find(t => t.day === dayName && t.period === periodNum);

                                    return (
                                      <td key={dayName} className={`p-2 border-r border-slate-800/60 align-top ${dayName === todayDayName ? 'bg-amber-500/5' : ''}`}>
                                        {matchingItem ? (
                                          <div 
                                            onClick={() => setSelectedLectureDetail(matchingItem)}
                                            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 transition-all cursor-pointer space-y-1 group"
                                          >
                                            <div className="flex justify-between items-center">
                                              <span className="font-mono font-bold text-[11px] text-amber-400 group-hover:text-amber-300">
                                                {matchingItem.subjectCode}
                                              </span>
                                              <span className="text-[9px] text-slate-500 font-bold">{matchingItem.facultyShortName}</span>
                                            </div>
                                            <p className="text-[11px] font-semibold text-white leading-tight line-clamp-1">{matchingItem.subjectName}</p>
                                            <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
                                              <span>{matchingItem.room}</span>
                                              {matchingItem.labGroup && (
                                                <span className="px-1 bg-purple-500/20 text-purple-300 rounded font-bold">{matchingItem.labGroup}</span>
                                              )}
                                            </div>
                                          </div>
                                        ) : (
                                          <span className="text-[10px] text-slate-600 block text-center py-2">—</span>
                                        )}
                                      </td>
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* VIEW TAB 3: SPECIFIC DAY VIEWS (MON - SAT) */}
                  {activeTimetableTab !== 'TODAY' && activeTimetableTab !== 'WEEK' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                        <h3 className="text-lg font-black text-amber-400 uppercase tracking-wider">
                          {activeTimetableTab.toUpperCase()} SCHEDULE
                        </h3>
                        <span className="text-xs text-slate-400 font-mono">
                          {timetable.filter(t => t.day.toLowerCase() === activeTimetableTab.toLowerCase()).length} Sessions Scheduled
                        </span>
                      </div>

                      {timetable.filter(t => t.day.toLowerCase() === activeTimetableTab.toLowerCase()).length === 0 ? (
                        <p className="text-sm text-slate-400 py-8 text-center">No classes scheduled for {activeTimetableTab}.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {timetable
                            .filter(t => t.day.toLowerCase() === activeTimetableTab.toLowerCase())
                            .sort((a, b) => parseTimeToMinutes(a.startTime) - parseTimeToMinutes(b.startTime))
                            .map((lec) => {
                              const isTodaySelected = activeTimetableTab.toLowerCase() === todayDayName.toLowerCase();
                              const status = isTodaySelected ? getLectureStatus(lec, nowMinutes) : 'upcoming';

                              return (
                                <div 
                                  key={lec.id}
                                  onClick={() => setSelectedLectureDetail(lec)}
                                  className="p-4 bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl space-y-3 cursor-pointer transition-all"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="px-2.5 py-0.5 bg-amber-400/10 text-amber-300 border border-amber-400/20 rounded font-mono text-xs font-bold">
                                      {lec.subjectCode}
                                    </span>
                                    <span className="text-xs font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                      {formatDisplayTime(lec.startTime)} - {formatDisplayTime(lec.endTime)}
                                    </span>
                                  </div>

                                  <div>
                                    <h4 className="font-bold text-white text-base">{lec.subjectName}</h4>
                                    <p className="text-xs text-slate-400 mt-1">Faculty: <span className="text-white font-medium">{lec.facultyName} ({lec.facultyShortName})</span></p>
                                  </div>

                                  <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-xs">
                                    <span className="text-slate-400">Classroom/Lab: <strong className="text-amber-400">{lec.room}</strong></span>
                                    {lec.labGroup ? (
                                      <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded font-bold text-[11px]">
                                        Group {lec.labGroup} Lab
                                      </span>
                                    ) : (
                                      <span className="text-slate-500 text-[11px]">Full Class</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              } />

              {/* 4. Lectures List */}
              <Route path="/lectures" element={
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-amber-400" />
                      Classroom & Lecture Master List
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Real-time classroom and faculty lecture assignments</p>
                  </div>

                  {timetable.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-8">No lectures found in Supabase database.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {timetable.map((lec) => (
                        <div key={lec.id} className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold capitalize bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              {lec.day}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">{lec.subjectCode}</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-base">{lec.subjectName}</h3>
                            <p className="text-xs text-slate-400 mt-0.5">Faculty: <span className="text-slate-200">{lec.facultyName}</span></p>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-xs">
                            <span className="text-slate-400">Room: <strong className="text-amber-400">{lec.room}</strong></span>
                            <span className="font-mono bg-slate-900 px-2.5 py-1 rounded text-slate-200">{formatDisplayTime(lec.startTime)} - {formatDisplayTime(lec.endTime)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              } />

              {/* 5. Attendance */}
              <Route path="/attendance" element={
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <CheckSquare className="w-5 h-5 text-amber-400" />
                      Attendance History & Summary
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Calculated dynamically from Supabase attendance logs</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-center">
                      <p className="text-xs text-slate-400 font-medium">Overall Attendance</p>
                      <p className={`text-3xl font-extrabold mt-1 ${attendancePercentage >= 75 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {attendancePercentage}%
                      </p>
                    </div>
                    <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-center">
                      <p className="text-xs text-slate-400 font-medium">Total Classes</p>
                      <p className="text-3xl font-extrabold text-white mt-1">{totalClasses}</p>
                    </div>
                    <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-center">
                      <p className="text-xs text-slate-400 font-medium">Classes Present</p>
                      <p className="text-3xl font-extrabold text-emerald-400 mt-1">{presentCount}</p>
                    </div>
                    <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-center">
                      <p className="text-xs text-slate-400 font-medium">Absent / Late</p>
                      <p className="text-3xl font-extrabold text-amber-400 mt-1">{totalClasses - presentCount}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Subject Attendance Records</h3>
                    <div className="overflow-x-auto border border-slate-800 rounded-xl">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-950 uppercase font-semibold text-slate-400 border-b border-slate-800">
                          <tr>
                            <th className="px-4 py-3">Subject Name</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {attendance.map((rec) => (
                            <tr key={rec.id} className="hover:bg-slate-800/40">
                              <td className="px-4 py-3 font-semibold text-white">{rec.subject}</td>
                              <td className="px-4 py-3 font-mono text-slate-400">{rec.date}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                                  rec.status === 'present' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                                  rec.status === 'late' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                                  'bg-red-500/20 text-red-300 border border-red-500/30'
                                }`}>
                                  {rec.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              } />

              {/* 6. Fees */}
              <Route path="/fees" element={
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-amber-400" />
                      Fee Statement & Transactions
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Institutional tuition, hostel, and university examination fee details</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-center">
                      <p className="text-xs text-slate-400 font-medium">Total Semester Fee</p>
                      <p className="text-2xl font-extrabold text-white mt-1">
                        ₹{fees.reduce((sum, f) => sum + f.amount, 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-center">
                      <p className="text-xs text-slate-400 font-medium">Total Paid</p>
                      <p className="text-2xl font-extrabold text-emerald-400 mt-1">
                        ₹{fees.reduce((sum, f) => sum + f.paidAmount, 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-center">
                      <p className="text-xs text-slate-400 font-medium">Balance Due</p>
                      <p className="text-2xl font-extrabold text-amber-400 mt-1">
                        ₹{totalFeeDue.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Fee Ledger Records</h3>
                    <div className="space-y-3">
                      {fees.map((fee) => (
                        <div key={fee.id} className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div>
                            <p className="font-bold text-white text-sm">{fee.description}</p>
                            <p className="text-slate-400 font-mono mt-0.5">TXN ID: {fee.transactionId} • {fee.date}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-bold text-white text-sm">₹{fee.amount.toLocaleString()}</p>
                              {fee.dueAmount > 0 && <p className="text-amber-400 text-[11px]">Due: ₹{fee.dueAmount.toLocaleString()}</p>}
                            </div>
                            <span className={`px-2.5 py-1 rounded-full font-bold uppercase text-[10px] ${
                              fee.status === 'paid' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}>
                              {fee.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              } />

              {/* 7. Library */}
              <Route path="/library" element={
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-amber-400" />
                      Central Digital Library Records
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Books issued to student account and due dates</p>
                  </div>

                  {library.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-8">No books currently issued.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {library.map((book) => (
                        <div key={book.id} className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2 text-xs">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-white text-sm leading-snug">{book.title}</h3>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                              book.status === 'issued' ? 'bg-blue-500/20 text-blue-300' : 'bg-emerald-500/20 text-emerald-300'
                            }`}>
                              {book.status}
                            </span>
                          </div>
                          <p className="text-slate-400">Author: <span className="text-slate-200">{book.author}</span></p>
                          <div className="flex justify-between pt-2 border-t border-slate-800 font-mono text-[11px]">
                            <span className="text-slate-400">Issued: {book.issueDate}</span>
                            <span className="text-amber-400 font-bold">Due: {book.dueDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              } />

              {/* 8. Class Tests */}
              <Route path="/class-tests" element={
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-amber-400" />
                      Class Tests & Sessional Marks
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Continuous internal assessment and test scores</p>
                  </div>

                  <div className="space-y-3">
                    {classTests.map((test) => {
                      const pct = Math.round((test.marks / test.maxMarks) * 100);
                      return (
                        <div key={test.id} className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                          <div>
                            <p className="font-bold text-white text-sm">{test.testName}</p>
                            <p className="text-slate-400 mt-0.5">{test.subject} • Date: {test.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-base font-extrabold text-amber-400">{test.marks} / {test.maxMarks}</p>
                            <p className="text-[11px] text-slate-400 font-mono">{pct}% score</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              } />

              {/* 9. Results */}
              <Route path="/results" element={
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-400" />
                      Semester Results & SGPA Log
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Official university semester grade point averages</p>
                  </div>

                  <div className="overflow-x-auto border border-slate-800 rounded-xl">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 uppercase font-semibold text-slate-400 border-b border-slate-800">
                        <tr>
                          <th className="px-4 py-3">Semester</th>
                          <th className="px-4 py-3">Earned Credits</th>
                          <th className="px-4 py-3">SGPA</th>
                          <th className="px-4 py-3">Result Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {results.map((res) => (
                          <tr key={res.id} className="hover:bg-slate-800/40">
                            <td className="px-4 py-3 font-semibold text-white">Semester {res.semester}</td>
                            <td className="px-4 py-3 font-mono">{res.credits} Credits</td>
                            <td className="px-4 py-3 font-mono font-bold text-amber-400">{res.sgpa}</td>
                            <td className="px-4 py-3">
                              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-bold uppercase text-[10px]">
                                {res.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              } />

              {/* 10. Assignments */}
              <Route path="/assignments" element={
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Book className="w-5 h-5 text-amber-400" />
                      Course Assignments
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Academic assignments and submission deadlines</p>
                  </div>

                  <div className="space-y-3">
                    {assignments.map((asg) => (
                      <div key={asg.id} className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <p className="font-bold text-white text-sm">{asg.title}</p>
                          <p className="text-slate-400 mt-0.5">{asg.subject} • Faculty: {asg.faculty}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-amber-300 font-mono">Due: {asg.dueDate}</span>
                          <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                            asg.status === 'pending' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                          }`}>
                            {asg.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              } />

              {/* 11. Notices */}
              <Route path="/notices" element={
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Bell className="w-5 h-5 text-amber-400" />
                      Official Student Notice Board
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Circulars, exam notices, and campus announcements</p>
                  </div>

                  <div className="space-y-4">
                    {notices.map((notice) => (
                      <div key={notice.id} className="p-5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 rounded font-semibold">
                            {notice.category}
                          </span>
                          <span className="text-slate-400 font-mono">{notice.date}</span>
                        </div>
                        <h3 className="font-bold text-white text-base">{notice.title}</h3>
                        <p className="text-slate-300 leading-relaxed">{notice.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              } />
            </Routes>
          )}
        </main>
      </div>

      {/* LECTURE DETAIL POPUP MODAL */}
      {selectedLectureDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <button 
              onClick={() => setSelectedLectureDetail(null)}
              className="absolute top-4 right-4 p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="px-2.5 py-1 bg-amber-400/10 text-amber-300 border border-amber-400/20 rounded font-mono text-xs font-bold">
                {selectedLectureDetail.subjectCode}
              </span>
              <h3 className="text-xl font-bold text-white mt-2">{selectedLectureDetail.subjectName}</h3>
              <p className="text-xs text-slate-400">{selectedLectureDetail.day} • Period {selectedLectureDetail.period}</p>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Faculty Instructor</span>
                <span className="font-bold text-white">{selectedLectureDetail.facultyName} ({selectedLectureDetail.facultyShortName})</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Classroom / Lab Location</span>
                <span className="font-bold text-amber-400">{selectedLectureDetail.room}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Scheduled Time</span>
                <span className="font-mono font-bold text-slate-200">
                  {formatDisplayTime(selectedLectureDetail.startTime)} - {formatDisplayTime(selectedLectureDetail.endTime)}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Lab Batch Assignment</span>
                <span className="font-bold text-purple-300">
                  {selectedLectureDetail.labGroup ? `Group ${selectedLectureDetail.labGroup}` : 'All Students (Full Class)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Current Live Status</span>
                <span className="font-bold capitalize text-amber-300">
                  {selectedLectureDetail.day === todayDayName 
                    ? getLectureStatus(selectedLectureDetail, nowMinutes) 
                    : 'Scheduled'}
                </span>
              </div>
            </div>

            <button 
              onClick={() => setSelectedLectureDetail(null)}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
