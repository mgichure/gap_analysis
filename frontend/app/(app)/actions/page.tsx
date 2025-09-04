"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type ActionStatus = "PLANNED" | "IN_PROGRESS" | "DONE";

type ActionTask = {
  id: string;
  title: string;
  owner: { name: string; avatarUrl?: string };
  due: string; // ISO date
  status: ActionStatus;
  start: string; // ISO date for Gantt
  end: string; // ISO date for Gantt
};

const tasks: ActionTask[] = [
  {
    id: "A-101",
    title: "Define access control policy",
    owner: { name: "AL", avatarUrl: "/avatars/user.png" },
    due: "2025-09-15",
    status: "PLANNED",
    start: "2025-09-05",
    end: "2025-09-15",
  },
  {
    id: "A-102",
    title: "Implement MFA for admins",
    owner: { name: "BK", avatarUrl: "/avatars/user.png" },
    due: "2025-09-20",
    status: "IN_PROGRESS",
    start: "2025-09-07",
    end: "2025-09-20",
  },
  {
    id: "A-103",
    title: "Vendor risk assessment",
    owner: { name: "CR", avatarUrl: "/avatars/user.png" },
    due: "2025-09-12",
    status: "PLANNED",
    start: "2025-09-03",
    end: "2025-09-12",
  },
  {
    id: "A-104",
    title: "Backups DR test run",
    owner: { name: "DS", avatarUrl: "/avatars/user.png" },
    due: "2025-09-10",
    status: "DONE",
    start: "2025-08-29",
    end: "2025-09-10",
  },
  {
    id: "A-105",
    title: "Asset inventory reconciliation",
    owner: { name: "ET", avatarUrl: "/avatars/user.png" },
    due: "2025-09-22",
    status: "IN_PROGRESS",
    start: "2025-09-08",
    end: "2025-09-22",
  },
];

function Column({ title, items }: { title: string; items: ActionTask[] }) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-muted-foreground px-1">{title}</div>
      <div className="space-y-3">
        {items.map((t) => (
          <Card key={t.id} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium leading-tight">{t.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={t.owner.avatarUrl} alt={t.owner.name} />
                  <AvatarFallback>{t.owner.name}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{t.id}</span>
              </div>
              <Badge variant="secondary" className="whitespace-nowrap">Due {new Date(t.due).toLocaleDateString()}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function ActionsPage() {
  const planned = tasks.filter((t) => t.status === "PLANNED");
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS");
  const done = tasks.filter((t) => t.status === "DONE");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Actions</h1>
        <p className="text-muted-foreground">Plan and track remediation tasks.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Column title="Planned" items={planned} />
        <Column title="In Progress" items={inProgress} />
        <Column title="Done" items={done} />
      </div>
    </div>
  );
}


