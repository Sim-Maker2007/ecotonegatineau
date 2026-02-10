import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase = null;

export function getSupabase() {
  if (!supabase && SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabase;
}

/**
 * Fetch products from Supabase
 * Once you set up a 'products' table in Supabase, this will pull them.
 * Columns: id, name, name_en, category, price, original_price, image, desc, desc_en, specs, stock
 */
export async function fetchProducts() {
  const sb = getSupabase();
  if (!sb) return null; // fallback to hardcoded products
  
  const { data, error } = await sb
    .from('products')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) {
    console.error('Supabase fetch error:', error);
    return null;
  }
  return data;
}

/**
 * Subscribe to newsletter
 */
export async function subscribeNewsletter(email) {
  const sb = getSupabase();
  if (!sb) return { success: true }; // fake success if no Supabase
  
  const { error } = await sb
    .from('newsletter')
    .insert([{ email, subscribed_at: new Date().toISOString() }]);
  
  if (error) {
    console.error('Newsletter subscribe error:', error);
    return { success: false, error };
  }
  return { success: true };
}
