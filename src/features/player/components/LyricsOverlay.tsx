import { useRef, useEffect, useMemo } from 'react';
import { IconX } from '@tabler/icons-react';
import { useMusic } from '../context/useMusic';
import { usePlaybackTime } from '../context/usePlaybackTime';

const mockLyrics = [
    "Yeah, I've been feeling like this for a while",
    "Lost in the rhythm, lost in the style",
    "Every time I close my eyes, I see your face",
    "Dancing in the neon lights, taking up space",
    "",
    "[Chorus]",
    "And we go higher than the moon tonight",
    "Chasing shadows in the fading light",
    "Got this feeling that we can't ignore",
    "Just keep moving, leave it on the floor",
    "",
    "Heartbeats syncing to the bass so deep",
    "Promises we made, the ones we keep",
    "Got no worries, let the music play",
    "Washing all the doubts and fears away",
    "",
    "Every second is a brand new start",
    "Fire burning deep inside my heart",
    "Nothing else matters when you're by my side",
    "Together we're riding this endless ride",
    "",
    "[Chorus]",
    "And we go higher than the moon tonight",
    "Chasing shadows in the fading light",
    "Got this feeling that we can't ignore",
    "Just keep moving, leave it on the floor",
    "",
    "Yeah, just leave it on the floor",
    "Oh, keep moving",
    "Leave it on the floor",
];

export function LyricsOverlay() {
    const { isLyricsOpen, toggleLyrics, currentSong } = useMusic();
    const { currentTime, duration } = usePlaybackTime();
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollProgress = useMemo(() => {
        if (!duration) return 0;
        return Math.min(currentTime / duration, 1);
    }, [currentTime, duration]);

    useEffect(() => {
        if (!isLyricsOpen) return;
        const container = containerRef.current;
        if (!container) return;

        const maxScroll = container.scrollHeight - container.clientHeight;
        const targetScroll = scrollProgress * maxScroll * 0.9;

        container.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }, [isLyricsOpen, scrollProgress]);

    if (!isLyricsOpen) return null;

    return (
        <div className="fixed inset-0 z-40 pb-24 flex flex-col bg-gray-950/90 backdrop-blur-3xl animate-in fade-in duration-300">
            <div className="flex items-center justify-between p-6 md:p-10 shrink-0">
                <div className="flex items-center space-x-4">
                    {currentSong && (
                        <img
                            src={currentSong.cover}
                            alt={currentSong.title}
                            className="w-16 h-16 rounded-xl shadow-lg object-cover"
                        />
                    )}
                    <div>
                        <h2 className="text-2xl font-bold text-white">{currentSong?.title ?? 'Unknown Song'}</h2>
                        <p className="text-gray-400">{currentSong?.artist ?? 'Unknown Artist'}</p>
                    </div>
                </div>

                <button
                    onClick={toggleLyrics}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Close Lyrics"
                >
                    <IconX size={24} />
                </button>
            </div>

            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto px-6 md:px-20 pb-20 pt-10 scrollbar-hide text-center md:text-left space-y-6"
            >
                {mockLyrics.map((line, index) => (
                    <p
                        key={index}
                        className={`text-2xl md:text-4xl font-bold transition-all duration-500 ease-in-out ${line.startsWith('[')
                            ? 'text-purple-400/80 text-xl md:text-2xl mt-12 mb-4'
                            : line === ''
                                ? 'h-4 md:h-8'
                                : 'text-white/80 hover:text-white hover:scale-105 origin-left'
                            }`}
                        style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                    >
                        {line}
                    </p>
                ))}

                <div className="h-40" />
            </div>

            <div className="absolute bottom-24 left-0 right-0 h-32 bg-linear-to-t from-gray-950/90 to-transparent pointer-events-none" />
            <div className="absolute top-28 left-0 right-0 h-20 bg-linear-to-b from-gray-950/90 to-transparent pointer-events-none" />
        </div>
    );
}
