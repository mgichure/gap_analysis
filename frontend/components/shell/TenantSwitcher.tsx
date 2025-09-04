"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Building2, Check, Landmark, Smartphone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tenant {
  id: string;
  name: string;
  slug: string;
  type: 'BANK' | 'MICROFINANCE' | 'SACCO' | 'INSURANCE' | 'FINTECH' | 'REGULATOR';
}

const availableTenants: Tenant[] = [
  { id: "tenant-equity-bank", name: "Equity Bank Kenya", slug: "equity-bank-ke", type: "BANK" },
  { id: "tenant-kcb-bank", name: "KCB Bank Kenya", slug: "kcb-bank-ke", type: "BANK" },
  { id: "tenant-safaricom-mpesa", name: "Safaricom M-Pesa", slug: "safaricom-mpesa", type: "FINTECH" },
  { id: "tenant-co-op-bank", name: "Co-operative Bank", slug: "co-op-bank-ke", type: "BANK" },
  { id: "tenant-absa-bank", name: "ABSA Bank Kenya", slug: "absa-bank-ke", type: "BANK" },
];

const getTenantIcon = (type: Tenant['type']) => {
  switch (type) {
    case 'BANK':
      return <Landmark className="h-4 w-4" />;
    case 'FINTECH':
      return <Smartphone className="h-4 w-4" />;
    default:
      return <Building2 className="h-4 w-4" />;
  }
};

export function TenantSwitcher() {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    // Load current tenant from localStorage
    const tenantSlug = localStorage.getItem("tenantId") || localStorage.getItem("tenantSlug");
    const tenant = availableTenants.find(t => t.slug === tenantSlug);
    setCurrentTenant(tenant || availableTenants[0]);
  }, []);

  const handleTenantChange = (tenant: Tenant) => {
    setCurrentTenant(tenant);
    localStorage.setItem("tenantId", tenant.slug);
    
    // Refresh the page to reload data with new tenant context
    window.location.reload();
  };

  if (!currentTenant) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-3 bg-gradient-to-r from-slate-800/50 to-slate-700/30 border-white/10 hover:border-blue-500/30 hover:bg-blue-500/10 text-white transition-all duration-300 hover:scale-105 group"
        >
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
            {getTenantIcon(currentTenant.type)}
          </div>
          <span className="hidden md:inline font-medium">{currentTenant.name}</span>
          <span className="md:hidden font-medium">{currentTenant.name.split(' ')[0]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-80 bg-slate-800/95 border-white/10 backdrop-blur-xl"
      >
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Switch Organization</div>
              <div className="text-xs text-slate-400">Select your workspace</div>
            </div>
          </div>
        </div>
        
        <div className="p-2">
          {availableTenants.map((tenant) => (
            <DropdownMenuItem
              key={tenant.id}
              onClick={() => handleTenantChange(tenant)}
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-slate-700/50 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
                  currentTenant.id === tenant.id 
                    ? "bg-gradient-to-br from-blue-500/30 to-purple-500/30" 
                    : "bg-slate-700/50 group-hover:bg-slate-600/50"
                )}>
                  {getTenantIcon(tenant.type)}
                </div>
                <div>
                  <div className="font-medium text-white">{tenant.name}</div>
                  <div className="text-xs text-slate-400 capitalize">
                    {tenant.type.toLowerCase()}
                  </div>
                </div>
              </div>
              {currentTenant.id === tenant.id && (
                <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
