import { getServerSession } from 'next-auth/next';
import type { DefaultSession } from 'next-auth';
import { authOptions } from './options';

export async function auth() {
  return await getServerSession(authOptions);
}

// For client-side sign in/out: import { signIn, signOut } from 'next-auth/react' directly in 'use client' components

// Type augmentation for session.user.role + session.user.id
declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      role?: string;
    } & DefaultSession['user'];
  }
  interface User {
    id?: string;
    role?: string;
  }
}
