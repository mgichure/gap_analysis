"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Lock, Mail, User, Building2, Zap, Sparkles, Shield, CheckCircle } from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    organizationType: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle sign up logic here
      console.log("Signing up...", formData);
    }, 2000);
  };

  const organizationTypes = [
    { value: "BANK", label: "Bank", icon: Building2 },
    { value: "MICROFINANCE", label: "Microfinance Institution", icon: Building2 },
    { value: "SACCO", label: "SACCO", icon: Building2 },
    { value: "INSURANCE", label: "Insurance Company", icon: Shield },
    { value: "FINTECH", label: "Fintech Company", icon: Zap },
    { value: "REGULATOR", label: "Regulatory Body", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-cyan-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(156,146,172,0.05)_0%,transparent_50%)] opacity-20" />
      
      <div className="relative w-full max-w-lg">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-2xl mb-4 shadow-2xl shadow-blue-500/25">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2">
            Create Account
          </h1>
          <p className="text-slate-400">
            Join the Gap Analysis platform
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/3 to-cyan-500/5 rounded-2xl blur-3xl" />
          <div className="relative bg-gradient-to-br from-slate-800/50 via-slate-700/30 to-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSignUp} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-200 font-medium">
                    First Name
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="pl-10 bg-slate-800/50 border-white/10 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-200 font-medium">
                    Last Name
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="pl-10 bg-slate-800/50 border-white/10 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200 font-medium">
                  Email Address
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10 bg-slate-800/50 border-white/10 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Organization Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-slate-200 font-medium">
                    Organization Name
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                      <Input
                        id="organization"
                        type="text"
                        placeholder="Organization name"
                        value={formData.organization}
                        onChange={(e) => handleInputChange("organization", e.target.value)}
                        className="pl-10 bg-slate-800/50 border-white/10 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizationType" className="text-slate-200 font-medium">
                    Organization Type
                  </Label>
                  <Select value={formData.organizationType} onValueChange={(value) => handleInputChange("organizationType", value)}>
                    <SelectTrigger className="bg-slate-800/50 border-white/10 text-white focus:border-blue-500/50 focus:ring-blue-500/20">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/10 text-white">
                      {organizationTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <SelectItem key={type.value} value={type.value} className="hover:bg-slate-700">
                            <div className="flex items-center space-x-2">
                              <Icon className="w-4 h-4" />
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-200 font-medium">
                    Password
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-10 pr-10 bg-slate-800/50 border-white/10 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-300"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-200 font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pl-10 pr-10 bg-slate-800/50 border-white/10 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-300"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="mt-1 border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <div className="space-y-1">
                  <Label htmlFor="terms" className="text-sm text-slate-300 cursor-pointer">
                    I accept the terms and conditions
                  </Label>
                  <p className="text-xs text-slate-400">
                    By creating an account, you agree to our{" "}
                    <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] h-12 text-base font-semibold"
                disabled={isLoading || !acceptTerms}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Create Account</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800/50 text-slate-400">Or continue with</span>
              </div>
            </div>

            {/* Organization Sign Up */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full bg-slate-800/50 border-white/10 text-slate-200 hover:bg-slate-700/50 hover:border-blue-500/30 transition-all duration-300 h-11"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Sign up with Organization
              </Button>
            </div>
          </div>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-slate-400">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center space-x-2 text-slate-500 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Gap Analysis Platform • Enterprise Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
