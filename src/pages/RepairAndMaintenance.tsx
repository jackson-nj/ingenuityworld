import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const repairImages = [
  new URL("../assets/services/Repair and Maintenance/1.jpeg", import.meta.url).href,
  new URL("../assets/services/Repair and Maintenance/2.jpeg", import.meta.url).href,
  new URL("../assets/services/Repair and Maintenance/3.jpeg", import.meta.url).href,
  new URL("../assets/services/Repair and Maintenance/4.jpeg", import.meta.url).href,
  new URL("../assets/services/Repair and Maintenance/5.jpeg", import.meta.url).href,
];

// Inline repair videos (rendered on the Repair & Maintenance page)
const repairVideos = [
  new URL("../assets/services/Repair and Maintenance/vid1.mp4", import.meta.url).href,
  new URL("../assets/services/Repair and Maintenance/vid2.mp4", import.meta.url).href,
  new URL("../assets/services/Repair and Maintenance/vid3.mp4", import.meta.url).href,
  new URL("../assets/services/Repair and Maintenance/vid4.mp4", import.meta.url).href,
];

const RepairAndMaintenance = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Hero carousel state (auto-advance, pause on hover)
  // start on the 2nd image (index 1) so 2.jpeg appears first
  const [heroIndex, setHeroIndex] = useState(1);
  const [heroPaused, setHeroPaused] = useState(false);

  useEffect(() => {
    if (heroPaused) return;
    const t = setInterval(() => setHeroIndex((i) => (i + 1) % repairImages.length), 4000);
    return () => clearInterval(t);
  }, [heroPaused]);

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
    <div className="min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        <section
          className="relative h-[36vh] md:h-[44vh] lg:h-[56vh] flex items-end justify-center text-center bg-gray-900"
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => setHeroPaused(false)}
        >
          {/* Background images (cross-fade) */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {repairImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Repair & Maintenance ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${i === heroIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
              />
            ))}

            <div className="absolute inset-0 bg-black/30" />
          </div>

          <div className="relative z-10 container mx-auto px-6 py-20 text-white">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">Repair & Maintenance</h1>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">Preventative and corrective maintenance, onsite repairs, plant and equipment servicing — experienced technicians to keep your operations running.</p>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {repairImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 w-8 rounded-full ${i === heroIndex ? "bg-accent-2" : "bg-white/40"}`}
              />
            ))}
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {repairImages.map((src, idx) => (
                <button key={idx} onClick={() => openImage(src)} className="rounded-md overflow-hidden bg-gray-50 shadow-sm focus:outline-none">
                  <img src={src} alt={`Repair ${idx + 1}`} className="w-full h-48 object-cover" />
                </button>
              ))}
            </div>

            {/* Videos: playable inline */}
            {repairVideos.length > 0 && (
              <>
                <h3 className="mt-8 mb-4 font-display text-lg font-bold">Videos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {repairVideos.map((src, idx) => (
                    <div key={idx} className="rounded-md overflow-hidden bg-black shadow-sm">
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        poster={repairImages[idx] ?? repairImages[0]}
                        className="w-full h-48 object-cover bg-black"
                        aria-label={`Repair video ${idx + 1}`}
                      >
                        <source src={src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="mt-8 text-center">
              <a href="https://api.whatsapp.com/send?phone=260975189800&text=Hello%2C%20I%27m%20interested%20in%20Repair%20%26%20Maintenance%20services." target="_blank" rel="noopener noreferrer" className="inline-block btn-accent-2 font-bold px-6 py-3 rounded-md">contact us</a>
            </div>
          </div>
        </section>

        {lightboxOpen && activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/60" onClick={() => setLightboxOpen(false)} />
            <div className="relative z-10 max-w-5xl w-full rounded-md overflow-hidden bg-gray-900">
              <button onClick={() => setLightboxOpen(false)} className="absolute right-2 top-2 bg-white/90 rounded-md px-3 py-1 z-20">Close</button>
              <img src={activeImage} alt="Enlarged" className="w-full h-[70vh] object-contain bg-black" />
            </div>
          </div>
        )}

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default RepairAndMaintenance;
