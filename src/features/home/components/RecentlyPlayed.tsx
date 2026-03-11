import { Link } from '@tanstack/react-router';
import { IconPlayerPlay } from '@tabler/icons-react';
import type { Song } from '@/types';

interface RecentlyPlayedProps {
    songs: Song[];
    currentSong: Song | null;
    playSong: (song: Song, newQueue?: Song[]) => void;
}

export function RecentlyPlayed({ songs, currentSong, playSong }: RecentlyPlayedProps) {
    const displayedSongs = songs.slice(0, 12);

    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Recent Auras</h2>
                <Link to='/library' className="text-sm text-gray-400 hover:text-white transition-colors">See all</Link>
            </div>
            <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
                {displayedSongs.map((song) => (
                    <div
                        key={song.id}
                        className="shrink-0 w-36 md:w-48 group cursor-pointer"
                        onClick={() => playSong(song, songs)}
                    >
                        <div className="relative rounded-2xl overflow-hidden mb-3 shadow-lg">
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                                <button className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.8)] transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    <IconPlayerPlay size={24} fill="currentColor" className="ml-1" />
                                </button>
                            </div>
                            <img
                                src={song.cover}
                                alt={song.title}
                                loading="lazy"
                                className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <h3 className={`font-semibold truncate transition-colors ${currentSong?.id === song.id ? 'text-purple-400' : 'text-white group-hover:text-purple-300'}`}>
                            {song.title}
                        </h3>
                        <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
