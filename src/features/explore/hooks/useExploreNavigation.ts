import { useState, useEffect } from 'react';

export const ExploreTab = {
    Trending: 'trending',
    Genres:   'genres',
    Search:   'search',
} as const;

export type ExploreTab = (typeof ExploreTab)[keyof typeof ExploreTab];

export function useExploreNavigation(initialTab: ExploreTab = ExploreTab.Trending) {
    const [activeTab, setActiveTab] = useState<ExploreTab>(initialTab);

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    return {
        activeTab,
        setActiveTab,
        goToSearch: () => setActiveTab(ExploreTab.Search),
    };
}