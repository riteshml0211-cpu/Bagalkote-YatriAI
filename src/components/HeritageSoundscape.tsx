import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Wind, Bell, Sliders, X } from 'lucide-react';
import { Language } from '../types';

interface HeritageSoundscapeProps {
  language: Language;
}

type SoundPreset = 'temple_bells' | 'river_breeze' | 'evening_aarti';

export const HeritageSoundscape: React.FC<HeritageSoundscapeProps> = ({ language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePreset, setActivePreset] = useState<SoundPreset>('temple_bells');
  const [volume, setVolume] = useState(0.4);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalIdRef = useRef<number | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  // Initialize Audio Context on demand (user gesture compliant)
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      const masterGain = audioCtxRef.current.createGain();
      masterGain.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
      masterGain.connect(audioCtxRef.current.destination);
      gainNodeRef.current = masterGain;
    } else if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Synthesize realistic Tibetan/Chalukyan bronze temple bell with natural harmonics
  const playTempleBell = (freq = 280, decay = 3.5) => {
    if (!audioCtxRef.current || !gainNodeRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    // Fundamental + overtone partials for bronze bell resonance
    const partials = [
      { f: freq, gain: 0.6 },
      { f: freq * 1.52, gain: 0.35 },
      { f: freq * 2.01, gain: 0.2 },
      { f: freq * 2.74, gain: 0.12 },
      { f: freq * 4.12, gain: 0.05 },
    ];

    partials.forEach(({ f, gain }) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);

      noteGain.gain.setValueAtTime(gain * volume, now);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(noteGain);
      noteGain.connect(gainNodeRef.current!);

      osc.start(now);
      osc.stop(now + decay);
    });
  };

  // Synthesize soft meditative river breeze using filtered brownian noise
  const startRiverBreeze = () => {
    if (!audioCtxRef.current || !gainNodeRef.current) return;
    const ctx = audioCtxRef.current;
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 0.18; // soft whisper
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);

    noise.connect(filter);
    filter.connect(gainNodeRef.current);
    noise.start();
    noiseNodeRef.current = noise;
  };

  // Start active soundscape loop
  const startSoundscape = () => {
    initAudio();
    stopSoundscape();

    if (activePreset === 'temple_bells') {
      // First chime immediately
      playTempleBell(260, 4.0);
      // Rhythmic meditation intervals
      const bellInterval = window.setInterval(() => {
        const freqs = [220, 260, 330, 392];
        const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];
        playTempleBell(randomFreq, 3.5 + Math.random());
      }, 3800);
      intervalIdRef.current = bellInterval;
    } else if (activePreset === 'river_breeze') {
      startRiverBreeze();
      // Occasional gentle water drops / bird chirp harmonic
      const dropInterval = window.setInterval(() => {
        if (!audioCtxRef.current || !gainNodeRef.current) return;
        const now = audioCtxRef.current.currentTime;
        const osc = audioCtxRef.current.createOscillator();
        const dropGain = audioCtxRef.current.createGain();
        osc.frequency.setValueAtTime(1400 + Math.random() * 400, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.15);
        dropGain.gain.setValueAtTime(0.08 * volume, now);
        dropGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
        osc.connect(dropGain);
        dropGain.connect(gainNodeRef.current!);
        osc.start(now);
        osc.stop(now + 0.25);
      }, 4500);
      intervalIdRef.current = dropInterval;
    } else if (activePreset === 'evening_aarti') {
      // Deeper double-bell rhythmic aarti cadence
      playTempleBell(180, 5.0);
      const aartiInterval = window.setInterval(() => {
        playTempleBell(220, 2.5);
        setTimeout(() => playTempleBell(330, 3.0), 450);
      }, 3000);
      intervalIdRef.current = aartiInterval;
    }
  };

  const stopSoundscape = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    if (noiseNodeRef.current) {
      try {
        (noiseNodeRef.current as AudioBufferSourceNode).stop();
        noiseNodeRef.current.disconnect();
      } catch {
        // Ignored
      }
      noiseNodeRef.current = null;
    }
  };

  // Toggle playback
  const handleTogglePlay = () => {
    if (isPlaying) {
      stopSoundscape();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      startSoundscape();
    }
  };

  // Preset switch
  const handleSwitchPreset = (preset: SoundPreset) => {
    setActivePreset(preset);
    if (isPlaying) {
      // Re-trigger with new preset
      setTimeout(() => startSoundscape(), 100);
    }
  };

  // Update volume
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      stopSoundscape();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <>
      {/* Compact Header Pill Trigger */}
      <div className="relative inline-flex items-center">
        <button
          type="button"
          onClick={() => {
            if (!isPlaying) {
              handleTogglePlay();
            }
            setIsExpanded(!isExpanded);
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-xs ${
            isPlaying
              ? 'bg-amber-500/20 text-amber-900 border border-amber-400'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
          title={language === 'kn' ? 'ಪಾರಂಪರಿಕ ಧ್ವನಿ ವಾತಾವರಣ' : 'Heritage Soundscape & Temple Ambience'}
        >
          {isPlaying ? (
            <>
              <span className="flex items-center gap-0.5">
                <span className="w-1 h-3 bg-amber-600 rounded-full animate-pulse" />
                <span className="w-1 h-4 bg-amber-700 rounded-full animate-pulse delay-75" />
                <span className="w-1 h-2 bg-amber-500 rounded-full animate-pulse delay-150" />
              </span>
              <span className="text-[11px] font-bold text-amber-900">
                {language === 'kn' ? 'ಧ್ವನಿ: ಆನ್' : 'Ambience: On'}
              </span>
            </>
          ) : (
            <>
              <Music className="w-3.5 h-3.5 text-amber-700" />
              <span className="text-[11px]">{language === 'kn' ? 'ದೇವಾಲಯ ನಾದ' : 'Soundscape'}</span>
            </>
          )}
        </button>
      </div>

      {/* Floating Soundscape Controller Drawer / Modal */}
      {isExpanded && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[300px] sm:w-[340px] bg-stone-900/95 text-stone-100 rounded-2xl border border-amber-500/30 p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <h4 className="font-serif font-bold text-sm text-amber-200">
                {language === 'kn' ? 'ವಾತಾಪಿ ಪಾರಂಪರಿಕ ನಾದ' : 'Vatapi Heritage Soundscape'}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="p-1 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-stone-300 mt-2 leading-relaxed">
            {language === 'kn'
              ? 'ಬಾದಾಮಿ ಗುಹೆಗಳು ಮತ್ತು ಮಲಪ್ರಭಾ ಕಣಿವೆಯ ನೈಸರ್ಗಿಕ ಧ್ಯಾನ ನಾದ.'
              : 'Synthesized acoustic resonance of ancient bronze temple bells and Malaprabha valley breezes.'}
          </p>

          {/* Sound Presets */}
          <div className="grid grid-cols-3 gap-1.5 mt-3.5">
            <button
              type="button"
              onClick={() => handleSwitchPreset('temple_bells')}
              className={`flex flex-col items-center justify-center p-2 rounded-xl text-[10px] font-medium transition-all ${
                activePreset === 'temple_bells'
                  ? 'bg-amber-600/30 border border-amber-400 text-amber-300 font-bold'
                  : 'bg-stone-800/80 border border-stone-700/60 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <Bell className="w-4 h-4 mb-1 text-amber-400" />
              <span>{language === 'kn' ? 'ಗುಹಾ ಗಂಟೆ' : 'Temple Bells'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleSwitchPreset('river_breeze')}
              className={`flex flex-col items-center justify-center p-2 rounded-xl text-[10px] font-medium transition-all ${
                activePreset === 'river_breeze'
                  ? 'bg-amber-600/30 border border-amber-400 text-amber-300 font-bold'
                  : 'bg-stone-800/80 border border-stone-700/60 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <Wind className="w-4 h-4 mb-1 text-blue-400" />
              <span>{language === 'kn' ? 'ನದೀ ತಂಪು' : 'River Breeze'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleSwitchPreset('evening_aarti')}
              className={`flex flex-col items-center justify-center p-2 rounded-xl text-[10px] font-medium transition-all ${
                activePreset === 'evening_aarti'
                  ? 'bg-amber-600/30 border border-amber-400 text-amber-300 font-bold'
                  : 'bg-stone-800/80 border border-stone-700/60 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <Music className="w-4 h-4 mb-1 text-rose-400" />
              <span>{language === 'kn' ? 'ಸಂಜೆ ಆರತಿ' : 'Evening Aarti'}</span>
            </button>
          </div>

          {/* Volume Slider & Play Button */}
          <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleTogglePlay}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                isPlaying
                  ? 'bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-400/40'
                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold'
              }`}
            >
              {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlaying ? (language === 'kn' ? 'ವಿರಾಮ' : 'Pause Ambience') : (language === 'kn' ? 'ಪ್ಲೇ ಮಾಡಿ' : 'Start Ambience')}</span>
            </button>

            <div className="flex items-center gap-2 text-stone-400">
              <input
                type="range"
                min="0.05"
                max="0.9"
                step="0.05"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-20 accent-amber-500 h-1 bg-stone-700 rounded-lg cursor-pointer"
                title="Volume"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
