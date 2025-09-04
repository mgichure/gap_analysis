"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type ReportKey = "gap-summary" | "soa" | "action-plan";

const reports: { key: ReportKey; title: string; description: string }[] = [
  {
    key: "gap-summary",
    title: "Gap Summary",
    description: "Overview of gaps by status, area, and priority.",
  },
  {
    key: "soa",
    title: "Statement of Applicability",
    description: "Controls included/excluded, justifications, and implementation status.",
  },
  {
    key: "action-plan",
    title: "Action Plan",
    description: "Planned and in-progress remediation tasks with owners and due dates.",
  },
];

const previewData = {
  bar: [
    { status: "Not Started", count: 12 },
    { status: "In Progress", count: 18 },
    { status: "Blocked", count: 4 },
    { status: "Done", count: 9 },
  ],
  table: [
    { id: "A.5.1", desc: "Policies for information security", status: "Implemented" },
    { id: "A.5.7", desc: "Threat intelligence", status: "Partially Implemented" },
    { id: "A.6.1", desc: "Access control policy", status: "Not Implemented" },
  ],
};

export default function ReportsPage() {
  const exportAs = (key: ReportKey, format: "csv" | "pdf") => {
    if (format === "csv") {
      const headers = ["Section", "Value"];
      const rows = previewData.bar.map((r) => [r.status, String(r.count)]);
      const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${key}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } else {
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Choose a report to preview and export.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {reports.map((r) => (
          <Card key={r.key} className="flex flex-col">
            <CardHeader>
              <CardTitle>{r.title}</CardTitle>
              <CardDescription>{r.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto flex items-center gap-2">
              <Button asChild variant="outline">
                <Link href={`/reports/${r.key}`}>Preview</Link>
              </Button>
              <Button onClick={() => exportAs(r.key, "csv")}>Export CSV</Button>
              <Button onClick={() => exportAs(r.key, "pdf")}>Export PDF</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


