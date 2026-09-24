import React, { useState } from 'react';
import { Award, Printer, Share2, Download, X, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface HeritageCertificateModalProps {
  language: Language;
  onClose: () => void;
  stampedCount: number;
  totalPossibleStamps: number;
}

export const HeritageCertificateModal: React.FC<HeritageCertificateModalProps> = ({
  language,
  onClose,
  stampedCount,
  totalPossibleStamps,
}) => {
  const [explorerName, setExplorerName] = useState<string>('Heritage Voyager');
  const [copied, setCopied] = useState<boolean>(false);

  // Determine honorific title based on stamp count
  const getExplorerRank = (count: number) => {
    if (count >= 10) {
      return {
        titleEn: 'Grand Sovereign of Vatapi',
        titleKn: 'ವಾತಾಪಿ ಚಾಲುಕ್ಯ ಪರಂಪರೆ ರತ್ನ',
        level: 'Supreme Rank (Master Explorer)',
      };
    }
    if (count >= 7) {
      return {
        titleEn: 'Chalukyan Temple Master',
        titleKn: 'ಚಾಲುಕ್ಯ ದೇವಾಲಯ ಶಿಲ್ಪ ರಸಜ್ಞ',
        level: 'Tier III Rank',
      };
    }
    if (count >= 4) {
      return {
        titleEn: 'Malaprabha Valley Wanderer',
        titleKn: 'ಮಲಪ್ರಭಾ ಕಣಿವೆ ಯಾತ್ರಿಕ',
        level: 'Tier II Rank',
      };
    }
    return {
      titleEn: 'Vatapi Heritage Novice',
      titleKn: 'ವಾತಾಪಿ ಪರಂಪರೆ ಆರಂಭಿಕ ಶೋಧಕ',
      level: 'Tier I Rank',
    };
  };

  const rank = getExplorerRank(stampedCount);
  const certId = `CHALUKYA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const issueDate = new Date().toLocaleDateString(language === 'kn' ? 'kn-IN' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const text = `🏆 I earned the official "${rank.titleEn}" (${stampedCount}/${totalPossibleStamps} heritage sites stamped) on Bagalkote YatriAI! Explore the cradle of Indian architecture: ${window.location.origin}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-amber-300 relative p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Top Header Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <h3 className="font-serif font-bold text-lg text-slate-900">
              {language === 'kn' ? 'ಅಧಿಕೃತ ಚಾಲುಕ್ಯ ಪರಂಪರೆ ಪ್ರಶಸ್ತಿ ಪತ್ರ' : 'Official Chalukya Heritage Certificate'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customization Input for Traveler Name */}
        <div className="mt-4 mb-6 bg-amber-50/70 p-3 sm:p-4 rounded-2xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1">
            <label className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-1">
              {language === 'kn' ? 'ಪ್ರಶಸ್ತಿ ಪತ್ರದಲ್ಲಿ ನಮೂದಿಸಬೇಕಾದ ನಿಮ್ಮ ಹೆಸರು:' : 'Enter Your Name on Certificate:'}
            </label>
            <input
              type="text"
              value={explorerName}
              onChange={(e) => setExplorerName(e.target.value)}
              placeholder="e.g. Ananya Sharma"
              className="w-full bg-white px-3 py-1.5 rounded-xl border border-amber-300 text-sm font-bold text-slate-900 focus:outline-amber-600"
            />
          </div>
          <div className="text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              {language === 'kn' ? 'ಮುದ್ರೆಯ ಸಂಖ್ಯೆ' : 'Sites Visited'}
            </span>
            <span className="font-serif text-lg font-bold text-amber-800">
              {stampedCount} / {totalPossibleStamps}
            </span>
          </div>
        </div>

        {/* ROYAL PARCHMENT CERTIFICATE (Printable) */}
        <div
          id="royal-certificate"
          className="relative bg-[#FCF8EE] rounded-2xl border-4 border-double border-amber-800/60 p-6 sm:p-10 shadow-inner overflow-hidden text-center select-none"
        >
          {/* Decorative Corner Filigree */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-700" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-700" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-700" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-700" />

          {/* Royal Chalukya Lion Crest */}
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-md border-2 border-amber-300">
              <span className="text-2xl">🦁</span>
            </div>
          </div>

          <span className="text-[11px] font-bold tracking-widest text-amber-900 uppercase block font-serif">
            {language === 'kn' ? 'ಬಾದಾಮಿ ಚಾಲುಕ್ಯ ಸಾಮ್ರಾಜ್ಯ • ವಾತಾಪಿ ಪರಂಪರೆ' : 'Badami Chalukya Empire • Heritage Registry'}
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-950 mt-1 tracking-tight">
            {language === 'kn' ? 'ಪರಂಪರೆ ಯಾತ್ರಿಕ ಗೌರವ ಪ್ರಶಸ್ತಿ' : 'Certificate of Heritage Distinction'}
          </h2>

          <p className="text-xs italic text-stone-600 mt-2 max-w-md mx-auto">
            {language === 'kn'
              ? 'ವಾತಾಪಿ, ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆಯ ಮರಳುಗಲ್ಲಿನ ಶಿಲಾ ವಾಸ್ತುಶಿಲ್ಪವನ್ನು ನಿಷ್ಠೆಯಿಂದ ಶೋಧಿಸಿದ ಗೌರವಾರ್ಥವಾಗಿ ಪ್ರದಾನ ಮಾಡಲಾಗಿದೆ.'
              : 'Presented in recognition of distinguished exploration across the sacred Malaprabha river sanctuaries and rock-cut cave temples.'}
          </p>

          {/* Recipient Name in Regal Typography */}
          <div className="my-5 py-2 border-b-2 border-amber-700/30 max-w-md mx-auto">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-900 tracking-wide underline decoration-amber-500/50 underline-offset-8">
              {explorerName || 'Heritage Voyager'}
            </span>
          </div>

          {/* Honorific Title Awarded */}
          <div className="inline-block bg-amber-100/80 px-4 py-1.5 rounded-full border border-amber-400 mb-4">
            <span className="text-xs font-bold text-amber-950 font-serif">
              Rank Conferred: {language === 'kn' ? rank.titleKn : rank.titleEn}
            </span>
          </div>

          {/* Verification Metadata Footer */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-amber-700/20 text-stone-600 text-[10px] font-mono mt-2">
            <div>
              <span className="block text-slate-400">CERTIFICATE NO.</span>
              <strong className="text-stone-900">{certId}</strong>
            </div>
            <div>
              <span className="block text-slate-400">SEAL VERIFICATION</span>
              <strong className="text-emerald-700">PULAKESHIN II SEAL</strong>
            </div>
            <div>
              <span className="block text-slate-400">DATE OF ISSUE</span>
              <strong className="text-stone-900">{issueDate}</strong>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'kn' ? 'ಪ್ರಿಂಟ್ / ಪಿಡಿಎಫ್ ಉಳಿಸಿ' : 'Print / Save PDF'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm flex items-center gap-2 border border-slate-200 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? (language === 'kn' ? 'ಕಾಪಿ ಮಾಡಲಾಗಿದೆ!' : 'Copied!') : (language === 'kn' ? 'ಹಂಚಿಕೊಳ್ಳಿ' : 'Share Rank')}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-semibold cursor-pointer"
          >
            {language === 'kn' ? 'ಮುಚ್ಚಿ' : 'Dismiss'}
          </button>
        </div>
      </div>
    </div>
  );
};
