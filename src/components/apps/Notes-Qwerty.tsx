import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, Trash2, Calendar } from 'lucide-react';
import { useStore, Note } from '../../store/useStore-Qwerty';

const NotesAppQwerty: React.FC = () => {
  const { notes, addNote, deleteNote, accent } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState<{ title: string; content: string }>({ title: '', content: '' });

  const accentHex: Record<string, string> = {
    blue: '#3b82f6',
    purple: '#a855f7',
    emerald: '#10b981',
    orange: '#f97316'
  };

  const currentAccent = accentHex[accent] || '#3b82f6';

  const handleSave = () => {
    if (!currentNote.title && !currentNote.content) return;
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      title: currentNote.title || 'Untitled Note',
      content: currentNote.content || '',
      date: new Date().toLocaleDateString()
    };
    addNote(newNote);
    setIsEditing(false);
    setCurrentNote({ title: '', content: '' });
  };

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-950 rounded-3xl overflow-hidden">
      <div className="p-6 pt-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black dark:text-white">Notes</h1>
          <p className="text-zinc-500 font-medium">{notes.length} notes</p>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-all"
          style={{ backgroundColor: currentAccent }}
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-3">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-300 dark:text-zinc-800">
            <FileText size={64} strokeWidth={1} />
            <p className="mt-2 font-medium">No notes yet</p>
          </div>
        ) : (
          notes.map(note => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center justify-between group"
            >
              <div className="flex-1">
                <h3 className="font-bold dark:text-white">{note.title}</h3>
                <p className="text-xs text-zinc-500 line-clamp-1">{note.content}</p>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-zinc-400 font-bold uppercase">
                  <Calendar size={10} /> {note.date}
                </div>
              </div>
              <button 
                onClick={() => deleteNote(note.id)}
                className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute inset-0 z-50 bg-white dark:bg-zinc-900 flex flex-col p-6 pt-12"
          >
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => setIsEditing(false)} className="text-zinc-500 font-bold">Cancel</button>
              <button 
                onClick={handleSave}
                className="font-bold px-4 py-1.5 rounded-full text-white"
                style={{ backgroundColor: currentAccent }}
              >
                Save
              </button>
            </div>
            <input 
              autoFocus
              value={currentNote.title}
              onChange={(e) => setCurrentNote(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Title"
              className="text-2xl font-black bg-transparent border-none outline-none dark:text-white mb-4"
            />
            <textarea 
              value={currentNote.content}
              onChange={(e) => setCurrentNote(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Start typing..."
              className="flex-1 bg-transparent border-none outline-none dark:text-zinc-200 text-lg leading-relaxed resize-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotesAppQwerty;