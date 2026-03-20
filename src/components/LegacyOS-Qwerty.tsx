import React, { useState } from 'react';
// framer-motion not used in legacy
import { useStore } from '../store/useStore-Qwerty';
import { Settings, Phone, MessageSquare, RefreshCw, X } from 'lucide-react';

export const LegacyOS: React.FC = () => {
  const { setOsVersion, setInstalling, setOpenApp, openApp } = useStore();
  const [checking, setChecking] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const apps = [
    { id: 'settings', name: 'SETTING', icon: Settings },
    { id: 'phone', name: 'PHONE', icon: Phone },
    { id: 'sms', name: 'SMS', icon: MessageSquare },
  ];

  const handleUpdate = () => {
    setInstalling(true);
    setOpenApp(null);
    setTimeout(() => {
      setOsVersion('qwerui');
      setInstalling(false);
    }, 16000);
  };

  const checkUpdate = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      setShowUpdate(true);
    }, 3000);
  };

  const AppWindow = ({ id }: { id: string }) => {
    return (
      <div className="absolute inset-0 z-50 bg-black border-2 border-white/20 p-4 flex flex-col font-mono">
        <div className="flex justify-between items-center mb-4 border-b border-white/20 pb-2">
          <span className="text-white text-xs tracking-tighter uppercase">{id}</span>
          <button onClick={() => setOpenApp(null)} className="text-white">
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          {id === 'settings' && (
            <div className="space-y-4">
              <button 
                onClick={checkUpdate}
                disabled={checking}
                className="w-full p-3 bg-white/5 border border-white/20 text-white text-[10px] text-left flex justify-between items-center"
              >
                {checking ? 'CHECKING...' : 'CHECK UPDATE'}
                <RefreshCw size={12} className={checking ? 'animate-spin' : ''} />
              </button>
              
              {showUpdate && (
                <button 
                  onClick={handleUpdate}
                  className="w-full p-4 bg-green-900 border border-green-400 text-green-400 text-xs font-bold animate-pulse"
                >
                  INSTALL QWERUI (LATEST)
                </button>
              )}
            </div>
          )}
          {id === 'phone' && <div className="text-green-500 text-[10px]">DIALER: READY</div>}
          {id === 'sms' && <div className="text-green-500 text-[10px]">MESSAGE: EMPTY</div>}
        </div>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 bg-black font-mono text-green-500 p-8 pt-12">
      <div className="absolute top-0 left-0 right-0 h-8 flex items-center px-4 bg-green-950/30 text-[10px] justify-between border-b border-green-900/40">
        <span>QWERTY 3.1 OS</span>
        <span>LEGACY_MODE</span>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8">
        {apps.map(app => (
          <button 
            key={app.id}
            onClick={() => setOpenApp(app.id as any)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-12 h-12 border border-green-900 flex items-center justify-center group-active:bg-green-900/50">
              <app.icon size={24} />
            </div>
            <span className="text-[8px] uppercase">{app.name}</span>
          </button>
        ))}
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center text-[10px] text-green-900">
        VER: 3.1_DEV_BUILD
      </div>

      {openApp && <AppWindow id={openApp} />}
    </div>
  );
};
