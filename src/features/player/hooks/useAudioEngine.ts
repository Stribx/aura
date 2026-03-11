import { useEffect, useRef, useState } from 'react';
import { usePlaybackTime } from '../context/usePlaybackTime';
import { formatTime } from '@/utils/formatTime';

interface Options {
    src: string | undefined;
    songKey: number;
    isPlaying: boolean;
    volume: number;
}

export function useAudioEngine({ src, songKey, isPlaying, volume }: Options) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    
    const { reportTime, reportDuration } = usePlaybackTime();

    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMetadataLoaded, setIsMetadataLoaded] = useState(false);

    // Sync state during render when source changes to avoid set-state-in-effect errors
    const [prevSrc, setPrevSrc] = useState(src);
    const [prevSongKey, setPrevSongKey] = useState(songKey);

    if (src !== prevSrc || songKey !== prevSongKey) {
        setPrevSrc(src);
        setPrevSongKey(songKey);
        setProgress(0);
        setDuration(0);
        setIsMetadataLoaded(false);
    }

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume / 100;
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !src) return;
        // The state reset is now handled during render.
        // Side effects like pause/load stay in useEffect.
        audio.pause();
        audio.load();
    }, [src, songKey]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !isMetadataLoaded) return;
        if (isPlaying) {
            audio.play().catch((e) => { if (e.name !== 'AbortError') console.error(e); });
        } else {
            audio.pause();
        }
    }, [isPlaying, isMetadataLoaded]);

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (!audio || !isMetadataLoaded) return;
        const next = (audio.currentTime / audio.duration) * 100;
        setProgress(isNaN(next) ? 0 : next);
        reportTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
        const audio = audioRef.current;
        if (!audio) return;
        const dur = isNaN(audio.duration) ? 0 : audio.duration;
        setDuration(dur);
        setIsMetadataLoaded(true);
        reportDuration(dur);
        if (isPlaying) {
            audio.play().catch((e) => { if (e.name !== 'AbortError') console.error(e); });
        }
    };

    const handleProgressChange = (value: number) => {
        setProgress(value);
        if (audioRef.current && isMetadataLoaded) {
            audioRef.current.currentTime = (value / 100) * duration;
        }
    };

    return {
        audioRef,
        progress,
        duration,
        isMetadataLoaded,
        currentTimeLabel: isMetadataLoaded ? formatTime((progress / 100) * duration) : '0:00',
        durationLabel:    isMetadataLoaded ? formatTime(duration) : '--:--',
        handleTimeUpdate,
        handleLoadedMetadata,
        handleProgressChange,
    };
}
