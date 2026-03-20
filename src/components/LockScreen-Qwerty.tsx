import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore-Qwerty';
import { Delete } from 'lucide-react';

export const LockScreen: React.FC = () => {
  const { pinCode, setLocked, wallpaper } = useStore();
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handlePress = (num: string) => {
    if (input.length >= 4) return;
    const newInput = input + num;
    setInput(newInput);
    if (newInput.length === 4) {
      if (newInput === pinCode) {
        setTimeout(() => setLocked(false), 200);
      } else {
        setError(true);
        setTimeout(() => { setError(false); setInput(''); }, 600);
      }
    }
  };

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('ru-RU', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[10000] flex flex-col items-center justify-between py-12"
    >
      {/* Blurred wallpaper */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${wallpaper})`, filter: 'blur(16px) brightness(0.5)', transform: 'scale(1.1)' }} />
      <div className="absolute inset-0 bg-black/30" />

      {/* Clock */}
      <div className="relative z-10 text-center">
        <p className="text-7xl font-thin text-white tracking-tight">{timeStr}</p>
        <p className="text-white/70 text-sm mt-2 capitalize">{dateStr}</p>
      </div>

      {/* PIN Input */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full px-8">
        <motion.div
          animate={error ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.3 }}
          className="flex gap-5"
        >
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="w-4 h-4 rounded-full border-2 border-white/60 transition-all"
              style={{ background: input.length > i ? '#ffffff' : 'transparent', transform: input.length > i ? 'scale(1.2)' : 'scale(1)' }} />
          ))}
        </motion.div>

        {error && <p className="text-red-400 text-sm -mt-4">Неверный PIN-код</p>}

        <div className="grid grid-cols-3 gap-4 w-full max-w-[280px]">
          {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((k, i) => (
            <button
              key={i}
              onClick={() => {
                if (k === '⌫') setInput(p => p.slice(0, -1));
                else if (k !== '') handlePress(k.toString());
              }}
              className="h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-light transition-all active:scale-90"
              style={{
                background: k === '' ? 'transparent' : 'rgba(255,255,255,0.12)',
                backdropFilter: k !== '' ? 'blur(10px)' : 'none',
                border: k !== '' && k !== '⌫' ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}
            >
              {k === '⌫' ? <Delete size={22} /> : k}
            </button>
          ))}
        </div>

        <p className="text-white/50 text-xs">Введите PIN-код для разблокировки</p>
      </div>
    </motion.div>
  );
};
