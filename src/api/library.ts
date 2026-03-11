import type { Song, Mix } from '@/types';

export interface LibraryService {
    getLikedSongs(): Song[];
    saveLikedSongs(songs: Song[]): void;
    
    getUserPlaylists(): Mix[];
    saveUserPlaylists(playlists: Mix[]): void;
    deletePlaylist(playlistId: string): void;
    updatePlaylist(playlist: Mix): void;
    
    getPlaylistSongs(playlistId: string): Song[];
    savePlaylistSongs(playlistId: string, songs: Song[]): void;

    // Curated/Recommended
    getCuratedMixes(): Mix[];
    getCuratedMixTracks(mixId: string): Song[];
}

const STORAGE_KEY_LIKED = 'aura_liked_songs';
const STORAGE_KEY_PLAYLISTS = 'aura_user_playlists';
const STORAGE_KEY_CURATED = 'aura_curated_mixes';
const STORAGE_KEY_PLAYLIST_SONGS_PREFIX = 'aura_playlist_songs_';

export const localStorageLibrary: LibraryService = {
    getLikedSongs(): Song[] {
        try {
            const saved = localStorage.getItem(STORAGE_KEY_LIKED);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    },

    saveLikedSongs(songs: Song[]): void {
        localStorage.setItem(STORAGE_KEY_LIKED, JSON.stringify(songs));
    },

    getUserPlaylists(): Mix[] {
        try {
            const saved = localStorage.getItem(STORAGE_KEY_PLAYLISTS);
            const playlists: Mix[] = saved ? JSON.parse(saved) : [];
            // Ensure we only return valid user playlists and not old API data
            return playlists.filter(p => p.id.startsWith('user-'));
        } catch {
            return [];
        }
    },

    saveUserPlaylists(playlists: Mix[]): void {
        localStorage.setItem(STORAGE_KEY_PLAYLISTS, JSON.stringify(playlists));
    },

    deletePlaylist(playlistId: string): void {
        const playlists = this.getUserPlaylists();
        const next = playlists.filter(p => p.id !== playlistId);
        this.saveUserPlaylists(next);
        localStorage.removeItem(`${STORAGE_KEY_PLAYLIST_SONGS_PREFIX}${playlistId}`);
    },

    updatePlaylist(playlist: Mix): void {
        const playlists = this.getUserPlaylists();
        const next = playlists.map(p => p.id === playlist.id ? playlist : p);
        this.saveUserPlaylists(next);
    },

    getPlaylistSongs(playlistId: string): Song[] {
        try {
            const saved = localStorage.getItem(`${STORAGE_KEY_PLAYLIST_SONGS_PREFIX}${playlistId}`);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    },

    savePlaylistSongs(playlistId: string, songs: Song[]): void {
        localStorage.setItem(`${STORAGE_KEY_PLAYLIST_SONGS_PREFIX}${playlistId}`, JSON.stringify(songs));
    },

    getCuratedMixes(): Mix[] {
        try {
            const saved = localStorage.getItem(STORAGE_KEY_CURATED);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    },

    getCuratedMixTracks(mixId: string): Song[] {
        return this.getPlaylistSongs(mixId);
    }
};
