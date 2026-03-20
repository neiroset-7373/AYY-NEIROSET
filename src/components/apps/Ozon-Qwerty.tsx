import React, { useState } from 'react';
import { useStore } from '../../store/useStore-Qwerty';
import { ShoppingCart, Star, Search, Tag, ShoppingBag, Package } from 'lucide-react';

const products = [
  { id: 0, name: 'QwertyOS 3.1 for Qwerty 5 Pro', price: 500, oldPrice: 1000, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9', rating: 5.0, isOS: true },
  { id: 1, name: 'Qwerty Buds Pro', price: 12000, oldPrice: 15000, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', rating: 4.8 },
  { id: 2, name: 'Cyber Desk Lamp', price: 4500, oldPrice: 6000, img: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c', rating: 4.9 },
  { id: 3, name: 'RTX 5090 Qwerty Edition', price: 199000, oldPrice: 250000, img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704', rating: 5.0 },
  { id: 4, name: 'Mechanical Keyboard X', price: 8900, oldPrice: 11000, img: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae', rating: 4.7 },
  { id: 5, name: 'Smart Watch Z', price: 14500, oldPrice: 18000, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', rating: 4.6 },
];

const OzonApp: React.FC = () => {
  const { spendMoney, addChatMessage, addNotification } = useStore();
  const [msg, setMsg] = useState<string | null>(null);

  const handleBuy = (p: typeof products[0]) => {
    const success = spendMoney(p.price, `Покупка ${p.name} в Ozon`);
    if (success) {
      setMsg(`Успешно куплено: ${p.name}`);
      if (p.isOS) {
        setTimeout(() => {
          addNotification('System Update', 'Доступна QwertyOS 3.1. Нажмите для установки.', 'update');
          addChatMessage('system', 'System Update', { 
            text: 'Доступно обновление до стабильной версии QwertyOS 3.1. Нажмите для установки.', 
            isSender: false, 
            hasAction: 'install_31' 
          });
        }, 1500);
      }
      setTimeout(() => setMsg(null), 3000);
    } else {
      setMsg('Недостаточно средств!');
      setTimeout(() => setMsg(null), 3000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#005bff] text-white">
      {/* Search Header */}
      <div className="p-4 bg-[#005bff] sticky top-0 z-10 shadow-lg">
         <div className="bg-white rounded-2xl p-3 flex items-center gap-3 text-zinc-400">
            <Search size={18} />
            <span className="text-sm font-medium">Искать на Ozon</span>
         </div>
         <div className="flex gap-4 mt-4 overflow-x-auto no-scrollbar pb-2">
            {['Акции', 'Бренды', 'Электроника', 'Дом', 'Одежда'].map(cat => (
              <span key={cat} className="whitespace-nowrap bg-white/10 p-2 px-4 rounded-full text-xs font-bold">{cat}</span>
            ))}
         </div>
      </div>

      <div className="flex-1 bg-[#f4f4f5] dark:bg-zinc-950 text-zinc-900 dark:text-white p-4 space-y-6 overflow-y-auto pb-24">
         <div className="grid grid-cols-2 gap-4">
            {products.map(p => (
              <div key={p.id} className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm border border-black/5 dark:border-white/5 flex flex-col transition-all active:scale-95 group">
                 <div className="relative aspect-square overflow-hidden">
                    <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 bg-pink-500 text-white text-[10px] font-bold p-1 px-2 rounded-lg">SALE</div>
                 </div>
                 <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-1 text-[10px] text-amber-500 mb-2">
                       <Star size={10} fill="currentColor" />
                       <span>{p.rating}</span>
                    </div>
                    <h3 className="text-sm font-bold line-clamp-2 flex-1 mb-2">{p.name}</h3>
                    <div className="flex flex-col mb-4">
                       <span className="text-xs text-zinc-400 line-through">{p.oldPrice.toLocaleString()} ₽</span>
                       <span className="text-lg font-black text-[#005bff]">{p.price.toLocaleString()} ₽</span>
                    </div>
                    <button 
                      onClick={() => handleBuy(p)}
                      className="w-full bg-[#005bff] hover:bg-[#004bd1] text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={14} /> Купить
                    </button>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {msg && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-zinc-800 text-white px-6 py-3 rounded-2xl shadow-2xl text-sm font-bold z-[100] border border-white/10">
           {msg}
        </div>
      )}

      {/* Footer Nav */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-t border-black/5 dark:border-white/5 flex items-center justify-around px-8 text-zinc-400">
         <div className="flex flex-col items-center gap-1 text-[#005bff]"><ShoppingBag size={20} /><span className="text-[10px]">Главная</span></div>
         <div className="flex flex-col items-center gap-1"><Package size={20} /><span className="text-[10px]">Заказы</span></div>
         <div className="flex flex-col items-center gap-1"><Tag size={20} /><span className="text-[10px]">Избранное</span></div>
      </div>
    </div>
  );
};

export default OzonApp;
