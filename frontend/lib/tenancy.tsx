"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";

export interface Tenant {
  id: string;
  name: string;
  slug: string;
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
  isLoading: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

const defaultTenant: Tenant = {
  id: "default",
  name: "Gap Analysis Platform",
  slug: "default",
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
    // Load tenant information from localStorage (set during login)
    const loadTenant = () => {
      try {
        const tenantId = localStorage.getItem('tenantId');
        const tenantName = localStorage.getItem('tenantName');
        const tenantSlug = localStorage.getItem('tenantSlug');
        
        if (tenantId && tenantName && tenantSlug) {
          // Use the tenant information from login
          setTenant({
            id: tenantId,
            name: tenantName,
            slug: tenantSlug,
            theme: {
              primary: "#0f172a",
              secondary: "#64748b",
              accent: "#3b82f6",
            },
            settings: {},
          });
        } else {
          // Fallback to default if no tenant info found
          setTenant(defaultTenant);
        }
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
