
import React from 'react';
import { BookOpen, Upload, DollarSign, Users, ChevronRight, TrendingUp, BarChart3, PlusCircle, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useManga } from '../contexts/MangaContext';

export const AuthorHub: React.FC = () => {
  const { user } = useAuth();
  const { getMangasByAuthor } = useManga();
  const navigate = useNavigate();

  // Get dynamic data
  const myMangas = user ? getMangasByAuthor(user.id) : [];

  // Calculate Metrics
  const totalViews = myMangas.reduce((acc, curr) => acc + (curr.stats?.views || 0), 0);
  const totalRevenue = myMangas.reduce((acc, curr) => acc + (curr.stats?.revenue || 0), 0);
  const totalLikes = myMangas.reduce((acc, curr) => acc + (curr.stats?.likes || 0), 0);

  // Formatter for currency
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  // Formatter for large numbers
  const formatNumber = (num: number) => {
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
      return num.toString();
  };

  return (
    <div className="min-h-screen bg-[#F5EFEF] font-sans pb-20">
      
      {/* Header Banner - Dashboard Style */}
      <div className="bg-[#1a1a1a] text-white py-8 px-4 border-b border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-[#C0392B] p-3 rounded-lg">
                    <LayoutDashboard size={24} className="text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-black uppercase tracking-tight">Panel de Autor</h1>
                    <p className="text-gray-400 text-sm">Bienvenido, {user?.username}</p>
                </div>
            </div>
            
            <div className="flex gap-3">
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded font-bold text-sm transition-colors border border-gray-700">
                    Configuración
                </button>
                <Link to="/upload" className="bg-[#C0392B] hover:bg-[#A93226] text-white px-4 py-2 rounded font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-red-900/20">
                    <PlusCircle size={16} /> Nueva Obra
                </Link>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6">
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Revenue Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm font-bold uppercase mb-1">Ganancias Totales</p>
                    <h3 className="text-3xl font-black text-gray-800">{formatCurrency(totalRevenue)}</h3>
                    <span className="text-green-500 text-xs font-bold flex items-center mt-2">
                        <TrendingUp size={12} className="mr-1"/> +12.5% este mes
                    </span>
                </div>
                <div className="bg-green-100 p-4 rounded-full text-green-600">
                    <DollarSign size={28} />
                </div>
            </div>

            {/* Views Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm font-bold uppercase mb-1">Lecturas Totales</p>
                    <h3 className="text-3xl font-black text-gray-800">{formatNumber(totalViews)}</h3>
                    <span className="text-blue-500 text-xs font-bold flex items-center mt-2">
                        <Users size={12} className="mr-1"/> +8.2% nuevos lectores
                    </span>
                </div>
                <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                    <BookOpen size={28} />
                </div>
            </div>

            {/* Engagement Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm font-bold uppercase mb-1">Me Gusta Totales</p>
                    <h3 className="text-3xl font-black text-gray-800">{formatNumber(totalLikes)}</h3>
                    <span className="text-yellow-500 text-xs font-bold flex items-center mt-2">
                        <BarChart3 size={12} className="mr-1"/> Top 5% de autores
                    </span>
                </div>
                <div className="bg-yellow-100 p-4 rounded-full text-yellow-600">
                    <TrendingUp size={28} />
                </div>
            </div>
        </div>

        {/* Works Section */}
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left: My Mangas List */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black text-gray-800 uppercase tracking-wide border-l-4 border-[#C0392B] pl-3">
                        Mis Obras Publicadas
                    </h3>
                </div>

                {myMangas.length > 0 ? (
                     <div className="space-y-4">
                        {myMangas.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex gap-4 group">
                                <div className="w-20 aspect-[2/3] bg-gray-200 rounded overflow-hidden flex-shrink-0 relative">
                                    <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover" />
                                    <div className={`absolute top-0 left-0 w-full h-1 ${item.status === 'En curso' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-lg text-gray-800 group-hover:text-[#C0392B] transition-colors line-clamp-1">{item.title}</h4>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${item.status === 'En curso' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 line-clamp-1 mt-1">{item.description}</p>
                                    </div>
                                    
                                    <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-100">
                                        <div className="text-xs">
                                            <span className="text-gray-400 block mb-0.5">Vistas</span>
                                            <span className="font-bold text-gray-700">{formatNumber(item.stats?.views || 0)}</span>
                                        </div>
                                        <div className="text-xs">
                                            <span className="text-gray-400 block mb-0.5">Ganancias</span>
                                            <span className="font-bold text-gray-700">{formatCurrency(item.stats?.revenue || 0)}</span>
                                        </div>
                                        <div className="flex-1 text-right">
                                            <button 
                                                onClick={() => navigate(`/manga/${item.id}`)}
                                                className="text-[#C0392B] text-xs font-bold hover:underline"
                                            >
                                                Gestionar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-12 rounded-lg border-2 border-dashed border-gray-300 text-center">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <BookOpen size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">No tienes obras publicadas</h3>
                        <p className="text-gray-500 mb-6 text-sm">Comienza a construir tu legado hoy mismo.</p>
                        <Link to="/upload" className="inline-flex items-center gap-2 bg-[#C0392B] text-white px-6 py-2.5 rounded font-bold hover:bg-[#A93226] transition-colors shadow-lg">
                            <Upload size={18} /> Subir mi primera obra
                        </Link>
                    </div>
                )}
            </div>

            {/* Right: Resources & Tips */}
            <div className="w-full lg:w-80 space-y-6">
                
                {/* Promo Box */}
                <div className="bg-gradient-to-br from-[#2c3e50] to-[#000] p-6 rounded-xl text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h4 className="font-black text-lg mb-2 text-yellow-400">PROGRAMA DE SOCIOS</h4>
                        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                            Únete al nivel Premium para desbloquear monetización avanzada y promoción en portada.
                        </p>
                        <button className="bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded hover:bg-gray-100 transition-colors">
                            Ver Requisitos
                        </button>
                    </div>
                    <div className="absolute -bottom-4 -right-4 opacity-20">
                        <DollarSign size={100} />
                    </div>
                </div>

                 {/* Steps Recap */}
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-4 uppercase text-sm tracking-wide">Guía Rápida</h4>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <span className="bg-[#C0392B] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                            <p className="text-xs text-gray-600 leading-snug">
                                <span className="font-bold text-gray-800">Sube tu contenido:</span> Asegúrate de que las imágenes tengan alta resolución.
                            </p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="bg-[#C0392B] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                            <p className="text-xs text-gray-600 leading-snug">
                                <span className="font-bold text-gray-800">Revisión:</span> Nuestro equipo aprobará tu obra en 24-48 horas.
                            </p>
                        </li>
                         <li className="flex items-start gap-3">
                            <span className="bg-[#C0392B] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                            <p className="text-xs text-gray-600 leading-snug">
                                <span className="font-bold text-gray-800">Gana dinero:</span> Recibe el 70% de los ingresos por suscripciones.
                            </p>
                        </li>
                    </ul>
                 </div>

            </div>
        </div>
      </div>
    </div>
  );
};
