import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, RefreshCw, Heart, Send } from 'lucide-react';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

export const BirthdayCake: React.FC = () => {
  const [isFlameLit, setIsFlameLit] = useState<boolean>(true);
  const [wish, setWish] = useState('');
  const [wishSubmitted, setWishSubmitted] = useState(false);

  const blowFlame = () => {
    if (!isFlameLit) return;
    sound.playBlow();
    setIsFlameLit(false);

    // Fanfare & Confetti burst
    setTimeout(() => {
      sound.playFanfare();
      confetti({
        particleCount: 160,
        spread: 110,
        origin: { y: 0.4 },
        colors: ['#FF69B4', '#FFD700', '#FFB6C1', '#9C27B0', '#00E676', '#E91E63']
      });
    }, 200);
  };

  const relightFlame = () => {
    sound.playSparkle();
    setIsFlameLit(true);
    setWishSubmitted(false);
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish.trim()) return;
    sound.playSparkle();
    setWishSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="cake" className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-pink-50/50 via-purple-50/40 to-pink-50/50">
      
      {/* Background Accent Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-pink-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100/90 text-pink-700 text-xs font-bold border border-pink-200 shadow-xs">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
            <span>Momen Virtual Make a Wish</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-gray-900">
            Kue Ulang Tahun & Momen Tiup Lilin 🎂✨
          </h2>
          <p className="text-gray-600 max-w-md mx-auto text-sm md:text-base font-light">
            Klik nyala api lilin di atas kue atau tekan tombol di bawah untuk meniup lilin dan panjatkan permohonan terindahmu!
          </p>
        </div>

        {/* 100% CSS/SVG Birthday Cake Container */}
        <div className="relative flex flex-col items-center justify-center my-10 select-none">
          
          {/* Central Candle & Flame Assembly */}
          <div className="relative flex flex-col items-center z-20 cursor-pointer group" onClick={blowFlame} title={isFlameLit ? "Klik untuk meniup lilin!" : "Lilin padam"}>
            
            {/* Multi-Layered Flame / Smoke */}
            <div className="h-20 flex items-end justify-center relative">
              <AnimatePresence mode="wait">
                {isFlameLit ? (
                  <motion.div
                    key="flame"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0 }}
                    className="relative flex flex-col items-center group-hover:scale-125 transition-transform duration-300"
                  >
                    {/* Outer Glowing Halo */}
                    <div className="absolute -inset-4 bg-amber-400/40 rounded-full blur-md animate-pulse" />

                    {/* Outer Flame (Amber Orange) */}
                    <div className="w-8 h-14 rounded-t-full rounded-b-lg bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 animate-flame-flicker shadow-[0_0_30px_#FF9800] relative flex items-center justify-center">
                      
                      {/* Inner Flame Core (Bright White-Yellow) */}
                      <div className="w-4 h-8 rounded-t-full rounded-b-md bg-gradient-to-t from-amber-300 via-yellow-100 to-white shadow-[0_0_15px_#FFF]" />

                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="smoke"
                    initial={{ opacity: 1, y: 0, scale: 0.5 }}
                    animate={{ opacity: 0, y: -35, scale: 1.8 }}
                    transition={{ duration: 1.4 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-4 h-4 rounded-full bg-gray-400/60 filter blur-xs mb-1" />
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300/40 filter blur-xs" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Candle Wick */}
            <div className="w-1 h-3 bg-gray-700 rounded-t-sm" />

            {/* Single Candle Stick (Pastel Pink-Gold Stripe) */}
            <div className="w-6 md:w-7 h-24 rounded-t-md shadow-md bg-gradient-to-b from-pink-300 via-pink-400 to-rose-400 border-x border-pink-200 relative overflow-hidden flex flex-col items-center">
              {/* Gold Ribbon Stripes */}
              <div className="w-full h-full opacity-40 bg-[linear-gradient(45deg,#FFD700_25%,transparent_25%,transparent_50%,#FFD700_50%,#FFD700_75%,transparent_75%,transparent)] bg-[length:12px_12px]" />
              
              {/* Number 23 Badge Top */}
              <div className="absolute top-3 px-1.5 py-0.5 rounded-full bg-white/90 text-pink-600 text-[10px] font-bold shadow-xs border border-pink-200">
                23
              </div>
            </div>

          </div>

          {/* Pure CSS & SVG 3-Tier Layered Birthday Cake */}
          <div className="relative z-10 mt-[-8px] w-full max-w-sm md:max-w-md flex flex-col items-center">
            
            {/* Top Tier (Strawberry Cream with Cherries) */}
            <div className="relative w-44 md:w-52 h-20 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-2xl shadow-md border-x-2 border-t-2 border-white/80 flex flex-col items-center justify-between overflow-hidden">
              
              {/* Cherries Top Decor */}
              <div className="absolute -top-3 left-0 right-0 flex justify-around px-4 z-20">
                <div className="w-4 h-4 rounded-full bg-rose-600 shadow-sm border border-rose-400" />
                <div className="w-4.5 h-4.5 rounded-full bg-rose-600 shadow-sm border border-rose-400" />
                <div className="w-4 h-4 rounded-full bg-rose-600 shadow-sm border border-rose-400" />
              </div>

              {/* Dripping Vanilla Icing Cream */}
              <svg className="w-full h-7 text-white fill-current opacity-90 drop-shadow-xs" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,0 Q10,18 20,6 Q30,22 40,8 Q50,20 60,7 Q70,22 80,8 Q90,18 100,0 L100,0 L0,0 Z" />
              </svg>

              {/* Gold Pearl Sprinkles */}
              <div className="w-full flex justify-around px-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-amber-300 shadow-xs" />
                <div className="w-2 h-2 rounded-full bg-white shadow-xs" />
                <div className="w-2 h-2 rounded-full bg-amber-300 shadow-xs" />
                <div className="w-2 h-2 rounded-full bg-white shadow-xs" />
              </div>
            </div>

            {/* Middle Tier (Vanilla Cream with Gold Ribbon) */}
            <div className="relative w-60 md:w-72 h-24 bg-gradient-to-b from-rose-200 via-pink-200 to-purple-200 shadow-lg border-x-2 border-white/80 flex flex-col items-center justify-between overflow-hidden mt-[-2px]">
              
              {/* Dripping Icing */}
              <svg className="w-full h-8 text-white fill-current opacity-90 drop-shadow-xs" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,0 Q12,20 25,7 Q37,22 50,8 Q62,24 75,7 Q87,20 100,0 L100,0 L0,0 Z" />
              </svg>

              {/* Center Gold Ribbon Trim */}
              <div className="w-full h-3 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 shadow-xs my-auto border-y border-amber-200 flex items-center justify-center">
                <span className="text-[10px] text-amber-900 font-bold tracking-widest font-script">Finda Meliana Putri</span>
              </div>
            </div>

            {/* Base Tier (Velvet Cake Base with Pearls) */}
            <div className="relative w-76 md:w-92 h-28 bg-gradient-to-b from-pink-400 via-rose-400 to-pink-500 rounded-b-2xl shadow-xl border-x-2 border-b-2 border-white/80 flex flex-col items-center justify-between overflow-hidden mt-[-2px]">
              
              {/* Cream Swags & Drips */}
              <svg className="w-full h-9 text-white fill-current opacity-90 drop-shadow-xs" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,0 Q15,22 30,8 Q45,24 60,8 Q75,22 90,7 Q97,15 100,0 L100,0 L0,0 Z" />
              </svg>

              {/* Decorative Pearls Row */}
              <div className="w-full flex justify-around px-6 mb-3">
                <div className="w-3 h-3 rounded-full bg-amber-300 shadow-xs border border-white" />
                <div className="w-3 h-3 rounded-full bg-white shadow-xs" />
                <div className="w-3 h-3 rounded-full bg-amber-300 shadow-xs border border-white" />
                <div className="w-3 h-3 rounded-full bg-white shadow-xs" />
                <div className="w-3 h-3 rounded-full bg-amber-300 shadow-xs border border-white" />
              </div>
            </div>

            {/* Cake Stand / Silver Plate Base */}
            <div className="w-84 md:w-104 h-6 bg-gradient-to-r from-gray-200 via-white to-gray-300 rounded-full shadow-2xl border border-gray-300 mt-[-4px] flex items-center justify-center">
              <div className="w-full h-1 bg-pink-300/40 rounded-full mx-4" />
            </div>

          </div>

          {/* Status Message Overlay */}
          {!isFlameLit && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-semibold text-sm shadow-xl flex items-center justify-center gap-2 border border-white/40 max-w-md"
            >
              <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
              <span>Lilin ke-23 telah ditiup! Harapan indahmu akan segera terwujud! 🎉</span>
            </motion.div>
          )}

        </div>

        {/* Buttons Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {isFlameLit ? (
            <button
              onClick={blowFlame}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold text-xs shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-yellow-200 fill-yellow-200 animate-pulse" />
              <span>Tiup Lilin Ulang Tahun 💨</span>
            </button>
          ) : (
            <button
              onClick={relightFlame}
              className="px-7 py-3.5 rounded-full bg-pink-100 text-pink-700 font-bold text-xs border border-pink-200 hover:bg-pink-200 hover:scale-105 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Nyalakan Lilin Kembali 🕯️</span>
            </button>
          )}
        </div>

        {/* Wish Input Box */}
        <div className="max-w-md mx-auto pt-6">
          <div className="glass-card p-5 rounded-3xl border border-pink-100 shadow-md">
            <h3 className="text-base font-bold text-gray-800 mb-2 flex items-center justify-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              <span>Tulis Wish & Doamu Di Usia Ke-23</span>
            </h3>

            {!wishSubmitted ? (
              <form onSubmit={handleWishSubmit} className="space-y-3">
                <textarea
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  placeholder="Ketik impian, harapan, atau doa terbaikmu untuk tahun ke-23 ini..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Harapan ke Semesta ✨</span>
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-pink-50 rounded-2xl text-center space-y-2 border border-pink-200"
              >
                <p className="text-xs text-pink-600 font-bold uppercase tracking-wider">Harapanmu Terkirim!</p>
                <p className="text-sm text-gray-700 italic font-script text-xl">"{wish}"</p>
                <p className="text-xs text-gray-500 font-medium">Semoga semesta mendengarkan dan mengabulkan setiap kata impianmu! 🌟</p>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
