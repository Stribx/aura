import type { Song } from '@/types';
import { formatTime } from '@/utils/formatTime';

interface Props {
    song: Song;
    isPlaying: boolean;
    ref?: React.Ref<HTMLDivElement>;
}

export function NowPlayingRow({ song, isPlaying, ref }: Props) {
    return (
        <div
            ref={ref}
            className="flex items-center space-x-3 px-2 py-2.5 rounded-xl bg-white/10 border border-white/10"
        >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                <img
                    src={song.cover}
                    alt={song.title}
                    className={`w-full h-full object-cover ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`}
                />
                {isPlaying && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="flex space-x-0.5">
                            {[0, 1, 2].map((i) => (
                                <span
                                    key={i}
                                    className="w-0.5 bg-white rounded-full animate-[bounce_0.9s_ease-in-out_infinite]"
                                    style={{ height: '12px', animationDelay: `${i * 0.15}s` }}
                                />
                            ))}
                        </span>
                    </div>
                )}
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-purple-300 truncate">{song.title}</p>
                <p className="text-xs text-gray-400 truncate">{song.artist}</p>
            </div>
            <span className="text-xs text-gray-500 shrink-0">{formatTime(song.duration)}</span>
        </div>
    );
}
