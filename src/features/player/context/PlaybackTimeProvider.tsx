import { useState, useMemo, type ReactNode } from 'react';
import { PlaybackTimeContext } from './PlaybackTimeContext';

export function PlaybackTimeProvider({ children }: { children: ReactNode }) {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const contextValue = useMemo(() => ({
        currentTime,
        duration,
        reportTime: setCurrentTime,
        reportDuration: setDuration,
    }), [currentTime, duration]);

    return (
        <PlaybackTimeContext.Provider value={contextValue}>
            {children}
        </PlaybackTimeContext.Provider>
    );
}
