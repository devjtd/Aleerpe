
import React, { useState } from 'react';
import { Search, BookOpen, Bell, Globe, User as UserIcon, LogOut, Sparkles, PenTool, Rocket } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Language } from '../types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isReader = location.pathname.includes('/reader');
  
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // Search State
  const [searchTerm, setSearchTerm] = useState('');

  if (isReader) return null; // Hide navbar in reader mode

  const handleSearch = (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
        navigate(`/categories?q=${encodeURIComponent(searchTerm)}`);
        setSearchTerm(''); // Optional: clear after search
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          handleSearch();
      }
  };

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
  ];

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100 font-pangolin">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left: Logo & Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="text-[#C0392B]">
              <BookOpen size={28} strokeWidth={2.5} />
            </div>
            <span className="text-3xl font-bold text-[#C0392B] tracking-tight">ALEERPE</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-lg text-gray-500 uppercase tracking-wide">
            <Link to="/" className="hover:text-[#C0392B] transition-colors">{t('nav_home')}</Link>
            <Link to="/categories" className="hover:text-[#C0392B] transition-colors">{t('nav_categories')}</Link>
            
            {/* Visible for everyone */}
            <Link to="/upload" className="hover:text-[#C0392B] transition-colors">{t('nav_publish')}</Link>
            
            {/* DONATE LINK */}
            <Link to="/project/1" className="flex items-center gap-1 text-gray-500 hover:text-[#C0392B] transition-colors">
                <Rocket size={18} className="text-yellow-500" />
                {t('nav_donate')}
            </Link>
            
            {/* EXCLUSIVE AUTHOR LINK */}
            {isAuthenticated && user?.isAuthor && (
                <Link to="/authors" className="flex items-center gap-1 text-[#C0392B] font-bold hover:text-[#A93226] transition-colors bg-red-50 px-3 py-1 rounded-full">
                    <PenTool size={16} />
                    Zona Autores
                </Link>
            )}

             <Link to="/pricing" className="hover:text-[#C0392B] transition-colors">{t('nav_premium')}</Link>
          </div>
        </div>

        {/* Right: Search & Profile & Lang */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex relative">
            <input 
              type="text" 
              placeholder={t('search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-4 pr-10 py-1.5 border border-gray-300 rounded-full focus:outline-none focus:border-[#C0392B] text-sm w-48 transition-all focus:w-64 font-sans"
            />
            <button onClick={() => handleSearch()} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C0392B]">
                <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Language Selector */}
          <div className="relative font-sans">
            <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
                <Globe size={20} />
                <span className="text-xs font-bold uppercase">{language}</span>
            </button>

            {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50 animate-fade-in">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setLanguage(lang.code);
                                setLangMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${language === lang.code ? 'text-[#C0392B] font-bold' : 'text-gray-700'}`}
                        >
                            <span>{lang.label}</span>
                            <span>{lang.flag}</span>
                        </button>
                    ))}
                </div>
            )}
          </div>

          {isAuthenticated && user ? (
              // Logged In State
              <div className="flex items-center gap-3">
                  <div className="hidden lg:flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
                    <Sparkles size={14} className="text-yellow-500 fill-current" />
                    <span className="text-xs font-bold text-gray-700">{user.tokens} Tokens</span>
                  </div>

                  <button className="relative text-gray-500 hover:text-gray-800">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                  </button>

                  <div className="relative font-sans z-50">
                    <button 
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-2 pl-2 focus:outline-none"
                    >
                        <img 
                        src={user.avatarUrl} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                        />
                        <div className="hidden md:flex flex-col items-start leading-none">
                            <span className="text-xs font-bold text-gray-800">{user.username}</span>
                        </div>
                    </button>
                    
                    {userMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-xl py-1">
                            <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#C0392B]">
                                Ver Perfil
                            </Link>
                            {user.isAuthor && (
                                <Link to="/authors" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#C0392B]">
                                    Zona Autores
                                </Link>
                            )}
                            <Link to="/pricing" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#C0392B]">
                                Comprar Tokens
                            </Link>
                             <div className="border-t border-gray-100 my-1"></div>
                            <button 
                                onClick={() => {
                                    logout();
                                    setUserMenuOpen(false);
                                    navigate('/');
                                }} 
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 flex items-center gap-2"
                            >
                                <LogOut size={14} /> Cerrar Sesión
                            </button>
                        </div>
                    )}
                  </div>
              </div>
          ) : (
              // Guest State
              <div className="flex items-center gap-3 font-sans">
                  <Link to="/login" className="text-gray-600 font-bold text-sm hover:text-[#C0392B] hidden md:block">
                      Ingresar
                  </Link>
                  <Link to="/register" className="bg-[#C0392B] text-white px-5 py-2 rounded-full font-bold text-sm shadow-md hover:bg-[#A93226] transition-colors">
                      Registrarse
                  </Link>
              </div>
          )}

        </div>
      </div>
    </nav>
  );
};
