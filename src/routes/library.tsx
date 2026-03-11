import { createFileRoute } from '@tanstack/react-router';
import { LibraryWrapper } from '@/features/library/LibraryWrapper';

type LibrarySearch = {
    tab?: string;
};

export const Route = createFileRoute('/library')({
    validateSearch: (search: Record<string, unknown>): LibrarySearch => {
        return {
            tab: typeof search.tab === 'string' ? search.tab : undefined,
        };
    },
    component: LibraryWrapper,
})
