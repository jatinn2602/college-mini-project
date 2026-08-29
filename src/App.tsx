import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ApplyModal } from './components/ApplyModal';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Academics } from './pages/Academics';
import { Colleges } from './pages/Colleges';
import { Admissions } from './pages/Admissions';
import { Placements } from './pages/Placements';
import { CampusLife } from './pages/CampusLife';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

// Helper component to scroll window to top on route change or hash navigation
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export const App: React.FC = () => {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedProgramForModal, setSelectedProgramForModal] = useState<string>('');

  const handleOpenApplyModal = (programId?: string) => {
    setSelectedProgramForModal(programId || '');
    setApplyModalOpen(true);
  };

  const handleCloseApplyModal = () => {
    setApplyModalOpen(false);
    setSelectedProgramForModal('');
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        {/* Global Announcement Bar */}
        <AnnouncementBar onOpenApplyModal={() => handleOpenApplyModal()} />

        {/* Global Sticky Navbar */}
        <Navbar onOpenApplyModal={() => handleOpenApplyModal()} />

        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onOpenApplyModal={handleOpenApplyModal} />} />
            <Route path="/about" element={<About onOpenApplyModal={() => handleOpenApplyModal()} />} />
            <Route path="/academics" element={<Academics onOpenApplyModal={handleOpenApplyModal} />} />
            <Route path="/colleges" element={<Colleges onOpenApplyModal={handleOpenApplyModal} />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/placements" element={<Placements onOpenApplyModal={() => handleOpenApplyModal()} />} />
            <Route path="/campus-life" element={<CampusLife onOpenApplyModal={() => handleOpenApplyModal()} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer onOpenApplyModal={() => handleOpenApplyModal()} />

        {/* Global Apply Modal */}
        <ApplyModal
          isOpen={applyModalOpen}
          onClose={handleCloseApplyModal}
          defaultProgramId={selectedProgramForModal}
        />
      </div>
    </Router>
  );
};

export default App;
