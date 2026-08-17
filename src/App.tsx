import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { FloatingHearts } from './components/FloatingHearts';
import { ParticleCanvas } from './components/ParticleCanvas';
import { HeroSection } from './components/HeroSection';
import { PhotoGallery } from './components/PhotoGallery';
import { BirthdayCake } from './components/BirthdayCake';
import { UnwrapGifts } from './components/UnwrapGifts';
import { MemoriesGallery } from './components/MemoriesGallery';
import { FindaQuiz } from './components/FindaQuiz';
import { WishLanterns } from './components/WishLanterns';
import { SecretLetter } from './components/SecretLetter';
import { Footer } from './components/Footer';
import { BalloonPop } from './components/BalloonPop';
import { FunToast } from './components/FunToast';
import { WelcomeConfetti } from './components/WelcomeConfetti';
import { sound } from './utils/sound';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Auto-play music on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!sound.isBgmPlaying && !sound.isMuted) {
        sound.startBgm();
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'photos', 'cake', 'gifts', 'memories', 'quiz', 'wishes', 'letter'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFF5FA] text-gray-800 font-sans selection:bg-pink-300 selection:text-pink-900 overflow-x-hidden pb-28">
      
      {/* ✨ Welcome Confetti Burst on Load */}
      <WelcomeConfetti />

      {/* 3D Three.js Floating Particle Background */}
      <ParticleCanvas />

      {/* Floating Animated Hearts & Sparkles */}
      <FloatingHearts />

      {/* 🎈 Floating Balloons — click to pop! */}
      <BalloonPop />

      {/* 🔔 Fun Toast Notifications */}
      <FunToast />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-4">
        <HeroSection onNavigate={handleNavigate} />
        <PhotoGallery />
        <BirthdayCake />
        <UnwrapGifts />
        <MemoriesGallery />
        <FindaQuiz />
        <WishLanterns />
        <SecretLetter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Eye-Catching Bottom Floating Blurred Dock Navbar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

    </div>
  );
}

export default App;
