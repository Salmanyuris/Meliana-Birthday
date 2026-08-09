import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  life: number;
  vx: number;
  vy: number;
}

const EMOJIS = ['✨', '💖', '🌸', '⭐', '💫', '🎀', '🌟', '💕', '🎊'];

export const CursorSparkle: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const nextId = useRef(0);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    // Custom cursor star trail
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setCursorPos({ x, y });

      // Spawn 1-2 sparkle particles
      const count = Math.random() > 0.6 ? 2 : 1;
      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: nextId.current++,
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          size: Math.random() * 14 + 10,
          life: 1,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * -2 - 0.5,
        });
      }

      particlesRef.current = [...particlesRef.current, ...newParticles].slice(-60);
      setParticles([...particlesRef.current]);
    };

    // Click burst: spawn a lot of sparkles
    const handleClick = (e: MouseEvent) => {
      const burst: Particle[] = [];
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const speed = Math.random() * 3 + 2;
        burst.push({
          id: nextId.current++,
          x: e.clientX,
          y: e.clientY,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          size: Math.random() * 18 + 12,
          life: 1,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        });
      }
      particlesRef.current = [...particlesRef.current, ...burst].slice(-80);
      setParticles([...particlesRef.current]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Animation loop to decay particles
    const tick = () => {
      particlesRef.current = particlesRef.current
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - 0.025,
          vy: p.vy + 0.05, // gravity
        }))
        .filter(p => p.life > 0);
      setParticles([...particlesRef.current]);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Custom cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-75"
        style={{
          left: cursorPos.x - 10,
          top: cursorPos.y - 10,
          width: 20,
          height: 20,
          fontSize: 20,
          userSelect: 'none',
        }}
      >
        ⭐
      </div>

      {/* Sparkle particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="fixed pointer-events-none z-[9998] select-none"
          style={{
            left: p.x,
            top: p.y,
            fontSize: p.size,
            opacity: p.life,
            transform: `translate(-50%, -50%) scale(${p.life})`,
            transition: 'none',
          }}
        >
          {p.emoji}
        </div>
      ))}
    </>
  );
};
