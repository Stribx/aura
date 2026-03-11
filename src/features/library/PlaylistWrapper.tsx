import { lazy, Suspense } from 'react';
import { usePlaylistPage } from './hooks/usePlaylistPage';
import { PlaylistNotFound } from './components/PlaylistNotFound';
import { Route } from '@/routes/playlist.$id';

const SongList = lazy(() => import('@/components/shared/SongList').then(m => ({ default: m.SongList })));
const PlaylistHeader = lazy(() => import('./components/PlaylistHeader').then(m => ({ default: m.PlaylistHeader })));

export function PlaylistWrapper() {
  const { id } = Route.useParams();
  const { 
    mix, 
    currentSong, 
    playSong, 
    albumTracks, 
    isLoading, 
    playAll, 
    isUserPlaylist, 
    removeSongFromPlaylist 
  } = usePlaylistPage(id);

  if (isLoading) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-white/10 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!mix) return <PlaylistNotFound />;

  return (
    <div className="w-full animation-fade-in space-y-10 pb-20">
      <Suspense fallback={<div className="h-96 w-full bg-white/5 animate-pulse rounded-3xl" />}>
        <PlaylistHeader
          mix={mix}
          trackCount={albumTracks.length}
          tracks={albumTracks}
          isLoading={isLoading}
          onPlayAll={playAll}
        />
      </Suspense>

      <div className="relative">
        {/* Subtle Background Glow for the list */}
        <div className={`absolute -top-40 left-1/2 -translate-x-1/2 w-full h-80 bg-gradient-to-b from-purple-500/10 to-transparent blur-3xl pointer-events-none`} />
        
        <div className="relative z-10 bg-gray-950/40 backdrop-blur-sm rounded-3xl border border-white/5 p-2 md:p-4">
          <Suspense fallback={<div className="space-y-4 p-8">{[...Array(10)].map((_, i) => <div key={i} className="h-12 bg-white/5 animate-pulse rounded-xl" />)}</div>}>
            <SongList 
              songs={albumTracks} 
              currentSong={currentSong} 
              playSong={playSong} 
              onRemove={isUserPlaylist ? (songId) => removeSongFromPlaylist(id, songId) : undefined}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
