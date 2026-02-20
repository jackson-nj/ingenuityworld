import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const ppeMain = new URL("../assets/services/PPE/SAFTYVEST2.jpeg", import.meta.url).href;

const PPE = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [shoesOpen, setShoesOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
        setShoesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ppeProducts = [
    { id: "safety-helmet", name: "Safety Helmet", img: new URL("../assets/services/PPE/SAFYEUR JHELMET.jpeg", import.meta.url).href, alt: "Safety Helmet", desc: "Certified industrial hard hat" },
    { id: "protective-gloves", name: "Protective Gloves", img: new URL("../assets/services/PPE/GLOVES.jpeg", import.meta.url).href, alt: "Protective Gloves", desc: "Grip and cut-resistant gloves" },
    { id: "hi-vis-vest", name: "High-Visibility Vest", img: new URL("../assets/services/PPE/SAFTYVEST2.jpeg", import.meta.url).href, alt: "High-visibility vest", desc: "Reflective vest for on-site visibility" },
    { id: "safety-jacket-1", name: "Safety Jacket", img: new URL("../assets/services/PPE/JERSY.jpeg", import.meta.url).href, alt: "Safety Jacket", desc: "Breathable hi‑vis safety jacket with reflective trims" },
    { id: "safety-jacket-2", name: "Safety Jacket", img: new URL("../assets/services/PPE/WORKING JERSEY.jpeg", import.meta.url).href, alt: "Safety Jacket (variant)", desc: "Comfortable safety jacket" },
    { id: "safety-jacket-3", name: "Safety Jacket", img: new URL("../assets/services/PPE/WORKING JERSEY.jpg", import.meta.url).href, alt: "Safety Jacket (variant)", desc: "Long-sleeve safety jacket option" },
    { id: "safety-shoes", name: "Safety Shoes", img: new URL("../assets/services/PPE/shoe1.jpeg", import.meta.url).href, alt: "Safety Shoes", desc: "Steel-toe, slip-resistant safety shoes multiple styles available" },
    { id: "work-suit-1", name: "Work Suit", img: new URL("../assets/services/PPE/WORKING SUIT.jpeg", import.meta.url).href, alt: "Work Suit", desc: "Full-body protective suit" },
    { id: "work-suit-2", name: "Work Suit", img: new URL("../assets/services/PPE/WORKING SUIT 2.jpeg", import.meta.url).href, alt: "Work Suit (alternate)", desc: "Alternate worksuit" },
    { id: "work-suit-3", name: "Work Suit", img: new URL("../assets/services/PPE/WORKING SUIT3jpg.jpg", import.meta.url).href, alt: "Work Suit (heavy-duty)", desc: "Heavy-duty worksuit" },
  ];

  // load every image from the PPE assets folder so the carousel shows ALL files there
  // using Vite's glob import (eager) — keeps filenames in sorted order
  // @ts-ignore
  const _modules = import.meta.glob('../assets/services/PPE/*.{jpeg,jpg,png,avif,svg}', { eager: true });
  const _files = Object.keys(_modules).sort();
  const allPpeImages: string[] = _files.map((f) => ((_modules as any)[f].default ?? (_modules as any)[f]) as string);

  const shoeImages = allPpeImages.filter((src) => /shoe/i.test((src.split('/').pop() ?? '').toLowerCase()));

  // rotate list so last image appears just before the first on load
  const rotatedImages = allPpeImages.length > 0
    ? [allPpeImages[allPpeImages.length - 1], ...allPpeImages]
    : allPpeImages;



  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        <section className="relative h-[36vh] md:h-[44vh] lg:h-[56vh] flex items-end justify-center text-center bg-gray-900/10">
          <img src={ppeMain} alt="PPE" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" aria-hidden="true" />

          <div className="relative z-10 container mx-auto px-6 py-20 text-white">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">PPE Supply</h1>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">Quality personal protective equipment for single or bulk orders, including helmets, vests, gloves and suits.</p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-6">
              <h2 className="font-display text-2xl md:text-3xl font-bold">Personal Protective Equipment</h2>
              <p className="text-muted-foreground mt-4">Browse our selection of certified PPE items available for procurement.</p>

              {/* auto‑scrolling showcase */}
              <div className="ppe-carousel mt-8" aria-hidden="true" data-testid="ppe-carousel">
                {/*
                  Two copies of the image list are rendered back‑to‑back.  this is a
                  common marquee technique that lets the animation loop infinitely
                  without any visible gap.  it does *not* introduce any images that
                  aren't already present, the duplication merely re‑uses the same
                  sources to form a seamless track.
                */}
                <div className="ppe-track">
                  {rotatedImages.map((src, idx) => (
                    <img
                      key={src + idx}
                      src={src}
                      alt=""
                      className="h-24 w-auto flex-shrink-0 mx-2 object-contain"
                    />
                  ))}
                  {rotatedImages.map((src, idx) => (
                    <img
                      key={src + idx + '-dup'}
                      src={src}
                      alt=""
                      className="h-24 w-auto flex-shrink-0 mx-2 object-contain"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {ppeProducts.map((p) => (
                  <article key={p.id} className="bg-white border rounded-lg overflow-hidden shadow-sm p-4 flex flex-col items-center text-center">
                    <div className="w-full h-40 overflow-hidden rounded-md bg-gray-50 flex items-center justify-center">
                      <img src={p.img} alt={p.alt} className="w-full h-full object-contain p-2" />
                    </div>
                    <h4 className="mt-4 font-semibold">{p.name}</h4>
                    <p className="text-muted-foreground text-sm mt-2">{p.desc}</p>
                    <div className="mt-4">
                      {p.id === "safety-shoes" ? (
                        <button onClick={() => setShoesOpen(true)} className="inline-block btn-accent-2 font-bold px-4 py-2 rounded-md">View more</button>
                      ) : (
                        <a
                          href={`https://api.whatsapp.com/send?phone=260976769935&text=${encodeURIComponent(`Hello, I'm interested in the ${p.name} from Ingenuity (PPE Supply). Please advise on price & availability.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block btn-accent-2 font-bold px-4 py-2 rounded-md"
                        >
                          Order
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-6 text-center">
                <a href="https://api.whatsapp.com/send?phone=260976769935&text=Hello%2C%20I%27m%20interested%20in%20your%20PPE%20supply%20options.%20Please%20advise%20on%20availability%20and%20pricing." target="_blank" rel="noopener noreferrer" className="inline-block btn-accent-2 font-bold px-6 py-3 rounded-md">Get in touch</a>
              </div>
            </div>

            {/* Shoes catalogue modal */}
            {shoesOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60">
                <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold">Safety shoes — catalogue</h3>
                    <button aria-label="Close catalogue" className="text-gray-600 hover:text-gray-900" onClick={() => setShoesOpen(false)}>✕</button>
                  </div>

                  <div className="p-4 max-h-[70vh] overflow-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {shoeImages.map((src, i) => (
                        <button
                          key={src}
                          onClick={() => { setActiveImage(src); setLightboxOpen(true); }}
                          className="rounded-md overflow-hidden bg-gray-50 h-28 sm:h-32 w-full flex items-center justify-center"
                          aria-label={`Open shoe ${i + 1}`}
                        >
                          <img src={src} alt={`Safety shoe ${i + 1}`} className="w-full h-full object-contain p-1" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border-t text-right">
                    <button onClick={() => setShoesOpen(false)} className="btn-ghost px-4 py-2 rounded">Close</button>
                  </div>
                </div>
              </div>
            )}

            {/* Image lightbox */}
            {lightboxOpen && activeImage && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true">
                <button aria-label="Close preview" onClick={() => { setLightboxOpen(false); setActiveImage(null); }} className="absolute top-6 right-6 text-white text-3xl">✕</button>
                <img src={activeImage} alt="Preview" className="max-w-[96%] max-h-[92%] object-contain rounded-md shadow-lg" />
              </div>
            )}
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default PPE;
