import { IconMinimize } from '@tabler/icons-react';
import type { Song } from '@/types';

interface Props {
    song: Song;
    isPlaying: boolean;
    onClose: () => void;
}

export function PlayerMaximized({ song, isPlaying, onClose }: Props) {
    return (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="relative group w-64 h-64 md:w-96 md:h-96">
                <img
                    src={song.cover}
                    alt={song.title}
                    className={`w-full h-full object-cover rounded-full shadow-[0_0_50px_rgba(168,85,247,0.6)] ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`}
                />
                <div
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                    <IconMinimize size={48} className="text-white" />
                </div>
            </div>
            <div className="mt-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{song.title}</h2>
                <p className="text-xl md:text-2xl text-gray-400">{song.artist}</p>
            </div>
        </div>
    );
}
