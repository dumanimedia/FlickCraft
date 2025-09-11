import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL,
});

export const { signIn, signOut, signUp, useSession } = authClient;
