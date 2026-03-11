import { useNavigate } from '@tanstack/react-router';
import { Route } from '@/routes/library';

export const LibraryTab = {
    Overview:  'overview',
    Playlists: 'playlists',
    Liked:     'liked',
    Albums:    'albums',
} as const;

export type LibraryTab = (typeof LibraryTab)[keyof typeof LibraryTab];

export function useLibraryNavigation() {
    const navigate = useNavigate({ from: Route.fullPath });
    const { tab } = Route.useSearch();
    
    // Default to Overview if invalid or missing
    const activeTab = (Object.values(LibraryTab).includes(tab as LibraryTab)) 
        ? (tab as LibraryTab) 
        : LibraryTab.Overview;

    const setActiveTab = (newTab: LibraryTab) => {
        navigate({ 
            search: (prev) => ({ ...prev, tab: newTab }),
            replace: true 
        });
    };

    return {
        activeTab,
        setActiveTab,
        goToLiked: () => setActiveTab(LibraryTab.Liked),
    };
}
