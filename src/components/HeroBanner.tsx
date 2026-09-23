import React, { useState } from 'react';
import { Camera, Volume2, MapPin, Search, Sparkles, Sun, ShieldCheck, Landmark } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeroBannerProps {
  language: Language;
  onQuickAction: (action: 'scanner' | 'destinations' | 'planner' | 'weavers' | 'audio') => void;
  onSearch: (query: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  language,
  onQuickAction,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const t = TRANSLATIONS[language];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-12 sm:pb-20">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold backdrop-blur-md">
            <Landmark className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.hero.badge}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-medium backdrop-blur-md">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.hero.weather}</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-3xl">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-amber-200 to-amber-500">
              {t.hero.titleHighlight}
            </span>{' '}
            {t.hero.titleRest}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
            {t.hero.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mt-8 max-w-2xl">
          <div className="relative flex items-center shadow-xl rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 p-1.5 focus-within:border-amber-400/80 transition-all">
            <Search className="w-5 h-5 text-amber-300 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.hero.searchPlaceholder}
              className="w-full px-3 py-2.5 bg-transparent text-white placeholder-slate-300 text-sm sm:text-base focus:outline-hidden"
            />
            <button
              type="submit"
              className="shrink-0 px-4 sm:px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {t.hero.searchBtn}
            </button>
          </div>
        </form>

        {/* Quick Action CTAs */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onQuickAction('scanner')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-900/40 active:scale-95 cursor-pointer"
          >
            <Camera className="w-4 h-4 text-slate-900" />
            <span>{t.hero.quickScanBtn}</span>
          </button>

          <button
            onClick={() => onQuickAction('audio')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all backdrop-blur-md active:scale-95 cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-amber-300" />
            <span>{t.hero.audioTourBtn}</span>
          </button>

          <button
            onClick={() => onQuickAction('planner')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all backdrop-blur-md active:scale-95 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-amber-300" />
            <span>{t.hero.planTripBtn}</span>
          </button>
        </div>

        {/* Heritage Statistics Bar */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 border-t border-white/10 pt-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-xs">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-amber-300">6 Clusters</span>
            <span className="text-xs text-slate-300">{t.hero.stats.clusters}</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-xs">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-amber-300">150+ Temples</span>
            <span className="text-xs text-slate-300">{t.hero.stats.monuments}</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-xs">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-amber-300">1,400 Years</span>
            <span className="text-xs text-slate-300">{t.hero.stats.history}</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-xs">
            <span className="block font-serif text-xl sm:text-2xl font-bold text-amber-300">GI Tag #43</span>
            <span className="text-xs text-slate-300">{t.hero.stats.crafts}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
