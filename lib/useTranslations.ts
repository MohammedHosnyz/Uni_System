'use client';

import { useState, useEffect } from 'react';
import arTranslations from '@/messages/ar.json';
import enTranslations from '@/messages/en.json';
import { safeLocalStorage } from './safeLocalStorage';

type Translations = typeof arTranslations;

export function useTranslations() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar'); 
  const [translations, setTranslations] = useState<Translations>(arTranslations);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const savedLocale = (safeLocalStorage.getItem('locale') as 'ar' | 'en') || 'ar';
    setLocale(savedLocale);
    setTranslations(savedLocale === 'ar' ? arTranslations : enTranslations);
    document.documentElement.lang = savedLocale;
    document.documentElement.dir = savedLocale === 'ar' ? 'rtl' : 'ltr';


    const onLocaleChange = (e: Event) => {
      const newLocale = (e as CustomEvent<'ar' | 'en'>).detail;
      setLocale(newLocale);
      setTranslations(newLocale === 'ar' ? arTranslations : enTranslations);
      document.documentElement.lang = newLocale;
      document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    };

    window.addEventListener('localeChange', onLocaleChange);
    return () => window.removeEventListener('localeChange', onLocaleChange);
  }, []);


  const switchLocale = (newLocale: 'ar' | 'en') => {
    setLocale(newLocale);
    if (isClient) {
      safeLocalStorage.setItem('locale', newLocale);

      window.dispatchEvent(new CustomEvent('localeChange', { detail: newLocale }));
    }
  };

  return {
    t: translations,
    locale,
    switchLocale,
    isClient, 
  };
}
