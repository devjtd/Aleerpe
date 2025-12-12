
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, List, Settings, Globe, Sparkles, X, Lock, Volume2, Square, Headphones, Play, Pause, SkipBack, SkipForward, Loader2 } from 'lucide-react';
import { MOCK_AUDIO_SCRIPTS } from '../constants';
import { translateMangaPage } from '../services/geminiService';
import { TranslationResult, AudioSegment } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useManga } from '../contexts/MangaContext';
import { useLanguage } from '../contexts/LanguageContext';

// Helper to convert image URL to base64 for Gemini
const urlToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const Reader: React.FC = () => {
    const { id, chapterId } = useParams();
    const navigate = useNavigate();
    const { mangas, getChapters } = useManga();
    const { user, isAuthenticated, consumeToken } = useAuth();
    const { language } = useLanguage();

    // Get manga and chapter data
    const manga = mangas.find(m => m.id === id) || mangas[0];
    const chapters = getChapters(manga.id);
    const currentChapter = chapters.find(ch => ch.id === chapterId) || chapters[0];
    const chapterPages = currentChapter?.pages || [];
    const [currentPage, setCurrentPage] = useState(0);
    const [isTranslating, setIsTranslating] = useState(false);
    const [translationPanelOpen, setTranslationPanelOpen] = useState(false);
    const [translations, setTranslations] = useState<TranslationResult[]>([]);
    const [currentTranslationError, setCurrentTranslationError] = useState<string | null>(null);

    // --- AUDIO PLAYER STATE ---
    const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
    const [audioAnalysisProgress, setAudioAnalysisProgress] = useState(0); // 0 to 100
    const [showAudioPlayer, setShowAudioPlayer] = useState(false);
    const [audioPlaylist, setAudioPlaylist] = useState<AudioSegment[]>([]);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

    // Modals for auth gating
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showTokenModal, setShowTokenModal] = useState(false);

    // Auto-scroll to top when page changes
    const topRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Reset translation state when page changes
        setTranslations([]);
        setTranslationPanelOpen(false);
        setCurrentTranslationError(null);
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentPage]);

    // Clean up speech on unmount
    useEffect(() => {
        return () => {
            // Critical fix: Nullify onend to prevent recursive calls when unmounting
            if (speechRef.current) {
                speechRef.current.onend = null;
            }
            window.speechSynthesis.cancel();
        }
    }, []);

    // --- AUDIO LOGIC ---

    // Helper to map app language code (e.g., 'en') to browser TTS code (e.g., 'en-US')
    const getTTSVoiceLang = (appLang: string): string => {
        const map: Record<string, string> = {
            'es': 'es-ES',
            'en': 'en-US',
            'pt': 'pt-BR',
            'fr': 'fr-FR',
            'it': 'it-IT',
            'ja': 'ja-JP'
        };
        return map[appLang] || 'es-ES';
    };

    const handleGenerateChapterAudio = async () => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

        setIsGeneratingAudio(true);
        setAudioAnalysisProgress(0);

        // Simulate Scanning Process
        const scanInterval = setInterval(() => {
            setAudioAnalysisProgress(prev => {
                if (prev >= 90) {
                    clearInterval(scanInterval);
                    return 90;
                }
                return prev + 10;
            });
        }, 300);

        // Simulate API "Analysis" delay
        await new Promise(resolve => setTimeout(resolve, 3000));

        clearInterval(scanInterval);
        setAudioAnalysisProgress(100);

        // Select the script based on the CURRENT APP LANGUAGE
        // In a real app, this would trigger an AI Translation job for the whole chapter
        const selectedScript = MOCK_AUDIO_SCRIPTS[language] || MOCK_AUDIO_SCRIPTS['es'];
        setAudioPlaylist(selectedScript);
        setCurrentAudioIndex(0);

        await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for UI
        setIsGeneratingAudio(false);
        setShowAudioPlayer(true);
        
        // Start playing with the correct language list
        playSegment(0, selectedScript);
    };

    const playSegment = (index: number, playlist: AudioSegment[]) => {
        // FIX: Nullify the previous utterance's onend listener.
        // If we don't do this, canceling the previous track might trigger its onend event,
        // which would try to play the next track, causing overlap or double-skipping.
        if (speechRef.current) {
            speechRef.current.onend = null;
        }
        window.speechSynthesis.cancel();

        if (index >= playlist.length) {
            setIsPlaying(false);
            return;
        }

        const segment = playlist[index];
        const utterance = new SpeechSynthesisUtterance(segment.text);
        
        // DYNAMIC LANGUAGE SETTING
        utterance.lang = getTTSVoiceLang(language);
        utterance.rate = 1.0;

        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => {
            // Auto play next
            if (index < playlist.length - 1) {
                setCurrentAudioIndex(index + 1);
                playSegment(index + 1, playlist);
            } else {
                setIsPlaying(false);
            }
        };

        speechRef.current = utterance;
        window.speechSynthesis.speak(utterance);

        // Sync Reader Page
        setCurrentPage(segment.pageIndex);
    };

    const toggleAudio = () => {
        if (isPlaying) {
            window.speechSynthesis.pause();
            setIsPlaying(false);
        } else {
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
                setIsPlaying(true);
            } else {
                playSegment(currentAudioIndex, audioPlaylist);
            }
        }
    };

    const skipAudio = (direction: 'next' | 'prev') => {
        let newIndex = direction === 'next' ? currentAudioIndex + 1 : currentAudioIndex - 1;
        newIndex = Math.max(0, Math.min(newIndex, audioPlaylist.length - 1));
        setCurrentAudioIndex(newIndex);
        playSegment(newIndex, audioPlaylist);
    };

    const closeAudioPlayer = () => {
        // FIX: Explicitly remove the event listener before canceling
        // This ensures the "onend" logic doesn't fire and start the next track
        if (speechRef.current) {
            speechRef.current.onend = null;
        }
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setShowAudioPlayer(false);
    };

    // --- TRANSLATION LOGIC ---

    const handleTranslate = async () => {
        // 1. Check Auth
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

        // 2. Check Tokens
        if (user && user.tokens <= 0) {
            setShowTokenModal(true);
            return;
        }

        // 3. Prevent duplicate work if already done
        if (translations.length > 0) {
            setTranslationPanelOpen(true);
            return;
        }

        // 4. Consume Token & Execute
        const tokenSuccess = consumeToken();
        if (!tokenSuccess) {
            // Fallback safety
            setShowTokenModal(true);
            return;
        }

        setIsTranslating(true);
        setTranslationPanelOpen(true); // Open panel to show loading state
        setCurrentTranslationError(null);

        try {
            const imageUrl = chapterPages[currentPage];
            const base64 = await urlToBase64(imageUrl);

            const results = await translateMangaPage(base64, 'Spanish');
            setTranslations(results);
        } catch (error) {
            setCurrentTranslationError("Failed to translate page. Please check API Key or try again.");
        } finally {
            setIsTranslating(false);
        }
    };

    return (
        <div className="bg-[#121212] min-h-screen text-gray-300 flex flex-col relative overflow-hidden font-sans">

            {/* Top Bar - Sticky */}
            <header className="bg-[#1E1E1E] h-14 flex items-center justify-between px-4 sticky top-0 z-50 border-b border-gray-800 shadow-md">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="hover:text-white transition-colors flex items-center gap-1 text-sm font-medium"
                    >
                        <ArrowLeft size={18} />
                        <span className="hidden sm:inline">VOLVER</span>
                    </button>
                    <div className="h-4 w-px bg-gray-600 mx-2"></div>
                    <h1 className="font-bold text-white truncate max-w-[150px] sm:max-w-md">
                        {manga.title}
                    </h1>
                    <span className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300">Capítulo 1</span>
                </div>

                <div className="flex items-center gap-2">

                    {/* AUDIO BUTTON */}
                    <button
                        onClick={handleGenerateChapterAudio}
                        className="hidden md:flex items-center gap-2 bg-indigo-900/50 hover:bg-indigo-800 text-indigo-200 px-3 py-1.5 rounded-full text-xs font-bold transition-all border border-indigo-700"
                    >
                        <Headphones size={14} />
                        Escuchar Capítulo
                    </button>

                    <div className="hidden sm:flex items-center gap-2 mr-4 bg-black/30 px-3 py-1 rounded-full text-xs ml-2">
                        <span>Página {currentPage + 1} / {chapterPages.length}</span>
                    </div>

                    <button
                        onClick={handleTranslate}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${translationPanelOpen
                            ? 'bg-[#C0392B] text-white shadow-[0_0_10px_rgba(192,57,43,0.5)]'
                            : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                            }`}
                    >
                        {isAuthenticated && user?.tokens === 0 ? <Lock size={12} /> : <Sparkles size={14} />}
                        {isTranslating ? 'Traduciento...' : 'AI Traducir'}
                        {isAuthenticated && <span className="bg-black/40 px-1.5 rounded-full text-[10px] ml-1">{user?.tokens}</span>}
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 flex relative">
                <div ref={topRef}></div>

                {/* Manga Page Viewer */}
                <div className="flex-1 flex justify-center overflow-y-auto bg-black custom-scrollbar py-4" style={{ height: 'calc(100vh - 3.5rem - 4rem)' }}>
                    <div className="relative max-w-3xl w-full shadow-2xl">
                        <img
                            src={chapterPages[currentPage]}
                            alt={`Page ${currentPage + 1}`}
                            className="w-full h-auto block"
                        />

                        {/* Overlay Hints */}
                        {translationPanelOpen && !isTranslating && translations.length > 0 && (
                            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur text-white text-xs px-3 py-1 rounded-full border border-white/20 animate-pulse">
                                Traducción disponible en panel lateral 👉
                            </div>
                        )}
                    </div>
                </div>

                {/* Translation Side Panel (Option B) */}
                <div className={`
            fixed top-14 right-0 bottom-16 w-full sm:w-96 bg-[#1E1E1E] border-l border-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-40
            ${translationPanelOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
                    <div className="h-full flex flex-col">
                        <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-[#252525]">
                            <div className="flex items-center gap-2 text-white">
                                <Globe size={18} className="text-[#C0392B]" />
                                <h3 className="font-bold">Traducción AI</h3>
                            </div>
                            <button onClick={() => setTranslationPanelOpen(false)} className="text-gray-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {isTranslating ? (
                                <div className="flex flex-col items-center justify-center h-40 space-y-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C0392B]"></div>
                                    <p className="text-sm text-gray-400 animate-pulse">Analizando texto...</p>
                                </div>
                            ) : currentTranslationError ? (
                                <div className="p-4 bg-red-900/20 border border-red-800 rounded text-red-200 text-sm text-center">
                                    {currentTranslationError}
                                </div>
                            ) : translations.length === 0 ? (
                                <div className="text-center text-gray-500 py-10 px-4">
                                    <p className="mb-2">No hay traducciones aún.</p>
                                    <p className="text-xs">Pulsa "AI Traducir" para detectar y traducir el texto de esta página.</p>
                                </div>
                            ) : (
                                translations.map((t, idx) => (
                                    <div key={idx} className="bg-[#2A2A2A] rounded-lg p-3 border border-gray-700 hover:border-gray-500 transition-colors group">
                                        <div className="flex justify-between items-start mb-1">
                                            {t.speaker && t.speaker !== 'Unknown' && (
                                                <div className="text-xs font-bold text-[#C0392B] uppercase tracking-wider">
                                                    {t.speaker}
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-white text-sm leading-relaxed font-medium">
                                            {t.translatedText}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* AUDIO GENERATION MODAL */}
            {isGeneratingAudio && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#1E1E1E] border border-gray-700 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
                        <div className="relative w-16 h-16 mx-auto mb-6">
                            <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                            <Headphones className="absolute inset-0 m-auto text-indigo-400" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Analizando Capítulo</h3>
                        <p className="text-gray-400 text-sm mb-4">Transcribiendo texto y generando audio...</p>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div
                                className="bg-indigo-500 h-full transition-all duration-300 ease-out"
                                style={{ width: `${audioAnalysisProgress}%` }}
                            ></div>
                        </div>
                        <p className="text-right text-xs text-gray-500 mt-1">{audioAnalysisProgress}%</p>
                    </div>
                </div>
            )}

            {/* FLOATING AUDIO PLAYER */}
            {showAudioPlayer && (
                <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md bg-[#1E1E1E] border border-gray-700 rounded-xl shadow-2xl p-4 z-40 animate-slide-up flex flex-col gap-3">
                    <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <div className="flex items-center gap-2">
                            <div className="bg-indigo-900/50 p-1.5 rounded text-indigo-300">
                                <Headphones size={16} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm">Reproduciendo Capítulo</h4>
                                <p className="text-xs text-gray-400">Página {currentAudioIndex + 1} • <span className="uppercase">{language}</span></p>
                            </div>
                        </div>
                        <button onClick={closeAudioPlayer} className="text-gray-500 hover:text-white">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <button onClick={() => skipAudio('prev')} className="text-gray-400 hover:text-white">
                            <SkipBack size={20} />
                        </button>

                        <button
                            onClick={toggleAudio}
                            className="w-10 h-10 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-900/50 transition-transform active:scale-95"
                        >
                            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                        </button>

                        <button onClick={() => skipAudio('next')} className="text-gray-400 hover:text-white">
                            <SkipForward size={20} />
                        </button>
                    </div>

                    {/* Fake Waveform / Progress */}
                    <div className="flex items-center gap-1 h-3 justify-center">
                        {[...Array(15)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-1 rounded-full transition-all duration-150 ${isPlaying ? 'bg-indigo-500 animate-pulse' : 'bg-gray-700'}`}
                                style={{ height: isPlaying ? `${Math.random() * 100}%` : '20%' }}
                            ></div>
                        ))}
                    </div>
                </div>
            )}

            {/* Bottom Navigation */}
            <footer className="bg-[#1E1E1E] h-16 flex items-center justify-between px-4 border-t border-gray-800 z-50">
                <button
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded hover:bg-[#C0392B] disabled:opacity-50 disabled:hover:bg-gray-800 transition-colors text-sm font-bold text-white"
                >
                    <ChevronLeft size={16} />
                    <span className="hidden sm:inline">Capítulo anterior</span>
                </button>

                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <List size={24} />
                    <span className="hidden sm:inline text-sm">Episodios</span>
                </button>

                <button
                    disabled={currentPage === chapterPages.length - 1}
                    onClick={() => setCurrentPage(prev => Math.min(chapterPages.length - 1, prev + 1))}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded hover:bg-[#C0392B] disabled:opacity-50 disabled:hover:bg-gray-800 transition-colors text-sm font-bold text-white"
                >
                    <span className="hidden sm:inline">Capítulo siguiente</span>
                    <ChevronRight size={16} />
                </button>
            </footer>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[#1E1E1E] border border-gray-700 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl">
                        <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="text-[#C0392B]" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Inicia sesión para usar IA</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Las funciones de Traducción y Audio IA son exclusivas para miembros.
                        </p>
                        <div className="flex flex-col gap-3">
                            <Link to="/login" className="bg-[#C0392B] text-white font-bold py-3 rounded-lg hover:bg-[#A93226] transition-colors">
                                Iniciar Sesión
                            </Link>
                            <button onClick={() => setShowLoginModal(false)} className="text-gray-500 hover:text-gray-300 font-bold text-sm">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Token Modal */}
            {showTokenModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[#1E1E1E] border border-gray-700 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl">
                        <div className="bg-yellow-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="text-yellow-500" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">¡Te has quedado sin tokens!</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Has utilizado todas tus interacciones IA gratuitas. Adquiere un plan Premium para uso ilimitado.
                        </p>
                        <div className="flex flex-col gap-3">
                            <Link to="/pricing" className="bg-yellow-600 text-white font-bold py-3 rounded-lg hover:bg-yellow-700 transition-colors">
                                Obtener Tokens
                            </Link>
                            <button onClick={() => setShowTokenModal(false)} className="text-gray-500 hover:text-gray-300 font-bold text-sm">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};
