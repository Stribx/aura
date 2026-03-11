import { useRef, useEffect, useMemo } from 'react';
import type { Song } from '@/types';

export function useQueuePanel(
    queue: Song[],
    currentSong: Song | null,
    onClose: () => void
) {
    const panelRef = useRef<HTMLDivElement>(null);
    const currentRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to current song when panel opens
    useEffect(() => {
        setTimeout(() => {
            currentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }, []);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const currentIndex = useMemo(() => {
        if (!currentSong) return -1;
        return queue.findIndex(s => s.id === currentSong.id);
    }, [queue, currentSong]);

    const upNext = useMemo(() => {
        if (currentIndex === -1) return queue;
        return queue.slice(currentIndex + 1);
    }, [queue, currentIndex]);

    const played = useMemo(() => {
        if (currentIndex === -1) return [];
        return queue.slice(0, currentIndex);
    }, [queue, currentIndex]);

    return {
        panelRef,
        currentRef,
        upNext,
        played,
    };
}
