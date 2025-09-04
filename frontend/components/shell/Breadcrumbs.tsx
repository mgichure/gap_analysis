"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs() {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean);
    
    if (segments.length === 0) {
      return [];
    }

    const breadcrumbs: BreadcrumbItem[] = [];
    let currentPath = "";

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Convert segment to readable label
      const label = segment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      breadcrumbs.push({
        label,
        href: index === segments.length - 1 ? undefined : currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav className="relative flex items-center space-x-2 text-sm px-6 py-4 border-b border-white/10 bg-gradient-to-r from-slate-800/50 via-slate-700/30 to-slate-800/50 backdrop-blur-sm">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/3 to-cyan-500/5 pointer-events-none" />
      
      <div className="relative flex items-center space-x-3">
        {/* Enhanced Home icon */}
        <Link
          href="/"
          className="group relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-110"
        >
          <Home className="h-4 w-4 text-slate-300 group-hover:text-blue-400 transition-colors duration-300" />
          {/* Hover glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/10 to-purple-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
        
        {/* Breadcrumb items */}
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={breadcrumb.label} className="flex items-center space-x-3">
            {/* Enhanced separator */}
            <div className="relative">
              <ChevronRight className="h-4 w-4 text-slate-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-purple-500/0 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {breadcrumb.href ? (
              <Link
                href={breadcrumb.href}
                className={cn(
                  "group relative px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-all duration-300 hover:bg-white/5 hover:scale-105",
                  "border border-transparent hover:border-white/10"
                )}
              >
                {breadcrumb.label}
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ) : (
              <span className="relative px-3 py-1.5 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                {breadcrumb.label}
                {/* Active glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 rounded-lg blur-sm" />
              </span>
            )}
          </div>
        ))}
      </div>
      
      {/* Right side decoration */}
      <div className="ml-auto flex items-center space-x-2">
        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse" />
        <span className="text-xs text-slate-500 font-medium">Navigation</span>
      </div>
      
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
    </nav>
  );
}
