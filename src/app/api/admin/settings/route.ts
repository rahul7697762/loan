import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured, getMockRedirectUrl, setMockRedirectUrl } from '@/lib/supabase';

// GET settings
export async function GET(req: NextRequest) {
  try {
    let redirectUrl = 'https://example.com/thank-you';

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'redirect_url')
        .maybeSingle();

      if (data?.value) {
        redirectUrl = data.value;
      }
    } else {
      redirectUrl = getMockRedirectUrl();
    }

    return NextResponse.json({
      success: true,
      settings: {
        redirect_url: redirectUrl,
      },
      isSupabaseConnected: isSupabaseConfigured(),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST update setting (e.g. redirect_url)
export async function POST(req: NextRequest) {
  try {
    const session = req.cookies.get('admin_session')?.value;
    if (session !== 'authenticated') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { key, value } = await req.json();

    if (!key || !value || typeof value !== 'string') {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }

    const trimmedValue = value.trim();

    // Basic URL validation
    try {
      new URL(trimmedValue);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid URL format. Please include http:// or https://' },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase
        .from('settings')
        .upsert({ key, value: trimmedValue, updated_at: new Date().toISOString() });

      if (error) {
        console.error('Supabase settings upsert error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
    } else {
      setMockRedirectUrl(trimmedValue);
    }

    return NextResponse.json({
      success: true,
      message: 'Redirect URL updated successfully!',
      value: trimmedValue,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
