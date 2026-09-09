import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const expectedPassword = process.env.ADMIN_SECRET_KEY || 'admin123';

    if (password === expectedPassword) {
      const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });
      // Set secure HTTP-only session cookie
      response.cookies.set({
        name: 'admin_session',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid admin passcode. Please try again.' },
        { status: 401 }
      );
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
