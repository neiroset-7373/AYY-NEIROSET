import React, { useEffect, useState } from 'react';
import { useStore } from './store/useStore-Qwerty';
import Hardware from './components/Hardware-Qwerty';
import OOBE from './components/OOBE-Qwerty';
import OS from './components/OS-Qwerty';
import { LockScreen } from './components/LockScreen-Qwerty';
import { QwertyOS31 } from './components/QwertyOS31-Qwerty';

/* ─── Boot Screen ─── */
const BootScreen: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const { completeBoot } = useStore();

  useEffect(() => {
    const bootLogs = [
      '[  0.000000] Initializing QwerUI kernel v5.1...',
      '[  0.052131] CPU: ARMv9 Cortex-X4 @ 3.3GHz',
      '[  0.110294] RAM: 12288MB LPDDR5X initialized',
      '[  0.301928] Storage: 512GB UFS 4.0 mounted OK',
      '[  0.512048] Display: 6.7" AMOLED 120Hz ready',
      '[  0.892019] Loading QwerUI Shell...',
      '[  1.100384] Sensors & Haptics initialized',
      '[  1.200384] QwerUI v5.0 — System ready.',
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLogs.length) {
        setLogs((prev) => [...prev, bootLogs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => completeBoot(), 800);
      }
    }, 350);

    return () => clearInterval(interval);
  }, [completeBoot]);

  return (
    <div className="absolute inset-0 bg-black flex flex-col justify-between text-white font-mono p-4 z-[9999]">
      <div className="flex-1 flex flex-col justify-end pb-4">
        {logs.map((log, i) => (
          <div key={i} className="text-[9px] text-green-400 opacity-80 mb-[2px] leading-tight">{log}</div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse tracking-tight">
          QwerUI
        </h1>
        <div className="mt-4 flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
      <div className="flex items-end justify-center pb-2">
        <p className="text-[9px] text-zinc-600 uppercase tracking-widest">Powered by Android</p>
      </div>
    </div>
  );
};

/* ─── Erasing Screen ─── */
const ErasingScreen: React.FC = () => (
  <div className="absolute inset-0 bg-black flex flex-col justify-center items-center z-[9999] text-white">
    <div className="w-14 h-14 border-4 border-zinc-800 border-t-white rounded-full animate-spin mb-6" />
    <p className="text-base font-semibold tracking-widest text-zinc-300">Стирание...</p>
    <p className="text-xs text-zinc-600 mt-2">Не выключайте устройство</p>
  </div>
);

/* ─── Main App ─── */
const App: React.FC = () => {
  const {
    isBooted, isSetupComplete, theme, accent,
    isErasing, isLocked, osVersion, pinCode
  } = useStore();

  /* Восстановить обязательные приложения */
  useEffect(() => {
    const requiredApps = [
      'market', 'settings', 'camera', 'phone', 'sms', 'calc',
      'sber', 'ozon', 'ai', 'music', 'gallery', 'browser',
      'notes', 'weather', 'clock', 'files'
    ] as const;
    const currentApps = useStore.getState().installedApps || [];
    const missing = requiredApps.filter(a => !currentApps.includes(a as any));
    if (missing.length > 0) {
      useStore.setState({
        installedApps: Array.from(new Set([...currentApps, ...missing])) as any
      });
    }
  }, []);

  /* Блокировка при старте если есть PIN */
  useEffect(() => {
    if (useStore.getState().pinCode) {
      useStore.setState({ isLocked: true });
    }
  }, []);

  /* Применение темы */
  useEffect(() => {
    document.body.className = `theme-${theme}`;
    const root = document.documentElement;
    const accents: Record<string, [string, string]> = {
      blue:    ['#007AFF', 'rgba(0,122,255,0.4)'],
      purple:  ['#5856D6', 'rgba(88,86,214,0.4)'],
      emerald: ['#34C759', 'rgba(52,199,89,0.4)'],
      orange:  ['#FF9500', 'rgba(255,149,0,0.4)'],
      pink:    ['#FF2D55', 'rgba(255,45,85,0.4)'],
      cyan:    ['#00C7FF', 'rgba(0,199,255,0.4)'],
    };
    const [color, glow] = accents[accent] || accents['blue'];
    root.style.setProperty('--color-accent', color);
    root.style.setProperty('--color-accent-glow', glow);
  }, [theme, accent]);

  /* Фоновые цвета по теме */
  const bgColors: Record<string, string> = {
    dark:    '#050505',
    light:   '#e8e8ee',
    cyber:   '#060010',
    premium: '#0a0a14',
  };
  const bgColor = bgColors[theme] || '#050505';

  /* Цвета свечения по теме */
  const glowColors: Record<string, { c1: string; c2: string }> = {
    dark:    { c1: 'rgba(88,86,214,0.15)',  c2: 'rgba(0,199,255,0.1)' },
    light:   { c1: 'rgba(0,122,255,0.12)',  c2: 'rgba(52,199,89,0.08)' },
    cyber:   { c1: 'rgba(147,51,234,0.25)', c2: 'rgba(0,255,255,0.15)' },
    premium: { c1: 'rgba(255,215,0,0.1)',   c2: 'rgba(192,192,192,0.08)' },
  };
  const glow = glowColors[theme] || glowColors['dark'];

  return (
    <div
      className="flex flex-col w-screen h-screen select-none overflow-hidden"
      style={{ background: bgColor }}
    >
      {/* ── Заголовок окна (только для Electron) ── */}
      <div
        className="h-8 w-full flex items-center justify-between px-3 shrink-0 z-[99999]"
        style={{
          background: theme === 'light' ? '#d0d0d8' : '#111118',
          borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.06)',
          WebkitAppRegion: 'drag',
        } as React.CSSProperties}
      >
        {/* Левая часть — название */}
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] font-semibold tracking-wide"
            style={{ color: theme === 'light' ? '#333' : 'rgba(255,255,255,0.5)' }}
          >
            QwerUI — Эмулятор Qwerty 5 Pro
          </span>
        </div>

        {/* Правая часть — кнопки управления окном */}
        <div
          className="flex items-center gap-0"
          style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
        >
          {/* Свернуть */}
          <button
            className="w-10 h-8 flex items-center justify-center transition-colors group"
            style={{ color: theme === 'light' ? '#555' : 'rgba(255,255,255,0.4)' }}
            onMouseEnter={e => (e.currentTarget.style.background = theme === 'light' ? '#c0c0c8' : 'rgba(255,255,255,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <svg width="10" height="1" viewBox="0 0 10 1" fill="currentColor">
              <rect width="10" height="1" />
            </svg>
          </button>
          {/* Развернуть */}
          <button
            className="w-10 h-8 flex items-center justify-center transition-colors"
            style={{ color: theme === 'light' ? '#555' : 'rgba(255,255,255,0.4)' }}
            onMouseEnter={e => (e.currentTarget.style.background = theme === 'light' ? '#c0c0c8' : 'rgba(255,255,255,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="0.5" y="0.5" width="9" height="9" />
            </svg>
          </button>
          {/* Закрыть */}
          <button
            className="w-10 h-8 flex items-center justify-center transition-colors"
            style={{ color: theme === 'light' ? '#555' : 'rgba(255,255,255,0.4)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#e81123';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = theme === 'light' ? '#555' : 'rgba(255,255,255,0.4)';
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
              <line x1="0" y1="0" x2="10" y2="10" />
              <line x1="10" y1="0" x2="0" y2="10" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Область с телефоном ── */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        {/* Фоновые свечения */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]"
            style={{ background: glow.c1 }}
          />
          <div
            className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px]"
            style={{ background: glow.c2 }}
          />
        </div>

        {/* Телефон — фиксированный размер, НЕ масштабируется */}
        <Hardware>
          {isErasing ? (
            <ErasingScreen />
          ) : !isBooted ? (
            <BootScreen />
          ) : !isSetupComplete ? (
            <OOBE />
          ) : isLocked && pinCode ? (
            <LockScreen />
          ) : osVersion === 'qwerty31' ? (
            <QwertyOS31 />
          ) : (
            <OS />
          )}
        </Hardware>
      </div>
    </div>
  );
};

export default App;
