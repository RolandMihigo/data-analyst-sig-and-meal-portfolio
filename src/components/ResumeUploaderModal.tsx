import React, { useState, useRef } from 'react';
import { Language, PortfolioData } from '../types/portfolio';
import { 
  parseResumeWithAI, 
  resetToDefaultPortfolio,
  fallbackTextParser 
} from '../services/resumeService';
import { 
  X, 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  FileType, 
  ArrowRight,
  ClipboardPaste,
  BookOpen
} from 'lucide-react';

interface ResumeUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onPortfolioUpdated: (updated: PortfolioData) => void;
}

const SAMPLE_RESUME_TEXT = `
Iragi Mihigo Roland
Spécialiste en Gestion de l'Information, SIG & Analyse des Données | MEAL Specialist
SIG & Cartographie • KoboToolbox • Power BI & Dataviz • SQL & BigQuery • Analyse Humanitaire
📍 Katindo, Avenue de la Frontière, Goma, Nord-Kivu, RDC
📞 +243 992 641 674 • ✉️ rolandiragimihigo851@gmail.com
LinkedIn: roland-iragi | GitHub: RolandMihigo | Kaggle: rolandiragi

PROFIL PROFESSIONNEL
Expert en gestion de l'information (IM), analyse géospatiale (SIG) et modélisation de données, avec une expérience terrain confirmée dans le déploiement de solutions numériques en contextes de gouvernance, de santé publique et d'interventions humanitaires en RDC. Maîtrise complète du cycle de vie de la donnée : collecte mobile sécurisée (KoboToolbox/XLSForm), structuration et automatisation de bases de données (MySQL, BigQuery), analyses spatiales multicritères (QGIS) et conception de tableaux de bord décisionnels interactifs (Power BI, Tableau, Excel Avancé). Rompu à la coordination avec les partenaires internationaux (LM International, clusters humanitaires, divisions provinciales), à l'appui technique des équipes opérationnelles de terrain et à la gouvernance de la qualité, garantissant l'intégrité, la confidentialité et l'exploitation stratégique des données pour la prise de décision fondée sur les preuves.

EXPÉRIENCE PROFESSIONNELLE
eGov Africa (Organisation Non Gouvernementale) | 2024 – Présent
Co-fondateur & Spécialiste des Données Humanitaires & MEAL
- Architecture et déploiement de solutions numériques de gestion de l'information pour le secteur de la santé publique et les acteurs d'urgence en RDC (avec l'appui de partenaires internationaux tels que LM International).
- Conception de formulaires XLSForm complexes sur KoboToolbox pour la collecte mobile (consultations prénatales CPN, suivi vaccinal, monitoring des violences basées sur le genre - VBG).
- Consolidation, contrôle qualité et traitement analytique de jeux de données massifs pour alimenter les rapports opérationnels, bulletins d'alerte et dashboards partenaires.
- Renforcement des capacités et encadrement technique des équipes et partenaires de terrain sur l'utilisation des solutions numériques et la protection des données sensibles.
- Mise en place de mécanismes rigoureux de validation et d'intégrité, assurant une disponibilité continue d'indicateurs fiables pour la prise de décision humanitaire.
- Coordination stratégique avec les clusters humanitaires, les divisions provinciales de la santé et les parties prenantes institutionnelles.

Verditra SARLU (Société de Services Numériques & Ingénierie) | Février 2022 – Janvier 2025
Assistant aux Opérations / ICT & GIS Officer — Ituri, Sud-Kivu, Kongo Central
- Coordination technique du déploiement de solutions de gouvernance électronique et de dématérialisation fiscale pour les régies provinciales (DGRNK, DGRPI, etc.).
- Expertise SIG sous QGIS : vectorisation, délimitation et calcul de superficie de plus de 10 000 parcelles et bâtis, couplés aux identifiants fiscaux et fonciers.
- Conception et alimentation de tableaux de bord analytiques dynamiques sous Power BI, Tableau et Qlik Sense pour le suivi des recettes publiques par les gouvernements provinciaux.
- Animation de sessions de formation et transfert de compétences auprès de plus de 100 agents et directeurs provinciaux.
- Supervision des bases de données relationnelles, optimisation des procédures d’intégration (ETL) et support technique de proximité.

Radio Maria Bukavu (Réseau International de Radiodiffusion) | 2021 – 2022
Technicien d'Antenne & Support Systèmes
- Supervision technique des faisceaux hertziens d’émission et garantie de la continuité opérationnelle du signal de radiodiffusion.
- Maintenance préventive et curative du parc informatique, des consoles de mixage et des infrastructures réseau du studio.

FORMATION ACADÉMIQUE
International University of East Africa (IUEA) (Kampala, Ouganda) | 2021
Licence en Informatique (Bachelor of Science in Computer Science)

CERTIFICATIONS PROFESSIONNELLES
- Google Data Analytics — Certificat Professionnel Analyse de Données (Google / Coursera)
- Google AI — Spécialisation Intelligence Artificielle & Prompting (Google / Coursera)
- Map Fast with QGIS — Système d’Information Géographique (SIG) (Coursera Project Network)
- Microsoft Power BI Data Analyst — Modélisation, Mesures DAX & Business Intelligence (PL-300) (Microsoft / Coursera)
- Complete KoboToolbox Training Course — Collecte Mobile Avancée, XLSForm & Enquêtes Terrain (Udemy)
- Responsive Web Design — Développement Web, Architecture & Interfaces Réactives (freeCodeCamp)
- Excel Avancé pour l'Analyse des Données — Modélisation, TCD & Fonctions Complexes (Horizon Services Consulting, Goma, RDC)

PROJETS DATA / PORTFOLIO ANALYTIQUE
Analyse des comportements des usagers : Projet Cyclistic | Étude de cas Google Data Analytics (SQL BigQuery & Tableau)
Système Intégré de Suivi & Évaluation (MEAL) et Santé Publique (eGov Africa & LM International)
Système d'Information Géographique & Cadastral Provincial (QGIS & Power BI pour DGRNK / DGRPI)

RÉFÉRENCES PROFESSIONNELLES
Kitoko Bruno — Directeur pays, LM International (kitoko.bruno@lminternational.org | +243 995 462 548)
Joseph Baderha Kahunga — Branch Manager Sud-Kivu, Verditra Sarlu (joseph@egov-africa.org | +243 995 462 548)
Chimène Fatuma wa Saidi — Directrice des Opérations, Verditra Sarlu (chimene@egov-africa.org | +243 993 820 585)
Jacques Musumba — Coordonnateur, eGov Africa (jacques@egov-africa.org | +243 992 641 674)
`;

export const ResumeUploaderModal: React.FC<ResumeUploaderModalProps> = ({
  isOpen,
  onClose,
  lang,
  onPortfolioUpdated,
}) => {
  const [tab, setTab] = useState<'upload' | 'paste'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [stepMessage, setStepMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<PortfolioData | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEn = lang === 'en';

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setErrorMessage(null);
  };

  const executeExtraction = async () => {
    setLoading(true);
    setErrorMessage(null);
    setPreviewData(null);

    try {
      setStepMessage(
        isEn
          ? 'Reading document payload and preparing parser...'
          : 'Lecture du document et initialisation de l\'analyseur...'
      );

      let result: PortfolioData;

      if (tab === 'upload' && selectedFile) {
        // If file is text or json
        if (
          selectedFile.type.includes('text') ||
          selectedFile.name.endsWith('.txt') ||
          selectedFile.name.endsWith('.md')
        ) {
          const text = await selectedFile.text();
          setStepMessage(
            isEn
              ? 'Analyzing resume structure with Gemini 3.8 Flash...'
              : 'Analyse de la structure du CV avec Gemini 3.8 Flash...'
          );
          result = await parseResumeWithAI({ text, filename: selectedFile.name });
        } else if (selectedFile.name.endsWith('.json')) {
          const text = await selectedFile.text();
          try {
            const parsed = JSON.parse(text);
            result = parsed;
          } catch {
            result = await parseResumeWithAI({ text, filename: selectedFile.name });
          }
        } else {
          // Multimodal PDF / DOCX / Image
          setStepMessage(
            isEn
              ? 'Extracting visual layout & tokenizing document...'
              : 'Extraction de la mise en page et traitement visuel du document...'
          );

          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(selectedFile);
          });

          setStepMessage(
            isEn
              ? 'Synthesizing bilingual resume schema (English & French)...'
              : 'Génération du schéma bilingue (Anglais & Français)...'
          );

          result = await parseResumeWithAI({
            fileBase64: base64,
            mimeType: selectedFile.type || 'application/pdf',
            filename: selectedFile.name,
          });
        }
      } else if (tab === 'paste' && pastedText.trim()) {
        setStepMessage(
          isEn
            ? 'Analyzing candidate profile with Gemini 3.8 Flash...'
            : 'Analyse du profil candidat avec Gemini 3.8 Flash...'
        );
        result = await parseResumeWithAI({ text: pastedText.trim() });
      } else {
        throw new Error(
          isEn ? 'Please select a file or paste your resume text.' : 'Veuillez sélectionner un fichier ou coller votre CV.'
        );
      }

      setStepMessage(
        isEn
          ? 'Successfully parsed all sections! Review below.'
          : 'Extraction réussie ! Vérifiez les informations ci-dessous.'
      );
      setPreviewData(result);
    } catch (err: any) {
      console.error('Extraction error:', err);
      // Fallback: If we have text, use client fallback
      if (tab === 'paste' && pastedText) {
        const fallback = fallbackTextParser(pastedText);
        setPreviewData(fallback);
      } else {
        setErrorMessage(
          err?.message ||
            (isEn
              ? 'Could not parse resume automatically. You can paste the plain text directly.'
              : 'Impossible d\'analyser le fichier. Vous pouvez coller le texte directement.')
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const applyChanges = () => {
    if (previewData) {
      onPortfolioUpdated(previewData);
      onClose();
    }
  };

  const handleLoadSample = () => {
    setTab('paste');
    setPastedText(SAMPLE_RESUME_TEXT.trim());
    setSelectedFile(null);
    setErrorMessage(null);
  };

  const handleResetOriginal = () => {
    const original = resetToDefaultPortfolio();
    onPortfolioUpdated(original);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isEn ? 'Automatic Resume Information Extractor' : 'Extracteur Automatique de CV'}
              </h3>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'Extracts skills, projects, and education into bilingual EN/FR portfolio'
                  : 'Extrait compétences, projets et formations vers un portfolio bilingue EN/FR'}
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
          
          {/* Tabs */}
          <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => { setTab('upload'); setErrorMessage(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                tab === 'upload'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>{isEn ? 'Upload File (PDF / DOCX / TXT)' : 'Téléverser un Fichier (PDF / DOCX / TXT)'}</span>
            </button>
            <button
              type="button"
              onClick={() => { setTab('paste'); setErrorMessage(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                tab === 'paste'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ClipboardPaste className="w-4 h-4" />
              <span>{isEn ? 'Paste Resume Text' : 'Coller le Texte du CV'}</span>
            </button>
          </div>

          {/* Quick Sample Trigger */}
          <div className="flex items-center justify-between text-xs px-1 text-slate-400">
            <span>
              {isEn
                ? 'Want to test extraction immediately?'
                : 'Vous voulez tester immédiatement l\'extraction ?'}
            </span>
            <button
              type="button"
              onClick={handleLoadSample}
              className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4 flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isEn ? 'Load Sample Resume' : 'Charger un exemple de CV'}</span>
            </button>
          </div>

          {/* Tab 1: Upload File */}
          {tab === 'upload' && (
            <div>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : selectedFile
                    ? 'border-emerald-500/60 bg-emerald-500/5'
                    : 'border-slate-700 hover:border-slate-600 bg-slate-950/40'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt,.json,.md"
                  onChange={handleFileInput}
                  className="hidden"
                />

                {selectedFile ? (
                  <div className="flex flex-col items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-10 h-10" />
                    <span className="text-sm font-semibold text-white">
                      {selectedFile.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      {(selectedFile.size / 1024).toFixed(1)} KB •{' '}
                      {isEn ? 'Click to change file' : 'Cliquer pour changer de fichier'}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 mb-1">
                      <UploadCloud className="w-6 h-6 text-indigo-400" />
                    </div>
                    <span className="text-sm font-semibold text-slate-200">
                      {isEn
                        ? 'Drag and drop your resume file here'
                        : 'Glissez-déposez votre fichier de CV ici'}
                    </span>
                    <span className="text-xs text-slate-400">
                      {isEn
                        ? 'Supports PDF, Word (.docx), TXT, Markdown (.md), JSON'
                        : 'Prend en charge PDF, Word (.docx), TXT, Markdown, JSON'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Paste Text */}
          {tab === 'paste' && (
            <div className="space-y-2">
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder={
                  isEn
                    ? 'Paste full resume or bio text here (experience, skills, education, projects)...'
                    : 'Collez ici le texte intégral de votre CV (expériences, compétences, formations, projets)...'
                }
                rows={9}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-4 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
              <span className="text-[11px] text-slate-400 block text-right">
                {pastedText.length} {isEn ? 'characters' : 'caractères'}
              </span>
            </div>
          )}

          {/* Loading state indicator */}
          {loading && (
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 flex items-center gap-3 animate-pulse">
              <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin flex-shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-white block">
                  {isEn ? 'AI Extraction in progress...' : 'Extraction IA en cours...'}
                </span>
                <span className="text-indigo-300">{stepMessage}</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 flex items-start gap-3 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Preview of Extracted Data */}
          {previewData && (
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isEn ? 'Extracted Profile Summary' : 'Aperçu du Profil Extrait'}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {previewData.skills.length} {isEn ? 'skills' : 'compétences'} • {previewData.projects.length} {isEn ? 'projects' : 'projets'}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <p>
                  <strong className="text-white">{isEn ? 'Name:' : 'Nom :'}</strong>{' '}
                  {previewData.personal.name}
                </p>
                <p>
                  <strong className="text-white">{isEn ? 'Title (EN):' : 'Titre (EN) :'}</strong>{' '}
                  {previewData.personal.title.en}
                </p>
                <p>
                  <strong className="text-white">{isEn ? 'Title (FR):' : 'Titre (FR) :'}</strong>{' '}
                  {previewData.personal.title.fr}
                </p>
                <p>
                  <strong className="text-white">{isEn ? 'Top Skills:' : 'Compétences clés :'}</strong>{' '}
                  {previewData.skills.slice(0, 6).map((s) => s.name).join(', ')}...
                </p>
                <p>
                  <strong className="text-white">{isEn ? 'Education:' : 'Formation :'}</strong>{' '}
                  {previewData.education[0]?.degree[lang]} ({previewData.education[0]?.institution[lang]})
                </p>
              </div>

              <button
                type="button"
                onClick={applyChanges}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
              >
                <span>{isEn ? 'Apply Extracted Information to Portfolio' : 'Appliquer les Informations au Portfolio'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetOriginal}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            {isEn ? 'Revert to Roland Iragi Mihigo default' : 'Restaurer profil par défaut (Roland)'}
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
            >
              {isEn ? 'Cancel' : 'Annuler'}
            </button>

            {!previewData && (
              <button
                type="button"
                onClick={executeExtraction}
                disabled={loading || (tab === 'upload' && !selectedFile) || (tab === 'paste' && !pastedText.trim())}
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-md transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isEn ? 'Extract Information' : 'Extraire les Données'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
