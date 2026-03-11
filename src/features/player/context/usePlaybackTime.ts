import { useContext } from 'react';
import { PlaybackTimeContext } from './PlaybackTimeContext';

export function usePlaybackTime() {
    const context = useContext(PlaybackTimeContext);
    if (context === undefined) {
        throw new Error('usePlaybackTime must be used within a PlaybackTimeProvider');
    }
    return context;
}
