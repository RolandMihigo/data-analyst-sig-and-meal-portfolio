import React, { useState } from 'react';
import { Language, PortfolioData } from '../types/portfolio';
import { generatePureHtmlCssJs } from '../services/resumeService';
import { 
  X, 
  Code, 
  Download, 
  Copy, 
  Check, 
  Github, 
  Layers, 
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

interface ExportHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioData;
  lang: Language;
}

export const ExportHtmlModal: React.FC<ExportHtmlModalProps> = ({
  isOpen,
  onClose,
  portfolio,
  lang,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [exportLang, setExportLang] = useState<Language>(lang);
  const isFr = lang === 'fr';

  if (!isOpen) return null;

  const fullHtmlContent = generatePureHtmlCssJs(portfolio, exportLang);
  const currentFileName = 'index.html';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(fullHtmlContent);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2200);
  };

  const handleDownload = () => {
    const blob = new Blob([fullHtmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', currentFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isFr ? 'Fichier index.html Complet pour GitHub Pages' : 'Standalone index.html for GitHub Pages'}
              </h3>
              <p className="text-xs text-slate-400">
                {isFr
                  ? 'Portfolio 100% autonome, sans dépendance externe, prêt pour votre site GitHub'
                  : '100% self-contained portfolio ready for GitHub Pages hosting'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Why the external URL failed explanation box */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{isFr ? 'Pourquoi l\'URL ais-pre ne passait pas ?' : 'Why the preview URL did not work?'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isFr
                ? 'Les adresses temporaires "ais-pre-..." sont réservées à la session de développement interne et ne sont pas accessibles au public. Vous n\'avez besoin d\'aucune redirection externe ! Votre fichier index.html ci-dessous contient déjà TOUT votre portfolio complet (votre photo réelle intégrée, vos projets, vos compétences, vos certifications et la bascule bilingue).'
                : 'The temporary preview URLs are internal dev environments requiring Google authentication and are not public. You do not need any external redirect! The index.html file below contains your ENTIRE portfolio self-contained.'}
            </p>
          </div>

          {/* Download Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/50 via-slate-900 to-slate-950 border border-blue-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">index.html (Portfolio Autonome)</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-[10px] font-semibold text-emerald-400">
                  Prêt pour GitHub Pages
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isFr
                  ? 'Fichier unique avec photo, styles, données et script bilingue inclus.'
                  : 'Single file with photo, styling, data, and bilingual scripts included.'}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setExportLang('fr')}
                  className={`px-2 py-1 rounded font-semibold transition-all ${
                    exportLang === 'fr' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  FR 🇫🇷
                </button>
                <button
                  type="button"
                  onClick={() => setExportLang('en')}
                  className={`px-2 py-1 rounded font-semibold transition-all ${
                    exportLang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EN 🇬🇧
                </button>
              </div>

              <button
                type="button"
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>{isFr ? 'Télécharger index.html' : 'Download index.html'}</span>
              </button>
            </div>
          </div>

          {/* Code Viewer & Copy button */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 text-[11px]">
                {currentFileName} ({Math.round(fullHtmlContent.length / 1024)} KB)
              </span>

              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? (isFr ? 'Copié !' : 'Copied!') : (isFr ? 'Copier le Code HTML' : 'Copy HTML Code')}</span>
              </button>
            </div>

            <pre className="w-full h-44 bg-slate-950 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-slate-300 overflow-auto scrollbar-thin">
              <code>{fullHtmlContent.slice(0, 2000)}...</code>
            </pre>
          </div>

          {/* Step by step guide to host on GitHub Pages */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-400" />
              <span>{isFr ? 'Comment l\'activer sur votre GitHub (Guide en 3 étapes) :' : 'How to deploy on GitHub (3 easy steps):'}</span>
            </h4>
            <ol className="list-decimal pl-5 text-xs text-slate-300 space-y-2 leading-relaxed">
              <li>
                <strong>{isFr ? 'Téléchargez le fichier' : 'Download file'}</strong> : Cliquez sur le bouton bleu ci-dessus pour obtenir <code>index.html</code>.
              </li>
              <li>
                <strong>{isFr ? 'Déposez-le sur GitHub' : 'Upload to GitHub'}</strong> : Rendez-vous sur votre dépôt GitHub (ex. <code>RolandMihigo/portfolio</code> ou <code>RolandMihigo.github.io</code>) et téléversez ou commitez ce fichier <code>index.html</code> à la racine.
              </li>
              <li>
                <strong>{isFr ? 'Activez GitHub Pages' : 'Enable GitHub Pages'}</strong> : Dans l'onglet <em>Settings &gt; Pages</em> de votre dépôt, choisissez la branche <code>main</code> (ou <code>master</code>) et le dossier <code>/ (root)</code>, puis cliquez sur <strong>Save</strong>.
              </li>
            </ol>
            <div className="pt-1 text-[11px] text-emerald-400 font-medium">
              ✨ {isFr ? 'Votre portfolio sera immédiatement en ligne et accessible mondialement sur https://rolandmihigo.github.io !' : 'Your portfolio will be live at https://rolandmihigo.github.io!'}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>{isFr ? 'Zéro dépendance serveur • 100% compatible GitHub Pages' : 'Zero dependencies • 100% GitHub Pages compatible'}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-semibold"
          >
            {isFr ? 'Fermer' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
