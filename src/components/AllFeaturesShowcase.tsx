import React, { useState } from 'react';
import {
  Train,
  Landmark,
  MapPin,
  Camera,
  Navigation,
  ShoppingBag,
  Utensils,
  Award,
  Volume2,
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { Language } from '../types';

interface AllFeaturesShowcaseProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
  onSelectDepartureCity: (city: string) => void;
  onOpenChat: () => void;
  onPlayAudioGuide: () => void;
}

export const AllFeaturesShowcase: React.FC<AllFeaturesShowcaseProps> = ({
  language,
  onNavigate,
  onSelectDepartureCity,
  onOpenChat,
  onPlayAudioGuide,
}) => {
  const [cityInput, setCityInput] = useState('');

  const isKn = language === 'kn';

  const quickCities = [
    { id: 'bengaluru', name: isKn ? 'ಬೆಂಗಳೂರು' : 'Bengaluru', query: 'Bengaluru' },
    { id: 'hyderabad', name: isKn ? 'ಹೈದರಾಬಾದ್' : 'Hyderabad', query: 'Hyderabad' },
    { id: 'mumbai', name: isKn ? 'ಮುಂಬೈ' : 'Mumbai', query: 'Mumbai' },
    { id: 'pune', name: isKn ? 'ಪುಣೆ' : 'Pune', query: 'Pune' },
    { id: 'goa', name: isKn ? 'ಗೋವಾ' : 'Goa', query: 'Goa' },
    { id: 'hubballi', name: isKn ? 'ಹುಬ್ಬಳ್ಳಿ' : 'Hubballi', query: 'Hubballi' },
    { id: 'belagavi', name: isKn ? 'ಬೆಳಗಾವಿ' : 'Belagavi', query: 'Belagavi' },
    { id: 'vijayapura', name: isKn ? 'ವಿಜಯಪುರ' : 'Vijayapura', query: 'Vijayapura' },
  ];

  const handleTransitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      onSelectDepartureCity(cityInput.trim());
      onNavigate('transportation');
    } else {
      onNavigate('transportation');
    }
  };

  const handleCityChipClick = (city: string) => {
    setCityInput(city);
    onSelectDepartureCity(city);
    onNavigate('transportation');
  };

  const features = [
    {
      id: 'transportation',
      title: isKn ? 'ಸಾರಿಗೆ & ತಲುಪುವ ಮಾರ್ಗಗಳು' : 'Transit & How to Reach',
      subtitle: isKn
        ? 'ನಿಮ್ಮ ಊರನ್ನು ನಮೂದಿಸಿ: ರೈಲುಗಳು, ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಬಸ್‌ಗಳು, ಹೆದ್ದಾರಿಗಳು & ಆಟೋ ದರಗಳು'
        : 'Enter departure city to see verified trains, KSRTC buses, driving routes, cab fares & auto tariffs',
      icon: Train,
      badge: isKn ? 'ಹೊಸ ವೈಶಿಷ್ಟ್ಯ' : 'Instant City Search',
      badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-300',
      actionLabel: isKn ? 'ಸಾರಿಗೆ ಹುಡುಕಿ' : 'Find Transport',
      category: isKn ? 'ಪ್ರಯಾಣ ಸೌಲಭ್ಯ' : 'Travel System',
      accentColor: 'from-amber-500 to-orange-600',
      onClick: () => onNavigate('transportation'),
    },
    {
      id: 'destinations',
      title: isKn ? 'ಪುರಾತನ ಗುಹಾ ದೇವಾಲಯಗಳು' : 'Monuments & Cave Temples',
      subtitle: isKn
        ? 'ಬಾದಾಮಿ ಗುಹೆಗಳು, ಯುನೆಸ್ಕೋ ಪಟ್ಟದಕಲ್ಲು, ಐಹೊಳೆ, ಮಹಾಕೂಟ - ೧೫೦+ ದೇವಾಲಯಗಳ ವಿವರ & ಟಿಕೆಟ್'
        : 'Badami Rock-cut Caves, UNESCO Pattadakal, Aihole cradle, Mahakuta springs with timings & entry fees',
      icon: Landmark,
      badge: isKn ? '೧೫೦+ ತಾಣಗಳು' : '150+ Temples',
      badgeColor: 'bg-amber-500/10 text-amber-800 border-amber-300',
      actionLabel: isKn ? 'ಸ್ಮಾರಕಗಳನ್ನು ನೋಡಿ' : 'Explore Monuments',
      category: isKn ? 'ಪರಂಪರೆ' : 'Heritage',
      accentColor: 'from-amber-600 to-amber-700',
      onClick: () => onNavigate('destinations'),
    },
    {
      id: 'circuit-map',
      title: isKn ? 'ಲೈವ್ ಸರ್ಕ್ಯೂಟ್ ಮ್ಯಾಪ್ & GPS' : 'Circuit Map & Driving Routes',
      subtitle: isKn
        ? 'ತಾಣಗಳ ನಡುವಿನ ಕಿಲೋಮೀಟರ್ ಅಂತರ, ಪ್ರಯಾಣ ಸಮಯ, ಪೆಟ್ರೋಲ್ ಬಂಕ್‌ಗಳು ಮತ್ತು ಶಿಫಾರಸು ಮಾರ್ಗಗಳು'
        : 'Visual route paths, inter-monument km distances, driving times, petrol pumps & scenic heritage loops',
      icon: MapPin,
      badge: isKn ? 'GPS ದಾರಿ' : 'GPS Navigation',
      badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-300',
      actionLabel: isKn ? 'ನಕ್ಷೆ ವೀಕ್ಷಿಸಿ' : 'Open Circuit Map',
      category: isKn ? 'ನಕ್ಷೆ & ದಾರಿ' : 'Navigation',
      accentColor: 'from-blue-600 to-indigo-700',
      onClick: () => onNavigate('circuit-map'),
    },
    {
      id: 'scanner',
      title: isKn ? 'AI ಸ್ಮಾರಕ ವಿಷನ್ ಸ್ಕ್ಯಾನರ್' : 'AI Monument Visual Scanner',
      subtitle: isKn
        ? 'ಶಿಲ್ಪಕಲೆ ಅಥವಾ ದೇವಾಲಯದ ಫೋಟೋ ತೆಗೆಯಿರಿ - ಜೆಮಿನಿ AI ವಾಸ್ತುಶಿಲ್ಪ, ರಾಜವಂಶ ಮತ್ತು ಇತಿಹಾಸ ವಿವರಿಸುತ್ತದೆ'
        : 'Snap or upload photo of any temple carving or pillar for instant Gemini AI architectural identification',
      icon: Camera,
      badge: isKn ? 'ಜೆಮಿನಿ AI ವಿಷನ್' : 'Gemini AI Vision',
      badgeColor: 'bg-purple-500/10 text-purple-700 border-purple-300',
      actionLabel: isKn ? 'ಫೋಟೋ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : 'Launch Scanner',
      category: isKn ? 'AI ತಂತ್ರಜ್ಞಾನ' : 'AI Vision',
      accentColor: 'from-purple-600 to-pink-600',
      onClick: () => onNavigate('scanner'),
    },
    {
      id: 'planner',
      title: isKn ? 'ಸ್ಮಾರ್ಟ್ ಪ್ರವಾಸ ಯೋಜನೆ' : 'Smart Trip Itinerary Planner',
      subtitle: isKn
        ? '೧ ದಿನದ ಎಕ್ಸ್‌ಪ್ರೆಸ್, ೨ ದಿನದ ಕ್ಲಾಸಿಕ್, ೩ ದಿನದ ಸಂಪೂರ್ಣ ಸರ್ಕ್ಯೂಟ್ - ಸಮಯ ಮತ್ತು ಊಟದೊಂದಿಗೆ ವೇಳಾಪಟ್ಟಿ'
        : 'Personalized 1-Day Express, 2-Day Classic, and 3-Day Grand Bagalkote itineraries with schedules',
      icon: Navigation,
      badge: isKn ? 'ವೇಳಾಪಟ್ಟಿ' : 'Custom Itineraries',
      badgeColor: 'bg-rose-500/10 text-rose-700 border-rose-300',
      actionLabel: isKn ? 'ಯೋಜನೆ ತಯಾರಿಸಿ' : 'Plan Itinerary',
      category: isKn ? 'ಪ್ರವಾಸ ಯೋಜನೆ' : 'Itinerary',
      accentColor: 'from-rose-600 to-orange-600',
      onClick: () => onNavigate('planner'),
    },
    {
      id: 'weavers',
      title: isKn ? 'ಇಳಕಲ್ ನೇಕಾರರ ತಾಣ & ಜಿ.ಐ. ಸೀರೆ' : 'Ilkal Weavers & GI Silk Hub',
      subtitle: isKn
        ? '೮ನೇ ಶತಮಾನದ ಟೋಪೆತೇಂಚಿ ಕಲೆ, ನೇರ ನೇಕಾರ ಸಹಕಾರ ಸಂಘಗಳ ಸಂಪರ್ಕ ಮತ್ತು ಅಸಲಿ ಜಿ.ಐ. ಸೀರೆ ಪರೀಕ್ಷಕ'
        : 'Direct contacts for artisan weaver cooperatives, Topetenchi border history & saree authenticity validator',
      icon: ShoppingBag,
      badge: isKn ? 'ಜಿ.ಐ. ಟ್ಯಾಗ್ #೪೩' : 'GI Tag #43 Sarees',
      badgeColor: 'bg-amber-500/10 text-amber-800 border-amber-300',
      actionLabel: isKn ? 'ನೇಕಾರರ ಮಾಹಿತಿ' : 'Explore Weavers',
      category: isKn ? 'ಕೈಮಗ್ಗ' : 'Handlooms',
      accentColor: 'from-amber-700 to-amber-900',
      onClick: () => onNavigate('weavers'),
    },
    {
      id: 'cuisine',
      title: isKn ? 'ಉತ್ತರ ಕರ್ನಾಟಕ ಖಾನಾವಳಿ ಊಟ' : 'North Karnataka Heritage Food',
      subtitle: isKn
        ? 'ಬಿಸಿ ಜೋಳದ ರೊಟ್ಟಿ, ಎಣ್ಣೆಗಾಯಿ ಬದನೆಕಾಯಿ, ಶೇಂಗಾ ಹೋಳಿಗೆ, ಮೊಸರು ಮತ್ತು ಪ್ರಸಿದ್ಧ ಖಾನಾವಳಿಗಳು'
        : 'Authentic Jolada rotti meals, stuffed Yennegai brinjal, Shenga holige, Badami curd & local Khanavalis',
      icon: Utensils,
      badge: isKn ? 'ಸ್ಥಳೀಯ ಸ್ವಾದ' : 'Authentic Cuisine',
      badgeColor: 'bg-emerald-500/10 text-emerald-800 border-emerald-300',
      actionLabel: isKn ? 'ಊಟದ ವಿವರ' : 'Discover Food Trail',
      category: isKn ? 'ಸ್ಥಳೀಯ ಆಹಾರ' : 'Culinary Trail',
      accentColor: 'from-emerald-600 to-teal-700',
      onClick: () => onNavigate('cuisine'),
    },
    {
      id: 'traveler-toolkit',
      title: isKn ? 'ಯಾತ್ರಿಕರ ಟೂಲ್ಕಿಟ್ & ಪಾಸ್‌ಪೋರ್ಟ್' : 'Traveler Toolkit & Digital Passport',
      subtitle: isKn
        ? 'ಕನ್ನಡ ಆಡಿಯೋ ಮಾತುಗಳು, ಡಿಜಿಟಲ್ ಸ್ಮಾರಕ ಮುದ್ರೆಗಳು, ಗೋಲ್ಡನ್ ಅವರ್ ಛಾಯಾಗ್ರಹಣ & ತುರ್ತು SOS'
        : 'Spoken Kannada audio phrasebook, monument stamp collection, golden hour sun tracker & emergency SOS',
      icon: Award,
      badge: isKn ? 'ಆಡಿಯೋ & ಮುದ್ರೆ' : 'Audio & Stamps',
      badgeColor: 'bg-indigo-500/10 text-indigo-700 border-indigo-300',
      actionLabel: isKn ? 'ಟೂಲ್ಕಿಟ್ ತೆರೆಯಿರಿ' : 'Open Toolkit',
      category: isKn ? 'ಯಾತ್ರಿಕರ ಸಾಧನಗಳು' : 'Travel Tools',
      accentColor: 'from-indigo-600 to-cyan-600',
      onClick: () => onNavigate('traveler-toolkit'),
    },
    {
      id: 'audio-guide',
      title: isKn ? 'ದ್ವಿಭಾಷಾ ಆಡಿಯೋ ಗೈಡ್' : 'Bilingual Audio Story Tours',
      subtitle: isKn
        ? 'ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕನ್ನಡದಲ್ಲಿ ಐತಿಹಾಸಿಕ ಧ್ವನಿ ವಿವರಣೆ ಮತ್ತು ಗುಹಾ ದೇವಾಲಯಗಳ ಕಥೆಗಳು'
        : 'Rich historical voice narratives in English & Kannada covering architecture, legends & history',
      icon: Volume2,
      badge: isKn ? 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ' : 'Audio Guide',
      badgeColor: 'bg-amber-500/10 text-amber-800 border-amber-300',
      actionLabel: isKn ? 'ಆಡಿಯೋ ಪ್ಲೇ ಮಾಡಿ' : 'Start Audio Tour',
      category: isKn ? 'ಆಡಿಯೋ' : 'Audio Narration',
      accentColor: 'from-amber-500 to-rose-600',
      onClick: onPlayAudioGuide,
    },
    {
      id: 'ai-assistant',
      title: isKn ? 'ಚಾಲುಕ್ಯ AI ಸಹಾಯಕ' : '24/7 Chalukya AI Assistant',
      subtitle: isKn
        ? 'ಪ್ರವೇಶ ದರ, ವಾಸ್ತುಶಿಲ್ಪ, ಫೋಟೋಗ್ರಫಿ ಜಾಗಗಳು ಮತ್ತು ಇತಿಹಾಸದ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ'
        : 'Ask real-time questions in English or Kannada about tickets, hidden gems, guides & history',
      icon: Sparkles,
      badge: isKn ? 'ಸಹಾಯಕ' : 'Interactive AI',
      badgeColor: 'bg-yellow-500/10 text-amber-800 border-yellow-300',
      actionLabel: isKn ? 'AI ಜೊತೆ ಮಾತನಾಡಿ' : 'Ask AI Assistant',
      category: isKn ? 'ಸ್ಮಾರ್ಟ್ ಅಸಿಸ್ಟೆಂಟ್' : 'AI Assistant',
      accentColor: 'from-yellow-600 to-amber-700',
      onClick: onOpenChat,
    },
  ];

  return (
    <section id="all-features" className="relative z-20 py-8 sm:py-12 bg-linear-to-b from-[#FAF7F2] via-white to-[#FAF7F2] border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4 text-amber-700" />
            <span>{isKn ? 'ವೆಬ್‌ಸೈಟ್‌ನ ಎಲ್ಲಾ ಸೌಲಭ್ಯಗಳು' : 'All Portal Features & Services'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            {isKn ? 'ನಿಮ್ಮ ಪ್ರವಾಸಕ್ಕೆ ಬೇಕಾದ ಎಲ್ಲವೂ ಒಂದೇ ಕಡೆ' : 'Everything You Need For Your Chalukya Journey'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            {isKn
              ? 'ಸಾರಿಗೆ ವ್ಯವಸ್ಥೆಯಿಂದ ಹಿಡಿದು ಗುಹಾ ದೇವಾಲಯಗಳು, ಮಾರ್ಗ ನಕ್ಷೆ, AI ಸ್ಕ್ಯಾನರ್, ಇಳಕಲ್ ಸೀರೆಗಳು ಮತ್ತು ಊಟದವರೆಗೆ ಎಲ್ಲಾ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಇಲ್ಲಿ ವೀಕ್ಷಿಸಿ.'
              : 'Browse all available features directly on the portal — departure transit finder, 150+ temples, GPS routes, AI vision scanner, weavers hub, and authentic cuisine.'}
          </p>
        </div>

        {/* Feature 1: Prominent Interactive Departure Transit Finder Box */}
        <div className="mb-10 p-5 sm:p-7 rounded-2xl bg-linear-to-br from-amber-900 via-amber-950 to-stone-900 text-white shadow-xl border border-amber-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/40 mb-1.5">
                  <Train className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isKn ? 'ಸಾರಿಗೆ ಹುಡುಕಾಟ' : 'Transit & Route Finder'}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {isKn ? 'ನೀವು ಯಾವ ಊರಿನಿಂದ ಹೊರಡುತ್ತಿದ್ದೀರಿ?' : 'Where Are You Leaving From?'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {isKn
                    ? 'ನಿಮ್ಮ ಊರನ್ನು ನಮೂದಿಸಿ - ಬಾದಾಮಿಗೆ ತಲುಪಲು ಲಭ್ಯವಿರುವ ರೈಲುಗಳು, ಬಸ್‌ಗಳು, ಹೆದ್ದಾರಿಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಆಟೋ ದರಗಳನ್ನು ತಕ್ಷಣ ವೀಕ್ಷಿಸಿ.'
                    : 'Enter your departure city or town to see all possible trains, KSRTC buses, driving routes, flight connections & local Badami auto fares.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('transportation')}
                className="self-start md:self-auto shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-semibold transition-all cursor-pointer"
              >
                <span>{isKn ? 'ಸಂಪೂರ್ಣ ಸಾರಿಗೆ ಪುಟ' : 'Open Transit Hub'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Departure City Search Form */}
            <form onSubmit={handleTransitSubmit} className="max-w-2xl mb-4">
              <div className="relative flex items-center shadow-lg rounded-xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 p-1 focus-within:border-amber-400 focus-within:bg-white/15 transition-all">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 ml-3 shrink-0" />
                <input
                  type="text"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  placeholder={
                    isKn
                      ? 'ನಿಮ್ಮ ಹೊರಡುವ ಊರನ್ನು ನಮೂದಿಸಿ (ಉದಾ: ಬೆಂಗಳೂರು, ಹೈದರಾಬಾದ್, ಮುಂಬೈ, ಹುಬ್ಬಳ್ಳಿ, ಪುಣೆ...)'
                      : 'Enter departure city (e.g. Bengaluru, Hyderabad, Mumbai, Hubballi, Pune, Goa...)'
                  }
                  className="w-full min-w-0 px-3 py-2.5 bg-transparent text-white placeholder-slate-300 text-xs sm:text-sm focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="shrink-0 px-4 sm:px-6 py-2.5 rounded-lg bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <Train className="w-4 h-4" />
                  <span>{isKn ? 'ಸಾರಿಗೆ ನೋಡಿ' : 'Show All Transport'}</span>
                </button>
              </div>
            </form>

            {/* Preset City Chips */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-[11px] text-slate-300 font-medium">
                {isKn ? 'ಪ್ರಮುಖ ಊರುಗಳು:' : 'Popular Starting Points:'}
              </span>
              {quickCities.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => handleCityChipClick(city.query)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-amber-500/25 hover:border-amber-400/50 border border-white/15 text-slate-200 hover:text-white text-[11px] sm:text-xs font-medium transition-all cursor-pointer"
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Cards Grid (10 Features) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                onClick={feature.onClick}
                className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white border border-amber-900/10 hover:border-amber-400/60 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                {/* Accent top bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${feature.accentColor} opacity-70 group-hover:opacity-100 transition-opacity`}
                />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl bg-linear-to-br ${feature.accentColor} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${feature.badgeColor}`}
                    >
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {feature.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700 group-hover:text-amber-900">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{feature.category}</span>
                  </span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{feature.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
