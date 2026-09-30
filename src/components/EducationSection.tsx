import React, { useState } from 'react';
import { 
  Language, 
  EducationItem, 
  ExperienceItem, 
  CertificationItem, 
  ReferenceItem 
} from '../types/portfolio';
import { 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Users, 
  ExternalLink, 
  Mail, 
  Phone 
} from 'lucide-react';

interface EducationSectionProps {
  education: EducationItem[];
  experience: ExperienceItem[];
  certifications?: CertificationItem[];
  references?: ReferenceItem[];
  lang: Language;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  experience,
  certifications = [],
  references = [],
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'certifications' | 'references'>('experience');
  const isFr = lang === 'fr';

  return (
    <section id="education" className="py-20 border-t border-slate-900 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-xs font-semibold text-blue-400 mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{isFr ? 'Parcours Professionnel & Certifications' : 'Career & Academic Pathway'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {isFr ? 'Expériences, Formations & Références' : 'Experience, Education & References'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {isFr
              ? 'Interventions de terrain en RDC (eGov Africa, Verditra, LM International), diplôme universitaire en informatique et 7 certifications professionnelles.'
              : 'Field assignments across the DRC (eGov Africa, Verditra, LM International), computer science university degree, and 7 professional certifications.'}
          </p>
        </div>

        {/* 4 Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-inner gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'experience'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>{isFr ? 'Expérience Terrain' : 'Field Experience'}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-blue-950 text-blue-300 text-[10px]">
                {experience.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'education'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{isFr ? 'Formation Académique' : 'Academic Degree'}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-blue-950 text-blue-300 text-[10px]">
                {education.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('certifications')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'certifications'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isFr ? 'Certifications (7)' : 'Certifications (7)'}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-blue-950 text-blue-300 text-[10px]">
                {certifications.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('references')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'references'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{isFr ? 'Références (4)' : 'References (4)'}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-blue-950 text-blue-300 text-[10px]">
                {references.length}
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          
          {/* 1. Expériences */}
          {activeTab === 'experience' && (
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-5 before:w-0.5 before:bg-slate-800">
              {experience.map((item) => (
                <div key={item.id} className="relative pl-10 sm:pl-14 group">
                  <div className="absolute left-1.5 sm:left-3 top-1 w-5 h-5 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all shadow-lg space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                          {item.role[lang]}
                        </h3>
                        <div className="text-sm font-semibold text-blue-400 flex items-center gap-1.5 mt-0.5">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{item.company}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{item.period}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{item.location[lang]}</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {item.description[lang]}
                    </p>

                    {item.responsibilities && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                          {isFr ? 'Missions & Réalisations Clés' : 'Key Responsibilities & Impact'}
                        </span>
                        {item.responsibilities[lang].map((resp, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span>{resp}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                        {item.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-blue-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. Formation Académique */}
          {activeTab === 'education' && (
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-5 before:w-0.5 before:bg-slate-800">
              {education.map((item) => (
                <div key={item.id} className="relative pl-10 sm:pl-14 group">
                  <div className="absolute left-1.5 sm:left-3 top-1 w-5 h-5 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center group-hover:scale-125 transition-transform duration-200">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all shadow-lg space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                          {item.degree[lang]}
                        </h3>
                        <div className="text-sm font-semibold text-blue-400 flex items-center gap-1.5 mt-0.5">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{item.institution[lang]}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{item.period}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{item.location[lang]}</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {item.description[lang]}
                    </p>

                    {item.honors && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                        <Award className="w-3.5 h-3.5" />
                        <span>{item.honors[lang]}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. Certifications (7) */}
          {activeTab === 'certifications' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-950/80 border border-blue-800/60 text-blue-300 text-[11px] font-semibold">
                        {cert.badge || cert.issuer}
                      </span>
                      {cert.year && (
                        <span className="text-[11px] font-mono text-slate-500">{cert.year}</span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {cert.name[lang]}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">{cert.issuer}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/70 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{isFr ? 'Certifié Vérifié' : 'Verified Credential'}</span>
                    </span>
                    {cert.credentialUrl && cert.credentialUrl !== '#' && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1"
                      >
                        <span>{isFr ? 'Vérifier' : 'Verify'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. Références Professionnelles (4) */}
          {activeTab === 'references' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {references.map((ref) => (
                <div
                  key={ref.id}
                  className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
                >
                  <div>
                    <h4 className="text-base font-bold text-white">{ref.name}</h4>
                    <div className="text-xs font-semibold text-blue-400 mt-0.5">{ref.role[lang]}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{ref.organization}</div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                    <a
                      href={`mailto:${ref.email}`}
                      className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                      <span className="truncate">{ref.email}</span>
                    </a>
                    <a
                      href={`tel:${ref.phone}`}
                      className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                      <span>{ref.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
