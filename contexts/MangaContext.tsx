
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Manga, Chapter } from '../types';
import { MANGAS as INITIAL_MANGAS, CHAPTERS as INITIAL_CHAPTERS } from '../constants';
import { storageService } from '../services/storageService';

interface MangaContextType {
  mangas: Manga[];
  addManga: (manga: Manga) => void;
  getMangasByAuthor: (authorId: string) => Manga[];
  getChapters: (mangaId: string) => Chapter[];
  addChapter: (mangaId: string, chapter: Chapter) => void;
}

const MangaContext = createContext<MangaContextType | undefined>(undefined);

export const MangaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with stored mangas merged with initial mangas
  const [mangas, setMangas] = useState<Manga[]>(() => {
    const storedMangas = storageService.loadMangasFromStorage();
    // Merge: stored user mangas + initial mangas (avoiding duplicates)
    const initialIds = new Set(INITIAL_MANGAS.map(m => m.id));
    const userMangas = storedMangas.filter(m => !initialIds.has(m.id));
    return [...userMangas, ...INITIAL_MANGAS];
  });

  const [chapters, setChapters] = useState<Record<string, Chapter[]>>(() => {
    const storedChapters = storageService.loadChaptersFromStorage();
    // Merge stored chapters with initial chapters
    return { ...INITIAL_CHAPTERS, ...storedChapters };
  });

  // Persist mangas to localStorage whenever they change
  useEffect(() => {
    // Only save user-created mangas (those not in INITIAL_MANGAS)
    const initialIds = new Set(INITIAL_MANGAS.map(m => m.id));
    const userMangas = mangas.filter(m => !initialIds.has(m.id));
    storageService.saveMangasToStorage(userMangas);
  }, [mangas]);

  // Persist chapters to localStorage whenever they change
  useEffect(() => {
    // Only save user-created chapters (those not in INITIAL_CHAPTERS)
    const userChapters: Record<string, Chapter[]> = {};
    Object.keys(chapters).forEach(mangaId => {
      if (!INITIAL_CHAPTERS[mangaId] || chapters[mangaId] !== INITIAL_CHAPTERS[mangaId]) {
        userChapters[mangaId] = chapters[mangaId];
      }
    });
    storageService.saveChaptersToStorage(userChapters);
  }, [chapters]);

  const addManga = (newManga: Manga) => {
    setMangas(prev => [newManga, ...prev]);
  };

  const getMangasByAuthor = (authorId: string) => {
    return mangas.filter(m => m.authorId === authorId);
  };

  const getChapters = (mangaId: string): Chapter[] => {
    return chapters[mangaId] || [];
  };

  const addChapter = (mangaId: string, chapter: Chapter) => {
    setChapters(prev => ({
      ...prev,
      [mangaId]: [...(prev[mangaId] || []), chapter]
    }));
  };

  return (
    <MangaContext.Provider value={{ mangas, addManga, getMangasByAuthor, getChapters, addChapter }}>
      {children}
    </MangaContext.Provider>
  );
};

export const useManga = () => {
  const context = useContext(MangaContext);
  if (!context) {
    throw new Error('useManga must be used within a MangaProvider');
  }
  return context;
};
