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
  Train,
  Bus,
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
  const [duration, setDuration] = useState<number>(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Architecture', 'History']);
  const [pace, setPace] = useState<'relaxed' | 'moderate' | 'active'>('moderate');
  const [activeTab, setActiveTab] = useState<
    'timeline' | 'matrix' | 'calculator' | 'essentials' | 'alternates' | 'hiddenGems'
  >('timeline');
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [swappingActivityId, setSwappingActivityId] = useState<string | null>(null);
  const [selectedDayTab, setSelectedDayTab] = useState<number | 'all'>(1);
  const [expandedTips, setExpandedTips] = useState<Record<string, boolean>>({});

  const toggleTip = (id: string) => {
    setExpandedTips((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
    const dayCount = archetype.recommendedDuration === '1-day' ? 1 : archetype.recommendedDuration === '3-day' ? 3 : 2;
    setDuration(dayCount);
    setPace(archetype.recommendedPace);
    setSelectedInterests(archetype.interests);

    setItinerary(getDefaultItinerary(dayCount, archetype.interests, archetype.recommendedPace, archetype.id, language));
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
    const dayCount = targetDuration;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          duration: `${targetDuration}-day`,
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

    setItinerary(getDefaultItinerary(dayCount, targetInterests, targetPace, targetArchetypeId, language));
    setIsGenerating(false);
  };

  // Update on language change
  useEffect(() => {
    setItinerary(getDefaultItinerary(duration, selectedInterests, pace, selectedArchetypeId, language));
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
    const daysCount = duration;

    // Entry fees: Badami Caves (₹25), Pattadakal (₹40), Aihole (₹25), Mahakuta (Free), Banashankari (Free)
    const ticketsPerPerson = daysCount === 1 ? 25 : 90 * Math.min(daysCount, 3);
    const totalTickets = ticketsPerPerson * travelPartySize;

    // Food estimate per person per day
    const foodCostPerDay =
      travelStyle === 'budget' ? 220 : travelStyle === 'comfort' ? 450 : 850;
    const totalFood = foodCostPerDay * daysCount * travelPartySize;

    // Transport estimate total
    let totalTransport = 0;
    if (travelStyle === 'budget') {
      totalTransport = daysCount * 450;
    } else if (travelStyle === 'comfort') {
      totalTransport = daysCount * 1800;
    } else {
      totalTransport = daysCount * 3500;
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
    <section id="planner" className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.planner.badge}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            {language === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ಯಾತ್ರೆ ಮತ್ತು ಎಕ್ಸ್‌ಪೆಡಿಷನ್ ಯೋಜಕ' : 'Smart Expedition & Heritage Itinerary'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {language === 'kn'
              ? 'ಆಯ್ಕೆ ಮಾಡಿದ ಶೈಲಿಯ ಪ್ರಕಾರ ದಿನವಾರು ವೇಳಾಪಟ್ಟಿ, ಸ್ಮಾರಕ ಸಮಯ ಮತ್ತು ಊಟದ ವಿವರ.'
              : 'Optimized day-by-day schedules with monument timings, direct routes, and authentic local meals.'}
          </p>
        </div>

        {/* SECTION 1: Expedition Archetypes Selector (Compact Pills) */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                {language === 'kn' ? 'ಹಂತ ೧: ಯಾತ್ರಿಕ ಶೈಲಿ ಆಯ್ಕೆ ಮಾಡಿ' : 'Step 1: Choose Your Expedition Persona'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowAdvancedControls(!showAdvancedControls)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-all cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showAdvancedControls ? (language === 'kn' ? 'ಸರಳ ನೋಟ' : 'Hide Customizer') : (language === 'kn' ? 'ದಿನ / ವೇಗ ಹೊಂದಿಸಿ' : 'Fine-tune Days & Pace')}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {EXPEDITION_ARCHETYPES.map((arch) => {
              const isSelected = selectedArchetypeId === arch.id;
              return (
                <button
                  key={arch.id}
                  type="button"
                  onClick={() => {
                    handleSelectArchetype(arch);
                    setSelectedDayTab(1);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 relative ${
                    isSelected
                      ? 'bg-amber-50 border-amber-600 shadow-xs ring-1 ring-amber-500'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="text-xl shrink-0">{arch.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif font-bold text-xs text-slate-900 truncate">
                      {language === 'kn' ? arch.nameKn : arch.name}
                    </h4>
                    <span className="text-[10px] text-amber-800 font-medium block truncate">
                      {language === 'kn' ? arch.badgeKn : arch.badge}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[9px] shrink-0">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: Advanced Fine-tune Controls (Collapsible) */}
        {showAdvancedControls && (
          <div className="bg-[#FAF7F2] border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-xs mb-6 transition-all animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Duration */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  {language === 'kn' ? 'ಪ್ರವಾಸದ ಅವಧಿ (ದಿನಗಳು)' : 'Trip Duration (1-7 Days)'}
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        setDuration(d);
                        generatePlan(d, selectedInterests, pace, selectedArchetypeId);
                        setSelectedDayTab(1);
                      }}
                      className={`text-center px-1 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                        duration === d
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-white hover:bg-amber-100/50 text-slate-700 border border-amber-200/70'
                      }`}
                    >
                      {d} {language === 'kn' ? 'ದಿನ' : 'd'}
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
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
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
                        className={`py-1 px-1 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
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

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      generatePlan(duration, selectedInterests, pace, selectedArchetypeId);
                      setSelectedDayTab(1);
                    }}
                    disabled={isGenerating}
                    className="w-full py-1.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
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
        <div className="bg-[#FAF7F2] border border-amber-200/90 rounded-2xl p-2.5 sm:p-3 shadow-xs mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* View Selector Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab('timeline')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'timeline'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-200'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{language === 'kn' ? '೧. ಕಾಲರೇಖೆ' : '1. Timeline'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('matrix')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'matrix'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{language === 'kn' ? '೨. ಮಾರ್ಗ & ದೂರ' : '2. Route Matrix'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('calculator')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'calculator'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-200'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>{language === 'kn' ? '೩. ಬಜೆಟ್' : '3. Budget'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('essentials')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'essentials'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-200'
                }`}
              >
                <Luggage className="w-3.5 h-3.5" />
                <span>{language === 'kn' ? '೪. ಬ್ಯಾಕ್‌ಪ್ಯಾಕ್' : '4. Essentials'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('alternates')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'alternates'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-200'
                }`}
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>{language === 'kn' ? '೫. ಪರ್ಯಾಯಗಳು' : '5. Alternates & Hotels'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('hiddenGems')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'hiddenGems'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'kn' ? '೬. ಗುಪ್ತ ರತ್ನಗಳು' : '6. Hidden Gems'}</span>
              </button>
            </div>

            {/* Expedition Progress Counter */}
            <div className="flex items-center justify-between sm:justify-end gap-2.5 bg-white px-3 py-1 rounded-xl border border-amber-200 text-xs">
              <span className="text-[11px] text-slate-600 font-medium">
                {language === 'kn' ? 'ಪ್ರಗತಿ:' : 'Progress:'} <strong>{completedActivitiesCount}/{totalActivitiesCount}</strong>
              </span>
              <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-slate-800">{completionPercent}%</span>
            </div>
          </div>
        </div>

        {/* SECTION 4: MAIN CONTENT TABS */}

        {/* TAB 1: EXPEDITION TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="space-y-4">
            {/* Itinerary Header & Action Toolbar (Compact) */}
            <div className="bg-[#FAF7F2]/80 border border-amber-200/80 rounded-2xl p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-amber-800 font-bold mb-0.5">
                  <Navigation className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    ~{itinerary.totalDistanceKm} km • {itinerary.recommendedTransport}
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
                  {language === 'kn' ? itinerary.titleKn || itinerary.title : itinerary.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">
                  {language === 'kn' ? itinerary.summaryKn || itinerary.summary : itinerary.summary}
                </p>
              </div>

              {/* Action Buttons: WhatsApp, Copy, Print */}
              <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                  title="Share on WhatsApp"
                >
                  <Share2 className="w-3 h-3" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyItinerary}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-300 transition-all cursor-pointer shadow-xs"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? t.planner.copiedText : t.planner.copyBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-300 transition-all cursor-pointer shadow-xs"
                >
                  <Printer className="w-3 h-3" />
                  <span>{t.planner.printBtn}</span>
                </button>
              </div>
            </div>

            {/* DAY SWITCHER TABS - Eliminates endless scrolling */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1 shrink-0">
                {language === 'kn' ? 'ದಿನ:' : 'Day:'}
              </span>
              {itinerary.days.map((day) => (
                <button
                  key={day.dayNumber}
                  type="button"
                  onClick={() => setSelectedDayTab(day.dayNumber)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    selectedDayTab === day.dayNumber
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white hover:bg-amber-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-amber-200/40 text-[10px] flex items-center justify-center">
                    {day.dayNumber}
                  </span>
                  <span>{language === 'kn' ? `ದಿನ ${day.dayNumber}` : `Day ${day.dayNumber}`}</span>
                  <span className="hidden md:inline text-[11px] opacity-80 max-w-[120px] truncate">
                    ({language === 'kn' ? day.themeKn || day.theme : day.theme})
                  </span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setSelectedDayTab(selectedDayTab === 'all' ? 1 : 'all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 border ${
                  selectedDayTab === 'all'
                    ? 'bg-slate-800 text-white border-slate-800 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {selectedDayTab === 'all'
                  ? (language === 'kn' ? '೧ ದಿನದ ನೋಟ' : 'Single Day')
                  : (language === 'kn' ? 'ಎಲ್ಲಾ ದಿನಗಳು' : 'View All Days')}
              </button>
            </div>

            {/* Days Display (Filtered to active day or all) */}
            <div className="space-y-4">
              {itinerary.days
                .filter((d) => selectedDayTab === 'all' || d.dayNumber === selectedDayTab)
                .map((day, dayIndex) => (
                  <div key={day.dayNumber} className="bg-white border border-amber-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                    {/* Day Header Banner */}
                    <div className="flex items-center justify-between border-b border-amber-100 pb-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-serif font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                          {day.dayNumber}
                        </span>
                        <div>
                          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                            {language === 'kn' ? `ದಿನ ${day.dayNumber} ರ ಪ್ರವಾಸ` : `Day ${day.dayNumber} Program`}
                          </span>
                          <h4 className="font-serif font-bold text-sm sm:text-base text-slate-900">
                            {language === 'kn' ? day.themeKn || day.theme : day.theme}
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Activities Timeline Cards (Compact with Collapsible Tips) */}
                    <div className="pl-1 sm:pl-3 space-y-3">
                      {day.activities.map((activity, actIdx) => {
                        const isVisited = activity.id ? visitedActivityIds.includes(activity.id) : false;
                        const hasAudio = !!activity.monumentId;
                        const isSwapping = swappingActivityId === activity.id;
                        const isTipOpen = activity.id ? !!expandedTips[activity.id] : false;

                        return (
                          <div
                            key={activity.id || actIdx}
                            className={`relative pl-4 sm:pl-5 border-l-2 transition-all ${
                              isVisited ? 'border-emerald-500 bg-emerald-50/20' : 'border-amber-300'
                            } py-1`}
                          >
                            {/* Bullet marker */}
                            <button
                              type="button"
                              onClick={() => activity.id && toggleVisitedActivity(activity.id)}
                              title={isVisited ? 'Mark as not visited' : 'Mark as visited'}
                              className={`absolute -left-[10px] sm:-left-[11px] top-1.5 w-4.5 h-4.5 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                                isVisited
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-white border-2 border-amber-500 hover:border-amber-700 text-transparent'
                              }`}
                            >
                              <Check className="w-2.5 h-2.5" />
                            </button>

                            {/* Card Content */}
                            <div className="space-y-1.5">
                              {/* Top row: Time, badges & Quick actions */}
                              <div className="flex flex-wrap items-center justify-between gap-1.5">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span className="text-[11px] font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-300/60 flex items-center gap-1 shrink-0">
                                    <Clock className="w-3 h-3 text-amber-700" />
                                    {activity.time}
                                  </span>

                                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 shrink-0">
                                    <MapPin className="w-3 h-3 text-slate-400" />
                                    {activity.location}
                                  </span>

                                  {activity.durationMins && (
                                    <span className="text-[10px] text-slate-400">
                                      (~{activity.durationMins}m)
                                    </span>
                                  )}
                                </div>

                                {/* Interactive Action Badges */}
                                <div className="flex items-center gap-1">
                                  {hasAudio && onPlayMonumentAudio && (
                                    <button
                                      type="button"
                                      onClick={() => handlePlayAudio(activity.monumentId)}
                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 transition-all cursor-pointer"
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
                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-all cursor-pointer"
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
                                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[11px] font-medium text-amber-800 hover:bg-amber-50 border border-amber-200 transition-all cursor-pointer"
                                      title="Explore alternatives"
                                    >
                                      <Repeat className="w-3 h-3" />
                                      <span>{language === 'kn' ? 'ಬದಲಿಸಿ' : 'Swap'}</span>
                                    </button>
                                  )}

                                  {/* Expandable Tips Toggle */}
                                  {(activity.photoSpotTip || activity.insiderTip) && (
                                    <button
                                      type="button"
                                      onClick={() => activity.id && toggleTip(activity.id)}
                                      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[11px] font-semibold text-amber-800 hover:bg-amber-100 border border-amber-200 bg-amber-50/60 transition-all cursor-pointer"
                                    >
                                      <span>💡 {language === 'kn' ? 'ಸಲಹೆ' : 'Tips'}</span>
                                      <ChevronDown className={`w-3 h-3 transition-transform ${isTipOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Title & Visited Tag */}
                              <h5 className="font-serif font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                                <span>{language === 'kn' ? activity.titleKn || activity.title : activity.title}</span>
                                {isVisited && (
                                  <span className="text-[11px] font-normal text-emerald-700 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>{language === 'kn' ? 'ಭೇಟಿ ನೀಡಲಾಗಿದೆ' : 'Visited'}</span>
                                  </span>
                                )}
                              </h5>

                              {/* Crisp Concise Description (No endless wall of text) */}
                              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                                {language === 'kn' ? activity.descriptionKn || activity.description : activity.description}
                              </p>

                              {/* Expandable Tips Drawer (Only when user toggles) */}
                              {isTipOpen && (
                                <div className="space-y-1.5 pt-1 text-[11px] animate-in fade-in duration-200">
                                  {activity.photoSpotTip && (
                                    <div className="flex items-start gap-1.5 text-amber-950 font-medium bg-amber-50/80 p-2 rounded-lg border border-amber-200/60">
                                      <Camera className="w-3.5 h-3.5 text-amber-700 mt-0.5 shrink-0" />
                                      <span>
                                        <strong>{language === 'kn' ? 'ಫೋಟೋ ಬೆಳಕು: ' : 'Photo Cue: '}</strong>
                                        {activity.photoSpotTip}
                                      </span>
                                    </div>
                                  )}
                                  {activity.insiderTip && (
                                    <div className="flex items-start gap-1.5 text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200">
                                      <Info className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
                                      <span>
                                        <strong>{language === 'kn' ? 'ಸಲಹೆ: ' : 'Advice: '}</strong>
                                        {activity.insiderTip}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Alternative Options Drawer (When user clicks Swap) */}
                              {isSwapping && activity.alternativeOptions && (
                                <div className="mt-2 p-3 rounded-xl bg-amber-50/90 border border-amber-300 space-y-2 animate-fadeIn">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-amber-950 flex items-center gap-1">
                                      <Sparkles className="w-3 h-3 text-amber-700" />
                                      <span>{language === 'kn' ? 'ಪರ್ಯಾಯ ತಾಣಗಳು:' : 'Secret Gem Alternatives:'}</span>
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => setSwappingActivityId(null)}
                                      className="text-xs text-slate-500 hover:text-slate-800"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                  <div className="space-y-1.5">
                                    {activity.alternativeOptions.map((alt) => (
                                      <div
                                        key={alt.id}
                                        className="bg-white p-2.5 rounded-lg border border-amber-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 text-xs"
                                      >
                                        <div>
                                          <h6 className="font-serif font-bold text-xs text-slate-900">
                                            {language === 'kn' ? alt.titleKn : alt.title}
                                          </h6>
                                          <span className="text-[10px] text-slate-400 block">
                                            📍 {alt.location}
                                          </span>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            activity.id && handleSwapActivity(dayIndex, activity.id, alt)
                                          }
                                          className="self-start sm:self-center px-2.5 py-1 rounded-md bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold shrink-0 transition-all cursor-pointer shadow-xs"
                                        >
                                          {language === 'kn' ? 'ಸೇರಿಸಿ' : 'Swap In'}
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

                      {/* Recommended Meal for the Day (Compact) */}
                      {day.recommendedMeal && (
                        <div className="pl-4 sm:pl-5 pt-1">
                          <div className="py-2 px-3 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-2 min-w-0">
                              <Utensils className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                              <span className="font-semibold text-slate-900 truncate">
                                {language === 'kn' ? 'ಶಿಫಾರಸು ಊಟ: ' : 'Meal Stop: '}
                                {language === 'kn' ? day.recommendedMeal.dishKn || day.recommendedMeal.dish : day.recommendedMeal.dish}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-500 shrink-0 truncate">
                              @{day.recommendedMeal.place}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            {/* Pro Tips Section (Compact) */}
            {itinerary.proTips && itinerary.proTips.length > 0 && (
              <div className="bg-[#FAF7F2] border border-amber-200/80 rounded-xl p-3.5 sm:p-4 shadow-xs">
                <h4 className="font-serif font-bold text-xs text-slate-900 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>{t.planner.proTipsTitle}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {itinerary.proTips.map((tip, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-white border border-amber-200/60 text-[11px] text-slate-700 leading-snug shadow-xs"
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

        {/* TAB 5: ALTERNATE TRANSIT & HOTELS */}
        {activeTab === 'alternates' && (
          <div className="bg-[#FAF7F2] border border-amber-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                {language === 'kn' ? 'ತುರ್ತು ಸಾರಿಗೆ ಮತ್ತು ವಸತಿ ಪರ್ಯಾಯಗಳು' : 'Contingency & Alternate Options'}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'kn' ? 'ತಪ್ಪಿದ ರೈಲು/ಬಸ್ ಪರ್ಯಾಯ ಮಾರ್ಗಗಳು ಮತ್ತು ಹೋಟೆಲ್ ಆಯ್ಕೆಗಳು' : 'Missed Train/Bus Backups & Alternate Hotels'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {language === 'kn'
                  ? 'ನಿಗದಿತ ರೈಲು ಅಥವಾ ಬಸ್ ತಪ್ಪಿಹೋದರೆ ಕೈಗೊಳ್ಳಬೇಕಾದ ಪರ್ಯಾಯ ಮಾರ್ಗಗಳು ಮತ್ತು ಬಜೆಟ್‌ಗೆ ತಕ್ಕ ಹೋಟೆಲ್ ವಿವರ.'
                  : 'Never get stranded. Here are verified backup transport routes if you miss your direct train or bus, plus alternate accommodation options across comfort tiers.'}
              </p>
            </div>

            {/* Missed Train / Bus Backup Plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-base">
                  <Train className="w-5 h-5 text-amber-700" />
                  <span>{language === 'kn' ? 'ನೇರ ರೈಲು ತಪ್ಪಿದರೆ ಏನು ಮಾಡಬೇಕು?' : 'Missed Direct Train to Badami?'}</span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <p>
                    <strong>Alternative 1 (Hubballi Route):</strong> Take any express train or KSRTC bus to <strong>Hubballi Junction (UBL)</strong> or <strong>Gadag Junction (GDG)</strong>. From Hubballi, take a connecting passenger train or taxi to Badami (only 1.5 hours / 65 km away).
                  </p>
                  <p>
                    <strong>Alternative 2 (Bagalkote Town Hub):</strong> Trains arriving at Bagalkote Junction (BGK) (22 km from Badami) have 24/7 KSRTC shuttle buses and auto-rickshaws operating every 30 minutes directly to Badami bus stand.
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-base">
                  <Bus className="w-5 h-5 text-amber-700" />
                  <span>{language === 'kn' ? 'ಬಸ್ ತಪ್ಪಿದರೆ ಅಥವಾ ರಾತ್ರಿ ಪ್ರಯಾಣ' : 'Missed Bus / Overnight Backup'}</span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <p>
                    <strong>Overnight KSRTC / Private Sleeper:</strong> Catch any late evening KSRTC Ambari Dream Class or private AC sleeper from Bengaluru (Majestic/KBS) or Pune heading to <strong>Bagalkote Bypass or Ilkal</strong>. Reaches by 6:00 AM.
                  </p>
                  <p>
                    <strong>Taxi Pooling / Cab Share:</strong> Shared taxi counters operate near Hospet (Hampi) and Hubballi stations for direct door-to-door drop at Badami heritage sites.
                  </p>
                </div>
              </div>
            </div>

            {/* Alternate Hotels & Stays */}
            <div>
              <h4 className="font-serif font-bold text-base text-slate-900 mb-3">
                {language === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಿದ ಪರ್ಯಾಯ ಹೋಟೆಲ್‌ಗಳು & ವಸತಿ' : 'Verified Alternate Hotel & Stay Tiers'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    name: 'The Heritage Resort Badami',
                    type: language === 'kn' ? 'ಪಾರಂಪರಿಕ ಐಷರಾಮಿ' : 'Heritage Luxury',
                    price: '₹4,500 - ₹7,500 / night',
                    vibe: language === 'kn' ? 'ಸ್ವಿಮ್ಮಿಂಗ್ ಪೂಲ್, ಕಣಿವೆ ನೋಟ' : 'Poolside chalets with sandstone cliff views.',
                  },
                  {
                    name: 'KSTDC Mayura Chalukya',
                    type: language === 'kn' ? 'ಸರ್ಕಾರಿ ವಿಶ್ವಾಸಾರ್ಹ' : 'Official Tourism Stay',
                    price: '₹2,200 - ₹3,500 / night',
                    vibe: language === 'kn' ? 'ಸಂಗ್ರಹಾಲಯದ ಬಳಿ, ವಿಶಾಲವಾದ ಉದ್ಯಾನವನ' : 'Sprawling lawns adjacent to Badami Museum.',
                  },
                  {
                    name: 'Hotel Rajsangam International',
                    type: language === 'kn' ? 'ಮಧ್ಯಮ ಶ್ರೇಣಿ ಆರಾಮ' : 'Mid-Range Comfort',
                    price: '₹1,800 - ₹2,800 / night',
                    vibe: language === 'kn' ? 'ಪಟ್ಟಣದ ಮಧ್ಯಭಾಗ, ಎಸಿ ಕೊಠಡಿಗಳು' : 'Modern AC rooms in Badami town center.',
                  },
                  {
                    name: 'Agastya Lake View Homestay',
                    type: language === 'kn' ? 'ಸ್ಥಳೀಯ ಹೋಮ್‌ಸ್ಟೇ' : 'Cozy Homestay & Inn',
                    price: '₹800 - ₹1,800 / night',
                    vibe: language === 'kn' ? 'ಮನೆಯ ಊಟ, ಸಾಂಪ್ರದಾಯಿಕ ಆತಿಥ್ಯ' : 'Family-run stay with homemade Jowar rotti meals.',
                  },
                ].map((hotel, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase block tracking-wider">
                        {hotel.type}
                      </span>
                      <h5 className="font-serif font-bold text-sm text-slate-900 mt-0.5">
                        {hotel.name}
                      </h5>
                      <span className="text-xs font-bold text-emerald-700 block mt-1">
                        {hotel.price}
                      </span>
                      <p className="text-xs text-slate-600 mt-2">
                        {hotel.vibe}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: HIDDEN GEMS */}
        {activeTab === 'hiddenGems' && (
          <div className="bg-[#FAF7F2] border border-amber-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
                {language === 'kn' ? 'ಯಾರಿಗೂ ತಿಳಿಯದ ರಮಣೀಯ ಸ್ಥಳಗಳು' : 'Off-the-Beaten-Path Treasures'}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'kn' ? 'ಬಾಗಲಕೋಟೆ ಸರ್ಕ್ಯೂಟ್‌ನ ಗುಪ್ತ ರತ್ನಗಳು (ಎಕ್ಸ್‌ಕ್ಲೂಸಿವ್)' : 'Hidden Gem Places That Should Not Be Missed'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {language === 'kn'
                  ? 'ಸಾಮಾನ್ಯ ಪ್ರವಾಸಿಗರು ನೋಡದ, ಚಾಲುಕ್ಯರ ಕಾಲದ ರಹಸ್ಯ ದೇವಾಲಯಗಳು, ಸೂರ್ಯಾಸ್ತದ ವೀಕ್ಷಣಾ ತಾಣಗಳು ಮತ್ತು ಕರಕುಶಲ ಗ್ರಾಮಗಳು.'
                  : 'Discover secret rock-cut shrines, uncrowded sunrise/sunset panoramic bastions, and indigenous craft alleys missed by standard tourist guidebooks.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: language === 'kn' ? '೧. ಕೆಳ ಶೈವಾಲಯ ರಹಸ್ಯ ಕೋಟೆ' : '1. Lower Shivalaya Secret Bastion',
                  location: 'Badami Northern Hill Top',
                  desc: language === 'kn' ? 'ಸಂಗ್ರಹಾಲಯದ ಹಿಂದಿನ ಬೆಟ್ಟದ ಮೇಲಿರುವ ಈ ೭ನೇ ಶತಮಾನದ ದೇವಾಲಯದಿಂದ ಅಗಸ್ತ್ಯ ತೀರ್ಥ ಮತ್ತು ಭೂತನಾಥ ದೇವಾಲಯದ ಸಂಪೂರ್ಣ ನೋಟ ದೊರೆಯುತ್ತದೆ. ಇಲ್ಲಿ ಜನಸಂದಣಿ ಕಡಿಮೆ.' : 'Perched on the upper tier behind the Badami Museum hill, offering drone-like panoramic views of Agastya Lake and Bhutanatha shrines without tourist crowds.',
                  tip: 'Best visited at 6:30 AM for misty sunrise photography.',
                },
                {
                  title: language === 'kn' ? '೨. ಸಿದ್ಧಾಲಯ ಏಕಶಿಲಾ ಗುಹೆ' : '2. Sidhdhalaya Monolithic Cave Shrine',
                  location: 'Banashankari Outskirts (3 km)',
                  desc: language === 'kn' ? 'ಯಾವೇ ವಾಣಿಜ್ಯ ಪ್ರಚಾರವಿಲ್ಲದ, ಸಂಪೂರ್ಣ ನಿರ್ಜನವಾದ ೮ನೇ ಶತಮಾನದ ಗುಹಾ ದೇವಾಲಯ. ಇಲ್ಲಿನ ನೈಸರ್ಗಿಕ ಧ್ವನಿ ಅನುರಣನ ಅದ್ಭುತ.' : 'An undiscovered 8th-century rock-cut monolithic shrine carved into pristine red sandstone, complete with ancient natural water cisterns and acoustic echo chambers.',
                  tip: 'Carry a flashlight to inspect inner sanctum reliefs.',
                },
                {
                  title: language === 'kn' ? '೩. ಮೇಗುತಿ ಬೆಟ್ಟ ಸೂರ್ಯಾಸ್ತ ವೀಕ್ಷಣೆ' : '3. Meguti Hill Jain Temple Sunset Point',
                  location: 'Aihole Heritage Complex',
                  desc: language === 'kn' ? 'ಐಹೊಳೆ ಮೇಗುತಿ ಬೆಟ್ಟದ ತುತ್ತತುದಿಗೆ ಸಂಜೆ ೫ನೇ ೩೦ಕ್ಕೆ ಹತ್ತಿದರೆ ಮಳಪ್ರಭಾ ನದಿ ಕಣಿವೆಯ ಮೇಲೆ ಸೂರ್ಯಾಸ್ತದ ಸೌಂದರ್ಯ ಕಣ್ಣಿಗೆ ಹಬ್ಬ.' : 'Climb behind the Meguti temple at 5:45 PM for an ethereal golden hour view over the Malaprabha river valley and Meguti stone inscriptions.',
                  tip: 'Wear comfortable walking shoes for the rocky footpath.',
                },
                {
                  title: language === 'kn' ? '೪. ಗುಳೇದಗುಡ್ಡ ಖಾನಾ ಕರಕುಶಲ ಬೀದಿ' : '4. Guledagudda Khana Loom Alley',
                  location: 'Guledagudda Weaving Town (20 km from Badami)',
                  desc: language === 'kn' ? 'ಸಾಂಪ್ರದಾಯಿಕ ೯ ಗಜದ ಇಳಕಲ್ ಖಾನಾ ಬ್ಲೌಸ್ ಬಟ್ಟೆಗಳನ್ನು ನೈಸರ್ಗಿಕ ನೀಲಿ ಬಣ್ಣದಲ್ಲಿ ತಯಾರಿಸುವ ರಹಸ್ಯ ಬೀದಿಗಳು.' : 'Just 20km from Badami, explore narrow street alleys where master artisans hand-dye traditional Khana blouse fabrics using natural indigo and borders.',
                  tip: 'Buy direct from weavers for authentic GI-tagged fabric.',
                },
              ].map((gem, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase block tracking-wider">
                      💎 {gem.location}
                    </span>
                    <h4 className="font-serif font-bold text-base text-slate-900 mt-1">
                      {gem.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                      {gem.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-amber-800 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Insider Tip: {gem.tip}</span>
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
