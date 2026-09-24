import React, { useState, useMemo, useEffect } from 'react';
import {
  Train,
  Bus,
  Car,
  Plane,
  MapPin,
  Clock,
  ArrowRight,
  Navigation,
  ExternalLink,
  Copy,
  Check,
  Printer,
  Sparkles,
  PhoneCall,
  Fuel,
  Info,
  Calendar,
  Ticket,
  ChevronRight,
  ShieldCheck,
  Search,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { Language } from '../types';
import {
  DEPARTURE_HUBS,
  CIRCUIT_DESTINATIONS,
  LOCAL_TRANSIT_OPTIONS,
  calculateCustomCityTransit,
  DepartureHub,
} from '../data/transportationData';

interface TransportationHubProps {
  language: Language;
  initialDepartureCity?: string;
}

export const TransportationHub: React.FC<TransportationHubProps> = ({
  language,
  initialDepartureCity,
}) => {
  // State
  const [selectedHubId, setSelectedHubId] = useState<string>('bengaluru');
  const [customCityInput, setCustomCityInput] = useState<string>('');
  const [isSearchingCustom, setIsSearchingCustom] = useState<boolean>(false);
  const [selectedDestinationKey, setSelectedDestinationKey] = useState<string>('badami');
  const [activeTransitMode, setActiveTransitMode] = useState<'all' | 'train' | 'bus' | 'flight' | 'road' | 'local'>('all');
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Sync when initialDepartureCity prop changes from outside (e.g. Hero search or Features Showcase)
  useEffect(() => {
    if (initialDepartureCity && initialDepartureCity.trim()) {
      const cityClean = initialDepartureCity.trim().toLowerCase();
      const matched = DEPARTURE_HUBS.find(
        (h) =>
          h.id.toLowerCase() === cityClean ||
          h.name.toLowerCase().includes(cityClean) ||
          (h.nameKn && h.nameKn.includes(cityClean))
      );
      if (matched) {
        setSelectedHubId(matched.id);
        setIsSearchingCustom(false);
        setCustomCityInput('');
      } else {
        setCustomCityInput(initialDepartureCity.trim());
        setIsSearchingCustom(true);
      }
    }
  }, [initialDepartureCity]);

  // Active hub calculation (preset or custom)
  const currentHubData: { matchedHub: DepartureHub; isCustom: boolean } = useMemo(() => {
    if (isSearchingCustom && customCityInput.trim().length > 1) {
      return calculateCustomCityTransit(customCityInput, language);
    }
    const found = DEPARTURE_HUBS.find((h) => h.id === selectedHubId);
    return {
      matchedHub: found || DEPARTURE_HUBS[0],
      isCustom: false,
    };
  }, [selectedHubId, isSearchingCustom, customCityInput, language]);

  const activeHub = currentHubData.matchedHub;
  const activeDest = CIRCUIT_DESTINATIONS[selectedDestinationKey] || CIRCUIT_DESTINATIONS.badami;

  // Handle preset chip click
  const handleSelectPreset = (hubId: string) => {
    setSelectedHubId(hubId);
    setIsSearchingCustom(false);
    setCustomCityInput('');
  };

  // Handle custom search submit
  const handleCustomSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customCityInput.trim()) {
      setIsSearchingCustom(true);
    }
  };

  // Reset to default
  const handleResetSearch = () => {
    setIsSearchingCustom(false);
    setCustomCityInput('');
    setSelectedHubId('bengaluru');
  };

  // Copy transit summary
  const handleCopySummary = () => {
    const text = `=== CHALUKYA HERITAGE TRANSIT PLANNER ===
Departure: ${activeHub.name}
Destination: ${activeDest.name}
Distance: ~${activeHub.distanceKm} km
Fastest Travel Time: ${activeHub.fastestTravelTime}
Cheapest Estimated Fare: ${activeHub.cheapestFareEstimate}
Recommended Route: ${activeHub.recommendationSummary}

Top Trains: ${activeHub.trains.map((t) => `${t.trainName} (#${t.trainNumber}) [${t.departureTime} -> ${t.arrivalTime}]`).join('; ')}
Buses: ${activeHub.buses.map((b) => `${b.operator} (${b.busType}) [Fares: ${b.fareRange}]`).join('; ')}
Road Highways: ${activeHub.road.highways} (Approx ${activeHub.road.estimatedDrivingTime})

Local Circuit Transit in Badami: NWKRTC rural red buses (platform 3) or Authorized Auto Union Golden Circuit Tour (₹1,500 full day).
Generated via Bagalkote YatriAI Digital Heritage Portal.`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    });
  };

  // Print transit summary
  const handlePrintSummary = () => {
    window.print();
  };

  // Generate dynamic Google Maps Directions URL
  const googleMapsUrl = useMemo(() => {
    const origin = encodeURIComponent(activeHub.name + ', India');
    const destination = encodeURIComponent(activeDest.name + ', Karnataka, India');
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
  }, [activeHub.name, activeDest.name]);

  return (
    <section id="transportation" className="py-12 sm:py-20 bg-linear-to-b from-[#F7F3EB] via-amber-50/40 to-[#FAF7F2] border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold tracking-wide uppercase shadow-xs mb-3">
            <Navigation className="w-3.5 h-3.5 text-amber-700" />
            <span>{language === 'kn' ? 'ಸರ್ವತೋಮುಖ ಸಾರಿಗೆ ವ್ಯವಸ್ಥೆ' : 'Multi-Modal Transit & Routes'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {language === 'kn' ? (
              <>
                ಚಾಲುಕ್ಯ ಪರಂಪರೆಗೆ <span className="text-amber-800">ಹೋಗುವುದು ಹೇಗೆ?</span> ಸಾರಿಗೆ ವ್ಯವಸ್ಥೆ
              </>
            ) : (
              <>
                How to Reach <span className="text-amber-800">Badami & Chalukya Circuit</span>
              </>
            )}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {language === 'kn'
              ? 'ನೀವು ಯಾವ ಊರಿನಿಂದ ಹೊರಡುತ್ತಿದ್ದೀರಿ ಎಂಬುದನ್ನು ನಮೂದಿಸಿ. ರೈಲುಗಳು, ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಎಸಿ ಸ್ಲೀಪರ್ ಬಸ್ಸುಗಳು, ವಿಮಾನ ಸಂಪರ್ಕಗಳು, ಹೆದ್ದಾರಿ ಮಾರ್ಗಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಆಟೋ/ಶಟಲ್ ವಾಹನಗಳ ಸಂಪೂರ್ಣ ವಿವರ ಇಲ್ಲಿದೆ.'
              : 'Enter your departure city to instantly see all available trains, KSRTC sleeper buses, flights, road driving routes, and local inter-monument shuttles with exact fares & schedules.'}
          </p>
        </div>

        {/* SECTION 1: SEARCH & DEPARTURE CITY SELECTOR */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-xl border border-amber-900/10 mb-8 sm:mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Input box */}
            <div className="lg:col-span-7">
              <label className="block text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                {language === 'kn' ? 'ನೀವು ಎಲ್ಲಿಂದ ಹೊರಡುತ್ತಿದ್ದೀರಿ? (ನಿಮ್ಮ ಊರು)' : 'Where are you traveling from? (Departure City)'}
              </label>

              <form onSubmit={handleCustomSearchSubmit} className="relative flex items-center shadow-inner rounded-2xl bg-slate-50 border border-slate-300 focus-within:border-amber-600 focus-within:ring-2 focus-within:ring-amber-200 transition-all">
                <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
                <input
                  type="text"
                  value={customCityInput}
                  onChange={(e) => {
                    setCustomCityInput(e.target.value);
                    if (!isSearchingCustom && e.target.value.trim().length > 1) {
                      setIsSearchingCustom(true);
                    }
                  }}
                  placeholder={
                    language === 'kn'
                      ? 'ಉದಾಹರಣೆಗೆ: ಬೆಂಗಳೂರು, ಮೈಸೂರು, ಹೈದರಾಬಾದ್, ಮುಂಬೈ, ಗೋವಾ, ಮಂಗಳೂರು, ದಾವಣಗೆರೆ...'
                      : 'Type any city (e.g. Bengaluru, Mysuru, Hyderabad, Mumbai, Goa, Mangalore, Delhi)...'
                  }
                  className="w-full px-3 py-3.5 sm:py-4 bg-transparent text-slate-900 placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-hidden"
                />
                {isSearchingCustom ? (
                  <button
                    type="button"
                    onClick={handleResetSearch}
                    className="mr-2 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {language === 'kn' ? 'ಮರುಹೊಂದಿಸಿ' : 'Reset'}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="mr-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    {language === 'kn' ? 'ಹುಡುಕಿ' : 'Find Routes'}
                  </button>
                )}
              </form>
            </div>

            {/* Right: Destination selector */}
            <div className="lg:col-span-5">
              <label className="block text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-amber-600" />
                {language === 'kn' ? 'ನಿಮ್ಮ ತಲುಪಬೇಕಾದ ತಾಣ' : 'Select Chalukya Circuit Destination'}
              </label>

              <div className="relative">
                <select
                  value={selectedDestinationKey}
                  onChange={(e) => setSelectedDestinationKey(e.target.value)}
                  className="w-full px-4 py-3.5 sm:py-4 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-sm sm:text-base font-medium focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition-all cursor-pointer"
                >
                  {Object.values(CIRCUIT_DESTINATIONS).map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {language === 'kn' ? dest.nameKn : dest.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Popular Preset Hub Pills */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {language === 'kn' ? 'ಜನಪ್ರಿಯ ನಿರ್ಗಮನ ನಗರಗಳು' : 'Popular Departure Hubs (Click to Switch):'}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                {language === 'kn' ? 'ಕೇವಲ ೧ ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಮಾಹಿತಿ' : 'Instant 1-click transit analysis'}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {DEPARTURE_HUBS.map((hub) => {
                const isSelected = !isSearchingCustom && selectedHubId === hub.id;
                return (
                  <button
                    key={hub.id}
                    onClick={() => handleSelectPreset(hub.id)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-800 text-white shadow-md shadow-amber-900/20 ring-2 ring-amber-600/50 scale-[1.02]'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <span>{language === 'kn' ? hub.nameKn : hub.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-amber-900/60 text-amber-200' : 'bg-slate-200 text-slate-600'}`}>
                      {hub.distanceKm} km
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ACTIVE ROUTE OVERVIEW CARD */}
        <div className="bg-linear-to-r from-amber-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl mb-8 relative overflow-hidden">
          {/* Subtle background ornamentation */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Top row badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold tracking-wide flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  {language === 'kn' ? 'ಸಕ್ರಿಯ ಸಾರಿಗೆ ಮಾರ್ಗ' : 'Active Transit Analysis'}
                </span>
                {currentHubData.isCustom && (
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 text-xs font-medium">
                    {language === 'kn' ? 'ಕಸ್ಟಮ್ ನಗರ ಸಂಪರ್ಕ' : 'Custom Route Calculated'}
                  </span>
                )}
              </div>

              {/* Action buttons (Copy / Print / Google Maps) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySummary}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
                  title="Copy transit summary to clipboard"
                >
                  {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-300" />}
                  <span>{copiedSummary ? (language === 'kn' ? 'ಕಾಪಿ ಮಾಡಲಾಗಿದೆ' : 'Copied!') : (language === 'kn' ? 'ಕಾಪಿ ಮಾಡಿ' : 'Copy Route')}</span>
                </button>

                <button
                  onClick={handlePrintSummary}
                  className="hidden sm:flex px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
                  title="Print or Save PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'kn' ? 'ಪ್ರಿಂಟ್' : 'Print Guide'}</span>
                </button>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-slate-950" />
                  <span>{language === 'kn' ? 'Google Maps ದಾರಿ' : 'Google Maps GPS'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-900" />
                </a>
              </div>
            </div>

            {/* Route Breadcrumb Headline */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 my-3 text-xl sm:text-3xl font-extrabold">
              <span className="text-amber-200 underline decoration-amber-500/50 decoration-2">
                {language === 'kn' ? activeHub.nameKn : activeHub.name}
              </span>
              <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 text-amber-400 shrink-0" />
              <span className="text-white">
                {language === 'kn' ? activeDest.nameKn : activeDest.name}
              </span>
            </div>

            {/* Distance & Travel Matrix Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4">
                <span className="text-[11px] text-amber-300 font-medium block uppercase tracking-wider">
                  {language === 'kn' ? 'ಒಟ್ಟು ದೂರ' : 'Total Distance'}
                </span>
                <span className="text-lg sm:text-2xl font-bold text-white mt-0.5 block">
                  ~{activeHub.distanceKm} km
                </span>
                <span className="text-[11px] text-slate-300 block">
                  {selectedDestinationKey !== 'badami' ? `(+${activeDest.distanceFromBadami})` : 'Direct to Central Hub'}
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4">
                <span className="text-[11px] text-amber-300 font-medium block uppercase tracking-wider">
                  {language === 'kn' ? 'ಅತ್ಯಂತ ವೇಗದ ಸಮಯ' : 'Fastest Travel Time'}
                </span>
                <span className="text-lg sm:text-2xl font-bold text-emerald-300 mt-0.5 block">
                  {activeHub.fastestTravelTime.split('(')[0]}
                </span>
                <span className="text-[11px] text-slate-300 block truncate">
                  {activeHub.fastestTravelTime.includes('(') ? `(${activeHub.fastestTravelTime.split('(')[1]}` : 'Multi-modal'}
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4">
                <span className="text-[11px] text-amber-300 font-medium block uppercase tracking-wider">
                  {language === 'kn' ? 'ಅತ್ಯಂತ ಕಡಿಮೆ ಖರ್ಚು' : 'Cheapest Fare'}
                </span>
                <span className="text-lg sm:text-2xl font-bold text-amber-300 mt-0.5 block">
                  {activeHub.cheapestFareEstimate}
                </span>
                <span className="text-[11px] text-slate-300 block">
                  {language === 'kn' ? 'ರೈಲು / ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ' : 'SWR Train / KSRTC'}
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4">
                <span className="text-[11px] text-amber-300 font-medium block uppercase tracking-wider">
                  {language === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಿದ ಸಾರಿಗೆ' : 'Recommended Mode'}
                </span>
                <span className="text-lg sm:text-2xl font-bold text-cyan-300 mt-0.5 block uppercase">
                  {activeHub.recommendedMode === 'train' ? '🚆 Train' : activeHub.recommendedMode === 'bus' ? '🚌 Bus' : activeHub.recommendedMode === 'flight' ? '✈️ Flight' : '🚗 Road'}
                </span>
                <span className="text-[11px] text-slate-300 block">
                  {language === 'kn' ? 'ಉತ್ತಮ ಸೌಲಭ್ಯ' : 'Best Balance'}
                </span>
              </div>
            </div>

            {/* Recommendation summary box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
                <strong className="text-amber-300">
                  {language === 'kn' ? 'ಪ್ರಮುಖ ಸಾರಿಗೆ ಸಲಹೆ: ' : 'Expert Recommendation: '}
                </strong>
                {language === 'kn' ? activeHub.recommendationSummaryKn : activeHub.recommendationSummary}
              </p>
            </div>
          </div>
        </div>

        {/* TRANSIT MODE FILTER TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          <button
            onClick={() => setActiveTransitMode('all')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTransitMode === 'all'
                ? 'bg-amber-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{language === 'kn' ? 'ಎಲ್ಲಾ ಸಾರಿಗೆ ವ್ಯವಸ್ಥೆಗಳು' : 'All Transit Systems'}</span>
          </button>

          <button
            onClick={() => setActiveTransitMode('train')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTransitMode === 'train'
                ? 'bg-amber-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Train className="w-4 h-4 text-emerald-600" />
            <span>{language === 'kn' ? 'ರೈಲುಗಳು (Trains)' : 'Trains (Direct & Connecting)'}</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              {activeHub.trains.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTransitMode('bus')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTransitMode === 'bus'
                ? 'bg-amber-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Bus className="w-4 h-4 text-blue-600" />
            <span>{language === 'kn' ? 'ಬಸ್ಸುಗಳು (KSRTC/Sleepers)' : 'Buses (KSRTC & Sleepers)'}</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 font-bold">
              {activeHub.buses.length}
            </span>
          </button>

          {activeHub.flight && (
            <button
              onClick={() => setActiveTransitMode('flight')}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                activeTransitMode === 'flight'
                  ? 'bg-amber-800 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Plane className="w-4 h-4 text-sky-600" />
              <span>{language === 'kn' ? 'ವಿಮಾನ + ರಸ್ತೆ ಸಂಪರ್ಕ' : 'Flights + Airport Taxi'}</span>
            </button>
          )}

          <button
            onClick={() => setActiveTransitMode('road')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTransitMode === 'road'
                ? 'bg-amber-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Car className="w-4 h-4 text-amber-600" />
            <span>{language === 'kn' ? 'ರಸ್ತೆ / ಸೆಲ್ಫ್ ಡ್ರೈವ್ / ಟ್ಯಾಕ್ಸಿ' : 'Road / Self-Drive / Cabs'}</span>
          </button>

          <button
            onClick={() => setActiveTransitMode('local')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
              activeTransitMode === 'local'
                ? 'bg-amber-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span className="text-sm">🛺</span>
            <span>{language === 'kn' ? 'ಸ್ಥಳೀಯ ಆಟೋ & ಶಟಲ್ ಬಸ್' : 'Local Circuit Shuttles'}</span>
          </button>
        </div>

        {/* DETAILED TRANSIT SYSTEM CARDS */}
        <div className="space-y-8">
          {/* 1. TRAINS SECTION */}
          {(activeTransitMode === 'all' || activeTransitMode === 'train') && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <Train className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <span>{language === 'kn' ? 'ರೈಲು ಸಂಪರ್ಕಗಳು' : 'Indian Railways (SWR) Services'}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                        {language === 'kn' ? 'ನೇರ ನಿಲ್ದಾಣ: ಬಾದಾಮಿ (BDM)' : 'Station Code: BDM'}
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {language === 'kn'
                        ? 'ಬಾದಾಮಿ ರೈಲು ನಿಲ್ದಾಣವು (BDM) ಗುಹೆಗಳಿಂದ ಕೇವಲ ೪ ಕಿ.ಮೀ ದೂರದಲ್ಲಿದೆ. ನಿಲ್ದಾಣದ ಹೊರಗೆ ಸದಾ ಆಟೋಗಳು ಲಭ್ಯ.'
                        : 'Badami Railway Station (BDM) is just 4 km from the cave temples. Auto rickshaws are stationed directly outside.'}
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.irctc.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all"
                >
                  <Ticket className="w-4 h-4" />
                  <span>{language === 'kn' ? 'IRCTC ಟಿಕೆಟ್ ಬುಕ್ ಮಾಡಿ' : 'Book on IRCTC'}</span>
                  <ExternalLink className="w-3 h-3 text-emerald-200" />
                </a>
              </div>

              {/* Train Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {activeHub.trains.map((train, idx) => (
                  <div key={idx} className="bg-slate-50 hover:bg-emerald-50/40 rounded-2xl p-5 border border-slate-200 transition-all flex flex-col justify-between">
                    <div>
                      {/* Train Header */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                            #{train.trainNumber}
                          </span>
                          <h4 className="text-base font-bold text-slate-900 mt-1">
                            {language === 'kn' ? train.trainNameKn : train.trainName}
                          </h4>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-600 bg-white px-2 py-1 rounded-md border border-slate-200 shrink-0">
                          {language === 'kn' ? train.frequencyKn : train.frequency}
                        </span>
                      </div>

                      {/* Station and Timings */}
                      <div className="my-3 py-3 border-y border-slate-200/80 space-y-1.5 text-xs text-slate-600">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-500">{language === 'kn' ? 'ಹೊರಡುವ ನಿಲ್ದಾಣ:' : 'Departure:'}</span>
                          <span className="font-bold text-slate-800">{train.originStation}</span>
                        </div>
                        <div className="flex items-center justify-between text-emerald-900 font-semibold">
                          <span>{language === 'kn' ? 'ಸಮಯ & ಅವಧಿ:' : 'Time & Duration:'}</span>
                          <span>{train.departureTime} ({train.duration})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-500">{language === 'kn' ? 'ತಲುಪುವ ನಿಲ್ದಾಣ:' : 'Arrival Station:'}</span>
                          <span className="font-bold text-slate-800">{train.destinationStation}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-700">
                          <span>{language === 'kn' ? 'ತಲುಪುವ ಸಮಯ:' : 'Arrival Time:'}</span>
                          <span className="font-bold text-slate-900">{train.arrivalTime}</span>
                        </div>
                      </div>

                      {/* Classes & Indicative Fare */}
                      <div className="mb-3">
                        <span className="text-[11px] text-slate-500 block mb-1 font-semibold uppercase tracking-wider">
                          {language === 'kn' ? 'ದರ ಶ್ರೇಣಿಗಳು (ಅಂದಾಜು):' : 'Indicative Fares:'}
                        </span>
                        <p className="text-xs font-semibold text-emerald-800 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                          {train.fareRange}
                        </p>
                      </div>

                      {/* Pro tip */}
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{language === 'kn' ? train.proTipKn : train.proTip}</span>
                      </div>
                    </div>

                    <a
                      href={train.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full py-2 rounded-xl bg-white hover:bg-emerald-700 text-emerald-800 hover:text-white border border-emerald-300 text-xs font-bold text-center transition-all flex items-center justify-center gap-1"
                    >
                      <span>{language === 'kn' ? 'ಲಭ್ಯತೆ ಪರಿಶೀಲಿಸಿ' : 'Check Live Availability'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. BUSES SECTION */}
          {(activeTransitMode === 'all' || activeTransitMode === 'bus') && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                    <Bus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <span>{language === 'kn' ? 'ಬಸ್ ಸಾರಿಗೆ ವ್ಯವಸ್ಥೆ (KSRTC & NWKRTC)' : 'KSRTC & Private Sleeper Buses'}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                        {language === 'kn' ? 'ನೇರ ಬಸ್ ನಿಲ್ದಾಣ: ಬಾದಾಮಿ' : 'Direct to Badami Stand'}
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {language === 'kn'
                        ? 'ಬಾದಾಮಿ ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಕೇಂದ್ರ ಬಸ್ ನಿಲ್ದಾಣವು ಪಟ್ಟಣದ ಹೃದಯಭಾಗದಲ್ಲಿದ್ದು, ಎಲ್ಲಾ ಗುಹೆಗಳು ಹಾಗೂ ಹೋಟೆಲ್‌ಗಳಿಗೆ ಸುಲಭ ಪ್ರವೇಶವಿದೆ.'
                        : 'Badami Central Bus Stand is centrally situated near Ramdurg road, offering instant access to lodges, canteens, and monuments.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://ksrtc.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>{language === 'kn' ? 'KSRTC.in ಬುಕಿಂಗ್' : 'Book on KSRTC.in'}</span>
                    <ExternalLink className="w-3 h-3 text-blue-200" />
                  </a>
                </div>
              </div>

              {/* Bus Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {activeHub.buses.map((bus, idx) => (
                  <div key={idx} className="bg-slate-50 hover:bg-blue-50/40 rounded-2xl p-5 border border-slate-200 transition-all flex flex-col justify-between">
                    <div>
                      {/* Operator & Type */}
                      <div className="mb-2">
                        <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                          {bus.operator}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-1">
                          {language === 'kn' ? bus.busTypeKn : bus.busType}
                        </h4>
                      </div>

                      {/* Timings & Points */}
                      <div className="my-3 py-3 border-y border-slate-200/80 space-y-1.5 text-xs text-slate-600">
                        <div className="flex items-start justify-between">
                          <span className="font-medium text-slate-500">{language === 'kn' ? 'ಹತ್ತುವ ಸ್ಥಳಗಳು:' : 'Boarding:'}</span>
                          <span className="font-bold text-slate-800 text-right max-w-[65%] truncate">
                            {bus.boardingPoints.join(', ')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-blue-900 font-semibold">
                          <span>{language === 'kn' ? 'ಹೊರಡುವ ಸಮಯ:' : 'Departure Times:'}</span>
                          <span>{bus.departureTimes}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-500">{language === 'kn' ? 'ಪ್ರಯಾಣದ ಅವಧಿ:' : 'Duration:'}</span>
                          <span className="font-bold text-slate-800">{bus.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-500">{language === 'kn' ? 'ಇಳಿಯುವ ಸ್ಥಳ:' : 'Dropping:'}</span>
                          <span className="font-bold text-slate-800">{bus.droppingPoints.join(', ')}</span>
                        </div>
                      </div>

                      {/* Fares & Amenities */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                            {language === 'kn' ? 'ಟಿಕೆಟ್ ದರ:' : 'Ticket Fare:'}
                          </span>
                          <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                            {bus.fareRange}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {bus.amenities.map((amenity, i) => (
                            <span key={i} className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pro tip */}
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{language === 'kn' ? bus.proTipKn : bus.proTip}</span>
                      </div>
                    </div>

                    <a
                      href={bus.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full py-2 rounded-xl bg-white hover:bg-blue-700 text-blue-800 hover:text-white border border-blue-300 text-xs font-bold text-center transition-all flex items-center justify-center gap-1"
                    >
                      <span>{language === 'kn' ? 'ಬಸ್ ಸೀಟ್ ಬುಕ್ ಮಾಡಿ' : 'Book Bus Ticket'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. FLIGHT + CONNECTING ROAD SECTION (if available) */}
          {(activeTransitMode === 'all' || activeTransitMode === 'flight') && activeHub.flight && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
                    <Plane className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <span>{language === 'kn' ? 'ವಿಮಾನ ಮತ್ತು ರಸ್ತೆ ಸಂಪರ್ಕ' : 'Flights via Hubballi / Belagavi'}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-bold">
                        {activeHub.flight.nearestAirport} ({activeHub.flight.airportCode})
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {language === 'kn'
                        ? 'ಹತ್ತಿರದ ವಾಣಿಜ್ಯ ವಿಮಾನ ನಿಲ್ದಾಣದಿಂದ ಬಾದಾಮಿಗೆ ಕೇವಲ ೨ ರಿಂದ ೨.೫ ಗಂಟೆಗಳ ರಸ್ತೆ ಪ್ರಯಾಣ.'
                        : `Nearest airport is ${activeHub.flight.distanceToBadami}, connected via smooth state highways.`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Flight details split card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-sky-50/40 rounded-2xl p-6 border border-sky-100">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-sky-900 uppercase tracking-wider flex items-center gap-2">
                    <Plane className="w-4 h-4 text-sky-600" />
                    {language === 'kn' ? 'ಹಂತ ೧: ವಿಮಾನ ಪ್ರಯಾಣ' : 'Leg 1: Air Travel to Gateway Airport'}
                  </h4>

                  <div className="bg-white rounded-xl p-4 border border-sky-100 space-y-2 text-xs text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500">{language === 'kn' ? 'ವಿಮಾನ ನಿಲ್ದಾಣ:' : 'Gateway Airport:'}</span>
                      <span className="font-bold text-slate-900">{activeHub.flight.nearestAirport}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{language === 'kn' ? 'ವಿಮಾನ ಅವಧಿ:' : 'Flight Duration:'}</span>
                      <span className="font-bold text-emerald-700">{activeHub.flight.flightDuration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{language === 'kn' ? 'ವಿಮಾನಯಾನ ಸಂಸ್ಥೆಗಳು:' : 'Operating Airlines:'}</span>
                      <span className="font-bold text-slate-800">{activeHub.flight.airlines.join(', ')}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-sky-200 text-xs text-sky-950 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <p>{language === 'kn' ? activeHub.flight.proTipKn : activeHub.flight.proTip}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-2">
                    <Car className="w-4 h-4 text-emerald-600" />
                    {language === 'kn' ? 'ಹಂತ ೨: ವಿಮಾನ ನಿಲ್ದಾಣದಿಂದ ಬಾದಾಮಿಗೆ ರಸ್ತೆ ಪ್ರಯಾಣ' : 'Leg 2: Airport to Badami Highway Transit'}
                  </h4>

                  <div className="bg-white rounded-xl p-4 border border-sky-100 space-y-2 text-xs text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500">{language === 'kn' ? 'ರಸ್ತೆ ದೂರ & ಸಮಯ:' : 'Distance & Drive Time:'}</span>
                      <span className="font-bold text-slate-900">{activeHub.flight.distanceToBadami} ({activeHub.flight.driveTime})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{language === 'kn' ? 'ಪ್ರಿಪೇಯ್ಡ್ ಟ್ಯಾಕ್ಸಿ ದರ:' : 'Pre-paid Airport Cab:'}</span>
                      <span className="font-bold text-amber-700">{activeHub.flight.connectingRoadTransit.taxiFare}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-slate-500 block mb-1">{language === 'kn' ? 'ಬಸ್ ಪರ್ಯಾಯ:' : 'Budget Bus Alternative:'}</span>
                      <p className="text-[11px] text-slate-600">
                        {language === 'kn' ? activeHub.flight.connectingRoadTransit.busDetailsKn : activeHub.flight.connectingRoadTransit.busDetails}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. ROAD / HIGHWAY & CAB SECTION */}
          {(activeTransitMode === 'all' || activeTransitMode === 'road') && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <span>{language === 'kn' ? 'ರಸ್ತೆ ಮಾರ್ಗ, ಸೆಲ್ಫ್ ಡ್ರೈವ್ ಮತ್ತು ಟ್ಯಾಕ್ಸಿ' : 'Road Driving Routes & Cab Tariffs'}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
                        {activeHub.road.roadQuality} Highway
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {language === 'kn'
                        ? 'ಸುಂದರ ಹೆದ್ದಾರಿಗಳು, ಇಂಧನ ಕೇಂದ್ರಗಳು, ಊಟದ ಹೋಟೆಲ್‌ಗಳು ಮತ್ತು ಅಂದಾಜು ಟೋಲ್ ವಿವರಗಳು.'
                        : 'Detailed driving directions, highway toll estimates, quality rating, and scenic pit stops.'}
                    </p>
                  </div>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{language === 'kn' ? 'Google Maps ನಲ್ಲಿ ಮಾರ್ಗ ನೋಡಿ' : 'Start Google Navigation'}</span>
                  <ExternalLink className="w-3 h-3 text-amber-200" />
                </a>
              </div>

              {/* Highway details layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left col: Route summary */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                      {language === 'kn' ? 'ಪ್ರಮುಖ ಹೆದ್ದಾರಿ ಮಾರ್ಗ ನಕ್ಷೆ' : 'Recommended Highway Route Corridor'}
                    </span>
                    <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                      {language === 'kn' ? activeHub.road.routeSummaryKn : activeHub.road.routeSummary}
                    </p>
                    <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-4 text-xs text-slate-600">
                      <div>
                        <span className="text-slate-400 block">{language === 'kn' ? 'ಹೆದ್ದಾರಿ ಸಂಖ್ಯೆಗಳು:' : 'Highways:'}</span>
                        <span className="font-bold text-slate-800">{activeHub.road.highways}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">{language === 'kn' ? 'ಅಂದಾಜು ಡ್ರೈವಿಂಗ್ ಸಮಯ:' : 'Driving Time:'}</span>
                        <span className="font-bold text-emerald-700">{activeHub.road.estimatedDrivingTime}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">{language === 'kn' ? 'ಅಂದಾಜು ಟೋಲ್ ಶುಲ್ಕ:' : 'Toll Charges:'}</span>
                        <span className="font-bold text-amber-800">{activeHub.road.tollEstimate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Scenic stops & Food Pit stops */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                      <span className="text-xs font-bold text-amber-900 block mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        {language === 'kn' ? 'ದಾರಿಯ ಸುಂದರ ತಾಣಗಳು' : 'Scenic Sights on the Way'}
                      </span>
                      <ul className="text-xs text-slate-700 space-y-1.5">
                        {(language === 'kn' ? activeHub.road.scenicStopsKn : activeHub.road.scenicStops).map((stop, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                            <span>{stop}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <span className="text-xs font-bold text-slate-800 block mb-2 flex items-center gap-1.5">
                        <Fuel className="w-3.5 h-3.5 text-amber-600" />
                        {language === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಿದ ಹೋಟೆಲ್ & ವಿಶ್ರಾಂತಿ ತಾಣಗಳು' : 'Recommended Food & Rest Stops'}
                      </span>
                      <ul className="text-xs text-slate-700 space-y-1.5">
                        {activeHub.road.recommendedPitStops.map((pit, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                            <span>{pit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right col: Cab hire estimate card */}
                <div className="lg:col-span-5 bg-linear-to-br from-amber-50 to-orange-50/60 p-5 sm:p-6 rounded-2xl border border-amber-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-amber-950 uppercase tracking-wider flex items-center gap-2">
                        <Car className="w-4 h-4 text-amber-700" />
                        {language === 'kn' ? 'ಖಾಸಗಿ ಕ್ಯಾಬ್ / ಟ್ಯಾಕ್ಸಿ ಅಂದಾಜು ದರ' : 'Estimated One-Way Cab Hire'}
                      </h4>
                      <span className="text-[10px] bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                        Intercity
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mb-4">
                      {language === 'kn'
                        ? 'ನಿಮ್ಮ ನಗರದಿಂದ ಬಾದಾಮಿಗೆ ನೇರ ಖಾಸಗಿ ಟ್ಯಾಕ್ಸಿ ದರಗಳು (ಇಂಧನ ಮತ್ತು ಡ್ರೈವರ್ ಭತ್ಯೆ ಸೇರಿ ಅಂದಾಜು):'
                        : `Estimated private taxi hire from ${activeHub.name} to Badami circuit:`}
                    </p>

                    <div className="space-y-2.5">
                      <div className="bg-white p-3 rounded-xl border border-amber-200/80 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">Hatchback (WagonR / Tiago)</span>
                          <span className="text-[11px] text-slate-500">Ideal for 1-3 people</span>
                        </div>
                        <span className="text-sm font-bold text-amber-800">{activeHub.road.cabFareEstimate.hatchback}</span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-amber-200/80 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">Sedan (Dzire / Etios)</span>
                          <span className="text-[11px] text-slate-500">AC comfort for families</span>
                        </div>
                        <span className="text-sm font-bold text-amber-800">{activeHub.road.cabFareEstimate.sedan}</span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-amber-200/80 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">SUV (Innova / Ertiga)</span>
                          <span className="text-[11px] text-slate-500">6-7 seats with large luggage trunk</span>
                        </div>
                        <span className="text-sm font-bold text-amber-800">{activeHub.road.cabFareEstimate.suv}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-amber-200/60 text-[11px] text-amber-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{language === 'kn' ? 'ಸ್ಥಳೀಯ ಪ್ರವಾಸಿ ಟ್ಯಾಕ್ಸಿ ಯೂನಿಯನ್‌ನಿಂದ ಅಧಿಕೃತ ದರಗಳು' : 'Government verified tourism tariff standards'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. LOCAL INTER-MONUMENT TRANSIT (Badami <-> Pattadakal <-> Aihole) */}
          {(activeTransitMode === 'all' || activeTransitMode === 'local') && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-700">
                    <span className="text-2xl">🛺</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <span>{language === 'kn' ? 'ಸ್ಥಳೀಯ ಪರಂಪರೆ ಸಂಚಾರ (ಬಾದಾಮಿ - ಪಟ್ಟದಕಲ್ಲು - ಐಹೊಳೆ)' : 'Local Heritage Circuit Shuttles & Last-Mile'}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 font-bold">
                        Inter-Monument Transit
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {language === 'kn'
                        ? 'ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು, ಐಹೊಳೆ, ಬನಶಂಕರಿ ಮತ್ತು ಮಹಾಕೂಟ ನಡುವೆ ಸುಲಭವಾಗಿ ಸಂಚರಿಸಲು ಸಾರಿಗೆ ಆಯ್ಕೆಗಳು.'
                        : 'How to travel between the monuments once you arrive in Badami basecamp.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                  <span>{language === 'kn' ? 'ಆಟೋ/ಟ್ಯಾಕ್ಸಿ ಹೆಲ್ಪ್‌ಲೈನ್: 1800-425-4254' : 'Transit Helpline: 1800-425-4254'}</span>
                </div>
              </div>

              {/* Local Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {LOCAL_TRANSIT_OPTIONS.map((opt) => (
                  <div key={opt.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between hover:border-amber-400 transition-all">
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                            {opt.icon}
                          </span>
                          <div>
                            <h4 className="text-base font-bold text-slate-900">
                              {language === 'kn' ? opt.titleKn : opt.title}
                            </h4>
                            <span className="text-[11px] font-semibold text-amber-800">
                              {opt.timings}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Route coverage */}
                      <div className="my-3 py-2.5 border-y border-slate-200/80 space-y-1 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[11px] uppercase tracking-wider">{language === 'kn' ? 'ಮಾರ್ಗ ವ್ಯಾಪ್ತಿ:' : 'Route Coverage:'}</span>
                          <span className="font-semibold text-slate-800">
                            {language === 'kn' ? opt.coverageKn : opt.coverage}
                          </span>
                        </div>

                        <div className="pt-2">
                          <span className="text-slate-400 block text-[11px] uppercase tracking-wider">{language === 'kn' ? 'ಅಧಿಕೃತ ದರಗಳು:' : 'Official Fare Card:'}</span>
                          <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                            {language === 'kn' ? opt.fareCardKn : opt.fareCard}
                          </span>
                        </div>

                        <div className="pt-2">
                          <span className="text-slate-400 block text-[11px] uppercase tracking-wider">{language === 'kn' ? 'ನಿಲ್ದಾಣದ ಸ್ಥಳ:' : 'Station / Stand:'}</span>
                          <span className="text-slate-700">
                            {language === 'kn' ? opt.standLocationKn : opt.standLocation}
                          </span>
                        </div>
                      </div>

                      {/* Best for */}
                      <div className="mb-3 text-xs">
                        <span className="font-semibold text-slate-600 block mb-1">
                          {language === 'kn' ? 'ಯಾರಿಗೆ ಸೂಕ್ತ?' : 'Best For:'}
                        </span>
                        <p className="text-slate-700 bg-white p-2 rounded-lg border border-slate-200 text-[11px]">
                          {language === 'kn' ? opt.bestForKn : opt.bestFor}
                        </p>
                      </div>

                      {/* Practical tips */}
                      <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-950 space-y-1">
                        <span className="font-bold flex items-center gap-1 text-amber-900">
                          <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          {language === 'kn' ? 'ಸ್ಥಳೀಯ ಸಲಹೆಗಳು:' : 'Helpful Travel Tips:'}
                        </span>
                        {(language === 'kn' ? opt.tipsKn : opt.tips).map((tip, i) => (
                          <div key={i} className="flex items-start gap-1.5 pl-1">
                            <span className="text-amber-700 font-bold">•</span>
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM HELPFUL FAQ & CONNECTIVITY ASSISTANCE */}
        <div className="mt-10 p-6 sm:p-8 bg-amber-900/5 rounded-3xl border border-amber-900/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-extrabold text-slate-900">
              {language === 'kn' ? 'ನಿರ್ದಿಷ್ಟ ಸಾರಿಗೆ ಅಥವಾ ಟಿಕೆಟ್ ವಿವರಗಳ ಕುರಿತು ಸಂದೇಹವಿದೆಯೇ?' : 'Have specific questions about timings or connections?'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              {language === 'kn'
                ? 'ನಮ್ಮ AI ಹೆರಿಟೇಜ್ ಗೈಡ್ ಜೊತೆ ಸಂಭಾಷಿಸಿ ಅಥವಾ ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ.'
                : 'Chat with our bilingual AI guide for real-time guidance or call Karnataka Tourism 24x7 helpline.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:18004254254"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all"
            >
              <PhoneCall className="w-4 h-4 text-amber-700" />
              <span>1800-425-4254</span>
            </a>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all"
            >
              <Navigation className="w-4 h-4" />
              <span>{language === 'kn' ? 'ಲೈವ್ ದಾರಿ' : 'Live Directions'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-200" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
