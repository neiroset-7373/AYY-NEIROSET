import React, { useState } from 'react';
import { Phone, PhoneIncoming, PhoneOutgoing, User, Grid3X3, Clock, Star, Search } from 'lucide-react';

const PhoneApp: React.FC = () => {
  const [dial, setDial] = useState('');
  const [tab, setTab] = useState('dialpad');

  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  const dialLog = [
    { name: 'Spidi', time: '12:45', type: 'incoming', status: 'missed' },
    { name: '+7 (999) 000-00-00', time: 'Вчера', type: 'outgoing', status: 'ok' },
    { name: 'Ozon Delivery', time: 'Пн', type: 'incoming', status: 'ok' },
    { name: 'Unknown', time: '11:00', type: 'incoming', status: 'missed' },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
      <div className="flex-1 p-6 flex flex-col">
        {tab === 'dialpad' ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            <div className="text-4xl font-light h-12 mb-8 tracking-widest">{dial}</div>
            
            <div className="grid grid-cols-3 gap-6">
              {buttons.map(btn => (
                <button 
                  key={btn}
                  onClick={() => setDial(prev => prev.length < 15 ? prev + btn : prev)}
                  className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-900 flex flex-col items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors active:scale-90"
                >
                  <span className="text-2xl font-bold">{btn}</span>
                  <span className="text-[10px] text-zinc-500 uppercase font-black">
                    {btn === '2' ? 'abc' : btn === '3' ? 'def' : ''}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-12">
               <div className="w-16 h-16" /> {/* Spacer */}
               <button className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/30 active:scale-95 transition-transform">
                  <Phone size={32} fill="white" className="text-white" />
               </button>
               <button 
                onClick={() => setDial(prev => prev.slice(0, -1))}
                className="w-16 h-16 rounded-full flex items-center justify-center text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
               >
                 <span className="text-xl">⌫</span>
               </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">Недавние</h2>
              <Search size={20} className="text-zinc-500" />
            </div>
            
            <div className="space-y-4">
              {dialLog.map((log, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-4">
                     <div className={`p-3 rounded-2xl ${log.status === 'missed' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        {log.type === 'incoming' ? <PhoneIncoming size={20} /> : <PhoneOutgoing size={20} />}
                     </div>
                     <div className="flex flex-col">
                        <span className={`font-bold ${log.status === 'missed' ? 'text-red-500' : ''}`}>{log.name}</span>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{log.type === 'incoming' ? 'Входящий' : 'Исходящий'} • {log.time}</span>
                     </div>
                  </div>
                  <Phone size={18} className="text-zinc-400" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="h-20 bg-zinc-50 dark:bg-zinc-900 border-t border-black/5 dark:border-white/5 flex items-center justify-around text-zinc-400 font-bold text-[10px] uppercase tracking-widest px-8">
         <button onClick={() => setTab('favorites')} className={`flex flex-col items-center gap-1 ${tab === 'favorites' ? 'text-emerald-500' : ''}`}>
           <Star size={20} /><span className="opacity-60">Избранное</span>
         </button>
         <button onClick={() => setTab('recents')} className={`flex flex-col items-center gap-1 ${tab === 'recents' ? 'text-emerald-500' : ''}`}>
           <Clock size={20} /><span className="opacity-60">Недавние</span>
         </button>
         <button onClick={() => setTab('contacts')} className={`flex flex-col items-center gap-1 ${tab === 'contacts' ? 'text-emerald-500' : ''}`}>
           <User size={20} /><span className="opacity-60">Контакты</span>
         </button>
         <button onClick={() => setTab('dialpad')} className={`flex flex-col items-center gap-1 ${tab === 'dialpad' ? 'text-emerald-500' : ''}`}>
           <Grid3X3 size={20} /><span className="opacity-60">Клавиши</span>
         </button>
      </div>
    </div>
  );
};

export default PhoneApp;
