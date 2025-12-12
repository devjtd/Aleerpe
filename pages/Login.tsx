
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight, Lock, Mail, PenTool, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = (type: 'user' | 'author') => {
      if (type === 'author') {
          setEmail('author@aleerpe.com');
          setPassword('password123');
      } else {
          setEmail('lector@aleerpe.com');
          setPassword('password123');
      }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C0392B]/80 to-black/90 z-10" />
        <img 
            src="https://picsum.photos/id/60/1200/1600" 
            alt="Manga Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="relative z-20 flex flex-col justify-between h-full p-16 text-white">
            <div className="flex items-center gap-2">
                <BookOpen size={32} />
                <span className="text-2xl font-black font-pangolin tracking-tight">ALEERPE</span>
            </div>
            <div className="max-w-md">
                <h2 className="text-5xl font-black font-serif mb-6 leading-tight">Tu portal al multiverso del manga.</h2>
                <p className="text-lg text-gray-200 leading-relaxed">
                    Únete a nuestra comunidad y disfruta de traducción asistida por IA para leer sin barreras de idioma.
                </p>
            </div>
            <div className="text-sm text-white/50">
                © 2025 Aleerpe Inc.
            </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 bg-[#F5EFEF]">
         <div className="max-w-md w-full mx-auto">
            
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center gap-2 mb-8 text-[#C0392B]">
                <BookOpen size={28} />
                <span className="text-2xl font-black font-pangolin">ALEERPE</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido de nuevo</h1>
            <p className="text-gray-500 mb-8">Ingresa tus credenciales para continuar leyendo.</p>

            {/* Test Credentials Helper */}
            <div className="mb-6 flex gap-3">
                <button 
                    type="button"
                    onClick={() => handleDemoLogin('user')}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors"
                >
                    <User size={14} /> Demo: Lector
                </button>
                <button 
                    type="button"
                    onClick={() => handleDemoLogin('author')}
                    className="flex-1 bg-red-100 hover:bg-red-200 text-[#C0392B] text-xs font-bold py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors"
                >
                    <PenTool size={14} /> Demo: Autor
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail size={20} className="text-gray-400" />
                        </div>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C0392B] focus:border-transparent outline-none transition-shadow"
                            placeholder="nombre@ejemplo.com"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-gray-700">Contraseña</label>
                        <a href="#" className="text-sm text-[#C0392B] font-bold hover:underline">¿Olvidaste tu contraseña?</a>
                    </div>
                    <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock size={20} className="text-gray-400" />
                        </div>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C0392B] focus:border-transparent outline-none transition-shadow"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C0392B] text-white font-bold py-3 rounded-lg hover:bg-[#A93226] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-red-200"
                >
                    {isSubmitting ? 'Ingresando...' : (
                        <>
                            INGRESAR <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-600">
                    ¿No tienes una cuenta? {' '}
                    <Link to="/register" className="text-[#C0392B] font-bold hover:underline">
                        Regístrate gratis
                    </Link>
                </p>
            </div>
         </div>
      </div>
    </div>
  );
};
