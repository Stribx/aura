import { createContext } from 'react';
import type { Song, Mix, RepeatMode } from '@/types';

export interface MusicContextType {
    songs: Song[];
    mixes: Mix[];
    userPlaylists: Mix[];
    likedSongs: Song[];
    queue: Song[];
    loading: boolean;
    isPlaying: boolean;
    isLyricsOpen: boolean;
    currentSong: Song | null;
    songKey: number;
    shuffle: boolean;
    repeat: RepeatMode;
    togglePlay: () => void;
    toggleLyrics: () => void;
    toggleShuffle: () => void;
    cycleRepeat: () => void;
    playSong: (song: Song, newQueue?: Song[]) => void;
    addToQueue: (song: Song) => void;
    addPlaylistToQueue: (songs: Song[]) => void;
    playNext: () => void;
    playPrev: () => void;
    createPlaylist: (data: { title: string; desc: string }) => string;
    deletePlaylist: (playlistId: string) => void;
    updatePlaylist: (playlist: Mix) => void;
    toggleLike: (song: Song) => void;
    isLiked: (songId: string) => boolean;
    addSongToPlaylist: (playlistId: string, song: Song) => void;
    removeSongFromPlaylist: (playlistId: string, songId: string) => void;
    getPlaylistTracks: (playlistId: string) => Song[];
}

export const MusicContext = createContext<MusicContextType | undefined>(undefined);
