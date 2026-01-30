import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase client configuration
// Note: In production, these would be configured in Firebase Console
// The service account credentials are only used on the server side
const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abc123',
};

// Initialize Firebase (singleton pattern)
let app: ReturnType<typeof initializeApp> | null = null;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Export Firebase client services
export const auth = getAuth(app!);
export const db = getFirestore(app!);

export default app;