import React from 'react';
import { Language, PortfolioData } from '../types/portfolio';
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Briefcase, 
  CheckCircle, 
  LineChart, 
  Map, 
  ClipboardCheck, 
  Heart,
  Music,
  Activity,
  Trophy
} from 'lucide-react';

interface AboutSectionProps {
  portfolio: PortfolioData;
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ portfolio, lang }) => {
  const isFr = lang === 'fr';
  const p = portfolio.personal;

  const corePillars = [
    {
      icon: ClipboardCheck,
      title: isFr ? 'MEAL & Suivi-Évaluation' : 'MEAL & Impact Monitoring',
      desc: isFr 
        ? 'Conception de cadres logiques, formulaires XLSForm complexes sur KoboToolbox, indicateurs de santé publique et redevabilité envers les populations affectées (AAP).'
        : 'Designing logical frameworks, complex XLSForms on KoboToolbox, public health indicators, and accountability to affected populations (AAP).',
    },
    {
      icon: Map,
      title: isFr ? 'SIG & Cartographie QGIS' : 'GIS & Spatial Analytics',
      desc: isFr 
        ? 'Vectorisation de plus de 10 000 parcelles, géocodage, géoréférencement, analyses spatiales multicritères et cartes thématiques aux normes cartographiques.'
        : 'Vectorizing 10,000+ parcels, geocoding, georeferencing, multi-criteria spatial analysis, and publication-grade thematic cartography.',
    },
    {
      icon: LineChart,
      title: isFr ? 'Business Intelligence & Dataviz' : 'Business Intelligence & Dataviz',
      desc: isFr 
        ? 'Modélisation relationnelle Power BI (DAX, Power Query ETL), dashboards Tableau Public, requêtage Google BigQuery et Excel Avancé (TCD, formules matricielles).'
        : 'Relational Power BI modeling (DAX, Power Query ETL), Tableau Public dashboards, Google BigQuery SQL queries, and Advanced Excel modeling.',
    },
    {
      icon: User,
      title: isFr ? 'Coordination & Renforcement' : 'Coordination & Capacity Building',
      desc: isFr 
        ? 'Formation de plus de 100 agents et directeurs provinciaux, appui technique aux équipes terrain et coordination avec les clusters humanitaires et partenaires (LM International).'
        : 'Trained 100+ provincial civil servants and field agents, technical field support, and coordination with humanitarian clusters and partners (LM International).',
    },
  ];

  return (
    <section id="about" className="py-20 border-t border-slate-900 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-xs font-semibold text-blue-400 mb-3">
            <User className="w-3.5 h-3.5" />
            <span>{isFr ? 'Profil & Philosophie Analytique' : 'Professional Profile'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {isFr ? 'Profil Professionnel & Démarche MEAL' : 'Professional Profile & MEAL Approach'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {isFr
              ? 'Spécialiste en gestion de l\'information, SIG et analyse des données avec une solide expérience opérationnelle en contextes de crise humanitaire et de gouvernance en RDC.'
              : 'Information management, GIS, and data analytics specialist with solid field operational experience in humanitarian response and governance in the DRC.'}
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Story & Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4">
                {isFr ? 'Données de Qualité pour Décisions à Fort Impact' : 'Evidence-Based Data for Strategic Decisions'}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {p.about[lang]}
              </p>

              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isFr ? 'Cycle complet de la donnée garanti' : 'Full data lifecycle guaranteed'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isFr ? 'Protection stricte des données sensibles' : 'Strict sensitive data protection'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isFr ? 'Rapports d\'évaluation et SitReps' : 'Evaluation reports & SitReps'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isFr ? 'Prise de décision fondée sur les preuves' : 'Evidence-based decision making'}</span>
                </div>
              </div>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {corePillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/70 hover:border-slate-700 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-600/15 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5">{pillar.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Centres d'intérêt (Hobbies from CV) */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                {isFr ? 'Centres d\'Intérêt & Engagements Personnels' : 'Personal Interests & Activities'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <Music className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>{isFr ? 'Musique Polyphonique (piano, Handel)' : 'Polyphonic Music (piano, Handel)'}</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <Trophy className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{isFr ? 'Football (esprit d’équipe & tactique)' : 'Football (team spirit & tactics)'}</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <Activity className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>{isFr ? 'Course à pied & Jogging (endurance)' : 'Running & Jogging (endurance)'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info & Credentials Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                {isFr ? 'Informations & Disponibilité' : 'Profile & Availability'}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-xs">{isFr ? 'Nom Complet' : 'Full Name'}</span>
                    <span className="font-semibold text-white">{p.name}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-xs">{isFr ? 'Localisation' : 'Location'}</span>
                    <span className="font-semibold text-white">{p.contact.location || 'Katindo, Avenue de la Frontière, Goma, Nord-Kivu, RDC'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-xs">{isFr ? 'Téléphone' : 'Phone'}</span>
                    <span className="font-semibold text-white">{p.contact.phone || '+243 992 641 674'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-xs">Email</span>
                    <a href={`mailto:${p.contact.email}`} className="font-semibold text-blue-300 hover:text-blue-200 break-all">
                      {p.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-xs">{isFr ? 'Statut Professionnel' : 'Availability'}</span>
                    <span className="font-semibold text-emerald-400">
                      {isFr ? 'Disponible pour Missions & Contrats' : 'Available for Contracts & Roles'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-800">
                <a
                  href={`mailto:${p.contact.email}?subject=Opportunité%20Data%20Analyst%20/%20MEAL`}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow"
                >
                  <Mail className="w-4 h-4" />
                  <span>{isFr ? 'Contacter pour une Mission' : 'Contact for an Assignment'}</span>
                </a>
              </div>
            </div>

            {/* Strategic Quote Card */}
            <div className="p-5 rounded-xl bg-blue-950/20 border border-blue-800/40 text-xs text-blue-200 leading-relaxed italic">
              "{isFr 
                ? 'Une donnée sans contexte géographique et sans gouvernance d\'intégrité reste silencieuse. La transformer en levier d\'action humanitaire et de décision publique est notre mission quotidienne.'
                : 'Data without spatial context and integrity governance remains silent. Transforming it into a lever for humanitarian response and public decision is our daily commitment.'}"
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
