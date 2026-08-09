import React, { useEffect, useState, useRef } from 'react';

interface Balloon {
  id: number;
  x: number;
  color: string;
  emoji: string;
  size: number;
  duration: number;
  delay: number;
  popped: boolean;
  popX: number;
  popY: number;
}

const BALLOON_COLORS = [
  'bg-pink-400', 'bg-purple-400', 'bg-rose-400',
  'bg-amber-400', 'bg-sky-400', 'bg-emerald-400',
];

const BALLOON_EMOJIS = ['🎈', '🎀', '🎊', '🎉', '💝', '🌸'];
const POP_EMOJIS = ['💥', '✨', '🎊', '⭐', '💖', '🌟'];

export const BalloonPop: React.FC = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const nextId = useRef(0);

  const spawnBalloon = () => {
    setBalloons(prev => {
      if (prev.filter(b => !b.popped).length >= 8) return prev;
      const newBalloon: Balloon = {
        id: nextId.current++,
        x: Math.random() * 90 + 5,
        color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
        emoji: BALLOON_EMOJIS[Math.floor(Math.random() * BALLOON_EMOJIS.length)],
        size: Math.floor(Math.random() * 20) + 40,
        duration: Math.random() * 4 + 8,
        delay: 0,
        popped: false,
        popX: 0,
        popY: 0,
      };
      return [...prev.filter(b => !b.popped || Date.now() - b.popX < 1000), newBalloon].slice(-20);
    });
  };

  useEffect(() => {
    // Spawn initial balloons
    for (let i = 0; i < 6; i++) {
      setTimeout(() => spawnBalloon(), i * 1200);
    }

    // Keep spawning
    const interval = setInterval(spawnBalloon, 3500);
    return () => clearInterval(interval);
  }, []);

  const popBalloon = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBalloons(prev =>
      prev.map(b =>
        b.id === id
          ? { ...b, popped: true, popX: e.clientX, popY: e.clientY }
          : b
      )
    );
    // Remove after animation
    setTimeout(() => {
      setBalloons(prev => prev.filter(b => b.id !== id));
    }, 800);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
      {balloons.map(b => (
        <div key={b.id}>
          {!b.popped ? (
            /* Floating balloon */
            <div
              className="absolute cursor-pointer pointer-events-auto select-none hover:scale-110 active:scale-95 transition-transform"
              style={{
                left: `${b.x}%`,
                bottom: '-80px',
                fontSize: `${b.size}px`,
                animation: `balloonFloat ${b.duration}s ease-in forwards`,
                animationDelay: `${b.delay}s`,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
              }}
              onClick={(e) => popBalloon(b.id, e)}
              title="Klik untuk pop! 🎊"
            >
              {b.emoji}
            </div>
          ) : (
            /* Pop explosion at click position */
            <div
              className="fixed pointer-events-none select-none z-[9990] animate-ping"
              style={{
                left: b.popX - 30,
                top: b.popY - 30,
                fontSize: 60,
                animation: 'popBurst 0.6s ease-out forwards',
              }}
            >
              {POP_EMOJIS[Math.floor(Math.random() * POP_EMOJIS.length)]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
