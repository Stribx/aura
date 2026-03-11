import { useState } from 'react';
import { useMusicSearch } from './useMusicSearch';

export const SearchType = {
    Search: 'search',
    Tag: 'tag',
} as const;

export type SearchType = (typeof SearchType)[keyof typeof SearchType];

export function useExploreSearch(initialQuery: string = '') {
    const [input, setInput]     = useState(initialQuery);
    const [query, setQuery]     = useState(initialQuery);
    const [type, setType]       = useState<SearchType>(SearchType.Search);

    // Sync initialQuery when it changes (e.g., from URL params)
    const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);
    if (initialQuery !== prevInitialQuery) {
        setPrevInitialQuery(initialQuery);
        setInput(initialQuery);
        setQuery(initialQuery);
        setType(SearchType.Search);
    }

    const { data: results, isLoading } = useMusicSearch(query, type);

    const submitSearch = () => {
        if (input.trim()) {
            setQuery(input);
            setType(SearchType.Search);
        }
    };

    const searchByGenre = (genre: string) => {
        setInput(genre);
        setQuery(genre);
        setType(SearchType.Tag);
    };

    return {
        input,
        setInput,
        results,
        isLoading,
        submitSearch,
        searchByGenre,
    };
}
