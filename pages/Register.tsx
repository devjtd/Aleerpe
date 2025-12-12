
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight, Lock, Mail, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await register(username, email, password);
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Right Side - Form (Swapped for variety) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 bg-[#F5EFEF]">
         <div className="max-w-md w-full mx-auto">
            
            <div className="lg:hidden flex items-center gap-2 mb-8 text-[#C0392B]">
                <BookOpen size={28} />
                <span className="text-2xl font-black font-pangolin">ALEERPE</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Cuenta</h1>
            <p className="text-gray-500 mb-8">Comienza tu aventura con 3 traducciones IA gratuitas.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nombre de usuario</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User size={20} className="text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C0392B] outline-none"
                            placeholder="OtakuMaster99"
                        />
                    </div>
                </div>

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
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C0392B] outline-none"
                            placeholder="nombre@ejemplo.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña</label>
                    <div className="relative">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock size={20} className="text-gray-400" />
                        </div>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C0392B] outline-none"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" required className="accent-[#C0392B] w-4 h-4" />
                    <span className="text-sm text-gray-600">Acepto los <a href="#" className="underline hover:text-[#C0392B]">Términos y Condiciones</a></span>
                </div>

                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C0392B] text-white font-bold py-3 rounded-lg hover:bg-[#A93226] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-red-200"
                >
                    {isSubmitting ? 'Registrando...' : 'CREAR CUENTA GRATIS'}
                </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-gray-600">
                    ¿Ya tienes una cuenta? {' '}
                    <Link to="/login" className="text-[#C0392B] font-bold hover:underline">
                        Ingresa aquí
                    </Link>
                </p>
            </div>
         </div>
      </div>

       {/* Left Side - Image (Hidden on mobile) */}
       <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#C0392B]/80 to-black/90 z-10" />
        <img 
            src="https://picsum.photos/id/231/1200/1600" 
            alt="Register Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
        />
        <div className="relative z-20 flex flex-col justify-end h-full p-16 text-white text-right">
            <h2 className="text-5xl font-black font-serif mb-6 leading-tight">Únete a la revolución.</h2>
            <p className="text-lg text-gray-200 leading-relaxed mb-4">
                Sube tus obras, conecta con fans y descubre historias increíbles de todo el mundo.
            </p>
        </div>
      </div>
    </div>
  );
};
