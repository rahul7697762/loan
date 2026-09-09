import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured, getMockLeads } from '@/lib/supabase';

// GET all submitted leads
export async function GET(req: NextRequest) {
  try {
    const session = req.cookies.get('admin_session')?.value;
    if (session !== 'authenticated') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    let leads = [];

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads from Supabase:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
      leads = data || [];
    } else {
      leads = getMockLeads();
    }

    return NextResponse.json({
      success: true,
      leads,
      isSupabaseConnected: isSupabaseConfigured(),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE a lead
export async function DELETE(req: NextRequest) {
  try {
    const session = req.cookies.get('admin_session')?.value;
    if (session !== 'authenticated') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing lead ID' }, { status: 400 });
    }

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('applications').delete().eq('id', id);

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
