import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MonumentScanner } from './components/MonumentScanner';
import { DestinationExplorer } from './components/DestinationExplorer';
import { WeaversHub } from './components/WeaversHub';
import { TripPlanner } from './components/TripPlanner';
import { AudioGuidePlayer } from './components/AudioGuidePlayer';
import { AIAssistantChat } from './components/AIAssistantChat';
import { Footer } from './components/Footer';
import { Language, Monument } from './types';
import { MONUMENTS } from './data/heritageData';
import { TRANSLATIONS } from './data/translations';
import { Sparkles, MessageSquare } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [activeMonument, setActiveMonument] = useState<Monument | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialQuestion, setChatInitialQuestion] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  // Scroll to section smoothly
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Play monument audio guide
  const handlePlayMonumentAudio = (monument: Monument) => {
    if (activeMonument?.id === monument.id && isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setActiveMonument(monument);
      setIsPlayingAudio(true);
    }
  };

  // Play custom audio snippet (e.g. from scanner)
  const handlePlayCustomSnippet = (title: string, text: string) => {
    const tempMonument: Monument = {
      id: 'custom-' + Date.now(),
      name: title,
      nameKn: title,
      cluster: 'Badami',
      clusterKn: 'ಬಾದಾಮಿ',
      tagline: '',
      taglineKn: '',
      century: '',
      dynasty: '',
      dynastyKn: '',
      architecturalStyle: '',
      architecturalStyleKn: '',
      image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
      gallery: [],
      operationalTimings: '6:00 AM – 6:00 PM',
      operationalTimingsKn: '೬:೦೦ – ೬:೦೦',
      entryFee: { indian: 25, foreigner: 300 },
      distanceFromBadamiKm: 1,
      coordinates: { lat: 15.9189, lng: 75.6766 },
      audioDurationSeconds: 45,
      audioSnippetEn: text,
      audioSnippetKn: text,
      descriptionEn: text,
      descriptionKn: text,
      keyFeaturesEn: [],
      keyFeaturesKn: [],
      visitorTipsEn: [],
      visitorTipsKn: [],
    };
    setActiveMonument(tempMonument);
    setIsPlayingAudio(true);
  };

  // Ask AI about monument
  const handleAskAiAboutMonument = (monumentName: string) => {
    const question =
      language === 'kn'
        ? `${monumentName} ದೇವಸ್ಥಾನದ ಇತಿಹಾಸ, ವೈಶಿಷ್ಟ್ಯ ಮತ್ತು ಭೇಟಿಯ ಸಮಯದ ಬಗ್ಗೆ ವಿವರವಾಗಿ ತಿಳಿಸಿ.`
        : `Tell me detailed history, architectural highlights, and best visiting tips for ${monumentName}.`;
    setChatInitialQuestion(question);
    setIsChatOpen(true);
  };

  // Quick action from hero
  const handleQuickAction = (action: 'scanner' | 'destinations' | 'planner' | 'weavers' | 'audio') => {
    if (action === 'audio') {
      // Play Badami caves audio by default
      const defaultMon = MONUMENTS[0];
      handlePlayMonumentAudio(defaultMon);
    } else {
      scrollToSection(action);
    }
  };

  // Search handler
  const handleSearch = (query: string) => {
    const lower = query.toLowerCase();
    const matched = MONUMENTS.find(
      (m) =>
        m.name.toLowerCase().includes(lower) ||
        m.nameKn.includes(query) ||
        m.cluster.toLowerCase().includes(lower) ||
        m.clusterKn.includes(query)
    );

    if (matched) {
      scrollToSection('destinations');
    } else if (lower.includes('saree') || lower.includes('ಸೀರೆ') || lower.includes('weaver')) {
      scrollToSection('weavers');
    } else if (lower.includes('food') || lower.includes('rotti') || lower.includes('ರೊಟ್ಟಿ')) {
      scrollToSection('weavers');
    } else {
      // Ask AI
      setChatInitialQuestion(query);
      setIsChatOpen(true);
    }
  };

  // Global audio speech controller for chat drawer & text narration
  const handlePlaySpeech = (text: string) => {
    const langCode = language === 'kn' ? 'kn' : 'en';
    const voices = window.speechSynthesis?.getVoices() || [];
    const hasNativeVoice = voices.some((v) => v.lang.startsWith(langCode));

    if (hasNativeVoice) {
      window.speechSynthesis?.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'kn' ? 'kn-IN' : 'en-IN';
      const matched = voices.find((v) => v.lang.startsWith(langCode));
      if (matched) utterance.voice = matched;
      window.speechSynthesis?.speak(utterance);
    } else {
      const audioUrl = `/api/tts?text=${encodeURIComponent(text.slice(0, 400))}&lang=${langCode}`;
      const audio = new Audio(audioUrl);
      audio.play().catch((e) => console.warn('TTS playback error:', e));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-slate-900 selection:bg-amber-200 selection:text-amber-950 font-sans">
      {/* Top Sticky Navbar */}
      <Navbar
        language={language}
        onToggleLanguage={() => setLanguage((prev) => (prev === 'en' ? 'kn' : 'en'))}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        activeMonument={activeMonument}
        isPlayingAudio={isPlayingAudio}
        onOpenAudioBar={() => setIsPlayingAudio(!isPlayingAudio)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Banner Section */}
        <HeroBanner
          language={language}
          onQuickAction={handleQuickAction}
          onSearch={handleSearch}
        />

        {/* AI Monument Visual Scanner Section */}
        <MonumentScanner
          language={language}
          onPlayAudioSnippet={handlePlayCustomSnippet}
          onAskAiAboutMonument={handleAskAiAboutMonument}
        />

        {/* Interactive Destinations Explorer */}
        <DestinationExplorer
          language={language}
          onPlayMonumentAudio={handlePlayMonumentAudio}
          activeMonument={activeMonument}
          isPlayingAudio={isPlayingAudio}
          onAskAi={(q) => {
            setChatInitialQuestion(q);
            setIsChatOpen(true);
          }}
        />

        {/* Weavers Hub & Inclusive Growth Section */}
        <WeaversHub
          language={language}
          onAskAi={(topic) => {
            setChatInitialQuestion(topic);
            setIsChatOpen(true);
          }}
        />

        {/* Smart Trip Planner */}
        <TripPlanner language={language} />
      </main>

      {/* Floating Audio Player Bar */}
      {activeMonument && (
        <AudioGuidePlayer
          monument={activeMonument}
          isPlaying={isPlayingAudio}
          onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
          onClose={() => {
            setIsPlayingAudio(false);
            setActiveMonument(null);
          }}
          language={language}
          onLanguageChange={setLanguage}
        />
      )}

      {/* Floating AI Assistant Trigger Pill */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className={`fixed right-4 sm:right-6 z-40 flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-linear-to-r from-amber-600 via-amber-700 to-amber-800 text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 border-2 border-amber-300/40 cursor-pointer ${
            activeMonument ? 'bottom-24 sm:bottom-20' : 'bottom-6'
          }`}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-amber-200" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-amber-800 animate-pulse" />
          </div>
          <span>{t.chat.floatingButton}</span>
        </button>
      )}

      {/* Multimodal AI Assistant Chat Drawer */}
      <AIAssistantChat
        language={language}
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setChatInitialQuestion(null);
        }}
        onPlaySpeech={handlePlaySpeech}
        initialQuestion={chatInitialQuestion}
      />

      {/* Footer */}
      <Footer language={language} onNavigate={scrollToSection} />
    </div>
  );
}
