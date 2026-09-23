import React from 'react';
import { Phone, Shield, MapPin, Heart, Landmark, Compass, Award } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  language: Language;
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-[#0F172A] text-white border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center font-serif font-bold text-white shadow-md">
                ಯಾ
              </div>
              <span className="font-serif font-bold text-xl text-white">
                {t.brandName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.portalTagline}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-amber-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'kn' ? 'ಕರ್ನಾಟಕ ಸರಕಾರದ ಡಿಜಿಟಲ್ ಪೋರ್ಟಲ್' : 'Official Heritage Tourism Portal'}
              </span>
            </div>
          </div>

          {/* Col 2: Destinations */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-amber-400">
              {language === 'kn' ? 'ಪ್ರಮುಖ ತಾಣಗಳು' : 'Heritage Enclaves'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('destinations')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {language === 'kn' ? 'ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯಗಳು' : 'Badami Cave Temples'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('destinations')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {language === 'kn' ? 'ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ತಾಣ' : 'Pattadakal UNESCO Site'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('destinations')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {language === 'kn' ? 'ಐಹೊಳೆ ಕಲಾಶಾಲೆ' : 'Aihole Temple Complex'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('destinations')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {language === 'kn' ? 'ಮಹಾಕೂಟ & ವಿಷ್ಣು ಪುಷ್ಕರಿಣಿ' : 'Mahakuta & Vishnu Pushkarini'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('destinations')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {language === 'kn' ? 'ಕೂಡಲಸಂಗಮ ಐಕ್ಯ ಮಂಟಪ' : 'Kudalasangama Aikya Mantapa'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Crafts & Culture */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-amber-400">
              {language === 'kn' ? 'ಕರಕುಶಲ ಮತ್ತು ನೇಕಾರಿಕೆ' : 'Handlooms & Culture'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('weavers')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {language === 'kn' ? 'ಇಳಕಲ್ ಸೀರೆಗಳು (GI #೪೩)' : 'Ilkal Sarees (GI Tag #43)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('weavers')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {language === 'kn' ? 'ಗುಳೇದಗುಡ್ಡ ಖಣ & ಕಸೂತಿ' : 'Guledgudda Khana & Kasuti'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cuisine')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {language === 'kn' ? 'ಜೋಳದ ರೊಟ್ಟಿ & ಎಣ್ಣೆಗಾಯಿ' : 'Jolada Rotti & Yennegayi'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('scanner')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {language === 'kn' ? 'ಸ್ಮಾರಕ ಗುರುತಿಸುವ AI ಸ್ಕ್ಯಾನರ್' : 'AI Monument Scanner'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Helplines & Assistance */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-amber-400">
              {language === 'kn' ? 'ಸಹಾಯವಾಣಿ ಮತ್ತು ಸಂಪರ್ಕ' : 'Tourism Helpline'}
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Karnataka Tourism: 1800-425-4254</span>
              </p>
              <p className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Police / Emergency: 112</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Bagalkote District, Karnataka 587101</span>
              </p>
            </div>
            <p className="text-[11px] text-slate-400 pt-1">
              {t.footer.helplines}
            </p>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t.footer.copyright}</p>
          <p className="max-w-md text-center sm:text-right">{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
};
