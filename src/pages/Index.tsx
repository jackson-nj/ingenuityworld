import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import EquipmentSection from "@/components/EquipmentSection";
import About from "./About";
import ServicesSection from "@/components/ServicesSection";
import BrandsSection from "@/components/BrandsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import useSeo from "@/hooks/useSeo";

const Index = () => {
  useSeo({
    title: "Ingenuity Mining Services Zambia | PPE supplier & Industrial Hardware",
    description: "Ingenuity Specialized Engineering Works Ltd mining services Zambia, PPE supplier Zambia, industrial hardware Zambia, construction company Zambia, mining supply Copperbelt. Heavy equipment hire, fabrication, and procurement."
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <About />
        <ServicesSection />
        <EquipmentSection />
        <BrandsSection />
        <WhyChooseUsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
