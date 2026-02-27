import { NextRequest, NextResponse } from 'next/server'

// Mock database - in production, connect to MongoDB
const enquiries: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, schoolName, studentClass, programLevel, message } = body

    // Validation
    if (!name || !email || !phone || !schoolName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create enquiry object
    const enquiry = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      schoolName,
      studentClass,
      programLevel,
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
    }

    // Store enquiry (in production, save to MongoDB)
    enquiries.push(enquiry)

    // Send confirmation email (in production, integrate with email service)
    console.log('Enquiry received:', enquiry)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Enquiry submitted successfully',
        id: enquiry.id
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing enquiry:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // In production, add authentication and authorization checks
    return NextResponse.json(enquiries)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
