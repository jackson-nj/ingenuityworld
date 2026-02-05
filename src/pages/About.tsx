import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Building2, Truck, Home, Factory, Trees, Landmark, Shield, Award, Users } from "lucide-react";
import { useEffect, useRef } from "react";
import aboutUs1 from "@/assets/services/about us1.jpg";
import aboutUs2 from "@/assets/services/about us2.jpg";
import aboutUs3 from "@/assets/services/about us3.jpg";

const stats = [
  { value: "6+", label: "Years Experience" },
  { value: "130+", label: "Projects Completed" },
  { value: "50+", label: "Equipment Fleet" },
  { value: "100%", label: "Client Satisfaction" },
];

const aboutFeatures = [
  "Modern fleet of well-maintained equipment",
  "Experienced and certified operators",
  "Flexible rental terms to suit your needs",
  "24/7 customer support and assistance",
  "Competitive pricing with no hidden costs",
  "On-time delivery and pickup services",
];

const whyBestFeatures = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Every piece of equipment undergoes rigorous inspection before deployment.",
  },
  {
    icon: Award,
    title: "Industry Leader",
    description: "Recognized as a top equipment hire company in the region.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our team brings decades of combined experience to every project.",
  },
];

const industries = [
  { icon: Building2, title: "Commercial Construction", description: "Office buildings, retail spaces, and commercial complexes" },
  { icon: Home, title: "Residential Development", description: "Housing projects, apartments, and residential communities" },
  { icon: Truck, title: "Infrastructure", description: "Roads, bridges, and public infrastructure projects" },
  { icon: Factory, title: "Industrial", description: "Factories, warehouses, and industrial facilities" },
  { icon: Trees, title: "Landscaping", description: "Parks, gardens, and outdoor recreational areas" },
  { icon: Landmark, title: "Government Projects", description: "Public sector construction and development" },
];

const About = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".fade-up, .img-reveal-container");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Animation Styles */}
      <style>{`
        .about-hero-bg {
          background-image: url(${aboutUs1});
          background-size: cover;
          background-position: center;
          /* Force permanent grayscale on hero background */
          filter: grayscale(100%);
          -webkit-filter: grayscale(100%);
        }
        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-up.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-up-delay-1 { transition-delay: 0.1s; }
        .fade-up-delay-2 { transition-delay: 0.2s; }
        .fade-up-delay-3 { transition-delay: 0.3s; }
        .fade-up-delay-4 { transition-delay: 0.4s; }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .hero-title {
          animation: fadeInUp 1s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .hero-bg {
          animation: fadeIn 1.2s ease-out forwards;
        }
        
        .img-reveal-container {
          position: relative;
          overflow: hidden;
        }

        .img-color {
          position: relative;
          z-index: 1;
          filter: grayscale(100%);
        }
        
        .paint-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 3;
          pointer-events: none;
          mix-blend-mode: multiply;
        }
        
        .paint-drop {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          opacity: 0;
          animation: none;
        }
        .paint-drop1 { top: 20%; left: 30%; width: 80px; height: 80px; background: white; }
        .paint-drop2 { top: 50%; left: 60%; width: 100px; height: 100px; background: white; }
        .paint-drop3 { top: 70%; left: 20%; width: 90px; height: 90px; background: white; }
        .paint-drop4 { top: 30%; left: 70%; width: 70px; height: 70px; background: white; }
        .paint-drop5 { top: 60%; left: 40%; width: 110px; height: 110px; background: white; }
        .paint-drop6 { top: 10%; left: 50%; width: 85px; height: 85px; background: white; }
        .paint-drop7 { top: 80%; left: 70%; width: 95px; height: 95px; background: white; }
        .paint-drop8 { top: 40%; left: 10%; width: 75px; height: 75px; background: white; }
        .paint-drop9 { top: 15%; left: 40%; width: 90px; height: 90px; background: white; }
        .paint-drop10 { top: 45%; left: 25%; width: 100px; height: 100px; background: white; }
        .paint-drop11 { top: 65%; left: 55%; width: 85px; height: 85px; background: white; }
        .paint-drop12 { top: 25%; left: 65%; width: 75px; height: 75px; background: white; }
        .paint-drop13 { top: 55%; left: 75%; width: 95px; height: 95px; background: white; }
        .paint-drop14 { top: 75%; left: 35%; width: 80px; height: 80px; background: white; }
        .paint-drop15 { top: 35%; left: 15%; width: 110px; height: 110px; background: white; }
        .paint-drop16 { top: 85%; left: 60%; width: 70px; height: 70px; background: white; }
        
        .img-reveal-container.animate-in .paint-drop {
          animation: paintDrop 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .img-reveal-container.animate-in .paint-drop:nth-child(1) { animation-delay: 0s; }
        .img-reveal-container.animate-in .paint-drop:nth-child(2) { animation-delay: 0.1s; }
        .img-reveal-container.animate-in .paint-drop:nth-child(3) { animation-delay: 0.2s; }
        .img-reveal-container.animate-in .paint-drop:nth-child(4) { animation-delay: 0.15s; }
        .img-reveal-container.animate-in .paint-drop:nth-child(5) { animation-delay: 0.25s; }
        .img-reveal-container.animate-in .paint-drop:nth-child(6) { animation-delay: 0.3s; }
        .img-reveal-container.animate-in .paint-drop:nth-child(7) { animation-delay: 0.05s; }
        .img-reveal-container.animate-in .paint-drop:nth-child(8) { animation-delay: 0.35s; }
        
        /* Grayscale handled on the primary image via .img-color */
        
        @keyframes paintDrop {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(25);
            opacity: 1;
          }
        }
      `}</style>

      <Header />
      
      {/* Hero Section with Background Image */}
      <section className="relative h-[60vh] min-h-[450px] flex items-end justify-center pb-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg about-hero-bg"
        />
        <div className="absolute inset-0 bg-charcoal/25" />
        <div className="relative z-10 text-center px-6">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-widest hero-title">
            About Us
          </h1>
        </div>
      </section>

      {/* About Us Section with Image - WhyChooseUs Style */}
      <section className="py-24 lg:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative flex flex-col lg:flex-row">
            {/* Content Side - white card on the left */}
            <div className="relative z-10 lg:w-[55%] w-full lg:mt-16">
              <div className="bg-white p-10 lg:p-12 lg:pr-16">
                <span className="fade-up text-primary font-bold uppercase tracking-[0.2em] text-sm">Who We Are</span>
                <h2 className="fade-up fade-up-delay-1 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 leading-tight">
                  YOUR TRUSTED PARTNER IN <span className="text-primary">EQUIPMENTS</span>
                </h2>
                <p className="fade-up fade-up-delay-2 text-primary font-semibold mb-6 text-lg italic">
                  Building the future with reliable equipment and exceptional service since 2019
                </p>
                <p className="fade-up fade-up-delay-2 text-muted-foreground mb-6 text-base leading-relaxed">
                  Changati Construction has been at the forefront of the equipment hire industry for over 6 years. 
                  We've built our reputation on reliability, quality, and an unwavering commitment to our clients' success.
                </p>
                <p className="fade-up fade-up-delay-3 text-muted-foreground mb-8 text-base leading-relaxed">
                  From small projects to large-scale construction, we've grown into one of the country's most trusted 
                  equipment hire Company, serving hundreds of construction projects across various industries.
                </p>

                {/* Features List */}
                <div className="fade-up fade-up-delay-4 grid sm:grid-cols-2 gap-x-8 gap-y-4">
                  {aboutFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Image Side - positioned higher, extends above text card */}
            <div className="lg:absolute lg:right-0 lg:top-0 lg:w-[48%] w-full">
              <div className="img-reveal-container relative h-[400px] lg:h-[600px]">
                <img
                  src={aboutUs2}
                  alt="Changati Construction Team"
                  className="img-color w-full h-full object-cover filter grayscale"
                />
                {/* Paint drops overlay */}
                <div className="paint-overlay">
                  <div className="paint-drop paint-drop1" />
                  <div className="paint-drop paint-drop2" />
                  <div className="paint-drop paint-drop3" />
                  <div className="paint-drop paint-drop4" />
                  <div className="paint-drop paint-drop5" />
                  <div className="paint-drop paint-drop6" />
                  <div className="paint-drop paint-drop7" />
                  <div className="paint-drop paint-drop8" />
                </div>
                {/* Thick border on right side and small bottom portion */}
                <div className="absolute top-0 -right-3 w-6 h-full bg-primary" />
                <div className="absolute -bottom-3 right-0 w-24 h-6 bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`fade-up fade-up-delay-${index % 4 + 1} text-center`}>
                <span className="font-display text-4xl md:text-5xl font-bold text-white block mb-2">
                  {stat.value}
                </span>
                <span className="text-white/80 text-sm uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* We Are The Best Section - Card Style */}
      <section className="py-24 lg:py-32 bg-zinc-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="fade-up text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
              Our Excellence
            </span>
            <h2 className="fade-up fade-up-delay-1 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              WE ARE THE <span className="text-primary">BEST</span> IN THE BUSINESS
            </h2>
            <p className="fade-up fade-up-delay-2 text-muted-foreground max-w-3xl mx-auto text-base leading-relaxed">
              Our commitment to excellence, combined with decades of industry experience, makes us the preferred 
              choice for construction equipment hire. We don't just rent equipment — we deliver solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyBestFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className={`fade-up fade-up-delay-${index + 1} bg-white p-10 group hover:bg-charcoal transition-all duration-300`}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                    <Icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-white/70 transition-colors">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="py-24 lg:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative flex flex-col-reverse lg:flex-row">
            {/* Image Side - on the left */}
            <div className="lg:absolute lg:left-0 lg:top-0 lg:w-[45%] w-full mt-10 lg:mt-0">
              <div className="img-reveal-container relative h-[400px] lg:h-[650px]">
                <img
                  src={aboutUs3}
                  alt="Industries We Serve"
                  className="img-color w-full h-full object-cover filter grayscale"
                />
                {/* Paint drops overlay */}
                <div className="paint-overlay">
                  <div className="paint-drop paint-drop9" />
                  <div className="paint-drop paint-drop10" />
                  <div className="paint-drop paint-drop11" />
                  <div className="paint-drop paint-drop12" />
                  <div className="paint-drop paint-drop13" />
                  <div className="paint-drop paint-drop14" />
                  <div className="paint-drop paint-drop15" />
                  <div className="paint-drop paint-drop16" />
                </div>
                {/* Thick border on left side and small bottom portion */}
                <div className="absolute top-0 -left-3 w-6 h-full bg-primary" />
                <div className="absolute -bottom-3 left-0 w-24 h-6 bg-primary" />
              </div>
            </div>

            {/* Content Side - on the right */}
            <div className="relative z-10 lg:w-[55%] w-full lg:ml-auto lg:mt-16">
              <div className="bg-white p-10 lg:p-12 lg:pl-16">
                <span className="fade-up text-primary font-bold uppercase tracking-[0.2em] text-sm">Our Reach</span>
                <h2 className="fade-up fade-up-delay-1 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 leading-tight">
                  INDUSTRIES <span className="text-primary">WE SERVE</span>
                </h2>
                <p className="fade-up fade-up-delay-2 text-muted-foreground mb-10 text-base leading-relaxed">
                  Our versatile equipment fleet and experienced team enable us to serve a wide range of industries, 
                  delivering tailored solutions for every unique project requirement.
                </p>

                {/* Industries Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {industries.map((industry, index) => {
                    const Icon = industry.icon;
                    return (
                      <div key={index} className={`fade-up fade-up-delay-${(index % 4) + 1} flex items-start gap-4 group`}>
                        <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                          <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-foreground mb-1 text-base">{industry.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{industry.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
