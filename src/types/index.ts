export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  cover: string;
  preview: string;
  duration: number;
}

export type RepeatMode = 'none' | 'one' | 'all';

export interface Mix {
  id: string;
  title: string;
  desc: string;
  colors: string;
}
