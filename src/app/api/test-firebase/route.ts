import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { isFirebaseConfigured } from '@/lib/firebase-utils';

/**
 * API Route to Test Firebase Connectivity
 * 
 * GET /api/test-firebase
 * 
 * Returns the status of Firebase Admin SDK connection
 */
export async function GET() {
  try {
    const configured = isFirebaseConfigured();
    
    if (!configured) {
      return NextResponse.json({ 
        success: false,
        error: 'Firebase not properly configured. Check environment variables.' 
      }, { status: 500 });
    }

    // Test Admin SDK connection by attempting to list users
    const listUsersResult = await adminAuth.listUsers(1);
    
    return NextResponse.json({ 
      success: true,
      message: 'Firebase Admin SDK connected successfully',
      project: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      totalUsers: listUsersResult.users.length,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Firebase connection error:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message || 'Failed to connect to Firebase' 
    }, { status: 500 });
  }
}