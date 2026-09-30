import React, { useState, useEffect } from 'react';
import { Language, PortfolioData } from './types/portfolio';
import { 
  getSavedPortfolio, 
  savePortfolio 
} from './services/resumeService';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeUploaderModal } from './components/ResumeUploaderModal';
import { ExportHtmlModal } from './components/ExportHtmlModal';
import { Sparkles, Code, CheckCircle, Globe } from 'lucide-react';

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData>(getSavedPortfolio);
  // Default to French as requested by user
  const [lang, setLang] = useState<Language>('fr');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync title and document language
  useEffect(() => {
    document.title = `${portfolio.personal.name} — ${portfolio.personal.title[lang]}`;
    document.documentElement.lang = lang;
  }, [portfolio, lang]);

  const handlePortfolioUpdated = (updated: PortfolioData) => {
    setPortfolio(updated);
    savePortfolio(updated);
    setToastMessage(
      lang === 'fr'
        ? `CV analysé avec succès ! Portfolio mis à jour pour ${updated.personal.name}.`
        : `Resume extracted! Portfolio updated for ${updated.personal.name}.`
    );
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-emerald-500/60 shadow-2xl text-xs text-emerald-300 animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Bottom-Right Quick Action Bar */}
      <aside aria-label="Actions rapides" className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 p-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-2xl">
        <button
          type="button"
          onClick={() => setResumeModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{lang === 'fr' ? 'Importer CV' : 'Upload Resume'}</span>
        </button>

        <button
          type="button"
          onClick={() => setExportModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          title={lang === 'fr' ? 'Exporter HTML/CSS/JS pur' : 'Export pure HTML/CSS/JS'}
        >
          <Code className="w-3.5 h-3.5 text-blue-400" />
          <span>HTML/CSS/JS</span>
        </button>

        <button
          type="button"
          onClick={() => handleLanguageChange(lang === 'fr' ? 'en' : 'fr')}
          className="px-2.5 py-1.5 rounded-full bg-slate-950 text-slate-300 hover:text-white text-xs font-bold border border-slate-800 transition-colors flex items-center gap-1"
        >
          <Globe className="w-3 h-3 text-blue-400" />
          <span>{lang === 'fr' ? 'EN' : 'FR'}</span>
        </button>
      </aside>

      {/* Main Navigation */}
      <Navbar
        portfolio={portfolio}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenExportModal={() => setExportModalOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <Hero
          portfolio={portfolio}
          lang={lang}
          onOpenResumeModal={() => setResumeModalOpen(true)}
          onOpenExportModal={() => setExportModalOpen(true)}
        />

        {/* About Section */}
        <AboutSection
          portfolio={portfolio}
          lang={lang}
        />

        {/* Skills Section */}
        <SkillsSection
          skills={portfolio.skills}
          lang={lang}
        />

        {/* Projects Section */}
        <ProjectsSection
          projects={portfolio.projects}
          lang={lang}
        />

        {/* Education & Experience & Certifications Section */}
        <EducationSection
          education={portfolio.education}
          experience={portfolio.experience}
          certifications={portfolio.certifications}
          references={portfolio.references}
          lang={lang}
        />

        {/* Blog Section */}
        <BlogSection
          blog={portfolio.blog}
          lang={lang}
          onLanguageChange={handleLanguageChange}
        />

        {/* Contact Section */}
        <ContactSection
          portfolio={portfolio}
          lang={lang}
        />
      </main>

      {/* Footer */}
      <Footer
        portfolio={portfolio}
        lang={lang}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenExportModal={() => setExportModalOpen(true)}
      />

      {/* Modals */}
      <ResumeUploaderModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        lang={lang}
        onPortfolioUpdated={handlePortfolioUpdated}
      />

      <ExportHtmlModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        portfolio={portfolio}
        lang={lang}
      />

    </div>
  );
}
