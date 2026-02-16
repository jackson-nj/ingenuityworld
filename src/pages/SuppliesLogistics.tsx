import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const suppliesImage = new URL("../assets/services/card3.jpg", import.meta.url).href;

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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        <section className="relative h-[36vh] md:h-[44vh] lg:h-[56vh] flex items-end justify-center text-center bg-gray-900/10">
          <img src={suppliesImage} alt="Supplies & Logistics" className="absolute inset-0 w-full h-full object-cover opacity-80" />
          <div className="relative z-10 container mx-auto px-6 py-20 text-white">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">Supplies & Logistics</h1>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">Procurement, transport, warehousing and logistics support to ensure your project runs smoothly.</p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="rounded-md overflow-hidden bg-gray-50 shadow-sm p-6 flex items-center gap-6">
              <img src={suppliesImage} alt="Supplies" className="w-40 h-32 object-cover rounded-md" />
              <div>
                <h3 className="font-display text-xl font-bold">End-to-end supply & logistics</h3>
                <p className="mt-2 text-muted-foreground">We provide procurement, warehousing and delivery of PPE, industrial hardware and site materials across Zambia and the Copperbelt.</p>
                <div className="mt-4">
                  <a href="/contact" className="inline-block btn-accent-2 font-bold px-4 py-2">Request supplies</a>
                </div>
              </div>
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
