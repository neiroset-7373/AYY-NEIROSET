import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppId = 'settings' | 'phone' | 'sms' | 'camera' | 'calc' | 'market' | 'sber' | 'ozon' | 'ai' | 'music' | 'notes' | 'gallery' | 'browser' | 'weather' | 'clock';
export type Theme = 'dark' | 'light' | 'neon' | 'cyber' | 'glossy' | 'premium';
export type Accent = 'blue' | 'purple' | 'emerald' | 'orange';
export type NavMode = 'buttons' | 'gestures';
export type Language = 'RU' | 'EN';

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface HistoryItem {
  id: string;
  date: string;
  type: string;
  amount: number;
  title: string;
}

export interface ChatMessage {
  id: string;
  name: string;
  time: string;
  unread: number;
  messages: { text: string; isSender: boolean; hasAction?: 'install_31' }[];
}

export interface OSState {
  isBooted: boolean;
  isSetupComplete: boolean;
  setupStep: number;
  theme: Theme;
  accent: Accent;
  navigation: NavMode;
  language: Language;
  balance: number;
  isErasing: boolean;
  showHints: boolean;
  history: HistoryItem[];
  installedApps: AppId[];
  recentApps: AppId[];
  openApp: AppId | null;
  wallpaper: string;
  wifi: boolean;
  bluetooth: boolean;
  brightness: number;
  volume: number;
  airplaneMode: boolean;
  batteryLevel: number;
  isFlashlightOn: boolean;
  isNightShiftOn: boolean;
  isBatterySaverOn: boolean;
  
  // New features
  osVersion: 'qwerui' | 'qwerty31';
  pinCode: string | null;
  isLocked: boolean;
  isInstalling: boolean;
  chats: ChatMessage[];
  notifications: { id: string; title: string; body: string; type: 'update' | 'info' }[];
  notes: Note[];

  completeBoot: () => void;
  setSetupComplete: (v: boolean) => void;
  setSetupStep: (v: number) => void;
  setTheme: (v: Theme) => void;
  setAccent: (v: Accent) => void;
  setErasing: (v: boolean) => void;
  setShowHints: (v: boolean) => void;
  setNavigation: (v: NavMode) => void;
  setLanguage: (v: Language) => void;
  setBalance: (v: number) => void;
  addHistory: (item: HistoryItem) => void;
  installApp: (id: AppId) => void;
  setOpenApp: (id: AppId | null) => void;
  addRecentApp: (id: AppId) => void;
  removeRecentApp: (id: AppId) => void;
  setWallpaper: (v: string) => void;
  toggleWifi: () => void;
  toggleBluetooth: () => void;
  setBrightness: (v: number) => void;
  setVolume: (v: number) => void;
  toggleAirplaneMode: () => void;
  toggleFlashlight: () => void;
  toggleNightShift: () => void;
  toggleBatterySaver: () => void;
  
  setOsVersion: (v: 'qwerui' | 'qwerty31') => void;
  setPinCode: (v: string | null) => void;
  setLocked: (v: boolean) => void;
  setInstalling: (v: boolean) => void;
  addChatMessage: (chatId: string, name: string, msg: { text: string; isSender: boolean; hasAction?: 'install_31' }) => void;
  markChatRead: (chatId: string) => void;
  addNotification: (title: string, body: string, type: 'update' | 'info') => void;
  removeNotification: (id: string) => void;
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  
  spendMoney: (amount: number, type: string) => boolean;
  addBalance: (amount: number, type: string) => void;
}

export const INITIAL_APPS: AppId[] = ['settings', 'phone', 'sms', 'camera', 'calc', 'market', 'gallery', 'browser', 'notes', 'weather', 'clock'];

export const useStore = create<OSState>()(
  persist(
    (set, get) => ({
      isBooted: false,
      isSetupComplete: false,
      setupStep: 1,
      theme: 'light',
      accent: 'blue',
      isErasing: false,
      showHints: true,
      navigation: 'gestures',
      language: 'RU',
      balance: 1500,
      history: [],
      installedApps: INITIAL_APPS,
      recentApps: [],
      openApp: null,
      wallpaper: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=400&auto=format&fit=crop',
      wifi: true,
      bluetooth: false,
      brightness: 80,
      volume: 50,
      airplaneMode: false,
      batteryLevel: 85,
      isFlashlightOn: false,
      isNightShiftOn: false,
      isBatterySaverOn: false,
      osVersion: 'qwerui',
      pinCode: null,
      isLocked: false,
      isInstalling: false,
      notifications: [],
      notes: [],
      chats: [
        { id: '1', name: 'Spidi', time: '12:45', unread: 1, messages: [{ text: 'Ну как там ОС? Глючит?', isSender: false }] },
        { id: '2', name: 'Ozon', time: 'Вчера', unread: 0, messages: [{ text: 'Заказ №34567 доставлен.', isSender: false }] },
      ],

      setOsVersion: (v) => set({ osVersion: v }),
      addNotification: (title, body, type) => set((state) => ({
        notifications: [{ id: Date.now().toString(), title, body, type }, ...state.notifications]
      })),
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      setPinCode: (v) => set({ pinCode: v }),
      setLocked: (v) => set({ isLocked: v }),
      setInstalling: (v) => set({ isInstalling: v }),
      
      addChatMessage: (chatId, name, msg) => set((state) => {
        const chats = [...state.chats];
        const existingChatIndex = chats.findIndex(c => c.id === chatId);
        
        if (existingChatIndex >= 0) {
          chats[existingChatIndex] = {
            ...chats[existingChatIndex],
            time: new Date().toLocaleTimeString().slice(0, 5),
            unread: msg.isSender ? chats[existingChatIndex].unread : chats[existingChatIndex].unread + 1,
            messages: [...chats[existingChatIndex].messages, msg]
          };
        } else {
          chats.push({
            id: chatId,
            name,
            time: new Date().toLocaleTimeString().slice(0, 5),
            unread: msg.isSender ? 0 : 1,
            messages: [msg]
          });
        }
        
        return { chats };
      }),
      
      markChatRead: (chatId) => set((state) => ({
        chats: state.chats.map(c => c.id === chatId ? { ...c, unread: 0 } : c)
      })),

      completeBoot: () => set({ isBooted: true }),
      setSetupComplete: (v) => set({ isSetupComplete: v, isBooted: true }),
      setSetupStep: (v) => set({ setupStep: v }),
      setTheme: (v) => set({ theme: v }),
      setAccent: (v) => set({ accent: v }),
      setErasing: (v) => set({ isErasing: v }),
      setShowHints: (v) => set({ showHints: v }),
      setNavigation: (v) => set({ navigation: v }),
      setLanguage: (v) => set({ language: v }),
      setBalance: (v) => set({ balance: v }),
      addHistory: (item) => set((state) => ({ history: [item, ...state.history] })),
      installApp: (id) => set((state) => ({
        installedApps: state.installedApps.includes(id) ? state.installedApps : [...state.installedApps, id]
      })),
      setOpenApp: (id) => set({ openApp: id }),
      addRecentApp: (id) => set((state) => {
        const filtered = state.recentApps.filter(app => app !== id);
        return { recentApps: [id, ...filtered].slice(0, 10) };
      }),
      removeRecentApp: (id) => set((state) => ({
        recentApps: state.recentApps.filter(app => app !== id)
      })),
      setWallpaper: (v) => set({ wallpaper: v }),
      toggleWifi: () => set((state) => ({ wifi: !state.wifi })),
      toggleBluetooth: () => set((state) => ({ bluetooth: !state.bluetooth })),
      setBrightness: (v) => set({ brightness: v }),
      setVolume: (v) => set({ volume: v }),
      toggleAirplaneMode: () => set((state) => ({ airplaneMode: !state.airplaneMode })),
      toggleFlashlight: () => set((state) => ({ isFlashlightOn: !state.isFlashlightOn })),
      toggleNightShift: () => set((state) => ({ isNightShiftOn: !state.isNightShiftOn })),
      toggleBatterySaver: () => set((state) => ({ isBatterySaverOn: !state.isBatterySaverOn })),
      addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
      deleteNote: (id) => set((state) => ({ notes: state.notes.filter(n => n.id !== id) })),
      
      addBalance: (amount, type) => set((state) => {
        const item: HistoryItem = { id: Date.now().toString(), date: new Date().toLocaleTimeString(), type, amount: Math.abs(amount), title: type };
        return {
          balance: state.balance + amount,
          history: [item, ...state.history]
        };
      }),
      
      spendMoney: (amount, type) => {
        const state = get();
        if (state.balance >= amount) {
          const item: HistoryItem = { id: Date.now().toString(), date: new Date().toLocaleTimeString(), type, amount: -Math.abs(amount), title: type };
          set({
            balance: state.balance - amount,
            history: [item, ...state.history]
          });
          return true;
        }
        return false;
      },
    }),
    {
      name: 'qwerty-os-pro-v1',
    }
  )
);

export const getWikipediaSummary = async (query: string, lang: 'RU' | 'EN') => {
  try {
    const languageCode = lang.toLowerCase();
    const endpoint = `https://${languageCode}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const response = await fetch(endpoint);
    if (!response.ok) return null;
    const data = await response.json();
    return data.extract || null;
  } catch (e) {
    return null;
  }
};