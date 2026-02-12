import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSeo from "@/hooks/useSeo";

const bgImage = new URL("../assets/services/construction1.jpg", import.meta.url).href;

const Gallery = () => {
  useSeo({
    title: "Projects & Gallery Ingenuity | Mining Services Zambia",
    description: "Our portfolio showcasing mining services Zambia, construction company Zambia, and mining supply Copperbelt. Ingenuity offers PPE supplier Zambia and industrial hardware Zambia for project needs."
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <img src={bgImage} alt="projects mining services Zambia" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="bg-black/65 p-10 rounded-md text-center mx-4">
          <h1 data-animate="fade-up" data-animate-delay="100ms" className="font-display text-4xl md:text-5xl font-bold mb-4">Projects & Mining Supply Copperbelt Projects</h1>
          <h2 data-animate="fade-up" data-animate-delay="170ms" className="text-lg text-white/80 mb-2">Construction services Zambia · Industrial supply Copperbelt</h2>
          <p data-animate="fade-up" data-animate-delay="240ms" className="text-white/80 max-w-xl mx-auto">We're preparing a portfolio of our fabrication, construction and maintenance work. Check back soon or contact us to request samples.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
