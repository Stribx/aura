import { useMemo } from 'react';
import { IconPlaylist, IconHeart, IconAlbum, IconLayoutDashboard } from '@tabler/icons-react';
import type { Song, Mix } from '@/types';

import { useLibrary } from '../player/context/useLibrary';
import { LibraryTab, useLibraryNavigation } from './hooks/useLibraryNavigation';
import { OverviewTab } from './components/OverviewTab';
import { PlaylistsTab } from './components/PlaylistsTab';
import { LikedTab } from './components/LikedTab';
import { AlbumsTab } from './components/AlbumsTab';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

interface LibraryProps {
    songs: Song[];
    mixes: Mix[];
    playSong: (song: Song, newQueue?: Song[]) => void;
    currentSong: Song | null;
}

type TabConfig = {
    [K in LibraryTab]: {
        label: string;
        Icon: React.ElementType;
    }
};

const TAB_CONFIG: TabConfig = {
    [LibraryTab.Overview]: {
        label: 'Overview',
        Icon: IconLayoutDashboard,
    },
    [LibraryTab.Playlists]: {
        label: 'Playlists',
        Icon: IconPlaylist,
    },
    [LibraryTab.Liked]: {
        label: 'Liked',
        Icon: IconHeart,
    },
    [LibraryTab.Albums]: {
        label: 'Albums',
        Icon: IconAlbum,
    },
};

export function Library({ songs, mixes, playSong, currentSong }: LibraryProps) {
    const { activeTab, setActiveTab, goToLiked } = useLibraryNavigation();
    const { likedSongs } = useLibrary();

    const albums = useMemo(() => songs.slice(0, 8).map((song) => ({
        id: song.id,
        title: song.title,
        artist: song.artist,
        cover: song.cover,
        year: '2023',
    })), [songs]);

    return (
        <div className="w-full animation-fade-in space-y-12">
            <Tabs 
                value={activeTab} 
                onValueChange={(val) => setActiveTab(val as LibraryTab)}
                className="w-full"
            >
                <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-md">
                    <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-pink-600/20 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex items-center space-x-6">
                            <div className="w-24 h-24 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 border-2 border-white/20">
                                <span className="text-4xl font-bold text-white">A</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-400 mb-1 uppercase tracking-wider">Profile</p>
                                <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    Your Library
                                </h1>
                            </div>
                        </div>

                        <TabsList className="self-start md:self-auto overflow-x-auto max-w-full hide-scrollbar">
                            {Object.entries(TAB_CONFIG).map(([id, { label, Icon }]) => (
                                <TabsTrigger key={id} value={id} className="gap-2">
                                    <Icon size={16} />
                                    <span>{label}</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>
                </div>

                <TabsContent value={LibraryTab.Overview}>
                    <OverviewTab 
                        likedCount={likedSongs.length}
                        mixesCount={mixes.length}
                        albumsCount={albums.length}
                        recentSongs={songs}
                        onTabChange={setActiveTab}
                    />
                </TabsContent>
                <TabsContent value={LibraryTab.Playlists}>
                    <PlaylistsTab 
                        mixes={mixes}
                        onLikedClick={goToLiked}
                    />
                </TabsContent>
                <TabsContent value={LibraryTab.Liked}>
                    <LikedTab 
                        songs={likedSongs}
                        currentSong={currentSong}
                        playSong={playSong}
                    />
                </TabsContent>
                <TabsContent value={LibraryTab.Albums}>
                    <AlbumsTab albums={albums} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
