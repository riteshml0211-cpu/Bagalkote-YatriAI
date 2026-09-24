import React, { useState, useEffect } from 'react';
import { Sun, Sunset, Sunrise, Camera, Clock, MapPin, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Language } from '../types';

interface AgastyaSunsetTrackerProps {
  language: Language;
}

export const AgastyaSunsetTracker: React.FC<AgastyaSunsetTrackerProps> = ({ language }) => {
  const [now, setNow] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Calculate approximate sunset and golden hour times for Badami (15.9189° N, 75.6766° E)
  // Autumn / Winter sunset is approx 18:15 IST (6:15 PM)
  const currentHour = now.getHours();
  const currentMin = now.getMinutes();
  const currentMinutesTotal = currentHour * 60 + currentMin;

  const sunriseMinutes = 6 * 60 + 15; // 6:15 AM
  const goldenHourStart = 17 * 60 + 20; // 5:20 PM
  const sunsetMinutes = 18 * 60 + 18; // 6:18 PM
  const duskEndMinutes = 18 * 60 + 45; // 6:45 PM

  // Determine lighting phase
  let phase: 'sunrise' | 'morning' | 'midday' | 'golden_hour' | 'twilight' | 'night' = 'midday';
  let countdownText = '';

  if (currentMinutesTotal >= sunriseMinutes - 30 && currentMinutesTotal < sunriseMinutes + 60) {
    phase = 'sunrise';
    countdownText = language === 'kn' ? 'ಮುಂಜಾನೆಯ ಕೋಮಲ ಕಿರಣಗಳು ಸಕ್ರಿಯವಾಗಿವೆ' : 'Morning Golden Glow Active';
  } else if (currentMinutesTotal >= sunriseMinutes + 60 && currentMinutesTotal < 11 * 60) {
    phase = 'morning';
    const diffMins = goldenHourStart - currentMinutesTotal;
    const hrs = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    countdownText = language === 'kn' ? `ಸಂಜೆ ಗೋಲ್ಡನ್ ಅವರ್ ${hrs} ಗಂಟೆ ${mins} ನಿಮಿಷದಲ್ಲಿ` : `Golden Hour in ${hrs}h ${mins}m`;
  } else if (currentMinutesTotal >= 11 * 60 && currentMinutesTotal < goldenHourStart) {
    phase = 'midday';
    const diffMins = goldenHourStart - currentMinutesTotal;
    const hrs = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    countdownText = language === 'kn' ? `ಅಗಸ್ತ್ಯ ಸೂರ್ಯಾಸ್ತ ಗೋಲ್ಡನ್ ಅವರ್ ${hrs} ಗಂ ${mins} ನಿಮಿಷದಲ್ಲಿ` : `Sunset Golden Hour in ${hrs}h ${mins}m`;
  } else if (currentMinutesTotal >= goldenHourStart && currentMinutesTotal <= sunsetMinutes) {
    phase = 'golden_hour';
    const remainingMins = sunsetMinutes - currentMinutesTotal;
    countdownText = language === 'kn' ? `✨ ಗೋಲ್ಡನ್ ಅವರ್ ಸಕ್ರಿಯವಾಗಿದೆ! (${remainingMins} ನಿಮಿಷ ಬಾಕಿ)` : `✨ Golden Hour Active Now! (${remainingMins}m until sunset)`;
  } else if (currentMinutesTotal > sunsetMinutes && currentMinutesTotal <= duskEndMinutes) {
    phase = 'twilight';
    countdownText = language === 'kn' ? 'ನೀಲಿ ಸಂಜೆ ಬೆಳಕು (ಬ್ಲೂ ಅವರ್)' : 'Twilight / Blue Hour Reflexes';
  } else {
    phase = 'night';
    countdownText = language === 'kn' ? 'ನಾಳೆಯ ಸೂರ್ಯೋದಯ: ಬೆಳಿಗ್ಗೆ ೬:೧೫' : 'Tomorrow\'s Sunrise: 6:15 AM';
  }

  const recommendations = [
    {
      slot: language === 'kn' ? 'ಸೂರ್ಯೋದಯ (೬:೧೫ - ೮:೩೦)' : 'Morning Glow (6:15 - 8:30 AM)',
      spot: language === 'kn' ? 'ಗುಹೆ ೧ ನಟರಾಜ & ಮಲೆಗಿತ್ತಿ ಶಿವಾಲಯ' : 'Cave 1 Nataraja & Malegitti Shivalaya',
      cue: language === 'kn'
        ? 'ಪೂರ್ವ ಮುಖದ ಕೆಂಪು ಮರಳುಶಿಲೆಗೆ ಮೊದಲ ಸೂರ್ಯನ ಕಿರಣಗಳು ಬೀಳುತ್ತವೆ; ೧೮-ಭುಜದ ನಟರಾಜನ ಆಭರಣಗಳು ಹೊಳೆಯುತ್ತವೆ.'
        : 'First light strikes east-facing sandstone cliffs, illuminating the 18-armed Nataraja sculpture.',
      icon: Sunrise,
    },
    {
      slot: language === 'kn' ? 'ಮಧ್ಯಾಹ್ನ (೧೧:೩೦ - ೩:೩೦)' : 'Midday Soft-Light (11:30 AM - 3:30 PM)',
      spot: language === 'kn' ? 'ಗುಹೆ ೩ ಮಹಾವಿಷ್ಣು ಮಂಟಪ & ವಸ್ತುಸಂಗ್ರಹಾಲಯ' : 'Cave 3 Interior Sanctum & Museum',
      cue: language === 'kn'
        ? 'ಹೊರಗಿನ ಬಿಸಿಲಿನಿಂದ ತಂಪಾದ ಗುಹೆಯ ಒಳಗಿನ ಕೆತ್ತನೆಗಳು ಮತ್ತು ಮ್ಯೂಸಿಯಂನ ಅದ್ಭುತ ಚಾಲುಕ್ಯ ಪ್ರತಿಮೆಗಳು.'
        : 'Deep interior shade with natural cool breeze; perfect ambient light inside 65 ft deep rock halls.',
      icon: Sun,
    },
    {
      slot: language === 'kn' ? 'ಸಂಜೆಯ ಗೋಲ್ಡನ್ ಅವರ್ (೫:೧೫ - ೬:೨೦)' : 'Sunset Golden Hour (5:15 - 6:20 PM)',
      spot: language === 'kn' ? 'ಅಗಸ್ತ್ಯ ತೀರ್ಥದ ಭೂತನಾಥ ದೇವಾಲಯ ಸಂಕೀರ್ಣ' : 'Agastya Lake & Bhootanatha Temple',
      cue: language === 'kn'
        ? 'ವಿಶ್ವವಿಖ್ಯಾತ ಸುವರ್ಣ ಪ್ರತಿಬಿಂಬ! ಉತ್ತರ ಬೆಟ್ಟದ ತಾಮ್ರವರ್ಣದ ಕಣಿವೆ ಮತ್ತು ನೀರಿನಲ್ಲಿ ಹೊಳೆಯುವ ದೇವಾಲಯದ ಶಿಖರ.'
        : 'World-famous photo frame! The northern canyon turns blazing copper-gold reflected in calm holy waters.',
      icon: Sunset,
      isHighlight: true,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-stone-900 rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-white shadow-lg border border-amber-600/40">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left Status & Countdown */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-300">
            {phase === 'sunrise' ? (
              <Sunrise className="w-5 h-5 text-amber-300 animate-pulse" />
            ) : phase === 'golden_hour' ? (
              <Sunset className="w-5 h-5 text-amber-400 animate-bounce" />
            ) : (
              <Camera className="w-5 h-5 text-amber-300" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-400/30">
                {language === 'kn' ? 'ಬಾದಾಮಿ ಸನ್ಸೆಟ್ & ಲೈಟಿಂಗ್ ಟ್ರ್ಯಾಕರ್' : 'Agastya Sun & Golden Hour Tracker'}
              </span>
              <span className="text-[11px] text-amber-200 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>6:18 PM Sunset</span>
              </span>
            </div>
            <h4 className="font-serif font-bold text-sm sm:text-base text-white mt-0.5">
              {countdownText}
            </h4>
          </div>
        </div>

        {/* Right Toggle Tips button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-semibold transition-all cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-amber-300" />
            <span>{isExpanded ? (language === 'kn' ? 'ಸಲಹೆ ಮರೆಮಾಡಿ' : 'Hide Vantage Spots') : (language === 'kn' ? 'ಉತ್ತಮ ಫೋಟೋ ಜಾಗಗಳು' : 'Best Photo Vantage Spots')}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Photography Recommendations */}
      {isExpanded && (
        <div className="mt-4 pt-3.5 border-t border-amber-800/60 grid grid-cols-1 md:grid-cols-3 gap-3 animate-in fade-in duration-200">
          {recommendations.map((rec, i) => {
            const Icon = rec.icon;
            return (
              <div
                key={i}
                className={`p-3 rounded-xl border text-xs ${
                  rec.isHighlight
                    ? 'bg-amber-500/15 border-amber-400/50 shadow-inner'
                    : 'bg-black/20 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{rec.slot}</span>
                  </span>
                  {rec.isHighlight && (
                    <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.2 rounded">
                      TOP SPOT
                    </span>
                  )}
                </div>
                <div className="font-semibold text-white text-xs mb-1">
                  📍 {rec.spot}
                </div>
                <p className="text-amber-100/70 text-[11px] leading-relaxed">
                  {rec.cue}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
