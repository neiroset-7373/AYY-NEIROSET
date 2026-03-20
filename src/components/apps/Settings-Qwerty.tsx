import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, Theme } from '../../store/useStore-Qwerty';
import {
  Palette, Moon, Sun, Monitor, Power,
  Wifi, Bluetooth, Plane, ChevronRight, Info, ChevronLeft, Image as ImageIcon, Sparkles,
  Volume2, HardDrive, Shield, Globe, Navigation, Zap, RefreshCw
} from 'lucide-react';

type ViewState = 'main' | 'network' | 'display' | 'system' | 'about' | 'security' | 'sound' | 'storage';

const WALLPAPERS = [
  'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=400',
  'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=400',
  'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=400',
  'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=400',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=400',
  'https://images.unsplash.com/photo-1518818608552-195ed130cdf4?q=80&w=400',
];

const SettingsApp: React.FC = () => {
  const {
    theme, setTheme, accent, setAccent, setErasing,
    navigation, setNavigation, language, setLanguage,
    airplaneMode, toggleAirplaneMode, wifi, toggleWifi, bluetooth, toggleBluetooth,
    pinCode, setPinCode, wallpaper, setWallpaper, volume, setVolume, setBrightness, brightness
  } = useStore();

  const [currentView, setCurrentView] = useState<ViewState>('main');
  const [newPin, setNewPin] = useState('');
  const [pinStep, setPinStep] = useState<'enter' | 'confirm'>('enter');
  const [pinConfirm, setPinConfirm] = useState('');

  // Theme styles
  const isLight = theme === 'light' || theme === 'glossy' || theme === 'premium';
  const isCyber = theme === 'cyber';

  const styles = {
    bg: isLight ? '#f2f2f7' : isCyber ? '#0a0014' : '#000000',
    card: isLight ? '#ffffff' : isCyber ? '#1a0030' : '#1c1c1e',
    text: isLight ? '#000000' : isCyber ? '#00ffff' : '#ffffff',
    textSec: isLight ? '#6e6e73' : isCyber ? '#a78bfa' : '#8e8e93',
    border: isLight ? 'rgba(0,0,0,0.08)' : isCyber ? 'rgba(0,255,255,0.15)' : 'rgba(255,255,255,0.08)',
    accent: accent === 'blue' ? '#007aff' : accent === 'purple' ? '#bf5af2' : accent === 'emerald' ? '#30d158' : '#ff9500',
  };

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div
      onClick={e => { e.stopPropagation(); onChange(); }}
      className="relative cursor-pointer transition-all"
      style={{
        width: 50, height: 28,
        borderRadius: 14,
        background: checked ? styles.accent : (isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)'),
      }}
    >
      <div
        className="absolute top-1 transition-all"
        style={{
          width: 20, height: 20,
          borderRadius: 10,
          background: '#ffffff',
          left: checked ? 26 : 4,
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      />
    </div>
  );

  const Row = ({ icon: Icon, iconColor, title, subtitle, value, onClick, danger, toggle, noArrow }: any) => (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 transition-opacity active:opacity-60"
      style={{ color: danger ? '#ff3b30' : styles.text }}
    >
      {Icon && (
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: danger ? 'rgba(255,59,48,0.12)' : (iconColor || styles.accent + '22') }}>
          <Icon size={18} style={{ color: danger ? '#ff3b30' : (iconColor ? '#fff' : styles.accent) }} />
        </div>
      )}
      <div className="flex-1 text-left">
        <p className="text-[15px] font-medium" style={{ color: danger ? '#ff3b30' : styles.text }}>{title}</p>
        {subtitle && <p className="text-[12px]" style={{ color: styles.textSec }}>{subtitle}</p>}
      </div>
      {toggle !== undefined && <Toggle checked={toggle} onChange={onClick} />}
      {value && <span className="text-[14px]" style={{ color: styles.textSec }}>{value}</span>}
      {!noArrow && !toggle && <ChevronRight size={16} style={{ color: styles.textSec }} />}
    </button>
  );

  const Divider = () => <div style={{ height: 1, background: styles.border, marginLeft: 52 }} />;

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-2xl overflow-hidden" style={{ background: styles.card, border: `1px solid ${styles.border}` }}>
      {children}
    </div>
  );

  const SectionTitle = ({ text }: { text: string }) => (
    <p className="text-[13px] font-semibold uppercase px-2 pb-1 pt-4" style={{ color: styles.textSec }}>{text}</p>
  );

  const BackHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-2 pb-4">
      <button onClick={() => setCurrentView('main')} className="p-2 rounded-full active:scale-90" style={{ background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)' }}>
        <ChevronLeft size={20} style={{ color: styles.text }} />
      </button>
      <h1 className="text-2xl font-bold" style={{ color: styles.text }}>{title}</h1>
    </div>
  );

  const MainView = () => (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-2 pb-16">
      <h1 className="text-3xl font-bold pb-4" style={{ color: styles.text }}>
        {language === 'RU' ? 'Настройки' : 'Settings'}
      </h1>

      {/* Profile Card */}
      <div className="rounded-2xl p-4 flex items-center gap-4 mb-4" style={{ background: styles.card, border: `1px solid ${styles.border}` }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ background: styles.accent }}>Q</div>
        <div>
          <p className="font-bold text-lg" style={{ color: styles.text }}>Qwerty User</p>
          <p className="text-sm" style={{ color: styles.textSec }}>qwerty5pro@qwer.ui</p>
        </div>
        <ChevronRight size={20} style={{ color: styles.textSec, marginLeft: 'auto' }} />
      </div>

      <SectionTitle text={language === 'RU' ? 'Сеть' : 'Network'} />
      <Card>
        <Row icon={Plane} iconColor="#ff9500" title={language === 'RU' ? 'Режим полёта' : 'Airplane Mode'} toggle={airplaneMode} onClick={toggleAirplaneMode} noArrow />
        <Divider />
        <Row icon={Wifi} iconColor="#007aff" title="Wi-Fi" value={wifi ? 'Qwerty_5G' : 'Выкл'} onClick={() => setCurrentView('network')} />
        <Divider />
        <Row icon={Bluetooth} iconColor="#007aff" title="Bluetooth" value={bluetooth ? 'AirPods' : 'Выкл'} toggle={bluetooth} onClick={toggleBluetooth} noArrow />
      </Card>

      <SectionTitle text={language === 'RU' ? 'Персонализация' : 'Personalization'} />
      <Card>
        <Row icon={Palette} iconColor="#bf5af2" title={language === 'RU' ? 'Экран и тема' : 'Display & Theme'} onClick={() => setCurrentView('display')} />
        <Divider />
        <Row icon={ImageIcon} iconColor="#ff6b35" title={language === 'RU' ? 'Обои' : 'Wallpaper'} onClick={() => setCurrentView('display')} />
        <Divider />
        <Row icon={Volume2} iconColor="#ff2d55" title={language === 'RU' ? 'Звук и вибрация' : 'Sound & Vibration'} onClick={() => setCurrentView('sound')} />
      </Card>

      <SectionTitle text={language === 'RU' ? 'Приватность' : 'Privacy'} />
      <Card>
        <Row icon={Shield} iconColor="#30d158" title={language === 'RU' ? 'Безопасность и PIN' : 'Security & PIN'} onClick={() => setCurrentView('security')} />
        <Divider />
        <Row icon={Globe} iconColor="#007aff" title={language === 'RU' ? 'Язык' : 'Language'} value={language === 'RU' ? 'Русский' : 'English'} onClick={() => setCurrentView('system')} />
      </Card>

      <SectionTitle text={language === 'RU' ? 'Система' : 'System'} />
      <Card>
        <Row icon={Navigation} iconColor="#5856d6" title={language === 'RU' ? 'Навигация' : 'Navigation'} value={navigation === 'buttons' ? (language === 'RU' ? 'Кнопки' : 'Buttons') : (language === 'RU' ? 'Жесты' : 'Gestures')} onClick={() => setCurrentView('system')} />
        <Divider />
        <Row icon={HardDrive} iconColor="#636366" title={language === 'RU' ? 'Хранилище' : 'Storage'} value="128 ГБ" onClick={() => setCurrentView('storage')} />
        <Divider />
        <Row icon={Info} iconColor="#007aff" title={language === 'RU' ? 'О телефоне' : 'About Phone'} onClick={() => setCurrentView('about')} />
      </Card>

      <SectionTitle text={language === 'RU' ? 'Действия' : 'Actions'} />
      <Card>
        <Row icon={RefreshCw} iconColor="#ff9500" title={language === 'RU' ? 'Перезагрузка' : 'Restart'} onClick={() => window.location.reload()} noArrow />
        <Divider />
        <Row icon={Power} iconColor="#ff3b30" title={language === 'RU' ? 'Сброс до заводских' : 'Factory Reset'} danger onClick={() => {
          setErasing(true);
          setTimeout(() => { localStorage.clear(); window.location.reload(); }, 9000);
        }} noArrow />
      </Card>
    </motion.div>
  );

  const DisplayView = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3 pb-16">
      <BackHeader title={language === 'RU' ? 'Экран и тема' : 'Display'} />

      <SectionTitle text={language === 'RU' ? 'Тема' : 'Theme'} />
      <div className="grid grid-cols-2 gap-3">
        {[
          { id: 'light', icon: Sun, label: language === 'RU' ? 'Светлая' : 'Light', preview: 'linear-gradient(135deg, #f2f2f7, #ffffff)' },
          { id: 'dark', icon: Moon, label: language === 'RU' ? 'Тёмная' : 'Dark', preview: 'linear-gradient(135deg, #1c1c1e, #000000)' },
          { id: 'cyber', icon: Monitor, label: 'Cyber Neon', preview: 'linear-gradient(135deg, #0a0014, #1a0030)' },
          { id: 'premium', icon: Sparkles, label: 'Premium', preview: 'linear-gradient(135deg, #e8f0fe, #f2f2f7)' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id as Theme)}
            className="p-4 rounded-2xl flex flex-col items-center gap-2 transition-all active:scale-95 relative overflow-hidden"
            style={{
              background: t.preview,
              border: theme === t.id ? `3px solid ${styles.accent}` : '3px solid transparent',
              boxShadow: theme === t.id ? `0 0 20px ${styles.accent}44` : 'none',
            }}
          >
            <t.icon size={24} color={t.id === 'cyber' ? '#00ffff' : t.id === 'dark' ? '#ffffff' : '#000000'} />
            <span className="text-[13px] font-semibold" style={{ color: t.id === 'dark' || t.id === 'cyber' ? '#ffffff' : '#000000' }}>{t.label}</span>
            {theme === t.id && (
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: styles.accent }}>
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            )}
          </button>
        ))}
      </div>

      <SectionTitle text={language === 'RU' ? 'Акцентный цвет' : 'Accent Color'} />
      <Card>
        <div className="p-4 flex justify-around">
          {[
            { id: 'blue', color: '#007aff', label: language === 'RU' ? 'Синий' : 'Blue' },
            { id: 'purple', color: '#bf5af2', label: language === 'RU' ? 'Фиолет' : 'Purple' },
            { id: 'emerald', color: '#30d158', label: language === 'RU' ? 'Зелёный' : 'Green' },
            { id: 'orange', color: '#ff9500', label: language === 'RU' ? 'Оранж' : 'Orange' },
          ].map(a => (
            <div key={a.id} className="flex flex-col items-center gap-2">
              <button
                onClick={() => setAccent(a.id as any)}
                className="w-12 h-12 rounded-full transition-all active:scale-90"
                style={{
                  background: a.color,
                  border: accent === a.id ? `4px solid ${styles.text}` : '4px solid transparent',
                  boxShadow: accent === a.id ? `0 0 16px ${a.color}88` : 'none',
                }}
              />
              <span className="text-[10px]" style={{ color: styles.textSec }}>{a.label}</span>
            </div>
          ))}
        </div>
      </Card>

      <SectionTitle text={language === 'RU' ? 'Яркость' : 'Brightness'} />
      <Card>
        <div className="p-4 flex items-center gap-3">
          <Sun size={16} style={{ color: styles.textSec }} />
          <input type="range" min={10} max={100} value={brightness}
            onChange={e => setBrightness(parseInt(e.target.value))}
            className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: styles.accent }}
          />
          <Sun size={22} style={{ color: styles.accent }} />
        </div>
      </Card>

      <SectionTitle text={language === 'RU' ? 'Обои' : 'Wallpaper'} />
      <div className="grid grid-cols-3 gap-2">
        {WALLPAPERS.map((wp, i) => (
          <button
            key={i}
            onClick={() => setWallpaper(wp)}
            className="aspect-[9/16] rounded-2xl overflow-hidden transition-all active:scale-95"
            style={{
              border: wallpaper === wp ? `3px solid ${styles.accent}` : '3px solid transparent',
              boxShadow: wallpaper === wp ? `0 0 16px ${styles.accent}55` : 'none',
            }}
          >
            <img src={wp} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );

  const NetworkView = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3 pb-16">
      <BackHeader title="Wi-Fi" />
      <Card>
        <Row icon={Wifi} iconColor="#007aff" title="Wi-Fi" toggle={wifi} onClick={toggleWifi} noArrow />
      </Card>
      {wifi && !airplaneMode && (
        <>
          <SectionTitle text={language === 'RU' ? 'Доступные сети' : 'Available Networks'} />
          <Card>
            {['Qwerty_5G ✅', 'Sber_Guest_Free', 'iPhone 16 Pro', 'AndroidAP_4523', 'TP-LINK_HOME'].map((net, i) => (
              <div key={i}>
                {i > 0 && <Divider />}
                <Row title={net} value={i === 0 ? (language === 'RU' ? 'Подключено' : 'Connected') : ''} noArrow={i > 0} onClick={() => {}} />
              </div>
            ))}
          </Card>
        </>
      )}
    </motion.div>
  );

  const SystemView = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3 pb-16">
      <BackHeader title={language === 'RU' ? 'Система' : 'System'} />

      <SectionTitle text={language === 'RU' ? 'Навигация' : 'Navigation'} />
      <Card>
        <Row title={language === 'RU' ? 'Жесты свайпом' : 'Swipe Gestures'} value={navigation === 'gestures' ? '✓' : ''} onClick={() => setNavigation('gestures')} noArrow />
        <Divider />
        <Row title={language === 'RU' ? 'Три кнопки' : 'Three Buttons'} value={navigation === 'buttons' ? '✓' : ''} onClick={() => setNavigation('buttons')} noArrow />
      </Card>

      <SectionTitle text={language === 'RU' ? 'Язык системы' : 'System Language'} />
      <Card>
        <Row title="🇷🇺 Русский" value={language === 'RU' ? '✓' : ''} onClick={() => setLanguage('RU')} noArrow />
        <Divider />
        <Row title="🇬🇧 English" value={language === 'EN' ? '✓' : ''} onClick={() => setLanguage('EN')} noArrow />
      </Card>
    </motion.div>
  );

  const SoundView = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3 pb-16">
      <BackHeader title={language === 'RU' ? 'Звук' : 'Sound'} />
      <SectionTitle text={language === 'RU' ? 'Громкость' : 'Volume'} />
      <Card>
        <div className="p-4 space-y-4">
          {[
            { label: language === 'RU' ? 'Звонок' : 'Ringtone', icon: Volume2 },
            { label: language === 'RU' ? 'Медиа' : 'Media', icon: Volume2 },
            { label: language === 'RU' ? 'Уведомления' : 'Notifications', icon: Volume2 },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <item.icon size={16} style={{ color: styles.textSec }} />
              <input type="range" min={0} max={100} defaultValue={volume}
                onChange={e => setVolume(parseInt(e.target.value))}
                className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: styles.accent }}
              />
              <span className="text-xs w-8 text-right" style={{ color: styles.textSec }}>{volume}%</span>
            </div>
          ))}
        </div>
      </Card>
      <SectionTitle text={language === 'RU' ? 'Мелодии' : 'Ringtones'} />
      <Card>
        {['Qwerty Default', 'Neon Pulse', 'Cyber Ring', 'Classic Bell'].map((r, i) => (
          <div key={i}>
            {i > 0 && <Divider />}
            <Row title={r} value={i === 0 ? '✓' : ''} onClick={() => {}} noArrow />
          </div>
        ))}
      </Card>
    </motion.div>
  );

  const StorageView = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3 pb-16">
      <BackHeader title={language === 'RU' ? 'Хранилище' : 'Storage'} />
      <Card>
        <div className="p-5">
          <div className="flex justify-between mb-3">
            <span className="font-bold text-lg" style={{ color: styles.text }}>128 ГБ</span>
            <span style={{ color: styles.textSec }}>62 ГБ {language === 'RU' ? 'свободно' : 'free'}</span>
          </div>
          <div className="h-4 rounded-full overflow-hidden" style={{ background: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)' }}>
            <div className="h-full rounded-full flex overflow-hidden" style={{ width: '52%' }}>
              <div style={{ background: '#ff2d55', width: '30%' }} />
              <div style={{ background: '#007aff', width: '25%' }} />
              <div style={{ background: '#30d158', width: '20%' }} />
              <div style={{ background: '#ff9500', width: '25%' }} />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {[
              { color: '#ff2d55', label: language === 'RU' ? 'Медиа' : 'Media', size: '18 ГБ' },
              { color: '#007aff', label: language === 'RU' ? 'Приложения' : 'Apps', size: '12 ГБ' },
              { color: '#30d158', label: language === 'RU' ? 'Документы' : 'Docs', size: '8 ГБ' },
              { color: '#ff9500', label: language === 'RU' ? 'Прочее' : 'Other', size: '28 ГБ' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                <span className="text-[12px]" style={{ color: styles.textSec }}>{item.label} {item.size}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const SecurityView = () => {
    const handlePinKey = (key: string) => {
      if (pinStep === 'enter') {
        const next = newPin + key;
        setNewPin(next);
        if (next.length === 4) setPinStep('confirm');
      } else {
        const next = pinConfirm + key;
        setPinConfirm(next);
        if (next.length === 4) {
          if (next === newPin) {
            setPinCode(next);
            setNewPin(''); setPinConfirm(''); setPinStep('enter');
            alert(language === 'RU' ? 'PIN установлен!' : 'PIN set!');
          } else {
            setNewPin(''); setPinConfirm(''); setPinStep('enter');
            alert(language === 'RU' ? 'PIN не совпадает!' : 'PIN mismatch!');
          }
        }
      }
    };

    const current = pinStep === 'enter' ? newPin : pinConfirm;

    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4 pb-16">
        <BackHeader title={language === 'RU' ? 'Безопасность' : 'Security'} />

        {pinCode ? (
          <Card>
            <Row icon={Shield} iconColor="#30d158" title={language === 'RU' ? 'PIN установлен ✅' : 'PIN is set ✅'} noArrow onClick={() => {}} />
            <Divider />
            <Row title={language === 'RU' ? 'Удалить PIN' : 'Remove PIN'} danger onClick={() => { setPinCode(null); setNewPin(''); setPinConfirm(''); setPinStep('enter'); }} noArrow />
          </Card>
        ) : (
          <>
            <p className="text-center font-medium text-lg" style={{ color: styles.text }}>
              {pinStep === 'enter' ? (language === 'RU' ? 'Введите новый PIN' : 'Enter new PIN') : (language === 'RU' ? 'Подтвердите PIN' : 'Confirm PIN')}
            </p>
            <div className="flex justify-center gap-4 py-4">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="w-4 h-4 rounded-full transition-all"
                  style={{ background: i < current.length ? styles.accent : (isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)') }} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 px-4">
              {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((k, i) => (
                <button key={i} onClick={() => {
                  if (k === '⌫') {
                    if (pinStep === 'enter') setNewPin(p => p.slice(0,-1));
                    else setPinConfirm(p => p.slice(0,-1));
                  } else if (k) handlePinKey(k);
                }}
                  className="h-14 rounded-2xl text-xl font-medium transition-all active:scale-90"
                  style={{ background: k ? (isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)') : 'transparent', color: styles.text }}
                >
                  {k}
                </button>
              ))}
            </div>
          </>
        )}
      </motion.div>
    );
  };

  const AboutView = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3 pb-16">
      <BackHeader title={language === 'RU' ? 'О телефоне' : 'About'} />
      <div className="flex flex-col items-center py-6">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-4 text-white text-4xl font-black"
          style={{ background: `linear-gradient(135deg, ${styles.accent}, ${styles.accent}88)`, boxShadow: `0 8px 32px ${styles.accent}44` }}>
          Q
        </div>
        <h2 className="text-2xl font-bold" style={{ color: styles.text }}>Qwerty 5 Pro</h2>
        <p style={{ color: styles.textSec }}>QwerUI v2.0.0</p>
      </div>
      <Card>
        {[
          { label: language === 'RU' ? 'Процессор' : 'Processor', value: 'Snapdragon 8 Gen 3' },
          { label: language === 'RU' ? 'ОЗУ' : 'RAM', value: '12 GB LPDDR5X' },
          { label: language === 'RU' ? 'Память' : 'Storage', value: '512 GB NVMe' },
          { label: language === 'RU' ? 'Экран' : 'Display', value: '6.7" AMOLED 120Hz' },
          { label: language === 'RU' ? 'Камера' : 'Camera', value: '200 MP AI + 50 MP + 12 MP' },
          { label: language === 'RU' ? 'Батарея' : 'Battery', value: '5000 mAh 120W' },
          { label: language === 'RU' ? 'Версия QwerUI' : 'QwerUI Version', value: '2.0.0 (stable)' },
          { label: language === 'RU' ? 'Ядро' : 'Kernel', value: 'QwerKernel 6.1.2' },
          { label: language === 'RU' ? 'Сборка' : 'Build', value: 'QP5-240601-RELEASE' },
        ].map((item, i) => (
          <div key={i}>
            {i > 0 && <Divider />}
            <Row title={item.label} value={item.value} noArrow onClick={() => {}} />
          </div>
        ))}
      </Card>
      <button
        className="w-full py-4 rounded-2xl font-bold mt-2 flex items-center justify-center gap-2"
        style={{ background: styles.accent + '22', color: styles.accent }}
        onClick={() => alert(language === 'RU' ? 'Система обновлена до последней версии!' : 'System is up to date!')}
      >
        <Zap size={18} />
        {language === 'RU' ? 'Проверить обновления' : 'Check for Updates'}
      </button>
    </motion.div>
  );

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden" style={{ background: styles.bg, color: styles.text }}>
      <div className="p-4">
        <AnimatePresence mode="wait">
          {currentView === 'main' && <MainView key="main" />}
          {currentView === 'network' && <NetworkView key="network" />}
          {currentView === 'display' && <DisplayView key="display" />}
          {currentView === 'system' && <SystemView key="system" />}
          {currentView === 'sound' && <SoundView key="sound" />}
          {currentView === 'storage' && <StorageView key="storage" />}
          {currentView === 'security' && <SecurityView key="security" />}
          {currentView === 'about' && <AboutView key="about" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SettingsApp;
