import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 lg:py-28 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(0,0,0,0.1)_20px,rgba(0,0,0,0.1)_40px)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-center lg:text-left max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              READY TO START YOUR PROJECT?
            </h2>
            <p className="text-primary-foreground/80 text-xl leading-relaxed">
              Get in touch today for a free quote. Our team is standing by to help you find the right equipment for your needs.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <Button
              asChild
              size="lg"
              className="bg-surface-dark text-white font-bold px-10 py-7 text-lg uppercase tracking-wider shadow-2xl hover:bg-surface-dark inline-flex items-center justify-center"
            >
              <a
                href="https://wa.me/260971688888?text=Hello%2C%20I%27m%20interested%20in%20hiring%20heavy%20equipment.%20Please%20advise%20on%20availability%20and%20next%20steps."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Phone className="mr-3 h-5 w-5" />
                Request Quote
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
