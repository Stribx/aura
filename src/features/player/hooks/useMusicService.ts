import { useQuery } from '@tanstack/react-query';
import { useApi } from '@/api/ApiContext';

const STALE_TIME = 5 * 60 * 1000;

export function useMusicService() {
  const api = useApi();

  const songsQuery = useQuery({
    queryKey: ['music-tracks-popular'],
    queryFn: () => api.getPopularTracks(),
    staleTime: STALE_TIME,
  });

  return {
    songs: songsQuery.data ?? [],
    loading: songsQuery.isLoading,
    error: songsQuery.error,
  };
}
