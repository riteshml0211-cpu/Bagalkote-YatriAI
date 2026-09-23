import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Mic, MicOff, Volume2, X, Sparkles, User, Bot, CornerDownLeft, VolumeX } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AIAssistantChatProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onPlaySpeech: (text: string) => void;
  initialQuestion?: string | null;
}

interface ChatMsg {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: 'gemini' | 'knowledge-base';
}

export const AIAssistantChat: React.FC<AIAssistantChatProps> = ({
  language,
  isOpen,
  onClose,
  onPlaySpeech,
  initialQuestion,
}) => {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceSimulating, setIsVoiceSimulating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language];

  // Initialize welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'assistant',
          text: t.chat.welcome,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [language]);

  // Handle initial question from other components
  useEffect(() => {
    if (initialQuestion && isOpen) {
      handleSendMessage(initialQuestion);
    }
  }, [initialQuestion, isOpen]);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text) return;

    const userMsg: ChatMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language,
          history: messages.slice(-4).map((m) => ({ role: m.sender, text: m.text })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMsg: ChatMsg = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: data.reply || 'Information retrieved.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: data.source,
        };

        setMessages((prev) => [...prev, assistantMsg]);
        return;
      }
    } catch (err) {
      console.warn('Backend chat API offline, activating local heritage knowledge base:', err);
    } finally {
      setIsTyping(false);
    }

    // Smart heritage knowledge fallback for Vercel/offline
    const replyText = getSmartChatResponse(text, language);
    const fallbackMsg: ChatMsg = {
      id: (Date.now() + 1).toString(),
      sender: 'assistant',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'knowledge-base',
    };
    setMessages((prev) => [...prev, fallbackMsg]);
  };

  const handleVoiceSimulate = (promptText: string) => {
    setIsVoiceSimulating(true);
    setInputValue(promptText);

    setTimeout(() => {
      setIsVoiceSimulating(false);
      handleSendMessage(promptText);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 sm:h-[620px] z-50 flex flex-col bg-white sm:rounded-3xl shadow-2xl border border-amber-200/90 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-200" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm leading-tight text-amber-100">
              {t.chat.title}
            </h3>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.chat.status}</span>
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF7F2]/50 text-xs sm:text-sm">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isUser ? 'bg-amber-600 text-white' : 'bg-stone-900 text-amber-300'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-3 shadow-xs ${
                  isUser
                    ? 'bg-amber-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-amber-200/70 rounded-tl-none'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <div
                  className={`mt-1.5 flex items-center justify-between text-[10px] ${
                    isUser ? 'text-amber-100' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => onPlaySpeech(msg.text)}
                      className="text-amber-700 hover:text-amber-900 p-0.5 rounded cursor-pointer"
                      title="Listen aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs italic">
            <Bot className="w-4 h-4 text-amber-700" />
            <span className="animate-pulse">
              {language === 'kn' ? 'ಯಾತ್ರಿAI ಚಿಂತಿಸುತ್ತಿದೆ...' : 'YatriAI is thinking...'}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Voice Simulator Chips Drawer */}
      <div className="bg-amber-50/80 border-t border-amber-200/60 p-2.5 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-amber-900 font-bold">
          <span className="flex items-center gap-1">
            <Mic className="w-3 h-3 text-amber-700" />
            <span>{t.chat.voiceSimTitle}:</span>
          </span>
          {isVoiceSimulating && (
            <span className="text-emerald-700 font-semibold animate-pulse text-[10px]">
              {t.chat.voiceSimListening}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {(language === 'kn' ? t.chat.voicePromptsKn : t.chat.voicePromptsEn).map(
            (promptText, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleVoiceSimulate(promptText)}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 border border-amber-300 text-[11px] text-slate-800 font-medium transition-colors text-left truncate max-w-[200px]"
              >
                🎙️ {promptText}
              </button>
            )
          )}
        </div>
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
        }}
        className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => {
            const samplePrompt =
              language === 'kn'
                ? 'ಬಾದಾಮಿ ಗುಹೆ ೧ ರ ನಟರಾಜ ಶಿಲ್ಪದ ವಿಶೇಷತೆ ತಿಳಿಸಿ'
                : 'Tell me about Badami Cave 1 Nataraja sculpture';
            handleVoiceSimulate(samplePrompt);
          }}
          className={`p-2 rounded-xl transition-all cursor-pointer ${
            isVoiceSimulating
              ? 'bg-red-500 text-white animate-bounce'
              : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
          }`}
          title="Voice input simulator"
        >
          <Mic className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t.chat.inputPlaceholder}
          className="flex-1 text-xs sm:text-sm px-3 py-2 bg-slate-100 rounded-xl focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-amber-500 transition-all text-slate-800"
        />

        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="p-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-40 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

function getSmartChatResponse(query: string, language: Language): string {
  const q = query.toLowerCase();

  if (q.includes('badami') || q.includes('cave') || q.includes('ಗುಹೆ') || q.includes('ಬಾದಾಮಿ')) {
    if (q.includes('nataraja') || q.includes('ನಟರಾಜ') || q.includes('cave 1')) {
      return language === 'kn'
        ? 'ಬಾದಾಮಿ ಗುಹೆ ೧ ರ ೧೮ ತೋಳುಗಳ ನಟರಾಜನ ಶಿಲ್ಪವು ಭರತನಾಟ್ಯದ ೮೧ ನೃತ್ಯ ಮುದ್ರೆಗಳನ್ನು ಏಕಕಾಲದಲ್ಲಿ ಪ್ರದರ್ಶಿಸುತ್ತದೆ. ಕ್ರಿ.ಶ. ೬ನೇ ಶತಮಾನದ ಈ ಶಿಲ್ಪವನ್ನು ಕಣ್ತುಂಬಿಕೊಳ್ಳಲು ಬೆಳಗ್ಗೆ ೭:೦೦ ರಿಂದ ೯:೩೦ ರ ಸೂರ್ಯೋದಯ ಬೆಳಕಿನ ಸಮಯ ಅತಿ ಸೂಕ್ತ.'
        : 'The 18-armed dancing Shiva Nataraja in Badami Cave 1 exhibits 81 classical Bharatanatyam mudras. Carved in the late 6th century by the early Chalukyas, the best time to photograph it is between 7:00 AM and 9:30 AM when morning sunlight illuminates the verandah.';
    }
    return language === 'kn'
      ? 'ಬಾದಾಮಿಯಲ್ಲಿ ೪ ಮುಖ್ಯ ಗುಹೆಗಳಿವೆ: ಗುಹೆ ೧ (ಶೈವ/ನಟರಾಜ), ಗುಹೆ ೨ (ವೈಷ್ಣವ/ತ್ರಿವಿಕ್ರಮ), ಗುಹೆ ೩ (ಭವ್ಯ ವರಾಹ ಮತ್ತು ನರಸಿಂಹ, ಕ್ರಿ.ಶ. ೫೭೮), ಮತ್ತು ಗುಹೆ ೪ (ಜೈನ ತೀರ್ಥಂಕರರು). ಸಮಯ: ಬೆಳಗ್ಗೆ ೬:೦೦ ರಿಂದ ಸಂಜೆ ೬:೦೦. ಪ್ರವೇಶ ಶುಲ್ಕ: ಭಾರತೀಯರಿಗೆ ₹೨೫.'
      : 'Badami features four monumental rock-cut caves: Cave 1 (Shaivite Nataraja), Cave 2 (Trivikrama), Cave 3 (grand Vishnu/Varaha, 578 CE), and Cave 4 (Jain Tirthankaras). Open daily 6:00 AM – 6:00 PM; entry fee is ₹25 for Indians, ₹300 for foreigners.';
  }

  if (q.includes('pattadakal') || q.includes('ಪಟ್ಟದಕಲ್ಲು') || q.includes('unesco') || q.includes('virupaksha')) {
    return language === 'kn'
      ? 'ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣವಾಗಿದ್ದು, ಮಲಪ್ರಭಾ ನದಿಯ ದಂಡೆಯಲ್ಲಿದೆ. ಇಲ್ಲಿನ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯವನ್ನು ಕಂಚಿಯ ಪಲ್ಲವರ ಮೇಲಿನ ವಿಜಯದ ನೆನಪಿನಲ್ಲಿ ರಾಣಿ ಲೋಕಮಹಾದೇವಿಯು ಕ್ರಿ.ಶ. ೭೪೦ ರಲ್ಲಿ ನಿರ್ಮಿಸಿದಳು. ಇದು ಎಲ್ಲೋರಾದ ಕೈಲಾಸ ದೇವಾಲಯಕ್ಕೆ ಮಾದರಿಯಾಗಿದೆ.'
      : 'Pattadakal is a UNESCO World Heritage site situated along the Malaprabha River. Commissioned in 740 CE by Queen Lokamahadevi, the Virupaksha Temple marks the pinnacle of Chalukyan Dravida architecture and served as the architectural model for the Kailasa rock temple at Ellora.';
  }

  if (q.includes('aihole') || q.includes('ಐಹೊಳೆ') || q.includes('durga') || q.includes('ದುರ್ಗಾ')) {
    return language === 'kn'
      ? 'ಐಹೊಳೆಯನ್ನು "ಭಾರತೀಯ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ತೊಟ್ಟಿಲು" ಎಂದು ಕರೆಯಲಾಗುತ್ತದೆ. ಇಲ್ಲಿ ೧೨೦ ಕ್ಕೂ ಹೆಚ್ಚು ಪ್ರಾಚೀನ ದೇವಾಲಯಗಳಿವೆ. ಗಜಪೃಷ್ಠ (ಆನೆ ಬೆನ್ನಿನ ಆಕಾರದ) ದುರ್ಗಾ ದೇವಾಲಯವು ಜಗತ್ತಿನಲ್ಲೇ ಅತಿ ವಿಶಿಷ್ಟ ವಾಸ್ತುಶಿಲ್ಪ ಹೊಂದಿದೆ.'
      : 'Aihole is revered as the "Cradle of Indian Temple Architecture" featuring over 120 stone sanctuaries from 450–750 CE. Its famous Durga temple has a unique apsidal (horseshoe/gajaprishtha) ambulatory design resembling early Buddhist chaitya halls.';
  }

  if (q.includes('bhootanatha') || q.includes('ಭೂತನಾಥ') || q.includes('agastya') || q.includes('ಅಗಸ್ತ್ಯ') || q.includes('lake')) {
    return language === 'kn'
      ? 'ಅಗಸ್ತ್ಯ ಸರೋವರದ ದಂಡೆಯಲ್ಲಿರುವ ಭೂತನಾಥ ದೇವಾಲಯವು ಸಂಜೆಯ ಸೂರ್ಯಾಸ್ತಕ್ಕೆ ಅತ್ಯುತ್ತಮ ತಾಣವಾಗಿದೆ. ಸಂಜೆ ೫:೦೦ ಗಂಟೆಗೆ ಸರೋವರದ ನೀರಿನಲ್ಲಿ ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಬಂಡೆಗಳು ಮತ್ತು ದೇವಾಲಯದ ಸುವರ್ಣ ಪ್ರತಿಬಿಂಬ ಅಪೂರ್ವ ನೋಟ ನೀಡುತ್ತದೆ.'
      : 'Bhootanatha Temple sits on the eastern shore of sacred Agastya Lake. The best time to visit is around 5:00 PM during golden hour when the sandstone shrines cast amber reflections across the peaceful waters.';
  }

  if (q.includes('food') || q.includes('ಊಟ') || q.includes('rotti') || q.includes('ರೊಟ್ಟಿ') || q.includes('khanavali') || q.includes('ಖಾನಾವಳಿ')) {
    return language === 'kn'
      ? 'ಬಾದಾಮಿಯ ಸಾಂಪ್ರದಾಯಿಕ ಊಟ: ಬಿಸಿ ಜೋಳದ ರೊಟ್ಟಿ, ಎಣ್ಣೆಗಾಯಿ ಬದನೆಕಾಯಿ ಪಲ್ಯ, ಶೇಂಗಾ ಚಟ್ನಿ ಪುಡಿ, ಮೊಸರು, ಜುಣಕ ಮತ್ತು ಶೇಂಗಾ ಹೋಳಿಗೆ. ಬನಶಂಕರಿ ಖಾನಾವಳಿ ಅಥವಾ ಬಾದಾಮಿ ಸ್ಟೇಷನ್ ರಸ್ತೆಯ ಖಾನಾವಳಿಗಳಲ್ಲಿ ಅಪ್ಪಟ ಉತ್ತರ ಕರ್ನಾಟಕ ಊಟ ದೊರೆಯುತ್ತದೆ.'
      : 'Must-try authentic Uttara Karnataka cuisine in Badami: hot Jolada Rotti (sorghum flatbread) with Ennegayi (stuffed baby brinjal), Shenga chutney powder with fresh curd, and Shenga Holige. Head to traditional Lingayat Khanavalis near Station Road for unlimited authentic thalis.';
  }

  if (q.includes('ilkal') || q.includes('ಇಳಕಲ್') || q.includes('saree') || q.includes('ಸೀರೆ') || q.includes('handloom') || q.includes('ಕೈಮಗ್ಗ')) {
    return language === 'kn'
      ? 'ಇಳಕಲ್ ಸೀರೆಗಳು ಅವುಗಳ ಕೆಂಪು "ತೊಪೆತೆನೆ" (ಅರಮನೆ ಗೋಪುರ) ಪಲ್ಲು ಮತ್ತು "ಕೊಂಡಿ" ಕಲಾ ತಂತ್ರಜ್ಞಾನಕ್ಕೆ ಜಿಐ ಟ್ಯಾಗ್ (GI Tag) ಪಡೆದಿವೆ. ಇಳಕಲ್‌ನ ನೇಕಾರರ ಸಹಕಾರ ಸಂಘಗಳಿಂದ ನೇರವಾಗಿ ಶುದ್ಧ ರೇಷ್ಮೆ ಮತ್ತು ಖಣಗಳನ್ನು ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ ಖರೀದಿಸಬಹುದು.'
      : 'Ilkal Sarees are celebrated for their patented GI-tagged Topetenwe (palace tower) pallu and unique Kondi joint technique linking cotton body to pure silk pallu. You can visit the traditional weavers colony in Ilkal and Guledgudda to purchase authentic handloom sarees directly from artisan cooperatives.';
  }

  if (q.includes('best time') || q.includes('season') || q.includes('weather') || q.includes('ಯಾವಾಗ')) {
    return language === 'kn'
      ? 'ಬಾಗಲಕೋಟೆ ಪ್ರವಾಸಕ್ಕೆ ಅಕ್ಟೋಬರ್‌ನಿಂದ ಮಾರ್ಚ್ ಅತ್ಯುತ್ತಮ ಸಮಯ. ಈ ಸಮಯದಲ್ಲಿ ತಂಪು ಹವಾಮಾನವಿದ್ದು, ಶಿಲಾ ತಾಣಗಳನ್ನು ಆರಾಮವಾಗಿ ವೀಕ್ಷಿಸಬಹುದು. ಬೇಸಿಗೆಯಲ್ಲಿ (ಏಪ್ರಿಲ್-ಮೇ) ತಾಪಮಾನ ಹೆಚ್ಚಿರುತ್ತದೆ.'
      : 'The ideal time to visit Bagalkote is from October to March, when Deccan temperatures range between 20°C and 30°C. Summers (April–May) can exceed 40°C, while post-monsoon (August–October) fills Agastya Lake beautifully.';
  }

  return language === 'kn'
    ? 'ಬಾಗಲಕೋಟೆ ಯಾತ್ರಿಯಲ್ಲಿ ಬಾದಾಮಿ ಗುಹೆಗಳು, ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ತಾಣ, ಐಹೊಳೆ, ಭೂತನಾಥ ದೇವಾಲಯ, ಮಹಾಕೂಟ, ಕುಡಲಸಂಗಮ ಅಥವಾ ಇಳಕಲ್ ಸೀರೆಗಳ ಬಗ್ಗೆ ನಿಮಗೆ ಯಾವುದೇ ಮಾಹಿತಿ ಬೇಕಿದ್ದರೂ ಕೇಳಬಹುದು!'
    : 'Welcome to Bagalkote YatriAI! Feel free to ask about Badami cave sculptures, UNESCO Pattadakal, Aihole architecture, Bhootanatha sunset, local Jolada Rotti dining, or direct Ilkal handloom purchases.';
}

