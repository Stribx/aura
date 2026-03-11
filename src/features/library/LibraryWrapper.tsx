import { lazy, Suspense } from 'react';
import { useMusic } from '@/features/player/context/useMusic';

const LibraryComponent = lazy(() => import('./Library').then(m => ({ default: m.Library })));

export function LibraryWrapper() {
    const { songs, mixes, currentSong, playSong } = useMusic();
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <LibraryComponent songs={songs} mixes={mixes} currentSong={currentSong || songs[0]} playSong={playSong} />
        </Suspense>
    );
}
