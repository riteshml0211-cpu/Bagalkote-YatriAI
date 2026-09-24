import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Compass,
  Utensils,
  Sparkles,
  Copy,
  Check,
  Printer,
  ChevronRight,
  Navigation,
  Headphones,
  MessageSquare,
  Repeat,
  Camera,
  Users,
  Car,
  CheckCircle2,
  Share2,
  Sliders,
  Luggage,
  Calculator,
  ShieldCheck,
  Info,
  ChevronDown,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { Language, ItineraryPlan, ItineraryActivity, Monument } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  getDefaultItinerary,
  EXPEDITION_ARCHETYPES,
  CIRCUIT_STOPS,
  EXPEDITION_PACKING_ITEMS,
  ExpeditionArchetype,
} from '../data/itineraryData';
import { MONUMENTS } from '../data/heritageData';

interface TripPlannerProps {
  language: Language;
  onPlayMonumentAudio?: (monument: Monument) => void;
  onAskAi?: (query: string) => void;
}

export const TripPlanner: React.FC<TripPlannerProps> = ({
  language,
  onPlayMonumentAudio,
  onAskAi,
}) => {
  const t = TRANSLATIONS[language];

  // State management
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<string>('archaeologist');
  const [duration, setDuration] = useState<'1-day' | '2-day' | '3-day'>('2-day');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Architecture', 'History']);
  const [pace, setPace] = useState<'relaxed' | 'moderate' | 'active'>('moderate');
  const [activeTab, setActiveTab] = useState<'timeline' | 'matrix' | 'calculator' | 'essentials'>('timeline');
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [swappingActivityId, setSwappingActivityId] = useState<string | null>(null);

  // Visited activities tracking with localStorage persistence
  const [visitedActivityIds, setVisitedActivityIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bagalkote_visited_activities');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Packed checklist items tracking
  const [packedItemIds, setPackedItemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bagalkote_packed_items');
      return saved ? JSON.parse(saved) : ['water-bottle', 'slip-on-shoes'];
    } catch {
      return ['water-bottle', 'slip-on-shoes'];
    }
  });

  // Budget Calculator state
  const [travelPartySize, setTravelPartySize] = useState<number>(2);
  const [travelStyle, setTravelStyle] = useState<'budget' | 'comfort' | 'royal'>('comfort');

  // Active itinerary plan
  const [itinerary, setItinerary] = useState<ItineraryPlan>(() =>
    getDefaultItinerary(2, ['Architecture', 'History'], 'moderate', 'archaeologist')
  );

  // Save visited and packed items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bagalkote_visited_activities', JSON.stringify(visitedActivityIds));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [visitedActivityIds]);

  useEffect(() => {
    try {
      localStorage.setItem('bagalkote_packed_items', JSON.stringify(packedItemIds));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [packedItemIds]);

  // Handle Archetype Selection
  const handleSelectArchetype = (archetype: ExpeditionArchetype) => {
    setSelectedArchetypeId(archetype.id);
    setDuration(archetype.recommendedDuration);
    setPace(archetype.recommendedPace);
    setSelectedInterests(archetype.interests);

    const dayCount = archetype.recommendedDuration === '1-day' ? 1 : archetype.recommendedDuration === '3-day' ? 3 : 2;
    setItinerary(getDefaultItinerary(dayCount, archetype.interests, archetype.recommendedPace, archetype.id));
  };

  const interestOptions = [
    { id: 'Architecture', label: t.planner.interests.architecture },
    { id: 'History', label: t.planner.interests.history },
    { id: 'Handlooms', label: t.planner.interests.handlooms },
    { id: 'Nature', label: t.planner.interests.nature },
    { id: 'Spiritual', label: t.planner.interests.spiritual },
  ];

  const toggleInterest = (id: string) => {
    let updated: string[];
    if (selectedInterests.includes(id)) {
      if (selectedInterests.length > 1) {
        updated = selectedInterests.filter((i) => i !== id);
      } else {
        updated = selectedInterests;
      }
    } else {
      updated = [...selectedInterests, id];
    }
    setSelectedInterests(updated);
  };

  // Generate itinerary plan via API or rich engine
  const generatePlan = async (
    targetDuration = duration,
    targetInterests = selectedInterests,
    targetPace = pace,
    targetArchetypeId = selectedArchetypeId
  ) => {
    setIsGenerating(true);
    const dayCount = targetDuration === '1-day' ? 1 : targetDuration === '3-day' ? 3 : 2;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          duration: targetDuration,
          interests: targetInterests,
          pace: targetPace,
          language,
          archetypeId: targetArchetypeId,
        }),
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.itinerary && Array.isArray(data.itinerary.days) && data.itinerary.days.length > 0) {
          setItinerary(data.itinerary);
          setIsGenerating(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend itinerary service unavailable, using curated expedition engine:', err);
    }

    setItinerary(getDefaultItinerary(dayCount, targetInterests, targetPace, targetArchetypeId));
    setIsGenerating(false);
  };

  // Update on language change
  useEffect(() => {
    const dayCount = duration === '1-day' ? 1 : duration === '3-day' ? 3 : 2;
    setItinerary(getDefaultItinerary(dayCount, selectedInterests, pace, selectedArchetypeId));
  }, [language]);

  // Toggle visited activity
  const toggleVisitedActivity = (actId: string) => {
    setVisitedActivityIds((prev) =>
      prev.includes(actId) ? prev.filter((id) => id !== actId) : [...prev, actId]
    );
  };

  // Toggle packed item
  const togglePackedItem = (itemId: string) => {
    setPackedItemIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  // Swap activity with an alternative option
  const handleSwapActivity = (
    dayIndex: number,
    originalActivityId: string,
    alternative: {
      id: string;
      title: string;
      titleKn: string;
      description: string;
      descriptionKn: string;
      location: string;
      insiderTip?: string;
      monumentId?: string;
    }
  ) => {
    if (!itinerary) return;

    const newDays = [...itinerary.days];
    const targetDay = { ...newDays[dayIndex] };
    const actIdx = targetDay.activities.findIndex((a) => a.id === originalActivityId);

    if (actIdx !== -1) {
      const original = targetDay.activities[actIdx];
      // Create new activity swapped
      const swappedActivity: ItineraryActivity = {
        ...original,
        id: alternative.id,
        title: alternative.title,
        titleKn: alternative.titleKn,
        description: alternative.description,
        descriptionKn: alternative.descriptionKn,
        location: alternative.location,
        insiderTip: alternative.insiderTip || original.insiderTip,
        monumentId: alternative.monumentId || original.monumentId,
        // Put original back as an alternative so user can swap back anytime
        alternativeOptions: [
          {
            id: original.id || 'orig',
            title: original.title,
            titleKn: original.titleKn,
            description: original.description,
            descriptionKn: original.descriptionKn,
            location: original.location,
            insiderTip: original.insiderTip,
            monumentId: original.monumentId,
          },
        ],
      };

      targetDay.activities = [
        ...targetDay.activities.slice(0, actIdx),
        swappedActivity,
        ...targetDay.activities.slice(actIdx + 1),
      ];

      newDays[dayIndex] = targetDay;
      setItinerary({ ...itinerary, days: newDays });
      setSwappingActivityId(null);
    }
  };

  // Calculate expedition completion stats
  const totalActivitiesCount = useMemo(() => {
    if (!itinerary) return 0;
    return itinerary.days.reduce((acc, day) => acc + day.activities.length, 0);
  }, [itinerary]);

  const completedActivitiesCount = useMemo(() => {
    if (!itinerary) return 0;
    const allIds = itinerary.days.flatMap((d) => d.activities.map((a) => a.id).filter(Boolean));
    return allIds.filter((id) => id && visitedActivityIds.includes(id)).length;
  }, [itinerary, visitedActivityIds]);

  const completionPercent = totalActivitiesCount > 0
    ? Math.round((completedActivitiesCount / totalActivitiesCount) * 100)
    : 0;

  // Handle Play Audio Guide for monument
  const handlePlayAudio = (monumentId?: string) => {
    if (!monumentId || !onPlayMonumentAudio) return;
    const mon = MONUMENTS.find((m) => m.id === monumentId);
    if (mon) {
      onPlayMonumentAudio(mon);
    }
  };

  // Handle Ask AI with preloaded query
  const handleAskAboutActivity = (actTitle: string, actLocation: string) => {
    if (!onAskAi) return;
    const query = language === 'kn'
      ? `${actTitle} (${actLocation}) ಬಗ್ಗೆ ವಿವರವಾದ ಇತಿಹಾಸ, ವಾಸ್ತುಶಿಲ್ಪದ ಮಾಹಿತಿ ಮತ್ತು ಭೇಟಿ ನೀಡುವ ಪ್ರಮುಖ ಸಲಹೆಗಳನ್ನು ತಿಳಿಸಿ.`
      : `Give me deep architectural insights, photography tips, and historical facts about ${actTitle} located in ${actLocation}.`;
    onAskAi(query);
  };

  // Copy structured text to clipboard
  const handleCopyItinerary = () => {
    if (!itinerary) return;
    const textLines = [
      `🏛️ ${language === 'kn' ? itinerary.titleKn || itinerary.title : itinerary.title}`,
      language === 'kn' ? itinerary.summaryKn || itinerary.summary : itinerary.summary,
      '',
      `📍 Route Distance: ~${itinerary.totalDistanceKm} km | Transport: ${itinerary.recommendedTransport}`,
      '------------------------------------------------',
      ...itinerary.days.flatMap((day) => [
        `\n📅 DAY ${day.dayNumber}: ${language === 'kn' ? day.themeKn || day.theme : day.theme}`,
        ...day.activities.map(
          (act) => `  ⏰ ${act.time} - ${language === 'kn' ? act.titleKn || act.title : act.title} (${act.location})\n     ${language === 'kn' ? act.descriptionKn || act.description : act.description}\n     💡 Tip: ${act.insiderTip}`
        ),
        day.recommendedMeal
          ? `  🍲 Recommended Meal: ${language === 'kn' ? day.recommendedMeal.dishKn || day.recommendedMeal.dish : day.recommendedMeal.dish} @ ${day.recommendedMeal.place}`
          : '',
      ]),
      '',
      '📌 Local Insider Advice:',
      ...itinerary.proTips.map((tip) => `  • ${tip}`),
    ];
    navigator.clipboard.writeText(textLines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Share via WhatsApp
  const handleShareWhatsApp = () => {
    if (!itinerary) return;
    const textLines = [
      `*🏛️ ${language === 'kn' ? itinerary.titleKn || itinerary.title : itinerary.title}*`,
      `${language === 'kn' ? itinerary.summaryKn || itinerary.summary : itinerary.summary}`,
      '',
      `🚗 *Route*: ~${itinerary.totalDistanceKm} km (${itinerary.recommendedTransport})`,
      '',
      ...itinerary.days.flatMap((day) => [
        `*📅 DAY ${day.dayNumber}: ${language === 'kn' ? day.themeKn || day.theme : day.theme}*`,
        ...day.activities.map(
          (act) => `• *${act.time}*: ${language === 'kn' ? act.titleKn || act.title : act.title} (${act.location})`
        ),
        day.recommendedMeal
          ? `🍲 *Meal*: ${language === 'kn' ? day.recommendedMeal.dishKn || day.recommendedMeal.dish : day.recommendedMeal.dish}`
          : '',
        '',
      ]),
      'Explore more on Bagalkote YatriAI Heritage Portal!',
    ];
    const encoded = encodeURIComponent(textLines.join('\n'));
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  // Print
  const handlePrint = () => {
    window.print();
  };

  // Live Budget Calculation Breakdown
  const budgetCalculations = useMemo(() => {
    const daysCount = duration === '1-day' ? 1 : duration === '3-day' ? 3 : 2;

    // Entry fees: Badami Caves (₹25), Pattadakal (₹40), Aihole (₹25), Mahakuta (Free), Banashankari (Free)
    const ticketsPerPerson = daysCount === 1 ? 25 : daysCount === 2 ? 90 : 90;
    const totalTickets = ticketsPerPerson * travelPartySize;

    // Food estimate per person per day
    const foodCostPerDay =
      travelStyle === 'budget' ? 220 : travelStyle === 'comfort' ? 450 : 850;
    const totalFood = foodCostPerDay * daysCount * travelPartySize;

    // Transport estimate total
    let totalTransport = 0;
    if (travelStyle === 'budget') {
      // Local autos & KSRTC buses
      totalTransport = daysCount === 1 ? 400 : daysCount === 2 ? 1100 : 1800;
    } else if (travelStyle === 'comfort') {
      // Private AC Sedan cab
      totalTransport = daysCount === 1 ? 1600 : daysCount === 2 ? 3800 : 5600;
    } else {
      // Dedicated Chauffeured SUV + Guide
      totalTransport = daysCount === 1 ? 3200 : daysCount === 2 ? 7200 : 10500;
    }

    // Handloom & Souvenir reserve per party
    const handloomBudget =
      travelStyle === 'budget' ? 1000 : travelStyle === 'comfort' ? 3500 : 8000;

    const grandTotal = totalTickets + totalFood + totalTransport + handloomBudget;
    const perPerson = Math.round(grandTotal / travelPartySize);

    return {
      totalTickets,
      totalFood,
      totalTransport,
      handloomBudget,
      grandTotal,
      perPerson,
      daysCount,
    };
  }, [duration, travelPartySize, travelStyle]);

  return (
    <section id="planner" className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.planner.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {language === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ಯಾತ್ರೆ ಮತ್ತು ಎಕ್ಸ್‌ಪೆಡಿಷನ್ ಯೋಜಕ' : 'Smart Expedition & Heritage Itinerary'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {language === 'kn'
              ? 'ನಿಮ್ಮ ಆಸಕ್ತಿಗೆ ತಕ್ಕಂತಹ ಯಾತ್ರಿಕ ಶೈಲಿಯನ್ನು ಆರಿಸಿ: ಪ್ರಾಚೀನ ಶಿಲಾಶಾಸನಗಳು, ಸುವರ್ಣ ಛಾಯಾಗ್ರಹಣ, ಇಳಕಲ್ ರೇಷ್ಮೆ ನೇಯ್ಗೆ, ಉತ್ತರ ಕರ್ನಾಟಕದ ರುಚಿ ಅಥವಾ ಕಣಿವೆ ಚಾರಣ.'
              : 'Select your traveler persona or tailor minute-by-minute schedules with photo lighting azimuths, crowd meters, activity swappers, and dynamic budget calculators.'}
          </p>
        </div>

        {/* SECTION 1: Expedition Archetypes Selector */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                {language === 'kn' ? 'ಹಂತ ೧: ಯಾತ್ರಿಕ ಶೈಲಿ ಆಯ್ಕೆ ಮಾಡಿ' : 'Step 1: Choose Your Expedition Persona'}
              </span>
              <p className="text-xs text-slate-500">
                {language === 'kn'
                  ? 'ಯಾತ್ರಿಕ ಶೈಲಿಯನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ, ತಕ್ಷಣವೇ ಕ್ಯುರೇಟೆಡ್ ಪ್ರವಾಸ ತಯಾರಾಗುತ್ತದೆ'
                  : 'Tap any archetype below to instantly tailor timings, photography windows, and secret stops'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAdvancedControls(!showAdvancedControls)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-200 transition-all cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showAdvancedControls ? (language === 'kn' ? 'ಸರಳ ನೋಟ' : 'Hide Customizer') : (language === 'kn' ? 'ದಿನ / ವೇಗ ಹೊಂದಿಸಿ' : 'Fine-tune Days & Pace')}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {EXPEDITION_ARCHETYPES.map((arch) => {
              const isSelected = selectedArchetypeId === arch.id;
              return (
                <button
                  key={arch.id}
                  type="button"
                  onClick={() => handleSelectArchetype(arch)}
                  className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-600 shadow-md ring-2 ring-amber-500/20'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-amber-300 shadow-xs'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                  )}
                  <div>
                    <div className="text-2xl sm:text-3xl mb-1.5">{arch.icon}</div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                      {language === 'kn' ? arch.nameKn : arch.name}
                    </h4>
                    <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-100/70 text-amber-900">
                      {language === 'kn' ? arch.badgeKn : arch.badge}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500 line-clamp-2 leading-tight">
                    {language === 'kn' ? arch.taglineKn : arch.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: Advanced Fine-tune Controls (Collapsible) */}
        {showAdvancedControls && (
          <div className="bg-[#FAF7F2] border border-amber-200/80 rounded-2xl p-4 sm:p-6 shadow-xs mb-8 transition-all animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Duration */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  {t.planner.durationLabel}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['1-day', '2-day', '3-day'] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        setDuration(d);
                        generatePlan(d, selectedInterests, pace, selectedArchetypeId);
                      }}
                      className={`text-center px-2 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        duration === d
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-white hover:bg-amber-100/50 text-slate-700 border border-amber-200/70'
                      }`}
                    >
                      {t.planner.durations[d].split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  {t.planner.interestsLabel}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {interestOptions.map((opt) => {
                    const isSelected = selectedInterests.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleInterest(opt.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-700 text-white font-semibold'
                            : 'bg-white text-slate-700 hover:bg-amber-50 border border-amber-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pace & Regenerate */}
              <div className="flex flex-col justify-between">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    {t.planner.paceLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['relaxed', 'moderate', 'active'] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPace(p)}
                        className={`py-1.5 px-1 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                          pace === p
                            ? 'bg-amber-700 text-white'
                            : 'bg-white text-slate-700 hover:bg-amber-50 border border-amber-200'
                        }`}
                      >
                        {p === 'relaxed' ? 'Relaxed' : p === 'moderate' ? 'Balanced' : 'Active'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => generatePlan(duration, selectedInterests, pace, selectedArchetypeId)}
                    disabled={isGenerating}
                    className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                    <span>{isGenerating ? t.planner.generatingText : (language === 'kn' ? 'AI ಪ್ರವಾಸ ಮರುಹೊಂದಿಸಿ' : 'Recalculate AI Itinerary')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: View Mode Tabs & Completion Status Bar */}
        <div className="bg-[#FAF7F2] border border-amber-200/90 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-sm mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* View Selector Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveTab('timeline')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'timeline'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-200'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{language === 'kn' ? '೧. ಯಾತ್ರಾ ಕಾಲರೇಖೆ' : '1. Expedition Timeline'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('matrix')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'matrix'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{language === 'kn' ? '೨. ಮಾರ್ಗ ಮತ್ತು ದೂರ ಕೋಷ್ಟಕ' : '2. Route & Distance Matrix'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('calculator')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'calculator'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-200'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>{language === 'kn' ? '೩. ಬಜೆಟ್ ಮತ್ತು ಸಾರಿಗೆ ಲೆಕ್ಕಾಚಾರ' : '3. Live Trip Budget'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('essentials')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'essentials'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-200'
                }`}
              >
                <Luggage className="w-3.5 h-3.5" />
                <span>{language === 'kn' ? '೪. ಬ್ಯಾಕ್‌ಪ್ಯಾಕ್ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ' : '4. Field Essentials'}</span>
              </button>
            </div>

            {/* Expedition Progress Counter */}
            <div className="flex items-center justify-between sm:justify-end gap-3 bg-white px-3.5 py-1.5 rounded-xl border border-amber-200">
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                  {language === 'kn' ? 'ಯಾತ್ರೆಯ ಪ್ರಗತಿ' : 'Expedition Completed'}
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {completedActivitiesCount} / {totalActivitiesCount} {language === 'kn' ? 'ತಾಣಗಳು' : 'stops'} ({completionPercent}%)
                </span>
              </div>
              <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
              {completionPercent === 100 && (
                <span className="text-sm" title="All stops visited!">
                  🏆
                </span>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 4: MAIN CONTENT TABS */}

        {/* TAB 1: EXPEDITION TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            {/* Itinerary Header & Action Toolbar */}
            <div className="bg-[#FAF7F2]/60 border border-amber-200/80 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-800 font-bold mb-1">
                  <Navigation className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {t.planner.totalDistance}: ~{itinerary.totalDistanceKm} km • {itinerary.recommendedTransport}
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  {language === 'kn' ? itinerary.titleKn || itinerary.title : itinerary.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  {language === 'kn' ? itinerary.summaryKn || itinerary.summary : itinerary.summary}
                </p>
              </div>

              {/* Action Buttons: WhatsApp, Copy, Print */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                  title="Share on WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{language === 'kn' ? 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ' : 'WhatsApp Plan'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyItinerary}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-300 transition-all cursor-pointer shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t.planner.copiedText : t.planner.copyBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-300 transition-all cursor-pointer shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t.planner.printBtn}</span>
                </button>
              </div>
            </div>

            {/* Days Loop */}
            <div className="space-y-8">
              {itinerary.days.map((day, dayIndex) => (
                <div key={day.dayNumber} className="bg-white border border-amber-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm space-y-6">
                  {/* Day Header Banner */}
                  <div className="flex items-center justify-between border-b border-amber-100 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-serif font-bold text-sm flex items-center justify-center shadow-xs shrink-0">
                        {day.dayNumber}
                      </span>
                      <div>
                        <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                          {language === 'kn' ? `ದಿನ ${day.dayNumber} ರ ಪ್ರವಾಸ` : `Day ${day.dayNumber} Program`}
                        </span>
                        <h4 className="font-serif font-bold text-base sm:text-xl text-slate-900">
                          {language === 'kn' ? day.themeKn || day.theme : day.theme}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Activities Timeline Cards */}
                  <div className="pl-2 sm:pl-4 space-y-5">
                    {day.activities.map((activity, actIdx) => {
                      const isVisited = activity.id ? visitedActivityIds.includes(activity.id) : false;
                      const hasAudio = !!activity.monumentId;
                      const isSwapping = swappingActivityId === activity.id;

                      return (
                        <div
                          key={activity.id || actIdx}
                          className={`relative pl-4 sm:pl-6 border-l-2 transition-all ${
                            isVisited ? 'border-emerald-500 bg-emerald-50/20' : 'border-amber-300'
                          } py-1`}
                        >
                          {/* Bullet marker */}
                          <button
                            type="button"
                            onClick={() => activity.id && toggleVisitedActivity(activity.id)}
                            title={isVisited ? 'Mark as not visited' : 'Mark as visited'}
                            className={`absolute -left-[11px] sm:-left-[13px] top-2 w-5 h-5 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                              isVisited
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-white border-2 border-amber-500 hover:border-amber-700 text-transparent'
                            }`}
                          >
                            <Check className="w-3 h-3" />
                          </button>

                          {/* Card Content */}
                          <div className="space-y-2">
                            {/* Top row: Time, badges & Quick actions */}
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-xs font-bold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-lg border border-amber-300/60 flex items-center gap-1 shrink-0">
                                  <Clock className="w-3 h-3 text-amber-700" />
                                  {activity.time}
                                </span>

                                <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 shrink-0">
                                  <MapPin className="w-3 h-3 text-slate-400" />
                                  {activity.location}
                                </span>

                                {activity.crowdLevel && (
                                  <span
                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                                      activity.crowdLevel === 'Low & Serene'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : activity.crowdLevel === 'Golden Hour Peak'
                                        ? 'bg-orange-100 text-orange-900'
                                        : 'bg-slate-100 text-slate-700'
                                    }`}
                                  >
                                    {activity.crowdLevel}
                                  </span>
                                )}

                                {activity.difficulty && (
                                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                                    {activity.difficulty}
                                  </span>
                                )}

                                {activity.durationMins && (
                                  <span className="text-[10px] text-slate-400">
                                    (~{activity.durationMins}m)
                                  </span>
                                )}
                              </div>

                              {/* Interactive Action Badges */}
                              <div className="flex items-center gap-1.5">
                                {hasAudio && onPlayMonumentAudio && (
                                  <button
                                    type="button"
                                    onClick={() => handlePlayAudio(activity.monumentId)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-100/80 hover:bg-amber-200 text-amber-950 border border-amber-300 transition-all cursor-pointer"
                                    title="Play Monument Audio Guide"
                                  >
                                    <Headphones className="w-3 h-3 text-amber-800" />
                                    <span>{language === 'kn' ? 'ಆಡಿಯೋ' : 'Audio'}</span>
                                  </button>
                                )}

                                {onAskAi && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleAskAboutActivity(
                                        language === 'kn' ? activity.titleKn || activity.title : activity.title,
                                        activity.location
                                      )
                                    }
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-all cursor-pointer"
                                    title="Ask AI Assistant about this spot"
                                  >
                                    <MessageSquare className="w-3 h-3 text-slate-600" />
                                    <span>{language === 'kn' ? 'AI ಕೇಳಿ' : 'Ask AI'}</span>
                                  </button>
                                )}

                                {activity.alternativeOptions && activity.alternativeOptions.length > 0 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setSwappingActivityId(isSwapping ? null : activity.id || null)
                                    }
                                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-amber-800 hover:bg-amber-50 border border-amber-200 transition-all cursor-pointer"
                                    title="Explore alternative options for this time slot"
                                  >
                                    <Repeat className="w-3 h-3" />
                                    <span>{language === 'kn' ? 'ಬದಲಾಯಿಸಿ' : 'Swap'}</span>
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Title & Description */}
                            <h5 className="font-serif font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                              <span>{language === 'kn' ? activity.titleKn || activity.title : activity.title}</span>
                              {isVisited && (
                                <span className="text-xs font-normal text-emerald-700 flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{language === 'kn' ? 'ಭೇಟಿ ನೀಡಲಾಗಿದೆ' : 'Visited'}</span>
                                </span>
                              )}
                            </h5>

                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                              {language === 'kn' ? activity.descriptionKn || activity.description : activity.description}
                            </p>

                            {/* Photography Tip Window */}
                            {activity.photoSpotTip && (
                              <div className="flex items-start gap-1.5 text-[11px] text-amber-950 font-medium bg-amber-50/70 p-2 rounded-lg border border-amber-200/60">
                                <Camera className="w-3.5 h-3.5 text-amber-700 mt-0.5 shrink-0" />
                                <span>
                                  <strong>{language === 'kn' ? 'ಫೋಟೋ ಬೆಳಕಿನ ಕಿಟಕಿ: ' : 'Light & Photo Cue: '}</strong>
                                  {activity.photoSpotTip}
                                </span>
                              </div>
                            )}

                            {/* Insider Tip */}
                            {activity.insiderTip && (
                              <p className="text-[11px] text-slate-700 italic">
                                💡 <strong>{language === 'kn' ? 'ಸ್ಥಳೀಯ ಸುಳಿವು: ' : 'Insider Advice: '}</strong>
                                {activity.insiderTip}
                              </p>
                            )}

                            {/* Alternative Options Drawer (When user clicks Swap) */}
                            {isSwapping && activity.alternativeOptions && (
                              <div className="mt-3 p-3.5 rounded-xl bg-amber-50/90 border border-amber-300 space-y-2 animate-fadeIn">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                                    <span>{language === 'kn' ? 'ಈ ಸಮಯಕ್ಕೆ ಪರ್ಯಾಯ ಗುಪ್ತ ತಾಣಗಳು:' : 'Secret Gem Alternatives for this slot:'}</span>
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setSwappingActivityId(null)}
                                    className="text-xs text-slate-500 hover:text-slate-800"
                                  >
                                    ✕
                                  </button>
                                </div>
                                <div className="space-y-2">
                                  {activity.alternativeOptions.map((alt) => (
                                    <div
                                      key={alt.id}
                                      className="bg-white p-3 rounded-xl border border-amber-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                                    >
                                      <div>
                                        <h6 className="font-serif font-bold text-xs text-slate-900">
                                          {language === 'kn' ? alt.titleKn : alt.title}
                                        </h6>
                                        <p className="text-[11px] text-slate-600 mt-0.5">
                                          {language === 'kn' ? alt.descriptionKn : alt.description}
                                        </p>
                                        <span className="text-[10px] text-slate-400 block mt-0.5">
                                          📍 {alt.location}
                                        </span>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          activity.id && handleSwapActivity(dayIndex, activity.id, alt)
                                        }
                                        className="self-start sm:self-center px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shrink-0 transition-all cursor-pointer shadow-xs"
                                      >
                                        {language === 'kn' ? 'ಯೋಜನೆಗೆ ಸೇರಿಸಿ' : 'Swap into Plan'}
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* Recommended Meal for the Day */}
                    {day.recommendedMeal && (
                      <div className="pl-4 sm:pl-6 pt-3">
                        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
                          <Utensils className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                          <div className="text-xs">
                            <span className="font-bold text-amber-950 block">
                              {language === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಿದ ಸಾಂಪ್ರದಾಯಿಕ ಊಟ:' : 'Curated Local Meal Stop:'}
                            </span>
                            <span className="font-semibold text-slate-800">
                              {language === 'kn' ? day.recommendedMeal.dishKn || day.recommendedMeal.dish : day.recommendedMeal.dish}
                            </span>
                            <span className="text-slate-500 block text-[11px] mt-0.5">
                              @{day.recommendedMeal.place}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pro Tips Section */}
            {itinerary.proTips && itinerary.proTips.length > 0 && (
              <div className="bg-[#FAF7F2] border border-amber-200/80 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h4 className="font-serif font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>{t.planner.proTipsTitle}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {itinerary.proTips.map((tip, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white border border-amber-200/60 text-xs text-slate-700 leading-relaxed shadow-xs"
                    >
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ROUTE & DISTANCE MATRIX */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-[#FAF7F2] border border-amber-200/90 rounded-2xl p-4 sm:p-6 shadow-xs">
              <div className="max-w-2xl mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                  {language === 'kn' ? 'ಪ್ರವಾಸ ವಲಯದ ನಕ್ಷೆ ಮತ್ತು ಸಾರಿಗೆ' : 'Regional Circuit Logistics'}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  {language === 'kn' ? 'ಬಾದಾಮಿ - ಪಟ್ಟದಕಲ್ಲು - ಐಹೊಳೆ ಸರ್ಕ್ಯೂಟ್ ಮಾರ್ಗಸೂಚಿ' : 'Badami - Pattadakal - Aihole Transit Matrix'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {language === 'kn'
                    ? 'ಬಾದಾಮಿಯನ್ನು ಕೇಂದ್ರವನ್ನಾಗಿಸಿಕೊಂಡು ಪ್ರತಿಯೊಂದು ತಾಣಕ್ಕೆ ಇರುವ ದೂರ, ಪ್ರಯಾಣದ ಸಮಯ ಮತ್ತು ರಸ್ತೆ ಸ್ಥಿತಿಯ ವಿವರ.'
                    : 'Use Badami as your base camp. Plan travel between stops with real transit times, road conditions, and public transport frequency.'}
                </p>
              </div>

              {/* Sequential Transit Flow Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CIRCUIT_STOPS.map((stop, idx) => (
                  <div
                    key={stop.id}
                    className="bg-white border border-amber-200/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {stop.distanceFromBadami}
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-sm sm:text-base text-slate-900">
                        {language === 'kn' ? stop.nameKn : stop.name}
                      </h4>

                      <div className="mt-2 space-y-1.5 text-xs text-slate-600">
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>Transit: {stop.transitTime}</span>
                        </div>
                        <div className="flex items-start gap-1 text-[11px]">
                          <Car className="w-3 h-3 text-amber-700 mt-0.5 shrink-0" />
                          <span>{language === 'kn' ? stop.transitTipKn : stop.transitTip}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                        Highlights
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {stop.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Transit Tips Callout */}
              <div className="mt-6 p-4 rounded-xl bg-amber-100/60 border border-amber-300 text-xs text-amber-950 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-800 mt-0.5 shrink-0" />
                <div>
                  <strong>{language === 'kn' ? 'ಸ್ಥಳೀಯ ಸಾರಿಗೆ ಸಲಹೆ: ' : 'Local Transit Guidance: '}</strong>
                  {language === 'kn'
                    ? 'ಬಾದಾಮಿಯಿಂದ ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆಗೆ ಬೆಳಗ್ಗೆ ೭:೦೦ ರಿಂದ ಸಂಜೆ ೬:೩೦ ರವರೆಗೆ ನಿಯಮಿತ ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಬಸ್‌ಗಳು ಲಭ್ಯ. ಖಾಸಗಿ ಆಟೋ ಅಥವಾ ಕಾರು ಗೊತ್ತುಮಾಡಿಕೊಂಡರೆ ಒಂದೇ ದಿನದಲ್ಲಿ ಎರಡೂ ತಾಣಗಳನ್ನು ಆರಾಮವಾಗಿ ವೀಕ್ಷಿಸಬಹುದು.'
                    : 'KSRTC heritage shuttles run between Badami, Pattadakal, and Aihole every 40-50 minutes. Hiring a dedicated tourist auto for the day (₹1,000-₹1,300) or a private cab (₹2,200-₹2,800) provides total flexibility for golden hour photography.'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SMART BUDGET & LOGISTICS CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="bg-[#FAF7F2] border border-amber-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                {language === 'kn' ? 'ಖರ್ಚು ವೆಚ್ಚಗಳ ಮುನ್ನೋಟ' : 'Smart Cost Estimator'}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'kn' ? 'ಪ್ರವಾಸದ ಬಜೆಟ್ ಮತ್ತು ಸಾರಿಗೆ ಲೆಕ್ಕಾಚಾರ' : 'Trip Budget & Logistics Calculator'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {language === 'kn'
                  ? 'ನಿಮ್ಮ ಪ್ರಯಾಣಿಕರ ಸಂಖ್ಯೆ ಮತ್ತು ಶೈಲಿಯನ್ನು ಆರಿಸಿ. ಪ್ರವೇಶ ಶುಲ್ಕ, ಊಟ, ಸಾರಿಗೆ ಮತ್ತು ಕೈಮಗ್ಗ ಶಾಪಿಂಗ್ ವೆಚ್ಚವನ್ನು ನೇರವಾಗಿ ಲೆಕ್ಕಹಾಕಿ.'
                  : 'Real-time estimated expenses covering ASI monument tickets, authentic Khanavali meals, transport, and handloom crafts.'}
              </p>
            </div>

            {/* Calculator Control Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-amber-200">
              {/* Party Size */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  {language === 'kn' ? 'ಪ್ರಯಾಣಿಕರ ಸಂಖ್ಯೆ' : 'Party Size'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { count: 1, label: language === 'kn' ? 'ಏಕಾಂಗಿ (೧)' : 'Solo (1)' },
                    { count: 2, label: language === 'kn' ? 'ಇಬ್ಬರು (೨)' : 'Couple (2)' },
                    { count: 4, label: language === 'kn' ? 'ಗುಂಪು (೪)' : 'Group (4)' },
                  ].map((p) => (
                    <button
                      key={p.count}
                      type="button"
                      onClick={() => setTravelPartySize(p.count)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        travelPartySize === p.count
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  {language === 'kn' ? 'ಪ್ರಯಾಣದ ಶೈಲಿ' : 'Travel Comfort Tier'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'budget', label: language === 'kn' ? 'ಬ್ಯಾಕ್‌ಪ್ಯಾಕರ್' : '🛺 Backpacker' },
                    { id: 'comfort', label: language === 'kn' ? 'ಆರಾಮದಾಯಕ' : '🚗 Comfort Cab' },
                    { id: 'royal', label: language === 'kn' ? 'ರಾಯಲ್ ಟೂರ್' : '👑 Heritage VIP' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setTravelStyle(s.id as any)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        travelStyle === s.id
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[11px] text-slate-500 font-bold uppercase block">
                  {language === 'kn' ? 'ಸ್ಮಾರಕಗಳ ಪ್ರವೇಶ ಶುಲ್ಕ' : 'ASI Entrance Tickets'}
                </span>
                <span className="text-xl font-serif font-bold text-slate-900 mt-1 block">
                  ₹{budgetCalculations.totalTickets}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  ₹{budgetCalculations.totalTickets / travelPartySize} / person
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[11px] text-slate-500 font-bold uppercase block">
                  {language === 'kn' ? 'ಖಾನಾವಳಿ ಊಟ & ಉಪಹಾರ' : 'Khanavali Meals'}
                </span>
                <span className="text-xl font-serif font-bold text-slate-900 mt-1 block">
                  ₹{budgetCalculations.totalFood}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {budgetCalculations.daysCount} days • {travelPartySize} travelers
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[11px] text-slate-500 font-bold uppercase block">
                  {language === 'kn' ? 'ಸಾರಿಗೆ & ವಾಹನ ವೆಚ್ಚ' : 'Transit & Vehicle'}
                </span>
                <span className="text-xl font-serif font-bold text-slate-900 mt-1 block">
                  ₹{budgetCalculations.totalTransport}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {travelStyle === 'budget' ? 'KSRTC Bus / Auto' : travelStyle === 'comfort' ? 'Private AC Cab' : 'Chauffeured SUV + Guide'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[11px] text-slate-500 font-bold uppercase block">
                  {language === 'kn' ? 'ಇಳಕಲ್ ಸೀರೆ & ನೆನಪಿನ ಕಾಣಿಕೆ' : 'Handloom Souvenirs'}
                </span>
                <span className="text-xl font-serif font-bold text-slate-900 mt-1 block">
                  ₹{budgetCalculations.handloomBudget}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Direct artisan support fund
                </span>
              </div>
            </div>

            {/* Total Callout Banner */}
            <div className="p-5 rounded-2xl bg-amber-600 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-md">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-amber-200 block">
                  {language === 'kn' ? 'ಅಂದಾಜು ಒಟ್ಟು ಬಜೆಟ್' : 'Estimated Total Expedition Budget'}
                </span>
                <span className="font-serif text-3xl sm:text-4xl font-bold block mt-1">
                  ₹{budgetCalculations.grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-left sm:text-right bg-amber-700/60 p-3 rounded-xl border border-amber-500/50">
                <span className="text-xs text-amber-200 block">
                  {language === 'kn' ? 'ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ ಅಂದಾಜು ವೆಚ್ಚ' : 'Per Person Share:'}
                </span>
                <span className="text-xl font-bold">
                  ₹{budgetCalculations.perPerson.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FIELD ESSENTIALS & PACKING CHECKLIST */}
        {activeTab === 'essentials' && (
          <div className="bg-[#FAF7F2] border border-amber-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                {language === 'kn' ? 'ಪ್ರವಾಸದ ಸಿದ್ಧತೆ' : 'Preparation Checklist'}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'kn' ? 'ಬಾಗಲಕೋಟೆ ಬ್ಯಾಕ್‌ಪ್ಯಾಕ್ ಮತ್ತು ಅಗತ್ಯ ವಸ್ತುಗಳ ಪಟ್ಟಿ' : 'Bagalkote Field Essentials & Packing Checklist'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {language === 'kn'
                  ? 'ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಬಿಸಿಲು ಮತ್ತು ದೇವಾಲಯಗಳ ನಿಯಮಗಳಿಗೆ ಅನುಗುಣವಾದ ಅಗತ್ಯ ವಸ್ತುಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಟಿಕ್ ಮಾಡಿ.'
                  : 'Sandstone surfaces absorb intense Deccan heat and sanctums require modest decorum. Check off items as you pack your backpack.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {EXPEDITION_PACKING_ITEMS.map((item) => {
                const isPacked = packedItemIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => togglePackedItem(item.id)}
                    className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isPacked
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                        isPacked
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-slate-300 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase block tracking-wider">
                        {item.category}
                      </span>
                      <h4
                        className={`font-serif font-bold text-sm text-slate-900 ${
                          isPacked ? 'line-through text-slate-500' : ''
                        }`}
                      >
                        {language === 'kn' ? item.nameKn : item.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {language === 'kn' ? item.reasonKn : item.reason}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dress code & etiquette notice */}
            <div className="p-4 rounded-xl bg-white border border-amber-200 text-xs text-slate-700 space-y-1">
              <strong className="text-amber-900 block font-bold">
                {language === 'kn' ? 'ದೇವಾಲಯಗಳ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಗೌರವ ಸೂಚನೆ: ' : 'Heritage Temple Etiquette: '}
              </strong>
              <p>
                {language === 'kn'
                  ? '೧. ದೇವಾಲಯಗಳಲ್ಲಿ ಭುಜ ಮತ್ತು ಮೊಣಕಾಲುಗಳನ್ನು ಮುಚ್ಚುವ ಸೌಮ್ಯ ಉಡುಪುಗಳನ್ನು ಧರಿಸಿ. ೨. ಮೆಟ್ಟಿಲುಗಳ ಬಳಿ ಇರುವ ಕೋತಿಗಳಿಗೆ ಆಹಾರ ನೀಡಬೇಡಿ. ೩. ಪವಿತ್ರ ಪುಷ್ಕರಣಿಯಲ್ಲಿ ಸಾಬೂನು ಬಳಸಬೇಡಿ.'
                  : '1. Shoulders and knees must be covered inside functioning temple sanctums. 2. Do not feed or tease the bonnet macaque monkeys on cave staircases. 3. Avoid plastic waste; please dispose of wrappers only in marked ASI bins.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
