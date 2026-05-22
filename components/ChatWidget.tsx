'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@/lib/theme';

interface Message {
  role: 'user' | 'bot';
  text: string;
  time: string;
}

const MaterialIcon = ({ name, className = '' }: { name: string; className?: string }) => (
  <span className={`material-symbols-outlined leading-none select-none ${className}`} aria-hidden="true">{name}</span>
);

function formatText(text: string) {
  
  return text.split('\n').map((line, i) => {
    const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return <p key={i} className="mb-0.5 last:mb-0" dangerouslySetInnerHTML={{ __html: bold || '&nbsp;' }} />;
  });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: 'مرحباً! أنا مساعد كلية الحاسبات والمعلومات 🎓\nاسألني عن القبول، المقررات، الدرجات، أو أي شيء أكاديمي.',
      time: now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function now() {
    return new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text, time: now() }]);
    setLoading(true);
    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.response || 'حدث خطأ، حاول مرة أخرى.', time: now() }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'تعذّر الاتصال بالخادم، حاول مرة أخرى.', time: now() }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center"
        style={{ background: theme.primary }}
        aria-label="فتح المساعد الذكي"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <MaterialIcon name={open ? 'close' : 'smart_toy'} className="text-[26px] text-[#2E2210]" />
          </motion.span>
        </AnimatePresence>
      </motion.button>

      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="fixed bottom-24 left-6 z-50 w-[340px] sm:w-[380px] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ background: theme.white, border: `1.5px solid ${theme.border}`, maxHeight: '520px' }}
            dir="rtl"
          >
            
            <div className="flex items-center gap-3 px-4 py-3" style={{ background: theme.primary }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${theme.text}20` }}>
                <MaterialIcon name="smart_toy" className="text-[20px] text-[#2E2210]" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm leading-tight" style={{ color: theme.text }}>المساعد الأكاديمي</p>
                <p className="text-xs" style={{ color: theme.text, opacity: 0.7 }}>كلية الحاسبات والمعلومات</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity"
                style={{ background: `${theme.text}15` }}
              >
                <MaterialIcon name="close" className="text-[18px] text-[#2E2210]" />
              </button>
            </div>

            
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3" style={{ background: theme.background }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1" style={{ background: theme.primary }}>
                      <MaterialIcon name="smart_toy" className="text-[14px] text-[#2E2210]" />
                    </div>
                  )}
                  <div
                    className="max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed"
                    style={
                      msg.role === 'user'
                        ? { background: theme.primary, color: theme.text, borderBottomRightRadius: 4 }
                        : { background: theme.white, color: theme.text, border: `1px solid ${theme.border}`, borderBottomLeftRadius: 4 }
                    }
                  >
                    <div className="text-xs mb-1">{formatText(msg.text)}</div>
                    <p className="text-[10px] mt-1 opacity-50 text-left">{msg.time}</p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: theme.primary }}>
                    <MaterialIcon name="smart_toy" className="text-[14px] text-[#2E2210]" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl" style={{ background: theme.white, border: `1px solid ${theme.border}` }}>
                    <div className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map(d => (
                        <motion.span
                          key={d}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: theme.primary }}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            
            <div className="px-3 py-2.5 flex gap-2 items-center" style={{ background: theme.white, borderTop: `1px solid ${theme.border}` }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="اكتب سؤالك..."
                className="flex-1 text-sm px-3 py-2 rounded-xl outline-none"
                style={{ background: theme.surface, color: theme.text, border: `1px solid ${theme.border}` }}
              />
              <motion.button
                onClick={send}
                disabled={!input.trim() || loading}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-40 transition-opacity"
                style={{ background: theme.primary }}
              >
                <MaterialIcon name="send" className="text-[18px] text-[#2E2210]" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
