import type { Song } from '@/types';

export interface MusicApiService {
  getPopularTracks(limit?: number): Promise<Song[]>;
  searchTracks(query: string, type?: 'search' | 'tag'): Promise<Song[]>;
}
