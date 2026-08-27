import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ResourceProvider } from './context/ResourceContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { ResourceFormModal } from './components/resources/ResourceFormModal';
import './App.css';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { SubjectsPage } from './pages/SubjectsPage';
import { SubjectDetailPage } from './pages/SubjectDetailPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { ImportantLinksPage } from './pages/ImportantLinksPage';
import { AddResourcePage } from './pages/AddResourcePage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on route change helper
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-brand-500 selection:text-white">
      <ScrollToTop />
      
      {/* Navigation Header */}
      <Navbar onOpenAddModal={() => setIsAddModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <Routes>
          <Route path="/" element={<DashboardPage onOpenAddModal={() => setIsAddModalOpen(true)} />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/subjects/:id" element={<SubjectDetailPage onOpenAddModal={() => setIsAddModalOpen(true)} />} />
          <Route path="/resources" element={<ResourcesPage onOpenAddModal={() => setIsAddModalOpen(true)} />} />
          <Route path="/resources/:id" element={<ResourceDetailPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/links" element={<ImportantLinksPage />} />
          <Route path="/tools" element={<ImportantLinksPage />} />
          <Route path="/add-resource" element={<AddResourcePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Global Add Resource Modal */}
      <ResourceFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Global Toast Alert Notifications */}
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <ResourceProvider>
        <Router>
          <MainLayout />
        </Router>
      </ResourceProvider>
    </ThemeProvider>
  );
}

export default App;
