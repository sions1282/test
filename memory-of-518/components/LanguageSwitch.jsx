import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 border border-white/30"
      title={i18n.language === 'ko' ? 'Switch to English' : '한국어로 전환'}
    >
      <span className="text-lg">
        {i18n.language === 'ko' ? '🇰🇷' : '🇺🇸'}
      </span>
      <span className="text-sm font-medium text-gray-700">
        {i18n.language === 'ko' ? 'KO' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageSwitch;