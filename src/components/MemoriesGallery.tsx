import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Smile, Sun, Star, Sparkles, Coffee, Feather } from 'lucide-react';
import { sound } from '../utils/sound';

interface MemoryCard {
  id: number;
  title: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  quote: string;
  defaultHearts: number;
}

export const MemoriesGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [heartCounts, setHeartCounts] = useState<{ [key: number]: number }>({
    1: 42,
    2: 58,
    3: 39,
    4: 65,
    5: 50,
    6: 77
  });

  const memoryCards: MemoryCard[] = [
    {
      id: 1,
      title: "Senyuman Hangat Yang Menenangkan 🌸",
      category: "Kepribadian",
      icon: <Smile className="w-6 h-6 text-pink-500" />,
      description: "Tawa dan senyum ceriamu selalu mampu mengubah suasana hati siapa saja menjadi lebih hangat dan bahagia.",
      quote: "Senyummu adalah sinar matahari terbaik di hari yang mendung.",
      defaultHearts: 42
    },
    {
      id: 2,
      title: "Kebaikan Hati Tanpa Pamrih ✨",
      category: "Kepribadian",
      icon: <Heart className="w-6 h-6 text-rose-500 fill-rose-100" />,
      description: "Empati dan keperdulianmu kepada orang-orang di sekitarmu adalah kualitas yang luar biasa indah.",
      quote: "Kebaikan kecilmu selalu meninggalkan jejak indah yang tak terlupakan.",
      defaultHearts: 58
    },
    {
      id: 3,
      title: "Semangat Pembelajar & Kerja Keras 🌟",
      category: "Impian & Harapan",
      icon: <Star className="w-6 h-6 text-amber-500" />,
      description: "Setiap langkah dan perjuanganmu dalam meraih impian sangat menginspirasi. Tetaplah bersinar dengan caramu!",
      quote: "Hasil tak pernah mengkhianati dedikasi luar biasa yang kamu berikan.",
      defaultHearts: 39
    },
    {
      id: 4,
      title: "Momen Obrolan Seru Tanpa Waktu ☕",
      category: "Momen Manis",
      icon: <Coffee className="w-6 h-6 text-amber-700" />,
      description: "Saat-saat berbagi cerita, bertukar ide, dan tertawa bersama adalah kenangan manis yang selalu dirindukan.",
      quote: "Waktu berlalu begitu cepat saat kita sedang tertawa bersama.",
      defaultHearts: 65
    },
    {
      id: 5,
      title: "Ketangguhan Dalam Setiap Rintangan 🛡️",
      category: "Kepribadian",
      icon: <Sun className="w-6 h-6 text-orange-500" />,
      description: "Kamu adalah pribadi yang kuat dan tak mudah menyerah. Setiap ujian yang berhasil kamu lewati membuktikan ketangguhanmu.",
      quote: "Kamu lebih kuat dari yang kamu bayangkan, dan lebih hebat dari yang kamu sadari.",
      defaultHearts: 50
    },
    {
      id: 6,
      title: "Cita-Cita Masa Depan Yang Cerah 🕊️",
      category: "Impian & Harapan",
      icon: <Feather className="w-6 h-6 text-indigo-500" />,
      description: "Semoga di usia yang baru ini, setiap tangga menuju impianmu terbuka lebar dengan segala kemudahan.",
      quote: "Masa depan indah sedang menantikan setiap karya dan senyumanmu.",
      defaultHearts: 77
    }
  ];

  const categories = ['Semua', 'Kepribadian', 'Momen Manis', 'Impian & Harapan'];

  const filteredCards = activeCategory === 'Semua' 
    ? memoryCards 
    : memoryCards.filter(c => c.category === activeCategory);

  const addHeart = (id: number) => {
    sound.playPop();
    setHeartCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <section id="memories" className="py-20 px-4 relative bg-pink-50/30">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Section Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>Alasan Mengapa Kamu Begitu Istimewa</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-gray-900">
            Galeri Kenangan & Apresiasi 💖
          </h2>
          <p className="text-gray-600 max-w-md mx-auto text-sm md:text-base">
            Beberapa hal indah tentang Finda yang membuat hari ini dan setiap hari terasa jauh lebih bermakna.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playPop();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-pink-500 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-pink-100 hover:bg-pink-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-6 border border-white/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center">
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 bg-pink-50 text-pink-700 rounded-full border border-pink-100">
                    {card.category}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-gray-800">
                  {card.title}
                </h3>

                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  {card.description}
                </p>

                <div className="p-3 bg-pink-50/70 rounded-xl border border-pink-100 text-xs italic text-pink-800">
                  "{card.quote}"
                </div>
              </div>

              {/* Heart reaction button */}
              <div className="pt-4 border-t border-pink-100/60 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Beri Cinta Hari Ini:</span>
                <button
                  onClick={() => addHeart(card.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 text-xs font-semibold transition-all active:scale-110"
                >
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
                  <span>{heartCounts[card.id] || 0} Love</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
