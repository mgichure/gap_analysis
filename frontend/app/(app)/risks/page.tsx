"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Likelihood = "Low" | "Medium" | "High";
type Impact = "Low" | "Medium" | "High";
type RiskStatus = "Open" | "In Progress" | "Mitigated";

type Risk = {
  id: string;
  description: string;
  likelihood: Likelihood;
  impact: Impact;
  status: RiskStatus;
};

const initialRisks: Risk[] = [
  { id: "R-001", description: "Access control gaps in privileged accounts", likelihood: "High", impact: "High", status: "Open" },
  { id: "R-002", description: "Incomplete asset inventory", likelihood: "Medium", impact: "Medium", status: "In Progress" },
  { id: "R-003", description: "Vendor data processing without DPA", likelihood: "Low", impact: "High", status: "Open" },
];

function StatusBadge({ status }: { status: RiskStatus }) {
  const map: Record<RiskStatus, { variant: "default" | "secondary" | "destructive"; label: string }> = {
    Open: { variant: "destructive", label: "Open" },
    "In Progress": { variant: "default", label: "In Progress" },
    Mitigated: { variant: "secondary", label: "Mitigated" },
  };
  const cfg = map[status];
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}

export default function RisksPage() {
  const [risks, setRisks] = useState<Risk[]>(initialRisks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRisk, setNewRisk] = useState<Omit<Risk, "id">>({
    description: "",
    likelihood: "Low",
    impact: "Low",
    status: "Open",
  });

  const addRisk = () => {
    if (!newRisk.description.trim()) return;
    const nextIdNum = risks.length + 1;
    const id = `R-${String(nextIdNum).padStart(3, "0")}`;
    setRisks((prev) => [{ id, ...newRisk }, ...prev]);
    setIsDialogOpen(false);
    setNewRisk({ description: "", likelihood: "Low", impact: "Low", status: "Open" });
  };

  const updateRisk = (id: string, update: Partial<Risk>) => {
    setRisks((prev) => prev.map((r) => (r.id === id ? { ...r, ...update } : r)));
  };

  // Heatmap aggregation counts by Likelihood x Impact
  const heatmap = useMemo(() => {
    const levels: Likelihood[] = ["Low", "Medium", "High"];
    const grid: Record<Likelihood, Record<Impact, number>> = {
      Low: { Low: 0, Medium: 0, High: 0 },
      Medium: { Low: 0, Medium: 0, High: 0 },
      High: { Low: 0, Medium: 0, High: 0 },
    };
    risks.forEach((r) => {
      grid[r.likelihood][r.impact] += 1;
    });
    return { levels, grid };
  }, [risks]);

  const heatColor = (count: number): string => {
    if (count === 0) return "bg-muted"; // no risks
    if (count === 1) return "bg-orange-200 dark:bg-orange-900";
    if (count === 2) return "bg-orange-400 dark:bg-orange-800";
    if (count === 3) return "bg-orange-500 dark:bg-orange-700";
    return "bg-red-500 dark:bg-red-700";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risks</h1>
          <p className="text-muted-foreground">Maintain your risk register and visualize concentration.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>+ New Risk</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Risk</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-sm">Description</label>
                <Textarea
                  value={newRisk.description}
                  onChange={(e) => setNewRisk((r) => ({ ...r, description: e.target.value }))}
                  placeholder="Describe the risk, affected assets/processes, etc."
                />
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="space-y-1">
                  <label className="text-sm">Likelihood</label>
                  <Select value={newRisk.likelihood} onValueChange={(v) => setNewRisk((r) => ({ ...r, likelihood: v as Likelihood }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Likelihood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm">Impact</label>
                  <Select value={newRisk.impact} onValueChange={(v) => setNewRisk((r) => ({ ...r, impact: v as Impact }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Impact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm">Status</label>
                  <Select value={newRisk.status} onValueChange={(v) => setNewRisk((r) => ({ ...r, status: v as RiskStatus }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Mitigated">Mitigated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={addRisk}>Create</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Risk Register</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[160px]">Likelihood</TableHead>
                <TableHead className="w-[160px]">Impact</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {risks.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.id}</TableCell>
                  <TableCell className="max-w-[640px]">
                    <Input
                      value={r.description}
                      onChange={(e) => updateRisk(r.id, { description: e.target.value })}
                    />
                  </TableCell>
                  <TableCell>
                    <Select value={r.likelihood} onValueChange={(v) => updateRisk(r.id, { likelihood: v as Likelihood })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select value={r.impact} onValueChange={(v) => updateRisk(r.id, { impact: v as Impact })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={r.status} />
                      <Select value={r.status} onValueChange={(v) => updateRisk(r.id, { status: v as RiskStatus })}>
                        <SelectTrigger className="h-8 w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Mitigated">Mitigated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Risk Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[80px_repeat(3,minmax(0,1fr))] gap-2">
            <div />
            {heatmap.levels.map((imp) => (
              <div key={`head-${imp}`} className="text-sm text-muted-foreground text-center">{imp} Impact</div>
            ))}
            {heatmap.levels.map((lik) => (
              <>
                <div key={`row-head-${lik}`} className="text-sm text-muted-foreground flex items-center">{lik} Likelihood</div>
                {heatmap.levels.map((imp) => {
                  const count = heatmap.grid[lik][imp as Impact];
                  return (
                    <div key={`${lik}-${imp}`} className={`rounded-md h-16 flex items-center justify-center ${heatColor(count)}`}>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                  );
                })}
              </>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            <span>Legend:</span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded bg-muted inline-block" />0</span>
              <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded bg-orange-200 dark:bg-orange-900 inline-block" />1</span>
              <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded bg-orange-400 dark:bg-orange-800 inline-block" />2</span>
              <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded bg-orange-500 dark:bg-orange-700 inline-block" />3</span>
              <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded bg-red-500 dark:bg-red-700 inline-block" />4+</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


