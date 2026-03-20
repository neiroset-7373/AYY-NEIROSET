import { ShoppingBag, Banknote, ShoppingCart, MessageSquare, Music, Calculator as CalcIcon, Settings, Phone, MessageCircle } from 'lucide-react';

import { Camera, Calendar, MapPin, Gamepad2 } from 'lucide-react';

export const APP_REGISTRY = {
  market: { id: 'market', name: 'Qwerty Market', icon: ShoppingBag, color: 'bg-purple-500' },
  sber: { id: 'sber', name: 'Сбер', icon: Banknote, color: 'bg-green-500' },
  ozon: { id: 'ozon', name: 'Ozon', icon: ShoppingCart, color: 'bg-blue-500' },
  ai: { id: 'ai', name: 'Qwerty AI', icon: MessageSquare, color: 'bg-indigo-600' },
  music: { id: 'music', name: 'Я.Музыка', icon: Music, color: 'bg-yellow-500 text-black' },
  calculator: { id: 'calculator', name: 'Калькулятор', icon: CalcIcon, color: 'bg-orange-500' },
  settings: { id: 'settings', name: 'Настройки', icon: Settings, color: 'bg-gray-600' },
  phone: { id: 'phone', name: 'Телефон', icon: Phone, color: 'bg-green-400' },
  messages: { id: 'messages', name: 'Сообщения', icon: MessageCircle, color: 'bg-blue-400' },
  camera: { id: 'camera', name: 'Камера', icon: Camera, color: 'bg-zinc-800' },
  calendar: { id: 'calendar', name: 'Календарь', icon: Calendar, color: 'bg-red-500' },
  maps: { id: 'maps', name: 'Карты', icon: MapPin, color: 'bg-green-600' },
  games: { id: 'games', name: 'Игры', icon: Gamepad2, color: 'bg-rose-500' },
};
