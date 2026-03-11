import { useState } from 'react';
import { IconPlayerPlay, IconDots, IconHeart, IconClock, IconTrash, IconEdit, IconPlaylistAdd } from '@tabler/icons-react';
import type { Mix, Song } from '@/types';
import { useMusic } from '@/features/player/context/useMusic';
import { useNavigate } from '@tanstack/react-router';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/Tooltip';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/AlertDialog";
import { PlaylistModal } from './PlaylistModal';

interface Props {
    mix: Mix;
    trackCount: number;
    tracks: Song[];
    isLoading: boolean;
    onPlayAll: () => void;
}

export function PlaylistHeader({ mix, trackCount, tracks, onPlayAll }: Props) {
    const { isLiked, toggleLike, deletePlaylist, updatePlaylist, addPlaylistToQueue } = useMusic();
    const navigate = useNavigate();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    const currentlyLiked = isLiked(mix.id);
    const isUserPlaylist = mix.id.startsWith('user-');

    const handleDelete = () => {
        deletePlaylist(mix.id);
        navigate({ to: '/library' });
    };

    const handleEdit = (data: { title: string; desc: string }) => {
        updatePlaylist({
            ...mix,
            title: data.title,
            desc: data.desc,
        });
    };

    return (
        <>
            <div className="relative w-full group">
                {/* Background layer with clipping */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10">
                    <div className={`absolute inset-0 bg-gradient-to-br ${mix.colors} opacity-40 blur-3xl`} />
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-md" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-8 p-8 md:p-12">
                    {/* Artwork */}
                    <div className={`w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-gradient-to-br ${mix.colors} shadow-2xl flex-shrink-0 flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform duration-700`}>
                        <div className="text-white/20">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                            </svg>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <p className="text-sm font-bold uppercase tracking-widest text-white/60">Playlist</p>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-none">
                            {mix.title}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-white/70">
                            <span className="font-medium text-white">{mix.desc}</span>
                            <div className="flex items-center gap-2 border-l border-white/20 pl-6">
                                <span className="text-white/90 font-bold">{trackCount} tracks</span>
                                <span className="w-1 h-1 rounded-full bg-white/30" />
                                <div className="flex items-center gap-1.5">
                                    <IconClock size={16} />
                                    <span>~{Math.floor(trackCount * 3.5)} min</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
                            <button 
                                onClick={onPlayAll}
                                className="h-14 px-8 rounded-full bg-white text-black font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-xl shadow-white/10"
                            >
                                <IconPlayerPlay size={24} fill="currentColor" />
                                Play All
                            </button>
                            
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button 
                                        onClick={() => toggleLike({ id: mix.id, title: mix.title, artist: mix.desc, cover: '', preview: '', duration: 0 })}
                                        className={`w-14 h-14 rounded-full border border-white/10 flex items-center justify-center transition-all ${currentlyLiked ? 'bg-purple-500/30 text-purple-400' : 'bg-white/10 text-white hover:bg-white/20'}`}
                                    >
                                        <IconHeart size={24} className={currentlyLiked ? 'fill-current' : ''} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {currentlyLiked ? 'Remove from Library' : 'Add to Library'}
                                </TooltipContent>
                            </Tooltip>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button 
                                        className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white transition-all bg-white/10 hover:bg-white/20 data-[state=open]:bg-white data-[state=open]:text-black"
                                    >
                                        <IconDots size={24} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-64">
                                    <DropdownMenuItem 
                                        onClick={() => addPlaylistToQueue(tracks)}
                                        className="gap-3"
                                    >
                                        <IconPlaylistAdd size={20} />
                                        Add to queue
                                    </DropdownMenuItem>
                                    
                                    {isUserPlaylist && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem 
                                                onSelect={() => setIsEditModalOpen(true)}
                                                className="gap-3"
                                            >
                                                <IconEdit size={20} />
                                                Edit playlist
                                            </DropdownMenuItem>
                                            <DropdownMenuItem 
                                                onSelect={() => setIsDeleteDialogOpen(true)}
                                                className="gap-3 text-red-400 focus:text-red-300 focus:bg-red-400/10"
                                            >
                                                <IconTrash size={20} />
                                                Delete playlist
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>

            <PlaylistModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEdit}
                initialData={{ title: mix.title, desc: mix.desc }}
                mode="edit"
            />

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the playlist
                            "<span className="text-white font-semibold">{mix.title}</span>" and remove all its tracks from your collection.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={handleDelete}
                            className="bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20"
                        >
                            Delete Playlist
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
