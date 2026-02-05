 import { useEffect, useState } from "react";
 import { Link } from "react-router-dom";
import { Truck, Wrench, Image, Award, Settings, ArrowRight } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import FileUploader from "@/components/admin/FileUploader";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
   const [counts, setCounts] = useState({
     equipment: 0,
     hire: 0,
     gallery: 0,
     certifications: 0,
     services: 0,
   });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<Array<{ url: string; uploaded: boolean }>>([]);
 
  const toast = useToast();

  const fetchCounts = async () => {
    const tables = ["equipment", "hire", "gallery", "certifications", "services"] as const;
    const results = await Promise.all(
      tables.map(async (table) => {
        const { count } = await supabase.from(table).select("*", { count: "exact", head: true });
        return { table, count: count || 0 };
      })
    );
    const newCounts = results.reduce((acc, { table, count }) => {
      acc[table] = count;
      return acc;
    }, {} as Record<string, number>);
    setCounts(newCounts as typeof counts);
  };

  useEffect(() => {
    fetchCounts();
  }, []);
 
   const sections = [
     {
       icon: Truck,
       title: "Equipment",
       description: "Manage equipment categories displayed on the home page",
       path: "/admin/equipment",
       count: counts.equipment,
     },
     {
       icon: Wrench,
       title: "Hire",
       description: "Manage equipment available for hire",
       path: "/admin/hire",
       count: counts.hire,
     },
    {
      icon: Image,
      title: "Projects",
      description: "Manage project images and media",
      path: "/admin/gallery",
      count: counts.gallery,
    },
     {
       icon: Award,
       title: "Certifications",
       description: "Manage company certifications and credentials",
       path: "/admin/certifications",
       count: counts.certifications,
     },
     {
       icon: Settings,
       title: "Services",
       description: "Manage services displayed on the website",
       path: "/admin/services",
       count: counts.services,
     },
   ];
 
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Welcome to Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your website content from here
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {sections.map((section) => (
            <Link
              key={section.path}
              to={section.path}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-3xl font-bold text-foreground">
                  {section.count}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">
                {section.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {section.description}
              </p>
              <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium">
                Manage
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/equipment"
              className="flex items-center gap-3 p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <Truck className="h-5 w-5 text-primary" />
              <span className="font-medium">Add Equipment</span>
            </Link>
            <Link
              to="/admin/gallery"
              className="flex items-center gap-3 p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <Image className="h-5 w-5 text-primary" />
              <span className="font-medium">Manage Projects</span>
            </Link>
            <Link
              to="/admin/certifications"
              className="flex items-center gap-3 p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <Award className="h-5 w-5 text-primary" />
              <span className="font-medium">Add Certification</span>
            </Link>
            <Link
              to="/admin/services"
              className="flex items-center gap-3 p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <Settings className="h-5 w-5 text-primary" />
              <span className="font-medium">Edit Services</span>
            </Link>
          </div>
        </div>

        {/* Projects Form */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-display text-lg font-bold text-foreground mb-2">Add Project</h3>
          <p className="text-muted-foreground text-sm mb-4">Add a new project with images, title and description.</p>
          <div className="grid grid-cols-1 gap-3">
            <input
              placeholder="Project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-border rounded px-3 py-2"
            />
            <textarea
              placeholder="Project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-border rounded px-3 py-2 h-24"
            />

            <div>
              <p className="text-sm text-muted-foreground mb-2">Images</p>
              <div className="flex items-start gap-4">
                <FileUploader
                  folder="projects"
                  onFileSelected={(file, preview) => {
                    setImages((s) => [...s, { url: preview, uploaded: false }]);
                  }}
                  onUpload={(url) => {
                    setImages((s) => {
                      const next = [...s];
                      const idx = next.findIndex((i) => !i.uploaded);
                      if (idx === -1) next.push({ url, uploaded: true });
                      else next[idx] = { url, uploaded: true };
                      return next;
                    });
                    toast.toast({ title: "Upload complete", description: "Image uploaded to storage" });
                  }}
                />
                <div className="flex gap-2 flex-wrap">
                  {images.map((img, i) => (
                    <div key={i} className="w-24 h-16 bg-muted rounded overflow-hidden relative">
                      <img src={img.url} className="w-full h-full object-cover" alt={`preview-${i}`} />
                      <button
                        type="button"
                        onClick={() => setImages((s) => s.filter((_, idx) => idx !== i))}
                        className="absolute top-0 right-0 bg-black/50 text-white text-xs px-1"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <Button
                onClick={async () => {
                  if (images.length === 0) {
                    toast.toast({ title: "No images", description: "Please upload at least one image." });
                    return;
                  }
                  const payload = images.map((img) => ({ src: img.url, alt: title || "", name: title || null, description: description || null }));
                  try {
                    const { data, error } = await supabase.from("gallery").insert(payload).select();
                    if (error) throw error;
                    toast.toast({ title: "Project added", description: "Project images saved to gallery." });
                    setTitle("");
                    setDescription("");
                    setImages([]);
                    await fetchCounts();
                  } catch (err) {
                    console.error(err);
                    try {
                      const minimal = images.map((img) => ({ src: img.url, alt: title || "" }));
                      const { data: d2, error: e2 } = await supabase.from("gallery").insert(minimal).select();
                      if (e2) throw e2;
                      toast.toast({ title: "Project added (minimal)", description: "Saved images without metadata." });
                      setTitle("");
                      setDescription("");
                      setImages([]);
                      await fetchCounts();
                    } catch (err2) {
                      console.error(err2);
                      toast.toast({ title: "Save failed", description: "Could not save project. Check console." });
                    }
                  }
                }}
              >
                Save Project
              </Button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
          <h3 className="font-display text-lg font-bold text-foreground mb-2">✅ Connected to Supabase</h3>
          <p className="text-muted-foreground">Your admin dashboard is connected to Supabase. All changes are saved to the cloud and synced across the website in real-time.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
