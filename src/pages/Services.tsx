import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const mechanicalImages = [
  { id: "m1", src: new URL("../assets/services/mechanical1.jpeg", import.meta.url).href, alt: "Mechanical work 1" },
];

const constructionImages = [
  { id: "c1", src: new URL("../assets/services/construction1.jpg", import.meta.url).href, alt: "Construction site 1" },
  { id: "c2", src: new URL("../assets/services/construction2.jpg", import.meta.url).href, alt: "Construction site 2" },
  { id: "c3", src: new URL("../assets/services/construction3.jpg", import.meta.url).href, alt: "Construction site 3" },
  { id: "c4", src: new URL("../assets/services/construction4.jpg", import.meta.url).href, alt: "Construction site 4" },
];

const suppliesImage = new URL("../assets/services/card3.jpg", import.meta.url).href;

const Services = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Simple auto-scrolling carousel used inside the Construction card
  function ConstructionCarousel({ images, onSelect }: { images: string[]; onSelect?: (src: string) => void }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const paused = useRef(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const step = () => {
        if (!el || paused.current) {
          rafRef.current = requestAnimationFrame(step);
          return;
        }
        el.scrollLeft += 0.6;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, [images]);

    return (
      <div
        ref={ref}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        className="w-full overflow-hidden rounded-md"
      >
        <div className="flex gap-4 w-max">
          {images.concat(images).map((src, i) => (
            <button
              key={i}
              onClick={() => onSelect && onSelect(src)}
              className="flex-shrink-0 w-56 h-40 rounded-md overflow-hidden bg-gray-50 focus:outline-none"
              aria-label={`Open construction ${ (i % images.length) + 1 }`}
            >
              <img src={src} alt={`Construction ${ (i % images.length) + 1 }`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openImage = (src: string) => {
    setActiveImage(src);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="pt-20 pb-8 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              End-to-end mechanical, civil and logistics services — delivered with safety and quality.
            </p>
          </div>
        </section>

        {/* Services cards: Mechanical, Construction, Supplies — horizontal on desktop */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Mechanical Card */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                <div className="aspect-[16/9] bg-gray-50">
                  <img src={mechanicalImages[0].src} alt="Mechanical Engineering" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">Mechanical Engineering</h3>
                    <p className="text-muted-foreground mb-4">Welding, fabrication, hydraulics, pumps and industrial maintenance performed by certified technicians.</p>
                  </div>
                </div>
              </div>

              {/* Construction Card with auto-scroll carousel */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                <div className="px-6 pt-6">
                  <ConstructionCarousel images={constructionImages.map((i) => i.src)} onSelect={(src) => openImage(src)} />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">Construction Projects</h3>
                    <p className="text-muted-foreground mb-4">Civil works, earthworks, structures and finishing — executed safely and on schedule.</p>
                  </div>
                </div>
              </div>

              {/* Supplies Card */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                <div className="aspect-[16/9] bg-gray-50">
                  <img src={suppliesImage} alt="Supplies and logistics" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="font-display text-xl font-bold mb-2">Supplies & Logistics</h3>
                    <p className="text-muted-foreground mb-4">Procurement, warehousing, and transport services to keep your projects supplied and on schedule.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a href="https://api.whatsapp.com/send?phone=260975078766&text=Hello%2C%20I%27m%20interested%20in%20your%20services." target="_blank" rel="noopener noreferrer" className="inline-block btn-accent-2 font-bold px-6 py-3 rounded-md">Get in touch</a>
            </div>
          </div>
        </section>

        <CTASection />

        {/* Lightbox */}
        {lightboxOpen && activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/60" onClick={() => setLightboxOpen(false)} />
            <div className="relative z-10 max-w-5xl w-full">
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute right-2 top-2 bg-white/90 rounded-md px-3 py-1 z-20"
              >
                Close
              </button>
              <div className="rounded-md overflow-hidden bg-gray-900">
                <img src={activeImage} alt="Enlarged" className="w-full h-[70vh] object-contain bg-black" />
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Services;
