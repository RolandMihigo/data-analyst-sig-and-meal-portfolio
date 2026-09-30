import { PortfolioData } from '../types/portfolio';

export const defaultPortfolioData: PortfolioData = {
  personal: {
    name: 'Iragi Mihigo Roland',
    title: {
      fr: 'Spécialiste en Gestion de l\'Information, SIG, Analyse des Données & MEAL',
      en: 'Information Management (IM), GIS, Data Analyst & MEAL Specialist',
    },
    bio: {
      fr: 'Expert en gestion de l\'information (IM), analyse géospatiale (SIG) et suivi-évaluation (MEAL). Maîtrise complète du cycle de vie de la donnée : KoboToolbox/XLSForm, Power BI, SQL/BigQuery et QGIS en contextes humanitaires et de gouvernance.',
      en: 'Expert in Information Management (IM), geospatial analysis (GIS), and MEAL (Monitoring, Evaluation, Accountability and Learning). End-to-end data lifecycle mastery: KoboToolbox/XLSForm, Power BI, SQL/BigQuery, and QGIS in humanitarian and governance settings.',
    },
    about: {
      fr: 'Expert en gestion de l\'information (IM), analyse géospatiale (SIG) et modélisation de données, avec une expérience terrain confirmée dans le déploiement de solutions numériques en contextes de gouvernance, de santé publique et d\'interventions humanitaires en RDC. Maîtrise complète du cycle de vie de la donnée : collecte mobile sécurisée (KoboToolbox/XLSForm), structuration et automatisation de bases de données (MySQL, BigQuery), analyses spatiales multicritères (QGIS) et conception de tableaux de bord décisionnels interactifs (Power BI, Tableau, Excel Avancé). Rompu à la coordination avec les partenaires internationaux (LM International, clusters humanitaires, divisions provinciales), à l\'appui technique des équipes opérationnelles de terrain et à la gouvernance de la qualité, garantissant l\'intégrité, la confidentialité et l\'exploitation stratégique des données pour la prise de décision fondée sur les preuves (Evidence-Based Decision Making).',
      en: 'Specialist in Information Management (IM), geospatial analysis (GIS), and data modeling with proven field experience implementing digital solutions in governance, public health, and humanitarian response contexts in the DRC. Proven expertise across the entire data lifecycle: secure mobile data collection (KoboToolbox/XLSForm), database architecture (MySQL, BigQuery), multi-criteria spatial analysis (QGIS), and interactive BI dashboards (Power BI, Tableau, Advanced Excel). Experienced in liaising with international partners (LM International, humanitarian clusters, provincial divisions), training field operational teams, and enforcing data quality governance to ensure data integrity, confidentiality, and evidence-based strategic decision-making.',
    },
    avatarUrl: '/roland_photo.jpg',
    contact: {
      location: 'Katindo, Avenue de la Frontière, Goma, Nord-Kivu, RDC',
      phone: '+243 992 641 674',
      email: 'rolandiragimihigo851@gmail.com',
      linkedin: 'https://linkedin.com/in/roland-iragi',
      github: 'https://github.com/RolandMihigo',
      kaggle: 'https://kaggle.com/rolandiragi',
      website: 'https://roland-portfolio.dev',
    },
    availableForHire: true,
    yearsOfExperience: 4,
    projectsCompleted: 15,
    satisfiedClients: 12,
    hobbies: [
      {
        fr: 'Musique Polyphonique (piano, chant choral classique – Handel)',
        en: 'Polyphonic Music (piano, classical choral singing – Handel)',
      },
      {
        fr: 'Football (esprit d’équipe et sens tactique)',
        en: 'Football (team spirit and tactical thinking)',
      },
      {
        fr: 'Course à pied & Jogging (endurance et régularité)',
        en: 'Running & Jogging (endurance and consistency)',
      },
    ],
  },
  skills: [
    // Gestion de l'Information, MEAL & Analyse Décisionnelle
    { name: 'Cycle de Vie de la Donnée (Collecte, Nettoyage, Analyse)', level: 98, category: 'meal_analytics' },
    { name: 'Indicateurs MEAL, Cadres Logiques & KPIs de Suivi', level: 95, category: 'meal_analytics' },
    { name: 'Bulletins de Situation (SitReps) & Data Storytelling', level: 92, category: 'meal_analytics' },
    { name: 'Prise de Décision Fondée sur les Preuves (Evidence-Based)', level: 94, category: 'meal_analytics' },
    { name: 'Gestion Axée sur les Résultats (GAR) & Redevabilité (AAP)', level: 90, category: 'meal_analytics' },

    // SIG & Cartographie Géospatiale
    { name: 'QGIS Expert (Numérisation, Géocodage, Géoréférencement)', level: 95, category: 'sig_gis' },
    { name: 'Analyses Spatiales Multicritères & Cartes de Densité', level: 92, category: 'sig_gis' },
    { name: 'Croisement de Données Spatiales, Fiscales & Démographiques', level: 90, category: 'sig_gis' },
    { name: 'Normes & Standards Cartographiques Communicants', level: 88, category: 'sig_gis' },

    // Collecte Mobile & Enquêtes Terrain
    { name: 'KoboToolbox & KoboCollect Avancé', level: 96, category: 'kobo_field' },
    { name: 'Conception Formulaires XLSForm (Logique & Calculs)', level: 95, category: 'kobo_field' },
    { name: 'Supervision Terrain, Assurance Qualité & Nettoyage Live', level: 92, category: 'kobo_field' },
    { name: 'Formation & Encadrement Méthodologique des Enquêteurs', level: 94, category: 'kobo_field' },

    // Business Intelligence & Dataviz
    { name: 'Microsoft Power BI (DAX, Power Query ETL, Dataviz)', level: 94, category: 'bi_dataviz' },
    { name: 'Tableau Public & Desktop (Tableaux de bord interactifs)', level: 90, category: 'bi_dataviz' },
    { name: 'Excel Avancé (Formules Matricielles, XLOOKUP, TCD)', level: 95, category: 'bi_dataviz' },
    { name: 'Qlik Sense (Dashboards associatifs & suivi provincial)', level: 85, category: 'bi_dataviz' },

    // Bases de Données & Systèmes
    { name: 'SQL Avancé & Google BigQuery', level: 90, category: 'database_sql' },
    { name: 'MySQL & Microsoft Access', level: 88, category: 'database_sql' },
    { name: 'Pipelines d’Intégration ETL & Audits d’Intégrité', level: 86, category: 'database_sql' },
    { name: 'Développement Web (HTML5, CSS3, JavaScript)', level: 84, category: 'database_sql' },

    // Secteur Humanitaire & Gouvernance
    { name: 'Systèmes d’Information Sanitaire (CPN, Vaccination, Épidémio)', level: 92, category: 'humanitarian_gov' },
    { name: 'Protection des Données Sensibles & Éthique (VBG, Protection)', level: 94, category: 'humanitarian_gov' },
    { name: 'Coordination Clusters Humanitaires & ONG (LM International)', level: 90, category: 'humanitarian_gov' },

    // Langues
    { name: 'Français (Langue Maternelle)', level: 100, category: 'languages' },
    { name: 'Swahili (Langue Véhiculaire / Bilingue)', level: 100, category: 'languages' },
    { name: 'Lingala (Courant)', level: 90, category: 'languages' },
    { name: 'Anglais (Professionnel Courant - C1)', level: 88, category: 'languages' },
  ],
  projects: [
    {
      id: 'proj-cyclistic',
      title: {
        fr: 'Analyse des Comportements Usagers : Projet Cyclistic (Google Data Analytics)',
        en: 'User Behavior Analysis: Cyclistic Project (Google Data Analytics)',
      },
      shortDesc: {
        fr: 'Étude de cas analytique complète sur BigQuery, SQL et Tableau pour concevoir une stratégie marketing de conversion des usagers occasionnels en membres annuels.',
        en: 'Comprehensive data analytics case study leveraging Google BigQuery SQL and Tableau to formulate conversion marketing strategies from casual riders to annual members.',
      },
      fullDesc: {
        fr: 'Projet d\'analyse de données réalisé avec rigueur dans le cadre du Certificat Professionnel Google Data Analytics. Traitement de jeux de données massifs de millions de trajets cyclables : nettoyage et modélisation SQL sur Google BigQuery, analyses des variations temporelles et saisonnières, et élaboration de visualisations interactives sur Tableau Public et Kaggle.',
        en: 'In-depth data analytics project conducted under the Google Data Analytics Professional Certificate. Processed millions of bike trip records with Google BigQuery SQL data cleaning, seasonality trends extraction, and executive visualization dashboards deployed on Tableau Public and Kaggle.',
      },
      category: 'data_analysis',
      tags: ['Google BigQuery', 'SQL Avancé', 'Tableau Public', 'Kaggle', 'Data Storytelling'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://public.tableau.com',
      githubUrl: 'https://github.com/RolandMihigo',
      kaggleUrl: 'https://kaggle.com/rolandiragi',
      featured: true,
      metrics: {
        fr: 'Plus de 5 millions de trajets analysés avec requêtage BigQuery optimisé',
        en: '5M+ trip records analyzed with optimized BigQuery queries',
      },
      highlights: {
        fr: [
          'Nettoyage rigoureux des anomalies et calculs d\'indicateurs temporels clés sous SQL BigQuery',
          'Conception d\'un tableau de bord décisionnel interactif sur Tableau Public',
          'Recommandations stratégiques concrètes orientées conversion et ROI pour la direction',
        ],
        en: [
          'Rigorous anomaly sanitation and key temporal metrics engineering with BigQuery SQL',
          'Interactive decision dashboard designed and published on Tableau Public',
          'Actionable evidence-based conversion recommendations provided for leadership',
        ],
      },
    },
    {
      id: 'proj-meal-egov',
      title: {
        fr: 'Système Numérique MEAL & Santé Publique en RDC (eGov Africa & LM International)',
        en: 'Digital MEAL & Public Health Data Pipeline (eGov Africa & LM International)',
      },
      shortDesc: {
        fr: 'Architecture de gestion de l\'information humanitaire et suivi-évaluation pour la santé publique : CPN, couverture vaccinale et monitoring des VBG.',
        en: 'Humanitarian Information Management & MEAL pipeline for public health interventions: Antenatal care (ANC), vaccination coverage, and GBV monitoring.',
      },
      fullDesc: {
        fr: 'Déploiement d\'un écosystème MEAL complet pour des interventions de santé d\'urgence en RDC avec l\'appui de partenaires internationaux (LM International). Création de formulaires mobiles complexes XLSForm / KoboToolbox avec contraintes conditionnelles, consolidation automatisée, contrôle qualité continu et tableaux de bord Power BI pour les coordinations provinciales et clusters humanitaires.',
        en: 'Deployment of an end-to-end MEAL ecosystem for emergency public health interventions in the DRC supported by international partners (LM International). Complex XLSForm mobile design on KoboToolbox with skip logic, automated aggregation, live quality validation, and executive Power BI dashboards for provincial health divisions and humanitarian clusters.',
      },
      category: 'meal',
      tags: ['KoboToolbox', 'XLSForm', 'Power BI', 'MEAL', 'Santé Publique', 'Protection VBG'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://egov-africa.org',
      githubUrl: 'https://github.com/RolandMihigo',
      featured: true,
      metrics: {
        fr: 'Couverture opérationnelle multi-zones de santé et suivi en temps réel des indicateurs clés',
        en: 'Multi-health-zone operational coverage with real-time key indicator tracking',
      },
      highlights: {
        fr: [
          'Création de formulaires XLSForm complexes avec logique de saut et calculs embarqués pour enquêtes médicales',
          'Tableaux de bord Power BI d\'alerte précoce pour les acteurs d\'urgence',
          'Formation de plus de 100 agents de terrain sur la collecte sécurisée et la protection des données sensibles',
        ],
        en: [
          'Engineered complex XLSForms with dynamic skip logic and embedded validation for medical surveys',
          'Built early-warning Power BI dashboards for emergency humanitarian responders',
          'Trained 100+ field surveyors on secure mobile collection and sensitive data protection ethics',
        ],
      },
    },
    {
      id: 'proj-gis-verditra',
      title: {
        fr: 'Système d\'Information Géographique (SIG) & Dématérialisation Fiscale (Verditra SARLU)',
        en: 'Geographic Information System (GIS) & Tax Digitalization (Verditra SARLU)',
      },
      shortDesc: {
        fr: 'Vectorisation, géoréférencement et calcul spatial sous QGIS de plus de 10 000 parcelles couplés aux identifiants fiscaux des régies provinciales (DGRNK, DGRPI).',
        en: 'Vectorization, georeferencing, and spatial analysis of 10,000+ land parcels in QGIS linked to provincial revenue registry IDs (DGRNK, DGRPI).',
      },
      fullDesc: {
        fr: 'Coordination technique des opérations SIG et ICT pour la modernisation foncière et fiscale dans les provinces de l\'Ituri, Sud-Kivu et Kongo Central. Numérisation vectorielle de parcelles et bâtis sous QGIS, calculs de superficies géodésiques, croisement avec les bases relationnelles MySQL et production de cartographies thématiques pour l\'aide à la décision des gouvernements provinciaux.',
        en: 'Technical lead for GIS and ICT operations supporting land and tax modernization across Ituri, South Kivu, and Kongo Central provinces. Vector digitization of parcels and buildings in QGIS, geodetic area calculations, joins with MySQL relational databases, and thematic maps for provincial government decision-makers.',
      },
      category: 'gis',
      tags: ['QGIS', 'SIG & Cartographie', 'Géoréférencement', 'MySQL', 'Gouvernance Publique'],
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://verditra.com',
      githubUrl: 'https://github.com/RolandMihigo',
      featured: true,
      metrics: {
        fr: 'Plus de 10 000 parcelles numérisées et rattachées au cadastre fiscal',
        en: 'Over 10,000 parcels vectorized and mapped to provincial fiscal registers',
      },
      highlights: {
        fr: [
          'Vectorisation haute précision sous QGIS sur orthophotos et images satellites haute résolution',
          'Intégration ETL entre couches vectorielles spatiales et bases de données fiscales MySQL',
          'Production de cartes communicantes aux normes cartographiques pour les gouverneurs et régies',
        ],
        en: [
          'High-accuracy vectorization in QGIS from high-resolution orthophotos and satellite imagery',
          'ETL pipeline linking GIS spatial layers with provincial fiscal MySQL registries',
          'Produced publication-ready thematic maps for provincial governors and revenue directors',
        ],
      },
    },
    {
      id: 'proj-bi-dashboards',
      title: {
        fr: 'Tableaux de Bord Décisionnels des Recettes Publiques (Power BI, Tableau, Qlik Sense)',
        en: 'Provincial Revenue & Public Finance BI Dashboards (Power BI, Tableau, Qlik Sense)',
      },
      shortDesc: {
        fr: 'Plateforme décisionnelle interactive pour le suivi des recettes publiques provinciales avec modélisation relationnelle DAX et analyses comparatives.',
        en: 'Interactive executive BI platform tracking provincial public revenue collections with relational DAX modeling and comparative analytics.',
      },
      fullDesc: {
        fr: 'Conception et maintenance de tableaux de bord financiers pour les régies financières provinciales. Modélisation de données complexes, mesures DAX avancées, intégration ETL de données hétérogènes et automatisation des reportings pour les directeurs provinciaux.',
        en: 'Engineered and maintained executive financial dashboards for provincial revenue authorities. Complex data modeling, advanced DAX measures, heterogeneous data integration, and reporting automation for provincial leadership.',
      },
      category: 'bi',
      tags: ['Power BI', 'DAX', 'Power Query ETL', 'Qlik Sense', 'Excel Avancé'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      liveUrl: 'https://example.com/bi-dashboard',
      githubUrl: 'https://github.com/RolandMihigo',
      featured: false,
      metrics: {
        fr: 'Suivi dynamique de plus de 100 agents collecteurs et millions de dollars de recettes',
        en: 'Live monitoring of 100+ revenue agents and millions of dollars in collections',
      },
      highlights: {
        fr: [
          'Modélisation en étoile et mesures DAX optimisées pour calculs d\'écarts et prévisions budgétaires',
          'Formation et transfert de compétences auprès de plus de 100 agents et directeurs provinciaux',
          'Réduction drastique des délais de consolidation des rapports financiers de 2 semaines à 1 jour',
        ],
        en: [
          'Star schema relational modeling with DAX measures for budget variance analysis and projections',
          'Led capacity building and technology transfer workshops for 100+ provincial agents and directors',
          'Reduced financial consolidation cycles from 2 weeks down to under 24 hours',
        ],
      },
    },
  ],
  education: [
    {
      id: 'edu-iuea',
      degree: {
        fr: 'Licence en Informatique (Bachelor of Science in Computer Science)',
        en: 'Bachelor of Science in Computer Science',
      },
      institution: {
        fr: 'International University of East Africa (IUEA)',
        en: 'International University of East Africa (IUEA)',
      },
      period: '2021',
      location: {
        fr: 'Kampala, Ouganda',
        en: 'Kampala, Uganda',
      },
      description: {
        fr: 'Formation universitaire approfondie en sciences informatiques : modélisation de bases de données, structures de données et algorithmes, réseaux informatiques, développement logiciel et analyse de systèmes.',
        en: 'Rigorous computer science curriculum: database architecture, data structures & algorithms, computer networking, software development, and systems analysis.',
      },
      honors: {
        fr: 'Diplômé avec Succès — Spécialisation Données & Systèmes',
        en: 'Graduated — Data & Systems Specialization',
      },
    },
  ],
  certifications: [
    {
      id: 'cert-google-data',
      name: {
        fr: 'Google Data Analytics — Certificat Professionnel Analyse de Données',
        en: 'Google Data Analytics Professional Certificate',
      },
      issuer: 'Google / Coursera',
      year: '2023',
      credentialUrl: 'https://coursera.org',
      badge: 'Google Certified Data Analyst',
    },
    {
      id: 'cert-powerbi',
      name: {
        fr: 'Microsoft Power BI Data Analyst — Modélisation, Mesures DAX & Business Intelligence (PL-300)',
        en: 'Microsoft Power BI Data Analyst — DAX Modeling & BI (PL-300)',
      },
      issuer: 'Microsoft / Coursera',
      year: '2023',
      credentialUrl: 'https://coursera.org',
      badge: 'Power BI Analyst',
    },
    {
      id: 'cert-qgis',
      name: {
        fr: 'Map Fast with QGIS — Système d’Information Géographique (SIG)',
        en: 'Map Fast with QGIS — Geographic Information System (GIS)',
      },
      issuer: 'Coursera Project Network',
      year: '2023',
      credentialUrl: 'https://coursera.org',
      badge: 'GIS Specialist',
    },
    {
      id: 'cert-kobo',
      name: {
        fr: 'Complete KoboToolbox Training Course — Collecte Mobile Avancée, XLSForm & Enquêtes Terrain',
        en: 'Complete KoboToolbox Training Course — Advanced Mobile Data Collection & XLSForm',
      },
      issuer: 'Udemy',
      year: '2023',
      credentialUrl: 'https://udemy.com',
      badge: 'KoboToolbox Expert',
    },
    {
      id: 'cert-google-ai',
      name: {
        fr: 'Google AI — Spécialisation Intelligence Artificielle & Prompting',
        en: 'Google AI — Artificial Intelligence & Prompting Specialization',
      },
      issuer: 'Google / Coursera',
      year: '2024',
      credentialUrl: 'https://coursera.org',
      badge: 'Google AI Specialist',
    },
    {
      id: 'cert-excel',
      name: {
        fr: 'Excel Avancé pour l\'Analyse des Données — Modélisation, TCD & Fonctions Complexes',
        en: 'Advanced Excel for Data Analysis — Modeling, Pivot Tables & Complex Functions',
      },
      issuer: 'Horizon Services Consulting, Goma (RDC)',
      year: '2022',
      credentialUrl: '#',
      badge: 'Formation Certifiante sur Site (Goma)',
    },
    {
      id: 'cert-web',
      name: {
        fr: 'Responsive Web Design — Développement Web, Architecture & Interfaces Réactives',
        en: 'Responsive Web Design — Web Architecture & Responsive UIs',
      },
      issuer: 'freeCodeCamp',
      year: '2022',
      credentialUrl: 'https://freecodecamp.org',
      badge: 'Web Design Developer',
    },
  ],
  references: [
    {
      id: 'ref-1',
      name: 'Kitoko Bruno',
      role: {
        fr: 'Directeur Pays',
        en: 'Country Director',
      },
      organization: 'LM International',
      email: 'kitoko.bruno@lminternational.org',
      phone: '+243 995 462 548',
    },
    {
      id: 'ref-2',
      name: 'Joseph Baderha Kahunga',
      role: {
        fr: 'Branch Manager Sud-Kivu',
        en: 'South Kivu Branch Manager',
      },
      organization: 'Verditra SARLU',
      email: 'joseph@egov-africa.org',
      phone: '+243 995 462 548',
    },
    {
      id: 'ref-3',
      name: 'Chimène Fatuma wa Saidi',
      role: {
        fr: 'Directrice des Opérations',
        en: 'Operations Director',
      },
      organization: 'Verditra SARLU',
      email: 'chimene@egov-africa.org',
      phone: '+243 993 820 585',
    },
    {
      id: 'ref-4',
      name: 'Jacques Musumba',
      role: {
        fr: 'Coordonnateur Général',
        en: 'General Coordinator',
      },
      organization: 'eGov Africa',
      email: 'jacques@egov-africa.org',
      phone: '+243 992 641 674',
    },
  ],
  experience: [
    {
      id: 'exp-egov',
      role: {
        fr: 'Co-fondateur & Spécialiste des Données Humanitaires & MEAL',
        en: 'Co-Founder & Humanitarian Data / MEAL Specialist',
      },
      company: 'eGov Africa (Organisation Non Gouvernementale)',
      period: '2024 — Présent',
      location: {
        fr: 'Goma, RDC',
        en: 'Goma, DRC',
      },
      description: {
        fr: 'Architecture et déploiement de solutions numériques de gestion de l\'information pour le secteur de la santé publique et les acteurs d\'urgence en RDC, avec l\'appui de partenaires internationaux tels que LM International.',
        en: 'Architecting and deploying digital information management and MEAL solutions for public health and emergency responders in the DRC, supported by international partners like LM International.',
      },
      responsibilities: {
        fr: [
          'Conception de formulaires XLSForm complexes sur KoboToolbox pour la collecte mobile (consultations prénatales CPN, suivi vaccinal, monitoring des violences basées sur le genre - VBG).',
          'Consolidation, contrôle qualité et traitement analytique de jeux de données massifs pour alimenter les rapports opérationnels, bulletins d\'alerte et dashboards partenaires.',
          'Renforcement des capacités et encadrement technique des équipes et partenaires de terrain sur l\'utilisation des solutions numériques et la protection des données sensibles.',
          'Mise en place de mécanismes rigoureux de validation et d\'intégrité, assurant une disponibilité continue d\'indicateurs fiables pour la prise de décision humanitaire.',
          'Coordination stratégique avec les clusters humanitaires, les divisions provinciales de la santé et les parties prenantes institutionnelles.',
        ],
        en: [
          'Designed complex XLSForm surveys in KoboToolbox for mobile field collection (antenatal care ANC, immunization coverage, gender-based violence GBV monitoring).',
          'Consolidated, cleaned, and analyzed large-scale field datasets to feed operational SitReps, early-warning bulletins, and partner dashboards.',
          'Led technical capacity building for field personnel and partner teams on digital tools, data security, and sensitive data protection ethics.',
          'Enforced rigorous validation and data integrity workflows ensuring continuous availability of reliable indicators for humanitarian decision-making.',
          'Coordinated strategically with humanitarian clusters, provincial health divisions, and institutional stakeholders.',
        ],
      },
      technologies: ['KoboToolbox', 'XLSForm', 'Power BI', 'SQL', 'MEAL', 'Santé Publique', 'Gestion Axée Résultats'],
    },
    {
      id: 'exp-verditra',
      role: {
        fr: 'Assistant aux Opérations / ICT & GIS Officer',
        en: 'Operations Assistant / ICT & GIS Officer',
      },
      company: 'Verditra SARLU (Société de Services Numériques & Ingénierie)',
      period: 'Février 2022 — Janvier 2025',
      location: {
        fr: 'Ituri, Sud-Kivu, Kongo Central, RDC',
        en: 'Ituri, South Kivu, Kongo Central, DRC',
      },
      description: {
        fr: 'Coordination technique du déploiement de solutions de gouvernance électronique et de dématérialisation fiscale pour les régies provinciales (DGRNK, DGRPI, etc.).',
        en: 'Technical coordination of electronic governance and tax digitization systems for provincial revenue collection agencies (DGRNK, DGRPI, etc.).',
      },
      responsibilities: {
        fr: [
          'Expertise SIG sous QGIS : vectorisation, délimitation et calcul de superficie de plus de 10 000 parcelles et bâtis, couplés aux identifiants fiscaux et fonciers.',
          'Conception et alimentation de tableaux de bord analytiques dynamiques sous Power BI, Tableau et Qlik Sense pour le suivi des recettes publiques par les gouvernements provinciaux.',
          'Animation de sessions de formation et transfert de compétences auprès de plus de 100 agents et directeurs provinciaux.',
          'Supervision des bases de données relationnelles, optimisation des procédures d’intégration (ETL) et support technique de proximité.',
        ],
        en: [
          'GIS geospatial engineering with QGIS: vectorized, delineated, and calculated area for 10,000+ land parcels and buildings linked to fiscal IDs.',
          'Designed and maintained dynamic analytics dashboards in Power BI, Tableau, and Qlik Sense for provincial revenue tracking by governors.',
          'Conducted training workshops and technology transfer sessions for 100+ provincial civil servants, agents, and department directors.',
          'Supervised relational databases, optimized ETL integration scripts, and provided on-site technical user support.',
        ],
      },
      technologies: ['QGIS', 'Power BI', 'Tableau', 'Qlik Sense', 'MySQL', 'ETL', 'Gouvernance Publique'],
    },
    {
      id: 'exp-radiomaria',
      role: {
        fr: 'Technicien d\'Antenne & Support Systèmes',
        en: 'Broadcast Antenna Technician & Systems Support',
      },
      company: 'Radio Maria Bukavu (Réseau International de Radiodiffusion)',
      period: '2021 — 2022',
      location: {
        fr: 'Bukavu, Sud-Kivu, RDC',
        en: 'Bukavu, South Kivu, DRC',
      },
      description: {
        fr: 'Supervision technique des faisceaux hertziens d’émission et garantie de la continuité opérationnelle du signal de radiodiffusion.',
        en: 'Technical supervision of broadcast microwave transmission links and operational continuity maintenance for international radio broadcasting.',
      },
      responsibilities: {
        fr: [
          'Supervision technique des faisceaux hertziens d’émission et garantie de la continuité opérationnelle du signal de radiodiffusion.',
          'Maintenance préventive et curative du parc informatique, des consoles de mixage et des infrastructures réseau du studio.',
          'Résolution rapide des incidents d’antenne et assistance technique aux équipes de production.',
        ],
        en: [
          'Ensured uninterrupted radio transmission signal continuity across broadcast microwave radio relay antennas.',
          'Preventive and corrective hardware maintenance for computer workstations, audio mixing boards, and studio networks.',
          'Rapid resolution of antenna anomalies and real-time technical support for audio production teams.',
        ],
      },
      technologies: ['Faisceaux Hertziens', 'Réseaux & Télécoms', 'Maintenance Matérielle & Systèmes'],
    },
  ],
  blog: [
    {
      id: 'blog-meal',
      title: {
        fr: 'Le Rôle Vital du MEAL et de la Gestion de l\'Information dans les Réponses Humanitaires d\'Urgence',
        en: 'The Crucial Role of MEAL and Information Management in Humanitarian Emergency Response',
      },
      slug: 'meal-information-management-humanitarian',
      date: '2026-06-15',
      readTime: {
        fr: '7 min de lecture',
        en: '7 min read',
      },
      category: {
        fr: 'MEAL & Secteur Humanitaire',
        en: 'MEAL & Humanitarian Sector',
      },
      excerpt: {
        fr: 'Comment structurer des mécanismes de redevabilité (AAP), concevoir des indicateurs fiables sur KoboToolbox et piloter la prise de décision humanitaire fondée sur les preuves en RDC.',
        en: 'How to structure accountability mechanisms (AAP), design robust survey indicators on KoboToolbox, and enable evidence-based humanitarian decision-making in the DRC.',
      },
      content: {
        fr: `### L'Urgence d'une Décision Fondée sur les Preuves

Dans les contextes d'urgence et de déplacement de populations en République Démocratique du Congo, chaque heure compte. Déployer une aide humanitaire efficace ne peut reposer sur de simples intuitions : elle exige des données vérifiées, intègres et opportunes.

#### 1. Concevoir des Formulaires KoboToolbox / XLSForm Inviolables
Un bon système MEAL commence dès la conception du formulaire de collecte :
- **Contraintes et calculs embarqués :** Éviter les erreurs de saisie sur le terrain (validation des âges, cohérence vaccinale, vérification croisée des coordonnées GPS).
- **Logique conditionnelle (Skip Logic) :** Adapter le questionnaire à la situation spécifique du ménage sans alourdir le temps d'administration.
- **Protection des données sensibles :** Appliquer des protocoles stricts de confidentialité lors de la collecte d'informations critiques (notamment sur les violences basées sur le genre - VBG).

#### 2. La Redevabilité envers les Populations Affectées (AAP)
Le système MEAL ne sert pas uniquement à satisfaire les exigences des bailleurs de fonds. Il constitue le canal privilégié par lequel les bénéficiaires expriment leurs besoins réels, leurs réclamations et leurs retours d'expérience. En intégrant des mécanismes continus de rétroaction, les acteurs humanitaires adaptent leurs interventions en temps réel.

#### Conclusion
Associer une collecte mobile sécurisée à des tableaux de bord Power BI d'alerte précoce permet aux clusters et coordinateurs de sauver des vies en orientant les ressources là où les besoins sont les plus criants.`,
        en: `### The Urgency of Evidence-Based Humanitarian Decisions

In acute emergency settings and displacement crises in the Democratic Republic of the Congo, every minute matters. Directing humanitarian assistance effectively cannot rely on guesswork: it demands verified, intact, and timely field data.

#### 1. Designing Resilient KoboToolbox / XLSForm Questionnaires
An effective MEAL pipeline begins at the questionnaire design phase:
- **Embedded validation & constraints:** Preventing field surveyor typos (age plausibility, vaccination consistency, GPS coordinate checks).
- **Dynamic skip logic:** Tailoring questions dynamically based on household conditions without lengthening interview fatigue.
- **Sensitive data protection:** Enforcing strict confidentiality protocols when capturing sensitive protection indicators (especially Gender-Based Violence - GBV).

#### 2. Accountability to Affected Populations (AAP)
A MEAL framework does not exist merely to satisfy donor compliance. It serves as the primary channel through which affected communities voice complaints, feedback, and emerging vulnerabilities. By embedding continuous feedback loops, humanitarian responders pivot resources dynamically.

#### Conclusion
Coupling secure mobile collection with executive early-warning Power BI dashboards empowers humanitarian clusters to direct lifesaving interventions exactly where vulnerability is highest.`,
      },
      tags: ['MEAL', 'KoboToolbox', 'XLSForm', 'Humanitaire RDC', 'Protection des Données'],
      author: 'Iragi Mihigo Roland',
    },
    {
      id: 'blog-gis',
      title: {
        fr: 'QGIS et Analyse Géospatiale pour la Gouvernance Foncière et la Fiscalité Locale',
        en: 'QGIS & Spatial Analytics for Land Cadastre Governance and Local Taxation',
      },
      slug: 'qgis-spatial-analytics-cadastre-governance',
      date: '2026-04-10',
      readTime: {
        fr: '6 min de lecture',
        en: '6 min read',
      },
      category: {
        fr: 'SIG & Cartographie Géospatiale',
        en: 'GIS & Geospatial Analysis',
      },
      excerpt: {
        fr: 'Retour d\'expérience sur la vectorisation et le géoréférencement de plus de 10 000 parcelles sous QGIS pour moderniser les régies financières provinciales (DGRNK, DGRPI).',
        en: 'Lessons learned vectorizing and georeferencing over 10,000 land parcels in QGIS to modernize provincial revenue collection in the DRC.',
      },
      content: {
        fr: `### Le Défi de la Dématérialisation Fiscale et Foncière

Dans de nombreuses provinces de la RDC, l'identification fiscale des contribuables fonciers souffrait de registres physiques incomplets ou obsolètes. L'introduction du Système d'Information Géographique (SIG) a révolutionné la transparence et l'efficacité de la collecte des recettes publiques.

#### 1. Méthodologie de Vectorisation Haute Précision sous QGIS
- **Orthophotos et imagerie satellitaire :** Calage précis des limites parcellaires et des bâtis.
- **Attribution d'identifiants uniques :** Liaison directe entre les polygones parcellaires et les numéros d'immatriculation fiscale des régies (DGRNK, DGRPI).
- **Calculs géodésiques automatisés :** Détermination exacte des superficies pour la juste taxation selon les barèmes légaux provinciaux.

#### 2. Croisement Spatial et Bases Relationnelles
En reliant les couches vectorielles SHP/GeoJSON à des bases de données relationnelles MySQL via des pipelines ETL, les régies peuvent visualiser instantanément :
- Les zones géographiques à fort potentiel fiscal inexploré.
- Le taux de recouvrement par quartier et par commune.
- La distribution spatiale des activités économiques et des titres fonciers.

#### Résultat
Une amélioration mesurable des recettes provinciales, une réduction des litiges fonciers et une gouvernance publique renforcée par des cartes communicantes de haute qualité.`,
        en: `### The Challenge of Modernizing Land Taxation

Across several DRC provinces, fiscal identification of landholders historically suffered from fragmented or outdated manual paper registries. Introducing modern Geographic Information Systems (GIS) transformed transparency and revenue mobilization.

#### 1. High-Accuracy Vectorization Workflow in QGIS
- **Orthophotos & high-resolution satellite imagery:** Accurate delineation of land parcels and building footprints.
- **Unique identifier joins:** Direct foreign-key links between spatial polygons and provincial tax identification numbers (DGRNK, DGRPI).
- **Automated geodetic area computation:** Exact area calculations for fair tax assessment based on provincial rate tiers.

#### 2. Intersecting Spatial Layers with Relational Databases
Connecting SHP/GeoJSON layers with MySQL databases through automated ETL pipelines gave provincial authorities instant spatial visibility into:
- High-potential urban tax districts with low compliance.
- Recovery rate heatmaps by neighborhood and municipality.
- Spatial dispersion of economic activities and land titles.

#### Impact
A substantial surge in public revenues, reduction in boundary disputes, and strengthened governance powered by communicative thematic maps.`,
      },
      tags: ['QGIS', 'SIG', 'Cartographie', 'Gouvernance Foncière', 'DGRNK'],
      author: 'Iragi Mihigo Roland',
    },
    {
      id: 'blog-powerbi',
      title: {
        fr: 'Data Storytelling avec Power BI et DAX : Transformer des Millions de Lignes en Décisions Stratégiques',
        en: 'Data Storytelling with Power BI and DAX: Turning Millions of Rows into Strategic Decisions',
      },
      slug: 'power-bi-dax-data-storytelling-decisions',
      date: '2026-02-28',
      readTime: {
        fr: '5 min de lecture',
        en: '5 min read',
      },
      category: {
        fr: 'Business Intelligence & Dataviz',
        en: 'Business Intelligence & Dataviz',
      },
      excerpt: {
        fr: 'Comment structurer des modèles de données relationnels performants, écrire des mesures DAX optimisées et concevoir des infographies qui captivent les décideurs.',
        en: 'How to architect high-performance relational star schemas, write optimized DAX measures, and design executive dashboards that drive action.',
      },
      content: {
        fr: `### Au-delà du Simple Graphique : Le Pouvoir du Data Storytelling

Collecter des millions de points de données ne sert à rien si les décideurs ne peuvent pas en saisir le sens en moins de 5 secondes. En tant que Data Analyst, notre rôle est de traduire la complexité statistique en un récit visuel clair et orienté vers l'action.

#### 1. Les Fondations : Modélisation en Étoile (Star Schema)
Avant d'écrire la moindre formule DAX, la disposition des tables de faits et des tables de dimensions conditionne à la fois la rapidité du calcul et la fluidité de l'interface utilisateur. Un modèle dénormalisé correctement permet à Power Query et au moteur VertiPaq de répondre instantanément.

#### 2. La Puissance des Mesures DAX
- Utilisation de \`CALCULATE\` avec modificateurs de filtre stricts pour les comparaisons annuelles (Year-over-Year).
- Mesures dynamiques de prévision budgétaire et suivi de réalisation des indicateurs de performance (KPIs).

#### 3. Principes Visuels pour Dirigeants
- Règle des 3 secondes : l'information clé (KPI global) doit sauter aux yeux immédiatement en haut à gauche.
- Palette sobre et contrastée pour mettre en évidence les alertes sans surcharger l'attention.
- Filtres synchronisés pour permettre aux directeurs de zoomer du niveau provincial au niveau opérationnel en un clic.`,
        en: `### Beyond Charts: The Power of Executive Data Storytelling

Gathering millions of data points is meaningless if decision-makers cannot grasp the insight within 5 seconds. As a Data Analyst, our duty is translating statistical complexity into a clean, compelling narrative that prompts action.

#### 1. The Core Foundation: Relational Star Schema
Before writing any DAX measure, structuring clean fact and dimension tables dictates both calculation performance and UX responsiveness. A disciplined star schema unlocks instant memory evaluation in the VertiPaq engine.

#### 2. Advanced DAX Calculations
- Leveraging \`CALCULATE\` with clean filter context overrides for Year-over-Year (YoY) variances.
- Dynamic performance tracking against planned humanitarian and fiscal KPI milestones.

#### 3. Visual Ergonomics for Decision-Makers
- The 3-second rule: the top-line KPI must be immediately legible at the upper left.
- Restrained, purposeful color palettes directing attention directly to outliers and alerts.
- Synchronized drill-downs letting executives transition from macro provincial trends down to field operational units in one click.`,
      },
      tags: ['Power BI', 'DAX', 'Business Intelligence', 'Dataviz', 'KPIs'],
      author: 'Iragi Mihigo Roland',
    },
  ],
};
