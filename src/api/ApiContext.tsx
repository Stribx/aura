import { createContext, useContext } from 'react';
import type { MusicApiService } from './types';

export const ApiContext = createContext<MusicApiService | undefined>(undefined);

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
}
