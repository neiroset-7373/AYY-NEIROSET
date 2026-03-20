import React, { useState, useEffect } from 'react';
// framer not needed here
import { Clock, Timer, Hourglass, Play, Pause, RotateCcw } from 'lucide-react';
import { useStore } from '../../store/useStore-Qwerty';

const ClockAppQwerty: React.FC = () => {
  const { theme, accent } = useStore();
  const [activeTab, setActiveTab] = useState<'world' | 'stopwatch' | 'timer'>('stopwatch');
  
  // Stopwatch state
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => setTime(prev => prev + 10), 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const accentHex: Record<string, string> = {
    blue: '#3b82f6',
    purple: '#a855f7',
    emerald: '#10b981',
    orange: '#f97316'
  };
  const currentAccent = accentHex[accent] || '#3b82f6';

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-black rounded-3xl overflow-hidden">
      <div className="p-6 pt-10">
        <h1 className="text-3xl font-black dark:text-white mb-6">Clock</h1>
        
        <div className="flex bg-zinc-200 dark:bg-zinc-900 rounded-2xl p-1">
          {[
            { id: 'world', label: 'World', icon: Clock },
            { id: 'stopwatch', label: 'Stopwatch', icon: Timer },
            { id: 'timer', label: 'Timer', icon: Hourglass },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-white dark:bg-zinc-800 shadow-sm dark:text-white' : 'text-zinc-500'}`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {activeTab === 'stopwatch' && (
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 rounded-full border-4 flex items-center justify-center mb-10 relative" style={{ borderColor: isRunning ? currentAccent : theme === 'dark' ? '#333' : '#eee' }}>
               <span className="text-5xl font-mono font-black dark:text-white tracking-tighter">{formatTime(time)}</span>
            </div>
            
            <div className="flex gap-6">
              <button 
                onClick={() => { setTime(0); setIsRunning(false); }}
                className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 active:scale-90 transition-transform"
              >
                <RotateCcw size={24} />
              </button>
              <button 
                onClick={() => setIsRunning(!isRunning)}
                className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl active:scale-90 transition-transform"
                style={{ backgroundColor: isRunning ? '#ef4444' : currentAccent }}
              >
                {isRunning ? <Pause size={32} /> : <Play size={32} fill="currentColor" />}
              </button>
            </div>
          </div>
        )}
        
        {activeTab !== 'stopwatch' && (
           <div className="text-zinc-400 font-medium">Coming Soon</div>
        )}
      </div>
    </div>
  );
};

export default ClockAppQwerty;