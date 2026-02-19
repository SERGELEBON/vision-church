import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { languages } from '@/i18n';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages.find(lang => lang.code === 'en') || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/20 
                   text-white hover:bg-white/20 hover:border-gold/50 transition-all duration-300"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4 text-gold" />
        <span className="text-sm font-medium uppercase">{currentLanguage.code}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-darkblue-light border border-gold/30 rounded-xl 
                      shadow-xl shadow-gold/10 overflow-hidden z-50 animate-fade-in">
          <div className="py-2">
            <div className="px-4 py-2 text-xs text-white/50 uppercase tracking-wider border-b border-white/10">
              Select Language
            </div>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left
                          hover:bg-gold/10 transition-colors duration-200
                          ${i18n.language === lang.code ? 'bg-gold/20' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{lang.flag}</span>
                  <span className={`text-sm ${i18n.language === lang.code ? 'text-gold font-medium' : 'text-white/80'}`}>
                    {lang.name}
                  </span>
                </div>
                {i18n.language === lang.code && (
                  <Check className="w-4 h-4 text-gold" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
