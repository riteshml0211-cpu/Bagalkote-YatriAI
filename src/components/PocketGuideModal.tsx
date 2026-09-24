import React from 'react';
import { X, Printer, Download, MapPin, PhoneCall, Clock, ShieldCheck, Compass, MessageSquare } from 'lucide-react';
import { Language } from '../types';

interface PocketGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const PocketGuideModal: React.FC<PocketGuideModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-amber-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-800 via-amber-900 to-stone-900 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-600/50 border border-amber-300/40 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                {language === 'kn' ? 'ಆಫ್‌ಲೈನ್ ಪಾಕೆಟ್ ಗೈಡ್' : 'Offline Printable Pocket Guide'}
              </span>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                {language === 'kn' ? 'ಬಾದಾಮಿ-ಪಟ್ಟದಕಲ್ಲು-ಐಹೊಳೆ ಯಾತ್ರಿಕರ ಕೈಪಿಡಿ' : 'Chalukya Circuit Pocket Companion'}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'kn' ? 'ಪ್ರಿಂಟ್ / PDF' : 'Print / PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-800 printable-area">
          {/* Section 1: Timings & Friday Alert */}
          <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200">
            <h4 className="font-serif font-bold text-amber-950 flex items-center gap-1.5 text-xs sm:text-sm mb-1.5">
              <Clock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{language === 'kn' ? 'ಸ್ಮಾರಕಗಳ ಸಮಯ & ಶುಕ್ರವಾರದ ನಿಯಮ' : 'Monument Timings & Rules'}</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
              <div>
                <strong>Badami Caves 1–4:</strong> 6:00 AM – 6:00 PM (Daily)
              </div>
              <div>
                <strong>Pattadakal Complex:</strong> 6:00 AM – 6:00 PM (Daily)
              </div>
              <div>
                <strong>Aihole Durga Complex:</strong> 6:00 AM – 6:00 PM (Daily)
              </div>
              <div className="text-red-700 font-semibold">
                <strong>Badami Museum:</strong> 10:00 AM – 5:00 PM (<strong>CLOSED FRIDAY</strong>)
              </div>
            </div>
          </div>

          {/* Section 2: Distance Matrix & Standard Auto Rates */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="font-serif font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm mb-1.5">
              <Compass className="w-4 h-4 text-slate-600 shrink-0" />
              <span>{language === 'kn' ? 'ದೂರ ಮತ್ತು ಸಾಮಾನ್ಯ ಆಟೋ ದರ ಪಟ್ಟಿ' : 'Distances & Standard Auto Fares'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="font-bold">Badami → Banashankari:</span> 5 km (10m)
                <div className="text-[11px] text-emerald-700 font-semibold">Auto: ₹100 | Shared: ₹20/seat</div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="font-bold">Badami → Mahakuta:</span> 14 km (25m)
                <div className="text-[11px] text-emerald-700 font-semibold">Auto return: ₹350–₹400</div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="font-bold">Badami → Pattadakal:</span> 22 km (35m)
                <div className="text-[11px] text-emerald-700 font-semibold">Auto return: ₹550–₹650</div>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="font-bold">Full Circuit (Badami-Pattadakal-Aihole):</span> 65 km
                <div className="text-[11px] text-emerald-700 font-semibold">Full day Auto: ₹1,200 | Cab: ₹2,200</div>
              </div>
            </div>
          </div>

          {/* Section 3: Essential Kannada Phrases */}
          <div className="p-3.5 bg-amber-50/50 rounded-2xl border border-amber-200">
            <h4 className="font-serif font-bold text-amber-950 flex items-center gap-1.5 text-xs sm:text-sm mb-1.5">
              <MessageSquare className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{language === 'kn' ? 'ಯಾತ್ರಿಕರಿಗೆ ಉಪಯುಕ್ತ ಕನ್ನಡ ಮಾತುಗಳು' : '10 Essential Kannada Phrases for Visitors'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
              <div>• <strong>Namaskara</strong>: Hello / Greetings</div>
              <div>• <strong>Thumba Dhanyavada</strong>: Thank you very much</div>
              <div>• <strong>Idara bele eshtu?</strong>: How much does this cost?</div>
              <div>• <strong>Neeru ideya?</strong>: Do you have drinking water?</div>
              <div>• <strong>Badami ge hege hogodu?</strong>: How to reach Badami?</div>
              <div>• <strong>Rotti oota ideya?</strong>: Is Jolada Rotti meal available?</div>
              <div>• <strong>Svalpa dharana kadime maadi</strong>: Please discount a little</div>
              <div>• <strong>Illi nillisi</strong>: Please stop here</div>
            </div>
          </div>

          {/* Section 4: Emergency Contacts */}
          <div className="p-3.5 bg-red-50/60 rounded-2xl border border-red-200">
            <h4 className="font-serif font-bold text-red-900 flex items-center gap-1.5 text-xs sm:text-sm mb-1.5">
              <PhoneCall className="w-4 h-4 text-red-700 shrink-0" />
              <span>{language === 'kn' ? 'ತುರ್ತು ಸಹಾಯವಾಣಿಗಳು' : '24x7 Emergency Helplines'}</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-1.5 bg-white rounded border border-red-200 text-center">
                <span className="text-[10px] text-slate-500 block">Emergency</span>
                <span className="font-bold text-red-700 text-sm">112</span>
              </div>
              <div className="p-1.5 bg-white rounded border border-red-200 text-center">
                <span className="text-[10px] text-slate-500 block">Ambulance</span>
                <span className="font-bold text-red-700 text-sm">108</span>
              </div>
              <div className="p-1.5 bg-white rounded border border-red-200 text-center">
                <span className="text-[10px] text-slate-500 block">Badami Police</span>
                <span className="font-bold text-slate-800 text-[11px]">08357-220133</span>
              </div>
              <div className="p-1.5 bg-white rounded border border-red-200 text-center">
                <span className="text-[10px] text-slate-500 block">Taluk Hospital</span>
                <span className="font-bold text-slate-800 text-[11px]">08357-220023</span>
              </div>
            </div>
          </div>

          {/* Bottom Print Note */}
          <div className="text-center pt-1">
            <p className="text-[11px] text-slate-400">
              {language === 'kn'
                ? 'ಪ್ರಿಂಟ್ ಮಾಡಿದ ನಂತರ ಮಡಚಿ ಜೇಬಿನಲ್ಲಿ ಇರಿಸಿಕೊಳ್ಳಿ. ಕಣಿವೆಯೊಳಗೆ ನೆಟ್‌ವರ್ಕ್ ಇಲ್ಲದಿದ್ದರೂ ನೆರವಾಗುತ್ತದೆ.'
                : 'Tip: Fold and keep in your pocket. Extremely useful when network drops in remote canyons.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
