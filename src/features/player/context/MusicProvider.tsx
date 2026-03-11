import { useState, useEffect, useCallback, useMemo, useRef, type ReactNode } from 'react';
import type { Song, Mix, RepeatMode } from '@/types';
import { useMusicService } from '../hooks/useMusicService';
import { PlaybackTimeProvider } from './PlaybackTimeProvider';
import { usePlaybackTime } from './usePlaybackTime';
import { localStorageLibrary } from '@/api/library';

// Specialized Contexts
import { MusicContext, type MusicContextType } from './MusicContext';
import { PlaybackContext, type PlaybackContextType } from './PlaybackContext';
import { LibraryContext, type LibraryContextType } from './LibraryContext';
import { QueueContext, type QueueContextType } from './QueueContext';

const STORAGE_KEY_PLAYLISTS = 'aura_user_playlists';

function shuffleArray<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function MusicProviderInner({ children }: { children: ReactNode }) {
    const { songs, loading } = useMusicService();
    const { currentTime } = usePlaybackTime();

    // 1. Playback State
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLyricsOpen, setIsLyricsOpen] = useState(false);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [songKey, setSongKey] = useState(0);
    const [repeat, setRepeat] = useState<RepeatMode>('none');

    // 2. Library State
    const mixes = useMemo(() => localStorageLibrary.getCuratedMixes(), []);
    const [userPlaylists, setUserPlaylists] = useState<Mix[]>(() => localStorageLibrary.getUserPlaylists());
    const [likedSongs, setLikedSongs] = useState<Song[]>(() => localStorageLibrary.getLikedSongs());

    const [playlistSongsMap, setPlaylistSongsMap] = useState<Record<string, Song[]>>({});

    // 3. Queue State
    const [queue, setQueue] = useState<Song[]>([]);
    const [shuffle, setShuffle] = useState(false);
    const [shuffledQueue, setShuffledQueue] = useState<Song[]>([]);

    const shuffledQueueRef = useRef(shuffledQueue);
    useEffect(() => { shuffledQueueRef.current = shuffledQueue; }, [shuffledQueue]);

    const currentTimeRef = useRef(currentTime);
    useEffect(() => { currentTimeRef.current = currentTime; }, [currentTime]);

    // Persist Playlists
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_PLAYLISTS, JSON.stringify(userPlaylists));
    }, [userPlaylists]);

    // Initial Sync
    const [isInitialized, setIsInitialized] = useState(false);
    if (!isInitialized && songs.length > 0 && queue.length === 0) {
        setIsInitialized(true);
        setQueue(songs);
        setShuffledQueue(shuffle ? shuffleArray(songs) : songs);
    }

    if (queue.length > 0 && !currentSong) {
        setCurrentSong(queue[0]);
    }

    // --- Action Handlers ---

    const togglePlay = useCallback(() => setIsPlaying(prev => !prev), []);
    const toggleLyrics = useCallback(() => setIsLyricsOpen(prev => !prev), []);
    const cycleRepeat = useCallback(() => setRepeat(prev => prev === 'none' ? 'all' : prev === 'all' ? 'one' : 'none'), []);

    const toggleShuffle = useCallback(() => {
        setShuffle(prev => {
            const next = !prev;
            setShuffledQueue(next ? shuffleArray(queue) : queue);
            return next;
        });
    }, [queue]);

    const playSong = useCallback((song: Song, newQueue?: Song[]) => {
        if (newQueue) {
            setQueue(newQueue);
            setShuffledQueue(shuffle ? shuffleArray(newQueue) : newQueue);
        }
        setCurrentSong(song);
        setSongKey(prev => prev + 1);
        setIsPlaying(true);
    }, [shuffle]);

    const addToQueue = useCallback((song: Song) => {
        setQueue(prev => [...prev, song]);
        setShuffledQueue(prev => [...prev, song]);
    }, []);

    const addPlaylistToQueue = useCallback((songsToAdd: Song[]) => {
        setQueue(prev => [...prev, ...songsToAdd]);
        setShuffledQueue(prev => [...prev, ...songsToAdd]);
    }, []);

    const playNext = useCallback(() => {
        const activeQueue = shuffledQueueRef.current;
        if (!currentSong || activeQueue.length === 0) return;

        if (repeat === 'one') {
            setSongKey(prev => prev + 1);
            setIsPlaying(true);
            return;
        }

        const currentIndex = activeQueue.findIndex(s => s.id === currentSong.id);
        const nextIndex = (currentIndex + 1) % activeQueue.length;

        if (nextIndex === 0 && repeat === 'none') {
            setIsPlaying(false);
            return;
        }

        playSong(activeQueue[nextIndex]);
    }, [currentSong, repeat, playSong]);

    const playPrev = useCallback(() => {
        const activeQueue = shuffledQueueRef.current;
        if (!currentSong || activeQueue.length === 0) return;

        if (currentTimeRef.current > 3) {
            setSongKey(prev => prev + 1);
            setIsPlaying(true);
            return;
        }

        const currentIndex = activeQueue.findIndex(s => s.id === currentSong.id);
        const prevIndex = currentIndex === -1
            ? activeQueue.length - 1
            : (currentIndex - 1 + activeQueue.length) % activeQueue.length;
        playSong(activeQueue[prevIndex]);
    }, [currentSong, playSong]);
    const createPlaylist = useCallback(({ title, desc }: { title: string; desc: string }) => {
        const id = `user-${Date.now()}`;
        const colorPresets = ['from-yellow-500 to-orange-600', 'from-emerald-500 to-teal-600', 'from-rose-500 to-pink-600', 'from-sky-500 to-indigo-600', 'from-violet-500 to-purple-600'];
        const randomColor = colorPresets[Math.floor(Math.random() * colorPresets.length)];

        const newPlaylist: Mix = {
            id,
            title: title || `My Playlist #${userPlaylists.length + 1}`,
            desc: desc || 'A collection of my favorite tracks',
            colors: randomColor,
        };
        const next = [...userPlaylists, newPlaylist];
        setUserPlaylists(next);
        localStorageLibrary.saveUserPlaylists(next);
        return id;
    }, [userPlaylists]);

    const deletePlaylist = useCallback((playlistId: string) => {
        const next = userPlaylists.filter(p => p.id !== playlistId);
        setUserPlaylists(next);
        localStorageLibrary.deletePlaylist(playlistId);
    }, [userPlaylists]);

    const updatePlaylist = useCallback((playlist: Mix) => {
        const next = userPlaylists.map(p => p.id === playlist.id ? playlist : p);
        setUserPlaylists(next);
        localStorageLibrary.updatePlaylist(playlist);
    }, [userPlaylists]);

    const addSongToPlaylist = useCallback((playlistId: string, song: Song) => {
        const currentSongs = playlistSongsMap[playlistId] || localStorageLibrary.getPlaylistSongs(playlistId);
        if (currentSongs.some(s => s.id === song.id)) return;

        const next = [...currentSongs, song];
        setPlaylistSongsMap(prev => ({ ...prev, [playlistId]: next }));
        localStorageLibrary.savePlaylistSongs(playlistId, next);
    }, [playlistSongsMap]);

    const removeSongFromPlaylist = useCallback((playlistId: string, songId: string) => {
        const currentSongs = playlistSongsMap[playlistId] || localStorageLibrary.getPlaylistSongs(playlistId);
        const next = currentSongs.filter(s => s.id !== songId);
        setPlaylistSongsMap(prev => ({ ...prev, [playlistId]: next }));
        localStorageLibrary.savePlaylistSongs(playlistId, next);
    }, [playlistSongsMap]);

    const getPlaylistTracks = useCallback((playlistId: string) => {
        if (playlistSongsMap[playlistId]) return playlistSongsMap[playlistId];
        
        const tracks = localStorageLibrary.getPlaylistSongs(playlistId);
        
        if (tracks.length > 0) {
            setPlaylistSongsMap(prev => ({ ...prev, [playlistId]: tracks }));
        }
        return tracks;
    }, [playlistSongsMap]);

    const toggleLike = useCallback((song: Song) => {
        setLikedSongs(prev => {
            const index = prev.findIndex(s => s.id === song.id);
            let next: Song[];
            if (index > -1) {
                next = prev.filter(s => s.id !== song.id);
            } else {
                next = [...prev, song];
            }
            localStorageLibrary.saveLikedSongs(next);
            return next;
        });
    }, []);

    const isLiked = useCallback((songId: string) => {
        return likedSongs.some(s => s.id === songId);
    }, [likedSongs]);

    // --- Memoized Context Values (ISP) ---

    const playbackValue = useMemo<PlaybackContextType>(() => ({
        isPlaying, currentSong, songKey, repeat, isLyricsOpen,
        togglePlay, toggleLyrics, cycleRepeat, playSong
    }), [isPlaying, currentSong, songKey, repeat, isLyricsOpen, togglePlay, toggleLyrics, cycleRepeat, playSong]);

    const libraryValue = useMemo<LibraryContextType>(() => ({
        songs, mixes, userPlaylists, likedSongs, loading, createPlaylist, deletePlaylist, updatePlaylist, toggleLike, isLiked,
        addSongToPlaylist, removeSongFromPlaylist, getPlaylistTracks
    }), [songs, mixes, userPlaylists, likedSongs, loading, createPlaylist, deletePlaylist, updatePlaylist, toggleLike, isLiked, 
         addSongToPlaylist, removeSongFromPlaylist, getPlaylistTracks]);

    const queueValue = useMemo<QueueContextType>(() => ({
        queue, shuffle, toggleShuffle, addToQueue, addPlaylistToQueue, playNext, playPrev
    }), [queue, shuffle, toggleShuffle, addToQueue, addPlaylistToQueue, playNext, playPrev]);

    const musicValue = useMemo<MusicContextType>(() => ({
        ...playbackValue,
        ...libraryValue,
        ...queueValue,
        deletePlaylist,
        updatePlaylist,
        addToQueue,
        addPlaylistToQueue
    }), [playbackValue, libraryValue, queueValue, deletePlaylist, updatePlaylist, addToQueue, addPlaylistToQueue]);

    return (
        <MusicContext.Provider value={musicValue}>
            <LibraryContext.Provider value={libraryValue}>
                <QueueContext.Provider value={queueValue}>
                    <PlaybackContext.Provider value={playbackValue}>
                        {children}
                    </PlaybackContext.Provider>
                </QueueContext.Provider>
            </LibraryContext.Provider>
        </MusicContext.Provider>
    );
}

export function MusicProvider({ children }: { children: ReactNode }) {
    return (
        <PlaybackTimeProvider>
            <MusicProviderInner>{children}</MusicProviderInner>
        </PlaybackTimeProvider>
    );
}
