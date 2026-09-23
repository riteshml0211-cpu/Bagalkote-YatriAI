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

      if (!response.ok) {
        throw new Error('Chat API returned error');
      }

      const data = await response.json();
      const assistantMsg: ChatMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || 'Information retrieved.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text:
          language === 'kn'
            ? 'ಕ್ಷಮಿಸಿ, ಮಾಹಿತಿಯನ್ನು ತರಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ಬಾದಾಮಿ ಗುಹೆಗಳು, ಪಟ್ಟದಕಲ್ಲು ಅಥವಾ ಇಳಕಲ್ ಸೀರೆಗಳ ಬಗ್ಗೆ ಮತ್ತೆ ಕೇಳಿ.'
            : 'Apologies, I encountered an issue retrieving that. Please ask about Badami caves, Pattadakal, Aihole, or Ilkal handlooms.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
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
