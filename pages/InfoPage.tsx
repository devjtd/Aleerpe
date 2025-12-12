
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HelpCircle, FileText, Shield, Info } from 'lucide-react';

export const InfoPage: React.FC = () => {
  const { hash } = useLocation();

  // Scroll to section based on hash in URL
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-3 mb-6 border-b pb-4 border-gray-200">
        <div className="bg-red-100 p-3 rounded-full text-[#C0392B]">
            <Icon size={24} />
        </div>
        <h2 className="text-3xl font-black text-gray-800">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5EFEF] pb-20">
      
      {/* Header */}
      <div className="bg-[#1a1a1a] text-white py-12 px-4 shadow-lg mb-12">
        <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 font-serif">
                Centro de Información
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Todo lo que necesitas saber sobre Aleerpe, nuestra comunidad y reglas.
            </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl space-y-20">
        
        {/* ACERCA DE */}
        <section id="about" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 scroll-mt-24">
            <SectionTitle icon={Info} title="Acerca de Aleerpe" />
            <div className="prose text-gray-600 leading-relaxed">
                <p className="mb-4">
                    <strong>Aleerpe</strong> nació con una misión simple: derribar las barreras del idioma en el mundo del manga. 
                    Somos una plataforma innovadora que combina una vasta biblioteca de contenido global con tecnología de 
                    Inteligencia Artificial de vanguardia para ofrecer traducciones instantáneas y precisas.
                </p>
                <p className="mb-4">
                    Creemos que las historias no deberían tener fronteras. Ya seas un lector apasionado que busca la última novela ligera coreana 
                    o un autor independiente que quiere llegar a una audiencia global, Aleerpe es tu hogar.
                </p>
                <p>
                    Apoyamos activamente a los creadores a través de nuestro <strong>Hub de Autores</strong> y programas de financiación colectiva, 
                    asegurando que el talento sea recompensado justamente.
                </p>
            </div>
        </section>

        {/* AYUDA */}
        <section id="help" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 scroll-mt-24">
            <SectionTitle icon={HelpCircle} title="Centro de Ayuda" />
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">¿Cómo funciona la traducción por IA?</h3>
                    <p className="text-gray-600 text-sm">
                        Utilizamos el modelo Gemini de Google para analizar las páginas de manga en tiempo real. Detectamos burbujas de texto, 
                        identificamos el contexto y traducimos el contenido manteniendo el estilo narrativo. Simplemente haz clic en el botón 
                        "AI Traducir" en el lector.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">¿Qué son los Tokens?</h3>
                    <p className="text-gray-600 text-sm">
                        Los tokens son la moneda utilizada para procesar traducciones. Cada página traducida consume 1 token. 
                        Los usuarios gratuitos reciben tokens diarios limitados, mientras que los suscriptores Premium disfrutan de uso ilimitado.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Soy autor, ¿cómo subo mi obra?</h3>
                    <p className="text-gray-600 text-sm">
                        Debes registrarte seleccionando la opción "Quiero registrarme como Autor". Una vez dentro, accede al "Panel de Autor" 
                        o haz clic en "Publicar" en la barra de navegación para subir tu manga, cómic o novela.
                    </p>
                </div>
            </div>
        </section>

        {/* TÉRMINOS */}
        <section id="terms" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 scroll-mt-24">
             <SectionTitle icon={FileText} title="Términos y Condiciones" />
             <div className="prose text-gray-600 text-sm leading-relaxed h-64 overflow-y-auto pr-2 custom-scrollbar border rounded p-4 bg-gray-50">
                <h4 className="font-bold text-gray-800 mb-2">1. Aceptación de los Términos</h4>
                <p className="mb-4">Al acceder a Aleerpe, aceptas cumplir con estos términos de servicio, todas las leyes y regulaciones aplicables.</p>
                
                <h4 className="font-bold text-gray-800 mb-2">2. Licencia de Uso</h4>
                <p className="mb-4">Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de Aleerpe solo para visualización transitoria personal y no comercial.</p>

                <h4 className="font-bold text-gray-800 mb-2">3. Propiedad Intelectual</h4>
                <p className="mb-4">El contenido subido por los autores pertenece a sus respectivos creadores. Aleerpe actúa como plataforma de distribución. Al subir contenido, garantizas que posees los derechos necesarios.</p>

                <h4 className="font-bold text-gray-800 mb-2">4. Limitaciones</h4>
                <p className="mb-4">En ningún caso Aleerpe o sus proveedores serán responsables de ningún daño (incluyendo, sin limitación, daños por pérdida de datos o beneficios) que surjan del uso o la imposibilidad de usar los materiales en Aleerpe.</p>
             </div>
        </section>

        {/* PRIVACIDAD */}
        <section id="privacy" className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 scroll-mt-24">
            <SectionTitle icon={Shield} title="Política de Privacidad" />
            <div className="prose text-gray-600 leading-relaxed">
                <p className="mb-4">
                    En Aleerpe, nos tomamos muy en serio tu privacidad. Esta política describe qué información personal recopilamos y cómo la usamos.
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>
                        <strong>Información que recopilamos:</strong> Recopilamos información que nos proporcionas directamente, como tu nombre de usuario, 
                        dirección de correo electrónico y contraseña al registrarte.
                    </li>
                    <li>
                        <strong>Cómo usamos tu información:</strong> Utilizamos la información para operar, mantener y mejorar nuestros servicios, 
                        procesar transacciones y enviarte notificaciones técnicas.
                    </li>
                    <li>
                        <strong>Protección de datos:</strong> Implementamos medidas de seguridad diseñadas para proteger tu información contra el acceso no autorizado.
                    </li>
                </ul>
                <p className="text-sm italic">
                    Para consultas relacionadas con la privacidad, contáctanos en privacy@aleerpe.com.
                </p>
            </div>
        </section>

      </div>
    </div>
  );
};
