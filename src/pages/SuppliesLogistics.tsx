import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const suppliesImage = new URL("../assets/services/PPE/SAFTYVEST2.jpeg", import.meta.url).href;

const SuppliesLogistics = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ppeProducts = [
    { id: "safety-vest", name: "Safety Vest", img: new URL("../assets/services/PPE/SAFTYVEST2.jpeg", import.meta.url).href, desc: "High-visibility reflective vest" },
    { id: "helmet", name: "Safety Helmet", img: new URL("../assets/services/PPE/SAFYEUR JHELMET.jpeg", import.meta.url).href, desc: "Certified hard hat" },
    { id: "gloves", name: "Protective Gloves", img: new URL("../assets/services/PPE/GLOVES.jpeg", import.meta.url).href, desc: "Durable work gloves" },
    { id: "work-suit", name: "Work Suit", img: new URL("../assets/services/PPE/WORKING SUIT.jpeg", import.meta.url).href, desc: "Full-body suit for hazardous tasks" },
    { id: "work-suit-2", name: "Work Suit (2)", img: new URL("../assets/services/PPE/WORKING SUIT 2.jpeg", import.meta.url).href, desc: "Alternate worksuit" },
    { id: "work-suit-3", name: "Work Suit (3)", img: new URL("../assets/services/PPE/WORKING SUIT3jpg.jpg", import.meta.url).href, desc: "Heavy-duty worksuit" },
    { id: "jersey", name: "Safety Jacket", img: new URL("../assets/services/PPE/JERSY.jpeg", import.meta.url).href, desc: "high‑visibilty safety jacket with reflective trims" },
    { id: "working-jersey-1", name: "Safety Jacket", img: new URL("../assets/services/PPE/WORKING JERSEY.jpeg", import.meta.url).href, desc: "Standard safety jacket durable and breathable" },
    { id: "working-jersey-2", name: "Safety Jacket", img: new URL("../assets/services/PPE/WORKING JERSEY.jpg", import.meta.url).href, desc: "Alternate-style safety jacket long-sleeve option" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        <section className="relative h-[36vh] md:h-[44vh] lg:h-[56vh] flex items-end justify-center text-center bg-gray-900/10">
          <img src={suppliesImage} alt="PPE supply" className="absolute inset-0 w-full h-full object-cover opacity-80" />
          <div className="relative z-10 container mx-auto px-6 py-20 text-white">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">PPE Supply</h1>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">Quality personal protective equipment, helmets, gloves, vests and suits. Order online or contact us for bulk supply.</p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold">PPE Products</h2>
              <p className="text-muted-foreground mt-2">High-quality PPE for site safety, available for individual and bulk orders.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {ppeProducts.map((p) => (
                <div key={p.id} className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition p-4 flex flex-col">
                  <div className="h-48 w-full overflow-hidden rounded-md bg-gray-50 flex items-center justify-center">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-4 flex-1">
                    <h3 className="font-display text-lg font-bold">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-end gap-4">
                    <a
                      href={`https://api.whatsapp.com/send?phone=260976769935&text=${encodeURIComponent(`Hello, I'm interested in the ${p.name} from Ingenuity (PPE Supply). Please advise on price & availability.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block btn-accent-2 font-bold px-4 py-2 rounded-md"
                    >
                      Order
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl font-bold">Our range of products</h3>
              <p className="text-muted-foreground mt-4">
                Worksuits, Safety boots, Hard hats, Ear plugs, Winter jackets, High impact gloves, Safety glasses, Industrial aprons, Respirators
              </p>
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default SuppliesLogistics;
