// scripts/test-photos.ts
// Prints all procore_project_id values from breadcrumb_site_mappings in Supabase.
// Run with: npx ts-node --env-file=.env.local scripts/test-photos.ts

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function main() {
  const { data, error } = await supabase
    .from("breadcrumb_site_mappings")
    .select("breadcrumb_site_name, procore_project_id, company_id");

  if (error) {
    console.error("Supabase error:", error);
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.log("No rows found in breadcrumb_site_mappings");
    return;
  }

  console.log(`Found ${data.length} mappings:\n`);
  for (const row of data) {
    console.log(`  site="${row.breadcrumb_site_name}"  project_id=${row.procore_project_id}  company_id=${row.company_id}`);
  }

  const ids = [...new Set(data.map(r => r.procore_project_id).filter(Boolean))];
  console.log(`\nUnique procore_project_ids (${ids.length}):`);
  console.log(ids.join("\n"));
}

main().catch(err => { console.error(err); process.exit(1); });
