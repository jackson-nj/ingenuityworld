import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const suppliesImage = new URL("../assets/services/supply and logistics/main image.jpg", import.meta.url).href;

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

  const supplyItems = [
    { id: "procurement", title: "Procurement", img: new URL("../assets/services/supply and logistics/procurement.jpg", import.meta.url).href, desc: "Sourcing, vendor management and purchase orders." },
    { id: "inventory", title: "Inventory Control", img: new URL("../assets/services/supply and logistics/invetory control.jpg", import.meta.url).href, desc: "Stock monitoring, cycle counts and reporting." },
    { id: "warehousing", title: "Stores & Warehousing", img: new URL("../assets/services/supply and logistics/stores and warehousing.jpg", import.meta.url).href, desc: "Secure storage, picking & packing and inventory optimisation." },
    { id: "clearing", title: "Clearing & Forwarding", img: new URL("../assets/services/supply and logistics/clearing and forwading.jpg", import.meta.url).href, desc: "Customs clearance and international freight coordination." },
    { id: "transport", title: "Transport & Logistics", img: new URL("../assets/services/supply and logistics/transport and logistics.jpg", import.meta.url).href, desc: "Fleet management, regional transport and last-mile delivery." },
    { id: "scm", title: "Supply Chain Management", img: new URL("../assets/services/supply and logistics/supply chain managememnt.jpg", import.meta.url).href, desc: "End-to-end planning and optimisation across your supply chain." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        <section className="relative h-[36vh] md:h-[44vh] lg:h-[56vh] flex items-end justify-center text-center bg-gray-900/10">
          <img src={suppliesImage} alt="Supply Chain & Logistics" className="absolute inset-0 w-full h-full object-cover" />

          {/* overlay to improve text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" aria-hidden="true" />

          <div className="relative z-10 container mx-auto px-6 py-20 text-white">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">Supply Chain & Logistics Services</h1>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">End-to-end supply chain and logistics support | procurement, warehousing, clearing & forwarding and transport solutions.</p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold">Our Supply Chain & Logistics Services</h2>
              <p className="text-muted-foreground mt-2">Comprehensive logistics solutions tailored to industry requirements.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {supplyItems.map((s) => (
                <article key={s.id} className="bg-white border rounded-lg overflow-hidden shadow-sm p-4 flex flex-col items-center text-center">
                  <button onClick={() => { setActiveImage(s.img); setLightboxOpen(true); }} className="w-full h-40 overflow-hidden rounded-md bg-gray-50 focus:outline-none">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                  </button>
                  <h4 className="mt-4 font-semibold">{s.title}</h4>
                  <p className="text-muted-foreground text-sm mt-2">{s.desc}</p>
                </article>
              ))}
            </div>

            <div className="mt-6 text-center">
                <a
                  href="https://api.whatsapp.com/send?phone=260975078766&text=Hello%2C%20I%27m%20interested%20in%20your%20Supply%20Chain%20%26%20Logistics%20services.%20Please%20advise%20on%20availability%20and%20next%20steps."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block btn-accent-2 font-bold px-6 py-3 rounded-md"
                >
                  Get in touch
                </a>
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
