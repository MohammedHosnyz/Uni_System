'use client';

import { useState, useEffect, useCallback } from 'react';
import { safeLocalStorage } from '@/lib/safeLocalStorage';

export function useDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    
    const saved = safeLocalStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved !== null ? saved === 'true' : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);

    
    const handler = (e: Event) => {
      const next = (e as CustomEvent<boolean>).detail;
      setDark(next);
      document.documentElement.classList.toggle('dark', next);
    };
    window.addEventListener('darkModeChange', handler);
    return () => window.removeEventListener('darkModeChange', handler);
  }, []);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark');
    safeLocalStorage.setItem('darkMode', String(next));
    document.documentElement.classList.toggle('dark', next);
    setDark(next);
    window.dispatchEvent(new CustomEvent('darkModeChange', { detail: next }));
  }, []);

  return { dark, toggle };
}
