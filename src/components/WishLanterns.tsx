import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Flame, X, Heart, Wind } from 'lucide-react';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface Lantern {
  id: number;
  name: string;
  message: string;
  left: number;
  speed: number;
  delay: number;
}

const LANTERN_COLORS = [
  { body: 'from-amber-400 via-orange-400 to-yellow-300', glow: '#FFA000', flame: '#FFD740' },
  { body: 'from-rose-400 via-pink-400 to-rose-300', glow: '#F06292', flame: '#FF80AB' },
  { body: 'from-violet-400 via-purple-400 to-indigo-300', glow: '#9C27B0', flame: '#E040FB' },
  { body: 'from-cyan-400 via-teal-400 to-emerald-300', glow: '#00BCD4', flame: '#80DEEA' },
];

export const WishLanterns: React.FC = () => {
  const [lanterns, setLanterns] = useState<Lantern[]>([
    { id: 1, name: "Sahabat Terbaik", message: "Semoga Finda di usia ke-23 selalu diberikan kesehatan, kelancaran rezeki, dan kebahagiaan tanpa batas! 💖", left: 12, speed: 18, delay: 0 },
    { id: 2, name: "Keluarga Warmth", message: "Happy 23th Birthday Finda Meliana Putri! Tetaplah menjadi sosok yang membanggakan dan baik hati. 🌸", left: 38, speed: 22, delay: 4 },
    { id: 3, name: "Secret Admirer", message: "Semoga tahun ke-23 ini membawa banyak kejutan manis dan kesempatan impian yang terwujud! ✨", left: 63, speed: 20, delay: 7 },
    { id: 4, name: "Bestie Forever", message: "Barakallah fii umrik Finda! Sukses terus buat semua rencana besar di usia yang baru! 🎂", left: 82, speed: 25, delay: 2 },
  ]);

  const [inputName, setInputName] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [activeLantern, setActiveLantern] = useState<Lantern | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim() || !inputMessage.trim()) return;

    setIsSubmitting(true);
    sound.playSparkle();
    confetti({
      particleCount: 80,
      spread: 70,
      colors: ['#FFA000', '#F06292', '#9C27B0', '#FFD700'],
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      const newLantern: Lantern = {
        id: Date.now(),
        name: inputName.trim(),
        message: inputMessage.trim(),
        left: Math.floor(Math.random() * 72) + 8,
        speed: Math.floor(Math.random() * 10) + 16,
        delay: 0,
      };
      setLanterns((prev) => [...prev, newLantern]);
      setInputName('');
      setInputMessage('');
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <section id="wishes" className="relative overflow-hidden py-20 px-4" style={{ minHeight: '100vh' }}>

      {/* ── Background ── */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #0A0515 0%, #150A28 35%, #1C0D38 65%, #0F0820 100%)'
      }} />
      {/* Stars */}
      {[...Array(35)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: i % 5 === 0 ? 2 : 1,
            height: i % 5 === 0 ? 2 : 1,
            top: `${(i * 37 + 11) % 100}%`,
            left: `${(i * 53 + 7) % 100}%`,
          }}
          animate={{ opacity: [0.08, 0.7, 0.08] }}
          transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: (i * 0.3) % 4 }}
        />
      ))}
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(255,160,0,0.07) 0%, transparent 70%)'
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgba(168,85,247,0.08), transparent)'
      }} />

      {/* ── Floating Lanterns ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {lanterns.map((l, idx) => {
          const palette = LANTERN_COLORS[idx % LANTERN_COLORS.length];
          return (
            <div
              key={l.id}
              onClick={() => { sound.playPop(); setActiveLantern(l); }}
              className="absolute pointer-events-auto cursor-pointer flex flex-col items-center select-none"
              style={{
                left: `${l.left}%`,
                bottom: '-80px',
                animation: `floatUpLantern ${l.speed}s ${l.delay}s linear infinite`,
              }}
            >
              {/* Lantern Body */}
              <div
                className={`relative w-10 h-14 md:w-12 md:h-16 rounded-t-[45%] rounded-b-[30%] bg-gradient-to-b ${palette.body} flex flex-col items-center justify-between py-2 transition-transform hover:scale-125 duration-300`}
                style={{
                  boxShadow: `0 0 20px ${palette.glow}99, 0 0 45px ${palette.glow}44, inset 0 1px 0 rgba(255,255,255,0.3)`,
                  border: '1px solid rgba(255,255,255,0.25)',
                }}
              >
                <Sparkles className="w-2.5 h-2.5 text-white/70" />
                {/* Flame glow dot */}
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: palette.flame,
                    boxShadow: `0 0 12px ${palette.flame}, 0 0 25px ${palette.glow}`,
                    animation: 'flickerDot 0.8s ease-in-out infinite alternate',
                  }}
                />
                {/* Shine */}
                <div className="absolute top-1 left-1 w-1/3 h-1/2 rounded-full bg-white/20 blur-sm" />
              </div>
              {/* String */}
              <div className="w-px h-3 bg-white/20" />
              {/* Name Tag */}
              <div
                className="px-2 py-0.5 rounded-full text-[9px] font-semibold whitespace-nowrap mt-0.5"
                style={{
                  background: 'rgba(0,0,0,0.55)',
                  border: `1px solid ${palette.glow}55`,
                  color: palette.flame,
                  backdropFilter: 'blur(4px)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {l.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Content ── */}
      <div className="relative z-20 max-w-2xl mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 pt-6">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              background: 'rgba(255,160,0,0.12)',
              border: '1px solid rgba(255,160,0,0.3)',
              color: '#FFD080',
              backdropFilter: 'blur(12px)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" style={{ animation: 'flickerIcon 1.2s ease-in-out infinite alternate' }} />
            Terbangkan Lampion Harapan
            <Wind className="w-3.5 h-3.5 text-amber-300" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white text-center leading-tight px-2"
          >
            Lampion{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FFD080, #FF9040, #FF6090)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Doa & Harapan
            </span>
            <br />
            <span className="text-white">Untuk Finda ✨</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/45 text-sm md:text-base max-w-md text-center leading-relaxed"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400 }}
          >
            Tulis nama & ucapan doamu. Lampionmu akan melayang tinggi menerangi malam ulang tahun ke‑23 Finda 🌙
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255,160,0,0.22)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,160,0,0.08), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          {/* Card Header */}
          <div
            className="px-6 py-4 flex items-center gap-3 border-b"
            style={{ borderColor: 'rgba(255,160,0,0.15)' }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,160,0,0.18)', border: '1px solid rgba(255,160,0,0.3)' }}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p
                className="text-white font-bold text-sm"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
              >
                Tulis Wish & Terbangkan Lampion
              </p>
              <p
                className="text-white/35 text-xs mt-0.5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {lanterns.length} lampion sudah mengudara 🌟
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 flex flex-col gap-4">
            {/* Name input */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-white/50 text-xs font-semibold uppercase tracking-wider"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Nama Pengirim
              </label>
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Tulis namamu di sini..."
                maxLength={40}
                className="w-full px-4 py-3 rounded-2xl text-white text-sm placeholder-white/25 outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                onFocus={(e) => { e.target.style.border = '1px solid rgba(255,160,0,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(255,160,0,0.08)'; }}
                onBlur={(e) => { e.target.style.border = '1px solid rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            {/* Message input */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-white/50 text-xs font-semibold uppercase tracking-wider"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Pesan & Doa untuk Finda
              </label>
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Tuliskan doa terbaikmu untuk Finda di usia ke-23..."
                maxLength={200}
                rows={3}
                className="w-full px-4 py-3 rounded-2xl text-white text-sm placeholder-white/25 outline-none transition-all duration-300 resize-none"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                onFocus={(e) => { e.target.style.border = '1px solid rgba(255,160,0,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(255,160,0,0.08)'; }}
                onBlur={(e) => { e.target.style.border = '1px solid rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'none'; }}
              />
              <p className="text-right text-white/20 text-[10px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {inputMessage.length}/200
              </p>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting || !inputName.trim() || !inputMessage.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #FFAA30, #FF6B5A)',
                boxShadow: '0 8px 25px rgba(255,160,0,0.35)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                letterSpacing: '0.02em',
                color: '#fff',
              }}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isSubmitting ? 'Menerbangkan Lampion...' : 'Terbangkan Lampion ke Langit 🚀'}
            </motion.button>
          </form>
        </motion.div>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 pb-4"
        >
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 flex-shrink-0" />
          <p
            className="text-white/30 text-xs text-center"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Klik lampion yang melayang untuk membaca pesan ucapan sahabat!
          </p>
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 flex-shrink-0" />
        </motion.div>

      </div>

      {/* ── Modal Lantern Message ── */}
      <AnimatePresence>
        {activeLantern && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
            style={{ background: 'rgba(5,2,15,0.88)', backdropFilter: 'blur(20px)' }}
            onClick={(e) => e.target === e.currentTarget && (sound.playPop(), setActiveLantern(null))}
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="w-full max-w-sm rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(255,160,0,0.30)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(255,160,0,0.1), inset 0 1px 0 rgba(255,255,255,0.12)',
              }}
            >
              {/* Modal top bar */}
              <div
                className="px-5 py-4 flex items-center justify-between border-b"
                style={{ borderColor: 'rgba(255,160,0,0.15)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(255,160,0,0.15)', border: '1px solid rgba(255,160,0,0.3)' }}
                  >
                    <Flame className="w-4.5 h-4.5 text-amber-400" />
                  </div>
                  <div>
                    <p
                      className="text-white font-bold text-sm"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
                    >
                      {activeLantern.name}
                    </p>
                    <p
                      className="text-white/35 text-xs"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Lampion Harapan 🌟
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => { sound.playPop(); setActiveLantern(null); }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>

              {/* Message */}
              <div className="p-5">
                <div
                  className="relative p-5 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="absolute top-2 left-3 text-amber-400/20 text-5xl font-serif leading-none">"</div>
                  <p
                    className="text-amber-100/80 text-base leading-relaxed relative z-10 text-center py-2"
                    style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.1rem', lineHeight: '1.75' }}
                  >
                    {activeLantern.message}
                  </p>
                  <div className="absolute bottom-0 right-3 text-amber-400/20 text-5xl font-serif leading-none">"</div>
                </div>
              </div>

              {/* Close btn */}
              <div className="px-5 pb-5">
                <button
                  onClick={() => { sound.playPop(); setActiveLantern(null); }}
                  className="w-full py-3 rounded-2xl text-sm font-bold transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #FFAA30, #FF8060)',
                    color: 'white',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    boxShadow: '0 6px 20px rgba(255,160,0,0.3)',
                  }}
                >
                  Tutup Pesan 🌸
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyframes via style tag */}
      <style>{`
        @keyframes floatUpLantern {
          0%   { transform: translateY(0px) rotate(0deg); opacity: 0; }
          5%   { opacity: 0.9; }
          90%  { opacity: 0.85; }
          100% { transform: translateY(-110vh) rotate(8deg); opacity: 0; }
        }
        @keyframes flickerDot {
          0%   { opacity: 0.8; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1.12); }
        }
        @keyframes flickerIcon {
          0%   { opacity: 0.7; transform: scale(0.97); }
          100% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
};
