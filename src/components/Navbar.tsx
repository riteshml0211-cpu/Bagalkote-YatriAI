import React, { useState } from 'react';
import { Globe, Compass, Camera, Sparkles, MapPin, Volume2, PhoneCall, Menu, X, ShoppingBag, Utensils, Navigation, Award, Train, Download } from 'lucide-react';
import { Language, Monument } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  activeMonument: Monument | null;
  isPlayingAudio: boolean;
  onOpenAudioBar: () => void;
  onOpenChat: () => void;
  onOpenPocketGuide?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  activeSection,
  onNavigate,
  activeMonument,
  isPlayingAudio,
  onOpenAudioBar,
  onOpenChat,
  onOpenPocketGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: 'destinations', label: t.nav.destinations, icon: Compass },
    { id: 'circuit-map', label: t.nav.circuitMap, icon: MapPin },
    { id: 'planner', label: t.nav.planner, icon: Navigation },
    { id: 'weavers', label: t.nav.weavers, icon: ShoppingBag },
    { id: 'scanner', label: t.nav.scanner, icon: Camera },
    { id: 'traveler-toolkit', label: t.nav.toolkit, icon: Award },
    { id: 'transportation', label: t.nav.transportation, icon: Train },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs transition-colors duration-200">
      {/* Top Banner: Emergency & Helpline */}
      <div className="bg-[#1E293B] text-amber-100 text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-medium tracking-wide truncate">
              {language === 'kn' ? 'ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ • ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆ' : 'Karnataka Tourism • Bagalkote Heritage'}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-300 shrink-0">
            <a href="tel:18004254254" className="flex items-center gap-1.5 hover:text-amber-300 transition-colors">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.nav.helpline}</span>
            </a>
            <span className="text-slate-500">|</span>
            <span className="text-amber-300/90 font-medium">
              {language === 'kn' ? 'ಬಾದಾಮಿ • ಪಟ್ಟದಕಲ್ಲು • ಐಹೊಳೆ' : 'Badami • Pattadakal • Aihole'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 sm:h-20 gap-2">
          {/* Brand Logo */}
          <div
            onClick={() => handleItemClick('hero')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none min-w-0 flex-1 sm:flex-initial"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-linear-to-br from-amber-600 via-amber-700 to-stone-900 flex items-center justify-center shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <span className="text-white font-serif font-black text-lg sm:text-xl tracking-tighter">ಯಾ</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-base sm:text-xl text-slate-900 tracking-tight truncate">
                  {t.brandName}
                </span>
                <span className="hidden min-[420px]:inline-block px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold rounded-sm bg-amber-100 text-amber-800 uppercase tracking-widest border border-amber-300/60 shrink-0">
                  {language === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ಗೈಡ್' : 'AI Portal'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block truncate">
                {language === 'kn' ? 'ಬಾದಾಮಿ ಚಾಲುಕ್ಯ ಪರಂಪರೆ & ಇಳಕಲ್ ಕೈಮಗ್ಗ' : 'Chalukya Heritage & Ilkal Handlooms'}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-50 text-amber-900 font-semibold border border-amber-200'
                      : 'text-slate-700 hover:text-amber-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons & Language Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Active Audio Pill */}
            {activeMonument && (
              <button
                onClick={onOpenAudioBar}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-600 text-white text-xs font-semibold shadow-sm hover:bg-amber-700 transition-all animate-pulse"
                title="Active Audio Guide"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span className="max-w-[120px] truncate">
                  {language === 'kn' ? activeMonument.nameKn : activeMonument.name}
                </span>
                {isPlayingAudio ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                ) : (
                  <span className="text-[10px] opacity-80">❚❚</span>
                )}
              </button>
            )}

            {/* Offline Pocket Guide Button */}
            <button
              onClick={onOpenPocketGuide}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-white hover:bg-amber-50 border border-amber-300 text-amber-950 font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
              title="Download Offline Pocket Guide (Print / PDF)"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700 shrink-0" />
              <span className="hidden md:inline">{language === 'kn' ? 'ಪಾಕೆಟ್ ಗೈಡ್' : 'Pocket Guide'}</span>
            </button>

            {/* Language Switcher Pill */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300/80 text-amber-950 font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
              aria-label="Toggle language between English and Kannada"
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700 shrink-0" />
              <div className="flex items-center gap-1 text-[11px] sm:text-xs">
                <span className={language === 'en' ? 'font-bold text-amber-900' : 'text-slate-400 font-normal'}>
                  EN
                </span>
                <span className="text-slate-300">/</span>
                <span className={language === 'kn' ? 'font-bold text-amber-900' : 'text-slate-400 font-normal'}>
                  ಕನ್ನಡ
                </span>
              </div>
            </button>

            {/* AI Assistant Quick Trigger */}
            <button
              onClick={onOpenChat}
              className="flex items-center gap-1 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium text-xs sm:text-sm shadow-md shadow-amber-900/15 transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200" />
              <span className="hidden min-[380px]:inline">{t.nav.assistant}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ALWAYS-VISIBLE ALL-FEATURES HORIZONTAL SCROLL BAR */}
      {/* Ensures every single feature is immediately visible on the website across all devices without needing to open a hamburger menu */}
      <div className="bg-slate-900 border-t border-amber-900/30 px-2 sm:px-4 py-1.5 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest shrink-0 px-2 py-0.5 rounded-sm bg-amber-500/15 border border-amber-400/30 flex items-center gap-1 mr-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{language === 'kn' ? 'ವೈಶಿಷ್ಟ್ಯಗಳು' : 'All Features'}</span>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs scale-102'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800 bg-slate-800/60 border border-slate-700/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-amber-900/10 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-amber-50 text-amber-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 mt-2 space-y-1 px-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPocketGuide?.();
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-50 rounded-lg"
            >
              <span className="flex items-center gap-2">
                <Download className="w-3.5 h-3.5 text-amber-700" />
                <span>{language === 'kn' ? 'ಆಫ್‌ಲೈನ್ ಪಾಕೆಟ್ ಗೈಡ್ (ಪ್ರಿಂಟ್/PDF)' : 'Offline Pocket Guide (Print/PDF)'}</span>
              </span>
              <span className="text-[10px] bg-amber-200/80 px-1.5 py-0.5 rounded text-amber-950 font-bold">PDF</span>
            </button>

            <div className="flex items-center justify-end pt-1">
              <a
                href="tel:18004254254"
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 hover:text-amber-800"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.nav.helpline}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
