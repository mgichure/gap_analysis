"use client";

import { useMemo, useState, useRef, DragEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Grid, List, Upload, File, Image as ImageIcon, FileText, FileSpreadsheet, FileArchive, FileCode, FileAudio, FileVideo, Link2 } from "lucide-react";

type EvidenceType = "image" | "pdf" | "doc" | "sheet" | "archive" | "code" | "audio" | "video" | "other";

type EvidenceItem = {
  id: string;
  filename: string;
  type: EvidenceType;
  requirement: string;
  uploadedAt: string; // ISO
};

const initialItems: EvidenceItem[] = [
  { id: "E-001", filename: "access-policy.pdf", type: "pdf", requirement: "A.6.1 Access control policy", uploadedAt: "2025-09-02T10:00:00Z" },
  { id: "E-002", filename: "mfa-screenshot.png", type: "image", requirement: "A.5.15 Authentication information", uploadedAt: "2025-09-03T12:30:00Z" },
  { id: "E-003", filename: "asset-export.xlsx", type: "sheet", requirement: "A.5.9 Inventory of information", uploadedAt: "2025-09-01T08:15:00Z" },
  { id: "E-004", filename: "backup-log.txt", type: "doc", requirement: "A.8.13 Backup", uploadedAt: "2025-09-04T09:45:00Z" },
];

function typeIcon(t: EvidenceType) {
  switch (t) {
    case "image":
      return <ImageIcon className="h-4 w-4" />;
    case "pdf":
      return <FileText className="h-4 w-4" />;
    case "doc":
      return <FileText className="h-4 w-4" />;
    case "sheet":
      return <FileSpreadsheet className="h-4 w-4" />;
    case "archive":
      return <FileArchive className="h-4 w-4" />;
    case "code":
      return <FileCode className="h-4 w-4" />;
    case "audio":
      return <FileAudio className="h-4 w-4" />;
    case "video":
      return <FileVideo className="h-4 w-4" />;
    default:
      return <File className="h-4 w-4" />;
  }
}

function extToType(name: string): EvidenceType {
  const ext = name.split(".").pop()?.toLowerCase();
  if (!ext) return "other";
  if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) return "image";
  if (ext === "pdf") return "pdf";
  if (["doc", "docx", "txt", "md"].includes(ext)) return "doc";
  if (["xls", "xlsx", "csv"].includes(ext)) return "sheet";
  if (["zip", "tar", "gz", "rar", "7z"].includes(ext)) return "archive";
  if (["js", "ts", "py", "rb", "go", "java"].includes(ext)) return "code";
  if (["mp3", "wav", "m4a"].includes(ext)) return "audio";
  if (["mp4", "mov", "webm"].includes(ext)) return "video";
  return "other";
}

export default function EvidencePage() {
  const [items, setItems] = useState<EvidenceItem[]>(initialItems);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<EvidenceType | "ALL">("ALL");
  const [view, setView] = useState<"grid" | "table">("grid");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const matchQuery = query.trim().length
        ? `${i.filename} ${i.requirement}`.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchType = typeFilter === "ALL" ? true : i.type === typeFilter;
      return matchQuery && matchType;
    });
  }, [items, query, typeFilter]);

  const onFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const now = new Date().toISOString();
    const newItems: EvidenceItem[] = Array.from(files).map((f, idx) => ({
      id: `NEW-${Date.now()}-${idx}`,
      filename: f.name,
      type: extToType(f.name),
      requirement: "Unlinked",
      uploadedAt: now,
    }));
    setItems((prev) => [...newItems, ...prev]);
    setIsUploadOpen(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    onFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Evidence</h1>
          <p className="text-muted-foreground">Browse, search, and upload compliance evidence.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={view === "grid" ? "default" : "outline"} size="sm" onClick={() => setView("grid")}>
            <Grid className="h-4 w-4 mr-1" /> Grid
          </Button>
          <Button variant={view === "table" ? "default" : "outline"} size="sm" onClick={() => setView("table")}>
            <List className="h-4 w-4 mr-1" /> Table
          </Button>
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-1" /> Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Evidence</DialogTitle>
              </DialogHeader>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-md p-6 text-center ${dragActive ? "border-primary bg-muted" : "border-border"}`}
              >
                <p className="text-sm text-muted-foreground">Drag and drop files here</p>
                <p className="text-xs text-muted-foreground">or</p>
                <div className="mt-3">
                  <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />
                  <Button variant="secondary" size="sm" onClick={() => inputRef.current?.click()}>Choose Files</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Input placeholder="Search filename or requirement..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as EvidenceType | "ALL")}> 
          <SelectTrigger>
            <SelectValue placeholder="Type: All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All types</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="doc">Document</SelectItem>
            <SelectItem value="sheet">Spreadsheet</SelectItem>
            <SelectItem value="archive">Archive</SelectItem>
            <SelectItem value="code">Code</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((f) => (
            <Card key={f.id} className="hover:shadow-sm transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  {typeIcon(f.type)}
                  <span className="truncate" title={f.filename}>{f.filename}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <div className="flex items-center gap-2">
                  <Link2 className="h-3.5 w-3.5" />
                  <span className="truncate" title={f.requirement}>{f.requirement}</span>
                </div>
                <div>
                  <Badge variant="outline">{new Date(f.uploadedAt).toLocaleString()}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">File</TableHead>
                  <TableHead>Requirement</TableHead>
                  <TableHead>Uploaded</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {typeIcon(f.type)}
                        <span className="truncate" title={f.filename}>{f.filename}</span>
                      </div>
                    </TableCell>
                    <TableCell className="truncate" title={f.requirement}>{f.requirement}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{new Date(f.uploadedAt).toLocaleString()}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


