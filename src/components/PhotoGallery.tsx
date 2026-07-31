import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Camera, ZoomIn } from 'lucide-react';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

import finda1 from '../assets/finda-1.jpeg';
import finda2 from '../assets/finda-2.jpeg';
import finda3 from '../assets/finda-3.jpeg';
import finda4 from '../assets/finda-4.jpeg';
import finda5 from '../assets/finda-5.jpeg';
import finda6 from '../assets/finda-6.jpeg';
import finda7 from '../assets/finda-7.jpeg';
import finda8 from '../assets/finda-8.jpeg';

interface PhotoItem {
  id: number;
  src: string;
  title: string;
  category: string;
  badgeTag: string;
  caption: string;
  locationTag: string;
  rotation: string;
  tapeColor: string;
  defaultLikes: number;
}

export const PhotoGallery: React.FC = () => {
  const photos: PhotoItem[] = [
    {
      id: 1,
      src: finda1,
      title: "Senyum Manis Finda 🌸",
      category: "Senyum Manis",
      badgeTag: "Favorit ✨",
      caption: "Potret ceria Finda yang selalu bikin suasana hangat & penuh tawa!",
      locationTag: "Momen Spesial 💖",
      rotation: "-rotate-2 hover:rotate-0",
      tapeColor: "bg-pink-300/80",
      defaultLikes: 58
    },
    {
      id: 2,
      src: finda2,
      title: "Gaya Aesthetic 🌿",
      category: "Aesthetic Mood",
      badgeTag: "Aesthetic 🎀",
      caption: "Sudut terindah dan vibe paling aesthetic khas Finda Meliana Putri.",
      locationTag: "Vibe Favorit ✨",
      rotation: "rotate-3 hover:rotate-0",
      tapeColor: "bg-purple-300/80",
      defaultLikes: 64
    },
    {
      id: 3,
      src: finda3,
      title: "Sinar Matahari ☀️",
      category: "Senyum Manis",
      badgeTag: "Warm Sunshine 🌻",
      caption: "Sinar kebaikan dan keceriaan yang selalu menyinari hari-hari sahabatnya.",
      locationTag: "Warm Heart 💛",
      rotation: "-rotate-1 hover:rotate-0",
      tapeColor: "bg-amber-300/80",
      defaultLikes: 72
    },
    {
      id: 4,
      src: finda4,
      title: "Cantik & Anggun 🎀",
      category: "Aesthetic Mood",
      badgeTag: "Graceful 🌷",
      caption: "Gaya khas yang selalu anggun, ramah, dan bikin kangen!",
      locationTag: "Sweet Memory 🌷",
      rotation: "rotate-2 hover:rotate-0",
      tapeColor: "bg-rose-300/80",
      defaultLikes: 81
    },
    {
      id: 5,
      src: finda5,
      title: "Tawa Ceria 💐",
      category: "Momen Ceria",
      badgeTag: "Happy Vibes 🥳",
      caption: "Momen tertawa paling lepas bersama sahabat tercinta.",
      locationTag: "Joyful Day 🥳",
      rotation: "-rotate-3 hover:rotate-0",
      tapeColor: "bg-pink-300/80",
      defaultLikes: 69
    },
    {
      id: 6,
      src: finda6,
      title: "Satu Dalam Sejuta ⭐",
      category: "Momen Ceria",
      badgeTag: "Bestie 🧸",
      caption: "Finda Meliana Putri - sosok sahabat yang selalu supportif & baik hati.",
      locationTag: "Pure Happiness 💫",
      rotation: "rotate-1 hover:rotate-0",
      tapeColor: "bg-amber-300/80",
      defaultLikes: 94
    },
    {
      id: 7,
      src: finda7,
      title: "Potret Paling Manis 🧁",
      category: "Senyum Manis",
      badgeTag: "Cute Smile 🧁",
      caption: "Ekspresi paling cute yang tak pernah gagal membawa senyuman.",
      locationTag: "Lovely Smile 🌸",
      rotation: "-rotate-2 hover:rotate-0",
      tapeColor: "bg-purple-300/80",
      defaultLikes: 77
    },
    {
      id: 8,
      src: finda8,
      title: "Ulang Tahun Ke-23 🎈",
      category: "Aesthetic Mood",
      badgeTag: "Age 23 Special 🎂",
      caption: "Semoga usiamu yang ke-23 ini menjadi awal babak hidup yang paling indah!",
      locationTag: "Finda's Day 🎂",
      rotation: "rotate-2 hover:rotate-0",
      tapeColor: "bg-rose-300/80",
      defaultLikes: 108
    }
  ];

  const categories = ['Semua Foto 📸', 'Senyum Manis 🌸', 'Aesthetic Mood 🌿', 'Momen Ceria ✨'];

  const [activeCategory, setActiveCategory] = useState<string>('Semua Foto 📸');
  const [likes, setLikes] = useState<{ [key: number]: number }>(
    photos.reduce((acc, p) => ({ ...acc, [p.id]: p.defaultLikes }), {})
  );
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const filteredPhotos = activeCategory === 'Semua Foto 📸'
    ? photos
    : photos.filter(p => `${p.category} ${p.category.includes('Senyum') ? '🌸' : p.category.includes('Aesthetic') ? '🌿' : '✨'}`.includes(activeCategory.split(' ')[0]));

  const handleLike = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.playPop();
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.7 }
    });
  };

  const openLightbox = (photo: PhotoItem) => {
    sound.playSparkle();
    setSelectedPhoto(photo);
  };

  return (
    <section id="photos" className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-pink-50/60 via-purple-50/30 to-pink-50/60">
      
      {/* Background Decor */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100/90 text-pink-700 text-xs font-bold border border-pink-200 shadow-xs">
            <Camera className="w-4 h-4 text-pink-500" />
            <span>Galeri Foto Momen Terindah</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-gray-900">
            Galeri Polaroid Finda Meliana Putri 📸✨
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto text-sm md:text-base font-light">
            Kumpulan foto-foto terestetik dan paling manis merayakan keindahan <span className="font-semibold text-pink-600">Ulang Tahun Ke-23 Finda</span>!
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playPop();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md scale-105'
                  : 'bg-white/80 text-gray-600 border border-pink-100 hover:bg-pink-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Polaroid Scrapbook Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
              onClick={() => openLightbox(photo)}
              className={`relative cursor-pointer bg-white rounded-2xl p-3.5 pb-5 shadow-xl border border-pink-100/90 transition-all duration-300 ${photo.rotation} group hover:shadow-2xl`}
            >
              {/* Paper Washi Tape Accent */}
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5.5 ${photo.tapeColor} border border-white/70 shadow-xs rotate-[-2deg] z-10 backdrop-blur-xs rounded-sm opacity-90 group-hover:bg-pink-400 transition-colors`} />

              {/* Photo Frame Container */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 mb-3 border border-gray-100 shadow-inner">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Hover Overlay Icon */}
                <div className="absolute inset-0 bg-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="p-3 rounded-full bg-white/90 text-pink-600 shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </span>
                </div>

                {/* Badge Tag */}
                <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-pink-600 shadow-xs">
                  {photo.badgeTag}
                </div>

                {/* Location Badge */}
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-medium text-amber-200 border border-amber-300/30">
                  {photo.locationTag}
                </div>
              </div>

              {/* Polaroid Footer Text */}
              <div className="space-y-1 px-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-sm text-gray-800 truncate">
                    {photo.title}
                  </h3>
                  <button
                    onClick={(e) => handleLike(photo.id, e)}
                    className="flex items-center gap-1 text-xs text-rose-500 font-bold hover:scale-110 active:scale-125 transition-transform"
                    title="Beri Love Foto Ini!"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
                    <span>{likes[photo.id]}</span>
                  </button>
                </div>
                <p className="font-script text-xs text-gray-500 truncate">
                  "{photo.caption}"
                </p>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500 font-medium inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-pink-100 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>8 Foto Kenangan Estetik Finda Meliana Putri • Ulang Tahun Ke-23 💕</span>
          </p>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div 
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-5 md:p-6 max-w-lg w-full border border-pink-100 shadow-2xl relative space-y-4 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  sound.playPop();
                  setSelectedPhoto(null);
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image View */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-pink-50 border border-pink-100 shadow-md">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-pink-600 shadow-xs">
                  {selectedPhoto.badgeTag}
                </div>
              </div>

              {/* Photo Information & Actions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-gray-900">
                      {selectedPhoto.title}
                    </h3>
                    <p className="text-xs text-gray-500">{selectedPhoto.locationTag}</p>
                  </div>

                  <button
                    onClick={(e) => handleLike(selectedPhoto.id, e)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 font-bold text-xs transition-transform active:scale-110 shadow-xs"
                  >
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
                    <span>{likes[selectedPhoto.id]} Love</span>
                  </button>
                </div>

                <p className="p-3 bg-pink-50/80 rounded-xl border border-pink-100 text-sm text-gray-700 font-script leading-relaxed">
                  "{selectedPhoto.caption}"
                </p>

                <div className="pt-2 flex justify-between items-center">
                  <span className="text-[11px] text-gray-400">Finda Meliana Putri • Age 23</span>
                  <button
                    onClick={() => {
                      sound.playPop();
                      setSelectedPhoto(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xs transition-colors shadow-sm"
                  >
                    Tutup Tampilan 💖
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
