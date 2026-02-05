import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const seedPath = path.resolve(process.cwd(), "supabase-seed-output.json");
if (!fs.existsSync(seedPath)) {
  console.error(`Seed file not found: ${seedPath}`);
  process.exit(1);
}

const seed = JSON.parse(fs.readFileSync(seedPath, "utf8"));
const equipmentSeed = seed.equipment || [];

(async () => {
  try {
    console.log(`Found ${equipmentSeed.length} equipment seed items.`);

    const { data: existing, error: selErr } = await supabase.from("equipment").select("id,image_url,name");
    if (selErr) throw selErr;
    const existingUrls = new Set((existing || []).map((r) => r.image_url).filter(Boolean));

    const toInsert = equipmentSeed
      .map((e) => {
        const publicUrl = e.publicUrl;
        const base = path.basename(e.local || publicUrl || "");
        const name = base.replace(/[-_\d]+/g, " ").replace(/\.(jpg|jpeg|png|gif|svg)$/i, "").replace(/\s+/g, " ").trim();
        return { name: name || base, image_url: publicUrl, description: null };
      })
      .filter((r) => r.image_url && !existingUrls.has(r.image_url));

    if (toInsert.length === 0) {
      console.log("No new equipment to insert.");
      process.exit(0);
    }

    console.log(`Inserting ${toInsert.length} equipment rows...`);
    const { data: inserted, error: insErr } = await supabase.from("equipment").insert(toInsert).select();
    if (insErr) throw insErr;

    console.log(`Inserted ${inserted.length} rows.`);
    const outPath = path.resolve(process.cwd(), "supabase-inserted-equipment.json");
    fs.writeFileSync(outPath, JSON.stringify(inserted, null, 2));
    console.log(`Wrote inserted rows to ${outPath}`);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
})();
