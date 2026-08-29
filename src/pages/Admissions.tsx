import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { PROGRAMS_DATA } from '../data/programs';
import {
  CheckCircle2,
  FileText,
  CreditCard,
  Award,
  HelpCircle,
  ChevronDown,
  Send,
  GraduationCap,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const Admissions: React.FC = () => {
  // Embedded Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    program: 'btech-cse',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || !/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, '')))
      newErrors.phone = 'Valid 10-digit mobile number is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const existingStr = localStorage.getItem('srgi_demo_applications');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      const newSubmission = {
        id: 'APP-' + Date.now(),
        ...formData,
        submittedAt: new Date().toISOString(),
      };
      localStorage.setItem('srgi_demo_applications', JSON.stringify([newSubmission, ...existing]));
      setIsSubmitted(true);
    }
  };

  const admissionSteps = [
    { num: '01', title: 'Choose Program', desc: 'Explore UG, PG, or Diploma courses aligning with your career goals.' },
    { num: '02', title: 'Check Eligibility', desc: 'Verify 10+2 or Graduation academic marks & entrance exam criteria.' },
    { num: '03', title: 'Apply Online', desc: 'Submit the online enquiry form or visit our admission office.' },
    { num: '04', title: 'Upload Documents', desc: 'Submit marksheets, photo ID, entrance scorecard, and certificates.' },
    { num: '05', title: 'Verification', desc: 'Document verification by admission committee & AKTU/PCI guidelines.' },
    { num: '06', title: 'Confirmation', desc: 'Pay initial seat booking fee and receive official admission letter.' },
  ];

  const faqs = [
    {
      q: 'What are the general eligibility criteria for B.Tech admission at SRGI?',
      a: 'Candidates must have passed 10+2 examination with Physics and Mathematics as compulsory subjects along with Chemistry/CS/IT with minimum 45% aggregate (40% for SC/ST). Admissions are conducted through AKTU counseling (JEE Main score) or direct merit seat allocation.',
    },
    {
      q: 'Is S.R. College of Pharmacy approved by Pharmacy Council of India (PCI)?',
      a: 'Yes, B.Pharm and M.Pharm programs at S.R. College of Pharmacy are fully approved by the Pharmacy Council of India (PCI), AICTE, and affiliated with AKTU Lucknow.',
    },
    {
      q: 'Does SRGI provide hostel accommodation for outstation students?',
      a: 'Yes, SRGI provides separate secure residential hostels for boys and girls on campus with 24/7 security, Wi-Fi, hygienic mess meals, and indoor recreation halls.',
    },
    {
      q: 'Are scholarship schemes available for deserving students?',
      a: 'Yes, SRGI assists students in applying for UP State Scholarship & Fee Reimbursement schemes for SC/ST/OBC/EWS candidates, as well as merit-based institutional scholarships.',
    },
  ];

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="bg-[#123B6D] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="px-3 py-1 bg-white/10 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider">
              Admissions 2026-27
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
              Your Journey Starts Here
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Step into a future of academic growth, industry exposure, and career achievement. Follow our streamlined admission process below.
            </p>
          </div>
        </div>
      </section>

      {/* Admission Process Timeline */}
      <section id="process" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Step-by-Step Guide"
            title="6-Step Admission Process"
            subtitle="Transparent and straightforward procedure to secure your seat at SRGI."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {admissionSteps.map((step) => (
              <div
                key={step.num}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-subtle relative overflow-hidden group hover:border-[#123B6D] transition-colors"
              >
                <div className="text-4xl font-extrabold text-[#123B6D]/15 font-heading absolute top-4 right-4">
                  {step.num}
                </div>
                <div className="w-10 h-10 bg-amber-100 text-[#D97706] rounded-xl flex items-center justify-center font-bold text-sm font-heading mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Application Form & Documents Row */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Required Documents & Details */}
            <div id="documents" className="lg:col-span-5 space-y-8">
              <div>
                <span className="px-3 py-1 bg-blue-100 text-[#123B6D] rounded-full text-xs font-bold uppercase tracking-wider">
                  Checklist
                </span>
                <h2 className="text-2xl font-bold text-slate-900 font-heading mt-2 mb-4">
                  Required Documents for Admission
                </h2>
                <div className="space-y-3">
                  {[
                    '10th & 12th Mark sheets & Passing Certificates',
                    'Graduation Mark sheet (For PG Candidates)',
                    'Entrance Exam Scorecard (JEE Main / CUET / GPAT)',
                    'Transfer Certificate (TC) & Migration Certificate',
                    'Category / Caste Certificate (If Applicable)',
                    'Aadhar Card & 4 Passport Size Photographs',
                    'Domicile Certificate (For State Scholarship)',
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <FileText className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fee & Scholarship Info */}
              <div id="scholarships" className="bg-[#0B2545] text-white p-6 rounded-2xl space-y-3">
                <div className="flex items-center space-x-2 text-amber-400">
                  <Award className="w-5 h-5" />
                  <h3 className="text-base font-bold font-heading">Scholarship Support</h3>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  SRGI facilitates UP State Govt Social Welfare Scholarships for eligible SC/ST/OBC/General EWS candidates. Institutional fee concessions are also awarded to meritorious state rankers.
                </p>
              </div>
            </div>

            {/* Embedded Demo Apply Form */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-card">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-[#123B6D] text-white rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    Online Admission Enquiry 2026-27
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill out the form below to register your application query.
                  </p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="bg-teal-50 border border-teal-200 p-8 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#0F766E] mx-auto" />
                  <h4 className="text-lg font-bold text-slate-900">
                    Application enquiry submitted successfully.
                  </h4>
                  <p className="text-xs text-slate-600">
                    Your details have been saved locally. Our admission helpline will review your query.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ fullName: '', email: '', phone: '', city: '', program: 'btech-cse', message: '' });
                    }}
                    className="mt-4 px-5 py-2 bg-[#123B6D] text-white text-xs font-bold rounded-lg"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Amit Kumar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-2.5 bg-white text-sm border ${errors.fullName ? 'border-red-500' : 'border-slate-300'
                        } rounded-xl focus:outline-none focus:border-[#123B6D]`}
                    />
                    {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-2.5 bg-white text-sm border ${errors.email ? 'border-red-500' : 'border-slate-300'
                          } rounded-xl focus:outline-none focus:border-[#123B6D]`}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-2.5 bg-white text-sm border ${errors.phone ? 'border-red-500' : 'border-slate-300'
                          } rounded-xl focus:outline-none focus:border-[#123B6D]`}
                      />
                      {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Jhansi / Gwalior"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={`w-full px-4 py-2.5 bg-white text-sm border ${errors.city ? 'border-red-500' : 'border-slate-300'
                          } rounded-xl focus:outline-none focus:border-[#123B6D]`}
                      />
                      {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Select Program *
                      </label>
                      <select
                        value={formData.program}
                        onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#123B6D]"
                      >
                        {PROGRAMS_DATA.map((prog) => (
                          <option key={prog.id} value={prog.id}>
                            {prog.name} ({prog.category})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Query / Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ask about cutoff marks, hostel fees, direct admissions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-[#123B6D]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#123B6D] hover:bg-[#1E4D8C] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <span>Submit Application Enquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Got Questions?"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about SRGI admissions, eligibility, and campus facilities."
          />

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-subtle"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left font-bold text-sm sm:text-base text-slate-800 flex justify-between items-center space-x-4 hover:text-[#123B6D]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#123B6D]' : ''
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
