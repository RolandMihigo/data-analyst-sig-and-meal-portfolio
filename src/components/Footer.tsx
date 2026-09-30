import React from 'react';
import { Language, PortfolioData } from '../types/portfolio';
import { ArrowUp, Code2, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  portfolio: PortfolioData;
  lang: Language;
  onOpenResumeModal: () => void;
  onOpenExportModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  portfolio,
  lang,
  onOpenResumeModal,
  onOpenExportModal,
}) => {
  const isEn = lang === 'en';
  const p = portfolio.personal;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950/95 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow">
              {p.name.charAt(0)}
            </div>
            <div>
              <span className="text-sm font-bold text-white block">
                {p.name}
              </span>
              <span className="text-xs text-slate-400">
                {p.title[lang]}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <a href="#about" className="hover:text-white transition-colors">
              {isEn ? 'About' : 'À propos'}
            </a>
            <a href="#skills" className="hover:text-white transition-colors">
              {isEn ? 'Skills' : 'Compétences'}
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              {isEn ? 'Projects' : 'Projets'}
            </a>
            <a href="#education" className="hover:text-white transition-colors">
              {isEn ? 'Education' : 'Formations'}
            </a>
            <a href="#blog" className="hover:text-white transition-colors">
              {isEn ? 'Blog' : 'Articles'}
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              {isEn ? 'Contact' : 'Contact'}
            </a>
          </div>

          {/* Tool actions & Back to Top */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenResumeModal}
              className="p-2 text-xs text-indigo-400 hover:text-indigo-300 hover:bg-slate-900 rounded-lg border border-slate-800 transition-colors flex items-center gap-1.5"
              title={isEn ? 'Update Resume / CV' : 'Mettre à jour le CV'}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEn ? 'Update Resume' : 'Modifier CV'}</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg border border-slate-800 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {p.name}.{' '}
            {isEn 
              ? 'All rights reserved. Built with clean HTML, CSS & JavaScript standards.' 
              : 'Tous droits réservés. Conçu avec les standards HTML, CSS & JavaScript.'}
          </p>

          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span>Bilingual (EN/FR)</span>
            <span>•</span>
            <span>Gemini AI Parser Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
