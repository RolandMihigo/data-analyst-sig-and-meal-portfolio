import React, { useState } from 'react';
import { Language, SkillItem } from '../types/portfolio';
import { 
  BarChart3, 
  Search, 
  MapPin, 
  ClipboardList, 
  PieChart, 
  Database, 
  HeartHandshake, 
  Languages as LanguagesIcon,
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface SkillsSectionProps {
  skills: SkillItem[];
  lang: Language;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const isFr = lang === 'fr';

  const categories = [
    { id: 'all', label: isFr ? 'Toutes les Compétences' : 'All Skills', icon: BarChart3 },
    { id: 'meal_analytics', label: isFr ? 'MEAL & Décisionnel' : 'MEAL & Analytics', icon: TrendingUp },
    { id: 'sig_gis', label: isFr ? 'SIG & QGIS' : 'GIS & QGIS', icon: MapPin },
    { id: 'kobo_field', label: isFr ? 'KoboToolbox & XLSForm' : 'KoboToolbox & Field', icon: ClipboardList },
    { id: 'bi_dataviz', label: isFr ? 'Power BI & Dataviz' : 'Power BI & Dataviz', icon: PieChart },
    { id: 'database_sql', label: isFr ? 'SQL & BigQuery' : 'SQL & BigQuery', icon: Database },
    { id: 'humanitarian_gov', label: isFr ? 'Humanitaire & Santé' : 'Humanitarian & Health', icon: HeartHandshake },
    { id: 'languages', label: isFr ? 'Langues' : 'Languages', icon: LanguagesIcon },
  ];

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getProficiencyLabel = (level: number) => {
    if (level >= 95) return isFr ? 'Maîtrise Complète / Expert' : 'Mastered / Expert';
    if (level >= 88) return isFr ? 'Avancé Confirmé' : 'Advanced';
    if (level >= 80) return isFr ? 'Opérationnel / Compétent' : 'Proficient';
    return isFr ? 'Notions' : 'Familiar';
  };

  return (
    <section id="skills" className="py-20 border-t border-slate-900 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-xs font-semibold text-blue-400 mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{isFr ? 'Boîte à Outils Technique' : 'Technical Stack'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {isFr ? 'Compétences Data Analyst & MEAL' : 'Data Analyst & MEAL Competencies'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {isFr
              ? 'Cycle complet de la donnée : collecte mobile KoboToolbox, modélisation SQL/BigQuery, analyse spatiale QGIS et tableaux de bord Power BI/Tableau.'
              : 'End-to-end data lifecycle: KoboToolbox mobile collection, SQL/BigQuery modeling, QGIS spatial analysis, and Power BI/Tableau visualization.'}
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isFr ? 'Filtrer les compétences...' : 'Filter skills...'}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">
              {isFr ? 'Aucune compétence ne correspond à vos critères.' : 'No skills matched your search criteria.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredSkills.map((skill, idx) => (
              <div
                key={idx}
                className="group p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 hover:bg-slate-900/90 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-xs font-mono font-semibold text-blue-400">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800/90 h-2 rounded-full overflow-hidden mb-2.5">
                  <div
                    className="bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="capitalize">{skill.category.replace('_', ' ')}</span>
                  <span className="font-medium text-slate-300">
                    {getProficiencyLabel(skill.level)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Highlights banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900/50 border border-blue-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {isFr ? 'Gouvernance de la Donnée & Éthique Humanitaire' : 'Data Governance & Humanitarian Ethics'}
              </h4>
              <p className="text-xs text-slate-400">
                {isFr 
                  ? 'Protection rigoureuse des données sensibles (VBG, protection de l\'enfance), protocoles d\'intégrité et redevabilité envers les populations affectées.'
                  : 'Rigorous sensitive data protection (GBV, child protection), integrity protocols, and accountability to affected populations.'}
              </p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-blue-600/30 text-blue-300 text-xs font-mono font-semibold whitespace-nowrap">
            {isFr ? 'Evidence-Based' : 'Evidence-Based'}
          </span>
        </div>

      </div>
    </section>
  );
};
