import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Firebase Admin configuration from environment variables
const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// Initialize Firebase Admin (singleton pattern)
let adminApp: ReturnType<typeof initializeApp> | null = null;

if (!getApps().length) {
  adminApp = initializeApp(firebaseAdminConfig);
} else {
  adminApp = getApps()[0];
}

// Export Firebase Admin services
export const adminAuth = getAuth(adminApp);
export const adminDb = adminApp; // Can be used for Firestore if needed

export default adminApp;