import { IconSearch } from '@tabler/icons-react';
import type { Song } from '@/types';

import { ExploreTab, useExploreNavigation } from './hooks/useExploreNavigation';
import { useExploreSearch } from './hooks/useExploreSearch';
import { TrendingTab } from './components/TrendingTab';
import { GenresTab } from './components/GenresTab';
import { SearchTab } from './components/SearchTab';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

interface ExploreProps {
    songs: Song[];
    playSong: (song: Song, newQueue?: Song[]) => void;
    currentSong: Song | null;
    initialQuery?: string;
}

export function Explore({ songs, playSong, currentSong, initialQuery }: ExploreProps) {
    const nav = useExploreNavigation(initialQuery ? ExploreTab.Search : ExploreTab.Trending);
    const search = useExploreSearch(initialQuery);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        search.submitSearch();
        nav.goToSearch();
    };

    const handleGenreClick = (genre: string) => {
        search.searchByGenre(genre);
        nav.goToSearch();
    };

    const tabs: { id: ExploreTab; label: string }[] = [
        { id: ExploreTab.Trending, label: 'Trending Now' },
        { id: ExploreTab.Genres, label: 'Genres & Moods' },
        { id: ExploreTab.Search, label: 'Search' },
    ];

    return (
        <div className="w-full animation-fade-in space-y-12">
            <Tabs 
                value={nav.activeTab} 
                onValueChange={(val) => nav.setActiveTab(val as ExploreTab)}
                className="w-full"
            >
                <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-md">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/30 rounded-full blur-[80px] pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-600/20 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                Discover New Sounds
                            </h1>
                            <p className="text-gray-400 max-w-xl text-lg">
                                Dive into the rhythm of the moment. We've curated the hottest tracks and the most vibrant genres just for you.
                            </p>
                        </div>

                        <TabsList className="self-start md:self-auto">
                            {tabs.map(({ id, label }) => (
                                <TabsTrigger key={id} value={id}>
                                    {label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <div className="mt-8 relative z-10 max-w-xl">
                        <form onSubmit={handleSearch} className="relative group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <IconSearch size={20} className="text-gray-400 group-focus-within:text-white transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={search.input}
                                onChange={(e) => search.setInput(e.target.value)}
                                placeholder="Find songs, artists, or genres..."
                                className="w-full bg-black/40 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all backdrop-blur-md"
                            />
                        </form>
                    </div>
                </div>

                <TabsContent value={ExploreTab.Trending}>
                    <TrendingTab songs={songs} currentSong={currentSong} playSong={playSong} />
                </TabsContent>
                <TabsContent value={ExploreTab.Genres}>
                    <GenresTab onGenreClick={handleGenreClick} />
                </TabsContent>
                <TabsContent value={ExploreTab.Search}>
                    <SearchTab
                        searchQuery={search.input}
                        searchResults={search.results}
                        isSearchLoading={search.isLoading}
                        currentSong={currentSong}
                        playSong={playSong}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
