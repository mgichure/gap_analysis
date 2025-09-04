import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Shield, BarChart3, Users, ArrowRight, Sparkles, Building2, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-cyan-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(156,146,172,0.05)_0%,transparent_50%)] opacity-20" />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Gap Analysis
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/signin">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/25">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6 leading-tight">
            Enterprise Security
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Gap Analysis Platform
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Comprehensive compliance and risk management for financial institutions. 
            Identify gaps, manage risks, and maintain regulatory compliance with our 
            enterprise-grade platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 h-14 px-8 text-lg font-semibold">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 hover:border-blue-500/30 h-14 px-8 text-lg font-semibold">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Everything you need for compliance
            </h2>
            <p className="text-slate-400 text-lg">
              Built for banks, microfinance institutions, and financial organizations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Compliance Management</h3>
                <p className="text-slate-400 leading-relaxed">
                  Manage ISO 27001, PCI DSS, and regulatory compliance with automated assessments and real-time monitoring.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Risk Assessment</h3>
                <p className="text-slate-400 leading-relaxed">
                  Comprehensive risk identification, assessment, and mitigation strategies with advanced analytics and reporting.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-white/10 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Team Collaboration</h3>
                <p className="text-slate-400 leading-relaxed">
                  Streamlined workflows, task management, and team collaboration tools for efficient compliance operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 px-6 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/3 to-cyan-500/5 rounded-2xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-slate-800/50 via-slate-700/30 to-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to secure your organization?
              </h2>
              <p className="text-slate-300 mb-8 text-lg">
                Join thousands of financial institutions already using our platform
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 h-12 px-8 text-base font-semibold">
                    Get Started Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/signin">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 hover:border-blue-500/30 h-12 px-8 text-base font-semibold">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/10 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">Gap Analysis</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-slate-400">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/support" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
