export interface WordLyric {
  text: string;
  time: number;
}

export interface LyricLine {
  time: number;
  text: string;
  words?: WordLyric[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  bpm?: number;
  duration: string;
  spotifyUrl: string;
  vibe: string;
  audioSrc?: string;
  bestPartOffset?: number;
  lyrics?: LyricLine[];
  color?: string;
}

export interface BentoCardData {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  tag?: string;
}
