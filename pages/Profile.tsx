import React, { useEffect } from 'react';
import { MOCK_USER, MANGAS } from '../constants';
import { Upload } from 'lucide-react';
import { MangaCard } from '../components/MangaCard';

export const Profile: React.FC = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5EFEF]">
      <div className="bg-[#C0392B] h-32 w-full relative">
        <h1 className="text-white text-4xl font-serif font-bold text-center pt-8 opacity-90">PERFIL DE USUARIO</h1>
      </div>

      <div className="container mx-auto px-4 -mt-16 pb-20">
        
        {/* Profile Card */}
        <div className="flex flex-col items-center mb-12">
            <div className="relative">
                <img 
                    src={MOCK_USER.avatarUrl} 
                    alt={MOCK_USER.username} 
                    className="w-48 h-48 rounded-full border-4 border-[#F5EFEF] shadow-xl object-cover"
                />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mt-4">{MOCK_USER.username}</h2>
            <p className="text-gray-500 font-medium text-lg">{MOCK_USER.handle}</p>
        </div>

        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-8 border-b-2 border-[#E0D8D8] pb-4">
            <h3 className="text-2xl font-bold text-[#C0392B]">Mi lista</h3>
            
            <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded font-bold hover:bg-gray-300 transition-colors">
                    <Upload size={18} />
                    <span>SUBIR</span>
                </button>
                 <button className="bg-white border border-gray-300 px-8 py-2 rounded font-medium shadow-sm">
                    Leyendo
                </button>
            </div>
        </div>

        {/* List Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {MANGAS.slice(0, 4).map(manga => (
                <MangaCard key={manga.id} manga={manga} />
            ))}
        </div>
      </div>
    </div>
  );
};
