"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Lock, Mail, User, Building2, Zap, Sparkles, Shield, CheckCircle } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { signupAction } from "@/lib/auth-actions";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
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
    setError("");
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    
    // Validate terms acceptance
    if (!acceptTerms) {
      setError("Please accept the terms and conditions");
      setIsLoading(false);
      return;
    }
    
    try {
      const result = await signupAction({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        organization: formData.organization,
        organizationType: formData.organizationType,
      });
      
      if (result.success) {
        router.push("/signin?message=Account created successfully. Please sign in.");
      } else {
        setError(result.error || "Signup failed");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--background)' }}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-purple-500/2 to-cyan-500/3 dark:from-blue-500/10 dark:via-purple-500/5 dark:to-cyan-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.03)_0%,transparent_50%)] opacity-50 dark:opacity-20" />
      
      <div className="relative w-full max-w-lg">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle />
        </div>
        
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-2xl mb-4 shadow-2xl shadow-blue-500/25">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
            Create Account
          </h1>
          <p style={{ color: 'var(--muted-foreground)' }}>
            Join the Gap Analysis platform
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/3 to-cyan-500/5 rounded-2xl blur-3xl" />
          <div className="relative backdrop-blur-xl border rounded-2xl p-8 shadow-xl" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <form onSubmit={handleSignUp} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md dark:text-red-400 dark:bg-red-900/20 dark:border-red-800">
                  {error}
                </div>
              )}
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-medium" style={{ color: 'var(--foreground)' }}>
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
                        className="pl-10 border transition-all duration-300"
                        style={{ 
                          backgroundColor: 'var(--input)', 
                          borderColor: 'var(--border)', 
                          color: 'var(--foreground)' 
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-700 font-medium dark:text-slate-200">
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
                        className="pl-10 border transition-all duration-300"
                        style={{ 
                          backgroundColor: 'var(--input)', 
                          borderColor: 'var(--border)', 
                          color: 'var(--foreground)' 
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium dark:text-slate-200">
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
                  <Label htmlFor="organization" className="text-slate-700 font-medium dark:text-slate-200">
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
                        className="pl-10 border transition-all duration-300"
                        style={{ 
                          backgroundColor: 'var(--input)', 
                          borderColor: 'var(--border)', 
                          color: 'var(--foreground)' 
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizationType" className="text-slate-700 font-medium dark:text-slate-200">
                    Organization Type
                  </Label>
                  <Select value={formData.organizationType} onValueChange={(value) => handleInputChange("organizationType", value)}>
                    <SelectTrigger className="border transition-all duration-300" style={{ backgroundColor: 'var(--input)', borderColor: 'var(--border)', color: 'var(--foreground)' }}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 text-slate-900 dark:bg-slate-800 dark:border-white/10 dark:text-white">
                      {organizationTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <SelectItem key={type.value} value={type.value} className="hover:bg-slate-100 dark:hover:bg-slate-700">
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
                  <Label htmlFor="password" className="text-slate-700 font-medium dark:text-slate-200">
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
                        className="pl-10 pr-10 border transition-all duration-300"
                        style={{ 
                          backgroundColor: 'var(--input)', 
                          borderColor: 'var(--border)', 
                          color: 'var(--foreground)' 
                        }}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-700 font-medium dark:text-slate-200">
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
                        className="pl-10 pr-10 border transition-all duration-300"
                        style={{ 
                          backgroundColor: 'var(--input)', 
                          borderColor: 'var(--border)', 
                          color: 'var(--foreground)' 
                        }}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5"
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
                  className="mt-1 border-slate-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 dark:border-white/20"
                />
                <div className="space-y-1">
                  <Label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer dark:text-slate-300">
                    I accept the terms and conditions
                  </Label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
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
                <div className="w-full border-t border-slate-200 dark:border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2" style={{ backgroundColor: 'var(--card)', color: 'var(--muted-foreground)' }}>Or continue with</span>
              </div>
            </div>

            {/* Organization Sign Up */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full border transition-all duration-300 h-11"
                style={{ backgroundColor: 'var(--input)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                <Building2 className="h-4 w-4 mr-2" />
                Sign up with Organization
              </Button>
            </div>
          </div>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-slate-600 dark:text-slate-400">
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
          <div className="flex items-center justify-center space-x-2 text-slate-400 text-sm dark:text-slate-500">
            <Sparkles className="w-4 h-4" />
            <span>Gap Analysis Platform • Enterprise Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
