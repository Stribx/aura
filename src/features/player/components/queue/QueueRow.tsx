import { IconPlayerPlay } from '@tabler/icons-react';
import type { Song } from '@/types';
import { formatTime } from '@/utils/formatTime';

interface QueueRowProps {
    song: Song;
    dimmed?: boolean;
    onPlay: () => void;
}

export function QueueRow({ song, dimmed, onPlay }: QueueRowProps) {
    return (
        <button
            onClick={onPlay}
            className={`group w-full flex items-center space-x-3 px-2 py-2 rounded-xl transition-all text-left ${dimmed ? 'opacity-40 hover:opacity-80' : 'hover:bg-white/8'}`}
        >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                <img src={song.cover} alt={song.title} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <IconPlayerPlay size={14} className="text-white" fill="currentColor" />
                </div>
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate group-hover:text-purple-300 transition-colors">{song.title}</p>
                <p className="text-xs text-gray-400 truncate">{song.artist}</p>
            </div>
            <span className="text-xs text-gray-500 shrink-0">{formatTime(song.duration)}</span>
        </button>
    );
}
