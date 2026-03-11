import { useMusic } from '@/features/player/context/useMusic';
import { useMemo } from 'react';

export function usePlaylistPage(id: string) {
    const { 
        mixes, 
        userPlaylists, 
        currentSong, 
        playSong, 
        loading: isMixesLoading, 
        getPlaylistTracks, 
        removeSongFromPlaylist 
    } = useMusic();

    // Check both curated mixes and user-created playlists
    const allMixes = useMemo(() => [...mixes, ...userPlaylists], [mixes, userPlaylists]);
    const mix = allMixes.find(m => m.id === id);
    
    const isUserPlaylist = id.startsWith('user-');
    
    const albumTracks = useMemo(() => getPlaylistTracks(id), [id, getPlaylistTracks]);

    const isLoading = isMixesLoading;

    const playAll = () => {
        if (albumTracks.length > 0) {
            playSong(albumTracks[0], albumTracks);
        }
    };

    return {
        mix,
        currentSong,
        playSong,
        albumTracks,
        isLoading,
        playAll,
        isUserPlaylist,
        removeSongFromPlaylist
    };
}
