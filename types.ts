
export interface Manga {
  id: string;
  title: string;
  coverUrl: string;
  rating: number;
  status: 'En curso' | 'Finalizado' | 'Pausado';
  genre: string[];
  description?: string;
  author?: string;
  authorId?: string; // Link to User ID
  rank?: number;
  stats?: {
    views: number;
    likes: number;
    revenue: number;
    monthlyGrowth: number; // percentage
  };
}

export interface Chapter {
  id: string;
  title: string;
  pageCount: number;
  pages: string[]; // URLs
}

export interface User {
  id: string;
  username: string;
  email: string; // Added email
  handle: string;
  avatarUrl: string;
  isVerified: boolean;
  tokens: number; // Added tokens for AI translation limit
  isAuthor?: boolean; // Flag to identify content creators
}

export interface TranslationResult {
  originalText: string;
  translatedText: string;
  speaker?: string;
}

export interface AudioSegment {
  pageIndex: number;
  text: string;
  duration?: number; // Estimated duration
}

export enum ReaderMode {
  SCROLL = 'SCROLL',
  SINGLE = 'SINGLE'
}

export type Language = 'es' | 'en' | 'pt' | 'fr' | 'it' | 'ja';
