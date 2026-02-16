import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const constructionImages = [
  new URL("../assets/services/construction1.jpg", import.meta.url).href,
  new URL("../assets/services/construction2.jpg", import.meta.url).href,
  new URL("../assets/services/construction3.jpg", import.meta.url).href,
  new URL("../assets/services/construction4.jpg", import.meta.url).href,
];

const ConstructionWorks = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

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
        <section className="relative h-[36vh] md:h-[44vh] lg:h-[56vh] flex items-end justify-center text-center bg-gray-900/10">
          <img src={constructionImages[0]} alt="Construction Works" className="absolute inset-0 w-full h-full object-cover opacity-80" />
          <div className="relative z-10 container mx-auto px-6 py-20 text-white">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">Construction Works</h1>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">Civil works, earthworks, structural and finishing works delivered with safety and quality.</p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {constructionImages.map((src, idx) => (
                <button key={idx} onClick={() => openImage(src)} className="rounded-md overflow-hidden bg-gray-50 shadow-sm focus:outline-none">
                  <img src={src} alt={`Construction ${idx + 1}`} className="w-full h-40 object-cover" />
                </button>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a href="/contact" className="inline-block btn-accent-2 font-bold px-6 py-3 rounded-md">Talk to our team</a>
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

export default ConstructionWorks;
