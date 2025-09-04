"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const barData = [
  { status: "Not Started", count: 12 },
  { status: "In Progress", count: 18 },
  { status: "Blocked", count: 4 },
  { status: "Done", count: 9 },
];

const soaRows = [
  { id: "A.5.1", desc: "Policies for information security", status: "Implemented" },
  { id: "A.5.7", desc: "Threat intelligence", status: "Partially Implemented" },
  { id: "A.6.1", desc: "Access control policy", status: "Not Implemented" },
];

export default function ReportDetailPage() {
  const params = useParams<{ report: string }>();
  const key = params.report;

  const title = useMemo(() => {
    switch (key) {
      case "gap-summary":
        return "Gap Summary";
      case "soa":
        return "Statement of Applicability";
      case "action-plan":
        return "Action Plan";
      default:
        return "Report";
    }
  }, [key]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">Detailed preview</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/reports">Back to Reports</Link>
        </Button>
      </div>

      {key === "gap-summary" && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Gaps by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ count: { label: "Gaps", color: "hsl(var(--chart-2))" } }}>
              <BarChart data={barData}>
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                <XAxis dataKey="status" tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                <Bar dataKey="count" background={{ fill: "rgba(0,0,0,0.06)" }} fill="var(--chart-bar-fill)" stroke="hsl(var(--chart-2))" strokeWidth={3} radius={[4, 4, 0, 0]} />
                <Tooltip content={<ChartTooltipContent />} />
                <ChartTooltip />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {key === "soa" && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">SoA Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Control</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {soaRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id} — {row.desc}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {key === "action-plan" && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Action Plan Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">This section would include task breakdowns, owners, and schedules.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}



