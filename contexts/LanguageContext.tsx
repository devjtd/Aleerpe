
import React, { createContext, useContext, useState } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    nav_home: "Inicio",
    nav_categories: "Categorías",
    nav_publish: "Publicar",
    nav_premium: "Premium",
    nav_donate: "Donar",
    search_placeholder: "Buscar...",
    hero_featured: "Destacado",
    hero_read_now: "Leer Ahora",
    section_popular: "Populares",
    section_popular_sub: "del día",
    section_new: "Nuevos",
    section_new_sub: "capítulos",
    status_ongoing: "En curso",
    status_finished: "Finalizado",
    status_paused: "Pausado",
    btn_chapters: "Ver capítulos",
    footer_rights: "Todos los derechos reservados.",
    cat_title: "Explorar por Género",
    cat_all: "Todos",
    filter_status: "Estado",
    filter_all_status: "Todos los estados"
  },
  en: {
    nav_home: "Home",
    nav_categories: "Categories",
    nav_publish: "Publish",
    nav_premium: "Premium",
    nav_donate: "Donate",
    search_placeholder: "Search...",
    hero_featured: "Featured",
    hero_read_now: "Read Now",
    section_popular: "Popular",
    section_popular_sub: "today",
    section_new: "New",
    section_new_sub: "chapters",
    status_ongoing: "Ongoing",
    status_finished: "Completed",
    status_paused: "Paused",
    btn_chapters: "View Chapters",
    footer_rights: "All rights reserved.",
    cat_title: "Browse by Genre",
    cat_all: "All",
    filter_status: "Status",
    filter_all_status: "All Statuses"
  },
  pt: {
    nav_home: "Início",
    nav_categories: "Categorias",
    nav_publish: "Publicar",
    nav_premium: "Premium",
    nav_donate: "Doar",
    search_placeholder: "Buscar...",
    hero_featured: "Destaque",
    hero_read_now: "Ler Agora",
    section_popular: "Populares",
    section_popular_sub: "do dia",
    section_new: "Novos",
    section_new_sub: "capítulos",
    status_ongoing: "Em andamento",
    status_finished: "Finalizado",
    status_paused: "Pausado",
    btn_chapters: "Ver capítulos",
    footer_rights: "Todos os direitos reservados.",
    cat_title: "Explorar por Gênero",
    cat_all: "Todos",
    filter_status: "Estado",
    filter_all_status: "Todos os estados"
  },
  fr: {
    nav_home: "Accueil",
    nav_categories: "Catégories",
    nav_publish: "Publier",
    nav_premium: "Premium",
    nav_donate: "Faire un don",
    search_placeholder: "Rechercher...",
    hero_featured: "En vedette",
    hero_read_now: "Lire maintenant",
    section_popular: "Populaire",
    section_popular_sub: "aujourd'hui",
    section_new: "Nouveaux",
    section_new_sub: "chapitres",
    status_ongoing: "En cours",
    status_finished: "Terminé",
    status_paused: "En pause",
    btn_chapters: "Voir les chapitres",
    footer_rights: "Tous droits réservés.",
    cat_title: "Parcourir par genre",
    cat_all: "Tous",
    filter_status: "Statut",
    filter_all_status: "Tous les statuts"
  },
  it: {
    nav_home: "Home",
    nav_categories: "Categorie",
    nav_publish: "Pubblicare",
    nav_premium: "Premium",
    nav_donate: "Donare",
    search_placeholder: "Cerca...",
    hero_featured: "In primo piano",
    hero_read_now: "Leggi ora",
    section_popular: "Popolare",
    section_popular_sub: "oggi",
    section_new: "Nuovi",
    section_new_sub: "capitoli",
    status_ongoing: "In corso",
    status_finished: "Completato",
    status_paused: "In pausa",
    btn_chapters: "Vedi capitoli",
    footer_rights: "Tutti i diritti riservati.",
    cat_title: "Sfoglia per genere",
    cat_all: "Tutti",
    filter_status: "Stato",
    filter_all_status: "Tutti gli stati"
  },
  ja: {
    nav_home: "ホーム",
    nav_categories: "カテゴリー",
    nav_publish: "投稿",
    nav_premium: "プレミアム",
    nav_donate: "寄付",
    search_placeholder: "検索...",
    hero_featured: "注目",
    hero_read_now: "今すぐ読む",
    section_popular: "人気",
    section_popular_sub: "今日",
    section_new: "新着",
    section_new_sub: "チャプター",
    status_ongoing: "連載中",
    status_finished: "完結",
    status_paused: "休載中",
    btn_chapters: "チャプターを見る",
    footer_rights: "無断複写・転載を禁じます。",
    cat_title: "ジャンル別",
    cat_all: "すべて",
    filter_status: "状態",
    filter_all_status: "すべての状態"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
