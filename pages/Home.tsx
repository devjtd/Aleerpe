
import React from 'react';
import { MANGAS } from '../constants';
import { MangaCard } from '../components/MangaCard';
import { ChevronLeft, ChevronRight, Rocket } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="pb-20">
      {/* Hero Section (Carousel Simulation) */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-gray-900 group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        <img
          src="../Mangas/PortadaIni.webp"
          alt="Hero Banner"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute bottom-0 left-0 w-full p-8 z-20 container mx-auto">
          <span className="bg-[#C0392B] text-white px-2 py-1 text-xs font-bold uppercase rounded mb-3 inline-block">{t('hero_featured')}</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2 drop-shadow-lg font-serif">EL HIJO MENOR <br />DEL MAESTRO ESPADA</h1>
          <p className="text-gray-200 max-w-2xl line-clamp-2 mb-6">
            Una historia de redención y poder absoluto. Sigue el viaje del guerrero más fuerte en su búsqueda por reclamar su derecho de nacimiento.
          </p>
          <button
            onClick={() => navigate('/manga/1')}
            className="bg-[#C0392B] hover:bg-[#A93226] text-white px-8 py-3 rounded font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg"
          >
            {t('hero_read_now')}
          </button>
        </div>

        {/* Carousel controls */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/20 transition-colors z-20">
          <ChevronLeft size={32} />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/20 transition-colors z-20">
          <ChevronRight size={32} />
        </button>
      </section>

      {/* Crowdfunding Banner (New) */}
      <div className="container mx-auto px-4 mt-8">
        <Link to="/project/1" className="block relative rounded-xl overflow-hidden shadow-2xl group">
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors z-10"></div>
          <img src="https://picsum.photos/id/338/1200/400" className="w-full h-48 object-cover grayscale" alt="Crowdfunding" />
          <div className="absolute inset-0 z-20 flex items-center justify-between px-8 md:px-16">
            <div>
              <span className="bg-yellow-400 text-black text-xs font-black px-2 py-1 uppercase rounded mb-2 inline-block">Crowdfunding</span>
              <h2 className="text-white text-2xl md:text-3xl font-black italic">APOYA A LOS CREADORES</h2>
              <p className="text-gray-200 text-sm md:text-base max-w-lg hidden md:block">
                Participa en la financiación de "Nuestro Mundo en Estéreo" y obtén recompensas exclusivas.
              </p>
            </div>
            <div className="bg-white text-black rounded-full p-4 group-hover:scale-110 transition-transform">
              <Rocket size={24} className="text-[#C0392B]" />
            </div>
          </div>
        </Link>
      </div>

      {/* Ad Banner */}
      <div className="container mx-auto px-4 py-8">
        <div className="w-full h-24 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-lg flex items-center justify-center relative overflow-hidden shadow-inner">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <h2 className="text-white text-xl md:text-2xl font-bold italic relative z-10">
            TRIDENT CON TU SERIE FAVORITA <span className="text-yellow-400">¡PRUÉBALOS TODOS!</span>
          </h2>
        </div>
      </div>

      {/* Section: Populares */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex items-center gap-2 mb-6 border-l-4 border-[#C0392B] pl-4">
          <h2 className="text-2xl font-bold text-gray-800">{t('section_popular')} <span className="font-light text-gray-500">{t('section_popular_sub')}</span></h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {MANGAS.map((manga) => (
            <MangaCard key={`pop-${manga.id}`} manga={manga} />
          ))}
        </div>
      </section>

      {/* Section: Nuevos Capítulos */}
      <section className="container mx-auto px-4 bg-gray-50 py-12 rounded-xl">
        <div className="flex items-center gap-2 mb-6 border-l-4 border-[#C0392B] pl-4">
          <h2 className="text-2xl font-bold text-gray-800">{t('section_new')} <span className="font-light text-gray-500">{t('section_new_sub')}</span></h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[...MANGAS].reverse().map((manga) => (
            <MangaCard key={`new-${manga.id}`} manga={manga} />
          ))}
        </div>
      </section>
    </div>
  );
};
