import { IconPlayerPlay, IconHeart } from '@tabler/icons-react';
import { SongList } from '@/components/shared/SongList';
import type { Song } from '@/types';

interface Props {
    songs: Song[];
    currentSong: Song | null;
    playSong: (song: Song, newQueue?: Song[]) => void;
}

export function LikedTab({ songs, currentSong, playSong }: Props) {
    if (!songs || songs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                    <IconHeart size={40} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">No liked songs yet</h3>
                    <p className="text-gray-400 max-w-xs">Start building your collection by clicking the heart on tracks you love.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Liked Songs</h2>
                <button
                    onClick={() => playSong(songs[0], songs)}
                    className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    aria-label="Play all liked songs"
                >
                    <IconPlayerPlay size={24} fill="currentColor" className="ml-1" />
                </button>
            </div>
            <SongList songs={songs} currentSong={currentSong} playSong={playSong} />
        </div>
    );
}