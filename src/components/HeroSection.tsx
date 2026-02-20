import { useEffect, useState, useRef } from "react";
import { Phone, ArrowRight } from "lucide-react";
import "./HeroSection.css";

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

  // always start from the very first slide in the assembled list
  const [index, setIndex] = useState(0);

  // instead of a fixed array of translate classes we compute the transform
  // inline which supports any number of slides and avoids the 12‑slide limit

  const paused = useRef(false);
  const intervalRef = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

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

  // update transform using a CSS custom property (avoids JSX inline styles)
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.setProperty('--hero-translate', `-${index * 100}%`);
    }
  }, [index]);

  return (
    <section id="hero" className="relative min-h-[80vh] md:min-h-screen flex items-center">
      {/* Full-bleed slideshow container (horizontal auto-scroll) */}
      <div
        className="absolute inset-0 overflow-hidden"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        <div ref={trackRef} className="hero-track h-full flex">
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
          {/* mobile indicators (duplicate for visibility on small screens) */}
        </div>
      </div>

      {/* Slide indicators — positioned at bottom of the hero for all screens */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 ${i === index ? 'w-8 sm:w-10 bg-accent-2' : 'w-4 sm:w-6 bg-white/40'} rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-2/30`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;