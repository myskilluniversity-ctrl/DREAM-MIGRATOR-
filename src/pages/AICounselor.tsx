import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Languages, 
  ChevronDown, 
  RotateCcw, 
  BookOpen, 
  Compass, 
  History,
  TrendingUp,
  BrainCircuit,
  MessageSquare,
  ArrowRight,
  Info
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { streamChatWithMaya } from '../services/geminiService';
import SEO from '../components/SEO';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const LANGUAGES = [
  { code: 'English', name: 'English' },
  { code: 'Hindi', name: 'हिंदी' },
  { code: 'Punjabi', name: 'ਪੰਜਾਬੀ' },
  { code: 'Telugu', name: 'తెలుగు' },
  { code: 'Tamil', name: 'தமிழ்' },
  { code: 'Gujarati', name: 'ગુજરાતી' },
];

const QUICK_ACTIONS = [
  { title: 'Visa Probability', prompt: 'What are my chances of getting a UK student visa with a 2-year gap?', icon: TrendingUp },
  { title: 'Course Suggestion', prompt: 'Suggest me top 5 Masters in Data Science courses in Germany for international students.', icon: BookOpen },
  { title: 'SOP Strategy', prompt: 'How should I structure my SOP for a Canadian University to show intent of return?', icon: BrainCircuit },
  { title: 'Cost of Living', prompt: 'Compare cost of living for a student in Melbourne vs Sydney.', icon: Compass },
];

export default function AICounselor() {
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('English');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: 'Hello! I am Maya, your AI Migration Architect. I have been trained on thousands of successful visa applications and university admissions. \n\nHow can I help you design your international future today?' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (messageText: string = input) => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage || isLoading) return;

    setInput('');
    const newUserMessage: Message = { role: 'user', text: trimmedMessage };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

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
    setMessages([{ 
      role: 'model', 
      text: 'Let\'s start fresh. What destination or career goal is on your mind?' 
    }]);
  };

  const currentLangName = LANGUAGES.find(l => l.code === language)?.name || 'English';

  return (
    <div className="pt-24 min-h-screen bg-slate-50 flex flex-col">
      <SEO 
        title="AI Counselor Maya | Personalized Migration Advice"
        description="Talk to Maya, our advanced AI Counselor for instant answers about visas, universities, costs, and career paths across the globe."
      />

      <div className="max-w-7xl mx-auto w-full px-6 flex-1 flex flex-col py-8 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-12rem)] flex-1 overflow-hidden">
          
          {/* Left Panel: Context & Quick Actions */}
          <div className="hidden lg:flex flex-col gap-6 w-80 shrink-0">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-brand-500 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h1 className="font-display font-black text-slate-900 text-lg leading-tight tracking-tight">AI Counsel Maya</h1>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Online · V4.2
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Quick Scans</p>
                {QUICK_ACTIONS.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(action.prompt)}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-50 transition-all group flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-slate-50 group-hover:bg-brand-100 rounded-lg flex items-center justify-center transition-colors">
                      <action.icon className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">{action.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden flex-1 shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500 opacity-10 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="relative z-10 flex flex-col h-full uppercase tracking-tighter">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-4 h-4 text-brand-500" />
                  <span className="text-xs font-bold tracking-widest">Capabilities</span>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[10px] font-medium leading-relaxed italic">
                    "I can break down post-graduation work permit rules for over 25 countries."
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[10px] font-medium leading-relaxed italic">
                    "I analyze your profile against university entry requirements in real-time."
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[10px] font-medium leading-relaxed italic">
                    "Available in 10+ Indian languages for comfortable conversation."
                  </div>
                </div>
                <button 
                   onClick={() => window.location.href='/contact'}
                   className="w-full py-3 bg-brand-500 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-400 transition-all mt-6"
                >
                  Book Human Expert
                </button>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 bg-white rounded-[40px] border border-slate-100 shadow-2xl flex flex-col relative overflow-hidden h-full">
            
            {/* Mobile Header */}
            <div className="lg:hidden p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                   <h3 className="font-bold text-slate-900">Maya AI</h3>
                   <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active</span>
                </div>
              </div>
              <button 
                onClick={clearChat}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                <History className="w-5 h-5" />
              </button>
            </div>

            {/* Language & Tools Bar */}
            <div className="bg-slate-50/50 px-6 py-3 border-b border-slate-100 flex items-center justify-between relative">
               <div className="flex items-center gap-4">
                  <div className="relative">
                    <button 
                      onClick={() => setShowLangMenu(!showLangMenu)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:border-brand-500 transition-all text-xs font-bold text-slate-600"
                    >
                      <Languages className="w-3.5 h-3.5 text-brand-600" />
                      {currentLangName}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {showLangMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute top-full left-0 mt-2 w-36 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 z-50 p-1"
                        >
                          {LANGUAGES.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setLanguage(lang.code);
                                setShowLangMenu(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
                                language === lang.code ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:bg-slate-50'
                              }`}
                            >
                              {lang.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="h-4 w-px bg-slate-200 hidden sm:block" />
                  <span className="hidden sm:inline text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Experimental Migration Brain V2
                  </span>
               </div>
               
               <div className="flex items-center gap-2">
                  <button 
                    onClick={clearChat}
                    className="p-2 text-slate-400 hover:text-brand-600 transition-colors"
                    title="Reset Conversation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
               </div>

               {/* Streaming Progress Bar */}
               <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-100 overflow-hidden"
                  >
                    <motion.div 
                      initial={{ left: "-100%" }}
                      animate={{ left: "100%" }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5, 
                        ease: "linear" 
                      }}
                      className="absolute top-0 bottom-0 w-1/3 bg-brand-500 shadow-[0_0_8px_rgba(255,190,0,0.8)]"
                    />
                  </motion.div>
                )}
               </AnimatePresence>
            </div>

            {/* Messages Scroll Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8"
              onClick={() => setShowLangMenu(false)}
            >
              <AnimatePresence>
                {messages.map((m, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-4 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center shadow-lg transform translate-y-1 ${
                        m.role === 'user' ? 'bg-slate-900 text-white' : 'bg-brand-500 text-slate-900 border-2 border-white'
                      }`}>
                        {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                      </div>
                      
                      <div className={`p-6 rounded-[30px] text-sm leading-relaxed shadow-sm ${
                        m.role === 'user' 
                          ? 'bg-slate-900 text-white rounded-tr-none' 
                          : 'bg-slate-50/80 border border-slate-100 text-slate-700 rounded-tl-none font-medium'
                      }`}>
                        <div className={`prose prose-sm max-w-none prose-p:leading-relaxed prose-headings:text-slate-900 prose-headings:font-black prose-strong:text-brand-700 prose-ul:list-disc prose-li:my-1 ${
                          m.role === 'user' ? 'prose-invert prose-strong:text-brand-500' : ''
                        }`}>
                          <ReactMarkdown>{m.text}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && messages[messages.length - 1]?.text === '' && (
                <div className="flex justify-start">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-brand-500 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                      <Sparkles className="w-5 h-5 text-slate-900" />
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-[30px] rounded-tl-none shadow-sm flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-2 h-2 bg-brand-500 rounded-full" />
                        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-brand-500 rounded-full" />
                        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-brand-500 rounded-full" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Architecting your answer...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Floating Box */}
            <div className="p-6 md:p-10 border-t border-slate-100 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
              {messages.length === 1 && !isLoading && (
                 <div className="flex flex-wrap gap-2 mb-6 lg:hidden">
                    {QUICK_ACTIONS.slice(0, 2).map((a, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleSend(a.prompt)}
                        className="text-[10px] font-bold px-4 py-2 bg-slate-50 rounded-full border border-slate-100 text-slate-500"
                      >
                        {a.title}
                      </button>
                    ))}
                 </div>
              )}

              <form 
                onSubmit={onFormSubmit}
                className="relative group max-w-4xl mx-auto"
              >
                <div className="absolute inset-0 bg-brand-500/5 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={`Ask Maya anything... (e.g. ${QUICK_ACTIONS[0].title})`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full pl-8 pr-16 py-6 bg-slate-50 border-2 border-slate-100 rounded-[30px] focus:bg-white focus:border-brand-500 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-400 shadow-sm"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-3 w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-brand-500 hover:text-slate-900 transition-all active:scale-95 disabled:opacity-30 disabled:scale-100 shadow-xl"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
              <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                 <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-3 h-3" />
                    Secure Channel
                 </div>
                 <div className="w-1 h-1 bg-slate-300 rounded-full" />
                 <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-brand-500" />
                    AI Reasoning
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
