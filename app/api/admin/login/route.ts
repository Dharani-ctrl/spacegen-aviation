import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, Admin } from '@/lib/db';
import { comparePassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validation
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Find admin
    const admin = await Admin.findOne({ username: username.toLowerCase() });
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await comparePassword(password, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(admin._id.toString(), admin.username);

    // Set token in httpOnly cookie
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        admin: { id: admin._id, username: admin.username, email: admin.email },
      },
      { status: 200 }
    );

    response.cookies.set({
      name: 'adminToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
