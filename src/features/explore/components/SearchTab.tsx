import { IconMusic } from '@tabler/icons-react';
import type { Song } from '@/types';

interface SearchTabProps {
    searchQuery: string;
    searchResults: Song[] | undefined;
    isSearchLoading: boolean;
    currentSong: Song | null;
    playSong: (song: Song, newQueue?: Song[]) => void;
}

export function SearchTab({ searchQuery, searchResults, isSearchLoading, currentSong, playSong }: SearchTabProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center space-x-3 mb-6">
                <h2 className="text-2xl font-bold">Search Results {searchQuery && `for "${searchQuery}"`}</h2>
            </div>

            {isSearchLoading ? (
                <div className="flex justify-center items-center h-32">
                    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : searchResults && searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((song, index) => (
                        <div
                            key={song.id}
                            onClick={() => playSong(song, searchResults)}
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
            ) : searchQuery ? (
                <div className="text-gray-400 bg-white/5 border border-white/10 rounded-xl p-8 text-center">
                    No tracks found for "{searchQuery}". Try a different keyword or genre.
                </div>
            ) : null}
        </div>
    );
}
