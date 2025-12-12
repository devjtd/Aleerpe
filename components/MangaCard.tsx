import React from 'react';
import { Manga } from '../types';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface MangaCardProps {
  manga: Manga;
}

export const MangaCard: React.FC<MangaCardProps> = ({ manga }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const getStatusStyle = (status: string) => {
    switch (status) {
        case 'Finalizado':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'Pausado':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'En curso':
        case 'Publicándose':
        default:
            return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getTranslatedStatus = (status: string) => {
      switch (status) {
        case 'Finalizado': return t('status_finished');
        case 'Pausado': return t('status_paused');
        default: return t('status_ongoing');
      }
  };

  return (
    <div className="flex flex-col w-full group cursor-pointer h-full" onClick={() => navigate(`/manga/${manga.id}`)}>
      <div className="relative overflow-hidden rounded-md shadow-md aspect-[2/3] mb-2">
        <img 
          src={manga.coverUrl} 
          alt={manga.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full backdrop-blur-sm text-white hover:bg-red-600 transition-colors">
          <Bookmark size={16} />
        </div>
        
        {/* Badge overlay similar to design */}
        {manga.rank && (
            <div className="absolute top-0 left-0 bg-yellow-500 text-white font-bold px-3 py-1 rounded-br-lg z-10 shadow-sm">
                #{manga.rank}
            </div>
        )}
      </div>

      <div className="text-center flex flex-col items-center flex-grow">
        {/* Updated Status Badge */}
        <div className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full mb-2 uppercase tracking-wide border ${getStatusStyle(manga.status)}`}>
          {getTranslatedStatus(manga.status)}
        </div>

        <h3 className="font-bold text-gray-800 text-lg leading-tight line-clamp-2 min-h-[3rem] group-hover:text-[#C0392B] transition-colors">
          {manga.title}
        </h3>
        
        {manga.author && (
            <p className="text-xs text-gray-500 mt-1 mb-2">{manga.author}</p>
        )}

        <div className="mt-auto w-full pt-2">
            <button className="w-full bg-gray-100 text-gray-900 border border-gray-200 rounded-md py-2 text-sm font-bold hover:bg-[#C0392B] hover:text-white hover:border-[#C0392B] transition-all duration-200 shadow-sm">
            {t('btn_chapters')}
            </button>
        </div>
      </div>
    </div>
  );
};