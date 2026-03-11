import { lazy, Suspense } from 'react';
import { useMusic } from '@/features/player/context/useMusic';

const HeroSection = lazy(() => import('./components/HeroSection').then(m => ({ default: m.HeroSection })));
const RecentlyPlayed = lazy(() => import('./components/RecentlyPlayed').then(m => ({ default: m.RecentlyPlayed })));
const CuratedMixes = lazy(() => import('./components/CuratedMixes').then(m => ({ default: m.CuratedMixes })));

export function Home() {
    const { songs, mixes, loading, currentSong, playSong } = useMusic();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <Suspense fallback={
            <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <HeroSection />
            <RecentlyPlayed songs={songs} currentSong={currentSong} playSong={playSong} />
            <CuratedMixes mixes={mixes} />
        </Suspense>
    );
}
