/**
 * useFirebaseAuth Hook
 * 
 * A custom React hook for managing Firebase authentication state.
 * 
 * Usage:
 * const { user, loading, error, signIn, signOut } = useFirebaseAuth();
 */

'use client';

import { useState, useEffect } from 'react';
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword as firebaseSignIn,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword as firebaseSignUp
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface UseFirebaseAuthResult {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export function useFirebaseAuth(): UseFirebaseAuthResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    
    try {
      const userCredential = await firebaseSignIn(auth, email, password);
      setUser(userCredential.user);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    
    try {
      const userCredential = await firebaseSignUp(auth, email, password);
      setUser(userCredential.user);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    setError(null);
    setLoading(true);
    
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };
}

export default useFirebaseAuth;