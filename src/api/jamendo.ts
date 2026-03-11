import type { Song } from '@/types';
import type { MusicApiService } from './types';

const CLIENT_ID = import.meta.env.VITE_JAMENDO_CLIENT_ID;

if (!CLIENT_ID) {
  console.warn('[Aura] VITE_JAMENDO_CLIENT_ID is missing. API calls will fail.');
}

interface JamendoTrack {
  id: string;
  name: string;
  artist_name: string;
  album_name?: string;
  image: string;
  audio: string;
  duration: number;
}

async function fetchJson(endpoint: string) {
  const separator = endpoint.includes('?') ? '&' : '?';
  const url = `/api${endpoint}${separator}client_id=${CLIENT_ID}&format=json`;
  
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Jamendo API error ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

function mapTrack(t: JamendoTrack): Song {
  return {
    id: t.id,
    title: t.name,
    artist: t.artist_name,
    album: t.album_name,
    cover: t.image,
    preview: t.audio,
    duration: t.duration,
  };
}

export const jamendoApi: MusicApiService = {
  getPopularTracks: async (limit = 50): Promise<Song[]> => {
    const data = await fetchJson(`/tracks?limit=${limit}&imagesize=500&boost=popularity_month`);
    return (data.results ?? []).map(mapTrack);
  },

  searchTracks: async (query: string, type: 'search' | 'tag' = 'search'): Promise<Song[]> => {
    const param = type === 'tag' ? `tags=${encodeURIComponent(query)}` : `search=${encodeURIComponent(query)}`;
    const data = await fetchJson(`/tracks?limit=50&imagesize=500&${param}`);
    return (data.results ?? []).map(mapTrack);
  }
};
