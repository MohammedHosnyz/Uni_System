'use client';

import { useState, useEffect } from 'react';
import { safeLocalStorage } from './safeLocalStorage';

export function useI18n() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');

  useEffect(() => {
    const savedLocale = (safeLocalStorage.getItem('locale') as 'ar' | 'en') || 'ar';
    setLocale(savedLocale);

    const onLocaleChange = (e: Event) => {
      const newLocale = (e as CustomEvent<'ar' | 'en'>).detail;
      setLocale(newLocale);
    };

    window.addEventListener('localeChange', onLocaleChange);
    return () => window.removeEventListener('localeChange', onLocaleChange);
  }, []);

  const t = (arValue: any, enValue: any) => {
    return locale === 'ar' ? arValue : enValue;
  };

  return { t, locale };
}
