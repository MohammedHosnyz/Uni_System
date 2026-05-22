'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to check if the component is running on the client side
 * Useful for preventing hydration mismatches when using browser-only APIs
 * 
 * @returns boolean - true if running on client, false during SSR
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}