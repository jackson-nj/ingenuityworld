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

async function insertForTable(tableName, items) {
  if (!items || items.length === 0) return [];

  const { data: existing, error: selErr } = await supabase.from(tableName).select("id,image_url");
  if (selErr) throw selErr;
  const existingUrls = new Set((existing || []).map((r) => r.image_url).filter(Boolean));

  const baseItems = items
    .map((e) => {
      const publicUrl = e.publicUrl;
      const base = path.basename(e.local || publicUrl || "");
      const name = base.replace(/[-_\d]+/g, " ").replace(/\.(jpg|jpeg|png|gif|svg)$/i, "").replace(/\s+/g, " ").trim();
      return { baseName: name || base, image_url: publicUrl };
    })
    .filter((r) => r.image_url && !existingUrls.has(r.image_url));

  if (baseItems.length === 0) return [];

  // Attempt inserts with different name-field and image-field candidates to accommodate varying schemas
  const nameCandidates = ["name", "title", "label", null];
  const imageCandidates = ["image_url", "url", "src", "image", "path", "public_url"];

      for (const nameCandidate of nameCandidates) {
    for (const imageCandidate of imageCandidates) {
      const toInsert = baseItems.map((b) => {
        const obj = {};
        if (nameCandidate) obj[nameCandidate] = b.baseName;
        obj[imageCandidate] = b.image_url;
        // include description if the column exists; we'll try and catch if not
        obj.description = null;
        // special-case gallery: some schemas require an `alt` column
        if (tableName === "gallery") {
          obj.alt = b.baseName;
        }
        return obj;
      });
      try {
        const { data: inserted, error: insErr } = await supabase.from(tableName).insert(toInsert).select();
        if (insErr) throw insErr;
        return inserted || [];
      } catch (err) {
        // If error indicates missing column(s), try next candidate combo; otherwise attempt to auto-fill missing NOT NULL column
        const message = err && (err.message || err.error_description || err.details || "");
        if (err && (err.code === "PGRST204" || err.code === "42703") && /Could not find the|does not exist/.test(message)) {
          continue;
        }

        // handle NOT NULL violation by detecting column and retrying with that column filled
        if (err && err.code === "23502") {
          const m = (message || "").match(/column \"?([a-zA-Z0-9_]+)\"? of relation \"?[a-zA-Z0-9_]+\"? violates not-null constraint/);
          const col = m && m[1];
          if (col) {
            const toInsertFixed = baseItems.map((b) => {
              const obj = {};
              if (nameCandidate) obj[nameCandidate] = b.baseName;
              obj[imageCandidate] = b.image_url;
              obj.description = null;
              if (tableName === "gallery") obj.alt = b.baseName;
              // if column looks like an image field, set to image_url, otherwise set to baseName
              if (["src", "image", "image_url", "url", "path", "public_url"].includes(col)) {
                obj[col] = b.image_url;
              } else {
                obj[col] = b.baseName;
              }
              return obj;
            });
            try {
              const { data: inserted2, error: insErr2 } = await supabase.from(tableName).insert(toInsertFixed).select();
              if (insErr2) throw insErr2;
              return inserted2 || [];
            } catch (err2) {
              // if still failing, continue trying other combos
              const msg2 = err2 && (err2.message || err2.details || "");
              if (err2 && (err2.code === "PGRST204" || err2.code === "42703")) continue;
              throw err2;
            }
          }
        }

        throw err;
      }
    }
  }

  // If we reach here, none of the candidate combos worked
  throw new Error(`Unable to insert into ${tableName}: no compatible name/image columns found`);
}

(async () => {
  try {
    const results = {};
    const tables = ["hire", "services", "gallery", "certifications"];

    for (const t of tables) {
      console.log(`Processing ${t}...`);
      const items = seed[t] || [];
      const inserted = await insertForTable(t, items);
      results[t] = inserted;
      console.log(`Inserted ${inserted.length} rows into ${t}`);
    }

    const outPath = path.resolve(process.cwd(), "supabase-inserted-all.json");
    fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
    console.log(`Wrote inserted rows to ${outPath}`);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
})();
