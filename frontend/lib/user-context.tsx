"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { getCurrentUser } from "./auth-actions";

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
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setIsLoading(true);
      const result = await getCurrentUser();
      if (result.user) {
        setUser(result.user);
        // Also update localStorage with fresh data
        localStorage.setItem('userId', result.user.id);
        localStorage.setItem('userEmail', result.user.email);
        localStorage.setItem('userRole', result.user.role);
        if (result.user.firstName) localStorage.setItem('userFirstName', result.user.firstName);
        if (result.user.lastName) localStorage.setItem('userLastName', result.user.lastName);
        if (result.user.phone) localStorage.setItem('userPhone', result.user.phone);
        if (result.user.department) localStorage.setItem('userDepartment', result.user.department);
        if (result.user.jobTitle) localStorage.setItem('userJobTitle', result.user.jobTitle);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
      // Fallback to localStorage data
      loadUserFromStorage();
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserFromStorage = () => {
    try {
      const userId = localStorage.getItem('userId');
      const userEmail = localStorage.getItem('userEmail');
      const userRole = localStorage.getItem('userRole');
      
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
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to load user from storage:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    // First try to load from localStorage for immediate display
    loadUserFromStorage();
    
    // Then try to fetch fresh data from API
    refreshUser();
  }, []);

  const value: UserContextType = {
    user,
    isLoading,
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
