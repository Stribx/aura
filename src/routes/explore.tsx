import { createFileRoute } from '@tanstack/react-router';
import { ExploreWrapper } from '@/features/explore/ExploreWrapper';

type ExploreSearch = {
    q?: string;
};

export const Route = createFileRoute('/explore')({
    validateSearch: (search: Record<string, unknown>): ExploreSearch => {
        return {
            q: typeof search.q === 'string' ? search.q : undefined,
        };
    },
    component: ExploreWrapper,
})
