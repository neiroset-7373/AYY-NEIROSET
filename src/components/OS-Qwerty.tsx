import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, AppId } from '../store/useStore-Qwerty';
import {
  Settings, Phone, MessageSquare, Camera, Calculator,
  ShoppingBag, Landmark, Zap, Music, Wifi, Bluetooth,
  X, Plane, Globe, FileText, Cloud, Clock,
  Square, Circle, ChevronLeft, Sun, Image, Box,
  Battery
} from 'lucide-react';

import SettingsApp from './apps/Settings-Qwerty';
import MarketApp from './apps/Market-Qwerty';
import SberApp from './apps/Sber-Qwerty';
import OzonApp from './apps/Ozon-Qwerty';
import AIApp from './apps/AI-Qwerty';
import MusicApp from './apps/Music-Qwerty';
import CameraApp from './apps/Camera-Qwerty';
import PhoneApp from './apps/Phone-Qwerty';
import SMSApp from './apps/SMS-Qwerty';
import CalcApp from './apps/Calc-Qwerty';
import GalleryApp from './apps/Gallery-Qwerty';
import BrowserApp from './apps/Browser-Qwerty';
import NotesApp from './apps/Notes-Qwerty';
import WeatherApp from './apps/Weather-Qwerty';
import ClockApp from './apps/Clock-Qwerty';
import { LockScreen } from './LockScreen-Qwerty';
import { InstallationOverlay } from './InstallationOverlay-Qwerty';

const appConfig: Record<AppId, { name: string; icon: any; color: string; customIcon?: string; component: React.FC }> = {
  settings: { name: 'Настройки', icon: Settings, color: '#636366', customIcon: 'https://imgfy.ru/ib/dBYeDN7aw6Fw3WP_1773768049.webp', component: SettingsApp },
  phone: { name: 'Телефон', icon: Phone, color: '#34c759', customIcon: 'https://imgfy.ru/ib/jwct25EfWGBNqJR_1773768048.webp', component: PhoneApp },
  sms: { name: 'Сообщения', icon: MessageSquare, color: '#30b0c7', component: SMSApp },
  camera: { name: 'Камера', icon: Camera, color: '#1c1c1e', component: CameraApp },
  calc: { name: 'Калькулятор', icon: Calculator, color: '#ff9500', component: CalcApp },
  market: { name: 'Market', icon: ShoppingBag, color: '#5856d6', component: MarketApp },
  sber: { name: 'Сбер', icon: Landmark, color: '#21a038', component: SberApp },
  ozon: { name: 'Ozon', icon: ShoppingBag, color: '#005bff', component: OzonApp },
  ai: { name: 'Qwerty AI', icon: Zap, color: '#bf5af2', component: AIApp },
  music: { name: 'Музыка', icon: Music, color: '#ff2d55', component: MusicApp },
  notes: { name: 'Заметки', icon: FileText, color: '#ffcc00', component: NotesApp },
  gallery: { name: 'Галерея', icon: Image, color: '#ff6b35', component: GalleryApp },
  browser: { name: 'Браузер', icon: Globe, color: '#007aff', component: BrowserApp },
  weather: { name: 'Погода', icon: Cloud, color: '#64d2ff', component: WeatherApp },
  clock: { name: 'Часы', icon: Clock, color: '#636366', component: ClockApp },
};

const DEFAULT_APPS: AppId[] = ['market', 'sber', 'ozon', 'ai', 'music', 'camera', 'calc', 'notes', 'gallery', 'browser', 'weather', 'clock'];
const DOCK_APPS: AppId[] = ['phone', 'sms', 'camera', 'settings'];

function getThemeStyles(theme: string, accent: string) {
  const accentColors: Record<string, string> = {
    blue: '#007aff', purple: '#bf5af2', emerald: '#30d158', orange: '#ff9500',
  };
  const accentColor = accentColors[accent] || accentColors.blue;

  switch (theme) {
    case 'light':
      return {
        bg: '#f2f2f7', card: '#ffffff', text: '#000000', textSec: '#6e6e73',
        border: 'rgba(0,0,0,0.1)', statusText: '#000000', appBg: '#f2f2f7',
        headerBg: 'rgba(242,242,247,0.95)', navBg: 'rgba(235,235,240,0.92)',
        navText: '#000000', dockBg: 'rgba(210,210,220,0.65)', shadeBg: 'rgba(200,200,215,0.85)',
        iconLabel: '#000000', accentColor, isCyber: false, isLight: true,
      };
    case 'dark':
      return {
        bg: '#000000', card: '#1c1c1e', text: '#ffffff', textSec: '#8e8e93',
        border: 'rgba(255,255,255,0.1)', statusText: '#ffffff', appBg: '#000000',
        headerBg: 'rgba(0,0,0,0.95)', navBg: 'rgba(28,28,30,0.92)',
        navText: '#ffffff', dockBg: 'rgba(28,28,30,0.7)', shadeBg: 'rgba(0,0,0,0.9)',
        iconLabel: 'rgba(255,255,255,0.9)', accentColor, isCyber: false, isLight: false,
      };
    case 'cyber':
    case 'neon':
      return {
        bg: '#040010', card: '#0d0025', text: '#00ffff', textSec: '#c084fc',
        border: 'rgba(0,255,255,0.2)', statusText: '#00ffff', appBg: '#040010',
        headerBg: 'rgba(4,0,16,0.97)', navBg: 'rgba(10,0,30,0.95)',
        navText: '#00ffff', dockBg: 'rgba(0,255,255,0.06)', shadeBg: 'rgba(4,0,20,0.95)',
        iconLabel: '#00ffff', accentColor: '#00ffff', isCyber: true, isLight: false,
      };
    case 'premium':
    case 'glossy':
      return {
        bg: 'linear-gradient(135deg,#f8f0ff,#f0f8ff,#fff0f8)', card: 'rgba(255,255,255,0.92)',
        text: '#1c1c1e', textSec: '#6e6e73', border: 'rgba(0,0,0,0.07)',
        statusText: '#1c1c1e', appBg: '#f5f0ff', headerBg: 'rgba(250,248,255,0.95)',
        navBg: 'rgba(255,255,255,0.72)', navText: '#1c1c1e', dockBg: 'rgba(255,255,255,0.55)',
        shadeBg: 'rgba(240,235,255,0.88)', iconLabel: '#1c1c1e', accentColor, isCyber: false, isLight: true,
      };
    default:
      return {
        bg: '#000000', card: '#1c1c1e', text: '#ffffff', textSec: '#8e8e93',
        border: 'rgba(255,255,255,0.1)', statusText: '#ffffff', appBg: '#000000',
        headerBg: 'rgba(0,0,0,0.95)', navBg: 'rgba(28,28,30,0.92)',
        navText: '#ffffff', dockBg: 'rgba(28,28,30,0.7)', shadeBg: 'rgba(0,0,0,0.9)',
        iconLabel: 'rgba(255,255,255,0.9)', accentColor, isCyber: false, isLight: false,
      };
  }
}

// =================== LEGACY OS 3.1 ===================
const LegacyOS31: React.FC = () => {
  const { setOsVersion, balance, setInstalling } = useStore();
  const [screen, setScreen] = useState<'home' | 'settings' | 'phone' | 'sms'>('home');
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [updateReady, setUpdateReady] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [dialInput, setDialInput] = useState('');

  useEffect(() => {
    const tick = () => setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const checkUpdates = () => {
    setCheckingUpdate(true);
    setTimeout(() => { setCheckingUpdate(false); setUpdateReady(true); }, 3000);
  };

  const installQwerUI = () => {
    setInstalling(true);
    setTimeout(() => { setOsVersion('qwerui'); setInstalling(false); }, 16000);
  };

  const legacyApps = [
    { id: 'settings', label: 'Настройки', icon: '⚙️', action: () => setScreen('settings') },
    { id: 'phone', label: 'Звонки', icon: '📞', action: () => setScreen('phone') },
    { id: 'sms', label: 'СМС', icon: '✉️', action: () => setScreen('sms') },
    { id: 'calc', label: 'Калькул.', icon: '🔢', action: () => {} },
    { id: 'clock', label: 'Часы', icon: '🕐', action: () => {} },
    { id: 'gallery', label: 'Фото', icon: '🖼️', action: () => {} },
  ];

  return (
    <div className="w-full h-full flex flex-col select-none" style={{ background: '#111', color: '#0f0', fontFamily: 'monospace' }}>
      {/* Status bar */}
      <div style={{ background: '#000', borderBottom: '2px solid #0f0', height: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', fontSize: 11 }}>
        <span style={{ color: '#0f0' }}>QWERTY 3G ▪ {currentTime}</span>
        <div style={{ display: 'flex', gap: 8, color: '#0f0' }}>
          <span>▐▌▌▌</span><span>🔋12%</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {screen === 'home' && (
          <>
            <div style={{ textAlign: 'center', padding: '16px 0 8px', borderBottom: '2px solid #0f0' }}>
              <div style={{ fontSize: 18, fontWeight: 'bold', color: '#0f0', textShadow: '0 0 10px #0f0' }}>QwertyOS 3.1</div>
              <div style={{ fontSize: 9, color: '#444' }}>Build 3.1.042 (Legacy) © 2012</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, padding: 6, flex: 1 }}>
              {legacyApps.map(app => (
                <button key={app.id} onClick={app.action}
                  style={{ background: '#1a1a1a', border: '1px solid #0a0', color: '#0f0', padding: '14px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', fontSize: 10, borderRadius: 2 }}>
                  <span style={{ fontSize: 22 }}>{app.icon}</span>
                  <span>{app.label}</span>
                </button>
              ))}
            </div>
            <div style={{ margin: '0 6px 6px', background: '#0a0a0a', border: '1px solid #0a0', borderRadius: 2, padding: '6px 10px' }}>
              <div style={{ fontSize: 9, color: '#444' }}>Баланс Сбер:</div>
              <div style={{ fontSize: 16, color: '#0f0', fontWeight: 'bold' }}>{balance.toLocaleString()} ₽</div>
            </div>
          </>
        )}

        {screen === 'settings' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid #0a0' }}>
              <button onClick={() => setScreen('home')} style={{ background: '#111', border: '1px solid #0a0', color: '#0f0', padding: '3px 8px', cursor: 'pointer', fontSize: 10 }}>← Назад</button>
              <span style={{ color: '#0f0', fontWeight: 'bold', fontSize: 12 }}>Настройки системы</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[['Версия ОС','QwertyOS 3.1.042'],['Устройство','Qwerty 5 Pro'],['Android','4.0.4 ICS'],['ПЗУ','64 ГБ'],['ОЗУ','2 ГБ'],['Процессор','Snapdragon 400']].map(([k,v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', background: '#1a1a1a', border: '1px solid #222', padding: '6px 10px', fontSize: 10 }}>
                  <span style={{ color: '#666' }}>{k}</span>
                  <span style={{ color: '#0f0' }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, borderTop: '1px solid #0a0', paddingTop: 10 }}>
                <div style={{ color: '#666', fontSize: 9, marginBottom: 6 }}>ОБНОВЛЕНИЕ СИСТЕМЫ</div>
                {!updateReady ? (
                  <button onClick={checkUpdates} disabled={checkingUpdate}
                    style={{ width: '100%', background: checkingUpdate ? '#0a0a0a' : '#1a1a1a', border: '1px solid #0a0', color: checkingUpdate ? '#444' : '#0f0', padding: '8px', cursor: 'pointer', fontSize: 11, borderRadius: 2 }}>
                    {checkingUpdate ? '⏳ Проверка...' : '🔄 Проверить обновления'}
                  </button>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ background: '#001200', border: '1px solid #0f0', padding: 8, fontSize: 10, color: '#0f0' }}>
                      ✅ Найдено: <b>QwerUI 1.0</b><br />
                      <span style={{ color: '#666', fontSize: 9 }}>Размер: 453 МБ</span>
                    </div>
                    <button onClick={installQwerUI}
                      style={{ width: '100%', background: '#002200', border: '2px solid #0f0', color: '#0f0', padding: '10px', cursor: 'pointer', fontSize: 12, fontWeight: 'bold', borderRadius: 2 }}>
                      ⬆️ Установить QwerUI
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {screen === 'phone' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid #0a0' }}>
              <button onClick={() => setScreen('home')} style={{ background: '#111', border: '1px solid #0a0', color: '#0f0', padding: '3px 8px', cursor: 'pointer', fontSize: 10 }}>← Назад</button>
              <span style={{ color: '#0f0', fontWeight: 'bold', fontSize: 12 }}>📞 Звонки</span>
            </div>
            <div style={{ background: '#0a0a0a', border: '1px solid #0a0', padding: '8px 12px', marginBottom: 10, fontSize: 18, color: '#0f0', minHeight: 40 }}>{dialInput || '_'}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3 }}>
              {['1','2','3','4','5','6','7','8','9','*','0','#'].map(k => (
                <button key={k} onClick={() => setDialInput(p => p + k)}
                  style={{ background: '#1a1a1a', border: '1px solid #0a0', color: '#0f0', padding: '12px', fontSize: 16, cursor: 'pointer', borderRadius: 2 }}>{k}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
              <button onClick={() => setDialInput('')} style={{ flex: 1, background: '#1a0000', border: '1px solid #f00', color: '#f00', padding: '10px', cursor: 'pointer', fontSize: 11, borderRadius: 2 }}>✖ Сброс</button>
              <button style={{ flex: 1, background: '#001a00', border: '1px solid #0f0', color: '#0f0', padding: '10px', cursor: 'pointer', fontSize: 11, borderRadius: 2 }}>📞 Звонок</button>
            </div>
          </div>
        )}

        {screen === 'sms' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid #0a0' }}>
              <button onClick={() => setScreen('home')} style={{ background: '#111', border: '1px solid #0a0', color: '#0f0', padding: '3px 8px', cursor: 'pointer', fontSize: 10 }}>← Назад</button>
              <span style={{ color: '#0f0', fontWeight: 'bold', fontSize: 12 }}>✉️ СМС</span>
            </div>
            {[{from:'Система',msg:'Добро пожаловать в QwertyOS 3.1!'},{from:'Spidi',msg:'Держись, не обновляйся на QwerUI... или всё же обновись 😄'},{from:'Ozon',msg:'Ваш заказ доставлен.'}].map((m,i) => (
              <div key={i} style={{ background: '#1a1a1a', border: '1px solid #222', padding: '8px 10px', marginBottom: 4, borderRadius: 2 }}>
                <div style={{ color: '#0f0', fontSize: 11, fontWeight: 'bold' }}>{m.from}</div>
                <div style={{ color: '#888', fontSize: 10, marginTop: 2 }}>{m.msg}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Legacy Navigation */}
      <div style={{ background: '#000', borderTop: '2px solid #0f0', height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <button onClick={() => setScreen('home')} style={{ color: '#0f0', background: 'none', border: '1px solid #0a0', padding: '4px 12px', cursor: 'pointer', fontSize: 10, borderRadius: 2 }}>◁ НАЗАД</button>
        <button onClick={() => setScreen('home')} style={{ color: '#0f0', background: 'none', border: '1px solid #0a0', padding: '4px 12px', cursor: 'pointer', fontSize: 10, borderRadius: 2 }}>○ ДОМОЙ</button>
        <button style={{ color: '#0f0', background: 'none', border: '1px solid #0a0', padding: '4px 12px', cursor: 'pointer', fontSize: 10, borderRadius: 2 }}>□ МЕНЮ</button>
      </div>
    </div>
  );
};

// =================== NOTIFICATION TOAST ===================
const NotificationToast: React.FC<{ ts: ReturnType<typeof getThemeStyles> }> = ({ ts }) => {
  const { notifications, removeNotification, setInstalling, setOsVersion } = useStore();
  const notif = notifications[0];

  const handleAction = () => {
    removeNotification(notif.id);
    setInstalling(true);
    setTimeout(() => {
      setOsVersion('qwerty31');
      setInstalling(false);
    }, 16000);
  };

  if (!notif) return null;
  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -80, opacity: 0 }}
      className="absolute top-10 left-3 right-3 z-[9000] rounded-2xl p-3 shadow-2xl"
      style={{ background: ts.card, border: `1px solid ${ts.border}`, backdropFilter: 'blur(24px)' }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="text-xs font-bold" style={{ color: ts.text }}>{notif.title}</div>
          <div className="text-xs mt-0.5" style={{ color: ts.textSec }}>{notif.body}</div>
          {notif.type === 'update' && (
            <button onClick={handleAction}
              className="mt-2 px-3 py-1 rounded-lg text-xs font-bold text-white"
              style={{ background: ts.accentColor }}>
              Установить
            </button>
          )}
        </div>
        <button onClick={() => removeNotification(notif.id)}
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: ts.isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)' }}>
          <X size={12} style={{ color: ts.text }} />
        </button>
      </div>
    </motion.div>
  );
};

// =================== MAIN OS ===================
const OS: React.FC = () => {
  const {
    theme, accent, navigation, wallpaper, wifi, bluetooth, airplaneMode,
    brightness, volume, isFlashlightOn, isNightShiftOn,
    openApp, setOpenApp, installedApps, recentApps, addRecentApp, removeRecentApp,
    toggleWifi, toggleBluetooth, setBrightness, setVolume, toggleAirplaneMode,
    toggleNightShift, batteryLevel,
    showHints, setShowHints, notifications,
    osVersion, pinCode, isLocked,
  } = useStore();

  const [shadeOpen, setShadeOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const shadeStartY = useRef<number>(0);

  const ts = getThemeStyles(theme, accent);
  const { isCyber, isLight } = ts;

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' }));
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const handleOpenApp = useCallback((id: AppId) => {
    setOpenApp(id);
    addRecentApp(id);
    setShadeOpen(false);
    setTaskOpen(false);
  }, [setOpenApp, addRecentApp]);

  const handleHome = useCallback(() => {
    setOpenApp(null);
    setShadeOpen(false);
    setTaskOpen(false);
  }, [setOpenApp]);

  const handleBack = useCallback(() => {
    if (openApp) setOpenApp(null);
  }, [openApp, setOpenApp]);

  const allApps: AppId[] = [...new Set([...DEFAULT_APPS, ...installedApps])].filter(id => !DOCK_APPS.includes(id));

  // Lock screen
  if (isLocked && pinCode) {
    return <LockScreen />;
  }

  // Legacy OS 3.1
  if (osVersion === 'qwerty31') {
    return (
      <div className="w-full h-full flex flex-col">
        <InstallationOverlay />
        <LegacyOS31 />
      </div>
    );
  }

  const wallpapers: Record<string, string> = {
    default: 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)',
    sunset: 'linear-gradient(135deg,#f093fb,#f5576c,#fda085)',
    ocean: 'linear-gradient(135deg,#667eea,#764ba2,#6B8DD6)',
    forest: 'linear-gradient(135deg,#134e5e,#71b280,#1a472a)',
    cyber: 'linear-gradient(135deg,#0a0028,#1a0040,#000814)',
    aurora: 'linear-gradient(135deg,#00c9ff,#92fe9d,#00c9ff)',
    midnight: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)',
    rose: 'linear-gradient(135deg,#f8cdda,#1d2671,#c33764)',
  };
  const bgStyle = wallpaper && wallpapers[wallpaper] ? wallpapers[wallpaper] : (ts.bg.includes('gradient') ? ts.bg : undefined);
  const bgColor = !bgStyle && !ts.bg.includes('gradient') ? ts.bg : undefined;

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative select-none"
      style={{ background: bgStyle || bgColor || ts.bg }}>
      <InstallationOverlay />

      {/* Night shift overlay */}
      {isNightShiftOn && (
        <div className="absolute inset-0 z-[99] pointer-events-none" style={{ background: 'rgba(255,140,0,0.12)', mixBlendMode: 'multiply' }} />
      )}

      {/* ========== STATUS BAR ========== */}
      <div className="relative z-[60] flex items-center justify-between px-5 h-10 shrink-0"
        style={{ background: 'transparent' }}
        onTouchStart={e => { shadeStartY.current = e.touches[0].clientY; }}
        onTouchMove={e => { if (e.touches[0].clientY - shadeStartY.current > 50) setShadeOpen(true); }}
        onMouseDown={e => { shadeStartY.current = e.clientY; }}
      >
        <span className="text-sm font-bold" style={{ color: ts.statusText }}>{currentTime}</span>
        <div className="flex items-center gap-2">
          {airplaneMode && <Plane size={12} style={{ color: ts.statusText }} />}
          {isFlashlightOn && <span style={{ color: '#FFD60A', fontSize: 10 }}>🔦</span>}
          {!airplaneMode && <Wifi size={13} style={{ color: wifi ? ts.statusText : ts.textSec, opacity: wifi ? 1 : 0.4 }} />}
          {!airplaneMode && <Bluetooth size={12} style={{ color: bluetooth ? ts.accentColor : ts.textSec, opacity: bluetooth ? 1 : 0.4 }} />}
          <Battery size={14} style={{ color: ts.statusText }} />
          <span className="text-xs font-medium" style={{ color: ts.statusText }}>{batteryLevel}%</span>
        </div>
      </div>

      {/* ========== NOTIFICATION SHADE ========== */}
      <AnimatePresence>
        {shadeOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-[200]" style={{ background: 'rgba(0,0,0,0.4)' }}
              onClick={() => setShadeOpen(false)} />
            <motion.div
              initial={{ y: -600 }} animate={{ y: 0 }} exit={{ y: -600 }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className="absolute top-0 left-0 right-0 z-[201] rounded-b-3xl overflow-hidden"
              style={{ background: ts.shadeBg, backdropFilter: 'blur(32px)', border: `1px solid ${ts.border}`, borderTop: 'none' }}
            >
              {/* Time in shade */}
              <div className="px-5 pt-10 pb-3">
                <div className="text-4xl font-bold" style={{ color: ts.text }}>{currentTime}</div>
                <div className="text-sm mt-0.5 capitalize" style={{ color: ts.textSec }}>{currentDate}</div>
              </div>

              {/* Quick toggles */}
              <div className="px-4 pb-3 grid grid-cols-4 gap-2">
                {[
                  { icon: Wifi, label: 'Wi-Fi', active: wifi && !airplaneMode, action: toggleWifi },
                  { icon: Bluetooth, label: 'Bluetooth', active: bluetooth, action: toggleBluetooth },
                  { icon: Plane, label: 'Самолёт', active: airplaneMode, action: toggleAirplaneMode },
                  { icon: Sun, label: 'Ночной', active: isNightShiftOn, action: toggleNightShift },
                ].map(({ icon: Icon, label, active, action }) => (
                  <button key={label} onClick={action}
                    className="flex flex-col items-center gap-1.5 py-3 rounded-2xl transition-all"
                    style={{ background: active ? ts.accentColor : (isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)'), border: `1px solid ${active ? ts.accentColor : ts.border}` }}>
                    <Icon size={18} style={{ color: active ? '#fff' : ts.text }} />
                    <span className="text-[9px] font-medium" style={{ color: active ? '#fff' : ts.textSec }}>{label}</span>
                  </button>
                ))}
              </div>

              {/* Brightness */}
              <div className="px-5 pb-2">
                <div className="text-xs mb-1.5 font-medium" style={{ color: ts.textSec }}>Яркость</div>
                <input type="range" min={10} max={100} value={brightness} onChange={e => setBrightness(+e.target.value)}
                  className="w-full h-1.5 rounded-full outline-none cursor-pointer" style={{ accentColor: ts.accentColor }} />
              </div>
              {/* Volume */}
              <div className="px-5 pb-4">
                <div className="text-xs mb-1.5 font-medium" style={{ color: ts.textSec }}>Громкость</div>
                <input type="range" min={0} max={100} value={volume} onChange={e => setVolume(+e.target.value)}
                  className="w-full h-1.5 rounded-full outline-none cursor-pointer" style={{ accentColor: ts.accentColor }} />
              </div>

              <div className="flex justify-center pb-4">
                <button onClick={() => setShadeOpen(false)}
                  className="w-10 h-1 rounded-full" style={{ background: ts.border }} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ========== NOTIFICATION TOASTS ========== */}
      <AnimatePresence>
        {notifications.length > 0 && !shadeOpen && (
          <NotificationToast ts={ts} />
        )}
      </AnimatePresence>

      {/* ========== DESKTOP ========== */}
      <div className="flex-1 relative overflow-hidden">
        {/* Desktop Icons */}
        <div className="absolute inset-0 p-3 pt-2 pb-2 grid overflow-y-auto"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, alignContent: 'start', paddingBottom: 100 }}>
          {allApps.map((id, i) => (
            <motion.div key={id}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25, delay: i * 0.03 }}>
              <AppIcon id={id} ts={ts} theme={theme} onOpen={handleOpenApp} />
            </motion.div>
          ))}
        </div>

        {/* DOCK */}
        <div className="absolute bottom-14 left-3 right-3 h-[72px] rounded-[26px] flex items-center justify-around px-2 z-40"
          style={{ background: ts.dockBg, backdropFilter: 'blur(28px)', border: `1px solid ${ts.border}`, boxShadow: isCyber ? '0 0 24px rgba(0,255,255,0.12)' : '0 8px 32px rgba(0,0,0,0.25)' }}>
          {DOCK_APPS.map(id => (
            <AppIcon key={id} id={id} ts={ts} theme={theme} onOpen={handleOpenApp} inDock />
          ))}
        </div>

        {/* ========== NAVIGATION BAR (ALWAYS VISIBLE) ========== */}
        <div className="absolute bottom-0 left-0 right-0 h-14 flex items-center justify-center z-[999]"
          style={{ background: 'transparent' }}>
          {navigation === 'gestures' ? (
            <motion.div
              whileTap={{ scaleX: 0.7, opacity: 0.5 }}
              onClick={handleHome}
              className="w-28 h-[5px] rounded-full cursor-pointer"
              style={{ background: isLight ? 'rgba(0,0,0,0.3)' : isCyber ? 'rgba(0,255,255,0.6)' : 'rgba(255,255,255,0.45)' }}
            />
          ) : (
            <div className="flex items-center justify-between gap-2 px-4 py-2 rounded-full"
              style={{ background: ts.navBg, backdropFilter: 'blur(24px)', border: `1px solid ${ts.border}`, boxShadow: isCyber ? '0 0 16px rgba(0,255,255,0.2)' : '0 4px 16px rgba(0,0,0,0.2)' }}>
              <motion.button whileTap={{ scale: 0.8 }} onClick={() => setTaskOpen(true)}
                className="w-11 h-11 flex items-center justify-center rounded-full"
                style={{ background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}>
                <Square size={17} style={{ color: ts.navText }} />
              </motion.button>
              <motion.button whileTap={{ scale: 0.8 }} onClick={handleHome}
                className="w-11 h-11 flex items-center justify-center rounded-full"
                style={{ background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}>
                <Circle size={20} style={{ color: ts.navText }} />
              </motion.button>
              <motion.button whileTap={{ scale: 0.8 }} onClick={handleBack}
                className="w-11 h-11 flex items-center justify-center rounded-full"
                style={{ background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}>
                <ChevronLeft size={22} style={{ color: ts.navText }} />
              </motion.button>
            </div>
          )}
        </div>

        {/* ========== APP WINDOW (навигация поверх) ========== */}
        <AnimatePresence>
          {openApp && (
            <motion.div
              key={openApp}
              initial={{ scale: 0.88, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="absolute inset-0 flex flex-col overflow-hidden"
              style={{ background: ts.appBg, zIndex: 100 }}
            >
              {/* App Header */}
              <div className="h-12 flex items-center justify-between px-4 shrink-0"
                style={{ background: ts.headerBg, backdropFilter: 'blur(24px)', borderBottom: `1px solid ${ts.border}` }}>
                <div className="flex items-center gap-2">
                  {appConfig[openApp]?.customIcon ? (
                    <img src={appConfig[openApp].customIcon} className="w-7 h-7 rounded-xl" alt="" />
                  ) : (
                    <div className="w-7 h-7 rounded-xl flex items-center justify-center shadow"
                      style={{ background: appConfig[openApp]?.color }}>
                      {appConfig[openApp] && React.createElement(appConfig[openApp].icon, { size: 15, color: 'white' })}
                    </div>
                  )}
                  <span className="text-sm font-semibold" style={{ color: ts.text }}>
                    {appConfig[openApp]?.name}
                  </span>
                </div>
                <motion.button whileTap={{ scale: 0.85 }} onClick={handleHome}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: isLight ? 'rgba(0,0,0,0.08)' : isCyber ? 'rgba(0,255,255,0.1)' : 'rgba(255,255,255,0.1)', border: isCyber ? '1px solid rgba(0,255,255,0.2)' : 'none' }}>
                  <X size={16} style={{ color: isCyber ? '#00ffff' : ts.text }} />
                </motion.button>
              </div>

              {/* App Content - leaves space for nav bar */}
              <div className="overflow-hidden relative" style={{ flex: 1, background: ts.appBg, paddingBottom: 56 }}>
                {appConfig[openApp] && React.createElement(appConfig[openApp].component)}
              </div>

              {/* NAV BAR INSIDE APP WINDOW — always visible */}
              <div className="absolute bottom-0 left-0 right-0 h-14 flex items-center justify-center"
                style={{ zIndex: 200, background: 'transparent' }}>
                {navigation === 'gestures' ? (
                  <motion.div
                    whileTap={{ scaleX: 0.7, opacity: 0.5 }}
                    onClick={handleHome}
                    className="w-28 h-[5px] rounded-full cursor-pointer"
                    style={{ background: isLight ? 'rgba(0,0,0,0.3)' : isCyber ? 'rgba(0,255,255,0.6)' : 'rgba(255,255,255,0.45)' }}
                  />
                ) : (
                  <div className="flex items-center justify-between gap-2 px-4 py-2 rounded-full"
                    style={{ background: ts.navBg, backdropFilter: 'blur(24px)', border: `1px solid ${ts.border}`, boxShadow: isCyber ? '0 0 16px rgba(0,255,255,0.2)' : '0 4px 16px rgba(0,0,0,0.2)' }}>
                    <motion.button whileTap={{ scale: 0.8 }} onClick={() => setTaskOpen(true)}
                      className="w-11 h-11 flex items-center justify-center rounded-full"
                      style={{ background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}>
                      <Square size={17} style={{ color: ts.navText }} />
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.8 }} onClick={handleHome}
                      className="w-11 h-11 flex items-center justify-center rounded-full"
                      style={{ background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}>
                      <Circle size={20} style={{ color: ts.navText }} />
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.8 }} onClick={handleBack}
                      className="w-11 h-11 flex items-center justify-center rounded-full"
                      style={{ background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}>
                      <ChevronLeft size={22} style={{ color: ts.navText }} />
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Task Switcher */}
        <AnimatePresence>
          {taskOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 z-[500] flex flex-col items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(28px)' }}
              onClick={() => setTaskOpen(false)}>
              <div className="w-full px-4" onClick={e => e.stopPropagation()}>
                <div className="text-center mb-4">
                  <span className="text-white/60 text-sm font-medium">Недавние приложения</span>
                </div>
                {recentApps.length === 0 ? (
                  <div className="text-center text-white/40 py-12">
                    <Box size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Нет открытых приложений</p>
                  </div>
                ) : (
                  <div className="flex gap-3 pb-4 overflow-x-auto">
                    {recentApps.map(id => {
                      const cfg = appConfig[id];
                      if (!cfg) return null;
                      return (
                        <motion.div key={id}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => { setOpenApp(id); setTaskOpen(false); }}
                          className="shrink-0 w-36 h-64 rounded-3xl overflow-hidden relative cursor-pointer"
                          style={{ background: cfg.color, border: '2px solid rgba(255,255,255,0.15)' }}>
                          <div className="absolute top-0 left-0 right-0 p-2 bg-black/50 flex justify-between items-center">
                            <span className="text-white text-[10px] font-bold">{cfg.name}</span>
                            <button onClick={e => { e.stopPropagation(); removeRecentApp(id); }}
                              className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                              <X size={10} className="text-white" />
                            </button>
                          </div>
                          <div className="w-full h-full flex items-center justify-center">
                            <cfg.icon size={44} color="rgba(255,255,255,0.2)" />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
                <div className="text-center mt-2">
                  <button onClick={() => { useStore.setState({ recentApps: [] }); setTaskOpen(false); }}
                    className="text-white/50 text-xs py-2 px-5 border border-white/15 rounded-full">
                    Очистить всё
                  </button>
                </div>
              </div>

              {/* Nav in task switcher */}
              <div className="absolute bottom-0 left-0 right-0 h-14 flex items-center justify-center z-[600]">
                {navigation === 'gestures' ? (
                  <motion.div whileTap={{ scaleX: 0.7 }} onClick={() => setTaskOpen(false)}
                    className="w-28 h-[5px] rounded-full cursor-pointer bg-white/40" />
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <motion.button whileTap={{ scale: 0.8 }} onClick={() => setTaskOpen(false)}
                      className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10">
                      <Square size={17} color="white" />
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.8 }} onClick={handleHome}
                      className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10">
                      <Circle size={20} color="white" />
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.8 }} onClick={() => setTaskOpen(false)}
                      className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10">
                      <ChevronLeft size={22} color="white" />
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hints */}
      <AnimatePresence>
        {showHints && !openApp && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-[5000] flex items-center justify-center p-8"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}>
            <div className="bg-white/10 border border-white/20 p-6 rounded-3xl text-center space-y-3 max-w-xs shadow-2xl">
              <div className="text-3xl">👋</div>
              <h2 className="text-xl font-bold text-white">Добро пожаловать в QwerUI!</h2>
              <div className="text-sm text-white/70 space-y-2 text-left">
                <p>☝️ <b className="text-white">Свайп сверху вниз</b> — открыть шторку</p>
                <p>○ <b className="text-white">Кнопка «Домой»</b> — на рабочий стол</p>
                <p>□ <b className="text-white">Кнопка «Квадрат»</b> — недавние приложения</p>
                <p>◁ <b className="text-white">Кнопка «Назад»</b> — закрыть приложение</p>
                <p>📱 <b className="text-white">Нажми на иконку</b> — запустить приложение</p>
              </div>
              <button onClick={() => setShowHints(false)}
                className="w-full py-3 font-bold rounded-2xl text-white"
                style={{ background: ts.accentColor }}>
                Понятно! 🚀
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// =================== APP ICON ===================
function AppIcon({ id, ts, onOpen, inDock = false }: {
  id: AppId; ts: ReturnType<typeof getThemeStyles>; theme?: string; onOpen: (id: AppId) => void; inDock?: boolean;
}) {
  const cfg = appConfig[id];
  if (!cfg) return null;
  const { isCyber, isLight } = ts;
  const iconSize = inDock ? 50 : 54;

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={() => onOpen(id)}
      className="flex flex-col items-center gap-1 w-full"
    >
      {cfg.customIcon ? (
        <img src={cfg.customIcon} alt={cfg.name} className="rounded-[18px] shadow-lg pointer-events-none"
          style={{ width: iconSize, height: iconSize, objectFit: 'cover' }} draggable={false} />
      ) : (
        <div className="rounded-[18px] flex items-center justify-center shadow-lg"
          style={{
            width: iconSize, height: iconSize,
            background: isCyber
              ? `linear-gradient(135deg,${cfg.color}cc,rgba(0,255,255,0.1))`
              : isLight
              ? `linear-gradient(145deg,${cfg.color}ff,${cfg.color}bb)`
              : cfg.color,
            border: isCyber ? '1px solid rgba(0,255,255,0.35)' : 'none',
            boxShadow: isCyber ? `0 0 14px ${cfg.color}44` : '0 4px 14px rgba(0,0,0,0.35)',
          }}>
          {React.createElement(cfg.icon, { size: inDock ? 24 : 26, color: 'white' })}
        </div>
      )}
      {!inDock && (
        <span className="text-[10px] font-medium text-center leading-tight px-0.5 w-full"
          style={{ color: ts.iconLabel, textShadow: isLight ? 'none' : '0 1px 4px rgba(0,0,0,0.85)', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any }}>
          {cfg.name}
        </span>
      )}
    </motion.button>
  );
}

export default OS;
