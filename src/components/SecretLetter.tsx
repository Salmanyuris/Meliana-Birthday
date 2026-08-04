import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, Check, Copy } from 'lucide-react';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

export const SecretLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleLetter = () => {
    if (!isOpen) {
      sound.playSparkle();
      confetti({
        particleCount: 95,
        spread: 85,
        origin: { y: 0.5 },
        colors: ['#FF69B4', '#FFD700', '#E1BEE7']
      });
    } else {
      sound.playPop();
    }
    setIsOpen(!isOpen);
  };

  const copyLetter = () => {
    sound.playPop();
    const text = `Surat Ulang Tahun Untuk Finda Meliana Putri 🌸\n\nSelamat Ulang Tahun yang Ke-23, Finda! 🎂✨\nSemoga usiamu yang baru diliputi keberkahan, kebahagiaan tanpa batas, kesehatan yang melimpah, serta tercapainya seluruh impian indahmu. Teruslah menjadi sosok sahabat yang hangat, ceria, dan membawa senyuman di mana pun kamu berada. Kamu sangat berharga! 💕`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="letter" className="py-20 px-4 relative">
      <div className="max-w-3xl mx-auto space-y-8 text-center">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
            <Mail className="w-4 h-4 text-rose-500" />
            <span>Pesan Tulus Sahabat Terbaik</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-gray-900">
            Surat Ulang Tahun Ke-23 Spesial 💌
          </h2>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Klik amplop di bawah ini untuk membuka pesan hangat yang ditulis khusus untuk merayakan usiamu yang baru.
          </p>
        </div>

        {/* Envelope Container */}
        <div className="flex justify-center py-6">
          <motion.div
            whileHover={{ scale: 1.05, rotate: isOpen ? 0 : 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLetter}
            className="relative cursor-pointer group w-72 md:w-80 h-48 bg-gradient-to-tr from-pink-400 to-rose-400 rounded-2xl shadow-2xl p-4 border border-white/40 flex flex-col items-center justify-between overflow-hidden"
          >
            {/* Wax Seal */}
            <div className="w-14 h-14 rounded-full bg-rose-600 border-2 border-amber-300 shadow-lg flex items-center justify-center text-amber-200 z-20 group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 fill-rose-300" />
            </div>

            <div className="text-white text-center z-20">
              <p className="font-heading font-bold text-lg">Untuk: Finda Meliana Putri 💖</p>
              <p className="text-xs text-pink-100 opacity-90 font-medium">
                {isOpen ? 'Klik untuk menutup surat' : 'Klik untuk membuka surat 💌'}
              </p>
            </div>

            {/* Envelope Flap Lines */}
            <div className="absolute inset-0 border-t-[90px] border-t-pink-300/40 border-x-[140px] border-x-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Unfolded Letter Display */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-6 md:p-10 border border-white shadow-2xl text-left relative max-w-2xl mx-auto space-y-6 bg-amber-50/95"
            >
              <div className="flex items-center justify-between border-b border-pink-200/60 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-2xl text-pink-800">
                    Selamat Ulang Tahun Ke-23, Finda! 🌸
                  </h3>
                  <p className="text-xs text-gray-500 font-bold">23 Tahun Penuh Keindahan • Special Edition</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* Handwriting Letter Body */}
              <div className="font-script text-xl md:text-2xl text-gray-800 leading-relaxed space-y-4">
                <p>Dear Finda Meliana Putri,</p>
                <p>
                  Selamat ulang tahun yang ke-23 untuk sosok sahabat yang luar biasa! Di momen teristimewa ini, doa-doa terbaik mengalir khusus untukmu. Semoga di usiamu yang ke-23 ini, setiap hari selalu diliputi kebahagiaan sejati, kesehatan yang prima, kedamaian hati, dan kemudahan dalam meraih setiap cita-citamu.
                </p>
                <p>
                  Terima kasih telah menjadi sahabat yang selalu ada, membawa keceriaan dengan tawa manismu, dan selalu memberikan kehangatan di mana pun kamu berada. Kehadiranmu sungguh sangat berarti!
                </p>
                <p>
                  Semoga seluruh impian dan harapan indah yang kamu inginkan satu per satu terwujud menjadi kenyataan manis di tahun ini. Tetaplah menjadi Finda yang ceria, tangguh, dan bersinar dengan caramu sendiri! 💕
                </p>
                <p className="text-right pt-4">
                  Dengan penuh rasa syukur & cinta, <br />
                  <span className="text-pink-600 font-bold">Salman Yuris 💖✨</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-pink-200/60 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={copyLetter}
                  className="px-4 py-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Surat Tersalin!' : 'Salin Pesan Surat'}</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  Simpan Surat 💖
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
