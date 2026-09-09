import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  if (!supabaseUrl.startsWith('https://')) return false;
  if (
    supabaseUrl.includes('xyzcompany') ||
    supabaseUrl.includes('your-supabase') ||
    supabaseAnonKey.includes('example') ||
    supabaseAnonKey.includes('your-actual-anon-key')
  ) {
    return false;
  }
  return true;
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
      global: {
        // Fetch with 3-second timeout limit to prevent Vercel 7s serverless hanging timeouts
        fetch: (url, options) => {
          const controller = new AbortController();
          const id = setTimeout(() => controller.abort(), 3000);
          return fetch(url, {
            ...options,
            signal: controller.signal,
          }).finally(() => clearTimeout(id));
        },
      },
    })
  : null;

export interface ApplicationLead {
  id: string;
  phone_number: string;
  status: string;
  user_agent?: string;
  created_at: string;
}
