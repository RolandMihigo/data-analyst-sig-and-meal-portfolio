import { PortfolioData, Language } from '../types/portfolio';
import { defaultPortfolioData } from '../data/defaultPortfolio';
import { ROLAND_PHOTO_BASE64 } from '../data/photo_base64';

const STORAGE_KEY = 'iragi_mihigo_portfolio_v3';

export function getSavedPortfolio(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.personal && parsed.skills && parsed.projects) {
        return normalizeParsedData(parsed);
      }
    }
  } catch (err) {
    console.warn('Failed to load portfolio from localStorage:', err);
  }
  return defaultPortfolioData;
}

export function savePortfolio(data: PortfolioData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed to save portfolio to localStorage:', err);
  }
}

export function resetToDefaultPortfolio(): PortfolioData {
  localStorage.removeItem(STORAGE_KEY);
  return defaultPortfolioData;
}

export async function parseResumeWithAI(params: {
  text?: string;
  fileBase64?: string;
  mimeType?: string;
  filename?: string;
}): Promise<PortfolioData> {
  try {
    const response = await fetch('/api/parse-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorJson = await response.json().catch(() => ({}));
      throw new Error(errorJson.error || `Server returned ${response.status}`);
    }

    const json = await response.json();
    if (json.data && json.data.personal) {
      return normalizeParsedData(json.data);
    }
    throw new Error('Invalid portfolio payload from server');
  } catch (err: any) {
    console.warn('AI Parsing error, attempting heuristic parsing:', err);
    if (params.text) {
      return fallbackTextParser(params.text, params.filename);
    }
    throw err;
  }
}

// Normalize and validate parsed data from AI to ensure all required fields exist
export function normalizeParsedData(raw: any): PortfolioData {
  const def = defaultPortfolioData;
  return {
    personal: {
      name: raw.personal?.name || def.personal.name,
      title: {
        fr: raw.personal?.title?.fr || raw.personal?.title || def.personal.title.fr,
        en: raw.personal?.title?.en || raw.personal?.title || def.personal.title.en,
      },
      bio: {
        fr: raw.personal?.bio?.fr || raw.personal?.bio || def.personal.bio.fr,
        en: raw.personal?.bio?.en || raw.personal?.bio || def.personal.bio.en,
      },
      about: {
        fr: raw.personal?.about?.fr || raw.personal?.about || def.personal.about.fr,
        en: raw.personal?.about?.en || raw.personal?.about || def.personal.about.en,
      },
      avatarUrl: raw.personal?.avatarUrl || def.personal.avatarUrl,
      contact: {
        email: raw.personal?.contact?.email || raw.personal?.email || def.personal.contact.email,
        phone: raw.personal?.contact?.phone || raw.personal?.phone || def.personal.contact.phone,
        location: raw.personal?.contact?.location || raw.personal?.location || def.personal.contact.location,
        linkedin: raw.personal?.contact?.linkedin || raw.personal?.linkedin || def.personal.contact.linkedin,
        github: raw.personal?.contact?.github || raw.personal?.github || def.personal.contact.github,
        kaggle: raw.personal?.contact?.kaggle || raw.personal?.kaggle || def.personal.contact.kaggle,
        twitter: raw.personal?.contact?.twitter || raw.personal?.twitter || def.personal.contact.twitter,
        website: raw.personal?.contact?.website || raw.personal?.website || def.personal.contact.website,
      },
      availableForHire: raw.personal?.availableForHire ?? true,
      yearsOfExperience: raw.personal?.yearsOfExperience || def.personal.yearsOfExperience,
      projectsCompleted: raw.personal?.projectsCompleted || (Array.isArray(raw.projects) ? raw.projects.length + 10 : def.personal.projectsCompleted),
      satisfiedClients: raw.personal?.satisfiedClients || def.personal.satisfiedClients,
      hobbies: Array.isArray(raw.personal?.hobbies) ? raw.personal.hobbies : def.personal.hobbies,
    },
    skills: Array.isArray(raw.skills) && raw.skills.length > 0 ? raw.skills.map((s: any, idx: number) => ({
      name: typeof s === 'string' ? s : s.name || `Compétence ${idx + 1}`,
      level: typeof s === 'object' && s.level ? s.level : 88,
      category: typeof s === 'object' && s.category ? s.category : 'meal_analytics',
    })) : def.skills,
    projects: Array.isArray(raw.projects) && raw.projects.length > 0 ? raw.projects.map((p: any, idx: number) => ({
      id: p.id || `proj-${idx + 1}`,
      title: {
        fr: p.title?.fr || p.title || `Projet ${idx + 1}`,
        en: p.title?.en || p.title || `Project ${idx + 1}`,
      },
      shortDesc: {
        fr: p.shortDesc?.fr || p.shortDesc || p.description?.fr || p.description || 'Solution d\'analyse de données et d\'évaluation d\'impact.',
        en: p.shortDesc?.en || p.shortDesc || p.description?.en || p.description || 'Data analytics and impact monitoring solution.',
      },
      fullDesc: {
        fr: p.fullDesc?.fr || p.fullDesc || p.shortDesc?.fr || 'Développé pour garantir une prise de décision fondée sur les preuves.',
        en: p.fullDesc?.en || p.fullDesc || p.shortDesc?.en || 'Designed to ensure evidence-based decision making.',
      },
      category: p.category || (idx % 2 === 0 ? 'meal' : 'data_analysis'),
      tags: Array.isArray(p.tags) && p.tags.length > 0 ? p.tags : ['KoboToolbox', 'Power BI', 'SQL', 'QGIS'],
      image: p.image || def.projects[idx % def.projects.length]?.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      liveUrl: p.liveUrl || 'https://example.com',
      githubUrl: p.githubUrl || 'https://github.com/RolandMihigo',
      kaggleUrl: p.kaggleUrl,
      featured: p.featured ?? (idx < 3),
      metrics: {
        fr: p.metrics?.fr || p.metrics || 'Indicateurs vérifiés et rapportés avec précision',
        en: p.metrics?.en || p.metrics || 'Verified metrics reported with high precision',
      },
      highlights: {
        fr: Array.isArray(p.highlights?.fr) ? p.highlights.fr : ['Collecte de données sécurisée', 'Visualisation et modélisation décisionnelle'],
        en: Array.isArray(p.highlights?.en) ? p.highlights.en : ['Secure mobile data collection', 'Decision modeling and visualization'],
      },
    })) : def.projects,
    education: Array.isArray(raw.education) && raw.education.length > 0 ? raw.education.map((e: any, idx: number) => ({
      id: e.id || `edu-${idx + 1}`,
      degree: {
        fr: e.degree?.fr || e.degree || 'Licence en Informatique',
        en: e.degree?.en || e.degree || 'Bachelor of Science in Computer Science',
      },
      institution: {
        fr: e.institution?.fr || e.institution || 'International University of East Africa (IUEA)',
        en: e.institution?.en || e.institution || 'International University of East Africa (IUEA)',
      },
      period: e.period || '2021',
      location: {
        fr: e.location?.fr || e.location || 'Kampala, Ouganda',
        en: e.location?.en || e.location || 'Kampala, Uganda',
      },
      description: {
        fr: e.description?.fr || e.description || 'Formation universitaire en sciences informatiques, bases de données et modélisation.',
        en: e.description?.en || e.description || 'University education in computer science, databases and data modeling.',
      },
      honors: {
        fr: e.honors?.fr || e.honors || 'Diplômé avec Succès',
        en: e.honors?.en || e.honors || 'Graduated Successfully',
      },
    })) : def.education,
    certifications: Array.isArray(raw.certifications) && raw.certifications.length > 0 ? raw.certifications.map((c: any, idx: number) => ({
      id: c.id || `cert-${idx + 1}`,
      name: {
        fr: c.name?.fr || c.name || `Certification ${idx + 1}`,
        en: c.name?.en || c.name || `Certificate ${idx + 1}`,
      },
      issuer: c.issuer || 'Organisme Certifiant',
      year: c.year || '2023',
      credentialUrl: c.credentialUrl || '#',
      badge: c.badge || 'Certifié',
    })) : def.certifications,
    references: Array.isArray(raw.references) && raw.references.length > 0 ? raw.references.map((r: any, idx: number) => ({
      id: r.id || `ref-${idx + 1}`,
      name: r.name || 'Référence Professionnelle',
      role: {
        fr: r.role?.fr || r.role || 'Responsable',
        en: r.role?.en || r.role || 'Lead',
      },
      organization: r.organization || 'Organisation',
      email: r.email || '',
      phone: r.phone || '',
    })) : def.references,
    experience: Array.isArray(raw.experience) && raw.experience.length > 0 ? raw.experience.map((exp: any, idx: number) => ({
      id: exp.id || `exp-${idx + 1}`,
      role: {
        fr: exp.role?.fr || exp.role || 'Spécialiste Données',
        en: exp.role?.en || exp.role || 'Data Specialist',
      },
      company: exp.company || 'Organisation',
      period: exp.period || '2022 — Présent',
      location: {
        fr: exp.location?.fr || exp.location || 'RDC',
        en: exp.location?.en || exp.location || 'DRC',
      },
      description: {
        fr: exp.description?.fr || exp.description || 'Gestion de l\'information, analyses et coordination terrain.',
        en: exp.description?.en || exp.description || 'Information management, analytics and field coordination.',
      },
      responsibilities: {
        fr: Array.isArray(exp.responsibilities?.fr) ? exp.responsibilities.fr : ['Supervision de la collecte et contrôle qualité'],
        en: Array.isArray(exp.responsibilities?.en) ? exp.responsibilities.en : ['Data collection oversight and quality control'],
      },
      technologies: Array.isArray(exp.technologies) ? exp.technologies : ['KoboToolbox', 'Power BI', 'SQL', 'QGIS'],
    })) : def.experience,
    blog: Array.isArray(raw.blog) && raw.blog.length > 0 ? raw.blog.map((b: any, idx: number) => ({
      id: b.id || `blog-${idx + 1}`,
      title: {
        fr: b.title?.fr || b.title || 'Publication Analytique',
        en: b.title?.en || b.title || 'Analytical Publication',
      },
      slug: b.slug || `post-${idx + 1}`,
      date: b.date || '2026',
      readTime: {
        fr: b.readTime?.fr || b.readTime || '6 min de lecture',
        en: b.readTime?.en || b.readTime || '6 min read',
      },
      category: {
        fr: b.category?.fr || b.category || 'Analyse de Données & MEAL',
        en: b.category?.en || b.category || 'Data Analytics & MEAL',
      },
      excerpt: {
        fr: b.excerpt?.fr || b.excerpt || 'Méthodes et retours d\'expérience sur la gestion de données.',
        en: b.excerpt?.en || b.excerpt || 'Methodologies and field feedback on data management.',
      },
      content: {
        fr: b.content?.fr || b.content || 'Analyse détaillée et mise en œuvre pratique.',
        en: b.content?.en || b.content || 'Detailed analysis and practical implementation.',
      },
      tags: Array.isArray(b.tags) ? b.tags : ['MEAL', 'KoboToolbox', 'Power BI'],
      author: raw.personal?.name || def.personal.name,
    })) : def.blog,
  };
}

// Client-side fallback text parser in case of offline or server issue
export function fallbackTextParser(text: string, filename?: string): PortfolioData {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i);
  const phoneMatch = text.match(/(\+?[0-9]{1,3}[-.\s]?)?(\(?[0-9]{3}\)?[-.\s]?)?[0-9]{3}[-.\s]?[0-9]{4,6}/);
  const linkedinMatch = text.match(/(https?:\/\/(?:www\.)?linkedin\.com\/[^\s]+)/i);
  const githubMatch = text.match(/(https?:\/\/(?:www\.)?github\.com\/[^\s]+)/i);

  const possibleName = lines[0] && lines[0].length < 40 && !lines[0].includes('@') 
    ? lines[0] 
    : defaultPortfolioData.personal.name;

  const def = defaultPortfolioData;
  return {
    ...def,
    personal: {
      ...def.personal,
      name: possibleName,
      contact: {
        ...def.personal.contact,
        email: emailMatch ? emailMatch[1] : def.personal.contact.email,
        phone: phoneMatch ? phoneMatch[0] : def.personal.contact.phone,
        linkedin: linkedinMatch ? linkedinMatch[1] : def.personal.contact.linkedin,
        github: githubMatch ? githubMatch[1] : def.personal.contact.github,
      },
    },
  };
}

// Generate standalone pure HTML5/CSS/JS file (Defaults to French, fully self-contained for GitHub Pages)
export function generatePureHtmlCssJs(portfolio: PortfolioData, initialLang: Language = 'fr'): string {
  const p = portfolio.personal;
  const avatar = ROLAND_PHOTO_BASE64 || p.avatarUrl || '/roland_photo.jpg';
  const portfolioJson = JSON.stringify(portfolio).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="${initialLang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title id="doc-title">${p.name} — ${p.title[initialLang]}</title>
  <meta name="description" id="doc-desc" content="${p.bio[initialLang]}">
  <meta property="og:title" content="${p.name} — ${p.title[initialLang]}">
  <meta property="og:description" content="${p.bio[initialLang]}">
  <meta property="og:type" content="website">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090d16;
      --card-bg: #111827;
      --card-border: #1f293d;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --accent: #2563eb;
      --accent-hover: #1d4ed8;
      --accent-glow: rgba(37, 99, 235, 0.25);
      --font: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font);
      line-height: 1.6;
      padding-bottom: 80px;
    }
    a { color: inherit; text-decoration: none; }
    .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
    
    header {
      position: sticky; top: 0; z-index: 100;
      backdrop-filter: blur(12px);
      background: rgba(9, 13, 22, 0.9);
      border-bottom: 1px solid var(--card-border);
    }
    .nav-inner {
      display: flex; justify-content: space-between; align-items: center; height: 70px;
    }
    .logo { font-size: 1.15rem; font-weight: 800; letter-spacing: -0.5px; }
    .logo span { color: #60a5fa; }
    nav ul { display: flex; list-style: none; gap: 20px; }
    nav a { color: var(--text-muted); font-size: 0.9rem; font-weight: 500; transition: color 0.2s; }
    nav a:hover { color: #fff; }
    .lang-btn {
      background: #1f293d; border: 1px solid #374151; color: #fff; padding: 6px 14px;
      border-radius: 8px; font-weight: 700; cursor: pointer; transition: all 0.2s; font-size: 0.85rem;
    }
    .lang-btn:hover { background: var(--accent); border-color: var(--accent); }

    .hero { padding: 80px 0 60px; text-align: center; }
    .avatar {
      width: 140px; height: 140px; border-radius: 50%; object-fit: cover;
      border: 3px solid #3b82f6; box-shadow: 0 0 35px rgba(59, 130, 246, 0.35);
      margin-bottom: 20px;
    }
    .badge {
      display: inline-block; background: rgba(34, 197, 94, 0.15); color: #4ade80;
      border: 1px solid rgba(34, 197, 94, 0.3); padding: 5px 16px; border-radius: 20px;
      font-size: 0.85rem; font-weight: 600; margin-bottom: 16px;
    }
    h1 { font-size: 2.8rem; font-weight: 800; letter-spacing: -1px; margin-bottom: 8px; }
    .hero-title { font-size: 1.3rem; color: #93c5fd; font-weight: 600; margin-bottom: 18px; max-width: 800px; margin-left: auto; margin-right: auto; }
    .hero-bio { max-width: 760px; margin: 0 auto 28px; color: var(--text-muted); font-size: 1.05rem; }
    .contact-pills { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; margin-bottom: 30px; font-size: 0.88rem; color: #9ca3af; }
    .contact-pills span { background: #111827; border: 1px solid #1f293d; padding: 6px 14px; border-radius: 8px; }
    .btn-group { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }
    .btn {
      padding: 12px 26px; border-radius: 10px; font-weight: 600; font-size: 0.95rem;
      cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px;
    }
    .btn-primary { background: #2563eb; color: #fff; border: none; box-shadow: 0 4px 18px rgba(37, 99, 235, 0.3); }
    .btn-primary:hover { background: #1d4ed8; }
    .btn-secondary { background: #1f293d; color: #fff; border: 1px solid #374151; }
    .btn-secondary:hover { background: #283548; }

    section { padding: 70px 0; border-top: 1px solid var(--card-border); }
    .section-title { font-size: 2.1rem; font-weight: 800; margin-bottom: 8px; }
    .section-subtitle { color: var(--text-muted); margin-bottom: 36px; font-size: 1rem; }

    .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
    .skill-card {
      background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 12px;
      padding: 18px; transition: transform 0.2s, border-color 0.2s;
    }
    .skill-card:hover { transform: translateY(-2px); border-color: #3b82f6; }
    .skill-head { display: flex; justify-content: space-between; font-weight: 600; font-size: 0.9rem; margin-bottom: 8px; }
    .bar-bg { background: #1f293d; height: 6px; border-radius: 4px; overflow: hidden; }
    .bar-fill { background: linear-gradient(90deg, #3b82f6, #06b6d4); height: 100%; border-radius: 4px; }

    .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
    .project-card {
      background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 14px;
      overflow: hidden; display: flex; flex-direction: column;
    }
    .project-img { width: 100%; height: 190px; object-fit: cover; }
    .project-body { padding: 22px; flex: 1; display: flex; flex-direction: column; }
    .project-body h3 { font-size: 1.2rem; margin-bottom: 10px; font-weight: 700; color: #fff; }
    .project-body p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px; flex: 1; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
    .tag { background: #1f293d; color: #93c5fd; font-size: 0.75rem; padding: 3px 8px; border-radius: 6px; font-family: monospace; }
    
    .timeline { border-left: 2px solid var(--card-border); padding-left: 26px; margin-left: 10px; display: flex; flex-direction: column; gap: 28px; }
    .timeline-item { position: relative; }
    .timeline-dot {
      position: absolute; left: -33px; top: 6px; width: 14px; height: 14px;
      border-radius: 50%; background: #3b82f6; border: 3px solid var(--bg);
    }
    .timeline-date { font-size: 0.85rem; font-weight: 700; color: #93c5fd; margin-bottom: 4px; }
    .timeline-title { font-size: 1.15rem; font-weight: 700; margin-bottom: 2px; }
    .timeline-place { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 8px; font-weight: 500; }
    .timeline-desc { color: #d1d5db; font-size: 0.9rem; }

    .cert-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .cert-card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 12px; padding: 18px; }
    .cert-badge { display: inline-block; font-size: 0.75rem; font-weight: 700; color: #60a5fa; background: rgba(30, 58, 138, 0.4); border: 1px solid rgba(59, 130, 246, 0.4); padding: 2px 8px; border-radius: 6px; margin-bottom: 8px; }

    .ref-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
    .ref-card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 12px; padding: 18px; }
    
    .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); gap: 22px; }
    .blog-card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 14px; padding: 22px; display: flex; flex-direction: column; }
    .blog-meta { display: flex; justify-content: space-between; font-size: 0.8rem; color: #9ca3af; margin-bottom: 10px; }
    .blog-card h3 { font-size: 1.15rem; margin-bottom: 8px; font-weight: 700; }
    .blog-card p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px; flex: 1; }

    /* Modal */
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px);
      display: none; align-items: center; justify-content: center; z-index: 1000; padding: 20px;
    }
    .modal-box {
      background: #111827; border: 1px solid #1f293d; border-radius: 16px;
      max-width: 600px; width: 100%; padding: 28px; position: relative; max-height: 85vh; overflow-y: auto;
    }
    .modal-close {
      position: absolute; top: 16px; right: 16px; background: none; border: none;
      color: #9ca3af; font-size: 1.5rem; cursor: pointer;
    }
    .modal-close:hover { color: #fff; }

    footer { text-align: center; padding: 40px 0; color: var(--text-muted); font-size: 0.9rem; border-top: 1px solid var(--card-border); }

    @media (max-width: 768px) {
      h1 { font-size: 2.2rem; }
      nav ul { display: none; }
      .container { padding: 0 16px; }
    }
  </style>
</head>
<body>
  <header>
    <div class="container nav-inner">
      <div class="logo">${p.name} <span>• MEAL & Data</span></div>
      <nav>
        <ul>
          <li><a href="#about" class="i18n-nav-about">${initialLang === 'fr' ? 'À propos' : 'About'}</a></li>
          <li><a href="#skills" class="i18n-nav-skills">${initialLang === 'fr' ? 'Compétences' : 'Skills'}</a></li>
          <li><a href="#projects" class="i18n-nav-projects">${initialLang === 'fr' ? 'Projets' : 'Projects'}</a></li>
          <li><a href="#experience" class="i18n-nav-experience">${initialLang === 'fr' ? 'Expérience' : 'Experience'}</a></li>
          <li><a href="#education" class="i18n-nav-education">${initialLang === 'fr' ? 'Formation' : 'Education'}</a></li>
          <li><a href="#certifications" class="i18n-nav-certs">${initialLang === 'fr' ? 'Certifications' : 'Certifications'}</a></li>
          <li><a href="#references" class="i18n-nav-refs">${initialLang === 'fr' ? 'Références' : 'References'}</a></li>
          <li><a href="#blog" class="i18n-nav-blog">${initialLang === 'fr' ? 'Blog' : 'Blog'}</a></li>
          <li><a href="#contact" class="i18n-nav-contact">${initialLang === 'fr' ? 'Contact' : 'Contact'}</a></li>
        </ul>
      </nav>
      <button class="lang-btn" id="lang-toggle-btn" onclick="toggleLanguage()">${initialLang === 'fr' ? 'EN 🇬🇧' : 'FR 🇫🇷'}</button>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <img class="avatar" src="${avatar}" alt="${p.name}" />
        <br>
        <span class="badge" id="hero-badge">${initialLang === 'fr' ? '● Disponible pour Missions Data Analyst & MEAL' : '● Available for Data Analyst & MEAL Roles'}</span>
        <h1>${p.name}</h1>
        <div class="hero-title" id="hero-title">${p.title[initialLang]}</div>
        <p class="hero-bio" id="hero-bio">${p.bio[initialLang]}</p>
        
        <div class="contact-pills">
          <span>📍 ${p.contact.location || 'Goma, RDC'}</span>
          <span>📞 ${p.contact.phone || '+243 992 641 674'}</span>
          <span>✉️ <span id="hero-email">${p.contact.email}</span></span>
        </div>

        <div class="btn-group">
          <a href="#contact" class="btn btn-primary" id="btn-contact">${initialLang === 'fr' ? 'Me Contacter' : 'Get in Touch'}</a>
          <a href="#projects" class="btn btn-secondary" id="btn-projects">${initialLang === 'fr' ? 'Voir les Projets' : 'View Projects'}</a>
          <button onclick="copyEmail()" class="btn btn-secondary" id="btn-copy-email">📋 ${initialLang === 'fr' ? 'Copier Email' : 'Copy Email'}</button>
        </div>
      </div>
    </section>

    <section id="about">
      <div class="container">
        <h2 class="section-title" id="about-heading">${initialLang === 'fr' ? 'Profil Professionnel' : 'Professional Profile'}</h2>
        <p class="section-subtitle" id="about-subheading">${initialLang === 'fr' ? 'Expertise en gestion de l\'information, SIG et suivi-évaluation en RDC' : 'Expertise in information management, GIS and MEAL in DRC'}</p>
        <div style="background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 14px; padding: 28px; font-size: 1.05rem; line-height: 1.8;">
          <p id="about-text">${p.about[initialLang]}</p>
        </div>
      </div>
    </section>

    <section id="skills">
      <div class="container">
        <h2 class="section-title" id="skills-heading">${initialLang === 'fr' ? 'Compétences Techniques & MEAL' : 'Technical Skills & MEAL'}</h2>
        <p class="section-subtitle" id="skills-subheading">${initialLang === 'fr' ? 'KoboToolbox, Power BI, QGIS, SQL/BigQuery, analyses sanitaires et humanitaires' : 'KoboToolbox, Power BI, QGIS, SQL/BigQuery, health and humanitarian analytics'}</p>
        <div class="skills-grid" id="skills-container">
          ${portfolio.skills.map(s => `
            <div class="skill-card">
              <div class="skill-head">
                <span>${s.name}</span>
                <span style="color: #60a5fa">${s.level}%</span>
              </div>
              <div class="bar-bg">
                <div class="bar-fill" style="width: ${s.level}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="projects">
      <div class="container">
        <h2 class="section-title" id="projects-heading">${initialLang === 'fr' ? 'Projets Data & Portfolio Analytique' : 'Data Projects & Portfolio'}</h2>
        <p class="section-subtitle" id="projects-subheading">${initialLang === 'fr' ? 'Études de cas concrètes, systèmes MEAL et cartographies géospatiales' : 'Real-world case studies, MEAL systems, and geospatial mapping'}</p>
        <div class="projects-grid" id="projects-container">
          ${portfolio.projects.map((proj, idx) => `
            <div class="project-card">
              <img class="project-img" src="${proj.image}" alt="${proj.title[initialLang]}" />
              <div class="project-body">
                <h3>${proj.title[initialLang]}</h3>
                <p>${proj.shortDesc[initialLang]}</p>
                <div class="tags">
                  ${proj.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                ${proj.metrics ? `<div style="font-size: 0.8rem; color: #4ade80; margin-bottom: 12px;">📈 ${proj.metrics[initialLang]}</div>` : ''}
                <div style="display: flex; gap: 10px; margin-top: auto;">
                  ${proj.kaggleUrl ? `<a href="${proj.kaggleUrl}" target="_blank" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;">Kaggle</a>` : ''}
                  ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;">GitHub</a>` : ''}
                  ${proj.liveUrl ? `<a href="${proj.liveUrl}" target="_blank" class="btn btn-primary" style="padding: 6px 12px; font-size: 0.8rem;">${initialLang === 'fr' ? 'Accéder' : 'View'}</a>` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="experience">
      <div class="container">
        <h2 class="section-title" id="exp-heading">${initialLang === 'fr' ? 'Expérience Professionnelle' : 'Professional Experience'}</h2>
        <p class="section-subtitle" id="exp-subheading">${initialLang === 'fr' ? 'eGov Africa, Verditra SARLU, Radio Maria Bukavu' : 'eGov Africa, Verditra SARLU, Radio Maria Bukavu'}</p>
        <div class="timeline" id="exp-container">
          ${portfolio.experience.map(exp => `
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-date">${exp.period}</div>
              <div class="timeline-title">${exp.role[initialLang]}</div>
              <div class="timeline-place">${exp.company} — ${exp.location[initialLang]}</div>
              <div class="timeline-desc">${exp.description[initialLang]}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="education">
      <div class="container">
        <h2 class="section-title" id="edu-heading">${initialLang === 'fr' ? 'Formation Académique' : 'Academic Education'}</h2>
        <p class="section-subtitle" id="edu-subheading">${initialLang === 'fr' ? 'Diplôme universitaire en informatique' : 'University degree in computer science'}</p>
        <div class="timeline" id="edu-container">
          ${portfolio.education.map(edu => `
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-date">${edu.period}</div>
              <div class="timeline-title">${edu.degree[initialLang]}</div>
              <div class="timeline-place">${edu.institution[initialLang]} — ${edu.location[initialLang]}</div>
              <div class="timeline-desc">${edu.description[initialLang]}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="certifications">
      <div class="container">
        <h2 class="section-title" id="certs-heading">${initialLang === 'fr' ? 'Certifications Professionnelles (7)' : 'Professional Certifications (7)'}</h2>
        <p class="section-subtitle" id="certs-subheading">${initialLang === 'fr' ? 'Google, Microsoft, Coursera, Udemy & formations certifiantes' : 'Google, Microsoft, Coursera, Udemy & certified training'}</p>
        <div class="cert-grid" id="certs-container">
          ${(portfolio.certifications || []).map(cert => `
            <div class="cert-card">
              <span class="cert-badge">${cert.badge || cert.issuer}</span>
              <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 6px;">${cert.name[initialLang]}</h4>
              <div style="font-size: 0.8rem; color: #9ca3af; margin-bottom: 8px;">${cert.issuer} • ${cert.year || ''}</div>
              ${cert.credentialUrl && cert.credentialUrl !== '#' ? `<a href="${cert.credentialUrl}" target="_blank" style="color: #60a5fa; font-size: 0.75rem; font-weight: 600;">↗ ${initialLang === 'fr' ? 'Vérifier' : 'Verify'}</a>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="references">
      <div class="container">
        <h2 class="section-title" id="refs-heading">${initialLang === 'fr' ? 'Références Professionnelles' : 'Professional References'}</h2>
        <p class="section-subtitle" id="refs-subheading">${initialLang === 'fr' ? 'Directeurs et coordinateurs (LM International, Verditra, eGov Africa)' : 'Directors and coordinators (LM International, Verditra, eGov Africa)'}</p>
        <div class="ref-grid" id="refs-container">
          ${(portfolio.references || []).map(ref => `
            <div class="ref-card">
              <h4 style="font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 4px;">${ref.name}</h4>
              <div style="color: #60a5fa; font-size: 0.85rem; font-weight: 600; margin-bottom: 2px;">${ref.role[initialLang]}</div>
              <div style="font-size: 0.8rem; color: #9ca3af; margin-bottom: 10px;">${ref.organization}</div>
              <div style="font-size: 0.8rem; color: #d1d5db;">✉️ <a href="mailto:${ref.email}">${ref.email}</a></div>
              <div style="font-size: 0.8rem; color: #d1d5db;">📞 <a href="tel:${ref.phone}">${ref.phone}</a></div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="blog">
      <div class="container">
        <h2 class="section-title" id="blog-heading">${initialLang === 'fr' ? 'Articles & Publications Techniques' : 'Technical Articles & Publications'}</h2>
        <p class="section-subtitle" id="blog-subheading">${initialLang === 'fr' ? 'MEAL humanitaire, cartographie SIG et Power BI / DAX' : 'Humanitarian MEAL, GIS mapping, and Power BI / DAX'}</p>
        <div class="blog-grid" id="blog-container">
          ${portfolio.blog.map(b => `
            <div class="blog-card">
              <div class="blog-meta">
                <span>${b.category[initialLang]}</span>
                <span>${b.readTime[initialLang]}</span>
              </div>
              <h3>${b.title[initialLang]}</h3>
              <p>${b.excerpt[initialLang]}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="contact">
      <div class="container" style="text-align: center;">
        <h2 class="section-title" id="contact-heading">${initialLang === 'fr' ? 'Prendre Contact' : 'Get in Touch'}</h2>
        <p style="color: var(--text-muted); margin-bottom: 24px;" id="contact-subheading">
          ${initialLang === 'fr' ? 'Disponible pour des postes et missions en Analyse de Données, SIG et MEAL en RDC et à l\'international.' : 'Available for Data Analyst, GIS, and MEAL positions and missions in DRC and globally.'}
        </p>
        <div style="font-size: 1.3rem; font-weight: 700; color: #93c5fd; margin-bottom: 24px;">
          ✉️ <a href="mailto:${p.contact.email}">${p.contact.email}</a><br>
          📞 <span>${p.contact.phone || '+243 992 641 674'}</span>
        </div>
        <div class="btn-group">
          <a href="mailto:${p.contact.email}" class="btn btn-primary" id="btn-send-email">${initialLang === 'fr' ? 'Envoyer un E-mail' : 'Send an Email'}</a>
          <button onclick="downloadVCard()" class="btn btn-secondary">📇 vCard (.vcf)</button>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <p id="footer-text">© ${new Date().getFullYear()} ${p.name}. ${initialLang === 'fr' ? 'Portfolio Data Analyst, SIG & MEAL autonome en HTML, CSS et JavaScript.' : 'Autonomous Data Analyst, GIS & MEAL portfolio built with HTML, CSS, and JavaScript.'}</p>
    </div>
  </footer>

  <script>
    const DATA = ${portfolioJson};
    let currentLang = "${initialLang}";

    function toggleLanguage() {
      currentLang = currentLang === 'fr' ? 'en' : 'fr';
      const isFr = currentLang === 'fr';
      document.documentElement.lang = currentLang;

      // Update button
      document.getElementById('lang-toggle-btn').innerText = isFr ? 'EN 🇬🇧' : 'FR 🇫🇷';

      // Update titles
      document.getElementById('doc-title').innerText = DATA.personal.name + ' — ' + DATA.personal.title[currentLang];
      document.getElementById('doc-desc').content = DATA.personal.bio[currentLang];
      document.getElementById('hero-title').innerText = DATA.personal.title[currentLang];
      document.getElementById('hero-bio').innerText = DATA.personal.bio[currentLang];
      document.getElementById('hero-badge').innerText = isFr ? '● Disponible pour Missions Data Analyst & MEAL' : '● Available for Data Analyst & MEAL Roles';
      document.getElementById('btn-contact').innerText = isFr ? 'Me Contacter' : 'Get in Touch';
      document.getElementById('btn-projects').innerText = isFr ? 'Voir les Projets' : 'View Projects';
      document.getElementById('btn-copy-email').innerText = '📋 ' + (isFr ? 'Copier Email' : 'Copy Email');
      
      // About
      document.getElementById('about-heading').innerText = isFr ? 'Profil Professionnel' : 'Professional Profile';
      document.getElementById('about-subheading').innerText = isFr ? 'Expertise en gestion de l\\'information, SIG et suivi-évaluation en RDC' : 'Expertise in information management, GIS and MEAL in DRC';
      document.getElementById('about-text').innerText = DATA.personal.about[currentLang];

      // Skills
      document.getElementById('skills-heading').innerText = isFr ? 'Compétences Techniques & MEAL' : 'Technical Skills & MEAL';
      document.getElementById('skills-subheading').innerText = isFr ? 'KoboToolbox, Power BI, QGIS, SQL/BigQuery, analyses sanitaires et humanitaires' : 'KoboToolbox, Power BI, QGIS, SQL/BigQuery, health and humanitarian analytics';

      // Projects
      document.getElementById('projects-heading').innerText = isFr ? 'Projets Data & Portfolio Analytique' : 'Data Projects & Portfolio';
      document.getElementById('projects-subheading').innerText = isFr ? 'Études de cas concrètes, systèmes MEAL et cartographies géospatiales' : 'Real-world case studies, MEAL systems, and geospatial mapping';
      renderProjects();

      // Experience & Education & Certs & Refs & Blog
      document.getElementById('exp-heading').innerText = isFr ? 'Expérience Professionnelle' : 'Professional Experience';
      document.getElementById('edu-heading').innerText = isFr ? 'Formation Académique' : 'Academic Education';
      document.getElementById('certs-heading').innerText = isFr ? 'Certifications Professionnelles (7)' : 'Professional Certifications (7)';
      document.getElementById('refs-heading').innerText = isFr ? 'Références Professionnelles' : 'Professional References';
      document.getElementById('blog-heading').innerText = isFr ? 'Articles & Publications Techniques' : 'Technical Articles & Publications';
      document.getElementById('contact-heading').innerText = isFr ? 'Prendre Contact' : 'Get in Touch';
      document.getElementById('contact-subheading').innerText = isFr ? 'Disponible pour des postes et missions en Analyse de Données, SIG et MEAL en RDC et à l\\'international.' : 'Available for Data Analyst, GIS, and MEAL positions and missions in DRC and globally';
      document.getElementById('btn-send-email').innerText = isFr ? 'Envoyer un E-mail' : 'Send an Email';
      document.getElementById('footer-text').innerText = '© ' + new Date().getFullYear() + ' ' + DATA.personal.name + '. ' + (isFr ? 'Portfolio Data Analyst, SIG & MEAL autonome en HTML, CSS et JavaScript.' : 'Autonomous Data Analyst, GIS & MEAL portfolio built with HTML, CSS, and JavaScript.');

      renderTimeline();
      renderCerts();
      renderRefs();
      renderBlog();
    }

    function renderProjects() {
      const container = document.getElementById('projects-container');
      const isFr = currentLang === 'fr';
      container.innerHTML = DATA.projects.map(proj => \`
        <div class="project-card">
          <img class="project-img" src="\${proj.image}" alt="\${proj.title[currentLang]}" />
          <div class="project-body">
            <h3>\${proj.title[currentLang]}</h3>
            <p>\${proj.shortDesc[currentLang]}</p>
            <div class="tags">
              \${proj.tags.map(t => \`<span class="tag">\${t}</span>\`).join('')}
            </div>
            \${proj.metrics ? \`<div style="font-size: 0.8rem; color: #4ade80; margin-bottom: 12px;">📈 \${proj.metrics[currentLang]}</div>\` : ''}
            <div style="display: flex; gap: 10px; margin-top: auto;">
              \${proj.kaggleUrl ? \`<a href="\${proj.kaggleUrl}" target="_blank" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;">Kaggle</a>\` : ''}
              \${proj.githubUrl ? \`<a href="\${proj.githubUrl}" target="_blank" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.8rem;">GitHub</a>\` : ''}
              \${proj.liveUrl ? \`<a href="\${proj.liveUrl}" target="_blank" class="btn btn-primary" style="padding: 6px 12px; font-size: 0.8rem;">\${isFr ? 'Accéder' : 'View'}</a>\` : ''}
            </div>
          </div>
        </div>
      \`).join('');
    }

    function renderTimeline() {
      document.getElementById('exp-container').innerHTML = DATA.experience.map(exp => \`
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-date">\${exp.period}</div>
          <div class="timeline-title">\${exp.role[currentLang]}</div>
          <div class="timeline-place">\${exp.company} — \${exp.location[currentLang]}</div>
          <div class="timeline-desc">\${exp.description[currentLang]}</div>
        </div>
      \`).join('');

      document.getElementById('edu-container').innerHTML = DATA.education.map(edu => \`
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-date">\${edu.period}</div>
          <div class="timeline-title">\${edu.degree[currentLang]}</div>
          <div class="timeline-place">\${edu.institution[currentLang]} — \${edu.location[currentLang]}</div>
          <div class="timeline-desc">\${edu.description[currentLang]}</div>
        </div>
      \`).join('');
    }

    function renderCerts() {
      const isFr = currentLang === 'fr';
      document.getElementById('certs-container').innerHTML = (DATA.certifications || []).map(cert => \`
        <div class="cert-card">
          <span class="cert-badge">\${cert.badge || cert.issuer}</span>
          <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 6px;">\${cert.name[currentLang]}</h4>
          <div style="font-size: 0.8rem; color: #9ca3af; margin-bottom: 8px;">\${cert.issuer} • \${cert.year || ''}</div>
          \${cert.credentialUrl && cert.credentialUrl !== '#' ? \`<a href="\${cert.credentialUrl}" target="_blank" style="color: #60a5fa; font-size: 0.75rem; font-weight: 600;">↗ \${isFr ? 'Vérifier' : 'Verify'}</a>\` : ''}
        </div>
      \`).join('');
    }

    function renderRefs() {
      document.getElementById('refs-container').innerHTML = (DATA.references || []).map(ref => \`
        <div class="ref-card">
          <h4 style="font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 4px;">\${ref.name}</h4>
          <div style="color: #60a5fa; font-size: 0.85rem; font-weight: 600; margin-bottom: 2px;">\${ref.role[currentLang]}</div>
          <div style="font-size: 0.8rem; color: #9ca3af; margin-bottom: 10px;">\${ref.organization}</div>
          <div style="font-size: 0.8rem; color: #d1d5db;">✉️ <a href="mailto:\${ref.email}">\${ref.email}</a></div>
          <div style="font-size: 0.8rem; color: #d1d5db;">📞 <a href="tel:\${ref.phone}">\${ref.phone}</a></div>
        </div>
      \`).join('');
    }

    function renderBlog() {
      document.getElementById('blog-container').innerHTML = DATA.blog.map(b => \`
        <div class="blog-card">
          <div class="blog-meta">
            <span>\${b.category[currentLang]}</span>
            <span>\${b.readTime[currentLang]}</span>
          </div>
          <h3>\${b.title[currentLang]}</h3>
          <p>\${b.excerpt[currentLang]}</p>
        </div>
      \`).join('');
    }

    function copyEmail() {
      const email = DATA.personal.contact.email;
      navigator.clipboard.writeText(email).then(() => {
        alert(currentLang === 'fr' ? 'Email copié dans le presse-papier : ' + email : 'Email copied to clipboard: ' + email);
      });
    }

    function downloadVCard() {
      const p = DATA.personal;
      const vcard = "BEGIN:VCARD\\nVERSION:3.0\\nFN:" + p.name + "\\nTITLE:" + p.title.en + "\\nEMAIL:" + p.contact.email + "\\nTEL:" + p.contact.phone + "\\nADR:;;;" + p.contact.location + ";;;\\nEND:VCARD";
      const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = p.name.replace(/\\s+/g, '_') + '_contact.vcf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  </script>
</body>
</html>`;
}
