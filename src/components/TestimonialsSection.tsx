import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Michael Chen",
    role: "Project Manager, BuildCorp Construction",
    content: "HeavyHire has been our go-to equipment partner for 5 years. Their reliability and quality of machinery is unmatched. The operators are professional and the equipment is always in top condition.",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    role: "Operations Director, RoadWorks Australia",
    content: "When we needed excavators and graders for our highway project, HeavyHire delivered within 24 hours. Their support team is responsive and they truly understand construction timelines.",
    rating: 5,
  },
  {
    name: "James Morrison",
    role: "Site Supervisor, Morrison & Co",
    content: "Excellent service from start to finish. The equipment was delivered on time, the operators knew exactly what they were doing, and the pricing was very competitive. Highly recommended!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-charcoal text-charcoal-foreground">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">Testimonials</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            WHAT OUR <span className="text-primary">CLIENTS SAY</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what industry professionals have to say about working with HeavyHire.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-surface-dark p-8 rounded-lg relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="h-10 w-10 text-primary/30 absolute top-6 right-6" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="font-display font-bold text-primary-foreground">
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
