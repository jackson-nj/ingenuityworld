const brands = [
  { name: "Caterpillar", initials: "CAT" },
  { name: "Komatsu", initials: "KMT" },
  { name: "Hitachi", initials: "HIT" },
  { name: "Volvo", initials: "VOL" },
  { name: "John Deere", initials: "JD" },
  { name: "Liebherr", initials: "LIE" },
  { name: "Case", initials: "CSE" },
  { name: "JCB", initials: "JCB" },
];

const BrandsSection = () => {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">Trusted Partners</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">
            BRANDS WE'VE WORKED WITH
          </h2>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col items-center justify-center p-6 bg-muted rounded-lg hover:bg-muted/80 transition-colors group cursor-pointer"
            >
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-sm">
                <span className="font-display text-lg font-bold text-foreground group-hover:text-primary-foreground transition-colors">
                  {brand.initials}
                </span>
              </div>
              <span className="text-sm text-muted-foreground font-medium">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
