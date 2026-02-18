import { useEffect, useState, useRef } from "react";
import { Phone, ArrowRight } from "lucide-react";

// Dynamically import all hero images from src/assets/hero (place your hero images there)
const heroModules = import.meta.glob('../assets/hero/*.{jpg,jpeg,png,webp}', { eager: true });
const heroImages: string[] = Object.values(heroModules)
  .map((m) => {
    const mm = m as { default?: string } | string | undefined;
    if (mm && typeof mm === 'object' && 'default' in mm) return (mm as { default: string }).default;
    if (typeof mm === 'string') return mm;
    return '';
  })
  .filter(Boolean) as string[];

// Import Repair & Maintenance images first
const repairModules = import.meta.glob('../assets/services/Repair and Maintenance/*.{jpg,jpeg,png,webp}', { eager: true });
const repairImages: string[] = Object.values(repairModules)
  .map((m) => {
    const mm = m as { default?: string } | string | undefined;
    if (mm && typeof mm === 'object' && 'default' in mm) return (mm as { default: string }).default;
    if (typeof mm === 'string') return mm;
    return '';
  })
  .filter(Boolean) as string[];

const HeroSection = () => {
  const slides = [...repairImages, ...heroImages];
  const total = slides.length || 1;
  // default to the Repair & Maintenance image named "2.jpeg" when present
  const defaultIndex = slides.findIndex((s) => s.endsWith('/2.jpeg') || s.endsWith('/2.jpg') || s.endsWith('/2.png') || s.endsWith('/2.webp'));
  const [index, setIndex] = useState(defaultIndex >= 0 ? defaultIndex : 0);

  // Pre-defined Tailwind translate classes to avoid inline styles (supports up to 12 slides)
  const translateClasses = [
    'translate-x-0',
    '-translate-x-full',
    '-translate-x-[200%]',
    '-translate-x-[300%]',
    '-translate-x-[400%]',
    '-translate-x-[500%]',
    '-translate-x-[600%]',
    '-translate-x-[700%]',
    '-translate-x-[800%]',
    '-translate-x-[900%]',
    '-translate-x-[1000%]',
    '-translate-x-[1100%]',
  ];

  const paused = useRef(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const start = () => {
      if (intervalRef.current) return;
      intervalRef.current = window.setInterval(() => {
        if (!paused.current) setIndex((i) => (i + 1) % total);
      }, 4500);
    };

    const stop = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    start();
    return () => stop();
  }, [total]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Full-bleed slideshow container (horizontal auto-scroll) */}
      <div
        className="absolute inset-0 overflow-hidden"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        <div className={`hero-track h-full flex ${translateClasses[index] ?? 'translate-x-0'}`}>
          {slides.length > 0 ? (
            slides.map((src, i) => (
              <div key={`${src}-${i}`} className="hero-item relative w-full h-full flex-shrink-0">
                <img src={src} alt={`hero ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ))
          ) : (
            <div className="hero-item relative w-full h-full flex-shrink-0">
              <img src="/src/assets/equipment/hero.jpg" alt="services hero" loading="eager" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* Cinematic overlay */}
      <div className="absolute inset-0 hero-cinematic-overlay" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl">
          <span data-animate="fade-up" data-animate-delay="40ms" className="inline-block bg-black/40 text-white/90 px-3 py-1 rounded-full text-xs mb-4">Trusted</span>
          <h1 data-animate="fade-up" data-animate-delay="100ms" className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            providing best industry <span className="text-white">solutions</span>
          </h1>

          <p data-animate="fade-up" data-animate-delay="170ms" className="text-lg text-white/80 mb-6 max-w-xl">Reliable industrial solutions for mining, construction, and mechanical projects</p>
          <div className="flex gap-4">
            <a data-animate="fade-up" data-animate-delay="240ms" href="https://wa.me/260975078766?text=Hello%2C%20I%27m%20interested%20in%20your%20services." target="_blank" rel="noreferrer noopener" className="btn-accent-2 font-bold px-6 py-3">Get In Touch</a>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`hero-indicator h-2 ${i === index ? 'w-10 bg-accent-2 scale-105' : 'w-6 bg-white/40'} rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-2/30`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;