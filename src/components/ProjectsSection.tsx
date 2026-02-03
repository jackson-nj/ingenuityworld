import { ArrowRight, CheckCircle } from "lucide-react";
import project1Img from "@/assets/project1.jpg";
import project2Img from "@/assets/project2.jpg";
import project3Img from "@/assets/project3.jpg";

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
  "100% On-Time Completion Rate",
  "Zero Safety Incidents",
  "Award-Winning Service",
];

const ProjectsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
          <div>
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Our Portfolio</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
              FEATURED <span className="text-primary">PROJECTS</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {highlights.map((highlight) => (
              <div key={highlight} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                
                {/* Stats */}
                <div className="flex gap-6 mb-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-semibold text-foreground ml-1">{project.stats.duration}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Equipment:</span>
                    <span className="font-semibold text-foreground ml-1">{project.stats.equipment}</span>
                  </div>
                </div>

                <button className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-4 transition-all">
                  <span>View Project</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded font-semibold hover:bg-accent transition-colors">
            View All Projects
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
