import React from 'react';
import { Check, Star } from 'lucide-react';

export const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-black text-gray-800 mb-4">Planes Premium ALEERPE</h1>
        <p className="text-gray-500 text-lg">Desbloquea traducciones AI ilimitadas, lectura sin publicidad y apoya a los creadores directamente.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:-translate-y-1 transition-transform">
            <h3 className="text-xl font-bold text-gray-400 uppercase tracking-wide mb-2">Básico</h3>
            <div className="flex items-baseline mb-6">
                <span className="text-4xl font-black text-gray-800">$0</span>
                <span className="text-gray-500 ml-2">/mes</span>
            </div>
            <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600"><Check size={20} className="text-green-500 mr-2"/> Acceso a mangas gratuitos</li>
                <li className="flex items-center text-gray-600"><Check size={20} className="text-green-500 mr-2"/> Publicidad estándar</li>
                <li className="flex items-center text-gray-600"><Check size={20} className="text-green-500 mr-2"/> 3 traducciones AI / día</li>
            </ul>
            <button className="w-full py-3 rounded-xl border-2 border-gray-200 font-bold text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors">
                Plan Actual
            </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-[#C0392B] relative transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-[#C0392B] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
            <h3 className="text-xl font-bold text-[#C0392B] uppercase tracking-wide mb-2">Otaku</h3>
            <div className="flex items-baseline mb-6">
                <span className="text-5xl font-black text-gray-800">$4.99</span>
                <span className="text-gray-500 ml-2">/mes</span>
            </div>
            <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-800 font-medium"><Check size={20} className="text-[#C0392B] mr-2"/> Todo lo del plan Básico</li>
                <li className="flex items-center text-gray-800 font-medium"><Check size={20} className="text-[#C0392B] mr-2"/> Sin publicidad</li>
                <li className="flex items-center text-gray-800 font-medium"><Check size={20} className="text-[#C0392B] mr-2"/> <span className="font-bold">Traducciones AI ilimitadas</span></li>
                <li className="flex items-center text-gray-800 font-medium"><Check size={20} className="text-[#C0392B] mr-2"/> Acceso anticipado (1 semana)</li>
            </ul>
            <button className="w-full py-3 rounded-xl bg-[#C0392B] font-bold text-white hover:bg-[#A93226] shadow-lg shadow-red-200 transition-all">
                Suscribirse Ahora
            </button>
        </div>

        {/* Support Plan */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 shadow-lg text-white">
            <h3 className="text-xl font-bold text-yellow-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                <Star size={20} fill="currentColor"/> VIP
            </h3>
            <div className="flex items-baseline mb-6">
                <span className="text-4xl font-black text-white">$14.99</span>
                <span className="text-gray-400 ml-2">/mes</span>
            </div>
            <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300"><Check size={20} className="text-yellow-400 mr-2"/> Todo lo del plan Otaku</li>
                <li className="flex items-center text-gray-300"><Check size={20} className="text-yellow-400 mr-2"/> Insignia de perfil dorada</li>
                <li className="flex items-center text-gray-300"><Check size={20} className="text-yellow-400 mr-2"/> Descarga offline</li>
                <li className="flex items-center text-gray-300"><Check size={20} className="text-yellow-400 mr-2"/> Prioridad en soporte</li>
            </ul>
            <button className="w-full py-3 rounded-xl bg-white/10 border border-white/20 font-bold text-white hover:bg-white/20 transition-colors">
                Ser VIP
            </button>
        </div>
      </div>
    </div>
  );
};
