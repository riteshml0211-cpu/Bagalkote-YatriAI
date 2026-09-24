import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Search, Sparkles, Award, Phone, HelpCircle, Check, Info } from 'lucide-react';
import { Language } from '../types';
import { ARTISAN_COOPERATIVES } from '../data/heritageData';

interface GIAuthenticityValidatorProps {
  language: Language;
  onAskAi?: (topic: string) => void;
}

interface ValidationStep {
  id: string;
  stepNumber: number;
  titleEn: string;
  titleKn: string;
  descriptionEn: string;
  descriptionKn: string;
  authenticSignEn: string;
  authenticSignKn: string;
  counterfeitWarningEn: string;
  counterfeitWarningKn: string;
  icon: string;
}

const VALIDATION_STEPS: ValidationStep[] = [
  {
    id: 'kondi-joint',
    stepNumber: 1,
    titleEn: 'The Sacred "Kondi" Warp Joint (ಟೋಪೆತೆಂಚಿ ಕೊಂಡಿ)',
    titleKn: 'ಪ್ರಾಚೀನ "ಕೊಂಡಿ" ಜಂಟಿ ಪರೀಕ್ಷೆ',
    descriptionEn:
      'The hallmark of authentic handwoven Ilkal sarees. An unbroken 8th-century craft where the cotton body warp is looped thread-by-thread into the crimson pure-silk pallu.',
    descriptionKn:
      'ಇಳಕಲ್ ಸೀರೆಯ ಪ್ರಮುಖ ಗುರುತು. ಹತ್ತಿಯ ಒಡಲಿನ ನೂಲುಗಳನ್ನು ಕೆಂಪು ರೇಷ್ಮೆಯ ಸೆರಗಿನ ನೂಲುಗಳೊಂದಿಗೆ ಕೈಯಿಂದ ಒಂದೊಂದಾಗಿ ಬೆಸೆದು ಹೆಣೆಯಲಾಗುತ್ತದೆ.',
    authenticSignEn: 'Gently turn the saree inside out at the pallu junction. You will see interwoven loop knots (Kondi) with no sewing thread seams.',
    authenticSignKn: 'ಸೆರಗಿನ ಒಳಭಾಗವನ್ನು ತಿರುಗಿಸಿ ನೋಡಿ; ಯಾವುದೇ ಹೊಲಿಗೆ ದಾರವಿಲ್ಲದೆ ನೂಲುಗಳು ಪರಸ್ಪರ ಹೆಣೆದುಕೊಂಡಿರುವ ಕೊಂಡಿ ಕಣ್ಣಿಗೆ ಕಾಣುತ್ತದೆ.',
    counterfeitWarningEn: 'Powerloom fakes simply machine-stitch the pallu onto the body with standard polyester sewing machine thread.',
    counterfeitWarningKn: 'ನಕಲಿ ಪವರ್‌ಲೂಮ್ ಸೀರೆಗಳಲ್ಲಿ ಸೆರಗನ್ನು ಸಾಮಾನ್ಯ ಹೊಲಿಗೆ ಯಂತ್ರದ ಮೂಲಕ ದಾರದಿಂದ ಜೋಡಿಸಿರುತ್ತಾರೆ.',
    icon: '🧵',
  },
  {
    id: 'burn-test',
    stepNumber: 2,
    titleEn: 'Natural Silk Fiber Burn Purity Test',
    titleKn: 'ಶುದ್ಧ ರೇಷ್ಮೆ ನೂಲಿನ ಪರೀಕ್ಷೆ',
    descriptionEn:
      'Genuine GI-tagged Ilkal sarees use 100% natural mulberry silk for the crimson pallu and natural carded cotton for the body.',
    descriptionKn:
      'ಅಧಿಕೃತ ಇಳಕಲ್ ಸೀರೆಯಲ್ಲಿ ಶುದ್ಧ ಹಿಪ್ಪುನೇರಳೆ ರೇಷ್ಮೆ ಮತ್ತು ನೈಸರ್ಗಿಕ ಹತ್ತಿಯ ನೂಲುಗಳನ್ನು ಮಾತ್ರ ಬಳಸಲಾಗುತ್ತದೆ.',
    authenticSignEn: 'A loose thread taken from the pallu edge will burn slowly, smell like burnt hair/feathers, and leave behind dark, crushable powdery ash.',
    authenticSignKn: 'ಸೆರಗಿನ ಒಂದು ಎಳೆಯನ್ನು ಸುಟ್ಟರೆ, ಕೂದಲು ಸುಟ್ಟಂತಹ ವಾಸನೆ ಬರುತ್ತದೆ ಮತ್ತು ಮೃದುವಾದ ಕಪ್ಪು ಬೂದಿಯಾಗುತ್ತದೆ.',
    counterfeitWarningEn: 'Synthetic rayon or polyester fakes melt rapidly with black chemical fumes, smelling like burning plastic and forming a hard melt bead.',
    counterfeitWarningKn: 'ಕೃತಕ ಪಾಲಿಯೆಸ್ಟರ್ ನಕಲಿ ಬಟ್ಟೆಯು ಪ್ಲಾಸ್ಟಿಕ್ ವಾಸನೆಯೊಂದಿಗೆ ಸುಟ್ಟು ಗಟ್ಟಿಯಾದ ಕರಗಿದ ಉಂಡೆಯಾಗುತ್ತದೆ.',
    icon: '🔥',
  },
  {
    id: 'pallu-bands',
    stepNumber: 3,
    titleEn: 'Signature Topetenchi & Border Motifs',
    titleKn: 'ಟೋಪೆತೆಂಚಿ ಸೆರಗು ಮತ್ತು ಚಿಕ್ಕಿ ಪಾರಸ್ ಅಂಚು',
    descriptionEn:
      'Traditional Ilkal designs carry distinct geometric motifs: Topetenchi (temple dome bands), Chikki Paras (star dots), or Gomi (arrowhead chevron).',
    descriptionKn:
      'ಸಾಂಪ್ರದಾಯಿಕ ವಿನ್ಯಾಸದಲ್ಲಿ ಗೋಪುರದ ಆಕಾರದ ಟೋಪೆತೆಂಚಿ ಸೆರಗು ಮತ್ತು ನಕ್ಷತ್ರದಂತಹ ಚಿಕ್ಕಿ ಪಾರಸ್ ಅಂಚುಗಳು ಇರುತ್ತವೆ.',
    authenticSignEn: 'Features 3 solid crimson bands separated by 2 white temple bands, with reversible Chikki Paras border looking identical on both sides.',
    authenticSignKn: 'ಮೂರು ಕೆಂಪು ಪಟ್ಟಿಗಳು ಮತ್ತು ಎರಡು ಬಿಳಿ ಗೋಪುರದ ಪಟ್ಟಿಗಳಿರುತ್ತವೆ. ಎರಡೂ ಬದಿಗಳಲ್ಲಿ ಅಂಚು ಒಂದೇ ಸಮನಾಗಿ ಕಾಣುತ್ತದೆ.',
    counterfeitWarningEn: 'Screen-printed or flat powerloom patterns have one faded reverse side and lack the deep textural luster.',
    counterfeitWarningKn: 'ಪ್ರಿಂಟೆಡ್ ಅಥವಾ ನಕಲಿ ಸೀರೆಗಳ ಹಿಂಭಾಗ ಮಾಸಿದ ಬಣ್ಣದಿಂದ ಕೂಡಿರುತ್ತದೆ.',
    icon: '📐',
  },
  {
    id: 'gi-silk-mark',
    stepNumber: 4,
    titleEn: 'Government GI Tag #43 & Silk Mark Verification',
    titleKn: 'ಸರ್ಕಾರಿ ಜಿಐ ಟ್ಯಾಗ್ #೪೩ ಮತ್ತು ಸಿಲ್ಕ್ ಮಾರ್ಕ್ ಮುದ್ರೆ',
    descriptionEn:
      'The Geographical Indications Registry of India granted GI Tag #43 to Ilkal Sarees and GI Tag #125 to Guledgudda Khana to protect weaver intellectual heritage.',
    descriptionKn:
      'ಭಾರತ ಸರ್ಕಾರವು ಇಳಕಲ್ ಸೀರೆಗಳಿಗೆ ಜಿಐ ಟ್ಯಾಗ್ #೪೩ ಮತ್ತು ಗುಳೇದಗುಡ್ಡ ಖಣಕ್ಕೆ ಜಿಐ ಟ್ಯಾಗ್ #೧೨೫ ನೀಡಿ ಮಾನ್ಯತೆ ನೀಡಿದೆ.',
    authenticSignEn: 'Look for the official woven GI tag label, Silk Mark India hologram QR code, and cooperative society membership stamp.',
    authenticSignKn: 'ಅಧಿಕೃತ ಸಿಲ್ಕ್ ಮಾರ್ಕ್ ಕ್ಯೂಆರ್ ಕೋಡ್ ಮತ್ತು ನೇಕಾರರ ಸಹಕಾರ ಸಂಘದ ನೋಂದಾಯಿತ ಸೀಲ್ ಇರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
    counterfeitWarningEn: 'Generic retail shop paper stickers with no society registration or weaver cooperative contact info.',
    counterfeitWarningKn: 'ಯಾವುದೇ ಸಂಘದ ವಿಳಾಸವಿಲ್ಲದ ಕೇವಲ ಕಾಗದದ ಸ್ಟಿಕ್ಕರ್‌ಗಳು ನಕಲಿಯಾಗಿರಬಹುದು.',
    icon: '🏅',
  },
];

export const GIAuthenticityValidator: React.FC<GIAuthenticityValidatorProps> = ({
  language,
  onAskAi,
}) => {
  const [selectedStepId, setSelectedStepId] = useState<string>('kondi-joint');
  const [checkedStepIds, setCheckedStepIds] = useState<string[]>([]);
  const [activeCoopId, setActiveCoopId] = useState<string>('ilkal-weavers-coop');

  const activeStep = VALIDATION_STEPS.find((s) => s.id === selectedStepId) || VALIDATION_STEPS[0];
  const activeCoop = ARTISAN_COOPERATIVES.find((c) => c.id === activeCoopId) || ARTISAN_COOPERATIVES[0];

  const toggleCheck = (stepId: string) => {
    setCheckedStepIds((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    );
  };

  const isFullyVerified = checkedStepIds.length === VALIDATION_STEPS.length;

  return (
    <div className="bg-[#FAF7F2] rounded-3xl border border-amber-300/80 p-5 sm:p-8 shadow-sm">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-amber-200/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'kn' ? 'ಭೌಗೋಳಿಕ ಸೂಚ್ಯಂಕ (GI #43) ರಕ್ಷಣೆ' : 'GI Tag #43 Purity Guarantee'}</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {language === 'kn' ? 'ಅಸಲಿ ಇಳಕಲ್ ಸೀರೆ & ಖಣ ಪರಿಶೀಲಕ' : 'GI Handloom Authenticity Validator'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            {language === 'kn'
              ? 'ಪವರ್‌ಲೂಮ್ ನಕಲಿಗಳಿಂದ ನಮ್ಮ ಪಾರಂಪರಿಕ ನೇಕಾರರನ್ನು ರಕ್ಷಿಸಿ. ಅಧಿಕೃತ ಕೈಮಗ್ಗದ ೪ ಪ್ರಮುಖ ಲಕ್ಷಣಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ ಮತ್ತು ನೇಕಾರರಿಂದ ನೇರವಾಗಿ ಖರೀದಿಸಿ.'
              : 'Protect heritage artisan families from synthetic powerloom counterfeits. Follow these 4 forensic checks to certify 100% authentic GI-tagged weaves.'}
          </p>
        </div>

        {/* Verification Status Counter */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-amber-200 shrink-0 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-900 flex items-center justify-center font-bold text-lg">
            {checkedStepIds.length}/{VALIDATION_STEPS.length}
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              {language === 'kn' ? 'ಪರಿಶೀಲನೆ ಸ್ಥಿತಿ' : 'Verification Score'}
            </span>
            <span className={`text-xs font-bold ${isFullyVerified ? 'text-emerald-700 font-bold' : 'text-slate-800'}`}>
              {isFullyVerified
                ? language === 'kn' ? '೧೦೦% ಶುದ್ಧ ಕೈಮಗ್ಗ ಪ್ರಮಾಣಿತ!' : '100% Certified Authentic!'
                : language === 'kn' ? `${checkedStepIds.length} ಹಂತಗಳು ಪೂರ್ಣ` : `${checkedStepIds.length} of 4 Checks Passed`}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Steps Navigation + Interactive Diagnostic Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        {/* Left Column: 4 Validation Steps List */}
        <div className="lg:col-span-5 space-y-2.5">
          {VALIDATION_STEPS.map((step) => {
            const isSelected = selectedStepId === step.id;
            const isChecked = checkedStepIds.includes(step.id);

            return (
              <div
                key={step.id}
                onClick={() => setSelectedStepId(step.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 text-left ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/15 border-amber-600 ring-2 ring-amber-400'
                    : 'bg-white hover:bg-amber-50/60 border-amber-200/70 text-slate-900'
                }`}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCheck(step.id);
                  }}
                  className={`w-6 h-6 rounded-lg border-2 mt-0.5 flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                    isChecked
                      ? isSelected
                        ? 'bg-white text-amber-700 border-white'
                        : 'bg-emerald-600 text-white border-emerald-600'
                      : isSelected
                      ? 'border-white/50 hover:border-white'
                      : 'border-slate-300 hover:border-amber-500'
                  }`}
                  title="Mark check passed"
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1 min-w-0">
                  <span
                    className={`text-[10px] font-bold block uppercase tracking-wider ${
                      isSelected ? 'text-amber-200' : 'text-amber-800'
                    }`}
                  >
                    Step {step.stepNumber} of 4
                  </span>
                  <h4 className="font-serif font-bold text-sm truncate">
                    {language === 'kn' ? step.titleKn : step.titleEn}
                  </h4>
                  <p
                    className={`text-xs mt-0.5 line-clamp-2 ${
                      isSelected ? 'text-amber-100' : 'text-slate-500'
                    }`}
                  >
                    {language === 'kn' ? step.descriptionKn : step.descriptionEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep Diagnostic Inspector */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-amber-200/90 p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <span className="text-lg">{activeStep.icon}</span>
                <span>{language === 'kn' ? `ಹಂತ ${activeStep.stepNumber} ವಿವರಣೆ` : `Forensic Test #${activeStep.stepNumber}`}</span>
              </span>
              <button
                type="button"
                onClick={() => toggleCheck(activeStep.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  checkedStepIds.includes(activeStep.id)
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>
                  {checkedStepIds.includes(activeStep.id)
                    ? language === 'kn' ? 'ಪರೀಕ್ಷೆ ತೃಪ್ತಿದಾಯಕ' : 'Test Verified'
                    : language === 'kn' ? 'ಪರೀಕ್ಷೆ ಪೂರ್ಣಗೊಳಿಸಿ' : 'Verify This Test'}
                </span>
              </button>
            </div>

            <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900 mt-3">
              {language === 'kn' ? activeStep.titleKn : activeStep.titleEn}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              {language === 'kn' ? activeStep.descriptionKn : activeStep.descriptionEn}
            </p>

            {/* Authentic vs Counterfeit Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5">
              {/* Authentic Indicator */}
              <div className="bg-emerald-50/70 border border-emerald-300/80 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'kn' ? 'ಅಸಲಿ ಕೈಮಗ್ಗ ಲಕ್ಷಣ' : 'Authentic Handloom Sign'}</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                  {language === 'kn' ? activeStep.authenticSignKn : activeStep.authenticSignEn}
                </p>
              </div>

              {/* Counterfeit Warning */}
              <div className="bg-rose-50/70 border border-rose-300/80 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-rose-900 font-bold text-xs mb-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{language === 'kn' ? 'ನಕಲಿ ಪವರ್‌ಲೂಮ್ ಎಚ್ಚರಿಕೆ' : 'Counterfeit Warning'}</span>
                </div>
                <p className="text-xs text-rose-950 leading-relaxed font-medium">
                  {language === 'kn' ? activeStep.counterfeitWarningKn : activeStep.counterfeitWarningEn}
                </p>
              </div>
            </div>
          </div>

          {/* Direct Weaver Collective Guarantee Footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-600">
              <strong className="text-slate-900 block font-bold">
                {language === 'kn' ? 'ನೇಕಾರರಿಂದ ನೇರ ಖರೀದಿ:' : 'Certified Artisan Collective:'}
              </strong>
              <span>{language === 'kn' ? activeCoop.nameKn : activeCoop.name}</span>
            </div>
            <a
              href={`tel:${activeCoop.phone.split('/')[0].trim()}`}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{language === 'kn' ? 'ಸಹಕಾರ ಸಂಘಕ್ಕೆ ಕರೆ ಮಾಡಿ' : 'Call Cooperative Directly'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
