import { createContext } from 'react';

export interface PlaybackTimeContextType {
    currentTime: number;
    duration: number;
    reportTime: (time: number) => void;
    reportDuration: (duration: number) => void;
}

export const PlaybackTimeContext = createContext<PlaybackTimeContextType | undefined>(undefined);
