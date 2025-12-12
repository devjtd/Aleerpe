
import React from 'react';
import { Bookmark, Share2, Heart, Clock, Users, DollarSign, Flag } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const ProjectFunding: React.FC = () => {
  const { id } = useParams();

  // Mock data representing the "Nuestro Mundo en Estéreo" project
  const project = {
    title: "Nuestro Mundo en Estéreo",
    subtitle: "Un proyecto para potenciar la aventura humana, sin límites.",
    image: "https://picsum.photos/id/338/1200/800", // Grayscale/moody image
    currentAmount: 300,
    goalAmount: 400,
    backers: 23,
    daysLeft: 10,
    deadline: "dom, 9 de noviembre de 2025",
    description: `En el ruidoso vagón del tren de las cinco de la tarde, dos estudiantes se sientan juntos, pero a mundos de distancia. Él, hundido en sí mismo, con el rostro consumido por una oscuridad tan densa que parece un abismo. Ella, con la mirada tranquila pero perdida en la pequeña pantalla de un reproductor de música.

    No cruzan palabra. No se miran. El único puente entre sus dos universos es el frágil cable blanco de un par de auriculares.
    
    Compartiendo la misma melodía, crean una burbuja invisible solo para ellos; un refugio de tres minutos y medio contra el resto del mundo. "Nuestro Mundo en Estéreo" es una historia corta sobre la soledad compartida, la depresión silenciosa y cómo, a veces, una simple canción es el único idioma que dos personas necesitan para entenderse.`
  };

  const progressPercentage = Math.min((project.currentAmount / project.goalAmount) * 100, 100);

  // Helper component for the Side Ads to match the PDF look
  const SideAd = () => (
    <div className="hidden 2xl:block w-[280px] bg-[#1a1a1a] sticky top-16 h-[calc(100vh-4rem)] overflow-hidden shrink-0">
        <div className="relative h-full w-full group cursor-pointer">
            <img 
                src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000&auto=format&fit=crop" 
                className="object-cover h-full w-full opacity-60 group-hover:opacity-70 transition-opacity grayscale"
                alt="Ad Background"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-between p-8 text-center py-12">
                <h3 className="text-3xl font-black text-white uppercase leading-tight drop-shadow-lg">
                    Esto es lo que<br/>llevamos dentro
                </h3>
                
                <div className="relative">
                    <div className="absolute inset-0 border-4 border-white/20 transform rotate-3"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60" 
                        alt="Burger" 
                        className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-2xl relative z-10"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-yellow-500 text-black font-black px-2 py-1 rounded text-xs transform -rotate-12 z-20">
                        150g CARNE
                    </div>
                </div>

                <div className="text-white">
                     <p className="text-sm font-serif italic mb-2">Originals Ibérica</p>
                     <h4 className="text-4xl font-black uppercase tracking-tighter">Originals</h4>
                     <p className="text-[10px] tracking-[0.2em] font-bold mt-1">by BURGER KING</p>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans flex justify-center">
      
      {/* Left Ad */}
      <SideAd />

      {/* Main Content Area */}
      <div className="flex-1 max-w-5xl w-full bg-white min-h-screen border-x border-gray-100 shadow-sm">
        
        <div className="p-8 md:p-12 lg:p-16">
            {/* Header Text */}
            <div className="mb-8">
                <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">{project.title}</h1>
                <p className="text-lg text-gray-500 font-light">{project.subtitle}</p>
            </div>

            {/* Main Image */}
            <div className="w-full aspect-[16/9] bg-gray-100 mb-8 overflow-hidden rounded-sm shadow-sm relative">
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" 
                />
            </div>

            {/* Progress Section */}
            <div className="mb-10">
                <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-gray-900">Progreso</span>
                </div>
                <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-[#E74C3C] rounded-full" 
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Stats Box */}
            <div className="bg-[#F3F3F3] p-8 rounded-lg mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Stat 1 */}
                    <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0">
                        <span className="text-gray-500 text-sm font-medium mb-1">Contribuido de {project.goalAmount}$</span>
                        <span className="text-4xl font-black text-gray-900">{project.currentAmount}$</span>
                    </div>
                    {/* Stat 2 */}
                    <div className="flex flex-col border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0 pl-0 md:pl-6">
                        <span className="text-gray-500 text-sm font-medium mb-1">Patrocinadores</span>
                        <span className="text-4xl font-black text-gray-900">{project.backers}</span>
                    </div>
                    {/* Stat 3 */}
                    <div className="flex flex-col pl-0 md:pl-6">
                        <span className="text-gray-500 text-sm font-medium mb-1">Días restantes</span>
                        <span className="text-4xl font-black text-gray-900">{project.daysLeft}</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button className="bg-[#E74C3C] hover:bg-[#C0392B] text-white font-bold text-lg py-4 px-8 rounded shadow-md transition-all transform active:scale-[0.98] flex-1">
                    Patrocina este proyecto
                </button>
                <button className="bg-white border-2 border-gray-200 text-gray-700 font-bold text-lg py-4 px-8 rounded hover:border-gray-400 transition-colors flex items-center justify-center gap-2">
                    <Bookmark size={20} /> Recordarme
                </button>
            </div>

            <p className="text-xs text-gray-400 mb-12 border-b border-gray-200 pb-8">
                Este proyecto solo se financiará si alcanza su objetivo antes del {project.deadline}.
            </p>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-200 mb-8">
                <button className="pb-4 text-sm font-bold text-gray-900 border-b-2 border-[#E74C3C]">Descripción general</button>
                <button className="pb-4 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">Comentarios (82)</button>
                <button className="pb-4 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">Actualizaciones</button>
            </div>

            {/* Content Body */}
            <div className="max-w-3xl">
                <h3 className="text-2xl font-black text-gray-900 mb-6">Acerca de este Oneshot</h3>
                <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line font-light">
                    {project.description}
                </div>
            </div>

        </div>
      </div>

      {/* Right Ad */}
      <SideAd />

    </div>
  );
};
