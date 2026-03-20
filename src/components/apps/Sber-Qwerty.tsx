import React from 'react';
import { useStore } from '../../store/useStore-Qwerty';
import { Landmark, ArrowDownLeft, ArrowUpRight, Plus, ShieldCheck, Wallet } from 'lucide-react';

const SberApp: React.FC = () => {
  const { balance, addBalance, history } = useStore();

  return (
    <div className="flex flex-col h-full bg-[#111111] text-white overflow-hidden">
      {/* Header */}
      <div className="bg-[#1a1a1a] p-8 pb-12 rounded-b-[40px] shadow-2xl">
         <div className="flex items-center justify-between mb-8 opacity-60">
            <div className="flex items-center gap-2"><Landmark size={18} /> <span>Сбер</span></div>
            <ShieldCheck size={20} />
         </div>
         
         <div className="flex flex-col gap-2">
            <span className="text-sm opacity-50 uppercase tracking-widest font-semibold">Ваш баланс</span>
            <div className="text-5xl font-extrabold tracking-tighter">
              {balance.toLocaleString()} <span className="text-emerald-500 font-normal">₽</span>
            </div>
         </div>
      </div>

      {/* Spidi Button */}
      <div className="px-6 -mt-6">
        <button 
          onClick={() => addBalance(5000, 'Spidi дерьмо !')}
          className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all text-white p-4 rounded-3xl font-black text-lg shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2"
        >
          <Plus size={24} /> Spidi дерьмо ! (+5000)
        </button>
      </div>

      {/* History */}
      <div className="flex-1 px-6 pt-8 overflow-y-auto">
         <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl">История операций</h3>
            <Wallet size={20} className="text-zinc-600" />
         </div>
         
         <div className="space-y-4 pb-12">
            {history.length === 0 ? (
               <div className="text-center p-12 text-zinc-600 text-sm">Тут пока пусто...</div>
            ) : (
              history.map(item => (
                <div key={item.id} className="bg-[#1a1a1a] p-4 rounded-2xl flex items-center justify-between border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${item.amount > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                       {item.amount > 0 ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{item.title}</span>
                      <span className="text-[10px] text-zinc-500">{item.date}</span>
                    </div>
                  </div>
                  <span className={`font-bold ${item.amount > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString()} ₽
                  </span>
                </div>
              ))
            )}
         </div>
      </div>
    </div>
  );
};

export default SberApp;
