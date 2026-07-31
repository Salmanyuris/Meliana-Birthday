import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Flame, ChevronDown, Star, Award, Sparkle } from 'lucide-react';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import finda1 from '../assets/finda-1.jpeg';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  // Dynamically calculate Finda's age (Born Sept 11, 2003)
  const calculateAge = () => {
    const today = new Date();
    const birthYear = 2003;
    let age = today.getFullYear() - birthYear; // 2026 - 2003 = 23
    return age;
  };

  const currentAge = calculateAge(); // 23

  const triggerConfettiBurst = () => {
    sound.playFanfare();
    confetti({
      particleCount: 140,
      spread: 95,
      origin: { y: 0.5 },
      colors: ['#FF69B4', '#FFD700', '#FFD1DC', '#E1BEE7', '#E91E63']
    });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 pb-20 px-4 overflow-hidden">
      
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-pink-300/30 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-300/30 rounded-full filter blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-amber-200/30 rounded-full filter blur-3xl animate-pulse delay-500" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10">
        
        {/* Left Column: Greeting Text & Chapter 23 Concept Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 text-center lg:text-left space-y-6"
        >
          {/* Chapter 23 & Concept Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-extrabold uppercase tracking-wider shadow-md animate-bounce">
              <Award className="w-4 h-4 text-yellow-300" />
              <span>Chapter {currentAge} • Finda's Milestone 🎂</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-100/90 border border-amber-200 text-amber-800 text-xs font-bold shadow-xs">
              <Sparkle className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>Ethereal Celebration ✨</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-pink-100/80 border border-pink-200 text-pink-700 text-xs font-bold shadow-xs">
              <Star className="w-3.5 h-3.5 text-pink-500 fill-pink-400" />
              <span>Sahabat Terbaikku 💖</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-gray-900">
            Selamat Ulang Tahun, <br />
            <span className="shimmer-text">Finda Meliana Putri! 🌸✨</span>
          </h1>

          {/* Subtitle with Chapter 23 Concept */}
          <p className="text-base md:text-lg text-gray-600 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Selamat datang di <strong className="text-pink-600 font-semibold">Chapter {currentAge}</strong>! 23 tahun perjalanan indah yang dipenuhi keceriaan, tawa manis, dan kebaikan hati. Semoga babak baru di usia ke-{currentAge} ini diliputi keberkahan dan kebahagiaan tanpa batas! 💕
          </p>

          {/* Interactive Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            
            <button
              onClick={() => {
                sound.playPop();
                onNavigate('photos');
              }}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-sm shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all flex items-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Lihat Foto & Momen Finda 📸</span>
            </button>

            <button
              onClick={() => {
                sound.playPop();
                triggerConfettiBurst();
                onNavigate('cake');
              }}
              className="px-6 py-3.5 rounded-full bg-white/90 text-pink-700 font-semibold text-sm border border-pink-200 shadow-sm hover:bg-pink-50 hover:scale-105 transition-all flex items-center gap-2 active:scale-95"
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Tiup Lilin Kue 🎂</span>
            </button>

          </div>

          {/* Floating Badges */}
          <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-gray-500 font-medium">
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-pink-100 shadow-xs">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              <span>Dibuat Khusus Untuk Finda</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-pink-100 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Best Friend Forever 🌟</span>
            </div>
          </div>

        </motion.div>

        {/* Right Column: Polaroid Portrait Image Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center relative"
        >
          <div className="relative group w-full max-w-sm md:max-w-md">
            
            {/* Glowing ring behind image */}
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow" />

            {/* Polaroid Card Frame */}
            <div className="relative bg-white rounded-3xl p-4 pb-6 border border-white/90 shadow-2xl overflow-hidden transform rotate-1 group-hover:rotate-0 transition-transform duration-500">
              
              {/* Paper Washi Tape Accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-200/90 border border-white shadow-xs rotate-[-2deg] z-20 rounded-sm" />

              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-inner bg-pink-50">
                <img 
                  src={finda1} 
                  alt="Finda Meliana Putri"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Handwritten Overlay Label */}
              <div className="pt-4 text-center">
                <p className="font-script text-2xl text-pink-600 font-bold">Finda Meliana Putri 🌸</p>
                <p className="text-xs text-gray-500 font-medium">Chapter {currentAge} • Special Edition</p>
              </div>

            </div>

          </div>
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <div 
        onClick={() => onNavigate('photos')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1 text-pink-400 hover:text-pink-600 transition-colors animate-bounce z-20"
      >
        <span className="text-xs font-semibold tracking-wider uppercase">Jelajahi Foto & Momen</span>
        <ChevronDown className="w-5 h-5" />
      </div>

    </section>
  );
};
