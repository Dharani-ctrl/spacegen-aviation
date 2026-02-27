import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, Enquiry } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// Helper function to verify admin token
function verifyAdminToken(request: NextRequest): boolean {
  const token = request.cookies.get('adminToken')?.value;
  if (!token) return false;
  const decoded = verifyToken(token);
  return decoded !== null;
}

// GET all enquiries
export async function GET(request: NextRequest) {
  try {
    // Verify admin token
    if (!verifyAdminToken(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, enquiries },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST new enquiry (public endpoint)
export async function POST(request: NextRequest) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      school,
      grade,
      programLevel,
      message,
    } = await request.json();

    // Validation
    if (!firstName || !lastName || !email || !phone || !school || !grade || !programLevel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Create new enquiry
    const enquiry = new Enquiry({
      firstName,
      lastName,
      email,
      phone,
      school,
      grade,
      programLevel,
      message: message || '',
    });

    await enquiry.save();

    // TODO: Send email notification

    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry submitted successfully',
        enquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
