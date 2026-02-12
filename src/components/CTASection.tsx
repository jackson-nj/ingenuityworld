import { Phone, ArrowRight } from "lucide-react";


const CTASection = () => {
  return (
    <section className="py-16 lg:py-20 bg-accent-2 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(0,0,0,0.1)_20px,rgba(0,0,0,0.1)_40px)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-center lg:text-left max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-accent-2-foreground mb-4 leading-tight">
              READY TO START YOUR PROJECT?
            </h2>
            <p className="text-accent-2-foreground/80 text-xl leading-relaxed">
              Get in touch today for a free quote. Our team is standing by to help you find the right equipment for your needs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-5">
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
