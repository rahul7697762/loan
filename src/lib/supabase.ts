import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if credentials are set to real values
export const isSupabaseConfigured = () => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes('xyzcompany') &&
    !supabaseUrl.includes('your-supabase') &&
    supabaseUrl.startsWith('https://')
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// In-memory fallback state for smooth dev testing before Supabase connection
export interface ApplicationLead {
  id: string;
  phone_number: string;
  status: string;
  user_agent?: string;
  created_at: string;
}

// Global in-memory storage (singleton in dev server)
const globalStore = globalThis as unknown as {
  _mockLeads?: ApplicationLead[];
  _mockRedirectUrl?: string;
};

if (!globalStore._mockLeads) {
  globalStore._mockLeads = [
    {
      id: 'mock-1',
      phone_number: '+1 9876543210',
      status: 'pending',
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'mock-2',
      phone_number: '+1 8765432109',
      status: 'approved',
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ];
}

if (!globalStore._mockRedirectUrl) {
  globalStore._mockRedirectUrl = 'https://example.com/thank-you';
}

export const getMockLeads = () => globalStore._mockLeads || [];
export const addMockLead = (phone: string, userAgent?: string) => {
  const newLead: ApplicationLead = {
    id: 'lead-' + Date.now(),
    phone_number: phone,
    status: 'pending',
    user_agent: userAgent || 'Browser',
    created_at: new Date().toISOString(),
  };
  globalStore._mockLeads = [newLead, ...(globalStore._mockLeads || [])];
  return newLead;
};
export const getMockRedirectUrl = () => globalStore._mockRedirectUrl || 'https://example.com/thank-you';
export const setMockRedirectUrl = (url: string) => {
  globalStore._mockRedirectUrl = url;
  return url;
};
