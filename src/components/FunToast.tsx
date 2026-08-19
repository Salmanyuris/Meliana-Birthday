import React, { useEffect, useState, useCallback } from 'react';

interface Toast {
  id: number;
  message: string;
  emoji: string;
  color: string;
}

const MESSAGES = [
  { message: 'Meli lagi buka website-nya! 👀', emoji: '🎉', color: 'from-pink-500 to-rose-500' },
  { message: 'Happy Birthday Meli! 23 tahun ya sayang~ 🥺', emoji: '🎂', color: 'from-purple-500 to-pink-500' },
  { message: 'Meli cantik banget hari ini! ✨', emoji: '💖', color: 'from-rose-400 to-pink-600' },
  { message: 'Semoga semua impianmu tercapai! 🌟', emoji: '🌈', color: 'from-amber-400 to-orange-500' },
  { message: 'Ada hadiah spesial di bawah ya! 🎁', emoji: '🎀', color: 'from-pink-400 to-purple-500' },
  { message: 'Meli lagi senyum-senyum sendiri nih! 😄', emoji: '😊', color: 'from-emerald-400 to-teal-500' },
  { message: 'Chapter 23 dimulai! Siap? 🚀', emoji: '⭐', color: 'from-indigo-400 to-blue-500' },
  { message: 'Teman terbaik~!! 💕', emoji: '🌸', color: 'from-pink-500 to-rose-400' },
  { message: 'Jangan lupa tiup lilinnya! 🕯️', emoji: '🎂', color: 'from-amber-500 to-yellow-400' },
  { message: 'Cek foto-foto kenangan kita yuk! 📸', emoji: '🤩', color: 'from-violet-500 to-purple-400' },
];

export const FunToast: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = React.useRef(0);
  const shownIndices = React.useRef<Set<number>>(new Set());

  const addToast = useCallback(() => {
    const available = MESSAGES.filter((_, i) => !shownIndices.current.has(i));
    if (available.length === 0) {
      shownIndices.current.clear();
    }

    const remaining = MESSAGES.filter((_, i) => !shownIndices.current.has(i));
    if (remaining.length === 0) return;

    const msgIndex = MESSAGES.indexOf(remaining[Math.floor(Math.random() * remaining.length)]);
    shownIndices.current.add(msgIndex);

    const msg = MESSAGES[msgIndex];
    const id = nextId.current++;

    setToasts(prev => [...prev, { id, ...msg }]);

    // Remove after 4s
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  useEffect(() => {
    // First toast after 2 seconds
    const firstTimer = setTimeout(addToast, 2000);

    // Then every 6-9 seconds
    const getInterval = () => Math.random() * 3000 + 6000;
    let intervalTimer: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      intervalTimer = setTimeout(() => {
        addToast();
        scheduleNext();
      }, getInterval());
    };

    scheduleNext();

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(intervalTimer);
    };
  }, [addToast]);

  return (
    <div className="fixed top-4 sm:top-auto sm:bottom-28 right-4 sm:right-6 z-[200] flex flex-col gap-3 items-end pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto"
          style={{
            animation: 'toastSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}
        >
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r ${toast.color} text-white shadow-2xl max-w-[260px] sm:max-w-[280px] cursor-pointer hover:scale-105 transition-transform`}
            onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
          >
            <span className="text-2xl flex-shrink-0">{toast.emoji}</span>
            <div>
              <p className="text-sm font-semibold leading-snug">{toast.message}</p>
              <p className="text-xs opacity-75 mt-0.5">tap to dismiss 👆</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
