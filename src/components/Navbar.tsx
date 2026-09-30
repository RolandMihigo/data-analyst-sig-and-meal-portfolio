import React, { useState } from 'react';
import { Language, PortfolioData } from '../types/portfolio';
import { 
  Sparkles, 
  Code, 
  Menu, 
  X, 
  Database,
  BarChart2
} from 'lucide-react';

interface NavbarProps {
  portfolio: PortfolioData;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenResumeModal: () => void;
  onOpenExportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  portfolio,
  lang,
  onLanguageChange,
  onOpenResumeModal,
  onOpenExportModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isFr = lang === 'fr';

  const navLinks = [
    { href: '#about', label: isFr ? 'À propos' : 'About' },
    { href: '#skills', label: isFr ? 'Compétences' : 'Skills' },
    { href: '#projects', label: isFr ? 'Projets Data' : 'Data Projects' },
    { href: '#education', label: isFr ? 'Parcours & Certifications' : 'Career & Certs' },
    { href: '#blog', label: isFr ? 'Articles & Blog' : 'Blog' },
    { href: '#contact', label: isFr ? 'Contact' : 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/90 border-b border-slate-800/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a 
            href="#" 
            className="group flex items-center gap-2.5 text-lg font-bold text-white tracking-tight"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <BarChart2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight group-hover:text-blue-400 transition-colors">
                {portfolio.personal.name}
              </span>
              <span className="text-[11px] font-mono font-medium text-slate-400">
                {isFr ? 'Data Analyst, SIG & MEAL' : 'Data Analyst, GIS & MEAL'}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800 rounded-full px-4 py-1.5 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-full transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Language Switcher, Upload Resume, Export HTML */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => onLanguageChange('fr')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all ${
                  lang === 'fr'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Passer en Français (Par défaut)"
              >
                <span>🇫🇷</span>
                <span>FR</span>
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all ${
                  lang === 'en'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to English"
              >
                <span>🇬🇧</span>
                <span>EN</span>
              </button>
            </div>

            {/* Pure HTML/CSS/JS export & GitHub Link */}
            <button
              type="button"
              onClick={onOpenExportModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
              title={isFr ? 'Obtenir le lien GitHub et fichier de redirection' : 'Get GitHub link & redirect file'}
            >
              <Code className="w-3.5 h-3.5 text-blue-400" />
              <span>{isFr ? 'Lien GitHub & HTML' : 'GitHub Link & HTML'}</span>
            </button>

            {/* Resume Upload / AI Parse Button */}
            <button
              type="button"
              onClick={onOpenResumeModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg shadow-md shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isFr ? 'Mettre à jour CV (IA)' : 'Update CV (AI)'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => onLanguageChange(lang === 'fr' ? 'en' : 'fr')}
              className="px-2.5 py-1.5 text-xs font-semibold bg-slate-900 border border-slate-800 rounded-lg text-slate-200"
            >
              {lang === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR'}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg shadow"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isFr ? 'Mettre à jour CV (Auto-extraction)' : 'Update CV (Auto-extract)'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenExportModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg"
            >
              <Code className="w-4 h-4 text-blue-400" />
              <span>{isFr ? 'Télécharger HTML/CSS/JS pur' : 'Download pure HTML/CSS/JS'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
