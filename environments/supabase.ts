import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASEURL as string;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASEKEY as string;
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
