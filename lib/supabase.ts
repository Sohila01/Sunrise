import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zyexceyicpupdypssine.supabase.co';
const SUPABASE_KEY = 'sb_publishable_lhWJJWSLi3sF5nLtrVIuMw_X8E7KtzZ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
