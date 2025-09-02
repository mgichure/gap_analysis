import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock,
  type LucideIcon 
} from "lucide-react";

export type StatusType = "NOT_IMPLEMENTED" | "PARTIAL" | "MOSTLY" | "FULLY";

interface StatusChipProps {
  status: StatusType;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const statusConfig: Record<StatusType, {
  label: string;
  icon: LucideIcon;
  variant: "default" | "secondary" | "destructive" | "outline";
  className: string;
}> = {
  NOT_IMPLEMENTED: {
    label: "Not Implemented",
    icon: XCircle,
    variant: "destructive",
    className: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
  },
  PARTIAL: {
    label: "Partial",
    icon: AlertCircle,
    variant: "outline",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
  },
  MOSTLY: {
    label: "Mostly Complete",
    icon: Clock,
    variant: "secondary",
    className: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
  },
  FULLY: {
    label: "Fully Implemented",
    icon: CheckCircle,
    variant: "default",
    className: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
  },
};

export function StatusChip({ status, size = "md", className }: StatusChipProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <Badge
      variant={config.variant}
      className={cn(
        "inline-flex items-center gap-1.5 font-medium",
        config.className,
        sizeClasses[size],
        className
      )}
    >
      <Icon className={cn(
        size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4"
      )} />
      {config.label}
    </Badge>
  );
}
