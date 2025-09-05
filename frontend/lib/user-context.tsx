"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";

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
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user information from localStorage (set during login)
    const loadUser = () => {
      try {
        const userId = localStorage.getItem('userId');
        const userEmail = localStorage.getItem('userEmail');
        const userRole = localStorage.getItem('userRole');
        
        if (userId && userEmail && userRole) {
          // Use the user information from login
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
        console.error("Failed to load user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const value: UserContextType = {
    user,
    isLoading,
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
