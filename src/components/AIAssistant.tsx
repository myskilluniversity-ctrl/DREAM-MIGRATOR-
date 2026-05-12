import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Loader2, Minimize2, ArrowRight, RotateCcw, Languages, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { streamChatWithMaya } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const LANGUAGES = [
  { code: 'English', name: 'English' },
  { code: 'Hindi', name: 'हिंदी' },
  { code: 'Bengali', name: 'বাংলা' },
  { code: 'Telugu', name: 'తెలుగు' },
  { code: 'Marathi', name: 'मराठी' },
  { code: 'Tamil', name: 'தமிழ்' },
  { code: 'Gujarati', name: 'ગુજરાતી' },
  { code: 'Kannada', name: 'ಕನ್ನಡ' },
  { code: 'Malayalam', name: 'മലയാളം' },
  { code: 'Punjabi', name: 'ਪੰਜਾਬੀ' },
];

const SUGGESTED_PROMPTS = [
  "How to get a UK student visa?",
  "Best universities for MBA in USA?",
  "Steps to write a strong SOP",
  "Migration costs to Canada"
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('English');
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  const initialMessage: Message = { 
    role: 'model', 
    text: 'Namaste, traveler. I am **Maya**. How can I assist your migration journey today?' 
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async (messageText: string = input) => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: trimmedMessage }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    // Add a placeholder message for the model that we'll stream into
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    await streamChatWithMaya(
      trimmedMessage, 
      language, 
      history, 
      (chunkText) => {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { 
            role: 'model', 
            text: chunkText 
          };
          return newMessages;
        });
      }
    );
    
    setIsLoading(false);
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  const clearChat = () => {
    setMessages([initialMessage]);
    setInput('');
  };

  const currentLangName = LANGUAGES.find(l => l.code === language)?.name || 'English';

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[400px] h-[600px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between shadow-lg relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="text-slate-900 w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xs uppercase tracking-widest text-brand-500">Maya Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">Universal Protocol</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <button 
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest text-white/80"
                  >
                    <Languages className="w-3 h-3" />
                    {currentLangName}
                    <ChevronDown className={`w-3 h-3 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {showLangMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 w-32 bg-slate-800 rounded-xl shadow-xl overflow-hidden border border-white/10"
                      >
                        {LANGUAGES.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code);
                              setShowLangMenu(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors ${
                              language === lang.code ? 'text-brand-500' : 'text-white/60'
                            }`}
                          >
                            {lang.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {messages.length > 1 && (
                  <button 
                    onClick={clearChat}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60"
                    title="Clear Chat"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30"
              onClick={() => setShowLangMenu(false)}
            >
              {messages.map((m, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-slate-900 text-white rounded-tr-none' 
                      : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                  }`}>
                    <div className={`prose prose-sm prose-slate max-w-none prose-p:leading-relaxed prose-p:my-0 prose-headings:text-slate-900 prose-headings:mt-2 prose-headings:mb-1 prose-strong:text-inherit prose-ul:my-2 prose-li:my-0 ${
                      m.role === 'user' ? 'prose-invert' : ''
                    }`}>
                      <ReactMarkdown>{m.text}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && messages[messages.length - 1]?.text === '' && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                    <div className="flex gap-1">
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Maya is thinking...</span>
                  </div>
                </div>
              )}

              {messages.length === 1 && !isLoading && (
                <div className="pt-4 space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Suggested Queries</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_PROMPTS.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="text-xs px-4 py-2 bg-white border border-slate-200 rounded-full hover:border-brand-500 hover:text-brand-600 transition-all text-slate-600 font-medium flex items-center gap-2 group shadow-sm"
                      >
                        {prompt}
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form 
              onSubmit={onFormSubmit}
              className="p-4 border-t border-slate-100 bg-white"
            >
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={`Ask Maya in ${currentLangName}...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-brand-500 outline-none transition-all font-medium text-sm text-slate-900 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-brand-500 hover:text-slate-900 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-lg shadow-slate-900/10"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all ${
          isOpen ? 'bg-slate-900 text-white rotate-90' : 'bg-brand-500 text-slate-900'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-slate-900 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce border-2 border-white">
            1
          </div>
        )}
      </motion.button>
    </div>
  );
}
