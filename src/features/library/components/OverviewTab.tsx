import { IconHeart, IconPlaylist, IconAlbum } from '@tabler/icons-react';
import type { Song } from '@/types';
import type { LibraryTab } from '../hooks/useLibraryNavigation';

interface Props {
    likedCount: number;
    mixesCount: number;
    albumsCount: number;
    recentSongs: Song[];
    onTabChange: (tab: LibraryTab) => void;
}

export function OverviewTab({ likedCount, mixesCount, albumsCount, recentSongs, onTabChange }: Props) {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button 
                    onClick={() => onTabChange('liked')}
                    className="group p-6 rounded-3xl bg-linear-to-br from-red-500/10 to-transparent border border-white/5 hover:border-red-500/20 transition-all text-left"
                >
                    <IconHeart className="text-red-500 mb-4" size={32} />
                    <h3 className="text-xl font-bold text-white mb-1">Liked Songs</h3>
                    <p className="text-gray-400 text-sm">{likedCount} tracks saved</p>
                </button>

                <button 
                    onClick={() => onTabChange('playlists')}
                    className="group p-6 rounded-3xl bg-linear-to-br from-green-500/10 to-transparent border border-white/5 hover:border-green-500/20 transition-all text-left"
                >
                    <IconPlaylist className="text-green-500 mb-4" size={32} />
                    <h3 className="text-xl font-bold text-white mb-1">Your Mixes</h3>
                    <p className="text-gray-400 text-sm">{mixesCount} curated playlists</p>
                </button>

                <button 
                    onClick={() => onTabChange('albums')}
                    className="group p-6 rounded-3xl bg-linear-to-br from-blue-500/10 to-transparent border border-white/5 hover:border-blue-500/20 transition-all text-left"
                >
                    <IconAlbum className="text-blue-500 mb-4" size={32} />
                    <h3 className="text-xl font-bold text-white mb-1">Albums</h3>
                    <p className="text-gray-400 text-sm">{albumsCount} collections</p>
                </button>
            </div>

            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Recently Added</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {recentSongs.slice(0, 5).map(song => (
                        <div key={song.id} className="group cursor-pointer">
                            <div className="aspect-square rounded-2xl overflow-hidden mb-3 relative">
                                <img src={song.cover} alt={song.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
                                        <IconPlaylist size={24} fill="currentColor" />
                                    </div>
                                </div>
                            </div>
                            <h4 className="font-semibold text-white truncate">{song.title}</h4>
                            <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
