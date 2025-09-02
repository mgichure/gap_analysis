// Status constants
export const STATUSES = {
  NOT_IMPLEMENTED: "NOT_IMPLEMENTED",
  PARTIAL: "PARTIAL",
  MOSTLY: "MOSTLY",
  FULLY: "FULLY",
} as const;

export type Status = typeof STATUSES[keyof typeof STATUSES];

// Priority constants
export const PRIORITIES = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
} as const;

export type Priority = typeof PRIORITIES[keyof typeof PRIORITIES];

// Risk level constants
export const RISK_LEVELS = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
} as const;

export type RiskLevel = typeof RISK_LEVELS[keyof typeof RISK_LEVELS];

// Action status constants
export const ACTION_STATUSES = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type ActionStatus = typeof ACTION_STATUSES[keyof typeof ACTION_STATUSES];

// Evidence type constants
export const EVIDENCE_TYPES = {
  DOCUMENT: "DOCUMENT",
  PROCEDURE: "PROCEDURE",
  TRAINING: "TRAINING",
  AUDIT: "AUDIT",
  OTHER: "OTHER",
} as const;

export type EvidenceType = typeof EVIDENCE_TYPES[keyof typeof EVIDENCE_TYPES];

// Action type constants
export const ACTION_TYPES = {
  IMPLEMENTATION: "IMPLEMENTATION",
  TRAINING: "TRAINING",
  DOCUMENTATION: "DOCUMENTATION",
  AUDIT: "AUDIT",
  OTHER: "OTHER",
} as const;

export type ActionType = typeof ACTION_TYPES[keyof typeof ACTION_TYPES];

// Color constants for statuses
export const STATUS_COLORS = {
  [STATUSES.NOT_IMPLEMENTED]: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    hover: "hover:bg-red-100",
  },
  [STATUSES.PARTIAL]: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
    hover: "hover:bg-yellow-100",
  },
  [STATUSES.MOSTLY]: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    hover: "hover:bg-blue-100",
  },
  [STATUSES.FULLY]: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    hover: "hover:bg-green-100",
  },
} as const;

// Color constants for priorities
export const PRIORITY_COLORS = {
  [PRIORITIES.LOW]: {
    bg: "bg-gray-50",
    text: "text-gray-700",
    border: "border-gray-200",
  },
  [PRIORITIES.MEDIUM]: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  [PRIORITIES.HIGH]: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
  },
  [PRIORITIES.CRITICAL]: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
} as const;

// Color constants for risk levels
export const RISK_COLORS = {
  [RISK_LEVELS.LOW]: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  [RISK_LEVELS.MEDIUM]: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  [RISK_LEVELS.HIGH]: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
  },
  [RISK_LEVELS.CRITICAL]: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
} as const;

// Navigation constants
export const NAV_ITEMS = {
  DASHBOARD: "dashboard",
  STANDARDS: "standards",
  CLAUSES: "clauses",
  REQUIREMENTS: "requirements",
  EVIDENCE: "evidence",
  RISKS: "risks",
  ACTIONS: "actions",
  REPORTS: "reports",
  USERS: "users",
  SETTINGS: "settings",
} as const;

// API endpoints
export const API_ENDPOINTS = {
  STANDARDS: "/standards",
  CLAUSES: "/clauses",
  REQUIREMENTS: "/requirements",
  EVIDENCE: "/evidence",
  RISKS: "/risks",
  ACTIONS: "/actions",
  DASHBOARD: "/dashboard",
  USERS: "/users",
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    GOOGLE: "/auth/google",
  },
} as const;

// Pagination constants
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: "MMM dd, yyyy",
  DISPLAY_WITH_TIME: "MMM dd, yyyy HH:mm",
  ISO: "yyyy-MM-dd",
  ISO_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss",
} as const;

// File upload constants
export const FILE_UPLOADS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
    "text/plain",
  ],
  ALLOWED_EXTENSIONS: [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png", ".txt"],
} as const;
