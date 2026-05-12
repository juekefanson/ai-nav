import { getServerSession } from 'next-auth/next';
import type { DefaultSession } from 'next-auth';
import { authOptions } from './options';

export async function auth() {
  return await getServerSession(authOptions);
}

// For client-side sign in/out (use in 'use client' components)
export { signIn, signOut } from 'next-auth/react';

// Type augmentation for session.user.role
declare module 'next-auth' {
  interface Session {
    user: {
      role?: string;
    } & DefaultSession['user'];
  }
  interface User {
    role?: string;
  }
}
