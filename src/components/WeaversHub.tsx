import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Phone, MapPin, Award, Heart, Utensils, Home, Star, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { ARTISAN_COOPERATIVES, LOCAL_CUISINE, HOMESTAYS } from '../data/heritageData';
import { TRANSLATIONS } from '../data/translations';
import { GIAuthenticityValidator } from './GIAuthenticityValidator';

interface WeaversHubProps {
  language: Language;
  onAskAi: (topic: string) => void;
  activeTab?: 'sarees' | 'cooperatives' | 'validator' | 'cuisine' | 'homestays';
  onTabChange?: (tab: 'sarees' | 'cooperatives' | 'validator' | 'cuisine' | 'homestays') => void;
}

export const WeaversHub: React.FC<WeaversHubProps> = ({
  language,
  onAskAi,
  activeTab: controlledTab,
  onTabChange,
}) => {
  const [internalTab, setInternalTab] = useState<'sarees' | 'cooperatives' | 'validator' | 'cuisine' | 'homestays'>('sarees');
  const activeTab = controlledTab ?? internalTab;

  const handleTabClick = (tab: 'sarees' | 'cooperatives' | 'validator' | 'cuisine' | 'homestays') => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };

  const t = TRANSLATIONS[language];

  return (
    <section id="weavers" className="py-16 sm:py-24 bg-[#FDFBF7] border-t border-b border-amber-900/10 relative">
      <div id="cuisine" className="absolute top-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-3 shadow-xs">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>{t.weavers.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {t.weavers.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.weavers.subtitle}
          </p>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          <button
            onClick={() => handleTabClick('sarees')}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 ${
              activeTab === 'sarees'
                ? 'bg-amber-700 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-amber-50 border border-amber-200'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>{t.weavers.tabs.sarees}</span>
          </button>

          <button
            onClick={() => handleTabClick('cooperatives')}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 ${
              activeTab === 'cooperatives'
                ? 'bg-amber-700 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-amber-50 border border-amber-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>{t.weavers.tabs.cooperatives}</span>
          </button>

          <button
            onClick={() => handleTabClick('validator')}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 ${
              activeTab === 'validator'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
            <span>{language === 'kn' ? '✨ ಅಸಲಿ ಸೀರೆ ಪರೀಕ್ಷಕ' : '✨ GI Authenticity Validator'}</span>
          </button>

          <button
            onClick={() => handleTabClick('cuisine')}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 ${
              activeTab === 'cuisine'
                ? 'bg-amber-700 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-amber-50 border border-amber-200'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>{t.weavers.tabs.cuisine}</span>
          </button>

          <button
            onClick={() => handleTabClick('homestays')}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 ${
              activeTab === 'homestays'
                ? 'bg-amber-700 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-amber-50 border border-amber-200'
            }`}
          >
            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>{t.weavers.tabs.homestays}</span>
          </button>
        </div>

        {/* Tab 1: GI-Tagged Ilkal Sarees & Living Weaving Craft */}
        {activeTab === 'sarees' && (
          <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-300">
            {/* Story Showcase Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-amber-200 p-4 sm:p-8 lg:p-10 shadow-lg overflow-hidden relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                <div className="lg:col-span-7 space-y-3 sm:space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] sm:text-xs font-bold border border-amber-300">
                    <Award className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>Geographical Indication (GI Tag #43)</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-3xl font-bold text-slate-900 leading-tight">
                    {t.weavers.sareeStoryTitle}
                  </h3>
                  <p className="text-xs sm:text-base text-slate-700 leading-relaxed">
                    {t.weavers.sareeStoryPara}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 sm:pt-2">
                    <div className="p-2.5 sm:p-3 bg-amber-50 rounded-xl border border-amber-200">
                      <span className="block text-xs font-bold text-amber-900">Topetenchi Pallu</span>
                      <span className="text-[11px] text-slate-600">
                        {language === 'kn' ? 'ಕೆಂಪು ರೇಷ್ಮೆಯ ಭವ್ಯ ಸೆರಗು' : 'Signature crimson silk pallu with white temple spires'}
                      </span>
                    </div>
                    <div className="p-2.5 sm:p-3 bg-amber-50 rounded-xl border border-amber-200">
                      <span className="block text-xs font-bold text-amber-900">Kondi Technique</span>
                      <span className="text-[11px] text-slate-600">
                        {language === 'kn' ? 'ಪ್ರಾಚೀನ ಗಂಟು ನೇಯ್ಗೆ' : 'Ancient warp-interlocking joint without cutting warp'}
                      </span>
                    </div>
                    <div className="p-2.5 sm:p-3 bg-amber-50 rounded-xl border border-amber-200">
                      <span className="block text-xs font-bold text-amber-900">Kasuti Embroidery</span>
                      <span className="text-[11px] text-slate-600">
                        {language === 'kn' ? 'ದಾರದ ಲೆಕ್ಕದ ಕೈ ಕಸೂತಿ' : 'Thread-counted geometric temple chariot motifs'}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium">
                    {t.weavers.buyDirectNote}
                  </div>
                </div>

                <div className="lg:col-span-5 relative">
                  <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xl border-2 border-amber-200">
                    <img
                      src="/assets/monuments/ilkal_saree.jpg"
                      alt="Traditional Ilkal Saree Weaving"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/assets/monuments/ilkal_weaving.jpg';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Artisan Cooperatives Directory */}
        {activeTab === 'cooperatives' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-300">
            {ARTISAN_COOPERATIVES.map((coop) => (
              <div
                key={coop.id}
                className="bg-white rounded-3xl border border-amber-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                    <img
                      src={coop.image}
                      alt={coop.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/assets/monuments/ilkal_saree.jpg';
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-300 border border-amber-400/40">
                      {language === 'kn' ? coop.locationKn : coop.location}
                    </div>
                    {coop.giTagCertified && (
                      <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-xs">
                        GI Certified
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-slate-900">
                        {language === 'kn' ? coop.nameKn : coop.name}
                      </h4>
                      <p className="text-xs text-amber-800 font-semibold mt-0.5">
                        {language === 'kn' ? coop.specialtyKn : coop.specialty}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {language === 'kn' ? coop.descriptionKn : coop.descriptionEn}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-700 bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.weavers.coopCard.established}:</span>
                        <span className="font-bold">{coop.established}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.weavers.coopCard.artisans}:</span>
                        <span className="font-bold text-amber-900">{coop.artisanCount} Active Weavers</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.weavers.coopCard.priceRange}:</span>
                        <span className="font-bold text-emerald-800">{coop.priceRange}</span>
                      </div>
                    </div>

                    {/* Master Weaver quote */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs italic text-slate-700">
                      <span className="font-semibold not-italic block text-amber-900 mb-0.5">
                        {language === 'kn' ? coop.masterWeaver.nameKn : coop.masterWeaver.name} ({coop.masterWeaver.experienceYears} yrs):
                      </span>
                      "{language === 'kn' ? coop.masterWeaver.quoteKn : coop.masterWeaver.quoteEn}"
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-2">
                  <div className="text-[11px] text-slate-500 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-700 mt-0.5 shrink-0" />
                    <span>{coop.address}</span>
                  </div>

                  <a
                    href={`tel:${coop.phone.split('/')[0].trim()}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{t.weavers.coopCard.contact}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: GI Authenticity Validator */}
        {activeTab === 'validator' && (
          <div className="animate-in fade-in duration-300">
            <GIAuthenticityValidator language={language} onAskAi={onAskAi} />
          </div>
        )}

        {/* Tab 3: Local North Karnataka Cuisine Guide */}
        {activeTab === 'cuisine' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                {t.weavers.cuisineSectionTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {t.weavers.cuisineSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LOCAL_CUISINE.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-white rounded-3xl border border-amber-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div className="aspect-16/10 overflow-hidden bg-slate-900 relative">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/assets/monuments/jolada_rotti.jpg';
                      }}
                    />
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-amber-300">
                      {dish.dietary}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-slate-900">
                        {language === 'kn' ? dish.nameKn : dish.name}
                      </h4>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {language === 'kn' ? dish.descriptionKn : dish.descriptionEn}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-xs text-amber-900">
                      <span className="font-bold block text-slate-700">
                        {language === 'kn' ? 'ಎಲ್ಲಿ ಸವಿಯಬಹುದು:' : 'Where to eat:'}
                      </span>
                      <span>{language === 'kn' ? dish.bestPlaceToTryKn : dish.bestPlaceToTryEn}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Homestays & Farm Stays */}
        {activeTab === 'homestays' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                {t.weavers.homestaysTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {t.weavers.homestaysSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {HOMESTAYS.map((stay) => (
                <div
                  key={stay.id}
                  className="bg-white rounded-3xl border border-amber-200 overflow-hidden shadow-sm hover:shadow-lg transition-all grid grid-cols-1 sm:grid-cols-12"
                >
                  <div className="sm:col-span-5 aspect-4/3 sm:aspect-auto bg-slate-900 relative">
                    <img
                      src={stay.image}
                      alt={stay.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/assets/monuments/bhootanatha_temple.jpg';
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] text-white flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="font-bold">{stay.rating}</span>
                    </div>
                  </div>

                  <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-slate-900">
                        {language === 'kn' ? stay.nameKn : stay.name}
                      </h4>
                      <p className="text-xs text-amber-800 font-semibold mt-0.5">
                        {language === 'kn' ? stay.locationKn : stay.location}
                      </p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {language === 'kn' ? stay.descriptionKn : stay.descriptionEn}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {(language === 'kn' ? stay.highlightsKn : stay.highlightsEn).map((h, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 text-[10px] font-medium border border-amber-200"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Starting from</span>
                        <span className="text-base font-bold text-slate-900">{stay.pricePerNight}</span>
                        <span className="text-[10px] text-slate-500"> / night</span>
                      </div>

                      <a
                        href={`tel:${stay.contact}`}
                        className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{language === 'kn' ? 'ಸಂಪರ್ಕಿಸಿ' : 'Contact Host'}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
