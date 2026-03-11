import { createContext } from 'react';
import type { Song, RepeatMode } from '@/types';

export interface PlaybackContextType {
    isPlaying: boolean;
    currentSong: Song | null;
    songKey: number;
    repeat: RepeatMode;
    isLyricsOpen: boolean;
    togglePlay: () => void;
    toggleLyrics: () => void;
    cycleRepeat: () => void;
    playSong: (song: Song, newQueue?: Song[]) => void;
}

export const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);
