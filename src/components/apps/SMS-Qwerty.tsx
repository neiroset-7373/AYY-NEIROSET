import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore-Qwerty';
import { MessageSquare, Search, Plus, User, ArrowLeft, Send, Download } from 'lucide-react';

const SMSApp: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const { chats, addChatMessage, markChatRead, setOsVersion, setInstalling } = useStore();
  const [inputMsg, setInputMsg] = useState('');

  useEffect(() => {
    if (selectedChat) {
      markChatRead(selectedChat);
    }
  }, [selectedChat, chats, markChatRead]);

  const handleSend = () => {
    if (!inputMsg.trim() || !selectedChat) return;
    const chat = chats.find(c => c.id === selectedChat);
    if (!chat) return;
    addChatMessage(selectedChat, chat.name, { text: inputMsg, isSender: true });
    setInputMsg('');
  };

  const startInstall = () => {
    setInstalling(true);
    setTimeout(() => {
      setOsVersion('qwerty31');
      setInstalling(false);
    }, 16000);
  };

  if (selectedChat) {
    const chat = chats.find(c => c.id === selectedChat);
    return (
      <div className="flex flex-col h-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
        <header className="p-4 flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900/50 border-b border-black/5 dark:border-white/5 pt-8">
           <button onClick={() => setSelectedChat(null)}><ArrowLeft size={24} /></button>
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">{chat?.name[0]}</div>
             <div className="flex flex-col">
               <span className="font-bold text-sm">{chat?.name}</span>
               <span className="text-[10px] text-emerald-500 uppercase tracking-widest font-black">В сети</span>
             </div>
           </div>
        </header>
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
           {chat?.messages.map((m, i) => (
             <div key={i} className={`flex ${m.isSender ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 rounded-3xl max-w-[80%] text-sm ${
                  m.isSender 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-zinc-100 dark:bg-zinc-900 rounded-tl-none'
                }`}>
                   {m.text}
                   {m.hasAction === 'install_31' && (
                     <button 
                       onClick={startInstall}
                       className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-xl font-bold transition-colors"
                     >
                       <Download size={16} />
                       Установить QwertyOS 3.1
                     </button>
                   )}
                </div>
             </div>
           ))}
        </div>
        <div className="p-4 pb-8 flex items-center gap-2">
           <input 
             type="text"
             value={inputMsg}
             onChange={e => setInputMsg(e.target.value)}
             onKeyDown={e => e.key === 'Enter' && handleSend()}
             placeholder="Написать сообщение..."
             className="flex-1 bg-zinc-100 dark:bg-zinc-900 outline-none rounded-full px-6 py-3 text-sm"
           />
           <button onClick={handleSend} className="w-12 h-12 flex-shrink-0 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-500">
             <Send size={20} />
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white p-6">
      <header className="flex items-center justify-between mb-8 pt-4">
         <h1 className="text-3xl font-black">Сообщения</h1>
         <div className="flex gap-4">
            <Search size={24} className="text-zinc-400" />
            <div className="bg-blue-600 p-2 rounded-2xl text-white shadow-lg shadow-blue-600/20"><Plus size={24} /></div>
         </div>
      </header>
      
      <div className="space-y-4">
         {chats.map(chat => (
           <div 
            key={chat.id} 
            onClick={() => setSelectedChat(chat.id)}
            className="flex items-center gap-4 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-[32px] transition-colors cursor-pointer border border-black/5 dark:border-white/5 active:scale-95"
           >
              <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                 <User size={32} className="text-zinc-400" />
              </div>
              <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                 <div className="flex justify-between items-center">
                    <span className="font-extrabold text-sm">{chat.name}</span>
                    <span className="text-[10px] text-zinc-400">{chat.time}</span>
                 </div>
                 <p className="text-xs text-zinc-500 truncate">{chat.messages[chat.messages.length - 1]?.text}</p>
              </div>
              {chat.unread > 0 && <div className="w-5 h-5 flex-shrink-0 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-black">{chat.unread}</div>}
           </div>
         ))}
      </div>
      
      <div className="mt-12 opacity-20 flex flex-col items-center gap-2">
         <MessageSquare size={48} />
         <span className="text-xs uppercase font-bold tracking-widest">End of History</span>
      </div>
    </div>
  );
};

export default SMSApp;
