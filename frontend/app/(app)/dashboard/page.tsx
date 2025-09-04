"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  Building2, 
  FileText,
  Target,
  Activity,
  BarChart3,
  Calendar,
  Zap,
  Sparkles,
  Eye,
  Target as TargetIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample data for Equity Bank Kenya
const complianceData = [
  { framework: 'ISO 27001:2022', score: 87, target: 90, status: 'CERTIFIED', expiry: '2026-06-15' },
  { framework: 'PCI DSS 4.0', score: 75, target: 100, status: 'IN_PROGRESS', expiry: '2024-12-31' },
  { framework: 'CBK Guidelines', score: 80, target: 100, status: 'IN_PROGRESS', expiry: '2024-12-31' },
];

const riskData = [
  { category: 'Technology', count: 8, high: 3, medium: 3, low: 2 },
  { category: 'Compliance', count: 5, high: 2, medium: 2, low: 1 },
  { category: 'Operational', count: 4, high: 1, medium: 2, low: 1 },
  { category: 'Financial', count: 3, high: 1, medium: 1, low: 1 },
];

const actionData = [
  { status: 'Completed', count: 1, color: '#10b981' },
  { status: 'In Progress', count: 1, color: '#f59e0b' },
  { status: 'Planned', count: 1, color: '#3b82f6' },
  { status: 'On Hold', count: 0, color: '#6b7280' },
];

const recentActivities = [
  {
    id: 1,
    type: 'Risk Assessment',
    description: 'Cybersecurity risk assessment completed',
    user: 'David Kiprop',
    timestamp: '2 hours ago',
    status: 'completed'
  },
  {
    id: 2,
    type: 'Compliance Review',
    description: 'ISO 27001 quarterly review initiated',
    user: 'Jane Wanjiku',
    timestamp: '4 hours ago',
    status: 'in_progress'
  },
  {
    id: 3,
    type: 'Action Item',
    description: 'MFA implementation progress updated',
    user: 'John Mwangi',
    timestamp: '6 hours ago',
    status: 'updated'
  },
  {
    id: 4,
    type: 'Evidence Upload',
    description: 'Security training certificates uploaded',
    user: 'Sarah Ochieng',
    timestamp: '1 day ago',
    status: 'completed'
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'CERTIFIED':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-500/30';
    case 'IN_PROGRESS':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-500/30';
    case 'NOT_STARTED':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300 border-gray-500/30';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300 border-gray-500/30';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'CERTIFIED':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'IN_PROGRESS':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'NOT_STARTED':
      return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    default:
      return <AlertTriangle className="h-4 w-4 text-gray-600" />;
  }
};

export default function DashboardPage() {
  const overallComplianceScore = Math.round(
    complianceData.reduce((acc, item) => acc + item.score, 0) / complianceData.length
  );

  const totalRisks = riskData.reduce((acc, item) => acc + item.count, 0);
  const highRisks = riskData.reduce((acc, item) => acc + item.high, 0);
  const totalActions = actionData.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/3 to-cyan-500/5 rounded-2xl blur-3xl" />
        <div className="relative bg-gradient-to-r from-slate-800/50 via-slate-700/30 to-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <TargetIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    Compliance Dashboard
                  </h1>
                  <p className="text-slate-300 text-lg">
                    Welcome back! Here's your compliance and risk overview for Q1 2024.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30 px-4 py-2 text-sm font-semibold">
                <Shield className="h-4 w-4 mr-2" />
                CBK Compliant
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30 px-4 py-2 text-sm font-semibold">
                <Target className="h-4 w-4 mr-2" />
                ISO 27001 Certified
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Key Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-white/10 backdrop-blur-sm group hover:scale-105 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium text-slate-200">Overall Compliance</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-white mb-2">{overallComplianceScore}%</div>
            <p className="text-xs text-slate-400 mb-3">
              Target: 95%
            </p>
            <Progress value={overallComplianceScore} className="h-2 bg-slate-700" />
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-white/10 backdrop-blur-sm group hover:scale-105 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium text-slate-200">Active Risks</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-white mb-2">{totalRisks}</div>
            <p className="text-xs text-slate-400">
              <span className="text-red-400 font-medium">{highRisks} High</span> • {totalRisks - highRisks} Medium/Low
            </p>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-full blur-xl" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-white/10 backdrop-blur-sm group hover:scale-105 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium text-slate-200">Action Items</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-white mb-2">{totalActions}</div>
            <p className="text-xs text-slate-400">
              {actionData.find(a => a.status === 'Completed')?.count || 0} Completed
            </p>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-xl" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-white/10 backdrop-blur-sm group hover:scale-105 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium text-slate-200">Next Audit</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-white mb-2">45 days</div>
            <p className="text-xs text-slate-400">
              ISO 27001 Annual Review
            </p>
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-xl" />
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Charts Row */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Compliance Framework Status */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-white/10 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-50" />
          <CardHeader className="relative">
            <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-blue-400" />
              </div>
              Compliance Framework Status
            </CardTitle>
            <CardDescription className="text-slate-300">Current compliance scores across frameworks</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={complianceData}>
                <PolarGrid stroke="#475569" />
                <PolarAngleAxis 
                  dataKey="framework" 
                  tick={{ fontSize: 12, fill: '#cbd5e1' }}
                />
                <Radar
                  name="Current Score"
                  dataKey="score"
                  fill="rgba(59, 130, 246, 0.3)"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={0.3}
                />
                <Radar
                  name="Target Score"
                  dataKey="target"
                  fill="rgba(16, 185, 129, 0.1)"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={0.1}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution by Category */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-white/10 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5 opacity-50" />
          <CardHeader className="relative">
            <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-400" />
              </div>
              Risk Distribution by Category
            </CardTitle>
            <CardDescription className="text-slate-300">Risk counts across different categories</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis 
                  dataKey="category" 
                  tick={{ fontSize: 12, fill: '#cbd5e1' }}
                />
                <YAxis tick={{ fontSize: 12, fill: '#cbd5e1' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }}
                />
                <Bar dataKey="high" fill="#ef4444" stackId="a" />
                <Bar dataKey="medium" fill="#f59e0b" stackId="a" />
                <Bar dataKey="low" fill="#10b981" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/25"></div>
                <span className="text-slate-300">High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/25"></div>
                <span className="text-slate-300">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg shadow-green-500/25"></div>
                <span className="text-slate-300">Low</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Action Items Status */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-white/10 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-50" />
        <CardHeader className="relative">
          <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            Action Items Status
          </CardTitle>
          <CardDescription className="text-slate-300">Progress on compliance and risk mitigation actions</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            {actionData.map((action) => (
              <div key={action.status} className="text-center group">
                <div className="relative">
                  <div className="text-3xl font-bold mb-2" style={{ color: action.color }}>
                    {action.count}
                  </div>
                  <div className="text-sm text-slate-300 font-medium">{action.status}</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200} className="mt-6">
            <PieChart>
              <Pie
                data={actionData.filter(a => a.count > 0)}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="count"
              >
                {actionData.filter(a => a.count > 0).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Enhanced Recent Activities */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-white/10 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-50" />
        <CardHeader className="relative">
          <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            Recent Activities
          </CardTitle>
          <CardDescription className="text-slate-300">Latest compliance and risk management activities</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="overflow-hidden rounded-lg border border-white/10">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableHead className="text-slate-300 font-semibold">Activity</TableHead>
                  <TableHead className="text-slate-300 font-semibold">User</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Status</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity) => (
                  <TableRow key={activity.id} className="border-white/10 hover:bg-white/5 transition-colors duration-200">
                    <TableCell>
                      <div>
                        <div className="font-medium text-white">{activity.type}</div>
                        <div className="text-sm text-slate-400">{activity.description}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-white">{activity.user}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={activity.status === 'completed' ? 'default' : 'secondary'}
                        className={cn(
                          "px-3 py-1 font-medium",
                          activity.status === 'completed' 
                            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30' 
                            : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30'
                        )}
                      >
                        {activity.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-400">{activity.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Quick Actions */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-700/30 border-white/10 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-50" />
        <CardHeader className="relative">
          <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-indigo-400" />
            </div>
            Quick Actions
          </CardTitle>
          <CardDescription className="text-slate-300">Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Button 
              variant="outline" 
              className="h-24 flex-col gap-3 bg-gradient-to-br from-slate-700/50 to-slate-600/30 border-white/10 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                <FileText className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-slate-200 font-medium">New Assessment</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-24 flex-col gap-3 bg-gradient-to-br from-slate-700/50 to-slate-600/30 border-white/10 hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl flex items-center justify-center group-hover:from-red-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <span className="text-slate-200 font-medium">Report Risk</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-24 flex-col gap-3 bg-gradient-to-br from-slate-700/50 to-slate-600/30 border-white/10 hover:border-green-500/30 hover:bg-green-500/10 transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-slate-200 font-medium">Create Action</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-24 flex-col gap-3 bg-gradient-to-br from-slate-700/50 to-slate-600/30 border-white/10 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-indigo-500/30 transition-all duration-300">
                <BarChart3 className="h-6 w-6 text-purple-400" />
              </div>
              <span className="text-slate-200 font-medium">Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
