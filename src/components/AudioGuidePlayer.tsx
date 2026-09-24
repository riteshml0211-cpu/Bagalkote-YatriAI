import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, X, Globe, ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import { Monument, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AudioGuidePlayerProps {
  monument: Monument | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export const AudioGuidePlayer: React.FC<AudioGuidePlayerProps> = ({
  monument,
  isPlaying,
  onTogglePlay,
  onClose,
  language,
  onLanguageChange,
}) => {
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const t = TRANSLATIONS[language];

  // Helper to resolve the best audio source URL
  const getAudioUrl = (mon: Monument, lang: Language): string => {
    if (lang === 'kn') {
      if (mon.audioFileKn) return mon.audioFileKn;
      if (!mon.id.startsWith('custom-')) return `/assets/audio/${mon.id}_kn.mp3`;
      return `/api/tts?text=${encodeURIComponent(mon.audioSnippetKn)}&lang=kn`;
    } else {
      if (mon.audioFileEn) return mon.audioFileEn;
      if (!mon.id.startsWith('custom-')) return `/assets/audio/${mon.id}_en.mp3`;
      return `/api/tts?text=${encodeURIComponent(mon.audioSnippetEn)}&lang=en`;
    }
  };

  // Setup and update audio element
  useEffect(() => {
    if (!monument) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      return;
    }

    const audioUrl = getAudioUrl(monument, language);
    let audio = audioRef.current;

    if (!audio) {
      audio = new Audio();
      audioRef.current = audio;
    }

    // Set callbacks
    audio.onwaiting = () => setIsLoading(true);
    audio.onplaying = () => setIsLoading(false);
    audio.oncanplay = () => setIsLoading(false);

    audio.ontimeupdate = () => {
      if (audio && audio.duration) {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.onloadedmetadata = () => {
      if (audio && audio.duration) {
        setDuration(audio.duration);
      }
    };

    audio.onended = () => {
      setProgress(100);
      onTogglePlay();
    };

    audio.onerror = () => {
      console.warn('Primary audio stream failed, attempting dynamic TTS fallback...');
      setIsLoading(false);
      // Fallback to dynamic TTS endpoint
      const snippet = language === 'kn' ? monument.audioSnippetKn : monument.audioSnippetEn;
      const fallbackUrl = `/api/tts?text=${encodeURIComponent(snippet)}&lang=${language}`;
      if (audio && audio.src !== fallbackUrl) {
        audio.src = fallbackUrl;
        audio.playbackRate = playbackSpeed;
        if (isPlaying) {
          audio.play().catch((err) => {
            console.error('Audio playback fallback failed:', err);
          });
        }
      }
    };

    // Update src only if changed
    const currentSrc = audio.src ? new URL(audio.src, window.location.origin).pathname + new URL(audio.src, window.location.origin).search : '';
    if (currentSrc !== audioUrl) {
      audio.src = audioUrl;
      audio.playbackRate = playbackSpeed;
      audio.currentTime = 0;
      setProgress(0);
      setCurrentTime(0);
    }

    if (isPlaying) {
      setIsLoading(true);
      audio.playbackRate = playbackSpeed;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsLoading(false);
          })
          .catch((err) => {
            console.warn('Audio play request interrupted or prevented:', err);
            setIsLoading(false);
          });
      }
    } else {
      audio.pause();
    }

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [monument?.id, language]);

  // Handle play/pause toggle when monument remains identical
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !monument) return;

    if (isPlaying) {
      audio.playbackRate = playbackSpeed;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay prevented or interrupted:', err);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Handle playback rate updates
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  if (!monument) return null;

  const currentTitle = language === 'kn' ? monument.nameKn : monument.name;
  const currentSnippet =
    language === 'kn' ? monument.audioSnippetKn : monument.audioSnippetEn;

  const toggleSpeed = () => {
    const speeds = [0.8, 1.0, 1.25];
    const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    audio.currentTime = ratio * audio.duration;
    setCurrentTime(audio.currentTime);
    setProgress(ratio * 100);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-stone-950/95 text-white backdrop-blur-md border-t border-amber-500/30 shadow-2xl animate-in slide-in-from-bottom-4">
      {/* Progress Bar (Clickable for Seeking) */}
      <div
        className="w-full bg-stone-800 h-1.5 cursor-pointer relative group"
        onClick={handleSeek}
        title="Click to seek"
      >
        <div
          className="bg-gradient-to-r from-amber-500 to-amber-400 h-full transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ left: `calc(${progress}% - 6px)` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
          {/* Monument Info */}
          <div className="flex items-center justify-between gap-2 min-w-0 flex-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-stone-800 shrink-0 border border-amber-500/40">
                <img
                  src={monument.image}
                  alt={monument.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/assets/monuments/badami_caves.jpg';
                  }}
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider hidden min-[400px]:inline">
                    {t.audioPlayer.title}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono shrink-0">
                    {formatTime(currentTime)} / {formatTime(duration || monument.audioDurationSeconds)}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-xs sm:text-sm text-white truncate max-w-[200px] sm:max-w-md">
                  {currentTitle}
                </h4>
              </div>
            </div>

            {/* Mobile-only close button in info row */}
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                }
                onClose();
              }}
              className="sm:hidden text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer shrink-0"
              aria-label="Close audio player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-3 shrink-0 pt-0.5 sm:pt-0">
            {/* Bilingual narration toggle */}
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'kn' : 'en')}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 text-[11px] sm:text-xs font-semibold border border-amber-500/30 transition-colors cursor-pointer shrink-0"
              title={language === 'en' ? 'Switch to Kannada audio' : 'Switch to English audio'}
            >
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="whitespace-nowrap">{language === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
            </button>

            {/* Playback speed */}
            <button
              onClick={toggleSpeed}
              className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] sm:text-xs font-bold text-slate-300 transition-colors cursor-pointer shrink-0"
              title="Change playback speed"
            >
              {playbackSpeed}x
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={onTogglePlay}
              disabled={isLoading}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer disabled:opacity-75 shrink-0 ring-2 ring-amber-400/40"
              aria-label={isPlaying ? 'Pause audio guide' : 'Play audio guide'}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Toggle Transcript */}
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="text-[11px] sm:text-xs text-slate-300 hover:text-white flex items-center gap-0.5 cursor-pointer shrink-0 px-1 py-1"
            >
              <span className="whitespace-nowrap">{language === 'kn' ? 'ಪಠ್ಯ' : 'Transcript'}</span>
              {showTranscript ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>

            {/* Close Button on Desktop */}
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                }
                onClose();
              }}
              className="hidden sm:block text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer shrink-0"
              aria-label="Close audio player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Transcript Drawer */}
        {showTranscript && (
          <div className="mt-3 p-3.5 rounded-xl bg-stone-900/90 border border-amber-500/20 text-xs text-slate-300 leading-relaxed max-h-36 overflow-y-auto animate-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-stone-800 text-[10px] text-amber-400/80 font-bold uppercase">
              <span>{language === 'kn' ? 'ಅಧಿಕೃತ ಧ್ವನಿ ವಿವರಣೆ' : 'Official Audio Narration Transcript'}</span>
              <span>{language === 'kn' ? 'ಕನ್ನಡ' : 'English'}</span>
            </div>
            <p className="italic leading-relaxed">{currentSnippet}</p>
          </div>
        )}
      </div>
    </div>
  );
};
