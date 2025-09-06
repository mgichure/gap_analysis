"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { api } from "./api-client";

export interface User {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  department?: string;
  jobTitle?: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("🔄 Refreshing user data...");
      
      // Check if we have auth token first
      const authCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('Authentication='));
      
      if (!authCookie) {
        console.log("❌ No auth cookie found, loading from localStorage");
        loadUserFromStorage();
        return;
      }
      
      // Try to get user data from API
      const response = await api.get<{ user: User }>('/auth/me');
      console.log("📊 User data result:", response);
      
      if (response && response.user) {
        console.log("✅ User data loaded:", response.user);
        setUser(response.user);
        // Also update localStorage with fresh data
        localStorage.setItem('userId', response.user.id);
        localStorage.setItem('userEmail', response.user.email);
        localStorage.setItem('userRole', response.user.role);
        if (response.user.firstName) localStorage.setItem('userFirstName', response.user.firstName);
        if (response.user.lastName) localStorage.setItem('userLastName', response.user.lastName);
        if (response.user.phone) localStorage.setItem('userPhone', response.user.phone);
        if (response.user.department) localStorage.setItem('userDepartment', response.user.department);
        if (response.user.jobTitle) localStorage.setItem('userJobTitle', response.user.jobTitle);
      } else {
        console.log("❌ No user data received");
        setUser(null);
      }
    } catch (error: any) {
      console.error("❌ Failed to refresh user:", error);
      setError(error.message || 'Failed to load user data');
      
      // If it's an authentication error, clear user data
      if (error.status === 401 || error.status === 403) {
        console.log("🔐 Authentication failed, clearing user data");
        setUser(null);
        // Clear localStorage
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userFirstName');
        localStorage.removeItem('userLastName');
        localStorage.removeItem('userPhone');
        localStorage.removeItem('userDepartment');
        localStorage.removeItem('userJobTitle');
      } else {
        // For other errors, try to load from localStorage
        loadUserFromStorage();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserFromStorage = () => {
    try {
      console.log("📦 Loading user from localStorage...");
      const userId = localStorage.getItem('userId');
      const userEmail = localStorage.getItem('userEmail');
      const userRole = localStorage.getItem('userRole');
      
      console.log("📦 localStorage data:", { userId, userEmail, userRole });
      
      if (userId && userEmail && userRole) {
        const userData = {
          id: userId,
          email: userEmail,
          role: userRole,
          firstName: localStorage.getItem('userFirstName') || undefined,
          lastName: localStorage.getItem('userLastName') || undefined,
          phone: localStorage.getItem('userPhone') || undefined,
          department: localStorage.getItem('userDepartment') || undefined,
          jobTitle: localStorage.getItem('userJobTitle') || undefined,
        };
        console.log("✅ User data loaded from localStorage:", userData);
        setUser(userData);
      } else {
        console.log("❌ No user data in localStorage");
        setUser(null);
      }
    } catch (error) {
      console.error("❌ Failed to load user from storage:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    // First try to load from localStorage for immediate display
    loadUserFromStorage();
    
    // Then try to fetch fresh data from API (only if we have auth cookie)
    const authCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('Authentication='));
    
    if (authCookie) {
      console.log("🍪 Auth cookie found, refreshing user data");
      refreshUser();
    } else {
      console.log("❌ No auth cookie found, using localStorage data only");
      setIsLoading(false);
    }
  }, []);

  const value: UserContextType = {
    user,
    isLoading,
    error,
    refreshUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
