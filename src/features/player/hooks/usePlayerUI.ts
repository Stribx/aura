import { useState, useCallback } from 'react';

export function usePlayerUI() {
    const [isMaximized, setIsMaximized] = useState(false);
    const [isQueueOpen, setIsQueueOpen] = useState(false);
    const [volume, setVolume] = useState(80);
    const [prevVolume, setPrevVolume] = useState(80);

    const openMaximized = useCallback(() => setIsMaximized(true), []);
    const closeMaximized = useCallback(() => setIsMaximized(false), []);
    const toggleQueue = useCallback(() => setIsQueueOpen(prev => !prev), []);
    const closeQueue = useCallback(() => setIsQueueOpen(false), []);

    const toggleMute = useCallback(() => {
        if (volume > 0) {
            setPrevVolume(volume);
            setVolume(0);
        } else {
            setVolume(prevVolume);
        }
    }, [volume, prevVolume]);

    return {
        isMaximized,
        isQueueOpen,
        volume,
        setVolume,
        openMaximized,
        closeMaximized,
        toggleQueue,
        closeQueue,
        toggleMute,
    };
}
