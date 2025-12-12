
import React, { useState } from 'react';
import { MANGAS } from '../constants';
import { MangaCard } from '../components/MangaCard';
import { useLanguage } from '../contexts/LanguageContext';
import { Filter, Search as SearchIcon, XCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export const Categories: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Extract unique genres from constants
  const allGenres = Array.from(new Set(MANGAS.flatMap(m => m.genre || []))).sort();
  const genres = ['All', ...allGenres];

  const statuses = ['All', 'En curso', 'Finalizado', 'Pausado'];

  const filteredMangas = MANGAS.filter(manga => {
    // 1. Genre Filter
    const genreMatch = selectedGenre === 'All' || (manga.genre && manga.genre.includes(selectedGenre));
    
    // 2. Status Filter
    const statusMatch = selectedStatus === 'All' || manga.status === selectedStatus;
    
    // 3. Search Query Filter (Title or Author)
    const queryMatch = searchQuery 
        ? manga.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          (manga.author && manga.author.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;

    return genreMatch && statusMatch && queryMatch;
  });

  const clearFilters = () => {
    setSelectedGenre('All');
    setSelectedStatus('All');
    setSearchParams({}); // Clear URL params
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-[#1a1a1a] text-white py-12 px-4 shadow-lg">
        <div className="container mx-auto">
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 font-serif">
                {t('nav_categories')}
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg">
                {t('cat_title')}
            </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Search Breadcrumb */}
        {searchQuery && (
            <div className="mb-6 flex items-center gap-2">
                <span className="text-gray-500 font-bold">Resultados de búsqueda para:</span>
                <span className="bg-[#C0392B] text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                    "{searchQuery}"
                    <button onClick={() => setSearchParams({})} className="hover:text-gray-200">
                        <XCircle size={16} />
                    </button>
                </span>
            </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
                {/* Status Filter */}
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Filter size={18} /> {t('filter_status')}
                    </h3>
                    <div className="flex flex-col gap-2">
                        {statuses.map(status => (
                            <label key={status} className="flex items-center gap-2 cursor-pointer group">
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedStatus === status ? 'border-[#C0392B]' : 'border-gray-300'}`}>
                                    {selectedStatus === status && <div className="w-2 h-2 bg-[#C0392B] rounded-full"></div>}
                                </div>
                                <input 
                                    type="radio" 
                                    name="status" 
                                    value={status} 
                                    checked={selectedStatus === status}
                                    onChange={() => setSelectedStatus(status)}
                                    className="hidden"
                                />
                                <span className={`text-sm ${selectedStatus === status ? 'font-bold text-[#C0392B]' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                    {status === 'All' ? t('filter_all_status') : 
                                     status === 'En curso' ? t('status_ongoing') :
                                     status === 'Finalizado' ? t('status_finished') :
                                     status === 'Pausado' ? t('status_paused') : status}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Genre Filter */}
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">{t('cat_title')}</h3>
                    <div className="flex flex-wrap gap-2">
                        {genres.map(genre => (
                            <button
                                key={genre}
                                onClick={() => setSelectedGenre(genre)}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                                    selectedGenre === genre 
                                    ? 'bg-[#C0392B] text-white shadow-md transform scale-105' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {genre === 'All' ? t('cat_all') : genre}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Results Grid */}
            <main className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        {filteredMangas.length} Resultados
                    </h2>
                </div>

                {filteredMangas.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredMangas.map(manga => (
                            <MangaCard key={manga.id} manga={manga} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-lg border border-gray-200 flex flex-col items-center">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <SearchIcon size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">No encontramos nada</h3>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">Intenta con otros términos de búsqueda o ajusta los filtros.</p>
                        <button 
                            onClick={clearFilters}
                            className="text-[#C0392B] font-bold hover:underline bg-red-50 px-6 py-2 rounded-full"
                        >
                            Limpiar todo
                        </button>
                    </div>
                )}
            </main>
        </div>
      </div>
    </div>
  );
};
