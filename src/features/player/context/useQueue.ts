import { useContext } from 'react';
import { QueueContext } from './QueueContext';

export function useQueue() {
    const context = useContext(QueueContext);
    if (context === undefined) {
        throw new Error('useQueue must be used within a MusicProvider');
    }
    return context;
}
