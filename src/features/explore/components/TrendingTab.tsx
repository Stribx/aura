import { IconFlame, IconMusic } from '@tabler/icons-react';
import type { Song } from '@/types';

interface TrendingTabProps {
    songs: Song[];
    currentSong: Song | null;
    playSong: (song: Song, newQueue?: Song[]) => void;
}

export function TrendingTab({ songs, currentSong, playSong }: TrendingTabProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <IconFlame size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">Top Global Tracks</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {songs.slice(0, 9).map((song, index) => (
                    <div
                        key={song.id}
                        onClick={() => playSong(song, songs.slice(0, 9))}
                        className={`group flex items-center space-x-4 p-3 rounded-xl transition-all cursor-pointer ${currentSong?.id === song.id ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5 border border-transparent'}`}
                    >
                        <div className="w-8 text-center text-gray-500 font-medium group-hover:text-white transition-colors">
                            {index + 1}
                        </div>
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                            <img src={song.cover} alt={song.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <IconMusic size={20} className="text-white" />
                            </div>
                        </div>
                        <div className="min-w-0 flex-1">
                            <h4 className={`font-semibold text-sm truncate ${currentSong?.id === song.id ? 'text-purple-400' : 'text-white'}`}>{song.title}</h4>
                            <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
