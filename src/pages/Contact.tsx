import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, GraduationCap } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      setSubmitted(true);
    }
  };

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="bg-[#123B6D] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-3xl space-y-4"
          >
            <span className="px-3.5 py-1 bg-white/10 backdrop-blur-md text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider border border-white/15">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
              Contact SR Group of Institutions
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Have questions regarding admissions, fee structure, or campus visits? Reach out to our team or send us a message.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="py-20 bg-slate-50/70"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details & Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-heading mb-4">
                  Campus Address & Helpline
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Visit our campus located on the Gwalior Highway in Jhansi or contact our admission counseling center.
                </p>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0 }}
                  className="glass-card flex items-start space-x-4 p-5 rounded-2xl border border-white/60 shadow-subtle hover-lift"
                >
                  <div className="p-3 bg-blue-50/80 text-[#123B6D] rounded-xl shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-heading">
                      Main Campus Address
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      SR Group of Institutions, NH-25, Gwalior Road, Jhansi, Uttar Pradesh - 284003
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="glass-card flex items-start space-x-4 p-5 rounded-2xl border border-white/60 shadow-subtle hover-lift"
                >
                  <div className="p-3 bg-teal-50/80 text-[#0F766E] rounded-xl shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-heading">
                      Admission Helplines
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Toll Free: 1800-123-7744
                    </p>
                    <p className="text-xs text-slate-600">
                      Phone: +91 510-2730200 / +91 94150-12345
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="glass-card flex items-start space-x-4 p-5 rounded-2xl border border-white/60 shadow-subtle hover-lift"
                >
                  <div className="p-3 bg-amber-50/80 text-[#D97706] rounded-xl shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-heading">
                      Official Email IDs
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Admissions: admissions@srgi.ac.in
                    </p>
                    <p className="text-xs text-slate-600">
                      General Queries: info@srgi.ac.in
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="glass-card flex items-start space-x-4 p-5 rounded-2xl border border-white/60 shadow-subtle hover-lift"
                >
                  <div className="p-3 bg-indigo-50/80 text-[#1E4D8C] rounded-xl shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-heading">
                      Admission Office Hours
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Monday to Saturday: 9:00 AM – 5:00 PM
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 glass-card border border-slate-200/80 rounded-3xl p-8 shadow-card">
              <h3 className="text-xl font-bold text-slate-900 font-heading mb-2">
                Send Us an Enquiry
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill out your contact details below and our team will get back to you.
              </p>

              {submitted ? (
                <div className="bg-teal-50/80 border border-teal-200 p-8 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#0F766E] mx-auto" />
                  <h4 className="text-lg font-bold text-slate-900">Message Received!</h4>
                  <p className="text-xs text-slate-600">
                    Thank you for contacting SRGI. We will respond to your query shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 bg-[#123B6D] text-white text-xs font-bold rounded-lg hover-lift"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Verma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#123B6D]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#123B6D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#123B6D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. B.Tech CSE Seat Availability"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#123B6D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Type your message or query here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/90 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-[#123B6D]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#123B6D] hover:bg-[#1E4D8C] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer hover-lift"
                  >
                    <span>Submit Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Styled Campus Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mt-16 glass-card p-6 rounded-3xl border border-white/60 shadow-subtle space-y-4"
          >
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Campus Location Map
            </h3>
            <div className="w-full h-80 bg-slate-100/60 rounded-2xl overflow-hidden relative flex items-center justify-center border border-slate-200/60">
              <iframe
                title="SRGI Campus Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.558362635952!2d78.5300!3d25.4200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI1JzEyLjAiTiA3OMKwMzEnNDggMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                className="w-full h-full"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};
