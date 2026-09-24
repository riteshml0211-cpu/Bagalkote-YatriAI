import React, { useState } from 'react';
import { Compass, Volume2, Clock, Ticket, MapPin, Award, ArrowRight, X, Sparkles, Check, Info, ExternalLink } from 'lucide-react';
import { Language, Monument } from '../types';
import { MONUMENTS } from '../data/heritageData';
import { TRANSLATIONS } from '../data/translations';
import { AgastyaSunsetTracker } from './AgastyaSunsetTracker';
import { AsiTicketsModal } from './AsiTicketsModal';

interface DestinationExplorerProps {
  language: Language;
  onPlayMonumentAudio: (monument: Monument) => void;
  activeMonument: Monument | null;
  isPlayingAudio: boolean;
  onAskAi: (query: string) => void;
}

export const DestinationExplorer: React.FC<DestinationExplorerProps> = ({
  language,
  onPlayMonumentAudio,
  activeMonument,
  isPlayingAudio,
  onAskAi,
}) => {
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [modalMonument, setModalMonument] = useState<Monument | null>(null);
  const [isAsiModalOpen, setIsAsiModalOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const hiddenGemsCount = MONUMENTS.filter((m) => m.isHiddenGem).length;

  const clusterFilters = [
    { id: 'all', label: `${t.destinations.filters.all} (${MONUMENTS.length})` },
    {
      id: 'hidden-gems',
      label: language === 'kn' ? `✨ ಗುಪ್ತ ತಾಣಗಳು (${hiddenGemsCount})` : `✨ Offbeat & Hidden Gems (${hiddenGemsCount})`,
      highlight: true,
    },
    { id: 'Badami', label: t.destinations.filters.badami },
    { id: 'Pattadakal', label: t.destinations.filters.pattadakal },
    { id: 'Aihole', label: t.destinations.filters.aihole },
    { id: 'Mahakuta', label: t.destinations.filters.mahakuta },
    { id: 'Banashankari', label: t.destinations.filters.banashankari },
    { id: 'Kudalasangama', label: t.destinations.filters.kudalasangama },
    { id: 'Bilgi', label: language === 'kn' ? 'ಬಿಳಿಗಿ' : 'Bilgi' },
    { id: 'Guledgudda', label: language === 'kn' ? 'ಗುಳೇದಗುಡ್ಡ' : 'Guledgudda' },
  ];

  const filteredMonuments =
    selectedCluster === 'all'
      ? MONUMENTS
      : selectedCluster === 'hidden-gems'
      ? MONUMENTS.filter((m) => m.isHiddenGem)
      : MONUMENTS.filter((m) => m.cluster === selectedCluster);

  return (
    <section id="destinations" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-3 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.destinations.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {t.destinations.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.destinations.subtitle}
          </p>

          {/* Offbeat & Hidden Places Spotlight Callout */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 sm:p-2 bg-linear-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-300/80 rounded-2xl text-xs text-slate-700 shadow-xs max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-600 text-white font-bold text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'kn' ? '೭ ಗುಪ್ತ ತಾಣಗಳು' : '7 Hidden Gems'}</span>
            </span>
            <span className="font-medium text-slate-700">
              {language === 'kn'
                ? 'ಜನಸಂದಣಿಯಿಲ್ಲದ ಸಿದ್ಧನಕೊಳ್ಳ ಜಲಪಾತ, ಬಿಳಿಗಿ ಕಲ್ಯಾಣಿ, ಗುಳೇದಗುಡ್ಡ ಕೋಟೆ, ಬಾಚಿನಗುಡ್ಡ, ನಾಗರಾಳ, ಶಿವಯೋಗಮಂದಿರ & ಕೆಂಡೂರು.'
                : 'Explore crowd-free Siddhankolla gorge, Bilgi stepwell, Guledgudda fort, Bachinagudda, Nagral & Kendur.'}
            </span>
            <button
              type="button"
              onClick={() => setSelectedCluster('hidden-gems')}
              className="text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer decoration-amber-500 underline-offset-2 ml-1"
            >
              {language === 'kn' ? 'ಗುಪ್ತ ತಾಣಗಳನ್ನು ವೀಕ್ಷಿಸಿ →' : 'View Offbeat Gems →'}
            </button>
            <button
              type="button"
              onClick={() => setIsAsiModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-[11px] shadow-xs transition-all cursor-pointer ml-1"
            >
              <Ticket className="w-3.5 h-3.5 text-amber-200" />
              <span>{language === 'kn' ? 'ASI ಇ-ಟಿಕೆಟ್ (₹೨೫)' : 'ASI E-Tickets (₹25 Online)'}</span>
            </button>
          </div>
        </div>

        {/* Live Golden Hour & Agastya Lake Sunset Countdown Tracker */}
        <div className="mb-8">
          <AgastyaSunsetTracker language={language} />
        </div>

        {/* Cluster Filter Buttons */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          {clusterFilters.map((tab) => {
            const isSelected = selectedCluster === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCluster(tab.id)}
                className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-900/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Monuments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredMonuments.map((monument) => {
            const isThisAudioPlaying =
              isPlayingAudio && activeMonument?.id === monument.id;

            return (
              <div
                key={monument.id}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-amber-200/80 hover:border-amber-400 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Header with Badges */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                  <img
                    src={monument.image}
                    alt={monument.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/assets/monuments/badami_caves.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-amber-400/40">
                      {language === 'kn' ? monument.clusterKn : monument.cluster}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {monument.isUnesco && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-bold shadow-xs">
                          <Award className="w-3 h-3 text-yellow-300" />
                          <span>UNESCO</span>
                        </span>
                      )}

                      {monument.isHiddenGem && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-linear-to-r from-amber-400 to-amber-500 text-slate-950 text-[11px] font-bold shadow-xs">
                          <Sparkles className="w-3 h-3 text-slate-950" />
                          <span>{language === 'kn' ? 'ಗುಪ್ತ ತಾಣ' : 'Offbeat Gem'}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Distance badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-medium bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>
                      {monument.distanceFromBadamiKm} {t.destinations.distanceFromBadami}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 group-hover:text-amber-800 transition-colors">
                      {language === 'kn' ? monument.nameKn : monument.name}
                    </h3>
                    <p className="text-xs text-amber-800 font-semibold mt-1">
                      {language === 'kn' ? monument.dynastyKn : monument.dynasty} • {monument.century}
                    </p>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {language === 'kn' ? monument.descriptionKn : monument.descriptionEn}
                    </p>
                  </div>

                  {/* Operational Details Row */}
                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-slate-500 shrink-0">
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{t.destinations.timingsTitle}</span>
                      </span>
                      <span className="font-semibold text-slate-800 text-right truncate">
                        {language === 'kn' ? monument.operationalTimingsKn : monument.operationalTimings}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-slate-500 shrink-0">
                        <Ticket className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{t.destinations.entryTitle}</span>
                      </span>
                      <span className="font-semibold text-slate-800 text-right truncate">
                        {monument.entryFee.indian === 0
                          ? language === 'kn'
                            ? 'ಉಚಿತ ಪ್ರವೇಶ'
                            : 'Free Entry'
                          : `₹${monument.entryFee.indian} (Ind) / ₹${monument.entryFee.foreigner} (Frn)`}
                      </span>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onPlayMonumentAudio(monument)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isThisAudioPlaying
                          ? 'bg-amber-700 text-white animate-pulse'
                          : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">
                        {isThisAudioPlaying
                          ? language === 'kn'
                            ? 'ಆಲಿಸುತ್ತಿದೆ...'
                            : 'Playing...'
                          : `${t.destinations.playAudioGuide} (${Math.round(monument.audioDurationSeconds / 60)}m)`}
                      </span>
                    </button>

                    <button
                      onClick={() => setModalMonument(monument)}
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-colors cursor-pointer shrink-0"
                      title={t.destinations.viewDetails}
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Full Monument Details */}
        {modalMonument && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl sm:rounded-3xl shadow-2xl overflow-y-auto border border-amber-200 flex flex-col">
              {/* Modal Header */}
              <div className="relative aspect-16/9 sm:aspect-21/9 bg-slate-900 shrink-0">
                <img
                  src={modalMonument.image}
                  alt={modalMonument.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/assets/monuments/badami_caves.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <button
                  onClick={() => setModalMonument(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 text-white">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-600 text-[10px] font-bold uppercase tracking-wider">
                    {language === 'kn' ? modalMonument.clusterKn : modalMonument.cluster}
                  </span>
                  <h3 className="font-serif text-xl sm:text-3xl font-bold mt-1">
                    {language === 'kn' ? modalMonument.nameKn : modalMonument.name}
                  </h3>
                  <p className="text-xs text-amber-300 font-medium">
                    {language === 'kn' ? modalMonument.dynastyKn : modalMonument.dynasty} • {modalMonument.century}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
                {/* Audio guide trigger banner inside modal */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                      <Volume2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-amber-950">
                        {t.destinations.modal.listenSnippet}
                      </h4>
                      <p className="text-xs text-slate-600">
                        {language === 'kn'
                          ? `${modalMonument.nameKn} ನ ವಿವರಣಾತ್ಮಕ ಆಡಿಯೋ ಆಲಿಸಿ`
                          : `Listen to audio tour for ${modalMonument.name}`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onPlayMonumentAudio(modalMonument);
                    }}
                    className="shrink-0 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    {language === 'kn' ? 'ಪ್ಲೇ ಮಾಡಿ' : 'Play Audio'}
                  </button>
                </div>

                {/* Historical Background */}
                <div>
                  <h4 className="font-serif font-bold text-lg text-slate-900 mb-2">
                    {t.destinations.modal.about}
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {language === 'kn' ? modalMonument.descriptionKn : modalMonument.descriptionEn}
                  </p>
                </div>

                {/* Architectural Highlights */}
                <div>
                  <h4 className="font-serif font-bold text-lg text-slate-900 mb-2">
                    {t.destinations.modal.architecture}
                  </h4>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-3 text-xs font-semibold text-amber-900">
                    {language === 'kn'
                      ? modalMonument.architecturalStyleKn
                      : modalMonument.architecturalStyle}
                  </div>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {(language === 'kn'
                      ? modalMonument.keyFeaturesKn
                      : modalMonument.keyFeaturesEn
                    ).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practical Traveler Guidelines */}
                <div>
                  <h4 className="font-serif font-bold text-lg text-slate-900 mb-2">
                    {t.destinations.modal.tips}
                  </h4>
                  <div className="space-y-2">
                    {(language === 'kn'
                      ? modalMonument.visitorTipsKn
                      : modalMonument.visitorTipsEn
                    ).map((tip, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2"
                      >
                        <Info className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      onAskAi(
                        language === 'kn'
                          ? `${modalMonument.nameKn} ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ಇತಿಹಾಸ ಮತ್ತು ವಿವರ ತಿಳಿಸಿ`
                          : `Tell me more in-depth history about ${modalMonument.name}`
                      );
                      setModalMonument(null);
                    }}
                    className="flex items-center gap-1.5 text-xs text-amber-800 font-bold hover:underline cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>
                      {language === 'kn'
                        ? 'AI ಗೈಡ್ ಜೊತೆ ಈ ಸ್ಮಾರಕದ ಬಗ್ಗೆ ಚರ್ಚಿಸಿ'
                        : 'Ask AI Guide About This Monument'}
                    </span>
                  </button>

                  <button
                    onClick={() => setModalMonument(null)}
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
                  >
                    {t.destinations.modal.close}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Official ASI E-Tickets Portal & Pricing Modal */}
        <AsiTicketsModal
          isOpen={isAsiModalOpen}
          onClose={() => setIsAsiModalOpen(false)}
          language={language}
        />
      </div>
    </section>
  );
};
