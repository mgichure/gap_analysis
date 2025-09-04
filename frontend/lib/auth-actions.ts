'use server';

import { api } from './api';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organization: string;
  organizationType: string;
}

export interface AuthResponse {
  message: string;
  user: {
    id: string;
    email: string;
  };
}

export async function loginAction(data: LoginData): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await api.post<AuthResponse>('/auth/login', data, {
      requireAuth: false,
    });

    if (response) {
      return { success: true };
    }
    
    return { success: false, error: 'Login failed' };
  } catch (error: any) {
    console.error('Login error:', error);
    return { 
      success: false, 
      error: error.problem?.detail || error.message || 'Login failed' 
    };
  }
}

export async function signupAction(data: SignupData): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('Signup data:', data);
    const response = await api.post<AuthResponse>('/auth/signup', data, {
      requireAuth: false,
    });

    console.log('Signup response:', response);
    if (response) {
      return { success: true };
    }
    
    return { success: false, error: 'Signup failed' };
  } catch (error: any) {
    console.error('Signup error:', error);
    return { 
      success: false, 
      error: error.problem?.detail || error.message || 'Signup failed' 
    };
  }
}

export async function logoutAction(): Promise<void> {
  try {
    // Clear cookies
    const cookieStore = await cookies();
    cookieStore.delete('Authentication');
    cookieStore.delete('Refresh');
    
    // Redirect to signin page
    redirect('/signin');
  } catch (error) {
    console.error('Logout error:', error);
    redirect('/signin');
  }
}

export async function getCurrentUser(): Promise<{ user: any | null; error?: string }> {
  try {
    const response = await api.get<{ user: any }>('/auth/me');
    return { user: response.user };
  } catch (error: any) {
    console.error('Get current user error:', error);
    return { user: null, error: error.message };
  }
}
