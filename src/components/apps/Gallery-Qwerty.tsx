import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, X } from 'lucide-react';

const PHOTOS = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=2574&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=2400&auto=format&fit=crop"
];

const GalleryApp: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="h-full w-full flex flex-col bg-white dark:bg-black">
      <div className="px-4 py-4 shrink-0 flex items-center gap-3 border-b border-black/5 dark:border-white/5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 flex items-center justify-center text-white">
          <ImageIcon size={18} />
        </div>
        <h1 className="text-xl font-bold dark:text-white">Галерея</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-6 pt-2">
        <div className="grid grid-cols-3 gap-1">
          {PHOTOS.map((url, i) => (
            <motion.div
              layoutId={`photo-${i}`}
              key={i}
              onClick={() => setSelectedId(url)}
              className="aspect-square bg-neutral-200 dark:bg-neutral-800 cursor-pointer overflow-hidden rounded-sm"
              whileTap={{ scale: 0.95 }}
            >
              <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black flex items-center justify-center p-4"
          >
            <motion.div 
              layoutId={`photo-${PHOTOS.indexOf(selectedId)}`}
              className="w-full h-full flex items-center justify-center"
            >
              <img src={selectedId} className="w-full h-auto object-contain max-h-full rounded-xl" alt="Full screen" />
            </motion.div>
            
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-12 right-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md z-50"
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryApp;