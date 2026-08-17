import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, X, Heart, Compass, Award, Star, Zap } from 'lucide-react';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface GiftItem {
  id: number;
  title: string;
  category: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  glowColor: string;
  accentColor: string;
  badge: string;
  message: string;
  voucherCode: string;
  emoji: string;
}

export const UnwrapGifts: React.FC = () => {
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);

  const gifts: GiftItem[] = [
    {
      id: 1,
      title: "Voucher Senyum Bahagia",
      category: "Voucher Teman",
      icon: <Heart className="w-9 h-9 text-white fill-white/60" />,
      gradientFrom: "#FF6B9D",
      gradientTo: "#FF8FA3",
      glowColor: "rgba(255,107,157,0.4)",
      accentColor: "#FF6B9D",
      badge: "Berlaku Selamanya 💫",
      message: "Voucher ini memberimu hak atas kebahagiaan tanpa batas di usiamu yang ke-23! Setiap kali merasa lelah, voucher ini menjamin cerita hangat, dukungan penuh, dan pelukan semangat terbaik untuk Meli.",
      voucherCode: "MELI-HAPPY-23TH",
      emoji: "🌸",
    },
    {
      id: 2,
      title: "Buket Bunga Abadi",
      category: "Apresiasi Tulus",
      icon: <Sparkles className="w-9 h-9 text-white" />,
      gradientFrom: "#FFAA40",
      gradientTo: "#FF7DC6",
      glowColor: "rgba(255,170,64,0.4)",
      accentColor: "#FFAA40",
      badge: "Simbol Keindahan 🌺",
      message: "Bunga ini melambangkan betapa berharganya kehadiranmu bagi teman dan sekitarmu. Semoga di usia ke-23 ini hidupmu semakin mekar dan penuh keberkahan.",
      voucherCode: "BLOOM-AGE-23",
      emoji: "💐",
    },
    {
      id: 3,
      title: "Dessert Date & Kulineran",
      category: "Hadiah Kejutan",
      icon: <Compass className="w-9 h-9 text-white" />,
      gradientFrom: "#A855F7",
      gradientTo: "#6366F1",
      glowColor: "rgba(168,85,247,0.4)",
      accentColor: "#A855F7",
      badge: "Tiket Bebas Pilih ✨",
      message: "Bebas klaim hari untuk jalan-jalan santai, ngopi manis, makan dessert favorit, dan nongkrong seru tanpa batasan waktu!",
      voucherCode: "DESSERT-DAY-MELI",
      emoji: "🍰",
    },
    {
      id: 4,
      title: "Peti Doa & Impian",
      category: "Doa Terbaik",
      icon: <Award className="w-9 h-9 text-white" />,
      gradientFrom: "#F59E0B",
      gradientTo: "#EF4444",
      glowColor: "rgba(245,158,11,0.4)",
      accentColor: "#F59E0B",
      badge: "Restu Semesta 🌟",
      message: "Semoga setiap impian dan cita-cita Meli di usia ke-23 tercapai dengan kelancaran yang indah tak terduga. Kamu layak mendapatkan semua yang terbaik di dunia ini!",
      voucherCode: "BLESSINGS-AGE23",
      emoji: "🌟",
    },
  ];

  const handleOpenGift = (gift: GiftItem) => {
    sound.playSparkle();
    confetti({
      particleCount: 100,
      spread: 80,
      colors: ['#FF6B9D', '#FFAA40', '#A855F7', '#F59E0B', '#FFD700'],
      origin: { y: 0.5 },
    });
    if (!openedGifts.includes(gift.id)) setOpenedGifts([...openedGifts, gift.id]);
    setSelectedGift(gift);
  };

  return (
    <section id="gifts" className="relative overflow-hidden py-20 px-4">

      {/* ── Background — selaras dengan WishLanterns ── */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #0F0820 0%, #1A0A35 40%, #150A28 100%)' }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 50% at 20% 20%, rgba(168,85,247,0.12) 0%, transparent 60%)',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 80% 80%, rgba(255,107,157,0.10) 0%, transparent 60%)',
      }} />

      {/* Stars */}
      {[...Array(22)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: 1.5,
            height: 1.5,
            top: `${(i * 41 + 13) % 100}%`,
            left: `${(i * 59 + 17) % 100}%`,
          }}
          animate={{ opacity: [0.05, 0.6, 0.05] }}
          transition={{ duration: 2.5 + (i % 3), repeat: Infinity, delay: (i * 0.4) % 5 }}
        />
      ))}

      {/* Floating orbs */}
      <motion.div
        className="absolute top-16 left-[8%] w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.25, 1], x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-16 right-[8%] w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.18, 1], x: [0, -18, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(12px)',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            Spesial Kado Ulang Tahun Ke-23
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white leading-tight"
          >
            Kotak Kado &{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FFAA40, #FF6B9D, #A855F7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Hadiah Kejutan
            </span>{' '}
            🎁
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-md text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400 }}
          >
            Pilih dan klik kotak kado untuk membuka kejutan manis yang disiapkan khusus untuk Meli!
          </motion.p>
        </div>

        {/* ── Gift Cards Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {gifts.map((gift, idx) => {
            const isOpened = openedGifts.includes(gift.id);
            return (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.09 }}
                whileHover={{ scale: 1.04, y: -5 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpenGift(gift)}
                className="relative cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden group flex flex-col"
                style={{
                  minHeight: '220px',
                  background: isOpened
                    ? `linear-gradient(145deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 100%)`
                    : `linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)`,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: isOpened
                    ? `1px solid ${gift.accentColor}55`
                    : '1px solid rgba(255,255,255,0.12)',
                  boxShadow: isOpened
                    ? `0 16px 50px ${gift.glowColor}, 0 0 0 1px ${gift.accentColor}20, inset 0 1px 0 rgba(255,255,255,0.12)`
                    : '0 8px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${gift.glowColor} 0%, transparent 70%)` }}
                />

                {/* Top badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span
                    className="text-white text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-1 rounded-full uppercase tracking-wide"
                    style={{
                      background: isOpened
                        ? `linear-gradient(135deg, ${gift.gradientFrom}, ${gift.gradientTo})`
                        : 'rgba(255,255,255,0.10)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(8px)',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {isOpened ? '✨ Open' : '🎁 Tap'}
                  </span>
                </div>

                {/* Emoji (when opened) */}
                {isOpened && (
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute top-3 left-3 text-lg sm:text-xl z-10"
                  >
                    {gift.emoji}
                  </motion.div>
                )}

                {/* Card body — flex grow center */}
                <div className="flex-1 flex flex-col items-center justify-center gap-3 px-4 pt-10 pb-4">
                  {/* Icon */}
                  <motion.div
                    animate={!isOpened ? { y: [0, -7, 0] } : {}}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center relative flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${gift.gradientFrom}, ${gift.gradientTo})`,
                      boxShadow: `0 8px 28px ${gift.glowColor}, inset 0 1px 0 rgba(255,255,255,0.22)`,
                    }}
                  >
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
                    </div>
                    {isOpened ? (
                      gift.icon
                    ) : (
                      <motion.div
                        animate={{ rotate: [0, 6, -6, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      >
                        <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Text */}
                  <div className="text-center space-y-1">
                    <h3
                      className="text-white font-bold leading-tight text-sm sm:text-base"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
                    >
                      {isOpened ? gift.title : `Kado #${gift.id}`}
                    </h3>
                    <p
                      className="text-white/40 text-[10px] sm:text-xs"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {isOpened ? gift.category : 'Tap untuk buka!'}
                    </p>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div
                  className="flex items-center justify-center px-4 py-3 border-t"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <span
                    className="text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      background: isOpened
                        ? `${gift.accentColor}22`
                        : `linear-gradient(135deg, ${gift.gradientFrom}, ${gift.gradientTo})`,
                      color: 'white',
                      border: isOpened ? `1px solid ${gift.accentColor}44` : 'none',
                      boxShadow: isOpened ? 'none' : `0 4px 14px ${gift.glowColor}`,
                    }}
                  >
                    {isOpened ? 'Lihat Voucher 🎀' : 'Buka Sekarang ✨'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress dots */}
        {openedGifts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="flex gap-2">
              {gifts.map((gift) => (
                <div
                  key={gift.id}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-500"
                  style={{
                    background: openedGifts.includes(gift.id)
                      ? `linear-gradient(135deg, ${gift.gradientFrom}, ${gift.gradientTo})`
                      : 'rgba(255,255,255,0.18)',
                    boxShadow: openedGifts.includes(gift.id) ? `0 0 8px ${gift.glowColor}` : 'none',
                  }}
                />
              ))}
            </div>
            <span
              className="text-white/35 text-xs"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {openedGifts.length}/{gifts.length} kado dibuka
            </span>
          </motion.div>
        )}

        {/* All opened message */}
        {openedGifts.length === gifts.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
          >
            <div
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-white text-xs sm:text-sm font-bold"
              style={{
                background: 'linear-gradient(135deg, rgba(255,170,64,0.18), rgba(255,107,157,0.18))',
                border: '1px solid rgba(255,215,0,0.25)',
                backdropFilter: 'blur(12px)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Semua hadiah dibuka! Semoga semuanya terwujud 💖</span>
              <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
            style={{ background: 'rgba(5,2,15,0.90)', backdropFilter: 'blur(24px)' }}
            onClick={(e) => e.target === e.currentTarget && (sound.playPop(), setSelectedGift(null))}
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="w-full max-w-sm rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.04) 100%)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: `1px solid ${selectedGift.accentColor}40`,
                boxShadow: `0 30px 80px rgba(0,0,0,0.55), 0 0 60px ${selectedGift.glowColor}, inset 0 1px 0 rgba(255,255,255,0.13)`,
              }}
            >
              {/* Gradient Header */}
              <div
                className="relative h-40 flex items-center justify-center overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${selectedGift.gradientFrom}CC, ${selectedGift.gradientTo}CC)` }}
              >
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.22) 0%, transparent 45%), radial-gradient(circle at 75% 50%, rgba(255,255,255,0.15) 0%, transparent 45%)',
                }} />
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/18 to-transparent" />

                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 340, damping: 20, delay: 0.08 }}
                  className="w-18 h-18 rounded-2xl flex items-center justify-center relative z-10 w-[72px] h-[72px]"
                  style={{
                    background: 'rgba(255,255,255,0.22)',
                    border: '1px solid rgba(255,255,255,0.32)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 8px 28px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.35)',
                  }}
                >
                  {selectedGift.icon}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.28 }}
                  className="absolute top-4 left-5 text-2xl"
                >
                  {selectedGift.emoji}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                  className="absolute bottom-3 left-0 right-0 flex justify-center"
                >
                  <span
                    className="px-3 py-1 rounded-full text-white text-[10px] font-bold"
                    style={{
                      background: 'rgba(255,255,255,0.16)',
                      border: '1px solid rgba(255,255,255,0.28)',
                      backdropFilter: 'blur(6px)',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      letterSpacing: '0.04em',
                    }}
                  >
                    {selectedGift.badge}
                  </span>
                </motion.div>

                <button
                  onClick={() => { sound.playPop(); setSelectedGift(null); }}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-all"
                  style={{ background: 'rgba(0,0,0,0.22)', border: '1px solid rgba(255,255,255,0.18)' }}
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-4">
                <motion.h3
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  className="text-xl font-extrabold text-white text-center"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
                >
                  {selectedGift.title}
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                  className="relative p-4 rounded-2xl text-center overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}
                >
                  <div className="absolute top-1.5 left-2.5 text-white/15 text-4xl font-serif leading-none">"</div>
                  <p
                    className="text-white/70 text-sm leading-relaxed relative z-10 py-1"
                    style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.05rem', lineHeight: '1.72' }}
                  >
                    {selectedGift.message}
                  </p>
                  <div className="absolute bottom-0 right-2.5 text-white/15 text-4xl font-serif leading-none">"</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24 }}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(12,8,30,0.95), rgba(20,12,45,0.95))',
                    border: `1px solid ${selectedGift.accentColor}28`,
                  }}
                >
                  <div className="px-4 py-2 border-b text-center" style={{ borderColor: `${selectedGift.accentColor}18` }}>
                    <p
                      className="text-[9px] uppercase tracking-[0.2em] text-white/30"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Kode Voucher Spesial
                    </p>
                  </div>
                  <div className="px-4 py-2.5 text-center">
                    <p
                      className="text-sm font-extrabold tracking-[0.12em]"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', monospace",
                        fontWeight: 800,
                        background: `linear-gradient(135deg, ${selectedGift.gradientFrom}, ${selectedGift.gradientTo})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {selectedGift.voucherCode}
                    </p>
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { sound.playPop(); setSelectedGift(null); }}
                  className="w-full py-3.5 rounded-2xl text-white text-sm font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${selectedGift.gradientFrom}, ${selectedGift.gradientTo})`,
                    boxShadow: `0 8px 24px ${selectedGift.glowColor}`,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    letterSpacing: '0.03em',
                  }}
                >
                  Simpan Hadiah Ini 💖
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
