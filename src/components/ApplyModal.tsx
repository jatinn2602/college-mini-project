import React, { useState } from 'react';
import { X, CheckCircle2, Send, GraduationCap } from 'lucide-react';
import { PROGRAMS_DATA } from '../data/programs';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgramId?: string;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  defaultProgramId = '',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    program: defaultProgramId || 'btech-cse',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.program) {
      newErrors.program = 'Please select a program of interest';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      // Save submission into localStorage as a demo feature
      const existingStr = localStorage.getItem('srgi_demo_applications');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      const newSubmission = {
        id: 'APP-' + Date.now(),
        ...formData,
        submittedAt: new Date().toISOString(),
      };

      localStorage.setItem(
        'srgi_demo_applications',
        JSON.stringify([newSubmission, ...existing])
      );

      setIsSubmitted(true);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      city: '',
      program: defaultProgramId || 'btech-cse',
      message: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#123B6D] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading">Apply Online 2026-27</h3>
              <p className="text-xs text-slate-300">SR Group of Institutions • Jhansi</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-800">Application Submitted!</h4>
              <p className="text-sm text-slate-600 max-w-xs mx-auto">
                Application enquiry submitted successfully. Our admission counselor will contact you shortly.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-500 font-mono">
                Reference ID: APP-{Date.now().toString().slice(-6)}
              </div>
              <button
                onClick={handleResetAndClose}
                className="mt-4 px-6 py-2.5 bg-[#123B6D] hover:bg-[#1E4D8C] text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                    errors.fullName ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-[#123B6D]'
                  } focus:outline-none transition-colors`}
                />
                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-[#123B6D]'
                    } focus:outline-none transition-colors`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-[#123B6D]'
                    } focus:outline-none transition-colors`}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jhansi"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      errors.city ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-[#123B6D]'
                    } focus:outline-none transition-colors`}
                  />
                  {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Program *
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border ${
                      errors.program ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-[#123B6D]'
                    } focus:outline-none bg-white transition-colors`}
                  >
                    {PROGRAMS_DATA.map((prog) => (
                      <option key={prog.id} value={prog.id}>
                        {prog.name} ({prog.category})
                      </option>
                    ))}
                  </select>
                  {errors.program && <p className="text-xs text-red-500 mt-1">{errors.program}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Questions / Remarks (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Mention any queries regarding eligibility or hostel..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-[#123B6D] focus:outline-none transition-colors"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#123B6D] hover:bg-[#1E4D8C] active:bg-[#0B2545] text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Submit Application Enquiry</span>
                  <Send className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2">
                  Demo Submission • Data saved locally for mini-project review
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
