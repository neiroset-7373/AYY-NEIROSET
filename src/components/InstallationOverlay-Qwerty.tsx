import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Download } from 'lucide-react';
import { useStore } from '../store/useStore-Qwerty';

export const InstallationOverlay: React.FC = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const { isInstalling, setOsVersion, setInstalling, osVersion } = useStore();

  useEffect(() => {
    if (!isInstalling) { setStep(0); setProgress(0); return; }

    const t1 = setTimeout(() => setStep(1), 3000);
    const t2 = setInterval(() => {
      setProgress(p => p >= 100 ? 100 : p + (100 / 130));
    }, 100);
    const t3 = setTimeout(() => {
      const nextVersion = osVersion === 'qwerui' ? 'qwerty31' : 'qwerui';
      setOsVersion(nextVersion);
      setInstalling(false);
      setStep(0);
      setProgress(0);
    }, 16000);

    return () => { clearTimeout(t1); clearInterval(t2); clearTimeout(t3); };
  }, [isInstalling]);

  const targetVersion = osVersion === 'qwerui' ? 'qwerty31' : 'qwerui';

  return (
    <AnimatePresence>
      {isInstalling && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[20000] bg-black flex flex-col items-center justify-center p-8 text-white font-mono"
        >
          <div className="w-full max-w-xs space-y-10">
            <div className="flex flex-col items-center gap-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="w-16 h-16 border-2 border-white/20 border-t-white rounded-full flex items-center justify-center"
              >
                {step === 0 ? <Server size={24} /> : <Download size={24} />}
              </motion.div>
              <div className="text-center">
                <h2 className="text-lg font-bold mb-1">
                  {step === 0 ? 'Подключение к серверу...' : targetVersion === 'qwerty31' ? 'Установка старой версии...' : 'Установка QwerUI...'}
                </h2>
                <p className="text-xs text-white/40 uppercase tracking-widest">
                  {targetVersion === 'qwerty31' ? 'Legacy Version 3.1' : 'QwerUI Latest'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: targetVersion === 'qwerty31' ? '#0f0' : '#007aff' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-white/30">
                <span>{step === 0 ? 'CONNECTING...' : 'WRITING_FLASH'}</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>

            <div className="text-[9px] space-y-1 opacity-20">
              <p>CRC32: OK</p>
              <p>TARGET: {targetVersion.toUpperCase()}</p>
              <p>DEVICE: QWERTY_5_PRO</p>
              <p>STATUS: {step === 0 ? 'HANDSHAKE' : 'INSTALLING'}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
