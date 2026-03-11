import { createContext } from 'react';
import type { Song, Mix } from '@/types';

export interface LibraryContextType {
    songs: Song[];
    mixes: Mix[];
    userPlaylists: Mix[];
    likedSongs: Song[];
    loading: boolean;
    createPlaylist: (data: { title: string; desc: string }) => string;
    deletePlaylist: (playlistId: string) => void;
    updatePlaylist: (playlist: Mix) => void;
    toggleLike: (song: Song) => void;
    isLiked: (songId: string) => boolean;
    addSongToPlaylist: (playlistId: string, song: Song) => void;
    removeSongFromPlaylist: (playlistId: string, songId: string) => void;
    getPlaylistTracks: (playlistId: string) => Song[];
}

export const LibraryContext = createContext<LibraryContextType | undefined>(undefined);
