import { lazy, Suspense } from 'react';
import { useMusic } from '@/features/player/context/useMusic';
import { Route } from '@/routes/explore';

const ExploreComponent = lazy(() => import('@/features/explore/Explore').then(m => ({ default: m.Explore })));

export function ExploreWrapper() {
    const { songs, currentSong, playSong } = useMusic();
    const { q } = Route.useSearch();

    return (
        <Suspense fallback={
            <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <ExploreComponent songs={songs} currentSong={currentSong || songs[0]} playSong={playSong} initialQuery={q} />
        </Suspense>
    );
}
