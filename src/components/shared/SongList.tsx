import { IconPlayerPlay, IconClock, IconDotsVertical, IconHeart, IconTrash, IconPlaylistAdd, IconPlus } from '@tabler/icons-react';
import type { Song } from '@/types';
import { formatTime } from '@/utils/formatTime';
import { useMusic } from '@/features/player/context/useMusic';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu';

interface SongListProps {
    songs: Song[];
    currentSong: Song | null;
    playSong: (song: Song, newQueue?: Song[]) => void;
    onRemove?: (songId: string) => void;
}

export function SongList({ songs, currentSong, playSong, onRemove }: SongListProps) {
    const { isLiked, toggleLike, userPlaylists, addSongToPlaylist, addToQueue } = useMusic();

    return (
        <div className="w-full">
            {/* Headers */}
            <div className="flex items-center px-4 py-3 border-b border-white/5 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <div className="w-10 text-center">#</div>
                <div className="flex-1 ml-4">Title</div>
                <div className="hidden md:block flex-1">Album</div>
                <div className="w-20 text-right"><IconClock size={16} className="inline ml-auto" /></div>
                <div className="w-24"></div>
            </div>

            {/* List */}
            <div className="mt-2 space-y-1">
                {songs.map((song, index) => {
                    const isActive = currentSong?.id === song.id;

                    return (
                        <div
                            key={song.id}
                            onClick={() => playSong(song, songs)}
                            className={`group flex items-center px-4 py-3 rounded-xl transition-all cursor-pointer relative ${
                                isActive 
                                ? 'bg-white/10 text-white' 
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            {/* Number / Play Icon */}
                            <div className="w-10 flex items-center justify-center">
                                <span className={`group-hover:hidden ${isActive ? 'text-purple-400' : ''}`}>
                                    {index + 1}
                                </span>
                                <IconPlayerPlay 
                                    size={16} 
                                    className="hidden group-hover:block text-white" 
                                    fill="currentColor" 
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 flex items-center ml-4 min-w-0">
                                <img 
                                    src={song.cover} 
                                    alt={song.title} 
                                    className="w-10 h-10 rounded-md object-cover shadow-lg mr-4 shrink-0" 
                                />
                                <div className="min-w-0">
                                    <p className={`font-semibold truncate ${isActive ? 'text-purple-400' : 'text-white'}`}>
                                        {song.title}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate group-hover:text-gray-400 transition-colors">
                                        {song.artist}
                                    </p>
                                </div>
                            </div>

                            {/* Album */}
                            <div className="hidden md:block flex-1 px-4 truncate text-sm">
                                {song.album || 'Single'}
                            </div>

                            {/* Duration */}
                            <div className="w-20 text-right text-sm tabular-nums">
                                {formatTime(song.duration)}
                            </div>

                            {/* Actions */}
                            <div className="w-24 flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleLike(song);
                                    }}
                                    className={`p-1.5 rounded-full transition-colors ${isLiked(song.id) ? 'text-purple-400 bg-purple-400/10' : 'text-gray-500 hover:text-white hover:bg-white/10'}`}
                                >
                                    <IconHeart size={18} className={isLiked(song.id) ? 'fill-current' : ''} />
                                </button>
                                
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button 
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-1.5 rounded-full text-gray-500 hover:text-white hover:bg-white/10 transition-colors data-[state=open]:bg-white data-[state=open]:text-black"
                                        >
                                            <IconDotsVertical size={18} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-64" onClick={(e) => e.stopPropagation()}>
                                        <DropdownMenuItem 
                                            onClick={() => addToQueue(song)}
                                            className="gap-3"
                                        >
                                            <IconPlaylistAdd size={18} />
                                            Add to queue
                                        </DropdownMenuItem>

                                        {userPlaylists.length > 0 && (
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger className="gap-3">
                                                    <IconPlus size={18} />
                                                    Add to playlist
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuSubContent className="w-48">
                                                    {userPlaylists.map(playlist => (
                                                        <DropdownMenuItem
                                                            key={playlist.id}
                                                            onClick={() => addSongToPlaylist(playlist.id, song)}
                                                        >
                                                            {playlist.title}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuSubContent>
                                            </DropdownMenuSub>
                                        )}

                                        {onRemove && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem 
                                                    className="gap-3 text-red-400 focus:text-red-300 focus:bg-red-400/10"
                                                    onClick={() => onRemove(song.id)}
                                                >
                                                    <IconTrash size={18} />
                                                    Remove from playlist
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
