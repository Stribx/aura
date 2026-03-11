import { useContext } from 'react';
import { MusicContext } from './MusicContext';

export function useMusic() {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
}
