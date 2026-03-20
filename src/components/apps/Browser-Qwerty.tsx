import React, { useState } from 'react';
import { Globe, ArrowLeft, ArrowRight, RotateCw, Search, ShieldCheck, Home } from 'lucide-react';
import { useStore } from '../../store/useStore-Qwerty';

const BrowserAppQwerty: React.FC = () => {
  const { accent } = useStore();
  const [url, setUrl] = useState('https://www.google.com/search?q=Qwerty+5+Pro');
  const [inputUrl, setInputUrl] = useState('google.com');
  const [isLoading, setIsLoading] = useState(false);

  const accentHex: Record<string, string> = {
    blue: '#3b82f6',
    purple: '#a855f7',
    emerald: '#10b981',
    orange: '#f97316'
  };

  const currentAccent = accentHex[accent] || '#3b82f6';

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let target = inputUrl;
    if (!target.startsWith('http')) {
      if (target.includes('.')) {
        target = 'https://' + target;
      } else {
        target = `https://www.google.com/search?q=${encodeURIComponent(target)}`;
      }
    }
    setUrl(target);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl">
      {/* Address Bar */}
      <div className="bg-zinc-100 dark:bg-zinc-900 p-3 pt-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
              <ArrowLeft size={16} className="text-zinc-600 dark:text-zinc-400" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
              <ArrowRight size={16} className="text-zinc-600 dark:text-zinc-400" />
            </button>
          </div>
          
          <form onSubmit={handleNavigate} className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <ShieldCheck size={14} className="text-green-500" />
            </div>
            <input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full bg-white dark:bg-zinc-800 rounded-full py-1.5 pl-8 pr-10 text-xs border border-zinc-200 dark:border-zinc-700 focus:ring-2 outline-none dark:text-white"
              style={{ focusRingColor: currentAccent } as any}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
              <RotateCw size={14} className={`text-zinc-400 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </form>
        </div>
      </div>

      {/* Viewport */}
      <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm z-10 flex items-center justify-center flex-col gap-4">
            <div className="w-12 h-12 border-4 rounded-full animate-spin" style={{ borderColor: `${currentAccent} transparent ${currentAccent} transparent` }} />
            <p className="text-xs font-medium dark:text-white">Connecting to server...</p>
          </div>
        )}
        
        <iframe 
          src={url} 
          className="w-full h-full border-none"
          title="Browser Viewport"
        />
        
        {!isLoading && (
          <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-white dark:bg-zinc-950 pointer-events-none">
            <Search size={48} className="text-zinc-300 dark:text-zinc-800 mb-4" />
            <h3 className="text-lg font-bold dark:text-white mb-2">Secure Connection Refused</h3>
            <p className="text-sm text-zinc-500 max-w-[240px]">This website does not allow loading inside an iframe for security reasons.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2 pointer-events-auto">
              {['Wikipedia', 'GitHub', 'Reddit', 'Vercel'].map(site => (
                <button 
                  key={site}
                  onClick={() => {
                    const s = `https://www.${site.toLowerCase()}.com`;
                    setInputUrl(s);
                    setUrl(s);
                  }}
                  className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-medium hover:bg-zinc-200 dark:text-zinc-300"
                >
                  {site}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="h-12 bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-around">
        <button onClick={() => setUrl('https://google.com')} className="text-zinc-500 hover:text-blue-500 transition-colors">
          <Home size={20} />
        </button>
        <button className="text-zinc-500 hover:text-blue-500 transition-colors">
          <Globe size={20} />
        </button>
      </div>
    </div>
  );
};

export default BrowserAppQwerty;