
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft, Chrome, Eye, EyeOff, PenTool } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const AuthPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  // Determine mode based on URL
  const isRegister = location.pathname === '/register';
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAuthor, setIsAuthor] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear fields when switching modes
  useEffect(() => {
    setEmail('');
    setPassword('');
    setUsername('');
    setConfirmPassword('');
    setIsAuthor(false);
    setIsSubmitting(false);
  }, [isRegister]);

  const handleSwitch = (target: 'login' | 'register') => {
    navigate(`/${target}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isRegister) {
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            setIsSubmitting(false);
            return;
        }
        await register(username, email, password, isAuthor);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Common Input Styles matching Figma (Rounded, icon on right)
  const inputGroupClass = "relative mb-4";
  const inputClass = "w-full bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-[#C0392B] focus:border-[#C0392B] block p-4 outline-none transition-colors";
  const iconClass = "absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400";

  return (
    <div className="min-h-screen w-full relative bg-white overflow-hidden flex items-center justify-center">
      
      {/* Container for Desktop Animation */}
      <div className="relative w-full h-screen flex overflow-hidden">
        
        {/* --- LEFT SECTION (Originally for Login Form) --- */}
        <div className={`w-full lg:w-1/2 h-full flex items-center justify-center p-8 lg:p-16 transition-all duration-700 ease-in-out absolute lg:relative top-0 ${isRegister ? 'lg:translate-x-full opacity-0 lg:opacity-100 z-0' : 'translate-x-0 opacity-100 z-20'} bg-white`}>
            {/* LOGIN FORM CONTENT */}
            <div className={`max-w-md w-full transition-opacity duration-500 ${isRegister ? 'opacity-0 delay-0' : 'opacity-100 delay-300'}`}>
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-sans text-gray-900 mb-4 tracking-wide font-normal">BIENVENIDO!</h1>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                        Descubre libros, mangas, manhwas, novelas, webcomics y más. Sigue tu progreso y diviértete.
                    </p>
                </div>

                <form onSubmit={!isRegister ? handleSubmit : undefined}>
                    <div className={inputGroupClass}>
                        <input 
                            type="email" 
                            className={inputClass} 
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className={iconClass}><Mail size={18}/></div>
                    </div>

                    <div className={inputGroupClass}>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            className={inputClass} 
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600">
                             <Lock size={18}/>
                        </button>
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center">
                            <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-red-300 accent-[#C0392B]" />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-500">Recuérdame</label>
                        </div>
                        <a href="#" className="text-sm text-[#C0392B] hover:underline font-medium">Recuperar contraseña</a>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full text-white bg-[#C0392B] hover:bg-[#A93226] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-3.5 text-center transition-all shadow-md mb-6"
                    >
                        {isSubmitting ? 'Iniciando...' : 'Iniciar sesión'}
                    </button>

                    <button type="button" className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg text-sm px-5 py-3.5 text-center transition-all">
                        <Chrome size={20} className="text-red-500" />
                        Iniciar sesión con Google
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-600">
                    ¿No tienes una cuenta? <button onClick={() => handleSwitch('register')} className="text-[#C0392B] font-bold hover:underline">Regístrate</button>
                </div>
                
                <div className="mt-8 text-center">
                    <Link to="/" className="text-[#C0392B] text-xs font-bold hover:underline flex items-center justify-center gap-1">
                       Volver a la página de inicio
                    </Link>
                </div>
            </div>
        </div>

        {/* --- RIGHT SECTION (Originally for Register Form) --- */}
        <div className={`w-full lg:w-1/2 h-full flex items-center justify-center p-8 lg:p-16 transition-all duration-700 ease-in-out absolute lg:relative top-0 ${isRegister ? 'translate-x-0 opacity-100 z-20' : 'lg:-translate-x-full opacity-0 lg:opacity-100 z-0'} bg-white`}>
             {/* REGISTER FORM CONTENT */}
             <div className={`max-w-md w-full transition-opacity duration-500 ${isRegister ? 'opacity-100 delay-300' : 'opacity-0 delay-0'}`}>
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-sans text-gray-900 mb-4 tracking-wide font-normal">BIENVENIDO!</h1>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
                        Descubre libros, mangas, manhwas, novelas, webcomics y más. Sigue tu progreso y diviértete.
                    </p>
                </div>

                <form onSubmit={isRegister ? handleSubmit : undefined}>
                    <div className={inputGroupClass}>
                        <input 
                            type="text" 
                            className={inputClass} 
                            placeholder="Nombre"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                         <div className={iconClass}><User size={18}/></div>
                    </div>

                    <div className={inputGroupClass}>
                        <input 
                            type="email" 
                            className={inputClass} 
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                         <div className={iconClass}><Mail size={18}/></div>
                    </div>

                    <div className={inputGroupClass}>
                        <input 
                            type="password" 
                            className={inputClass} 
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                         <div className={iconClass}><Lock size={18}/></div>
                    </div>

                    <div className={inputGroupClass}>
                        <input 
                            type="password" 
                            className={inputClass} 
                            placeholder="Confirmar Contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                         <div className={iconClass}><Lock size={18}/></div>
                    </div>

                    {/* Author Checkbox */}
                    <div className="flex items-center mb-3">
                         <input 
                            id="isAuthor" 
                            type="checkbox" 
                            checked={isAuthor}
                            onChange={(e) => setIsAuthor(e.target.checked)}
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-red-300 accent-[#C0392B]" 
                        />
                        <label htmlFor="isAuthor" className="ml-2 text-sm font-bold text-gray-700 flex items-center gap-2 cursor-pointer select-none">
                            <PenTool size={14} className="text-[#C0392B]"/>
                            Quiero registrarme como Autor
                        </label>
                    </div>

                    <div className="flex items-center mb-6">
                        <input id="notify" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-red-300 accent-[#C0392B]" />
                        <label htmlFor="notify" className="ml-2 text-sm text-gray-500">Enviarme notificaciones a mi correo</label>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full text-white bg-[#C0392B] hover:bg-[#A93226] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-3.5 text-center transition-all shadow-md mb-6"
                    >
                        {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
                    </button>

                     <button type="button" className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg text-sm px-5 py-3.5 text-center transition-all">
                        <Chrome size={20} className="text-red-500" />
                        Iniciar sesión con Google
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-600">
                    ¿Ya tienes una cuenta? <button onClick={() => handleSwitch('login')} className="text-[#C0392B] font-bold hover:underline">Inicia sesión</button>
                </div>

                <div className="mt-8 text-center">
                    <Link to="/" className="text-[#C0392B] text-xs font-bold hover:underline flex items-center justify-center gap-1">
                       Volver a la página de inicio
                    </Link>
                </div>
            </div>
        </div>

        {/* --- MOVING IMAGE OVERLAY --- */}
        <div 
            className={`hidden lg:block absolute top-0 h-full w-1/2 bg-gray-900 transition-transform duration-700 ease-in-out z-30 shadow-2xl overflow-hidden ${isRegister ? 'translate-x-0' : 'translate-x-full'}`}
            style={{ left: 0 }}
        >
             {/* Image Inner - Matches styling of your screenshot (B&W manga art) */}
            <div className="absolute inset-0 bg-[#e0e7ec]">
                 <img 
                    src="https://picsum.photos/id/231/1200/1600" 
                    alt="Manga Art" 
                    className="w-full h-full object-cover opacity-90 mix-blend-multiply grayscale contrast-125"
                />
                {/* Optional overlay gradient to make it look like the scan in the screenshot */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-200/20 to-transparent mix-blend-overlay"></div>
            </div>
        </div>

      </div>
    </div>
  );
};
