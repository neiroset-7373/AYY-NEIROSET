import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, CloudLightning, MapPin, Calendar, Thermometer, Wind } from 'lucide-react';
import { useStore } from '../../store/useStore-Qwerty';

const WeatherAppQwerty: React.FC = () => {
  const { theme } = useStore();

  const forecast = [
    { time: '12:00', temp: 22, icon: Sun },
    { time: '15:00', temp: 24, icon: Cloud },
    { time: '18:00', temp: 21, icon: CloudRain },
    { time: '21:00', temp: 18, icon: Cloud },
    { time: '00:00', temp: 16, icon: CloudLightning },
  ];

  return (
    <div className={`flex flex-col h-full bg-gradient-to-b ${theme === 'light' ? 'from-sky-400 to-blue-500' : 'from-zinc-900 to-black'} rounded-3xl overflow-hidden text-white p-6 pt-12`}>
      <div className="flex items-center gap-2 mb-2 bg-black/10 w-fit px-3 py-1 rounded-full backdrop-blur-md">
        <MapPin size={14} />
        <span className="text-sm font-bold">Moscow, RU</span>
      </div>

      <div className="flex flex-col items-center py-10">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <Sun size={120} className="text-yellow-300 drop-shadow-2xl" />
        </motion.div>
        <h1 className="text-7xl font-black mt-4">24°</h1>
        <p className="text-xl font-medium opacity-80">Mostly Sunny</p>
        <div className="flex gap-4 mt-2 font-bold opacity-60">
          <span>H: 26°</span>
          <span>L: 14°</span>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 mt-auto">
        <div className="flex items-center gap-2 text-xs font-bold uppercase opacity-60 mb-4">
          <Calendar size={12} /> Hourly Forecast
        </div>
        <div className="flex justify-between">
          {forecast.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-bold">{item.time}</span>
              <item.icon size={20} className="text-white" />
              <span className="text-sm font-black">{item.temp}°</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1 opacity-60 text-[10px] font-bold uppercase">
            <Wind size={12} /> Wind
          </div>
          <span className="text-xl font-black">12 km/h</span>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1 opacity-60 text-[10px] font-bold uppercase">
            <Thermometer size={12} /> Humidity
          </div>
          <span className="text-xl font-black">45%</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherAppQwerty;