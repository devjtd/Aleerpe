import { Manga, Chapter } from '../types';

const STORAGE_KEYS = {
  MANGAS: 'aleerpe_mangas',
  CHAPTERS: 'aleerpe_chapters',
  USER_DATA: 'aleerpe_user_data'
};

// Storage Service for persisting manga and chapter data
export const storageService = {
  // Manga operations
  saveMangasToStorage(mangas: Manga[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.MANGAS, JSON.stringify(mangas));
    } catch (error) {
      console.error('Error saving mangas to storage:', error);
    }
  },

  loadMangasFromStorage(): Manga[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MANGAS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading mangas from storage:', error);
      return [];
    }
  },

  // Chapter operations
  saveChaptersToStorage(chapters: Record<string, Chapter[]>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAPTERS, JSON.stringify(chapters));
    } catch (error) {
      console.error('Error saving chapters to storage:', error);
    }
  },

  loadChaptersFromStorage(): Record<string, Chapter[]> {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHAPTERS);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading chapters from storage:', error);
      return {};
    }
  },

  // Clear all data (useful for debugging)
  clearAllData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.MANGAS);
      localStorage.removeItem(STORAGE_KEYS.CHAPTERS);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};
