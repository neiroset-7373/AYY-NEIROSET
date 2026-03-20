import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Music, Repeat, Shuffle, Disc } from 'lucide-react';

const MusicApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress] = useState(30);

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-white p-8">
      <div className="flex-1 flex flex-col items-center justify-center gap-12">
        {/* Vinyl Disc */}
        <div className="relative w-64 h-64 flex items-center justify-center">
           <motion.div 
             animate={{ rotate: isPlaying ? 360 : 0 }}
             transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
             className="w-full h-full rounded-full bg-[#111] shadow-[0_0_50px_rgba(0,0,0,0.8)] border-[10px] border-[#222] relative overflow-hidden"
           >
              {/* Grooves */}
              <div className="absolute inset-0 border-[20px] border-black/10 rounded-full" />
              <div className="absolute inset-4 border-[20px] border-black/10 rounded-full" />
              <div className="absolute inset-8 border-[20px] border-black/10 rounded-full" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-24 h-24 rounded-full bg-pink-600 border-4 border-black flex items-center justify-center">
                    <Music size={40} />
                 </div>
              </div>
           </motion.div>
           
           {/* Needle arm shadow */}
           <div className="absolute -right-4 -top-4 w-4 h-32 bg-zinc-800 rounded-full origin-top rotate-12 transition-transform duration-500" style={{ transform: isPlaying ? 'rotate(15deg)' : 'rotate(0deg)' }} />
        </div>

        {/* Track Info */}
        <div className="text-center space-y-2">
           <h2 className="text-2xl font-black tracking-tight">Qwerty Beats</h2>
           <p className="text-pink-500 font-bold uppercase tracking-widest text-xs">Electronic Dreams</p>
        </div>

        {/* Progress */}
        <div className="w-full space-y-4">
           <div className="h-1 bg-white/10 rounded-full w-full relative overflow-hidden">
              <motion.div 
                animate={{ width: `${progress}%` }}
                className="h-full bg-pink-600"
              />
           </div>
           <div className="flex justify-between text-[10px] text-zinc-500 font-bold">
              <span>1:42</span>
              <span>3:55</span>
           </div>
        </div>

        {/* Controls */}
        <div className="w-full flex items-center justify-around">
           <Shuffle size={20} className="text-zinc-600" />
           <SkipBack size={28} className="hover:text-pink-500 transition-colors" />
           <button 
             onClick={() => setIsPlaying(!isPlaying)}
             className="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center shadow-xl shadow-pink-600/30 active:scale-90 transition-transform"
           >
              {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" className="ml-1" />}
           </button>
           <SkipForward size={28} className="hover:text-pink-500 transition-colors" />
           <Repeat size={20} className="text-zinc-600" />
        </div>
      </div>

      {/* Playlist Preview */}
      <div className="h-24 bg-white/5 rounded-3xl p-4 flex items-center gap-4 mt-8 border border-white/5">
         <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Disc size={24} />
         </div>
         <div className="flex-1">
            <h4 className="font-bold text-sm">Next: Cybernetic Sunset</h4>
            <p className="text-[10px] opacity-40">Spidi ft. Qwerty Core</p>
         </div>
      </div>
    </div>
  );
};

export default MusicApp;
