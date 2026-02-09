import { Phone, ArrowRight } from "lucide-react";
import TextScramble from "./ui/TextScramble";

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

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Full-bleed slideshow container */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-slides">
          {heroImages.length > 0 ? (
            heroImages.map((src, i) => (
              <div key={src} className={`hero-slide ${i === 0 ? 'active' : ''}`}>
                <img src={src} alt={i === 0 ? "mining services Zambia hero" : "mining and construction services Zambia"} loading={i === 0 ? "eager" : "lazy"} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ))
          ) : (
            <div className="hero-slide active">
              <img src="/src/assets/equipment/hero.jpg" alt="mining services Zambia hero" loading="eager" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {/* Cinematic overlay */}
      <div className="absolute inset-0 hero-cinematic-overlay" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl">
          <span className="inline-block bg-black/40 text-white/90 px-3 py-1 rounded-full text-xs mb-4">Trusted</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            Mining services Zambia — Reliable mining and construction solutions <TextScramble text={"for industry"} revealSpeed={100} />
          </h1>

          <h2 className="text-xl text-white/90 mb-3">PPE supplier Zambia · Industrial hardware Zambia · Construction company Zambia</h2>
          <p className="text-lg text-white/80 mb-6 max-w-xl">Reliable industrial solutions for mining, construction, and mechanical projects across Zambia and the Copperbelt</p>

          <div className="flex gap-4">
            <a href="https://api.whatsapp.com/send?phone=260975078766&text=Hello%2C%20I%27m%20interested%20in%20your%20services." target="_blank" rel="noopener noreferrer" className="btn-accent-2 font-bold px-6 py-3">Get In Touch</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

// Auto-advance slideshow script (runs in browser)
if (typeof window !== 'undefined') {
  // Wait a tick for DOM to render
    setTimeout(() => {
      const slides = Array.from(document.querySelectorAll('.hero-slide')) as HTMLElement[];
      if (!slides || slides.length <= 1) return;
      // Only loop the first N slides in order, then repeat
      const LOOP_COUNT = Math.min(4, slides.length);
      let idx = 0;

      // Ensure only the first slide in the loop is active initially
      slides.forEach((s, i) => s.classList.toggle('active', i === 0));

      let intervalId: number | null = null;
      const CROSSFADE_MS = 1250; // slightly longer than opacity transition (1.2s)
      const SLIDE_MS = 6000;

      const start = () => {
        if (intervalId) return;
        intervalId = window.setInterval(() => {
          const prev = slides[idx];
          const nextIdx = (idx + 1) % LOOP_COUNT; // cycle within first LOOP_COUNT slides
          const next = slides[nextIdx];

          // Add active to next immediately so it fades in while prev is still visible
          next.classList.add('active');

          // Remove active from previous after crossfade time to avoid visual glitch
          setTimeout(() => {
            prev.classList.remove('active');
          }, CROSSFADE_MS);

          idx = nextIdx;
        }, SLIDE_MS);
      };

      const stop = () => {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      };

      // Start auto-advance
      start();

      // Pause on hover over slides area
      const container = document.querySelector('.hero-slides');
      if (container) {
        container.addEventListener('mouseenter', stop);
        container.addEventListener('mouseleave', start);
      }
    }, 250);
}
