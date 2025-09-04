"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

type Role = "Admin" | "Manager" | "Viewer";
type UserStatus = "Active" | "Suspended";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
};

const initialUsers: UserRow[] = [
  { id: "U-001", name: "Alice Lee", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: "U-002", name: "Ben Kim", email: "ben@example.com", role: "Manager", status: "Active" },
  { id: "U-003", name: "Cara Roe", email: "cara@example.com", role: "Viewer", status: "Suspended" },
];

export default function SettingsPage() {
  const [users, setUsers] = useState<UserRow[]>(initialUsers);
  const [scoringScale, setScoringScale] = useState("0,1,2,3");
  const [statuses, setStatuses] = useState("Not Started,In Progress,Blocked,Done");
  const [backupsEnabled, setBackupsEnabled] = useState(true);
  const [notes, setNotes] = useState("");
  const [themeDark, setThemeDark] = useState<boolean>(false);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") setThemeDark(true);
      else if (stored === "light") setThemeDark(false);
      else setThemeDark(document.documentElement.classList.contains("dark"));
    } catch {}
  }, []);

  const updateUser = (id: string, update: Partial<UserRow>) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...update } : u)));
  };

  const saveSystemConfig = () => {
    // Placeholder: wire to backend later
    console.log("Saved config", { scoringScale, statuses, backupsEnabled, notes });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage users and system configuration.</p>
      </div>

      {/* User Management */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">User Management</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead className="w-[280px]">Email</TableHead>
                <TableHead className="w-[180px]">Role</TableHead>
                <TableHead className="w-[160px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Select value={u.role} onValueChange={(v) => updateUser(u.id, { role: v as Role })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant={u.status === "Active" ? "secondary" : "destructive"}>{u.status}</Badge>
                      <Switch
                        checked={u.status === "Active"}
                        onCheckedChange={(v) => updateUser(u.id, { status: v ? "Active" : "Suspended" })}
                        aria-label="Toggle user status"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* System Configuration */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">System Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm">Scoring Scale</label>
              <Input
                value={scoringScale}
                onChange={(e) => setScoringScale(e.target.value)}
                placeholder="e.g., 0,1,2,3"
              />
              <p className="text-xs text-muted-foreground">Comma-separated numeric values used in assessments.</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm">Statuses</label>
              <Input
                value={statuses}
                onChange={(e) => setStatuses(e.target.value)}
                placeholder="e.g., Not Started,In Progress,Blocked,Done"
              />
              <p className="text-xs text-muted-foreground">Comma-separated workflow states for actions/gaps.</p>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md border p-3">
            <div>
              <div className="text-sm font-medium">Backups</div>
              <div className="text-xs text-muted-foreground">Enable scheduled configuration backups</div>
            </div>
            <Switch checked={backupsEnabled} onCheckedChange={setBackupsEnabled} />
          </div>
          <div className="flex items-center justify-between rounded-md border p-3">
            <div>
              <div className="text-sm font-medium">Theme</div>
              <div className="text-xs text-muted-foreground">Switch between light and dark modes</div>
            </div>
            <Switch
              checked={themeDark}
              onCheckedChange={(v) => {
                const isDark = Boolean(v);
                setThemeDark(isDark);
                try {
                  document.documentElement.classList.remove("dark", "light");
                  if (isDark) {
                    document.documentElement.classList.add("dark");
                    localStorage.setItem("theme", "dark");
                  } else {
                    document.documentElement.classList.add("light");
                    localStorage.setItem("theme", "light");
                  }
                } catch {}
              }}
              aria-label="Toggle dark mode"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm">Admin Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes or change log"
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={saveSystemConfig}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


