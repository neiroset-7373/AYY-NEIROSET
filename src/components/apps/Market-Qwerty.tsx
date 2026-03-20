import React, { useState } from 'react';
import { useStore, AppId } from '../../store/useStore-Qwerty';
import { motion } from 'framer-motion';
import { Download, Loader2, Check, ShoppingBag, Landmark, Zap, Music, CloudRain } from 'lucide-react';

const appsToMarket: { id: AppId, name: string, icon: any, color: string, category: string, desc: string }[] = [
  { id: 'sber', name: 'Сбер', icon: Landmark, color: 'bg-emerald-600', category: 'Финансы', desc: 'Ваш мобильный банк с бонусами' },
  { id: 'ozon', name: 'Ozon', icon: ShoppingBag, color: 'bg-blue-600', category: 'Шопинг', desc: 'Миллионы товаров с доставкой' },
  { id: 'ai', name: 'Qwerty AI', icon: Zap, color: 'bg-purple-600', category: 'AI Чат', desc: 'Умный помощник в твоем кармане' },
  { id: 'music', name: 'Music', icon: Music, color: 'bg-pink-600', category: 'Музыка', desc: 'Слушайте любимые треки везде' },
  { id: 'notes', name: 'Заметки', icon: CloudRain, color: 'bg-amber-600', category: 'Инструменты', desc: 'Записывайте важные мысли' },
];

const MarketApp: React.FC = () => {
  const { installedApps, installApp, theme } = useStore();
  const [loadingApp, setLoadingApp] = useState<AppId | null>(null);

  const handleInstall = (appId: AppId) => {
    setLoadingApp(appId);
    setTimeout(() => {
      installApp(appId);
      setLoadingApp(null);
    }, 3000);
  };

  return (
    <div className={`flex flex-col h-full pb-20 ${theme === 'light' ? 'bg-slate-50 text-slate-900' : theme === 'cyber' ? 'bg-[#150424] text-cyan-400' : 'bg-slate-950 text-white'}`}>
      <header className="p-6 pt-10 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Market</h1>
        <p className="text-slate-500">Только лучшие приложения для Qwerty</p>
      </header>

      <div className="flex-1 overflow-y-auto px-6 space-y-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-[32px] text-white shadow-xl shadow-indigo-500/20">
           <h2 className="text-xl font-bold mb-2">Приложение дня</h2>
           <p className="opacity-80 text-sm mb-4">Qwerty AI — будущее уже наступило.</p>
           <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-bold text-sm">Узнать больше</button>
        </div>

        <section className="space-y-4">
           <h3 className="text-lg font-bold">Рекомендуем</h3>
           <div className="space-y-4">
              {appsToMarket.map(app => (
                <div key={app.id} className={`flex items-center justify-between p-4 rounded-[28px] border shadow-sm transition-transform active:scale-95 ${theme === 'light' ? 'bg-white border-slate-200' : theme === 'cyber' ? 'bg-purple-900/20 border-cyan-500/20' : 'bg-slate-900 border-slate-800'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                       <app.icon size={28} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">{app.name}</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest">{app.category}</span>
                    </div>
                  </div>
                  
                  {installedApps.includes(app.id) ? (
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 px-4 rounded-full flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Check size={14} /> Открыть
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleInstall(app.id)}
                      disabled={loadingApp === app.id}
                      className="bg-blue-600 text-white p-2 px-6 rounded-full font-bold text-xs hover:bg-blue-700 transition-colors flex items-center gap-2 min-w-[100px] justify-center"
                    >
                      {loadingApp === app.id ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                          <Loader2 size={16} />
                        </motion.div>
                      ) : (
                        <>
                          <Download size={14} /> УСТАНОВИТЬ
                        </>
                      )}
                    </button>
                  )}
                </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default MarketApp;
