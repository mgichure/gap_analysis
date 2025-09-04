"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Shield,
  AlertTriangle,
  CheckCircle,
  Settings,
  BarChart3,
  FolderOpen,
  ClipboardList,
  Sparkles,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  description?: string;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview & Analytics",
  },
  {
    title: "Assessments",
    href: "/assessments",
    icon: ClipboardList,
    description: "Risk Evaluations",
  },
  {
    title: "SoA",
    href: "/soa",
    icon: Shield,
    description: "Statement of Applicability",
  },
  {
    title: "Actions",
    href: "/actions",
    icon: CheckCircle,
    description: "Remediation Tasks",
  },
  {
    title: "Evidence",
    href: "/evidence",
    icon: FolderOpen,
    description: "Documentation",
  },
  {
    title: "Risks",
    href: "/risks",
    icon: AlertTriangle,
    description: "Risk Management",
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
    description: "Analytics & Insights",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    description: "Configuration",
  },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 border-r border-white/10 bg-gradient-to-b from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl md:block">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-cyan-500/10 pointer-events-none" />
      
      <div className="relative flex h-full flex-col">
        {/* Navigation */}
        <div className="flex-1 space-y-1 p-4 pt-6">
          <div className="space-y-2">
            <div className="px-2">
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.02]",
                        "hover:bg-white/5 hover:shadow-lg hover:shadow-blue-500/10",
                        "border border-transparent hover:border-white/10",
                        isActive
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-blue-500/30 shadow-lg shadow-blue-500/20"
                          : "text-slate-300 hover:text-white"
                      )}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full" />
                      )}
                      
                      {/* Icon with glow effect */}
                      <div className={cn(
                        "relative p-2 rounded-lg transition-all duration-300",
                        isActive 
                          ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400" 
                          : "text-slate-400 group-hover:text-slate-300 group-hover:bg-white/5"
                      )}>
                        <Icon className="w-5 h-5" />
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg blur-sm" />
                        )}
                      </div>
                      
                      {/* Text content */}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold">{item.title}</div>
                        {item.description && (
                          <div className={cn(
                            "text-xs transition-colors duration-300",
                            isActive ? "text-blue-300" : "text-slate-500 group-hover:text-slate-400"
                          )}>
                            {item.description}
                          </div>
                        )}
                      </div>
                      
                      {/* Badge */}
                      {item.badge && (
                        <span className="ml-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-2.5 py-1 text-xs font-semibold text-white shadow-lg">
                          {item.badge}
                        </span>
                      )}
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="relative border-t border-white/10 p-6">
          <div className="text-center">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-slate-300" />
            </div>
            <p className="text-sm font-medium text-slate-300">Gap Analysis Platform</p>
            <p className="text-xs text-slate-500 mt-1">v1.0.0 • Enterprise Ready</p>
          </div>
          
          {/* Bottom glow */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>
      </div>
    </aside>
  );
}
