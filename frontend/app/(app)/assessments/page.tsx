"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Clause = {
  id: string;
  description: string;
};

// Sample subset of ISO/IEC 27001:2022 Annex A controls
const annexAClauses: Clause[] = [
  { id: "A.5.1", description: "Policies for information security" },
  { id: "A.5.7", description: "Threat intelligence" },
  { id: "A.5.23", description: "Information security for use of cloud services" },
  { id: "A.6.1", description: "Access control policy" },
  { id: "A.8.12", description: "Data leakage prevention" },
  { id: "A.8.23", description: "Web filtering" },
  { id: "A.8.28", description: "Secure coding" },
];

type ScoreValue = "0" | "1" | "2" | "3";

export default function AssessmentsPage() {
  const [scoresByClause, setScoresByClause] = useState<Record<string, ScoreValue | undefined>>({});
  const [notesByClause, setNotesByClause] = useState<Record<string, string>>({});
  const [evidenceFiles, setEvidenceFiles] = useState<Record<string, File | undefined>>({});

  const handleScoreChange = (clauseId: string, value: ScoreValue) => {
    setScoresByClause((prev) => ({ ...prev, [clauseId]: value }));
  };

  const handleNotesChange = (clauseId: string, value: string) => {
    setNotesByClause((prev) => ({ ...prev, [clauseId]: value }));
  };

  const handleEvidenceChange = (clauseId: string, file?: File) => {
    setEvidenceFiles((prev) => ({ ...prev, [clauseId]: file }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
        <p className="text-muted-foreground">Score clauses, take notes, and attach evidence.</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Clause ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[140px]">Score (0–3)</TableHead>
            <TableHead className="w-[380px]">Notes</TableHead>
            <TableHead className="w-[200px]">Evidence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {annexAClauses.map((clause) => {
            const inputId = `evidence-${clause.id.replace(/\./g, "-")}`;
            const selectedFile = evidenceFiles[clause.id];
            return (
              <TableRow key={clause.id}>
                <TableCell className="font-medium">{clause.id}</TableCell>
                <TableCell className="max-w-[520px]">{clause.description}</TableCell>
                <TableCell>
                  <Select
                    value={scoresByClause[clause.id]}
                    onValueChange={(v) => handleScoreChange(clause.id, v as ScoreValue)}
                  >
                    <SelectTrigger aria-label="Select score">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0 - Not Implemented</SelectItem>
                      <SelectItem value="1">1 - Partially</SelectItem>
                      <SelectItem value="2">2 - Mostly</SelectItem>
                      <SelectItem value="3">3 - Fully</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Textarea
                    value={notesByClause[clause.id] || ""}
                    onChange={(e) => handleNotesChange(clause.id, e.target.value)}
                    placeholder="Assessor notes, context, references..."
                    className="min-h-[44px]"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <input
                      id={inputId}
                      type="file"
                      className="hidden"
                      onChange={(e) => handleEvidenceChange(clause.id, e.target.files?.[0])}
                    />
                    <Button asChild variant="secondary" size="sm">
                      <label htmlFor={inputId}>Upload</label>
                    </Button>
                    {selectedFile ? (
                      <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                        {selectedFile.name}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">No file</span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

