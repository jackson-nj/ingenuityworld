const services = [
  { name: "Mechanical Fabrication", initials: "MF" },
  { name: "Industrial Maintenance", initials: "IM" },
  { name: "Civil Construction", initials: "CC" },
  { name: "PPE & Hardware Supply", initials: "PPE" },
  { name: "Logistics & Transport", initials: "LT" },
];

const BrandsSection = () => {
  return (
    <section className="py-6 lg:py-8 bg-white overflow-hidden">
      {/* Infinite Scrolling Marquee */}
      <div className="relative py-2">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
        
        {/* Scrolling container */}
        <div className="flex animate-marquee items-center">
          {/* First set of brands */}
          {[...services, ...services, ...services].map((service, index) => (
            <div
              key={`${service.name}-${index}`}
              className="flex-shrink-0 mx-6 flex items-center justify-center group"
            >
              <div className="w-14 h-14 bg-zinc-100 rounded-none flex items-center justify-center group-hover:bg-accent-2 transition-all duration-200">
                <span className="font-display text-lg font-bold text-zinc-700 group-hover:text-white transition-colors">
                  {service.initials}
                </span>
              </div>
              <span className="ml-2 text-xs text-zinc-500 font-semibold uppercase tracking-wider group-hover:text-accent-2 transition-colors">
                {service.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for marquee animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default BrandsSection;
