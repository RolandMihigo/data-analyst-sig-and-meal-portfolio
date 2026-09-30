import React, { useState } from 'react';
import { Language, ProjectItem } from '../types/portfolio';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  X, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles,
  ArrowUpRight,
  Database
} from 'lucide-react';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  lang: Language;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, lang }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const isFr = lang === 'fr';

  const filterTabs = [
    { id: 'all', label: isFr ? 'Tous les Projets' : 'All Projects' },
    { id: 'data_analysis', label: isFr ? 'Analyse de Données' : 'Data Analytics' },
    { id: 'meal', label: isFr ? 'MEAL & Humanitaire' : 'MEAL & Public Health' },
    { id: 'gis', label: isFr ? 'SIG & QGIS' : 'GIS & QGIS' },
    { id: 'bi', label: isFr ? 'Power BI & Dataviz' : 'Power BI & BI' },
  ];

  const filteredProjects = projects.filter((proj) => {
    if (selectedFilter === 'all') return true;
    return proj.category === selectedFilter;
  });

  return (
    <section id="projects" className="py-20 border-t border-slate-900 bg-slate-950/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-xs font-semibold text-blue-400 mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{isFr ? 'Portfolio Analytique & Données' : 'Analytics & Data Portfolio'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {isFr ? 'Projets Data, MEAL & SIG Phares' : 'Featured Data, MEAL & GIS Projects'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {isFr
              ? 'Étude Cyclistic (Google Data Analytics), systèmes MEAL pour la santé publique, SIG cadastral QGIS et tableaux de bord financiers provinciaux.'
              : 'Cyclistic case study (Google Data Analytics), public health MEAL pipelines, QGIS fiscal cadastre, and provincial financial dashboards.'}
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                selectedFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Image Preview Container */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-md border border-slate-700 text-[11px] font-mono font-semibold uppercase text-blue-300">
                    {project.category.replace('_', ' ')}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-[11px] font-semibold text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{isFr ? 'Projet Phare' : 'Featured'}</span>
                    </span>
                  )}
                </div>

                {/* Metrics Pill on image bottom */}
                {project.metrics && (
                  <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs text-slate-300">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{project.metrics[lang]}</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {project.title[lang]}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {project.shortDesc[lang]}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links & Details CTA */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <span>{isFr ? 'Visualiser' : 'View'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.kaggleUrl && (
                      <a
                        href={project.kaggleUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <Database className="w-3.5 h-3.5" />
                        <span>Kaggle</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveProjectModal(project)}
                    className="text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/60 transition-colors"
                  >
                    {isFr ? 'Détails & Impact' : 'Details & Impact'}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Details Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
            
            {/* Header image banner */}
            <div className="relative h-52 w-full">
              <img
                src={activeProjectModal.image}
                alt={activeProjectModal.title[lang]}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="absolute top-4 right-4 p-2 bg-slate-950/80 hover:bg-slate-950 text-white rounded-full transition-colors border border-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-600/80 text-[11px] font-mono uppercase text-white font-bold mb-1.5 inline-block">
                  {activeProjectModal.category.replace('_', ' ')}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {activeProjectModal.title[lang]}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
                  {isFr ? 'Contexte & Objectifs du Projet' : 'Project Context & Objectives'}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {activeProjectModal.fullDesc[lang]}
                </p>
              </div>

              {activeProjectModal.metrics && (
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-center gap-3 text-xs text-emerald-300">
                  <TrendingUp className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-white block">
                      {isFr ? 'Indicateur d\'Impact & Métrique Clé' : 'Impact Metric & Results'}
                    </span>
                    <span>{activeProjectModal.metrics[lang]}</span>
                  </div>
                </div>
              )}

              {activeProjectModal.highlights && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2.5">
                    {isFr ? 'Réalisations & Méthodologie' : 'Methodology & Key Deliverables'}
                  </h4>
                  <div className="space-y-2">
                    {activeProjectModal.highlights[lang].map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
                  {isFr ? 'Technologies & Outils Employés' : 'Technologies & Tools'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProjectModal.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="text-xs text-slate-400 hover:text-white px-3 py-2"
              >
                {isFr ? 'Fermer' : 'Close'}
              </button>
              
              <div className="flex items-center gap-3">
                {activeProjectModal.kaggleUrl && (
                  <a
                    href={activeProjectModal.kaggleUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 text-xs font-semibold text-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/60 rounded-lg border border-cyan-800/60 transition-colors flex items-center gap-1.5"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Kaggle</span>
                  </a>
                )}
                {activeProjectModal.githubUrl && (
                  <a
                    href={activeProjectModal.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
                {activeProjectModal.liveUrl && (
                  <a
                    href={activeProjectModal.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5 shadow"
                  >
                    <span>{isFr ? 'Accéder' : 'Access'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
