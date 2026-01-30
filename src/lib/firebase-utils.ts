/**
 * Firebase Utilities
 * 
 * This module provides helper functions and utilities for Firebase integration
 * with the Quality Pulse Construction QA application.
 * 
 * CURRENT INTEGRATION STATUS:
 * - Firebase Admin SDK: Initialized for server-side operations
 * - Firebase Client SDK: Initialized for client-side operations
 * - Authentication: Available via Firebase Auth (can supplement or replace better-auth)
 * - Firestore: Available for real-time data (can supplement local LibSQL/SQLite)
 * 
 * INTEGRATION APPROACH:
 * The current setup uses Firebase as an OPTIONAL service that can be used alongside:
 * - Local LibSQL/SQLite database (via Drizzle ORM) - Primary data store
 * - better-auth package - Installed but not actively configured
 * 
 * Firebase can be used for:
 * 1. Client-side authentication (as an alternative to better-auth)
 * 2. Real-time data synchronization with Firestore
 * 3. Cloud Functions for backend processing
 * 4. Analytics and crash reporting
 * 
 * To enable Firebase client SDK fully, you need to configure your Firebase project
 * at https://console.firebase.google.com/ and get the web app configuration values.
 */

import { adminAuth } from './firebase-admin';
import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';

/**
 * Server-side: Verify Firebase ID token
 * Use this in API routes to authenticate users
 */
export async function verifyFirebaseToken(token: string) {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return { success: true, user: decodedToken };
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    return { success: false, error: 'Invalid token' };
  }
}

/**
 * Server-side: Create a custom Firebase token
 * Use this to generate tokens for authenticated users
 */
export async function createCustomToken(uid: string) {
  try {
    const token = await adminAuth.createCustomToken(uid);
    return { success: true, token };
  } catch (error) {
    console.error('Error creating custom token:', error);
    return { success: false, error: 'Failed to create token' };
  }
}

/**
 * Client-side: Get current Firebase user
 * Returns the currently signed-in user or null
 */
export function getCurrentUser() {
  return auth.currentUser;
}

/**
 * Client-side: Sign in with email and password
 */
export async function signInWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    console.error('Error signing in:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Client-side: Sign out
 */
export async function signOut() {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error: 'Failed to sign out' };
  }
}

/**
 * Check if Firebase is properly configured
 * Useful for runtime checks and debugging
 */
export function isFirebaseConfigured() {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_PRIVATE_KEY
  );
}