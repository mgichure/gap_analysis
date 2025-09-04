"use client";

import { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Control = {
  id: string;
  description: string;
};

const annexAControls: Control[] = [
  { id: "A.5.1", description: "Policies for information security" },
  { id: "A.5.7", description: "Threat intelligence" },
  { id: "A.5.23", description: "Information security for use of cloud services" },
  { id: "A.6.1", description: "Access control policy" },
  { id: "A.6.8", description: "Privileged access rights" },
  { id: "A.8.12", description: "Data leakage prevention" },
  { id: "A.8.23", description: "Web filtering" },
  { id: "A.8.28", description: "Secure coding" },
];

type ImplementationStatus = "IMPLEMENTED" | "PARTIAL" | "NOT_IMPLEMENTED" | "NOT_APPLICABLE";

type SoARecord = {
  included: boolean;
  justification: string;
  status: ImplementationStatus | undefined;
};

export default function SoAPage() {
  const [query, setQuery] = useState("");
  const [onlyIncluded, setOnlyIncluded] = useState(false);
  const [statusFilter, setStatusFilter] = useState<ImplementationStatus | "ALL">("ALL");
  const [records, setRecords] = useState<Record<string, SoARecord>>(() => {
    const initial: Record<string, SoARecord> = {};
    annexAControls.forEach((c) => {
      initial[c.id] = { included: true, justification: "", status: undefined };
    });
    return initial;
  });

  const filtered = useMemo(() => {
    return annexAControls.filter((c) => {
      const r = records[c.id];
      if (onlyIncluded && !r?.included) return false;
      if (statusFilter !== "ALL" && r?.status !== statusFilter) return false;
      if (query.trim().length > 0) {
        const q = query.toLowerCase();
        return c.id.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
      }
      return true;
    });
  }, [query, onlyIncluded, statusFilter, records]);

  const updateRecord = (id: string, update: Partial<SoARecord>) => {
    setRecords((prev) => ({ ...prev, [id]: { ...prev[id], ...update } }));
  };

  const exportCsv = () => {
    const headers = ["Control ID", "Description", "Included", "Justification", "Implementation Status"];
    const rows = annexAControls.map((c) => {
      const r = records[c.id] || { included: false, justification: "", status: undefined };
      return [
        c.id,
        c.description.replaceAll("\"", "'"),
        r.included ? "Yes" : "No",
        (r.justification || "").replaceAll("\"", "'"),
        r.status || "",
      ];
    });
    const csv = [headers, ...rows]
      .map((row) => row.map((v) => `"${String(v).replaceAll("\n", " ")}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "soa_export.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => {
    // Print to PDF via browser's print dialog
    window.print();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Statement of Applicability</h1>
          <p className="text-muted-foreground">Filter controls and document inclusion with justifications.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={exportCsv}>Export CSV</Button>
          <Button onClick={exportPdf}>Export PDF</Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search controls..."
        />
        <div className="flex items-center gap-2">
          <Checkbox id="included" checked={onlyIncluded} onCheckedChange={(v) => setOnlyIncluded(Boolean(v))} />
          <label htmlFor="included" className="text-sm text-muted-foreground">Show only Included</label>
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as ImplementationStatus | "ALL")}> 
          <SelectTrigger aria-label="Filter by status">
            <SelectValue placeholder="Status: All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All statuses</SelectItem>
            <SelectItem value="IMPLEMENTED">Implemented</SelectItem>
            <SelectItem value="PARTIAL">Partially Implemented</SelectItem>
            <SelectItem value="NOT_IMPLEMENTED">Not Implemented</SelectItem>
            <SelectItem value="NOT_APPLICABLE">Not Applicable</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Control ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[120px]">Included</TableHead>
            <TableHead className="w-[360px]">Justification</TableHead>
            <TableHead className="w-[220px]">Implementation Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((c) => {
            const rec = records[c.id];
            return (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.id}</TableCell>
                <TableCell className="max-w-[560px]">{c.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={rec?.included}
                      onCheckedChange={(v) => updateRecord(c.id, { included: Boolean(v) })}
                    />
                    <span className="text-xs text-muted-foreground">{rec?.included ? "Included" : "Excluded"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Textarea
                    value={rec?.justification || ""}
                    onChange={(e) => updateRecord(c.id, { justification: e.target.value })}
                    placeholder="Why included/excluded, references, risk assessment..."
                    className="min-h-[44px]"
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={rec?.status || undefined}
                    onValueChange={(v) => updateRecord(c.id, { status: v as ImplementationStatus })}
                  >
                    <SelectTrigger aria-label="Implementation status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IMPLEMENTED">Implemented</SelectItem>
                      <SelectItem value="PARTIAL">Partially Implemented</SelectItem>
                      <SelectItem value="NOT_IMPLEMENTED">Not Implemented</SelectItem>
                      <SelectItem value="NOT_APPLICABLE">Not Applicable</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}


