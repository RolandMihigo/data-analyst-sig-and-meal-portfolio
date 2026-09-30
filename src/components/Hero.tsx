import React from 'react';
import { Language, PortfolioData } from '../types/portfolio';
import { 
  ArrowRight, 
  Mail, 
  Github, 
  Linkedin, 
  Sparkles,
  MapPin,
  Phone,
  Database,
  BarChart3,
  Layers,
  Map
} from 'lucide-react';

interface HeroProps {
  portfolio: PortfolioData;
  lang: Language;
  onOpenResumeModal: () => void;
  onOpenExportModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  portfolio,
  lang,
  onOpenResumeModal,
  onOpenExportModal,
}) => {
  const isFr = lang === 'fr';
  const p = portfolio.personal;

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-cyan-600/15 to-emerald-500/10 blur-[130px] -z-10 pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Avatar and Availability Status */}
          <div className="relative mb-6 group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <img
              src={p.avatarUrl}
              alt={p.name}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-slate-950 shadow-2xl"
            />
            {p.availableForHire && (
              <div 
                className="absolute bottom-1 right-1 bg-emerald-500 border-2 border-slate-950 w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                title={isFr ? 'Disponible pour missions & postes' : 'Available for roles & assignments'}
              >
                <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
              </div>
            )}
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-300 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400">●</span>
            <span>
              {isFr
                ? 'Disponible pour Postes & Missions : Data Analyst, SIG & MEAL'
                : 'Available for Data Analyst, GIS & MEAL Specialist Roles'}
            </span>
          </div>

          {/* Headline Name */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-3">
            {p.name}
          </h1>

          {/* Dynamic Job Title */}
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-200 bg-clip-text text-transparent mb-5 max-w-4xl">
            {p.title[lang]}
          </div>

          {/* Sub-specialties pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6 max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-medium text-blue-300">
              SIG & Cartographie QGIS
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-medium text-cyan-300">
              KoboToolbox & XLSForm
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-medium text-indigo-300">
              Power BI & Dataviz
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-medium text-emerald-300">
              SQL & BigQuery
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-medium text-purple-300">
              Suivi & Évaluation (MEAL)
            </span>
          </div>

          {/* Location & Quick Contact */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 mb-8 font-medium">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{p.contact.location || 'Katindo, Avenue de la Frontière, Goma, RDC'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{p.contact.phone || '+243 992 641 674'}</span>
            </span>
          </div>

          {/* Short Bio / Value Proposition */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">
            {p.bio[lang]}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{isFr ? 'Découvrir les Projets Data' : 'Explore Data Projects'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              <span>{isFr ? 'Me Contacter' : 'Get in Touch'}</span>
            </a>

            <button
              type="button"
              onClick={onOpenResumeModal}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-blue-300 bg-blue-950/40 hover:bg-blue-950/70 border border-blue-800/60 rounded-xl transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>{isFr ? 'Mettre à jour le CV (IA)' : 'Update Resume (AI)'}</span>
            </button>
          </div>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl pt-8 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {p.yearsOfExperience}+
              </span>
              <span className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
                {isFr ? 'Ans d\'Expérience' : 'Years Experience'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-400">
                10k+
              </span>
              <span className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
                {isFr ? 'Parcelles Vectorisées' : 'Parcels Mapped'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400">
                7
              </span>
              <span className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
                {isFr ? 'Certifications Vérifiées' : 'Certifications'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                FR + EN + SW
              </span>
              <span className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
                {isFr ? 'Multilingue (RDC/Global)' : 'Multilingual'}
              </span>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4 mt-8 text-slate-400">
            {p.contact.linkedin && (
              <a
                href={p.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 hover:text-white hover:bg-slate-900 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            )}
            {p.contact.github && (
              <a
                href={p.contact.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 hover:text-white hover:bg-slate-900 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            )}
            {p.contact.kaggle && (
              <a
                href={p.contact.kaggle}
                target="_blank"
                rel="noreferrer"
                className="p-2 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
                aria-label="Kaggle"
              >
                <Database className="w-5 h-5" />
                <span>Kaggle</span>
              </a>
            )}
            <a
              href={`mailto:${p.contact.email}`}
              className="p-2 hover:text-white hover:bg-slate-900 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
