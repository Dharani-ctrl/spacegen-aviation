import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, Enquiry } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { Types } from 'mongoose';

// Verify admin token
function verifyAdminToken(request: NextRequest): boolean {
  const token = request.cookies.get('adminToken')?.value;
  if (!token) return false;
  const decoded = verifyToken(token);
  return decoded !== null;
}

// GET single enquiry
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!verifyAdminToken(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const enquiry = await Enquiry.findById(params.id);
    if (!enquiry) {
      return NextResponse.json(
        { error: 'Enquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, enquiry },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching enquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH update enquiry
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!verifyAdminToken(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { status } = await request.json();

    if (!status || !['new', 'reviewed', 'contacted', 'enrolled'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const enquiry = await Enquiry.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return NextResponse.json(
        { error: 'Enquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, enquiry },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE enquiry
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!verifyAdminToken(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const enquiry = await Enquiry.findByIdAndDelete(params.id);
    if (!enquiry) {
      return NextResponse.json(
        { error: 'Enquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Enquiry deleted' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
