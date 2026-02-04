import equipmentHireImg from "@/assets/services/equipment hire.jpg";
import wetHireImg from "@/assets/services/wet hire.jpg";
import dryHireImg from "@/assets/services/dry hire.jpg";
import deliveryImg from "@/assets/services/delivery.jpg";

const services = [
  {
    title: "Equipments for Hire",
    description: "Excavators, bulldozers, graders, loaders, rollers, dump trucks, cranes.",
    image: equipmentHireImg,
  },
  {
    title: "Wet Hire (Equipment + Operator)",
    description: "Certified, experienced operators supplied with machinery.",
    image: wetHireImg,
  },
  {
    title: "Equipment Delivery",
    description: "Reliable delivery and pickup services to your project site.",
    image: deliveryImg,
  },
  {
    title: "Dry Hire (Equipment Only)",
    description: "Well-maintained machines for experienced contractors.",
    image: dryHireImg,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm">What We Offer</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4">
            HIRE <span className="text-primary">SERVICES</span>
          </h2>
        </div>

        {/* Services Grid - 2 per row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative h-64 lg:h-80 overflow-hidden bg-gray-50">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
