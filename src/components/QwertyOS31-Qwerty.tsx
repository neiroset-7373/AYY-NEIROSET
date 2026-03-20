import React, { useState } from 'react';
import { useStore } from '../store/useStore-Qwerty';
import { Battery, Wifi, SignalHigh, CheckCircle } from 'lucide-react';

export const QwertyOS31: React.FC = () => {
  const { setOsVersion, balance, setInstalling } = useStore();
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  const checkUpdates = () => {
    setCheckingUpdate(true);
    setTimeout(() => {
      setCheckingUpdate(false);
      setUpdateAvailable(true);
    }, 3000);
  };

  const installUpdate = () => {
    setInstalling(true);
    setTimeout(() => {
      setOsVersion('qwerui');
      setInstalling(false);
    }, 16000);
  };

  return (
    <div className="w-full h-full bg-black text-[#0f0] flex flex-col font-mono relative">
      {/* Ugly old status bar */}
      <div className="h-6 bg-[#222] border-b border-[#444] flex items-center justify-between px-2 text-[10px]">
        <span>QWERTY 3G</span>
        <div className="flex items-center gap-1 text-[#0f0]">
          <SignalHigh size={12} />
          <Wifi size={12} />
          <Battery size={12} />
          <span>12:00 PM</span>
        </div>
      </div>

      {/* Ugly old desktop */}
      <div className="flex-1 p-4">
        <div className="text-center mt-8 mb-12">
          <h1 className="text-2xl font-bold text-[#0f0] drop-shadow-[0_0_5px_rgba(0,255,0,0.8)]">QwertyOS 3.1</h1>
          <p className="text-xs text-[#888]">Build 3.1.042 (Legacy)</p>
        </div>

        <div className="bg-[#222] border border-[#444] rounded p-4 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
          <h2 className="text-lg text-[#fff] border-b border-[#444] pb-2 mb-4">Настройки системы</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span>Баланс:</span>
              <span className="text-[#0f0]">{balance} руб.</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span>Версия Android:</span>
              <span>4.0.4</span>
            </div>

            <div className="pt-4 border-t border-[#444]">
              {!updateAvailable ? (
                <button 
                  onClick={checkUpdates}
                  disabled={checkingUpdate}
                  className="w-full bg-[#333] hover:bg-[#444] active:bg-[#111] border border-[#555] py-3 text-sm flex justify-center items-center gap-2"
                >
                  {checkingUpdate ? 'Проверка...' : 'Проверить обновления'}
                </button>
              ) : (
                <button 
                  onClick={installUpdate}
                  className="w-full bg-[#000] border border-[#0f0] text-[#0f0] hover:bg-[#0f0] hover:text-[#000] transition-colors py-3 text-sm font-bold flex justify-center items-center gap-2"
                >
                  <CheckCircle size={16} />
                  Установить QwerUI (Latest)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ugly old nav bar */}
      <div className="h-12 bg-[#000] border-t border-[#333] flex justify-around items-center">
        <div className="w-6 h-6 border-2 border-[#555] rounded-full"></div>
        <div className="w-8 h-6 border-2 border-[#555] rounded"></div>
        <div className="w-6 h-6 border-2 border-[#555] rotate-45"></div>
      </div>
    </div>
  );
};