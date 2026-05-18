import React, { createContext, useContext, useMemo, useState } from 'react';

const translations = {
  pt: {
    'hero.title': 'Excelência Global em',
    'hero.highlight': 'Commodities',
    'hero.subtitle': 'Acesso direto a oportunidades internacionais em commodities, com foco disciplinado em soja, milho e outros fluxos estratégicos.',
    'diff.trust': 'Disciplina de contraparte',
    'diff.trust.desc': 'Atuamos com uma abordagem direta, institucional e confidencial para negociações globais.',
    'diff.global': 'Alcance global',
    'diff.global.desc': 'Presença e coordenação em mercados-chave para apoiar sourcing e alocação.',
    'diff.quality': 'Qualidade de execução',
    'diff.quality.desc': 'Acompanhamento comercial estruturado com precisão, agilidade e consistência.',
    'cta.title': 'Inicie uma conversa direta',
    'cta.desc': 'A nossa mesa é orientada apenas para contacto global em commodities. Partilhe o seu perfil e alinharemos o canal comercial adequado.',
    'cta.button': 'Iniciar contacto',
  },
  en: {
    'hero.title': 'Global commodities',
    'hero.highlight': 'connections',
    'hero.subtitle': 'Direct access to international commodity opportunities with a disciplined focus on soybean, corn and other strategic flows.',
    'diff.trust': 'Counterparty discipline',
    'diff.trust.desc': 'We operate with a direct, institutional and confidential approach for global negotiations.',
    'diff.global': 'Global reach',
    'diff.global.desc': 'Presence and coordination across key markets to support sourcing and allocation.',
    'diff.quality': 'Execution quality',
    'diff.quality.desc': 'Structured commercial follow-up with precision, responsiveness and consistency.',
    'cta.title': 'Start a direct conversation',
    'cta.desc': 'Our desk is oriented to global commodity contact only. Share your profile and we will align the right commercial channel.',
    'cta.button': 'Start contact',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children, defaultLanguage = 'pt' }) {
  const [language, setLanguage] = useState(defaultLanguage);

  const value = useMemo(() => {
    const locale = translations[language] ? language : 'pt';

    return {
      language: locale,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === 'pt' ? 'en' : 'pt')),
      t: (key) => translations[locale][key] ?? translations.pt[key] ?? key,
    };
  }, [language]);

  return React.createElement(LanguageContext.Provider, { value }, children);
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}