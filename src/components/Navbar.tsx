import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Heart, Sparkles, Home, Camera, Cake, Gift, Smile, HelpCircle, Mail, Flame } from 'lucide-react';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [isPlayingBgm, setIsPlayingBgm] = useState(sound.isBgmPlaying);

  useEffect(() => {
    const handleBgmStateChange = () => {
      setIsPlayingBgm(sound.isBgmPlaying);
    };
    window.addEventListener('bgmStateChange', handleBgmStateChange);
    return () => window.removeEventListener('bgmStateChange', handleBgmStateChange);
  }, []);

  const toggleMute = () => {
    sound.isMuted = !isMuted;
    setIsMuted(!isMuted);
    if (!isMuted) sound.playPop();
  };

  const toggleBgm = () => {
    sound.toggleBgm();
  };

  const triggerCelebration = () => {
    sound.playSparkle();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#FF69B4', '#FFD700', '#FFB6C1', '#9C27B0', '#FFFFFF']
    });
  };

  const navItems = [
    { id: 'hero', label: 'Beranda', icon: <Home className="w-4 h-4" /> },
    { id: 'photos', label: 'Foto', icon: <Camera className="w-4 h-4" /> },
    { id: 'cake', label: 'Lilin', icon: <Cake className="w-4 h-4" /> },
    { id: 'gifts', label: 'Kado', icon: <Gift className="w-4 h-4" /> },
    { id: 'memories', label: 'Cerita', icon: <Smile className="w-4 h-4" /> },
    { id: 'quiz', label: 'Kuis', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'wishes', label: 'Lampion', icon: <Flame className="w-4 h-4" /> },
    { id: 'letter', label: 'Surat', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-3">
      
      {/* Floating Bottom Dock Container */}
      <div className="glass-dock rounded-full p-2 flex items-center gap-1.5 border border-white/90 shadow-dock transition-all max-w-[94vw] overflow-x-auto no-scrollbar">
        
        {/* Brand / Home Pill */}
        <div 
          onClick={() => {
            sound.playPop();
            setActiveSection('hero');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-pink-500 text-white font-bold text-xs cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all shrink-0"
          title="Finda Meliana Putri - Turning 23"
        >
          <Heart className="w-4 h-4 fill-white animate-pulse" />
          <span className="hidden sm:inline font-heading tracking-wide">Finda 23th 🌸</span>
        </div>

        <div className="w-px h-6 bg-pink-200/80 mx-0.5 shrink-0" />

        {/* Nav Items Dock */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playPop();
                  setActiveSection(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all duration-300 shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md scale-105'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-100/60'
                }`}
              >
                {item.icon}
                <span className={isActive ? 'inline' : 'hidden md:inline'}>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="w-px h-6 bg-pink-200/80 mx-0.5 shrink-0" />

        {/* Action Controls */}
        <div className="flex items-center gap-1 shrink-0">
          
          {/* Confetti Celebration Trigger */}
          <button
            onClick={triggerCelebration}
            title="Rayakan dengan Konfeti!"
            className="p-2 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors shadow-xs active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
          </button>

          {/* BGM Toggle */}
          <button
            onClick={toggleBgm}
            title={isPlayingBgm ? "Matikan Musik Happy Birthday" : "Putar Musik Happy Birthday"}
            className={`p-2 rounded-full transition-all shadow-xs active:scale-95 flex items-center gap-1 text-xs font-semibold px-2.5 ${
              isPlayingBgm 
                ? 'bg-pink-500 text-white animate-pulse' 
                : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
            }`}
          >
            <Music className="w-4 h-4" />
            <span className="hidden lg:inline">{isPlayingBgm ? 'BGM On' : 'BGM Off'}</span>
          </button>

          {/* Mute SFX Toggle */}
          <button
            onClick={toggleMute}
            title={isMuted ? "Aktifkan Suara" : "Mute Suara"}
            className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors active:scale-95"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-pink-600" />}
          </button>

        </div>

      </div>

    </nav>
  );
};
