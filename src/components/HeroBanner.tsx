import React, { useState } from 'react';
import {
  Camera,
  Volume2,
  MapPin,
  Search,
  Sparkles,
  Sun,
  Landmark,
  Train,
  ShoppingBag,
  Utensils,
  Award,
  Navigation,
  ArrowRight,
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeroBannerProps {
  language: Language;
  onQuickAction: (
    action:
      | 'scanner'
      | 'destinations'
      | 'planner'
      | 'weavers'
      | 'cuisine'
      | 'audio'
      | 'circuit-map'
      | 'traveler-toolkit'
      | 'transportation'
  ) => void;
  onSearch: (query: string) => void;
  onSelectDepartureCity?: (city: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  language,
  onQuickAction,
  onSearch,
  onSelectDepartureCity,
}) => {
  const [searchTab, setSearchTab] = useState<'transit' | 'monuments'>('transit');
  const [transitCity, setTransitCity] = useState('');
  const [monumentQuery, setMonumentQuery] = useState('');

  const t = TRANSLATIONS[language];
  const isKn = language === 'kn';

  const quickCities = [
    { name: isKn ? 'ಬೆಂಗಳೂರು' : 'Bengaluru', query: 'Bengaluru' },
    { name: isKn ? 'ಹೈದರಾಬಾದ್' : 'Hyderabad', query: 'Hyderabad' },
    { name: isKn ? 'ಮುಂಬೈ' : 'Mumbai', query: 'Mumbai' },
    { name: isKn ? 'ಪುಣೆ' : 'Pune', query: 'Pune' },
    { name: isKn ? 'ಗೋವಾ' : 'Goa', query: 'Goa' },
    { name: isKn ? 'ಹುಬ್ಬಳ್ಳಿ' : 'Hubballi', query: 'Hubballi' },
    { name: isKn ? 'ಬೆಳಗಾವಿ' : 'Belagavi', query: 'Belagavi' },
    { name: isKn ? 'ವಿಜಯಪುರ' : 'Vijayapura', query: 'Vijayapura' },
  ];

  const handleTransitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const city = transitCity.trim() || 'Bengaluru';
    if (onSelectDepartureCity) {
      onSelectDepartureCity(city);
    }
    onQuickAction('transportation');
  };

  const handleMonumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (monumentQuery.trim()) {
      onSearch(monumentQuery.trim());
    }
  };

  const handleCityChipClick = (city: string) => {
    setTransitCity(city);
    if (onSelectDepartureCity) {
      onSelectDepartureCity(city);
    }
    onQuickAction('transportation');
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Image with Heritage Sandstone Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/monuments/bhootanatha_temple.jpg"
          alt="Badami Cave Temples and Agastya Lake"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000 ease-out"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/assets/monuments/badami_caves.jpg';
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-[#0F172A]/75 to-transparent" />
        <div className="absolute inset-0 bg-radial from-amber-600/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-12 sm:pb-16">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold backdrop-blur-md">
            <Landmark className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.hero.badge}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-medium backdrop-blur-md">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.hero.weather}</span>
          </div>
          <button
            type="button"
            onClick={() => onSearch('hidden')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-amber-500/25 to-orange-500/25 border border-amber-300/50 text-amber-200 text-xs font-semibold backdrop-blur-md hover:bg-amber-500/35 transition-all cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isKn ? '೭ ಅಪರೂಪದ ಗುಪ್ತ ತಾಣಗಳು' : '✨ 7 Offbeat Hidden Gems'}</span>
          </button>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-3xl">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-amber-200 to-amber-500">
              {t.hero.titleHighlight}
            </span>{' '}
            {t.hero.titleRest}
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
            {t.hero.subtitle}
          </p>
        </div>

        {/* Direct Search & Transit Console */}
        <div className="mt-6 sm:mt-8 max-w-3xl bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-5 shadow-2xl">
          {/* Dual Tabs */}
          <div className="flex items-center gap-2 mb-3">
            <button
              type="button"
              onClick={() => setSearchTab('transit')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                searchTab === 'transit'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/20'
              }`}
            >
              <Train className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{isKn ? 'ಹೊರಡುವ ಊರು & ಸಾರಿಗೆ ಹುಡುಕಿ' : 'Where Are You Leaving From? (Transit)'}</span>
            </button>
            <button
              type="button"
              onClick={() => setSearchTab('monuments')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                searchTab === 'monuments'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/20'
              }`}
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{isKn ? 'ಸ್ಮಾರಕಗಳು & ಮಾಹಿತಿ ಹುಡುಕಿ' : 'Search Monuments & Guides'}</span>
            </button>
          </div>

          {/* Tab 1: Transit Search */}
          {searchTab === 'transit' ? (
            <div>
              <form onSubmit={handleTransitSubmit}>
                <div className="relative flex items-center shadow-inner rounded-xl overflow-hidden bg-white/15 backdrop-blur-md border border-white/30 p-1 focus-within:border-amber-400 focus-within:bg-white/20 transition-all">
                  <Train className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 ml-2.5 sm:ml-3 shrink-0" />
                  <input
                    type="text"
                    value={transitCity}
                    onChange={(e) => setTransitCity(e.target.value)}
                    placeholder={
                      isKn
                        ? 'ಹೊರಡುವ ಊರನ್ನು ನಮೂದಿಸಿ (ಉದಾ: ಬೆಂಗಳೂರು, ಹೈದರಾಬಾದ್, ಮುಂಬೈ, ಹುಬ್ಬಳ್ಳಿ...)'
                        : 'Enter departure city (e.g. Bengaluru, Hyderabad, Mumbai, Hubballi, Pune...)'
                    }
                    className="w-full min-w-0 px-2.5 sm:px-3 py-2 sm:py-2.5 bg-transparent text-white placeholder-slate-300 text-xs sm:text-base focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="shrink-0 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{isKn ? 'ಸಾರಿಗೆ ನೋಡಿ' : 'Find Transport'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Quick City Presets */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-300 font-medium">
                  {isKn ? 'ತ್ವರಿತ ಆಯ್ಕೆ:' : 'Quick Select:'}
                </span>
                {quickCities.map((c) => (
                  <button
                    key={c.query}
                    type="button"
                    onClick={() => handleCityChipClick(c.query)}
                    className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-amber-500 hover:text-slate-950 border border-white/15 text-slate-200 text-[11px] font-medium transition-all cursor-pointer"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Tab 2: Monuments Search */
            <form onSubmit={handleMonumentSubmit}>
              <div className="relative flex items-center shadow-inner rounded-xl overflow-hidden bg-white/15 backdrop-blur-md border border-white/30 p-1 focus-within:border-amber-400 focus-within:bg-white/20 transition-all">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 ml-2.5 sm:ml-3 shrink-0" />
                <input
                  type="text"
                  value={monumentQuery}
                  onChange={(e) => setMonumentQuery(e.target.value)}
                  placeholder={t.hero.searchPlaceholder}
                  className="w-full min-w-0 px-2.5 sm:px-3 py-2 sm:py-2.5 bg-transparent text-white placeholder-slate-300 text-xs sm:text-base focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="shrink-0 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  {t.hero.searchBtn}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* All Key Features Visible Quick-Access Rail */}
        <div className="mt-6 sm:mt-8">
          <div className="text-[11px] uppercase tracking-wider text-amber-300/80 font-bold mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{isKn ? 'ವೆಬ್‌ಸೈಟ್‌ನ ಪ್ರಮುಖ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಅನ್ವೇಷಿಸಿ:' : 'Explore All Core Features Directly:'}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-2.5">
            <button
              onClick={() => onQuickAction('destinations')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-left transition-all active:scale-95 cursor-pointer"
            >
              <Landmark className="w-4 h-4 text-amber-300 shrink-0" />
              <div className="min-w-0">
                <span className="block text-xs font-bold text-white truncate">
                  {isKn ? 'ಗುಹಾ ದೇವಾಲಯಗಳು' : 'Explore Sites'}
                </span>
                <span className="block text-[10px] text-slate-300 truncate">
                  {isKn ? '೧೫೦+ ದೇವಾಲಯಗಳು' : '150+ Temples'}
                </span>
              </div>
            </button>

            <button
              onClick={() => onQuickAction('circuit-map')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-left transition-all active:scale-95 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
              <div className="min-w-0">
                <span className="block text-xs font-bold text-white truncate">
                  {isKn ? 'ಸರ್ಕ್ಯೂಟ್ ಮ್ಯಾಪ್' : 'Circuit Map'}
                </span>
                <span className="block text-[10px] text-slate-300 truncate">
                  {isKn ? 'ದಾರಿ & ಕಿ.ಮೀ' : 'Driving Routes'}
                </span>
              </div>
            </button>

            <button
              onClick={() => onQuickAction('planner')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-left transition-all active:scale-95 cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-amber-300 shrink-0" />
              <div className="min-w-0">
                <span className="block text-xs font-bold text-white truncate">
                  {isKn ? 'ಪ್ರವಾಸ ಯೋಜನೆ' : 'Trip Planner'}
                </span>
                <span className="block text-[10px] text-slate-300 truncate">
                  {isKn ? '೧, ೨, ೩ ದಿನಗಳು' : '1, 2, 3 Day Plans'}
                </span>
              </div>
            </button>

            <button
              onClick={() => onQuickAction('weavers')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-left transition-all active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300 shrink-0" />
              <div className="min-w-0">
                <span className="block text-xs font-bold text-white truncate">
                  {isKn ? 'ಇಳಕಲ್ ನೇಕಾರರು' : 'Weavers Hub'}
                </span>
                <span className="block text-[10px] text-slate-300 truncate">
                  {isKn ? 'ಜಿ.ಐ. ಸೀರೆ & ಸಂಘಗಳು' : 'GI Silk & Crafts'}
                </span>
              </div>
            </button>

            <button
              onClick={() => onQuickAction('scanner')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-left hover:bg-amber-400 transition-all active:scale-95 cursor-pointer shadow-md"
            >
              <Camera className="w-4 h-4 text-slate-950 shrink-0" />
              <div className="min-w-0">
                <span className="block text-xs font-bold truncate">
                  {isKn ? 'AI ಸ್ಕ್ಯಾನರ್' : 'AI Scanner'}
                </span>
                <span className="block text-[10px] text-slate-800 truncate">
                  {isKn ? 'ಶಿಲ್ಪಕಲೆ ಗುರುತಿಸಿ' : 'Identify Carvings'}
                </span>
              </div>
            </button>

            <button
              onClick={() => onQuickAction('traveler-toolkit')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-left transition-all active:scale-95 cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-300 shrink-0" />
              <div className="min-w-0">
                <span className="block text-xs font-bold text-white truncate">
                  {isKn ? 'ಟೂಲ್ಕಿಟ್ & ಮುದ್ರೆ' : 'Toolkit'}
                </span>
                <span className="block text-[10px] text-slate-300 truncate">
                  {isKn ? 'ಕನ್ನಡ & SOS' : 'Phrasebook & SOS'}
                </span>
              </div>
            </button>

            <button
              onClick={() => onQuickAction('transportation')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-linear-to-r from-amber-600/40 to-amber-700/40 hover:from-amber-500/60 hover:to-amber-600/60 border border-amber-400/40 text-left transition-all active:scale-95 cursor-pointer"
            >
              <Train className="w-4 h-4 text-amber-300 shrink-0" />
              <div className="min-w-0">
                <span className="block text-xs font-bold text-white truncate">
                  {isKn ? 'ಸಾರಿಗೆ & ರೈಲು/ಬಸ್' : 'Transit Hub'}
                </span>
                <span className="block text-[10px] text-amber-200 truncate">
                  {isKn ? 'ಎಲ್ಲಾ ಸೌಲಭ್ಯಗಳು' : 'All Features'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Heritage Statistics Bar */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 border-t border-white/10 pt-5 sm:pt-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-xs">
            <span className="block font-serif text-lg sm:text-2xl font-bold text-amber-300 leading-tight">6 Clusters</span>
            <span className="text-[11px] sm:text-xs text-slate-300 leading-tight block mt-0.5">{t.hero.stats.clusters}</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-xs">
            <span className="block font-serif text-lg sm:text-2xl font-bold text-amber-300 leading-tight">150+ Temples</span>
            <span className="text-[11px] sm:text-xs text-slate-300 leading-tight block mt-0.5">{t.hero.stats.monuments}</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-xs">
            <span className="block font-serif text-lg sm:text-2xl font-bold text-amber-300 leading-tight">1,400+ Yrs</span>
            <span className="text-[11px] sm:text-xs text-slate-300 leading-tight block mt-0.5">{t.hero.stats.history}</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-xs">
            <span className="block font-serif text-lg sm:text-2xl font-bold text-amber-300 leading-tight">GI Tag #43</span>
            <span className="text-[11px] sm:text-xs text-slate-300 leading-tight block mt-0.5">{t.hero.stats.crafts}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
