"use client";

import { useState } from "react";
import { Search, Bell, User, Settings, LogOut, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTenant } from "@/lib/tenancy";
import { TenantSwitcher } from "./TenantSwitcher";

export function TopNav() {
  const { tenant } = useTenant();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl">
      {/* Top glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/3 to-cyan-500/5 pointer-events-none" />
      
      <div className="relative container flex h-16 items-center justify-between px-6">
        {/* Left side - Logo and Search */}
        <div className="flex items-center space-x-6">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30 animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                {tenant?.name || "Gap Analysis"}
              </h1>
              <p className="text-xs text-slate-400 font-medium">Enterprise Security Platform</p>
            </div>
          </div>
          
          {/* Enhanced Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                <Input
                  placeholder="Search assessments, risks, actions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 bg-slate-800/50 border-white/10 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              size="sm"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </form>
        </div>

        {/* Right side - Notifications and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Tenant Switcher */}
          <TenantSwitcher />
          
          {/* Enhanced Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative h-10 w-10 rounded-xl bg-slate-800/50 border border-white/10 hover:bg-slate-700/50 hover:border-blue-500/30 transition-all duration-300 group"
          >
            <Bell className="h-5 w-5 text-slate-300 group-hover:text-blue-400 transition-colors duration-300" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-xs text-white flex items-center justify-center font-bold shadow-lg animate-pulse">
              3
            </span>
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>

          {/* Enhanced User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-10 w-10 rounded-xl bg-slate-800/50 border border-white/10 hover:bg-slate-700/50 hover:border-blue-500/30 transition-all duration-300 group"
              >
                <Avatar className="h-8 w-8 ring-2 ring-white/20 group-hover:ring-blue-500/30 transition-all duration-300">
                  <AvatarImage src="/avatars/user.png" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-64 bg-slate-800/95 border-white/10 backdrop-blur-xl" 
              align="end" 
              forceMount
            >
              <div className="p-4 border-b border-white/10">
                <DropdownMenuLabel className="font-normal text-left">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">John Doe</p>
                        <p className="text-xs text-slate-400">
                          john.doe@example.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Online</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
              </div>
              
              <div className="p-2">
                <DropdownMenuItem className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
                  <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                  <span className="text-slate-200">Profile</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
                  <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center">
                    <Settings className="w-4 h-4 text-slate-300" />
                  </div>
                  <span className="text-slate-200">Settings</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="border-white/10 my-2" />
                
                <DropdownMenuItem className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-red-500/20 hover:text-red-300 transition-colors duration-200">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <LogOut className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-red-300">Log out</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
    </header>
  );
}
