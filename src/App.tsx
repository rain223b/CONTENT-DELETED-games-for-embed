import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Play, X, Loader2, Gamepad2 } from 'lucide-react';
import gamesData from './games.json';

interface Game {
  name: string;
  filename: string;
  popular?: boolean;
  image?: string;
}

const GAMES: Game[] = gamesData as Game[];

function GameIcon({ game }: { game: Game }) {
  const [imgUrl, setImgUrl] = useState<string | null>(() => {
    if (game.image && !game.image.includes('ui-avatars')) return game.image;
    try {
      const cached = localStorage.getItem(`game-icon-${game.filename}`);
      if (cached) return cached;
    } catch(e) {}
    return null;
  });
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (ref.current) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      }, { rootMargin: '200px' });
      observer.observe(ref.current);
    }
    return () => observer && observer.disconnect();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (isVisible && !imgUrl && !failed) {
      const timer = setTimeout(() => {
        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(game.name)}&entity=software&limit=1`)
          .then(r => {
             if (r.status === 403) throw new Error("Rate limit");
             return r.json();
          })
          .then(data => {
            if (!mounted) return;
            if (data.results && data.results.length > 0) {
              const url = data.results[0].artworkUrl512 || data.results[0].artworkUrl100;
              setImgUrl(url);
              try {
                localStorage.setItem(`game-icon-${game.filename}`, url);
              } catch(e) {}
            } else {
              setFailed(true);
            }
          })
          .catch(() => {
            if (mounted) setFailed(true);
          });
      }, 800 + Math.random() * 1500);
      return () => {
         mounted = false;
         clearTimeout(timer);
      };
    }
  }, [isVisible, game.name, imgUrl, failed, game.filename]);

  return (
    <div ref={ref} className="w-full h-full relative">
      {imgUrl ? (
        <img 
          src={imgUrl} 
          alt={game.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 text-gray-500 transform group-hover:scale-110 transition-transform duration-500">
           <Gamepad2 className="w-8 h-8 opacity-50 mb-1" />
           {!failed && isVisible ? (
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-30 text-center px-1 truncate w-full">Loading...</span>
           ) : (
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-30 text-center px-1 truncate w-full">{game.name.substring(0,10)}</span>
           )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [loadingGame, setLoadingGame] = useState(false);
  const [gameSrcDoc, setGameSrcDoc] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'popular' | 'all'>('popular');

  // Filter games based on search query and active tab
  const filteredGames = useMemo(() => {
    let result = GAMES;
    if (activeTab === 'popular' && !searchQuery.trim()) {
      result = GAMES.filter(g => g.popular);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = GAMES.filter(
        game => 
          game.name.toLowerCase().includes(query) || 
          game.filename.toLowerCase().includes(query)
      );
    }
    return result;
  }, [searchQuery, activeTab]);

  const displayedGames = filteredGames;

  const handleGameSelect = async (game: Game) => {
    setSelectedGame(game);
    setLoadingGame(true);
    setGameSrcDoc('');
    try {
      const res = await fetch(`https://cdn.jsdelivr.net/gh/bubbls/ugs-singlefile/UGS-Files/${game.filename}`);
      const text = await res.text();
      setGameSrcDoc(text);
    } catch (err) {
      console.error(err);
      setGameSrcDoc('<html><body><h1 style="color:red;font-family:sans-serif;padding:20px;">Failed to load game embed code.</h1></body></html>');
    } finally {
      setLoadingGame(false);
    }
  };

  const closeGame = () => {
    setSelectedGame(null);
    setLoadingGame(false);
    setGameSrcDoc('');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-gray-900/80 mt-[env(safe-area-inset-top)] border-b border-gray-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-indigo-400" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 whitespace-nowrap hidden sm:block">
              CONTENT DELETED
            </h1>
          </div>
          
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Search over 2,500 games..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
            </div>
          </div>
          
          <div className="text-sm text-gray-400 hidden md:block">
            {filteredGames.length} {filteredGames.length === 1 ? 'Game' : 'Games'}
          </div>
        </div>
        
        {!searchQuery && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4 border-t border-gray-800">
            <button 
              onClick={() => { setActiveTab('popular'); }}
              className={`py-3 px-4 font-medium transition-colors border-b-2 ${activeTab === 'popular' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            >
              Popular Games
            </button>
            <button 
              onClick={() => { setActiveTab('all'); }}
              className={`py-3 px-4 font-medium transition-colors border-b-2 ${activeTab === 'all' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            >
              All Library
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredGames.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <Gamepad2 className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-xl text-center">No games found matching "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6">
              {displayedGames.map((game, index) => (
                <button
                  key={`${game.filename}-${index}`}
                  onClick={() => handleGameSelect(game)}
                  className="group relative flex flex-col items-center p-3 bg-gray-900 border border-gray-800 rounded-2xl hover:border-indigo-500/50 hover:bg-gray-800 transition-all duration-300 text-center w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <div className="aspect-square w-full mb-3 rounded-xl overflow-hidden bg-gray-800 relative shadow-lg group-hover:shadow-indigo-500/20 transition-all duration-300">
                    <GameIcon game={game} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-colors duration-300">
                      <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100 drop-shadow-md" fill="currentColor" />
                    </div>
                  </div>
                  <h3 className="w-full text-xs sm:text-sm font-semibold text-gray-200 line-clamp-2 leading-tight group-hover:text-indigo-300 transition-colors">
                    {game.name}
                  </h3>
                </button>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Game Modal */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-gray-950 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col border border-gray-800 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-800 bg-gray-900 shrink-0">
              <h2 className="text-lg sm:text-xl font-bold truncate pr-4 text-gray-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
                {selectedGame.name}
              </h2>
              <button
                onClick={closeGame}
                className="p-2 sm:p-2.5 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors flex-shrink-0"
                aria-label="Close game"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            
            {/* Modal Body / Iframe Container */}
            <div className="relative flex-1 w-full bg-[#111]">
              {loadingGame && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111] z-10">
                  <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                  <p className="text-gray-400">Loading {selectedGame.name}...</p>
                </div>
              )}
              {gameSrcDoc ? (
                <iframe
                  title={selectedGame.name}
                  srcDoc={gameSrcDoc}
                  className="absolute inset-0 w-full h-full border-0 bg-white"
                  allow="autoplay; fullscreen; gamepad; focus"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock allow-modals"
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
