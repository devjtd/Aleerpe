
import React, { useState } from 'react';
import { Upload as UploadIcon, X, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useManga } from '../contexts/MangaContext';
import { useNavigate } from 'react-router-dom';
import { Manga } from '../types';

export const Upload: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { addManga } = useManga();
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState('');
  const [genres, setGenres] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'En curso' | 'Finalizado' | 'Pausado'>('En curso');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auth Guard (Simulated)
  if (!isAuthenticated) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-[#F5EFEF]">
              <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Debes iniciar sesión</h2>
                  <p className="text-gray-500 mb-6">Para subir contenido, necesitas una cuenta de autor.</p>
                  <button onClick={() => navigate('/login')} className="bg-[#C0392B] text-white px-6 py-2 rounded font-bold">Ir al Login</button>
              </div>
          </div>
      );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          setCoverImage(file);
          setCoverPreview(URL.createObjectURL(file));
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!title || !description || !user) return;

      setIsSubmitting(true);

      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newManga: Manga = {
          id: `m-${Date.now()}`,
          title,
          genre: genres.split(',').map(g => g.trim()),
          description,
          status,
          rating: 0, // New items start at 0
          rank: undefined,
          author: user.username,
          authorId: user.id,
          coverUrl: coverPreview || 'https://picsum.photos/id/10/300/450', // Fallback or Blob URL
          stats: {
              views: 0,
              likes: 0,
              revenue: 0,
              monthlyGrowth: 0
          }
      };

      addManga(newManga);
      setIsSubmitting(false);
      navigate('/authors'); // Redirect to Hub
  };

  return (
    <div className="min-h-screen bg-[#EAE2E2]">
      {/* Header Banner */}
      <div className="bg-[#C0392B] text-white py-8 px-4 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
            <h1 className="text-3xl font-black uppercase tracking-wider">Subir Nueva Obra</h1>
            <p className="opacity-80 mt-2">Comparte tu historia con millones de lectores</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-20 bg-white/10 skew-x-[-20deg] transform translate-x-10"></div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="flex-1 space-y-8 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                
                <div className="space-y-2">
                    <label className="block text-gray-800 font-bold text-lg">• Título de la serie</label>
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#C0392B] transition-shadow"
                        placeholder="Ej: El Guerrero del Sol"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-800 font-bold text-lg">• Género principal y secundario</label>
                    <input 
                        type="text" 
                        value={genres}
                        onChange={(e) => setGenres(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#C0392B]"
                        placeholder="Ej: Acción, Aventura, Fantasía"
                        required
                    />
                    <p className="text-xs text-gray-500">Separados por comas</p>
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-800 font-bold text-lg">• Descripción breve</label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-md p-4 h-32 focus:outline-none focus:ring-2 focus:ring-[#C0392B]"
                        placeholder="Escribe una sinopsis atrapante..."
                        required
                    ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-gray-800 font-bold text-lg">• Tipo</label>
                        <select className="w-full bg-gray-50 border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#C0392B]">
                            <option>Manga</option>
                            <option>Manhwa</option>
                            <option>Cómic Americano</option>
                            <option>Novela Ligera</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-800 font-bold text-lg">• Estado</label>
                        <select 
                            value={status}
                            onChange={(e) => setStatus(e.target.value as any)}
                            className="w-full bg-gray-50 border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#C0392B]"
                        >
                            <option value="En curso">En curso</option>
                            <option value="Finalizado">Finalizado</option>
                            <option value="Pausado">Pausado</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-800 font-bold text-lg">• Imagen de portada (URL o Archivo)</label>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer group">
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <UploadIcon size={32} className="text-gray-400 group-hover:text-[#C0392B] mb-2" />
                        <span className="text-sm text-gray-500 font-medium">Click para subir imagen</span>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-[#C0392B] text-white px-10 py-3 rounded font-bold hover:bg-[#A93226] transition-transform active:scale-95 shadow-lg flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>Publicando...</>
                        ) : (
                            <>
                                <CheckCircle size={20} /> PUBLICAR OBRA
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Preview Section */}
            <div className="w-full lg:w-80 flex flex-col gap-4">
                <h3 className="text-gray-800 font-bold text-lg">Vista Previa</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="aspect-[2/3] bg-gray-100 rounded mb-3 overflow-hidden relative">
                        {coverPreview ? (
                            <img src={coverPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <ImageIcon size={48} className="mb-2 opacity-50"/>
                                <span className="text-xs">Sin portada</span>
                            </div>
                        )}
                        <div className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white">
                            <UploadIcon size={12} />
                        </div>
                    </div>
                    <div className="text-center">
                        <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-full mb-1 bg-green-100 text-green-800 border border-green-200 uppercase">
                            {status}
                        </span>
                        <h4 className="font-bold text-gray-800 text-lg leading-tight line-clamp-2">
                            {title || 'Título de tu obra'}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{user?.username || 'Autor'}</p>
                    </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="font-bold text-blue-800 text-sm mb-2">Consejos de publicación</h4>
                    <ul className="text-xs text-blue-700 space-y-2 list-disc pl-4">
                        <li>Usa imágenes de alta calidad (min. 800x1200px).</li>
                        <li>Escribe una descripción que enganche en las primeras 2 líneas.</li>
                        <li>Asegúrate de tener los derechos de la obra.</li>
                    </ul>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};
