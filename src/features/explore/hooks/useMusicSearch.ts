import { useQuery } from '@tanstack/react-query';
import { useApi } from '@/api/ApiContext';

const STALE_TIME = 5 * 60 * 1000;

export function useMusicSearch(query: string, type: 'search' | 'tag' = 'search') {
  const api = useApi();

  return useQuery({
    queryKey: ['music-search', query, type],
    queryFn: () => api.searchTracks(query, type),
    enabled: !!query,
    staleTime: STALE_TIME,
  });
}
