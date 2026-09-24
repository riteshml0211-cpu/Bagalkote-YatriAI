import React from 'react';
import { X, Ticket, ExternalLink, ShieldCheck, AlertCircle, Clock, CheckCircle2, QrCode } from 'lucide-react';
import { Language } from '../types';

interface AsiTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AsiTicketsModal: React.FC<AsiTicketsModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-amber-300 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-linear-to-r from-amber-700 via-amber-800 to-amber-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-600/50 border border-amber-300/40 flex items-center justify-center shrink-0">
              <Ticket className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                {language === 'kn' ? 'ಭಾರತೀಯ ಪುರಾತತ್ವ ಸರ್ವೇಕ್ಷಣಾ ಇಲಾಖೆ' : 'Archaeological Survey of India (ASI)'}
              </span>
              <h3 className="font-serif font-bold text-lg text-white">
                {language === 'kn' ? 'ಅಧಿಕೃತ ಇ-ಟಿಕೆಟ್ ಮಾಹಿತಿ & ನೇರ ಲಿಂಕ್' : 'Official ASI E-Ticket Portal & Pricing'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Official Price Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-900 block">
                {language === 'kn' ? 'ಭಾರತೀಯ ನಾಗರಿಕರು' : 'Indian Citizens'}
              </span>
              <div className="text-xl font-bold text-amber-950 my-0.5">₹25</div>
              <span className="text-[10px] text-emerald-700 font-semibold block">
                {language === 'kn' ? 'ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ₹೫ ರಿಯಾಯಿತಿ' : 'Online discount (₹30 counter)'}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-700 block">
                {language === 'kn' ? 'ವಿದೇಶಿ ಪ್ರವಾಸಿಗರು' : 'Foreign Tourists'}
              </span>
              <div className="text-xl font-bold text-slate-900 my-0.5">₹300</div>
              <span className="text-[10px] text-slate-500 font-semibold block">
                {language === 'kn' ? 'ಎಲ್ಲಾ ಗುಹೆಗಳು & ಸಂಕೀರ್ಣ' : 'Access to all caves & complexes'}
              </span>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-900 block">
                {language === 'kn' ? '೧೫ ವರ್ಷದೊಳಗಿನ ಮಕ್ಕಳಿಗೆ' : 'Children (<15 yrs)'}
              </span>
              <div className="text-xl font-bold text-emerald-800 my-0.5">FREE</div>
              <span className="text-[10px] text-emerald-700 font-semibold block">
                {language === 'kn' ? 'ಉಚಿತ ಪ್ರವೇಶ' : 'No ticket required'}
              </span>
            </div>
          </div>

          {/* Key Pro Tips */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 space-y-2 text-xs">
            <div className="font-bold text-amber-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{language === 'kn' ? 'ಪ್ರಮುಖ ಯಾತ್ರಿಕರ ಸಲಹೆಗಳು:' : 'Queue Avoidance & Network Tips:'}</span>
            </div>
            <ul className="space-y-1.5 text-slate-700 pl-1">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong>{language === 'kn' ? 'ಮುಂಚಿತವಾಗಿ ಬುಕ್ ಮಾಡಿ: ' : 'Book 1 hour prior: '}</strong>
                  {language === 'kn'
                    ? 'ಬಾದಾಮಿ ಗುಹೆ ೧ ರ ಕೌಂಟರ್‌ನಲ್ಲಿ ಸಾಲು ಇರುತ್ತದೆ ಮತ್ತು ಕಣಿವೆಯೊಳಗೆ ಮೊಬೈಲ್ ನೆಟ್‌ವರ್ಕ್ ನಿಧಾನವಿರುತ್ತದೆ. ಹೋಟೆಲ್‌ನಲ್ಲಿಯೇ ಇ-ಟಿಕೆಟ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.'
                    : 'Network drops near the sandstone ravine at Cave 1. Book online at your hotel and screenshot the QR code.'}
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong>{language === 'kn' ? 'ಪ್ರತ್ಯೇಕ ತಾಣಗಳು: ' : 'Separate ASI tickets: '}</strong>
                  {language === 'kn'
                    ? 'ಬಾದಾಮಿ ಗುಹೆಗಳು, ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆಗೆ ಪ್ರತ್ಯೇಕ ASI ಟಿಕೆಟ್ ಅಗತ್ಯವಿದೆ (ಪ್ರತಿಯೊಂದಕ್ಕೂ ₹೨೫).'
                    : 'Badami Caves, Pattadakal, and Aihole Durga Temple require separate ASI entry tickets (₹25 each).'}
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong>{language === 'kn' ? 'ಉಚಿತ ತಾಣಗಳು: ' : 'Free Living Shrines: '}</strong>
                  {language === 'kn'
                    ? 'ಮಹಾಕೂಟ ದೇವಾಲಯ ಮತ್ತು ಬನಶಂಕರಿ ದೇವಸ್ಥಾನಗಳಿಗೆ ಯಾವುದೇ ಪ್ರವೇಶ ಶುಲ್ಕವಿಲ್ಲ (ಉಚಿತ).'
                    : 'Mahakuta Springs and Banashankari Temple are active pilgrimage shrines with zero entry fee.'}
                </span>
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <a
              href="https://asi.payumoney.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{language === 'kn' ? 'ಅಧಿಕೃತ ASI ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಬುಕ್ ಮಾಡಿ (asi.payumoney.com)' : 'Open Official ASI E-Ticket Portal (asi.payumoney.com)'}</span>
            </a>
            <p className="text-[11px] text-slate-500 text-center mt-2">
              {language === 'kn'
                ? 'ಗಮನಿಸಿ: ಅಧಿಕೃತ ಭಾರತ ಸರ್ಕಾರದ ಭಾರತೀಯ ಪುರಾತತ್ವ ಸರ್ವೇಕ್ಷಣಾ ಜಾಲತಾಣದಲ್ಲಿ ನೇರವಾಗಿ ಪಾವತಿಸಲಾಗುತ್ತದೆ.'
                : 'Direct official government booking with instant QR-code generation.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
