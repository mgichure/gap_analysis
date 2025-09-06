"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, Building, Briefcase, Shield, Calendar, Edit3, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/lib/user-context";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, refreshUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    jobTitle: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        department: user.department || "",
        jobTitle: user.jobTitle || "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to update user profile
      // For now, just show success message
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      await refreshUser();
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        department: user.department || "",
        jobTitle: user.jobTitle || "",
      });
    }
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">No User Data</h3>
          <p className="text-slate-400">Unable to load user profile information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <p className="text-slate-400 mt-1">Manage your account information and preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-slate-700">
                  <AvatarImage src="/avatars/user.png" alt={user.email} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-semibold">
                    {(() => {
                      const firstName = user.firstName?.[0] || '';
                      const lastName = user.lastName?.[0] || '';
                      const initials = `${firstName}${lastName}`.toUpperCase();
                      return initials || user.email[0].toUpperCase();
                    })()}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-semibold text-white mb-1">
                  {user.firstName && user.lastName 
                    ? `${user.firstName} ${user.lastName}` 
                    : user.email.split('@')[0]
                  }
                </h2>
                
                <p className="text-slate-400 text-sm mb-3">{user.email}</p>
                
                <Badge 
                  variant="secondary" 
                  className="bg-blue-500/20 text-blue-300 border-blue-500/30 capitalize"
                >
                  <Shield className="w-3 h-3 mr-1" />
                  {user.role.toLowerCase().replace('_', ' ')}
                </Badge>
                
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-center text-sm text-slate-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-400" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-slate-400">
                Your basic profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                    className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="bg-slate-700/50 border-slate-600 text-white opacity-50"
                />
                <p className="text-xs text-slate-500">Email cannot be changed</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-300 flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your phone number"
                  className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-purple-400" />
                Professional Information
              </CardTitle>
              <CardDescription className="text-slate-400">
                Your work-related details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="department" className="text-slate-300 flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  Department
                </Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your department"
                  className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-slate-300 flex items-center">
                  <Briefcase className="w-4 h-4 mr-1" />
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your job title"
                  className="bg-slate-700/50 border-slate-600 text-white disabled:opacity-50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-400" />
                Account Information
              </CardTitle>
              <CardDescription className="text-slate-400">
                Your account security and role details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">User ID</Label>
                  <Input
                    value={user.id}
                    disabled
                    className="bg-slate-700/50 border-slate-600 text-white opacity-50 font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Role</Label>
                  <div className="flex items-center">
                    <Badge 
                      variant="secondary" 
                      className="bg-blue-500/20 text-blue-300 border-blue-500/30 capitalize"
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      {user.role.toLowerCase().replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
