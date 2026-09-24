import React, { useState, useEffect, useMemo } from 'react';
import {
  Volume2,
  Sun,
  ShieldCheck,
  Award,
  Search,
  Check,
  PhoneCall,
  Printer,
  Sparkles,
  Download,
  Flame,
  Bookmark,
  ChevronRight,
  Clock,
  Bus,
  MapPin,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '../types';
import {
  TRAVEL_PHRASES,
  GOLDEN_HOUR_SLOTS,
  EMERGENCY_CONTACTS,
  BUS_ROUTES,
  HERITAGE_STAMPS,
  TravelPhrase,
  GoldenHourSlot,
  HeritageStamp,
} from '../data/travelToolkitData';
import { TRANSLATIONS } from '../data/translations';
import { HeritageCertificateModal } from './HeritageCertificateModal';

interface TravelerToolkitProps {
  language: Language;
  onPlaySpeech?: (text: string) => void;
}

export const TravelerToolkit: React.FC<TravelerToolkitProps> = ({
  language,
  onPlaySpeech,
}) => {
  const [activeTab, setActiveTab] = useState<'phrasebook' | 'golden_hour' | 'offline_pass' | 'passport'>('phrasebook');

  // Phrasebook state
  const [selectedPhraseCategory, setSelectedPhraseCategory] = useState<string>('all');
  const [phraseSearchQuery, setPhraseSearchQuery] = useState('');
  const [playingPhraseId, setPlayingPhraseId] = useState<string | null>(null);

  // Passport state with localStorage
  const [unlockedStamps, setUnlockedStamps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bagalkote_heritage_passport');
      return saved ? JSON.parse(saved) : ['Badami']; // Default 1 unlocked for delight
    } catch {
      return ['Badami'];
    }
  });

  const [offlineSaved, setOfflineSaved] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const t = TRANSLATIONS[language];

  // Save stamps to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bagalkote_heritage_passport', JSON.stringify(unlockedStamps));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [unlockedStamps]);

  // Current hour of day to highlight active golden hour slot
  const currentHour = new Date().getHours();
  const activeSlotIndex = useMemo(() => {
    if (currentHour >= 6 && currentHour < 8.5) return 0; // 06:00 - 08:30 AM
    if (currentHour >= 8.5 && currentHour < 11.5) return 1; // 08:30 - 11:30 AM
    if (currentHour >= 11.5 && currentHour < 15) return 2; // 11:30 AM - 03:00 PM
    if (currentHour >= 15 && currentHour < 16.75) return 3; // 03:00 - 04:45 PM
    if (currentHour >= 16.75 && currentHour < 18.5) return 4; // 04:45 - 06:15 PM
    return 0; // default to morning
  }, [currentHour]);

  // Phrase speech trigger
  const handleSpeakPhrase = (phrase: TravelPhrase) => {
    setPlayingPhraseId(phrase.id);
    if (onPlaySpeech) {
      onPlaySpeech(phrase.kannada);
    } else {
      const utterance = new SpeechSynthesisUtterance(phrase.kannada);
      utterance.lang = 'kn-IN';
      window.speechSynthesis?.speak(utterance);
    }
    setTimeout(() => {
      setPlayingPhraseId(null);
    }, 2500);
  };

  // Filtered phrases
  const filteredPhrases = useMemo(() => {
    return TRAVEL_PHRASES.filter((p) => {
      const matchesCat = selectedPhraseCategory === 'all' || p.category === selectedPhraseCategory;
      const q = phraseSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.english.toLowerCase().includes(q) ||
        p.kannada.includes(q) ||
        p.transliteration.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedPhraseCategory, phraseSearchQuery]);

  // Toggle stamp in passport
  const toggleStamp = (clusterId: string) => {
    setUnlockedStamps((prev) =>
      prev.includes(clusterId) ? prev.filter((id) => id !== clusterId) : [...prev, clusterId]
    );
  };

  // Rank calculation based on stamps
  const explorerRank = useMemo(() => {
    const count = unlockedStamps.length;
    if (count === 6) {
      return {
        titleEn: 'Grand Sovereign of Vatapi',
        titleKn: 'ವಾತಾಪಿ ಮಹಾ ಸಾಮ್ರಾಟ',
        level: 'Level 4 (Legendary)',
        badge: '👑',
        color: 'from-amber-600 via-yellow-500 to-amber-700',
      };
    }
    if (count >= 4) {
      return {
        titleEn: 'Chalukyan Temple Master',
        titleKn: 'ಚಾಲುಕ್ಯ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪಿ',
        level: 'Level 3 (Scholar)',
        badge: '🏛️',
        color: 'from-amber-600 to-amber-800',
      };
    }
    if (count >= 2) {
      return {
        titleEn: 'Malaprabha Valley Wanderer',
        titleKn: 'ಮಲಪ್ರಭಾ ಕಣಿವೆ ಯಾತ್ರಿಕ',
        level: 'Level 2 (Explorer)',
        badge: '🧭',
        color: 'from-emerald-600 to-teal-700',
      };
    }
    return {
      titleEn: 'Vatapi Heritage Novice',
      titleKn: 'ವಾತಾಪಿ ನವ ಯಾತ್ರಿಕ',
      level: 'Level 1 (Initiate)',
      badge: '📜',
      color: 'from-slate-700 to-slate-900',
    };
  }, [unlockedStamps]);

  // Handle Save Offline Pocket Pass
  const handleSaveOffline = () => {
    try {
      const dataToSave = {
        savedAt: new Date().toISOString(),
        emergency: EMERGENCY_CONTACTS,
        buses: BUS_ROUTES,
        stamps: unlockedStamps,
      };
      localStorage.setItem('bagalkote_offline_pocket_pass', JSON.stringify(dataToSave));
      setOfflineSaved(true);
      setTimeout(() => setOfflineSaved(false), 3000);
    } catch (e) {
      console.warn('Offline save error:', e);
    }
  };

  const handlePrintPass = () => {
    window.print();
  };

  return (
    <section id="traveler-toolkit" className="py-14 sm:py-20 bg-white border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{language === 'kn' ? 'ಪ್ರವಾಸಿ ಟೂಲ್ಕಿಟ್ & ಆಫ್‌ಲೈನ್ ಸೂಟ್' : 'Tourist Companion Suite'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {language === 'kn' ? 'ಯಾತ್ರಿಕ ಸಹಾಯ ಸಾಧನಗಳು & ಪಾಸ್‌ಪೋರ್ಟ್' : 'Traveler Toolkit & Heritage Passport'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {language === 'kn'
              ? 'ಕನ್ನಡ ಸಂಭಾಷಣಾ ಮಾರ್ಗದರ್ಶಿ, ಬಿಸಿಲು ನಿಯಂತ್ರಣ ರಾಡಾರ್, ನೆಟ್‌ವರ್ಕ್ ಇಲ್ಲದಿದ್ದರೂ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಆಫ್‌ಲೈನ್ ಫೀಲ್ಡ್ ಪಾಸ್ ಮತ್ತು ಚಾಲುಕ್ಯ ಪಾಸ್‌ಪೋರ್ಟ್.'
              : 'Essential real-world tools: bilingual traveler audio phrasebook, heat & golden hour radar, zero-network emergency pocket pass, and gamified Chalukya passport.'}
          </p>
        </div>

        {/* Toolkit Top Navigation Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('phrasebook')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'phrasebook'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-100 hover:bg-amber-50 text-slate-700 border border-slate-200'
            }`}
          >
            <Volume2 className="w-4 h-4 shrink-0" />
            <span>{language === 'kn' ? '೧. ಕನ್ನಡ ಸಂಭಾಷಣಾ ಗೈಡ್' : '1. Kannada Travel Phrasebook'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('golden_hour')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'golden_hour'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-100 hover:bg-amber-50 text-slate-700 border border-slate-200'
            }`}
          >
            <Sun className="w-4 h-4 shrink-0 text-amber-500" />
            <span>{language === 'kn' ? '೨. ಬಿಸಿಲು & ಸುವರ್ಣ ಸಮಯ ರಾಡಾರ್' : '2. Sun & Heat Avoidance Radar'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('offline_pass')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'offline_pass'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-100 hover:bg-amber-50 text-slate-700 border border-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{language === 'kn' ? '೩. ಆಫ್‌ಲೈನ್ ಪಾಕೆಟ್ ಪಾಸ್' : '3. Offline Pocket Field Pass'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('passport')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'passport'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-slate-100 hover:bg-amber-50 text-slate-700 border border-slate-200'
            }`}
          >
            <Award className="w-4 h-4 shrink-0" />
            <span>{language === 'kn' ? '೪. ಚಾಲುಕ್ಯ ಪರಂಪರೆ ಪಾಸ್‌ಪೋರ್ಟ್' : '4. Heritage Passport'}</span>
            <span className="ml-1 px-1.5 py-0.2 bg-amber-500 text-slate-950 font-mono text-[10px] rounded-full font-bold">
              {unlockedStamps.length}/6
            </span>
          </button>
        </div>

        {/* TAB 1: KANNADA TRAVEL PHRASEBOOK */}
        {activeTab === 'phrasebook' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Filter Bar & Search */}
            <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-3xl border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              {/* Category pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                {[
                  { id: 'all', labelEn: 'All Phrases', labelKn: 'ಎಲ್ಲವೂ', icon: '✨' },
                  { id: 'transport', labelEn: 'Auto & Travel', labelKn: 'ಆಟೋ & ಸಾರಿಗೆ', icon: '🛺' },
                  { id: 'dining', labelEn: 'Food & Meals', labelKn: 'ಊಟ & ತಿಂಡಿ', icon: '🍲' },
                  { id: 'shopping', labelEn: 'Ilkal Sarees', labelKn: 'ಸೀರೆ ಖರೀದಿ', icon: '🧵' },
                  { id: 'monuments', labelEn: 'Tickets & Caves', labelKn: 'ಸ್ಮಾರಕ & ಟಿಕೆಟ್', icon: '🏛️' },
                  { id: 'basics', labelEn: 'Courtesy', labelKn: 'ಶಿಷ್ಟಾಚಾರ', icon: '🙏' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedPhraseCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedPhraseCategory === cat.id
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-200/60'
                    }`}
                  >
                    <span>{cat.icon} </span>
                    <span>{language === 'kn' ? cat.labelKn : cat.labelEn}</span>
                  </button>
                ))}
              </div>

              {/* Search box */}
              <div className="relative min-w-[220px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={phraseSearchQuery}
                  onChange={(e) => setPhraseSearchQuery(e.target.value)}
                  placeholder={language === 'kn' ? 'ವಾಕ್ಯ ಹುಡುಕಿ (ಉದಾ: ರೊಟ್ಟಿ, ಆಟೋ)...' : 'Search phrases (e.g. rotti, auto, ticket)...'}
                  className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-white border border-amber-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-800"
                />
              </div>
            </div>

            {/* Phrases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPhrases.map((phrase) => {
                const isPlaying = playingPhraseId === phrase.id;
                return (
                  <div
                    key={phrase.id}
                    className="bg-white rounded-2xl sm:rounded-3xl border border-amber-200/90 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                          {phrase.categoryIcon} {language === 'kn' ? phrase.categoryLabelKn : phrase.categoryLabelEn}
                        </span>

                        {/* Pronunciation Audio Button */}
                        <button
                          type="button"
                          onClick={() => handleSpeakPhrase(phrase)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isPlaying
                              ? 'bg-amber-600 text-white animate-pulse'
                              : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                          }`}
                          title="Click to speak aloud in Kannada"
                        >
                          <Volume2 className="w-3.5 h-3.5 shrink-0" />
                          <span>{isPlaying ? (language === 'kn' ? 'ಧ್ವನಿ...' : 'Speaking...') : (language === 'kn' ? 'ಧ್ವನಿ ಆಲಿಸಿ' : 'Listen Pronunciation')}</span>
                        </button>
                      </div>

                      {/* Kannada Script (Prominent) */}
                      <h4 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-snug">
                        {phrase.kannada}
                      </h4>

                      {/* Romanized Phonetic Transliteration */}
                      <p className="text-xs sm:text-sm font-mono text-amber-800 font-semibold bg-amber-50/60 p-2 rounded-xl border border-amber-200/40">
                        🗣️ &ldquo;{phrase.transliteration}&rdquo;
                      </p>

                      {/* English Meaning */}
                      <p className="text-xs text-slate-700 font-medium">
                        <strong>Meaning:</strong> {phrase.english}
                      </p>
                    </div>

                    {/* Context Hint */}
                    <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      💡 {language === 'kn' ? phrase.contextKn : phrase.contextEn}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: GOLDEN HOUR & HEAT RADAR */}
        {activeTab === 'golden_hour' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Live Advice Banner based on device time */}
            <div className="bg-linear-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-4 sm:p-6 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 text-2xl shrink-0">
                  <Sun className="w-6 h-6 animate-spin duration-3000" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    ● {language === 'kn' ? 'ಲೈವ್ ಸಮಯ ರಾಡಾರ್' : 'Live Real-Time Radiation & Lighting Radar'}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                    {language === 'kn' ? 'ಈ ಕ್ಷಣಕ್ಕೆ ಸೂಕ್ತವಾದ ತಾಣ ಯಾವುದು?' : 'What Should You Visit Right Now?'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {language === 'kn'
                      ? `ಸ್ಥಳೀಯ ಸಮಯಕ್ಕೆ ತಕ್ಕಂತೆ ಪ್ರಸ್ತುತ '${GOLDEN_HOUR_SLOTS[activeSlotIndex].titleKn}' ಚಾಲ್ತಿಯಲ್ಲಿದೆ.`
                      : `Based on your device clock, the active window is: '${GOLDEN_HOUR_SLOTS[activeSlotIndex].titleEn}'.`}
                  </p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center shrink-0">
                <span className="text-[10px] text-amber-300 block font-bold uppercase">{language === 'kn' ? 'ಅಂದಾಜು ತಾಪಮಾನ' : 'Current Temp Band'}</span>
                <span className="font-serif font-bold text-lg text-white">
                  {GOLDEN_HOUR_SLOTS[activeSlotIndex].tempEstimate}
                </span>
              </div>
            </div>

            {/* Time Slot Timeline Cards */}
            <div className="space-y-4">
              {GOLDEN_HOUR_SLOTS.map((slot, idx) => {
                const isCurrent = idx === activeSlotIndex;
                return (
                  <div
                    key={slot.timeRange}
                    className={`rounded-3xl border transition-all p-4 sm:p-6 ${
                      isCurrent
                        ? 'bg-amber-50/80 border-amber-500 shadow-md ring-2 ring-amber-400/40'
                        : 'bg-white border-amber-200/80 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-100 pb-3 mb-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-xl bg-stone-900 text-amber-300">
                          {slot.timeRange}
                        </span>
                        <h4 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                          {language === 'kn' ? slot.titleKn : slot.titleEn}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCurrent && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold animate-pulse">
                            {language === 'kn' ? 'ಈಗ ಚಾಲ್ತಿಯಲ್ಲಿದೆ' : 'ACTIVE RIGHT NOW'}
                          </span>
                        )}
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-lg ${
                            slot.heatLevel === 'high_heat'
                              ? 'bg-red-100 text-red-800'
                              : slot.heatLevel === 'cool'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {slot.tempEstimate}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                      {language === 'kn' ? slot.recommendationKn : slot.recommendationEn}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      {/* Best locations */}
                      <div className="bg-white p-3 rounded-2xl border border-amber-200/60">
                        <span className="font-bold text-emerald-800 block mb-1">
                          ✓ {language === 'kn' ? 'ಭೇಟಿ ನೀಡಬೇಕಾದ ಅತ್ಯುತ್ತಮ ಸ್ಥಳಗಳು:' : 'Top Recommended Spots:'}
                        </span>
                        <ul className="space-y-1 text-slate-700">
                          {(language === 'kn' ? slot.bestLocationsKn : slot.bestLocationsEn).map((loc, lIdx) => (
                            <li key={lIdx} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>{loc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Photo Azimuth tip */}
                      <div className="bg-white p-3 rounded-2xl border border-amber-200/60">
                        <span className="font-bold text-amber-900 block mb-1">
                          📸 {language === 'kn' ? 'ಫೋಟೋಗ್ರಫಿ ಲೈಟಿಂಗ್ ಟಿಪ್:' : 'Photography Light Tip:'}
                        </span>
                        <p className="text-slate-600 leading-relaxed">
                          {language === 'kn' ? slot.photoTipKn : slot.photoTipEn}
                        </p>
                      </div>

                      {/* Heat Avoidance Warning */}
                      <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200">
                        <span className="font-bold text-red-700 block mb-1">
                          ⚠️ {language === 'kn' ? 'ಏನು ಮಾಡಬಾರದು:' : 'What to Avoid:'}
                        </span>
                        <p className="text-slate-600 leading-relaxed">
                          {language === 'kn' ? slot.mustAvoidKn : slot.mustAvoidEn}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: OFFLINE POCKET FIELD PASS */}
        {activeTab === 'offline_pass' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Action Bar */}
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                  {language === 'kn' ? 'ನೆಟ್‌ವರ್ಕ್ ರಹಿತ ತುರ್ತು ಪಾಕೆಟ್ ಕಾರ್ಡ್' : 'No-Network Survival Field Pass'}
                </span>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-xl">
                  {language === 'kn'
                    ? 'ಗುಹಾಂತರ ದೇವಾಲಯಗಳ ಆಳದಲ್ಲಿ ಅಥವಾ ಹಳ್ಳಿಗಳಲ್ಲಿ ಮೊಬೈಲ್ ಸಿಗ್ನಲ್ ಕಡಿತಗೊಂಡಾಗ ಈ ಕಾರ್ಡ್ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಉಳಿಯುತ್ತದೆ. ತುರ್ತು ಫೋನ್ ನಂಬರ್‌ಗಳು ಹಾಗೂ ಬಸ್ ವೇಳಾಪಟ್ಟಿ ಲಭ್ಯ.'
                    : 'Download or save this offline pass. It saves all emergency medical contacts, tourist police numbers, and KSRTC bus frequencies in your device storage.'}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleSaveOffline}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  {offlineSaved ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  <span>{offlineSaved ? (language === 'kn' ? 'ಆಫ್‌ಲೈನ್‌ಗೆ ಸೇವ್ ಆಗಿದೆ!' : 'Saved to Device!') : (language === 'kn' ? 'ಆಫ್‌ಲೈನ್‌ಗೆ ಸೇವ್ ಮಾಡಿ' : 'Save for Offline Use')}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintPass}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 shadow-xs transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{language === 'kn' ? 'ಪ್ರಿಂಟ್ ಫೀಲ್ಡ್ ಪಾಸ್' : 'Print Pocket Pass'}</span>
                </button>
              </div>
            </div>

            {/* Emergency Numbers Grid */}
            <div className="bg-white rounded-3xl border border-amber-200/90 p-5 sm:p-7 shadow-xs">
              <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 mb-4 flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-700" />
                <span>{language === 'kn' ? 'ತುರ್ತು ಸಂಪರ್ಕ ವಿವರಗಳು (ನೇರ ಕರೆ ಮಾಡಿ)' : 'Emergency & Helpline Directory (Direct Dial)'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {EMERGENCY_CONTACTS.map((em) => (
                  <div key={em.id} className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-amber-200/80 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-200/60 text-amber-900">
                          {em.badge}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-700">{em.phone}</span>
                      </div>
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                        {language === 'kn' ? em.titleKn : em.titleEn}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {language === 'kn' ? em.descriptionKn : em.descriptionEn}
                      </p>
                    </div>

                    <a
                      href={`tel:${em.phone}`}
                      className="mt-3 w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{language === 'kn' ? 'ಈಗ ಕರೆ ಮಾಡಿ' : 'Call Immediately'}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* KSRTC Bus Timetable & Route Grid */}
            <div className="bg-white rounded-3xl border border-amber-200/90 p-5 sm:p-7 shadow-xs">
              <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 mb-4 flex items-center gap-2">
                <Bus className="w-4 h-4 text-amber-700" />
                <span>{language === 'kn' ? 'ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಹೆರಿಟೇಜ್ ಬಸ್ ಮಾರ್ಗಗಳು' : 'KSRTC Heritage Circuit Transit Frequency'}</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 border-collapse">
                  <thead>
                    <tr className="border-b border-amber-200 bg-amber-50/60 text-slate-800 font-bold">
                      <th className="p-3">{language === 'kn' ? 'ಮಾರ್ಗ' : 'Route'}</th>
                      <th className="p-3">{language === 'kn' ? 'ಆವರ್ತನ' : 'Frequency'}</th>
                      <th className="p-3">{language === 'kn' ? 'ಪ್ರಯಾಣ ಸಮಯ' : 'Travel Time'}</th>
                      <th className="p-3">{language === 'kn' ? 'ಅಂದಾಜು ದರ' : 'Approx Fare'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BUS_ROUTES.map((bus, idx) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900">{language === 'kn' ? bus.routeKn : bus.routeEn}</td>
                        <td className="p-3 text-slate-600">{bus.frequency}</td>
                        <td className="p-3 text-slate-600">{bus.duration}</td>
                        <td className="p-3 font-bold text-emerald-800">{bus.approxFare}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CHALUKYA HERITAGE PASSPORT */}
        {activeTab === 'passport' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Rank Card Banner */}
            <div className={`rounded-3xl p-5 sm:p-8 bg-linear-to-r ${explorerRank.color} text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-inner shrink-0">
                  {explorerRank.badge}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                    {language === 'kn' ? 'ನಿಮ್ಮ ಪ್ರವಾಸಿ ದರ್ಜೆ:' : 'Your Explorer Rank:'} {explorerRank.level}
                  </span>
                  <h3 className="font-serif text-xl sm:text-3xl font-bold tracking-tight text-white">
                    {language === 'kn' ? explorerRank.titleKn : explorerRank.titleEn}
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">
                    {language === 'kn'
                      ? `${unlockedStamps.length} / ${HERITAGE_STAMPS.length} ಸ್ಮಾರಕ ವಲಯಗಳ ಅಧಿಕೃತ ಮುದ್ರೆಗಳನ್ನು ನೀವು ಗಳಿಸಿದ್ದೀರಿ.`
                      : `You have stamped ${unlockedStamps.length} of ${HERITAGE_STAMPS.length} Chalukya Heritage enclaves.`}
                  </p>

                  {/* Certificate Claim Button */}
                  <button
                    type="button"
                    onClick={() => setShowCertificate(true)}
                    className="mt-3.5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-stone-900" />
                    <span>{language === 'kn' ? 'ರಾಜಮನೆತನದ ಪ್ರಶಸ್ತಿ ಪತ್ರ ಪಡೆಯಿರಿ (Certificate)' : 'Claim Royal Heritage Certificate'}</span>
                  </button>
                </div>
              </div>

              {/* Progress Ring */}
              <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-center shrink-0">
                <span className="text-xs text-amber-200 block font-semibold">{language === 'kn' ? 'ಸರ್ಕ್ಯೂಟ್ ಪೂರ್ಣತೆ' : 'Circuit Completion'}</span>
                <span className="font-serif text-2xl font-bold text-white">
                  {Math.round((unlockedStamps.length / HERITAGE_STAMPS.length) * 100)}%
                </span>
              </div>
            </div>

            {/* Passport Stamps Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  {language === 'kn' ? 'ಸ್ಮಾರಕ ಮುದ್ರೆಗಳು (ಸಂದರ್ಶಿಸಿದರೆ ಕ್ಲಿಕ್ ಮಾಡಿ):' : 'Heritage Enclave Seals (Tap to Stamp as Visited):'}
                </span>
                <button
                  type="button"
                  onClick={() => setUnlockedStamps(['Badami', 'Pattadakal', 'Aihole', 'Mahakuta', 'Banashankari', 'Kudalasangama'])}
                  className="text-xs text-amber-800 font-semibold hover:underline cursor-pointer"
                >
                  {language === 'kn' ? 'ಎಲ್ಲವನ್ನೂ ಅನ್‌ಲಾಕ್ ಮಾಡಿ' : 'Unlock All 6 Stamps'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {HERITAGE_STAMPS.map((stamp) => {
                  const isStamped = unlockedStamps.includes(stamp.clusterId);
                  return (
                    <div
                      key={stamp.clusterId}
                      onClick={() => toggleStamp(stamp.clusterId)}
                      className={`p-4 sm:p-5 rounded-3xl border transition-all cursor-pointer select-none flex flex-col justify-between relative group ${
                        isStamped
                          ? 'bg-amber-50/70 border-amber-600 shadow-md ring-2 ring-amber-500/20'
                          : 'bg-white border-slate-200 opacity-65 hover:opacity-100'
                      }`}
                    >
                      {/* Stamp Seal Graphic */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs transition-transform ${
                            isStamped ? 'bg-amber-600 text-white scale-105' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {stamp.symbol}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                              {stamp.clusterId} Cluster
                            </span>
                            <h4 className="font-serif font-bold text-sm sm:text-base text-slate-900">
                              {language === 'kn' ? stamp.clusterNameKn : stamp.clusterNameEn}
                            </h4>
                          </div>
                        </div>

                        {/* Stamped Badge */}
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isStamped ? 'bg-emerald-600 text-white shadow-xs' : 'border border-slate-300 text-slate-400'
                        }`}>
                          {isStamped ? '✓' : ''}
                        </div>
                      </div>

                      <div className="mt-3.5 space-y-1">
                        <p className="text-xs font-serif font-bold text-amber-950">
                          &ldquo;{language === 'kn' ? stamp.badgeTitleKn : stamp.badgeTitleEn}&rdquo;
                        </p>
                        <p className="text-[11px] text-slate-500 italic">
                          {language === 'kn' ? stamp.mottoKn : stamp.mottoEn}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-amber-200/50 flex items-center justify-between text-[11px]">
                        <span className={isStamped ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                          {isStamped ? (language === 'kn' ? 'ಮುದ್ರೆ ಹಾಕಲಾಗಿದೆ!' : 'SEAL VERIFIED') : (language === 'kn' ? 'ಲಾಕ್ ಆಗಿದೆ • ಭೇಟಿ ನೀಡಿ' : 'Tap to Stamp')}
                        </span>
                        <span className="text-amber-800 text-[10px] font-mono">
                          {stamp.clusterId.toUpperCase()}-STAMP
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Heritage Certificate Modal */}
      {showCertificate && (
        <HeritageCertificateModal
          language={language}
          onClose={() => setShowCertificate(false)}
          stampedCount={unlockedStamps.length}
          totalPossibleStamps={HERITAGE_STAMPS.length}
        />
      )}
    </section>
  );
};
