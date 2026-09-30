import React, { useState } from 'react';
import { Language, PortfolioData } from '../types/portfolio';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  Phone, 
  Github, 
  Linkedin, 
  Twitter, 
  UserCheck, 
  Sparkles,
  Download
} from 'lucide-react';

interface ContactSectionProps {
  portfolio: PortfolioData;
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ portfolio, lang }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [copied, setCopied] = useState(false);
  const [sentStatus, setSentStatus] = useState<string | null>(null);

  const isEn = lang === 'en';
  const p = portfolio.personal;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(p.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    // Create mailto link
    const mailtoUrl = `mailto:${p.contact.email}?subject=${encodeURIComponent(
      formState.subject || (isEn ? `Message from ${formState.name}` : `Message de ${formState.name}`)
    )}&body=${encodeURIComponent(
      `${formState.message}\n\nFrom: ${formState.name} (${formState.email})`
    )}`;

    window.location.href = mailtoUrl;

    setSentStatus(
      isEn
        ? 'Opening your email client to dispatch the message. Thank you!'
        : 'Ouverture de votre client e-mail pour l\'envoi du message. Merci !'
    );
    setTimeout(() => setSentStatus(null), 6000);
  };

  // Generate vCard download
  const downloadVCard = () => {
    const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:${p.name}
TITLE:${p.title.en}
EMAIL:${p.contact.email}
${p.contact.phone ? `TEL:${p.contact.phone}` : ''}
${p.contact.location ? `ADR;TYPE=WORK:;;;${p.contact.location};;;` : ''}
${p.contact.website ? `URL:${p.contact.website}` : ''}
NOTE:${p.bio.en}
END:VCARD`;

    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${p.name.replace(/\s+/g, '_')}_contact.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-900 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-800/60 text-xs font-semibold text-indigo-400 mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>{isEn ? 'Start a Conversation' : 'Démarrer une Discussion'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {isEn ? 'Let’s Build Something Exceptional' : 'Collaborons Ensemble'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {isEn
              ? 'Have a challenging software project, architecture inquiry, or full-time position? I would love to hear from you.'
              : 'Un projet d\'envergure, une question d\'architecture ou une opportunité de poste ? Échangeons avec plaisir.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {isEn ? 'Get in Touch Directly' : 'Coordonnées Directes'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {isEn
                    ? 'Based globally with rapid turnaround time for asynchronous and synchronous communication.'
                    : 'Disponible à l\'international avec une excellente réactivité pour les échanges.'}
                </p>
              </div>

              {/* Email with copy button */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[11px] text-slate-400 block font-mono">EMAIL</span>
                  <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                    {p.contact.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 transition-colors flex-shrink-0"
                  title={isEn ? 'Copy email' : 'Copier l\'adresse e-mail'}
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location & Info */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>{p.contact.location || 'Remote / Worldwide'}</span>
                </div>

                {p.contact.phone && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>{p.contact.phone}</span>
                  </div>
                )}

                <div className="flex items-center gap-3 text-emerald-400">
                  <UserCheck className="w-4 h-4 flex-shrink-0" />
                  <span>{isEn ? 'Ready for immediate onboarding' : 'Prêt pour démarrage immédiat'}</span>
                </div>
              </div>

              {/* Social profiles */}
              <div className="pt-4 border-t border-slate-800/80">
                <span className="text-xs font-semibold text-slate-400 block mb-3">
                  {isEn ? 'Connect on Networks' : 'Réseaux & Plateformes'}
                </span>
                <div className="flex items-center gap-3">
                  {p.contact.github && (
                    <a
                      href={p.contact.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {p.contact.linkedin && (
                    <a
                      href={p.contact.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {p.contact.kaggle && (
                    <a
                      href={p.contact.kaggle}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-slate-800 transition-colors"
                      title="Kaggle"
                    >
                      <span className="font-mono text-xs font-bold">Kaggle</span>
                    </a>
                  )}
                  {p.contact.twitter && (
                    <a
                      href={p.contact.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                      title="Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  
                  {/* vCard download */}
                  <button
                    type="button"
                    onClick={downloadVCard}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-white border border-slate-800 transition-colors ml-auto"
                    title={isEn ? 'Download contact vCard (.vcf)' : 'Télécharger la vCard (.vcf)'}
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                    <span>vCard</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-4"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                {isEn ? 'Send an Inquiry' : 'Envoyer un Message'}
              </h3>

              {sentStatus && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{sentStatus}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {isEn ? 'Your Name' : 'Votre Nom'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder={isEn ? 'Jane Doe' : 'Jean Dupont'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    {isEn ? 'Your Email' : 'Votre Adresse E-mail'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {isEn ? 'Subject' : 'Sujet'}
                </label>
                <input
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder={
                    isEn
                      ? 'e.g. Full-Stack Engineering Role / Project Inquiry'
                      : 'ex. Proposition de mission / Poste Ingénieur Full-Stack'
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {isEn ? 'Message' : 'Votre Message'}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder={
                    isEn
                      ? 'Tell me about the goals, timeline, and tech stack for your project...'
                      : 'Présentez vos objectifs, le calendrier et les technologies envisagées...'
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isEn ? 'Send Message via Email Client' : 'Envoyer le Message'}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
