import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 border-t border-pink-100 bg-white/70 backdrop-blur-md relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center text-center space-y-4">
        
        <div 
          onClick={() => {
            sound.playSparkle();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <Heart className="w-5 h-5 fill-white animate-pulse" />
          </div>
          <span className="font-extrabold text-xl text-gray-900">
            Finda Meliana Putri 🌸
          </span>
        </div>

        <p className="text-xs text-gray-500 max-w-md font-light">
          11 September 2003 • Website Hadiah Spesial Ulang Tahun Dibuat Khusus Dari Sahabat Terbaik. Semoga Hari-Harimu Selalu Dipenuhi Keceriaan! 💖✨
        </p>

        <div className="flex items-center gap-1.5 text-xs text-pink-600 font-semibold bg-pink-50 px-4 py-1.5 rounded-full border border-pink-100">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Happy Birthday Finda! Keep Shining & Smiling!</span>
        </div>

        <div className="pt-4 text-[10px] text-gray-400">
          © {new Date().getFullYear()} Finda Meliana Putri Birthday Edition • Best Friend Forever
        </div>

      </div>
    </footer>
  );
};
