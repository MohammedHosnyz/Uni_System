'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cairo } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { theme } from '@/lib/theme';

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '600', '700'] });

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const WELCOME = 'مرحباً! أنا المساعد الأكاديمي لكلية الحاسبات والمعلومات 🎓\n\nيمكنني مساعدتك في:\n• شروط القبول والتسجيل\n• الدرجات والمعدل التراكمي\n• قوانين الحضور والغياب\n• إجراءات التخرج\n• الرسوم الدراسية';

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: WELCOME, timestamp: new Date() },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 350);
  }, [isOpen]);

  
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      
      if (panelRef.current && !panelRef.current.contains(target)) {
        onClose();
      }
    };
    
    const t = setTimeout(() => document.addEventListener('mousedown', handler), 100);
    return () => { clearTimeout(t); document.removeEventListener('mousedown', handler); };
  }, [isOpen, onClose]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: inputMessage.trim(), timestamp: new Date() };
    const loadingMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: '', timestamp: new Date(), isLoading: true };
    setMessages(prev => [...prev, userMsg, loadingMsg]);
    setInputMessage('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content }),
      });
      const data = await res.json();
      setMessages(prev => [...prev.slice(0, -1), {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: data.success ? data.response : (data.response || data.error || 'حدث خطأ، حاول مرة أخرى.'),
        timestamp: new Date(),
      }]);
    } catch {
      setMessages(prev => [...prev.slice(0, -1), {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'تعذّر الاتصال بالخادم، حاول مرة أخرى.',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmClear = async () => {
    await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'clear' }),
    }).catch(() => {});
    setMessages([{ id: Date.now().toString(), role: 'assistant', content: WELCOME, timestamp: new Date() }]);
    setShowClearConfirm(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.22 }}
            className={`${cairo.className} fixed bottom-[520px] left-6 z-[60] flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-lg text-sm font-semibold overflow-hidden`}
            style={{ background: '#166534', color: '#dcfce7', border: '1px solid #15803d', minWidth: 220 }}
            dir="rtl"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            تم مسح المحادثة وإعادتها من البداية
            <motion.div
              className="absolute bottom-0 right-0 h-0.5"
              style={{ background: '#4ade80' }}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 3, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          key="chat-panel"
          initial={{ opacity: 0, y: 32, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32, scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          className={`${cairo.className} fixed bottom-24 left-6 z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden`}
          style={{
            width: 'min(440px, calc(100vw - 24px))',
            height: 'min(620px, calc(100vh - 120px))',
            background: theme.white,
            border: `1.5px solid ${theme.border}`,
          }}
          dir="rtl"
        >
          
          <div className="flex items-center gap-3 px-4 py-3 shrink-0" style={{ background: theme.primary }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0" style={{ background: `${theme.text}18` }}>
              🎓
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm leading-tight" style={{ color: theme.text }}>المساعد الأكاديمي</p>
              <p className="text-xs opacity-70" style={{ color: theme.text }}>كلية الحاسبات والمعلومات</p>
            </div>

            
            <div className="relative">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowClearConfirm(v => !v)}
                className="h-7 w-7 p-0 rounded-full hover:opacity-80"
                style={{ background: `${theme.text}15`, color: theme.text }}
                title="مسح المحادثة"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                </svg>
              </Button>

              
              <AnimatePresence>
                {showClearConfirm && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-9 left-0 z-10 rounded-xl shadow-lg p-3 w-44"
                    style={{ background: theme.white, border: `1px solid ${theme.border}` }}
                    dir="rtl"
                  >
                    <p className="text-xs font-semibold mb-2.5" style={{ color: theme.text }}>مسح كل المحادثة؟</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={confirmClear}
                        className="flex-1 h-7 text-xs font-bold rounded-lg"
                        style={{ background: '#DC2626', color: '#fff', border: 'none' }}
                      >
                        مسح
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowClearConfirm(false)}
                        className="flex-1 h-7 text-xs rounded-lg"
                        style={{ borderColor: theme.border, color: theme.text }}
                      >
                        إلغاء
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="h-7 w-7 p-0 rounded-full hover:opacity-80"
              style={{ background: `${theme.text}15`, color: theme.text }}
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </Button>
          </div>

          
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3" style={{ background: theme.background }}>
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 text-sm" style={{ background: theme.primary }}>
                      🎓
                    </div>
                  )}
                  <div
                    className="max-w-[78%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={
                      msg.role === 'user'
                        ? { background: theme.primary, color: theme.text, borderBottomRightRadius: 4 }
                        : { background: theme.white, color: theme.text, border: `1px solid ${theme.border}`, borderBottomLeftRadius: 4 }
                    }
                  >
                    {msg.isLoading ? (
                      <div className="flex gap-1 items-center h-5 px-1">
                        {[0, 1, 2].map(d => (
                          <motion.span
                            key={d}
                            className="w-1.5 h-1.5 rounded-full block"
                            style={{ background: theme.primary }}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                          />
                        ))}
                      </div>
                    ) : (
                      <>
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                        <p className="text-[10px] mt-1.5 opacity-40 text-left">
                          {msg.timestamp.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          
          <div className="px-3 py-2.5 flex gap-2 items-center shrink-0" style={{ background: theme.white, borderTop: `1px solid ${theme.border}` }}>
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="اكتب سؤالك..."
              disabled={isLoading}
              className="flex-1 text-sm rounded-xl h-9 focus-visible:ring-1 disabled:opacity-50"
              style={{
                background: theme.surface,
                color: theme.text,
                border: `1px solid ${theme.border}`,
                direction: 'rtl',
              }}
            />
            <Button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              size="sm"
              className="w-9 h-9 p-0 rounded-xl shrink-0 disabled:opacity-40"
              style={{ background: theme.primary, border: 'none' }}
            >
              <svg className="w-4 h-4" fill="none" stroke={theme.text} viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
