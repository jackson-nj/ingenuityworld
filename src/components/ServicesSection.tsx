import { useState, useEffect, useRef } from "react";
 import { Loader2 } from "lucide-react";
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
    id: "1",
    title: "Mechanical Engineering",
    description:
      "Welding, fabrication, boiler making, hydraulics, and industrial maintenance delivered by skilled technicians.",
    image_url: mechanical1Img,
  },
  {
    id: "2",
    title: "Construction Works",
    description:
      "Civil works, earthworks, structural and finishing works delivered with safety and quality at the forefront.",
    image_url: equipmentHireImg,
  },
  {
    id: "3",
    title: "Supplies & Logistics",
    description:
      "Procurement, transport, warehousing and logistics support to ensure your project runs smoothly.",
    image_url: dryHireImg,
  },
];

const ServicesSection = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const constructionImages = [
    new URL("../assets/services/construction1.jpg", import.meta.url).href,
    new URL("../assets/services/construction2.jpg", import.meta.url).href,
    new URL("../assets/services/construction3.jpg", import.meta.url).href,
    new URL("../assets/services/construction4.jpg", import.meta.url).href,
  ];
 
   useEffect(() => {
     // Force the three primary service cards to the exact content and local assets requested
     const primaryServices: ServiceItem[] = [
       {
         id: "mechanical",
         title: "Mechanical Engineering",
         description:
           "Welding, fabrication, boiler making, hydraulics, and industrial maintenance delivered by skilled technicians.",
         image_url: new URL("../assets/services/mechanical1.jpeg", import.meta.url).href,
       },
       {
         id: "construction",
         title: "Construction Works",
         description:
           "Civil works, earthworks, structural and finishing works delivered with safety and quality at the forefront.",
         image_url: constructionImages[0],
       },
       {
         id: "supplies",
         title: "Supplies & Logistics",
         description:
           "Procurement, transport, warehousing and logistics support to ensure your project runs smoothly.",
         image_url: new URL("../assets/services/card3.jpg", import.meta.url).href,
       },
     ];

     // Immediately render the primary services (do not show remote/heavy images)
     setServices(primaryServices);
     setLoading(false);

     // Fetch from Supabase in background for Admin sync, but do not override primary services
     const fetchServices = async () => {
       try {
         const { data, error } = await supabase
           .from("services")
           .select("*")
           .order("created_at", { ascending: false });

         if (error) throw error;
         // keep data for admin sync / future features; don't overwrite the primary cards
       } catch (err) {
         console.error("Error fetching services:", err);
       }
     };

     fetchServices();
   }, []);

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

  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .slice(0, 3)
              .map((service, index) => (
                <div
                  key={service.id}
                  data-animate="fade-up"
                  data-animate-delay={`${index * 120}ms`}
                  className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col"
                >
                  {/* Image on top */}
                  <div className="relative h-40 overflow-hidden bg-gray-50">
                    <img
                      src={service.title.toLowerCase().includes("construction") ? constructionImages[0] : (service.image_url || "/placeholder.svg")}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                    {/* If this is the Construction card, show small thumbnails + See More */}
                    {service.title.toLowerCase().includes("construction") && (
                      <div className="mt-4">
                        <button onClick={() => setIsGalleryOpen(true)} className="inline-block btn-accent-2 font-bold px-4 py-2">See More</button>
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
                <h3 className="font-display text-xl font-bold">Construction Projects</h3>
                <button onClick={() => setIsGalleryOpen(false)} className="text-muted-foreground">Close</button>
              </div>
              <div>
                <ConstructionCarousel images={constructionImages} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
