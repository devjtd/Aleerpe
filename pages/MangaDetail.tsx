import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, BookOpen, Bookmark, Share2, Flag, ChevronDown, Calendar, Clock, Eye, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useManga } from '../contexts/MangaContext';
import { MangaCard } from '../components/MangaCard';

export const MangaDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { mangas, getChapters } = useManga();
    const [isDescExpanded, setIsDescExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState<'chapters' | 'info'>('chapters');

    // Scroll to top when page loads or manga changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const manga = mangas.find(m => m.id === id) || mangas[0];

    // Get real chapters from context
    const realChapters = getChapters(manga.id);

    // Format chapters for display
    const chapters = realChapters.map((ch, index) => ({
        id: ch.id,
        number: index + 1,
        title: ch.title,
        date: new Date(Date.now() - index * 86400000 * 7).toLocaleDateString(), // Weekly releases
        isRead: false,
        chapterData: ch // Store original chapter data for navigation
    }));

    // Logic to find recommended mangas based on shared genres
    const recommendations = mangas.filter(m =>
        m.id !== manga.id &&
        m.genre.some(g => manga.genre.includes(g))
    ).slice(0, 5);

    return (
        <div className="bg-white min-h-screen pb-12">
            {/* Immersive Header with Blurred Background */}
            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-60"
                    style={{ backgroundImage: `url(${manga.coverUrl})` }}
                />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-20" />
            </div>

            {/* Main Content Container */}
            <div className="container mx-auto px-4 relative z-30 -mt-32 md:-mt-48">
                <div className="flex flex-col md:flex-row gap-8 mb-16">

                    {/* Left Column: Cover & Actions */}
                    <div className="flex-shrink-0 flex flex-col items-center md:items-start w-full md:w-[280px]">
                        <div className="relative group w-[200px] md:w-full aspect-[2/3] rounded-lg shadow-2xl overflow-hidden mb-6 border-4 border-white">
                            <img
                                src={manga.coverUrl}
                                alt={manga.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-[#C0392B] text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                                {manga.status.toUpperCase()}
                            </div>
                        </div>

                        <div className="hidden md:flex flex-col w-full gap-3">
                            <button
                                onClick={() => navigate(`/reader/${manga.id}`)}
                                className="w-full bg-[#C0392B] text-white font-bold py-3 rounded-lg shadow-lg hover:bg-[#A93226] transition-all flex items-center justify-center gap-2"
                            >
                                <BookOpen size={20} />
                                {t('detail_read_first')}
                            </button>
                            <button className="w-full bg-white text-gray-700 border border-gray-300 font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                <Bookmark size={20} />
                                {t('detail_save_list')}
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Info & Chapters */}
                    <div className="flex-1 pt-4 md:pt-16">

                        {/* Title Section */}
                        <div className="text-center md:text-left mb-6">
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 leading-tight font-serif">
                                {manga.title}
                            </h1>
                            <p className="text-lg text-gray-500 font-medium mb-4">{manga.author}</p>

                            {/* Stats */}
                            <div className="flex items-center justify-center md:justify-start gap-6 text-sm mb-6">
                                <div className="flex items-center gap-1">
                                    <Star className="text-yellow-400 fill-current" size={20} />
                                    <span className="font-bold text-lg text-gray-900">{manga.rating}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500">
                                    <Eye size={18} />
                                    <span>1.2M {t('detail_views')}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500">
                                    <Bookmark size={18} />
                                    <span>45k {t('detail_followers')}</span>
                                </div>
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                                {manga.genre.map(g => (
                                    <span key={g} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded-full tracking-wide">
                                        {g}
                                    </span>
                                ))}
                            </div>

                            {/* Mobile Actions */}
                            <div className="flex md:hidden gap-3 w-full mb-8">
                                <button
                                    onClick={() => navigate(`/reader/${manga.id}`)}
                                    className="flex-1 bg-[#C0392B] text-white font-bold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2"
                                >
                                    <BookOpen size={20} /> {t('detail_read')}
                                </button>
                                <button className="bg-gray-100 text-gray-700 p-3 rounded-lg">
                                    <Bookmark size={24} />
                                </button>
                                <button className="bg-gray-100 text-gray-700 p-3 rounded-lg">
                                    <Share2 size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Content Tabs */}
                        <div className="flex gap-8 border-b border-gray-200 mb-6">
                            <button
                                onClick={() => setActiveTab('chapters')}
                                className={`pb-3 text-lg font-bold transition-colors relative ${activeTab === 'chapters' ? 'text-[#C0392B]' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {t('detail_chapters_tab')}
                                {activeTab === 'chapters' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#C0392B] rounded-t-full"></div>}
                            </button>
                            <button
                                onClick={() => setActiveTab('info')}
                                className={`pb-3 text-lg font-bold transition-colors relative ${activeTab === 'info' ? 'text-[#C0392B]' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {t('detail_synopsis_tab')}
                                {activeTab === 'info' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#C0392B] rounded-t-full"></div>}
                            </button>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'info' ? (
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 animate-fade-in">
                                <p className={`text-gray-700 leading-relaxed text-lg ${!isDescExpanded ? 'line-clamp-4' : ''}`}>
                                    {manga.description || t('detail_no_description')}
                                </p>
                                <button
                                    onClick={() => setIsDescExpanded(!isDescExpanded)}
                                    className="text-[#C0392B] font-bold mt-2 flex items-center gap-1 text-sm hover:underline"
                                >
                                    {isDescExpanded ? t('detail_read_less') : t('detail_read_more')} <ChevronDown size={16} className={`transform transition-transform ${isDescExpanded ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3 animate-fade-in">
                                {/* List Header */}
                                <div className="flex justify-between items-center text-xs text-gray-400 uppercase font-bold tracking-wider px-2">
                                    <span>{chapters.length} {t('detail_chapters_count')}</span>
                                    <span className="flex items-center gap-1 cursor-pointer hover:text-gray-600">
                                        {t('detail_sort')} <ChevronDown size={14} />
                                    </span>
                                </div>

                                {/* Chapter List */}
                                <div className="flex flex-col gap-2">
                                    {chapters.map((chapter) => (
                                        <div
                                            key={chapter.id}
                                            onClick={() => navigate(`/reader/${manga.id}/${chapter.id}`)}
                                            className={`group flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer ${chapter.isRead
                                                ? 'bg-gray-50 border-gray-100 text-gray-500'
                                                : 'bg-white border-gray-200 hover:border-[#C0392B] hover:shadow-md'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className={`text-xl font-bold w-12 ${chapter.isRead ? 'text-gray-400' : 'text-gray-800 group-hover:text-[#C0392B]'}`}>
                                                    #{chapter.number}
                                                </span>
                                                <div>
                                                    <h4 className={`font-medium ${chapter.isRead ? 'text-gray-500' : 'text-gray-900'}`}>
                                                        {chapter.title}
                                                    </h4>
                                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                                        <span className="flex items-center gap-1"><Calendar size={12} /> {chapter.date}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {chapter.isRead ? (
                                                    <span className="text-xs font-bold bg-gray-200 text-gray-500 px-2 py-1 rounded">{t('detail_read_status')}</span>
                                                ) : (
                                                    <span className="opacity-0 group-hover:opacity-100 bg-[#C0392B] text-white text-xs font-bold px-3 py-1 rounded transition-opacity">
                                                        {t('detail_read_action')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full py-3 mt-4 text-gray-500 font-bold text-sm hover:text-gray-800 hover:bg-gray-100 rounded transition-colors">
                                    {t('detail_more_chapters')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recommendations Section */}
                {recommendations.length > 0 && (
                    <div className="border-t border-gray-200 pt-10 mt-10">
                        <div className="flex items-center gap-2 mb-8 border-l-4 border-[#C0392B] pl-4">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {t('detail_recommendations')} <span className="font-light text-gray-500">{t('detail_similar')}</span>
                            </h2>
                            <Sparkles className="text-yellow-400" size={20} />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {recommendations.map(rec => (
                                <MangaCard key={rec.id} manga={rec} />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};