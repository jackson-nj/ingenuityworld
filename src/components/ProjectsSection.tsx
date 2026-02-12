import { ArrowRight, CheckCircle } from "lucide-react";

const project1Img = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop";
const project2Img = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop";
const project3Img = "https://images.unsplash.com/photo-1590644365607-1c5e8f4e5e4e?w=600&h=400&fit=crop";

const projects = [
  {
    title: "Sydney Commercial Complex",
    category: "Commercial Development",
    description: "Full earthmoving and site preparation for a 25-story commercial building.",
    image: project1Img,
    stats: { duration: "8 months", equipment: "12 machines" },
  },
  {
    title: "Highway Extension Project",
    category: "Infrastructure",
    description: "Road construction and grading for 15km highway extension.",
    image: project2Img,
    stats: { duration: "14 months", equipment: "18 machines" },
  },
  {
    title: "Mining Site Development",
    category: "Mining & Resources",
    description: "Large-scale excavation and material handling for mining operation.",
    image: project3Img,
    stats: { duration: "24 months", equipment: "25 machines" },
  },
];

const highlights = [
  "500+ Projects Delivered",
  "100% On-Time Completion",
  "Zero Safety Incidents",
  "Award-Winning Service",
];

const ProjectsSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div>
            <span className="text-accent-2 font-bold uppercase tracking-[0.2em] text-sm">Our Portfolio</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-4">
              FEATURED <span className="text-accent-2">PROJECTS</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-6">
            {highlights.map((highlight) => (
              <div key={highlight} className="flex items-center gap-3 text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-accent-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group bg-white rounded overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border hover:border-accent-2"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-5 left-5">
                  <span className="bg-accent-2 text-accent-2-foreground text-xs font-bold px-4 py-2 rounded uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-accent-2 transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Stats */}
                <div className="flex gap-8 mb-6 text-sm">
                  <div>
                    <span className="text-muted-foreground uppercase tracking-wider text-xs">Duration:</span>
                    <span className="font-bold text-foreground ml-2">{project.stats.duration}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground uppercase tracking-wider text-xs">Equipment:</span>
                    <span className="font-bold text-foreground ml-2">{project.stats.equipment}</span>
                  </div>
                </div>

                <button className="flex items-center gap-2 text-accent-2 font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                  <span>View Project</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-3 btn-accent-2 px-10 py-5 rounded font-bold uppercase tracking-wider hover:bg-accent transition-colors group shadow-lg">
            View All Projects
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
