import { createContext } from 'react';
import type { Song } from '@/types';

export interface QueueContextType {
    queue: Song[];
    shuffle: boolean;
    toggleShuffle: () => void;
    addToQueue: (song: Song) => void;
    addPlaylistToQueue: (songs: Song[]) => void;
    playNext: () => void;
    playPrev: () => void;
}

export const QueueContext = createContext<QueueContextType | undefined>(undefined);
