import React, { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  symbol: string;
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  opacity: number;
}

export const FloatingHearts: React.FC = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const symbols = ['💖', '🌸', '✨', '💕', '🌷', '🎀', '🎈', '⭐'];
    const generated: FloatingElement[] = [];

    for (let i = 0; i < 22; i++) {
      generated.push({
        id: i,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        left: Math.random() * 95,
        size: Math.floor(Math.random() * 16) + 14,
        duration: Math.random() * 10 + 12,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.4 + 0.3
      });
    }

    setElements(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float-heart select-none"
          style={{
            left: `${el.left}%`,
            fontSize: `${el.size}px`,
            opacity: el.opacity,
            animationDuration: `${el.duration}s`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.symbol}
        </div>
      ))}
    </div>
  );
};
