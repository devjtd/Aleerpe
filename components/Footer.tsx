
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#EAE2E2] py-12 border-t border-gray-200 font-sans">
      <div className="container mx-auto px-4 flex flex-col items-center gap-6">
        
        {/* Links Section */}
        <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-gray-800 uppercase tracking-wide">
            <Link to="/info#about" className="hover:text-[#C0392B] transition-colors cursor-pointer">Acerca de</Link>
            <Link to="/info#help" className="hover:text-[#C0392B] transition-colors cursor-pointer">Ayuda</Link>
            <Link to="/info#terms" className="hover:text-[#C0392B] transition-colors cursor-pointer">Términos</Link>
            <Link to="/info#privacy" className="hover:text-[#C0392B] transition-colors cursor-pointer">Privacidad</Link>
        </div>

        {/* Logo Section */}
        <div className="flex items-center gap-2 mt-2">
            <div className="text-[#C0392B]">
              <BookOpen size={28} strokeWidth={2.5} />
            </div>
            <span className="text-3xl font-black text-[#C0392B] tracking-tight font-pangolin">ALEERPE</span>
        </div>

        {/* Copyright Section */}
        <p className="text-gray-500 text-sm font-medium mt-2">
            © 2025 ALEERPE. Todos los derechos reservados.
        </p>

      </div>
    </footer>
  );
};
