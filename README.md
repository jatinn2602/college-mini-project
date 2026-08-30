# SR Group of Institutions (SRGI) — Official Web Portal & Student ERP

A modern, high-performance web application and dynamic student ERP portal built for **SR Group of Institutions (SRGI), Jhansi**. 

This platform combines a public-facing institutional website with a real-time, Supabase-powered student dashboard featuring live timetable tracking, practical lab group partitioning, attendance monitoring, fee ledgers, exam results, and digital library records.

---

## 🌟 Overview

Traditional college websites are often static, fragmented, and disconnected from daily student activities. This project bridges that gap by delivering:

1. **A Visual-First Public Portal**: Premium Glassmorphism UI with Framer Motion micro-animations showcasing SRGI's constituent colleges, academic programs, campus facilities, placement statistics, and admission workflows.
2. **A Real-Time Dynamic Student ERP**: A logged-in portal that reproduces the official SRGI class timetable (B.Tech 2nd Year, III Semester, SEC-B AIML/DS), automatically tracks live ongoing lectures, calculates countdown timers for upcoming classes, and dynamically segregates lab schedules according to student lab groups (`Group B1` vs `Group B2`).

---

## ✨ Key Features

### 🏛️ Public Institutional Website
- **Hero & Campus Showcase**: High-res visual highlights of the 80-acre green campus, digital infrastructure, and academic ecosystem.
- **Constituent Colleges**: Detailed breakdowns for SRGI colleges (Engineering & Technology, Pharmacy, Paramedical, Management, etc.).
- **Academic Programs Directory**: Detailed course listings spanning B.Tech (CSE, AIML, DS), M.Tech, B.Pharm, D.Pharm, MBA, BCA, and Diploma courses.
- **Placements & Recruiter Grid**: Interactive placement metrics, top package highlights (₹24 LPA), and corporate recruiters grid (TCS, Infosys, Wipro, Cognizant, HCL, etc.).
- **Online Admission Enquiry**: Interactive admission flow with eligibility criteria, document checklists, FAQs, and modal popup application form.
- **Campus Life & Facilities**: Interactive overview of residential hostels, central digital library (50,000+ books), high-speed labs, sports complex, and dining facilities.
- **Contact & Helpline**: Direct helpline numbers, department emails, admission office timings, and Google Maps location integration.

---

### 🎓 Dynamic Student ERP Dashboard
- **Real SRGI Timetable Integration**: Replicates the exact official timetable for B.Tech CSE (AIML/DS) SEC-B, Session 2026-27 (Effective from 27/07/2026, Classroom C-302 / Smart Room C-400).
- **Live Status & Time Markers**:
  - `✓ Completed`: Past lectures automatically styled with subtle opacity.
  - `● Ongoing`: Currently running lecture highlighted with glowing ambient borders.
  - `→ Upcoming`: Lectures scheduled later in the day.
  - **Red Dashed Current Time Line**: Visual indicator showing current time relative to lecture slots.
- **Smart Next Lecture Countdown**: Real-time widget computing exact minutes remaining until the student's next class.
- **Lab Group Partitioning (`Group B1` vs `Group B2`)**: Practical lab sessions (COA Lab, Data Structure Lab, Mini Project, Web Designing Workshop) are rendered dynamically based on the student's assigned lab group.
- **Interactive Lecture Detail Modal**: Click any lecture slot in Day or Week view to view detailed information including subject code, full subject name, faculty short name, lab room number, and lab group assignment.
- **Full Student ERP Suite**:
  - **Student Profile**: Personal details, Roll Number, Branch, Semester, and Supabase auth status.
  - **Attendance Tracker**: Subject-wise and overall attendance tracking with visual indicators for the 75% minimum rule.
  - **Fee Ledger**: Semester fee breakdown, transaction IDs, paid amount vs balance due calculation.
  - **Digital Library**: Currently issued books, issue dates, and return deadlines.
  - **Class Tests & Sessional Marks**: Internal assessment test scores and percentages.
  - **Semester Results**: Historical SGPA log, credit earnings, and official result status.
  - **Course Assignments**: Pending assignments with due dates and submission statuses.
  - **Notice Board**: Official campus circulars, exam dates, and institutional announcements.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 (TypeScript)
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3.4 + Custom Glassmorphism CSS utilities
- **Animations**: Framer Motion 12 (Staggered entrance reveals & smooth page transitions)
- **Icons**: Lucide React
- **Routing**: React Router DOM 7
- **Backend & Database**: Supabase PostgreSQL + Edge Function Auth Client
- **Data Querying**: Supabase JS v2 Client (`@supabase/supabase-js`)

---

## 📁 Project Directory Structure

```
srgi/
├── public/                  # Static assets & public assets build directory
├── scripts/
│   ├── copy-assets.js       # Pre-build asset sync script
│   └── seed-supabase.js     # Supabase database seeder (36 timetable slots + student profiles)
├── src/
│   ├── assets/              # Campus images, recruiter logos, and visual assets
│   ├── components/          # Reusable components (Navbar, Footer, SectionHeading, ApplyModal)
│   ├── context/             # React context providers
│   ├── lib/                 # Supabase client initializer (supabase.ts)
│   ├── pages/               # Main application pages
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Academics.tsx
│   │   ├── Colleges.tsx
│   │   ├── Admissions.tsx
│   │   ├── Placements.tsx
│   │   ├── CampusLife.tsx
│   │   ├── Contact.tsx
│   │   ├── StudentLogin.tsx
│   │   ├── StudentDashboard.tsx  # Monolithic ERP Dashboard with 11 sub-routes
│   │   └── NotFound.tsx
│   ├── services/            # API integration layer
│   │   ├── auth.ts          # Student authentication service (Mobile + DOB)
│   │   └── student.ts       # Supabase database queries (Timetable, Attendance, Fees, etc.)
│   ├── App.tsx              # Main routing & layout controller
│   ├── index.css            # Custom CSS design system, Glass UI tokens, animations
│   └── main.tsx             # Application entrypoint
├── supabase/
│   └── schema.sql           # Database schema, table structures, and RLS policies
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

### 1. Installation

Clone the repository and install project dependencies:

```bash
git clone https://github.com/jatinn2602/college-mini-project.git
cd srgi
npm install
```

---

### 2. Environment Setup

Create a `.env` file in the project root with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-supabase-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

---

### 3. Database Migration & Seeding

You can set up the database using either of the following options:

#### Option A: Running the Automated Seeding Script
Populate student records and the official 36-slot timetable directly using the included Node.js script:

```bash
npm run db:seed
```

#### Option B: Executing SQL via Supabase Dashboard
Copy the contents of `supabase/schema.sql` into your **Supabase SQL Editor** and execute it to create all tables (`students`, `timetable`, `attendance`, `fees`, `library`, `class_tests`, `results`, `assignments`, `notices`) along with their Row Level Security policies.

---

### 4. Running the Local Server

Start the Vite development server:

```bash
npm run dev
```

Open `http://localhost:5173` in your web browser.

---

## 🔑 Test Credentials

You can log into the **Student Portal** using any of the seeded test student credentials:

| Student Name | Student Number | Mobile Number | Date of Birth | Section | Lab Group |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Jatin Raikwar** | `2501451640028` | `9000000001` | `26/02/2006` | SEC-B | **Group B1** |
| **Faisal Khan** | `2501451640021` | `9000000002` | `12/07/2006` | SEC-B | **Group B2** |

> **Note on Authentication**: The portal requires **Mobile Number + Date of Birth** to authenticate student sessions.

---

## 📜 Available NPM Scripts

- `npm run dev`: Starts the development server after syncing root assets.
- `npm run build`: Syncs assets, runs TypeScript type checking (`tsc`), and compiles production assets with Vite.
- `npm run preview`: Previews the production build locally.
- `npm run db:seed`: Executes `scripts/seed-supabase.js` to seed Supabase database tables.
- `npm run lint`: Runs TypeScript compiler checks without emitting files.

---

## 🎨 Design System & Aesthetic Principles

This application adheres to a curated modern web design system:
- **Glassmorphism Layering**: Backdrop blur utilities (`glass-card`, `backdrop-blur-md`) combined with translucent borders (`border-white/60`) over soft tinted slate backgrounds (`bg-slate-50/70`).
- **Motion Micro-Interactions**: Framer Motion staggered reveals (`opacity: 0, y: 24` to `opacity: 1, y: 0`) and subtle hover elevations (`hover-lift`).
- **Institutional Color Palette**: Deep Navy Primary (`#123B6D`), Warm Gold Accent (`#D97706` / `amber-400`), Emerald Success (`#0F766E`), and Slate text hierarchy.

---

## 🤝 Acknowledgments

- **SR Group of Institutions, Jhansi** for academic reference data and institutional layout inspiration.
- Built as a full-stack college mini-project demonstrating modern Web Development, React 19, and Cloud Database integration with Supabase.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
