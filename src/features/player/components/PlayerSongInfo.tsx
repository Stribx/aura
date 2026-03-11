import { IconMaximize, IconHeart } from '@tabler/icons-react';
import type { Song } from '@/types';

interface Props {
    song: Song;
    isPlaying: boolean;
    onOpenMaximized: () => void;
}

export function PlayerSongInfo({ song, isPlaying, onOpenMaximized }: Props) {
    return (
        <div className="flex items-center w-1/4 min-w-[150px] space-x-4">
            <div className="relative w-14 h-14 rounded-md overflow-hidden shrink-0 group">
                <div
                    onClick={onOpenMaximized}
                    className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full scale-90"
                >
                    <IconMaximize size={20} className="text-white" />
                </div>
                <img
                    src={song.cover}
                    alt={song.title}
                    className={`w-full h-full object-cover transition-all duration-500 ${isPlaying ? 'animate-[spin_10s_linear_infinite] rounded-full scale-90 shadow-[0_0_15px_rgba(168,85,247,0.5)]' : ''}`}
                />
            </div>
            <div className="hidden sm:block min-w-0">
                <h4 className="font-semibold text-sm truncate hover:underline cursor-pointer">{song.title}</h4>
                <p className="text-xs text-gray-400 truncate hover:underline cursor-pointer">{song.artist}</p>
            </div>
            <button className="hidden sm:block text-gray-400 hover:text-pink-500 transition-colors ml-2" aria-label="Add to liked songs">
                <IconHeart size={18} />
            </button>
        </div>
    );
}
