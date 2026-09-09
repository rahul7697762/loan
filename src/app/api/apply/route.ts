import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phoneNumber } = body;

    if (!phoneNumber || typeof phoneNumber !== 'string' || phoneNumber.trim().length < 8) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid phone number.' },
        { status: 400 }
      );
    }

    const cleanedPhone = phoneNumber.trim();
    const userAgent = req.headers.get('user-agent') || undefined;

    let targetRedirectUrl = 'https://example.com/thank-you';

    if (isSupabaseConfigured() && supabase) {
      // 1. Save application into Supabase
      const { error: insertError } = await supabase
        .from('applications')
        .insert([{ phone_number: cleanedPhone, user_agent: userAgent, status: 'pending' }]);

      if (insertError) {
        console.error('Supabase application insert error:', insertError);
      }

      // 2. Fetch redirect_url setting from Supabase
      const { data: settingData } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'redirect_url')
        .maybeSingle();

      if (settingData?.value) {
        targetRedirectUrl = settingData.value;
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Loan application submitted successfully!',
      redirectUrl: targetRedirectUrl,
    });
  } catch (err: any) {
    console.error('Error in /api/apply:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
