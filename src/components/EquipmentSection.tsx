 import { useState, useEffect } from "react";
 import { Link } from "react-router-dom";
 import { Loader2 } from "lucide-react";
 import { supabase } from "@/integrations/supabase/client";
 
interface EquipmentItem {
  id: string;
  name: string;
  image_url?: string | null;
}

const fallbackEquipment = [
  { id: "1", name: "Mopani Works", image_url: new URL("../assets/services/mopani.jpg", import.meta.url).href },
  { id: "2", name: "Neelkanth Lime", image_url: new URL("../assets/services/Neelkanth-lime-1.png", import.meta.url).href },
  { id: "3", name: "Konkola Plant", image_url: new URL("../assets/services/konkola.avif", import.meta.url).href },
  { id: "4", name: "Kansashi Site", image_url: new URL("../assets/services/kansashi.jpg", import.meta.url).href },
  { id: "5", name: "Barrick Mine", image_url: new URL("../assets/services/Barrick-Gold-Mine.png", import.meta.url).href },
];
 
 const EquipmentSection = () => {
   const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     const fetchEquipment = async () => {
       try {
         const { data, error } = await supabase
           .from("equipment")
           .select("*")
           .order("created_at", { ascending: false })
           .limit(8);
 
         if (error) throw error;
         setEquipment(data && data.length > 0 ? data : fallbackEquipment);
       } catch (err) {
         console.error("Error fetching equipment:", err);
         setEquipment(fallbackEquipment);
       } finally {
         setLoading(false);
       }
     };
 
     fetchEquipment();
   }, []);

  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-2">
            TARGET <span className="text-accent-2">SERVICES</span>
          </h2>
          <div className="text-sm text-muted-foreground mb-4">Mining Operations</div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Browse our core service offerings focused on industrial mining, construction and mechanical projects.
          </p>
        </div>

         {loading ? (
           <div className="flex items-center justify-center py-20">
             <Loader2 className="h-8 w-8 animate-spin text-accent-2" />
           </div>
         ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: "1", name: "Mopani Works", image_url: new URL("../assets/services/mopani.jpg", import.meta.url).href },
              { id: "2", name: "Neelkanth Lime", image_url: new URL("../assets/services/Neelkanth-lime-1.png", import.meta.url).href },
              { id: "3", name: "Konkola Plant", image_url: new URL("../assets/services/konkola.avif", import.meta.url).href },
              { id: "4", name: "Kansashi Site", image_url: new URL("../assets/services/kansashi.jpg", import.meta.url).href },
              { id: "5", name: "Barrick Mine", image_url: new URL("../assets/services/Barrick-Gold-Mine.png", import.meta.url).href },
            ].map((item) => (
              <div
                key={item.id}
                className="bg-white border-2 border-gray-100 overflow-hidden transition-all duration-300 shadow-sm"
              >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <img
                  src={item.image_url || "/placeholder.svg"}
                  alt={`${item.name} — mining services Zambia and construction`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Title (no buttons) */}
              <div className="p-4 text-center bg-gray-50/50 border-t border-gray-100">
                <div className="h-6 flex items-center justify-center">
                  <span className="font-display text-base font-bold text-foreground">{item.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
         )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-block btn-accent-2 text-white font-bold px-10 py-4 text-sm uppercase tracking-wider transition-colors duration-300 hover:bg-charcoal hover:text-white"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;
