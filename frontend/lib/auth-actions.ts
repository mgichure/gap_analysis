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
    role: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    department?: string;
    jobTitle?: string;
  };
  tenant: {
    id: string;
    name: string;
    slug: string;
  };
}

export async function loginAction(data: LoginData): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('🔐 Attempting login for:', data.email);
    const response = await api.post<AuthResponse>('/auth/login', data, {
      requireAuth: false,
    });

    console.log('📊 Login response:', response);

    if (response && response.tenant && response.user) {
      console.log('✅ Login successful, setting localStorage data');
      // Set tenant context in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('tenantId', response.tenant.id);
        localStorage.setItem('tenantName', response.tenant.name);
        localStorage.setItem('tenantSlug', response.tenant.slug);
        
        // Set user context in localStorage
        localStorage.setItem('userId', response.user.id);
        localStorage.setItem('userEmail', response.user.email);
        localStorage.setItem('userRole', response.user.role);
        if (response.user.firstName) localStorage.setItem('userFirstName', response.user.firstName);
        if (response.user.lastName) localStorage.setItem('userLastName', response.user.lastName);
        if (response.user.phone) localStorage.setItem('userPhone', response.user.phone);
        if (response.user.department) localStorage.setItem('userDepartment', response.user.department);
        if (response.user.jobTitle) localStorage.setItem('userJobTitle', response.user.jobTitle);
        
        console.log('💾 localStorage data set:', {
          userId: response.user.id,
          userEmail: response.user.email,
          userRole: response.user.role
        });
      }
      return { success: true };
    }
    
    console.log('❌ Login failed - no user/tenant data');
    return { success: false, error: 'Login failed' };
  } catch (error: any) {
    console.error('❌ Login error:', error);
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
    
    // Clear tenant and user context from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tenantId');
      localStorage.removeItem('tenantName');
      localStorage.removeItem('tenantSlug');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userFirstName');
      localStorage.removeItem('userLastName');
      localStorage.removeItem('userPhone');
      localStorage.removeItem('userDepartment');
      localStorage.removeItem('userJobTitle');
    }
    
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
