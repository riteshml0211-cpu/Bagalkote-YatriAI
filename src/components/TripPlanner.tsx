import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Compass, Utensils, Sparkles, Copy, Check, Printer, ChevronRight, Navigation } from 'lucide-react';
import { Language, ItineraryPlan } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getDefaultItinerary } from '../data/itineraryData';

interface TripPlannerProps {
  language: Language;
}

export const TripPlanner: React.FC<TripPlannerProps> = ({ language }) => {
  const [duration, setDuration] = useState<'1-day' | '2-day' | '3-day'>('2-day');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Architecture',
    'History',
  ]);
  const [pace, setPace] = useState<'relaxed' | 'moderate' | 'active'>('moderate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryPlan | null>(null);
  const [copied, setCopied] = useState(false);

  const t = TRANSLATIONS[language];

  const interestOptions = [
    { id: 'Architecture', label: t.planner.interests.architecture },
    { id: 'History', label: t.planner.interests.history },
    { id: 'Handlooms', label: t.planner.interests.handlooms },
    { id: 'Nature', label: t.planner.interests.nature },
    { id: 'Spiritual', label: t.planner.interests.spiritual },
  ];

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((i) => i !== id));
      }
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const generatePlan = async () => {
    setIsGenerating(true);
    const dayCount = duration === '1-day' ? 1 : duration === '3-day' ? 3 : 2;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          duration,
          interests: selectedInterests,
          pace,
          language,
        }),
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.itinerary) {
          setItinerary(data.itinerary);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend itinerary service unavailable, using curated itinerary engine:', err);
    } finally {
      setIsGenerating(false);
    }

    // Curated local itinerary fallback
    setItinerary(getDefaultItinerary(dayCount));
  };

  // Preload initial itinerary
  React.useEffect(() => {
    generatePlan();
  }, [duration, language]);

  const handleCopyItinerary = () => {
    if (!itinerary) return;
    const textLines = [
      language === 'kn' ? itinerary.titleKn : itinerary.title,
      language === 'kn' ? itinerary.summaryKn : itinerary.summary,
      '',
      ...itinerary.days.flatMap((day) => [
        `DAY ${day.dayNumber}: ${language === 'kn' ? day.themeKn : day.theme}`,
        ...day.activities.map(
          (act) => `  ${act.time} - ${language === 'kn' ? act.titleKn : act.title} (${act.location})`
        ),
        `  Meal: ${language === 'kn' ? day.recommendedMeal.dishKn : day.recommendedMeal.dish} @ ${day.recommendedMeal.place}`,
        '',
      ]),
    ];
    navigator.clipboard.writeText(textLines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="planner" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.planner.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {t.planner.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.planner.subtitle}
          </p>
        </div>

        {/* Configuration Controls Bar */}
        <div className="bg-[#FAF7F2] border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Duration Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                {t.planner.durationLabel}
              </label>
              <div className="space-y-1.5">
                {(['1-day', '2-day', '3-day'] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDuration(d)}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      duration === d
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white hover:bg-amber-100/50 text-slate-700 border border-amber-200/70'
                    }`}
                  >
                    {t.planner.durations[d]}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests Multi-Select */}
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
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
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

            {/* Pace Selector & Generate Button */}
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
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold text-center transition-all cursor-pointer ${
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

              <div className="pt-4">
                <button
                  type="button"
                  onClick={generatePlan}
                  disabled={isGenerating}
                  className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {isGenerating ? t.planner.generatingText : t.planner.generateBtn}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Output Itinerary Plan */}
        {itinerary && (
          <div className="bg-white border border-amber-200 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8 animate-in fade-in">
            {/* Header: Title, Summary, Actions */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs text-amber-800 font-bold mb-1">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>
                    {t.planner.totalDistance}: ~{itinerary.totalDistanceKm} km • {itinerary.recommendedTransport}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                  {language === 'kn' ? itinerary.titleKn : itinerary.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {language === 'kn' ? itinerary.summaryKn : itinerary.summary}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyItinerary}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300 transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t.planner.copiedText : t.planner.copyBtn}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300 transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t.planner.printBtn}</span>
                </button>
              </div>
            </div>

            {/* Days Loop */}
            <div className="space-y-8">
              {itinerary.days.map((day) => (
                <div key={day.dayNumber} className="space-y-4">
                  {/* Day Banner */}
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-serif font-bold text-sm flex items-center justify-center shadow-xs">
                      {day.dayNumber}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-lg text-slate-900">
                        {language === 'kn' ? `ದಿನ ${day.dayNumber}: ${day.themeKn}` : `Day ${day.dayNumber}: ${day.theme}`}
                      </h4>
                    </div>
                  </div>

                  {/* Activities Timeline */}
                  <div className="pl-4 ml-4 border-l-2 border-amber-200 space-y-4">
                    {day.activities.map((activity, idx) => (
                      <div key={idx} className="relative pl-4 space-y-1">
                        <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-600 border-2 border-white" />
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                            {activity.time}
                          </span>
                          <span className="font-semibold text-sm text-slate-900">
                            {language === 'kn' ? activity.titleKn : activity.title}
                          </span>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {activity.location}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {language === 'kn' ? activity.descriptionKn : activity.description}
                        </p>
                        {activity.insiderTip && (
                          <p className="text-[11px] text-amber-900 font-medium italic">
                            💡 {activity.insiderTip}
                          </p>
                        )}
                      </div>
                    ))}

                    {/* Recommended Meal for the Day */}
                    {day.recommendedMeal && (
                      <div className="relative pl-4 pt-2">
                        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                          <Utensils className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                          <div className="text-xs">
                            <span className="font-bold text-amber-950 block">
                              {language === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಿದ ಊಟ:' : 'Recommended Meal Stop:'}
                            </span>
                            <span className="font-semibold text-slate-800">
                              {language === 'kn' ? day.recommendedMeal.dishKn : day.recommendedMeal.dish}
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
              <div className="pt-6 border-t border-slate-100">
                <h4 className="font-serif font-bold text-sm text-slate-900 mb-2">
                  {t.planner.proTipsTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {itinerary.proTips.map((tip, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700"
                    >
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
