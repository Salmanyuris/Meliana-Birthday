import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const WelcomeConfetti: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // First burst
      confetti({
        particleCount: 120,
        spread: 120,
        origin: { y: 0.4, x: 0.3 },
        colors: ['#FF69B4', '#FFD700', '#FFD1DC', '#E1BEE7', '#E91E63', '#FF85B3'],
        scalar: 1.2,
      });

      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.4, x: 0.7 },
          colors: ['#FF69B4', '#FFD700', '#FFD1DC', '#E1BEE7', '#E91E63'],
          scalar: 1.2,
        });
      }, 300);

      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.3, x: 0.5 },
          colors: ['#FF69B4', '#FFD700', '#FFD1DC', '#E1BEE7', '#E91E63'],
          scalar: 1.4,
          shapes: ['star'],
        });
      }, 600);

      // Rainbow side cannons
      setTimeout(() => {
        const end = Date.now() + 2000;
        const frame = () => {
          confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#FF69B4', '#FFD700', '#FFD1DC', '#E1BEE7', '#E91E63'],
          });
          confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#FF69B4', '#FFD700', '#FFD1DC', '#E1BEE7', '#E91E63'],
          });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
      }, 1000);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return null;
};
