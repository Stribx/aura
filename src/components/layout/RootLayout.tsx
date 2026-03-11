import { useState, lazy, Suspense } from 'react'
import { Outlet } from '@tanstack/react-router'
import { MusicProvider } from '@/features/player/context/MusicProvider'
import { useMusic } from '@/features/player/context/useMusic'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ApiContext } from '@/api/ApiContext'
import { jamendoApi } from '@/api/jamendo'

const Sidebar = lazy(() => import('@/components/layout/Sidebar').then(m => ({ default: m.Sidebar })));
const MobileHeader = lazy(() => import('@/components/layout/MobileHeader').then(m => ({ default: m.MobileHeader })));
const Header = lazy(() => import('@/components/layout/Header').then(m => ({ default: m.Header })));
const PlayerBar = lazy(() => import('@/features/player/components/PlayerBar').then(m => ({ default: m.PlayerBar })));
const LyricsOverlay = lazy(() => import('@/features/player/components/LyricsOverlay').then(m => ({ default: m.LyricsOverlay })));

const TanStackRouterDevtools = import.meta.env.DEV
    ? lazy(() =>
        import('@tanstack/react-router-devtools').then(m => ({
            default: m.TanStackRouterDevtools,
        }))
    )
    : () => null;

export function RootLayout() {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                retry: 2,
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <ApiContext.Provider value={jamendoApi}>
                <MusicProvider>
                    <AppLayout />
                    <Suspense fallback={null}>
                        <TanStackRouterDevtools />
                    </Suspense>
                </MusicProvider>
            </ApiContext.Provider>
        </QueryClientProvider>
    )
}

function AppLayout() {
    const { currentSong } = useMusic();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="h-screen w-full bg-gray-950 text-white font-sans overflow-hidden flex flex-col selection:bg-purple-500/30">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none"></div>

            <div className="flex-1 flex overflow-hidden z-10 relative">
                <Suspense fallback={<div className="w-64 bg-gray-950/50 animate-pulse" />}>
                    <Sidebar />
                </Suspense>

                <main className="flex-1 overflow-y-auto overflow-x-hidden pb-24 scrollbar-hide">
                    <Suspense fallback={<div className="h-16 bg-gray-950/50 animate-pulse" />}>
                        <MobileHeader
                            isMobileMenuOpen={isMobileMenuOpen}
                            setIsMobileMenuOpen={setIsMobileMenuOpen}
                        />
                    </Suspense>

                    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
                        <Suspense fallback={<div className="h-10 bg-gray-950/50 animate-pulse" />}>
                            <Header />
                        </Suspense>
                        <Outlet />
                    </div>
                </main>
            </div>

            <Suspense fallback={null}>
                {currentSong && <PlayerBar />}
            </Suspense>

            <Suspense fallback={null}>
                <LyricsOverlay />
            </Suspense>
        </div>
    );
}
