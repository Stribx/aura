import { useContext } from 'react';
import { PlaybackContext } from './PlaybackContext';

export function usePlayback() {
    const context = useContext(PlaybackContext);
    if (context === undefined) {
        throw new Error('usePlayback must be used within a MusicProvider');
    }
    return context;
}
