import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MonumentScanner } from './components/MonumentScanner';
import { DestinationExplorer } from './components/DestinationExplorer';
import { CircuitMapExplorer } from './components/CircuitMapExplorer';
import { TransportationHub } from './components/TransportationHub';
import { WeaversHub } from './components/WeaversHub';
import { TripPlanner } from './components/TripPlanner';
import { TravelerToolkit } from './components/TravelerToolkit';
import { AudioGuidePlayer } from './components/AudioGuidePlayer';
import { AIAssistantChat } from './components/AIAssistantChat';
import { PocketGuideModal } from './components/PocketGuideModal';
import { Footer } from './components/Footer';
import { Language, Monument } from './types';
import { MONUMENTS } from './data/heritageData';
import { TRANSLATIONS } from './data/translations';
import { Sparkles, MessageSquare, ArrowUp } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [activeMonument, setActiveMonument] = useState<Monument | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPocketGuideOpen, setIsPocketGuideOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [chatInitialQuestion, setChatInitialQuestion] = useState<string | null>(null);
  const [weaversTab, setWeaversTab] = useState<'sarees' | 'cooperatives' | 'validator' | 'cuisine' | 'homestays'>('sarees');
  const [departureCity, setDepartureCity] = useState<string>('Bengaluru');

  const t = TRANSLATIONS[language];

  // Scroll listener to toggle Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Scroll to section smoothly
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (sectionId === 'validator') {
      setWeaversTab('validator');
      const elem = document.getElementById('weavers');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    if (sectionId === 'cuisine') {
      setWeaversTab('cuisine');
      const elem = document.getElementById('weavers');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    if (sectionId === 'weavers') {
      setWeaversTab('sarees');
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Departure city selection handler
  const handleSelectDepartureCity = (city: string) => {
    setDepartureCity(city);
    scrollToSection('transportation');
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
  const handleQuickAction = (
    action:
      | 'scanner'
      | 'destinations'
      | 'planner'
      | 'weavers'
      | 'cuisine'
      | 'audio'
      | 'circuit-map'
      | 'traveler-toolkit'
      | 'validator'
      | 'transportation'
  ) => {
    if (action === 'audio') {
      // Play Badami caves audio by default
      const defaultMon = MONUMENTS[0];
      handlePlayMonumentAudio(defaultMon);
    } else if (action === 'cuisine') {
      setWeaversTab('cuisine');
      scrollToSection('weavers');
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
    } else if (lower.includes('transport') || lower.includes('reach') || lower.includes('train') || lower.includes('bus') || lower.includes('flight') || lower.includes('cab') || lower.includes('taxi') || lower.includes('ksrtc') || lower.includes('irctc') || lower.includes('auto') || lower.includes('ರೈಲು') || lower.includes('ಬಸ್') || lower.includes('ಸಾರಿಗೆ') || lower.includes('ವಿಮಾನ') || lower.includes('ಹೋಗುವುದು ಹೇಗೆ')) {
      scrollToSection('transportation');
    } else if (lower.includes('map') || lower.includes('route') || lower.includes('ನಕ್ಷೆ') || lower.includes('ದಾರಿ')) {
      scrollToSection('circuit-map');
    } else if (lower.includes('phrase') || lower.includes('kannada') || lower.includes('ಮಾತು') || lower.includes('passport') || lower.includes('stamp') || lower.includes('ಪಾಸ್‌ಪೋರ್ಟ್') || lower.includes('offline') || lower.includes('emergency') || lower.includes('sun') || lower.includes('golden') || lower.includes('ಬಿಸಿಲು')) {
      scrollToSection('traveler-toolkit');
    } else if (lower.includes('saree') || lower.includes('ಸೀರೆ') || lower.includes('weaver')) {
      setWeaversTab('sarees');
      scrollToSection('weavers');
    } else if (lower.includes('food') || lower.includes('rotti') || lower.includes('ರೊಟ್ಟಿ') || lower.includes('cuisine') || lower.includes('oota') || lower.includes('ಊಟ')) {
      setWeaversTab('cuisine');
      scrollToSection('cuisine');
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
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-[#FAF7F2] text-slate-900 selection:bg-amber-200 selection:text-amber-950 font-sans">
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
        onOpenPocketGuide={() => setIsPocketGuideOpen(true)}
      />

      <main className={`flex-1 w-full overflow-x-hidden ${activeMonument ? 'pb-32 sm:pb-24' : ''}`}>
        {/* 1. First Page / Hero Banner */}
        <HeroBanner
          language={language}
          onQuickAction={handleQuickAction}
          onSearch={handleSearch}
          onSelectDepartureCity={handleSelectDepartureCity}
        />

        {/* 2. Explore (Destination Explorer) */}
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

        {/* 3. The Chalukya Heritage Circuit Map & GPS Driving Routes */}
        <CircuitMapExplorer
          language={language}
          onPlayMonumentAudio={handlePlayMonumentAudio}
        />

        {/* 4. Smart Expedition & Heritage Itinerary */}
        <TripPlanner
          language={language}
          onPlayMonumentAudio={handlePlayMonumentAudio}
          onAskAi={(topic) => {
            setChatInitialQuestion(topic);
            setIsChatOpen(true);
          }}
        />

        {/* 5. The Weavers Hub & North Karnataka Heritage */}
        <WeaversHub
          language={language}
          activeTab={weaversTab}
          onTabChange={setWeaversTab}
          onAskAi={(topic) => {
            setChatInitialQuestion(topic);
            setIsChatOpen(true);
          }}
        />

        {/* 6. Visual Monument Scanner */}
        <MonumentScanner
          language={language}
          onPlayAudioSnippet={handlePlayCustomSnippet}
          onAskAiAboutMonument={handleAskAiAboutMonument}
        />

        {/* 7. Traveler Toolkit & Heritage Passport */}
        <TravelerToolkit
          language={language}
          onPlaySpeech={handlePlaySpeech}
        />

        {/* 8. Transit & How to Reach Hub */}
        <TransportationHub
          language={language}
          initialDepartureCity={departureCity}
        />
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

      {/* Back To Top Floating Action Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed left-3 sm:left-6 z-40 flex items-center justify-center gap-1.5 p-2.5 sm:px-4 sm:py-2.5 rounded-full bg-stone-900/90 hover:bg-stone-950 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 active:scale-95 border-2 border-amber-400/50 backdrop-blur-md cursor-pointer group ${
            activeMonument ? 'bottom-28 sm:bottom-20' : 'bottom-5 sm:bottom-6'
          }`}
          aria-label="Back to top"
          title={language === 'kn' ? 'ಪುಟದ ಮೇಲ್ಭಾಗಕ್ಕೆ ಹಿಂತಿರುಗಿ' : 'Back to top'}
        >
          <ArrowUp className="w-4 h-4 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
          <span className="hidden sm:inline text-xs font-bold text-amber-200">
            {language === 'kn' ? 'ಮೇಲಕ್ಕೆ' : 'Top'}
          </span>
        </button>
      )}

      {/* Floating AI Assistant Trigger Pill */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className={`fixed right-3 sm:right-6 z-40 flex items-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full bg-linear-to-r from-amber-600 via-amber-700 to-amber-800 text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 border-2 border-amber-300/40 cursor-pointer ${
            activeMonument ? 'bottom-28 sm:bottom-20' : 'bottom-5 sm:bottom-6'
          }`}
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-amber-800 animate-pulse" />
          </div>
          <span className="text-xs sm:text-sm">{t.chat.floatingButton}</span>
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

      {/* Offline Printable Pocket Guide Modal */}
      <PocketGuideModal
        isOpen={isPocketGuideOpen}
        onClose={() => setIsPocketGuideOpen(false)}
        language={language}
      />

      {/* Footer */}
      <Footer language={language} onNavigate={scrollToSection} />
    </div>
  );
}
