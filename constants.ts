
import { Manga, User, AudioSegment, Chapter, Language } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  username: 'USUARIO1',
  email: 'usuario@aleerpe.com',
  handle: '@usuario1',
  avatarUrl: '/Mangas/perfil.webp',
  isVerified: true,
  tokens: 5 // Initial free tokens
};

export const MANGAS: Manga[] = [
  {
    id: '1',
    title: "Omniscient Reader's Viewpoint",
    coverUrl: '/Mangas/Manwhas/1/Portada1.webp',
    rating: 9.85,
    status: 'Finalizado',
    genre: ['Acción', 'Fantasía', 'Apocalipsis'],
    author: 'Sing Shong',
    authorId: 'author-1', // Assigned to demo author
    rank: 1,
    description: "Dokja era un oficinista común y corriente cuyo único interés era leer su novela web favorita, «Tres maneras de sobrevivir al apocalipsis». Pero cuando la novela se convierte repentinamente en realidad, él es el único que sabe cómo terminará el mundo.",
    stats: {
      views: 1250000,
      likes: 45000,
      revenue: 3400.50,
      monthlyGrowth: 12
    }
  },
  {
    id: '2',
    title: 'Nano Machine',
    coverUrl: '/Mangas/Manga/2/Portada.webp',
    rating: 9.32,
    status: 'En curso',
    genre: ['Artes Marciales', 'Ciencia Ficción', 'Acción'],
    author: 'Jeolmu Hyeon',
    rank: 3,
    description: "Después de ser despreciado y poner su vida en peligro, un huérfano del Culto Demoníaco recibe una visita inesperada de su descendiente del futuro.",
    stats: {
      views: 890000,
      likes: 32000,
      revenue: 1200.00,
      monthlyGrowth: 5
    }
  },
  {
    id: '3',
    title: 'Solo Leveling',
    coverUrl: '/Mangas/Manwhas/2/Portada.webp',
    rating: 9.9,
    status: 'Finalizado',
    genre: ['Acción', 'Aventura', 'Fantasía'],
    rank: 2,
    author: 'Chugong',
    stats: { views: 5000000, likes: 200000, revenue: 15000, monthlyGrowth: 2 }
  },
  {
    id: '4',
    title: 'Beginning After The End',
    coverUrl: '/Mangas/Manwhas/3/Portada.webp',
    rating: 9.5,
    status: 'En curso',
    genre: ['Fantasía', 'Isekai', 'Magia'],
    rank: 4,
    author: 'TurtleMe',
    stats: { views: 400000, likes: 15000, revenue: 800, monthlyGrowth: 8 }
  },
  {
    id: '5',
    title: 'Regreso del Caballero',
    coverUrl: '/Mangas/Manwhas/4/Portada.webp',
    rating: 8.8,
    status: 'Pausado',
    genre: ['Acción', 'Reencarnación', 'Drama'],
    rank: 5,
    author: 'Author Unknown',
    stats: { views: 100000, likes: 5000, revenue: 100, monthlyGrowth: 1 }
  },
  {
    id: '6',
    title: 'Tower of God',
    coverUrl: '/Mangas/Manwhas/5/Portada.webp',
    rating: 9.7,
    status: 'En curso',
    genre: ['Aventura', 'Fantasía', 'Misterio'],
    author: 'SIU',
    stats: { views: 3000000, likes: 120000, revenue: 5000, monthlyGrowth: 4 }
  },
  {
    id: '7',
    title: 'Hunter x Hunter',
    coverUrl: '/Mangas/Manga/1/Portada.webp',
    rating: 9.6,
    status: 'Pausado',
    genre: ['Aventura', 'Acción', 'Shonen'],
    author: 'Yoshihiro Togashi',
    stats: { views: 2500000, likes: 90000, revenue: 4200, monthlyGrowth: 0 }
  },
  {
    id: '8',
    title: 'Berserk',
    coverUrl: '/Mangas/Manga/3/PORTADA.webp',
    rating: 9.95,
    status: 'Pausado',
    genre: ['Seinen', 'Fantasía Oscura', 'Horror'],
    author: 'Kentaro Miura',
    stats: { views: 6000000, likes: 300000, revenue: 20000, monthlyGrowth: 1 }
  }
];

// Real chapters mapped from Mangas folder structure
export const CHAPTERS: Record<string, Chapter[]> = {
  // Omniscient Reader's Viewpoint (Manwhas/1)
  '1': [
    {
      id: 'orv-ch1',
      title: 'Capítulo 1',
      pageCount: 1,
      pages: ['/Mangas/Manwhas/1/Cap1.webp']
    },
    {
      id: 'orv-ch2',
      title: 'Capítulo 2',
      pageCount: 1,
      pages: ['/Mangas/Manwhas/1/cap2.webp']
    },
    {
      id: 'orv-ch3',
      title: 'Capítulo 3',
      pageCount: 1,
      pages: ['/Mangas/Manwhas/1/cap3.webp']
    }
  ],
  // Nano Machine (Manga/2)
  '2': [
    {
      id: 'nm-ch1',
      title: 'Capítulo 1',
      pageCount: 1,
      pages: ['/Mangas/Manga/2/1.webp']
    },
    {
      id: 'nm-ch2',
      title: 'Capítulo 2',
      pageCount: 1,
      pages: ['/Mangas/Manga/2/2.webp']
    },
    {
      id: 'nm-ch3',
      title: 'Capítulo 3',
      pageCount: 1,
      pages: ['/Mangas/Manga/2/3.webp']
    },
    {
      id: 'nm-ch4',
      title: 'Capítulo 4',
      pageCount: 1,
      pages: ['/Mangas/Manga/2/4.webp']
    }
  ],
  // Solo Leveling (Manwhas/2)
  '3': [
    {
      id: 'sl-ch1',
      title: 'Capítulo 1',
      pageCount: 1,
      pages: ['/Mangas/Manwhas/2/01.webp']
    },
    {
      id: 'sl-ch2',
      title: 'Capítulo 2',
      pageCount: 1,
      pages: ['/Mangas/Manwhas/2/2.webp']
    },
    {
      id: 'sl-ch3',
      title: 'Capítulo 3',
      pageCount: 1,
      pages: ['/Mangas/Manwhas/2/03.webp']
    }
  ],
  // Beginning After The End (Manwhas/3)
  '4': [
    {
      id: 'bate-ch1',
      title: 'Capítulo 1',
      pageCount: 1,
      pages: ['/Mangas/Manwhas/3/1.webp']
    },
    {
      id: 'bate-ch2',
      title: 'Capítulo 2',
      pageCount: 1,
      pages: ['/Mangas/Manwhas/3/2.webp']
    },
    {
      id: 'bate-ch3',
      title: 'Capítulo 3',
      pageCount: 1,
      pages: ['/Mangas/Manwhas/3/3.webp']
    }
  ],
  // Regreso del Caballero (Manwhas/4)
  '5': [
    {
      id: 'rdc-ch1',
      title: 'Capítulo 1',
      pageCount: 1,
      pages: ['/Mangas/Manwhas/4/1.webp']
    },
    {
      id: 'rdc-ch2',
      title: 'Capítulo 2',
      pageCount: 1,
      pages: ['/Mangas/Manwhas/4/2.webp']
    },
    {
      id: 'rdc-ch3',
      title: 'Capítulo 3',
      pageCount: 1,
      pages: ['/Mangas/Manwhas/4/3.webp']
    }
  ],
  // Tower of God (Manwhas/5)
  '6': [
    {
      id: 'tog-ch1',
      title: 'Capítulo 1',
      pageCount: 1,
      pages: ['/Mangas/Manwhas/5/1.webp']
    },
    {
      id: 'tog-ch2',
      title: 'Capítulo 2',
      pageCount: 1,
      pages: ['/Mangas/Manwhas/5/2.webp']
    },
    {
      id: 'tog-ch3',
      title: 'Capítulo 3',
      pageCount: 1,
      pages: ['/Mangas/Manwhas/5/3.webp']
    }
  ],
  // Hunter x Hunter (Manga/1)
  '7': [
    {
      id: 'hxh-ch1',
      title: 'Capítulo 1',
      pageCount: 1,
      pages: ['/Mangas/Manga/1/1.webp']
    },
    {
      id: 'hxh-ch2',
      title: 'Capítulo 2',
      pageCount: 1,
      pages: ['/Mangas/Manga/1/2.webp']
    },
    {
      id: 'hxh-ch3',
      title: 'Capítulo 3',
      pageCount: 1,
      pages: ['/Mangas/Manga/1/3.webp']
    },
    {
      id: 'hxh-ch4',
      title: 'Capítulo 4',
      pageCount: 1,
      pages: ['/Mangas/Manga/1/4.webp']
    }
  ],
  // Berserk (Manga/3) - Solo tiene portada por ahora
  '8': []
};

// Mock pages for the reader (keeping for backward compatibility)
export const MOCK_CHAPTER_PAGES = [
  'https://picsum.photos/id/230/800/1200', // Forest/Dark
  'https://picsum.photos/id/231/800/1200', // Action
  'https://picsum.photos/id/232/800/1200', // Dialogue heavy
  'https://picsum.photos/id/233/800/1200', // Close up
  'https://picsum.photos/id/234/800/1200', // Landscape
];

// Simulation of "Analyzed" script for the TTS feature - MULTI-LANGUAGE SUPPORT
export const MOCK_AUDIO_SCRIPTS: Record<Language, AudioSegment[]> = {
  es: [
    { pageIndex: 0, text: "Capítulo 1. El Bosque de las Sombras. La niebla cubría el suelo mientras el protagonista avanzaba cautelosamente. No había sonidos, solo el latido de su propio corazón." },
    { pageIndex: 1, text: "De repente, una figura surgió de la nada. '¿Quién eres?' gritó el guerrero, desenvainando su espada. El acero brilló bajo la luz de la luna." },
    { pageIndex: 2, text: "La figura sonrió. 'Soy aquel que ha estado esperando', respondió con una voz que helaba la sangre. 'Has llegado lejos, viajero'." },
    { pageIndex: 3, text: "El guerrero apretó los dientes. Recordó su entrenamiento, los años de sacrificio. No podía fallar ahora. 'Apártate, o te apartaré yo'." },
    { pageIndex: 4, text: "El horizonte comenzó a aclararse. La batalla había terminado antes de empezar, pero la guerra... la guerra acababa de comenzar." }
  ],
  en: [
    { pageIndex: 0, text: "Chapter 1. The Forest of Shadows. Fog covered the ground as the protagonist advanced cautiously. There were no sounds, only the beating of his own heart." },
    { pageIndex: 1, text: "Suddenly, a figure emerged from nowhere. 'Who are you?' shouted the warrior, unsheathing his sword. The steel gleamed under the moonlight." },
    { pageIndex: 2, text: "The figure smiled. 'I am the one you have been waiting for,' he replied with a voice that chilled the blood. 'You have come far, traveler.'" },
    { pageIndex: 3, text: "The warrior gritted his teeth. He remembered his training, the years of sacrifice. He could not fail now. 'Step aside, or I will move you.'" },
    { pageIndex: 4, text: "The horizon began to clear. The battle had ended before it began, but the war... the war had just begun." }
  ],
  pt: [
    { pageIndex: 0, text: "Capítulo 1. A Floresta das Sombras. O nevoeiro cobria o chão enquanto o protagonista avançava cautelosamente. Não havia sons, apenas o bater do seu próprio coração." },
    { pageIndex: 1, text: "De repente, uma figura surgiu do nada. 'Quem és tu?' gritou o guerreiro, desembainhando a sua espada. O aço brilhou sob a luz do luar." },
    { pageIndex: 2, text: "A figura sorriu. 'Sou aquele que tens esperado', respondeu com uma voz que gelava o sangue. 'Chegaste longe, viajante'." },
    { pageIndex: 3, text: "O guerreiro cerrou os dentes. Lembrou-se do seu treino, dos anos de sacrifício. Não podia falhar agora. 'Afasta-te, ou eu afasto-te'." },
    { pageIndex: 4, text: "O horizonte começou a clarear. A batalha tinha terminado antes de começar, mas a guerra... a guerra tinha apenas começado." }
  ],
  fr: [
    { pageIndex: 0, text: "Chapitre 1. La Forêt des Ombres. Le brouillard couvrait le sol alors que le protagoniste avançait prudemment. Il n'y avait aucun son, seulement le battement de son propre cœur." },
    { pageIndex: 1, text: "Soudain, une silhouette surgit de nulle part. 'Qui es-tu ?' cria le guerrier en dégainant son épée. L'acier brillait sous le clair de lune." },
    { pageIndex: 2, text: "La silhouette sourit. 'Je suis celui que tu attendais', répondit-il d'une voix qui glaçait le sang. 'Tu as fait un long chemin, voyageur'." },
    { pageIndex: 3, text: "Le guerrier serra les dents. Il se souvint de son entraînement, des années de sacrifice. Il ne pouvait pas échouer maintenant. 'Écarte-toi, ou je t'écarterai'." },
    { pageIndex: 4, text: "L'horizon commença à s'éclaircir. La bataille était terminée avant d'avoir commencé, mais la guerre... la guerre venait juste de commencer." }
  ],
  it: [
    { pageIndex: 0, text: "Capitolo 1. La Foresta delle Ombre. La nebbia copriva il terreno mentre il protagonista avanzava con cautela. Non c'erano suoni, solo il battito del suo stesso cuore." },
    { pageIndex: 1, text: "Improvvisamente, una figura emerse dal nulla. 'Chi sei?' gridò il guerriero, sguainando la spada. L'acciaio brillava alla luce della luna." },
    { pageIndex: 2, text: "La figura sorrise. 'Sono colui che stavi aspettando', rispose con una voce che gelava il sangue. 'Sei arrivato lontano, viaggiatore'." },
    { pageIndex: 3, text: "Il guerriero strinse i denti. Ricordò il suo addestramento, gli anni di sacrificio. Non poteva fallire ora. 'Spostati, o ti sposterò io'." },
    { pageIndex: 4, text: "L'orizzonte iniziò a schiarirsi. La battaglia era finita prima di iniziare, ma la guerra... la guerra era appena cominciata." }
  ],
  ja: [
    { pageIndex: 0, text: "第1章 影の森。主人公が慎重に進む中、霧が地面を覆っていた。音はなく、彼自身の心臓の鼓動だけが聞こえた。" },
    { pageIndex: 1, text: "突然、何もないところから人影が現れた。「誰だ！」と戦士は叫び、剣を抜いた。月明かりの下で鋼が輝いた。" },
    { pageIndex: 2, text: "人影は微笑んだ。「私はお前が待っていた者だ」と、血も凍るような声で答えた。「よく来たな、旅人よ」。" },
    { pageIndex: 3, text: "戦士は歯を食いしばった。訓練の日々、犠牲の年月を思い出した。今、失敗するわけにはいかない。「どけ、さもなくば私がどかす」。" },
    { pageIndex: 4, text: "地平線が明るくなり始めた。戦いは始まる前に終わったが、戦争は... 戦争は始まったばかりだった。" }
  ]
};

// Keep backward compatibility alias
export const MOCK_AUDIO_SCRIPT = MOCK_AUDIO_SCRIPTS['es'];

