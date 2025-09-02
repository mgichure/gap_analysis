"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";

export interface Tenant {
  id: string;
  name: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  settings: {
    logo?: string;
    favicon?: string;
    customCss?: string;
  };
}

interface TenantContextType {
  tenant: Tenant | null;
  setTenant: (tenant: Tenant) => void;
  isLoading: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

const defaultTenant: Tenant = {
  id: "default",
  name: "Gap Analysis Platform",
  theme: {
    primary: "#0f172a",
    secondary: "#64748b",
    accent: "#3b82f6",
  },
  settings: {},
};

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch tenant info from API based on subdomain or user context
    const loadTenant = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // For now, use default tenant
        // In production, you'd determine tenant from:
        // - Subdomain (tenant1.yourapp.com)
        // - User's organization
        // - URL parameters
        setTenant(defaultTenant);
      } catch (error) {
        console.error("Failed to load tenant:", error);
        setTenant(defaultTenant);
      } finally {
        setIsLoading(false);
      }
    };

    loadTenant();
  }, []);

  const value: TenantContextType = {
    tenant,
    setTenant,
    isLoading,
  };

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
}

// Hook for getting tenant theme values
export function useTenantTheme() {
  const { tenant } = useTenant();
  return tenant?.theme || defaultTenant.theme;
}

// Hook for getting tenant settings
export function useTenantSettings() {
  const { tenant } = useTenant();
  return tenant?.settings || defaultTenant.settings;
}
