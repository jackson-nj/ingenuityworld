import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import EquipmentSection from "@/components/EquipmentSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import BrandsSection from "@/components/BrandsSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <EquipmentSection />
        <WhyChooseUsSection />
        <BrandsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
