import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSeo from "@/hooks/useSeo";

const bgImage = new URL("../assets/services/construction1.jpg", import.meta.url).href;

const Gallery = () => {
  useSeo({
    title: "Projects & Gallery Ingenuity",
    description: "Our portfolio showcasing construction company Zambia and mining supply Copperbelt. Ingenuity offers industrial hardware and project support across the Copperbelt."
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <img src={bgImage} alt="projects" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="bg-black/65 p-6 rounded-md text-center mx-4 pt-20">
          <h1 data-animate="fade-up" data-animate-delay="100ms" className="font-display text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <h2 data-animate="fade-up" data-animate-delay="170ms" className="text-lg text-white/80 mb-2">Construction services Zambia and Industrial supply </h2>
          <p data-animate="fade-up" data-animate-delay="240ms" className="text-white/80 max-w-xl mx-auto">Check back soon </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
