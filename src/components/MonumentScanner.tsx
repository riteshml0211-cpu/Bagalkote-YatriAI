import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, Volume2, MessageSquare, CheckCircle2, RotateCcw, AlertCircle, Eye } from 'lucide-react';
import { Language, MonumentScanResult } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface MonumentScannerProps {
  language: Language;
  onPlayAudioSnippet: (title: string, text: string) => void;
  onAskAiAboutMonument: (monumentName: string) => void;
}

interface PresetSample {
  id: string;
  nameEn: string;
  nameKn: string;
  landmarkHint: string;
  image: string;
}

const PRESET_SAMPLES: PresetSample[] = [
  {
    id: 'sample-badami-1',
    nameEn: 'Badami Cave 1 (Nataraja)',
    nameKn: 'ಬಾದಾಮಿ ಗುಹೆ ೧ (ನಟರಾಜ)',
    landmarkHint: 'badami_cave_1',
    image: '/assets/monuments/badami_nataraja.jpg',
  },
  {
    id: 'sample-bhootanatha',
    nameEn: 'Bhootanatha Temples',
    nameKn: 'ಭೂತನಾಥ ದೇವಾಲಯಗಳು',
    landmarkHint: 'bhootanatha_temple',
    image: '/assets/monuments/bhootanatha_temple.jpg',
  },
  {
    id: 'sample-pattadakal',
    nameEn: 'Pattadakal Virupaksha (UNESCO)',
    nameKn: 'ಪಟ್ಟದಕಲ್ಲು ವಿರೂಪಾಕ್ಷ (ಯುನೆಸ್ಕೋ)',
    landmarkHint: 'pattadakal_virupaksha',
    image: '/assets/monuments/pattadakal_virupaksha.jpg',
  },
  {
    id: 'sample-aihole',
    nameEn: 'Aihole Durga Temple',
    nameKn: 'ಐಹೊಳೆ ದುರ್ಗಾ ದೇವಾಲಯ',
    landmarkHint: 'aihole_durga',
    image: '/assets/monuments/aihole_durga.jpg',
  },
  {
    id: 'sample-mahakuta',
    nameEn: 'Mahakuta Pushkarini Pool',
    nameKn: 'ಮಹಾಕೂಟ ಪುಷ್ಕರಿಣಿ',
    landmarkHint: 'mahakuta_pool',
    image: '/assets/monuments/mahakuta_temple.jpg',
  },
  {
    id: 'sample-banashankari',
    nameEn: 'Banashankari Lamp Towers',
    nameKn: 'ಬನಶಂಕರಿ ದೀಪಸ್ತಂಭ',
    landmarkHint: 'banashankari_temple',
    image: '/assets/monuments/banashankari_temple.jpg',
  },
  {
    id: 'sample-kudalasangama',
    nameEn: 'Kudalasangama Confluence',
    nameKn: 'ಕೂಡಲಸಂಗಮ ಸಂಗಮ ಕ್ಷೇತ್ರ',
    landmarkHint: 'kudalasangama',
    image: '/assets/monuments/kudalasangama.jpg',
  },
  {
    id: 'sample-handloom',
    nameEn: 'Ilkal Handloom Saree Loom',
    nameKn: 'ಇಳಕಲ್ ಕೈಮಗ್ಗ ನೇಯ್ಗೆ',
    landmarkHint: 'ilkal_handloom',
    image: '/assets/monuments/ilkal_weaving.jpg',
  },
];

export const MonumentScanner: React.FC<MonumentScannerProps> = ({
  language,
  onPlayAudioSnippet,
  onAskAiAboutMonument,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<MonumentScanResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[language];

  // Client-side image compressor using HTML5 Canvas to prevent 413 Payload Too Large
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          const maxDim = 1200;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve((e.target?.result as string) || '');
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = () => {
          resolve((e.target?.result as string) || '');
        };
        img.src = (e.target?.result as string) || '';
      };
      reader.onerror = () => {
        resolve('');
      };
      reader.readAsDataURL(file);
    });
  };

  // Process image with server API (which calls Gemini Vision or local registry fallback)
  const processImageScan = async (base64OrUrl: string, landmarkHint?: string) => {
    setIsScanning(true);
    setErrorMsg(null);
    setSelectedImage(base64OrUrl);

    try {
      const response = await fetch('/api/identify-monument', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64OrUrl.startsWith('data:') ? base64OrUrl : undefined,
          landmarkHint: landmarkHint || 'badami_cave_1',
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Identification failed');
      }

      const resJson = await response.json();
      if (resJson.data && (resJson.data.monumentName || resJson.data.monumentNameKn)) {
        setScanResult({
          ...resJson.data,
          sourceImage: base64OrUrl,
        });
      } else {
        throw new Error('No match found');
      }
    } catch (err: any) {
      console.error('Scan error:', err);
      setErrorMsg(
        language === 'kn'
          ? 'ಸ್ಕ್ಯಾನ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.'
          : 'Could not identify monument. Please try another angle.'
      );
    } finally {
      setIsScanning(false);
    }
  };

  // Process a dropped or selected file
  const handleProcessFile = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/') && !file.name.match(/\.(jpe?g|png|webp|gif|bmp|heic|avif)$/i)) {
      setErrorMsg(
        language === 'kn'
          ? 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಚಿತ್ರ ಫೈಲ್ (JPEG, PNG, WebP) ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.'
          : 'Please upload a valid image file (JPEG, PNG, WebP).'
      );
      return;
    }

    try {
      setIsScanning(true);
      setErrorMsg(null);
      const optimizedBase64 = await compressImage(file);
      setSelectedImage(optimizedBase64);

      // Guess landmark hint from file name if user named their photo
      const nameLower = file.name.toLowerCase();
      let hint: string | undefined = undefined;
      if (nameLower.includes('badami') || nameLower.includes('nataraja') || nameLower.includes('cave')) {
        hint = 'badami_cave_1';
      } else if (nameLower.includes('bhootanatha') || nameLower.includes('agastya')) {
        hint = 'bhootanatha_temple';
      } else if (nameLower.includes('pattadakal') || nameLower.includes('virupaksha')) {
        hint = 'pattadakal_virupaksha';
      } else if (nameLower.includes('aihole') || nameLower.includes('durga')) {
        hint = 'aihole_durga';
      } else if (nameLower.includes('mahakuta') || nameLower.includes('pushkarini')) {
        hint = 'mahakuta_pool';
      } else if (nameLower.includes('banashankari') || nameLower.includes('cholachagudd')) {
        hint = 'banashankari_temple';
      } else if (nameLower.includes('kudalasangama') || nameLower.includes('basava')) {
        hint = 'kudalasangama';
      } else if (nameLower.includes('ilkal') || nameLower.includes('saree') || nameLower.includes('handloom')) {
        hint = 'ilkal_handloom';
      }

      await processImageScan(optimizedBase64, hint);
    } catch (err: any) {
      console.error('File scan failed:', err);
      setErrorMsg(
        language === 'kn'
          ? 'ಸ್ಕ್ಯಾನ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.'
          : 'Could not identify monument. Please try another angle.'
      );
      setIsScanning(false);
    }
  };

  // Handle file input change
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
    // reset input so the same file can be picked again if desired
    e.target.value = '';
  };

  // Drag and drop event handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  // Handle preset sample click
  const handlePresetSelect = (sample: PresetSample) => {
    processImageScan(sample.image, sample.landmarkHint);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setScanResult(null);
    setErrorMsg(null);
  };

  return (
    <section id="scanner" className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF7F2] via-amber-50/40 to-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.scanner.badge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {t.scanner.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.scanner.subtitle}
          </p>
        </div>

        {/* Scanner Body */}
        {!scanResult ? (
          <div className="max-w-3xl mx-auto">
            {/* Drag and Drop Zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer group bg-white shadow-sm hover:shadow-md ${
                isDragging
                  ? 'border-amber-500 bg-amber-100/60 scale-[1.01] ring-4 ring-amber-400/30'
                  : isScanning
                  ? 'border-amber-500 bg-amber-50/40'
                  : 'border-amber-300/80 hover:border-amber-500'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {isScanning ? (
                <div className="py-8 space-y-4">
                  {/* Laser Scanning Effect */}
                  <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden border-2 border-amber-500 shadow-lg">
                    {selectedImage ? (
                      <img src={selectedImage} alt="Scanning" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center text-amber-400">
                        <Camera className="w-12 h-12 animate-pulse" />
                      </div>
                    )}
                    {/* Animated laser beam */}
                    <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#F59E0B] animate-bounce top-1/2" />
                  </div>
                  <div className="flex items-center justify-center gap-2 text-amber-900 font-bold text-sm sm:text-base">
                    <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
                    <span>{t.scanner.analyzingText}</span>
                  </div>
                </div>
              ) : isDragging ? (
                <div className="space-y-4 py-6">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center animate-bounce shadow-md">
                    <Upload className="w-10 h-10 text-amber-800" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-amber-900">
                      {language === 'kn' ? 'ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಬಿಡಿ!' : 'Drop your photo here now!'}
                    </h3>
                    <p className="text-xs text-amber-800 mt-1 font-medium">
                      {language === 'kn' ? 'ಸ್ಕ್ಯಾನ್ ಮಾಡಲು ಚಿತ್ರವನ್ನು ಬಿಡುಗಡೆ ಮಾಡಿ' : 'Release to instantly scan with Bagalkote YatriAI'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                    <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-800">
                      {t.scanner.dropTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {t.scanner.dropSubtitle}
                    </p>
                  </div>
                  <div className="pt-2 flex justify-center">
                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                    >
                      <Camera className="w-4 h-4" />
                      <span>{language === 'kn' ? 'ಫೋಟೋ ಆಯ್ಕೆ ಮಾಡಿ' : 'Choose Photo or Capture'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Verified Preset Test Samples */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t.scanner.orSelectSample}
                </span>
                <span className="text-xs text-amber-800 font-medium">
                  {language === 'kn' ? '೧-ಕ್ಲಿಕ್ ಪರೀಕ್ಷೆ' : '1-Click Quick Test'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {PRESET_SAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handlePresetSelect(sample)}
                    disabled={isScanning}
                    className="flex flex-col items-center p-2 rounded-xl bg-white hover:bg-amber-50 border border-amber-200/80 hover:border-amber-400 transition-all text-center group shadow-xs active:scale-95 disabled:opacity-50"
                  >
                    <div className="w-full aspect-square rounded-lg overflow-hidden mb-2 relative">
                      <img
                        src={sample.image}
                        alt={sample.nameEn}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/assets/monuments/badami_caves.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-800 group-hover:text-amber-900 line-clamp-2 leading-tight">
                      {language === 'kn' ? sample.nameKn : sample.nameEn}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* AI Identification Result Card */
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-amber-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Result Header Bar */}
            <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-sm text-emerald-300">
                  {t.scanner.card.identifiedBadge}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-full font-bold">
                  {scanResult.confidence}% {t.scanner.card.confidence}
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-300 hover:text-white flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.scanner.card.reScan}</span>
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Image Preview & Quick Badges */}
                <div className="md:col-span-5 space-y-3">
                  <div className="aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 shadow-md relative">
                    <img
                      src={scanResult.sourceImage || selectedImage || '/assets/monuments/badami_caves.jpg'}
                      alt={scanResult.monumentName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/assets/monuments/badami_caves.jpg';
                      }}
                    />
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] text-white flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>{scanResult.location}</span>
                    </div>
                  </div>

                  {/* Audio Guide & Ask AI buttons */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() =>
                        onPlayAudioSnippet(
                          language === 'kn' ? scanResult.monumentNameKn : scanResult.monumentName,
                          language === 'kn' ? scanResult.audioSnippetKn : scanResult.audioSnippetEn
                        )
                      }
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4 text-amber-200" />
                      <span>{t.scanner.card.playAudio}</span>
                    </button>

                    <button
                      onClick={() =>
                        onAskAiAboutMonument(
                          language === 'kn' ? scanResult.monumentNameKn : scanResult.monumentName
                        )
                      }
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-300/80 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-amber-700" />
                      <span>{t.scanner.card.askAiMore}</span>
                    </button>
                  </div>
                </div>

                {/* Monument Metadata & Backstory */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                      {language === 'kn' ? scanResult.monumentNameKn : scanResult.monumentName}
                    </h3>
                    <p className="text-xs text-amber-800 font-semibold mt-0.5">
                      {scanResult.location}
                    </p>
                  </div>

                  {/* Metadata Chips Grid */}
                  <div className="grid grid-cols-2 gap-2.5 text-xs bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/60">
                    <div>
                      <span className="text-slate-500 font-medium block">{t.scanner.card.era}:</span>
                      <span className="font-bold text-slate-900">{scanResult.century}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium block">{t.scanner.card.dynasty}:</span>
                      <span className="font-bold text-slate-900">{scanResult.dynasty}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-500 font-medium block">{t.scanner.card.style}:</span>
                      <span className="font-bold text-amber-900">{scanResult.architecturalStyle}</span>
                    </div>
                  </div>

                  {/* Historical Significance */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      {t.scanner.card.history}
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {language === 'kn'
                        ? scanResult.historicalSignificanceKn
                        : scanResult.historicalSignificance}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  {scanResult.keyHighlights && scanResult.keyHighlights.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        {t.scanner.card.highlights}
                      </h4>
                      <ul className="space-y-1 text-xs sm:text-sm text-slate-700">
                        {scanResult.keyHighlights.map((hl, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Visitor Tip */}
                  <div className="bg-amber-100/60 border-l-4 border-amber-600 p-3 rounded-r-xl text-xs text-amber-950">
                    <span className="font-bold block mb-0.5">{t.scanner.card.visitorTip}:</span>
                    <span>{scanResult.visitorTip}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
