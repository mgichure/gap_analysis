import { z } from "zod";

// Status enum schema
export const StatusSchema = z.enum(["NOT_IMPLEMENTED", "PARTIAL", "MOSTLY", "FULLY"]);
export type Status = z.infer<typeof StatusSchema>;

// Priority enum schema
export const PrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);
export type Priority = z.infer<typeof PrioritySchema>;

// Risk level enum schema
export const RiskLevelSchema = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);
export type RiskLevel = z.infer<typeof RiskLevelSchema>;

// Standard schema
export const StandardSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  description: z.string().optional(),
  version: z.string().optional(),
  status: StatusSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  clauses: z.array(z.string().cuid()).optional(),
});

export type Standard = z.infer<typeof StandardSchema>;

// Clause schema
export const ClauseSchema = z.object({
  id: z.string().cuid(),
  standardId: z.string().cuid(),
  code: z.string().min(1, "Code is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: StatusSchema,
  requirements: z.array(z.string().cuid()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Clause = z.infer<typeof ClauseSchema>;

// Requirement schema
export const RequirementSchema = z.object({
  id: z.string().cuid(),
  clauseId: z.string().cuid(),
  code: z.string().min(1, "Code is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: StatusSchema,
  priority: PrioritySchema,
  evidence: z.array(z.string().cuid()).optional(),
  risks: z.array(z.string().cuid()).optional(),
  actions: z.array(z.string().cuid()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Requirement = z.infer<typeof RequirementSchema>;

// Evidence schema
export const EvidenceSchema = z.object({
  id: z.string().cuid(),
  requirementId: z.string().cuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  type: z.enum(["DOCUMENT", "PROCEDURE", "TRAINING", "AUDIT", "OTHER"]),
  fileUrl: z.string().url().optional(),
  status: StatusSchema,
  submittedBy: z.string().cuid(),
  submittedAt: z.date(),
  reviewedBy: z.string().cuid().optional(),
  reviewedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Evidence = z.infer<typeof EvidenceSchema>;

// Risk schema
export const RiskSchema = z.object({
  id: z.string().cuid(),
  requirementId: z.string().cuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  level: RiskLevelSchema,
  probability: z.number().min(1).max(5),
  impact: z.number().min(1).max(5),
  mitigation: z.string().optional(),
  status: StatusSchema,
  assignedTo: z.string().cuid().optional(),
  dueDate: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Risk = z.infer<typeof RiskSchema>;

// Action schema
export const ActionSchema = z.object({
  id: z.string().cuid(),
  requirementId: z.string().cuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  type: z.enum(["IMPLEMENTATION", "TRAINING", "DOCUMENTATION", "AUDIT", "OTHER"]),
  priority: PrioritySchema,
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
  assignedTo: z.string().cuid().optional(),
  dueDate: z.date().optional(),
  completedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Action = z.infer<typeof ActionSchema>;

// Dashboard summary schema
export const DashboardSummarySchema = z.object({
  totalStandards: z.number(),
  totalClauses: z.number(),
  totalRequirements: z.number(),
  totalEvidence: z.number(),
  totalRisks: z.number(),
  totalActions: z.number(),
  complianceRate: z.number().min(0).max(100),
  statusBreakdown: z.object({
    notImplemented: z.number(),
    partial: z.number(),
    mostly: z.number(),
    fully: z.number(),
  }),
  recentActivity: z.array(z.object({
    id: z.string().cuid(),
    type: z.enum(["STANDARD", "CLAUSE", "REQUIREMENT", "EVIDENCE", "RISK", "ACTION"]),
    action: z.enum(["CREATED", "UPDATED", "COMPLETED"]),
    title: z.string(),
    timestamp: z.date(),
    userId: z.string().cuid(),
  })),
  upcomingDeadlines: z.array(z.object({
    id: z.string().cuid(),
    type: z.enum(["ACTION", "RISK"]),
    title: z.string(),
    dueDate: z.date(),
    priority: PrioritySchema,
  })),
});

export type DashboardSummary = z.infer<typeof DashboardSummarySchema>;

// Form schemas for creating/updating entities
export const CreateStandardSchema = StandardSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  clauses: true,
});

export const UpdateStandardSchema = CreateStandardSchema.partial();

export const CreateClauseSchema = ClauseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  requirements: true,
});

export const UpdateClauseSchema = CreateClauseSchema.partial();

export const CreateRequirementSchema = RequirementSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  evidence: true,
  risks: true,
  actions: true,
});

export const UpdateRequirementSchema = CreateRequirementSchema.partial();

export const CreateEvidenceSchema = EvidenceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  reviewedBy: true,
  reviewedAt: true,
});

export const UpdateEvidenceSchema = CreateEvidenceSchema.partial();

export const CreateRiskSchema = RiskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateRiskSchema = CreateRiskSchema.partial();

export const CreateActionSchema = ActionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  completedAt: true,
});

export const UpdateActionSchema = CreateActionSchema.partial();
