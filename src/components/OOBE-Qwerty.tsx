import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore-Qwerty';
import { ChevronRight, Loader2, Palette, Smartphone, ShieldCheck, Wifi, Layers, CheckCircle } from 'lucide-react';

const steps = [
  { id: 1, title: 'Добро пожаловать', icon: Smartphone, desc: 'Начнём настройку вашего QwerUI' },
  { id: 2, title: 'Тема оформления', icon: Palette, desc: 'Выберите визуальный стиль системы' },
  { id: 3, title: 'Навигация', icon: Smartphone, desc: 'Как вы будете управлять устройством?' },
  { id: 4, title: 'Цветовой акцент', icon: Palette, desc: 'Выберите акцентный цвет системы' },
  { id: 5, title: 'Безопасность', icon: ShieldCheck, desc: 'Настройка PIN-кода защиты' },
  { id: 6, title: 'Сеть', icon: Wifi, desc: 'Подключение к интернету' },
  { id: 7, title: 'Экосистема', icon: Layers, desc: 'Установка приложений Qwerty' },
  { id: 8, title: 'Финальная настройка', icon: Loader2, desc: 'Оптимизация параметров системы' },
  { id: 9, title: 'Всё готово!', icon: CheckCircle, desc: 'QwerUI настроен и готов к работе' },
];

const OOBE: React.FC = () => {
  const {
    setupStep, setSetupStep, setSetupComplete,
    setTheme: changeTheme, theme,
    setNavigation, navigation,
    setAccent, accent,
    setPinCode
  } = useStore();

  const [loading, setLoading] = useState(false);
  const [localPin, setLocalPin] = useState('');
  const currentStep = steps[setupStep - 1];

  const handleNext = () => {
    if (setupStep === 5 && localPin.length > 0 && localPin.length < 4) {
      alert('PIN должен состоять ровно из 4 цифр или оставьте пустым');
      return;
    }
    if (setupStep === 5 && localPin.length === 4) {
      setPinCode(localPin);
    }
    if (setupStep === 9) {
      setSetupComplete(true);
      if (localPin.length === 4) {
        setPinCode(localPin);
        useStore.setState({ isLocked: true });
      }
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSetupStep(setupStep + 1);
    }, 3000);
  };

  const isCyber = theme === 'cyber';
  const isDark = theme === 'dark' || theme === 'cyber';
  const isPremium = theme === 'glossy' || theme === 'premium';

  const getBg = () => {
    if (isCyber) return 'linear-gradient(160deg, #08001a 0%, #0a0020 60%, #000 100%)';
    if (isDark) return '#000';
    if (isPremium) return 'linear-gradient(135deg, #f0e8ff 0%, #e8f4ff 50%, #fff0f8 100%)';
    return '#f2f2f7';
  };

  const getCard = () => {
    if (isCyber) return { background: 'rgba(26,0,60,0.8)', border: '1px solid rgba(0,255,255,0.2)' };
    if (isDark) return { background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.08)' };
    return { background: '#fff', border: '1px solid rgba(0,0,0,0.06)' };
  };

  const textColor = isDark ? '#fff' : '#000';
  const subColor = isCyber ? '#00ffff99' : isDark ? '#8e8e93' : '#6e6e73';
  const accentColor = isCyber ? '#00ffff' : 'var(--color-accent)';

  return (
    <div
      className="w-full h-full flex flex-col justify-between font-sans relative overflow-hidden transition-all duration-500"
      style={{ background: getBg() }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-[120px] opacity-20"
          style={{ background: accentColor }} />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-[120px] opacity-10"
          style={{ background: isCyber ? '#bf00ff' : accentColor }} />
      </div>

      {/* Cyber scanlines */}
      {isCyber && (
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,255,0.02) 3px, rgba(0,255,255,0.02) 4px)',
        }} />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={setupStep + (loading ? 'L' : 'C')}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
          className="flex-1 flex flex-col items-center justify-center text-center z-10 p-8"
        >
          {loading ? (
            <div className="flex flex-col items-center gap-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                style={{
                  width: 72, height: 72, borderRadius: '50%',
                  border: `3px solid ${isCyber ? 'rgba(0,255,255,0.15)' : 'rgba(128,128,128,0.15)'}`,
                  borderTop: `3px solid ${accentColor}`,
                  boxShadow: isCyber ? `0 0 20px ${accentColor}55` : 'none',
                }}
              />
              <p className="font-mono text-sm tracking-widest animate-pulse" style={{ color: accentColor }}>
                ОПТИМИЗАЦИЯ СИСТЕМЫ...
              </p>
            </div>
          ) : (
            <>
              {/* Icon */}
              <div
                className="p-6 rounded-3xl mb-6 shadow-xl"
                style={{
                  ...getCard(),
                  boxShadow: isCyber ? `0 0 30px ${accentColor}33` : '0 10px 40px rgba(0,0,0,0.15)',
                }}
              >
                <currentStep.icon size={52} style={{ color: accentColor }} />
              </div>

              <h1 className="text-3xl font-bold mb-2" style={{ color: textColor }}>{currentStep.title}</h1>
              <p className="text-sm mb-8" style={{ color: subColor }}>{currentStep.desc}</p>

              <div className="w-full max-w-xs space-y-3">
                {/* Шаг 2: Тема */}
                {setupStep === 2 && (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'light', label: '☀️ Светлая', bg: '#fff', text: '#000', border: '#e0e0e0' },
                      { id: 'dark', label: '🌑 Тёмная', bg: '#111', text: '#fff', border: '#333' },
                      { id: 'cyber', label: '⚡ Cyber Neon', bg: '#08001a', text: '#00ffff', border: '#00ffff44' },
                      { id: 'glossy', label: '✨ Premium', bg: 'linear-gradient(135deg, #f0e8ff, #e8f4ff)', text: '#1c1c1e', border: '#bf5af240' },
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => changeTheme(t.id as any)}
                        className="p-4 rounded-2xl flex flex-col items-center gap-1 transition-all active:scale-95"
                        style={{
                          background: t.bg,
                          color: t.text,
                          border: `2px solid ${theme === t.id ? accentColor : t.border}`,
                          boxShadow: theme === t.id ? `0 0 0 3px ${accentColor}44` : 'none',
                        }}
                      >
                        <span className="font-semibold text-sm">{t.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Шаг 3: Навигация */}
                {setupStep === 3 && (
                  <div className="space-y-3">
                    {[
                      { id: 'gestures', label: '👆 Жесты', desc: 'Полоска внизу экрана' },
                      { id: 'buttons', label: '⬅ ⬤ ⬛ Три кнопки', desc: 'Классический режим' },
                    ].map(n => (
                      <button
                        key={n.id}
                        onClick={() => setNavigation(n.id as any)}
                        className="w-full p-4 rounded-2xl text-left transition-all active:scale-95"
                        style={{
                          ...getCard(),
                          border: `2px solid ${navigation === n.id ? accentColor : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)')}`,
                          boxShadow: navigation === n.id ? `0 0 0 3px ${accentColor}33` : 'none',
                        }}
                      >
                        <div className="font-semibold text-sm" style={{ color: textColor }}>{n.label}</div>
                        <div className="text-xs mt-1" style={{ color: subColor }}>{n.desc}</div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Шаг 4: Акцент */}
                {setupStep === 4 && (
                  <div className="flex gap-4 justify-center">
                    {[
                      { id: 'blue', color: '#007aff', label: 'Синий' },
                      { id: 'purple', color: '#bf5af2', label: 'Фиолет.' },
                      { id: 'emerald', color: '#30d158', label: 'Зелёный' },
                      { id: 'orange', color: '#ff9500', label: 'Оранж.' },
                    ].map(a => (
                      <div key={a.id} className="flex flex-col items-center gap-2">
                        <button
                          onClick={() => setAccent(a.id as any)}
                          className="w-14 h-14 rounded-full transition-all active:scale-90"
                          style={{
                            background: a.color,
                            border: `4px solid ${accent === a.id ? textColor : 'transparent'}`,
                            boxShadow: accent === a.id ? `0 0 0 2px ${a.color}, 0 0 20px ${a.color}66` : `0 4px 12px ${a.color}44`,
                          }}
                        />
                        <span className="text-[10px]" style={{ color: subColor }}>{a.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Шаг 5: PIN */}
                {setupStep === 5 && (
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-xs" style={{ color: subColor }}>Установите 4-значный PIN или оставьте пустым</p>
                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      value={localPin}
                      onChange={e => setLocalPin(e.target.value.replace(/\D/g, ''))}
                      className="w-36 text-center text-3xl tracking-[0.4em] p-4 rounded-2xl outline-none bg-transparent transition-colors"
                      placeholder="••••"
                      style={{
                        ...getCard(),
                        color: textColor,
                        border: `2px solid ${localPin.length === 4 ? accentColor : (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)')}`,
                      }}
                    />
                    {localPin.length > 0 && localPin.length < 4 && (
                      <p className="text-xs text-red-400">Введите ещё {4 - localPin.length} цифры</p>
                    )}
                    {localPin.length === 0 && (
                      <p className="text-xs" style={{ color: subColor }}>Оставьте пустым для пропуска</p>
                    )}
                  </div>
                )}

                {/* Шаги 6-8: прогресс */}
                {setupStep >= 6 && setupStep < 9 && (
                  <div className="p-6 rounded-2xl" style={getCard()}>
                    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2 }}
                        className="h-full rounded-full"
                        style={{
                          background: accentColor,
                          boxShadow: isCyber ? `0 0 10px ${accentColor}` : 'none',
                        }}
                      />
                    </div>
                    <p className="mt-4 text-xs font-bold tracking-widest" style={{ color: subColor }}>
                      {setupStep === 6 ? 'ПОДКЛЮЧЕНИЕ К СЕРВЕРУ...' : setupStep === 7 ? 'УСТАНОВКА ПРИЛОЖЕНИЙ...' : 'ФИНАЛЬНАЯ НАСТРОЙКА...'}
                    </p>
                  </div>
                )}

                {/* Шаг 9: Готово */}
                {setupStep === 9 && (
                  <div className="text-center space-y-3">
                    <div className="text-6xl">🎉</div>
                    <p className="text-sm font-medium" style={{ color: subColor }}>
                      Ваш Qwerty Phone 5 Pro готов к использованию!
                    </p>
                    <div className="p-4 rounded-2xl text-xs space-y-1 text-left" style={getCard()}>
                      <p style={{ color: subColor }}>✅ Тема: <span style={{ color: textColor }}>{theme}</span></p>
                      <p style={{ color: subColor }}>✅ Навигация: <span style={{ color: textColor }}>{navigation === 'gestures' ? 'Жесты' : 'Кнопки'}</span></p>
                      <p style={{ color: subColor }}>✅ PIN: <span style={{ color: textColor }}>{localPin.length === 4 ? 'Установлен' : 'Отключён'}</span></p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom controls */}
      <div className="z-10 p-6 flex flex-col gap-4">
        {/* Progress dots */}
        <div className="flex justify-center gap-1.5">
          {steps.map((s) => (
            <div
              key={s.id}
              className="h-1.5 rounded-full transition-all duration-400"
              style={{
                width: s.id === setupStep ? 28 : 6,
                background: s.id === setupStep ? accentColor : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'),
                boxShadow: s.id === setupStep && isCyber ? `0 0 8px ${accentColor}` : 'none',
              }}
            />
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleNext}
          disabled={loading}
          className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
          style={{
            background: loading ? (isDark ? '#333' : '#e0e0e0') : accentColor,
            color: loading ? (isDark ? '#666' : '#999') : '#fff',
            opacity: loading ? 0.7 : 1,
            boxShadow: !loading && isCyber ? `0 0 20px ${accentColor}55` : !loading ? '0 8px 24px rgba(0,0,0,0.2)' : 'none',
          }}
        >
          {setupStep === 9 ? '🚀 ЗАПУСТИТЬ QWERUI' : loading ? 'Подождите...' : 'ДАЛЕЕ'}
          {!loading && setupStep !== 9 && <ChevronRight size={20} />}
        </motion.button>
      </div>
    </div>
  );
};

export default OOBE;
