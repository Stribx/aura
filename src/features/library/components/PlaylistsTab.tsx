import { useState } from 'react';
import { IconHeart, IconMusic, IconPlayerPlay, IconPlus } from '@tabler/icons-react';
import { Link, useNavigate } from '@tanstack/react-router';
import type { Mix } from '@/types';
import { useMusic } from '@/features/player/context/useMusic';
import { PlaylistModal } from './PlaylistModal';

interface Props {
    mixes: Mix[];
    onLikedClick: () => void;
}

export function PlaylistsTab({ mixes, onLikedClick }: Props) {
    const navigate = useNavigate();
    const { userPlaylists, createPlaylist, likedSongs } = useMusic();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    
    const allPlaylists = [...mixes, ...userPlaylists];

    const handleCreatePlaylist = (data: { title: string; desc: string }) => {
        const id = createPlaylist(data);
        navigate({ to: '/playlist/$id', params: { id } });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PlaylistModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
                onSubmit={handleCreatePlaylist} 
            />

            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Your Playlists</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Create New Card */}
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="group relative bg-white/5 hover:bg-white/10 border border-dashed border-white/20 hover:border-purple-500/50 rounded-2xl p-4 transition-all hover:-translate-y-2 flex flex-col items-center justify-center aspect-square"
                >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-all duration-500">
                        <IconPlus size={32} />
                    </div>
                    <span className="font-bold text-lg text-white group-hover:text-purple-400 transition-colors">Create Playlist</span>
                    <p className="text-xs text-gray-500 mt-2 text-center">Start a new collection of sounds</p>
                </button>

                {/* Liked Songs Card */}
                <div
                    onClick={onLikedClick}
                    className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20"
                >
                    <div className="absolute inset-0 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 opacity-90" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                        <IconHeart size={36} className="text-white fill-white mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-1">Liked Songs</h3>
                        <p className="text-white/80 text-sm font-medium">{likedSongs.length} liked songs</p>
                    </div>
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-xl transition-all translate-y-4 group-hover:translate-y-0 z-20">
                        <IconPlayerPlay size={24} className="text-black ml-1" fill="currentColor" />
                    </div>
                </div>

                {/* All Other Playlists */}
                {allPlaylists.map((mix) => (
                    <Link
                        key={mix.id}
                        to="/playlist/$id"
                        params={{ id: mix.id }}
                        className="group bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all hover:-translate-y-2 block"
                    >
                        <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                            <div className={`absolute inset-0 bg-linear-to-br ${mix.colors} opacity-80 group-hover:opacity-100 transition-opacity`} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <IconMusic size={40} className="text-white/50" />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-xl transition-all z-10">
                                <IconPlayerPlay size={24} className="text-black ml-1" fill="currentColor" />
                            </div>
                        </div>
                        <h4 className="font-bold text-lg mb-1 truncate text-white">{mix.title}</h4>
                        <p className="text-sm text-gray-400 line-clamp-2">{mix.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
