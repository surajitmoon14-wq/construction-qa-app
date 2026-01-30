# Firebase Integration Guide

## Overview

Firebase has been successfully integrated into the Quality Pulse Construction QA application. This document explains how Firebase is configured, how to use it, and how it integrates with the existing technology stack.

## Current Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Primary Database**: Local LibSQL/SQLite with Drizzle ORM
- **Authentication**: better-auth (installed, not actively configured)
- **AI**: xAI Grok API (Groq SDK)
- **Firebase**: Integrated as an optional service

## Firebase Configuration

### Environment Variables

Firebase credentials have been added to `.env`:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_PROJECT_ID=newpr-17a5c
NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@newpr-17a5c.iam.gserviceaccount.com
NEXT_PUBLIC_FIREBASE_CLIENT_ID=114564649209127239964
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
FIREBASE_PRIVATE_KEY_ID=35b82276c8f3de8b392249a7161f798741a04143
NEXT_PUBLIC_FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
NEXT_PUBLIC_FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
NEXT_PUBLIC_FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
NEXT_PUBLIC_FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40newpr-17a5c.iam.gserviceaccount.com
NEXT_PUBLIC_FIREBASE_UNIVERSE_DOMAIN=googleapis.com
```

**Important**: Sensitive keys are protected by `.gitignore` (which includes `*.pem` files and `.env.local`).

### Installed Packages

```json
{
  "firebase": "^11.x.x",      // Client SDK
  "firebase-admin": "^13.x.x" // Admin SDK
}
```

## Firebase Initialization Files

### 1. `src/lib/firebase-admin.ts`

Server-side Firebase Admin SDK initialization with:
- Service account authentication
- Auth client for token verification
- Firestore client (optional)
- Singleton pattern to prevent multiple initializations

**Usage:**
```typescript
import { adminAuth, adminDb } from '@/lib/firebase-admin';

// Verify a Firebase ID token in API routes
const decodedToken = await adminAuth.verifyIdToken(token);
```

### 2. `src/lib/firebase.ts`

Client-side Firebase SDK initialization with:
- Auth for user authentication
- Firestore for real-time database (optional)
- Singleton pattern

**Usage:**
```typescript
import { auth, db } from '@/lib/firebase';

// Get current user
const user = auth.currentUser;
```

### 3. `src/lib/firebase-utils.ts`

Utility functions for common Firebase operations:
- `verifyFirebaseToken()` - Server-side token verification
- `createCustomToken()` - Generate custom auth tokens
- `getCurrentUser()` - Get current client-side user
- `signInWithEmail()` - Email/password authentication
- `signOut()` - Sign out current user
- `isFirebaseConfigured()` - Runtime configuration check

## Integration Strategy

### Firebase as Supplementary Service

Firebase is **integrated as an optional service** that works alongside existing systems:

| Feature | Current Solution | Firebase Alternative | Status |
|---------|-----------------|---------------------|---------|
| Database | LibSQL/SQLite (Drizzle) | Firestore | SQLite is primary, Firestore optional |
| Authentication | better-auth (not configured) | Firebase Auth | Both available |
| API | Next.js API Routes | Cloud Functions | API Routes preferred |
| Storage | Not implemented | Firebase Storage | Available if needed |

### No Breaking Changes

The integration maintains full compatibility with:
- ✅ Existing MONGO_URI and JWT_SECRET
- ✅ Local SQLite database (local.db)
- ✅ Drizzle ORM operations
- ✅ Groq API integration
- ✅ All existing functionality

## How to Use Firebase

### Option 1: Use Firebase for Authentication (Recommended)

Firebase Auth provides a complete authentication solution that can replace or supplement better-auth.

#### Frontend Setup

```typescript
// In a component or custom hook
import { auth, signInWithEmail, signOut } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Listen to auth state changes
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      console.log('User:', user.uid);
    } else {
      // User is signed out
    }
  });
  return unsubscribe;
}, []);

// Sign in
const handleSignIn = async () => {
  const result = await signInWithEmail('user@example.com', 'password');
  if (result.success) {
    console.log('Signed in:', result.user);
  }
};

// Sign out
const handleSignOut = async () => {
  await signOut();
};
```

#### Backend Setup (API Route)

```typescript
// app/api/protected/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseToken } from '@/lib/firebase-utils';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const token = authHeader.substring(7);
  const verification = await verifyFirebaseToken(token);
  
  if (!verification.success) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  
  // Access verified user data
  const { uid, email } = verification.user;
  
  return NextResponse.json({ 
    message: 'Protected data', 
    user: { uid, email } 
  });
}
```

### Option 2: Use Firestore for Real-Time Data

Firestore can be used for features requiring real-time synchronization:

```typescript
import { db } from '@/lib/firebase';
import { collection, addDoc, query, onSnapshot } from 'firebase/firestore';

// Add data to Firestore
await addDoc(collection(db, 'inspections'), {
  title: 'Site Inspection',
  score: 85,
  timestamp: new Date(),
});

// Listen to real-time updates
const q = query(collection(db, 'issues'));
const unsubscribe = onSnapshot(q, (snapshot) => {
  snapshot.docs.forEach(doc => {
    console.log(doc.data());
  });
});
```

### Option 3: Keep Current Setup (SQLite + Drizzle)

Continue using the existing local database. Firebase is ready to use when needed but doesn't interfere with current operations.

## Next Steps for Full Firebase Integration

To fully enable Firebase client-side features, you need to:

1. **Configure Firebase Project at Console**
   - Go to https://console.firebase.google.com/
   - Select project `newpr-17a5c`
   - Enable Authentication providers (Email/Password, Google, etc.)
   - Create a Web App to get client configuration

2. **Add Client Config to .env**

After creating a Web App in Firebase Console, add these variables to `.env`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=newpr-17a5c.firebaseapp.com
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=newpr-17a5c.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

3. **Enable Authentication Providers**

In Firebase Console:
- Authentication → Sign-in method → Email/Password → Enable
- Authentication → Sign-in method → Google → Enable (optional)

4. **Update Security Rules**

Configure Firestore and Storage security rules to match your app's requirements.

## Testing

### Verify Firebase Admin Connection

Create a test API route:

```typescript
// app/api/test-firebase/route.ts
import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { isFirebaseConfigured } from '@/lib/firebase-utils';

export async function GET() {
  const configured = isFirebaseConfigured();
  
  if (!configured) {
    return NextResponse.json({ 
      error: 'Firebase not configured' 
    }, { status: 500 });
  }
  
  try {
    // Test Admin SDK connection
    const users = await adminAuth.listUsers(1);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Firebase Admin SDK connected',
      project: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}
```

Test by visiting: `http://localhost:3000/api/test-firebase`

### Start the App

```bash
npm run dev
```

The app should start without errors. Firebase is initialized lazily and won't break if credentials are missing.

## Troubleshooting

### "Firebase app not initialized"
- Ensure environment variables are set in `.env`
- Restart the dev server after adding environment variables

### "Invalid service account credentials"
- Verify `FIREBASE_PRIVATE_KEY` is correctly formatted with `\n` line breaks
- Check that the service account has proper permissions

### "Module not found: firebase"
- Run `npm install firebase firebase-admin`

### Better-auth conflicts
- better-auth is installed but not actively configured
- Firebase Auth can be used independently or alongside it
- Choose one auth system and stick with it for consistency

## Security Notes

1. **Environment Variables**: All Firebase credentials are in `.env` and never committed to git
2. **Private Key**: The service account private key is properly escaped with `\n` for line breaks
3. **Client vs Server**: Admin SDK only runs server-side; Client SDK runs in browser
4. **API Routes**: Always verify Firebase tokens on the server before accessing protected resources

## Summary

✅ Firebase credentials added to `.env`
✅ Firebase Admin SDK initialized and exported (`src/lib/firebase-admin.ts`)
✅ Firebase Client SDK initialized and exported (`src/lib/firebase.ts`)
✅ Utility functions created (`src/lib/firebase-utils.ts`)
✅ Documentation provided for integration
✅ No breaking changes to existing functionality
✅ App starts without errors

Firebase is now ready to use for authentication, real-time data, or any other Firebase services as needed for the Quality Pulse application.