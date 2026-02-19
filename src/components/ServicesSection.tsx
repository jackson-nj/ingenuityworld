import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
 import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
 import { supabase } from "@/integrations/supabase/client";
import equipmentHireImg from "@/assets/services/card3.jpg";
import construction2Img from "@/assets/services/card2.jpg";
import construction3Img from "@/assets/services/mechanical1.jpeg";
import construction4Img from "@/assets/services/mechanical2.jpeg";
import mechanical1Img from "@/assets/services/mechanical1.jpeg";
import wetHireImg from "@/assets/services/card2.jpg";
import dryHireImg from "@/assets/services/card3.jpg";
import deliveryImg from "@/assets/services/card3.jpg";
 
 interface ServiceItem {
   id: string;
   title: string;
   description?: string;
   image_url?: string;
 }
 
const fallbackServices: ServiceItem[] = [
  {
    id: "repair",
    title: "Repair & Maintenance",
    description:
      "Preventative and corrective maintenance, onsite repairs and plant & equipment servicing.",
    image_url: new URL("../assets/services/Repair and Maintenance/1.jpeg", import.meta.url).href,
  },
  {
    id: "1",
    title: "Mechanical Engineering",
    description:
      "Welding, fabrication, boiler making, hydraulics, and industrial maintenance delivered by skilled technicians.",
    image_url: mechanical1Img,
  },
  {
    id: "2",
    title: "Aluminium Works",
    description:
      "Fabrication of doors, windows and sanitary fittings.",
    image_url: new URL("../assets/services/aluminium/aluminuimdoor.jpeg", import.meta.url).href,
  },
  {
    id: "3",
    title: "PPE Supply",
    description:
      "High-quality personal protective equipment — helmets, gloves, vests and suits for site safety.",
    image_url: new URL("../assets/services/PPE/SAFTYVEST2.jpeg", import.meta.url).href,
  },
  {
    id: "supply-chain",
    title: "Supply Chain & Logistics Services",
    description:
      "Procurement; Inventory Control; Stores & Warehousing; Clearing & Forwarding; Transport & Logistics; Supply Chain Management.",
    image_url: deliveryImg,
  },
];

const constructionImages = [construction2Img, construction3Img, construction4Img];
const aluminiumImages = [mechanical1Img];

const ServicesSection = () => {
  const [services, setServices] = useState<ServiceItem[]>(fallbackServices);
  const [loading, setLoading] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isAluminiumOpen, setIsAluminiumOpen] = useState(false);

  // Animation handled globally in `main.tsx` via `initAutoAnimate()`
  // Cards below provide `data-animate` and `data-animate-delay` attributes.
 
  const getDescription = (service: ServiceItem) => {
    if (service.description && service.description.trim().length > 0) return service.description;
    const fallback = fallbackServices.find((f) => f.title.toLowerCase() === (service.title || "").toLowerCase());
    if (fallback && fallback.description) return fallback.description;
    return "Description coming soon.";
  };

  // Auto-scrolling carousel used for construction images in the modal
  function ConstructionCarousel({ images }: { images: string[] }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const paused = useRef(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      // duplicate content for seamless scroll
      const step = () => {
        if (!el || paused.current) {
          rafRef.current = requestAnimationFrame(step);
          return;
        }
        // scroll a few pixels per frame
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
        aria-hidden="false"
      >
        <div className="flex gap-4 w-max">
          {images.concat(images).map((src, i) => (
            <div key={i} className="flex-shrink-0 w-48 h-32 rounded-md overflow-hidden bg-gray-50">
              <img src={src} alt={`Construction ${ (i % images.length) + 1 }`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Modal carousel for Aluminium Works (larger, fully visible images)
  function AluminiumCarousel({ images }: { images: string[] }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
    }, [index]);

    const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

    return (
      <div className="relative">
        <div ref={containerRef} className="flex overflow-hidden rounded-lg">
          {images.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-full h-56 md:h-72 lg:h-96 flex items-center justify-center bg-gray-50 overflow-hidden">
              <img src={src} alt={`Aluminium ${i + 1}`} className="max-h-full w-auto object-contain" />
            </div>
          ))}
        </div>

        <button
          aria-label="Previous aluminium image"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-sm"
        >
          <ChevronLeft className="h-6 w-6 text-foreground" />
        </button>

        <button
          aria-label="Next aluminium image"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-sm"
        >
          <ChevronRight className="h-6 w-6 text-foreground" />
        </button>

        <div className="flex items-center justify-center gap-2 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 w-8 rounded-full ${i === index ? "bg-accent-2" : "bg-gray-200"}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section id="services" className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-accent-2 font-bold uppercase tracking-[0.2em] text-sm">What We Offer</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4">Our Services</h2>
        </div>

              

         {loading ? (
           <div className="flex items-center justify-center py-12">
             <Loader2 className="h-8 w-8 animate-spin text-accent-2" />
           </div>
         ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services
              .slice(0, 5)
              .map((service, index) => (
                <div
                  key={service.id}
                  data-animate="fade-up"
                  data-animate-delay={`${index * 120}ms`}
                  className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 group overflow-hidden flex flex-col"
                >
                  {/* Image on top (fill card without overlap) */}
                  <div className="relative h-40 overflow-hidden bg-gray-50">
                    <img
                      src={service.title.toLowerCase().includes("construction") ? constructionImages[0] : (service.image_url || "/placeholder.svg")}
                      alt={service.title}
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                  </div>
                  {/* Content below image */}
                  <div className="p-4 flex flex-col justify-center">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed mb-0">
                      {getDescription(service)}
                    </p>

                    {/* Supply Chain card: hide detailed list on the card — link to full section */}
                    {service.id === "supply-chain" && (
                      <div className="mt-4">
                        <Link to="/services/supplies-and-logistics" className="inline-block btn-accent-2 font-bold px-4 py-2">View details</Link>
                      </div>
                    )}

                    {/* Repair card: link to dedicated page */}
                    {service.title.toLowerCase().includes("repair") && (
                      <div className="mt-4">
                        <Link to="/services/repair-and-maintenance" className="inline-block btn-accent-2 font-bold px-4 py-2">View details</Link>
                      </div>
                    )}
                    {/* PPE card: link to supplies page */}
                    {(service.title.toLowerCase().includes("ppe") || service.id === "supplies") && (
                      <div className="mt-4">
                        <Link to="/services/ppe" className="inline-block btn-accent-2 font-bold px-4 py-2">See More</Link>
                      </div>
                    )} 
                    {/* If this is the Construction or Aluminium card, show small thumbnails + See More */}
                    {(service.title.toLowerCase().includes("construction") || service.title.toLowerCase().includes("aluminium")) && (
                      <div className="mt-4">
                        <button onClick={() => setIsGalleryOpen(true)} className="inline-block btn-accent-2 font-bold px-4 py-2">See More</button>
                      </div>
                    )}
                    {/* Aluminium card: match other cards and show modal carousel on See More */}
                    {service.title.toLowerCase().includes("aluminium") && (
                      <div className="mt-4">
                        <button onClick={() => setIsAluminiumOpen(true)} className="inline-block btn-accent-2 font-bold px-4 py-2">See More</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
         )}


        {/* Gallery modal for Construction images */}
        {isGalleryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/60" onClick={() => setIsGalleryOpen(false)} />
            <div className="relative bg-white rounded-lg max-w-4xl w-full p-4 z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display text-xl font-bold">Aluminium Projects</h3>
                <button onClick={() => setIsGalleryOpen(false)} className="text-muted-foreground">Close</button>
              </div>
              <div>
                <ConstructionCarousel images={constructionImages} />
              </div>
            </div>
          </div>
        )}

        {isAluminiumOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/60" onClick={() => setIsAluminiumOpen(false)} />
            <div className="relative bg-white rounded-lg max-w-4xl w-full p-4 z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display text-xl font-bold">Aluminium Works</h3>
                <button onClick={() => setIsAluminiumOpen(false)} className="text-muted-foreground">Close</button>
              </div>
              <div>
                <AluminiumCarousel images={aluminiumImages} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
