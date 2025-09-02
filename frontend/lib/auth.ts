import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export interface User {
  id: string;
  email: string;
  roles: string[];
}

export interface Session {
  user: User;
  expires: Date;
}

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("Authentication");
    
    if (!authCookie?.value) {
      return null;
    }

    // Verify JWT token
    const secret = new TextEncoder().encode(
      process.env.JWT_ACCESS_TOKEN_SECRET || "fallback-secret"
    );
    
    const { payload } = await jwtVerify(authCookie.value, secret);
    
    if (!payload.userId || !payload.email) {
      return null;
    }

    return {
      user: {
        id: payload.userId as string,
        email: payload.email as string,
        roles: (payload.roles as string[]) || [],
      },
      expires: new Date((payload.exp as number) * 1000),
    };
  } catch {
    return null;
  }
}

export function hasRole(user: User | null, role: string): boolean {
  if (!user) return false;
  return user.roles.includes(role);
}

export function hasAnyRole(user: User | null, roles: string[]): boolean {
  if (!user) return false;
  return roles.some(role => user.roles.includes(role));
}

export function hasAllRoles(user: User | null, roles: string[]): boolean {
  if (!user) return false;
  return roles.every(role => user.roles.includes(role));
}

// Role constants
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  AUDITOR: "auditor",
  MANAGER: "manager",
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
